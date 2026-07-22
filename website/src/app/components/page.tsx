"use client";

import Image from "next/image";
import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import TocCard from "../../components/TocCard/TocCard";
import { Accordion } from "@design-system/components/Accordion/Accordion";
import { Alert } from "@design-system/components/Alert/Alert";
import { Avatar } from "@design-system/components/Avatar/Avatar";
import { Badge } from "@design-system/components/Badge/Badge";
import { Breadcrumb } from "@design-system/components/Breadcrumb/Breadcrumb";
import { Button } from "@design-system/components/Button/Button";
import { Checkbox } from "@design-system/components/Checkbox/Checkbox";
import { Chip } from "@design-system/components/Chip/Chip";
import { CircularButton } from "@design-system/components/CircularButton/CircularButton";
import { CodeBlock } from "@design-system/components/CodeBlock/CodeBlock";
import { Quote } from "@design-system/components/Quote/Quote";
import { Stat } from "@design-system/components/Stat/Stat";
import { Timeline } from "@design-system/components/Timeline/Timeline";
import { ContributionGraph, type ContributionDay } from "@design-system/components/ContributionGraph/ContributionGraph";
import { Divider } from "@design-system/components/Divider/Divider";
import { Dropdown } from "@design-system/components/Dropdown/Dropdown";
import { Pagination } from "@design-system/components/Pagination/Pagination";
import { Input } from "@design-system/components/Input/Input";
import { ProgressBar } from "@design-system/components/ProgressBar/ProgressBar";
import { RadioButton } from "@design-system/components/RadioButton/RadioButton";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import { SegmentedControl } from "@design-system/components/SegmentedControl/SegmentedControl";
import { Skeleton } from "@design-system/components/Skeleton/Skeleton";
import { Slider } from "@design-system/components/Slider/Slider";
import { Spinner } from "@design-system/components/Spinner/Spinner";
import { Tabs } from "@design-system/components/Tabs/Tabs";
import { Textarea } from "@design-system/components/Textarea/Textarea";
import { ToggleGroup } from "@design-system/components/ToggleGroup/ToggleGroup";
import PageLinks from "../../components/PageLinks/PageLinks";
import { LinkList } from "@design-system/components/LinkList/LinkList";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components");

// Small fixed dataset for the contribution graph preview card
const contributionPreviewDays: ContributionDay[] = Array.from({ length: 8 * 7 }, (_, i) => {
  const d = new Date(2026, 0, 4 + i);
  const level = ([0, 1, 3, 0, 2, 4, 1, 0, 2, 3, 1, 4, 0, 2][i % 14]) as ContributionDay["level"];
  return {
    date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    count: level * 3,
    level,
  };
});

