import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";

const title = "About";
/* Names the current employer, so it moves when the /about timeline's top
   entry does — same keep-in-step rule as the home page's employer strip. */
const description =
  "Principal Product Designer at Gusto, previously Intuit and Meta. Background, principles, and what I work on.";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title,
  description,
  openGraph: pageOpenGraph(title, description, "/about"),
};

export default function AboutMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
