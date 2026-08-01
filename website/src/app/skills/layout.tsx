import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/skills" },
  title: "Skills",
  description:
    "Reusable Claude Code skill files I wrote to extend robr0 DS, each one a markdown file you can read and copy.",
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
