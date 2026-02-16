"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Card } from "@design-system/components/Card/Card";
import { Button } from "@design-system/components/Button/Button";
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
  { href: "/components", label: "About" },
  { href: "/components/button", label: "Button" },
  { href: "/components/button-group", label: "Button group" },
  { href: "/components/card", label: "Card", active: true },
  { href: "/components/navigation", label: "Navigation" },
  { href: "/components/toggle-switch", label: "Toggle switch" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

/* ============================================
   PAGE
   ============================================ */

export default function CardPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Card</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-card--docs"
            />
          </div>

          {/* Intro */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Flexible preview containers used for table-of-contents navigation and content showcases, with optional interactive hover states.
          </p>

          {/* Default */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Default</h2>
            </div>
            <div className={styles.cardGrid}>
              <Card title="Button">
                <Button
                  label="Button"
                  priority="primary"
                  iconRight="arrow_forward"
                />
              </Card>
              <Card title="Toggle switch">
                <ToggleSwitch checked={true} label="Dark Mode" onChange={() => {}} />
              </Card>
              <Card title="Navigation">
                <span className={styles.cardPlaceholder}>Nav preview</span>
              </Card>
            </div>
          </section>

          {/* Interactive */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Interactive</h2>
            </div>
            <div className={styles.cardGrid}>
              <Card title="Button" interactive>
                <Button
                  label="Button"
                  priority="primary"
                  iconRight="arrow_forward"
                />
              </Card>
              <Card title="Toggle switch" interactive>
                <ToggleSwitch checked={false} label="Light Mode" onChange={() => {}} />
              </Card>
              <Card title="Card" interactive>
                <span className={styles.cardPlaceholder}>Card preview</span>
              </Card>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
