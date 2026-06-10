import { useCallback } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './Chart.css';

interface ChartTooltipPayloadEntry {
  value?: number;
  [key: string]: unknown;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadEntry[];
  label?: string | number;
  barColor: string;
  dataLabel: string;
}

export interface ChartSummaryItem {
  /** Label shown above the value */
  label: string;
  /** Formatted value to display */
  value: string | number;
}

export interface BarChartProps {
  /** Array of data objects */
  data: Record<string, unknown>[];
  /** Key in data for x-axis values */
  xKey?: string;
  /** Key in data for y-axis values */
  yKey?: string;
  /** Display name for the data series (shown in tooltip) */
  dataLabel?: string;
  /** Chart title */
  title?: string;
  /** Description text below the title */
  subtitle?: string;
  /** Summary stats displayed in the header */
  summaryItems?: ChartSummaryItem[];
  /** Bar fill colour — CSS value or token reference */
  barColor?: string;
  /** Chart area height in pixels */
  height?: number;
  /** Additional CSS classes on the wrapper */
  className?: string;
}

/**
 * Reads a CSS custom property from the document root.
 * Falls back to the provided default if unavailable (e.g. SSR).
 */
function getCSSVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/**
 * Custom tooltip rendered inside the chart on hover.
 */
function ChartTooltip({
  active,
  payload,
  label,
  barColor,
  dataLabel,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="ds-chart__tooltip">
      <div className="ds-chart__tooltip-label">{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className="ds-chart__tooltip-row">
          <span className="ds-chart__tooltip-dot" style={{ backgroundColor: barColor }} />
          <span className="ds-chart__tooltip-name">{dataLabel}</span>
          <span className="ds-chart__tooltip-value">
            {entry.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Bar chart built on Recharts with design-system tokens.
 * Part of the Chart component family — shares wrapper, header,
 * tooltip, and summary-stat styles with future chart types.
 */
export const BarChart = ({
  data,
  xKey = 'label',
  yKey = 'value',
  dataLabel = 'Value',
  title,
  subtitle,
  summaryItems,
  barColor,
  height = 350,
  className = '',
}: BarChartProps) => {
  const baseClass = 'ds-chart';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  /* Resolve theme-aware colours once per render */
  const resolvedBarColor = barColor || getCSSVar('--color-action-primary-bg', '#118AB2');
  const textSecondary = getCSSVar('--color-text-secondary', '#A2A2A2');
  const gridColor = getCSSVar('--color-divider', '#232323');
  const cursorColor = getCSSVar('--color-bg-container-secondary', '#303030');

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const renderTooltip = useCallback(
    (props: any) => (
      <ChartTooltip {...props} barColor={resolvedBarColor} dataLabel={dataLabel} />
    ),
    [resolvedBarColor, dataLabel],
  );

  return (
    <div className={classes}>
      {/* Header */}
      {(title || subtitle || summaryItems) && (
        <div className={`${baseClass}__header`}>
          <div className={`${baseClass}__header-text`}>
            {title && <h3 className={`${baseClass}__title`}>{title}</h3>}
            {subtitle && <p className={`${baseClass}__subtitle`}>{subtitle}</p>}
          </div>
          {summaryItems && summaryItems.length > 0 && (
            <div className={`${baseClass}__summary`}>
              {summaryItems.map((item, i) => (
                <div key={i} className={`${baseClass}__summary-item`}>
                  <span className={`${baseClass}__summary-label`}>{item.label}</span>
                  <span className={`${baseClass}__summary-value`}>
                    {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Chart */}
      <div className={`${baseClass}__body`}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -12 }}>
            <CartesianGrid
              vertical={false}
              stroke={gridColor}
              strokeDasharray=""
            />
            <XAxis
              dataKey={xKey}
              tick={{ fill: textSecondary, fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
            />
            <YAxis
              tick={{ fill: textSecondary, fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={renderTooltip}
              cursor={{ fill: cursorColor, opacity: 0.4 }}
            />
            <Bar
              dataKey={yKey}
              fill={resolvedBarColor}
              radius={[3, 3, 0, 0]}
              maxBarSize={32}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
