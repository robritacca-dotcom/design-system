import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/blueprints/usage" },
  title: "Usage MD",
  description:
    "The rules for building with robr0 DS in your own project: semantic tokens, the action colour, shape by element type, status variants, dark mode, and the shared prop contract.",
};

export default function UsageBlueprintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
