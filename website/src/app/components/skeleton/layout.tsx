import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skeleton",
  description:
    "Placeholder loading indicators with text, circular, and rectangular variants.",
};

export default function SkeletonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
