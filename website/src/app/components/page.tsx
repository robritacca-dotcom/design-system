"use client";

import Image from "next/image";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import TocCard from "../../components/TocCard/TocCard";
import { Button } from "@design-system/components/Button/Button";
import { Checkbox } from "@design-system/components/Checkbox/Checkbox";
import { Dropdown } from "@design-system/components/Dropdown/Dropdown";
import { Input } from "@design-system/components/Input/Input";
import { RadioButton } from "@design-system/components/RadioButton/RadioButton";
import { Tabs } from "@design-system/components/Tabs/Tabs";
import { Textarea } from "@design-system/components/Textarea/Textarea";
import PageLinks from "../../components/PageLinks/PageLinks";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components", active: true },
  { href: "/foundations", label: "Foundations" },
];

const sidebarLinks = [
  { href: "/components", label: "Contents", active: true },
  { href: "/components/button", label: "Button" },
  { href: "/components/button-group", label: "Button group" },
  { href: "/components/card", label: "Card" },
  { href: "/components/checkbox", label: "Checkbox" },
  { href: "/components/dropdown", label: "Dropdown" },
  { href: "/components/input", label: "Input" },
  { href: "/components/navigation", label: "Navigation" },
  { href: "/components/radio-button", label: "Radio button" },
  { href: "/components/tabs", label: "Tabs" },
  { href: "/components/textarea", label: "Textarea" },
  { href: "/components/toggle-switch", label: "Toggle switch" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

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

            {/* Navigation */}
            <TocCard href="/components/navigation" title="Navigation">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "20px" }}>
                <Image src="/rr.svg" alt="robr0" width={24} height={24} />
                <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.16px" }}>
                  robr0
                </span>
              </div>
            </TocCard>

            {/* Radio button */}
            <TocCard href="/components/radio-button" title="Radio button">
              <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "16px", flexDirection: "column" }}>
                <RadioButton label="Option A" checked={true} onChange={() => {}} />
                <RadioButton label="Option B" checked={false} onChange={() => {}} />
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
