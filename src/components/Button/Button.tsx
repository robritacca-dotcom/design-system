import React from 'react';
import './Button.css';
import '../../fonts/material-symbols.css';

export interface ButtonProps {
  /** Button text content */
  label?: string;
  /** Icon for left side — Material Symbol name (string) or custom element (ReactNode) */
  iconLeft?: string | React.ReactNode;
  /** Icon for right side — Material Symbol name (string) or custom element (ReactNode) */
  iconRight?: string | React.ReactNode;
  /** Button priority/variant */
  priority?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  /** Button state */
  state?: 'default' | 'hover' | 'active' | 'disabled';
  /** Button size */
  size?: 'default' | 'compact';
  /** Show text label */
  text?: boolean;
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
  /** @deprecated Use iconLeft instead */
  icon?: string;
}

/**
 * Button component from Figma design system
 * Supports primary and secondary variants with multiple states
 * Icons can be placed on the left and/or right side of the text
 */
export const Button = ({
  label = 'Button',
  iconLeft,
  iconRight,
  priority = 'primary',
  state = 'default',
  size = 'default',
  text = true,
  onClick,
  href,
  target,
  rel,
  className = '',
  icon, // deprecated, maps to iconLeft for backwards compatibility
}: ButtonProps) => {
  const baseClass = 'ds-button';
  const variantClass = `${baseClass}--${priority}`;
  const stateClass = `${baseClass}--${state}`;
  const sizeClass = `${baseClass}--${size}`;

  const classes = [baseClass, variantClass, stateClass, sizeClass, className].filter(Boolean).join(' ');

  const isDisabled = state === 'disabled';

  // Material Symbols — rounded only
  const iconClass = 'material-symbols-rounded';

  // Backwards compatibility: icon prop maps to iconLeft
  const leftIcon = iconLeft || icon;

  /** Render an icon slot — string → Material Symbol, ReactNode → custom element */
  const renderIcon = (iconProp: string | React.ReactNode) => {
    if (typeof iconProp === 'string') {
      return (
        <span className={`${baseClass}__icon ${iconClass}`} aria-hidden="true">
          {iconProp}
        </span>
      );
    }
    return (
      <span className={`${baseClass}__icon`} aria-hidden="true">
        {iconProp}
      </span>
    );
  };

  const children = (
    <>
      {leftIcon && renderIcon(leftIcon)}
      {text && <span className={`${baseClass}__text`}>{label}</span>}
      {iconRight && renderIcon(iconRight)}
    </>
  );

  if (href && !isDisabled) {
    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
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
    >
      {children}
    </button>
  );
};
