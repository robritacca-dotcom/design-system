import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/project-journal" },
  title: "Project journal",
  description:
    "The progression of the robr0 DS build: an evergreen journal consolidating the largest updates to the design system and this site, curated from the full commit history.",
};

export default function SiteUpdatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
