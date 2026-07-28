import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: "Get in touch: email, LinkedIn, Instagram, X, Substack, or GitHub.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
