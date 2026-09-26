"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CommandPalette } from "rift-ds/components/CommandPalette/CommandPalette";
import type { CommandPaletteGroup } from "rift-ds/components/CommandPalette/CommandPalette";
import {
} from "@/config/navigation";
import { caseStudies } from "@/data/case-studies";
import { CHROMELESS_ROUTES } from "@/config/chromeless";
import { useSiteChat } from "@/components/SiteChat/ChatContext";
import { SITE_PALETTE_OPEN_EVENT } from "./palette-bus";
import styles from "./SitePalette.module.css";

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
 * config and the component registry, never listed by hand here — plus the
 * one exception: the ask-chat row, built from the query itself, which
 * hands the typed question to the site chat.
 */
export function SitePaletteMount({ writingLinks }: SitePaletteMountProps) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { setOpen: setChatOpen, send: sendChat } = useSiteChat();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;

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

    // The palette used to list the whole documentation IA under this group.
    // Those pages are at rift-ds.com now, so the one page that remains joins
    // Navigation instead of heading a group of its own.
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
    if (!hasQuery) return [navigation, actions];

    // The Stripe-style escape hatch: whatever was typed can be handed to the
    // site chat as a question. The row's label IS the query, which is what
    // keeps it visible — the built-in filter matches labels against the
    // query, and a label that contains it always survives. Sits last, below
    // the concrete matches, and when nothing else matches it is the whole
    // result set: the dead-end empty state becomes an answer path.
    const askChat: CommandPaletteGroup = {
      label: "Ask robr0 GPT",
      commands: [
        {
          id: "ask-chat-query",
          label: trimmedQuery,
          description: "Get an answer from the site chat",
          // The AI-ring chip — the system's "a model answers here" signal,
          // worn as a passive badge, wearing the FAB's own face (forum +
          // "Ask robr0 GPT") so the row points at the surface it opens;
          // the chip replaces the row's leading icon rather than repeating
          // it. aria-hidden because the group heading already says it, and
          // decorative rather than the AiButton component because a real
          // button inside the option row would nest interactive controls.
          trailing: (
            <span className={styles.askChip} aria-hidden="true">
              <span
                className={`material-symbols-rounded ${styles.askChipIcon}`}
              >
                forum
              </span>
              Ask robr0 GPT
            </span>
          ),
          onSelect: () => {
            setChatOpen(true);
            sendChat(trimmedQuery);
          },
        },
      ],
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

    return [
      navigation,
      caseStudyGroup,
      essays,
      actions,
      askChat,
    ];
  }, [hasQuery, trimmedQuery, writingLinks, router, setChatOpen, sendChat]);

  if (CHROMELESS_ROUTES.has(pathname)) return null;

  return (
    <CommandPalette
      className={styles.palette}
      open={open}
      onOpenChange={handleOpenChange}
      groups={groups}
      // Names both things the field does now that a query can be handed to
      // the chat. Still short enough for the input on a 375px phone, where
      // the longer pages-components-actions form clipped mid-word.
      placeholder="Search or ask anything"
      // Unreachable while the ask row exists (its label is the query, so it
      // matches every query) — kept as the fallback should that ever change.
      emptyMessage="No matches. Try another word."
      // The showcase page's demo binds Cmd+K itself; there the header's
      // search button still opens this one, but the hotkey stays the demo's.
      hotkey={pathname !== "/components/command-palette"}
      onSearchChange={setQuery}
    />
  );
}
