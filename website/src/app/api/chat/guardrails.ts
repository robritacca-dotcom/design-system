/**
 * Spend and abuse guardrails for /api/chat.
 *
 * Four layers, outermost last:
 *   1. Stateless caps on the request (message length, turn count) in route.ts.
 *   2. Per-IP rate limits, so one visitor cannot drain the day's budget.
 *   3. A site-wide daily circuit breaker on both message count and estimated
 *      spend, which stops calling Anthropic for everyone once either is hit.
 *   4. The Anthropic Console spend cap, which is the only one that still holds
 *      if this file has a bug.
 *
 * Fail-open by design. If Redis is unreachable or unconfigured, requests are
 * allowed through and the failure is logged. A guardrail outage should not take
 * the feature down, and layer 4 still bounds the damage: the workspace cap is
 * set to the credit balance, so the true ceiling is what has been funded.
 *
 * Every rejection returns copy for a `notice` event, which the widget renders
 * as an ordinary assistant message. Visitors never see a raw error.
 */
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createHash } from "node:crypto";

/* ============================================
   Caps. Env overrides let production be tuned without a deploy.
   ============================================ */

const PER_IP_PER_MINUTE = 10;
const PER_IP_PER_DAY = 60;

const DAILY_MESSAGE_CAP = Number(process.env.CHAT_DAILY_MESSAGE_CAP ?? 300);
const DAILY_SPEND_CAP_TENTHS = Number(process.env.CHAT_DAILY_SPEND_CAP_CENTS ?? 500) * 10;

/**
 * claude-sonnet-5 list price in USD per million tokens, with cache writes at
 * 2x input (the route caches the corpus with a 1-hour TTL — see the
 * cache_control block in route.ts; this constant must move with it) and
 * cache reads at 0.1x.
 *
 * Deliberately the standard rate rather than the promotional one: over-
 * estimating spend trips the breaker early, which is the safe direction to be
 * wrong in. Real billing comes from the Console, not from this table.
 */
const PRICE_PER_MTOK = {
  input: 3.0,
  output: 15.0,
  cacheWrite: 6.0,
  cacheRead: 0.3,
};

/** Anthropic's usage block, narrowed to the fields the estimate needs. */
export interface TokenUsage {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
}

/* ============================================
   Redis
   ============================================ */

let cachedRedis: Redis | null | undefined;

/** The shared client, or null when unconfigured. Never throws. */
function getRedis(): Redis | null {
  if (cachedRedis !== undefined) return cachedRedis;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    console.warn("[chat] KV_REST_API_URL/TOKEN unset — rate limits and the daily breaker are inactive.");
    cachedRedis = null;
    return null;
  }

  cachedRedis = new Redis({ url, token });
  return cachedRedis;
}

const burstLimiter = (redis: Redis) =>
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(PER_IP_PER_MINUTE, "60 s"),
    prefix: "chat:rl:burst",
    analytics: false,
  });

const dailyLimiter = (redis: Redis) =>
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(PER_IP_PER_DAY, "24 h"),
    prefix: "chat:rl:day",
    analytics: false,
  });

/* ============================================
   Keys
   ============================================ */

/**
 * A stable per-visitor key. The IP is hashed before it becomes a Redis key so
 * no raw address is stored, which keeps a rate-limit store from quietly
 * becoming a log of who visited.
 */
export function visitorKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip")?.trim() || "local";
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

/** UTC date, so the daily counters reset at midnight UTC without a scheduler. */
const dayKey = () => new Date().toISOString().slice(0, 10);

const messagesKey = () => `chat:day:${dayKey()}:messages`;
const spendKey = () => `chat:day:${dayKey()}:tenths-cents`;

/** Counters outlive their day by a margin, then expire on their own. */
const COUNTER_TTL_SECONDS = 60 * 60 * 48;

/* ============================================
   Checks
   ============================================ */

export type GuardrailVerdict = { allowed: true } | { allowed: false; notice: string };

const ALLOWED: GuardrailVerdict = { allowed: true };

/**
 * Runs the per-IP limits and the daily breaker, and counts the message when it
 * passes. Returns the copy to render when it does not.
 */
export async function checkGuardrails(request: Request): Promise<GuardrailVerdict> {
  const redis = getRedis();
  if (!redis) return ALLOWED;

  try {
    const visitor = visitorKey(request);

    const [burst, daily] = await Promise.all([
      burstLimiter(redis).limit(visitor),
      dailyLimiter(redis).limit(visitor),
    ]);

    if (!burst.success) {
      return {
        allowed: false,
        notice:
          "That is a lot of questions at once. Give it a minute and ask again, or use the contact page at /contact if it is urgent.",
      };
    }

    if (!daily.success) {
      return {
        allowed: false,
        notice:
          "You have reached the daily limit for this chat. It resets tomorrow. The contact page at /contact is the fastest way to reach Rob directly.",
      };
    }

    const [messages, spendTenths] = await Promise.all([
      redis.get<number>(messagesKey()),
      redis.get<number>(spendKey()),
    ]);

    if ((messages ?? 0) >= DAILY_MESSAGE_CAP || (spendTenths ?? 0) >= DAILY_SPEND_CAP_TENTHS) {
      // The degraded response, not a dead end: a breaker most likely trips on
      // the site's busiest-ever day, so the fallback still routes people.
      return {
        allowed: false,
        notice:
          "This chat has hit its budget for today and is paused until midnight UTC. " +
          "The site itself answers most of what people ask: the case studies are at /work, " +
          "Rob's background and career history are at /about, and his email and profiles " +
          "are at /contact.",
      };
    }

    // Counted before the call, so a request that dies mid-stream still counts
    // against the cap. Under-counting is what lets a retry loop run free.
    const count = await redis.incr(messagesKey());
    if (count === 1) await redis.expire(messagesKey(), COUNTER_TTL_SECONDS);

    return ALLOWED;
  } catch (error) {
    console.error("[chat] guardrail check failed, allowing the request:", error);
    return ALLOWED;
  }
}

