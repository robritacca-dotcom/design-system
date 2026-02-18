import React, { useState, useRef, useEffect } from 'react';
import './Popover.css';

export interface PopoverProps {
  /** Trigger element */
  children: React.ReactNode;
  /** Popover content */
  content: React.ReactNode;
  /** Component size */
  size?: 'default' | 'compact';
  /** Preferred position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Trigger mode */
  trigger?: 'click' | 'hover';
  /** Whether the popover is open (controlled mode) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Accessible label for the trigger */
  ariaLabel?: string;
  /** Additional CSS classes for the popover panel */
  className?: string;
}

/**
 * Popover component for contextual overlays.
 * Wraps a trigger element and displays content in a
 * positioned panel. Supports click and hover triggers
 * with automatic outside-click dismissal.
 */
export const Popover = ({
  children,
  content,
  size = 'default',
  position = 'bottom',
  trigger = 'click',
  open: controlledOpen,
  onOpenChange,
  ariaLabel,
  className = '',
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  // Click outside to close
  useEffect(() => {
    if (!isOpen || trigger !== 'click') return;

    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, trigger]);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  const handleClick = () => {
    if (trigger === 'click') {
      setOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      clearTimeout(hoverTimeoutRef.current);
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hoverTimeoutRef.current = setTimeout(() => setOpen(false), 150);
    }
  };

  const baseClass = 'ds-popover';
  const sizeClass = `${baseClass}--${size}`;
  const positionClass = `${baseClass}__panel--${position}`;
  const openClass = isOpen ? `${baseClass}__panel--open` : '';

  const containerClasses = [baseClass, className].filter(Boolean).join(' ');
  const panelClasses = [`${baseClass}__panel`, sizeClass, positionClass, openClass]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClasses}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${baseClass}__trigger`}
        onClick={handleClick}
        role={trigger === 'click' ? 'button' : undefined}
        tabIndex={trigger === 'click' ? 0 : undefined}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        onKeyDown={(e) => {
          if (trigger === 'click' && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setOpen(!isOpen);
          }
        }}
      >
        {children}
      </div>

      <div className={panelClasses} role="dialog" aria-hidden={!isOpen}>
        {content}
      </div>
    </div>
  );
};
