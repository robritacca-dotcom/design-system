"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import ComponentsSidebar from "../../../components/Sidebar/ComponentsSidebar";
import { ThreadPanel } from "@robr0/design-system/components/ThreadPanel/ThreadPanel";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import styles from "./page.module.css";

/* Demo data: Skylark is a fictional product, atlas-* fictional repos. */

const GROUPS = [
  {
    label: "atlas-app",
    threads: [
      { id: "onboarding", title: "Rework the onboarding flow" },
      { id: "search", title: "Speed up the search index" },
      { id: "billing", title: "Untangle the billing webhooks" },
      { id: "flags", title: "Retire the stale feature flags" },
    ],
  },
  {
    label: "atlas-docs",
    threads: [
      { id: "quickstart", title: "Rewrite the quickstart guide" },
      { id: "api-ref", title: "Generate the API reference" },
      { id: "broken-links", title: "Fix the broken changelog links" },
    ],
  },
];

const CONTROLS = [
  { id: "projects", icon: "folder", label: "Projects" },
  { id: "automations", icon: "schedule", label: "Automations" },
  { id: "settings", icon: "settings", label: "Settings" },
];

function FullAnatomy() {
  const [active, setActive] = React.useState("search");
  return (
    <div className={styles.railFrame}>
      <ThreadPanel
        logoText="Skylark"
        groups={GROUPS}
        activeThreadId={active}
        onThreadSelect={setActive}
        newThreadLabel="New thread"
        newThreadShortcut={["Ctrl", "N"]}
        controls={CONTROLS}
        moreLabel="Show 12 more"
        profile={{ name: "Robin Vale", meta: "Team" }}
      />
    </div>
  );
}

function CollapseDemo() {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <div className={styles.railFrame}>
      <ThreadPanel
        logo={
          <span
            className="material-symbols-rounded"
            style={{ "--icon-size": "var(--icon-size-md)" } as React.CSSProperties}
          >
            flare
          </span>
        }
        logoText="Skylark"
        groups={GROUPS}
        activeThreadId="search"
        expanded={expanded}
        onExpandedChange={setExpanded}
        newThreadLabel="New thread"
        newThreadShortcut={["Ctrl", "N"]}
        controls={CONTROLS}
        profile={{ name: "Robin Vale", meta: "Team" }}
      />
    </div>
  );
}

function MetaDemo() {
  const [active, setActive] = React.useState("onboarding");
  return (
    <div className={`${styles.railFrame} ${styles.railFrameShort}`}>
      <ThreadPanel
        groups={[
          {
            label: "atlas-app",
            threads: [
              { id: "onboarding", title: "Rework the onboarding flow", meta: "now" },
              { id: "search", title: "Speed up the search index", meta: "2h" },
              { id: "billing", title: "Untangle the billing webhooks", meta: "1d" },
              { id: "flags", title: "Retire the stale feature flags", meta: "3d" },
            ],
          },
        ]}
        activeThreadId={active}
        onThreadSelect={setActive}
      />
    </div>
  );
}

export default function ThreadPanelPage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <ComponentsSidebar />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Thread panel</h1>
            <PageLinks storybookPath="/?path=/docs/components-threadpanel--docs" />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              The session history, one rail
            </p>
            <p className={styles.introBody}>
              Thread panel is the left edge of a chat or agent product: the
              brand, a new-thread action with its shortcut hint, standing
              controls, the grouped history, and the profile footer. It is
              fully controlled and surface-less, so the host owns the active
              thread, the navigation, and the band colour it sits on. It
              began as the agent workbench template&apos;s threads panel and
              graduated into the library once the shape proved out.
            </p>
          </div>

          <section className={styles.section}>
            <SectionTitle title="The full anatomy" />
            <p className={styles.demoText}>
              Every section is optional and renders only when its props do.
              Here the panel carries all of them; clicking a thread moves the
              controlled selection, and the history is the one region that
              scrolls.
            </p>
            <FullAnatomy />
          </section>

          <section className={styles.section}>
            <SectionTitle title="Collapse to a rail" />
            <p className={styles.demoText}>
              With onExpandedChange wired, the header grows a toggle and the
              panel folds to App sidebar&apos;s 64px icon rail: the panel
              animates its own width, labels fade under the sweeping clip,
              rows become circular icon buttons, and the history steps out
              of the way. Collapsed, the logo is the expand button. Try it.
            </p>
            <CollapseDemo />
          </section>

          <section className={styles.section}>
            <SectionTitle title="Threads alone" />
            <p className={styles.demoText}>
              With nothing but groups, the panel is a bare history list. A
              flat list is one group with no label.
            </p>
            <div className={styles.railRow}>
              <div className={`${styles.railFrame} ${styles.railFrameShort}`}>
                <ThreadPanel groups={GROUPS} activeThreadId="quickstart" />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <SectionTitle title="Timestamps on the trailing edge" />
            <p className={styles.demoText}>
              Each thread can carry a small meta caption, the usual home for
              a relative time.
            </p>
            <MetaDemo />
          </section>

          <section className={styles.section}>
            <SectionTitle title="Rows as links" />
            <p className={styles.demoText}>
              Give a thread an href and its row renders as a real anchor,
              with the active row announcing aria-current. Rendered this way
              the panel needs no callbacks at all, so it can come straight
              from a Server Component.
            </p>
            <div className={`${styles.railFrame} ${styles.railFrameShort}`}>
              <ThreadPanel
                activeThreadId="search"
                groups={[
                  {
                    label: "atlas-app",
                    threads: [
                      { id: "onboarding", title: "Rework the onboarding flow", href: "#onboarding" },
                      { id: "search", title: "Speed up the search index", href: "#search" },
                      { id: "billing", title: "Untangle the billing webhooks", href: "#billing" },
                    ],
                  },
                ]}
                newThreadLabel="New thread"
                newThreadHref="#new"
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
