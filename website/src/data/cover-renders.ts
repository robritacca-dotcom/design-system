import data from "./cover-renders.json";

/**
 * The raster renders of the vector covers.
 *
 * The covers are drawn in CSS/SVG and live in `src/components/covers/` — that
 * is still where a cover is authored and changed. But an HTML mock inside an
 * SVG `foreignObject`, shrunk by a scale transform, is not something mobile
 * WebKit renders reliably, so the places a cover is *displayed* read a flat
 * image instead. `/covers` keeps rendering the vectors: it is the staging
 * surface the images are shot from, and the only place the drawing itself is
 * on screen.
 *
 * One render per study, aspect and theme. Regenerate with
 * `npm run covers:render` after changing a cover.
 */

export type CoverAspect = keyof typeof data.aspects;
export type CoverTheme = "light" | "dark";

export const COVER_ASPECTS = data.aspects as Record<
  CoverAspect,
  {
    ratio: [number, number];
    width: number;
    use: string;
    /** The CoverFrame treatment to shoot: "bleed" letterboxes the screen
        against its own page colour, "full" fills the frame with the screen
        alone; left out, the gradient "thumb" treatment is used. */
    variant?: "thumb" | "bleed" | "full";
  }
>;

/** What each study's cover is rendered at, and what it shows. */
export const COVER_STUDIES = data.studies as Record<
  string,
  { alt: string; aspects: CoverAspect[] }
>;

/**
 * What the cover shows, for the image's alt text.
 *
 * These describe the *screen* rather than restating the study title sitting
 * next to it — a cover is a picture of the work, not decoration, so it earns a
 * description rather than an empty alt.
 */
export function coverAlt(href: string): string {
  return COVER_STUDIES[href]?.alt ?? "";
}

/** `/work/augmenta-ai` → `augmenta-ai`, the stem every file name is built on. */
export function coverSlug(href: string): string {
  return href.replace(/^\/work\//, "");
}

/** The public path of one render. The single source for these file names. */
export function coverRenderSrc(
  href: string,
  aspect: CoverAspect,
  theme: CoverTheme,
): string {
  return `/covers/rendered/${coverSlug(href)}-${aspect}-${theme}.webp`;
}

/** The width/height a render is shot at, in pixels. */
export function coverRenderSize(aspect: CoverAspect): {
  width: number;
  height: number;
} {
  const { ratio, width } = COVER_ASPECTS[aspect];
  return { width, height: Math.round((width * ratio[1]) / ratio[0]) };
}

export type CoverRenderTarget = {
  href: string;
  slug: string;
  aspect: CoverAspect;
  theme: CoverTheme;
  width: number;
  height: number;
  /** Public path, e.g. `/covers/rendered/augmenta-ai-card-light.webp`. */
  src: string;
};

/** Every (study, aspect, theme) render the site expects to exist. */
export const COVER_RENDER_TARGETS: CoverRenderTarget[] = Object.entries(
  COVER_STUDIES,
).flatMap(([href, { aspects }]) =>
  aspects.flatMap((aspect) =>
    (["light", "dark"] as CoverTheme[]).map((theme) => ({
      href,
      slug: coverSlug(href),
      aspect,
      theme,
      ...coverRenderSize(aspect),
      src: coverRenderSrc(href, aspect, theme),
    })),
  ),
);
