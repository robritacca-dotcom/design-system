import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/blueprints/design" },
  title: "Design MD",
  description:
    "The design language behind robr0 DS in a single markdown reference — tokens, typography, colours, and every component spec.",
};

export default function DesignBlueprintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
