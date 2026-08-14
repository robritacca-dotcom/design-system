"use client";

import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Card } from "@robr0/design-system/components/Card/Card";
import { caseStudyCover } from "@/components/covers/case-study-covers";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import { caseStudies } from "@/data/case-studies";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(workSidebarLinks, "/work");

/* The Card's cover slot, from ds-card--case-study__cover-wrap. The covers are
   drawn to fill whatever ratio they are given, so the frame is told the slot's
   ratio rather than the slot being sized to the frame. */
const CARD_COVER_ASPECT = 940 / 480;

export default function WorkPage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Work</h1>
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Selected case studies on product, AI, and design systems
            </p>
            <p className={styles.introBody}>
              Long-form write-ups on projects I&apos;ve led: what worked, what didn&apos;t, and what I changed my mind about. Each case study sits behind its own page with the full story, plus the tools, citations, and links that shaped it.
            </p>
          </div>

          <div className={`${styles.caseStudyGrid} animate-in animate-delay-2`}>
            {caseStudies.map((cs) => (
              <Card
                key={cs.href}
                variant="case-study"
                title={cs.title}
                dek={cs.dek}
                companyName={cs.companyName}
                companyLogo={cs.companyLogo}
                cover={caseStudyCover(cs.href, { aspect: CARD_COVER_ASPECT })}
                coverSrc={cs.coverSrc}
                href={cs.href}
              />
            ))}
          </div>
        </main>
      </div>

    </>
  );
}
