import React from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  /** Label text */
  label?: string;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Whether the checkbox is in an indeterminate state */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Callback when toggled */
  onChange?: (checked: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label override */
  ariaLabel?: string;
  /** HTML name attribute */
  name?: string;
  /** HTML id attribute */
  id?: string;
}

/** Custom SVG check icon — pixel-perfect centering without font metrics */
const CheckIcon = () => (
  <svg
    className="ds-checkbox__icon"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 7.5L5.5 11L12 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Custom SVG minus icon for indeterminate state */
const MinusIcon = () => (
  <svg
    className="ds-checkbox__icon"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 7H12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Checkbox = ({
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  className = '',
  ariaLabel,
  name,
  id,
}: CheckboxProps) => {
  const baseClass = 'ds-checkbox';
  const checkedClass = checked ? `${baseClass}--checked` : '';
  const indeterminateClass = indeterminate && !checked ? `${baseClass}--indeterminate` : '';
  const disabledClass = disabled ? `${baseClass}--disabled` : '';

  const classes = [baseClass, checkedClass, indeterminateClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={indeterminate && !checked ? 'mixed' : checked}
      aria-disabled={disabled}
      aria-label={ariaLabel || label}
      tabIndex={disabled ? -1 : 0}
    >
      <div className={`${baseClass}__box`}>
        {indeterminate && !checked ? <MinusIcon /> : <CheckIcon />}
      </div>
      {label && (
        <span className={`${baseClass}__label`}>{label}</span>
      )}
    </div>
  );
};
