import React from 'react';
import './Sparkline.css';

/** Props owned by Sparkline itself — everything else falls through to the SVG node. */
type SparklineOwnProps = {
  /** The series to plot, in order. Values are normalised into the viewBox. */
  data: number[];
  /** Rendering treatment — a bare line, or a line with a soft fill underneath. */
  variant?: 'line' | 'area';
  /**
   * Colour role for the line and end dot. `accent` follows the chart palette's
   * lead colour; `positive`/`negative` map to the status text tokens; `neutral`
   * recedes to secondary text.
   */
  tone?: 'accent' | 'positive' | 'negative' | 'neutral';
  /** Marks the final point with a small dot. */
  showDot?: boolean;
  /** Line thickness in viewBox units — an SVG geometry attribute, not a token. */
  strokeWidth?: number;
  /**
   * ViewBox width. Also the default rendered width; the SVG scales to its
   * container when sized externally via CSS. Intentionally shadows the native
   * SVG `width` attribute, which it sets.
   */
  width?: number;
  /**
   * ViewBox height. Also the default rendered height; the SVG scales to its
   * container when sized externally via CSS. Intentionally shadows the native
   * SVG `height` attribute, which it sets.
   */
  height?: number;
  /**
   * Accessible description of the trend, e.g. "Revenue, trending up". When
   * omitted the SVG is decorative and hidden from assistive technology.
   */
  label?: string;
  /** Additional CSS classes */
  className?: string;
};

export interface SparklineProps
  extends SparklineOwnProps,
    Omit<React.ComponentPropsWithoutRef<'svg'>, keyof SparklineOwnProps | 'children'> {}

/** Round to 2 decimals so the path markup stays compact. */
const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Sparkline — an inline trend line for stats and table cells, drawn without
 * axes or chrome. Pure SVG computed from props: no charting library, no hooks,
 * no dependencies, so it renders from a Server Component and costs nothing in
 * a dense table. Degenerate data never breaks the path: an all-equal series
 * renders a horizontal midline, and fewer than two points render just the
 * end dot, or nothing.
 */
export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  (
    {
      data,
      variant = 'line',
      tone = 'accent',
      showDot = true,
      strokeWidth = 2,
      width = 120,
      height = 32,
      label,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const baseClass = 'ds-sparkline';

    const classes = [
      baseClass,
      `${baseClass}--${variant}`,
      `${baseClass}--${tone}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Inset the drawing area so the stroke and the end dot never clip at the
    // viewBox edges.
    const dotRadius = strokeWidth * 1.5;
    const pad = dotRadius + strokeWidth / 2;
    const innerWidth = Math.max(width - pad * 2, 0);
    const innerHeight = Math.max(height - pad * 2, 0);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    const points = data.map((value, i) => ({
      x: round(
        data.length < 2 ? pad + innerWidth : pad + (i / (data.length - 1)) * innerWidth,
      ),
      // A flat series (range 0) draws a horizontal midline instead of dividing by zero.
      y: round(
        range === 0
          ? pad + innerHeight / 2
          : pad + (1 - (value - min) / range) * innerHeight,
      ),
    }));

    const lastPoint = points.length > 0 ? points[points.length - 1] : undefined;
    const hasLine = points.length >= 2;

    const linePath = hasLine
      ? `M ${points.map((p) => `${p.x} ${p.y}`).join(' L ')}`
      : undefined;

    const baseline = round(height - pad);
    const areaPath =
      hasLine && variant === 'area'
        ? `${linePath} L ${points[points.length - 1].x} ${baseline} L ${points[0].x} ${baseline} Z`
        : undefined;

    return (
      <svg
        {...rest}
        ref={ref}
        className={classes}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        {areaPath && <path className={`${baseClass}__fill`} d={areaPath} />}
        {linePath && (
          <path
            className={`${baseClass}__line`}
            d={linePath}
            strokeWidth={strokeWidth}
          />
        )}
        {showDot && lastPoint && (
          <circle
            className={`${baseClass}__dot`}
            cx={lastPoint.x}
            cy={lastPoint.y}
            r={dotRadius}
          />
        )}
      </svg>
    );
  },
);

Sparkline.displayName = 'Sparkline';
