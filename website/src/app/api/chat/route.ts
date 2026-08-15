/**
 * POST /api/chat — the chat widget's backend.
 *
 * Streams newline-delimited JSON, one `ChatEvent` per line, in the same shape
 * the sim transport produces. The event type is imported from useChat so the
 * server is type-checked against the contract the client consumes.
 *
 * Two rules shape the error handling, both from how useChat renders events:
 *
 *   - Guardrail outcomes are 200 plus a `notice`, never a non-2xx. A notice
 *     renders as an ordinary assistant message, which is what makes a rate
 *     limit or a paused budget read as a reply rather than a broken widget.
 *     Non-2xx is reserved for malformed requests.
 *
 *   - An `error` event REPLACES any text already streamed. So `error` is only
 *     ever emitted before the first delta. Once text is flowing, a failure
 *     ends the turn with `done` and the partial answer stands, which matches
 *     how the hook treats an aborted stream.
 *
 * The stream always terminates. An unterminated stream leaves the widget
 * spinning with no way back.
 */
import Anthropic from "@anthropic-ai/sdk";

import { siteCorpus } from "@/data/site-corpus.generated";
import type { ChatEvent, ChatTransportMessage } from "@/hooks/useChat";
import { CHAT_MODEL, modelLabel } from "@/lib/chat-model";

import { EASTER_EGGS } from "./easter-eggs";
import {
  checkGuardrails,
  exchangeSource,
  recordExchange,
  recordSpend,
  visitorKey,
} from "./guardrails";
import { PERSONA } from "./persona";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

// The model constant lives in @/lib/chat-model, shared with the composer's
// label — one home, so the label can never drift from what actually runs.
const MODEL = CHAT_MODEL;

/** Caps thinking and response text together, so leave room for both. */
const MAX_TOKENS = 3000;

/**
 * Measured, not assumed: with this corpus in the system prompt, adaptive
 * thinking does not engage. Ten runs across low, medium and high effort, on
 * lookup, synthesis, judgement and comparison questions, produced zero
 * thinking blocks. A persona nudge asking the model to work the answer out
 * first changed nothing. The same request with no system prompt and a genuine
 * multi-step problem does think, so the wiring is sound: the model is simply
 * right that reading an answer out of supplied context needs no reasoning.
 *
 * Effort is therefore a cost and latency dial here, not a reasoning dial, so
 * it sits at the cheap end. The thinking-to-trace-point mapping below stays in
 * place and fires correctly on the rare question that does provoke reasoning.
 */
const EFFORT = "low";

/** Turns kept from the client's history. Older context is dropped server-side. */
const MAX_TURNS = 10;

/** Longest single message accepted, in characters. */
const MAX_MESSAGE_CHARS = 4000;

/** Trace points shown under the status label before the rest is dropped. */
const MAX_TRACE_POINTS = 8;

const NDJSON_HEADERS = {
  "Content-Type": "application/x-ndjson; charset=utf-8",
  "Cache-Control": "no-store",
  // Proxies that buffer by default would hold the whole reply and destroy the
  // streaming choreography this widget exists to demonstrate.
  "X-Accel-Buffering": "no",
} as const;

const encoder = new TextEncoder();
const serialise = (event: ChatEvent) => encoder.encode(`${JSON.stringify(event)}\n`);

/** A complete response made of known events, for the paths that never call the model. */
function ndjson(...events: ChatEvent[]): Response {
  return new Response(events.map((event) => `${JSON.stringify(event)}\n`).join(""), {
    headers: NDJSON_HEADERS,
  });
}

/* ============================================
   Request validation
   ============================================ */

type ParsedBody =
  | { ok: true; messages: ChatTransportMessage[]; path: string | null }
  | { ok: false; status: number; reason: string };

/**
 * The visitor's current page, sanitised as untrusted input. A crafted URL
 * would otherwise be visitor-controlled text landing in a system block — a
 * stronger position than the user turn the persona already defends. The
 * charset does the guarding: lowercase slug segments only, no spaces, no
 * uppercase, no punctuation beyond `/` and `-`, capped short. Nothing
 * expressible in that alphabet can carry an instruction. A junk-but-clean
 * path ("/nonexistent") is inert: the model is told a page name, not given
 * a command. Anything else is dropped, never rejected — page context is a
 * nicety, not a requirement.
 */
function sanitisePath(path: unknown): string | null {
  if (typeof path !== "string") return null;
  if (path === "/") return "/";
  return /^\/[a-z0-9-]+(?:\/[a-z0-9-]+){0,3}$/.test(path) && path.length <= 64 ? path : null;
}

