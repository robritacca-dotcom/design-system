import { useState } from 'react';
import './CodeBlock.css';
import '../../fonts/material-symbols.css';

export interface CodeBlockProps {
  /** The code to display, as a plain string */
  code: string;
  /** Language tag shown in the header, e.g. "tsx", "css" */
  language?: string;
  /** Filename shown in the header, e.g. "tokens-light.css" */
  filename?: string;
  /** Show the copy-to-clipboard button */
  showCopy?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CodeBlock component — monospace code with an optional header row
 * (filename, language tag) and a copy-to-clipboard button.
 */
export const CodeBlock = ({
  code,
  language,
  filename,
  showCopy = true,
  className = '',
}: CodeBlockProps) => {
  const baseClass = 'ds-code-block';
  const [copied, setCopied] = useState(false);

  const classes = [baseClass, className].filter(Boolean).join(' ');
  const hasHeader = Boolean(filename || language || showCopy);

  const copy = () => {
    // Textarea fallback for contexts where the async clipboard API is
    // unavailable or permission-gated (embedded browsers, http)
    const fallback = () => {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).catch(fallback);
    } else {
      fallback();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={classes}>
      {hasHeader && (
        <div className={`${baseClass}__header`}>
          <div className={`${baseClass}__meta`}>
            {filename && <code className={`${baseClass}__filename`}>{filename}</code>}
            {language && <span className={`${baseClass}__language`}>{language}</span>}
          </div>
          {showCopy && (
            <button
              type="button"
              className={`${baseClass}__copy`}
              onClick={copy}
              aria-label={copied ? 'Copied' : 'Copy code'}
            >
              <span className="material-symbols-rounded" aria-hidden="true">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <pre className={`${baseClass}__pre`}>
        <code className={`${baseClass}__code`}>{code}</code>
      </pre>
    </div>
  );
};
