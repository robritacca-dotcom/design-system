import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";

const title = "About";
const description =
  "Principal Product Designer at Intuit, previously Meta. Background, principles, and what I work on.";

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
