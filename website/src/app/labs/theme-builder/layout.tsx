import type { ReactNode } from "react";

export const metadata = {
  title: "Labs: theme builder",
  description:
    "A proof of concept that walks from a logo and a few choices to a complete brand package built on the design system.",
  // Noindex by design: a labs proof of concept, deliberately outside the IA.
  // No nav, no sitemap, no corpus (see EXCLUDED_ROUTES in
  // scripts/generate-site-corpus.mjs).
  robots: { index: false, follow: false },
};

export default function LabsThemeBuilderLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
