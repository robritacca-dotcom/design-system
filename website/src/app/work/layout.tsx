import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies on product, AI, and design systems.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
