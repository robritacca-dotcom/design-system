"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { BarChart } from "@design-system/components/Chart/BarChart";
import { LineChart } from "@design-system/components/Chart/LineChart";
import { PieChart } from "@design-system/components/Chart/PieChart";
import { RadialChart } from "@design-system/components/Chart/RadialChart";
import { AreaChart } from "@design-system/components/Chart/AreaChart";
import { RadarChart } from "@design-system/components/Chart/RadarChart";
import { ScatterChart } from "@design-system/components/Chart/ScatterChart";
import { Treemap } from "@design-system/components/Chart/Treemap";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components/chart");

/* ============================================
   Sample data
   ============================================ */
function generatePageViews() {
  const data: { label: string; value: number }[] = [];
  const start = new Date(2024, 3, 1);
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

const lineData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const browserData = [
  { name: "Chrome", value: 275 },
  { name: "Safari", value: 200 },
  { name: "Firefox", value: 187 },
  { name: "Edge", value: 173 },
  { name: "Other", value: 90 },
];

const taskData = [
  { name: "Completed", value: 72, color: "#06D6A0" },
  { name: "In Progress", value: 18, color: "#FFD166" },
  { name: "Failed", value: 10, color: "#EF476F" },
];

const sprintData = [
  { name: "Design", value: 86 },
  { name: "Development", value: 65 },
  { name: "Testing", value: 42 },
];

const radarData = [
  { subject: "Design", teamA: 120, teamB: 90 },
  { subject: "Frontend", teamA: 98, teamB: 130 },
  { subject: "Backend", teamA: 86, teamB: 100 },
  { subject: "DevOps", teamA: 99, teamB: 85 },
  { subject: "Testing", teamA: 85, teamB: 65 },
  { subject: "Communication", teamA: 65, teamB: 120 },
];

const areaData = [
  { month: "Jan", organic: 140, paid: 60 },
  { month: "Feb", organic: 210, paid: 95 },
  { month: "Mar", organic: 185, paid: 120 },
  { month: "Apr", organic: 260, paid: 145 },
  { month: "May", organic: 230, paid: 170 },
  { month: "Jun", organic: 310, paid: 200 },
];

const treemapData = [
  { name: "Documents", size: 4200 },
  { name: "Photos", size: 3800 },
  { name: "Videos", size: 7200 },
  { name: "Music", size: 1500 },
  { name: "Apps", size: 2800 },
  { name: "System", size: 1200 },
  { name: "Downloads", size: 2100 },
  { name: "Other", size: 900 },
];

function generateScatterCluster(cx: number, cy: number, count: number, spread: number) {
  return Array.from({ length: count }, () => ({
    x: Math.round(cx + (Math.random() - 0.5) * spread),
    y: Math.round(cy + (Math.random() - 0.5) * spread),
  }));
}

const scatterDatasets = [
  { name: "Group A", data: generateScatterCluster(60, 200, 20, 80), color: "#118AB2" },
  { name: "Group B", data: generateScatterCluster(180, 120, 20, 80), color: "#06D6A0" },
];

export default function ChartPage() {
  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
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

          {/* ============================================
             BAR CHART
             ============================================ */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <SectionTitle title="Bar chart" />
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

          {/* ============================================
             LINE CHART
             ============================================ */}
          <section className={styles.section}>
            <SectionTitle title="Line chart" />
            <LineChart
              data={lineData}
              xKey="month"
              series={[
                { dataKey: "desktop", label: "Desktop", color: "#118AB2" },
                { dataKey: "mobile", label: "Mobile", color: "#06D6A0" },
              ]}
              title="Visitors by Device"
              subtitle="January - June 2024"
              summaryItems={[
                { label: "Desktop", value: "1,224" },
                { label: "Mobile", value: 860 },
              ]}
            />
          </section>

          {/* ============================================
             PIE CHARTS
             ============================================ */}
          <section className={styles.section}>
            <SectionTitle title="Pie chart" />
            <div className={styles.chartRow}>
              <PieChart
                data={browserData}
                title="Browser Share"
                subtitle="Visitor distribution by browser"
                height={380}
              />
              <PieChart
                data={taskData}
                title="Task Status — Donut"
                subtitle="Current sprint"
                innerRadius={80}
                height={380}
              />
            </div>
          </section>

          {/* ============================================
             RADIAL CHARTS
             ============================================ */}
          <section className={styles.section}>
            <SectionTitle title="Radial chart" />
            <div className={styles.chartRow}>
              <RadialChart
                data={sprintData}
                title="Sprint Progress"
                subtitle="Completion by phase"
                height={380}
              />
              <RadialChart
                data={[
                  { name: "Revenue", value: 78, color: "#06D6A0" },
                  { name: "Users", value: 92, color: "#118AB2" },
                  { name: "Retention", value: 55, color: "#FFD166" },
                ]}
                title="KPI Overview"
                subtitle="Q2 2024 targets"
                height={380}
              />
            </div>
          </section>

          {/* ============================================
             AREA CHART
             ============================================ */}
          <section className={styles.section}>
            <SectionTitle title="Area chart" />
            <AreaChart
              data={areaData}
              xKey="month"
              series={[
                { dataKey: "organic", label: "Organic", color: "#118AB2" },
                { dataKey: "paid", label: "Paid", color: "#9E47EF" },
              ]}
              title="Traffic Sources"
              subtitle="Organic vs paid visits — January to June 2024"
              summaryItems={[
                { label: "Organic", value: "1,335" },
                { label: "Paid", value: 790 },
              ]}
            />
          </section>

          {/* ============================================
             RADAR CHART
             ============================================ */}
          <section className={styles.section}>
            <SectionTitle title="Radar chart" />
            <div className={styles.chartRow}>
              <RadarChart
                data={radarData}
                categoryKey="subject"
                series={[
                  { dataKey: "teamA", label: "Team Alpha", color: "#118AB2" },
                  { dataKey: "teamB", label: "Team Beta", color: "#06D6A0" },
                ]}
                title="Team Skills"
                subtitle="Competency comparison across domains"
                height={380}
              />
              <RadarChart
                data={radarData}
                categoryKey="subject"
                series={[
                  { dataKey: "teamA", label: "Team Alpha", color: "#EF476F", fillOpacity: 0.4 },
                ]}
                title="Team Alpha Focus"
                subtitle="Single-series radar"
                height={380}
              />
            </div>
          </section>

          {/* ============================================
             SCATTER CHART
             ============================================ */}
          <section className={styles.section}>
            <SectionTitle title="Scatter chart" />
            <ScatterChart
              datasets={scatterDatasets}
              xKey="x"
              yKey="y"
              xLabel="Height (cm)"
              yLabel="Weight (kg)"
              title="Height vs Weight"
              subtitle="Sample population clusters"
              summaryItems={[
                { label: "Correlation", value: "0.82" },
                { label: "Points", value: 40 },
              ]}
            />
          </section>

          {/* ============================================
             TREEMAP
             ============================================ */}
          <section className={styles.section}>
            <SectionTitle title="Treemap" />
            <Treemap
              data={treemapData}
              title="Disk Usage"
              subtitle="Storage breakdown by category (MB)"
              summaryItems={[
                { label: "Total", value: "23.7 GB" },
                { label: "Free", value: "12.3 GB" },
              ]}
            />
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
