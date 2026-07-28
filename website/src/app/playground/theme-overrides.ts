/**
 * Pure colour/radius math for the playground.
 *
 * Everything here produces `--primitive-*` override values: the Phase-1
 * token invariant (every semantic colour token references a primitive)
 * means overriding primitives re-themes both light and dark modes at
 * once — the playground never touches semantic tokens.
 */

export interface Overrides {
  [cssVar: string]: string;
}

/* ---------- colour helpers ---------- */

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
};

const rgbToHex = (rgb: [number, number, number]): string =>
  "#" +
  rgb
    .map((c) => Math.round(Math.min(255, Math.max(0, c))).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

/** Mix `a` toward `b` by weight w (0..1). */
const mix = (
  a: [number, number, number],
  b: [number, number, number],
  w: number
): [number, number, number] => [
  a[0] + (b[0] - a[0]) * w,
  a[1] + (b[1] - a[1]) * w,
  a[2] + (b[2] - a[2]) * w,
];

const WHITE: [number, number, number] = [255, 255, 255];
const BLACK: [number, number, number] = [0, 0, 0];

const luminance = ([r, g, b]: [number, number, number]): number =>
  (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

/* ---------- brand (action colour) ramp ---------- */

/**
 * Tint/shade weights that reproduce the shipped teal ramp from its 07 base
 * (positive = toward white, negative = toward black). Derived by solving
 * mix(teal-07, white|black, w) against the actual primitives.
 */
const BRAND_RAMP_WEIGHTS: ReadonlyArray<[step: string, weight: number]> = [
  ["01", 0.93],
  ["02", 0.82],
  ["03", 0.63],
  ["04", 0.43],
  ["05", 0.22],
  ["06", 0.11],
  ["07", 0],
  ["08", -0.2],
  ["09", -0.43],
  ["10", -0.66],
];

export const DEFAULT_BRAND = "#118AB2";

/**
 * Preset action colours: steps 07 and 08 of every chromatic primitive ramp
 * (the values in tokens-primitives.css), plus a theme-dependent neutral per
 * row — dark grey buttons in light mode that flip to light grey in dark
 * mode (`hexDark`/`labelDark`), riding the same `brandDark` machinery as
 * the black & white preset. Listed 07s-first so an 8-column grid renders
 * one row per step. Like NEUTRALS below, these are shipped constants —
 * reading them from the DOM would return their overridden values once a
 * brand is applied.
 */
export const ACTION_COLOR_PRESETS: ReadonlyArray<{
  label: string;
  hex: string;
  /** Dark-mode counterpart for theme-dependent entries (the neutrals). */
  hexDark?: string;
  labelDark?: string;
}> = [
  { label: "Red 07", hex: "#EF476F" },
  { label: "Orange 07", hex: "#EF8247" },
  { label: "Yellow 07", hex: "#FFD166" },
  { label: "Green 07", hex: "#06D6A0" },
  { label: "Teal 07", hex: "#118AB2" },
  { label: "Blue 07", hex: "#1E47B0" },
  { label: "Purple 07", hex: "#9E47EF" },
  { label: "Neutral 07", hex: "#303030", labelDark: "Neutral 01", hexDark: "#F1F1F1" },
  { label: "Red 08", hex: "#C93A5C" },
  { label: "Orange 08", hex: "#C65E33" },
  { label: "Yellow 08", hex: "#C49A3E" },
  { label: "Green 08", hex: "#05A67C" },
  { label: "Teal 08", hex: "#0E6E8F" },
  { label: "Blue 08", hex: "#163789" },
  { label: "Purple 08", hex: "#7434B3" },
  { label: "Neutral 08", hex: "#232323", labelDark: "Neutral 02", hexDark: "#D6D6D6" },
];

/**
 * Overrides for the full teal ramp, rebuilt around a picked brand colour.
 *
 * The shipped ramp assumes a mid-dark base: tint steps (01–06) head toward
 * white — step 02 is the text ON the primary fill — and shade steps (08–10)
 * toward black for hover/pressed. For a LIGHT brand (a white button), both
 * jobs invert: text and hover states must contrast toward black, so every
 * step mixes darker instead. Without this, white buttons get white text.
 */
export function brandOverrides(brandHex: string): Overrides {
  const base = hexToRgb(brandHex);
  const lightBrand = luminance(base) > 0.5;
  const overrides: Overrides = {};
  for (const [step, weight] of BRAND_RAMP_WEIGHTS) {
    const pole = lightBrand ? BLACK : weight > 0 ? WHITE : BLACK;
    const value = weight === 0 ? base : mix(base, pole, Math.abs(weight));
    overrides[`--primitive-teal-${step}`] = rgbToHex(value);
  }
  return overrides;
}

/* ---------- neutral tint ---------- */

interface NeutralDef {
  step: string;
  hex: string;
  /** rgba() variants that share this base: suffix → alpha */
  alphas?: Record<string, number>;
}

/** The shipped neutral scale, including every rgba() variant's alpha. */
const NEUTRALS: NeutralDef[] = [
  { step: "00", hex: "#FFFFFF" },
  { step: "01", hex: "#F1F1F1", alphas: { "-transparent": 0.01, "-semi": 0.6 } },
  { step: "02", hex: "#D6D6D6", alphas: { "-semi": 0.8 } },
  { step: "03", hex: "#BCBCBC", alphas: { "-semi": 0.8 } },
  { step: "04", hex: "#A2A2A2" },
  { step: "05", hex: "#888888" },
  { step: "06", hex: "#6D6D6D" },
  { step: "07", hex: "#303030", alphas: { "-semi": 0.8 } },
  { step: "08", hex: "#232323", alphas: { "-semi": 0.8 } },
  {
    step: "09",
    hex: "#0E0E0E",
    alphas: { "-transparent": 0.01, "-semi": 0.8, "-semi-transparent": 0.6 },
  },
  { step: "10", hex: "#050505", alphas: { "-semi": 0.6, "-subtle": 0.01 } },
  { step: "11", hex: "#000000" },
];

export const DEFAULT_NEUTRAL_SEED = "#118AB2";

/**
 * Tints every neutral primitive toward a seed colour. `strength` is
 * 0..0.2 — even 6% turns the white floor into a subtle brand wash.
 * rgba() variants are regenerated with their original alphas.
 */
export function neutralOverrides(seedHex: string, strength: number): Overrides {
  const seed = hexToRgb(seedHex);
  const overrides: Overrides = {};
  for (const { step, hex, alphas } of NEUTRALS) {
    const tinted = mix(hexToRgb(hex), seed, strength);
    overrides[`--primitive-neutral-${step}`] = rgbToHex(tinted);
    for (const [suffix, alpha] of Object.entries(alphas ?? {})) {
      const [r, g, b] = tinted.map((c) => Math.round(c));
      overrides[`--primitive-neutral-${step}${suffix}`] = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }
  return overrides;
}

/* ---------- radius ---------- */

const RADIUS_STEPS: ReadonlyArray<[step: string, px: number]> = [
  ["xxs", 2],
  ["xs", 4],
  ["sm", 8],
  ["md", 12],
  ["lg", 16],
  ["xl", 24],
  ["xxl", 48],
];

/**
 * Scales the radius scale (0..2). `pill` keeps `--radius-full` at its
 * shipped 999px; turning it off squares the pills to the scaled lg step.
 */
export function radiusOverrides(scale: number, pill: boolean): Overrides {
  const overrides: Overrides = {};
  for (const [step, px] of RADIUS_STEPS) {
    overrides[`--primitive-radius-${step}`] = `${Math.round(px * scale)}px`;
  }
  if (!pill) {
    overrides["--primitive-radius-full"] = `${Math.max(2, Math.round(16 * scale))}px`;
  }
  return overrides;
}

/* ---------- fonts ---------- */

export interface FontOption {
  /** Display label + dropdown value */
  label: string;
  /** CSS font-family value (quoted family + fallback) */
  family: string;
  /** Google Fonts css2 family parameter; null for the bundled default */
  googleParam: string | null;
}

export const FONT_OPTIONS: FontOption[] = [
  { label: "Nunito Sans (default)", family: "", googleParam: null },
  { label: "Inter", family: "'Inter', sans-serif", googleParam: "Inter:wght@300;400;500;600;700" },
  { label: "DM Sans", family: "'DM Sans', sans-serif", googleParam: "DM+Sans:wght@300;400;500;600;700" },
  { label: "Poppins", family: "'Poppins', sans-serif", googleParam: "Poppins:wght@300;400;500;600;700" },
  { label: "Montserrat", family: "'Montserrat', sans-serif", googleParam: "Montserrat:wght@300;400;500;600;700" },
  { label: "Work Sans", family: "'Work Sans', sans-serif", googleParam: "Work+Sans:wght@300;400;500;600;700" },
  { label: "Source Sans 3", family: "'Source Sans 3', sans-serif", googleParam: "Source+Sans+3:wght@300;400;500;600;700" },
  { label: "IBM Plex Sans", family: "'IBM Plex Sans', sans-serif", googleParam: "IBM+Plex+Sans:wght@300;400;500;600;700" },
  { label: "Space Grotesk", family: "'Space Grotesk', sans-serif", googleParam: "Space+Grotesk:wght@300;400;500;600;700" },
  { label: "Lora (serif)", family: "'Lora', serif", googleParam: "Lora:wght@400;500;600;700" },
  { label: "IBM Plex Mono", family: "'IBM Plex Mono', monospace", googleParam: "IBM+Plex+Mono:wght@300;400;500;600;700" },
];

export function googleFontHref(googleParam: string): string {
  return `https://fonts.googleapis.com/css2?family=${googleParam}&display=swap`;
}

/* ---------- copy-paste CSS ---------- */

/** The consumer-ready snippet reproducing the current playground state.
    `darkOverrides` adds a theme-scoped block for presets whose action
    colour differs between themes. */
export function buildCssSnippet(
  overrides: Overrides,
  font: FontOption,
  darkOverrides?: Overrides
): string {
  const lines: string[] = [];
  if (font.googleParam) {
    lines.push(
      `/* Load the font first, e.g.:`,
      `   <link rel="stylesheet" href="${googleFontHref(font.googleParam)}"> */`
    );
  }
  lines.push(":root {");
  if (font.family) {
    lines.push(`  --font-family-primary: ${font.family};`);
  }
  for (const [name, value] of Object.entries(overrides)) {
    lines.push(`  ${name}: ${value};`);
  }
  lines.push("}");
  if (darkOverrides && Object.keys(darkOverrides).length > 0) {
    lines.push("", '[data-theme="dark"] {');
    for (const [name, value] of Object.entries(darkOverrides)) {
      lines.push(`  ${name}: ${value};`);
    }
    lines.push("}");
  }
  return lines.join("\n");
}
