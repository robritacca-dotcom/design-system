import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";

// /design-system is a standalone top-level page (like /playground) — it lives
// in no sidebar array, so its metadata is a literal rather than pageMetadata().
const title = "Design system";
const description =
  "Rift DS, the open React design system Robert Ritacca designed and built: what it is, how its rules hold, and where to find it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/design-system" },
  openGraph: pageOpenGraph(title, description, "/design-system"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