export default function ComponentsPage() {
  return (
    <>

      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Components</h1>
            <PageLinks figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=113-6513" storybookPath="/?path=/docs/components-button--docs" />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Every building block in one place
            </p>
            <p className={styles.introBody}>
              Each component is built on the colour, spacing, and typography tokens from the foundations pages. They all share the same padding rules, focus styles, and sizing conventions so they feel consistent when combined. Click into any component to see its variants, states, and sizing options.
            </p>
          </div>

          <div className={`${styles.tocGrid} animate-in animate-delay-2`}>
            {/* Accordion */}
            <TocCard href="/components/accordion" title="Accordion">
              <div className={styles.previewColumn} style={{ gap: "4px", width: "120px" }}>
                <div className={styles.accordionPreviewRow}>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)" }}>Section 1</span>
                  <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-primary)", transform: "rotate(180deg)" }}>expand_more</span>
                </div>
                <div className={styles.accordionPreviewRow}>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)" }}>Section 2</span>
                  <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-primary)" }}>expand_more</span>
                </div>
              </div>
            </TocCard>

            {/* Alert */}
            <TocCard href="/components/alert" title="Alert">
              <Alert variant="info" title="Heads up" size="compact" />
            </TocCard>

            {/* Alert dialog */}
            <TocCard href="/components/alert-dialog" title="Alert dialog">
              <div className={styles.previewColumn} style={{ gap: "6px", width: "120px" }}>
                <div style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-page-primary)", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-primary)" }}>Confirm?</span>
                  <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                    <div style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "9px", color: "var(--color-text-secondary)", background: "var(--color-bg-container-secondary)" }}>Cancel</div>
                    <div style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "9px", color: "#fff", background: "var(--color-action-primary-bg)" }}>OK</div>
                  </div>
                </div>
              </div>
            </TocCard>

            {/* App sidebar */}
            <TocCard href="/components/app-sidebar" title="App sidebar">
              <div className={styles.previewColumn} style={{ gap: "4px", width: "100px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 6px", borderRadius: "4px", background: "var(--color-action-passive-bg-hover)" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-primary)" }}>dashboard</span>
                  <span style={{ fontSize: "10px", color: "var(--color-text-primary)" }}>Dashboard</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 6px" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>analytics</span>
                  <span style={{ fontSize: "10px", color: "var(--color-text-secondary)" }}>Analytics</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 6px" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>settings</span>
                  <span style={{ fontSize: "10px", color: "var(--color-text-secondary)" }}>Settings</span>
                </div>
              </div>
            </TocCard>

            {/* Avatar */}
            <TocCard href="/components/avatar" title="Avatar">
              <div className={styles.previewRow} style={{ gap: "8px" }}>
                <Avatar size="sm" name="Jane Doe" />
                <Avatar size="md" name="Alex Smith" />
                <Avatar size="sm" />
              </div>
            </TocCard>

            {/* Badge */}
            <TocCard href="/components/badge" title="Badge">
              <div className={styles.previewRow} style={{ gap: "8px" }}>
                <Badge variant="info" label="Info" />
                <Badge variant="positive" label="Success" />
                <Badge variant="error" label="Error" />
              </div>
            </TocCard>

            {/* Breadcrumb */}
            <TocCard href="/components/breadcrumb" title="Breadcrumb">
              <div className={styles.previewRow} style={{ gap: "4px", fontSize: "12px" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>Home</span>
                <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-text-tertiary)" }}>chevron_right</span>
                <span style={{ color: "var(--color-text-secondary)" }}>Section</span>
                <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-text-tertiary)" }}>chevron_right</span>
                <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>Page</span>
              </div>
            </TocCard>

            {/* Button */}
            <TocCard href="/components/button" title="Button">
              <Button label="Button" priority="secondary" state="default" />
            </TocCard>

            {/* Button group */}
            <TocCard href="/components/button-group" title="Button group">
              <div className={styles.previewRow} style={{ gap: "10px" }}>
                <Button label="Active" priority="tertiary" state="active" />
                <Button label="Inactive" priority="tertiary" state="default" />
              </div>
            </TocCard>

            {/* Card */}
            <TocCard href="/components/card" title="Card">
              <div className={styles.cardPreview} />
            </TocCard>

            {/* Carousel */}
            <TocCard href="/components/carousel" title="Carousel">
              <div className={styles.previewRow} style={{ gap: "8px", alignItems: "center" }}>
                <span className="material-symbols-rounded" style={{ fontSize: "18px", color: "var(--color-icon-secondary)" }}>chevron_left</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-action-primary-bg)" }} />
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-bg-container-border)" }} />
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-bg-container-border)" }} />
                </div>
                <span className="material-symbols-rounded" style={{ fontSize: "18px", color: "var(--color-icon-secondary)" }}>chevron_right</span>
              </div>
            </TocCard>

            {/* Chart */}
            <TocCard href="/components/chart" title="Chart">
              <svg width="120" height="64" viewBox="0 0 120 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
                {[
                  { x: 4, h: 28 },
                  { x: 18, h: 44 },
                  { x: 32, h: 36 },
                  { x: 46, h: 52 },
                  { x: 60, h: 24 },
                  { x: 74, h: 40 },
                  { x: 88, h: 48 },
                  { x: 102, h: 32 },
                ].map((bar, i) => (
                  <rect
                    key={i}
                    x={bar.x}
                    y={64 - bar.h}
                    width={10}
                    height={bar.h}
                    rx={2}
                    fill="var(--color-action-primary-bg)"
                    opacity={0.85}
                  />
                ))}
                <line x1="0" y1="63.5" x2="120" y2="63.5" stroke="var(--color-bg-container-border)" strokeWidth="1" />
              </svg>
            </TocCard>

            {/* Checkbox */}
            <TocCard href="/components/checkbox" title="Checkbox">
              <div className={styles.previewRow} style={{ gap: "16px" }}>
                <Checkbox checked={true} ariaLabel="Checked" onChange={() => {}} />
                <Checkbox checked={false} ariaLabel="Unchecked" onChange={() => {}} />
              </div>
            </TocCard>

            {/* Chip */}
            <TocCard href="/components/chip" title="Chip">
              <div className={styles.previewRow} style={{ gap: "8px" }}>
                <Chip size="compact" label="Filter" icon="check" selected onClick={() => {}} />
                <Chip size="compact" label="Label" />
                <Chip size="compact" label="Tag" onRemove={() => {}} />
              </div>
            </TocCard>

            {/* Circular button */}
            <TocCard href="/components/circular-button" title="Circular button">
              <div className={styles.previewRow} style={{ gap: "12px" }}>
                <CircularButton icon="search" ariaLabel="Search" priority="secondary" />
                <CircularButton icon="settings" ariaLabel="Settings" priority="tertiary" />
              </div>
            </TocCard>

            {/* Code block */}
            <TocCard href="/components/code-block" title="Code block">
              <div style={{ width: "180px" }}>
                <CodeBlock code={`--radius-full: 999px;`} filename="tokens.css" showCopy={false} />
              </div>
            </TocCard>

            {/* Contact card */}
            <TocCard href="/components/contact-card" title="Contact card">
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "160px" }}>
                {[
                  { icon: "mail", label: "Email" },
                  { icon: "person", label: "LinkedIn" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 10px", borderRadius: "8px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-container-primary-semi)" }}>
                    <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>{item.icon}</span>
                    <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)", flex: 1 }}>{item.label}</span>
                    <span className="material-symbols-rounded" style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>open_in_new</span>
                  </div>
                ))}
              </div>
            </TocCard>

            {/* Contribution graph */}
            <TocCard href="/components/contribution-graph" title="Contribution graph">
              {/* The graph is fluid (width: 100%) — constrain it so the
                  cells stay small inside the preview card */}
              <div style={{ width: "150px" }}>
                <ContributionGraph
                  days={contributionPreviewDays}
                  showMonthLabels={false}
                  showLegend={false}
                />
              </div>
            </TocCard>

            {/* Date input */}
            <TocCard href="/components/date-input" title="Date input">
              <div className={styles.inputPreview}>
                <span style={{ color: "var(--color-text-tertiary)", fontSize: "14px" }}>
                  dd/mm/yyyy
                </span>
              </div>
            </TocCard>

            {/* Date picker */}
            <TocCard href="/components/date-picker" title="Date picker">
              <span className="material-symbols-rounded" style={{ fontSize: "36px", color: "var(--color-icon-primary)" }}>
                calendar_month
              </span>
            </TocCard>

            {/* Dialog */}
            <TocCard href="/components/dialog" title="Dialog">
              <div style={{ padding: "10px", borderRadius: "6px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-page-primary)", display: "flex", flexDirection: "column", gap: "6px", width: "130px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-primary)" }}>Edit profile</span>
                  <span className="material-symbols-rounded" style={{ fontSize: "12px", color: "var(--color-icon-primary)" }}>close</span>
                </div>
                <div style={{ height: "5px", borderRadius: "3px", background: "var(--color-bg-container-primary)" }} />
                <div style={{ height: "5px", borderRadius: "3px", background: "var(--color-bg-container-primary)", width: "70%" }} />
                <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                  <div style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "9px", color: "#fff", background: "var(--color-action-primary-bg)" }}>Save</div>
                </div>
              </div>
            </TocCard>

            {/* Divider */}
            <TocCard href="/components/divider" title="Divider">
              <div style={{ width: "120px" }}>
                <Divider spacing="sm" />
                <Divider label="or" spacing="sm" />
              </div>
            </TocCard>

            {/* Dropdown */}
            <TocCard href="/components/dropdown" title="Dropdown">
              <div className={styles.dropdownPreview}>
                <span className={styles.dropdownPreviewText}>Select</span>
                <span className="material-symbols-rounded" style={{ fontSize: "20px", color: "var(--color-icon-primary)" }}>
                  expand_more
                </span>
              </div>
            </TocCard>

            {/* Dropdown menu */}
            <TocCard href="/components/dropdown-menu" title="Dropdown menu">
              <div className={styles.dropdownMenuPreview}>
                <div className={styles.dropdownMenuPreviewItem}>
                  <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>person</span>
                  <span style={{ fontSize: "11px", color: "var(--color-text-primary)" }}>Profile</span>
                </div>
                <div className={styles.dropdownMenuPreviewItem} style={{ background: "var(--color-action-passive-bg-hover)" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>settings</span>
                  <span style={{ fontSize: "11px", color: "var(--color-text-primary)" }}>Settings</span>
                </div>
                <div className={styles.dropdownMenuPreviewSep} />
                <div className={styles.dropdownMenuPreviewItem}>
                  <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>logout</span>
                  <span style={{ fontSize: "11px", color: "var(--color-text-primary)" }}>Log out</span>
                </div>
              </div>
            </TocCard>

            {/* Figure */}
            <TocCard href="/components/figure" title="Figure">
              <div style={{ width: "140px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--color-bg-container-border)" }}>
                <div style={{ height: "60px", background: "var(--color-bg-container-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-rounded" style={{ fontSize: "24px", color: "var(--color-icon-secondary)" }}>image</span>
                </div>
                <div style={{ padding: "6px 10px", fontSize: "10px", color: "var(--color-text-tertiary)", borderTop: "1px solid var(--color-bg-container-border)" }}>
                  Caption text
                </div>
              </div>
            </TocCard>

            {/* Input */}
            <TocCard href="/components/input" title="Input">
              <div className={styles.inputPreview}>
                <span style={{ color: "var(--color-text-tertiary)", fontSize: "14px" }}>
                  Enter text...
                </span>
              </div>
            </TocCard>

            {/* Instructions */}
            <TocCard href="/components/instructions" title="Instructions">
              <div className={styles.previewColumn} style={{ gap: "6px" }}>
                <div className={styles.instructionStep}>
                  <span className={styles.instructionBadge}>1</span>
                  <span className={styles.instructionLabel}>First</span>
                </div>
                <div className={styles.instructionStep}>
                  <span className={styles.instructionBadge}>2</span>
                  <span className={styles.instructionLabel}>Second</span>
                </div>
              </div>
            </TocCard>

            {/* Link list */}
            <TocCard href="/components/link-list" title="Link list">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { logo: "/logos/substack.svg", label: "Substack" },
                  { logo: "/logos/Git.svg", label: "GitHub" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img src={item.logo} alt="" width={20} height={20} style={{ objectFit: "contain", flexShrink: 0 }} />
                    <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)" }}>{item.label}</span>
                    <span className="material-symbols-rounded" style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginLeft: "auto" }}>open_in_new</span>
                  </div>
                ))}
              </div>
            </TocCard>

            {/* Navigation */}
            <TocCard href="/components/navigation" title="Navigation">
              <div className={styles.previewRow} style={{ gap: "20px" }}>
                <Image src="/rr.svg" alt="robr0" width={24} height={24} />
                <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.16px" }}>
                  robr0
                </span>
              </div>
            </TocCard>

            {/* Pagination */}
            <TocCard href="/components/pagination" title="Pagination">
              <Pagination page={2} pageCount={3} onPageChange={() => {}} size="compact" />
            </TocCard>

            {/* Popover */}
            <TocCard href="/components/popover" title="Popover">
              <div className={styles.popoverPreview}>
                <span style={{ fontSize: "12px", color: "var(--color-text-primary)" }}>
                  Popover
                </span>
                <div className={styles.popoverArrow} />
              </div>
            </TocCard>

            {/* Progress bar */}
            <TocCard href="/components/progress-bar" title="Progress bar">
              <div style={{ width: "120px" }}>
                <ProgressBar value={65} size="compact" />
              </div>
            </TocCard>

            {/* Quote */}
            <TocCard href="/components/quote" title="Quote">
              <div style={{ width: "170px" }}>
                <Quote>
                  <span style={{ fontSize: "12px", lineHeight: "16px", display: "block" }}>
                    Systems are coordination problems.
                  </span>
                </Quote>
              </div>
            </TocCard>

            {/* Radio button */}
            <TocCard href="/components/radio-button" title="Radio button">
              <div className={styles.previewColumn} style={{ gap: "16px" }}>
                <RadioButton label="Option A" checked={true} onChange={() => {}} />
                <RadioButton label="Option B" checked={false} onChange={() => {}} />
              </div>
            </TocCard>

            {/* Section title */}
            <TocCard href="/components/section-title" title="Section title">
              <div className={styles.sectionTitlePreview}>
                <span className={styles.sectionTitlePreviewText}>Section</span>
                <div className={styles.sectionTitlePreviewDivider} />
              </div>
            </TocCard>

            {/* Segmented control */}
            <TocCard href="/components/segmented-control" title="Segmented control">
              <SegmentedControl
                segments={[
                  { label: "A", value: "a" },
                  { label: "B", value: "b" },
                ]}
                activeSegment="a"
                size="compact"
              />
            </TocCard>

            {/* Selection card */}
            <TocCard href="/components/selection-card" title="Selection card">
              <div className={styles.previewColumn} style={{ gap: "6px", width: "180px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-action-primary-border)" }}>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-text-primary)" }}>A</span>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid var(--color-action-primary-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-action-primary-bg)" }} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-bg-container-border)" }}>
                  <span style={{ fontSize: "12px", color: "var(--color-text-primary)" }}>B</span>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid var(--color-bg-container-border)" }} />
                </div>
              </div>
            </TocCard>

            {/* Skeleton */}
            <TocCard href="/components/skeleton" title="Skeleton">
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Skeleton variant="circular" width="32px" height="32px" />
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Skeleton variant="text" width="80px" />
                  <Skeleton variant="text" width="60px" />
                </div>
              </div>
            </TocCard>

            {/* Slider */}
            <TocCard href="/components/slider" title="Slider">
              <div style={{ width: "120px" }}>
                <Slider value={60} />
              </div>
            </TocCard>

            {/* Spinner */}
            <TocCard href="/components/spinner" title="Spinner">
              <Spinner size="lg" />
            </TocCard>

            {/* Stat */}
            <TocCard href="/components/stat" title="Stat">
              <Stat value="~900%" label="Successful generations" trend="up" delta="+clash view" />
            </TocCard>

            {/* Table */}
            <TocCard href="/components/table" title="Table">
              <div className={styles.tablePreview}>
                <div className={`${styles.tablePreviewRow} ${styles.tablePreviewRowHeader}`} />
                <div className={styles.tablePreviewRow} />
                <div className={styles.tablePreviewRow} />
                <div className={styles.tablePreviewRow} />
              </div>
            </TocCard>

            {/* Tabs */}
            <TocCard href="/components/tabs" title="Tabs">
              <Tabs
                tabs={[
                  { label: "One", value: "one" },
                  { label: "Two", value: "two" },
                ]}
                activeTab="one"
                size="compact"
                onTabChange={() => {}}
              />
            </TocCard>

            {/* Textarea */}
            <TocCard href="/components/textarea" title="Textarea">
              <div className={styles.textareaPreview}>
                <span style={{ color: "var(--color-text-tertiary)", fontSize: "14px" }}>
                  Enter text...
                </span>
              </div>
            </TocCard>

            {/* Timeline */}
            <TocCard href="/components/timeline" title="Timeline">
              <div style={{ width: "150px" }}>
                <Timeline
                  numbered
                  items={[{ title: "Discover" }, { title: "Design" }, { title: "Ship" }]}
                />
              </div>
            </TocCard>

            {/* Toast */}
            <TocCard href="/components/toast" title="Toast">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 10px", borderRadius: "6px", background: "var(--color-status-positive-bg)", border: "1px solid var(--color-status-positive-border)" }}>
                <span className="material-symbols-rounded" style={{ fontSize: "16px", color: "var(--color-status-positive-border)" }}>check_circle</span>
                <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-status-positive-text)" }}>Saved</span>
              </div>
            </TocCard>

            {/* Toggle group */}
            <TocCard href="/components/toggle-group" title="Toggle group">
              <ToggleGroup
                items={[
                  { value: "bold", label: "format_bold", icon: true },
                  { value: "italic", label: "format_italic", icon: true },
                  { value: "underline", label: "format_underlined", icon: true },
                ]}
                value={["bold"]}
                multiple
                size="compact"
              />
            </TocCard>

            {/* Toggle switch */}
            <TocCard href="/components/toggle-switch" title="Toggle switch">
              <div className={styles.togglePreview}>
                <div className={styles.toggleSocket}>
                  <div className={styles.toggleThumb}>
                    <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-action-primary-bg)" }}>
                      check
                    </span>
                  </div>
                </div>
              </div>
            </TocCard>

            {/* Tooltip */}
            <TocCard href="/components/tooltip" title="Tooltip">
              <div className={styles.popoverPreview}>
                <span style={{ fontSize: "12px", color: "var(--color-bg-page-primary)", background: "var(--color-bg-page-inverse)", padding: "2px 8px", borderRadius: "4px" }}>
                  Tooltip
                </span>
                <div style={{ width: "8px", height: "8px", background: "var(--color-bg-page-inverse)", transform: "rotate(45deg)", marginTop: "-5px" }} />
              </div>
            </TocCard>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
