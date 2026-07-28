import type { Metadata } from "next";

// /playground is a standalone top-level page (like /contact) — it lives in no
// sidebar array, so its metadata is a literal rather than pageMetadata().
export const metadata: Metadata = {
  title: "Playground",
  description:
    "Re-theme the design system live — pick a brand colour, tint the neutrals, reshape the radii, swap the typeface, then copy the CSS.",
  alternates: { canonical: "/playground" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
