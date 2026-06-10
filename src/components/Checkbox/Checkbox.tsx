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
  /** Component size */
  size?: 'default' | 'compact';
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

/* ============================================
   CHECKBOX GROUP — Wraps multiple Checkboxes
   ============================================ */

export interface CheckboxGroupProps {
  /** Group label */
  label?: string;
  /** Checkbox options */
  items: { label: string; value: string; disabled?: boolean }[];
  /** Currently selected values */
  values?: string[];
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  /** Component size */
  size?: 'default' | 'compact';
  /** Callback when selection changes */
  onChange?: (values: string[]) => void;
  /** Additional CSS classes */
  className?: string;
}

export const CheckboxGroup = ({
  label,
  items,
  values = [],
  direction = 'vertical',
  size = 'default',
  onChange,
  className = '',
}: CheckboxGroupProps) => {
  const baseClass = 'ds-checkbox-group';
  const directionClass = `${baseClass}--${direction}`;
  const classes = [baseClass, directionClass, className].filter(Boolean).join(' ');

  const handleToggle = (itemValue: string) => {
    if (!onChange) return;
    const next = values.includes(itemValue)
      ? values.filter((v) => v !== itemValue)
      : [...values, itemValue];
    onChange(next);
  };

  return (
    <div className={classes} role="group" aria-label={label}>
      {label && <span className={`${baseClass}__label`}>{label}</span>}
      <div className={`${baseClass}__items`}>
        {items.map((item) => (
          <Checkbox
            key={item.value}
            label={item.label}
            checked={values.includes(item.value)}
            disabled={item.disabled}
            size={size}
            onChange={() => handleToggle(item.value)}
          />
        ))}
      </div>
    </div>
  );
};

export const Checkbox = ({
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
  size = 'default',
  onChange,
  className = '',
  ariaLabel,
}: CheckboxProps) => {
  const baseClass = 'ds-checkbox';
  const checkedClass = checked ? `${baseClass}--checked` : '';
  const indeterminateClass = indeterminate && !checked ? `${baseClass}--indeterminate` : '';
  const disabledClass = disabled ? `${baseClass}--disabled` : '';
  const sizeClass = size === 'compact' ? `${baseClass}--compact` : '';

  const classes = [baseClass, sizeClass, checkedClass, indeterminateClass, disabledClass, className]
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
