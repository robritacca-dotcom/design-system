"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AiButton } from "@robr0/design-system/components/AiButton/AiButton";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
import { CHROMELESS_ROUTES } from "@/config/chromeless";
import { DOCK_QUERY, TAKEOVER_QUERY, useSiteChat } from "./ChatContext";
import { SiteChat } from "./SiteChat";
import styles from "./SiteChat.module.css";

/* The docked panel's drag-to-widen range. The minimum mirrors the
   --layout-chat-width default in globals.css (the resting width); the
   maximum is 30% wider. The drag writes the variable back onto <html>, so
   the body inset and the MegaNav content inset — both derived from the same
   variable — slide with the panel edge for free. */
const PANEL_MIN_WIDTH = 420;
const PANEL_MAX_WIDTH = 546;

const subscribeQuery = (query: string) => (onChange: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const subscribeDock = subscribeQuery(DOCK_QUERY);
const readDocked = () => window.matchMedia(DOCK_QUERY).matches;
const subscribeTakeover = subscribeQuery(TAKEOVER_QUERY);
const readTakeover = () => window.matchMedia(TAKEOVER_QUERY).matches;

/**
 * The site-wide panel. Mounted once from the root layout, after {children},
 * so it sits last in the tab order and never remounts on navigation — which
 * is what lets a mid-stream answer keep streaming while the visitor reads a
 * different page.
 *
 * Docked (wide screens) it is a non-modal complementary region: no scrim,
 * no focus trap, the page stays fully usable beside it. Overlaying (below
 * the threshold, and in fullscreen view) it is modal: scrim, focus trap,
 * body scroll locked, Escape closes.
 */
export function SiteChatMount() {
  const { open, setOpen, view, returnFocusRef } = useSiteChat();
  const pathname = usePathname();
  const docked = useSyncExternalStore(subscribeDock, readDocked, () => false);
  /* Phone widths: the panel fills the viewport, so it is a takeover whatever
     the view says — the expand toggle is hidden there rather than offering a
     switch from full screen to full screen. */
  const takeover = useSyncExternalStore(subscribeTakeover, readTakeover, () => false);

  const denied = CHROMELESS_ROUTES.has(pathname);
  const isFull = view === "full" || takeover;
  const modal = open && !denied && (isFull || !docked);
  const showPanel = open && !denied;

  /* The page-slide inset: html[data-chat="docked"] pads the body and offsets
     the fixed sticky header (globals.css + MegaNav.module.css). Attribute,
     not context, so the styling needs no subscription anywhere else. */
  useEffect(() => {
    if (showPanel && docked && !isFull) {
      document.documentElement.setAttribute("data-chat", "docked");
    } else {
      document.documentElement.removeAttribute("data-chat");
    }
    return () => document.documentElement.removeAttribute("data-chat");
  }, [showPanel, docked, isFull]);

  /* Modal mode owns the page behind it. */
  useEffect(() => {
    if (!modal) return;
    lockBodyScroll("site-chat");
    return () => unlockBodyScroll("site-chat");
  }, [modal]);

  /* Closing restores focus to whichever launcher opened the panel, when it
     is still on the page (the header remounts per route). */
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) {
      const target = returnFocusRef.current;
      if (target && target.isConnected) target.focus();
    }
    wasOpen.current = open;
  }, [open, returnFocusRef]);

  const panelRef = useRef<HTMLDivElement | null>(null);

  /* Drag-to-widen, docked view only. Same pointer choreography as the
     bench's grips (pointer capture, primary button, cancel-safe); the panel's
     right edge is fixed, so the width delta is simply the inverted pointer
     delta — no centred doubling. Mouse-driven review affordance like the
     bench's; the panel stays fully usable at its resting width without it. */
  const dragRef = useRef<{ startX: number; width: number } | null>(null);
  const [resizing, setResizing] = useState(false);

  const beginResize = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.pointerType === "mouse" && e.button !== 0) || dragRef.current) return;
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = { startX: e.clientX, width: rect.width };
    e.currentTarget.setPointerCapture(e.pointerId);
    setResizing(true);
    /* Suppresses the body inset's glide and page text selection while the
       pointer drives the width frame by frame (globals.css). */
    document.documentElement.setAttribute("data-chat-resizing", "");
  };

  const moveResize = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const width = Math.round(
      Math.min(PANEL_MAX_WIDTH, Math.max(PANEL_MIN_WIDTH, drag.width + (drag.startX - e.clientX)))
    );
    /* The chosen width survives close/reopen for the session; everything
       sized from the variable follows it. */
    document.documentElement.style.setProperty("--layout-chat-width", `${width}px`);
  };

  const endResize = () => {
    dragRef.current = null;
    setResizing(false);
    document.documentElement.removeAttribute("data-chat-resizing");
  };

  if (denied) return null;

  /* Closed: the FAB is the entry point — bottom right, on every page, never
     remounting on navigation (so focus restore works everywhere). */
  if (!showPanel) {
    return (
      <div className={styles.fab}>
        <AiButton
          label="Ask robr0 GPT"
          icon="forum"
          aria-expanded={false}
          aria-controls="site-chat-panel"
          onClick={(event) => {
            returnFocusRef.current = event.currentTarget;
            setOpen(true);
          }}
        />
      </div>
    );
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    /* SiteChat handles Escape-in-fullscreen itself (and stops propagation);
       this one closes the panel from panel view. */
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    /* A minimal focus trap, only while modal: Tab wraps within the panel.
       Docked mode is non-modal by design — focus flows through the page. */
    if (modal && event.key === "Tab" && panelRef.current) {
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <>
      {modal && !isFull && (
        <div
          className={styles.scrim}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        ref={panelRef}
        id="site-chat-panel"
        className={`${styles.panel} ${isFull ? styles.panelFull : ""}`}
        role={modal ? "dialog" : "complementary"}
        aria-modal={modal || undefined}
        aria-label="Site chat"
        onKeyDown={handleKeyDown}
      >
        {/* compact tracks the host's width, not the view: a takeover on a
            phone still wants phone insets, where one on a desktop does not. */}
        <SiteChat
          fullscreenEnabled={!takeover}
          compact={takeover || !isFull}
          /* A phone viewport stacks the welcome screen (greeting centred in
             the thread, starters over a bottom-pinned composer), because the keyboard
             is about to take the lower half of it. */
          phone={takeover}
        />
      </div>
      {/* The widen grip — the bench's left handle, docked form only. It
          rides the panel's left edge as a fixed sibling (the panel clips its
          own overflow, so a straddling child would be cut in half). */}
      {docked && !isFull && (
        <div
          className={`${styles.dockHandle} ${resizing ? styles.dockHandleResizing : ""}`}
          aria-hidden="true"
          onPointerDown={beginResize}
          onPointerMove={moveResize}
          onPointerUp={endResize}
          onPointerCancel={endResize}
        />
      )}
    </>
  );
}

