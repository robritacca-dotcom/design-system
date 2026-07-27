"use client";

import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import TocCard from "../../components/TocCard/TocCard";
import { getSidebarLinks, customizationSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(customizationSidebarLinks, "/customization");

export default function CustomizationIndexPage() {
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
            <h1 className={styles.pageTitle}>Customization</h1>
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              The system ships as a package — and every token is a lever
            </p>
            <p className={styles.introBody}>
              This site runs on <code>@robr0/design-system</code>, the same npm package
              anyone can install. There is no theme API to learn: customization is CSS
              custom properties. Re-theme it live in the playground, then take the
              generated CSS and the install steps with you.
            </p>
          </div>

          <div className={`${styles.tocGrid} animate-in animate-delay-2`}>
            {/* Playground */}
            <TocCard href="/customization/playground" title="Playground">
              <div className={`${styles.circlePreview} ${styles.circleNeutral}`}>
                <div className={styles.previewSwatches}>
                  <span className={`${styles.previewDot} ${styles.dotTeal}`} />
                  <span className={`${styles.previewDot} ${styles.dotCoral}`} />
                  <span className={`${styles.previewDot} ${styles.dotViolet}`} />
                  <span className={`${styles.previewDot} ${styles.dotGold}`} />
                </div>
                <span className={styles.previewPill}>Primary</span>
              </div>
            </TocCard>

            {/* Get started */}
            <TocCard href="/customization/get-started" title="Get started">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <span className="material-symbols-rounded" style={{ color: "var(--color-text-secondary)" }}>
                  terminal
                </span>
                <code className={styles.previewInstall}>npm install</code>
              </div>
            </TocCard>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
