import {
  ESSAY_COVER_SIZE,
  essayCoverAlt,
  essayCoverSrc,
} from "@/data/essay-covers";
import styles from "./CoverImage.module.css";
import local from "./EssayCover.module.css";

/**
 * An essay's illustrated cover.
 *
 * Each essay has two illustrations, a daylight one for the light theme and a
 * dusk one for the dark theme. Both load and CSS cross-fades them on the
 * theme attribute, the same pair-and-swap `CoverImage` uses for the case-study
 * renders, so switching theme never flashes a missing image or waits on a
 * fetch. The styles are shared with `CoverImage` for the same reason: one
 * swap, one timing.
 *
 * Fills whatever slot it is given (the Card cover slot, the home page's cover
 * frame); the container owns the aspect ratio and `object-fit: cover` crops
 * the 3:2 illustration to it.
 */
export function EssayCover({
  slug,
  alt,
  className,
  priority = false,
}: {
  /** The essay's `/writing/<slug>` segment — the key the files are named from. */
  slug: string;
  /** Defaults to the registry's description; pass "" for a decorative cover. */
  alt?: string;
  className?: string;
  /** Set on an above-the-fold cover to opt out of lazy loading. */
  priority?: boolean;
}) {
  const { width, height } = ESSAY_COVER_SIZE;
  const description = alt ?? essayCoverAlt(slug);
  const loading = priority ? undefined : "lazy";

  return (
    <span className={[styles.cover, local.fill, className].filter(Boolean).join(" ")}>
      {/* eslint-disable-next-line @next/next/no-img-element -- the asset is
          already exported at the size and format it ships in, and both themes
          must be in the DOM for the CSS swap. */}
      <img
        className={`${styles.shot} ${styles.light}`}
        src={essayCoverSrc(slug, "light")}
        alt={description}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- as above; the
          dusk illustration that cross-fades in. */}
      <img
        className={`${styles.shot} ${styles.dark}`}
        src={essayCoverSrc(slug, "dark")}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
    </span>
  );
}
