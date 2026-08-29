"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import ComponentsSidebar from "../../../components/Sidebar/ComponentsSidebar";
import { SplitButton } from "@robr0/design-system/components/SplitButton/SplitButton";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import styles from "./page.module.css";

const saveItems = [
  { label: "Save as draft", icon: "draft" },
  { label: "Save as template", icon: "dashboard_customize" },
  { type: "separator" as const },
  { label: "Discard changes", icon: "delete", destructive: true },
];

const exportItems = [
  { label: "Export as CSV", icon: "csv" },
  { label: "Export as JSON", icon: "data_object" },
  { label: "Export as PDF", icon: "picture_as_pdf" },
];

export default function SplitButtonPage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <ComponentsSidebar />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Split button</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-splitbutton--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              One default action, with the alternatives attached
            </p>
            <p className={styles.introBody}>
              The label fires the primary action directly; the chevron opens a menu of variants. One pill silhouette, two segments, so the common case stays one click away while the rest stays discoverable.
            </p>
          </div>

          {/* Variants */}
          <section className={styles.section}>
            <SectionTitle title="Variants" />
            <div className={styles.variantRow}>
              <SplitButton label="Save" items={saveItems} />
              <SplitButton label="Export" variant="secondary" items={exportItems} />
            </div>
          </section>

          {/* Sizes */}
          <section className={styles.section}>
            <SectionTitle title="Sizes" />
            <div className={styles.variantRow}>
              <SplitButton label="Save" items={saveItems} />
              <SplitButton label="Save" size="compact" items={saveItems} />
            </div>
          </section>

          {/* With icon */}
          <section className={styles.section}>
            <SectionTitle title="With icon" />
            <div className={styles.variantRow}>
              <SplitButton label="Save" iconLeft="save" items={saveItems} />
            </div>
          </section>

          {/* States */}
          <section className={styles.section}>
            <SectionTitle title="States" />
            <div className={styles.variantRow}>
              <SplitButton label="Saving" loading items={saveItems} />
              <SplitButton label="Save" disabled items={saveItems} />
            </div>
          </section>
        </main>
      </div>

    </>
  );
}
