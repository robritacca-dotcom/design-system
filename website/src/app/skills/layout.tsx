import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude Skills | robr0 DS",
  description:
    "Reusable Claude Code skill files that encode this project's conventions — component patterns, token rules, navigation wiring, and more.",
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
