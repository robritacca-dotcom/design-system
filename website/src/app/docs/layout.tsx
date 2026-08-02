import type { Metadata } from "next";
import { TITLE_TEMPLATE } from "@/config/navigation";

// `title.template` (not a bare string) matters here: /docs now has a real
// sub-page (/docs/get-started), and a plain-string title would null the
// inherited template, dropping the site suffix from every child's tab title.
// The canonical stays layout-level for /docs itself; sub-pages self-
// canonicalize via pageMetadata().
export const metadata: Metadata = {
  alternates: { canonical: "/docs" },
  title: { default: "Docs", template: TITLE_TEMPLATE },
  description:
    "Documentation for robr0 DS: the system overview, the spec files that drive the build, the rules for building with the package, reusable skills, autonomous loops, and the project journal.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
