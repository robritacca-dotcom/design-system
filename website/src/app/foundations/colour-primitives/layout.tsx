import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Primitive Colours",
  description:
    "The raw colour palette — teal, orange, neutral, red, green, purple, and blue primitives that feed into semantic tokens.",
};

export default function ColourPrimitivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
