"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import styles from "./MegaNav.module.css";

interface DsItem {
  href: string;
  label: string;
  description: string;
  icon: string;
}

interface MegaNavProps {
  /** Called when the mega menu opens/closes — lets the parent dim/blur page content */
  onOpenChange?: (open: boolean) => void;
}

const dsItems: DsItem[] = [
  {
    href: "/about",
    label: "About",
    description: "What the design system is and how it works",
    icon: "info",
  },
  {
    href: "/blueprints",
    label: "Blueprints",
    description: "Markdown spec files that define the system",
    icon: "description",
  },
  {
    href: "/skills",
    label: "Skills",
    description: "Reusable AI instructions for Claude Code",
    icon: "auto_awesome",
  },
  {
    href: "/foundations",
    label: "Foundations",
    description: "Colours, type, spacing, icons, and logos",
    icon: "category",
  },
  {
    href: "/components",
    label: "Components",
    description: "42 React components with full Storybook docs",
    icon: "widgets",
  },
];

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

export default function MegaNav({ onOpenChange }: MegaNavProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Notify parent when open state changes
  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        triggerRef.current?.contains(t) ||
        menuRef.current?.contains(t)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

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
            <Link href="/about/me" className={styles.navLink}>About</Link>
            <Link href="/work" className={styles.navLink}>Work</Link>

            <div
              className={styles.dsWrap}
              onMouseEnter={openMenu}
              onMouseLeave={scheduleClose}
            >
              <button
                ref={triggerRef}
                type="button"
                className={`${styles.navLink} ${styles.dsTrigger} ${open ? styles.dsTriggerOpen : ""}`}
                aria-expanded={open}
                aria-haspopup="true"
                aria-controls="ds-mega"
                onClick={() => setOpen((v) => !v)}
              >
                <span>Design system</span>
                <span
                  className={`material-symbols-rounded ${styles.caret} ${open ? styles.caretOpen : ""}`}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </button>
            </div>

            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </nav>
        </div>

        <div className={styles.rightSlot}>
          <ThemeToggle />
        </div>
      </div>

      {/* MEGA MENU */}
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
            {dsItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.megaItem}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
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
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
