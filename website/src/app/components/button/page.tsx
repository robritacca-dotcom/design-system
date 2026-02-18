"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Button } from "@design-system/components/Button/Button";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
/* ============================================
   BUTTON STATES & VARIANTS
   ============================================ */

const states = [
  { label: "Disabled", value: "disabled" as const },
  { label: "Default", value: "default" as const },
  { label: "Hover", value: "hover" as const },
  { label: "Active", value: "active" as const },
];

const priorities = ["primary", "secondary", "tertiary", "destructive"] as const;

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
  tertiary: "Tertiary",
  destructive: "Destructive",
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
  priority: "primary" | "secondary" | "tertiary" | "destructive";
  size: "default" | "compact";
}) {
  const heading = `${priorityLabels[priority]}${size === "compact" ? ", compact" : ""}`;

  return (
    <section className={styles.variantBlock}>
      <SectionTitle title={heading} />

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

const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/button");

export default function ButtonPage() {
  return (
    <>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Button</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=113-5392"
              storybookPath="/?path=/docs/components-button--docs"
            />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              The main action element
            </p>
            <p className={styles.introBody}>
              Primary buttons are solid-filled for the highest-emphasis actions. Secondary buttons have a border and fill on hover. Tertiary buttons are transparent and blend into the surface for lower-priority options. Destructive buttons signal dangerous or irreversible actions like delete and remove. All variants come in default and compact sizes.
            </p>
          </div>

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
