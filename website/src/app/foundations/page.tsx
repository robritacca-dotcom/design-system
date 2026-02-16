"use client";

import Image from "next/image";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import TocCard from "../../components/TocCard/TocCard";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components" },
  { href: "/foundations", label: "Foundations", active: true },
];

const sidebarLinks = [
  { href: "/foundations", label: "About", active: true },
  { href: "/foundations/icons", label: "Icons" },
  { href: "/foundations/logos", label: "Logos" },
  { href: "/foundations/colour-primitives", label: "Primative colours" },
  { href: "/foundations/colour-mode", label: "Semantic colours" },
  { href: "/foundations/spatial", label: "Semantic spacing" },
  { href: "/foundations/typography", label: "Typography" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

export default function FoundationsPage() {
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
          <h1 className={`${styles.pageTitle} animate-in`}>Foundations</h1>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              The core building blocks: tokens, colors, spacing, and typography
            </p>
            <p className={styles.introBody}>
              Tokens are the underlying values the site runs on. They are used everywhere layout, color, and type appear. Instead of styling elements directly, everything references these shared variables so changes propagate consistently. The same token structure exists in Figma and in code, allowing updates to flow through without reinterpreting intent.
            </p>
          </div>

          <div className={`${styles.tocGrid} animate-in animate-delay-2`}>
            {/* Semantic Colours */}
            <TocCard href="/foundations/colour-mode" title="Semantic colours">
              <div className={`${styles.colourWheel} ${styles.colourWheelMode}`} />
            </TocCard>

            {/* Primative Colours */}
            <TocCard href="/foundations/colour-primitives" title="Primative colours">
              <div className={styles.colourWheel} />
            </TocCard>

            {/* Semantic Spacing */}
            <TocCard href="/foundations/spatial" title="Semantic spacing">
              <div className={`${styles.circlePreview} ${styles.circleGreen}`}>
                <div className={styles.spatialBox} />
                <span className={styles.spatialLabel}>XXL</span>
                <span className={styles.spatialValue}>60px</span>
              </div>
            </TocCard>

            {/* Typography */}
            <TocCard href="/foundations/typography" title="Typography">
              <div className={`${styles.circlePreview} ${styles.circleBlue}`}>
                <span className={styles.typographyLightA}>A</span>
                <span className={styles.typographyBoldA}>A</span>
              </div>
            </TocCard>

            {/* Icons */}
            <TocCard href="/foundations/icons" title="Icons">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "10px" }}>
                <span className="material-symbols-rounded" style={{ fontSize: "48px", color: "var(--color-text-secondary)" }}>
                  home
                </span>
                <span className="material-symbols-rounded icon-filled" style={{ fontSize: "48px", color: "var(--color-text-secondary)" }}>
                  home
                </span>
              </div>
            </TocCard>

            {/* Logos */}
            <TocCard href="/foundations/logos" title="Logos">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "10px" }}>
                <Image src="/rr.svg" alt="robr0 Logo" width={48} height={48} />
                <Image src="/rr.svg" alt="robr0 Logo" width={72} height={72} />
              </div>
            </TocCard>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
