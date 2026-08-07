#!/usr/bin/env node
/**
 * Validates that every public component in src/components/registry.json
 * is fully represented on the website and in design.md:
 *
 *   1. website/src/app/components/<slug>/page.tsx exists (showcase page)
 *   2. The components index grid has a matching <TocCard href=...>
 *   3. design.md has a `### Heading` spec section for the component
 *
 * The sidebar nav entry and its alphabetical order used to be checked here.
 * componentsSidebarLinks is now DERIVED from the registry, so both are
 * structurally guaranteed — a registered component cannot be missing from the
 * nav, and the order is a sort() call rather than a hand-maintained list.
 * Checking them again would only assert that Array.prototype.sort works.
 *
 * This is the guard against the "registered but invisible" drift class
 * (AppLayout/EntityCard shipped for months with no page, nav entry, or
 * spec). Runs in the validate-registry chain before every build.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FILES as BLUEPRINT_FILES, blueprintSlug } from './sync-blueprints.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

// Normalize CRLF so Windows checkouts validate identically to CI.
const read = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

const registry = JSON.parse(
  read(join(repoRoot, 'src', 'components', 'registry.json'))
);

/** "AlertDialog" -> "alert-dialog"; folder-name exceptions listed inline. */
const indexSource = read(
  join(repoRoot, 'website', 'src', 'app', 'components', 'page.tsx')
);
const designMd = read(join(repoRoot, 'design.md'));

/**
 * design.md spec headings, normalized. Shared headings split on "/" so
 * "### AppLayout / AppSidebar" and "### Input / Textarea" cover both
 * components; "### Contribution graph" normalizes to "contributiongraph".
 */
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const specHeadings = new Set(
  [...designMd.matchAll(/^### (.+)$/gm)].flatMap(([, heading]) =>
    heading.split('/').map((part) => normalize(part))
  )
);

const missingPage = [];
const missingTocCard = [];
const missingSpec = [];

// slug and label are stored in the registry — the Nav → navigation exception
// is data, not a special case each validator has to remember.
for (const { name, slug } of registry.components) {

  if (
    !existsSync(
      join(repoRoot, 'website', 'src', 'app', 'components', slug, 'page.tsx')
    )
  ) {
    missingPage.push(`${name} → website/src/app/components/${slug}/page.tsx`);
  }
  if (!indexSource.includes(`href="/components/${slug}"`)) {
    missingTocCard.push(`${name} → <TocCard href="/components/${slug}"> on the index grid`);
  }
  if (!specHeadings.has(normalize(name))) {
    missingSpec.push(`${name} → "### ${name}" section in design.md`);
  }
}

let failed = false;
const fail = (msg) => {
  failed = true;
  console.error(`✗ ${msg}`);
};

// SECTION_OG_IMAGE_SEGMENTS in navigation.ts names the sections whose own
// opengraph-image.tsx is re-stated on every sub-page's Open Graph block (a
// segment that declares `openGraph` replaces the inherited images). Both
// directions are checked: a listed section must have the image file, and a
// section-level image file must be listed — otherwise sub-page share cards
// silently fall back to the root card.
const appDir = join(repoRoot, 'website', 'src', 'app');
const navSource = read(join(repoRoot, 'website', 'src', 'config', 'navigation.ts'));
const listMatch = navSource.match(
  /SECTION_OG_IMAGE_SEGMENTS\s*=\s*\[([^\]]*)\]/
);
const listedSegments = listMatch
  ? [...listMatch[1].matchAll(/"([^"]+)"/g)].map(([, s]) => s)
  : [];
const sectionsWithOgImage = readdirSync(appDir, { withFileTypes: true })
  .filter(
    (e) =>
      e.isDirectory() &&
      existsSync(join(appDir, e.name, 'opengraph-image.tsx')) &&
      // Sections only: a segment with sub-pages. Leaf pages (e.g. /overview)
      // declare metadata and the file image in the same segment, where the
      // file already wins — they don't need listing.
      readdirSync(join(appDir, e.name), { withFileTypes: true }).some(
        (c) => c.isDirectory() && existsSync(join(appDir, e.name, c.name, 'page.tsx'))
      )
  )
  .map((e) => `/${e.name}`);
const ogListStale = [
  ...listedSegments
    .filter((s) => !existsSync(join(appDir, s.slice(1), 'opengraph-image.tsx')))
    .map((s) => `${s} is listed but has no website/src/app${s}/opengraph-image.tsx`),
  ...sectionsWithOgImage
    .filter((s) => !listedSegments.includes(s))
    .map(
      (s) =>
        `${s} has a section opengraph-image.tsx but is missing from SECTION_OG_IMAGE_SEGMENTS in navigation.ts`
    ),
];

// Every spec synced to website/public needs a page to read it on, or it is
// published as a raw download nothing links to.
const missingBlueprintPage = BLUEPRINT_FILES.filter(
  (name) =>
    !existsSync(
      join(repoRoot, 'website', 'src', 'app', 'blueprints', blueprintSlug(name), 'page.tsx')
    )
).map((name) => `${name} → website/src/app/blueprints/${blueprintSlug(name)}/page.tsx`);

for (const [what, list] of [
  ['Registry components with no website showcase page', missingPage],
  ['Registry components missing an index-grid TocCard', missingTocCard],
  ['Registry components with no design.md spec section', missingSpec],
  ['Blueprint specs synced to website/public with no page to read them on', missingBlueprintPage],
  ['SECTION_OG_IMAGE_SEGMENTS out of sync with section opengraph-image files', ogListStale],
]) {
  if (list.length > 0) {
    fail(`${what}:\n` + list.map((l) => `    - ${l}`).join('\n'));
  }
}

if (failed) {
  process.exit(1);
}

console.log(
  `✓ Website surfaces in sync — ${registry.components.length} components each have ` +
    `a page, TocCard, and design.md spec, and ${BLUEPRINT_FILES.length} blueprint specs ` +
    `each have a page (the nav entry and its ordering are derived from the registry, ` +
    `so they cannot drift).`
);
