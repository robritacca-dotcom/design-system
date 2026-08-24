import type { Metadata } from "next";
import Canvas from "./Canvas";

// The site laid out on one endless board, every page live in its own
// frame. Still alpha: noindex, no canonical and no sitemap entry — but as
// an experiment it is linked from the Design system mega menu, beside the
// playground (navigation.ts). It is also in CHROMELESS_ROUTES (the board
// fills the viewport) and excluded from the chat corpus (every word on it
// belongs to another page).
export const metadata: Metadata = {
  title: "Canvas",
  description:
    "The site on one board: every section's landing page live, laid out by its IA.",
  robots: { index: false, follow: false },
};

export default function CanvasPage() {
  return (
    <>
      {/* Canvas owns the toolbar and the background marker: the ambient
          field runs edge to edge (the playground's stage treatment, with
          the same on/off toggle) and the board floats over it — the
          viewport paints no fill of its own. */}
      <Canvas />
    </>
  );
}
