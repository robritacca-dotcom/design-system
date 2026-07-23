import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/blueprints/claude" },
  title: "Claude MD",
  description:
    "The codebase context file Claude Code reads on every session. Project structure, token architecture, and the conventions a builder needs to extend robr0 DS without exploring.",
};

export default function ClaudeBlueprintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
