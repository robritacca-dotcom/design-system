#!/usr/bin/env node
/**
 * validate-roadmap.mjs
 *
 * Guards the roadmap registry (website/src/data/roadmap.json), the single
 * source of truth for the public roadmap on /design-system/roadmap. Checks:
 *
 *   1. Structure — every track carries id and label; every item carries id,
 *      title, a known status, a declared track, ISO start/end dates and a
 *      summary; every milestone carries id, title, a declared track and an
 *      ISO date; ids are unique across items and milestones. A half-described
 *      item renders as a broken bar and a false public claim about the plan.
 *   2. Dates — start and end parse as real YYYY-MM-DD days and start never
 *      falls after end, so the Gantt on the page can always draw the window.
 *   3. Links — an item's `link`, when present, is a root-relative path; that
 *      it resolves to a real page is the built-HTML internal-link check's job.
 *
 * The prose fields (title, summary, dateLabel, milestone titles) ship
 * verbatim as page copy, so their em-dash ban is enforced where every other
 * shipped-copy registry's is: the registry scan in validate-shipped-prose.mjs.
 * This script owns structure, dates, and references only.
 *
 * Runs in the validate-registry chain: it reads source registries only, no
 * build output.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
// Normalize CRLF so Windows checkouts validate identically to CI.
const read = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

const { tracks, items, milestones } = JSON.parse(
  read(join(repoRoot, 'website', 'src', 'data', 'roadmap.json')),
);

const errors = [];
const STATUSES = new Set(['shipped', 'in-progress', 'planned']);
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

// A date must both match the ISO shape and survive a round trip, so
// "2026-02-30" cannot sneak through as a parseable-but-fictional day.
const isRealDay = (value) => {
  if (typeof value !== 'string' || !ISO_DAY.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return false;
  const [year, month, day] = value.split('-').map(Number);
  return (
    parsed.getFullYear() === year && parsed.getMonth() + 1 === month && parsed.getDate() === day
  );
};

const trackIds = new Set();
for (const track of tracks ?? []) {
  const where = `roadmap.json → tracks → ${track.id ?? '(missing id)'}`;
  for (const field of ['id', 'label']) {
    if (typeof track[field] !== 'string' || track[field].trim() === '') {
      errors.push(`${where}: "${field}" must be a non-empty string`);
    }
  }
  if (trackIds.has(track.id)) errors.push(`${where}: duplicate track id`);
  trackIds.add(track.id);
}
if (!tracks?.length) errors.push('roadmap.json: "tracks" must be a non-empty array');

const seen = new Set();
for (const item of items ?? []) {
  const where = `roadmap.json → items → ${item.id ?? '(missing id)'}`;

  for (const field of ['id', 'title', 'status', 'track', 'start', 'end', 'summary']) {
    if (typeof item[field] !== 'string' || item[field].trim() === '') {
      errors.push(`${where}: "${field}" must be a non-empty string`);
    }
  }

  if (seen.has(item.id)) errors.push(`${where}: duplicate id`);
  seen.add(item.id);

  if (!STATUSES.has(item.status)) {
    errors.push(`${where}: status "${item.status}" is not one of ${[...STATUSES].join(', ')}`);
  }
  if (!trackIds.has(item.track)) {
    errors.push(`${where}: track "${item.track}" is not declared in "tracks"`);
  }

  for (const field of ['start', 'end']) {
    if (!isRealDay(item[field])) {
      errors.push(`${where}: "${field}" must be a real YYYY-MM-DD date`);
    }
  }
  if (isRealDay(item.start) && isRealDay(item.end) && item.start > item.end) {
    errors.push(`${where}: start ${item.start} falls after end ${item.end}`);
  }

  if (item.link !== undefined && (typeof item.link !== 'string' || !item.link.startsWith('/'))) {
    errors.push(`${where}: "link" must be a root-relative path starting with "/"`);
  }
  if (item.dateLabel !== undefined && (typeof item.dateLabel !== 'string' || item.dateLabel.trim() === '')) {
    errors.push(`${where}: "dateLabel", when present, must be a non-empty string`);
  }
}
if (!items?.length) errors.push('roadmap.json: "items" must be a non-empty array');

for (const milestone of milestones ?? []) {
  const where = `roadmap.json → milestones → ${milestone.id ?? '(missing id)'}`;

  for (const field of ['id', 'title', 'track', 'date']) {
    if (typeof milestone[field] !== 'string' || milestone[field].trim() === '') {
      errors.push(`${where}: "${field}" must be a non-empty string`);
    }
  }

  if (seen.has(milestone.id)) errors.push(`${where}: duplicate id`);
  seen.add(milestone.id);

  if (!trackIds.has(milestone.track)) {
    errors.push(`${where}: track "${milestone.track}" is not declared in "tracks"`);
  }
  if (!isRealDay(milestone.date)) {
    errors.push(`${where}: "date" must be a real YYYY-MM-DD date`);
  }
}

if (errors.length > 0) {
  console.error(`✗ Roadmap registry validation failed:\n${errors.map((e) => `  ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(
  `✓ Roadmap registry valid — ${items.length} items and ${milestones?.length ?? 0} milestones across ${tracks.length} tracks, every date drawable.`,
);
