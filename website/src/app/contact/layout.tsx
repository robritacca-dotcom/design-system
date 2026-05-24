import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Robert Ritacca — email, LinkedIn, Substack, GitHub.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
