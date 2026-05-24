import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foundations",
  description:
    "Colours, typography, spacing, icons, and logos — the tokens behind every component on this site.",
};

export default function FoundationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
