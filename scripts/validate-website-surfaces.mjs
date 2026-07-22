#!/usr/bin/env node
/**
 * Validates that every public component in src/components/registry.json
 * is fully represented on the website and in design.md:
 *
 *   1. website/src/app/components/<slug>/page.tsx exists (showcase page)
 *   2. componentsSidebarLinks in website/src/config/navigation.ts has the
 *      route (the sitemap and breadcrumbs derive from this list, so no
 *      separate sitemap check is needed)
 *   3. The components index grid has a matching <TocCard href=...>
 *   4. The sidebar labels are alphabetically ordered
 *   5. design.md has a `### Heading` spec section for the component
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
const SLUG_EXCEPTIONS = { Nav: 'navigation' };
const slugOf = (name) =>
  SLUG_EXCEPTIONS[name] ??
  name.replace(/(?<=[a-z0-9])(?=[A-Z])/g, '-').toLowerCase();

const navSource = read(join(repoRoot, 'website', 'src', 'config', 'navigation.ts'));
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
const missingNav = [];
const missingTocCard = [];
const missingSpec = [];

for (const name of registry.components) {
  const slug = slugOf(name);

  if (
    !existsSync(
      join(repoRoot, 'website', 'src', 'app', 'components', slug, 'page.tsx')
    )
  ) {
    missingPage.push(`${name} → website/src/app/components/${slug}/page.tsx`);
  }
  if (!navSource.includes(`"/components/${slug}"`)) {
    missingNav.push(`${name} → href "/components/${slug}" in componentsSidebarLinks`);
  }
  if (!indexSource.includes(`href="/components/${slug}"`)) {
    missingTocCard.push(`${name} → <TocCard href="/components/${slug}"> on the index grid`);
  }
  if (!specHeadings.has(normalize(name))) {
    missingSpec.push(`${name} → "### ${name}" section in design.md`);
  }
}

// Sidebar labels must stay alphabetical (skip the "Components overview" head).
const sidebarBlock = navSource.match(
  /componentsSidebarLinks[^=]*=\s*\[([\s\S]*?)\];/
)?.[1];
const labels = sidebarBlock
  ? [...sidebarBlock.matchAll(/label:\s*"([^"]+)"/g)]
      .map(([, label]) => label)
      .filter((label) => label !== 'Components overview')
  : [];
const outOfOrder = labels.filter(
  (label, i) =>
    i > 0 && label.localeCompare(labels[i - 1], 'en', { sensitivity: 'base' }) < 0
);

let failed = false;
const fail = (msg) => {
  failed = true;
  console.error(`✗ ${msg}`);
};

if (!sidebarBlock) {
  fail('Could not locate componentsSidebarLinks in website/src/config/navigation.ts');
}

for (const [what, list] of [
  ['Registry components with no website showcase page', missingPage],
  ['Registry components missing from the sidebar nav', missingNav],
  ['Registry components missing an index-grid TocCard', missingTocCard],
  ['Registry components with no design.md spec section', missingSpec],
]) {
  if (list.length > 0) {
    fail(`${what}:\n` + list.map((l) => `    - ${l}`).join('\n'));
  }
}

if (outOfOrder.length > 0) {
  fail(
    `componentsSidebarLinks labels out of alphabetical order:\n` +
      outOfOrder.map((l) => `    - "${l}" sorts before its predecessor`).join('\n')
  );
}

if (failed) {
  process.exit(1);
}

console.log(
  `✓ Website surfaces in sync — ${registry.components.length} components each have ` +
    `a page, nav entry, TocCard, and design.md spec; sidebar is alphabetical.`
);
