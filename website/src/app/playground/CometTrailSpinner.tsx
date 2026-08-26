import styles from "./CometTrailSpinner.module.css";

/* The Gusto motion lab's "Comet Trail" (option B3), ported for a
   playground-only branding test: a comet lapping the g-tail curl with two
   fading echoes behind it. The spiral is generated, not traced, so it
   stays smooth at any rendered size. */
function spiralD(
  cx: number,
  cy: number,
  r0: number,
  r1: number,
  turns: number,
  phase: number
): string {
  const pts: string[] = [];
  const N = 140;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const th = phase + t * turns * 2 * Math.PI;
    const r = r0 + (r1 - r0) * t;
    pts.push(`${(cx + r * Math.cos(th)).toFixed(2)} ${(cy + r * Math.sin(th)).toFixed(2)}`);
  }
  return `M${pts.join(" L ")}`;
}

const SPIRAL_D = spiralD(24, 24, 17, 4, 2.15, Math.PI);

/* Echoes first so the lead comet paints on top. */
const TRAILS = [styles.t3, styles.t2, ""] as const;

export function CometTrailSpinner() {
  return (
    /* Decorative: the AgentStatus label beside it already says what the
       agent is doing. */
    <span className={styles.spinner} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        {TRAILS.map((echo) => (
          <path
            key={echo || "lead"}
            className={`${styles.trail} ${echo}`.trim()}
            d={SPIRAL_D}
            pathLength={100}
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </span>
  );
}
