"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  shaderBackground,
  type BackgroundMode,
  type ShaderParams,
} from "@/data/shader-background";
import { useShaderField } from "./useShaderField";
import styles from "./ShaderCanvas.module.css";

/* Dev-only tuning panel, and the ternary is load-bearing: the bundler
   statically replaces process.env.NODE_ENV, so in a production build this
   whole expression folds to null and the import() in the untaken branch is
   never emitted. Calling dynamic() unconditionally and gating only the render
   would still ship the panel — verified by grepping .next/static/chunks. */
const ShaderTuner =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("./ShaderTuner"), { ssr: false })
    : null;

/**
 * Marker a page renders to make the background fill the viewport instead of
 * the 450px header band, suppressing the fade-to-page-colour mask.
 *
 * It is a marker rather than a prop because the background is mounted once in
 * the root layout and no longer re-renders per route. CSS reads the marker
 * from anywhere in the page (globals.css), so a page declares its own need
 * and there is no route list to keep in sync.
 */
export function FullBleedBackground() {
  return <div data-bg-full-bleed hidden />;
}

/**
 * The site background, on every page.
 *
 * Two layers, and the order matters. The eight CSS blobs render first and
 * always — server-side, on every page, exactly as they have since before the
 * shader existed. The WebGL2 field then fades in *over* them once a context is
 * live, and the blobs fade out beneath it.
 *
 * That arrangement is the failsafe. No WebGL2, a blocked GPU, a lost context,
 * or `"mode": "css"` in the config, and the blobs simply stay painted: nothing
 * flashes, nothing is missing, and the server-rendered markup is identical
 * either way, so there is no hydration mismatch.
 *
 * Every tuneable value comes from website/src/data/shader-background.json.
 * Append `?tune=1` to any page in `npm run dev` to adjust them live.
 */
export default function BlurBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [params, setParams] = useState<ShaderParams>(shaderBackground.params);
  const [mode, setMode] = useState<BackgroundMode>(shaderBackground.mode);
  const [tuning, setTuning] = useState(false);

  /* Read once on mount from the URL, which the server prerender cannot see —
     same approach as the playground's ?view= handling, and deliberately not
     useSearchParams, which would force a Suspense boundary on every page. */
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (!new URLSearchParams(window.location.search).has("tune")) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTuning(true);
  }, []);

  const { supported, active } = useShaderField(
    canvasRef,
    { ...params, blobs: shaderBackground.blobs },
    mode === "shader"
  );

  /**
   * Watchdog on the pending state, and it is load-bearing.
   *
   * Hiding the blobs while the renderer resolves means "pending" paints
   * nothing — so if resolution never arrives, the page has no background at
   * all. A context that is lost before the first frame and never restored
   * does exactly that (StrictMode's double-mount is the common way in). This
   * bounds the wait: resolve or the blobs come back.
   *
   * The window is generous next to a normal start, which lands within a frame
   * of mount, so a healthy field never trips it.
   */
  const [gaveUp, setGaveUp] = useState(false);
  useEffect(() => {
    if (mode !== "shader" || active || !supported) return;
    const timer = window.setTimeout(() => setGaveUp(true), 1500);
    return () => window.clearTimeout(timer);
  }, [mode, active, supported]);

  /**
   * Tri-state, and "pending" is the one that matters.
   *
   * The blobs used to paint at first paint and then hand off to the shader,
   * which read as two backgrounds in a row. They now start hidden while the
   * renderer is still resolving, so the field is simply what appears. The
   * trade is deliberate: on a machine that cannot run the shader, the first
   * moment is bare page floor before the blobs fade in, instead of blobs that
   * are immediately replaced.
   *
   * "css" resolves server-side, so that path never pends and the blobs are
   * painted in the very first frame with no gap at all.
   */
  /* active is tested before gaveUp, so a restore that lands after the
     watchdog fired still wins — the field fades in over the blobs. */
  const state =
    mode === "css" || !supported
      ? "off"
      : active
        ? "on"
        : gaveUp
          ? "off"
          : "pending";

  return (
    <>
      <div
        className="blur-container"
        data-shader={state}
        aria-hidden="true"
      >
        <div className="blur-ellipse blur-yellow" />
        <div className="blur-ellipse blur-green" />
        <div className="blur-ellipse blur-purple" />
        <div className="blur-ellipse blur-neutral" />
        <div className="blur-ellipse blur-blue" />
        <div className="blur-ellipse blur-red" />
        <div className="blur-ellipse blur-orange" />
        <div className="blur-ellipse blur-teal" />

        {mode === "shader" && (
          <canvas
            ref={canvasRef}
            className={
              active ? `${styles.canvas} ${styles.canvasActive}` : styles.canvas
            }
          />
        )}
      </div>

      {ShaderTuner && tuning && (
        <ShaderTuner
          params={params}
          onParamsChange={setParams}
          mode={mode}
          onModeChange={setMode}
          supported={supported}
          active={active}
        />
      )}
    </>
  );
}
