import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intuit Agent Chat",
  description:
    "Case study: the official conversational AI platform for all of Intuit. Designed and built from 0 → 1 across web, iOS, and Android. Live in QuickBooks and TurboTax.",
};

export default function IntuitAgentChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
