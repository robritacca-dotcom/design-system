"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { RadioButton, RadioGroup } from "@design-system/components/RadioButton/RadioButton";
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
  { href: "/components/input", label: "Input" },
  { href: "/components/navigation", label: "Navigation" },
  { href: "/components/radio-button", label: "Radio button", active: true },
  { href: "/components/tabs", label: "Tabs" },
  { href: "/components/textarea", label: "Textarea" },
  { href: "/components/toggle-switch", label: "Toggle switch" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

export default function RadioButtonPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Radio button</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-radiobutton--docs"
            />
          </div>

          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Single-select control with animated dot indicator, available as individual buttons or grouped with vertical and horizontal layouts.
          </p>

          {/* Single states */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>States</h2>
            </div>
            <div className={styles.stateGrid}>
              <div className={styles.gridCorner} />
              <span className={styles.gridColHeader}>With label</span>
              <span className={styles.gridColHeader}>Without label</span>

              <span className={styles.gridRowHeader}>Unselected</span>
              <div className={styles.gridCell}>
                <RadioButton label="Option A" checked={false} onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <RadioButton checked={false} ariaLabel="Unselected" onChange={() => {}} />
              </div>

              <span className={styles.gridRowHeader}>Selected</span>
              <div className={styles.gridCell}>
                <RadioButton label="Option A" checked={true} onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <RadioButton checked={true} ariaLabel="Selected" onChange={() => {}} />
              </div>

              <span className={styles.gridRowHeader}>Disabled, unselected</span>
              <div className={styles.gridCell}>
                <RadioButton label="Disabled" checked={false} disabled onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <RadioButton checked={false} disabled ariaLabel="Disabled" onChange={() => {}} />
              </div>

              <span className={styles.gridRowHeader}>Disabled, selected</span>
              <div className={styles.gridCell}>
                <RadioButton label="Disabled" checked={true} disabled onChange={() => {}} />
              </div>
              <div className={styles.gridCell}>
                <RadioButton checked={true} disabled ariaLabel="Disabled selected" onChange={() => {}} />
              </div>
            </div>
          </section>

          {/* Group layouts */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Radio group</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <RadioGroup
                  label="Vertical"
                  name="demo-vertical"
                  value="medium"
                  options={[
                    { label: "Small", value: "small" },
                    { label: "Medium", value: "medium" },
                    { label: "Large", value: "large" },
                  ]}
                  direction="vertical"
                  onChange={() => {}}
                />
              </div>
              <div className={styles.variantItem}>
                <RadioGroup
                  label="Horizontal"
                  name="demo-horizontal"
                  value="teal"
                  options={[
                    { label: "Red", value: "red" },
                    { label: "Teal", value: "teal" },
                    { label: "Purple", value: "purple" },
                  ]}
                  direction="horizontal"
                  onChange={() => {}}
                />
              </div>
              <div className={styles.variantItem}>
                <RadioGroup
                  label="With disabled option"
                  name="demo-disabled"
                  value="pro"
                  options={[
                    { label: "Free", value: "free" },
                    { label: "Pro", value: "pro" },
                    { label: "Enterprise", value: "enterprise", disabled: true },
                  ]}
                  direction="vertical"
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
