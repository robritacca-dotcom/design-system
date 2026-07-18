"use client";

import React, { useId, useState } from "react";
import { Input } from "@design-system/components/Input/Input";
import { Button } from "@design-system/components/Button/Button";
import SidebarLinks from "./SidebarLinks";
import type { SidebarLink } from "./Sidebar";
import styles from "./Sidebar.module.css";

interface SidebarSearchProps {
  links: SidebarLink[];
  /** Small subheader above the link list (Storybook-style section label) */
  listLabel?: string;
}

/**
 * Searchable variant of the sidebar rail: a live filter input above the
 * link list. The first link (the section landing, e.g. "Contents") is
 * pinned and never filtered out, so the rail always stays navigable.
 */
export default function SidebarSearch({ links, listLabel = "Components" }: SidebarSearchProps) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const [pinned, ...rest] = links;
  const q = query.trim().toLowerCase();
  const matches = q
    ? rest.filter((link) => link.label.toLowerCase().includes(q))
    : rest;
  const noResults = q.length > 0 && matches.length === 0;

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
          onChange={setQuery}
        />
      </div>

      {pinned && (
        <div className={styles.pinnedHome}>
          <Button
            label={pinned.label}
            href={pinned.disabled ? undefined : pinned.href}
            state={pinned.active ? "active" : "default"}
            ariaCurrent={pinned.active}
            priority="tertiary"
          />
        </div>
      )}

      <p className={styles.listHeader}>{listLabel}</p>

      <p role="status" aria-live="polite" className={styles.srOnly}>
        {q
          ? noResults
            ? "No results"
            : `${matches.length} result${matches.length === 1 ? "" : "s"}`
          : ""}
      </p>

      <SidebarLinks links={matches} />

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
            priority="tertiary"
            size="compact"
            label="Clear search"
            onClick={clear}
          />
        </div>
      )}
    </div>
  );
}
