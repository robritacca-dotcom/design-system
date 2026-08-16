import {
  DEFAULT_NEUTRAL_SEED,
  type AdvancedColorState,
  type Overrides,
} from "./theme-overrides";

/** A preset is just a saved position for every lever. Font labels must
    match FONT_OPTIONS entries. */
export interface ThemePreset {
  label: string;
  brand: string;
  /** Theme-dependent action colour: used instead of `brand` in dark mode
      (the black & white preset flips to a white button there). */
  brandDark?: string;
  tintOn: boolean;
  tintSeed: string;
  tintStrength: number;
  radiusScale: number;
  pill: boolean;
  fontLabel: string;
  /** Hand-tuned adjacent ramp keys: every chromatic ramp re-keyed to sit
      in the theme (the action colour's own family is left to the action
      lever). Loads into the Advanced colours state. */
  advanced?: AdvancedColorState;
  /** Preset-specific extras beyond the levers (e.g. greyscale accents). */
  extraOverrides?: Overrides;
  /**
   * Extras that only apply in dark mode, layered over `extraOverrides`.
   * Same reason `brandDark` exists: a few action roles cannot hold one
   * value across both themes, and the derived ramp assumes the light-mode
   * shape (fills that deepen under a light label). A preset that inverts
   * that shape corrects the affected roles here.
   */
  extraOverridesDark?: Overrides;
}

/** Shorthand: an AdvancedColorState that only sets ramp keys. */
const bases = (b: Record<string, string>): AdvancedColorState => ({
  hueShift: 0,
  satScale: 100,
  bases: b,
});

