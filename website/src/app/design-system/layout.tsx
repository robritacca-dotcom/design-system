import type { Metadata } from "next";

// /design-system is a standalone top-level page (like /playground) — it lives
// in no sidebar array, so its metadata is a literal rather than pageMetadata().
export const metadata: Metadata = {
  title: "Design system",
  description:
    "The robr0 DS landing: live components rendered from the package, the token layer behind them, and links to every part of the system.",
  alternates: { canonical: "/design-system" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
