/* ============================================
   SHADER BACKGROUND CONFIG ACCESSOR
   Single source of truth for the site background:
   which renderer paints it, the seven shader
   parameters, and the eight blob definitions.
   BlurBackground reads it; nothing else owns a
   copy of these numbers.

   To retune: dial a look in with the dev-only
   panel (append ?tune=1 to any page in
   `npm run dev`), then paste the panel's snippet
   values back into shader-background.json.

   To roll back to the CSS blobs site-wide: set
   "mode" to "css". Nothing needs deleting — the
   blobs are always rendered underneath, and the
   shader simply never mounts.

   Validated by scripts/validate-shader-background.mjs.
   ============================================ */

import data from "./shader-background.json";

/** Which renderer paints the background across the whole site. */
export type BackgroundMode = "shader" | "css";

export interface ShaderParams {
  /** Overall opacity of the field, 0.1-1. */
  intensity: number;
  /** Domain-warp strength: how much fbm noise bends the field, 0-0.5. */
  warp: number;
  /** Noise frequency. Higher values give finer, busier structure, 0.5-6. */
  scale: number;
  /** Drift-rate multiplier on every blob's period, 0-4. */
  speed: number;
  /** Dither/film-grain amplitude, 0-0.4. Also what kills 8-bit banding. */
  grain: number;
  /** Anisotropic stretch: 0 renders discs, 1 renders diagonal streams, 0-1. */
  streak: number;
  /**
   * Cursor-wake strength, 0-1. Ships at 0 — the interaction is built and
   * dormant, not absent. Raising this turns on the swirl and glow trail, and
   * with them the loop's step up from 30fps to 60fps while a wake is alive.
   */
  react: number;
}

/**
 * Ported 1:1 from the CSS blobs in globals.css: centre = (ml + size/2,
 * mt + size/2) relative to the container centre, in width units. The shader's
 * coordinate space matches the CSS exactly — origin at the container centre,
 * one unit = container width — so these are constants that never need
 * recomputing on resize.
 *
 * Note the last blob deliberately uses --color-core-ui-secondary rather than
 * the action teal: --color-action-primary-bg is reserved for CTAs and focus
 * rings, and is never sampled decoratively (design.md's Do's and Don'ts).
 */
export interface ShaderBlob {
  /** Semantic colour token, resolved at runtime so the field re-themes. */
  token: string;
  /** Disc diameter in viewport-width units, matching the CSS vw sizing. */
  size: number;
  /** Centre offset from the container centre, width units. */
  cx: number;
  /** Centre offset from the container centre, width units. */
  cy: number;
  /** Drift cycle in seconds, mirroring the CSS animation-duration. */
  period: number;
  /** Phase offset, standing in for the CSS animation-delay. */
  phase: number;
  /**
   * Emission weight. Positive emits light; negative absorbs it, giving a
   * shadow that occludes whatever shines behind it.
   */
  weight: number;
}

export interface ShaderBackgroundConfig {
  mode: BackgroundMode;
  params: ShaderParams;
  blobs: ShaderBlob[];
}

export const shaderBackground: ShaderBackgroundConfig =
  data as ShaderBackgroundConfig;
