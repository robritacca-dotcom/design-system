import React from 'react';
import { Chip } from '../Chip/Chip';
import './PromptSuggestions.css';

/** One tappable suggestion in the row. */
export interface PromptSuggestion {
  /** Stable identifier passed to `onValueChange`. */
  id: string;
  /** The suggestion text shown in the chip. */
  label: string;
  /** Optional leading Material Symbol name. */
  icon?: string;
}

/** Props owned by PromptSuggestions itself — everything else falls through to the root element. */
type PromptSuggestionsOwnProps = {
  /** The suggestions to render, in order. */
  suggestions: PromptSuggestion[];
  /** Fires with the tapped suggestion's `id`. */
  onValueChange?: (id: string) => void;
  /**
   * Wrap onto multiple lines instead of scrolling — for empty-state hero
   * placements. The scrolling row keeps its edge fades; the wrapped one
   * has no overflow to hint at.
   */
  wrap?: boolean;
  /** Accessible name for the list. */
  ariaLabel?: string;
  /** Additional CSS classes */
  className?: string;
};

export interface PromptSuggestionsProps
  extends PromptSuggestionsOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof PromptSuggestionsOwnProps> {}

/**
 * PromptSuggestions is a horizontal row of tappable prompts for starting or
 * steering a conversation. Each suggestion renders as a clickable Chip, so
 * one component owns the pill look; the row scrolls horizontally with pure
 * CSS edge fades — no scroll listeners, no measurement — or wraps for
 * empty-state hero placements.
 */
export const PromptSuggestions = React.forwardRef<HTMLDivElement, PromptSuggestionsProps>(
  (
    {
      suggestions,
      onValueChange,
      wrap = false,
      ariaLabel = 'Suggested prompts',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const baseClass = 'ds-prompt-suggestions';

    const classes = [baseClass, wrap ? `${baseClass}--wrap` : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div {...rest} ref={ref} className={classes} role="list" aria-label={ariaLabel}>
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} role="listitem" className={`${baseClass}__item`}>
            <Chip
              label={suggestion.label}
              icon={suggestion.icon}
              onClick={() => onValueChange?.(suggestion.id)}
            />
          </div>
        ))}
      </div>
    );
  },
);

PromptSuggestions.displayName = 'PromptSuggestions';
