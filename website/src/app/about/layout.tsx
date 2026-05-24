import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About robr0 DS",
  description:
    "robr0 DS is the personal design system I built to make this site. Here's how the pipeline comes together, and the artifacts you can take and reuse.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
