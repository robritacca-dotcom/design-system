import type { Metadata } from "next";

// robr0 GPT — the standalone chat-widget test bench. The full widget runs
// here against the real /api/chat backend, with a toggle back to the
// scripted transport for checking the choreography without spending tokens.
// Linked from nowhere and kept out of search until it ships as a site
// pattern.
export const metadata: Metadata = {
  title: "robr0 GPT",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
