import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popover",
  description:
    "Contextual overlay panel with click and hover triggers, positioned relative to its anchor.",
};

export default function PopoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
