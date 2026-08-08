// No 'use client' directive: CircularButton defines no hooks or handlers of its
// own — consumers' event props fall through — so Server Components can render it.
import React from 'react';
import { Spinner } from '../Spinner/Spinner';
import './CircularButton.css';
import '../../fonts/material-symbols.css';

/** Props owned by CircularButton itself — everything else falls through to the DOM node. */
type CircularButtonOwnProps = {
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
  /** Whether the button is disabled */
  disabled?: boolean;
  /**
   * Documentation-only interaction state.
   *
   * @deprecated Use `disabled` for the disabled state.
   *
   * Documentation-only affordance for rendering a *static* interaction state in
   * Storybook and the showcase site. Real hover/active styling comes from CSS
   * pseudo-classes and needs no prop — for docs, prefer
   * `className="ds-circular-button--hover"`.
   */
  state?: 'default' | 'hover' | 'active' | 'disabled';
  /** Button size */
  size?: 'default' | 'compact';
  /**
   * Shows a spinner in place of the icon and blocks interaction while an
   * async action runs. Keeps the variant's full-colour appearance (unlike
   * the disabled state) and sets `aria-busy` on the rendered element.
   */
  loading?: boolean;
  /** Accessible label — required, because the button has no visible text */
  ariaLabel: string;
  /** Optional href — renders as <a> instead of <button> */
  href?: string;
  /** Optional target attribute for links */
  target?: string;
  /** Optional rel attribute for links */
  rel?: string;
  /** Additional CSS classes */
  className?: string;
};

export interface CircularButtonProps
  extends CircularButtonOwnProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof CircularButtonOwnProps | 'type'> {}

/**
 * Circular icon button component.
 * A round button containing a single icon, available in
 * primary, secondary and tertiary variants with default and compact sizes.
 *
 * Renders a `<button>`, or an `<a>` when `href` is supplied. Forwards a ref to
 * whichever element it renders, and spreads unrecognised props onto it.
 */
export const CircularButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CircularButtonProps
>(
  (
    {
      icon,
      variant,
      priority,
      disabled,
      state,
      size = 'default',
      loading,
      ariaLabel,
      href,
      target,
      rel,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const baseClass = 'ds-circular-button';

    // `priority` is the deprecated spelling of `variant`; `variant` wins when both are set.
    const resolvedVariant = variant ?? priority ?? 'primary';
    // `disabled` is the real prop; `state="disabled"` is the deprecated path.
    const isDisabled = disabled ?? state === 'disabled';
    // Keep the state modifier class so the disabled styling applies either way.
    const resolvedState = state ?? (isDisabled ? 'disabled' : 'default');
    const isLoading = Boolean(loading);

    const classes = [
      baseClass,
      `${baseClass}--${resolvedVariant}`,
      `${baseClass}--${resolvedState}`,
      `${baseClass}--${size}`,
      isLoading && `${baseClass}--loading`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

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
          {...(rest as React.ComponentPropsWithoutRef<'a'>)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        {...rest}
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        disabled={isDisabled || isLoading}
        aria-busy={isLoading || undefined}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  },
);

CircularButton.displayName = 'CircularButton';
