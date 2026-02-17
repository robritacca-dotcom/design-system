import React from 'react';
import './ProgressBar.css';

export interface ProgressBarProps {
  /** Current progress value (0–100) */
  value?: number;
  /** Visual variant */
  variant?: 'info' | 'positive' | 'warning' | 'error' | 'neutral';
  /** Size of the bar */
  size?: 'default' | 'compact';
  /** Show percentage label */
  showLabel?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ProgressBar displays completion progress as a horizontal bar.
 */
export const ProgressBar = ({
  value = 0,
  variant = 'info',
  size = 'default',
  showLabel = false,
  className = '',
}: ProgressBarProps) => {
  const clamped = Math.max(0, Math.min(100, value));
  const baseClass = 'ds-progress-bar';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div className={`${baseClass}__track`}>
        <div className={`${baseClass}__fill`} style={{ width: `${clamped}%` }} />
      </div>
      {showLabel && <span className={`${baseClass}__label`}>{clamped}%</span>}
    </div>
  );
};
