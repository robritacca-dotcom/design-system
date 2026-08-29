"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import ComponentsSidebar from "../../../components/Sidebar/ComponentsSidebar";
import { Gauge } from "@robr0/design-system/components/Gauge/Gauge";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import styles from "./page.module.css";

const capacityThresholds = [
  { value: 70, tone: "warning" },
  { value: 90, tone: "error" },
] as const;

export default function GaugePage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <ComponentsSidebar />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Gauge</h1>
            <PageLinks storybookPath="/?path=/docs/components-gauge--docs" />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              One bounded number, read at a glance
            </p>
            <p className={styles.introBody}>
              A radial dial for capacity, usage, or a score against a target.
              Like Sparkline it is dependency-free SVG with no client
              JavaScript, so it renders from a Server Component and drops
              straight into a Panel. Thresholds recolour the dial through the
              status roles as the reading crosses them, and the arc animates
              between readings.
            </p>
          </div>

          <section className={`${styles.section} animate-in animate-delay-2`}>
            <SectionTitle title="Thresholds" />
            <p className={styles.sectionBody}>
              The point of a dial over a plain number: the colour carries the
              judgement. These three share one threshold set, amber at 70 and
              red at 90, and recolour themselves.
            </p>
            <div className={styles.exampleRow}>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>Healthy</span>
                <Gauge value={46} label="CPU" thresholds={[...capacityThresholds]} />
              </div>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>Warning</span>
                <Gauge value={78} label="CPU" thresholds={[...capacityThresholds]} />
              </div>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>Critical</span>
                <Gauge value={94} label="CPU" thresholds={[...capacityThresholds]} />
              </div>
            </div>
          </section>

          <section className={`${styles.section} animate-in animate-delay-3`}>
            <SectionTitle title="Tones" />
            <p className={styles.sectionBody}>
              Without thresholds, the tone is set directly. Accent follows the
              action colour; the status tones use the border tokens, which hold
              their hue in both themes; neutral recedes to secondary text.
            </p>
            <div className={styles.exampleRow}>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>Accent</span>
                <Gauge value={64} size={96} label="Default" />
              </div>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>Positive</span>
                <Gauge value={64} size={96} tone="positive" label="Passing" />
              </div>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>Warning</span>
                <Gauge value={64} size={96} tone="warning" label="Degraded" />
              </div>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>Error</span>
                <Gauge value={64} size={96} tone="error" label="Failing" />
              </div>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>Neutral</span>
                <Gauge value={64} size={96} tone="neutral" label="Idle" />
              </div>
            </div>
          </section>

          <section className={`${styles.section} animate-in animate-delay-4`}>
            <SectionTitle title="Formatting" />
            <p className={styles.sectionBody}>
              The centre reading goes through formatValue, so units, precision,
              and locale are the consumer&apos;s call. The formatted string is
              also what assistive technology announces.
            </p>
            <div className={styles.exampleRow}>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>Score out of ten</span>
                <Gauge
                  value={7.4}
                  min={0}
                  max={10}
                  tone="positive"
                  label="Quality score"
                  formatValue={(v) => v.toFixed(1)}
                />
              </div>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>Percentage</span>
                <Gauge
                  value={99.98}
                  label="Uptime"
                  tone="positive"
                  formatValue={(v) => `${v}%`}
                  size={140}
                />
              </div>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>Dial only</span>
                <Gauge value={55} showValue={false} aria-label="Progress" />
              </div>
            </div>
          </section>

          <section className={`${styles.section} animate-in animate-delay-5`}>
            <SectionTitle title="Sizes" />
            <p className={styles.sectionBody}>
              Size and stroke width are plain pixel geometry. The centre
              typography stays on the heading and caption ramps, so the small
              end works best without a caption.
            </p>
            <div className={styles.exampleRow}>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>80px</span>
                <Gauge value={40} size={80} strokeWidth={8} aria-label="Disk usage" />
              </div>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>120px, default</span>
                <Gauge value={64} label="Memory" />
              </div>
              <div className={styles.exampleCell}>
                <span className={styles.exampleLabel}>180px</span>
                <Gauge value={91} size={180} strokeWidth={14} label="Capacity" thresholds={[...capacityThresholds]} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
