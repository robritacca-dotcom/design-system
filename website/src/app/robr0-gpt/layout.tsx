import type { Metadata } from "next";

// robr0 GPT — the standalone chat-widget test bench. The full widget runs
// here on simulated responses while the interactions are tuned; the real
// LLM backend arrives in Build 2. Linked from nowhere and kept out of
// search until it ships as a site pattern.
export const metadata: Metadata = {
  title: "robr0 GPT",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
