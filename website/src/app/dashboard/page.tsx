"use client";

import React from "react";
import { Input } from "@design-system/components/Input/Input";
import { Button } from "@design-system/components/Button/Button";
import { Badge } from "@design-system/components/Badge/Badge";
import { Table } from "@design-system/components/Table/Table";
import { SegmentedControl } from "@design-system/components/SegmentedControl/SegmentedControl";
import { StackedBarChart } from "@design-system/components/Chart/StackedBarChart";
import styles from "./page.module.css";

/* ============================================
   SIDEBAR NAV DATA
   ============================================ */

const mainNav = [
  { label: "Home", icon: "home", active: true },
  { label: "Revenue Analytics", icon: "monitoring" },
  { label: "Subscriptions", icon: "autorenew" },
  { label: "Customers", icon: "people" },
  { label: "Invoices", icon: "receipt_long" },
  { label: "Refunds", icon: "undo" },
  { label: "Payouts", icon: "account_balance" },
];

const growthNav = [
  { label: "Campaigns", icon: "campaign" },
  { label: "Experiments", icon: "science" },
];

const operationsNav = [
  { label: "Forecasting", icon: "trending_up" },
  { label: "Data Sources", icon: "database" },
  { label: "Integrations", icon: "extension" },
];

/* ============================================
   STACKED BAR CHART DATA — 30 days of revenue
   ============================================ */

function generateRevenueData() {
  const data: Record<string, unknown>[] = [];
  const start = new Date(2026, 0, 19); // Jan 19, 2026
  const products = ["courses", "membership", "marketplace", "certifications", "coaching"];
  const baselines = [4200, 2800, 2100, 1550, 720];

  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    const entry: Record<string, unknown> = { date: label };
    products.forEach((p, j) => {
      const variance = 0.7 + Math.random() * 0.6;
      entry[p] = Math.round(baselines[j] * variance);
    });
    data.push(entry);
  }
  return data;
}

const revenueData = generateRevenueData();

const chartSeries = [
  { dataKey: "courses", label: "Courses", color: "#9E47EF" },
  { dataKey: "membership", label: "Membership", color: "#118AB2" },
  { dataKey: "marketplace", label: "Marketplace", color: "#EF476F" },
  { dataKey: "certifications", label: "Certifications", color: "#06D6A0" },
  { dataKey: "coaching", label: "1:1 Coaching", color: "#3B82F6" },
];

/* ============================================
   TABLE DATA — Sales by Product
   ============================================ */

const productColors: Record<string, string> = {
  Courses: "#9E47EF",
  Membership: "#118AB2",
  Marketplace: "#EF476F",
  Certifications: "#06D6A0",
  "1:1 Coaching": "#3B82F6",
};

interface ProductRow {
  name: string;
  revenue: string;
  refunds: string;
  net: string;
  share: string;
  trend: number;
}

const products: ProductRow[] = [
  { name: "Courses", revenue: "$131.0k", refunds: "$441", net: "$130.6k", share: "36.7%", trend: 6.8 },
  { name: "Membership", revenue: "$88.1k", refunds: "$48", net: "$88.1k", share: "24.8%", trend: 0.8 },
  { name: "Marketplace", revenue: "$66.3k", refunds: "$86", net: "$66.2k", share: "18.6%", trend: -6.4 },
  { name: "Certifications", revenue: "$48.7k", refunds: "$87", net: "$48.6k", share: "13.7%", trend: 4.2 },
  { name: "1:1 Coaching", revenue: "$22.5k", refunds: "$217", net: "$22.3k", share: "6.3%", trend: 3.8 },
];

function ProductCell({ name }: { name: string }) {
  return (
    <span className={styles.productCell}>
      <span className={styles.productDot} style={{ backgroundColor: productColors[name] }} />
      <span className={styles.productName}>{name}</span>
    </span>
  );
}

function TrendCell({ value }: { value: number }) {
  const isUp = value >= 0;
  return (
    <span className={isUp ? styles.trendUp : styles.trendDown}>
      {isUp ? "\u25B2" : "\u25BC"} {Math.abs(value)}%
    </span>
  );
}

const tableColumns = [
  { key: "product", header: "Product" },
  { key: "revenue", header: "Revenue", align: "right" as const },
  { key: "refunds", header: "Refunds", align: "right" as const },
  { key: "net", header: "Net", align: "right" as const },
  { key: "share", header: "Share %", align: "right" as const },
  { key: "trend", header: "vs Prev Period", align: "right" as const },
];

