"use client";

import { createContext, useContext } from "react";
import type { NavListItem } from "@robr0/design-system/components/NavList/NavList";

/**
 * Article links for the mobile drawer's Writing accordion.
 *
 * MegaNav is a client component rendered by (mostly client) pages, so it
 * can't fetch the Substack feed itself. The root layout — a server
 * component — fetches the articles once per ISR window and provides the
 * {label, href} list here; MegaNav reads it wherever it renders. An empty
 * list (feed unreachable) degrades the Writing row to a plain link.
 */
const WritingNavContext = createContext<NavListItem[]>([]);

export function WritingNavProvider({
  items,
  children,
}: {
  items: NavListItem[];
  children: React.ReactNode;
}) {
  return (
    <WritingNavContext.Provider value={items}>
      {children}
    </WritingNavContext.Provider>
  );
}

export function useWritingNav(): NavListItem[] {
  return useContext(WritingNavContext);
}
