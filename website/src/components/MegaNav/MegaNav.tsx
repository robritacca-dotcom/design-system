"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import {
  componentsSidebarLinks,
  docsSidebarLinks,
  dsMegaItems,
  foundationsSidebarLinks,
  isDesignSystemPath,
  workSidebarLinks,
  type NavLink,
} from "@/config/navigation";
import styles from "./MegaNav.module.css";

/** Inline SVG logo — matches the production Header */
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.0309 14.98C18.6612 14.8653 19.2184 14.6623 19.7208 14.3712C20.214 14.08 20.6343 13.7358 20.9814 13.3211C21.3285 12.9063 21.5934 12.4387 21.776 11.9269C21.9587 11.4062 22.05 10.8592 22.05 10.2856C22.05 9.22672 21.8034 8.35314 21.3011 7.67368C20.8078 6.99423 20.1775 6.45596 19.4103 6.05889C18.6429 5.6618 17.7935 5.37943 16.8618 5.22942C15.9301 5.07059 15.0258 5 14.158 5L0 5C0 5 1.7355 8.8561 6.49444 8.8561C11.2534 8.8561 14.5417 8.8561 14.5417 8.8561C15.3638 8.8561 16.0123 8.99729 16.4691 9.28849C16.9257 9.57968 17.1541 10.0121 17.1541 10.5856C17.1541 11.1062 16.8983 11.5122 16.3959 11.8033C15.8936 12.1033 15.2725 12.2445 14.5417 12.2445C14.5417 12.2445 7.84631 12.2445 4.28395 12.2445C0.876885 12.2445 1.18745 15.5535 1.18745 15.5535L1.18745 19.8244C1.18745 19.8244 5.93725 19.8068 5.93725 15.9065H13.2263C16.9714 21.2627 23 19.8244 23 19.8244L18.0309 14.98Z"
        fill="url(#mn-grad)"
      />
      <defs>
        <linearGradient id="mn-grad" x1="3.8" y1="15.9" x2="13.5" y2="5.8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2980B9" />
          <stop offset="0.55" stopColor="#2980B9" />
          <stop offset="1" stopColor="#34495E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * One expandable section in the mobile drawer: the label stays a real link
 * (tap navigates), a separate chevron button toggles the sub-list — the same
 * per-section links the desktop sidebar shows, which is otherwise hidden
 * below 960px.
 */
