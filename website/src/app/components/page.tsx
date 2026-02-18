"use client";

import Image from "next/image";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import TocCard from "../../components/TocCard/TocCard";
import { Accordion } from "@design-system/components/Accordion/Accordion";
import { Alert } from "@design-system/components/Alert/Alert";
import { Badge } from "@design-system/components/Badge/Badge";
import { Breadcrumb } from "@design-system/components/Breadcrumb/Breadcrumb";
import { Button } from "@design-system/components/Button/Button";
import { Checkbox } from "@design-system/components/Checkbox/Checkbox";
import { CircularButton } from "@design-system/components/CircularButton/CircularButton";
import { Dropdown } from "@design-system/components/Dropdown/Dropdown";
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
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components");

export default function ComponentsPage() {
  return (
    <>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Components</h1>
            <PageLinks figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=113-6513" storybookPath="/?path=/docs/robr0-ds--docs" />
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

            {/* Checkbox */}
            <TocCard href="/components/checkbox" title="Checkbox">
              <div className={styles.previewRow} style={{ gap: "16px" }}>
                <Checkbox checked={true} ariaLabel="Checked" onChange={() => {}} />
                <Checkbox checked={false} ariaLabel="Unchecked" onChange={() => {}} />
              </div>
            </TocCard>

            {/* Circular button */}
            <TocCard href="/components/circular-button" title="Circular button">
              <div className={styles.previewRow} style={{ gap: "12px" }}>
                <CircularButton icon="search" ariaLabel="Search" priority="secondary" />
                <CircularButton icon="settings" ariaLabel="Settings" priority="tertiary" />
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

            {/* Navigation */}
            <TocCard href="/components/navigation" title="Navigation">
              <div className={styles.previewRow} style={{ gap: "20px" }}>
                <Image src="/rr.svg" alt="robr0" width={24} height={24} />
                <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.16px" }}>
                  robr0
                </span>
              </div>
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

            {/* Selection card */}
            <TocCard href="/components/selection-card" title="Selection card">
              <div className={styles.previewColumn} style={{ gap: "4px", width: "130px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px", borderRadius: "8px", border: "1px solid var(--color-action-primary-border)" }}>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)" }}>Option A</span>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid var(--color-action-primary-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-action-primary-bg)" }} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px", borderRadius: "8px", border: "1px solid var(--color-bg-container-border)" }}>
                  <span style={{ fontSize: "11px", color: "var(--color-text-primary)" }}>Option B</span>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid var(--color-bg-container-border)" }} />
                </div>
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
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
