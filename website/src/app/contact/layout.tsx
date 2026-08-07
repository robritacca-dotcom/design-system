import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";

const title = "Contact";
const description =
  "Get in touch: email, LinkedIn, Instagram, X, Substack, or GitHub.";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title,
  description,
  openGraph: pageOpenGraph(title, description, "/contact"),
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
