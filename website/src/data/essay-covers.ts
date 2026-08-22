import data from "./essay-covers.json";

/**
 * The illustrated covers for the essays on /writing.
 *
 * Substack's feed covers are a headshot or nothing, so each essay gets a
 * commissioned illustration instead, drawn twice: a daylight version for the
 * light theme and a dusk version for the dark one. Both ship under
 * `website/public/covers/writing/` and `EssayCover` swaps them with the theme.
 *
 * Keyed by the essay slug (the `/writing/<slug>` segment, which is also the
 * key in essays.json). `scripts/validate-essay-covers.mjs` holds this registry
 * to essays.json and to the files on disk in both directions, so an essay
 * cannot be published without a pair and a pair cannot outlive its essay.
 */

export type EssayCoverTheme = "light" | "dark";

export const ESSAY_COVERS = data.covers as Record<string, { alt: string }>;

/** Whether an essay has an illustrated cover pair. */
export function hasEssayCover(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(ESSAY_COVERS, slug);
}

/**
 * What the illustration shows, for the image's alt text. A cover is the
 * essay's picture rather than decoration, and it describes the scene instead
 * of restating the title sitting next to it.
 */
export function essayCoverAlt(slug: string): string {
  return ESSAY_COVERS[slug]?.alt ?? "";
}

/** The public path of one cover. The single source for these file names. */
export function essayCoverSrc(slug: string, theme: EssayCoverTheme): string {
  return `/covers/writing/${slug}-${theme}.webp`;
}

/** The pixel size every cover is exported at (3:2). */
export const ESSAY_COVER_SIZE = { width: 1344, height: 896 } as const;
