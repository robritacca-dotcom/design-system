import React from 'react';
import { Spinner } from '../Spinner/Spinner';
import './CircularButton.css';
import '../../fonts/material-symbols.css';

export interface CircularButtonProps {
  /** Material Symbol icon name */
  icon: string;
  /** Visual treatment */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Legacy alias for `variant`.
   *
   * @deprecated Use `variant` instead.
   */
  priority?: 'primary' | 'secondary' | 'tertiary';
  /** Button state */
  state?: 'default' | 'hover' | 'active' | 'disabled';
  /** Button size */
  size?: 'default' | 'compact';
  /**
   * Shows a spinner in place of the icon and blocks interaction while an
   * async action runs. Keeps the variant's full-colour appearance (unlike
   * the disabled state) and sets `aria-busy` on the rendered element.
   */
  loading?: boolean;
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
  /** Id of an element describing this button — set automatically by Tooltip */
  'aria-describedby'?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Circular icon button component.
 * A round button containing a single icon, available in
 * primary, secondary and tertiary variants with default and compact sizes.
 *
 * Forwards a ref to whichever element it renders (`<button>`, or `<a>` when
 * `href` is supplied).
 */
export const CircularButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CircularButtonProps
>(function CircularButton(
  {
    icon,
    variant,
    priority,
    state = 'default',
    size = 'default',
    loading,
    ariaLabel,
    onClick,
    href,
    target,
    rel,
    'aria-describedby': ariaDescribedby,
    className = '',
  },
  ref,
) {
  const baseClass = 'ds-circular-button';
  // `priority` is the deprecated spelling of `variant`; `variant` wins when both are set.
  const resolvedVariant = variant ?? priority ?? 'primary';
  const variantClass = `${baseClass}--${resolvedVariant}`;
  const stateClass = `${baseClass}--${state}`;
  const sizeClass = `${baseClass}--${size}`;

  const isLoading = Boolean(loading);

  const classes = [
    baseClass,
    variantClass,
    stateClass,
    sizeClass,
    isLoading && `${baseClass}--loading`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isDisabled = state === 'disabled';

  const children = isLoading ? (
    <span className={`${baseClass}__icon`} aria-hidden="true">
      <Spinner size={size === 'compact' ? 'sm' : 'md'} variant="inherit" />
    </span>
  ) : (
    <span className={`${baseClass}__icon material-symbols-rounded`} aria-hidden="true">
      {icon}
    </span>
  );

  // A loading link renders the button branch so interaction is truly blocked.
  if (href && !isDisabled && !isLoading) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={classes}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    >
      {children}
    </button>
  );
});

CircularButton.displayName = 'CircularButton';
