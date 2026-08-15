/**
 * Reads the site-chat exchange log out of Redis and prints it.
 *
 * Read-only, deliberately outside the build, and never part of `verify`: this
 * is an ops tool for reading what visitors asked, not a check. It prefers
 * KV_REST_API_READ_ONLY_TOKEN so a typo here can never write to the store.
 *
 * The log holds 30 days (the TTL in the chat's guardrails), one Redis list per
 * UTC day. Lines are grouped by `source` — `visitor`, `self`, `dev` — because
 * the interesting question is what strangers ask, and local testing otherwise
 * dominates the totals. Lines written before that field existed print as
 * `unknown`.
 *
 *   node scripts/chat-log.mjs                 # summary, visitors only
 *   node scripts/chat-log.mjs --all           # include self and dev
 *   node scripts/chat-log.mjs --full          # full questions and answers
 *   node scripts/chat-log.mjs --json          # the raw lines
 *   node scripts/chat-log.mjs --since 2026-08-12
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();

const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const value = (flag) => {
  const i = args.indexOf(flag);
  return i === -1 ? null : args[i + 1];
};

const SHOW_ALL = has("--all");
const FULL = has("--full");
const AS_JSON = has("--json");
const SINCE = value("--since");

/* ---------- credentials ---------- */

function loadEnv() {
  const path = join(ROOT, "website", ".env.local");
  let raw;
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    return process.env;
  }
  const parsed = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const i = trimmed.indexOf("=");
    parsed[trimmed.slice(0, i).trim()] = trimmed
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  return { ...parsed, ...process.env };
}

const env = loadEnv();
const URL_ = env.KV_REST_API_URL;
const TOKEN = env.KV_REST_API_READ_ONLY_TOKEN || env.KV_REST_API_TOKEN;

if (!URL_ || !TOKEN) {
  console.error("KV_REST_API_URL / KV_REST_API_(READ_ONLY_)TOKEN not found in website/.env.local or the environment.");
  process.exit(1);
}

async function redis(command) {
  const response = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  const body = await response.json();
  if (body.error) throw new Error(`redis ${command[0]}: ${body.error}`);
  return body.result;
}

/* ---------- read ---------- */

const keys = [];
let cursor = "0";
do {
  const [next, batch] = await redis(["SCAN", cursor, "MATCH", "chat:log:*", "COUNT", "500"]);
  cursor = next;
  keys.push(...batch);
} while (cursor !== "0");

const days = keys.sort().filter((key) => !SINCE || key.slice("chat:log:".length) >= SINCE);

const exchanges = [];
for (const key of days) {
  for (const line of await redis(["LRANGE", key, "0", "-1"])) {
    try {
      exchanges.push(JSON.parse(line));
    } catch {
      /* A malformed line is a bug worth seeing, not a crash worth having. */
      exchanges.push({ at: key.slice("chat:log:".length), question: "(unparseable line)", raw: line });
    }
  }
}
exchanges.sort((a, b) => String(a.at).localeCompare(String(b.at)));

/* Feedback lives one key per exchange id; join it on. */
const feedback = {};
let fbCursor = "0";
do {
  const [next, batch] = await redis(["SCAN", fbCursor, "MATCH", "chat:feedback:*", "COUNT", "500"]);
  fbCursor = next;
  for (const key of batch) {
    const stored = await redis(["GET", key]);
    try {
      feedback[key.slice("chat:feedback:".length)] =
        typeof stored === "string" ? JSON.parse(stored) : stored;
    } catch {
      feedback[key.slice("chat:feedback:".length)] = { verdict: String(stored) };
    }
  }
} while (fbCursor !== "0");

if (AS_JSON) {
  console.log(JSON.stringify({ exchanges, feedback }, null, 2));
  process.exit(0);
}

/* ---------- report ---------- */

const sourceOf = (entry) => entry.source ?? "unknown";
const shown = SHOW_ALL ? exchanges : exchanges.filter((entry) => sourceOf(entry) === "visitor");

const bySource = {};
for (const entry of exchanges) {
  const key = sourceOf(entry);
  bySource[key] ??= { total: 0, notices: 0 };
  bySource[key].total += 1;
  if (entry.notice) bySource[key].notices += 1;
}

const range = days.length
  ? `${days[0].slice("chat:log:".length)} → ${days.at(-1).slice("chat:log:".length)}`
  : "no days retained";

console.log(`\nSite chat log — ${exchanges.length} exchanges, ${range}\n`);
for (const [key, stats] of Object.entries(bySource).sort((a, b) => b[1].total - a[1].total)) {
  console.log(`  ${key.padEnd(8)} ${String(stats.total).padStart(4)}  (${stats.notices} guardrail notices)`);
}

const verdicts = Object.values(feedback);
const up = verdicts.filter((entry) => entry.verdict === "up").length;
console.log(`\n  feedback ${verdicts.length} verdicts — ${up} up, ${verdicts.length - up} down`);

console.log(`\n${SHOW_ALL ? "All exchanges" : "Visitor exchanges"} (${shown.length}):\n`);
for (const entry of shown) {
  const verdict = feedback[entry.id]?.verdict;
  const tags = [
    entry.notice ? "NOTICE" : null,
    SHOW_ALL ? sourceOf(entry) : null,
    verdict ? `thumbs-${verdict}` : null,
    entry.path ?? null,
  ]
    .filter(Boolean)
    .join(" · ");

  const question = String(entry.question ?? "").replace(/\s+/g, " ");
  const answer = String(entry.answer ?? "").replace(/\s+/g, " ");
  const clip = (text, max) => (text.length > max ? `${text.slice(0, max)}…` : text);

  console.log(`${String(entry.at).slice(0, 19).replace("T", " ")}  ${tags}`);
  console.log(`  Q  ${FULL ? question : clip(question, 100)}`);
  console.log(`  A  ${FULL ? answer : clip(answer, 160)}\n`);
}
