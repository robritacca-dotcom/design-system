import type { Metadata } from "next";
import StageToolbar from "@/components/StageToolbar/StageToolbar";
import { HiddenBackground } from "@/components/BlurBackground/BlurBackground";
import Canvas from "./Canvas";

// The site laid out on one endless board, every page live in its own
// frame. Live but unlisted, and alpha: noindex, no canonical, no sitemap
// entry and no nav link, so it is reached by its address alone; it is also
// in CHROMELESS_ROUTES (the board fills the viewport) and excluded from the
// chat corpus (every word on it belongs to another page).
export const metadata: Metadata = {
  title: "Canvas",
  description: "The site on one board: every page live, laid out by its IA.",
  robots: { index: false, follow: false },
};

export default function CanvasPage() {
  return (
    <>
      <HiddenBackground />
      <StageToolbar title="Canvas" badge="Alpha" exit="home" />
      <Canvas />
    </>
  );
}
