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
   BUTTON STATES
   ============================================ */

const states = [
  { label: "Disabled", value: "disabled" as const },
  { label: "Default", value: "default" as const },
  { label: "Hover", value: "hover" as const },
  { label: "Active", value: "active" as const },
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

            <div className={styles.variantGroups}>
              {/* Primary */}
              <div className={styles.variantGroup}>
                <span className={styles.variantGroupTitle}>Primary</span>

                {states.map((st) => (
                  <div key={`p-${st.value}`} className={styles.stateRow}>
                    <span className={styles.stateLabel}>{st.label}</span>
                    <div className={styles.stateButtons}>
                      <Button label="Button" priority="primary" state={st.value} />
                      <Button label="Button" priority="primary" state={st.value} iconLeft="grid_view" />
                      <Button label="Button" priority="primary" state={st.value} iconRight="arrow_forward" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Secondary */}
              <div className={styles.variantGroup}>
                <span className={styles.variantGroupTitle}>Secondary</span>

                {states.map((st) => (
                  <div key={`s-${st.value}`} className={styles.stateRow}>
                    <span className={styles.stateLabel}>{st.label}</span>
                    <div className={styles.stateButtons}>
                      <Button label="Button" priority="secondary" state={st.value} />
                      <Button label="Button" priority="secondary" state={st.value} iconLeft="grid_view" />
                      <Button label="Button" priority="secondary" state={st.value} iconRight="arrow_forward" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
