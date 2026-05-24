import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Augmenta Construction Platform",
  description:
    "Case study: turning automation into usability — the redesign behind 42% faster outcomes for Augmenta's generative electrical raceway platform.",
};

export default function AugmentaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
