import type { Metadata } from "next";

// robr0 GPT — the standalone chat-widget test bench. The full widget runs
// here against the real /api/chat backend, with a toggle back to the
// scripted transport for checking the choreography without spending tokens.
// The pattern shipped site-wide (SiteChatMount), so the bench is now linked
// from the /overview pipeline as the place to exercise the widget — but it
// stays out of search: it is a QA surface, not content.
export const metadata: Metadata = {
  title: "robr0 GPT",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
