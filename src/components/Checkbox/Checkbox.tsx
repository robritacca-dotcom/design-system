import React from 'react';
import './Checkbox.css';
import '../../fonts/material-symbols.css';

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

  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

  const icon = indeterminate && !checked ? 'remove' : 'check';

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
        <span className={`${baseClass}__icon material-symbols-rounded`} aria-hidden="true">
          {icon}
        </span>
      </div>
      {label && (
        <span className={`${baseClass}__label`}>{label}</span>
      )}
    </div>
  );
};
