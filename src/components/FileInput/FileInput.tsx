import React, { useRef, useState, useId } from 'react';
import './FileInput.css';
import '../../fonts/material-symbols.css';

export interface FileInputFile {
  /** Stable identifier */
  id: string;
  /** File name shown in the list */
  name: string;
  /** Size in bytes — rendered human-readable */
  size?: number;
  /** Upload progress 0–100. Omit for files that are already stored. */
  progress?: number;
  /** Per-file error message — replaces the size line */
  error?: string;
}

export interface FileInputProps {
  /** Field label above the dropzone */
  label?: string;
  /** Instructional copy inside the dropzone */
  placeholder?: string;
  /** Comma-separated accept list, e.g. 'image/*,.pdf' */
  accept?: string;
  /** Allow selecting more than one file */
  multiple?: boolean;
  /** Files to list under the dropzone */
  files?: FileInputFile[];
  /** Component size */
  size?: 'default' | 'compact';
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Error state — shows error styling and message */
  error?: boolean;
  /** Helper or error message displayed below the field */
  helperText?: string;
  /** Called with the newly selected files */
  onFilesSelected?: (files: File[]) => void;
  /** Called with the id of a file whose remove button was pressed */
  onFileRemove?: (id: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible name override */
  ariaLabel?: string;
  /** HTML name attribute */
  name?: string;
  /** HTML id attribute */
  id?: string;
}

/** Render a byte count as a short human-readable string. */
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exponent);
  // Whole numbers for bytes, one decimal above that
  return `${exponent === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
};

/**
 * FileInput component — a click-or-drop zone paired with a list of the
 * chosen files. The list is fully controlled: pass `files` and handle
 * `onFilesSelected` / `onFileRemove` so upload progress and per-file
 * errors stay owned by the host app.
 */
export const FileInput = ({
  label,
  placeholder = 'Drag and drop, or click to browse',
  accept,
  multiple = false,
  files = [],
  size = 'default',
  disabled = false,
  required = false,
  error = false,
  helperText,
  onFilesSelected,
  onFileRemove,
  className = '',
  ariaLabel,
  name,
  id,
}: FileInputProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = id || name || generatedId;
  const baseClass = 'ds-file-input';

  const emitFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    onFilesSelected?.(Array.from(fileList));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    emitFiles(e.target.files);
    // Reset so selecting the same file twice still fires a change
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    emitFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Ignore bubbling from children so the highlight does not flicker
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openPicker();
    }
  };

  const classes = [
    baseClass,
    size === 'compact' ? `${baseClass}--compact` : '',
    error ? `${baseClass}--error` : '',
    disabled ? `${baseClass}--disabled` : '',
    isDragging ? `${baseClass}--dragging` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {label && (
        <label className={`${baseClass}__label`} htmlFor={inputId}>
          {label}
          {required && (
            <span className={`${baseClass}__required`} aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </label>
      )}

      <div
        className={`${baseClass}__dropzone`}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel || placeholder}
        aria-describedby={helperText ? `${inputId}-helper` : undefined}
        aria-disabled={disabled || undefined}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <span className={`${baseClass}__dropzone-icon material-symbols-rounded`} aria-hidden="true">
          upload_file
        </span>
        <span className={`${baseClass}__dropzone-text`}>{placeholder}</span>
        {accept && <span className={`${baseClass}__dropzone-hint`}>Accepts {accept}</span>}

        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="file"
          className={`${baseClass}__native`}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          tabIndex={-1}
          onChange={handleChange}
        />
      </div>

      {files.length > 0 && (
        <ul className={`${baseClass}__list`}>
          {files.map((file) => (
            <li
              key={file.id}
              className={[`${baseClass}__file`, file.error ? `${baseClass}__file--error` : '']
                .filter(Boolean)
                .join(' ')}
            >
              <span
                className={`${baseClass}__file-icon material-symbols-rounded`}
                aria-hidden="true"
              >
                {file.error ? 'error' : 'description'}
              </span>

              <span className={`${baseClass}__file-details`}>
                <span className={`${baseClass}__file-name`}>{file.name}</span>

                {file.error ? (
                  <span className={`${baseClass}__file-error`}>{file.error}</span>
                ) : (
                  file.size !== undefined && (
                    <span className={`${baseClass}__file-size`}>{formatBytes(file.size)}</span>
                  )
                )}

                {file.error === undefined && file.progress !== undefined && (
                  <span
                    className={`${baseClass}__progress`}
                    role="progressbar"
                    aria-valuenow={file.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Uploading ${file.name}`}
                  >
                    <span
                      className={`${baseClass}__progress-fill`}
                      style={{ width: `${Math.min(100, Math.max(0, file.progress))}%` }}
                    />
                  </span>
                )}
              </span>

              {onFileRemove && (
                <button
                  type="button"
                  className={`${baseClass}__file-remove`}
                  onClick={() => onFileRemove(file.id)}
                  disabled={disabled}
                  aria-label={`Remove ${file.name}`}
                >
                  <span className="material-symbols-rounded" aria-hidden="true">
                    close
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {helperText && (
        <p className={`${baseClass}__helper`} id={`${inputId}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
};
