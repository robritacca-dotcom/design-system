import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";

// /design-system is a standalone top-level page (like /playground) — it lives
// in no sidebar array, so its metadata is a literal rather than pageMetadata().
const title = "Design system";
const description =
  "The robr0 DS landing: live components rendered from the npm package, the specs Claude Code builds them from, and links to every part of the system.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/design-system" },
  openGraph: pageOpenGraph(title, description, "/design-system"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
