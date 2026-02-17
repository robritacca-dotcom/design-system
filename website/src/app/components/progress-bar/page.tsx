"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { ProgressBar } from "@design-system/components/ProgressBar/ProgressBar";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/progress-bar");

export default function ProgressBarPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Progress bar</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-progressbar--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Task completion at a glance
            </p>
            <p className={styles.introBody}>
              A horizontal bar that fills to indicate how far through a process or task the user is. Supports status colour variants and an optional percentage label.
            </p>
          </div>

          {/* Variants */}
          <section className={styles.section}>
            <SectionTitle title="Variants" />
            <div className={styles.variantStack} style={{ maxWidth: "400px" }}>
              <ProgressBar variant="info" value={80} showLabel />
              <ProgressBar variant="positive" value={100} showLabel />
              <ProgressBar variant="warning" value={55} showLabel />
              <ProgressBar variant="error" value={30} showLabel />
              <ProgressBar variant="neutral" value={45} showLabel />
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <SectionTitle title="Compact" />
            <div className={styles.variantStack} style={{ maxWidth: "400px" }}>
              <ProgressBar variant="info" value={65} size="compact" />
              <ProgressBar variant="positive" value={90} size="compact" />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
