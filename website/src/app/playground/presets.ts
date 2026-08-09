import { DEFAULT_NEUTRAL_SEED, type Overrides } from "./theme-overrides";

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
  /** Preset-specific extras beyond the levers (e.g. greyscale accents). */
  extraOverrides?: Overrides;
}

export const THEME_PRESETS: Record<string, ThemePreset> = {
  warm: {
    label: "Warm serif",
    brand: "#D97757",
    tintOn: true,
    tintSeed: "#C08B5C",
    tintStrength: 8,
    radiusScale: 100,
    pill: true,
    fontLabel: "Lora (serif)",
  },
  mono: {
    label: "Black & white",
    brand: "#171717",
    brandDark: "#F5F5F5",
    tintOn: false,
    tintSeed: DEFAULT_NEUTRAL_SEED,
    tintStrength: 6,
    radiusScale: 40,
    pill: false,
    fontLabel: "Inter",
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
  },
  grape: {
    label: "Deep purple",
    brand: "#7434B3",
    tintOn: true,
    tintSeed: "#9E47EF",
    tintStrength: 5,
    radiusScale: 60,
    pill: false,
    fontLabel: "Space Grotesk",
  },
  candy: {
    label: "Playful pink",
    brand: "#EF476F",
    tintOn: true,
    tintSeed: "#EF476F",
    tintStrength: 6,
    radiusScale: 160,
    pill: true,
    fontLabel: "Poppins",
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
  },
};

export const PRESET_OPTIONS = [
  { label: "robr0 DS default", value: "default" },
  { label: "Custom", value: "custom" },
  ...Object.entries(THEME_PRESETS).map(([value, p]) => ({ label: p.label, value })),
];
