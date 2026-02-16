import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Button Group",
  description:
    "Horizontal and vertical button group layouts for related actions and navigation patterns.",
};

export default function ButtonGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
