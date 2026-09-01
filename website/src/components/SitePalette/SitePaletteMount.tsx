"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CommandPalette } from "@robr0/design-system/components/CommandPalette/CommandPalette";
import type { CommandPaletteGroup } from "@robr0/design-system/components/CommandPalette/CommandPalette";
import { componentMetadata } from "@robr0/design-system/components/registry";
import {
  docsSidebarLinks,
  dsMegaItems,
  foundationsSidebarLinks,
} from "@/config/navigation";
import { caseStudies } from "@/data/case-studies";
import { CHROMELESS_ROUTES } from "@/config/chromeless";
import { useSiteChat } from "@/components/SiteChat/ChatContext";
import { SITE_PALETTE_OPEN_EVENT } from "./palette-bus";
import styles from "./SitePalette.module.css";

/* Mirrors the nav's 959px breakpoint: desktopOnly pages (the canvas) stay
   out of the mobile IA, so the palette hides their rows below it too. */
const DESKTOP_QUERY = "(min-width: 960px)";

const subscribeDesktop = (onChange: () => void) => {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const readDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;

/* Same attribute dance as ThemeToggle's handleChange — the MutationObserver
   every toggle instance holds picks the change up, so the header control
   stays in sync with a theme set from here. */
const setTheme = (value: "light" | "dark" | "system") => {
  const root = document.documentElement;
  root.setAttribute("data-theme-setting", value);
  const resolved =
    value === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : value;
  root.setAttribute("data-theme", resolved);
  localStorage.setItem("theme", value);
};

/* Icons for the docs cluster rows, keyed by href so the rows themselves
   stay derived from docsSidebarLinks. */
const DOC_ICONS: Record<string, string> = {
  "/overview": "account_tree",
  "/docs/get-started": "rocket_launch",
  "/blueprints/claude": "description",
  "/blueprints/design": "description",
  "/blueprints/content-design": "description",
  "/skills": "construction",
  "/loops": "all_inclusive",
  "/project-journal": "timeline",
};

interface SitePaletteMountProps {
  /** Essay links from the Substack feed, passed down by the root layout. */
  writingLinks: { label: string; href: string; description?: string }[];
}

/**
 * The site-wide command palette (an experiment). Mounted once from the root
 * layout, like the chat panel, so Cmd+K works on every chrome-bearing page
 * and an open palette survives nothing (it navigates and closes).
 *
 * The resting view is the doors: top-level pages, the design system
 * cluster, and a few actions. Typing widens the pool to every component,
 * foundation page, case study and essay — all derived from the navigation
 * config and the component registry, never listed by hand here.
 */
export function SitePaletteMount({ writingLinks }: SitePaletteMountProps) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { setOpen: setChatOpen } = useSiteChat();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isDesktop = useSyncExternalStore(subscribeDesktop, readDesktop, () => false);

  const hasQuery = query.trim().length > 0;

  // The header's search button lives in a different tree (see palette-bus).
  useEffect(() => {
    const onOpenEvent = () => setOpen(true);
    window.addEventListener(SITE_PALETTE_OPEN_EVENT, onOpenEvent);
    return () => window.removeEventListener(SITE_PALETTE_OPEN_EVENT, onOpenEvent);
  }, []);

  // Close on any navigation the palette didn't drive (back button, a link
  // clicked under the docked panel) — same pattern as MegaNav.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setQuery("");
  };

  const groups = useMemo<CommandPaletteGroup[]>(() => {
    const go = (href: string) => () => router.push(href);

    const navigation: CommandPaletteGroup = {
      label: "Navigation",
      commands: [
        {
          id: "nav-home",
          label: "Home",
          description: "The landing page",
          icon: "home",
          onSelect: go("/"),
        },
        {
          id: "nav-about",
          label: "About",
          description: "Background, principles, and career history",
          icon: "person",
          keywords: ["bio", "background", "career"],
          onSelect: go("/about"),
        },
        {
          id: "nav-work",
          label: "Work",
          description: "The case study index",
          icon: "cases",
          keywords: ["case studies", "portfolio"],
          onSelect: go("/work"),
        },
        {
          id: "nav-writing",
          label: "Writing",
          description: "Essays on design and AI",
          icon: "edit_note",
          keywords: ["essays", "blog"],
          onSelect: go("/writing"),
        },
        // The landing row sits here, mirroring the header, rather than
        // under the group heading that shares its name: a heading followed
        // by an identically labelled row reads as a stutter.
        {
          id: "ds-landing",
          label: "Design system",
          description: "The whole system on one page",
          icon: "grid_view",
          onSelect: go("/design-system"),
        },
        {
          id: "nav-contact",
          label: "Contact",
          description: "Ways to get in touch",
          icon: "mail",
          keywords: ["email"],
          onSelect: go("/contact"),
        },
      ],
    };

    const designSystem: CommandPaletteGroup = {
      label: "Design system",
      commands: [
        ...dsMegaItems
          .filter((item) => isDesktop || !item.desktopOnly)
          .map((item) => ({
            id: `ds-${item.href}`,
            label: item.label,
            description: item.description,
            icon: item.icon,
            onSelect: go(item.href),
          })),
        ...docsSidebarLinks.slice(1).map((link) => ({
          id: `ds-${link.href}`,
          label: link.label,
          description: link.description,
          icon: DOC_ICONS[link.href] ?? "description",
          onSelect: go(link.href),
        })),
      ],
    };

    const actions: CommandPaletteGroup = {
      label: "Actions",
      commands: [
        {
          id: "theme-light",
          label: "Light theme",
          description: "Switch the site to light",
          icon: "light_mode",
          keywords: ["theme", "appearance", "mode"],
          onSelect: () => setTheme("light"),
        },
        {
          id: "theme-dark",
          label: "Dark theme",
          description: "Switch the site to dark",
          icon: "dark_mode",
          keywords: ["theme", "appearance", "mode"],
          onSelect: () => setTheme("dark"),
        },
        {
          id: "theme-system",
          label: "System theme",
          description: "Follow the OS setting",
          icon: "routine",
          keywords: ["theme", "appearance", "mode", "auto"],
          onSelect: () => setTheme("system"),
        },
        {
          id: "open-chat",
          label: "Ask the site chat",
          description: "Answers questions about Rob and the system",
          icon: "forum",
          keywords: ["ai", "help", "assistant"],
          onSelect: () => setChatOpen(true),
        },
      ],
    };

    // The resting view stays short; the deep collections join once a query
    // gives the built-in filter something to narrow them with.
    if (!hasQuery) return [navigation, designSystem, actions];

    const components: CommandPaletteGroup = {
      label: "Components",
      commands: [...componentMetadata]
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((c) => ({
          id: `component-${c.slug}`,
          label: c.label,
          description: c.description,
          icon: "widgets",
          keywords: ["component", c.category],
          onSelect: go(`/components/${c.slug}`),
        })),
    };

    const foundations: CommandPaletteGroup = {
      label: "Foundations",
      commands: foundationsSidebarLinks.slice(1).map((link) => ({
        id: `foundation-${link.href}`,
        label: link.label,
        description: link.description,
        icon: "category",
        keywords: ["foundations", "tokens"],
        onSelect: go(link.href),
      })),
    };

    const caseStudyGroup: CommandPaletteGroup = {
      label: "Case studies",
      // The case-study registry rather than the sidebar links: it carries
      // each study's dek, so the rows describe themselves.
      commands: caseStudies.map((study) => ({
        id: `work-${study.href}`,
        label: study.title,
        description: study.dek,
        icon: "cases",
        keywords: ["case study", "work", study.companyName],
        onSelect: go(study.href),
      })),
    };

    const essays: CommandPaletteGroup = {
      label: "Essays",
      commands: writingLinks.map((link) => ({
        id: `essay-${link.href}`,
        label: link.label,
        description: link.description || undefined,
        icon: "edit_note",
        keywords: ["essay", "writing"],
        onSelect: go(link.href),
      })),
    };

    return [navigation, designSystem, components, foundations, caseStudyGroup, essays, actions];
  }, [hasQuery, isDesktop, writingLinks, router, setChatOpen]);

  if (CHROMELESS_ROUTES.has(pathname)) return null;

  return (
    <CommandPalette
      className={styles.palette}
      open={open}
      onOpenChange={handleOpenChange}
      groups={groups}
      // Short enough to fit the input on a 375px phone, where the longer
      // pages-components-actions form clipped mid-word.
      placeholder="Search the site"
      emptyMessage="No matches. Try another word."
      // The showcase page's demo binds Cmd+K itself; there the header's
      // search button still opens this one, but the hotkey stays the demo's.
      hotkey={pathname !== "/components/command-palette"}
      onSearchChange={setQuery}
    />
  );
}
