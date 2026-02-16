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

/* ============================================
   BUTTON GRID — reusable for each size
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
          <span className={styles.gridColHeader}>No icon</span>
          <span className={styles.gridColHeader}>Icon, left</span>
          <span className={styles.gridColHeader}>Icon, right</span>
        </React.Fragment>
      ))}

      {/* State rows */}
      {states.map((st) => (
        <React.Fragment key={st.value}>
          <span className={styles.gridRowHeader}>{st.label}</span>
          {priorities.map((p) => (
            <React.Fragment key={`${p}-${st.value}`}>
              <div className={styles.gridCell}>
                <Button label="Button" priority={p} state={st.value} size={size} />
              </div>
              <div className={styles.gridCell}>
                <Button label="Button" priority={p} state={st.value} size={size} iconLeft="grid_view" />
              </div>
              <div className={styles.gridCell}>
                <Button label="Button" priority={p} state={st.value} size={size} iconRight="arrow_forward" />
              </div>
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
