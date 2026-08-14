import {
  COVER_ASPECTS,
  coverAlt,
  coverRenderSize,
  coverRenderSrc,
  type CoverAspect,
} from "@/data/cover-renders";
import styles from "./CoverImage.module.css";

/**
 * A case-study cover, as a flat image.
 *
 * The drawing still lives in the vector components next to this file — this
 * renders the shot of one. Both themes load and CSS swaps them, the same
 * cross-fade the mocks use for their own light/dark screenshots, so switching
 * theme never flashes a missing image or waits on a fetch.
 *
 * `alt` defaults to the registry's description of the screen. A cover is a
 * picture of the work rather than decoration, and it describes what the screen
 * shows rather than restating the title beside it, so it adds information
 * instead of repeating it. Pass `alt=""` to opt out where a cover really is
 * decorative.
 */
export function CoverImage({
  href,
  aspect,
  alt,
  className,
  priority = false,
}: {
  /** The study's `/work/<slug>` href — the key the renders are named from. */
  href: string;
  /** Which shot to use. The ratio and pixel size come from the registry. */
  aspect: CoverAspect;
  /** Defaults to the registry's description; pass "" for a decorative cover. */
  alt?: string;
  className?: string;
  /** Set on an above-the-fold cover to opt out of lazy loading. */
  priority?: boolean;
}) {
  const { width, height } = coverRenderSize(aspect);
  const description = alt ?? coverAlt(href);
  const [w, h] = COVER_ASPECTS[aspect].ratio;
  const loading = priority ? undefined : "lazy";

  return (
    <span
      className={[styles.cover, className].filter(Boolean).join(" ")}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image would
          fetch-and-reencode an asset that is already generated at exactly the
          size and format it ships in, and both themes must be in the DOM for
          the CSS swap. */}
      <img
        className={`${styles.shot} ${styles.light}`}
        src={coverRenderSrc(href, aspect, "light")}
        alt={description}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- as above; the
          dark render that cross-fades in. */}
      <img
        className={`${styles.shot} ${styles.dark}`}
        src={coverRenderSrc(href, aspect, "dark")}
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
