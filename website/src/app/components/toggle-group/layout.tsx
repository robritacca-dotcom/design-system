import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toggle Group",
  description:
    "A set of two-state buttons that can be toggled on or off, supporting text and icon items.",
};

export default function ToggleGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
