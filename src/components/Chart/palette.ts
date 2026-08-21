/**
 * The ordered series palette shared by every multi-series chart.
 * Reads the `--color-chart-series-{n}` tokens at render, so the palette
 * follows the active theme and any consumer re-theming of the tokens.
 * The fallbacks are the light-theme resolved values, used during SSR and
 * when a token is missing from the cascade.
 */
const SERIES_FALLBACKS = [
  '#0E6E8F',
  '#06D6A0',
  '#FFD166',
  '#EF476F',
  '#9E47EF',
  '#EF8247',
  '#1E47B0',
];

export function getChartSeriesColors(): string[] {
  if (typeof window === 'undefined') return SERIES_FALLBACKS;
  const style = getComputedStyle(document.documentElement);
  return SERIES_FALLBACKS.map(
    (fallback, i) =>
      style.getPropertyValue(`--color-chart-series-${i + 1}`).trim() || fallback,
  );
}
