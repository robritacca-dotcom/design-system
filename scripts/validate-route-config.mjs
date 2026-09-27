#!/usr/bin/env node
/**
 * Holds the route-keyed config sets to routes that exist.
 *
 * Three sets name pages by path rather than importing them:
 * CHROMELESS_ROUTES (website/src/config/chromeless.ts) and the two anchor-nav
 * sets (website/src/config/anchor-nav.ts). Each is a plain Set of strings
 * matched against `pathname` at runtime, which means an entry for a page that
 * no longer exists does nothing at all: no error, no warning, no failing
 * build. It just sits there looking like a decision someone made.
 *
 * That is exactly what happened. When the design system moved to its own site
 * it took eleven routes with it — the playground, the dependency graph, the
 * canvas board, the labs rebuilds, the template screens, the blueprint pages,
 * skills and get-started. Every one of them stayed listed here through the
 * cutover, through a green build, and through CI, because nothing checks a
 * string against the filesystem. The comments above the sets went on
 * explaining why pages that had been deleted needed special handling.
 *
 * So this is the check that makes the sets mean something: every entry must
 * be a real static route. The reverse direction is deliberately NOT checked —
 * these are opt-in lists, and a page that is absent from all three is simply a
 * page with normal chrome, which is the common case and needs no entry.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { staticSiteRoutes } from './site-routes.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(path, 'utf8');

/**
 * The Set literal for `name`, as the strings inside it. Parsed rather than
 * imported because these are TypeScript modules with `@/` path aliases, which
 * Node cannot resolve; validate-page-summaries.mjs reads CHROMELESS_ROUTES
 * the same way for the same reason.
 */
const readRouteSet = (source, file, name) => {
  const block = source.match(
    new RegExp(`${name} = new Set(?:<string>)?\\(\\[([\\s\\S]*?)\\]\\)`)
  );
  if (!block) {
    console.error(`✗ Could not read ${name} from ${file} — this reader parses that exact declaration shape`);
    process.exit(1);
  }
  return [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
};

const chromelessFile = join(repoRoot, 'website', 'src', 'config', 'chromeless.ts');
const anchorNavFile = join(repoRoot, 'website', 'src', 'config', 'anchor-nav.ts');
const chromelessSource = read(chromelessFile);
const anchorNavSource = read(anchorNavFile);

const sets = [
  { label: 'CHROMELESS_ROUTES', file: 'config/chromeless.ts', entries: readRouteSet(chromelessSource, 'chromeless.ts', 'CHROMELESS_ROUTES') },
  { label: 'ANCHOR_NAV_EXCLUDED_ROUTES', file: 'config/anchor-nav.ts', entries: readRouteSet(anchorNavSource, 'anchor-nav.ts', 'ANCHOR_NAV_EXCLUDED_ROUTES') },
  { label: 'ANCHOR_NAV_SELF_MANAGED_ROUTES', file: 'config/anchor-nav.ts', entries: readRouteSet(anchorNavSource, 'anchor-nav.ts', 'ANCHOR_NAV_SELF_MANAGED_ROUTES') },
];

const routes = new Set(staticSiteRoutes());
const errors = [];
let checked = 0;

for (const { label, file, entries } of sets) {
  const seen = new Set();
  for (const entry of entries) {
    checked += 1;
    if (seen.has(entry)) {
      errors.push(`${file}: ${label} lists "${entry}" twice`);
      continue;
    }
    seen.add(entry);
    if (!routes.has(entry)) {
      errors.push(
        `${file}: ${label} names "${entry}", which is not a page on this site. ` +
          'Remove it, or add the page.'
      );
    }
  }
}

if (errors.length > 0) {
  console.error('✗ Route config is stale:\n');
  for (const error of errors) console.error(`  - ${error}`);
  console.error(`\n${routes.size} static route(s) exist. Run this to list them:`);
  console.error("  node -e \"import('./scripts/site-routes.mjs').then(m=>console.log(m.staticSiteRoutes().join('\\n')))\"");
  process.exit(1);
}

console.log(
  `✓ Route config valid — ${checked} entr${checked === 1 ? 'y' : 'ies'} across ${sets.length} set(s), every one a real page.`
);
