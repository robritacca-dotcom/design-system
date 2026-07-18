"use client";

import Link from "next/link";
import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import { Badge } from "@design-system/components/Badge/Badge";
import { getSidebarLinks, aboutSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(aboutSidebarLinks, "/loops");

/* ============================================
   LOOP DATA
   ============================================ */

interface LoopInfo {
  slug: string;
  name: string;
  icon: string;
  description: string;
  cadence: string;
  trigger: string;
  stages: string[];
  guardrails: string[];
  skills: { slug: string; name: string }[];
  status: "active" | "paused";
}

const loops: LoopInfo[] = [
  {
    slug: "growth-loop",
    name: "growth-loop",
    icon: "cycle",
    description:
      "Every Monday morning an agent reads this site's analytics, filters out the bot noise, and looks for one copy-shaped problem — a page people leave too fast, a headline that promises the wrong thing. It forms a falsifiable hypothesis, rewrites the words on a branch, verifies the build, and writes me a plain-English report: the problem, the hypothesis, the change. I approve or reject. The next run scores the result.",
    cadence: "Weekly — Monday mornings",
    trigger: "Scheduled task; also runs on demand",
    stages: [
      "Pull analytics",
      "Filter bot noise",
      "One hypothesis",
      "Rewrite on a branch",
      "Verify the build",
      "Report",
      "Approval",
      "Measure next week",
    ],
    guardrails: [
      "Copy only — no layout, styles, or components",
      "One small change per run",
      "Never pushes, merges, or deploys itself",
      "“Nothing worth changing this week” is a valid outcome",
      "A human approves every merge",
    ],
    skills: [
      { slug: "ga-report", name: "ga-report" },
      { slug: "growth-loop", name: "growth-loop" },
    ],
    status: "active",
  },
];

/* ============================================
   PAGE
   ============================================ */

export default function LoopsPage() {
  return (
    <>
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          {/* Page Header */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Loops</h1>
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Agents on a schedule, with a human approval gate
            </p>
            <p className={styles.introBody}>
              Skills are capabilities — instructions Claude Code follows when I invoke
              them. Loops are what happens when a skill runs on a schedule: an agent
              does real work against real data and brings me a proposal. Nothing merges
              or deploys itself; every loop ends in the same place — me reviewing a
              branch. This page documents the loops currently running on this site.
            </p>
          </div>

          {/* Loops List */}
          <div className={`${styles.loopsGrid} animate-in animate-delay-2`}>
            {loops.map((loop) => (
              <div key={loop.slug} className={styles.loopCard}>
                <div className={styles.loopCardHeader}>
                  <div className={styles.loopMeta}>
                    <span className={`material-symbols-rounded ${styles.loopIcon}`}>
                      {loop.icon}
                    </span>
                    <code className={styles.loopName}>{loop.name}</code>
                  </div>
                  <div className={styles.loopBadges}>
                    <Badge
                      variant={loop.status === "active" ? "positive" : "neutral"}
                      label={loop.status === "active" ? "Active" : "Paused"}
                    />
                    <Badge variant="neutral" label={loop.cadence} />
                  </div>
                </div>

                <p className={styles.loopDescription}>{loop.description}</p>

                <div className={styles.loopSection}>
                  <span className={styles.loopSectionLabel}>Each run:</span>
                  <div className={styles.loopStages}>
                    {loop.stages.map((stage, i) => (
                      <span key={stage} className={styles.loopStage}>
                        <span className={styles.loopStageNum}>{i + 1}</span>
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.loopSection}>
                  <span className={styles.loopSectionLabel}>Guardrails:</span>
                  <ul className={styles.loopGuardrails}>
                    {loop.guardrails.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.loopFooter}>
                  <span className={styles.loopSectionLabel}>Built on:</span>
                  {loop.skills.map((skill) => (
                    <Link key={skill.slug} href="/skills" className={styles.loopSkillLink}>
                      <span className="material-symbols-rounded" aria-hidden="true">
                        bolt
                      </span>
                      {skill.name}
                    </Link>
                  ))}
                  <span className={styles.loopTrigger}>{loop.trigger}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
