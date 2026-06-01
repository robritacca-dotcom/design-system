"use client";

import Image from "next/image";
import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import TocCard from "../../components/TocCard/TocCard";
import PageLinks from "../../components/PageLinks/PageLinks";
import { getSidebarLinks, foundationsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(foundationsSidebarLinks, "/foundations");

export default function FoundationsPage() {
  return (
    <>

      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Foundations</h1>
            <PageLinks figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=244-3125" storybookPath="/?path=/docs/foundations-tokens--docs" />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              The shared values behind every component
            </p>
            <p className={styles.introBody}>
              Foundations are the colours, spacing, and type styles that all components are built on. Every value here starts as a Figma variable, gets exported as a CSS token, and is referenced by components rather than hard-coded. That means updating a colour or spacing value in one place updates it everywhere it is used.
            </p>
          </div>

          <div className={`${styles.tocGrid} animate-in animate-delay-2`}>
            {/* Icons */}
            <TocCard href="/foundations/icons" title="Icons">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "10px" }}>
                <span className="material-symbols-rounded" style={{ fontSize: "48px", color: "var(--color-text-secondary)" }}>
                  article
                </span>
                <span className="material-symbols-rounded" style={{ fontSize: "48px", color: "var(--color-text-secondary)" }}>
                  apps
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

            {/* Primitive Colours */}
            <TocCard href="/foundations/colour-primitives" title="Primitive colours">
              <div className={styles.colourWheel} />
            </TocCard>

            {/* Semantic Colours */}
            <TocCard href="/foundations/colour-mode" title="Semantic colours">
              <div className={`${styles.colourWheel} ${styles.colourWheelMode}`} />
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
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
