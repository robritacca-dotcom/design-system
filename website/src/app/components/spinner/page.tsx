"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Spinner } from "@design-system/components/Spinner/Spinner";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/spinner");

export default function SpinnerPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Spinner</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-spinner--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Loading in progress
            </p>
            <p className={styles.introBody}>
              An animated circular indicator that communicates an ongoing process. Available in three sizes and two colour variants to suit different contexts.
            </p>
          </div>

          {/* Sizes */}
          <section className={styles.section}>
            <SectionTitle title="Sizes" />
            <div className={styles.variantRow}>
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          </section>

          {/* Variants */}
          <section className={styles.section}>
            <SectionTitle title="Variants" />
            <div className={styles.variantRow}>
              <Spinner variant="primary" size="lg" />
              <Spinner variant="neutral" size="lg" />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
