import React from 'react';
import './ToggleSwitch.css';
import '../../fonts/material-symbols.css';

export interface ToggleSwitchProps {
  /** Whether the toggle is on (checked) */
  checked?: boolean;
  /** Label text displayed next to the toggle */
  label?: string;
  /** Whether to show the label */
  showLabel?: boolean;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Callback when toggled */
  onChange?: (checked: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for the button */
  ariaLabel?: string;
}

/**
 * ToggleSwitch component from Figma design system
 * Used for binary on/off settings like theme switching
 */
export const ToggleSwitch = ({
  checked = true,
  label = 'Toggle',
  showLabel = true,
  disabled = false,
  onChange,
  className = '',
  ariaLabel,
}: ToggleSwitchProps) => {
  const baseClass = 'ds-toggle-switch';
  const stateClass = checked ? '' : `${baseClass}--off`;
  const disabledClass = disabled ? `${baseClass}--disabled` : '';

  const classes = [baseClass, stateClass, disabledClass, className].filter(Boolean).join(' ');

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel || label}
    >
      <div className={`${baseClass}__track`}>
        <div className={`${baseClass}__thumb`}>
          <span
            className={`${baseClass}__thumb-icon material-symbols-outlined`}
            aria-hidden="true"
          >
            check
          </span>
        </div>
      </div>
      {showLabel && <span className={`${baseClass}__label`}>{label}</span>}
    </button>
  );
};
