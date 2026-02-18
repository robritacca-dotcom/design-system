"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { ButtonGroup } from "@design-system/components/ButtonGroup/ButtonGroup";
import type { ButtonProps } from "@design-system/components/Button/Button";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
/* ============================================
   DEMO DATA
   ============================================ */

const horizontalDefault: ButtonProps[] = [
  { label: "Home", priority: "tertiary", state: "default" },
  { label: "About", priority: "tertiary", state: "default" },
  { label: "Components", priority: "tertiary", state: "active" },
  { label: "Foundations", priority: "tertiary", state: "default" },
];

const horizontalWithIcons: ButtonProps[] = [
  { label: "Home", priority: "tertiary", state: "default", iconLeft: "home" },
  { label: "Settings", priority: "tertiary", state: "default", iconLeft: "settings" },
  { label: "Profile", priority: "tertiary", state: "active", iconLeft: "person" },
];

const verticalDefault: ButtonProps[] = [
  { label: "Overview", priority: "tertiary", state: "active" },
  { label: "Button", priority: "tertiary", state: "default" },
  { label: "Button group", priority: "tertiary", state: "default" },
  { label: "Card", priority: "tertiary", state: "default" },
  { label: "Navigation", priority: "tertiary", state: "default" },
  { label: "Toggle switch", priority: "tertiary", state: "default" },
];

const verticalWithIcons: ButtonProps[] = [
  { label: "Dashboard", priority: "tertiary", state: "default", iconLeft: "dashboard" },
  { label: "Analytics", priority: "tertiary", state: "active", iconLeft: "bar_chart" },
  { label: "Settings", priority: "tertiary", state: "default", iconLeft: "settings" },
  { label: "Help", priority: "tertiary", state: "default", iconLeft: "help" },
];

const primaryGroup: ButtonProps[] = [
  { label: "Cancel", priority: "tertiary", state: "default" },
  { label: "Save", priority: "secondary", state: "default", iconRight: "arrow_forward" },
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
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=256-12612"
              storybookPath="/?path=/docs/components-buttongroup--docs"
            />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Groups related buttons in a row or column
            </p>
            <p className={styles.introBody}>
              Used for nav menus, toolbars, and action sets where buttons need consistent spacing and alignment without wiring it up manually each time.
            </p>
          </div>

          {/* Horizontal */}
          <section className={styles.section}>
            <SectionTitle title="Horizontal" />
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
            <SectionTitle title="Vertical" />
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
