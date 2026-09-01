import React from 'react';
import '../Chart/Chart.css';
import './FunnelChart.css';

/** One stage of the funnel, ordered widest first. */
export interface FunnelStage {
  /** Stage name, read into the chart's accessible label. */
  label: string;
  /** Raw count for the stage — drives the bar's height as a share of the first stage. */
  value: number;
  /**
   * Preformatted value ("96.4K") for the accessible label and any consumer
   * legend. Falls back to the raw `value`, locale-formatted.
   */
  displayValue?: string;
}

/** Props owned by FunnelChart itself — everything else falls through to the root div. */
type FunnelChartOwnProps = {
  /** Ordered stages, first stage widest. Each later stage's height is its share of the first. */
  data: FunnelStage[];
  /** Chart title, in the shared chart header. */
  title?: string;
  /** Description text below the title. */
  subtitle?: string;
  /** Strip the card chrome (border, padding, fill) when the chart sits inside another panel that supplies the surface */
  bare?: boolean;
  /** Chart area height in pixels. */
  height?: number;
  /**
   * Floor percentage for a stage's height, so steep drop-offs stay readable.
   * Shares are clamped to the range from this floor up to 100.
   */
  minStageShare?: number;
  /** Additional CSS classes */
  className?: string;
};

export interface FunnelChartProps
  extends FunnelChartOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof FunnelChartOwnProps | 'children'> {}

/** The chart palette cycles through --color-chart-series-1 … -7. */
const SERIES_COUNT = 7;

/**
 * FunnelChart — ordered stages as side-by-side vertical bars whose heights
 * step down with each stage's share of the first, each carrying a centred
 * percentage pill. Pure JSX and CSS computed from props: no recharts, no
 * hooks, no browser APIs, so it deliberately omits 'use client' and renders
 * from a Server Component. It wears the chart family's card chrome (title,
 * subtitle, padding) and takes `bare` to drop it inside a Panel, like every
 * other chart. Each stage's hover target is its full-height column, like the
 * recharts cursor band: hovering anywhere in the column tints the band and
 * reveals the family's glass tooltip — the stage name and its reading,
 * anchored above the percentage pill. A pure CSS reveal, so the component
 * stays server-renderable, and the values are already in the row's
 * accessible label. Degenerate data stays safe: an
 * empty array renders an empty stage row, and a zero or negative first
 * value draws every stage at the floor height.
 */
export const FunnelChart = React.forwardRef<HTMLDivElement, FunnelChartProps>(
  (
    {
      data,
      title,
      subtitle,
      bare = false,
      height = 190,
      minStageShare = 16,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const baseClass = 'ds-funnel-chart';
    const chartClass = 'ds-chart';
    const classes = [
      chartClass,
      bare && `${chartClass}--bare`,
      baseClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const firstValue = data.length > 0 ? data[0].value : 0;
    const clampShare = (share: number) =>
      Math.min(Math.max(share, minStageShare), 100);

    const stages = data.map((stage, i) => ({
      ...stage,
      share: clampShare(firstValue > 0 ? (stage.value / firstValue) * 100 : 0),
      color: `var(--color-chart-series-${(i % SERIES_COUNT) + 1})`,
    }));

    const ariaLabel =
      stages.length > 0
        ? `Funnel: ${stages
            .map((s) => `${s.label} ${s.displayValue ?? s.value.toLocaleString()}`)
            .join(', ')}`
        : 'Funnel, no data';

    return (
      <div {...rest} ref={ref} className={classes}>
        {(title || subtitle) && (
          <div className={`${chartClass}__header`}>
            <div className={`${chartClass}__header-text`}>
              {title && <h3 className={`${chartClass}__title`}>{title}</h3>}
              {subtitle && <p className={`${chartClass}__subtitle`}>{subtitle}</p>}
            </div>
          </div>
        )}
        <div
          className={`${chartClass}__body ${baseClass}__stages`}
          style={{ height }}
          role="img"
          aria-label={ariaLabel}
        >
          {stages.map((stage, i) => (
            <div
              key={`${stage.label}-${i}`}
              className={`${baseClass}__stage`}
              style={
                {
                  '--funnel-stage-size': stage.share,
                  '--funnel-stage-color': stage.color,
                } as React.CSSProperties
              }
            >
              <div className={`${baseClass}__bar`}>
                <span className={`${baseClass}__pct`}>
                  {Math.round(firstValue > 0 ? (stage.value / firstValue) * 100 : 0)}%
                </span>
              </div>
              <div
                className={`${chartClass}__tooltip ${baseClass}__tooltip`}
                aria-hidden="true"
              >
                <div className={`${chartClass}__tooltip-label`}>{stage.label}</div>
                <div className={`${chartClass}__tooltip-row`}>
                  <span
                    className={`${chartClass}__tooltip-dot`}
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className={`${chartClass}__tooltip-value`}>
                    {stage.displayValue ?? stage.value.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

FunnelChart.displayName = 'FunnelChart';
