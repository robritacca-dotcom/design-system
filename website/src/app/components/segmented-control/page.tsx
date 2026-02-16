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
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/segmented-control");

export default function SegmentedControlPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Segmented control</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-segmentedcontrol--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Toggle between a small set of related options
            </p>
            <p className={styles.introBody}>
              For view modes or filters where the active segment fills with the primary colour. Works well for 2 to 4 choices. Use Tabs instead when the options represent distinct content sections with their own panels.
            </p>
          </div>

          {/* Default */}
          <section className={styles.section}>
            <SectionTitle title="Default" />
            <div className={styles.variantStack}>
              <SegmentedControl
                segments={[
                  { label: "Day", value: "day" },
                  { label: "Week", value: "week" },
                  { label: "Month", value: "month" },
                ]}
                activeSegment="week"
                onSegmentChange={() => {}}
              />
            </div>
          </section>

          {/* With icons */}
          <section className={styles.section}>
            <SectionTitle title="With icons" />
            <div className={styles.variantStack}>
              <SegmentedControl
                segments={[
                  { label: "Grid", value: "grid", icon: "grid_view" },
                  { label: "List", value: "list", icon: "view_list" },
                  { label: "Board", value: "board", icon: "view_column" },
                ]}
                activeSegment="grid"
                onSegmentChange={() => {}}
              />
              <SegmentedControl
                segments={[
                  { label: "Light", value: "light", icon: "light_mode" },
                  { label: "Dark", value: "dark", icon: "dark_mode" },
                ]}
                activeSegment="dark"
                onSegmentChange={() => {}}
              />
            </div>
          </section>

          {/* Full width */}
          <section className={styles.section}>
            <SectionTitle title="Full width" />
            <div className={styles.variantStack} style={{ width: "100%" }}>
              <SegmentedControl
                segments={[
                  { label: "Overview", value: "overview" },
                  { label: "Analytics", value: "analytics" },
                  { label: "Reports", value: "reports" },
                ]}
                activeSegment="overview"
                fullWidth
                onSegmentChange={() => {}}
              />
            </div>
          </section>

          {/* With disabled */}
          <section className={styles.section}>
            <SectionTitle title="With disabled segment" />
            <div className={styles.variantStack}>
              <SegmentedControl
                segments={[
                  { label: "Free", value: "free" },
                  { label: "Pro", value: "pro" },
                  { label: "Enterprise", value: "enterprise", disabled: true },
                ]}
                activeSegment="pro"
                onSegmentChange={() => {}}
              />
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <SectionTitle title="Compact" />
            <div className={styles.variantStack}>
              <SegmentedControl
                size="compact"
                segments={[
                  { label: "All", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Archived", value: "archived" },
                ]}
                activeSegment="all"
                onSegmentChange={() => {}}
              />
              <SegmentedControl
                size="compact"
                segments={[
                  { label: "Code", value: "code", icon: "code" },
                  { label: "Preview", value: "preview", icon: "visibility" },
                  { label: "Split", value: "split", icon: "vertical_split" },
                ]}
                activeSegment="code"
                onSegmentChange={() => {}}
              />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
