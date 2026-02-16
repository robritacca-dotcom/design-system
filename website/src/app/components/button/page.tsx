"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Button } from "@design-system/components/Button/Button";
import type { ButtonProps } from "@design-system/components/Button/Button";
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
   BUTTON MATRIX DATA
   Rows: states × columns: icon variants
   ============================================ */

type State = "disabled" | "default" | "hover" | "active";

const states: { label: string; value: State }[] = [
  { label: "Disabled", value: "disabled" },
  { label: "Default", value: "default" },
  { label: "Hover", value: "hover" },
  { label: "Active", value: "active" },
];

interface ColumnDef {
  label: string;
  iconLeft?: string;
  iconRight?: string;
}

const primaryColumns: ColumnDef[] = [
  { label: "No icon" },
  { label: "Icon, left", iconLeft: "grid_view" },
  { label: "Icon, right", iconRight: "arrow_forward" },
];

const secondaryColumns: ColumnDef[] = [
  { label: "No icon" },
  { label: "Icon, left", iconLeft: "grid_view" },
  { label: "Icon, right", iconRight: "arrow_forward" },
];

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
          <h1 className={`${styles.pageTitle} animate-in`}>Buttons</h1>

          {/* Intro */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Standardized button components that power all interactive actions, from primary CTAs to top level and sub navigation.
          </p>

          {/* Components section */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionTitle}>
              <h2>Components</h2>
            </div>

            <div className={styles.buttonMatrix}>
              {/* Row 1: Column group headers */}
              <span /> {/* empty corner */}
              <span
                className={styles.columnGroupHeader}
                style={{ gridColumn: "2 / 5" }}
              >
                Primary
              </span>
              <span
                className={styles.columnGroupHeader}
                style={{ gridColumn: "5 / 8" }}
              >
                Secondary
              </span>

              {/* Row 2: Column sub-headers */}
              <span /> {/* empty corner */}
              {primaryColumns.map((col) => (
                <span key={`ph-${col.label}`} className={styles.columnHeader}>
                  {col.label}
                </span>
              ))}
              {secondaryColumns.map((col) => (
                <span key={`sh-${col.label}`} className={styles.columnHeader}>
                  {col.label}
                </span>
              ))}

              {/* Data rows */}
              {states.map((st) => (
                <React.Fragment key={st.value}>
                  <span className={styles.rowLabel}>{st.label}</span>
                  {primaryColumns.map((col) => (
                    <div
                      key={`p-${st.value}-${col.label}`}
                      className={styles.buttonCell}
                    >
                      <Button
                        label="Button"
                        priority="primary"
                        state={st.value}
                        iconLeft={col.iconLeft}
                        iconRight={col.iconRight}
                      />
                    </div>
                  ))}
                  {secondaryColumns.map((col) => (
                    <div
                      key={`s-${st.value}-${col.label}`}
                      className={styles.buttonCell}
                    >
                      <Button
                        label="Button"
                        priority="secondary"
                        state={st.value}
                        iconLeft={col.iconLeft}
                        iconRight={col.iconRight}
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
