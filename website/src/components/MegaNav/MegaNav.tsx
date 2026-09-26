"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { usePathname } from "next/navigation";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
import { type NavListItem } from "rift-ds/components/NavList/NavList";
import {
  workSidebarLinks,
  type NavLink,
} from "@/config/navigation";
import { useWritingNav } from "./WritingNavContext";
import HeaderBar from "./HeaderBar";
import MobileDrawer from "./MobileDrawer";
import styles from "./MegaNav.module.css";

/** Strip sidebar-only fields down to NavList's {label, href} shape. */
const toNavItems = (links: NavLink[]): NavListItem[] =>
  links.map(({ label, href }) => ({ label, href }));

/** The drawer section (if any) whose sub-list contains the given path. */
const sectionForPath = (path: string): string | null => {
  if (path.startsWith("/work")) return "work";
  if (path.startsWith("/writing")) return "writing";
  if (path.startsWith("/docs")) return "docs";
  if (path.startsWith("/foundations")) return "foundations";
  if (path.startsWith("/components")) return "components";
  return null;
};

/**
 * The site header: the in-flow bar, its sticky twin,
 * panel, and the mobile drawer. This component owns all the state and window
 * wiring; the pieces themselves are HeaderBar (one bar, rendered twice),
 * MegaPanel inside it, SiteLogo, and MobileDrawer.
 */
export default function MegaNav() {
  const pathname = usePathname() ?? "/";
  const writingNavItems = useWritingNav();
  const [mobileOpen, setMobileOpen] = useState(false);
  // Drawer accordions are closed by default; one open at a time.
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isStuck, setIsStuck] = useState(false);
  // The drawer's geometry is frozen at open: the close button pins to where
  // the tapped menu button actually was, and the stuck layout is whatever
  // the header was at that moment. isStuck keeps moving underneath (iOS
  // fires scroll events when the body lock clamps scrollY and when the URL
  // bar resizes), and a live binding made the X jump mid-open.
  const [closeTop, setCloseTop] = useState<number | null>(null);
  const [drawerStuck, setDrawerStuck] = useState(false);
  const inFlowHeaderRef = useRef<HTMLElement>(null);

  const isWorkActive = pathname === "/work" || pathname.startsWith("/work/");
  const isWritingActive = pathname === "/writing" || pathname.startsWith("/writing/");

  // The drawer's whole tree, fed to NavList — the same per-section links the
  // desktop sidebar shows, which is otherwise hidden below 960px. Work and
  // Writing stay current on their child routes via the prefix matchers.
  const drawerItems: NavListItem[] = [
    // No Home row: the logo above the list is the link home, as it is in the
    // header the drawer covers.
    { label: "About", href: "/about" },
    {
      label: "Work",
      href: "/work",
      id: "work",
      current: isWorkActive || undefined,
      items: toNavItems(workSidebarLinks.slice(1)),
    },
    {
      label: "Writing",
      href: "/writing",
      id: "writing",
      current: isWritingActive || undefined,
      // Article links from the Substack feed via the root layout (see
      // WritingNavContext). Empty when the feed is unreachable — the row
      // then renders as a plain link, matching its old behaviour.
      items: writingNavItems,
    },
    // A plain link now. The drawer used to nest the whole documentation IA
    // under this row; those pages live at rift-ds.com, and what remains here
    // is the single page about having built it.
    { label: "Design system", href: "/design-system" },
    { label: "Contact", href: "/contact" },
  ];

  // Opening the drawer pre-expands the section holding the current page.
  const toggleMobileMenu = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const next = !mobileOpen;
    if (next) {
      setExpandedSection(sectionForPath(pathname));
      // The X replaces the button that was tapped, wherever the scroll has
      // put it — the two static CSS positions only cover a page at rest and
      // a fully stuck header, and between them the hamburger sits anywhere.
      setCloseTop(e.currentTarget.getBoundingClientRect().top);
      setDrawerStuck(isStuck);
    }
    setMobileOpen(next);
  };

  // Close on Escape. Only the mobile drawer is dismissible now: the nav's
  // "Design system" mega panel went with the documentation it indexed.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Close the drawer when pathname changes (user navigated via a link).
  // The setState here is intentional — we react to external navigation,
  // which is exactly what Effects are for.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // Lock body scroll while mobile menu is open. The counted lock is shared
  // with the chat panel: whichever overlay closes first must not unlock the
  // page while the other still covers it.
  //
  // The same effect flags the open drawer on <html>, which is how the chat's
  // FAB knows to get out of the way — it floats above the scrim, and a launch
  // button for a panel you cannot see is just clutter over the menu. An
  // attribute rather than shared state: the two mount from the root layout
  // and never meet, and the site already drives the header's docked inset
  // this way.
  useEffect(() => {
    if (mobileOpen) {
      lockBodyScroll("mega-nav");
      document.documentElement.setAttribute("data-nav-drawer", "open");
    } else {
      unlockBodyScroll("mega-nav");
      document.documentElement.removeAttribute("data-nav-drawer");
    }
    return () => {
      unlockBodyScroll("mega-nav");
      document.documentElement.removeAttribute("data-nav-drawer");
    };
  }, [mobileOpen]);

  return (
    <header ref={inFlowHeaderRef} className={styles.header}>
      <HeaderBar
        pathname={pathname}
        tabbable
        mobileOpen={mobileOpen}
        onMobileToggle={toggleMobileMenu}
      />

      {/* STICKY OVERLAY HEADER — slides in when the in-flow header scrolls out of view */}
      <div
        className={`${styles.stickyHeader} ${isStuck ? styles.stickyHeaderVisible : ""}`}
        aria-hidden={!isStuck}
      >
        {/* Tint + progressive blur behind the bar — see .stickyBackdrop */}
        <div className={styles.stickyBackdrop} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <HeaderBar
          sticky
          pathname={pathname}
          tabbable={isStuck}
          mobileOpen={mobileOpen}
          onMobileToggle={toggleMobileMenu}
        />
      </div>

      <MobileDrawer
        open={mobileOpen}
        stuck={drawerStuck}
        closeTop={closeTop}
        pathname={pathname}
        items={drawerItems}
        expandedSection={expandedSection}
        onExpandedChange={setExpandedSection}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
