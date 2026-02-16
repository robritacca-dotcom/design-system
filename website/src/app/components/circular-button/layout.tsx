import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Circular Button",
  description:
    "Round icon button with primary and secondary variants, default and compact sizes.",
};

export default function CircularButtonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
