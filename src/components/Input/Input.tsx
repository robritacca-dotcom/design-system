import React from 'react';
import './Input.css';
import '../../fonts/material-symbols.css';

export interface InputProps {
  /** Input label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Error state — shows error styling and message */
  error?: boolean;
  /** Helper or error message displayed below the input */
  helperText?: string;
  /** Material Symbol icon name on the left */
  iconLeft?: string;
  /** Material Symbol icon name on the right */
  iconRight?: string;
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

export const Input = ({
  label,
  placeholder = '',
  value,
  type = 'text',
  disabled = false,
  required = false,
  error = false,
  helperText,
  iconLeft,
  iconRight,
  onChange,
  onFocus,
  onBlur,
  className = '',
  ariaLabel,
  name,
  id,
}: InputProps) => {
  const baseClass = 'ds-input';
  const errorClass = error ? `${baseClass}--error` : '';
  const disabledClass = disabled ? `${baseClass}--disabled` : '';
  const hasLeftIcon = iconLeft ? `${baseClass}--has-icon-left` : '';
  const hasRightIcon = iconRight ? `${baseClass}--has-icon-right` : '';

  const classes = [baseClass, errorClass, disabledClass, hasLeftIcon, hasRightIcon, className]
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
        {iconLeft && (
          <span className={`${baseClass}__icon ${baseClass}__icon--left material-symbols-rounded`} aria-hidden="true">
            {iconLeft}
          </span>
        )}
        <input
          className={`${baseClass}__field`}
          type={type}
          id={inputId}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || label}
          aria-invalid={error}
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {iconRight && (
          <span className={`${baseClass}__icon ${baseClass}__icon--right material-symbols-rounded`} aria-hidden="true">
            {iconRight}
          </span>
        )}
      </div>
      {helperText && (
        <p className={`${baseClass}__helper`} id={`${inputId}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
};
