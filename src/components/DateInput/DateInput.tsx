import React from 'react';
import './DateInput.css';
import '../../fonts/material-symbols.css';

export interface DateInputProps {
  /** Input label text */
  label?: string;
  /** Current value (YYYY-MM-DD format) */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Component size */
  size?: 'default' | 'compact';
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper or error message */
  helperText?: string;
  /** Minimum selectable date (YYYY-MM-DD) */
  min?: string;
  /** Maximum selectable date (YYYY-MM-DD) */
  max?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback on focus */
  onFocus?: () => void;
  /** Callback on blur */
  onBlur?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible name override */
  ariaLabel?: string;
  /** HTML name attribute */
  name?: string;
  /** HTML id attribute */
  id?: string;
}

/**
 * Date input component with native date picker.
 * Uses the browser's built-in date input with custom styling,
 * calendar icon, label, and validation states.
 */
export const DateInput = ({
  label,
  value,
  placeholder,
  size = 'default',
  disabled = false,
  required = false,
  error = false,
  helperText,
  min,
  max,
  onChange,
  onFocus,
  onBlur,
  className = '',
  ariaLabel,
  name,
  id,
}: DateInputProps) => {
  const baseClass = 'ds-date-input';
  const errorClass = error ? `${baseClass}--error` : '';
  const disabledClass = disabled ? `${baseClass}--disabled` : '';
  const sizeClass = `${baseClass}--${size}`;

  const classes = [baseClass, sizeClass, errorClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={classes}>
      {label && (
        <label className={`${baseClass}__label`} htmlFor={inputId}>
          {label}
          {required && <span className={`${baseClass}__required`} aria-hidden="true"> *</span>}
        </label>
      )}
      <div className={`${baseClass}__field-wrapper`}>
        <span className={`${baseClass}__icon material-symbols-rounded`} aria-hidden="true">
          calendar_today
        </span>
        <input
          className={`${baseClass}__field`}
          type="date"
          id={inputId}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          aria-label={ariaLabel || label}
          aria-invalid={error}
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      {helperText && (
        <p className={`${baseClass}__helper`} id={`${inputId}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
};
