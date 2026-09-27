/**
 * Conversation starters, keyed to where the visitor is standing. A new chat
 * opened on the about page should not ask the same three questions as one
 * opened on a blueprint page — the starter is the widget's first guess at
 * why someone opened it here.
 *
 * Each route holds a pool of pre-written questions, and a seeded pick draws
 * three of them. The seed lives in the chat provider: rolled once per page
 * load and again on "New chat", so a refresh or a fresh conversation shows a
 * different mix while re-renders and client-side navigation never reshuffle
 * under the visitor. Pre-written on purpose — the variety is theatre, not
 * tokens: no model is asked for any of these.
 *
 * Every label follows one pattern: a single crisp question with no filler,
 * or a bare imperative (Summarise, Explain, Describe, Walk me through).
 *
 * The route also travels to the model as page context (see the sanitised
 * `path` in /api/chat), which is what lets a starter say "this page" or
 * "this case study" and resolve.
 *
 * Every label here has to fit on one chip: the budget is SUGGESTION_MAX_CHARS
 * and `scripts/validate-chat-starters.mjs` holds the written ones to it. The
 * item starters below name the thing the visitor is looking at, so their
 * length depends on runtime data — those fall back to the unnamed wording
 * rather than overflowing.
 */
import { fitsChip } from "@/lib/chat-suggestions";

export interface Starter {
  id: string;
  label: string;
}

/** How many chips the welcome screen shows, drawn from the pools below. */
export const STARTER_COUNT = 3;

/** The named wording when it fits the chip, the unnamed one when it does not. */
const named = (withName: string, without: string): string =>
  fitsChip(withName) ? withName : without;

/* FNV-1a over the pathname, so each page draws a different slice of the
   load's seed — two pages seen in one visit should not echo each other. */
function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/* mulberry32 — a tiny deterministic PRNG. Deterministic matters more than
   quality here: the same (seed, page) must pick the same chips on every
   render, or the set would churn as the visitor types. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Draw STARTER_COUNT starters from a pool, deterministically for a given
 * (seed, key) pair. A null seed returns the head of the pool unshuffled —
 * the pools lead with their strongest questions, so callers without a seed
 * (and the server, if one ever renders this) get the curated order.
 */
function pickStarters(pool: Starter[], seed: number | null, key: string): Starter[] {
  if (pool.length <= STARTER_COUNT) return pool;
  if (seed === null) return pool.slice(0, STARTER_COUNT);
  const rand = mulberry32(hashString(key) ^ Math.floor(seed * 0xffffffff));
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, STARTER_COUNT);
}

const DEFAULT_STARTERS: Starter[] = [
  { id: "philosophy", label: "Describe Rob's design philosophy" },
  { id: "system", label: "How was this site built?" },
  { id: "site", label: "What is this site?" },
  { id: "claude", label: "How was this built with Claude?" },
  { id: "start", label: "Where should I start?" },
  { id: "reach", label: "How do I contact Rob?" },
  { id: "role", label: "What does Rob do?" },
];

/** Longest-prefix wins, so /work/meta-offers beats /work. */
const STARTERS_BY_PREFIX: Array<[string, Starter[]]> = [
  ["/about", [
    { id: "career", label: "Summarise Rob's career" },
    { id: "intuit", label: "What did Rob build at Intuit?" },
    { id: "reach", label: "How do I contact Rob?" },
    { id: "worked", label: "Where has Rob worked?" },
    { id: "now", label: "What is Rob working on now?" },
    { id: "philosophy", label: "Describe Rob's design philosophy" },
    { id: "consult", label: "Does Rob take consulting work?" },
    { id: "role", label: "What does Rob do?" },
  ]],
  ["/contact", [
    { id: "channels", label: "How do I reach Rob?" },
    { id: "consult", label: "Does Rob take consulting work?" },
    { id: "follow", label: "Where can I follow Rob's writing?" },
    { id: "consult-how", label: "How does the consultation work?" },
    { id: "consult-what", label: "What does a consultation cover?" },
    { id: "online", label: "Where else is Rob online?" },
    { id: "career", label: "Summarise Rob's career" },
  ]],
  ["/work", [
    { id: "first", label: "Which case study should I read?" },
    { id: "ai-work", label: "What has Rob built with AI?" },
      { id: "kinds", label: "What projects are these?" },
    { id: "intuit", label: "What did Rob build at Intuit?" },
    { id: "impact", label: "Which project had the most impact?" },
    { id: "role", label: "What was Rob's role on these?" },
    { id: "career", label: "Summarise Rob's career" },
  ]],
  ["/writing", [
    { id: "topics", label: "What does Rob write about?" },
    { id: "start", label: "Which essay should I read?" },
    { id: "philosophy", label: "Describe Rob's design philosophy" },
    { id: "latest", label: "What's the latest essay?" },
    { id: "themes", label: "What themes run through the essays?" },
    { id: "subscribe", label: "Where can I subscribe?" },
    { id: "ai-writing", label: "What does Rob say about AI?" },
  ]],
  ["/design-system", [
    { id: "why", label: "Why build a design system?" },
    { id: "story", label: "How was it built?" },
    { id: "proved", label: "What did it prove?" },
    { id: "where", label: "Where can I see it?" },
    { id: "claude", label: "How was this built with Claude?" },
    { id: "casestudy", label: "Read the full story" },
  ]],
];

