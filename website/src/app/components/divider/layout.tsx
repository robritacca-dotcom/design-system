import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divider",
  description:
    "A thin rule separating stacked content, with optional inline label and vertical orientation.",
};

export default function DividerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
