import data from "./roadmap.json";

export interface RoadmapTrack {
  id: string;
  /** Track name, shown as the Gantt group heading and the item list's section title */
  label: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  status: "shipped" | "in-progress" | "planned";
  /** Track id this item belongs to — must match a declared track */
  track: string;
  /** First day of the work window (YYYY-MM-DD) */
  start: string;
  /** Last day of the work window, inclusive (YYYY-MM-DD) */
  end: string;
  /** One-sentence account of the work, shipped verbatim as page copy */
  summary: string;
  /** Internal page the item links to, e.g. "/components/gantt-chart" */
  link?: string;
  /** Display text for a fuzzy planned window, e.g. "Target: Q4 2026" */
  dateLabel?: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  /** Track id this milestone belongs to — must match a declared track */
  track: string;
  /** The day it happened or is aimed at (YYYY-MM-DD) */
  date: string;
}

export interface Roadmap {
  tracks: RoadmapTrack[];
  items: RoadmapItem[];
  milestones: RoadmapMilestone[];
}

/**
 * Single source of truth for the public roadmap (/design-system/roadmap).
 * Hand-curated: shipped windows come from the release history, planned items
 * are targets. Validated by scripts/validate-roadmap.mjs — structure, dates,
 * and track references; prose rules live in the shipped-prose scan. Never
 * hardcode a roadmap count — import ROADMAP_ITEM_COUNT instead.
 */
export const roadmap: Roadmap = data as Roadmap;

export const ROADMAP_ITEM_COUNT = roadmap.items.length;
