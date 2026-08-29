"use client";

/**
 * Labs: a reference marketing dashboard (an analytics app shell with KPI
 * tiles, funnel, channel breakdowns, trend charts, and a campaign table)
 * rebuilt from the design system alone. Every colour, radius, space, and
 * type style is a semantic token; every control is a library component.
 * The point is fidelity pressure: where the rebuild falls short of the
 * reference, the shortfall is a finding about the system, not this page.
 *
 * All data is fictional. The page is noindex, chromeless, and excluded
 * from the chat corpus (see EXCLUDED_ROUTES in generate-site-corpus.mjs).
 */

import React from "react";
import {
  AppSidebar,
  type AppSidebarSection,
} from "@robr0/design-system/components/AppSidebar/AppSidebar";
import { Badge } from "@robr0/design-system/components/Badge/Badge";
import { Breadcrumb } from "@robr0/design-system/components/Breadcrumb/Breadcrumb";
import { Button } from "@robr0/design-system/components/Button/Button";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import {
  DataTable,
  type DataTableColumn,
  type DataTableRow,
} from "@robr0/design-system/components/DataTable/DataTable";
import {
  Dropdown,
  type DropdownOption,
} from "@robr0/design-system/components/Dropdown/Dropdown";
import { EmptyState } from "@robr0/design-system/components/EmptyState/EmptyState";
import { FunnelChart } from "@robr0/design-system/components/FunnelChart/FunnelChart";
import { LegendTile } from "@robr0/design-system/components/LegendTile/LegendTile";
import { ProgressBar } from "@robr0/design-system/components/ProgressBar/ProgressBar";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import { Stat } from "@robr0/design-system/components/Stat/Stat";
import { Tabs } from "@robr0/design-system/components/Tabs/Tabs";
import { AreaChart, BarChart, RadialChart } from "@robr0/design-system/charts";
import ThemeToggle from "../../../components/ThemeToggle/ThemeToggle";
import styles from "./page.module.css";

/* ---------------------------------------------------------------- data */

const NAV_SECTIONS: AppSidebarSection[] = [
  {
    items: [
      { key: "home", icon: "home", label: "Home", badge: 152 },
      { key: "marketing", icon: "campaign", label: "Marketing" },
      { key: "calendar", icon: "calendar_month", label: "Calendar" },
      { key: "projects", icon: "folder", label: "Projects" },
      { key: "reports", icon: "monitoring", label: "Reports" },
      { key: "profile", icon: "person", label: "Profile" },
      { key: "inbox", icon: "inbox", label: "Inbox", badge: 91 },
    ],
  },
  {
    items: [
      { key: "support", icon: "headset_mic", label: "Support" },
      { key: "settings", icon: "settings", label: "Settings" },
    ],
  },
];

const KPIS = [
  {
    icon: "payments",
    value: "$24,380",
    label: "Ad spend",
    delta: "+8.4%",
    trend: "up" as const,
  },
  {
    icon: "visibility",
    value: "1.94M",
    label: "Impressions",
    delta: "+12.6%",
    trend: "up" as const,
  },
  {
    icon: "conversion_path",
    value: "1,286",
    label: "Conversions",
    delta: "+5.2%",
    trend: "up" as const,
  },
  {
    icon: "ads_click",
    value: "$1.24",
    label: "Cost per click",
    delta: "-3.1%",
    trend: "down" as const,
  },
];

const FUNNEL = [
  { key: "visits", label: "Visits", value: "96.4K", pct: 100 },
  { key: "signups", label: "Sign-ups", value: "38.6K", pct: 40 },
  { key: "trials", label: "Trials", value: "14.1K", pct: 15 },
  { key: "customers", label: "Customers", value: "5.2K", pct: 5 },
];

/* Ring values are the share of total spend; dollar figures sum to $24,880. */
const SPEND_BY_CHANNEL = [
  { name: "Paid search", value: 46, amount: "$11,400" },
  { name: "Paid social", value: 31, amount: "$7,620" },
  { name: "Email", value: 13, amount: "$3,180" },
  { name: "Affiliates", value: 11, amount: "$2,680" },
];

