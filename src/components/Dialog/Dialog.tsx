'use client';

import React, { useEffect, useRef, useId, useSyncExternalStore } from 'react';
import ReactDOM from 'react-dom';
import './Dialog.css';
import '../../fonts/material-symbols.css';

const emptySubscribe = () => () => {};

/** Props owned by Dialog itself — everything else falls through to the panel. */
type DialogOwnProps = {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog requests to close */
  onOpenChange: (open: boolean) => void;
  /**
   * Dialog title.
   * Note: this shadows the native `title` tooltip attribute, which Dialog does not expose.
   */
  title: string;
  /** Optional subtitle under the title */
  description?: string;
  /** Dialog body content */
  children?: React.ReactNode;
  /** Optional footer slot — typically a row of Buttons */
  footer?: React.ReactNode;
  /** Panel width */
  size?: 'sm' | 'md' | 'lg';
  /** Whether ESC, backdrop click, and the close button can dismiss */
  dismissible?: boolean;
  /** Additional CSS classes — applied to the portal container, not the panel */
  className?: string;
};

export interface DialogProps
  extends DialogOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof DialogOwnProps> {}

/**
 * Dialog component — a general-purpose modal with arbitrary
 * content and an optional footer. Traps focus, restores it on
 * close, locks body scroll, and supports ESC / backdrop / close
 * button dismissal. For confirm/cancel prompts use AlertDialog.
 *
 * Renders through a portal into `document.body`. The forwarded ref and any
 * unrecognised props target the **panel** (the `role="dialog"` element), not the
 * portal container — that is the element worth focusing or measuring.
 */
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      children,
      footer,
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
    const baseClass = 'ds-dialog';

    /** Keep the internal ref (used by the focus trap) while honouring a forwarded one. */
    const setPanelRef = (node: HTMLDivElement | null) => {
      panelRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    // SSR guard — only render portal on the client
    const mounted = useSyncExternalStore(
      emptySubscribe,
      () => true,
      () => false,
    );

    // Store the previously focused element when opening
    useEffect(() => {
      if (open) {
        previousFocusRef.current = document.activeElement as HTMLElement;
      }
    }, [open]);

    // Focus trap and keyboard handling
    useEffect(() => {
      if (!open) return;

      const panel = panelRef.current;
      if (panel) {
        const first =
          panel.querySelector<HTMLElement>('button, [href], input, select, textarea') ??
          panel.querySelector<HTMLElement>('[tabindex]:not([tabindex="-1"])');
        (first ?? panel).focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && dismissible) {
          onOpenChange(false);
          return;
        }

        if (e.key === 'Tab' && panel) {
          const focusable = panel.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
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

    // Prevent body scroll when open
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

    const handleBackdropClick = () => {
      if (dismissible) onOpenChange(false);
    };

    const containerClasses = [
      baseClass,
      `${baseClass}--${size}`,
      open ? `${baseClass}--open` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const dialog = (
      <div className={containerClasses}>
        <div className={`${baseClass}__backdrop`} onClick={handleBackdropClick} />

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
                aria-label="Close dialog"
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

          {children && (
            // Scrollable when content is long; without a tab stop a keyboard
            // user cannot reach that scroll. The initial-focus query below
            // still prefers a real control, so this does not steal focus.
            <div className={`${baseClass}__body`} tabIndex={0}>
              {children}
            </div>
          )}

          {footer && <div className={`${baseClass}__footer`}>{footer}</div>}
        </div>
      </div>
    );

    if (!mounted) return null;
    return ReactDOM.createPortal(dialog, document.body);
  },
);

Dialog.displayName = 'Dialog';
