"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Stat } from "@robr0/design-system/components/Stat/Stat";
import { COMPONENT_COUNT } from "@robr0/design-system/components/registry";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components/stat");

export default function StatPage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Stat</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-stat--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Headline metrics with labels and trend deltas
            </p>
            <p className={styles.introBody}>
              A Stat gives one number room to speak: display-weight numeral, quiet label,
              and an optional trend annotation. Compose several in a row for the metrics
              band that opens a case study.
            </p>
          </div>

          {/* Sizes */}
          <section className={styles.section}>
            <SectionTitle title="Sizes" />
            <div className={styles.variantRow}>
              <Stat value="~50M" label="Sessions served" />
              <Stat size="large" value="95%+" label="Modelling effort reduced" />
            </div>
          </section>

          {/* Trends */}
          <section className={styles.section}>
            <SectionTitle title="Trend deltas" />
            <div className={styles.variantRow}>
              <Stat value="~900%" label="Successful generations" trend="up" delta="after clash visualisation" />
              <Stat value="42%" label="Time to outcome" trend="down" delta="faster than baseline" />
              <Stat value={String(COMPONENT_COUNT)} label="Components in the library" trend="neutral" delta="and counting" />
            </div>
          </section>

          {/* Metrics band */}
          <section className={styles.section}>
            <SectionTitle title="Metrics band" />
            <p className={styles.introBody}>
              The intended composition: a row of stats leading a case study, replacing
              numbers buried in body copy. These are real outcomes from the Augmenta study.
            </p>
            <div className={styles.variantRow}>
              <Stat value="~900%" label="Successful generations" trend="up" delta="clash visualisation" />
              <Stat value="~400%" label="Solution analysis" trend="up" delta="same release" />
              <Stat value="42%" label="Faster outcomes" />
              <Stat value="2×" label="First-generation usability" />
            </div>
          </section>
        </main>
      </div>

    </>
  );
}
