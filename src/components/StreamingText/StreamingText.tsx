'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MOTION_STREAM_CHAR_INTERVAL_MS } from '../../tokens/motion';
import './StreamingText.css';

/** Props owned by StreamingText itself — everything else falls through to the root span. */
type StreamingTextOwnProps = {
  /**
   * The text received so far. Grow it across renders as chunks arrive; the
   * reveal animates through the appended part. A value that does not extend
   * the previous one is treated as a new message and reveals from the start.
   */
  text: string;
  /**
   * Whether the source is still producing text. Keeps the cursor visible
   * between chunks, when the reveal has caught up but more may arrive.
   */
  streaming?: boolean;
  /**
   * Milliseconds between reveal steps. The reveal adds more characters per
   * step the further it falls behind, so a large chunk catches up instead of
   * typing for seconds.
   */
  charIntervalMs?: number;
  /** Shows the blinking cursor while streaming or revealing. */
  cursor?: boolean;
  /**
   * Fires once when the reveal catches up with `text` after `streaming` has
   * ended — the moment the message is fully on screen.
   */
  onRevealComplete?: () => void;
  /** Additional CSS classes */
  className?: string;
};

export interface StreamingTextProps
  extends StreamingTextOwnProps,
    Omit<React.ComponentPropsWithoutRef<'span'>, keyof StreamingTextOwnProps | 'children'> {}

/**
 * StreamingText — the reveal for text that arrives in chunks: an LLM
 * response typing itself out, with a cursor that blinks while more is
 * coming. Feed it the accumulated text on every render and it animates
 * through what was appended, catching up faster the further behind it
 * falls. Under `prefers-reduced-motion` the reveal is skipped and each
 * chunk appears whole. Announcement is the container's job — pair it with
 * an `aria-live` region when the surrounding UI does not already announce
 * the message.
 */
export const StreamingText = React.forwardRef<HTMLSpanElement, StreamingTextProps>(
  (
    {
      text,
      streaming = false,
      charIntervalMs = MOTION_STREAM_CHAR_INTERVAL_MS,
      cursor = true,
      onRevealComplete,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const baseClass = 'ds-streaming-text';

    // Text present on mount shows whole; only appended text animates.
    const [revealed, setRevealed] = useState(text.length);
    const previousText = useRef(text);
    const completed = useRef(false);

    useEffect(() => {
      // A replacement (not an extension) is a new message: reveal from zero.
      if (!text.startsWith(previousText.current)) {
        setRevealed(0);
        completed.current = false;
      }
      previousText.current = text;
    }, [text]);

    const caughtUp = revealed >= text.length;

    useEffect(() => {
      if (caughtUp) return;
      completed.current = false;

      // Reduced motion: no typing — each chunk appears whole.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setRevealed(text.length);
        return;
      }

      const interval = setInterval(() => {
        setRevealed((current) => {
          const pending = text.length - current;
          if (pending <= 0) return current;
          // The further behind, the bigger the step — a dumped paragraph
          // catches up in a beat instead of typing for seconds.
          return current + Math.max(1, Math.round(pending / 20));
        });
      }, charIntervalMs);
      return () => clearInterval(interval);
    }, [text, caughtUp, charIntervalMs]);

    useEffect(() => {
      if (caughtUp && !streaming && text.length > 0 && !completed.current) {
        completed.current = true;
        onRevealComplete?.();
      }
    }, [caughtUp, streaming, text, onRevealComplete]);

    const showCursor = cursor && (streaming || !caughtUp);

    const classes = [baseClass, className].filter(Boolean).join(' ');

    return (
      <span {...rest} ref={ref} className={classes}>
        {caughtUp ? text : text.slice(0, revealed)}
        {showCursor && <span className={`${baseClass}__cursor`} aria-hidden="true" />}
      </span>
    );
  },
);

StreamingText.displayName = 'StreamingText';
