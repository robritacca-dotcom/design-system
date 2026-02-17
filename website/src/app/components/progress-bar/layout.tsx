import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress Bar",
  description:
    "Horizontal bar indicating completion progress with status variants and optional label.",
};

export default function ProgressBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
