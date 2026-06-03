"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { SegmentedControl } from "@design-system/components/SegmentedControl/SegmentedControl";
import styles from "./ThemeToggle.module.css";

const themeSegments = [
  { value: "light", label: "Light", icon: "light_mode" },
  { value: "dark", label: "Dark", icon: "dark_mode" },
];

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState("dark");

  useLayoutEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    if (current !== theme) setTheme(current);
  }, []);

  const handleChange = useCallback((value: string) => {
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
    setTheme(value);
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
