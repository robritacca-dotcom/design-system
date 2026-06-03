"use client";

import { useCallback, useState } from "react";
import { SegmentedControl } from "@design-system/components/SegmentedControl/SegmentedControl";
import styles from "./ThemeToggle.module.css";

const themeSegments = [
  { value: "light", label: "Light", icon: "light_mode" },
  { value: "dark", label: "Dark", icon: "dark_mode" },
];

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") || "dark";
    }
    return "dark";
  });

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
