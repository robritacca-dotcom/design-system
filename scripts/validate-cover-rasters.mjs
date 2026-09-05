#!/usr/bin/env node
/**
 * Validates website/src/data/cover-renders.json against the covers that exist
 * and the images on disk.
 *
 * The covers are drawn as vectors but displayed as flat images, because the
 * drawing — an HTML mock inside an SVG foreignObject, shrunk by a scale
 * transform — is not something mobile WebKit renders reliably. That split only
 * holds while every registered render actually has a file behind it: a missing
 * one is a blank cover on the live site, not a build error, so it is worth a
 * build error here.
 *
 * Checks:
 *  - every aspect a study asks for is defined, with a sane ratio and width
 *  - every study with a cover in case-study-covers.tsx is registered here, and
 *    every registered study has a cover — the two lists cannot drift
 *  - every study has alt text describing what its cover shows — an empty alt
 *    would drop the site's most distinctive images out of image search and
 *    tell a screen-reader user nothing
 *  - every (study, aspect, theme) render exists under public/covers/rendered
 *  - every file in that folder is one the registry asked for, so a renamed
 *    aspect cannot leave an orphan shipping in the repo forever
 *
 * What it deliberately does not check: whether an image is *stale*. Telling
 * that apart from a fresh one means re-shooting every cover in a browser, and
 * this runs on every build. Regenerating after changing a cover
 * (`npm run covers:render`) is the author's job, the same way refreshing the
 * essay feed is.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(repoRoot, 'website', 'src', 'data', 'cover-renders.json');
const coversMapPath = join(
  repoRoot, 'website', 'src', 'components', 'covers', 'case-study-covers.tsx',
);
const renderDir = join(repoRoot, 'website', 'public', 'covers', 'rendered');

const THEMES = ['light', 'dark'];
const errors = [];

let registry;
try {
  registry = JSON.parse(readFileSync(registryPath, 'utf8'));
} catch (err) {
  console.error(`✗ Could not read/parse cover-renders.json: ${err.message}`);
  process.exit(1);
}

const { aspects, studies } = registry;
if (!aspects || typeof aspects !== 'object') {
  console.error('✗ "aspects" must be an object.');
  process.exit(1);
}
if (!studies || typeof studies !== 'object') {
  console.error('✗ "studies" must be an object.');
  process.exit(1);
}

// ── aspects are well-formed ─────────────────────────────────────────────────
for (const [name, spec] of Object.entries(aspects)) {
  if (!Array.isArray(spec.ratio) || spec.ratio.length !== 2
      || !spec.ratio.every((n) => typeof n === 'number' && n > 0)) {
    errors.push(`aspect "${name}" needs a ratio of two positive numbers.`);
  }
  if (typeof spec.width !== 'number' || spec.width < 800) {
    errors.push(
      `aspect "${name}" needs a width of at least 800px — anything smaller is ` +
        'soft on a retina display.'
    );
  }
  if (typeof spec.use !== 'string' || spec.use.trim().length === 0) {
    errors.push(
      `aspect "${name}" needs a "use" note saying where it is displayed, so the ` +
        'next person can tell whether it is still needed.'
    );
  }
}

// ── the registry and the cover map agree on which studies have covers ───────
let mapped = new Set();
if (existsSync(coversMapPath)) {
  const source = readFileSync(coversMapPath, 'utf8');
  const block = source.match(/CASE_STUDY_COVERS[^{]*\{([\s\S]*?)\n\};/);
  if (block) {
    // Keys are page hrefs: the `/work/<slug>` studies, plus the odd
    // non-study page whose cover rides the same pipeline (`/overview`).
    for (const m of block[1].matchAll(/["'](\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)["']\s*:/g)) {
      mapped.add(m[1]);
    }
  } else {
    errors.push(
      'Could not find the CASE_STUDY_COVERS object in case-study-covers.tsx — ' +
        'this validator parses it to check the two lists agree.'
    );
  }
} else {
  errors.push(`Missing ${coversMapPath}.`);
}

for (const href of mapped) {
  if (!studies[href]) {
    errors.push(
      `${href} has a cover in case-study-covers.tsx but no renders registered — ` +
        'add it to cover-renders.json and run `npm run covers:render`.'
    );
  }
}
for (const href of Object.keys(studies)) {
  if (mapped.size > 0 && !mapped.has(href)) {
    errors.push(
      `${href} is registered for renders but has no cover in ` +
        'case-study-covers.tsx — remove it here or add the cover.'
    );
  }
}

// ── every registered render exists, and nothing else does ───────────────────
const expected = new Set();
for (const [href, entry] of Object.entries(studies)) {
  const list = entry?.aspects;
  if (!Array.isArray(list) || list.length === 0) {
    errors.push(`${href} must list at least one aspect.`);
    continue;
  }

  const alt = entry.alt;
  if (typeof alt !== 'string' || alt.trim().length === 0) {
    errors.push(
      `${href} needs "alt" describing what its cover shows — these are the ` +
        'site\'s most distinctive images, and an empty alt hides them from ' +
        'image search and from screen readers alike.'
    );
  } else if (!alt.endsWith('.')) {
    errors.push(`${href} alt text should end in a full stop.`);
  } else if (alt.length > 220) {
    errors.push(`${href} alt text is ${alt.length} chars — keep it under 220.`);
  }

  const slug = href.replace(/^\/work\//, '').replace(/^\//, '');
  for (const aspect of list) {
    if (!aspects[aspect]) {
      errors.push(`${href} asks for aspect "${aspect}", which is not defined.`);
      continue;
    }
    for (const theme of THEMES) expected.add(`${slug}-${aspect}-${theme}.webp`);
  }
}

if (!existsSync(renderDir)) {
  errors.push(
    'public/covers/rendered does not exist — run `npm run covers:render` ' +
      '(with the dev server up) to shoot the covers.'
  );
} else {
  const onDisk = new Set(readdirSync(renderDir).filter((f) => !f.startsWith('.')));
  for (const file of expected) {
    if (!onDisk.has(file)) {
      errors.push(
        `Missing render ${file} — run \`npm run covers:render\` and commit it.`
      );
    }
  }
  for (const file of onDisk) {
    if (!expected.has(file)) {
      errors.push(
        `${file} is in public/covers/rendered but nothing in the registry asks ` +
          'for it — delete it or register the aspect.'
      );
    }
  }
}

if (errors.length > 0) {
  console.error('✗ Cover raster validation failed:\n');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `✓ Cover rasters valid (${expected.size} renders across ` +
    `${Object.keys(studies).length} studies and ${Object.keys(aspects).length} aspects).`
);
