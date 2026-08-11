"use client";

import { useState } from "react";
import Link from "next/link";
import MegaNav from "../../components/MegaNav/MegaNav";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import FadeDivider from "../../components/FadeDivider/FadeDivider";
import styles from "./page.module.css";
import { dsMegaItems } from "@/config/navigation";
import { Avatar } from "@robr0/design-system/components/Avatar/Avatar";
import { Badge } from "@robr0/design-system/components/Badge/Badge";
import { Button } from "@robr0/design-system/components/Button/Button";
import { ButtonGroup } from "@robr0/design-system/components/ButtonGroup/ButtonGroup";
import {
  FigmaIcon,
  GitHubIcon,
  StorybookIcon,
} from "../../components/BrandIcons/BrandIcons";
import { Checkbox } from "@robr0/design-system/components/Checkbox/Checkbox";
import { Chip } from "@robr0/design-system/components/Chip/Chip";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { CodeBlock } from "@robr0/design-system/components/CodeBlock/CodeBlock";
import {
  ContributionGraph,
  type ContributionDay,
} from "@robr0/design-system/components/ContributionGraph/ContributionGraph";
import { DateInput } from "@robr0/design-system/components/DateInput/DateInput";
import { DatePicker } from "@robr0/design-system/components/DatePicker/DatePicker";
import { Dropdown } from "@robr0/design-system/components/Dropdown/Dropdown";
import { EmptyState } from "@robr0/design-system/components/EmptyState/EmptyState";
import { Input } from "@robr0/design-system/components/Input/Input";
import { Kbd } from "@robr0/design-system/components/Kbd/Kbd";
import { Pagination } from "@robr0/design-system/components/Pagination/Pagination";
import { ProgressBar } from "@robr0/design-system/components/ProgressBar/ProgressBar";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { SelectionCard } from "@robr0/design-system/components/SelectionCard/SelectionCard";
import { Skeleton } from "@robr0/design-system/components/Skeleton/Skeleton";
import { Slider } from "@robr0/design-system/components/Slider/Slider";
import { Spinner } from "@robr0/design-system/components/Spinner/Spinner";
import { Stat } from "@robr0/design-system/components/Stat/Stat";
import { Table } from "@robr0/design-system/components/Table/Table";
import { Tabs } from "@robr0/design-system/components/Tabs/Tabs";
import { Timeline } from "@robr0/design-system/components/Timeline/Timeline";
import { ToggleSwitch } from "@robr0/design-system/components/ToggleSwitch/ToggleSwitch";
import { COMPONENT_COUNT } from "@robr0/design-system/components/registry";
import { TOKEN_COUNT } from "@robr0/design-system/tokens/registry";
import { BarChart, LineChart, PieChart } from "@robr0/design-system/charts";

/* ---------- fixed demo data (all mock — a small finance product) ---------- */

const REVENUE_DATA = [
  { label: "Jan", value: 182 },
  { label: "Feb", value: 210 },
  { label: "Mar", value: 168 },
  { label: "Apr", value: 254 },
  { label: "May", value: 291 },
  { label: "Jun", value: 262 },
  { label: "Jul", value: 318 },
];

const PORTFOLIO_DATA = [
  { month: "Feb", value: 84.2, benchmark: 82.0 },
  { month: "Mar", value: 81.9, benchmark: 82.8 },
  { month: "Apr", value: 88.4, benchmark: 84.1 },
  { month: "May", value: 92.7, benchmark: 85.9 },
  { month: "Jun", value: 91.3, benchmark: 87.2 },
  { month: "Jul", value: 97.8, benchmark: 88.6 },
];

const HOLDINGS_COLUMNS = [
  { key: "ticker", header: "Ticker" },
  { key: "shares", header: "Shares", align: "right" as const },
  { key: "value", header: "Value", align: "right" as const },
];

const HOLDINGS_ROWS = [
  { id: "vgro", cells: { ticker: "VGRO", shares: "412", value: "$14,830" } },
  { id: "xeqt", cells: { ticker: "XEQT", shares: "260", value: "$9,215" } },
  { id: "zag", cells: { ticker: "ZAG", shares: "705", value: "$8,904" } },
];

