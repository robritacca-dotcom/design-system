"use client";

import Link from "next/link";
import type { MouseEvent as ReactMouseEvent, RefObject } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { openSitePalette } from "../SitePalette/palette-bus";
import { Kbd } from "@robr0/design-system/components/Kbd/Kbd";
import { isDesignSystemPath } from "@/config/navigation";
import MegaPanel from "./MegaPanel";
import SiteLogo from "./SiteLogo";
import styles from "./MegaNav.module.css";

/** One flat pill in the primary nav, current-marked by exact or prefix match. */
function HeaderNavLink({
  href,
  label,
  pathname,
  exact = false,
  tabIndex,
}: {
  href: string;
  label: string;
  pathname: string;
  /** Match only the page itself (About, Contact) rather than its subtree. */
  exact?: boolean;
  tabIndex?: number;
}) {
  const active = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
      tabIndex={tabIndex}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

/** The input-dressed button that opens the global command palette. */
function SearchButton({ tabIndex }: { tabIndex?: number }) {
  return (
    // Opens the global palette mounted from the root layout — the two trees
    // never meet, so the click travels via palette-bus.
    <button
      type="button"
      className={styles.searchBtn}
      onClick={openSitePalette}
      aria-label="Search the site"
      aria-keyshortcuts="Meta+K"
      tabIndex={tabIndex}
    >
      <span className="material-symbols-rounded" aria-hidden="true">
        search
      </span>
      <span className={styles.searchLabel} aria-hidden="true">
        Search
      </span>
      <span className={styles.searchKeys} aria-hidden="true">
        <Kbd size="compact">⌘</Kbd>
        <Kbd size="compact">K</Kbd>
      </span>
    </button>
  );
}

export interface HeaderBarProps {
  pathname: string;
  /** Whether the mega panel is open — one shared state across both bars. */
  open: boolean;
  /**
   * False while this bar is hidden behind the other one: its links leave the
   * tab order and its mega panel ignores the pointer, so the visible bar's
   * twin never catches focus or clicks.
   */
  tabbable: boolean;
  /** The sticky overlay bar — distinct panel id and nav landmark label. */
  sticky?: boolean;
  mobileOpen: boolean;
  triggerRef: RefObject<HTMLAnchorElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
  onMegaEnter: () => void;
  onMegaLeave: () => void;
  /** A click on the trigger navigates, so the panel closes underneath it. */
  onMegaClose: () => void;
  onMobileToggle: (e: ReactMouseEvent<HTMLButtonElement>) => void;
}

/**
 * One header bar — logo, primary nav with the mega trigger, search, theme
 * toggle, hamburger, and the anchored mega panel. Rendered twice by MegaNav:
 * once in flow and once inside the sticky overlay, differing only in the
 * props above.
 */
export default function HeaderBar({
  pathname,
  open,
  tabbable,
  sticky = false,
  mobileOpen,
  triggerRef,
  menuRef,
  onMegaEnter,
  onMegaLeave,
  onMegaClose,
  onMobileToggle,
}: HeaderBarProps) {
  const megaId = sticky ? "ds-mega-sticky" : "ds-mega";
  const linkTab = tabbable ? undefined : -1;
  const isDsActive = isDesignSystemPath(pathname);

  return (
    <div className={styles.headerInner}>
      <div className={styles.logoSlot}>
        <SiteLogo tabIndex={linkTab} />
      </div>

      <div className={styles.navCenter}>
        <nav className={styles.nav} aria-label={sticky ? "Primary (sticky)" : "Primary"}>
          <HeaderNavLink href="/about" label="About" exact pathname={pathname} tabIndex={linkTab} />
          <HeaderNavLink href="/work" label="Work" pathname={pathname} tabIndex={linkTab} />
          <HeaderNavLink href="/writing" label="Writing" pathname={pathname} tabIndex={linkTab} />

          <div
            className={styles.dsWrap}
            onMouseEnter={onMegaEnter}
            onMouseLeave={onMegaLeave}
          >
            {/* The trigger is a link: hover or focus opens the mega panel,
                a click lands on the /design-system landing page. */}
            <Link
              ref={triggerRef}
              href="/design-system"
              className={`${styles.navLink} ${styles.dsTrigger} ${
                open ? styles.navLinkOpen : ""
              } ${isDsActive ? styles.navLinkActive : ""}`}
              aria-expanded={open}
              aria-haspopup="true"
              aria-controls={megaId}
              onFocus={onMegaEnter}
              onClick={onMegaClose}
              tabIndex={linkTab}
            >
              <span>Design system</span>
              <span
                className={`${styles.caret} ${open ? styles.caretOpen : ""} material-symbols-rounded`}
                aria-hidden="true"
              >
                expand_more
              </span>
            </Link>
          </div>

          <HeaderNavLink href="/contact" label="Contact" exact pathname={pathname} tabIndex={linkTab} />
        </nav>
      </div>

      <div className={styles.rightSlot}>
        <SearchButton tabIndex={linkTab} />
        <ThemeToggle className={styles.desktopThemeToggle} />
        <button
          type="button"
          className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.mobileMenuBtnHidden : ""}`}
          onClick={onMobileToggle}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          tabIndex={linkTab}
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            menu
          </span>
        </button>
      </div>

      {/* MEGA MENU — Design system dropdown. Inside headerInner so the panel
          anchors to the content box, not the header: the sticky bar is full
          viewport width and carries its gutters as padding, which absolute
          positioning ignores (see .headerInner in the CSS). */}
      <div
        ref={menuRef}
        id={megaId}
        className={`${styles.mega} ${open ? styles.megaOpen : ""}`}
        style={!tabbable ? { pointerEvents: "none" } : undefined}
        onMouseEnter={onMegaEnter}
        onMouseLeave={onMegaLeave}
        aria-hidden={!open}
      >
        <MegaPanel pathname={pathname} tabbable={open && tabbable} />
      </div>
    </div>
  );
}
