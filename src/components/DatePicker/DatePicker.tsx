import React, { useState, useMemo } from 'react';
import './DatePicker.css';
import '../../fonts/material-symbols.css';

export interface DatePickerProps {
  /** Currently selected date (YYYY-MM-DD) */
  value?: string;
  /** Component size */
  size?: 'default' | 'compact';
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Minimum selectable date (YYYY-MM-DD) */
  min?: string;
  /** Maximum selectable date (YYYY-MM-DD) */
  max?: string;
  /** Callback when a date is selected */
  onDateSelect?: (date: string) => void;
  /** Additional CSS classes */
  className?: string;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function parseDate(str?: string): Date | null {
  if (!str) return null;
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

/**
 * Inline date picker calendar component.
 * Displays a full month grid with navigation,
 * day headers, and selectable date cells.
 */
export const DatePicker = ({
  value,
  size = 'default',
  disabled = false,
  min,
  max,
  onDateSelect,
  className = '',
}: DatePickerProps) => {
  const selectedDate = parseDate(value);
  const minDate = parseDate(min);
  const maxDate = parseDate(max);

  const today = useMemo(() => new Date(), []);
  const [viewMonth, setViewMonth] = useState(
    selectedDate
      ? selectedDate.getMonth()
      : today.getMonth()
  );
  const [viewYear, setViewYear] = useState(
    selectedDate
      ? selectedDate.getFullYear()
      : today.getFullYear()
  );

  const baseClass = 'ds-date-picker';
  const sizeClass = `${baseClass}--${size}`;
  const disabledClass = disabled ? `${baseClass}--disabled` : '';
  const classes = [baseClass, sizeClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  // Build grid of days
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const cells: { day: number; inMonth: boolean; date: Date }[] = [];

  // Leading days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    cells.push({ day: d, inMonth: false, date: new Date(viewYear, viewMonth - 1, d) });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, date: new Date(viewYear, viewMonth, d) });
  }
  // Trailing days to fill grid (up to 42 cells = 6 rows)
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, inMonth: false, date: new Date(viewYear, viewMonth + 1, d) });
  }

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isDateDisabled = (date: Date): boolean => {
    if (disabled) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const handleSelect = (cell: { date: Date; inMonth: boolean }) => {
    if (isDateDisabled(cell.date)) return;
    if (!cell.inMonth) {
      // Navigate to the month of the out-of-range day
      setViewMonth(cell.date.getMonth());
      setViewYear(cell.date.getFullYear());
    }
    onDateSelect?.(formatDate(cell.date));
  };

  return (
    <div className={classes}>
      {/* Header */}
      <div className={`${baseClass}__header`}>
        <button
          type="button"
          className={`${baseClass}__nav-btn material-symbols-rounded`}
          onClick={goToPrevMonth}
          disabled={disabled}
          aria-label="Previous month"
        >
          chevron_left
        </button>
        <span className={`${baseClass}__month-year`}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          className={`${baseClass}__nav-btn material-symbols-rounded`}
          onClick={goToNextMonth}
          disabled={disabled}
          aria-label="Next month"
        >
          chevron_right
        </button>
      </div>

      {/* Day headers */}
      <div className={`${baseClass}__grid`} role="grid">
        {DAYS.map((day) => (
          <div key={day} className={`${baseClass}__day-header`} role="columnheader">
            {day}
          </div>
        ))}

        {/* Day cells */}
        {cells.map((cell, idx) => {
          const isSelected = selectedDate && isSameDay(cell.date, selectedDate);
          const isToday = isSameDay(cell.date, today);
          const isCellDisabled = isDateDisabled(cell.date);

          const cellClasses = [
            `${baseClass}__cell`,
            !cell.inMonth ? `${baseClass}__cell--outside` : '',
            isSelected ? `${baseClass}__cell--selected` : '',
            isToday && !isSelected ? `${baseClass}__cell--today` : '',
            isCellDisabled ? `${baseClass}__cell--disabled` : '',
          ].filter(Boolean).join(' ');

          return (
            <button
              key={idx}
              type="button"
              className={cellClasses}
              onClick={() => handleSelect(cell)}
              disabled={isCellDisabled}
              aria-label={cell.date.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              aria-selected={isSelected || undefined}
              role="gridcell"
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
