import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building robr0 DS — a one-person design system, end to end",
  description:
    "Why I built a personal design system from scratch, and how an AI-augmented spec-to-code pipeline let me ship a polished site alone.",
};

export default function Robr0DsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
