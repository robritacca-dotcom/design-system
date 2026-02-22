import { useEffect, useRef, useId } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../Button/Button';
import './AlertDialog.css';
import '../../fonts/material-symbols.css';

export interface AlertDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog requests to close */
  onOpenChange: (open: boolean) => void;
  /** Dialog title */
  title: string;
  /** Dialog description / body text */
  description?: string;
  /** Confirm button label */
  confirmLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Callback when confirm is clicked */
  onConfirm?: () => void;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
  /** Destructive variant for dangerous actions */
  variant?: 'default' | 'destructive';
  /** Additional CSS classes */
  className?: string;
}

/**
 * AlertDialog component for important confirmations.
 * Renders a modal overlay with title, description,
 * and confirm / cancel actions. Traps focus and
 * supports ESC key dismissal.
 */
export const AlertDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  className = '',
}: AlertDialogProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  const baseClass = 'ds-alert-dialog';

  // Store the previously focused element when opening
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!open) return;

    // Focus the cancel button on open
    const panel = panelRef.current;
    if (panel) {
      const cancelBtn = panel.querySelector<HTMLElement>(
        `.${baseClass}__actions button:first-child`
      );
      cancelBtn?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
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
  }, [open]);

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

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const variantClass = variant !== 'default' ? `${baseClass}--${variant}` : '';
  const openClass = open ? `${baseClass}--open` : '';

  const containerClasses = [baseClass, variantClass, openClass, className]
    .filter(Boolean)
    .join(' ');

  const dialog = (
    <div className={containerClasses}>
      <div className={`${baseClass}__backdrop`} onClick={handleCancel} />

      <div
        className={`${baseClass}__panel`}
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
      >
        <div className={`${baseClass}__header`}>
          <span
            className={`${baseClass}__icon material-symbols-rounded`}
            aria-hidden="true"
          >
            {variant === 'destructive' ? 'warning' : 'info'}
          </span>
          <h2 className={`${baseClass}__title`} id={titleId}>
            {title}
          </h2>
        </div>

        {description && (
          <p className={`${baseClass}__description`} id={descId}>
            {description}
          </p>
        )}

        <div className={`${baseClass}__actions`}>
          <Button
            label={cancelLabel}
            priority="tertiary"
            onClick={handleCancel}
          />
          <Button
            label={confirmLabel}
            priority={variant === 'destructive' ? 'destructive' : 'primary'}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(dialog, document.body);
};
