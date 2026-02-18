import React from 'react';
import './ToggleGroup.css';

export interface ToggleGroupItem {
  /** Unique value */
  value: string;
  /** Display label or icon name (Material Symbols) */
  label: string;
  /** Use Material Symbol icon instead of text */
  icon?: boolean;
}

export interface ToggleGroupProps {
  /** Available items */
  items: ToggleGroupItem[];
  /** Currently active value(s) */
  value?: string | string[];
  /** Allow multiple selection */
  multiple?: boolean;
  /** Size */
  size?: 'default' | 'compact';
  /** Disabled state */
  disabled?: boolean;
  /** Change handler */
  onChange?: (value: string | string[]) => void;
  /** Accessible label for the group */
  ariaLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ToggleGroup is a set of two-state buttons that can be toggled on or off.
 */
export const ToggleGroup = ({
  items,
  value = [],
  multiple = false,
  size = 'default',
  disabled = false,
  onChange,
  ariaLabel,
  className = '',
}: ToggleGroupProps) => {
  const baseClass = 'ds-toggle-group';
  const classes = [
    baseClass,
    `${baseClass}--${size}`,
    disabled ? `${baseClass}--disabled` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const activeValues = Array.isArray(value) ? value : [value];

  const handleClick = (itemValue: string) => {
    if (disabled) return;

    if (multiple) {
      const next = activeValues.includes(itemValue)
        ? activeValues.filter((v) => v !== itemValue)
        : [...activeValues, itemValue];
      onChange?.(next);
    } else {
      onChange?.(itemValue);
    }
  };

  return (
    <div className={classes} role="group" aria-label={ariaLabel}>
      {items.map((item) => {
        const isActive = activeValues.includes(item.value);
        const btnClass = [
          `${baseClass}__item`,
          isActive ? `${baseClass}__item--active` : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={item.value}
            className={btnClass}
            onClick={() => handleClick(item.value)}
            aria-pressed={isActive}
            aria-label={item.icon ? item.label : undefined}
            disabled={disabled}
            type="button"
          >
            {item.icon ? (
              <span className="material-symbols-rounded" aria-hidden="true">{item.label}</span>
            ) : (
              item.label
            )}
          </button>
        );
      })}
    </div>
  );
};
