import { useId } from "react";
import styles from "./RiftDsCover.module.css";

/**
 * A responsive redraw of rift-ds.com's home page.
 *
 * ds-allow-file(mockup): every colour, size and type below is a drawing
 * coordinate read off the rendered page, deliberately token-free. This is a
 * picture of another site, and it must not change when this one is re-themed.
 * It follows the same rule as every other cover in this folder.
 *
 * Unlike those covers, this one is not a fixed 1440 x 900 frame scaled down
 * inside an SVG. It is live HTML that reflows on its own container width, the
 * way the page it depicts does: the wide frame shows the desktop layout, the
 * narrow one shows the phone layout, and the type stays at a readable size in
 * both. Two reasons. A fixed frame scaled to a phone column puts 15px type at
 * under 4px, so the picture says nothing there. And mobile WebKit does not
 * render an HTML mock inside a scaled foreignObject reliably, which is why
 * every other cover is displayed as a flat image via CoverImage; this one is
 * the page's whole hero, so it is drawn to need neither.
 *
 * Why a redraw rather than a screenshot or a frame: a raster goes stale and
 * blurs on a retina display, and rift-ds.com is a different origin whose
 * frame-ancestors policy would refuse an iframe.
 */

const NAV = ["Components", "Foundations", "Templates", "Playground", "Docs"];

/* The preset swatch row under the hero. The first is the shipped mono look,
   drawn as an outlined chip because it is the selected one. */
const SWATCHES = [
  "#f4f4f5", "#e5484d", "#e5601d", "#f5b312", "#5bb54b", "#1f6f43",
  "#12a594", "#0e8fa8", "#1a56db", "#8e4ec6", "#d6409f",
];

/**
 * The mark: a tall centre stroke with a shorter one either side, each kinking
 * outward at its foot. The three paths are the ones rift-ds.com's own header
 * draws, on the same 24-unit grid. There the strokes take a gradient between
 * two action tokens; here the stops are fixed, like every other value in this
 * drawing.
 */
function RiftMark() {
  const gradient = useId();
  const stroke = {
    stroke: `url(#${gradient})`,
    strokeWidth: 2.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 1.5 V22.5" {...stroke} />
      <path d="M6.5 7 V12 L2 16.5" {...stroke} />
      <path d="M17.5 7 V12 L22 16.5" {...stroke} />
      <defs>
        <linearGradient id={gradient} x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f4f4f5" />
          <stop offset="1" stopColor="#9ed4e5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Decorative by construction: the whole drawing is hidden from assistive
 * tech, so whatever wraps it (the link on /design-system) carries the name.
 */
export function RiftDsHomeCover({ className }: { className?: string }) {
  return (
    <div
      className={[styles.frame, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <div className={styles.stage}>
        <div className={styles.glow} />

        <div className={styles.header}>
          <span className={styles.brand}>
            <RiftMark />
            <span className={styles.wordmark}>Rift DS</span>
          </span>

          <span className={styles.nav}>
            {NAV.map((item) => (
              <span key={item} className={styles.navLink}>
                {item}
                {item !== "Templates" && item !== "Playground" && (
                  <svg width="9" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                )}
              </span>
            ))}
          </span>

          <span className={styles.headerRight}>
            <span className={styles.search}>
              <span className={styles.searchLabel}>Search or ask anything</span>
              <span className={styles.keys}>
                <span className={styles.key}>⌘</span>
                <span className={styles.key}>K</span>
              </span>
            </span>
            <span className={styles.themeRow}>
              <span className={`${styles.themeChip} ${styles.themeChipActive}`} />
              <span className={styles.themeChip} />
              <span className={styles.themeChip} />
            </span>
            {/* The phone layout's menu button, in place of the nav. */}
            <span className={styles.menu}>
              <span />
              <span />
              <span />
            </span>
          </span>
        </div>

        <div className={styles.hero}>
          {/* Held together so a narrow frame never breaks the line at the hyphen. */}
          <p className={styles.title}>
            The <span className={styles.nowrap}>AI-ready</span> React design system
          </p>
          <p className={styles.subtitle}>
            Open source and fully themeable, built for AI products and coding agents.
          </p>
          <div className={styles.actions}>
            <span className={`${styles.button} ${styles.buttonPrimary}`}>Get started</span>
            <span className={styles.button}>Browse components</span>
          </div>
        </div>

        <div className={styles.statRule} />

        <div className={styles.swatches}>
          {SWATCHES.map((hex, i) => (
            <span
              key={hex}
              className={i === 0 ? `${styles.swatch} ${styles.swatchActive}` : styles.swatch}
              style={{ background: hex }}
            />
          ))}
          <span className={styles.swatchAdd}>+</span>
        </div>

        {/* The collage below the fold, faded out by the frame the way the
            real page runs off the first screen. */}
        <div className={styles.collage}>
          <div className={`${styles.card} ${styles.cardChart}`}>
            <span className={styles.cardTitle}>Spending by category</span>
            <span className={styles.cardDek}>Where this month’s money went.</span>
            <span className={styles.donut} />
          </div>
          <div className={`${styles.card} ${styles.cardInstall}`}>
            <span className={styles.codeBar}>
              <span>BASH</span>
              <span>Copy</span>
            </span>
            <span className={styles.code}>npm install rift-ds</span>
            <span className={styles.cardActions}>
              <span className={`${styles.miniButton} ${styles.miniButtonPrimary}`}>Get started</span>
              <span className={styles.miniButton}>GitHub</span>
            </span>
          </div>
          <div className={`${styles.card} ${styles.cardGlobe}`}>
            <span className={styles.cardTitle}>Where payments come from</span>
            <span className={styles.cardDek}>Hover a city for the client and the invoice.</span>
            <span className={styles.globe} />
          </div>
        </div>
      </div>
    </div>
  );
}
