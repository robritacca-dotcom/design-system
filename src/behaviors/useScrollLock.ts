'use client';

import { useEffect, useRef } from 'react';

/**
 * Page scroll locking for modal overlays, with two strategies and one owner.
 *
 * `overflow` (the default) hides `document.body` overflow. It is **counted**:
 * the body style is captured on the first acquire and restored only when the
 * last holder releases, so closing a Dialog opened over a Drawer no longer
 * unlocks the Drawer's scroll — the bug the per-component locks this
 * replaces raced into.
 *
 * `cancel-events` keeps the document scrollbar rendered and cancels scroll
 * *input* instead — wheel and touch gestures work only inside `allowWithin`.
 * This is CommandPalette's documented design decision (hiding overflow blinks
 * the scrollbar rail out, which reads as a layout jump on classic-scrollbar
 * platforms); it is deliberately not the default because swapping the modals
 * onto it would change their scrollbar rendering. Instances are independent —
 * overlapping cancel-events locks stack harmlessly.
 */

type ScrollLockOptions = {
  /** Which locking strategy to use. Default `'overflow'`. */
  strategy?: 'overflow' | 'cancel-events';
  /** For `cancel-events`: the scrollable region that keeps receiving input. */
  allowWithin?: React.RefObject<HTMLElement | null>;
};

let overflowLockCount = 0;
let previousBodyOverflow = '';

const acquireOverflowLock = () => {
  if (overflowLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  overflowLockCount += 1;
};

const releaseOverflowLock = () => {
  overflowLockCount -= 1;
  if (overflowLockCount === 0) {
    document.body.style.overflow = previousBodyOverflow;
  }
};

export function useScrollLock(active: boolean, options?: ScrollLockOptions): void {
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  const strategy = options?.strategy ?? 'overflow';
  useEffect(() => {
    if (!active) return;

    if (strategy === 'overflow') {
      acquireOverflowLock();
      return releaseOverflowLock;
    }

    const block = (event: Event) => {
      const allow = optionsRef.current?.allowWithin?.current;
      const target = event.target instanceof Node ? event.target : null;
      if (allow && target && allow.contains(target)) return;
      event.preventDefault();
    };
    document.addEventListener('wheel', block, { passive: false });
    document.addEventListener('touchmove', block, { passive: false });
    return () => {
      document.removeEventListener('wheel', block);
      document.removeEventListener('touchmove', block);
    };
  }, [active, strategy]);
}
