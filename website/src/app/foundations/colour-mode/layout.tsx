import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colour Mode",
  description:
    "Semantic colour tokens that map roles to primitive values per mode, enabling light and dark themes without changing component logic.",
};

export default function ColourModeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
