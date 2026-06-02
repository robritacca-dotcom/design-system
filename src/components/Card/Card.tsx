import React from 'react';
import './Card.css';
import '../../fonts/material-symbols.css';

export interface CardProps {
  /** Card variant */
  variant?: 'default' | 'case-study';
  /** Card title displayed below the preview */
  title: string;
  /** Preview content rendered inside the card (default variant only) */
  children?: React.ReactNode;
  /** Whether the card is interactive (hoverable) */
  interactive?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;

  // ── Case-study variant props ──────────────────────────────────────────────
  /** Navigation href — renders the card as an <a> tag */
  href?: string;
  /** Cover image src */
  coverSrc?: string;
  /** Cover image alt text */
  coverAlt?: string;
  /** Path to the company logo shown in the eyebrow */
  companyLogo?: string;
  /** Company name shown in the eyebrow */
  companyName?: string;
  /** Subtitle / dek line below the title */
  dek?: string;
  /** Render as a disabled placeholder (no href, dimmed, not interactive) */
  placeholder?: boolean;
}

export const Card = ({
  variant = 'default',
  title,
  children,
  interactive = false,
  onClick,
  className = '',
  href,
  coverSrc,
  coverAlt,
  companyLogo,
  companyName,
  dek,
  placeholder = false,
}: CardProps) => {
  // ── Case-study variant ────────────────────────────────────────────────────
  if (variant === 'case-study') {
    const inner = (
      <>
        <div className="ds-card--case-study__cover-wrap">
          {coverSrc ? (
            <img
              src={coverSrc}
              alt={coverAlt ?? `${title} cover`}
              className="ds-card--case-study__cover-image"
            />
          ) : (
            <div className="ds-card--case-study__cover-placeholder">
              {companyLogo && (
                <img
                  src={companyLogo}
                  alt=""
                  className="ds-card--case-study__cover-placeholder-logo"
                />
              )}
            </div>
          )}
        </div>
        <div className="ds-card--case-study__body">
          {(companyLogo || companyName) && (
            <div className="ds-card--case-study__eyebrow">
              {companyLogo && (
                <img
                  src={companyLogo}
                  alt=""
                  className="ds-card--case-study__company-logo"
                />
              )}
              {companyName && (
                <span className="ds-card--case-study__company-name">{companyName}</span>
              )}
            </div>
          )}
          <h3 className="ds-card--case-study__title">{title}</h3>
          {dek && <p className="ds-card--case-study__dek">{dek}</p>}
        </div>
      </>
    );

    const classes = [
      'ds-card',
      'ds-card--case-study',
      placeholder ? 'ds-card--case-study--placeholder' : '',
      className,
    ].filter(Boolean).join(' ');

    if (placeholder || !href) {
      return (
        <div className={classes} aria-disabled="true">
          {inner}
        </div>
      );
    }

    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }

  // ── Default variant ───────────────────────────────────────────────────────
  const baseClass = 'ds-card';
  const interactiveClass = interactive ? `${baseClass}--interactive` : '';
  const classes = [baseClass, interactiveClass, className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? title : undefined}
    >
      <div className={`${baseClass}__preview`}>{children}</div>
      <h3 className={`${baseClass}__title`}>{title}</h3>
    </div>
  );
};
