"use client";

import { useCallback, useEffect, useState } from "react";
import { SegmentedControl } from "@design-system/components/SegmentedControl/SegmentedControl";
import styles from "./ThemeToggle.module.css";

const themeSegments = [
  { value: "light", label: "Light", icon: "light_mode" },
  { value: "dark", label: "Dark", icon: "dark_mode" },
];

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<string | null>(null);

  // Sync state from the actual DOM attribute on mount (source of truth)
  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") ||
      localStorage.getItem("theme") ||
      "dark";
    setTheme(current);
  }, []);

  const handleChange = useCallback((value: string) => {
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
    setTheme(value);
  }, []);

  // Don't render until we know the real theme (avoids mismatch flicker)
  if (!theme) return null;

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
