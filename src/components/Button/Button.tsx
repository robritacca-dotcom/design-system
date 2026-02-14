import React from 'react';
import './Button.css';

export interface ButtonProps {
  /** Button text content */
  label?: string;
  /** Show icon before text */
  icon?: boolean;
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
  icon = false,
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

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon && (
        <div className={`${baseClass}__icon`} aria-hidden="true">
          {/* Icon placeholder - replace with actual icon component */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="7" width="16" height="2" fill="currentColor" />
            <rect x="4" y="11" width="16" height="2" fill="currentColor" />
            <rect x="4" y="15" width="16" height="2" fill="currentColor" />
          </svg>
        </div>
      )}
      {text && <span className={`${baseClass}__text`}>{label}</span>}
    </button>
  );
};
