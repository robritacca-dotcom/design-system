'use client';

import React from 'react';
import type { AgentStatusPattern, AgentStatusState } from './AgentStatusPatterns';
import './AgentStatus.css';

/** The dot grid — 12 cells, row-major. CSS owns which cell lights when. */
const DOT_COUNT = 12;

/** Fallback copy per state, used when no `label` is given. */
const DEFAULT_LABELS: Record<AgentStatusState, string> = {
  idle: 'Idle',
  thinking: 'Thinking',
  working: 'Working',
  waiting: 'Waiting for you',
  done: 'Done',
  error: 'Failed',
};

/** States where the matrix animates and the label may shimmer. */
const ACTIVE_STATES: readonly AgentStatusState[] = ['thinking', 'working', 'waiting'];

/** Props owned by AgentStatus itself — everything else falls through to the root element. */
type AgentStatusOwnProps = {
  /** What the agent is doing. Drives the colour, the default label, and whether the matrix animates. */
  state?: AgentStatusState;
  /** Status text. Falls back to a default for the state. Ignored when `children` are given. */
  label?: string;
  /** Which dot-matrix choreography to run. */
  pattern?: AgentStatusPattern;
  /**
   * Sweep a highlight across the label while the agent is active. Defaults to
   * on for `thinking`, `working` and `waiting`, off for the resting states.
   */
  shimmer?: boolean;
  /** Indicator and text scale. */
  size?: 'sm' | 'md';
  /** `inline` sits in a line of content; `bar` is a full-width row for the top of a panel. */
  variant?: 'inline' | 'bar';
  /** Additional CSS classes */
  className?: string;
  /** Status text, when it needs markup the `label` string cannot express. */
  children?: React.ReactNode;
};

export interface AgentStatusProps
  extends AgentStatusOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof AgentStatusOwnProps> {}

/**
 * AgentStatus reports what an agent is doing right now: a dot-matrix indicator
 * beside a line of status text.
 *
 * Colour carries meaning rather than decoration — the three working states are
 * monochrome, and only `waiting`, `done` and `error` take a status colour.
 * The whole thing is one polite live region, so a screen reader hears the state
 * change without the caller wiring anything up.
 */
export const AgentStatus = React.forwardRef<HTMLDivElement, AgentStatusProps>(
  (
    {
      state = 'thinking',
      label,
      pattern = 'orbit',
      shimmer,
      size = 'sm',
      variant = 'inline',
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const baseClass = 'ds-agent-status';
    const isActive = ACTIVE_STATES.includes(state);
    const isShimmering = shimmer ?? isActive;

    const classes = [
      baseClass,
      `${baseClass}--${state}`,
      `${baseClass}--${pattern}`,
      `${baseClass}--${size}`,
      `${baseClass}--${variant}`,
      isActive ? `${baseClass}--animated` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div {...rest} ref={ref} className={classes} role="status">
        <span className={`${baseClass}__matrix`} aria-hidden="true">
          {Array.from({ length: DOT_COUNT }, (_, i) => (
            <span key={i} className={`${baseClass}__dot`} />
          ))}
        </span>
        <span
          className={`${baseClass}__label${
            isShimmering ? ` ${baseClass}__label--shimmer` : ''
          }`}
        >
          {children ?? label ?? DEFAULT_LABELS[state]}
        </span>
      </div>
    );
  },
);

AgentStatus.displayName = 'AgentStatus';
