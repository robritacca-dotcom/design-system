import { CoverFrame, type CoverProps } from "./CoverFrame";
import styles from "./RiftDsCover.module.css";

/**
 * A 1:1 redraw of rift-ds.com's home page, at 1440 x 900.
 *
 * ds-allow-file(mockup): every colour, size and type below is a drawing
 * coordinate read off the rendered page, deliberately token-free. This is a
 * picture of another site, and it must not change when this one is re-themed.
 * It follows the same rule as every other cover in this folder.
 *
 * Why a redraw rather than a screenshot or a frame: a raster goes stale and
 * blurs on a retina display, and rift-ds.com is a different origin, so the
 * scaled-iframe trick the design system's own templates index uses is not
 * available here (and its frame-ancestors policy would refuse it anyway).
 */

const NAV = ["Components", "Foundations", "Templates", "Playground", "Docs"];

/* The preset swatch row under the stats. The first is the shipped mono look,
   drawn as an outlined chip because it is the selected one. */
const SWATCHES = [
  "#f4f4f5", "#e5484d", "#e5601d", "#f5b312", "#5bb54b", "#1f6f43",
  "#12a594", "#0e8fa8", "#1a56db", "#8e4ec6", "#d6409f",
];

/** The mark: two strokes leaning apart, the rift. */
function RiftMark() {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true">
      <path d="M7 1 L2 17" stroke="#f4f4f5" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 1 L8 17" stroke="#9b9ba1" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 4 L18 17" stroke="#6e6e76" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function RiftDsHomeCover(props: CoverProps) {
  return (
    <CoverFrame
      width={1440}
      height={900}
      tone="site"
      {...props}
      label="The home page of rift-ds.com: the headline over a dark ground, a row of the shipped theme presets, and the component cards below it."
    >
      <div className={styles.stage}>
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.header}>
          <span className={styles.brand}>
            <RiftMark />
            <span className={styles.wordmark}>Rift DS</span>
          </span>

          <nav className={styles.nav}>
            {NAV.map((item) => (
              <span key={item} className={styles.navLink}>
                {item}
                {item !== "Templates" && item !== "Playground" && (
                  <svg width="9" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                )}
              </span>
            ))}
          </nav>

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
          </span>
        </div>

        <div className={styles.hero}>
          <p className={styles.title}>The AI-ready React design system</p>
          <p className={styles.subtitle}>
            Open source and fully themeable, built for AI products and coding agents.
          </p>
          <div className={styles.actions}>
            <span className={`${styles.button} ${styles.buttonPrimary}`}>Get started</span>
            <span className={styles.button}>Browse components</span>
          </div>
        </div>

        <div className={styles.statRule} aria-hidden="true" />

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

        {/* The collage below the fold, cropped by the frame the way the real
            page crops it on first paint. */}
        <div className={styles.collage} aria-hidden="true">
          <div className={styles.card}>
            <span className={styles.cardTitle}>Spending by category</span>
            <span className={styles.cardDek}>Where this month&rsquo;s money went.</span>
            <span className={styles.donut} />
          </div>
          <div className={styles.card}>
            <span className={styles.codeBar}>
              <span className={styles.codeLang}>BASH</span>
              <span className={styles.codeCopy}>Copy</span>
            </span>
            <span className={styles.code}>npm install rift-ds</span>
            <span className={styles.cardActions}>
              <span className={`${styles.miniButton} ${styles.miniButtonPrimary}`}>Get started</span>
              <span className={styles.miniButton}>GitHub</span>
            </span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Where payments come from</span>
            <span className={styles.cardDek}>Hover a city for the client and the invoice.</span>
            <span className={styles.globe} />
          </div>
        </div>
      </div>
    </CoverFrame>
  );
}
