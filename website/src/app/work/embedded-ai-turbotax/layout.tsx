import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Designing Embedded AI Experiences Inside ChatGPT and Claude",
  description:
    "Case study: leading design for TurboTax's embedded AI experiences during one of the first large-scale launches inside major AI platforms.",
};

export default function EmbeddedAiTurbotaxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
