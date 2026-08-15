/**
 * The row must hold a real model answer, not a guardrail notice or a transport
 * error.
 *
 * transform-response.js already prefixes those two cases with `[notice]` and
 * `[error]`, on the stated assumption that they would "fail assertions loudly".
 * Nothing enforced it. The remaining assertions are shape checks — no em dash,
 * no invented path, returns inside 45s — and a rate-limit notice satisfies all
 * of them, so a throttled run scored itself green: the 2026-08-12 run in
 * runs/ passed 24 rows that never reached the model, including all 12 of the
 * conduct seat. This is the assertion that makes the prefix mean something.
 *
 * It is a tripwire for the run, not a judgement of the answer. A notice means
 * the eval was pointed at a route with live guardrails — start the server with
 * `npm run dev:eval -w website`, which blanks the KV vars so they fail open.
 */
const PREFIX = /^\[(notice|error)\]\s*/;

export default function assertAnswered(output) {
  const text = String(output ?? '');
  const tag = PREFIX.exec(text);

  if (!tag) {
    return text.trim()
      ? { pass: true, score: 1, reason: 'a model answer' }
      : { pass: false, score: 0, reason: 'empty answer: the stream closed with no text' };
  }

  const hint =
    tag[1] === 'notice'
      ? 'guardrails are live — run the server with `npm run dev:eval -w website`'
      : 'the route errored';
  return {
    pass: false,
    score: 0,
    reason: `never reached the model (${hint}): ${text.slice(0, 120)}`,
  };
}
