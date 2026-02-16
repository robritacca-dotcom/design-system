"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Dropdown } from "@design-system/components/Dropdown/Dropdown";
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
  { href: "/components/checkbox", label: "Checkbox" },
  { href: "/components/dropdown", label: "Dropdown", active: true },
  { href: "/components/input", label: "Input" },
  { href: "/components/navigation", label: "Navigation" },
  { href: "/components/radio-button", label: "Radio button" },
  { href: "/components/tabs", label: "Tabs" },
  { href: "/components/textarea", label: "Textarea" },
  { href: "/components/toggle-switch", label: "Toggle switch" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

const colourOptions = [
  { label: "Red", value: "red" },
  { label: "Teal", value: "teal" },
  { label: "Purple", value: "purple" },
  { label: "Yellow", value: "yellow" },
  { label: "Green", value: "green" },
];

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

          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Custom select control with keyboard navigation, chevron indicator, and support for disabled options.
          </p>

          {/* Variants */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Variants</h2>
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
            </div>
          </section>

          {/* Disabled option */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>With disabled option</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <Dropdown
                  label="Plan"
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