const CURRENCY_OPTIONS = [
  { label: "USD — US dollar", value: "usd" },
  { label: "EUR — euro", value: "eur" },
  { label: "GBP — pound sterling", value: "gbp" },
];

const RANGE_SEGMENTS = [
  { value: "6m", label: "6M" },
  { value: "1y", label: "1Y" },
];

const STATEMENT_TABS = [
  { value: "statements", label: "Statements" },
  { value: "invoices", label: "Invoices" },
  { value: "tax", label: "Tax" },
];

const STATEMENTS = [
  { month: "June 2026", meta: "PDF · 84 KB" },
  { month: "May 2026", meta: "PDF · 87 KB" },
  { month: "April 2026", meta: "PDF · 80 KB" },
];

const INVOICES = [
  { id: "#3461", client: "Acme Ltd", amount: "$12,400.00", status: "Paid", variant: "positive" },
  { id: "#3462", client: "Northwind", amount: "$8,150.00", status: "Pending", variant: "info" },
  { id: "#3458", client: "Globex", amount: "$21,090.00", status: "Overdue", variant: "error" },
  { id: "#3464", client: "Initech", amount: "$3,600.00", status: "Draft", variant: "neutral" },
] as const;

const ACTIVITY = [
  { name: "Danilo Sousa", action: "Approved invoice #3461", when: "9:41 am" },
  { name: "Zahra Ambessa", action: "Updated client details for Acme Ltd", when: "8:20 am" },
  { name: "Jasper Eriksson", action: "Created 4 invoices", when: "Yesterday" },
];

const SAVINGS_GOALS = [
  { label: "Retirement", target: "$420,000 target", value: 72 },
  { label: "House deposit", target: "$85,000 target", value: 38 },
];

/* Spending mix for the donut card — sums to a plausible month */
const SPENDING_DATA = [
  { name: "Housing", value: 2150 },
  { name: "Groceries", value: 640 },
  { name: "Transport", value: 310 },
  { name: "Dining", value: 280 },
  { name: "Subscriptions", value: 120 },
];

const SCHEDULE_OPTIONS = [
  { value: "weekly", label: "Weekly", description: "Every Friday, balances over $10" },
  { value: "monthly", label: "Monthly", description: "On the 15th of each month" },
];

// A fixed five months of activity for the contribution graph card — enough
// weeks that the stretch-to-fit cells stay small
const tradingDays: ContributionDay[] = Array.from({ length: 22 * 7 }, (_, i) => {
  const d = new Date(2026, 0, 4 + i);
  const level = ([0, 1, 3, 0, 2, 4, 1, 0, 2, 3, 1, 4, 0, 2][i % 14]) as ContributionDay["level"];
  return {
    date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    count: level * 3,
    level,
  };
});

/* ---------- card shells ---------- */

interface ComponentLink {
  label: string;
  href: string;
}

/** A live demo panel: scenario heading, the working components, and the
    pages they come from in the footer. */
function DemoCard({
  heading,
  sub,
  links,
  children,
}: {
  heading: string;
  sub?: string;
  links: ComponentLink[];
  children: React.ReactNode;
}) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{heading}</h3>
        {sub && <p className={styles.cardSub}>{sub}</p>}
      </header>
      <div className={styles.cardBody}>{children}</div>
      <footer className={styles.cardLinks}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={styles.cardLink}>
            {l.label}
          </Link>
        ))}
      </footer>
    </article>
  );
}

/** A plain content panel: same shell as a demo card, without the footer of
    component links. Sole current use is the Install card. */
function NavCard({
  heading,
  sub,
  children,
}: {
  heading: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{heading}</h3>
        {sub && <p className={styles.cardSub}>{sub}</p>}
      </header>
      <div className={styles.cardBody}>{children}</div>
    </article>
  );
}

/* ---------- page ---------- */