/**
 * Adds one exchange's estimated cost to the day's total. Called after the
 * stream finishes, when the real token counts are known. Never throws: a lost
 * increment is worth less than a failed response.
 */
export async function recordSpend(usage: TokenUsage): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  const usd =
    ((usage.input_tokens ?? 0) * PRICE_PER_MTOK.input +
      (usage.output_tokens ?? 0) * PRICE_PER_MTOK.output +
      (usage.cache_creation_input_tokens ?? 0) * PRICE_PER_MTOK.cacheWrite +
      (usage.cache_read_input_tokens ?? 0) * PRICE_PER_MTOK.cacheRead) /
    1_000_000;

  // Stored as integer tenths of a cent: Redis INCRBY is integer-only, and
  // rounding up means the breaker can never drift low across a busy day.
  const tenths = Math.ceil(usd * 1000);
  if (tenths <= 0) return;

  try {
    const total = await redis.incrby(spendKey(), tenths);
    if (total === tenths) await redis.expire(spendKey(), COUNTER_TTL_SECONDS);
  } catch (error) {
    console.error("[chat] recording spend failed:", error);
  }
}

/* ============================================
   Follow-up suggestions

   One call per answer, so the per-IP limits on /api/chat already bound the
   honest path. This limiter exists for the dishonest one: the route is a
   model call anyone can POST to directly. Set a little above the chat's own
   burst limit, so a fast conversation never trips it.

   There is no daily-breaker check here on purpose. A suggestion call only
   follows an answer that already passed the breaker, its spend lands in the
   same day counter, and the failure mode is chips that quietly stop
   appearing — the answer itself is what the budget protects.
   ============================================ */

const followupLimiter = (redis: Redis) =>
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(15, "60 s"),
    prefix: "chat:rl:followups",
    analytics: false,
  });

/** Per-IP limit for the follow-ups route. Fail-open, like every guardrail. */
export async function checkFollowupLimit(request: Request): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return true;
  try {
    const { success } = await followupLimiter(redis).limit(visitorKey(request));
    return success;
  } catch (error) {
    console.error("[chat] follow-up limit check failed, allowing:", error);
    return true;
  }
}

/* ============================================
   Exchange log

   One line per exchange: what was asked, what came back, and the numbers
   (tokens, cache, latency). This is the ground truth the eval's golden set
   grows from — questions not logged in week one are gone — and the site
   discloses it: 30-day retention, stated in the widget's disclaimer and on
   /contact. The visitor field is the salted hash above, never an address.
   ============================================ */

export interface ExchangeLog {
  /** Minted per request by the route and streamed to the client, so a
      feedback verdict can be joined back to this line. */
  id: string;
  question: string;
  answer: string;
  path: string | null;
  usage?: TokenUsage;
  /** Milliseconds from request to the stream closing. */
  latencyMs: number;
  /** Milliseconds to the first response text — what the visitor feels. */
  firstTextMs: number | null;
  /** True when the answer is a guardrail notice, not a model response. */
  notice: boolean;
  visitor: string;
}

const LOG_TTL_SECONDS = 60 * 60 * 24 * 30;
const logKey = () => `chat:log:${dayKey()}`;

/** Appends one exchange to the day's log. Never throws; a lost log line is
    worth less than a failed response. */
export async function recordExchange(entry: ExchangeLog): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  try {
    const line = JSON.stringify({ at: new Date().toISOString(), ...entry });
    const length = await redis.rpush(logKey(), line);
    // The whole day's list expires together, 30 days after its first line.
    if (length === 1) await redis.expire(logKey(), LOG_TTL_SECONDS);
  } catch (error) {
    console.error("[chat] recording exchange failed:", error);
  }
}

/* ============================================
   Feedback

   One key per exchange id, so a verdict is idempotent and switchable: tap
   thumbs down after thumbs up and the later write simply wins. The TTL
   matches the exchange log, because a verdict outliving the line it rates
   is noise. Joining `chat:feedback:*` against the day logs is what turns a
   dislike into a golden-set candidate for the eval.
   ============================================ */

export type FeedbackVerdict = "up" | "down";

const feedbackKey = (id: string) => `chat:feedback:${id}`;

const feedbackLimiter = (redis: Redis) =>
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "60 s"),
    prefix: "chat:rl:feedback",
    analytics: false,
  });

/** Per-IP limit for the feedback route. Fail-open, like every guardrail. */
export async function checkFeedbackLimit(request: Request): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return true;
  try {
    const { success } = await feedbackLimiter(redis).limit(visitorKey(request));
    return success;
  } catch (error) {
    console.error("[chat] feedback limit check failed, allowing:", error);
    return true;
  }
}

/** Stores one verdict per exchange id, last write wins. Never throws. */
export async function recordFeedback(
  id: string,
  verdict: FeedbackVerdict,
  visitor: string
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  try {
    await redis.set(
      feedbackKey(id),
      JSON.stringify({ at: new Date().toISOString(), verdict, visitor }),
      { ex: LOG_TTL_SECONDS }
    );
  } catch (error) {
    console.error("[chat] recording feedback failed:", error);
  }
}
