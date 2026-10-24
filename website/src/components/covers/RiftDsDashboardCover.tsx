import { CoverFrame, type CoverProps } from "./CoverFrame";
import styles from "./RiftDsDashboardCover.module.css";

/*
 * Rift DS's marketing dashboard template, as published on rift-ds.com, in the
 * Blueprint theme, light and dark.
 *
 * Unlike the redraws beside it, this one is a capture rather than a drawing:
 * the subject is the design system itself, so the faithful picture of it is
 * its own render, not a copy of one. Both themes are shot once at 1600 x 1000
 * (2x) and frozen into public/covers, so a later release restyling the
 * template never changes the cover. To re-shoot, load
 * /templates/marketing-dashboard on rift-ds.com with localStorage `brand` =
 * "contrast" and `theme` = "light" or "dark".
 */
export function RiftDsDashboardCover(props: CoverProps) {
  return (
    <CoverFrame
      width={1600}
      height={1000}
      tone="blueprint"
      {...props}
      label="Rift DS's marketing dashboard template in the Blueprint theme: four metric tiles over an ad spend bar chart and a visitors area chart."
    >
      <div className={styles.screen}>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/image cannot render inside an SVG foreignObject, and both captures are fixed-size static assets. */}
        <img
          className={`${styles.render} ${styles.renderLight}`}
          src="/covers/rift-ds-dashboard-blueprint-light.webp"
          alt=""
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- as above; this is the dark capture that cross-fades in. */}
        <img
          className={`${styles.render} ${styles.renderDark}`}
          src="/covers/rift-ds-dashboard-blueprint-dark.webp"
          alt=""
        />
      </div>
    </CoverFrame>
  );
}
