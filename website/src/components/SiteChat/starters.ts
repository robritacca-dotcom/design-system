/**
 * Conversation starters, keyed to where the visitor is standing. A new chat
 * opened on the about page should not ask the same three questions as one
 * opened on a blueprint page — the starter is the widget's first guess at
 * why someone opened it here.
 *
 * The route also travels to the model as page context (see the sanitised
 * `path` in /api/chat), which is what lets a starter say "this page" or
 * "this case study" and resolve.
 */
export interface Starter {
  id: string;
  label: string;
}

const DEFAULT_STARTERS: Starter[] = [
  { id: "philosophy", label: "Describe Rob's design philosophy" },
  { id: "recent", label: "What has Rob shipped recently?" },
  { id: "system", label: "How does this design system work?" },
];

/** Longest-prefix wins, so /work/meta-offers beats /work. */
const STARTERS_BY_PREFIX: Array<[string, Starter[]]> = [
  ["/about", [
    { id: "career", label: "Give me a two-minute summary of Rob's career" },
    { id: "intuit", label: "What did Rob build at Intuit?" },
    { id: "reach", label: "How do I get in touch with Rob?" },
  ]],
  ["/contact", [
    { id: "channels", label: "What's the best way to reach Rob?" },
    { id: "consult", label: "Does Rob take consulting work?" },
    { id: "follow", label: "Where can I follow his writing?" },
  ]],
  ["/work", [
    { id: "first", label: "Which case study should I read first?" },
    { id: "ai-work", label: "What has Rob built with AI?" },
    { id: "recent", label: "What has Rob shipped recently?" },
  ]],
  ["/writing", [
    { id: "topics", label: "What does Rob write about?" },
    { id: "start", label: "Which essay should I start with?" },
    { id: "philosophy", label: "Describe Rob's design philosophy" },
  ]],
  ["/components", [
    { id: "organised", label: "How are the components organised?" },
    { id: "install", label: "How do I install the design system?" },
    { id: "different", label: "What makes this system different?" },
  ]],
  ["/foundations", [
    { id: "tokens", label: "Explain the token architecture" },
    { id: "dark", label: "How does dark mode work here?" },
    { id: "teal", label: "Why is teal reserved for actions?" },
  ]],
  ["/blueprints", [
    { id: "this-spec", label: "What does this spec govern?" },
    { id: "maintain", label: "How does the system maintain itself?" },
    { id: "claude", label: "How was this built with Claude?" },
  ]],
  ["/overview", [
    { id: "pipeline", label: "Explain the build pipeline" },
    { id: "registries", label: "What do the registries prevent?" },
    { id: "claude", label: "How was this built with Claude?" },
  ]],
  ["/docs", [
    { id: "start", label: "How do I get started with the system?" },
    { id: "maintain", label: "How does it keep its docs honest?" },
    { id: "install", label: "How do I install the package?" },
  ]],
  ["/skills", [
    { id: "skills", label: "What are the agent skills?" },
    { id: "loops", label: "What runs on a schedule here?" },
    { id: "claude", label: "How was this built with Claude?" },
  ]],
  ["/loops", [
    { id: "loops", label: "What do the recurring loops do?" },
    { id: "growth", label: "How does the growth loop work?" },
    { id: "journal", label: "Who writes the project journal?" },
  ]],
  ["/project-journal", [
    { id: "latest", label: "What changed on this site recently?" },
    { id: "story", label: "How did this design system get built?" },
    { id: "loops", label: "What runs on a schedule here?" },
  ]],
  ["/playground", [
    { id: "retheme", label: "How does re-theming work?" },
    { id: "tokens", label: "Explain the token architecture" },
    { id: "install", label: "How do I install the design system?" },
  ]],
  ["/design-system", [
    { id: "nutshell", label: "What is this design system, in a nutshell?" },
    { id: "install", label: "How do I install it?" },
    { id: "different", label: "What makes it different?" },
  ]],
];

/**
 * Item pages get item-aware starters. The route already travels to the model
 * as page context, so "this essay" resolves; when the nav registry knows the
 * item's label (case studies, components — essays' titles are runtime feed
 * data and too long for a pill anyway), the first starter names it.
 */
function itemStarters(pathname: string, itemLabel?: string | null): Starter[] | null {
  if (/^\/writing\/[^/]+$/.test(pathname)) {
    return [
      { id: "argument", label: "What's the core argument of this essay?" },
      { id: "summary", label: "Summarise this essay in three points" },
      { id: "connect", label: "How does this connect to Rob's work?" },
    ];
  }
  if (/^\/work\/[^/]+$/.test(pathname)) {
    return [
      {
        id: "walkthrough",
        label: itemLabel ? `Walk me through ${itemLabel}` : "Walk me through this case study",
      },
      { id: "role", label: "What was Rob's role in this project?" },
      { id: "results", label: "What results did it ship?" },
    ];
  }
  if (/^\/components\/[^/]+$/.test(pathname)) {
    return [
      {
        id: "use",
        label: itemLabel
          ? `How do I use the ${itemLabel} component?`
          : "How do I use this component?",
      },
      { id: "tokens", label: "Which tokens does it use?" },
      { id: "install", label: "How do I install the design system?" },
    ];
  }
  if (/^\/foundations\/[^/]+$/.test(pathname)) {
    return [
      {
        id: "this-foundation",
        label: itemLabel ? `Explain how ${itemLabel.toLowerCase()} works here` : "Explain this part of the system",
      },
      { id: "tokens", label: "Explain the token architecture" },
      { id: "teal", label: "Why is teal reserved for actions?" },
    ];
  }
  return null;
}

export function startersForPath(pathname: string | null, itemLabel?: string | null): Starter[] {
  if (!pathname) return DEFAULT_STARTERS;

  const item = itemStarters(pathname, itemLabel);
  if (item) return item;

  let best: Starter[] | null = null;
  let bestLength = 0;
  for (const [prefix, starters] of STARTERS_BY_PREFIX) {
    if (pathname.startsWith(prefix) && prefix.length > bestLength) {
      best = starters;
      bestLength = prefix.length;
    }
  }
  return best ?? DEFAULT_STARTERS;
}
