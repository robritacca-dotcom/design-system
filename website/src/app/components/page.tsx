"use client";

import Image from "next/image";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import TocCard from "../../components/TocCard/TocCard";
import { Alert } from "@design-system/components/Alert/Alert";
import { Button } from "@design-system/components/Button/Button";
import { Checkbox } from "@design-system/components/Checkbox/Checkbox";
import { CircularButton } from "@design-system/components/CircularButton/CircularButton";
import { Dropdown } from "@design-system/components/Dropdown/Dropdown";
import { Input } from "@design-system/components/Input/Input";
import { RadioButton } from "@design-system/components/RadioButton/RadioButton";
import { SegmentedControl } from "@design-system/components/SegmentedControl/SegmentedControl";
import { Tabs } from "@design-system/components/Tabs/Tabs";
import { Textarea } from "@design-system/components/Textarea/Textarea";
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
            <PageLinks figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26" />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Reusable UI elements built from design tokens
            </p>
            <p className={styles.introBody}>
              Components are assembled from tokens and shared layout structures. When a pattern appears more than once, it becomes a reusable component instead of a custom layout. Each component reflects how it is actually implemented, including structure, constraints, and states. Layout primitives handle structure, while components handle interaction and composition.
            </p>
          </div>

          <div className={`${styles.tocGrid} animate-in animate-delay-2`}>
            {/* Alert */}
            <TocCard href="/components/alert" title="Alert">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <Alert variant="info" title="Heads up" size="compact" />
              </div>
            </TocCard>

            {/* Button */}
            <TocCard href="/components/button" title="Button">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <Button label="Button" priority="primary" state="default" />
              </div>
            </TocCard>

            {/* Button group */}
            <TocCard href="/components/button-group" title="Button group">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "10px" }}>
                <Button label="Active" priority="secondary" state="active" />
                <Button label="Inactive" priority="secondary" state="default" />
              </div>
            </TocCard>

            {/* Card */}
            <TocCard href="/components/card" title="Card">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <div className={styles.cardPreview} />
              </div>
            </TocCard>

            {/* Checkbox */}
            <TocCard href="/components/checkbox" title="Checkbox">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "16px" }}>
                <Checkbox checked={true} ariaLabel="Checked" onChange={() => {}} />
                <Checkbox checked={false} ariaLabel="Unchecked" onChange={() => {}} />
              </div>
            </TocCard>

            {/* Circular button */}
            <TocCard href="/components/circular-button" title="Circular button">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "12px" }}>
                <CircularButton icon="search" ariaLabel="Search" priority="primary" />
                <CircularButton icon="settings" ariaLabel="Settings" priority="secondary" />
              </div>
            </TocCard>

            {/* Date input */}
            <TocCard href="/components/date-input" title="Date input">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <div className={styles.inputPreview}>
                  <span style={{ color: "var(--color-text-tertiary)", fontSize: "14px" }}>
                    dd/mm/yyyy
                  </span>
                </div>
              </div>
            </TocCard>

            {/* Date picker */}
            <TocCard href="/components/date-picker" title="Date picker">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <span className="material-symbols-rounded" style={{ fontSize: "36px", color: "var(--color-icon-primary)" }}>
                  calendar_month
                </span>
              </div>
            </TocCard>

            {/* Dropdown */}
            <TocCard href="/components/dropdown" title="Dropdown">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <div className={styles.dropdownPreview}>
                  <span className={styles.dropdownPreviewText}>Select</span>
                  <span className="material-symbols-rounded" style={{ fontSize: "20px", color: "var(--color-icon-primary)" }}>
                    expand_more
                  </span>
                </div>
              </div>
            </TocCard>

            {/* Input */}
            <TocCard href="/components/input" title="Input">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <div className={styles.inputPreview}>
                  <span style={{ color: "var(--color-text-tertiary)", fontSize: "14px" }}>
                    Enter text...
                  </span>
                </div>
              </div>
            </TocCard>

            {/* Instructions */}
            <TocCard href="/components/instructions" title="Instructions">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "6px", flexDirection: "column" }}>
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
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "20px" }}>
                <Image src="/rr.svg" alt="robr0" width={24} height={24} />
                <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.16px" }}>
                  robr0
                </span>
              </div>
            </TocCard>

            {/* Popover */}
            <TocCard href="/components/popover" title="Popover">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <div className={styles.popoverPreview}>
                  <span style={{ fontSize: "12px", color: "var(--color-text-primary)" }}>
                    Popover
                  </span>
                  <div className={styles.popoverArrow} />
                </div>
              </div>
            </TocCard>

            {/* Radio button */}
            <TocCard href="/components/radio-button" title="Radio button">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "16px", flexDirection: "column" }}>
                <RadioButton label="Option A" checked={true} onChange={() => {}} />
                <RadioButton label="Option B" checked={false} onChange={() => {}} />
              </div>
            </TocCard>

            {/* Segmented control */}
            <TocCard href="/components/segmented-control" title="Segmented control">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <SegmentedControl
                  segments={[
                    { label: "A", value: "a" },
                    { label: "B", value: "b" },
                  ]}
                  activeSegment="a"
                  size="compact"
                />
              </div>
            </TocCard>

            {/* Tabs */}
            <TocCard href="/components/tabs" title="Tabs">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <Tabs
                  tabs={[
                    { label: "One", value: "one" },
                    { label: "Two", value: "two" },
                  ]}
                  activeTab="one"
                  size="compact"
                  onTabChange={() => {}}
                />
              </div>
            </TocCard>

            {/* Textarea */}
            <TocCard href="/components/textarea" title="Textarea">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <div className={styles.textareaPreview}>
                  <span style={{ color: "var(--color-text-tertiary)", fontSize: "14px" }}>
                    Enter text...
                  </span>
                </div>
              </div>
            </TocCard>

            {/* Toggle switch */}
            <TocCard href="/components/toggle-switch" title="Toggle switch">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`}>
                <div className={styles.togglePreview}>
                  <div className={styles.toggleSocket}>
                    <div className={styles.toggleThumb}>
                      <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-action-primary-bg)" }}>
                        check
                      </span>
                    </div>
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
