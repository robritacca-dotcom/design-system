"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/* Dev-only glow experiment, and the ternary is load-bearing for the same
   reason as ShaderTuner's: the bundler statically replaces
   process.env.NODE_ENV, so in a production build this whole expression folds
   to null and the import() in the untaken branch is never emitted. */
const GlowExperiment =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("./GlowExperiment"), { ssr: false })
    : null;

/**
 * Mounts the shader-glow experiment when the page is opened with `?glow`.
 * The flag is read from window.location rather than useSearchParams so the
 * mount does not force a Suspense boundary on every page (same trade
 * BlurBackground makes for `?tune`).
 */
export default function GlowExperimentMount() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (!new URLSearchParams(window.location.search).has("glow")) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(true);
  }, []);

  if (!GlowExperiment || !active) return null;
  return <GlowExperiment />;
}
