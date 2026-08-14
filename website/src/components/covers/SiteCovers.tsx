import styles from "./SiteCovers.module.css";

/*
 * Literal redraws of two of this site's own screens at 1440 x 900: the home
 * hero, and the playground's Chat view.
 *
 * Hard-coded like every other cover here, and deliberately so even though the
 * real tokens are one import away — a cover is a picture of what the product
 * looked like, and one wired to live tokens would silently redraw itself every
 * time the theme moved. The values were read off the rendered pages.
 */

/** The eight ambient blobs, at the sizes and offsets globals.css gives them. */
const BLOBS: {
  size: number;
  ml: number;
  mt: number;
  colour: string;
}[] = [
  { size: 45, ml: -5, mt: -10, colour: "var(--blob-gold)" },
  { size: 55, ml: -15, mt: -15, colour: "var(--blob-mint)" },
  { size: 90, ml: -10, mt: -20, colour: "var(--blob-violet)" },
  { size: 55, ml: -25, mt: -20, colour: "var(--blob-neutral)" },
  { size: 55, ml: -40, mt: 20, colour: "var(--blob-cobalt)" },
  { size: 48, ml: 15, mt: -50, colour: "var(--blob-coral)" },
  { size: 30, ml: 20, mt: 15, colour: "var(--blob-amber)" },
  { size: 75, ml: -50, mt: -40, colour: "var(--blob-teal)" },
];

/**
 * The ambient field at rest. The live page animates these and swaps in a
 * WebGL shader when it can; a still of a moving field would be a fiction, so
 * this draws the resting CSS fallback the site already ships.
 */
function AmbientBlobs() {
  return (
    <div className={styles.blobs}>
      {BLOBS.map((blob, index) => {
        const size = (blob.size / 100) * 1440;
        return (
          <span
            key={index}
            className={styles.blob}
            style={{
              width: size,
              height: size,
              marginLeft: (blob.ml / 100) * size,
              marginTop: (blob.mt / 100) * size,
              background: blob.colour,
            }}
          />
        );
      })}
    </div>
  );
}

const NAV_LINKS = ["About", "Work", "Writing", "Design system", "Contact"];

/* The real marks the home page uses — already public assets on this site. */
const CLIENTS: { name: string; logo: string }[] = [
  { name: "Gusto", logo: "/logos/gusto.svg" },
  { name: "Intuit", logo: "/logos/Intuit.svg" },
  { name: "Meta", logo: "/logos/meta.svg" },
  { name: "Augmenta.ai", logo: "/logos/Augmenta-2026.svg" },
];

/** A light/dark segmented control, the site's own header control. */
function ThemeToggle() {
  return (
    <div className={styles.themeToggle}>
      <span className={`${styles.themeSegment} ${styles.themeSegmentActive}`}>
        Light
      </span>
      <span className={styles.themeSegment}>Dark</span>
    </div>
  );
}

