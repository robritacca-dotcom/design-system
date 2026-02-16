import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Icons",
  description:
    "Material Symbols Rounded icon set — outlined and filled variants used throughout the design system.",
};

export default function IconsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
