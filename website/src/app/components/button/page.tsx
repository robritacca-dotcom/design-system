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

/* ============================================
   BUTTON GRID — reusable for each size
   5-column layout: state | primary variants x4 icon combos… wait
   Actually: 9-column layout:
   col 1: state label
   cols 2–5: Primary (no icon / icon left / icon right / both)
   cols 6–9: Secondary (no icon / icon left / icon right / both)
   ============================================ */

function ButtonGrid({ size }: { size: "default" | "compact" }) {
  return (
    <div className={styles.buttonGrid}>
      {/* Column group headers */}
      <div className={styles.gridCorner} />
      {priorities.map((p) => (
        <div key={p} className={styles.gridGroupHeader}>
          <span>{p === "primary" ? "Primary" : "Secondary"}</span>
        </div>
      ))}

      {/* Sub-column headers */}
      <div className={styles.gridCorner} />
      {priorities.map((p) => (
        <React.Fragment key={`sub-${p}`}>
          {iconVariants.map((iv) => (
            <span key={`${p}-${iv.label}`} className={styles.gridColHeader}>{iv.label}</span>
          ))}
        </React.Fragment>
      ))}

      {/* State rows */}
      {states.map((st) => (
        <React.Fragment key={st.value}>
          <span className={styles.gridRowHeader}>{st.label}</span>
          {priorities.map((p) => (
            <React.Fragment key={`${p}-${st.value}`}>
              {iconVariants.map((iv) => (
                <div key={`${p}-${st.value}-${iv.label}`} className={styles.gridCell}>
                  <Button
                    label="Button"
                    priority={p}
                    state={st.value}
                    size={size}
                    iconLeft={iv.iconLeft}
                    iconRight={iv.iconRight}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </div>
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

          {/* Components section */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionTitle}>
              <h2>Components</h2>
            </div>

            {sizes.map((sz) => (
              <div key={sz.value} className={styles.sizeBlock}>
                <h3 className={styles.sizeLabel}>{sz.label}</h3>
                <ButtonGrid size={sz.value} />
              </div>
            ))}
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
