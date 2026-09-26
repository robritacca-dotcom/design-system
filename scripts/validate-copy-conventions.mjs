#!/usr/bin/env node
/**
 * Two copy conventions this site keeps, checked on every build:
 *
 *   1. No source hardcodes a spelled-out component count (e.g. "Forty-two
 *      React components"). Counts derive from COMPONENT_COUNT, which the
 *      design-system package exports, so a release can never leave the prose
 *      claiming a number that is no longer true.
 *   2. No page module caps prose with a ch-based max-width (e.g.
 *      `max-width: 72ch`) — paragraphs run the full content column by
 *      convention, and ad-hoc measure caps kept creeping back in and making
 *      text wrap early. Constrain the layout column, not the paragraph.
 *
 * This file used to also check that every component documentation page had a
 * layout.tsx deriving its title from the registry. Those pages moved to the
 * design system's own site, and the check went with them.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

// Normalize CRLF so Windows checkouts validate identically to CI.
const read = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

// Guard against hardcoded, spelled-out component counts anywhere in the site.
// Tens-based number words next to "component(s)" are always count claims — this
// deliberately ignores "one"/"a" so ordinary prose ("in one component") is fine.
const TENS = 'twenty|thirty|forty|fourty|fifty|sixty|seventy|eighty|ninety';
const ONES = 'one|two|three|four|five|six|seven|eight|nine';
const countRe = new RegExp(
  `\\b(${TENS})(?:[\\s-](${ONES}))?\\s+(?:react\\s+)?components?\\b`,
  'i'
);

const hardcodedCounts = [];
const chWidthCaps = [];
const chCapRe = /max-width:\s*[\d.]+ch/;
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      walk(full);
    } else if (/\.(tsx?|json)$/.test(entry.name)) {
      const m = read(full).match(countRe);
      if (m) {
        const rel = full.slice(repoRoot.length + 1).replace(/\\/g, '/');
        hardcodedCounts.push(`${rel} → "${m[0]}" (use \${COMPONENT_COUNT})`);
      }
    } else if (entry.name.endsWith('.css')) {
      const m = read(full).match(chCapRe);
      if (m) {
        const rel = full.slice(repoRoot.length + 1).replace(/\\/g, '/');
        chWidthCaps.push(
          `${rel} → "${m[0]}" (doc prose runs full column width — constrain the layout, not the paragraph)`
        );
      }
    }
  }
};
walk(join(repoRoot, 'website', 'src'));

let failed = false;
const fail = (msg) => {
  failed = true;
  console.error(`✗ ${msg}`);
};

for (const [what, list] of [
  ['Hardcoded spelled-out component counts (must use COMPONENT_COUNT)', hardcodedCounts],
  ['ch-based max-width caps on website CSS (early-wrapping prose)', chWidthCaps],
]) {
  if (list.length > 0) {
    fail(`${what}:\n` + list.map((l) => `    - ${l}`).join('\n'));
  }
}

if (failed) {
  process.exit(1);
}

console.log(
  '✓ Copy conventions hold — no spelled-out component counts, no ch-based measure caps.'
);
