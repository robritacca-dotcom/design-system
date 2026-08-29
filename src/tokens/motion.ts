/**
 * JS-driven motion timings — the TypeScript side of the motion tokens.
 * CSS transitions read the `--motion-*` custom properties; these constants
 * are the single home for timings that live in JavaScript timers, where a
 * CSS variable cannot reach. Components use them as defaults, so a single
 * instance can still be tuned through its component's own props.
 *
 * Most are schedule timings (when something starts, stops, or is taken
 * away), which the reduced-motion guard in tokens-motion.css deliberately
 * leaves alone. A constant that paces an animation (the streaming reveal's
 * rate floor and drain window) is the exception: its component checks the
 * preference itself in JS, because the CSS guard cannot see a JavaScript
 * timer.
 */

/** Delay before a hover-triggered overlay appears, filtering pass-through hovers. */
export const MOTION_HOVER_SHOW_DELAY_MS = 300;

/** Grace period before a hover-triggered overlay or submenu closes, forgiving a wobbly pointer path. */
export const MOTION_HOVER_HIDE_DELAY_MS = 150;

/** How long a transient notification stays before dismissing itself. */
export const MOTION_AUTO_DISMISS_MS = 5000;

/** Interval between automatic slide advances. */
export const MOTION_AUTOPLAY_INTERVAL_MS = 5000;

/** How long momentary confirmation feedback (a copied state) holds before resetting. */
export const MOTION_FEEDBACK_RESET_MS = 2000;

/** How long after the last scroll event a scroll surface is considered settled. */
export const MOTION_SCROLL_SETTLE_MS = 600;

/** Slowest the streaming reveal ever runs, in characters per second — the pace a thin trickle of deltas types at. An animation pace, not a schedule timing: the reveal is skipped under reduced motion. */
export const MOTION_STREAM_FLOOR_CPS = 70;

/** However much streamed text is waiting, the reveal has it fully on screen within this long — the rate rises with the backlog, so a dumped paragraph catches up in a beat. */
export const MOTION_STREAM_DRAIN_MS = 250;

/** The retired interval-based reveal step. @deprecated The reveal is frame-driven now — pace it with MOTION_STREAM_FLOOR_CPS and MOTION_STREAM_DRAIN_MS. */
export const MOTION_STREAM_CHAR_INTERVAL_MS = 15;
