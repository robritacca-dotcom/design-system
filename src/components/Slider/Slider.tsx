import React from 'react';
import './Slider.css';

export interface SliderProps {
  /** Current value */
  value?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Size */
  size?: 'default' | 'compact';
  /** Change handler */
  onChange?: (value: number) => void;
  /** Accessible label */
  ariaLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Slider allows selecting a value from within a given range.
 */
export const Slider = ({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  size = 'default',
  onChange,
  ariaLabel = 'Slider',
  className = '',
}: SliderProps) => {
  const baseClass = 'ds-slider';
  const classes = [
    baseClass,
    `${baseClass}--${size}`,
    disabled ? `${baseClass}--disabled` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  return (
    <div className={classes}>
      <input
        type="range"
        className={`${baseClass}__input`}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={handleChange}
        aria-label={ariaLabel}
        style={{
          background: `linear-gradient(to right, var(--color-action-primary-bg) ${percentage}%, var(--color-bg-container-secondary) ${percentage}%)`,
        }}
      />
    </div>
  );
};
