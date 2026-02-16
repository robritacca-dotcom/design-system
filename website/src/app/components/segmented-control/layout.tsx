import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SegmentedControl",
  description:
    "Pill-style toggle between related views with keyboard navigation and icon support.",
};

export default function SegmentedControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