const tableRows = [
  ...products.map((p, i) => ({
    id: String(i),
    cells: {
      product: <ProductCell name={p.name} />,
      revenue: <span className={styles.moneyCell}>{p.revenue}</span>,
      refunds: <span className={styles.moneyCell}>{p.refunds}</span>,
      net: <span className={`${styles.moneyCell} ${styles.moneyBold}`}>{p.net}</span>,
      share: <span className={styles.shareCell}>{p.share}</span>,
      trend: <TrendCell value={p.trend} />,
    },
  })),
  {
    id: "total",
    cells: {
      product: <span className={styles.totalRow}>Total</span>,
      revenue: <span className={`${styles.moneyCell} ${styles.totalRow}`}>$356.6k</span>,
      refunds: <span className={`${styles.moneyCell} ${styles.totalRow}`}>$879</span>,
      net: <span className={`${styles.moneyCell} ${styles.moneyBold} ${styles.totalRow}`}>$355.8k</span>,
      share: <span className={`${styles.shareCell} ${styles.totalRow}`}>100%</span>,
      trend: <span />,
    },
  },
];

/* ============================================
   SIDEBAR COMPONENT
   ============================================ */

function SidebarGroup({ label, items }: { label?: string; items: { label: string; icon: string; active?: boolean }[] }) {
  return (
    <div className={styles.sidebarGroup}>
      {label && <span className={styles.sidebarGroupLabel}>{label}</span>}
      {items.map((item) => (
        <span
          key={item.label}
          className={`${styles.sidebarLink} ${item.active ? styles.sidebarLinkActive : ""}`}
        >
          <span className={`material-symbols-rounded ${styles.sidebarIcon}`}>{item.icon}</span>
          {item.label}
        </span>
      ))}
    </div>
  );
}

/* ============================================
   PAGE COMPONENT
   ============================================ */

export default function DashboardPage() {
  const [timeRange, setTimeRange] = React.useState("30d");

  return (
    <div className={styles.page}>
      {/* ---- SIDEBAR ---- */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <span className={styles.brandIcon}>A</span>
          <span className={styles.brandName}>Align Academy</span>
        </div>
        <SidebarGroup items={mainNav} />
        <SidebarGroup label="Growth" items={growthNav} />
        <SidebarGroup label="Operations" items={operationsNav} />
      </aside>

      {/* ---- MAIN ---- */}
      <div className={styles.main}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <Input placeholder="Search..." size="compact" iconLeft="search" />
          </div>
          <div className={styles.topBarRight}>
            <Badge label="Pro" variant="info" />
            <div className={styles.avatar}>
              <span className="material-symbols-rounded" style={{ color: "white", fontSize: 18 }}>person</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* ---- STAT CARDS ---- */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Today&apos;s Revenue</span>
              <span className={styles.statValue}>$12,472</span>
              <span className={styles.statMeta}>
                $12,451 same day last week&nbsp;
                <span className={styles.statUp}>&uarr; 0.2%</span>
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Monthly Recurring Revenue</span>
              <span className={styles.statValue}>$632,304</span>
              <span className={styles.statMeta}>$7,587,648 ARR</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Profit (last 30d)</span>
              <span className={styles.statValue}>$170,760</span>
              <span className={styles.statMeta}>
                $163,544 previous 30 days&nbsp;
                <span className={styles.statUp}>&uarr; 4.4%</span>
              </span>
            </div>
          </div>

          {/* ---- REVENUE CHART ---- */}
          <div className={styles.chartSection}>
            <div className={styles.chartHeader}>
              <div className={styles.chartHeaderLeft}>
                <h2 className={styles.chartSectionTitle}>Revenue</h2>
                <div className={styles.chartSectionMeta}>
                  <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>$356.6k</span>
                  <span>$350.7k previous period</span>
                  <span className={styles.statUp}>&uarr; 1.7%</span>
                </div>
              </div>
              <div className={styles.chartHeaderRight}>
                <SegmentedControl
                  segments={[
                    { value: "7d", label: "7d" },
                    { value: "30d", label: "30d" },
                    { value: "90d", label: "90d" },
                    { value: "MTD", label: "MTD" },
                    { value: "YTD", label: "YTD" },
                    { value: "1Y", label: "1Y" },
                  ]}
                  activeSegment={timeRange}
                  onSegmentChange={setTimeRange}
                  size="compact"
                />
                <Button label="Export" priority="secondary" state="default" size="compact" iconLeft="download" />
              </div>
            </div>
            <StackedBarChart
              data={revenueData}
              xKey="date"
              series={chartSeries}
              height={380}
              yAxisFormatter={(v: number) =>
                v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`
              }
            />
          </div>

          {/* ---- SALES TABLE ---- */}
          <div className={styles.tableSection}>
            <h2 className={styles.tableSectionTitle}>Sales by Product</h2>
            <div className={styles.tableWrapper}>
              <Table
                columns={tableColumns}
                rows={tableRows}
                size="compact"
                caption="Sales by product"
                captionHidden
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
