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
import type { ChartSummaryItem } from './BarChart';
import './Chart.css';

interface StackedTooltipPayloadEntry {
  value?: number;
  color?: string;
  dataKey?: string;
  name?: string;
  [key: string]: unknown;
}

interface StackedTooltipProps {
  active?: boolean;
  payload?: StackedTooltipPayloadEntry[];
  label?: string | number;
}

export interface BarSeriesConfig {
  /** Key in data for this series */
  dataKey: string;
  /** Display name (shown in tooltip & legend) */
  label: string;
  /** Bar fill colour */
  color?: string;
}

export interface StackedBarChartProps {
  /** Array of data objects */
  data: Record<string, unknown>[];
  /** Key in data for x-axis values */
  xKey?: string;
  /** One or more bar series to render (stacked) */
  series: BarSeriesConfig[];
  /** Chart title */
  title?: string;
  /** Description text below the title */
  subtitle?: string;
  /** Summary stats displayed in the header */
  summaryItems?: ChartSummaryItem[];
  /** Chart area height in pixels */
  height?: number;
  /** Y-axis tick formatter */
  yAxisFormatter?: (value: number) => string;
  /** Additional CSS classes on the wrapper */
  className?: string;
}

function getCSSVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function getDefaultColors(): string[] {
  if (typeof window === 'undefined') {
    return ['#0E6E8F', '#06D6A0', '#FFD166', '#EF476F', '#9E47EF', '#EF8247'];
  }
  const get = (v: string, fb: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(v).trim() || fb;
  return [
    get('--color-action-primary-bg', '#0E6E8F'),
    get('--color-core-accent-mint', '#06D6A0'),
    get('--color-core-accent-gold', '#FFD166'),
    get('--color-core-accent-coral', '#EF476F'),
    get('--color-core-accent-violet', '#9E47EF'),
    get('--color-core-accent-amber', '#EF8247'),
  ];
}

function StackedTooltip({ active, payload, label }: StackedTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="ds-chart__tooltip">
      <div className="ds-chart__tooltip-label">{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className="ds-chart__tooltip-row">
          <span className="ds-chart__tooltip-dot" style={{ backgroundColor: entry.color }} />
          <span className="ds-chart__tooltip-name">{entry.name}</span>
          <span className="ds-chart__tooltip-value">
            {entry.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Stacked bar chart built on Recharts with design-system tokens.
 * Supports multiple series stacked on top of each other.
 */
export const StackedBarChart = ({
  data,
  xKey = 'label',
  series,
  title,
  subtitle,
  summaryItems,
  height = 350,
  yAxisFormatter,
  className = '',
}: StackedBarChartProps) => {
  const baseClass = 'ds-chart';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const textSecondary = getCSSVar('--color-text-secondary', '#A2A2A2');
  const gridColor = getCSSVar('--color-divider', '#232323');
  const cursorColor = getCSSVar('--color-bg-container-secondary', '#303030');
  const defaultColors = getDefaultColors();

  const renderTooltip = useCallback(
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    (props: any) => <StackedTooltip {...props} />,
    [],
  );

  return (
    <div className={classes}>
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

      <div className={`${baseClass}__body`}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -12 }}>
            <CartesianGrid vertical={false} stroke={gridColor} />
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
              tickFormatter={yAxisFormatter}
            />
            <Tooltip
              content={renderTooltip}
              cursor={{ fill: cursorColor, opacity: 0.4 }}
            />
            {series.map((s, i) => (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.label}
                fill={s.color || defaultColors[i % defaultColors.length]}
                stackId="stack"
                radius={i === series.length - 1 ? [3, 3, 0, 0] : [0, 0, 0, 0]}
                maxBarSize={32}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