function parseBody(payload: unknown): ParsedBody {
  if (typeof payload !== "object" || payload === null) {
    return { ok: false, status: 400, reason: "body must be an object" };
  }

  const { messages, path } = payload as { messages?: unknown; path?: unknown };
  if (!Array.isArray(messages) || messages.length === 0) {
    return { ok: false, status: 400, reason: "messages must be a non-empty array" };
  }

  const parsed: ChatTransportMessage[] = [];
  for (const entry of messages) {
    if (typeof entry !== "object" || entry === null) {
      return { ok: false, status: 400, reason: "each message must be an object" };
    }
    const { role, content } = entry as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") {
      return { ok: false, status: 400, reason: "role must be 'user' or 'assistant'" };
    }
    if (typeof content !== "string") {
      return { ok: false, status: 400, reason: "content must be a string" };
    }
    if (content.trim()) parsed.push({ role, content });
  }

  if (parsed.length === 0) {
    return { ok: false, status: 400, reason: "no messages with content" };
  }

  // Anthropic requires the conversation to start with a user turn; dropping
  // old turns can leave an assistant one first.
  const trimmed = parsed.slice(-MAX_TURNS);
  while (trimmed.length > 0 && trimmed[0].role === "assistant") trimmed.shift();
  if (trimmed.length === 0) {
    return { ok: false, status: 400, reason: "no user message in the recent turns" };
  }

  return { ok: true, messages: trimmed, path: sanitisePath(path) };
}

/* ============================================
   Live reasoning

   Summarized thinking arrives as prose. Each finished sentence becomes one
   trace point under the AgentStatus label, which is what the Reasoning
   component renders while the response is still being composed.
   ============================================ */

/** Strips markdown emphasis and bounds the length so one point stays one line. */
function cleanPoint(text: string): string {
  const flat = text.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
  if (flat.length <= 200) return flat;
  const cut = flat.slice(0, 200);
  return `${cut.slice(0, cut.lastIndexOf(" ")) || cut}…`;
}

function createReasoningBuffer(emit: (point: string) => void) {
  let buffer = "";
  let emitted = 0;

  const flush = (final: boolean) => {
    if (emitted >= MAX_TRACE_POINTS) {
      buffer = "";
      return;
    }
    const sentences = buffer.split(/(?<=[.!?])\s+/);
    // The trailing fragment is usually mid-sentence, so hold it until either
    // more text arrives or the thinking block closes.
    buffer = final ? "" : (sentences.pop() ?? "");

    for (const sentence of sentences) {
      if (emitted >= MAX_TRACE_POINTS) break;
      const point = cleanPoint(sentence);
      if (point.length < 12) continue;
      emit(point);
      emitted += 1;
    }
  };

  return {
    push(text: string) {
      buffer += text;
      flush(false);
    },
    close() {
      flush(true);
    },
  };
}

/* ============================================
   Handler
   ============================================ */

