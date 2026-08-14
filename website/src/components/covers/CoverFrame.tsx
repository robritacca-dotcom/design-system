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
 */

/** The shared cover box: 16:10, the ratio most of the source screens sit near. */
export const FRAME = { w: 1600, h: 1000 } as const;

/** How much of the frame the mock may occupy before it starts to crowd. */
const INSET = 0.94;

/** The page colour each cover letterboxes against. */
export type Ground =
  "warm" | "white" | "plain" | "paper" | "mist" | "haze" | "site";

const GROUND_CLASS: Record<Ground, string> = {
  warm: styles.groundWarm,
  white: styles.groundWhite,
  plain: styles.groundPlain,
  paper: styles.groundPaper,
  mist: styles.groundMist,
  haze: styles.groundHaze,
  site: styles.groundSite,
};

export function CoverFrame({
  width,
  height,
  label,
  ground,
  className,
  children,
}: {
  /** The mock's native width, in its own pixels. */
  width: number;
  /** The mock's native height, in its own pixels. */
  height: number;
  label: string;
  /** The mock's own edge colour, so the letterbox reads as more page. */
  ground?: Ground;
  className?: string;
  children: React.ReactNode;
}) {
  /* Contain, not cover: a cover crop would cut title bars off the wide
     screens and gut the narrow ones. */
  const scale = Math.min((FRAME.w * INSET) / width, (FRAME.h * INSET) / height);
  const x = (FRAME.w - width * scale) / 2;
  const y = (FRAME.h - height * scale) / 2;

  return (
    <svg
      className={[styles.cover, className].filter(Boolean).join(" ")}
      viewBox={`0 0 ${FRAME.w} ${FRAME.h}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
    >
      <rect
        className={[styles.ground, ground ? GROUND_CLASS[ground] : ""]
          .filter(Boolean)
          .join(" ")}
        x="0"
        y="0"
        width={FRAME.w}
        height={FRAME.h}
      />
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <foreignObject x="0" y="0" width={width} height={height}>
          {children}
        </foreignObject>
      </g>
    </svg>
  );
}
