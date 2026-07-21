import React, { useEffect, useRef, useId, useSyncExternalStore } from 'react';
import ReactDOM from 'react-dom';
import './Dialog.css';
import '../../fonts/material-symbols.css';

const emptySubscribe = () => () => {};

export interface DialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog requests to close */
  onOpenChange: (open: boolean) => void;
  /** Dialog title */
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
  /** Additional CSS classes */
  className?: string;
}

/**
 * Dialog component — a general-purpose modal with arbitrary
 * content and an optional footer. Traps focus, restores it on
 * close, locks body scroll, and supports ESC / backdrop / close
 * button dismissal. For confirm/cancel prompts use AlertDialog.
 */
export const Dialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
  dismissible = true,
  className = '',
}: DialogProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();
  const baseClass = 'ds-dialog';

  // SSR guard — only render portal on the client
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

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
      const first = panel.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      (first ?? panel).focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissible) {
        onOpenChange(false);
        return;
      }

      if (e.key === 'Tab' && panel) {
        const focusable = panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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

  const openClass = open ? `${baseClass}--open` : '';
  const sizeClass = `${baseClass}--${size}`;

  const containerClasses = [baseClass, sizeClass, openClass, className]
    .filter(Boolean)
    .join(' ');

  const dialog = (
    <div className={containerClasses}>
      <div className={`${baseClass}__backdrop`} onClick={handleBackdropClick} />

      <div
        className={`${baseClass}__panel`}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
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

        {children && <div className={`${baseClass}__body`}>{children}</div>}

        {footer && <div className={`${baseClass}__footer`}>{footer}</div>}
      </div>
    </div>
  );

  if (!mounted) return null;
  return ReactDOM.createPortal(dialog, document.body);
};
