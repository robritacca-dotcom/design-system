import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/writing" },
  title: "Writing",
  description:
    "Essays and notes on product design, AI, and design systems — syndicated from my Substack.",
};

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