export async function POST(request: Request): Promise<Response> {
  // Off switch first, before any parsing or network. The route deploys ahead
  // of its environment variables on purpose, so an unconfigured deploy has to
  // answer politely rather than throw.
  if (process.env.CHAT_ENABLED !== "true" || !process.env.ANTHROPIC_API_KEY) {
    return ndjson(
      {
        type: "notice",
        text: "This chat is switched off at the moment. The case studies cover most of what people ask, and /contact reaches Rob directly.",
      },
      { type: "done" }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "invalid JSON" }, { status: 400 });
  }

  const parsed = parseBody(payload);
  if (!parsed.ok) {
    return Response.json({ error: parsed.reason }, { status: parsed.status });
  }

  const latest = parsed.messages[parsed.messages.length - 1];
  if (latest.content.length > MAX_MESSAGE_CHARS) {
    return ndjson(
      {
        type: "notice",
        text: "That message is longer than this chat can take. Trim it to the essentials and send it again.",
      },
      { type: "done" }
    );
  }

  const startedAt = Date.now();
  const visitor = visitorKey(request);
  const source = exchangeSource(request);
  const question = latest.content;
  /* The exchange's log id. Minted before the guardrails so every logged
     line carries one, streamed to the client (model path only) so the
     thumbs buttons can reference the line they are rating. */
  const exchangeId = crypto.randomUUID();

  const verdict = await checkGuardrails(request);
  if (!verdict.allowed) {
    // Guardrail notices are logged too: how often the limits fire, and what
    // people were asking when they did, is exactly what tunes the caps.
    void recordExchange({
      id: exchangeId,
      question,
      answer: verdict.notice,
      path: parsed.path,
      latencyMs: Date.now() - startedAt,
      firstTextMs: null,
      notice: true,
      visitor,
      source,
    });
    return ndjson({ type: "notice", text: verdict.notice }, { type: "done" });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // Client disconnect and stream cancellation both abort the upstream call, so
  // a visitor closing the tab stops the tokens being billed.
  const upstream = new AbortController();
  request.signal.addEventListener("abort", () => upstream.abort());

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: ChatEvent) => {
        if (closed) return;
        try {
          controller.enqueue(serialise(event));
        } catch {
          closed = true;
        }
      };

      let streamedText = false;
      let answerText = "";
      let noticeText: string | null = null;
      let firstTextMs: number | null = null;

      try {
        // First line out. It proves the stream opened, which is what clears
        // the client's first-byte watchdog, and it replaces the hook's default
        // label with one that is true.
        send({ type: "status", label: "Reading the site" });
        // Which model is serving, for the composer's label. Derived from
        // MODEL (not the shared constant) and sent per exchange, so a
        // future per-request model choice (a budget tier, an A/B) reaches
        // the label with no client change.
        send({ type: "model", label: modelLabel(MODEL) });

        const reasoning = createReasoningBuffer((point) =>
          send({ type: "status", label: "Thinking", point })
        );

        const stream = client.messages.stream(
          {
            model: MODEL,
            max_tokens: MAX_TOKENS,
            thinking: { type: "adaptive", display: "summarized" },
            output_config: { effort: EFFORT },
            system: [
              { type: "text", text: PERSONA },
              { type: "text", text: EASTER_EGGS },
              // The cache breakpoint sits on this block, so the persona and
              // easter eggs cache together with the corpus. Nothing volatile
              // may precede it. The 1-hour TTL matches how visitors actually
              // arrive: most gaps between exchanges are 10-50 minutes, which
              // the default 5-minute cache never survives — so nearly every
              // visitor was paying a full corpus rewrite. Writes cost 2x
              // instead of 1.25x, but there are far fewer of them; the
              // guardrails price table must agree (cacheWrite = 2x input).
              {
                type: "text",
                text: siteCorpus,
                cache_control: { type: "ephemeral", ttl: "1h" },
              },
              // Page context rides AFTER the breakpoint: it changes per
              // request, and a trailing uncached block leaves the cached
              // prefix untouched. The path is sanitised to a slug charset
              // in parseBody — see sanitisePath for why that is the guard.
              ...(parsed.path
                ? [
                    {
                      type: "text" as const,
                      text: `The visitor is currently on the page ${parsed.path} of the site.`,
                    },
                  ]
                : []),
            ],
            messages: parsed.messages,
          },
          { signal: upstream.signal }
        );

        for await (const event of stream) {
          if (upstream.signal.aborted) break;
          if (event.type !== "content_block_delta") continue;

          if (event.delta.type === "text_delta") {
            if (!streamedText) {
              reasoning.close();
              streamedText = true;
              firstTextMs = Date.now() - startedAt;
            }
            answerText += event.delta.text;
            send({ type: "delta", text: event.delta.text });
          } else if (event.delta.type === "thinking_delta") {
            reasoning.push(event.delta.thinking);
          }
        }

        const final = await stream.finalMessage();

        if (final.stop_reason === "refusal" && !streamedText) {
          noticeText =
            "That one is outside what this chat covers. Ask about Rob's work, the case studies, or the design system and it can help.";
          send({ type: "notice", text: noticeText });
        } else if (final.stop_reason === "max_tokens") {
          send({ type: "delta", text: "\n\n(Cut off at the length limit.)" });
        }

        // Real token counts, so the daily breaker tracks actual spend.
        await recordSpend(final.usage);
        // The exchange log: the ground truth the golden set grows from.
        await recordExchange({
          id: exchangeId,
          question,
          answer: noticeText ?? answerText,
          path: parsed.path,
          usage: final.usage,
          latencyMs: Date.now() - startedAt,
          firstTextMs,
          notice: noticeText !== null,
          visitor,
          source,
        });
        // After the log line exists, so a verdict can never dangle. Not sent
        // on the guardrail path: thumbs on a rate-limit notice rate the
        // guardrail copy, not an answer.
        send({ type: "exchange", id: exchangeId });
      } catch (error) {
        const aborted =
          upstream.signal.aborted ||
          (error instanceof Error && error.name === "AbortError");

        if (!aborted && !streamedText) {
          console.error("[chat] upstream failed before any text:", error);
          send({ type: "error", message: friendlyError(error) });
        } else if (!aborted) {
          // Text is already on screen; an error event would erase it.
          console.error("[chat] upstream failed mid-stream, keeping the partial:", error);
        }
      } finally {
        send({ type: "done" });
        if (!closed) {
          try {
            controller.close();
          } catch {
            /* already closed by a client disconnect */
          }
        }
      }
    },

    cancel() {
      upstream.abort();
    },
  });

  return new Response(body, { headers: NDJSON_HEADERS });
}

/** Maps an upstream failure to something a visitor can act on. */
function friendlyError(error: unknown): string {
  const status = (error as { status?: number })?.status;

  if (status === 429 || status === 529) {
    return "The model is busy right now. Give it a moment and ask again.";
  }
  if (status === 401 || status === 403) {
    return "This chat is not configured correctly at the moment. The contact page at /contact still works.";
  }
  return "Something went wrong reaching the model. Try that again, or use /contact if it keeps happening.";
}
