import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";

const title = "Porting guide";
const description =
  "The site chat described abstractly enough to rebuild in another design system: decomposition, behavioural invariants, traps, and a two-phase agent protocol.";

export const metadata: Metadata = {
  alternates: { canonical: "/blueprints/porting-guide" },
  title,
  description,
  openGraph: pageOpenGraph(title, description, "/blueprints/porting-guide"),
};

export default function PortingGuideBlueprintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
