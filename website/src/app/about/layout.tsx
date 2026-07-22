import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview of robr0 DS",
  description:
    "An overview of robr0 DS, the personal design system I built to make this site — how the pipeline comes together, and the artifacts you can take and reuse.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
