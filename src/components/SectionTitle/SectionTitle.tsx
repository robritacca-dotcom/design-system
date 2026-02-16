import React from "react";
import "./SectionTitle.css";

export interface SectionTitleProps {
  /** Section heading text */
  title: string;
  /** Optional trailing content (count, badge, metadata) */
  trailing?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function SectionTitle({
  title,
  trailing,
  className,
}: SectionTitleProps) {
  const classes = ["ds-section-title", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <h2 className="ds-section-title__heading">{title}</h2>
      {trailing !== undefined && trailing !== null && (
        <span className="ds-section-title__trailing">{trailing}</span>
      )}
    </div>
  );
}
