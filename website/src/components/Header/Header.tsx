"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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

export default function Header({ navLinks, subnavLinks }: HeaderProps) {
  const [stickyVisible, setStickyVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

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
            <Image
              src="/rr.svg"
              alt="robr0"
              width={24}
              height={24}
              className={styles.navLogoIcon}
            />
            <span className={styles.navLogoText}>robr0</span>
          </Link>
          <div className={styles.navRight}>
            <div className={styles.navMenu}>
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.disabled ? "#" : link.href}
                  className={`${styles.navLink} ${link.active ? styles.active : ""} ${link.disabled ? styles.disabled : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <ThemeToggle className={styles.desktopThemeToggle} />
          </div>
        </div>
      </header>

      {/* Main Nav (in-flow) */}
      <nav ref={navRef} className={styles.nav}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.navLogo}>
            <Image
              src="/rr.svg"
              alt="robr0"
              width={24}
              height={24}
              className={styles.navLogoIcon}
            />
            <span className={styles.navLogoText}>robr0</span>
          </Link>
          <div className={styles.navRight}>
            <div className={styles.navMenu}>
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.disabled ? "#" : link.href}
                  className={`${styles.navLink} ${link.active ? styles.active : ""} ${link.disabled ? styles.disabled : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
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
          <span className="material-symbols-outlined">close</span>
        ) : (
          <span className="material-symbols-outlined">menu</span>
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
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.disabled ? "#" : link.href}
                className={`${styles.mobileMenuLink} ${link.active ? styles.active : ""} ${link.disabled ? styles.disabled : ""}`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            {subnavLinks && (
              <div className={styles.mobileSubnav}>
                {subnavLinks.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className={`${styles.mobileSubnavLink} ${link.active ? styles.active : ""}`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <ThemeToggle className={styles.mobileThemeToggle} />
        </div>
      </div>
    </>
  );
}
