/**
 * JS-driven motion timings — the TypeScript side of the motion tokens.
 * CSS transitions read the `--motion-*` custom properties; these constants
 * are the single home for timings that live in JavaScript timers, where a
 * CSS variable cannot reach. Components use them as defaults, so a single
 * instance can still be tuned through its component's own props.
 *
 * These are schedule timings (when something starts, stops, or is taken
 * away), not animation durations, so the reduced-motion guard in
 * tokens-motion.css deliberately does not apply to them.
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
