'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { CircularButton } from '../CircularButton/CircularButton';
import './Composer.css';

/** Props owned by Composer itself — everything else falls through to the <textarea>. */
type ComposerOwnProps = {
  /** Current value for controlled use. Pair with `onValueChange`. */
  value?: string;
  /** Initial value for uncontrolled use. */
  defaultValue?: string;
  /**
   * Convenience callback receiving the value directly.
   * Fires alongside `onChange`, which keeps the standard React event signature
   * so form libraries work unmodified.
   */
  onValueChange?: (value: string) => void;
  /**
   * Fires with the current value on Enter (without Shift) and on the send
   * button — never while `streaming`, and never when the trimmed value is
   * empty. Composer does not clear the value: the consumer owns it and clears
   * it after a successful submit. Shadows the native `onSubmit` attribute,
   * which never fires on a textarea anyway.
   */
  onSubmit?: (value: string) => void;
  /**
   * A response is streaming: the send button becomes a stop button, submit
   * is blocked, and Enter is inert.
   */
  streaming?: boolean;
  /** Fires when the stop button is pressed while `streaming`. */
  onStop?: () => void;
  /** Growth cap in text rows before the textarea scrolls internally. */
  maxRows?: number;
  /**
   * Attachment row rendered above the textarea (DocumentChips). Fully
   * controlled by the caller — Composer never owns the list.
   */
  attachments?: React.ReactNode;
  /** Leading actions on the left of the action bar (attach button, model picker). */
  actions?: React.ReactNode;
  /**
   * Trailing actions on the right of the action bar, just before the send
   * button (dictation, voice mode).
   */
  trailingActions?: React.ReactNode;
  /** Accessible label for the send button. */
  sendLabel?: string;
  /** Accessible label for the stop button. */
  stopLabel?: string;
  /** Additional CSS classes — applied to the shell, not the <textarea>. */
  className?: string;
};

export interface ComposerProps
  extends ComposerOwnProps,
    Omit<React.ComponentPropsWithoutRef<'textarea'>, keyof ComposerOwnProps> {}

/**
 * Composer is the chat input shell: an attachments row, an auto-growing
 * textarea, a leading actions slot, and a trailing send button — the one
 * sanctioned primary-action teal in the chat set, because sending a message
 * is a genuine primary CTA. While `streaming`, send becomes stop and Enter
 * is inert.
 *
 * The textarea grows with its content up to `maxRows`, then scrolls
 * internally. Where the browser supports `field-sizing: content` the sizing
 * is fully native; elsewhere a measurement effect keeps the height in step.
 *
 * Forwards a ref to the underlying `<textarea>` and spreads unrecognised
 * props onto it; `className` lands on the shell.
 */
export const Composer = React.forwardRef<HTMLTextAreaElement, ComposerProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      onSubmit,
      streaming = false,
      onStop,
      maxRows = 8,
      attachments,
      actions,
      trailingActions,
      sendLabel = 'Send message',
      stopLabel = 'Stop generating',
      className = '',
      onChange,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const baseClass = 'ds-composer';
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
    const currentValue = isControlled ? value : uncontrolledValue;

    const disabled = Boolean(rest.disabled);
    const canSend = !disabled && currentValue.trim() !== '';

    /** Keep the internal ref (used for auto-grow) while honouring a forwarded one. */
    const setTextareaRef = (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useLayoutEffect(() => {
      const node = textareaRef.current;
      if (!node) return;
      // Native sizing takes over where supported — see the @supports block in the CSS.
      if (typeof CSS !== 'undefined' && CSS.supports('field-sizing', 'content')) return;
      node.style.height = 'auto';
      node.style.height = `${node.scrollHeight}px`;
    }, [currentValue]);

    const submit = () => {
      if (streaming || !canSend) return;
      onSubmit?.(currentValue);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setUncontrolledValue(e.target.value);
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(e);
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        // Inert while streaming or trimmed-empty — submit() guards both.
        submit();
      }
    };

    /* The whole shell is the input affordance: clicking anywhere that is not
       a control focuses the textarea, so the click target is the visible
       shape rather than the text line inside it. */
    const handleShellClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, textarea, input, select, [role="button"]')) return;
      textareaRef.current?.focus();
    };

    const classes = [baseClass, disabled ? `${baseClass}--disabled` : '', className]
      .filter(Boolean)
      .join(' ');

    // The textarea needs an accessible name; default one in when the caller
    // provides neither aria-label nor aria-labelledby.
    const ariaLabel =
      rest['aria-label'] ?? (rest['aria-labelledby'] !== undefined ? undefined : 'Message');

    return (
      <div
        className={classes}
        style={{ '--ds-composer-max-rows': maxRows } as React.CSSProperties}
        onClick={handleShellClick}
      >
        {attachments && <div className={`${baseClass}__attachments`}>{attachments}</div>}

        <div className={`${baseClass}__content`}>
          <textarea
            {...rest}
            ref={setTextareaRef}
            className={`${baseClass}__textarea`}
            rows={1}
            value={currentValue}
            aria-label={ariaLabel}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className={`${baseClass}__footer`}>
          {actions && <div className={`${baseClass}__actions`}>{actions}</div>}
          <div className={`${baseClass}__trailing`}>
            {trailingActions}
            {streaming ? (
              <CircularButton
                icon="stop"
                variant="primary"
                ariaLabel={stopLabel}
                state={disabled ? 'disabled' : 'default'}
                onClick={onStop}
              />
            ) : (
              <CircularButton
                icon="arrow_upward"
                variant="primary"
                ariaLabel={sendLabel}
                state={canSend ? 'default' : 'disabled'}
                onClick={submit}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);

Composer.displayName = 'Composer';