/** The home hero: 1440 x 900. */
export function SiteHomeCover({ className }: { className?: string }) {
  return (
    <svg
      className={[styles.cover, className].filter(Boolean).join(" ")}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The home page of robertritacca.com: the name set large over the ambient background, with the tagline and client marks beneath."
    >
      <foreignObject x="0" y="0" width="1440" height="900">
        <div className={styles.stage}>
          <AmbientBlobs />

          <div className={styles.header}>
            <span className={styles.logoSlot}>
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 15 L1 4 Q1 1 4 1 L10 1 Q13 1 13 4 Q13 7 10 7 L4 7"
                  stroke="#118ab2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M9 7 L14 15"
                  stroke="#118ab2"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className={styles.wordmark}>Robert Ritacca</span>
            </span>

            <nav className={styles.nav}>
              {NAV_LINKS.map((link) => (
                <span key={link} className={styles.navLink}>
                  {link}
                  {link === "Design system" && (
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </span>
              ))}
            </nav>

            <ThemeToggle />
          </div>

          <div className={styles.hero}>
            <p className={styles.homeTitle}>Robert Ritacca</p>
            <p className={styles.homeSubtitle}>
              Designing and building AI-native products, systems, and
              experiences.
            </p>
            <p className={styles.homeByline}>
              Principal Product Designer, based in Toronto, Canada
            </p>
            <div className={styles.logoRow}>
              {CLIENTS.map((client) => (
                <span key={client.name} className={styles.logoItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- next/image cannot render inside an SVG foreignObject. */}
                  <img className={styles.logoMark} src={client.logo} alt="" />
                  {client.name}
                </span>
              ))}
            </div>
          </div>

          <span className={styles.scrollCue}>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path
                d="M1 1L8 8L15 1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <span className={styles.launcher}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v6A1.5 1.5 0 0 1 12.5 11H6l-3 3v-3H3.5A1.5 1.5 0 0 1 2 9.5z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
            Ask robr0 GPT
          </span>
        </div>
      </foreignObject>
    </svg>
  );
}

/** The colour ramp swatches in the playground rail, both rows. */
const SWATCHES = [
  ["#e5484d", "#f76b15", "#ffc53d", "#46a758", "#12a594", "#3e63dd", "#8e4ec6", "#8b8d98"],
  ["#c62a2f", "#cc4e00", "#e2a336", "#2a7e3b", "#0d7d72", "#2f4eb2", "#6e3aa7", "#63666f"],
];

/** The playground's Chat view: 1440 x 900. */
export function SitePlaygroundCover({ className }: { className?: string }) {
  return (
    <svg
      className={[styles.cover, className].filter(Boolean).join(" ")}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The playground's Chat view: theme controls down the left, the chat widget on a stage that re-themes with them."
    >
      <foreignObject x="0" y="0" width="1440" height="900">
        <div className={styles.stage}>
          <AmbientBlobs />

          <div className={styles.toolbar}>
            <span className={styles.crumbs}>
              <svg width="16" height="12" viewBox="0 0 22 16" fill="none" aria-hidden="true">
                <path
                  d="M1 15 L1 4 Q1 1 4 1 L10 1 Q13 1 13 4 Q13 7 10 7 L4 7"
                  stroke="#118ab2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path d="M9 7 L14 15" stroke="#118ab2" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Design system
              <span>›</span>
              Playground
            </span>

            <span className={styles.viewTabs}>
              <span className={styles.viewTab}>Components</span>
              <span className={`${styles.viewTab} ${styles.viewTabActive}`}>
                Chat
              </span>
            </span>

            <span style={{ color: "var(--text-secondary)" }}>✕</span>
          </div>

          <div className={styles.rail}>
            <p className={styles.railTitle}>Theme controls</p>

            <span className={styles.railField}>
              <span className={styles.railLabel}>Theme preset</span>
              <span className={styles.select}>
                robr0 DS default
                <span>⌄</span>
              </span>
            </span>

            <span className={styles.railField}>
              <span className={styles.railLabel}>Theme</span>
              <span className={styles.radioRow}>
                <span className={`${styles.radioMark} ${styles.radioMarkOn}`} />
                Light
              </span>
              <span className={styles.radioRow}>
                <span className={styles.radioMark} />
                Dark
              </span>
            </span>

            <span className={styles.railField}>
              <span className={styles.railLabel}>Action colour</span>
              <span className={styles.swatchGrid}>
                {SWATCHES.map((row, rowIndex) => (
                  <span key={rowIndex} className={styles.swatchRow}>
                    {row.map((colour, index) => (
                      <span
                        key={colour}
                        className={[
                          styles.swatch,
                          rowIndex === 0 && index === 4 ? styles.swatchOn : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={{ background: colour }}
                      />
                    ))}
                  </span>
                ))}
              </span>
              <span className={styles.hexChip}>
                <span className={styles.hexSwatch} />
                #118AB2
              </span>
              <span className={styles.hexChip}>All colour ramps</span>
            </span>

            <span className={styles.railField}>
              <span className={styles.railLabel}>Product name</span>
              <span className={styles.input}>Acme Corp</span>
            </span>

            <span className={styles.switchRow}>
              <span className={styles.switchTrack}>
                <span className={styles.switchThumb} />
              </span>
              Tint neutrals
            </span>

            <span className={styles.railField}>
              <span className={styles.railLabel}>Corner radius</span>
              <span className={styles.slider}>
                <span className={styles.sliderTrack}>
                  <span className={styles.sliderThumb} />
                </span>
                <span className={styles.sliderValue}>100%</span>
              </span>
            </span>

            <span className={styles.switchRow}>
              <span className={`${styles.switchTrack} ${styles.switchTrackOn}`}>
                <span className={styles.switchThumb} />
              </span>
              Pill buttons
            </span>

            <span className={styles.railField}>
              <span className={styles.railLabel}>Typeface</span>
              <span className={styles.select}>
                Nunito Sans (default)
                <span>⌄</span>
              </span>
            </span>
          </div>

          <div className={styles.widget}>
            <div className={styles.chatHeader}>
              <p className={styles.chatBrand}>Acme Corp</p>
              <span className={styles.chatHeaderIcons}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M9.5 2.5 13.5 6.5 6 14H2v-4z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M10 2h4v4M6 14H2v-4M14 2 9 7M2 14l5-5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 3l10 10M13 3 3 13"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>

            <div className={styles.chatBody}>
              <p className={styles.chatGreetingSmall}>Good evening</p>
              <p className={styles.chatGreeting}>How can we help you today?</p>

              <div className={styles.composer}>
                <p className={styles.composerContent}>Ask anything</p>
                <div className={styles.composerRow}>
                  <span className={styles.composerModel}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M7 1.5 8.4 5.6 12.5 7 8.4 8.4 7 12.5 5.6 8.4 1.5 7 5.6 5.6z"
                        fill="currentColor"
                      />
                    </svg>
                    Sonnet 5
                  </span>
                  <span className={styles.sendButton}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M7 12V2M3 6l4-4 4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className={styles.starters}>
                <span className={styles.starter}>How do I get started?</span>
                <span className={styles.starter}>What do the plans include?</span>
                <span className={styles.starter}>Invite my team to a workspace</span>
              </div>
            </div>

            <p className={styles.chatNote}>
              The agent can make mistakes. Chats are kept for 30 days to improve
              answers.
            </p>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}
