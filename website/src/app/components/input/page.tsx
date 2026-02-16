"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Input } from "@design-system/components/Input/Input";
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
  { href: "/components/dropdown", label: "Dropdown" },
  { href: "/components/input", label: "Input", active: true },
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

export default function InputPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Input</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-input--docs"
            />
          </div>

          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Single-line text field with label, placeholder, icon support, and validation states for form data entry.
          </p>

          {/* Default variants */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Variants</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <Input label="Default" placeholder="Enter text..." onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Input label="With value" value="rob@example.com" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Input label="Required" placeholder="Enter name" required onChange={() => {}} />
              </div>
            </div>
          </section>

          {/* With icons */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>With icons</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <Input label="Icon left" placeholder="Search..." iconLeft="search" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Input label="Icon right" placeholder="Email" iconRight="mail" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Input label="Both icons" placeholder="Search..." iconLeft="search" iconRight="tune" onChange={() => {}} />
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
                <Input label="Helper text" placeholder="Enter password" helperText="Must be at least 8 characters" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Input label="Error" value="invalid" error helperText="Please enter a valid value" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Input label="Disabled" value="Disabled input" disabled onChange={() => {}} />
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
