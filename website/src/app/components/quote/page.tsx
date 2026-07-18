"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Quote } from "@design-system/components/Quote/Quote";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components/quote");

export default function QuotePage() {
  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Quote</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-quote--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Blockquotes and pull-quotes with attribution
            </p>
            <p className={styles.introBody}>
              Two registers: the default inline blockquote sits inside body copy with a
              quiet left rule; the pull variant borrows display type — weight 300 at
              sub-display scale — so the sentence itself is the emphasis.
            </p>
          </div>

          {/* Default */}
          <section className={styles.section}>
            <SectionTitle title="Default — inline blockquote" />
            <Quote>
              Large-scale systems are not primarily UI problems. They are coordination
              problems.
            </Quote>
          </section>

          {/* With attribution */}
          <section className={styles.section}>
            <SectionTitle title="With attribution" />
            <Quote
              attribution="Rob Ritacca"
              detail="Career Profile case study"
            >
              The challenge is not creating beautiful screens. The challenge is creating
              frameworks that allow hundreds of people and teams to build coherently over
              time.
            </Quote>
          </section>

          {/* Pull */}
          <section className={styles.section}>
            <SectionTitle title="Pull-quote" />
            <Quote variant="pull">
              Tokens flow from Figma to production without a handoff meeting.
            </Quote>
          </section>

          {/* Pull with attribution */}
          <section className={styles.section}>
            <SectionTitle title="Pull-quote with attribution" />
            <Quote variant="pull" attribution="Rob Ritacca" detail="Writing, 2026">
              Design still derisks development.
            </Quote>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
