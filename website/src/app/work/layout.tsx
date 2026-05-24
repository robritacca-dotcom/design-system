import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Robert Ritacca",
  description: "Selected case studies and product design work.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
