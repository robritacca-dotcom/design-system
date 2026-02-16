"use client";

import { useCallback, useState } from "react";
import { SegmentedControl } from "@design-system/components/SegmentedControl/SegmentedControl";
import styles from "./ThemeToggle.module.css";

const themeSegments = [
  { value: "light", label: "Light", icon: "light_mode" },
  { value: "dark", label: "Dark", icon: "dark_mode" },
];

function getInitialTheme(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "dark";
  }
  return "dark";
}

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState(getInitialTheme);

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
      />
    </div>
  );
}
