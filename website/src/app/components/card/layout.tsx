import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card",
  description:
    "Card components for previews, navigation, and token documentation — from content cards to colour swatches and typography specimens.",
};

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
