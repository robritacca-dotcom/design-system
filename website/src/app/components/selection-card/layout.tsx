import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selection card",
  description:
    "Large selectable option cards with radio or checkbox indicators for high-visibility choices like settings and onboarding.",
};

export default function SelectionCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
