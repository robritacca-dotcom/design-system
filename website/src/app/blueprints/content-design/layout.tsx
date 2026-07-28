import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/blueprints/content-design" },
  title: "Content MD",
  description:
    "The writing rules behind robr0 DS in a single markdown reference: voice, register by surface, banned words and patterns, and the self-review tests copy passes before it ships.",
};

export default function ContentDesignBlueprintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
