import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";

const title = "Contact";
const description =
  "Get in touch by email or LinkedIn, book a one-hour consultation, or follow on X, Instagram, Substack, and GitHub.";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title,
  description,
  openGraph: pageOpenGraph(title, description, "/contact"),
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
