"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Alert } from "@design-system/components/Alert/Alert";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/alert");

export default function AlertPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Alert</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-alert--docs"
            />
          </div>

          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Contextual feedback with status variants, optional dismiss button, and compact sizing for inline notifications.
          </p>

          {/* Variants */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Variants</h2>
            </div>
            <div className={styles.variantStack}>
              <Alert variant="info" title="Information" description="This is an informational message with helpful context." />
              <Alert variant="positive" title="Success" description="Your changes have been saved successfully." />
              <Alert variant="warning" title="Warning" description="This action may have unintended consequences." />
              <Alert variant="error" title="Error" description="Something went wrong. Please try again." />
              <Alert variant="neutral" title="Note" description="This is a general purpose notification." />
            </div>
          </section>

          {/* Dismissible */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Dismissible</h2>
            </div>
            <div className={styles.variantStack}>
              <Alert variant="info" title="Dismissible alert" description="Click the close button to dismiss." dismissible onDismiss={() => {}} />
              <Alert variant="error" title="Error" description="Something went wrong." dismissible onDismiss={() => {}} />
            </div>
          </section>

          {/* Title only / Description only */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Content variations</h2>
            </div>
            <div className={styles.variantStack}>
              <Alert variant="positive" title="Changes saved" />
              <Alert variant="warning" description="Your session will expire in 5 minutes." />
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Compact</h2>
            </div>
            <div className={styles.variantStack}>
              <Alert variant="info" size="compact" title="Information" description="Compact informational message." />
              <Alert variant="positive" size="compact" title="Saved" />
              <Alert variant="error" size="compact" title="Error" description="Something went wrong." dismissible onDismiss={() => {}} />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
