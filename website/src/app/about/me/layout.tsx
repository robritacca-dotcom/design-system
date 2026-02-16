import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Robert Ritacca",
  description:
    "About Robert Ritacca — designer and developer behind the robr0 Design System.",
};

export default function AboutMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