/**
 * Item pages get item-aware starter pools. The route already travels to the
 * model as page context, so "this essay" resolves; when the nav registry
 * knows the item's label (case studies, components — essays' titles are
 * runtime feed data and too long for a pill anyway), one starter names it.
 */
function itemStarterPool(pathname: string, itemLabel?: string | null): Starter[] | null {
  if (/^\/writing\/[^/]+$/.test(pathname)) {
    return [
      { id: "argument", label: "What's the core argument?" },
      { id: "summary", label: "Summarise this essay" },
      { id: "connect", label: "How does this connect to Rob's work?" },
      { id: "prompted", label: "What prompted this essay?" },
      { id: "claim", label: "What's the strongest claim?" },
      { id: "next", label: "What should I read next?" },
    ];
  }
  if (/^\/work\/[^/]+$/.test(pathname)) {
    return [
      {
        id: "walkthrough",
        label: itemLabel
          ? named(`Walk me through ${itemLabel}`, "Walk me through this case study")
          : "Walk me through this case study",
      },
      { id: "role", label: "What was Rob's role?" },
      { id: "results", label: "What results did it ship?" },
      { id: "hardest", label: "What was the hardest problem?" },
      { id: "start", label: "How did the project start?" },
      { id: "ai", label: "How does AI feature here?" },
    ];
  }
  if (/^\/components\/[^/]+$/.test(pathname)) {
    return [
      {
        id: "use",
        label: itemLabel
          ? named(`How do I use the ${itemLabel} component?`, "How do I use this component?")
          : "How do I use this component?",
      },
      { id: "tokens", label: "Which tokens does it use?" },
      { id: "props", label: "What props does it take?" },
      { id: "client", label: "Is it a client component?" },
      { id: "dark", label: "How does it look in dark mode?" },
      { id: "install", label: "How do I install the system?" },
    ];
  }
  if (/^\/foundations\/[^/]+$/.test(pathname)) {
    return [
      {
        id: "this-foundation",
        label: itemLabel
          ? named(
              `Explain how ${itemLabel.toLowerCase()} works here`,
              "Explain this part of the system"
            )
          : "Explain this part of the system",
      },
      { id: "tokens", label: "Explain the token architecture" },
      { id: "teal", label: "Why is teal reserved for actions?" },
      { id: "semantic", label: "What are semantic tokens?" },
      { id: "override", label: "How do I override the theme?" },
      { id: "dark", label: "How does dark mode work?" },
    ];
  }
  return null;
}

/**
 * The welcome screen's chips for a page. `seed` is the provider's per-load
 * draw (rolled again by "New chat"); the same (pathname, seed) always
 * returns the same set, so re-renders and navigation never reshuffle a set
 * the visitor is looking at.
 */
export function startersForPath(
  pathname: string | null,
  itemLabel?: string | null,
  seed: number | null = null
): Starter[] {
  if (!pathname) return pickStarters(DEFAULT_STARTERS, seed, "");

  const item = itemStarterPool(pathname, itemLabel);
  if (item) return pickStarters(item, seed, pathname);

  let best: Starter[] | null = null;
  let bestLength = 0;
  for (const [prefix, starters] of STARTERS_BY_PREFIX) {
    if (pathname.startsWith(prefix) && prefix.length > bestLength) {
      best = starters;
      bestLength = prefix.length;
    }
  }
  return pickStarters(best ?? DEFAULT_STARTERS, seed, pathname);
}
