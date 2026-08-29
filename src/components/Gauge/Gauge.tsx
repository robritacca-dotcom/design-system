import React from 'react';
import './Gauge.css';

/** One colour switch point: at or above `value`, the dial takes `tone`. */
export interface GaugeThreshold {
  /** Reading at which this tone takes over. */
  value: number;
  /** Tone applied from this reading upward. */
  tone: 'accent' | 'positive' | 'warning' | 'error' | 'neutral';
}

/** Props owned by Gauge itself — everything else falls through to the root div. */
type GaugeOwnProps = {
  /** Current reading. Clamped into the `min`–`max` range for drawing. */
  value: number;
  /** Lower bound of the dial. */
  min?: number;
  /** Upper bound of the dial. */
  max?: number;
  /**
   * Colour role for the value arc and reading. Ignored while a threshold
   * matches — thresholds exist so the dial recolours itself as the reading
   * crosses them.
   */
  tone?: 'accent' | 'positive' | 'warning' | 'error' | 'neutral';
  /**
   * Colour switch points, e.g. warning at 70 and error at 90. The highest
   * threshold at or below the current reading wins; below them all, the
   * `tone` prop applies.
   */
  thresholds?: GaugeThreshold[];
  /** Shows the reading in the centre of the dial. */
  showValue?: boolean;
  /** Formats the centre reading — for units, precision, or locale. */
  formatValue?: (value: number) => string;
  /**
   * What the reading measures, shown as a caption under it and used as the
   * accessible name, e.g. "CPU usage".
   */
  label?: string;
  /** Rendered diameter in pixels. The arc geometry scales with it. */
  size?: number;
  /** Arc thickness in pixels. */
  strokeWidth?: number;
  /** Additional CSS classes */
  className?: string;
};

export interface GaugeProps
  extends GaugeOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof GaugeOwnProps | 'children'> {}

/* The dial is a three-quarter circle: 270° of sweep with the gap at the
   bottom. Expressed through pathLength=100, the track occupies 75 units. */
const SWEEP_UNITS = 75;

/**
 * Gauge — a radial dial for a single bounded reading: capacity, usage, a
 * score against a target. Pure SVG computed from props — no charting library,
 * no hooks — so it renders from a Server Component and drops straight into a
 * Panel or Stat row. Thresholds recolour the dial through the status roles as
 * the reading crosses them, and the arc animates between readings via a CSS
 * transition. Announced as a `meter` with the label as its accessible name.
 */
export const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      tone = 'accent',
      thresholds,
      showValue = true,
      formatValue,
      label,
      size = 120,
      strokeWidth = 10,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const baseClass = 'ds-gauge';

    // A degenerate range (max <= min) draws an empty dial rather than NaN.
    const range = max - min;
    const fraction = range > 0 ? Math.min(Math.max((value - min) / range, 0), 1) : 0;

    // The highest threshold at or below the reading wins.
    const activeThreshold = thresholds
      ?.filter((t) => value >= t.value)
      .sort((a, b) => b.value - a.value)[0];
    const resolvedTone = activeThreshold?.tone ?? tone;

    const classes = [baseClass, `${baseClass}--${resolvedTone}`, className]
      .filter(Boolean)
      .join(' ');

    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const valueUnits = Math.round(SWEEP_UNITS * fraction * 100) / 100;

    const displayValue = formatValue ? formatValue(value) : String(Math.round(value));

    return (
      <div
        {...rest}
        ref={ref}
        className={classes}
        style={{ width: size, height: size, ...rest.style }}
        role="meter"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={displayValue}
        aria-label={label ?? rest['aria-label']}
      >
        <svg
          className={`${baseClass}__svg`}
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Both circles start at 3 o'clock; rotating 135° puts the gap at
              the bottom. pathLength=100 makes the dash sums size-independent. */}
          <circle
            className={`${baseClass}__track`}
            cx={center}
            cy={center}
            r={radius}
            pathLength={100}
            strokeWidth={strokeWidth}
            strokeDasharray={`${SWEEP_UNITS} ${100 - SWEEP_UNITS}`}
            transform={`rotate(135 ${center} ${center})`}
          />
          {valueUnits > 0 && (
            <circle
              className={`${baseClass}__arc`}
              cx={center}
              cy={center}
              r={radius}
              pathLength={100}
              strokeWidth={strokeWidth}
              strokeDasharray={`${valueUnits} ${100 - valueUnits}`}
              transform={`rotate(135 ${center} ${center})`}
            />
          )}
        </svg>
        {(showValue || label) && (
          <div className={`${baseClass}__center`}>
            {showValue && <span className={`${baseClass}__value`}>{displayValue}</span>}
            {label && <span className={`${baseClass}__label`}>{label}</span>}
          </div>
        )}
      </div>
    );
  },
);

Gauge.displayName = 'Gauge';