const CHANNEL_SHARE = [
  { name: "Google Ads", icon: "search", pct: 39 },
  { name: "Meta", icon: "groups", pct: 25 },
  { name: "X Ads", icon: "tag", pct: 14 },
  { name: "LinkedIn", icon: "work", pct: 8 },
  { name: "Email", icon: "mail", pct: 7 },
  { name: "Affiliates", icon: "handshake", pct: 7 },
];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/* Monthly ad spend in $K; sums to the $217.7K total shown in the legend. */
const AD_SPEND = [
  10.2, 11.8, 13.1, 12.6, 15.4, 16.9, 17.8, 19.2, 20.7, 22.6, 26.3, 31.1,
].map((spend, i) => ({ month: MONTHS[i], spend }));

/* Monthly visitors in K; each series sums to its legend total. */
const ORGANIC = [4.9, 5.2, 5.6, 5.4, 5.9, 6.3, 6.1, 6.6, 7.0, 6.8, 7.3, 7.4];
const PAID = [2.4, 2.6, 2.9, 2.8, 3.1, 3.3, 3.2, 3.4, 3.6, 3.5, 3.8, 3.9];
const SOCIAL = [1.3, 1.4, 1.6, 1.5, 1.7, 1.8, 1.7, 1.9, 2.0, 1.9, 2.1, 2.5];
const VISITORS = MONTHS.map((month, i) => ({
  month,
  organic: ORGANIC[i],
  paid: PAID[i],
  social: SOCIAL[i],
}));

const CHANNEL_GLYPH: Record<string, string> = {
  google: "search",
  meta: "groups",
  x: "tag",
  linkedin: "work",
  email: "mail",
  web: "language",
};

const OBJECTIVE_VARIANT: Record<
  string,
  "info" | "positive" | "warning" | "error" | "neutral"
> = {
  Awareness: "info",
  Traffic: "neutral",
  Conversions: "positive",
  Leads: "warning",
  Retargeting: "error",
};

type Campaign = {
  id: string;
  name: string;
  market: string;
  channel: string;
  delivery: string;
  objective: string;
  updated: string;
  spend: number;
};

const CAMPAIGNS: Campaign[] = [
  { id: "c01", name: "Founder story video", market: "Global", channel: "web", delivery: "active", objective: "Awareness", updated: "2026-07-22", spend: 34800 },
  { id: "c02", name: "Holiday gift guide", market: "Global", channel: "meta", delivery: "paused", objective: "Traffic", updated: "2026-06-16", spend: 30884 },
  { id: "c03", name: "Founder story video", market: "US", channel: "linkedin", delivery: "active", objective: "Conversions", updated: "2026-08-24", spend: 1330 },
  { id: "c04", name: "Newsletter promo", market: "EU", channel: "web", delivery: "paused", objective: "Leads", updated: "2026-08-08", spend: 34445 },
  { id: "c05", name: "Spring launch", market: "UK", channel: "web", delivery: "draft", objective: "Awareness", updated: "2026-04-04", spend: 0 },
  { id: "c06", name: "Brand search", market: "US", channel: "google", delivery: "paused", objective: "Leads", updated: "2026-03-23", spend: 19116 },
  { id: "c07", name: "Cart retargeting", market: "UK", channel: "web", delivery: "draft", objective: "Awareness", updated: "2026-08-21", spend: 0 },
  { id: "c08", name: "Newsletter promo", market: "US", channel: "meta", delivery: "active", objective: "Awareness", updated: "2026-07-24", spend: 28095 },
  { id: "c09", name: "Webinar signups", market: "UK", channel: "x", delivery: "active", objective: "Awareness", updated: "2026-03-08", spend: 25305 },
  { id: "c10", name: "Case study promo", market: "UK", channel: "google", delivery: "active", objective: "Retargeting", updated: "2026-03-01", spend: 333 },
  { id: "c11", name: "Partner co-marketing", market: "Global", channel: "linkedin", delivery: "active", objective: "Leads", updated: "2026-08-12", spend: 12480 },
  { id: "c12", name: "Free tier launch", market: "US", channel: "google", delivery: "active", objective: "Conversions", updated: "2026-08-19", spend: 22940 },
  { id: "c13", name: "Docs search ads", market: "Global", channel: "google", delivery: "paused", objective: "Traffic", updated: "2026-05-30", spend: 8615 },
  { id: "c14", name: "Churn winback email", market: "EU", channel: "email", delivery: "active", objective: "Retargeting", updated: "2026-08-02", spend: 2210 },
  { id: "c15", name: "Product tour video", market: "US", channel: "meta", delivery: "draft", objective: "Awareness", updated: "2026-07-15", spend: 0 },
  { id: "c16", name: "Annual report teaser", market: "Global", channel: "x", delivery: "paused", objective: "Traffic", updated: "2026-02-11", spend: 5720 },
];

