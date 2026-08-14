import { CASE_STUDY_COVERS } from "@/components/covers/case-study-covers";
import {
  COVER_ASPECTS,
  COVER_STUDIES,
  coverRenderSize,
  coverSlug,
  type CoverAspect,
} from "@/data/cover-renders";
import { openSans } from "../fonts";
import styles from "./page.module.css";

export const metadata = {
  title: "Cover render",
  description: "One cover, alone, at an exact size — the shot surface.",
  robots: { index: false, follow: false },
};

/** The cover components, keyed the way the generator addresses them. */
const BY_SLUG = Object.fromEntries(
  Object.keys(COVER_STUDIES).map((href) => [
    coverSlug(href),
    CASE_STUDY_COVERS[href],
  ]),
);

/**
 * The surface `scripts/generate-cover-rasters.mjs` screenshots.
 *
 * One cover, no padding, no chrome, no labels, sized in exact pixels rather
 * than as a share of the viewport — so the shot is the same on any machine
 * that runs the generator. Everything comes from the query string, and
 * everything the query string may say comes from the cover-renders registry.
 *
 * Nothing links here and it is noindex: it exists to be photographed. The
 * grid at `/covers` is where the covers are actually reviewed.
 */
export default async function CoverRenderPage({
  searchParams,
}: {
  searchParams: Promise<{ cover?: string; aspect?: string }>;
}) {
  const { cover: slug, aspect } = await searchParams;

  const Cover = slug ? BY_SLUG[slug] : undefined;
  const known = aspect && aspect in COVER_ASPECTS;

  if (!Cover || !known) {
    return (
      <main className={styles.page}>
        <p className={styles.error}>
          Needs <code>?cover=</code> (one of {Object.keys(BY_SLUG).join(", ")})
          and <code>&amp;aspect=</code> (one of{" "}
          {Object.keys(COVER_ASPECTS).join(", ")}).
        </p>
      </main>
    );
  }

  const key = aspect as CoverAspect;
  const [w, h] = COVER_ASPECTS[key].ratio;
  const { width, height } = coverRenderSize(key);

  return (
    <main className={`${styles.page} ${openSans.variable}`}>
      <div
        id="shot"
        className={styles.shot}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Cover aspect={w / h} />
      </div>
    </main>
  );
}
