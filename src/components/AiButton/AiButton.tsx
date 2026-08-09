'use client';

import React from 'react';
import './AiButton.css';
import '../../fonts/material-symbols.css';

/** Props owned by AiButton itself — everything else falls through to the DOM node. */
type AiButtonOwnProps = {
  /** Button text content */
  label?: string;
  /** Leading icon — Material Symbol name (string) or custom element (ReactNode) */
  icon?: string | React.ReactNode;
  /** Button size */
  size?: 'default' | 'compact';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Optional href — renders as <a> instead of <button> */
  href?: string;
  /** Optional target attribute for links */
  target?: string;
  /** Optional rel attribute for links */
  rel?: string;
  /** Additional CSS classes */
  className?: string;
};

export interface AiButtonProps
  extends AiButtonOwnProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof AiButtonOwnProps | 'type'> {}

/**
 * The AI entry point. Icon and label on a transparent field, ringed by the
 * AI gradient (`--color-ai-gradient-*`) rotating slowly, with a soft glow of
 * the same gradient behind it. The treatment is the design system's signal
 * for "a model answers here": ordinary actions keep the flat action teal,
 * and this ring is reserved for AI surfaces so neither affordance dilutes
 * the other.
 *
 * Renders a `<button>`, or an `<a>` when `href` is supplied. Forwards a ref
 * to whichever element it renders, and spreads unrecognised props onto it.
 * The rotation pauses under `prefers-reduced-motion`; the ring and glow stay.
 */
export const AiButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, AiButtonProps>(
  (
    {
      label = 'Ask AI',
      icon = 'auto_awesome',
      size = 'default',
      disabled,
      href,
      target,
      rel,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const baseClass = 'ds-ai-button';

    const classes = [
      baseClass,
      `${baseClass}--${size}`,
      disabled && `${baseClass}--disabled`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {icon &&
          (typeof icon === 'string' ? (
            <span className={`${baseClass}__icon material-symbols-rounded`} aria-hidden="true">
              {icon}
            </span>
          ) : (
            <span className={`${baseClass}__icon`} aria-hidden="true">
              {icon}
            </span>
          ))}
        <span className={`${baseClass}__text`}>{label}</span>
      </>
    );

    if (href && !disabled) {
      return (
        <a
          {...(rest as React.ComponentPropsWithoutRef<'a'>)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          href={href}
          target={target}
          rel={rel}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        {...rest}
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        disabled={disabled}
      >
        {content}
      </button>
    );
  },
);

AiButton.displayName = 'AiButton';
