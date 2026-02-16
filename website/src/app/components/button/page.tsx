"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Button } from "@design-system/components/Button/Button";
import PageLinks from "../../../components/PageLinks/PageLinks";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components", active: true },
  { href: "/foundations", label: "Foundations" },
];

const sidebarLinks = [
  { href: "/components", label: "About" },
  { href: "/components/button", label: "Button", active: true },
  { href: "/components/button-group", label: "Button group" },
  { href: "/components/card", label: "Card" },
  { href: "/components/navigation", label: "Navigation" },
  { href: "/components/toggle-switch", label: "Toggle switch" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

/* ============================================
   BUTTON STATES & VARIANTS
   ============================================ */

const states = [
  { label: "Disabled", value: "disabled" as const },
  { label: "Default", value: "default" as const },
  { label: "Hover", value: "hover" as const },
  { label: "Active", value: "active" as const },
];

const priorities = ["primary", "secondary"] as const;

const sizes = [
  { label: "Default", value: "default" as const },
  { label: "Compact", value: "compact" as const },
];

const iconVariants = [
  { label: "No icon", iconLeft: undefined, iconRight: undefined },
  { label: "Icon, left", iconLeft: "grid_view", iconRight: undefined },
  { label: "Icon, right", iconLeft: undefined, iconRight: "arrow_forward" },
  { label: "Both icons", iconLeft: "grid_view", iconRight: "arrow_forward" },
] as const;

const priorityLabels: Record<string, string> = {
  primary: "Primary",
  secondary: "Secondary",
};

/* ============================================
   BUTTON GRID — 5-column layout per variant
   col 1: state label
   cols 2–5: icon variants (no icon / left / right / both)
   One grid per priority × size combination, stacked vertically.
   ============================================ */

function ButtonGrid({
  priority,
  size,
}: {
  priority: "primary" | "secondary";
  size: "default" | "compact";
}) {
  const heading = `${priorityLabels[priority]}${size === "compact" ? ", compact" : ""}`;

  return (
    <section className={styles.variantBlock}>
      <div className={styles.sectionTitle}>
        <h2>{heading}</h2>
      </div>

      <div className={styles.buttonGrid}>
        {/* Column headers */}
        <div className={styles.gridCorner} />
        {iconVariants.map((iv) => (
          <span key={iv.label} className={styles.gridColHeader}>
            {iv.label}
          </span>
        ))}

        {/* State rows */}
        {states.map((st) => (
          <React.Fragment key={st.value}>
            <span className={styles.gridRowHeader}>{st.label}</span>
            {iconVariants.map((iv) => (
              <div key={`${st.value}-${iv.label}`} className={styles.gridCell}>
                <Button
                  label="Button"
                  priority={priority}
                  state={st.value}
                  size={size}
                  iconLeft={iv.iconLeft}
                  iconRight={iv.iconRight}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

/* ============================================
   PAGE
   ============================================ */

export default function ButtonPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Buttons</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-button--docs"
            />
          </div>

          {/* Intro */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Standardized button components that power all interactive actions, from primary CTAs to top level and sub navigation.
          </p>

          {/* Variant grids — one per priority × size */}
          {sizes.map((sz) =>
            priorities.map((p) => (
              <ButtonGrid key={`${p}-${sz.value}`} priority={p} size={sz.value} />
            ))
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}
