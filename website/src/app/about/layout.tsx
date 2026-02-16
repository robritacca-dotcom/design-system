import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the robr0 Design System — a token-based system for personal projects by Robert Ritacca.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
