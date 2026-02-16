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
            Selection control for binary or indeterminate choices, with animated check and minus indicators.
          </p>

          {/* States */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>States</h2>
            </div>
            <div className={styles.stateGrid}>
              <div className={styles.gridCorner} />
              <span className={styles.gridColHeader}>With label</span>
              <span className={styles.gridColHeader}>Without label</span>

              <span className={styles.gridRowHeader}>Unchecked</span>
              <div className={styles.gridCell}>
                <Checkbox label="Accept terms" checked={false} onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <Checkbox checked={false} ariaLabel="Unchecked" onChange={() => {}} />
              </div>

              <span className={styles.gridRowHeader}>Checked</span>
              <div className={styles.gridCell}>
                <Checkbox label="Accept terms" checked={true} onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <Checkbox checked={true} ariaLabel="Checked" onChange={() => {}} />
              </div>

              <span className={styles.gridRowHeader}>Indeterminate</span>
              <div className={styles.gridCell}>
                <Checkbox label="Select all" indeterminate={true} checked={false} onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <Checkbox indeterminate={true} checked={false} ariaLabel="Indeterminate" onChange={() => {}} />
              </div>

              <span className={styles.gridRowHeader}>Disabled, unchecked</span>
              <div className={styles.gridCell}>
                <Checkbox label="Disabled" checked={false} disabled onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <Checkbox checked={false} disabled ariaLabel="Disabled unchecked" onChange={() => {}} />
              </div>

              <span className={styles.gridRowHeader}>Disabled, checked</span>
              <div className={styles.gridCell}>
                <Checkbox label="Disabled" checked={true} disabled onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <Checkbox checked={true} disabled ariaLabel="Disabled checked" onChange={() => {}} />
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
