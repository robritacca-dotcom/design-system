'use client';

import React, { useId } from 'react';
import { FieldContext, type FieldContextValue } from './FieldContext';
import './Field.css';

/** Props owned by Field itself — everything else falls through to the wrapper. */
type FieldOwnProps = {
  /** Label text rendered above the control */
  label?: string;
  /** The form control this field labels */
  children?: React.ReactNode;
  /** Helper or error message rendered below the control */
  helperText?: string;
  /** Error state — recolours the helper text and marks the control invalid */
  error?: boolean;
  /** Marks the field required and renders the required marker */
  required?: boolean;
  /** Whether the control is disabled — dims the label */
  disabled?: boolean;
  /** Component size */
  size?: 'default' | 'compact';
  /**
   * id for the control. Generated when omitted, so the label/control/helper
   * association works with no configuration.
   */
  id?: string;
  /** Additional CSS classes */
  className?: string;
};

export interface FieldProps
  extends FieldOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof FieldOwnProps> {}

/**
 * Field owns the scaffolding shared by every labelled form control: the label
 * and its `htmlFor`, the required marker, the helper/error message, the ids
 * that tie them together, and the `aria-describedby` / `aria-invalid` wiring.
 *
 * Controls compose inside it and read the wiring through `useField()` rather
 * than deriving ids themselves — which is what keeps accessibility correct
 * systemically instead of one component at a time.
 *
 * ```tsx
 * <Field label="Email" helperText="We never share it." required>
 *   <MyControl />
 * </Field>
 * ```
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      label,
      children,
      helperText,
      error = false,
      required = false,
      disabled = false,
      size = 'default',
      id,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const baseClass = 'ds-field';
    const generatedId = useId();
    const controlId = id || generatedId;
    const describedBy = helperText ? `${controlId}-helper` : undefined;

    const classes = [
      baseClass,
      size === 'compact' ? `${baseClass}--compact` : '',
      error ? `${baseClass}--error` : '',
      disabled ? `${baseClass}--disabled` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const context: FieldContextValue = {
      controlId,
      describedBy,
      invalid: error,
      required,
      disabled,
    };

    return (
      <FieldContext.Provider value={context}>
        <div {...rest} ref={ref} className={classes}>
          {label && (
            <label className={`${baseClass}__label`} htmlFor={controlId}>
              {label}
              {required && (
                <span className={`${baseClass}__required`} aria-hidden="true">
                  {' '}
                  *
                </span>
              )}
            </label>
          )}

          {children}

          {helperText && (
            <p className={`${baseClass}__helper`} id={describedBy}>
              {helperText}
            </p>
          )}
        </div>
      </FieldContext.Provider>
    );
  },
);

Field.displayName = 'Field';
