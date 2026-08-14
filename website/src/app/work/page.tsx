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

/* The Card's cover slot, from ds-card--case-study__cover-wrap. The "card"
   render is shot to that ratio — see the aspect registry in
   website/src/data/cover-renders.json, which owns the ratio and pixel size. */

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
            {caseStudies.map((cs, i) => (
              <Card
                key={cs.href}
                variant="case-study"
                title={cs.title}
                dek={cs.dek}
                companyName={cs.companyName}
                companyLogo={cs.companyLogo}
                /* The first card is the page's likely LCP element, so its
                   cover loads eagerly — a lazy image there is the documented
                   way to lose the metric. The rest stay lazy. */
                cover={caseStudyCover(cs.href, "card", { priority: i === 0 })}
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
