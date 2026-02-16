import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Button",
  description:
    "Primary and secondary button variants in default and compact sizes, with icon support and multiple states.",
};

export default function ButtonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
