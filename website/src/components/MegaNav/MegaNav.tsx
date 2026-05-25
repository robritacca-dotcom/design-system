"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { dsMegaItems, isDesignSystemPath, workMegaItems, type MegaItem } from "@/config/navigation";
import styles from "./MegaNav.module.css";

type MenuKey = "ds" | "work" | null;

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

/** Renders a mega-menu item's leading visual — either a Material Symbol or a company logo */
function MegaItemMedia({ item }: { item: MegaItem }) {
  if (item.logo) {
    return (
      <div className={styles.megaIcon}>
        <Image
          src={item.logo}
          alt=""
          width={24}
          height={24}
          className={styles.megaLogo}
        />
      </div>
    );
  }
  return (
    <div className={styles.megaIcon}>
      <span className="material-symbols-rounded" aria-hidden="true">
        {item.icon}
      </span>
    </div>
  );
}

export default function MegaNav() {
  const pathname = usePathname() ?? "/";
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dsTriggerRef = useRef<HTMLButtonElement>(null);
  const workTriggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isDsActive = isDesignSystemPath(pathname);
  const isAboutActive = pathname === "/about/me";
  const isWorkActive = pathname === "/work" || pathname.startsWith("/work/");
  const isContactActive = pathname === "/contact";

  const openMenuFor = useCallback((key: Exclude<MenuKey, null>) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        dsTriggerRef.current?.contains(t) ||
        workTriggerRef.current?.contains(t) ||
        menuRef.current?.contains(t)
      ) {
        return;
      }
      setOpenMenu(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [openMenu]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openMenu) {
          const triggerToFocus = openMenu === "work" ? workTriggerRef.current : dsTriggerRef.current;
          setOpenMenu(null);
          triggerToFocus?.focus();
        }
        if (mobileOpen) setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu, mobileOpen]);

  // Close mega when pathname changes (user navigated via a link).
  // The setState here is intentional — we react to external navigation,
  // which is exactly what Effects are for.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

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

  const activeItems = openMenu === "work" ? workMegaItems : dsMegaItems;

  return (
    <header className={styles.header}>
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
              href="/about/me"
              className={`${styles.navLink} ${isAboutActive ? styles.navLinkActive : ""}`}
            >
              About
            </Link>

            <div
              className={styles.dsWrap}
              onMouseEnter={() => openMenuFor("work")}
              onMouseLeave={scheduleClose}
            >
              <button
                ref={workTriggerRef}
                type="button"
                className={`${styles.navLink} ${styles.dsTrigger} ${
                  openMenu === "work" || isWorkActive ? styles.navLinkActive : ""
                }`}
                aria-expanded={openMenu === "work"}
                aria-haspopup="true"
                aria-controls="site-mega"
                onClick={() => setOpenMenu((v) => (v === "work" ? null : "work"))}
              >
                <span>Work</span>
                <span
                  className={`material-symbols-rounded ${styles.caret} ${openMenu === "work" ? styles.caretOpen : ""}`}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </button>
            </div>

            <div
              className={styles.dsWrap}
              onMouseEnter={() => openMenuFor("ds")}
              onMouseLeave={scheduleClose}
            >
              <button
                ref={dsTriggerRef}
                type="button"
                className={`${styles.navLink} ${styles.dsTrigger} ${
                  openMenu === "ds" || isDsActive ? styles.navLinkActive : ""
                }`}
                aria-expanded={openMenu === "ds"}
                aria-haspopup="true"
                aria-controls="site-mega"
                onClick={() => setOpenMenu((v) => (v === "ds" ? null : "ds"))}
              >
                <span>Design system</span>
                <span
                  className={`material-symbols-rounded ${styles.caret} ${openMenu === "ds" ? styles.caretOpen : ""}`}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </button>
            </div>

            <Link
              href="/contact"
              className={`${styles.navLink} ${isContactActive ? styles.navLinkActive : ""}`}
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className={styles.rightSlot}>
          <ThemeToggle className={styles.desktopThemeToggle} />
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* MEGA MENU — shared panel, swaps content based on which trigger is open */}
      <div
        ref={menuRef}
        id="site-mega"
        className={`${styles.mega} ${openMenu ? styles.megaOpen : ""}`}
        onMouseEnter={() => openMenu && openMenuFor(openMenu)}
        onMouseLeave={scheduleClose}
        aria-hidden={!openMenu}
      >
        <div className={styles.megaInner}>
          <div className={styles.megaGrid}>
            {activeItems.map((item) => {
              const itemActive =
                pathname === item.href ||
                (item.href !== "/about" && pathname.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.megaItem} ${itemActive ? styles.megaItemActive : ""}`}
                  tabIndex={openMenu ? 0 : -1}
                >
                  <MegaItemMedia item={item} />
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

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`${styles.mobileMenuOverlay} ${mobileOpen ? styles.mobileMenuOverlayOpen : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileOpen(false);
        }}
        aria-hidden={!mobileOpen}
      >
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          <Link
            href="/about/me"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <div className={styles.mobileSection}>
            <div className={styles.mobileSectionLabel}>Work</div>
            {workMegaItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileLink} ${styles.mobileLinkNested}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className={styles.mobileSection}>
            <div className={styles.mobileSectionLabel}>Design system</div>
            {dsMegaItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileLink} ${styles.mobileLinkNested}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
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
