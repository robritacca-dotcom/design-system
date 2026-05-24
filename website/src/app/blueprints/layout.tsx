import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blueprints",
  description:
    "Markdown spec files that define how robr0 DS is built — design tokens, component rules, and codebase context.",
};

export default function BlueprintsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
