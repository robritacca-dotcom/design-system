"use client";

import Image from "next/image";
import Header from "../components/Header/Header";
import BlurBackground from "../components/BlurBackground/BlurBackground";
import Footer from "../components/Footer/Footer";
import TocCard from "../components/TocCard/TocCard";
import { Button } from "@design-system/components/Button/Button";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components" },
  { href: "/foundations", label: "Foundations" },
];

export default function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <BlurBackground fullHeight />

      <Header navLinks={navLinks} />

      <div className={styles.homeContainer} id="main-content">
        {/* Hero */}
        <div className={styles.homeHeading}>
          <div className={`${styles.homeNameTitle} animate-in animate-delay-1`}>
            <h1 className={styles.homeTitle}>Robert Ritacca</h1>
            <div className={styles.homeIntro}>
              <span className={styles.introText}>Principal Product Designer at</span>
              <Image src="/logos/Intuit.svg" alt="Intuit" width={80} height={28} className={styles.introLogo} />
              <span className={styles.introCompany}>Intuit</span>
            </div>
          </div>

          {/* Cards */}
          <div className={`${styles.homeCards} animate-in animate-delay-2`}>
            <TocCard href="/about" title="About me">
              <div className={styles.circlePreview}>
                <Image
                  src="/robr0-img.png"
                  alt="Robert Ritacca"
                  width={184}
                  height={184}
                  className={styles.profilePhoto}
                />
              </div>
            </TocCard>

            <TocCard href="/components" title="Components">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <Button label="Button" priority="primary" state="default" />
              </div>
            </TocCard>

            <TocCard href="/foundations" title="Foundations">
              <div className={styles.colourWheel} />
            </TocCard>
          </div>
        </div>

        {/* About this site */}
        <section className={`${styles.aboutSection} animate-in animate-delay-3`}>
          <h2 className={styles.aboutTitle}>How this site comes together</h2>
          <p className={styles.aboutText}>
            This site is built directly from its own design system. Every colour, spacing value, and typographic style
            you see is a live token — the same variables defined in Figma flow through CSS custom properties into
            React components and onto this page. There is no separate design spec to interpret; the code is the spec.
          </p>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutGridItem}>
              <span className={styles.aboutGridTitle}>Figma to code</span>
              <span className={styles.aboutGridDescription}>
                Primitives and semantic tokens are defined in Figma variables, then mirrored as CSS custom properties.
                Changes in Figma propagate directly to the codebase.
              </span>
            </div>
            <div className={styles.aboutGridItem}>
              <span className={styles.aboutGridTitle}>Token layers</span>
              <span className={styles.aboutGridDescription}>
                Raw primitives sit on :root. Semantic tokens map those primitives to purpose — text, background,
                action, status — and swap between light and dark themes via a data attribute.
              </span>
            </div>
            <div className={styles.aboutGridItem}>
              <span className={styles.aboutGridTitle}>Components</span>
              <span className={styles.aboutGridDescription}>
                Every component references semantic tokens, never raw values. Buttons, cards, navigation,
                and toggles are all theme-aware and composable out of the box.
              </span>
            </div>
            <div className={styles.aboutGridItem}>
              <span className={styles.aboutGridTitle}>AI-assisted development</span>
              <span className={styles.aboutGridDescription}>
                Built with Claude Code using the Figma MCP integration. Design context is read directly from Figma
                and translated into implementation — no manual handoff.
              </span>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
