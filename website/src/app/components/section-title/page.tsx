"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components/section-title");

export default function SectionTitlePage() {
  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Section title</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-sectiontitle--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Divide page content into labelled sections
            </p>
            <p className={styles.introBody}>
              Pairs a heading with a full-width divider line to separate groups of related content. An optional trailing slot can display counts, badges, or other metadata alongside the heading.
            </p>
          </div>

          {/* Default */}
          <section className={styles.section}>
            <SectionTitle title="Default" />
            <div className={styles.variantStack}>
              <SectionTitle title="Navigation icons" />
              <SectionTitle title="Primary, compact" />
              <SectionTitle title="States" />
            </div>
          </section>

          {/* With trailing content */}
          <section className={styles.section}>
            <SectionTitle title="With trailing content" />
            <div className={styles.variantStack}>
              <SectionTitle title="Navigation icons" trailing="24" />
              <SectionTitle title="Status variants" trailing="6" />
              <SectionTitle title="Primary, compact" trailing="New" />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
