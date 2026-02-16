import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logos",
  description:
    "Brand logos and marks used across projects — SVG assets with light and dark mode variants.",
};

export default function LogosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
