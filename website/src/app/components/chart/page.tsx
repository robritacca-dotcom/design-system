"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { BarChart } from "@design-system/components/Chart/BarChart";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/chart");

/* ============================================
   Sample data — 3 months of daily page views
   ============================================ */
function generatePageViews() {
  const data: { label: string; value: number }[] = [];
  const start = new Date(2024, 3, 1); // Apr 1
  for (let i = 0; i < 90; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const value = Math.round(80 + Math.random() * 300);
    data.push({ label, value });
  }
  return data;
}

const pageViewData = generatePageViews();

const monthlyData = [
  { label: "Jan", value: 186 },
  { label: "Feb", value: 305 },
  { label: "Mar", value: 237 },
  { label: "Apr", value: 73 },
  { label: "May", value: 209 },
  { label: "Jun", value: 214 },
];

const frameworkData = [
  { label: "React", value: 420 },
  { label: "Vue", value: 310 },
  { label: "Angular", value: 180 },
  { label: "Svelte", value: 250 },
  { label: "Solid", value: 140 },
];

export default function ChartPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Chart</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-barchart--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Data brought to life
            </p>
            <p className={styles.introBody}>
              Chart components visualise data sets using the design-system colour, spacing, and typography tokens. Built on Recharts for responsive SVG rendering, animations, and interactivity. The shared wrapper handles titles, subtitles, summary stats, and tooltips so every chart type looks and feels consistent.
            </p>
          </div>

          {/* Interactive bar chart */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <SectionTitle title="Bar chart — interactive" />
            <BarChart
              data={pageViewData}
              title="Bar Chart - Interactive"
              subtitle="Showing total visitors for the last 3 months"
              dataLabel="Page Views"
              summaryItems={[
                { label: "Desktop", value: 24828 },
                { label: "Mobile", value: 25010 },
              ]}
            />
          </section>

          {/* Minimal */}
          <section className={styles.section}>
            <SectionTitle title="Minimal" />
            <BarChart
              data={monthlyData}
              title="Monthly Revenue"
              dataLabel="Revenue"
              height={300}
            />
          </section>

          {/* Custom colour */}
          <section className={styles.section}>
            <SectionTitle title="Custom colour" />
            <BarChart
              data={frameworkData}
              title="Framework Popularity"
              subtitle="GitHub stars (thousands)"
              dataLabel="Stars"
              barColor="#06D6A0"
              height={300}
            />
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