export const THEME_PRESETS: Record<string, ThemePreset> = {
  tealAccessible: {
    label: "Accessible teal",
    // The shipped hue, moved to the steps that clear WCAG AA in each theme.
    // A single value cannot: the band that reads against both a white page
    // and a near black one is too narrow to also carry a label, so light
    // takes a deep fill with a light label and dark inverts it. Both are
    // real teal primitives (08 and 05), so this repoints the action roles
    // rather than rewriting the ramp.
    brand: "#0E6E8F",
    brandDark: "#3CA5C6",
    tintOn: true,
    tintSeed: "#0E6E8F",
    tintStrength: 4,
    radiusScale: 100,
    pill: true,
    fontLabel: "Nunito Sans (default)",
    // No re-keyed neighbours: this preset changes one decision, so the rest
    // of the palette stays where the shipped theme has it.
    //
    // The derived ramp lands three roles short of AA, and all three are the
    // same story: the derivation is built for a dark fill under a light
    // label, and light mode is the only theme still shaped that way here.
    extraOverrides: {
      // As a link on the lightest container the derived teal-08 reads 3.96.
      // Teal-09 clears every light surface.
      "--color-action-primary-text-tertiary": "var(--primitive-teal-09)",
      // RadioButton's focus ring. Teal-04 is 2.02 against the page, which
      // the shipped theme gets wrong too; this is the one gap here that is
      // a fix rather than a regression being undone.
      "--color-action-primary-border-tertiary": "var(--primitive-teal-08)",
      // The input hover border, 2.02 as teal-04. Teal-06 clears 3:1 and
      // still reads lighter than the selected border, so the resting,
      // hover and selected states stay in order.
      "--color-input-border-hover": "var(--primitive-teal-06)",
    },
    extraOverridesDark: {
      // The dark fill is light, so its label has to be dark on every step.
      // Left light, the hover fill reads 2.75 behind its own text.
      "--color-action-primary-text-active": "var(--primitive-teal-10)",
      // Hover and active deepen by default, which walks the fill out of
      // contrast with the page. Hold them on the light half of the ramp.
      "--color-action-primary-bg-hover": "var(--primitive-teal-04)",
      "--color-action-primary-bg-active": "var(--primitive-teal-03)",
      // Teal-09 as the outlined button's edge is 1.44 against a dark
      // surface, which is no edge at all.
      "--color-action-primary-border": "var(--primitive-teal-05)",
      "--color-action-primary-text-tertiary": "var(--primitive-teal-04)",
      // The secondary button and CircularButton put this icon on the hover
      // and active fills, which are now the light half of the ramp. Left at
      // near-white it reads 1.80 on its own background: the same inversion
      // the label needed, one token over.
      "--color-action-icon-active": "var(--primitive-teal-10)",
      // RadioButton's focus ring sits on the page at a 2px offset, so the
      // derived teal-09 is 2.18 against it.
      "--color-action-primary-border-tertiary": "var(--primitive-teal-04)",
      // The input hover border, same problem as its light counterpart but
      // from the other end: teal-09 is 2.18 on a dark page.
      "--color-input-border-hover": "var(--primitive-teal-07)",
    },
  },
  warm: {
    label: "Warm serif",
    brand: "#D97757",
    tintOn: true,
    tintSeed: "#C08B5C",
    tintStrength: 8,
    radiusScale: 100,
    pill: true,
    fontLabel: "Lora (serif)",
    // Earthy neighbours: every hue muted and pulled a few degrees toward
    // the terracotta key. Orange is the action family, left alone.
    advanced: bases({
      red: "#D45B66",
      yellow: "#EAC57B",
      green: "#44A87D",
      teal: "#28929B",
      blue: "#3D4E9E",
      purple: "#9B67BE",
    }),
  },
  mono: {
    label: "Black & white",
    // Real neutral primitives (08 / 01), so the action colour applies as
    // semantic re-pointing at the neutral ramp instead of a rewritten teal.
    brand: "#232323",
    brandDark: "#F1F1F1",
    tintOn: false,
    tintSeed: DEFAULT_NEUTRAL_SEED,
    tintStrength: 6,
    radiusScale: 40,
    pill: false,
    fontLabel: "Inter",
    // Ink-wash chromatics: hue and value hold, saturation drops hard, so
    // any colour that does appear reads as a tinted grey.
    advanced: bases({
      red: "#BB7B8A",
      orange: "#BB927B",
      yellow: "#D0BE95",
      green: "#469681",
      teal: "#437180",
      blue: "#4B5B83",
      purple: "#9C7BBB",
    }),
    // Grey out the decorative accents (they colour the background glow
    // blobs, among other things). Status colours are a separate token set
    // and deliberately keep their meaning.
    extraOverrides: {
      "--color-core-accent-coral": "#A3A3A3",
      "--color-core-accent-violet": "#8F8F8F",
      "--color-core-accent-cobalt": "#5C5C5C",
      "--color-core-accent-amber": "#B8B8B8",
      "--color-core-accent-gold": "#C9C9C9",
      "--color-core-accent-mint": "#ADADAD",
    },
  },
  contrast: {
    label: "Modern blue tint",
    brand: "#1E40AF",
    tintOn: true,
    tintSeed: "#1E40AF",
    tintStrength: 4,
    radiusScale: 100,
    pill: true,
    fontLabel: "IBM Plex Sans",
    // Cool neighbours: every hue eased toward the cobalt key and slightly
    // calmed. Blue is the action family, left alone.
    advanced: bases({
      red: "#E25489",
      orange: "#E27354",
      yellow: "#F4BB71",
      green: "#16C6AB",
      teal: "#1D7DA6",
      purple: "#9354E2",
    }),
  },
  terminal: {
    label: "Terminal green",
    brand: "#05A67C",
    tintOn: true,
    tintSeed: "#06D6A0",
    tintStrength: 4,
    radiusScale: 0,
    pill: false,
    fontLabel: "IBM Plex Mono",
    // Phosphor neighbours: hues lean toward the emerald key, slightly
    // softened. Green is the action family, left alone.
    advanced: bases({
      red: "#E05665",
      orange: "#E09956",
      yellow: "#F1DC74",
      teal: "#1F8AA4",
      blue: "#2B59A3",
      purple: "#7E5BC8",
    }),
  },
};

export const PRESET_OPTIONS = [
  { label: "robr0 DS default", value: "default" },
  { label: "Custom", value: "custom" },
  ...Object.entries(THEME_PRESETS).map(([value, p]) => ({ label: p.label, value })),
];
