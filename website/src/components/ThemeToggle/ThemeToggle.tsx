"use client";

import { useCallback, useSyncExternalStore } from "react";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import styles from "./ThemeToggle.module.css";

const themeSegments = [
  { value: "light", label: "Light", icon: "light_mode" },
  { value: "dark", label: "Dark", icon: "dark_mode" },
];

/**
 * The `data-theme` attribute on <html> is the single source of truth for the
 * theme — it's set by the inline script in layout.tsx before first paint and
 * mutated on toggle. Every ThemeToggle instance (in-flow header, sticky header,
 * mobile menu) subscribes to it, so they all stay in sync no matter which one
 * is clicked, and they never drift on client-side navigation.
 */
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  // Reflect theme changes made in other tabs.
  window.addEventListener("storage", callback);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") || "dark";
}

// Matches the SSR value of data-theme on <html> in layout.tsx.
function getServerSnapshot() {
  return "dark";
}

export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleChange = useCallback((value: string) => {
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
    // No setState needed — the MutationObserver above notifies every instance.
  }, []);

  return (
    <div className={`${styles.themeToggle} ${className || ""}`}>
      <SegmentedControl
        segments={themeSegments}
        activeSegment={theme}
        onSegmentChange={handleChange}
        size="compact"
        ariaLabel="Theme"
      />
    </div>
  );
}
