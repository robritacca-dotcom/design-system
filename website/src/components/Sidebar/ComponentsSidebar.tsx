"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { componentsSidebarGroups } from "@/config/navigation";

/**
 * The components section's sidebar: the overview link pinned above the
 * category groups, with the active link derived from the current pathname.
 * The index, the category landing pages, and every component page render
 * this one wrapper, so the rail cannot drift between them.
 */
export default function ComponentsSidebar() {
  const pathname = usePathname() ?? "";
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  const overview = {
    href: "/components",
    label: "Components overview",
    active: path === "/components" ? true : undefined,
  };
  const groups = componentsSidebarGroups.map((group) => ({
    ...group,
    active: path === group.href ? true : undefined,
    links: group.links.map((link) => ({
      ...link,
      active: path === link.href ? true : undefined,
    })),
  }));

  return <Sidebar links={[overview]} groups={groups} searchable />;
}
