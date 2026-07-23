import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/loops" },
  title: "Loops",
  description:
    "The scheduled agent automations running on this site — what they do, when they run, and the guardrails that keep a human in the loop.",
};

export default function LoopsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
