'use client';

import React, { useRef } from 'react';
import './SegmentedControl.css';
import '../../fonts/material-symbols.css';

export interface Segment {
  /** Unique value for this segment */
  value: string;
  /** Display label */
  label: string;
  /** Optional Material Symbol icon name */
  icon?: string;
  /** Whether disabled */
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /** Array of segments */
  segments: Segment[];
  /** Currently active segment value */
  activeSegment: string;
  /** Callback when segment changes */
  onSegmentChange?: (value: string) => void;
  /** Component size */
  size?: 'default' | 'compact';
  /** Full width — segments fill container */
  fullWidth?: boolean;
  /** Accessible label for the tablist */
  ariaLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Segmented control for toggling between related views.
 * A horizontal set of mutually exclusive options with a
 * pill-shaped active indicator. Supports icons and keyboard navigation.
 */
export const SegmentedControl = ({
  segments,
  activeSegment,
  onSegmentChange,
  size = 'default',
  fullWidth = false,
  ariaLabel,
  className = '',
}: SegmentedControlProps) => {
  const baseClass = 'ds-segmented-control';
  const sizeClass = `${baseClass}--${size}`;
  const fullWidthClass = fullWidth ? `${baseClass}--full-width` : '';
  const containerRef = useRef<HTMLDivElement>(null);

  const classes = [baseClass, sizeClass, fullWidthClass, className]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const enabledSegments = segments.filter((s) => !s.disabled);
    const currentEnabledIdx = enabledSegments.findIndex((s) => s.value === segments[idx].value);

    let nextIdx = -1;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIdx = (currentEnabledIdx + 1) % enabledSegments.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIdx = (currentEnabledIdx - 1 + enabledSegments.length) % enabledSegments.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIdx = enabledSegments.length - 1;
    }

    if (nextIdx >= 0) {
      const nextSegment = enabledSegments[nextIdx];
      onSegmentChange?.(nextSegment.value);

      // Focus the button
      const buttons = containerRef.current?.querySelectorAll(
        `[data-segment-value]`
      ) as NodeListOf<HTMLButtonElement>;
      buttons?.forEach((btn) => {
        if (btn.dataset.segmentValue === nextSegment.value) {
          btn.focus();
        }
      });
    }
  };

  return (
    <div className={classes} role="tablist" aria-label={ariaLabel} ref={containerRef}>
      {segments.map((segment, idx) => {
        const isActive = segment.value === activeSegment;
        const btnClasses = [
          `${baseClass}__segment`,
          isActive ? `${baseClass}__segment--active` : '',
          segment.disabled ? `${baseClass}__segment--disabled` : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={segment.value}
            type="button"
            role="tab"
            className={btnClasses}
            aria-selected={isActive}
            aria-disabled={segment.disabled || undefined}
            disabled={segment.disabled}
            tabIndex={isActive ? 0 : -1}
            data-segment-value={segment.value}
            onClick={() => {
              if (!segment.disabled) {
                onSegmentChange?.(segment.value);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          >
            {segment.icon && (
              <span
                className={`${baseClass}__icon material-symbols-rounded`}
                aria-hidden="true"
              >
                {segment.icon}
              </span>
            )}
            <span className={`${baseClass}__label`}>{segment.label}</span>
          </button>
        );
      })}
    </div>
  );
};
