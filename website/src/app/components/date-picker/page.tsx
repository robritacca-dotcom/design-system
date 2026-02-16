"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { DatePicker } from "@design-system/components/DatePicker/DatePicker";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/date-picker");

export default function DatePickerPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Date picker</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-datepicker--docs"
            />
          </div>

          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Inline calendar with month navigation, selectable dates, today indicator, and min/max date constraints.
          </p>

          {/* Default */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Default</h2>
            </div>
            <div className={styles.variantRow}>
              <DatePicker onDateSelect={() => {}} />
            </div>
          </section>

          {/* With selected */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>With selected date</h2>
            </div>
            <div className={styles.variantRow}>
              <DatePicker value="2026-02-16" onDateSelect={() => {}} />
            </div>
          </section>

          {/* Disabled */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Disabled</h2>
            </div>
            <div className={styles.variantRow}>
              <DatePicker value="2026-02-16" disabled onDateSelect={() => {}} />
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Compact</h2>
            </div>
            <div className={styles.variantRow}>
              <DatePicker size="compact" onDateSelect={() => {}} />
              <DatePicker size="compact" value="2026-02-16" onDateSelect={() => {}} />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
