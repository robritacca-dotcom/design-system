"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Popover } from "@design-system/components/Popover/Popover";
import { Button } from "@design-system/components/Button/Button";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/popover");

export default function PopoverPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Popover</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-popover--docs"
            />
          </div>

          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Contextual overlay panel with click and hover triggers, escape-to-close, and four position options.
          </p>

          {/* Click trigger */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Click trigger</h2>
            </div>
            <div className={styles.variantRow}>
              <Popover
                trigger="click"
                position="bottom"
                content={
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, marginBottom: "4px" }}>Popover title</p>
                    <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>Content appears on click.</p>
                  </div>
                }
              >
                <Button label="Click me" priority="primary" size="compact" />
              </Popover>
            </div>
          </section>

          {/* Hover trigger */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Hover trigger</h2>
            </div>
            <div className={styles.variantRow}>
              <Popover
                trigger="hover"
                position="bottom"
                content={<p style={{ margin: 0 }}>Tooltip-style popover on hover.</p>}
              >
                <Button label="Hover me" priority="secondary" size="compact" />
              </Popover>
            </div>
          </section>

          {/* Positions */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Positions</h2>
            </div>
            <div className={styles.variantRow} style={{ gap: "80px", padding: "60px 0" }}>
              <Popover trigger="click" position="bottom" open content={<p style={{ margin: 0 }}>Bottom</p>}>
                <Button label="Bottom" priority="secondary" size="compact" />
              </Popover>
              <Popover trigger="click" position="top" open content={<p style={{ margin: 0 }}>Top</p>}>
                <Button label="Top" priority="secondary" size="compact" />
              </Popover>
              <Popover trigger="click" position="right" open content={<p style={{ margin: 0 }}>Right</p>}>
                <Button label="Right" priority="secondary" size="compact" />
              </Popover>
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Compact</h2>
            </div>
            <div className={styles.variantRow}>
              <Popover
                trigger="click"
                position="bottom"
                size="compact"
                content={<p style={{ margin: 0, fontSize: "14px" }}>Compact popover content.</p>}
              >
                <Button label="Compact" priority="primary" size="compact" />
              </Popover>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
