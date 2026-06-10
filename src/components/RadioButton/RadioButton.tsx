import React from 'react';
import './RadioButton.css';

export interface RadioButtonProps {
  /** Label text */
  label?: string;
  /** Whether this radio is selected */
  checked?: boolean;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Radio group name — groups radios together */
  name?: string;
  /** Value for this radio option */
  value?: string;
  /** Callback when selected */
  onChange?: (value: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label override */
  ariaLabel?: string;
  /** HTML id attribute */
  id?: string;
}

export const RadioButton = ({
  label,
  checked = false,
  disabled = false,
  value = '',
  onChange,
  className = '',
  ariaLabel,
}: RadioButtonProps) => {
  const baseClass = 'ds-radio';
  const checkedClass = checked ? `${baseClass}--checked` : '';
  const disabledClass = disabled ? `${baseClass}--disabled` : '';

  const classes = [baseClass, checkedClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(value);
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
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={ariaLabel || label}
      tabIndex={disabled ? -1 : 0}
    >
      <div className={`${baseClass}__circle`}>
        <div className={`${baseClass}__dot`} />
      </div>
      {label && (
        <span className={`${baseClass}__label`}>{label}</span>
      )}
    </div>
  );
};

/* ============================================
   RADIO GROUP — Wraps multiple RadioButtons
   ============================================ */

export interface RadioGroupProps {
  /** Group label */
  label?: string;
  /** Currently selected value */
  value?: string;
  /** Radio group name */
  name: string;
  /** Radio options */
  options: { label: string; value: string; disabled?: boolean }[];
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const RadioGroup = ({
  label,
  value,
  name,
  options,
  direction = 'vertical',
  onChange,
  className = '',
}: RadioGroupProps) => {
  const baseClass = 'ds-radio-group';
  const directionClass = `${baseClass}--${direction}`;
  const classes = [baseClass, directionClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="radiogroup" aria-label={label}>
      {label && <span className={`${baseClass}__label`}>{label}</span>}
      <div className={`${baseClass}__options`}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            value={option.value}
            name={name}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};
