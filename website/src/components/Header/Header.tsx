"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { ButtonGroup } from "@design-system/components/ButtonGroup/ButtonGroup";
import type { ButtonProps } from "@design-system/components/Button/Button";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.css";

interface NavLink {
  href: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
}

interface SubnavLink {
  href: string;
  label: string;
  active?: boolean;
}

interface HeaderProps {
  navLinks: NavLink[];
  subnavLinks?: SubnavLink[];
}

function toButtonProps(links: NavLink[]): ButtonProps[] {
  return links.map((link) => ({
    label: link.label,
    href: link.disabled ? undefined : link.href,
    state: link.disabled
      ? ("disabled" as const)
      : link.active
        ? ("active" as const)
        : ("default" as const),
    priority: "secondary" as const,
  }));
}

function toSubnavButtonProps(links: SubnavLink[]): ButtonProps[] {
  return links.map((link) => ({
    label: link.label,
    href: link.href,
    state: link.active ? ("active" as const) : ("default" as const),
    priority: "secondary" as const,
  }));
}

export default function Header({ navLinks, subnavLinks }: HeaderProps) {
  const [stickyVisible, setStickyVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navButtonProps = useMemo(() => toButtonProps(navLinks), [navLinks]);

  useEffect(() => {
    let ticking = false;
    const checkSticky = () => {
      if (!navRef.current) return;
      const navBottom = navRef.current.getBoundingClientRect().bottom;
      setStickyVisible(navBottom < 0);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkSticky);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
    document.body.classList.add("mobile-menu-open");
    document.body.style.overflow = "hidden";
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    document.body.classList.remove("mobile-menu-open");
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) closeMobileMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <>
      {/* Sticky Header */}
      <header
        className={`${styles.stickyHeader} ${stickyVisible ? styles.stickyHeaderVisible : ""}`}
      >
        <div className={styles.navContainer}>
          <Link href="/" className={styles.navLogo}>
            <img
              src="/rr.svg"
              alt="robr0"
              width={24}
              height={24}
              className={styles.navLogoIcon}
            />
            <span className={styles.navLogoText}>robr0 DS</span>
          </Link>
          <div className={styles.navCenter}>
            <ButtonGroup
              orientation="horizontal"
              buttons={navButtonProps}
              className={styles.navMenu}
            />
          </div>
          <div className={styles.navRight}>
            <ThemeToggle className={styles.desktopThemeToggle} />
          </div>
        </div>
      </header>

      {/* Main Nav (in-flow) */}
      <nav ref={navRef} className={styles.nav}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.navLogo}>
            <img
              src="/rr.svg"
              alt="robr0"
              width={24}
              height={24}
              className={styles.navLogoIcon}
            />
            <span className={styles.navLogoText}>robr0 DS</span>
          </Link>
          <div className={styles.navCenter}>
            <ButtonGroup
              orientation="horizontal"
              buttons={navButtonProps}
              className={styles.navMenu}
            />
          </div>
          <div className={styles.navRight}>
            <ThemeToggle className={styles.desktopThemeToggle} />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className={`${styles.mobileMenuBtn} ${mobileMenuOpen ? styles.mobileMenuBtnOpen : ""}`}
        onClick={mobileMenuOpen ? closeMobileMenu : openMobileMenu}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <span className="material-symbols-rounded">close</span>
        ) : (
          <span className="material-symbols-rounded">menu</span>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileMenuOverlay} ${mobileMenuOpen ? styles.open : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMobileMenu();
        }}
      >
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuLinks}>
            <ButtonGroup
              orientation="vertical"
              buttons={navButtonProps}
            />
            {subnavLinks && (
              <div className={styles.mobileSubnav}>
                <ButtonGroup
                  orientation="vertical"
                  buttons={toSubnavButtonProps(subnavLinks)}
                />
              </div>
            )}
          </div>
          <ThemeToggle className={styles.mobileThemeToggle} />
        </div>
      </div>
    </>
  );
}
