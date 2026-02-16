import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foundations",
  description:
    "Core design tokens — primitive colours, semantic colours, typography, spacing, icons, and logos.",
};

export default function FoundationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
