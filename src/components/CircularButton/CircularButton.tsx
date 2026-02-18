import React from 'react';
import './CircularButton.css';
import '../../fonts/material-symbols.css';

export interface CircularButtonProps {
  /** Material Symbol icon name */
  icon: string;
  /** Button priority/variant */
  priority?: 'primary' | 'secondary' | 'tertiary';
  /** Button state */
  state?: 'default' | 'hover' | 'active' | 'disabled';
  /** Button size */
  size?: 'default' | 'compact';
  /** Accessible label */
  ariaLabel: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional href — renders as <a> instead of <button> */
  href?: string;
  /** Optional target attribute for links */
  target?: string;
  /** Optional rel attribute for links */
  rel?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Circular icon button component.
 * A round button containing a single icon, available in
 * primary and secondary variants with default and compact sizes.
 */
export const CircularButton = ({
  icon,
  priority = 'primary',
  state = 'default',
  size = 'default',
  ariaLabel,
  onClick,
  href,
  target,
  rel,
  className = '',
}: CircularButtonProps) => {
  const baseClass = 'ds-circular-button';
  const variantClass = `${baseClass}--${priority}`;
  const stateClass = `${baseClass}--${state}`;
  const sizeClass = `${baseClass}--${size}`;

  const classes = [baseClass, variantClass, stateClass, sizeClass, className]
    .filter(Boolean)
    .join(' ');

  const isDisabled = state === 'disabled';

  const children = (
    <span className={`${baseClass}__icon material-symbols-rounded`} aria-hidden="true">
      {icon}
    </span>
  );

  if (href && !isDisabled) {
    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