export default function DesignSystemPage() {
  const [alerts, setAlerts] = useState({ transactions: true, security: true, market: false });
  const [currency, setCurrency] = useState("usd");
  const [dueDate, setDueDate] = useState("2026-08-15");
  const [transferDate, setTransferDate] = useState("2026-08-03");
  const [threshold, setThreshold] = useState(50);
  const [range, setRange] = useState("6m");
  const [activeTab, setActiveTab] = useState("statements");
  const [page, setPage] = useState(3);
  const [receipt, setReceipt] = useState(true);
  const [schedule, setSchedule] = useState("monthly");
  const [holdingsFilter, setHoldingsFilter] = useState("all");

  const chartData = range === "6m" ? REVENUE_DATA.slice(1) : REVENUE_DATA;

  return (
    <>
      <BlurBackground />

      <MegaNav />

      <main className={styles.page} id="main-content">
        {/* ---------- page header (standard treatment: title, tagline, intro) ---------- */}
        <section className={`${styles.hero} animate-in`} aria-label="About the design system">
          <h1 className={styles.pageTitle}>robr0 DS</h1>
          <p className={styles.subDisplay}>
            An AI-ready design system: Claude Code builds the components from
            written specs, and every token chains to a primitive you can override.
          </p>
          <ButtonGroup
            ariaLabel="Design system sections"
            buttons={dsMegaItems.map((item) => ({
              label: item.label,
              variant: "tertiary" as const,
              iconLeft: item.icon,
              href: item.href,
            }))}
          />
          <FadeDivider />
          <ButtonGroup
            ariaLabel="External resources"
            buttons={[
              {
                label: "Figma",
                variant: "tertiary",
                iconLeft: <FigmaIcon />,
                iconRight: "open_in_new",
                href: "https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26",
                target: "_blank",
                rel: "noopener noreferrer",
              },
              {
                label: "Storybook",
                variant: "tertiary",
                iconLeft: <StorybookIcon />,
                iconRight: "open_in_new",
                href: "https://design-system-iota-one.vercel.app",
                target: "_blank",
                rel: "noopener noreferrer",
              },
              {
                label: "GitHub",
                variant: "tertiary",
                iconLeft: <GitHubIcon />,
                iconRight: "open_in_new",
                href: "https://github.com/robritacca-dotcom/design-system",
                target: "_blank",
                rel: "noopener noreferrer",
              },
            ]}
          />
        </section>

        {/* ---------- collage: three curated columns of live demos + nav ---------- */}
        <section
          className={`${styles.collage} animate-in animate-delay-1`}
          aria-label="Live component examples"
        >
          {/* -------- left column -------- */}
          <div className={styles.col}>
            <DemoCard
              heading="Spending by category"
              sub="Where this month's money went."
              links={[{ label: "Chart", href: "/components/chart" }]}
            >
              <div className={styles.chartFlush}>
                <PieChart
                  data={SPENDING_DATA}
                  innerRadius={52}
                  outerRadius={80}
                  height={230}
                  showLegend
                />
              </div>
            </DemoCard>

            <DemoCard
              heading="Financial performance"
              sub="Compared to the month before."
              links={[{ label: "Stat", href: "/components/stat" }]}
            >
              <div className={styles.statGrid}>
                <Stat value="$350K" label="MRR" delta="+3.2%" trend="up" />
                <Stat value="$211K" label="OpEx" delta="+12.8%" trend="down" />
                <Stat value="44.6%" label="GPM" delta="-1.2%" trend="down" />
                <Stat value="$443K" label="EBITDA" delta="+4.1%" trend="up" />
              </div>
            </DemoCard>

            <DemoCard
              heading="New invoice"
              sub="Bill a client in their own currency."
              links={[
                { label: "Input", href: "/components/input" },
                { label: "Dropdown", href: "/components/dropdown" },
                { label: "Date input", href: "/components/date-input" },
              ]}
            >
              <div className={styles.formStack}>
                <Input label="Client" placeholder="Acme Ltd" />
                <Dropdown
                  label="Currency"
                  value={currency}
                  options={CURRENCY_OPTIONS}
                  onValueChange={setCurrency}
                />
                <DateInput label="Due date" value={dueDate} onValueChange={setDueDate} />
                <Button label="Create invoice" variant="primary" iconLeft="receipt_long" />
              </div>
            </DemoCard>

            <DemoCard
              heading="Recent activity"
              sub="What happened over the past day."
              links={[{ label: "Avatar", href: "/components/avatar" }]}
            >
              <ul className={styles.rowList}>
                {ACTIVITY.map((a) => (
                  <li key={a.name} className={styles.activityRow}>
                    <Avatar name={a.name} size="sm" />
                    <span className={styles.activityText}>
                      <span className={styles.rowTitle}>{a.name}</span>
                      <span className={styles.rowHint}>{a.action}</span>
                    </span>
                    <span className={styles.activityWhen}>{a.when}</span>
                  </li>
                ))}
              </ul>
            </DemoCard>

            <DemoCard
              heading="Overdue invoices"
              links={[{ label: "Empty state", href: "/components/empty-state" }]}
            >
              <EmptyState
                icon="task_alt"
                title="Nothing overdue"
                description="Every invoice is paid or inside its terms."
                variant="bordered"
              />
            </DemoCard>

            <DemoCard
              heading="Documents"
              sub="Statements are generated on the 1st of each month."
              links={[
                { label: "Tabs", href: "/components/tabs" },
                { label: "Pagination", href: "/components/pagination" },
              ]}
            >
              <Tabs
                tabs={STATEMENT_TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                ariaLabel="Document types"
              />
              <ul className={styles.rowList}>
                {STATEMENTS.map((s) => (
                  <li key={s.month} className={styles.statementRow}>
                    <span className={`material-symbols-rounded ${styles.statementIcon}`} aria-hidden="true">
                      description
                    </span>
                    <span className={styles.statementText}>
                      <span className={styles.rowTitle}>{s.month}</span>
                      <span className={styles.rowHint}>{s.meta}</span>
                    </span>
                    <span className={`material-symbols-rounded ${styles.statementDownload}`} aria-hidden="true">
                      download
                    </span>
                  </li>
                ))}
              </ul>
              <Pagination
                page={page}
                pageCount={8}
                onPageChange={setPage}
                size="compact"
                ariaLabel="Statement pages"
              />
            </DemoCard>

            <DemoCard
              heading="Search"
              sub="Find any transaction, client, or invoice."
              links={[
                { label: "Kbd", href: "/components/kbd" },
                { label: "Chip", href: "/components/chip" },
              ]}
            >
              <div className={styles.searchTrigger}>
                <span className={`material-symbols-rounded ${styles.searchIcon}`} aria-hidden="true">
                  search
                </span>
                <span className={styles.searchPlaceholder}>Search transactions…</span>
                <span className={styles.kbdKeys}>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </span>
              </div>
              <div className={styles.recentRow}>
                <span className={styles.cardHint}>Recent</span>
                <Chip label="Acme Ltd" />
                <Chip label="#3461" />
              </div>
            </DemoCard>
          </div>

          {/* -------- middle column -------- */}
          <div className={styles.col}>
            <NavCard
              heading="Install"
              sub={`${COMPONENT_COUNT} components on ${TOKEN_COUNT} semantic tokens, one package.`}
            >
              <CodeBlock code="npm install @robr0/design-system" language="bash" />
              <div className={styles.buttonRow}>
                <Button label="Get started" variant="primary" size="compact" href="/docs/get-started" />
                <Button
                  label="GitHub"
                  variant="tertiary"
                  size="compact"
                  iconRight="open_in_new"
                  href="https://github.com/robritacca-dotcom/design-system"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </NavCard>

            <DemoCard
              heading="Trading activity"
              sub="One cell per trading day; darker means more trades."
              links={[{ label: "Contribution graph", href: "/components/contribution-graph" }]}
            >
              <div className={styles.scrollX}>
                <ContributionGraph days={tradingDays} showLegend />
              </div>
            </DemoCard>

            <DemoCard
              heading="Revenue"
              sub="Monthly, in thousands."
              links={[
                { label: "Chart", href: "/components/chart" },
                { label: "Segmented control", href: "/components/segmented-control" },
              ]}
            >
              <div className={styles.chartToolbar}>
                <SegmentedControl
                  segments={RANGE_SEGMENTS}
                  activeSegment={range}
                  onSegmentChange={setRange}
                />
              </div>
              <div className={styles.chartFlush}>
                <BarChart data={chartData} dataLabel="Revenue" height={210} />
              </div>
            </DemoCard>

            <DemoCard
              heading="Quick actions"
              links={[{ label: "Circular button", href: "/components/circular-button" }]}
            >
              <div className={styles.quickActions}>
                <div className={styles.quickAction}>
                  <CircularButton icon="arrow_upward" variant="primary" ariaLabel="Send money" />
                  <span className={styles.quickActionLabel}>Send</span>
                </div>
                <div className={styles.quickAction}>
                  <CircularButton icon="arrow_downward" variant="secondary" ariaLabel="Request money" />
                  <span className={styles.quickActionLabel}>Request</span>
                </div>
                <div className={styles.quickAction}>
                  <CircularButton icon="add" variant="secondary" ariaLabel="Top up balance" />
                  <span className={styles.quickActionLabel}>Top up</span>
                </div>
                <div className={styles.quickAction}>
                  <CircularButton icon="more_horiz" variant="tertiary" ariaLabel="More actions" />
                  <span className={styles.quickActionLabel}>More</span>
                </div>
              </div>
            </DemoCard>

            <DemoCard
              heading="Invoice paid"
              links={[{ label: "Button", href: "/components/button" }]}
            >
              <div className={styles.successPanel}>
                <span className={styles.successBadge}>
                  <span className="material-symbols-rounded" aria-hidden="true">
                    check
                  </span>
                </span>
                <span className={styles.successAmount}>You received $17,975.30</span>
                <span className={styles.successHint}>
                  Invoice #3463 settled. A receipt went to accounting@example.com.
                </span>
                <div className={styles.successActions}>
                  <Button label="Next invoice" variant="primary" size="compact" />
                  <Button label="Done" variant="secondary" size="compact" />
                </div>
              </div>
            </DemoCard>

            <DemoCard
              heading="Savings targets"
              sub="Active goals across your accounts."
              links={[{ label: "Progress bar", href: "/components/progress-bar" }]}
            >
              {SAVINGS_GOALS.map((goal) => (
                <div key={goal.label} className={styles.goal}>
                  <div className={styles.goalHead}>
                    <span className={styles.rowTitle}>{goal.label}</span>
                    <span className={styles.rowHint}>{goal.target}</span>
                  </div>
                  <ProgressBar value={goal.value} showLabel ariaLabel={`${goal.label} progress`} />
                </div>
              ))}
            </DemoCard>

            <DemoCard
              heading="Payout schedule"
              sub="When your cleared balance is sent to the bank."
              links={[
                { label: "Selection card", href: "/components/selection-card" },
                { label: "Checkbox", href: "/components/checkbox" },
              ]}
            >
              <SelectionCard
                mode="radio"
                name="ds-landing-schedule"
                options={SCHEDULE_OPTIONS}
                value={schedule}
                onChange={(v) => setSchedule(v as string)}
              />
              <Checkbox
                label="Email a receipt for each payout"
                checked={receipt}
                onChange={setReceipt}
              />
            </DemoCard>

            <DemoCard
              heading="Open positions"
              links={[
                { label: "Skeleton", href: "/components/skeleton" },
                { label: "Spinner", href: "/components/spinner" },
              ]}
            >
              <div className={styles.loadingRow}>
                <Spinner size="sm" label="Loading positions" />
                <span className={styles.cardHint}>Fetching the latest prices</span>
              </div>
              <Skeleton variant="text" lines={6} />
            </DemoCard>
          </div>

          {/* -------- right column -------- */}
          <div className={styles.col}>
            <DemoCard
              heading="Portfolio value"
              sub="Against the index, in thousands."
              links={[{ label: "Chart", href: "/components/chart" }]}
            >
              <div className={styles.chartFlush}>
                <LineChart
                  data={PORTFOLIO_DATA}
                  xKey="month"
                  series={[
                    { dataKey: "value", label: "Portfolio" },
                    { dataKey: "benchmark", label: "Benchmark", strokeDasharray: "5 4" },
                  ]}
                  height={180}
                />
              </div>
            </DemoCard>

            <DemoCard
              heading="Top holdings"
              sub="By market value."
              links={[
                { label: "Table", href: "/components/table" },
                { label: "Chip", href: "/components/chip" },
              ]}
            >
              <div className={styles.badgeRow}>
                <Chip
                  label="All"
                  selected={holdingsFilter === "all"}
                  onClick={() => setHoldingsFilter("all")}
                />
                <Chip
                  label="Equity"
                  selected={holdingsFilter === "equity"}
                  onClick={() => setHoldingsFilter("equity")}
                />
                <Chip
                  label="Bonds"
                  selected={holdingsFilter === "bonds"}
                  onClick={() => setHoldingsFilter("bonds")}
                />
              </div>
              <Table
                columns={HOLDINGS_COLUMNS}
                rows={HOLDINGS_ROWS}
                bordered
                caption="Top holdings by market value"
                captionHidden
              />
            </DemoCard>

            <DemoCard
              heading="Schedule a transfer"
              sub="Pick the day the money should move."
              links={[{ label: "Date picker", href: "/components/date-picker" }]}
            >
              <div className={styles.calendarWrap}>
                <DatePicker size="compact" value={transferDate} onDateSelect={setTransferDate} />
              </div>
            </DemoCard>

            <DemoCard
              heading="Notifications"
              sub="Choose which alerts reach you."
              links={[{ label: "Toggle switch", href: "/components/toggle-switch" }]}
            >
              <div className={styles.settingRow}>
                <span className={styles.settingText}>
                  <span className={styles.settingLabel}>Transaction alerts</span>
                  <span className={styles.settingHint}>Deposits, withdrawals, and transfers</span>
                </span>
                <ToggleSwitch
                  label="Transaction alerts"
                  showLabel={false}
                  checked={alerts.transactions}
                  onChange={(v) => setAlerts((a) => ({ ...a, transactions: v }))}
                />
              </div>
              <div className={styles.settingRow}>
                <span className={styles.settingText}>
                  <span className={styles.settingLabel}>Security alerts</span>
                  <span className={styles.settingHint}>Login attempts and account changes</span>
                </span>
                <ToggleSwitch
                  label="Security alerts"
                  showLabel={false}
                  checked={alerts.security}
                  onChange={(v) => setAlerts((a) => ({ ...a, security: v }))}
                />
              </div>
              <div className={styles.settingRow}>
                <span className={styles.settingText}>
                  <span className={styles.settingLabel}>Market updates</span>
                  <span className={styles.settingHint}>Daily price summary</span>
                </span>
                <ToggleSwitch
                  label="Market updates"
                  showLabel={false}
                  checked={alerts.market}
                  onChange={(v) => setAlerts((a) => ({ ...a, market: v }))}
                />
              </div>
            </DemoCard>

            <DemoCard
              heading="Invoices"
              sub="This month, most recent first."
              links={[{ label: "Badge", href: "/components/badge" }]}
            >
              <ul className={styles.rowList}>
                {INVOICES.map((inv) => (
                  <li key={inv.id} className={styles.invoiceRow}>
                    <span className={styles.invoiceText}>
                      <span className={styles.rowTitle}>{inv.id}</span>
                      <span className={styles.rowHint}>{inv.client}</span>
                    </span>
                    <span className={styles.invoiceAmount}>{inv.amount}</span>
                    <Badge label={inv.status} variant={inv.variant} />
                  </li>
                ))}
              </ul>
            </DemoCard>

            <DemoCard
              heading="Payout threshold"
              sub="The minimum balance before a payout is triggered."
              links={[{ label: "Slider", href: "/components/slider" }]}
            >
              <div className={styles.thresholdReadout}>
                <span className={styles.thresholdLabel}>Minimum payout</span>
                <span className={styles.thresholdValue}>
                  ${(threshold * 50).toLocaleString()}
                </span>
              </div>
              <Slider
                value={threshold}
                min={10}
                max={200}
                onValueChange={setThreshold}
                ariaLabel="Minimum payout amount"
              />
              <Button label="Save threshold" variant="secondary" size="compact" />
            </DemoCard>

            <DemoCard
              heading="Invoice #3459"
              sub="From issue to payment in eleven days."
              links={[{ label: "Timeline", href: "/components/timeline" }]}
            >
              <Timeline
                items={[
                  { meta: "21 Jun", title: "Issued", description: "Sent to Acme Ltd." },
                  { meta: "24 Jun", title: "Approved", description: "Signed off by their finance team." },
                  { meta: "2 Jul", title: "Paid", description: "$12,400.00 received." },
                ]}
              />
            </DemoCard>
          </div>
        </section>
      </main>

    </>
  );
}
