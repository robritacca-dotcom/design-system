/* ============================================
   Follow-up suggestions: the written fallbacks.

   The follow-ups themselves are the widget's job now. The rift-ds
   ChatProvider asks /api/chat/followups once after an assistant turn
   commits, attaches what comes back to that turn, and drops a slow request
   rather than block on it. What stays here is the one part that is this
   site's copy rather than the widget's mechanics.

   Every failure is silent, but never empty-handed. The pending row promises
   chips — a shimmer that resolves to nothing reads as a failure — so a
   request that comes back with no usable suggestions falls back to the
   written pool below rather than collapsing. SiteChatProvider hands the pool
   to the provider as `fallbackFollowups`.
   ============================================ */

/**
 * The written fallbacks, offered when the generated set comes back empty —
 * a slow upstream call, a guardrail pause, or five candidates that all ran
 * past the chip budget all land here. Generic by design, so any of them
 * makes sense under any answer; the provider rotates the pick by turn id so
 * back-to-back misses do not repeat a set, and skips one identical to what
 * the visitor just asked. Written copy on the chip row, so
 * `scripts/validate-chat-starters.mjs` holds every label to the budget.
 */
export const FALLBACK_FOLLOWUPS = [
  "What has Rob shipped recently?",
  "Which case study should I read first?",
  "How does this design system work?",
  "What has Rob built with AI?",
  "Describe Rob's design philosophy",
  "How do I get in touch with Rob?",
];
