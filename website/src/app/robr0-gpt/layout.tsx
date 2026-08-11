import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";

// The chat bench — the standalone rig for the site's chat widget. The full
// widget runs here against the real /api/chat backend, with a toggle back to
// the scripted transport for checking the choreography without spending
// tokens. Once a QA back-door, it is now a first-class page in the Design
// system nav, so like /playground it is indexed and carries its own metadata
// (it lives in no sidebar array, so the metadata is a literal rather than
// pageMetadata()).
const title = "Chat bench";
const description =
  "Exercise the site's chat widget live: set the stage size, flip the theme, swap the transport, recolour the actions, and rebrand the copy.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/robr0-gpt" },
  openGraph: pageOpenGraph(title, description, "/robr0-gpt"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
