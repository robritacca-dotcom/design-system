"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import ComponentsSidebar from "../../../components/Sidebar/ComponentsSidebar";
import { Timeline } from "@robr0/design-system/components/Timeline/Timeline";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import styles from "./page.module.css";

const CAREER = [
  {
    meta: "May 2024 – Present",
    title: "Intuit, Staff Product Designer",
    description:
      "Intuit Agent Chat, the conversational AI platform serving ~50M sessions in production.",
  },
  {
    meta: "Aug 2023 – May 2024",
    title: "Augmenta, Lead Product Designer",
    description:
      "AI generation workflows for electrical routing: successful generations up ~900%.",
  },
  {
    meta: "2021 – 2023",
    title: "Meta, Product Designer",
    description: "Career Profile and Offer Creation platforms for global recruiting.",
  },
];

const LOOP_RUN = [
  { title: "Pull analytics" },
  { title: "One hypothesis" },
  { title: "Rewrite on a branch" },
  { title: "Approval" },
];

const companyLogo = (src: string, alt: string) => (
  <Image src={src} alt={alt} width={32} height={32} />
);

const EXPERIENCE = [
  {
    name: "Intuit",
    logo: companyLogo("/logos/Intuit.svg", "Intuit"),
    roles: [
      {
        title: "Principal Product Designer",
        subtitle: "Consumer AI",
        start: "Jan 2026",
        present: true,
        bullets: [
          "Shipped TurboTax's embedded AI experiences inside ChatGPT and Claude.",
          <>
            Designed the bidirectional filing checklist (full story in the{" "}
            <Link href="/work/embedded-ai-turbotax">case study</Link>)
          </>,
        ],
      },
      {
        title: "Principal Product Designer",
        subtitle: "Agent Platform",
        start: "May 2024",
        end: "Jan 2026",
        bullets: [
          "Led design of Intuit's end-to-end conversational AI platform.",
          "Scaled to 70+ agents in production.",
        ],
      },
    ],
  },
  {
    name: "Augmenta",
    logo: companyLogo("/logos/Augmenta-2026.svg", "Augmenta"),
    roles: [
      {
        title: "Principal Product Designer",
        start: "Aug 2023",
        end: "May 2024",
        description:
          "Led end-to-end UX for a 0→1 generative AI tool for constructible, code-compliant electrical raceway designs.",
        bullets: [
          "Cut time-to-value from 14 to 5 days.",
          "Reduced anomalies per output by 60%.",
        ],
      },
    ],
  },
];

export default function TimelinePage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <ComponentsSidebar />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Timeline</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-timeline--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Ordered sequences: histories and steppers
            </p>
            <p className={styles.introBody}>
              One component, two orientations. Vertical for histories and process
              narratives: career entries, project phases. Horizontal for compact
              steppers like a loop&apos;s run stages. Markers are dots by default,
              numbered circles with <code>numbered</code>, or Material Symbols per item.
              The <code>company</code> variant swaps the marker for a logo and groups one
              or more roles (each with a right-aligned date) under a single entry.
            </p>
          </div>

          {/* Vertical */}
          <section className={styles.section}>
            <SectionTitle title="Vertical: a history" />
            <Timeline items={CAREER} />
          </section>

          {/* Numbered */}
          <section className={styles.section}>
            <SectionTitle title="Vertical: numbered steps" />
            <Timeline numbered items={LOOP_RUN} />
          </section>

          {/* Icons */}
          <section className={styles.section}>
            <SectionTitle title="With icons" />
            <Timeline
              items={[
                { icon: "monitoring", title: "Pull analytics", description: "Read GA4, filter bot noise." },
                { icon: "edit", title: "Rewrite on a branch", description: "One copy-shaped change per run." },
                { icon: "check_circle", title: "Approval", description: "A human approves every merge." },
              ]}
            />
          </section>

          {/* Horizontal */}
          <section className={styles.section}>
            <SectionTitle title="Horizontal stepper" />
            <Timeline orientation="horizontal" numbered items={LOOP_RUN} />
          </section>

          {/* Company */}
          <section className={styles.section}>
            <SectionTitle title="Company: grouped roles" />
            <Timeline variant="company" items={EXPERIENCE} />
          </section>
        </main>
      </div>

    </>
  );
}
