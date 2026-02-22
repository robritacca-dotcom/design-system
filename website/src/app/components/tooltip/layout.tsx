import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tooltip",
  description:
    "Contextual text label that appears on hover or focus with position and delay options.",
};

export default function TooltipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
