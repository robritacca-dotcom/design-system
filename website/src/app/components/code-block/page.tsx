"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { CodeBlock } from "@design-system/components/CodeBlock/CodeBlock";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components/code-block");

const USAGE_SNIPPET = `import { Chip } from '@design-system/components/Chip/Chip';

<Chip label="Filter" icon="check" selected onClick={toggle} />`;

const TOKEN_SNIPPET = `/* Semantic tokens reference primitives — never skip a tier */
--color-action-primary-bg: var(--primitive-teal-07);   /* #118AB2 */
--color-text-primary: var(--primitive-neutral-09);     /* #050505 */
--radius-full: var(--primitive-radius-full);           /* 999px */`;

export default function CodeBlockPage() {
  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Code block</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-codeblock--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Monospace code with a header and one-click copy
            </p>
            <p className={styles.introBody}>
              The system&apos;s one sanctioned monospace context. An optional header carries a
              filename and language tag; the copy button confirms with a check for two
              seconds. Long lines scroll horizontally inside the block.
            </p>
          </div>

          {/* With header */}
          <section className={styles.section}>
            <SectionTitle title="With filename and language" />
            <CodeBlock code={TOKEN_SNIPPET} filename="tokens-light.css" language="css" />
          </section>

          {/* Usage snippet */}
          <section className={styles.section}>
            <SectionTitle title="Usage snippet" />
            <p className={styles.introBody}>
              The intended everyday use: component usage examples on these showcase pages.
            </p>
            <CodeBlock code={USAGE_SNIPPET} language="tsx" />
          </section>

          {/* Bare */}
          <section className={styles.section}>
            <SectionTitle title="Bare — no header" />
            <CodeBlock code="npm run storybook" showCopy={false} />
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
