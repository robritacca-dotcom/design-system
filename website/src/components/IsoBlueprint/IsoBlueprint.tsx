import styles from "./IsoBlueprint.module.css";

/* An isometric blueprint of the build pipeline, drawn as pure line work
   tucked into the hero's upper right: a commit rides a conveyor through
   three plates, the middle one glowing where the validators run. No words,
   only marks. Purely decorative (aria-hidden), server-rendered, every
   colour a semantic token.

   Geometry lives in plan space (a flat top-down drawing) and one matrix
   projects it into the isometric view, so every shape is authored as a
   plain rect or line. Billboard elements (upright circles and dots) are
   placed at projected coordinates via iso(). */

/* Projection: plan +x runs down-right on screen, plan +y runs down-left. */
const K = 0.62;
const KX = 0.866 * K;
const KY = 0.5 * K;
const TX = 760;
const TY = -60;

const iso = (x: number, y: number): [number, number] => [
  TX + (x - y) * KX,
  TY + (x + y) * KY,
];

const ISO_MATRIX = `matrix(${KX} ${KY} ${-KX} ${KY} ${TX} ${TY})`;

/* Plan-space layout constants */
const TRACK_TOP = 0;
const TRACK_BOTTOM = 140;
const TRACK_MID = 70;
const PLATE_HALF = 130;
const PLATES = { tokens: 260, validate: 760, ship: 1260 };

const GRID_X: number[] = [];
for (let x = -400; x <= 2100; x += 100) GRID_X.push(x);
const GRID_Y: number[] = [];
for (let y = -700; y <= 800; y += 100) GRID_Y.push(y);

/* Ruler ticks beside the neutral plates, echoing the reference's edge
   hatching. */
const tickXs = (cx: number) => {
  const xs: number[] = [];
  for (let x = cx - PLATE_HALF; x <= cx + PLATE_HALF; x += 20) xs.push(x);
  return xs;
};

/* A chain of ringed dots fanning off the last plate down-left along
   plan +y, like the reference's chain of destinations. */
const CHAIN = { x: 1260, startY: 250, step: 70, count: 4 };

type Stage = {
  accent: boolean;
  /* plan coords of the plate's top corner the leader starts from */
  fromX: number;
  fromY: number;
  dx: number;
  dy: number;
};

/* Dashed leaders rising from each plate to a small empty ring. */
const STAGES: Stage[] = [
  { accent: false, fromX: PLATES.tokens, fromY: TRACK_MID - PLATE_HALF, dx: 64, dy: -40 },
  { accent: true, fromX: PLATES.validate, fromY: TRACK_MID - PLATE_HALF, dx: 72, dy: -64 },
  { accent: false, fromX: PLATES.ship, fromY: TRACK_MID - PLATE_HALF, dx: 64, dy: -52 },
];

