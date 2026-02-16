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
            For surfacing feedback, confirmations, warnings, and errors. Each variant maps to a status colour (positive, warning, error, info, neutral) so the meaning is immediately clear. Can be dismissed with an optional close button.
          </p>

          {/* Default */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Default</h2>
            </div>
            <div className={styles.variantStack}>
              <Alert variant="info" title="Information" description="This is an informational message with helpful context." />
              <Alert variant="positive" title="Success" description="Your changes have been saved successfully." />
              <Alert variant="warning" title="Warning" description="This action may have unintended consequences." />
              <Alert variant="error" title="Error" description="Something went wrong. Please try again." />
              <Alert variant="neutral" title="Note" description="This is a general purpose notification." />
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Compact</h2>
            </div>
            <div className={styles.variantStack}>
              <Alert variant="info" size="compact" title="Information" description="Compact informational message." />
              <Alert variant="positive" size="compact" title="Success" description="Your changes have been saved." />
              <Alert variant="warning" size="compact" title="Warning" description="This action may have consequences." />
              <Alert variant="error" size="compact" title="Error" description="Something went wrong." />
              <Alert variant="neutral" size="compact" title="Note" description="General purpose notification." />
            </div>
          </section>

          {/* States */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>States</h2>
            </div>
            <div className={styles.variantStack}>
              <Alert variant="info" title="Dismissible" description="Click the close button to dismiss this alert." dismissible onDismiss={() => {}} />
              <Alert variant="positive" title="Title only" />
              <Alert variant="warning" description="Description only — your session will expire in 5 minutes." />
              <Alert variant="error" title="Dismissible compact" description="Something went wrong." size="compact" dismissible onDismiss={() => {}} />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
