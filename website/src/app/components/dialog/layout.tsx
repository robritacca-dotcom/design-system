import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dialog",
  description:
    "A general-purpose modal for focused tasks, with sizes, an optional footer, and full focus management.",
};

export default function DialogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
