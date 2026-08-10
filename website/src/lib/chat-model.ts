/**
 * The chat's model, in one place. The API route sends CHAT_MODEL to
 * Anthropic; the composer shows CHAT_MODEL_LABEL before the first
 * exchange. During a conversation the route reports the model that is
 * actually serving via a `model` event, so if the server ever chooses a
 * different model per request (a budget-tier fallback, an A/B), the label
 * follows reality rather than this constant.
 */
export const CHAT_MODEL = "claude-sonnet-5";

/**
 * "claude-sonnet-5" → "Sonnet 5", "claude-haiku-4-5" → "Haiku 4.5".
 * Word segments are capitalised; trailing numeric segments join with dots.
 */
export function modelLabel(modelId: string): string {
  const segments = modelId.replace(/^claude-/, "").split("-");
  const words: string[] = [];
  for (const segment of segments) {
    if (/^\d+$/.test(segment) && words.length > 0 && /\d$/.test(words[words.length - 1])) {
      words[words.length - 1] += `.${segment}`;
    } else if (/^\d+$/.test(segment)) {
      words.push(segment);
    } else {
      words.push(segment.charAt(0).toUpperCase() + segment.slice(1));
    }
  }
  return words.join(" ");
}

export const CHAT_MODEL_LABEL = modelLabel(CHAT_MODEL);
