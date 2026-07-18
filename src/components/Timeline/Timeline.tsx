import React from 'react';
import './Timeline.css';
import '../../fonts/material-symbols.css';

export interface TimelineItem {
  /** Step or event title */
  title: string;
  /** Small line above the title, e.g. a date range or stage tag */
  meta?: string;
  /** Body content under the title */
  description?: React.ReactNode;
  /** Material Symbol shown in the marker (overrides dot/number) */
  icon?: string;
}

export interface TimelineProps {
  /** Ordered list of steps/events */
  items: TimelineItem[];
  /** `vertical` timeline (default) or `horizontal` stepper */
  orientation?: 'vertical' | 'horizontal';
  /** Number the markers 1..n instead of dots */
  numbered?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Timeline component — an ordered sequence of steps or events with
 * connected markers. Vertical for histories and process narratives,
 * horizontal for compact steppers.
 */
export const Timeline = ({
  items,
  orientation = 'vertical',
  numbered = false,
  className = '',
}: TimelineProps) => {
  const baseClass = 'ds-timeline';

  const classes = [
    baseClass,
    `${baseClass}--${orientation}`,
    numbered && `${baseClass}--numbered`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderMarker = (item: TimelineItem, index: number) => {
    if (item.icon) {
      return (
        <span className={`material-symbols-rounded ${baseClass}__marker-icon`} aria-hidden="true">
          {item.icon}
        </span>
      );
    }
    if (numbered) {
      return <span aria-hidden="true">{index + 1}</span>;
    }
    return null;
  };

  return (
    <ol className={classes}>
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`} className={`${baseClass}__item`}>
          <span
            className={`${baseClass}__marker${
              item.icon || numbered ? ` ${baseClass}__marker--badge` : ''
            }`}
          >
            {renderMarker(item, index)}
          </span>
          <div className={`${baseClass}__content`}>
            {item.meta && <span className={`${baseClass}__meta`}>{item.meta}</span>}
            <span className={`${baseClass}__title`}>{item.title}</span>
            {item.description && (
              <div className={`${baseClass}__description`}>{item.description}</div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
};
