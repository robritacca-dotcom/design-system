import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Forty-two React components that make up robr0 DS — the design system I built for my own projects.",
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
