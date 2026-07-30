#!/usr/bin/env node
/**
 * Validates website/src/data/case-studies.json — the single source of
 * truth for the case-study list. The /work index maps over all of it and
 * the home page features entry [0], so this file must stay in lockstep
 * with the case-study pages that actually exist.
 *
 * Checks:
 *  - every entry has all required fields and a unique /work/<slug> href
 *  - every entry's page folder exists (website/src/app/work/<slug>/page.tsx)
 *  - every case-study folder under /work is registered — a new study page
 *    that never reaches the registry (and therefore the /work index and
 *    home page) fails the build
 *  - logo and cover paths point at real files under website/public
 *  - the hand-curated workSidebarLinks array in navigation.ts lists exactly
 *    the registered studies — the sidebar, breadcrumbs, and sitemap derive
 *    from it, so a study missing there is invisible to all three
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = join(repoRoot, 'website', 'src', 'data', 'case-studies.json');
const workDir = join(repoRoot, 'website', 'src', 'app', 'work');
const publicDir = join(repoRoot, 'website', 'public');

const errors = [];

let data;
try {
  data = JSON.parse(readFileSync(dataPath, 'utf8'));
} catch (err) {
  console.error(`✗ Could not read/parse case-studies.json: ${err.message}`);
  process.exit(1);
}

const entries = data.caseStudies;
if (!Array.isArray(entries) || entries.length === 0) {
  console.error('✗ "caseStudies" must be a non-empty array.');
  process.exit(1);
}

const REQUIRED = ['href', 'title', 'dek', 'companyName', 'companyLogo', 'coverSrc'];
const seenHrefs = new Set();

for (const entry of entries) {
  const label = `"${entry.title ?? entry.href ?? '<unnamed>'}"`;

  for (const field of REQUIRED) {
    if (typeof entry[field] !== 'string' || !entry[field].trim()) {
      errors.push(`${label}: missing or empty "${field}".`);
    }
  }

  const slugMatch = /^\/work\/([a-z0-9-]+)$/.exec(entry.href ?? '');
  if (!slugMatch) {
    errors.push(`${label}: href must look like "/work/<kebab-slug>", got: ${entry.href}`);
    continue;
  }
  if (seenHrefs.has(entry.href)) {
    errors.push(`${label}: duplicate href ${entry.href}.`);
  }
  seenHrefs.add(entry.href);

  if (!existsSync(join(workDir, slugMatch[1], 'page.tsx'))) {
    errors.push(`${label}: no page at website/src/app/work/${slugMatch[1]}/page.tsx.`);
  }

  for (const field of ['companyLogo', 'coverSrc']) {
    const assetPath = entry[field];
    if (typeof assetPath === 'string' && assetPath.startsWith('/')) {
      if (!existsSync(join(publicDir, assetPath))) {
        errors.push(`${label}: ${field} "${assetPath}" not found under website/public.`);
      }
    }
  }
}

// Reverse direction: every case-study folder must be registered.
const folders = readdirSync(workDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(workDir, d.name, 'page.tsx')))
  .map((d) => d.name);

for (const folder of folders) {
  if (!seenHrefs.has(`/work/${folder}`)) {
    errors.push(
      `Case-study page website/src/app/work/${folder}/ is not in case-studies.json — ` +
        'add it (top of the list if it is the newest) so /work and the home page pick it up.'
    );
  }
}

// Sidebar parity: workSidebarLinks in navigation.ts is a second, hand-curated
// list of the same studies, and the sidebar, breadcrumbs, and sitemap all
// derive from it. Extract its /work/<slug> hrefs and require set-equality
// with the registry, so a study can't reach /work and the home page while
// silently missing from navigation.
const navPath = join(repoRoot, 'website', 'src', 'config', 'navigation.ts');
const navSource = readFileSync(navPath, 'utf8');
const sidebarBlock = navSource.match(
  /export const workSidebarLinks[^=]*=\s*\[([\s\S]*?)\];/
);
if (!sidebarBlock) {
  errors.push('Could not find workSidebarLinks in website/src/config/navigation.ts.');
} else {
  const sidebarHrefs = new Set(
    [...sidebarBlock[1].matchAll(/href:\s*"(\/work\/[a-z0-9-]+)"/g)].map((m) => m[1])
  );
  for (const href of seenHrefs) {
    if (!sidebarHrefs.has(href)) {
      errors.push(
        `${href} is registered but missing from workSidebarLinks in navigation.ts — ` +
          'add it so the sidebar, breadcrumbs, and sitemap know the page exists.'
      );
    }
  }
  for (const href of sidebarHrefs) {
    if (!seenHrefs.has(href)) {
      errors.push(
        `${href} is in workSidebarLinks but not in case-studies.json — ` +
          'register it or remove the sidebar entry.'
      );
    }
  }
}

if (errors.length > 0) {
  console.error('✗ Case-study registry validation failed:\n');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `✓ Case-study registry valid (${entries.length} entries — pages, assets, and sidebar parity all check out).`
);
