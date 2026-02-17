"use client";

import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Slider } from "@design-system/components/Slider/Slider";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/slider");

export default function SliderPage() {
  const [value1, setValue1] = useState(60);
  const [value2, setValue2] = useState(35);

  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Slider</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-slider--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Select a value from a range
            </p>
            <p className={styles.introBody}>
              A draggable input that lets users pick a numeric value within a defined range. Supports default and compact sizes with a filled track to show the current position.
            </p>
          </div>

          {/* Default */}
          <section className={styles.section}>
            <SectionTitle title="Default" />
            <div className={styles.variantStack} style={{ maxWidth: "400px" }}>
              <Slider value={value1} onChange={setValue1} />
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <SectionTitle title="Compact" />
            <div className={styles.variantStack} style={{ maxWidth: "400px" }}>
              <Slider value={value2} onChange={setValue2} size="compact" />
            </div>
          </section>

          {/* Disabled */}
          <section className={styles.section}>
            <SectionTitle title="Disabled" />
            <div className={styles.variantStack} style={{ maxWidth: "400px" }}>
              <Slider value={50} disabled />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
