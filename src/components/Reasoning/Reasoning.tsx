'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import './Reasoning.css';
import '../../fonts/material-symbols.css';

/** Props owned by Reasoning itself — everything else falls through to the root element. */
type ReasoningOwnProps = {
  /** The model is still producing the trace. Opens the panel and shimmers the summary. */
  streaming?: boolean;
  /** Seconds spent reasoning, shown in the summary once complete. */
  duration?: number;
  /** Override the summary line. By default it reports the streaming state and the duration. */
  label?: string;
  /** Open state for controlled use. Pair with `onOpenChange`. */
  open?: boolean;
  /** Open state for uncontrolled use. Defaults to open while `streaming`. */
  defaultOpen?: boolean;
  /** Fires whenever the panel opens or closes, from a click or from the stream ending. */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** The reasoning trace. */
  children?: React.ReactNode;
};

export interface ReasoningProps
  extends ReasoningOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof ReasoningOwnProps> {}

/**
 * Reasoning discloses a model's thinking without letting it dominate the
 * response: open while the trace streams in, collapsed to a one-line summary
 * once it finishes.
 *
 * The auto-collapse yields to the reader — once someone has toggled the panel
 * themselves, the stream ending no longer closes it.
 *
 * Only the summary line is a live region. A trace announced token by token
 * floods a screen reader, so the body is ordinary expandable content and the
 * announcement covers the boundaries: thinking, then thought for so long.
 */
export const Reasoning = React.forwardRef<HTMLDivElement, ReasoningProps>(
  (
    {
      streaming = false,
      duration,
      label,
      open,
      defaultOpen,
      onOpenChange,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const baseClass = 'ds-reasoning';
    const id = useId();
    const panelId = `${id}-panel`;
    const triggerId = `${id}-trigger`;

    const isControlled = open !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? streaming);
    const isOpen = isControlled ? open : uncontrolledOpen;

    /* Once the reader has taken a position on the panel, stop moving it for them */
    const readerDecided = useRef(false);
    const wasStreaming = useRef(streaming);

    useEffect(() => {
      if (streaming === wasStreaming.current) return;
      wasStreaming.current = streaming;
      if (readerDecided.current) return;

      if (!isControlled) setUncontrolledOpen(streaming);
      onOpenChange?.(streaming);
    }, [streaming, isControlled, onOpenChange]);

    const toggle = useCallback(() => {
      readerDecided.current = true;
      const next = !isOpen;
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    }, [isOpen, isControlled, onOpenChange]);

    const summary =
      label ??
      (streaming
        ? 'Thinking'
        : duration !== undefined
          ? `Thought for ${duration}s`
          : 'Thought process');

    const classes = [
      baseClass,
      isOpen ? `${baseClass}--open` : '',
      streaming ? `${baseClass}--streaming` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div {...rest} ref={ref} className={classes}>
        <button
          type="button"
          id={triggerId}
          className={`${baseClass}__trigger`}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
        >
          <span className={`${baseClass}__summary`} role="status">
            {summary}
          </span>
          <span className={`${baseClass}__chevron material-symbols-rounded`} aria-hidden="true">
            expand_more
          </span>
        </button>

        <div className={`${baseClass}__panel`} id={panelId} role="region" aria-labelledby={triggerId}>
          <div className={`${baseClass}__content`}>{children}</div>
        </div>
      </div>
    );
  },
);

Reasoning.displayName = 'Reasoning';
