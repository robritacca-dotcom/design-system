"use client";

import styles from "../page.module.css";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import { BarChart, LineChart } from "@robr0/design-system/charts";

const CHART_DATA = [
  { label: "Mon", value: 320 },
  { label: "Tue", value: 480 },
  { label: "Wed", value: 260 },
  { label: "Thu", value: 540 },
  { label: "Fri", value: 610 },
  { label: "Sat", value: 380 },
  { label: "Sun", value: 290 },
];

const TREND_DATA = [
  { month: "Jan", sessions: 180, signups: 60 },
  { month: "Feb", sessions: 300, signups: 110 },
  { month: "Mar", sessions: 240, signups: 90 },
  { month: "Apr", sessions: 420, signups: 170 },
  { month: "May", sessions: 380, signups: 210 },
  { month: "Jun", sessions: 520, signups: 260 },
];

/* The brand colour is fed from state rather than left to the charts' own
   token lookup: charts resolve CSS variables during render, before the
   effect that writes the overrides runs, so they would otherwise lag the
   brand lever by one change. */
export default function ChartsSection({ brand }: { brand: string }) {
  return (
    <section className={styles.demoSection} aria-label="Charts">
      <SectionTitle title="Charts" />
      <p className={styles.sectionNote}>
        Both charts colour their series from the action colour, so data
        visualisation stays on brand as you re-theme.
      </p>

      <BarChart
        data={CHART_DATA}
        title="Weekly views"
        subtitle="Bars follow the action colour"
        dataLabel="Views"
        barColor={brand}
        height={240}
      />

      <LineChart
        data={TREND_DATA}
        xKey="month"
        series={[
          { dataKey: "sessions", label: "Sessions", color: brand },
          { dataKey: "signups", label: "Signups", color: brand, strokeDasharray: "5 4" },
        ]}
        title="Growth"
        subtitle="Both series derive from the action colour"
        height={240}
      />
    </section>
  );
}
