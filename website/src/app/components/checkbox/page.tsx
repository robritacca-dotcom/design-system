"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Checkbox } from "@design-system/components/Checkbox/Checkbox";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/checkbox");

export default function CheckboxPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Checkbox</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-checkbox--docs"
            />
          </div>

          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            For toggling a single option on or off, or selecting multiple items from a list. Supports a third "mixed" state for cases like a parent checkbox that controls a partially selected group. Use Radio Button when only one choice should be selected at a time.
          </p>

          {/* Default */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Default</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Checkbox label="Checked" checked={true} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Checkbox label="Indeterminate" indeterminate={true} checked={false} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Checkbox checked={true} ariaLabel="No label" onChange={() => {}} />
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
                <Checkbox label="Unchecked" checked={false} size="compact" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Checkbox label="Checked" checked={true} size="compact" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Checkbox label="Indeterminate" indeterminate={true} checked={false} size="compact" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Checkbox checked={true} size="compact" ariaLabel="No label" onChange={() => {}} />
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
                <Checkbox label="Disabled, unchecked" checked={false} disabled onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Checkbox label="Disabled, checked" checked={true} disabled onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Checkbox label="Disabled, indeterminate" indeterminate={true} checked={false} disabled onChange={() => {}} />
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
