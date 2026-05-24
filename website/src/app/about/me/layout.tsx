import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Principal Product Designer at Intuit, previously Meta. Background, principles, and what I work on.",
};

export default function AboutMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