function MobileDrawerSection({
  id,
  label,
  href,
  links,
  nested,
  expanded,
  pathname,
  onToggle,
  onNavigate,
}: {
  id: string;
  label: string;
  href: string;
  links: NavLink[];
  nested?: boolean;
  expanded: boolean;
  pathname: string;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className={styles.mobileNavGroup}>
      <div className={styles.mobileNavRow}>
        <Link
          href={href}
          className={`${styles.mobileLink} ${nested ? styles.mobileLinkNested : ""}`}
          onClick={onNavigate}
          aria-current={pathname === href ? "page" : undefined}
        >
          {label}
        </Link>
        <button
          type="button"
          className={styles.mobileChevronBtn}
          aria-expanded={expanded}
          aria-controls={id}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${label} pages`}
          onClick={onToggle}
        >
          <svg
            className={`${styles.caret} ${expanded ? styles.caretOpen : ""}`}
            width="8" height="5" viewBox="0 0 8 5"
            aria-hidden="true" fill="none"
          >
            <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div id={id} className={styles.mobileSubList} hidden={!expanded}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.mobileLink} ${nested ? styles.mobileLinkNested2 : styles.mobileLinkNested}`}
            onClick={onNavigate}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function MegaNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Drawer accordions are closed by default; one open at a time.
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isStuck, setIsStuck] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const stickyTriggerRef = useRef<HTMLAnchorElement>(null);
  const stickyMenuRef = useRef<HTMLDivElement>(null);
  const inFlowHeaderRef = useRef<HTMLElement>(null);

  const isDsActive = isDesignSystemPath(pathname);
  const isAboutActive = pathname === "/about";
  const isWorkActive = pathname === "/work" || pathname.startsWith("/work/");
  const isWritingActive = pathname === "/writing" || pathname.startsWith("/writing/");
  const isContactActive = pathname === "/contact";

  const openMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        triggerRef.current?.contains(t) || menuRef.current?.contains(t) ||
        stickyTriggerRef.current?.contains(t) || stickyMenuRef.current?.contains(t)
      ) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (open) {
          setOpen(false);
          triggerRef.current?.focus();
        }
        if (mobileOpen) setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, mobileOpen]);

  // Close mega when pathname changes (user navigated via a link).
  // The setState here is intentional — we react to external navigation,
  // which is exactly what Effects are for.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
    setMobileOpen(false);
    setExpandedSection(null);
  }, [pathname]);

  // Toggle the sticky overlay header when the in-flow header scrolls out of view
  useEffect(() => {
    let ticking = false;
    const check = () => {
      const el = inFlowHeaderRef.current;
      if (el) {
        setIsStuck(el.getBoundingClientRect().bottom < 0);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(check);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header ref={inFlowHeaderRef} className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logoSlot}>
          <Link href="/" className={styles.logo}>
            <LogoIcon className={styles.logoMark} />
            <span className={styles.logoText}>Robert Ritacca</span>
          </Link>
        </div>

        <div className={styles.navCenter}>
          <nav className={styles.nav} aria-label="Primary">
            <Link
              href="/about"
              className={`${styles.navLink} ${isAboutActive ? styles.navLinkActive : ""}`}
              aria-current={isAboutActive ? "page" : undefined}
            >
              About
            </Link>
            <Link
              href="/work"
              className={`${styles.navLink} ${isWorkActive ? styles.navLinkActive : ""}`}
              aria-current={isWorkActive ? "page" : undefined}
            >
              Work
            </Link>
            <Link
              href="/writing"
              className={`${styles.navLink} ${isWritingActive ? styles.navLinkActive : ""}`}
              aria-current={isWritingActive ? "page" : undefined}
            >
              Writing
            </Link>

            <div
              className={styles.dsWrap}
              onMouseEnter={openMenu}
              onMouseLeave={scheduleClose}
            >
              {/* The trigger is a link: hover or focus opens the mega panel,
                  a click lands on the /design-system landing page. */}
              <Link
                ref={triggerRef}
                href="/design-system"
                className={`${styles.navLink} ${styles.dsTrigger} ${
                  open || isDsActive ? styles.navLinkActive : ""
                }`}
                aria-expanded={open}
                aria-haspopup="true"
                aria-controls="ds-mega"
                onFocus={openMenu}
                onClick={() => setOpen(false)}
              >
                <span>Design system</span>
                <svg
                  className={`${styles.caret} ${open ? styles.caretOpen : ""}`}
                  width="8" height="5" viewBox="0 0 8 5"
                  aria-hidden="true" fill="none"
                >
                  <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            <Link
              href="/contact"
              className={`${styles.navLink} ${isContactActive ? styles.navLinkActive : ""}`}
              aria-current={isContactActive ? "page" : undefined}
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className={styles.rightSlot}>
          <ThemeToggle className={styles.desktopThemeToggle} />
          <button
            type="button"
            className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.mobileMenuBtnHidden : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              menu
            </span>
          </button>
        </div>
      </div>

      {/* MEGA MENU — Design system dropdown */}
      <div
        ref={menuRef}
        id="ds-mega"
        className={`${styles.mega} ${open ? styles.megaOpen : ""}`}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        aria-hidden={!open}
      >
        <div className={styles.megaInner}>
          <div className={styles.megaGrid}>
            {dsMegaItems.map((item) => {
              const itemActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.megaItem} ${itemActive ? styles.megaItemActive : ""}`}
                  tabIndex={open ? 0 : -1}
                  aria-current={itemActive ? "page" : undefined}
                >
                  <div className={styles.megaIcon}>
                    <span className="material-symbols-rounded" aria-hidden="true">
                      {item.icon}
                    </span>
                  </div>
                  <div className={styles.megaItemText}>
                    <div className={styles.megaLabel}>{item.label}</div>
                    <div className={styles.megaDescription}>{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* STICKY OVERLAY HEADER — slides in when the in-flow header scrolls out of view */}
      <div
        className={`${styles.stickyHeader} ${isStuck ? styles.stickyHeaderVisible : ""}`}
        aria-hidden={!isStuck}
      >
        <div className={styles.headerInner}>
          <div className={styles.logoSlot}>
            <Link href="/" className={styles.logo} tabIndex={isStuck ? 0 : -1}>
              <LogoIcon className={styles.logoMark} />
              <span className={styles.logoText}>Robert Ritacca</span>
            </Link>
          </div>

          <div className={styles.navCenter}>
            <nav className={styles.nav} aria-label="Primary (sticky)">
              <Link
                href="/about"
                className={`${styles.navLink} ${isAboutActive ? styles.navLinkActive : ""}`}
                tabIndex={isStuck ? 0 : -1}
                aria-current={isAboutActive ? "page" : undefined}
              >
                About
              </Link>
              <Link
                href="/work"
                className={`${styles.navLink} ${isWorkActive ? styles.navLinkActive : ""}`}
                tabIndex={isStuck ? 0 : -1}
                aria-current={isWorkActive ? "page" : undefined}
              >
                Work
              </Link>
              <Link
                href="/writing"
                className={`${styles.navLink} ${isWritingActive ? styles.navLinkActive : ""}`}
                tabIndex={isStuck ? 0 : -1}
                aria-current={isWritingActive ? "page" : undefined}
              >
                Writing
              </Link>
              <div
                className={styles.dsWrap}
                onMouseEnter={openMenu}
                onMouseLeave={scheduleClose}
              >
                <Link
                  ref={stickyTriggerRef}
                  href="/design-system"
                  className={`${styles.navLink} ${styles.dsTrigger} ${
                    open || isDsActive ? styles.navLinkActive : ""
                  }`}
                  aria-expanded={open}
                  aria-haspopup="true"
                  aria-controls="ds-mega-sticky"
                  onFocus={openMenu}
                  onClick={() => setOpen(false)}
                  tabIndex={isStuck ? 0 : -1}
                >
                  <span>Design system</span>
                  <svg
                    className={`${styles.caret} ${open ? styles.caretOpen : ""}`}
                    width="8" height="5" viewBox="0 0 8 5"
                    aria-hidden="true" fill="none"
                  >
                    <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
              <Link
                href="/contact"
                className={`${styles.navLink} ${isContactActive ? styles.navLinkActive : ""}`}
                tabIndex={isStuck ? 0 : -1}
                aria-current={isContactActive ? "page" : undefined}
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className={styles.rightSlot}>
            <ThemeToggle className={styles.desktopThemeToggle} />
            <button
              type="button"
              className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.mobileMenuBtnHidden : ""}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              tabIndex={isStuck ? 0 : -1}
            >
              <span className="material-symbols-rounded" aria-hidden="true">
                menu
              </span>
            </button>
          </div>
        </div>

        {/* Sticky mega menu — same content, positioned relative to sticky header */}
        <div
          ref={stickyMenuRef}
          id="ds-mega-sticky"
          className={`${styles.mega} ${open ? styles.megaOpen : ""}`}
          style={!isStuck ? { pointerEvents: "none" } : undefined}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          aria-hidden={!open}
        >
          <div className={styles.megaInner}>
            <div className={styles.megaGrid}>
              {dsMegaItems.map((item) => {
                const itemActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.megaItem} ${itemActive ? styles.megaItemActive : ""}`}
                    tabIndex={open && isStuck ? 0 : -1}
                    aria-current={itemActive ? "page" : undefined}
                  >
                    <div className={styles.megaIcon}>
                      <span className="material-symbols-rounded" aria-hidden="true">
                        {item.icon}
                      </span>
                    </div>
                    <div className={styles.megaItemText}>
                      <div className={styles.megaLabel}>{item.label}</div>
                      <div className={styles.megaDescription}>{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`${styles.mobileMenuOverlay} ${mobileOpen ? styles.mobileMenuOverlayOpen : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileOpen(false);
        }}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={`${styles.mobileMenuClose} ${isStuck ? styles.mobileMenuCloseStuck : ""}`}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            close
          </span>
        </button>
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          <Link
            href="/"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
            aria-current={isAboutActive ? "page" : undefined}
          >
            About
          </Link>
          <MobileDrawerSection
            id="drawer-work"
            label="Work"
            href="/work"
            links={workSidebarLinks.slice(1)}
            expanded={expandedSection === "work"}
            pathname={pathname}
            onToggle={() => setExpandedSection((v) => (v === "work" ? null : "work"))}
            onNavigate={() => setMobileOpen(false)}
          />
          <Link
            href="/writing"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
            aria-current={isWritingActive ? "page" : undefined}
          >
            Writing
          </Link>
          <div className={styles.mobileSection}>
            <Link
              href="/design-system"
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
              aria-current={pathname === "/design-system" ? "page" : undefined}
            >
              Design system
            </Link>
            <MobileDrawerSection
              id="drawer-docs"
              label="Docs"
              href="/docs"
              links={docsSidebarLinks.slice(1)}
              nested
              expanded={expandedSection === "docs"}
              pathname={pathname}
              onToggle={() => setExpandedSection((v) => (v === "docs" ? null : "docs"))}
              onNavigate={() => setMobileOpen(false)}
            />
            <MobileDrawerSection
              id="drawer-foundations"
              label="Foundations"
              href="/foundations"
              links={foundationsSidebarLinks.slice(1)}
              nested
              expanded={expandedSection === "foundations"}
              pathname={pathname}
              onToggle={() => setExpandedSection((v) => (v === "foundations" ? null : "foundations"))}
              onNavigate={() => setMobileOpen(false)}
            />
            <MobileDrawerSection
              id="drawer-components"
              label="Components"
              href="/components"
              links={componentsSidebarLinks.slice(1)}
              nested
              expanded={expandedSection === "components"}
              pathname={pathname}
              onToggle={() => setExpandedSection((v) => (v === "components" ? null : "components"))}
              onNavigate={() => setMobileOpen(false)}
            />
            <Link
              href="/playground"
              className={`${styles.mobileLink} ${styles.mobileLinkNested}`}
              onClick={() => setMobileOpen(false)}
              aria-current={pathname === "/playground" ? "page" : undefined}
            >
              Playground
            </Link>
          </div>
          <Link
            href="/contact"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
            aria-current={isContactActive ? "page" : undefined}
          >
            Contact
          </Link>
          <div className={styles.mobileThemeToggle}>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
