import React from 'react';
import './Card.css';

export interface CardProps {
  /** Card title displayed below the preview */
  title: string;
  /** Preview content rendered inside the card */
  children?: React.ReactNode;
  /** Whether the card is interactive (hoverable) */
  interactive?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card component from Figma design system
 * Displays a preview area with a title below
 * Used for table-of-contents style navigation cards
 */
export const Card = ({
  title,
  children,
  interactive = false,
  onClick,
  className = '',
}: CardProps) => {
  const baseClass = 'ds-card';
  const interactiveClass = interactive ? `${baseClass}--interactive` : '';

  const classes = [baseClass, interactiveClass, className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <div className={`${baseClass}__preview`}>{children}</div>
      <h3 className={`${baseClass}__title`}>{title}</h3>
    </div>
  );
};
