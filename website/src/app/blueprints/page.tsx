"use client";

import MegaNav from "../../components/MegaNav/MegaNav";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import TocCard from "../../components/TocCard/TocCard";
import { getSidebarLinks, blueprintsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(blueprintsSidebarLinks, "/blueprints");

export default function BlueprintsPage() {
  return (
    <>
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Blueprints</h1>
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              The spec files that define this system
            </p>
            <p className={styles.introBody}>
              Blueprints are the markdown documents that capture every design decision and codebase convention in one place. Hand these to any builder — human or AI — and they can extend the system without guessing.
            </p>
          </div>

          <div className={`${styles.tocGrid} animate-in animate-delay-2`}>
            <TocCard href="/blueprints/design" title="Design MD">
              <div className={styles.circlePreview}>
                <span className="material-symbols-rounded" style={{ fontSize: "48px", color: "var(--color-action-primary-bg)" }}>
                  palette
                </span>
                <span className="material-symbols-rounded" style={{ fontSize: "36px", color: "var(--color-text-tertiary)" }}>
                  format_size
                </span>
              </div>
            </TocCard>

            <TocCard href="/blueprints/claude" title="Claude MD">
              <div className={styles.circlePreview}>
                <span className="material-symbols-rounded" style={{ fontSize: "48px", color: "var(--color-action-primary-bg)" }}>
                  terminal
                </span>
                <span className="material-symbols-rounded" style={{ fontSize: "36px", color: "var(--color-text-tertiary)" }}>
                  construction
                </span>
              </div>
            </TocCard>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
