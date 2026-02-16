"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
nullimport PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/circular-button");

const states = [
  { label: "Default", value: "default" },
  { label: "Hover", value: "hover" },
  { label: "Active", value: "active" },
  { label: "Disabled", value: "disabled" },
] as const;

const icons = ["add", "close", "edit", "delete"];

export default function CircularButtonPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Circular button</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-circularbutton--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              An icon-only button in a circular shape
            </p>
            <p className={styles.introBody}>
              For actions where a label is not needed, like close, menu, or navigation arrows. Uses the same primary and secondary styles as Button. Good for toolbars and compact UI where space is tight.
            </p>
          </div>

          {/* Primary states */}
          <section className={styles.section}>
            <SectionTitle title="Primary" />
            <div className={styles.stateGrid}>
              <div className={styles.gridCorner} />
              {states.map((s) => (
                <span key={s.value} className={styles.gridColHeader}>{s.label}</span>
              ))}
              {icons.map((icon) => (
                <React.Fragment key={icon}>
                  <span className={styles.gridRowHeader}>{icon}</span>
                  {states.map((s) => (
                    <div key={s.value} className={styles.gridCell}>
                      <CircularButton icon={icon} priority="primary" state={s.value} ariaLabel={icon} />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Secondary states */}
          <section className={styles.section}>
            <SectionTitle title="Secondary" />
            <div className={styles.stateGrid}>
              <div className={styles.gridCorner} />
              {states.map((s) => (
                <span key={s.value} className={styles.gridColHeader}>{s.label}</span>
              ))}
              {icons.map((icon) => (
                <React.Fragment key={icon}>
                  <span className={styles.gridRowHeader}>{icon}</span>
                  {states.map((s) => (
                    <div key={s.value} className={styles.gridCell}>
                      <CircularButton icon={icon} priority="secondary" state={s.value} ariaLabel={icon} />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <SectionTitle title="Compact" />
            <div className={styles.variantRow}>
              <CircularButton icon="add" priority="primary" size="compact" ariaLabel="Add" />
              <CircularButton icon="close" priority="primary" size="compact" ariaLabel="Close" />
              <CircularButton icon="edit" priority="secondary" size="compact" ariaLabel="Edit" />
              <CircularButton icon="more_vert" priority="secondary" size="compact" ariaLabel="More" />
              <CircularButton icon="search" priority="secondary" size="compact" ariaLabel="Search" />
              <CircularButton icon="settings" priority="secondary" size="compact" ariaLabel="Settings" />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
