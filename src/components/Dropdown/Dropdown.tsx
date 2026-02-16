import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Dropdown.css';
import '../../fonts/material-symbols.css';

export interface DropdownOption {
  /** Display label */
  label: string;
  /** Option value */
  value: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface DropdownProps {
  /** Dropdown label text */
  label?: string;
  /** Placeholder when no value selected */
  placeholder?: string;
  /** Currently selected value */
  value?: string;
  /** Available options */
  options: DropdownOption[];
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Whether the dropdown is required */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper or error message */
  helperText?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label override */
  ariaLabel?: string;
  /** HTML name attribute */
  name?: string;
  /** HTML id attribute */
  id?: string;
}

export const Dropdown = ({
  label,
  placeholder = 'Select an option',
  value,
  options,
  disabled = false,
  required = false,
  error = false,
  helperText,
  onChange,
  className = '',
  ariaLabel,
  name,
  id,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const baseClass = 'ds-dropdown';
  const openClass = isOpen ? `${baseClass}--open` : '';
  const errorClass = error ? `${baseClass}--error` : '';
  const disabledClass = disabled ? `${baseClass}--disabled` : '';

  const classes = [baseClass, openClass, errorClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  const selectedOption = options.find((opt) => opt.value === value);
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      setFocusedIndex(-1);
    }
  };

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0 && !options[focusedIndex]?.disabled) {
          handleSelect(options[focusedIndex].value);
        } else {
          setIsOpen((prev) => !prev);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) => {
            let next = prev + 1;
            while (next < options.length && options[next].disabled) next++;
            return next < options.length ? next : prev;
          });
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && options[next].disabled) next--;
            return next >= 0 ? next : prev;
          });
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedEl = listRef.current.children[focusedIndex] as HTMLElement;
      focusedEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  return (
    <div className={classes} ref={dropdownRef}>
      {label && (
        <label className={`${baseClass}__label`} id={`${inputId}-label`}>
          {label}
          {required && <span className={`${baseClass}__required`} aria-hidden="true"> *</span>}
        </label>
      )}
      <div
        className={`${baseClass}__trigger`}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={label ? `${inputId}-label` : undefined}
        aria-label={ariaLabel || (!label ? placeholder : undefined)}
        aria-controls={`${inputId}-listbox`}
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span className={`${baseClass}__value ${!selectedOption ? `${baseClass}__value--placeholder` : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`${baseClass}__chevron material-symbols-rounded`} aria-hidden="true">
          expand_more
        </span>
      </div>
      {isOpen && (
        <ul
          className={`${baseClass}__menu`}
          role="listbox"
          id={`${inputId}-listbox`}
          ref={listRef}
          aria-labelledby={label ? `${inputId}-label` : undefined}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className={[
                `${baseClass}__option`,
                option.value === value ? `${baseClass}__option--selected` : '',
                option.disabled ? `${baseClass}__option--disabled` : '',
                index === focusedIndex ? `${baseClass}__option--focused` : '',
              ]
                .filter(Boolean)
                .join(' ')}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              onClick={() => !option.disabled && handleSelect(option.value)}
            >
              {option.label}
              {option.value === value && (
                <span className={`${baseClass}__check material-symbols-rounded`} aria-hidden="true">
                  check
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {helperText && (
        <p className={`${baseClass}__helper`} id={`${inputId}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
};
