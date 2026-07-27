'use client';

import {
  useState,
  useRef,
  useId,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from 'react';
import './Tooltip.css';

export interface TooltipProps {
  /** Trigger element */
  children?: ReactNode;
  /** Tooltip text content */
  content: string;
  /** Preferred position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (in ms) */
  showDelay?: number;
  /** Delay before hiding (in ms) */
  hideDelay?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Tooltip component for contextual text labels.
 * Appears on hover or focus with a short delay.
 * Uses inverted colours (dark background in light theme).
 */
export const Tooltip = ({
  children,
  content,
  position = 'top',
  showDelay = 300,
  hideDelay = 150,
  className = '',
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tooltipId = useId();

  const baseClass = 'ds-tooltip';

  const show = () => {
    clearTimeout(hideTimeoutRef.current);
    showTimeoutRef.current = setTimeout(() => setVisible(true), showDelay);
  };

  const hide = () => {
    clearTimeout(showTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setVisible(false), hideDelay);
  };

  // Associate the trigger with the tooltip for screen readers. When the
  // child is a single element, put aria-describedby directly on it.
  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ 'aria-describedby'?: string }>, {
        'aria-describedby': tooltipId,
      })
    : children;

  const containerClasses = [baseClass, className].filter(Boolean).join(' ');
  const panelClasses = [
    `${baseClass}__panel`,
    `${baseClass}__panel--${position}`,
    visible ? `${baseClass}__panel--visible` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={containerClasses}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {trigger}

      <span
        className={panelClasses}
        role="tooltip"
        id={tooltipId}
        aria-hidden={!visible}
      >
        {content}
        <span className={`${baseClass}__arrow`} />
      </span>
    </span>
  );
};
