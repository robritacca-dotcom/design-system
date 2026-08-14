import styles from "./CoverFrame.module.css";

/**
 * The shared outer frame every cover renders into.
 *
 * The source screens are all different shapes — 1440x972, 1440x1024,
 * 440x972, 1638x1064, and so on, from 0.44 to 1.76 in aspect. Dropped
 * straight into a card grid each one would letterbox differently and read at
 * a different size. This frame gives them a single 16:10 box and scales each
 * mock to fit inside it, so a row of covers reads as one set: the desktop
 * screens all land at the same height, and the phone screens sit on the same
 * ground at the same scale as each other.
 *
 * Scaling happens on a `<g>` around the foreignObject, so each mock keeps its
 * own native pixel geometry inside — nothing is re-laid-out to fit, which is
 * what keeps the redraws 1:1 with their sources.
 *
 * Two treatments. "thumb" floats the mock on a gradient drawn from the
 * product's own colours, for a card or a listing. "bleed" fills the frame and
 * letterboxes against the mock's own page colour, for use inside a case study
 * where the screen should read as the subject rather than as an object.
 */

/** The shared cover box: 16:10, the ratio most of the source screens sit near. */
export const FRAME = { w: 1600, h: 1000 } as const;

/** How much of the frame the mock may occupy, per treatment. */
const INSET = { thumb: 0.78, bleed: 0.94 } as const;

/** The corner radius and shadow the floating mock gets, in frame units. */
const CARD = { radius: 18, shadowY: 26, shadowBlur: 44 } as const;

/** The mock's own page colour, for the bleed treatment's letterbox. */
export type Ground =
  "warm" | "white" | "plain" | "paper" | "mist" | "haze" | "site";

/** The product the gradient is drawn from. */
export type Tone =
  "claude" | "openai" | "intuit" | "augmenta" | "meta" | "site";

const GROUND_CLASS: Record<Ground, string> = {
  warm: styles.groundWarm,
  white: styles.groundWhite,
  plain: styles.groundPlain,
  paper: styles.groundPaper,
  mist: styles.groundMist,
  haze: styles.groundHaze,
  site: styles.groundSite,
};

const TONE_CLASS: Record<Tone, string> = {
  claude: styles.toneClaude,
  openai: styles.toneOpenai,
  intuit: styles.toneIntuit,
  augmenta: styles.toneAugmenta,
  meta: styles.toneMeta,
  site: styles.toneSite,
};

export function CoverFrame({
  width,
  height,
  label,
  ground,
  tone,
  variant = "thumb",
  className,
  children,
}: {
  /** The mock's native width, in its own pixels. */
  width: number;
  /** The mock's native height, in its own pixels. */
  height: number;
  label: string;
  /** The mock's own edge colour, used by the bleed treatment. */
  ground?: Ground;
  /** The product whose colours the thumbnail gradient is drawn from. */
  tone?: Tone;
  variant?: "thumb" | "bleed";
  className?: string;
  children: React.ReactNode;
}) {
  const thumb = variant === "thumb";
  const inset = thumb ? INSET.thumb : INSET.bleed;

  /* Contain, not cover: a cover crop would cut title bars off the wide
     screens and gut the narrow ones. */
  const scale = Math.min((FRAME.w * inset) / width, (FRAME.h * inset) / height);
  const w = width * scale;
  const h = height * scale;
  const x = (FRAME.w - w) / 2;
  const y = (FRAME.h - h) / 2;

  /* The card's radius is specified in frame units, so it has to be divided
     back out for the mock, which lives in its own scaled coordinates. */
  const mockRadius = CARD.radius / scale;

  return (
    <svg
      className={[styles.cover, className].filter(Boolean).join(" ")}
      viewBox={`0 0 ${FRAME.w} ${FRAME.h}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
    >
      {thumb ? (
        <foreignObject x="0" y="0" width={FRAME.w} height={FRAME.h}>
          <div
            className={[styles.gradient, tone ? TONE_CLASS[tone] : ""]
              .filter(Boolean)
              .join(" ")}
          />
        </foreignObject>
      ) : (
        <rect
          className={[styles.ground, ground ? GROUND_CLASS[ground] : ""]
            .filter(Boolean)
            .join(" ")}
          x="0"
          y="0"
          width={FRAME.w}
          height={FRAME.h}
        />
      )}

      {/* The shadow is drawn in the SVG rather than on the mock: a box-shadow
          inside the foreignObject would be clipped by its own bounds. */}
      {thumb && (
        <rect
          className={styles.cardShadow}
          x={x}
          y={y + CARD.shadowY}
          width={w}
          height={h}
          rx={CARD.radius}
        />
      )}

      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <foreignObject x="0" y="0" width={width} height={height}>
          {thumb ? (
            <div
              className={styles.card}
              style={{ borderRadius: `${mockRadius}px` }}
            >
              {children}
            </div>
          ) : (
            children
          )}
        </foreignObject>
      </g>

      {thumb && (
        <rect
          className={styles.cardEdge}
          x={x + 0.5}
          y={y + 0.5}
          width={w - 1}
          height={h - 1}
          rx={CARD.radius}
        />
      )}
    </svg>
  );
}
