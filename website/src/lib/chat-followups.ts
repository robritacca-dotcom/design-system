import type { ChatTurn } from "@/hooks/useChat";
import { fitsChip } from "@/lib/chat-suggestions";

/* ============================================
   Follow-up suggestions.

   Asked for once, after an assistant turn commits, and attached to that turn.
   Deliberately outside the ChatTransport contract: the suggestions are
   written from the finished answer, so a transport carrying them would have
   to hold its stream open past the last word — see the route's own note for
   why that is the wrong trade. A transport that *can* produce them cheaply
   (the sim does, from a script) yields a `followups` event instead, and the
   two paths meet at the same field on the turn.

   Every failure is silent. A response with no chips under it is a complete
   response; an error message where a suggestion should be is not.
   ============================================ */

/** Chips offered under one answer. */
const MAX_SUGGESTIONS = 3;

/**
 * Suggestions have no value once the visitor has moved on, and the widget
 * never blocks on them, so a slow one is simply dropped.
 */
const TIMEOUT_MS = 10_000;

/**
 * Ask for the follow-up questions to offer under a finished answer. Resolves
 * to an empty array on any failure, which the caller stores as-is: it records
 * that the turn was asked about and had nothing to offer.
 */
export async function fetchFollowups(question: string, answer: string): Promise<string[]> {
  try {
    const response = await fetch("/api/chat/followups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return [];

    const payload: unknown = await response.json();
    const suggestions = (payload as { suggestions?: unknown })?.suggestions;
    if (!Array.isArray(suggestions)) return [];

    /* The route parses the model's output already. This second pass is not
       distrust of the route but of the network between them: whatever arrives
       is about to be rendered as something the site appears to be saying, and
       the chip budget is enforced wherever a suggestion enters the UI. */
    return suggestions
      .filter((item): item is string => typeof item === "string" && fitsChip(item))
      .slice(0, MAX_SUGGESTIONS);
  } catch {
    return [];
  }
}

/**
 * The turn to ask about, or null when there is nothing to ask about yet:
 * the newest turn must be a committed assistant answer that came from the
 * real backend (an exchange id is the marker, as it is for the thumbs) and
 * has not been asked about already.
 */
export function followupTarget(
  turns: ChatTurn[]
): { id: string; question: string; answer: string } | null {
  const last = turns[turns.length - 1];
  if (!last || last.role !== "assistant") return null;
  if (!last.exchangeId || last.followups || last.text === "") return null;

  // The question this answer replied to, which is the turn before it.
  const question = turns[turns.length - 2];
  if (!question || question.role !== "user") return null;

  return { id: last.id, question: question.text, answer: last.text };
}
