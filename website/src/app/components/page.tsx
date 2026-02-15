"use client";

import Image from "next/image";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import TocCard from "../../components/TocCard/TocCard";
import { Button } from "@design-system/components/Button/Button";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components", active: true },
  { href: "/foundations", label: "Foundations" },
];

const sidebarLinks = [
  { href: "/components", label: "About", active: true },
  { href: "/components/button", label: "Button" },
  { href: "/components/button-group", label: "Button group" },
  { href: "/components/card", label: "Card" },
  { href: "/components/nav", label: "Nav" },
  { href: "/components/toggle-switch", label: "Toggle switch" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

export default function ComponentsPage() {
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
          <h1 className={`${styles.pageTitle} animate-in`}>Components</h1>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Reusable UI elements built from design tokens
            </p>
            <p className={styles.introBody}>
              Components are assembled from tokens and shared layout structures. When a pattern appears more than once, it becomes a reusable component instead of a custom layout. Each component reflects how it is actually implemented, including structure, constraints, and states. Layout primitives handle structure, while components handle interaction and composition.
            </p>
          </div>

          <div className={`${styles.tocGrid} animate-in animate-delay-2`}>
            {/* Button */}
            <TocCard href="/components/button" title="Button">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <Button label="Button" priority="primary" state="default" />
              </div>
            </TocCard>

            {/* Button group */}
            <TocCard href="/components/button-group" title="Button group">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "10px" }}>
                <Button label="Active" priority="secondary" state="active" />
                <Button label="Inactive" priority="secondary" state="default" />
              </div>
            </TocCard>

            {/* Card */}
            <TocCard href="/components/card" title="Card">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <div className={styles.cardPreview} />
              </div>
            </TocCard>

            {/* Nav */}
            <TocCard href="/components/nav" title="Nav">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "20px" }}>
                <Image src="/rr.svg" alt="robr0" width={24} height={24} />
                <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.16px" }}>
                  robr0
                </span>
              </div>
            </TocCard>

            {/* Toggle switch */}
            <TocCard href="/components/toggle-switch" title="Toggle switch">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <div className={styles.togglePreview}>
                  <div className={styles.toggleSocket}>
                    <div className={styles.toggleThumb}>
                      <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "var(--color-action-primary-bg)" }}>
                        check
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TocCard>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
