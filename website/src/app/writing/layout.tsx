import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";

const title = "Writing";
const description =
  "Essays and notes on product design, AI, and design systems, syndicated from my Substack.";

export const metadata: Metadata = {
  alternates: { canonical: "/writing" },
  title,
  description,
  openGraph: pageOpenGraph(title, description, "/writing"),
};

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
