import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badge",
  description:
    "Small inline status labels with info, positive, warning, error, and neutral variants.",
};

export default function BadgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
