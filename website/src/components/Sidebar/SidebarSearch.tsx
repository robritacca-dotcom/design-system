"use client";

import React, { useId, useState } from "react";
import { Input } from "@robr0/design-system/components/Input/Input";
import { Button } from "@robr0/design-system/components/Button/Button";
import SidebarLinks from "./SidebarLinks";
import SidebarGroups from "./SidebarGroups";
import type { SidebarLink, SidebarLinkGroup } from "./Sidebar";
import styles from "./Sidebar.module.css";

interface SidebarSearchProps {
  links: SidebarLink[];
  /** Grouped mode — filter within groups, hiding any group left empty */
  groups?: SidebarLinkGroup[];
  /** Small subheader above the link list (Storybook-style section label) */
  listLabel?: string;
}

/**
 * Searchable variant of the sidebar rail: a live filter input above the
 * link list. The first link (the section landing, e.g. "Contents") is
 * pinned and never filtered out, so the rail always stays navigable.
 * In grouped mode the group headers replace the single list label.
 */
export default function SidebarSearch({ links, groups, listLabel = "Components" }: SidebarSearchProps) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const [pinned, ...rest] = links;
  const q = query.trim().toLowerCase();
  const matchesQuery = (link: SidebarLink) => link.label.toLowerCase().includes(q);

  const flatMatches = q ? rest.filter(matchesQuery) : rest;
  const groupMatches = groups
    ?.map((group) => (q ? { ...group, links: group.links.filter(matchesQuery) } : group))
    .filter((group) => group.links.length > 0);

  const matchCount = groups
    ? (groupMatches ?? []).reduce((n, group) => n + group.links.length, 0)
    : flatMatches.length;
  const noResults = q.length > 0 && matchCount === 0;

  const clear = () => {
    setQuery("");
    document.getElementById(inputId)?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && query) {
      e.stopPropagation();
      clear();
    }
  };

  return (
    <div onKeyDown={onKeyDown}>
      <div role="search" aria-label="Sidebar" className={styles.search}>
        <Input
          id={inputId}
          type="search"
          iconLeft="search"
          placeholder="Search"
          ariaLabel="Search components"
          value={query}
          onValueChange={setQuery}
        />
      </div>

      {pinned && (
        <div className={styles.pinnedHome}>
          <Button
            label={pinned.label}
            href={pinned.disabled ? undefined : pinned.href}
            state={pinned.active ? "active" : "default"}
            ariaCurrent={pinned.active}
            variant="tertiary"
          />
        </div>
      )}

      {!groups && <p className={styles.listHeader}>{listLabel}</p>}

      <p role="status" aria-live="polite" className={styles.srOnly}>
        {q
          ? noResults
            ? "No results"
            : `${matchCount} result${matchCount === 1 ? "" : "s"}`
          : ""}
      </p>

      {groups ? (
        <SidebarGroups groups={groupMatches ?? []} forceOpen={q.length > 0} />
      ) : (
        <SidebarLinks links={flatMatches} />
      )}

      {noResults && (
        <div className={styles.noResults}>
          <span
            className={`material-symbols-rounded ${styles.noResultsIcon}`}
            aria-hidden="true"
          >
            search_off
          </span>
          <p className={styles.noResultsText}>
            No matches for &ldquo;{query}&rdquo;
          </p>
          <Button
            variant="tertiary"
            size="compact"
            label="Clear search"
            onClick={clear}
          />
        </div>
      )}
    </div>
  );
}