function Plate({ cx, accent }: { cx: number; accent?: boolean }) {
  const half = PLATE_HALF;
  const inset = 24;
  return (
    <g>
      {accent ? (
        <rect
          className={styles.glowRect}
          x={cx - half - 60}
          y={TRACK_MID - half - 60}
          width={(half + 60) * 2}
          height={(half + 60) * 2}
          filter="url(#iso-glow)"
        />
      ) : null}
      <rect
        className={accent ? styles.plateOuterAccent : styles.plateOuter}
        x={cx - half}
        y={TRACK_MID - half}
        width={half * 2}
        height={half * 2}
        vectorEffect="non-scaling-stroke"
      />
      <rect
        className={accent ? styles.plateInnerAccent : styles.plateInner}
        x={cx - half + inset}
        y={TRACK_MID - half + inset}
        width={(half - inset) * 2}
        height={(half - inset) * 2}
        fill={accent ? "url(#iso-hatch-accent)" : "url(#iso-hatch)"}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}

/* A small circled tick mark sitting upright on the track, like the
   reference's inline port glyphs. */
function TrackNode({ x, y }: { x: number; y: number }) {
  const [sx, sy] = iso(x, y);
  return (
    <g className={styles.trackNode}>
      <circle cx={sx} cy={sy} r={9} />
      <line x1={sx - 4} y1={sy} x2={sx + 4} y2={sy} />
    </g>
  );
}

export default function IsoBlueprint() {
  return (
    <div className={styles.frame} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMaxYMin slice"
        role="presentation"
        focusable="false"
      >
        <defs>
          <pattern id="iso-hatch" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M-2 2 L2 -2 M0 10 L10 0 M8 12 L12 8" className={styles.hatchLine} />
          </pattern>
          <pattern id="iso-hatch-accent" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M-2 2 L2 -2 M0 10 L10 0 M8 12 L12 8" className={styles.hatchLineAccent} />
          </pattern>
          <linearGradient
            id="iso-band"
            gradientUnits="userSpaceOnUse"
            x1="380"
            y1="0"
            x2="1180"
            y2="0"
          >
            <stop offset="0" className={styles.bandStop} stopOpacity="0" />
            <stop offset="0.4" className={styles.bandStop} stopOpacity="0.4" />
            <stop offset="0.6" className={styles.bandStop} stopOpacity="0.75" />
            <stop offset="1" className={styles.bandStop} stopOpacity="0" />
          </linearGradient>
          <filter id="iso-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="34" />
          </filter>
          {/* Luminance mask: a soft ellipse clears the drawing out of the
              bottom-left corner, where the hero text sits. */}
          <radialGradient id="iso-fade-grad">
            <stop offset="0.5" stopColor="#000" stopOpacity="1" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <mask id="iso-fade">
            <rect x="0" y="0" width="1440" height="800" fill="#fff" />
            <ellipse cx="280" cy="680" rx="580" ry="360" fill="url(#iso-fade-grad)" />
          </mask>
        </defs>

        <g mask="url(#iso-fade)">
          {/* ── Floor plane: everything here is drawn flat and projected ── */}
          <g transform={ISO_MATRIX}>
            {/* Isometric grid */}
            <g className={styles.grid}>
              {GRID_X.map((x) => (
                <line key={`gx${x}`} x1={x} y1={-700} x2={x} y2={800} vectorEffect="non-scaling-stroke" />
              ))}
              {GRID_Y.map((y) => (
                <line key={`gy${y}`} x1={-400} y1={y} x2={2100} y2={y} vectorEffect="non-scaling-stroke" />
              ))}
            </g>

            {/* Second lane, lower right: the parallel deploy */}
            <g className={styles.rail}>
              <line x1={200} y1={560} x2={2100} y2={560} vectorEffect="non-scaling-stroke" />
              <line x1={200} y1={680} x2={2100} y2={680} vectorEffect="non-scaling-stroke" />
            </g>
            <rect
              className={styles.plateOuter}
              x={1500 - 95}
              y={620 - 95}
              width={190}
              height={190}
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x={1500 - 71}
              y={620 - 71}
              width={142}
              height={142}
              className={styles.plateInner}
              fill="url(#iso-hatch)"
              vectorEffect="non-scaling-stroke"
            />

            {/* Main track rails */}
            <g className={styles.rail}>
              <line x1={-350} y1={TRACK_TOP} x2={2050} y2={TRACK_TOP} vectorEffect="non-scaling-stroke" />
              <line x1={-350} y1={TRACK_BOTTOM} x2={2050} y2={TRACK_BOTTOM} vectorEffect="non-scaling-stroke" />
            </g>

            {/* Ruler ticks beside the neutral plates */}
            <g className={styles.tick}>
              {[PLATES.tokens, PLATES.ship].flatMap((cx) =>
                tickXs(cx).map((x) => (
                  <g key={`t${cx}-${x}`}>
                    <line x1={x} y1={-16} x2={x} y2={-2} vectorEffect="non-scaling-stroke" />
                    <line x1={x} y1={142} x2={x} y2={156} vectorEffect="non-scaling-stroke" />
                  </g>
                ))
              )}
            </g>

            {/* The glowing route band through the middle plate */}
            <rect x={380} y={2} width={800} height={136} fill="url(#iso-band)" />
            <line
              className={styles.flowLine}
              x1={380}
              y1={TRACK_MID}
              x2={1180}
              y2={TRACK_MID}
              vectorEffect="non-scaling-stroke"
            />

            {/* Chain leader line (the dots are billboards below) */}
            <line
              className={styles.chainLine}
              x1={CHAIN.x}
              y1={TRACK_MID + PLATE_HALF + 10}
              x2={CHAIN.x}
              y2={CHAIN.startY + CHAIN.step * (CHAIN.count - 1) + 30}
              vectorEffect="non-scaling-stroke"
            />

            {/* Plates */}
            <Plate cx={PLATES.tokens} />
            <Plate cx={PLATES.validate} accent />
            <Plate cx={PLATES.ship} />
          </g>

          {/* ── Billboards: upright elements at projected points ── */}
          <TrackNode x={40} y={TRACK_MID} />
          <TrackNode x={560} y={TRACK_MID} />

          {/* Chain dots */}
          {Array.from({ length: CHAIN.count }, (_, i) => {
            const [sx, sy] = iso(CHAIN.x, CHAIN.startY + i * CHAIN.step);
            return (
              <g key={`chain-${i}`}>
                <circle className={styles.chainDotOuter} cx={sx} cy={sy} r={5.5} />
                <circle className={styles.chainDotInner} cx={sx} cy={sy} r={2.2} />
              </g>
            );
          })}

          {/* Stage leaders: dashed line up-right to a small empty ring */}
          {STAGES.map((stage, i) => {
            const [sx, sy] = iso(stage.fromX, stage.fromY);
            const ex = sx + stage.dx;
            const ey = sy + stage.dy;
            return (
              <g key={`stage-${i}`}>
                <line
                  className={stage.accent ? styles.leaderAccent : styles.leader}
                  x1={sx}
                  y1={sy}
                  x2={ex}
                  y2={ey}
                />
                <circle
                  className={stage.accent ? styles.numCircleAccent : styles.numCircle}
                  cx={ex}
                  cy={ey - 10}
                  r={10}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
