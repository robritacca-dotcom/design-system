"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SiteHeader,
  type SiteHeaderSection,
} from "rift-ds/components/SiteHeader/SiteHeader";
import { workSidebarLinks } from "@/config/navigation";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import SiteLogo from "../MegaNav/SiteLogo";
import { SearchButton } from "../MegaNav/HeaderBar";
import { useWritingNav } from "../MegaNav/WritingNavContext";
import styles from "./SiteNav.module.css";

/**
 * The site header, as the library's SiteHeader: the logo, a pill per
 * top-level page, the palette's search button at every width, and the theme
 * toggle until the bar folds to its drawer, where it moves to the footer.
 *
 * No section has a mega menu. Work and Writing carry drawer-only sub-lists
 * (the case studies, and the Substack articles the root layout provides),
 * the same per-section links the desktop sidebar shows, which is otherwise
 * hidden at the widths the drawer serves.
 */
export default function SiteNav() {
  const pathname = usePathname() ?? "/";
  const writingNavItems = useWritingNav();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sections: SiteHeaderSection[] = [
    { id: "about", label: "About", href: "/about" },
    {
      id: "work",
      label: "Work",
      href: "/work",
      drawerItems: workSidebarLinks
        .slice(1)
        .map(({ label, href }) => ({ label, href })),
    },
    { id: "writing", label: "Writing", href: "/writing", drawerItems: writingNavItems },
    { id: "design-system", label: "Design system", href: "/design-system" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  // Close the drawer when the route changes by any other means than one of
  // its own links (browser back, the palette). The setState is intentional:
  // it reacts to external navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrawerOpen(false);
  }, [pathname]);

  // Flags the open drawer on <html> so the chat FAB stands down (globals.css).
  // The scroll lock is the library Drawer's own, on the counter the site's
  // scroll-lock module shares.
  useEffect(() => {
    if (drawerOpen) {
      document.documentElement.setAttribute("data-nav-drawer", "open");
    } else {
      document.documentElement.removeAttribute("data-nav-drawer");
    }
    return () => document.documentElement.removeAttribute("data-nav-drawer");
  }, [drawerOpen]);

  return (
    <SiteHeader
      className={styles.header}
      brand={<SiteLogo />}
      sections={sections}
      currentHref={pathname}
      linkComponent={Link}
      actions={<SearchButton />}
      wideActions={<ThemeToggle />}
      drawerFooter={<ThemeToggle />}
      drawerOpen={drawerOpen}
      onDrawerOpenChange={setDrawerOpen}
    />
  );
}
