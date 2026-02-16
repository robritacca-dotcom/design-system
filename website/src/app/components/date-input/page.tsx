"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { DateInput } from "@design-system/components/DateInput/DateInput";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/date-input");

export default function DateInputPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Date input</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-dateinput--docs"
            />
          </div>

          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Date input with native browser picker, calendar icon, label, and validation states.
          </p>

          {/* Variants */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Variants</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <DateInput label="Default" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <DateInput label="With value" value="2026-06-15" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <DateInput label="Required" required onChange={() => {}} />
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
                <DateInput label="Helper text" helperText="Select a date within the next 30 days" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <DateInput label="Error" value="2020-01-01" error helperText="Date must be in the future" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <DateInput label="Disabled" value="2026-03-15" disabled onChange={() => {}} />
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
                <DateInput label="Date" size="compact" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <DateInput label="With value" size="compact" value="2026-06-15" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <DateInput label="Error" size="compact" error helperText="Invalid date" value="2020-01-01" onChange={() => {}} />
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
