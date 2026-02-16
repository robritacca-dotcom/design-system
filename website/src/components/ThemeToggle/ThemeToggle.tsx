"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setIsDark(current !== "light");
  }, []);

  const toggle = useCallback(() => {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setIsDark(!isDark);
  }, [isDark]);

  return (
    <button
      className={`${styles.themeToggle} ${className || ""}`}
      onClick={toggle}
      aria-label="Toggle dark/light mode"
    >
      <div className={styles.toggleSwitch}>
        <div className={styles.toggleTrack} />
        <div className={styles.toggleThumb}>
          <span
            className="material-symbols-rounded"
            style={{
              fontSize: "14px",
              color: "var(--color-action-primary-bg)",
            }}
          >
            check
          </span>
        </div>
      </div>
      <span className={styles.toggleLabel}>
        {isDark ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}
