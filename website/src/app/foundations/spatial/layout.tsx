import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Semantic Spacing",
  description:
    "Spacing tokens for padding, gap, radius, and border — consistent spatial relationships across all components.",
};

export default function SpatialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
