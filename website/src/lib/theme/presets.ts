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
  classic: {
    label: "robr0 DS Classic",
    // The pre-promotion shipped theme, kept as a revert handle: teal-07 as
    // one action colour across both themes, before "Accessible teal" (the
    // per-theme split now shipped in the token files) became the default.
    // The lever derives an inverted dark plan from teal-07, so every role
    // is pinned to the exact steps the old tokens-light/dark.css used.
    brand: "#118AB2",
    tintOn: false,
    tintSeed: DEFAULT_NEUTRAL_SEED,
    tintStrength: 6,
    radiusScale: 100,
    pill: true,
    fontLabel: "Nunito Sans (default)",
    extraOverrides: {
      "--color-action-primary-bg": "var(--primitive-teal-07)",
      "--color-action-primary-bg-hover": "var(--primitive-teal-08)",
      "--color-action-primary-bg-active": "var(--primitive-teal-09)",
      "--color-action-primary-text": "var(--primitive-teal-02)",
      "--color-action-primary-text-tertiary": "var(--primitive-teal-07)",
      "--color-action-primary-border": "var(--primitive-teal-09)",
      "--color-action-primary-border-secondary": "var(--primitive-teal-06)",
      "--color-action-primary-border-tertiary": "var(--primitive-teal-04)",
      "--color-action-icon-active": "var(--primitive-teal-02)",
      "--color-core-ui-primary": "var(--primitive-teal-07)",
      "--color-core-ui-secondary": "var(--primitive-teal-10)",
      "--color-input-border-hover": "var(--primitive-teal-04)",
      "--color-input-border-selected": "var(--primitive-teal-06)",
      "--color-ai-gradient-end": "var(--primitive-teal-06)",
    },
    // The classic theme pointed both themes at the same fills; only these
    // five roles differed in its dark file.
    extraOverridesDark: {
      "--color-action-primary-text-active": "var(--primitive-neutral-01)",
      "--color-action-icon-active": "var(--primitive-neutral-01)",
      "--color-core-ui-secondary": "var(--primitive-teal-09)",
      "--color-input-border-hover": "var(--primitive-teal-09)",
      "--color-ai-gradient-end": "var(--primitive-teal-05)",
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
