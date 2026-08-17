'use client';

import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './AnchorNav.css';

export interface AnchorNavItem {
  /** The id of the element the item jumps to (rendered as `href="#id"`) */
  id: string;
  /** Link text */
  label: string;
}

type AnchorNavOwnProps = {
  /** The on-page sections to list, in document order */
  items: AnchorNavItem[];
  /** Header text above the list; pass an empty string to render no header */
  title?: string;
  /** Material Symbols icon name beside the header; pass an empty string for none */
  icon?: string;
  /** Controlled active item id — set it to drive the highlight yourself and skip scroll tracking */
  activeId?: string;
  /** Fires when the tracked (or clicked) active item changes */
  onActiveChange?: (id: string) => void;
  /** Distance in px from the viewport top at which a section counts as current, e.g. a sticky header's height */
  offset?: number;
};

export interface AnchorNavProps
  extends AnchorNavOwnProps,
    Omit<React.ComponentPropsWithoutRef<'nav'>, keyof AnchorNavOwnProps> {}

/**
 * An "On this page" list of anchor links that tracks the reader's position.
 *
 * Uncontrolled by default: a scroll listener marks the last section whose top
 * has passed `offset` as current. Pass `activeId` to control the highlight
 * instead (no listener is attached). The active link carries
 * `aria-current="location"`.
 */
export const AnchorNav = React.forwardRef<HTMLElement, AnchorNavProps>(
  (
    {
      items,
      title = 'On this page',
      icon = 'toc',
      activeId,
      onActiveChange,
      offset = 96,
      className,
      ...rest
    },
    ref
  ) => {
    const navRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => navRef.current as HTMLElement);

    const isControlled = activeId !== undefined;
    const [trackedId, setTrackedId] = useState<string | undefined>(undefined);
    const currentId = isControlled ? activeId : trackedId;

    const onActiveChangeRef = useRef(onActiveChange);
    onActiveChangeRef.current = onActiveChange;

    const setActive = useCallback(
      (id: string | undefined) => {
        setTrackedId((prev) => {
          if (id !== undefined && id !== prev) onActiveChangeRef.current?.(id);
          return id;
        });
      },
      []
    );

    // Scroll tracking: the current section is the last one whose top sits at
    // or above `offset`; before the first section, the first item is current.
    useEffect(() => {
      if (isControlled || items.length === 0) return;
      let frame = 0;
      const measure = () => {
        frame = 0;
        let current = items[0]?.id;
        for (const item of items) {
          const el = document.getElementById(item.id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= offset + 1) current = item.id;
        }
        setActive(current);
      };
      const schedule = () => {
        if (frame === 0) frame = window.requestAnimationFrame(measure);
      };
      measure();
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      return () => {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        if (frame !== 0) window.cancelAnimationFrame(frame);
      };
    }, [isControlled, items, offset, setActive]);

    const classes = ['ds-anchor-nav', className].filter(Boolean).join(' ');

    return (
      <nav ref={navRef} aria-label={title || 'On this page'} className={classes} {...rest}>
        {title && (
          <p className="ds-anchor-nav__header">
            {icon && (
              <span className="material-symbols-rounded ds-anchor-nav__icon" aria-hidden="true">
                {icon}
              </span>
            )}
            {title}
          </p>
        )}
        <ul className="ds-anchor-nav__list">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={
                  item.id === currentId
                    ? 'ds-anchor-nav__link ds-anchor-nav__link--active'
                    : 'ds-anchor-nav__link'
                }
                aria-current={item.id === currentId ? 'location' : undefined}
                onClick={() => {
                  if (!isControlled) setActive(item.id);
                  else onActiveChangeRef.current?.(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

AnchorNav.displayName = 'AnchorNav';
