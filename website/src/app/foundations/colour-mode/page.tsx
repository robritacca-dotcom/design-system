"use client";

import Image from "next/image";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components" },
  { href: "/foundations", label: "Foundations", active: true },
];

const sidebarLinks = [
  { href: "/foundations", label: "About" },
  { href: "/foundations/icons", label: "Icons" },
  { href: "/foundations/logos", label: "Logos" },
  { href: "/foundations/colour-primitives", label: "Primative colours" },
  { href: "/foundations/colour-mode", label: "Semantic colours", active: true },
  { href: "/foundations/spatial", label: "Semantic spacing" },
  { href: "/foundations/typography", label: "Typography" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

/* ============================================
   COLOUR DATA
   ============================================ */

interface ColourSwatch {
  label: string;
  variable: string;
  primitive?: string;
}

const primaryUiColours: ColourSwatch[] = [
  { label: "Primary", variable: "var(--color-core-ui-primary)", primitive: "teal-07" },
  { label: "Secondary", variable: "var(--color-core-ui-secondary)", primitive: "teal-08" },
];

const accentColours: ColourSwatch[] = [
  { label: "Red", variable: "var(--color-core-accent-red)" },
  { label: "Orange", variable: "var(--color-core-accent-orange)" },
  { label: "Yellow", variable: "var(--color-core-accent-yellow)" },
  { label: "Purple", variable: "var(--color-core-accent-purple)" },
  { label: "Blue", variable: "var(--color-core-accent-blue)" },
  { label: "Green", variable: "var(--color-core-accent-green)" },
];

const pageColours: ColourSwatch[] = [
  { label: "Primary", variable: "var(--color-bg-page-primary)" },
  { label: "Inverse", variable: "var(--color-bg-page-inverse)" },
];

const containerColours: ColourSwatch[] = [
  { label: "Primary", variable: "var(--color-bg-container-primary)" },
  { label: "Secondary", variable: "var(--color-bg-container-secondary)" },
  { label: "Tertiary", variable: "var(--color-bg-container-tertiary)" },
  { label: "Inverse", variable: "var(--color-bg-container-inverse)" },
];

const textColours: ColourSwatch[] = [
  { label: "Primary", variable: "var(--color-text-primary)" },
  { label: "Secondary", variable: "var(--color-text-secondary)" },
  { label: "Tertiary", variable: "var(--color-text-tertiary)" },
  { label: "Inverse", variable: "var(--color-text-inverse)" },
];

const actionBgColours: ColourSwatch[] = [
  { label: "Default", variable: "var(--color-action-primary-bg)" },
  { label: "Hover", variable: "var(--color-action-primary-bg-hover)" },
  { label: "Active", variable: "var(--color-action-primary-bg-active)" },
];

interface StatusSwatch {
  label: string;
  bgVariable: string;
  borderVariable: string;
}

const statusColours: StatusSwatch[] = [
  { label: "Positive", bgVariable: "var(--color-status-positive-bg)", borderVariable: "var(--color-status-positive-border)" },
  { label: "Warning", bgVariable: "var(--color-status-warning-bg)", borderVariable: "var(--color-status-warning-border)" },
  { label: "Error", bgVariable: "var(--color-status-error-bg)", borderVariable: "var(--color-status-error-border)" },
  { label: "Info", bgVariable: "var(--color-status-info-bg)", borderVariable: "var(--color-status-info-border)" },
  { label: "Neutral", bgVariable: "var(--color-status-neutral-bg)", borderVariable: "var(--color-status-neutral-border)" },
];

/* ============================================
   COLOUR SWATCH COMPONENT
   ============================================ */

function ColourCard({ label, variable, primitive }: ColourSwatch) {
  return (
    <div className={styles.colourCard} style={{ background: variable }}>
      <span className={styles.colourLabel}>{label}</span>
      <div className={styles.colourValues}>
        {primitive && (
          <span className={styles.colourPrimitive}>
            <span className={styles.colourValueLabel}>Primative</span>
            <span className={styles.colourValueData}>--{primitive}</span>
          </span>
        )}
        <span className={styles.colourValueRow}>
          <span className={styles.colourValueLabel}>Var</span>
          <span className={styles.colourValueData}>{variable.replace("var(", "").replace(")", "")}</span>
        </span>
      </div>
    </div>
  );
}

function StatusCard({ label, bgVariable, borderVariable }: StatusSwatch) {
  return (
    <div
      className={styles.colourCard}
      style={{
        background: bgVariable,
        borderLeft: `3px solid ${borderVariable}`,
      }}
    >
      <span className={styles.statusLabel}>{label}</span>
      <div className={styles.colourValues}>
        <span className={styles.colourValueRow}>
          <span className={styles.colourValueLabel}>BG</span>
          <span className={styles.colourValueData}>{bgVariable.replace("var(", "").replace(")", "")}</span>
        </span>
        <span className={styles.colourValueRow}>
          <span className={styles.colourValueLabel}>Border</span>
          <span className={styles.colourValueData}>{borderVariable.replace("var(", "").replace(")", "")}</span>
        </span>
      </div>
    </div>
  );
}

/* ============================================
   PAGE
   ============================================ */

export default function SemanticColoursPage() {
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
          <h1 className={`${styles.pageTitle} animate-in`}>Semantic colours</h1>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Maps semantic color roles to different primitive values per mode, enabling light and dark themes without changing component logic.
            </p>
          </div>

          {/* Reference callouts */}
          <div className={`${styles.referenceRow} animate-in animate-delay-1`}>
            <div className={styles.referenceCard}>
              <Image src="/logos/Figma.svg" alt="Figma" width={20} height={20} />
              <span className={styles.referenceText}>Colour mode variables collection</span>
            </div>
            <div className={styles.referenceCard}>
              <span className={`material-symbols-outlined ${styles.referenceIcon}`}>code</span>
              <span className={styles.referenceText}>tokens-light.css / tokens-dark.css</span>
            </div>
          </div>

          {/* Primary UI Colours */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Primary UI Colours</h2>
            </div>
            <div className={styles.swatchGrid}>
              {primaryUiColours.map((c) => (
                <ColourCard key={c.label} {...c} />
              ))}
            </div>
          </section>

          {/* Accent Colours */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Accent Colours</h2>
            </div>
            <div className={styles.swatchGrid}>
              {accentColours.map((c) => (
                <ColourCard key={c.label} {...c} />
              ))}
            </div>
          </section>

          {/* Page */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Page</h2>
            </div>
            <div className={styles.swatchGrid}>
              {pageColours.map((c) => (
                <ColourCard key={c.label} {...c} />
              ))}
            </div>
          </section>

          {/* Container */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Container</h2>
            </div>
            <div className={styles.swatchGrid}>
              {containerColours.map((c) => (
                <ColourCard key={c.label} {...c} />
              ))}
            </div>
          </section>

          {/* Text */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Text</h2>
            </div>
            <div className={styles.swatchGrid}>
              {textColours.map((c) => (
                <ColourCard key={c.label} {...c} />
              ))}
            </div>
          </section>

          {/* Action background */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Action background</h2>
            </div>
            <div className={styles.swatchGrid}>
              {actionBgColours.map((c) => (
                <ColourCard key={c.label} {...c} />
              ))}
            </div>
          </section>

          {/* Status */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Status</h2>
            </div>
            <div className={styles.swatchGrid}>
              {statusColours.map((c) => (
                <StatusCard key={c.label} {...c} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
