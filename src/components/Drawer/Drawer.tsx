'use client';

import React, { useEffect, useRef, useId, useSyncExternalStore } from 'react';
import ReactDOM from 'react-dom';
import './Drawer.css';
import '../../fonts/material-symbols.css';

const emptySubscribe = () => () => {};

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Props owned by Drawer itself — everything else falls through to the panel. */
type DrawerOwnProps = {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when the drawer requests to close */
  onOpenChange: (open: boolean) => void;
  /**
   * Drawer title.
   * Note: this shadows the native `title` tooltip attribute, which Drawer does not expose.
   */
  title: string;
  /** Optional subtitle under the title */
  description?: string;
  /** Drawer body content */
  children?: React.ReactNode;
  /** Optional footer slot — typically a row of Buttons */
  footer?: React.ReactNode;
  /** Edge the panel slides in from */
  side?: 'left' | 'right' | 'top' | 'bottom';
  /** Panel size along the axis it slides on */
  size?: 'sm' | 'md' | 'lg';
  /** Whether ESC, scrim click, and the close button can dismiss */
  dismissible?: boolean;
  /** Additional CSS classes — applied to the portal container, not the panel */
  className?: string;
};

export interface DrawerProps
  extends DrawerOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof DrawerOwnProps> {}

/**
 * Drawer component — an edge-anchored panel that slides in over the page.
 * Shares Dialog's modal semantics (focus trap, focus restore, scroll lock,
 * ESC/scrim dismissal) but is anchored to a viewport edge, which suits
 * filter panels, detail views, and mobile navigation.
 *
 * Renders through a portal into `document.body`. The forwarded ref and any
 * unrecognised props target the **panel** (the `role="dialog"` element), not the
 * portal container.
 */
export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      children,
      footer,
      side = 'right',
      size = 'md',
      dismissible = true,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const titleId = useId();
    const descId = useId();
    const baseClass = 'ds-drawer';

    /** Keep the internal ref (used by the focus trap) while honouring a forwarded one. */
    const setPanelRef = (node: HTMLDivElement | null) => {
      panelRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    // SSR guard — only render the portal on the client
    const mounted = useSyncExternalStore(
      emptySubscribe,
      () => true,
      () => false,
    );

    // Remember what was focused before opening
    useEffect(() => {
      if (open) {
        previousFocusRef.current = document.activeElement as HTMLElement;
      }
    }, [open]);

    // Focus trap + ESC
    useEffect(() => {
      if (!open) return;

      const panel = panelRef.current;
      if (panel) {
        const first = panel.querySelector<HTMLElement>(FOCUSABLE);
        (first ?? panel).focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && dismissible) {
          onOpenChange(false);
          return;
        }

        if (e.key === 'Tab' && panel) {
          const focusable = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, dismissible, onOpenChange]);

    // Restore focus on close
    useEffect(() => {
      if (!open && previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }, [open]);

    // Lock body scroll while open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    const handleScrimClick = () => {
      if (dismissible) onOpenChange(false);
    };

    const classes = [
      baseClass,
      `${baseClass}--${side}`,
      `${baseClass}--${size}`,
      open ? `${baseClass}--open` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const drawer = (
      <div className={classes}>
        <div className={`${baseClass}__scrim`} onClick={handleScrimClick} />

        <div
          {...rest}
          className={`${baseClass}__panel`}
          ref={setPanelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descId : rest['aria-describedby']}
          tabIndex={-1}
        >
          <div className={`${baseClass}__header`}>
            <div className={`${baseClass}__heading`}>
              <h2 className={`${baseClass}__title`} id={titleId}>
                {title}
              </h2>
              {description && (
                <p className={`${baseClass}__description`} id={descId}>
                  {description}
                </p>
              )}
            </div>

            {dismissible && (
              <button
                type="button"
                className={`${baseClass}__close`}
                onClick={() => onOpenChange(false)}
                aria-label="Close drawer"
              >
                <span
                  className={`${baseClass}__close-icon material-symbols-rounded`}
                  aria-hidden="true"
                >
                  close
                </span>
              </button>
            )}
          </div>

          {children && <div className={`${baseClass}__body`}>{children}</div>}

          {footer && <div className={`${baseClass}__footer`}>{footer}</div>}
        </div>
      </div>
    );

    if (!mounted) return null;
    return ReactDOM.createPortal(drawer, document.body);
  },
);

Drawer.displayName = 'Drawer';
