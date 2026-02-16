"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { ToggleSwitch } from "@design-system/components/ToggleSwitch/ToggleSwitch";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
/* ============================================
   PAGE
   ============================================ */

const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/toggle-switch");

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
            An on/off switch for settings that take effect immediately, like enabling dark mode or toggling a notification. The sliding thumb and check icon give clear visual feedback. Use Checkbox instead for options that need to be saved or submitted as part of a form.
          </p>

          {/* Default */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Default</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <ToggleSwitch checked={true} label="On" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <ToggleSwitch checked={false} label="Off" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <ToggleSwitch checked={true} showLabel={false} ariaLabel="No label" onChange={() => {}} />
              </div>
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Compact</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <ToggleSwitch checked={true} label="On" size="compact" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <ToggleSwitch checked={false} label="Off" size="compact" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <ToggleSwitch checked={true} showLabel={false} size="compact" ariaLabel="No label" onChange={() => {}} />
              </div>
            </div>
          </section>

          {/* States */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>States</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <ToggleSwitch checked={true} disabled label="Disabled, on" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <ToggleSwitch checked={false} disabled label="Disabled, off" onChange={() => {}} />
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
