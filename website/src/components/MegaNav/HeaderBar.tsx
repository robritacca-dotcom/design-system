"use client";

import Link from "next/link";
import type { MouseEvent as ReactMouseEvent } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { openSitePalette } from "../SitePalette/palette-bus";
import { Kbd } from "@robr0/design-system/components/Kbd/Kbd";
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
      aria-label="Search or ask anything"
      aria-keyshortcuts="Meta+K"
      tabIndex={tabIndex}
    >
      <span className="material-symbols-rounded" aria-hidden="true">
        search
      </span>
      <span className={styles.searchLabel} aria-hidden="true">
        Search or ask anything
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
  /**
   * False while this bar is hidden behind the other one: its links leave the
   * tab order, so the visible bar's twin never catches focus or clicks.
   */
  tabbable: boolean;
  /** The sticky overlay bar — distinct nav landmark label. */
  sticky?: boolean;
  mobileOpen: boolean;
  onMobileToggle: (e: ReactMouseEvent<HTMLButtonElement>) => void;
}

/**
 * One header bar — logo, primary nav, search, theme toggle and hamburger.
 * Rendered twice by MegaNav: once in flow and once inside the sticky overlay,
 * differing only in the props above.
 *
 * The nav used to carry a "Design system" mega panel over the documentation
 * sections. Those pages now live at rift-ds.com, so the trigger is an ordinary
 * link to /design-system, the page about having built it.
 */
export default function HeaderBar({
  pathname,
  tabbable,
  sticky = false,
  mobileOpen,
  onMobileToggle,
}: HeaderBarProps) {
  const linkTab = tabbable ? undefined : -1;

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

          <HeaderNavLink
            href="/design-system"
            label="Design system"
            exact
            pathname={pathname}
            tabIndex={linkTab}
          />

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

    </div>
  );
}
