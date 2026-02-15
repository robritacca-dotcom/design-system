import React from 'react';
import './Button.css';
import '../../fonts/material-symbols.css';

export interface ButtonProps {
  /** Button text content */
  label?: string;
  /** Material Symbol icon name for left side (e.g., 'menu', 'home', 'settings') */
  iconLeft?: string;
  /** Material Symbol icon name for right side (e.g., 'arrow_forward', 'chevron_right') */
  iconRight?: string;
  /** Icon style variant */
  iconStyle?: 'outlined' | 'rounded' | 'sharp';
  /** Button priority/variant */
  priority?: 'primary' | 'secondary';
  /** Button state */
  state?: 'default' | 'hover' | 'active' | 'disabled';
  /** Show text label */
  text?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional href — renders as <a> instead of <button> */
  href?: string;
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
  iconStyle = 'sharp',
  priority = 'primary',
  state = 'default',
  text = true,
  onClick,
  href,
  className = '',
  icon, // deprecated, maps to iconLeft for backwards compatibility
}: ButtonProps) => {
  const baseClass = 'ds-button';
  const variantClass = `${baseClass}--${priority}`;
  const stateClass = `${baseClass}--${state}`;

  const classes = [baseClass, variantClass, stateClass, className].filter(Boolean).join(' ');

  const isDisabled = state === 'disabled';

  // Map iconStyle to Material Symbols class
  const iconStyleClass = `material-symbols-${iconStyle}`;

  // Backwards compatibility: icon prop maps to iconLeft
  const leftIcon = iconLeft || icon;

  const children = (
    <>
      {leftIcon && (
        <span className={`${baseClass}__icon ${iconStyleClass}`} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {text && <span className={`${baseClass}__text`}>{label}</span>}
      {iconRight && (
        <span className={`${baseClass}__icon ${iconStyleClass}`} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </>
  );

  if (href && !isDisabled) {
    return (
      <a
        className={classes}
        href={href}
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
