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
  { href: "#", label: "Work", disabled: true },
  { href: "/design-system", label: "robr0 DS", active: true },
];

const sidebarLinks = [
  { href: "/design-system", label: "About", active: true },
  { href: "/design-system/buttons", label: "Buttons" },
  { href: "/design-system/icons", label: "Icons" },
  { href: "/design-system/logos", label: "Logos" },
  { href: "/design-system/navigation", label: "Navigation" },
  { href: "/design-system/colour-primitives", label: "Primative colours" },
  { href: "/design-system/colour-mode", label: "Semantic colours" },
  { href: "/design-system/spatial", label: "Semantic spacing" },
  { href: "/design-system/typography", label: "Typography" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

export default function DesignSystemPage() {
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
          <h1 className={`${styles.pageTitle} animate-in`}>robr0DS</h1>

          {/* Page Description */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            This site is rendered directly from its own design system, exposing
            the tokens and structure used to build the UI itself.
          </p>

          {/* Components Section */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Components</h2>
            </div>
            <p className={styles.sectionDescription}>
              Components are assembled from tokens and shared layout structures.
              When a pattern appears more than once, it becomes a reusable
              component instead of a custom layout. Each component reflects how
              it is actually implemented, including structure, constraints, and
              states. Layout primitives handle structure, while components handle
              interaction and composition.
            </p>

            <div className={styles.tocGrid}>
              {/* Button */}
              <TocCard href="/design-system/buttons" title="Button">
                <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                  <Button label="Button" priority="primary" state="default" />
                </div>
              </TocCard>

              {/* Button group */}
              <TocCard href="/design-system/buttons" title="Button group">
                <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "10px" }}>
                  <Button label="Active" priority="secondary" state="active" />
                  <Button label="Inactive" priority="secondary" state="default" />
                </div>
              </TocCard>

              {/* Card */}
              <TocCard href="/design-system/navigation" title="Card">
                <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                  <div className={styles.cardPreview} />
                </div>
              </TocCard>

              {/* Nav */}
              <TocCard href="/design-system/navigation" title="Nav">
                <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "20px" }}>
                  <Image src="/rr.svg" alt="robr0" width={24} height={24} />
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.16px" }}>
                    robr0
                  </span>
                </div>
              </TocCard>

              {/* Toggle switch */}
              <TocCard href="/design-system/buttons" title="Toggle switch">
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
          </section>

          {/* Foundations Section */}
          <section className={`${styles.section} animate-in animate-delay-3`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Foundations</h2>
            </div>
            <p className={styles.sectionDescription}>
              Tokens are the underlying values the site runs on. They are used
              everywhere layout, color, and type appear. Instead of styling
              elements directly, everything references these shared variables so
              changes propagate consistently. The same token structure exists in
              Figma and in code, allowing updates to flow through without
              reinterpreting intent.
            </p>

            <div className={styles.tocGrid}>
              {/* Semantic Colours */}
              <TocCard href="/design-system/colour-mode" title="Semantic colours">
                <div className={`${styles.colourWheel} ${styles.colourWheelMode}`} />
              </TocCard>

              {/* Primative Colours */}
              <TocCard href="/design-system/colour-primitives" title="Primative colours">
                <div className={styles.colourWheel} />
              </TocCard>

              {/* Semantic Spacing */}
              <TocCard href="/design-system/spatial" title="Semantic spacing">
                <div className={`${styles.circlePreview} ${styles.circleGreen}`}>
                  <div className={styles.spatialBox} />
                  <span className={styles.spatialLabel}>XXL</span>
                  <span className={styles.spatialValue}>60px</span>
                </div>
              </TocCard>

              {/* Typography */}
              <TocCard href="/design-system/typography" title="Typography">
                <div className={`${styles.circlePreview} ${styles.circleBlue}`}>
                  <span className={styles.typographyLightA}>A</span>
                  <span className={styles.typographyBoldA}>A</span>
                </div>
              </TocCard>

              {/* Icons */}
              <TocCard href="/design-system/icons" title="Icons">
                <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "10px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "var(--color-text-secondary)" }}>
                    home
                  </span>
                  <span className="material-symbols-outlined icon-filled" style={{ fontSize: "48px", color: "var(--color-text-secondary)" }}>
                    home
                  </span>
                </div>
              </TocCard>

              {/* Logos */}
              <TocCard href="/design-system/logos" title="Logos">
                <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "10px" }}>
                  <Image src="/rr.svg" alt="robr0 Logo" width={48} height={48} />
                  <Image src="/rr.svg" alt="robr0 Logo" width={72} height={72} />
                </div>
              </TocCard>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
