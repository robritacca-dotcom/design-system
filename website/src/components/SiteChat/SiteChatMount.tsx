"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AiButton } from "@robr0/design-system/components/AiButton/AiButton";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
import { useSiteChat } from "./ChatContext";
import { SiteChat } from "./SiteChat";
import styles from "./SiteChat.module.css";

/* Routes where the panel never renders: the bench hosts its own copy of the
   widget (two live widgets would double-bill and confuse QA), and the
   animated-logo page is a full-viewport piece with no room for chrome. */
const DENIED_ROUTES = new Set(["/robr0-gpt", "/rr-animated"]);

/* Above this the panel docks and the page slides over (the body inset in
   globals.css); below it the panel overlays behind a scrim. Chosen so the
   pages that already run sidebar + content + right rail keep a readable
   main column — see the build plan's geometry notes. */
const DOCK_QUERY = "(min-width: 1440px)";

const subscribeDock = (onChange: () => void) => {
  const media = window.matchMedia(DOCK_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const readDocked = () => window.matchMedia(DOCK_QUERY).matches;

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

  const denied = DENIED_ROUTES.has(pathname);
  const isFull = view === "full";
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
        <SiteChat fullscreenEnabled compact={!isFull} />
      </div>
    </>
  );
}

