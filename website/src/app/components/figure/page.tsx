"use client";

import React from "react";
import Image from "next/image";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Figure } from "@robr0/design-system/components/Figure/Figure";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components/figure");

export default function FigurePage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Figure</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-figure--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Images with captions, in the case-study frame
            </p>
            <p className={styles.introBody}>
              A Figure wraps any image (a plain <code>&lt;img&gt;</code> or{" "}
              <code>next/image</code>) in the system&apos;s rounded container with an
              optional caption. Pass an <code>onClick</code> and it becomes zoomable:
              zoom cursor, hover dim, and keyboard activation for lightboxes.
            </p>
          </div>

          {/* With caption */}
          <section className={styles.section}>
            <SectionTitle title="With caption" />
            <Figure caption="A Virtual Construction Designer working inside Augmenta, the target user for the redesign.">
              <Image
                src="/images/augmenta/slide25-img02.png"
                alt="A Virtual Construction Designer working inside the Augmenta platform"
                width={1600}
                height={950}
              />
            </Figure>
          </section>

          {/* Zoomable */}
          <section className={styles.section}>
            <SectionTitle title="Zoomable" />
            <p className={styles.introBody}>
              With <code>onClick</code> the figure gains the zoom affordance: on the work
              pages this opens the lightbox.
            </p>
            <Figure
              caption="Zoomable: click or press Enter to trigger the handler."
              onClick={() => window.alert("On a case-study page this opens the lightbox.")}
            >
              <Image
                src="/images/augmenta/slide25-img02.png"
                alt="Zoomable figure demo"
                width={1600}
                height={950}
              />
            </Figure>
          </section>
        </main>
      </div>

    </>
  );
}
