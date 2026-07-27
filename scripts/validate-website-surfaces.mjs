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
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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

for (const [what, list] of [
  ['Registry components with no website showcase page', missingPage],
  ['Registry components missing an index-grid TocCard', missingTocCard],
  ['Registry components with no design.md spec section', missingSpec],
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
    `a page, TocCard, and design.md spec (the nav entry and its ordering are ` +
    `derived from the registry, so they cannot drift).`
);
