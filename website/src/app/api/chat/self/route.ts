/**
 * GET /api/chat/self?token=… — marks this browser as Rob's, so exchanges from
 * it log as `self` rather than `visitor`.
 *
 * Localhost is classified as `dev` on its own, with no marker needed. This
 * route exists for the other half: testing the live site from a real IP, which
 * is otherwise indistinguishable from a stranger. Visit it once per browser
 * and the cookie rides along for a year.
 *
 * The cookie is a label on a log line and nothing else. It grants no access,
 * relaxes no guardrail, and changes no answer — so the worst a leaked token
 * buys is the ability to mislabel one's own questions. It is still compared in
 * constant time and still fails closed when `CHAT_SELF_TOKEN` is unset, on the
 * principle that a secret compared sloppily teaches the wrong habit.
 *
 * `?token=off` clears the marker.
 */
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "chat-self";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Constant-time string compare that does not leak length through timing. */
function matches(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    // Compare against itself so the work is the same either way.
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

function setCookie(value: string, maxAge: number): Response {
  const attributes = [
    `${COOKIE}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  return new Response(null, { status: 204, headers: { "Set-Cookie": attributes.join("; ") } });
}

export function GET(request: Request): Response {
  const token = new URL(request.url).searchParams.get("token") ?? "";

  if (token === "off") return setCookie("", 0);

  const expected = process.env.CHAT_SELF_TOKEN;
  if (!expected) {
    return Response.json({ error: "CHAT_SELF_TOKEN is not configured" }, { status: 503 });
  }
  if (!token || !matches(token, expected)) {
    return Response.json({ error: "bad token" }, { status: 403 });
  }

  return setCookie(expected, ONE_YEAR_SECONDS);
}
