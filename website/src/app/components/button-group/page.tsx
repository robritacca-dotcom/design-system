"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { ButtonGroup } from "@design-system/components/ButtonGroup/ButtonGroup";
import type { ButtonProps } from "@design-system/components/Button/Button";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
/* ============================================
   DEMO DATA
   ============================================ */

const horizontalDefault: ButtonProps[] = [
  { label: "Home", priority: "secondary", state: "default" },
  { label: "About", priority: "secondary", state: "default" },
  { label: "Components", priority: "secondary", state: "active" },
  { label: "Foundations", priority: "secondary", state: "default" },
];

const horizontalWithIcons: ButtonProps[] = [
  { label: "Home", priority: "secondary", state: "default", iconLeft: "home" },
  { label: "Settings", priority: "secondary", state: "default", iconLeft: "settings" },
  { label: "Profile", priority: "secondary", state: "active", iconLeft: "person" },
];

const verticalDefault: ButtonProps[] = [
  { label: "Overview", priority: "secondary", state: "active" },
  { label: "Button", priority: "secondary", state: "default" },
  { label: "Button group", priority: "secondary", state: "default" },
  { label: "Card", priority: "secondary", state: "default" },
  { label: "Navigation", priority: "secondary", state: "default" },
  { label: "Toggle switch", priority: "secondary", state: "default" },
];

const verticalWithIcons: ButtonProps[] = [
  { label: "Dashboard", priority: "secondary", state: "default", iconLeft: "dashboard" },
  { label: "Analytics", priority: "secondary", state: "active", iconLeft: "bar_chart" },
  { label: "Settings", priority: "secondary", state: "default", iconLeft: "settings" },
  { label: "Help", priority: "secondary", state: "default", iconLeft: "help" },
];

const primaryGroup: ButtonProps[] = [
  { label: "Cancel", priority: "secondary", state: "default" },
  { label: "Save", priority: "primary", state: "default", iconRight: "arrow_forward" },
];

/* ============================================
   PAGE
   ============================================ */

const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/button-group");

export default function ButtonGroupPage() {
  return (
    <>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Button group</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-buttongroup--docs"
            />
          </div>

          {/* Intro */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Groups related buttons together in a row or column. Used for nav menus, toolbars, and action sets where buttons need consistent spacing and alignment without wiring it up manually each time.
          </p>

          {/* Horizontal */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Horizontal</h2>
            </div>
            <div className={styles.showcase}>
              <span className={styles.showcaseLabel}>Default</span>
              <div className={styles.previewBox}>
                <ButtonGroup orientation="horizontal" buttons={horizontalDefault} />
              </div>

              <span className={styles.showcaseLabel}>With icons</span>
              <div className={styles.previewBox}>
                <ButtonGroup orientation="horizontal" buttons={horizontalWithIcons} />
              </div>

              <span className={styles.showcaseLabel}>Mixed priorities</span>
              <div className={styles.previewBox}>
                <ButtonGroup orientation="horizontal" buttons={primaryGroup} />
              </div>
            </div>
          </section>

          {/* Vertical */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Vertical</h2>
            </div>
            <div className={styles.showcase}>
              <span className={styles.showcaseLabel}>Default</span>
              <div className={styles.previewBox}>
                <ButtonGroup orientation="vertical" buttons={verticalDefault} />
              </div>

              <span className={styles.showcaseLabel}>With icons</span>
              <div className={styles.previewBox}>
                <ButtonGroup orientation="vertical" buttons={verticalWithIcons} />
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
