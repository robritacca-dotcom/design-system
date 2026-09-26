/**
 * Which of the design system's shipped looks this site wears.
 *
 * Rift DS publishes a set of theme presets. Each is a complete look, not a
 * palette: colour, radius, density, motion, elevation and typeface, in both
 * light and dark, applied by one attribute on <html> with no runtime
 * JavaScript. `'default'` means none of them, which is the system's own
 * shipped look (teal action colour, Nunito Sans).
 *
 * To change the site's look, two lines move together:
 *
 *   1. BRAND below.
 *   2. The preset stylesheet import in `website/src/app/layout.tsx`.
 *
 * They cannot be linked in code, because a static import cannot be
 * interpolated from a constant, and importing the whole preset bundle would
 * ship ten stylesheets to every visitor to use one. So the pair is held
 * together by `scripts/validate-brand-preset.mjs` instead, which fails the
 * build when they disagree. Editing one without the other is a build error,
 * not a silent mismatch.
 *
 * Switching also changes the typeface. On `'default'` the face is Nunito Sans,
 * loaded through next/font in the layout; every preset brings its own,
 * self-hosted inside the package. If you move off `'default'`, that next/font
 * pipeline becomes dead weight and should go with it.
 */
export type Brand =
  | 'default'
  | 'contrast'
  | 'coral'
  | 'forest'
  | 'gold'
  | 'mono'
  | 'pink'
  | 'terminal'
  | 'violet'
  | 'warm'
  | 'zest';

export const BRAND: Brand = 'default';

/** The value for <html data-brand>, or undefined when no preset is applied. */
export const BRAND_ATTRIBUTE = BRAND === 'default' ? undefined : BRAND;
