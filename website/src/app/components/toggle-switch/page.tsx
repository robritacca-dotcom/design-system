"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { ToggleSwitch } from "@design-system/components/ToggleSwitch/ToggleSwitch";
import PageLinks from "../../../components/PageLinks/PageLinks";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components", active: true },
  { href: "/foundations", label: "Foundations" },
];

const sidebarLinks = [
  { href: "/components", label: "Contents" },
  { href: "/components/button", label: "Button" },
  { href: "/components/button-group", label: "Button group" },
  { href: "/components/card", label: "Card" },
  { href: "/components/navigation", label: "Navigation" },
  { href: "/components/toggle-switch", label: "Toggle switch", active: true },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

/* ============================================
   PAGE
   ============================================ */

export default function ToggleSwitchPage() {
  return (
    <>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Toggle switch</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-toggleswitch--docs"
            />
          </div>

          {/* Intro */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Binary on/off control with a sliding thumb and check indicator, used for settings like theme switching.
          </p>

          {/* States */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>States</h2>
            </div>
            <div className={styles.stateGrid}>
              {/* Column headers */}
              <div className={styles.gridCorner} />
              <span className={styles.gridColHeader}>With label</span>
              <span className={styles.gridColHeader}>Without label</span>

              {/* On */}
              <span className={styles.gridRowHeader}>On</span>
              <div className={styles.gridCell}>
                <ToggleSwitch checked={true} label="Dark Mode" onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <ToggleSwitch checked={true} showLabel={false} label="Toggle" onChange={() => {}} />
              </div>

              {/* Off */}
              <span className={styles.gridRowHeader}>Off</span>
              <div className={styles.gridCell}>
                <ToggleSwitch checked={false} label="Dark Mode" onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <ToggleSwitch checked={false} showLabel={false} label="Toggle" onChange={() => {}} />
              </div>

              {/* Disabled On */}
              <span className={styles.gridRowHeader}>Disabled, on</span>
              <div className={styles.gridCell}>
                <ToggleSwitch checked={true} disabled label="Dark Mode" onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <ToggleSwitch checked={true} disabled showLabel={false} label="Toggle" onChange={() => {}} />
              </div>

              {/* Disabled Off */}
              <span className={styles.gridRowHeader}>Disabled, off</span>
              <div className={styles.gridCell}>
                <ToggleSwitch checked={false} disabled label="Dark Mode" onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <ToggleSwitch checked={false} disabled showLabel={false} label="Toggle" onChange={() => {}} />
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
