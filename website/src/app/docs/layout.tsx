import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/docs" },
  title: "Docs",
  description:
    "Documentation for robr0 DS — the system overview, the spec files that drive the build (Claude MD, Design MD), reusable skills, autonomous loops, and the project journal.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
