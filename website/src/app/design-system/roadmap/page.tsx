import type { Metadata } from "next";
import Link from "next/link";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import { GanttChart } from "@robr0/design-system/components/GanttChart/GanttChart";
import type {
  GanttChartColor,
  GanttChartItem,
  GanttChartMilestone,
} from "@robr0/design-system/components/GanttChart/GanttChart";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import { Badge } from "@robr0/design-system/components/Badge/Badge";
import { pageOpenGraph } from "@/config/navigation";
import { roadmap } from "@/data/roadmap";
import type { RoadmapItem } from "@/data/roadmap";
import styles from "./page.module.css";

// /design-system/roadmap is the DS landing's one sub-page (like /playground,
// it lives in no sidebar array), so its metadata is a literal rather than
// pageMetadata().
const title = "Roadmap";
const description =
  "The public plan for robr0 DS, drawn on the library's own GanttChart: everything shipped so far, the work in flight, and what is targeted next.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/design-system/roadmap" },
  openGraph: pageOpenGraph(title, description, "/design-system/roadmap"),
};

/* Each track takes one core accent, in declaration order, so the chart and
   the item lists below it stay on the same colour story. */
const TRACK_COLORS: GanttChartColor[] = ["cobalt", "mint", "violet"];

const trackColor = (trackId: string): GanttChartColor =>
  TRACK_COLORS[roadmap.tracks.findIndex((t) => t.id === trackId)] ?? "neutral";

const trackLabel = (trackId: string) =>
  roadmap.tracks.find((t) => t.id === trackId)?.label ?? trackId;

/* An in-flight bar shows how much of its window has elapsed — an honest,
   dateable reading the registry doesn't have to restate every week. */
const elapsedShare = (item: RoadmapItem) => {
  const start = new Date(`${item.start}T00:00:00`).getTime();
  const end = new Date(`${item.end}T00:00:00`).getTime();
  if (!(end > start)) return 50;
  const share = ((Date.now() - start) / (end - start)) * 100;
  return Math.min(Math.max(Math.round(share), 5), 95);
};

const ganttItems: GanttChartItem[] = roadmap.items.map((item) => ({
  id: item.id,
  label: item.title,
  start: item.start,
  end: item.end,
  color: trackColor(item.track),
  group: trackLabel(item.track),
  progress: item.status === "in-progress" ? elapsedShare(item) : undefined,
  projected: item.status === "planned",
  detail: item.dateLabel,
}));

const ganttMilestones: GanttChartMilestone[] = roadmap.milestones.map((m) => ({
  id: m.id,
  label: m.title,
  date: m.date,
  color: trackColor(m.track),
  group: trackLabel(m.track),
}));

const STATUS_BADGE = {
  shipped: { variant: "positive" as const, label: "Shipped" },
  "in-progress": { variant: "info" as const, label: "In flight" },
  planned: { variant: "neutral" as const, label: "Planned" },
};

const formatDay = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const windowText = (item: RoadmapItem) =>
  item.dateLabel ?? `${formatDay(item.start)} to ${formatDay(item.end)}`;

export default function RoadmapPage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Roadmap</h1>
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              The plan, drawn by the system it plans
            </p>
            <p className={styles.introBody}>
              Everything shipped so far, the work in flight, and what is
              targeted next, rendered on the library&apos;s own Gantt chart.
              The timeline reads from one curated registry the build
              validates, the same way every other count and claim on this
              site stays honest. Shipped windows come from the release
              history; planned bars are targets, drawn dashed because a
              target is not a commitment.
            </p>
          </div>

          <section className={`${styles.section} animate-in animate-delay-2`}>
            <SectionTitle title="Timeline" />
            <GanttChart
              items={ganttItems}
              milestones={ganttMilestones}
              title="robr0 DS, July 2026 onward"
              subtitle="Grouped by track; the rule marks today"
            />
            <div className={styles.legend} aria-hidden="true">
              <span className={styles.legendEntry}>
                <span className={`${styles.legendSwatch} ${styles.legendShipped}`} />
                Shipped
              </span>
              <span className={styles.legendEntry}>
                <span className={`${styles.legendSwatch} ${styles.legendInFlight}`} />
                In flight
              </span>
              <span className={styles.legendEntry}>
                <span className={`${styles.legendSwatch} ${styles.legendPlanned}`} />
                Planned
              </span>
            </div>
          </section>

          {roadmap.tracks.map((track, trackIndex) => {
            const trackItems = roadmap.items.filter((i) => i.track === track.id);
            if (trackItems.length === 0) return null;
            return (
              <section
                key={track.id}
                className={`${styles.section} animate-in ${trackIndex < 2 ? `animate-delay-${trackIndex + 3}` : ""}`}
              >
                <SectionTitle title={track.label} />
                <ul className={styles.itemList}>
                  {trackItems.map((item) => (
                    <li key={item.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        {item.link ? (
                          <Link href={item.link} className={styles.itemLink}>
                            {item.title}
                          </Link>
                        ) : (
                          <span className={styles.itemTitle}>{item.title}</span>
                        )}
                        <Badge
                          variant={STATUS_BADGE[item.status].variant}
                          label={STATUS_BADGE[item.status].label}
                        />
                        <span className={styles.itemWindow}>{windowText(item)}</span>
                      </div>
                      <p className={styles.itemSummary}>{item.summary}</p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </main>
      </div>
    </>
  );
}