const DELIVERY_OPTIONS: DropdownOption[] = [
  { label: "Active", value: "active" },
  { label: "Paused", value: "paused" },
  { label: "Draft", value: "draft" },
  { label: "Completed", value: "completed" },
];

const MONTH_NAMES: Record<string, string> = {
  "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May",
  "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct",
  "11": "Nov", "12": "Dec",
};

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${MONTH_NAMES[month]} ${Number(day)}, ${year}`;
}

/* ------------------------------------------------------------- helpers */

/** A compact select that keeps its own value, for the per-panel ranges. */
function RangeSelect({
  options,
  initial,
  label,
}: {
  options: DropdownOption[];
  initial: string;
  label: string;
}) {
  const [value, setValue] = React.useState(initial);
  return (
    <Dropdown
      size="compact"
      options={options}
      value={value}
      onValueChange={setValue}
      aria-label={label}
      className={styles.rangeSelect}
    />
  );
}

const RANGE_30 = [
  { label: "Last 30 days", value: "30d" },
  { label: "Last quarter", value: "quarter" },
  { label: "This year", value: "year" },
];
const RANGE_YEAR = [
  { label: "This year", value: "year" },
  { label: "Last year", value: "last-year" },
  { label: "All time", value: "all" },
];

/** The chart palette token for a 1-based series slot. */
function seriesSwatch(series: number): string {
  return `var(--color-chart-series-${series})`;
}

/* ---------------------------------------------------------------- page */

export default function MarketingDashboardPage() {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(true);
  const [channelTab, setChannelTab] = React.useState("channels");
  const [delivery, setDelivery] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(CAMPAIGNS.map((c) => [c.id, c.delivery]))
  );

  const columns: DataTableColumn[] = [
    {
      key: "name",
      header: "Campaign",
      sortable: true,
      width: "260px",
      render: (row: DataTableRow) => (
        <span className={styles.campaignCell}>
          <span className={styles.glyphChip} aria-hidden="true">
            <span className="material-symbols-rounded">
              {CHANNEL_GLYPH[String(row.values.channel)]}
            </span>
          </span>
          <span className={styles.campaignText}>
            <span className={styles.campaignName}>{row.values.name}</span>
            <span className={styles.campaignMarket}>{row.values.market}</span>
          </span>
        </span>
      ),
    },
    {
      key: "delivery",
      header: "Delivery",
      width: "160px",
      render: (row: DataTableRow) => (
        <Dropdown
          size="compact"
          options={DELIVERY_OPTIONS}
          value={delivery[row.id]}
          onValueChange={(value) =>
            setDelivery((current) => ({ ...current, [row.id]: value }))
          }
          aria-label={`Delivery state for ${row.values.name}`}
          className={styles.deliverySelect}
        />
      ),
    },
    {
      key: "objective",
      header: "Objective",
      sortable: true,
      render: (row: DataTableRow) => (
        <Badge
          variant={OBJECTIVE_VARIANT[String(row.values.objective)] ?? "neutral"}
          label={String(row.values.objective)}
        />
      ),
    },
    {
      key: "updated",
      header: "Last updated",
      sortable: true,
      render: (row: DataTableRow) => (
        <span className={styles.dateCell}>
          {formatDate(String(row.values.updated))}
        </span>
      ),
    },
    {
      key: "spend",
      header: "Spend",
      sortable: true,
      align: "right",
      render: (row: DataTableRow) =>
        `$${Number(row.values.spend).toLocaleString("en-US")}`,
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (row: DataTableRow) => (
        <span className={styles.rowActions}>
          <CircularButton
            icon="delete"
            variant="tertiary"
            size="compact"
            ariaLabel={`Delete ${row.values.name}`}
          />
          <CircularButton
            icon="edit"
            variant="tertiary"
            size="compact"
            ariaLabel={`Edit ${row.values.name}`}
          />
          <CircularButton
            icon="more_vert"
            variant="tertiary"
            size="compact"
            ariaLabel={`More actions for ${row.values.name}`}
          />
        </span>
      ),
    },
  ];

  const rows: DataTableRow[] = CAMPAIGNS.map((c) => ({
    id: c.id,
    values: {
      name: c.name,
      market: c.market,
      channel: c.channel,
      delivery: c.delivery,
      objective: c.objective,
      updated: c.updated,
      spend: c.spend,
    },
  }));

  return (
    // data-bg-hidden is the layout's own switch for the ambient background
    // (the playground's stage toggle uses it): the dashboard sits on the
    // flat page colour, no gradient.
    <div className={styles.shell} data-bg-hidden="">
      <div className={styles.sidebar}>
        <AppSidebar
          sections={NAV_SECTIONS}
          profile={{ name: "Mara Esmer", email: "mara@boardline.app" }}
          activeKey="marketing"
          expanded={sidebarExpanded}
          onExpandedChange={setSidebarExpanded}
          logoText="Boardline"
          floating
          footerSlot={<ThemeToggle />}
        />
      </div>

      <main
        className={`${styles.main} ${
          sidebarExpanded ? styles.mainExpanded : ""
        }`}
      >
        <div className={styles.content}>
        <header className={styles.pageHead}>
          <div>
            <Breadcrumb
              items={[
                { label: "Boardline", href: "#" },
                { label: "Team space", href: "#" },
                { label: "Marketing" },
              ]}
            />
            <h1 className={styles.title}>Marketing</h1>
          </div>
          <div className={styles.headActions}>
            <CircularButton
              icon="notifications"
              variant="secondary"
              size="compact"
              ariaLabel="Notifications"
            />
            <Button
              variant="secondary"
              size="compact"
              label="Filters"
              iconLeft="filter_list"
            />
            <Button
              variant="primary"
              size="compact"
              label="New campaign"
              iconLeft="add"
            />
          </div>
        </header>

        <div className={styles.kpiGrid}>
          {KPIS.map((kpi) => (
            <div key={kpi.label} className={styles.kpi}>
              <span className={styles.kpiIcon} aria-hidden="true">
                <span className="material-symbols-rounded">{kpi.icon}</span>
              </span>
              <Stat
                value={kpi.value}
                label={kpi.label}
                delta={kpi.delta}
                trend={kpi.trend}
                deltaPlacement="inline"
              />
            </div>
          ))}
        </div>

        <div className={styles.midGrid}>
          <section className={styles.panel} aria-label="Acquisition funnel">
            <header className={styles.panelHead}>
              <Stat
                value="96.4K"
                label="Acquisition funnel"
                delta="+5.8%"
                trend="up"
                deltaPlacement="inline"
              />
              <RangeSelect
                options={RANGE_30}
                initial="30d"
                label="Acquisition funnel date range"
              />
            </header>
            <FunnelChart
              bare
              data={FUNNEL.map((stage) => ({
                label: stage.label,
                value: stage.pct,
                displayValue: stage.value,
              }))}
              height={190}
            />
            <div className={styles.legendRow}>
              {FUNNEL.map((stage, i) => (
                <LegendTile
                  key={stage.key}
                  swatch={seriesSwatch(i + 1)}
                  label={stage.label}
                  value={stage.value}
                />
              ))}
            </div>
          </section>

          <section className={styles.panel} aria-label="Spend by channel">
            <header className={styles.panelHead}>
              <Stat
                value="$24,880"
                label="Spend by channel"
                delta="+8.4%"
                trend="up"
                deltaPlacement="inline"
              />
              <RangeSelect
                options={RANGE_30}
                initial="30d"
                label="Spend by channel date range"
              />
            </header>
            <RadialChart
              data={SPEND_BY_CHANNEL.map(({ name, value }) => ({
                name,
                value,
              }))}
              maxValue={100}
              height={220}
              innerRadius={40}
              outerRadius={92}
              showLegend={false}
              bare
              centerLabel="46%"
              centerSublabel="Paid search"
              className={styles.radial}
            />
            <div className={styles.legendRow}>
              {SPEND_BY_CHANNEL.map((channel, i) => (
                <LegendTile
                  key={channel.name}
                  swatch={seriesSwatch(i + 1)}
                  label={channel.name}
                  value={channel.amount}
                />
              ))}
            </div>
          </section>

          <section className={styles.panel} aria-label="Traffic sources">
            <Tabs
              tabs={[
                { value: "channels", label: "Channels" },
                { value: "campaigns", label: "Campaigns" },
                { value: "landing", label: "Landing pages" },
              ]}
              activeTab={channelTab}
              onTabChange={setChannelTab}
              size="compact"
              ariaLabel="Traffic source breakdowns"
            />
            {channelTab === "channels" ? (
              <div className={styles.channelList}>
                {CHANNEL_SHARE.map((channel) => (
                  <div key={channel.name} className={styles.channelRow}>
                    <div className={styles.channelMeta}>
                      <span className={styles.channelName}>
                        <span
                          className={`material-symbols-rounded ${styles.channelGlyph}`}
                          aria-hidden="true"
                        >
                          {channel.icon}
                        </span>
                        {channel.name}
                      </span>
                      <span className={styles.channelPct}>{channel.pct}%</span>
                    </div>
                    <ProgressBar
                      value={channel.pct}
                      size="compact"
                      ariaLabel={`${channel.name} share of spend`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="query_stats"
                title="Not in this test"
                description="Only the channels view is rebuilt on this page."
                size="compact"
              />
            )}
          </section>
        </div>

        <div className={styles.chartsGrid}>
          <section className={styles.panel} aria-label="Ad spend by month">
            <header className={styles.panelHead}>
              <Stat
                value="$217.7K"
                label="Ad spend"
                delta="+9.4%"
                trend="up"
                deltaPlacement="inline"
              />
              <RangeSelect
                options={RANGE_YEAR}
                initial="year"
                label="Ad spend date range"
              />
            </header>
            <BarChart
              data={AD_SPEND}
              xKey="month"
              yKey="spend"
              dataLabel="Ad spend ($K)"
              height={260}
              bare
            />
            <div className={styles.legendRow}>
              <LegendTile label="Ad spend, total" value="$217.7K" />
              <LegendTile label="ROAS, average" value="3.6x" />
            </div>
          </section>

          <section className={styles.panel} aria-label="Visitors by month">
            <header className={styles.panelHead}>
              <Stat
                value="134,400"
                label="Visitors"
                delta="+8.8%"
                trend="up"
                deltaPlacement="inline"
              />
              <RangeSelect
                options={RANGE_YEAR}
                initial="year"
                label="Visitors date range"
              />
            </header>
            <AreaChart
              data={VISITORS}
              xKey="month"
              stacked
              series={[
                { dataKey: "organic", label: "Organic" },
                { dataKey: "paid", label: "Paid" },
                { dataKey: "social", label: "Social" },
              ]}
              height={260}
              showLegend={false}
              bare
            />
            <div className={styles.legendRow}>
              <LegendTile swatch={seriesSwatch(1)} label="Organic" value="74,500" />
              <LegendTile swatch={seriesSwatch(2)} label="Paid" value="38,500" />
              <LegendTile swatch={seriesSwatch(3)} label="Social" value="21,400" />
            </div>
          </section>
        </div>

        <section className={styles.tableSection} aria-label="Campaigns">
          <SectionTitle
            title="Campaigns"
            trailing={`${CAMPAIGNS.length} campaigns`}
            divider={false}
          />
          <DataTable
            columns={columns}
            rows={rows}
            caption="Campaigns"
            searchable
            searchPlaceholder="Search campaigns"
            selectable
            pageSize={8}
            defaultSort={{ key: "updated", direction: "desc" }}
            toolbar={
              <div className={styles.tableFilters}>
                <RangeSelect
                  options={[
                    { label: "All channels", value: "all" },
                    { label: "Google Ads", value: "google" },
                    { label: "Meta", value: "meta" },
                    { label: "LinkedIn", value: "linkedin" },
                  ]}
                  initial="all"
                  label="Filter by channel"
                />
                <RangeSelect
                  options={[
                    { label: "All objectives", value: "all" },
                    { label: "Awareness", value: "awareness" },
                    { label: "Conversions", value: "conversions" },
                    { label: "Leads", value: "leads" },
                  ]}
                  initial="all"
                  label="Filter by objective"
                />
              </div>
            }
          />
        </section>
        </div>
      </main>
    </div>
  );
}
