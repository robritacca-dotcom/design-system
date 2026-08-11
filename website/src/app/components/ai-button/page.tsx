"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import { AiButton } from "@robr0/design-system/components/AiButton/AiButton";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  componentsSidebarLinks,
  "/components/ai-button"
);

export default function AiButtonPage() {
  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>AI button</h1>
            <PageLinks storybookPath="/?path=/docs/components-aibutton--docs" />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              The entry point that says a model answers here
            </p>
            <p className={styles.introBody}>
              Icon and label on a transparent field, ringed by the AI gradient
              turning slowly, with a soft glow of the same gradient behind it.
              The treatment is reserved: ordinary actions keep the flat action
              teal, and this ring marks the surfaces where an AI responds, so
              neither affordance dilutes the other. This site&rsquo;s own chat
              opens from one.
            </p>
          </div>

          {/* Default */}
          <section className={styles.section}>
            <SectionTitle title="Default" />
            <p className={styles.demoText}>
              The resting state is quiet: a thin gradient ring and a low glow.
              Hover raises the glow; the rotation never changes pace.
            </p>
            <div className={styles.row}>
              <AiButton />
            </div>
          </section>

          {/* Label and icon */}
          <section className={styles.section}>
            <SectionTitle title="Label and icon" />
            <p className={styles.demoText}>
              The label names the conversation, not the technology. Any
              Material Symbol works as the leading icon.
            </p>
            <div className={styles.row}>
              <AiButton label="Chat with the agent" icon="forum" />
              <AiButton label="Summarise this page" icon="notes" />
            </div>
          </section>

          {/* Sizes */}
          <section className={styles.section}>
            <SectionTitle title="Sizes" />
            <p className={styles.demoText}>
              Two sizes on Button&rsquo;s control scale, so the two components
              sit together without negotiation.
            </p>
            <div className={styles.row}>
              <AiButton />
              <AiButton size="compact" />
            </div>
          </section>

          {/* States */}
          <section className={styles.section}>
            <SectionTitle title="States" />
            <p className={styles.demoText}>
              Disabled drops to 0.4 opacity and pauses the rotation. Under
              reduced motion the ring and glow stay put and only the turning
              stops.
            </p>
            <div className={styles.row}>
              <AiButton disabled />
            </div>
          </section>

          {/* As a link */}
          <section className={styles.section}>
            <SectionTitle title="As a link" />
            <p className={styles.demoText}>
              With an href it renders as an anchor, for entry points that
              navigate to an AI surface rather than opening one in place.
            </p>
            <div className={styles.row}>
              <AiButton label="Open the chat" icon="forum" href="#" />
            </div>
          </section>
        </main>
      </div>

    </>
  );
}
