"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Dropdown } from "@design-system/components/Dropdown/Dropdown";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const colourOptions = [
  { label: "Red", value: "red" },
  { label: "Teal", value: "teal" },
  { label: "Purple", value: "purple" },
  { label: "Yellow", value: "yellow" },
  { label: "Green", value: "green" },
];

const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/dropdown");

export default function DropdownPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Dropdown</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-dropdown--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              A select menu for choosing one option from a list
            </p>
            <p className={styles.introBody}>
              Opens a styled dropdown panel with keyboard navigation and a check mark on the selected item. Use this instead of a native select when you need consistent styling across browsers.
            </p>
          </div>

          {/* Default */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Default</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <Dropdown label="Placeholder" placeholder="Select a colour" options={colourOptions} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Dropdown label="With value" value="teal" options={colourOptions} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Dropdown label="Required" placeholder="Select..." required options={colourOptions} onChange={() => {}} />
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
                <Dropdown label="Placeholder" placeholder="Select a colour" size="compact" options={colourOptions} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Dropdown label="With value" value="teal" size="compact" options={colourOptions} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Dropdown label="Required" placeholder="Select..." required size="compact" options={colourOptions} onChange={() => {}} />
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
                <Dropdown label="Helper text" placeholder="Choose..." helperText="This sets the primary colour" options={colourOptions} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Dropdown label="Error" placeholder="Select..." error helperText="Please select an option" options={colourOptions} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Dropdown label="Disabled" value="teal" disabled options={colourOptions} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Dropdown
                  label="Disabled option"
                  value="pro"
                  options={[
                    { label: "Free", value: "free" },
                    { label: "Pro", value: "pro" },
                    { label: "Enterprise (coming soon)", value: "enterprise", disabled: true },
                  ]}
                  onChange={() => {}}
                />
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
