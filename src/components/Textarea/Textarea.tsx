import React from 'react';
import './Textarea.css';

export interface TextareaProps {
  /** Textarea label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Number of visible rows */
  rows?: number;
  /** Component size */
  size?: 'default' | 'compact';
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Whether the textarea is required */
  required?: boolean;
  /** Error state — shows error styling and message */
  error?: boolean;
  /** Helper or error message displayed below */
  helperText?: string;
  /** Whether the textarea is resizable */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /** Max character count — shows counter when set */
  maxLength?: number;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback on focus */
  onFocus?: () => void;
  /** Callback on blur */
  onBlur?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label override */
  ariaLabel?: string;
  /** HTML name attribute */
  name?: string;
  /** HTML id attribute */
  id?: string;
}

export const Textarea = ({
  label,
  placeholder = '',
  value = '',
  rows = 4,
  size = 'default',
  disabled = false,
  required = false,
  error = false,
  helperText,
  resize = 'vertical',
  maxLength,
  onChange,
  onFocus,
  onBlur,
  className = '',
  ariaLabel,
  name,
  id,
}: TextareaProps) => {
  const baseClass = 'ds-textarea';
  const sizeClass = size === 'compact' ? `${baseClass}--compact` : '';
  const errorClass = error ? `${baseClass}--error` : '';
  const disabledClass = disabled ? `${baseClass}--disabled` : '';

  const classes = [baseClass, sizeClass, errorClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');
  const charCount = value?.length || 0;

  return (
    <div className={classes}>
      {label && (
        <label className={`${baseClass}__label`} htmlFor={inputId}>
          {label}
          {required && <span className={`${baseClass}__required`} aria-hidden="true"> *</span>}
        </label>
      )}
      <textarea
        className={`${baseClass}__field`}
        id={inputId}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        aria-label={ariaLabel || label}
        aria-invalid={error}
        aria-describedby={helperText ? `${inputId}-helper` : undefined}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ resize }}
      />
      <div className={`${baseClass}__footer`}>
        {helperText && (
          <p className={`${baseClass}__helper`} id={`${inputId}-helper`}>
            {helperText}
          </p>
        )}
        {maxLength && (
          <span className={`${baseClass}__counter`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};
