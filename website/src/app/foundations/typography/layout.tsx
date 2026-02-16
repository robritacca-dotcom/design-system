import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typography",
  description:
    "Type scale and font tokens — from mega display headings to small paragraph text, all referenced as CSS custom properties.",
};

export default function TypographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
