import { useCallback } from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { ChartSummaryItem } from './BarChart';
import './Chart.css';

interface AreaTooltipPayloadEntry {
  value?: number;
  color?: string;
  dataKey?: string;
  name?: string;
  [key: string]: unknown;
}

interface AreaTooltipProps {
  active?: boolean;
  payload?: AreaTooltipPayloadEntry[];
  label?: string | number;
}

export interface AreaSeriesConfig {
  /** Key in data for this series */
  dataKey: string;
  /** Display name (shown in tooltip and legend) */
  label: string;
  /** Area stroke / fill colour — CSS value */
  color?: string;
  /** Fill opacity (0–1) */
  fillOpacity?: number;
}

export interface AreaChartProps {
  /** Array of data objects */
  data: Record<string, unknown>[];
  /** Key in data for x-axis values */
  xKey?: string;
  /** One or more area series to render */
  series: AreaSeriesConfig[];
  /** Whether areas stack on top of each other */
  stacked?: boolean;
  /** Chart title */
  title?: string;
  /** Description text below the title */
  subtitle?: string;
  /** Summary stats displayed in the header */
  summaryItems?: ChartSummaryItem[];
  /** Chart area height in pixels */
  height?: number;
  /** Additional CSS classes on the wrapper */
  className?: string;
}

function getCSSVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function AreaTooltip({ active, payload, label }: AreaTooltipProps) {
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
 * Area chart built on Recharts with design-system tokens.
 * Supports multiple stacked or overlapping series with gradient fills.
 */
export const AreaChart = ({
  data,
  xKey = 'label',
  series,
  stacked = false,
  title,
  subtitle,
  summaryItems,
  height = 350,
  className = '',
}: AreaChartProps) => {
  const baseClass = 'ds-chart';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const textSecondary = getCSSVar('--color-text-secondary', '#A2A2A2');
  const gridColor = getCSSVar('--color-divider', '#232323');
  const defaultColor = getCSSVar('--color-action-primary-bg', '#118AB2');

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const renderTooltip = useCallback(
    (props: any) => <AreaTooltip {...props} />,
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
          <RechartsAreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -12 }}>
            <defs>
              {series.map((s) => {
                const color = s.color || defaultColor;
                return (
                  <linearGradient key={`grad-${s.dataKey}`} id={`area-gradient-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                  </linearGradient>
                );
              })}
            </defs>
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
            />
            <Tooltip content={renderTooltip} />
            {series.map((s) => (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.label}
                stroke={s.color || defaultColor}
                strokeWidth={2}
                fill={`url(#area-gradient-${s.dataKey})`}
                fillOpacity={s.fillOpacity ?? 1}
                stackId={stacked ? 'stack' : undefined}
              />
            ))}
            {series.length > 1 && (
              <Legend wrapperStyle={{ color: textSecondary, fontSize: 12 }} />
            )}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
