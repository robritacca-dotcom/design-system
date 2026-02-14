import React from 'react';
import './Button.css';
import '../../fonts/material-symbols.css';

export interface ButtonProps {
  /** Button text content */
  label?: string;
  /** Material Symbol icon name (e.g., 'menu', 'home', 'settings') */
  icon?: string;
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
  /** Additional CSS classes */
  className?: string;
}

/**
 * Button component from Figma design system
 * Supports primary and secondary variants with multiple states
 */
export const Button = ({
  label = 'Button',
  icon,
  iconStyle = 'sharp',
  priority = 'primary',
  state = 'default',
  text = true,
  onClick,
  className = '',
}: ButtonProps) => {
  const baseClass = 'ds-button';
  const variantClass = `${baseClass}--${priority}`;
  const stateClass = `${baseClass}--${state}`;

  const classes = [baseClass, variantClass, stateClass, className].filter(Boolean).join(' ');

  const isDisabled = state === 'disabled';

  // Map iconStyle to Material Symbols class
  const iconStyleClass = `material-symbols-${iconStyle}`;

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon && (
        <span className={`${baseClass}__icon ${iconStyleClass}`} aria-hidden="true">
          {icon}
        </span>
      )}
      {text && <span className={`${baseClass}__text`}>{label}</span>}
    </button>
  );
};
