import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components — robr0 DS",
  description:
    "Reusable UI components built from design tokens — buttons, cards, navigation, toggles, and more.",
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
