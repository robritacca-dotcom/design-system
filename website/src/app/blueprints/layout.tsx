import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blueprints",
  description:
    "The markdown spec files that define how to build with this design system — design tokens, component rules, and codebase context for builders.",
};

export default function BlueprintsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
