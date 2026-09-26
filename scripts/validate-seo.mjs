#!/usr/bin/env node
/**
 * The SEO surface, checked against what the build actually rendered.
 *
 * Nothing guarded this before. Metadata is assembled from several places —
 * the root layout, a section layout, a page's own block — and Next merges
 * them per top-level key rather than per field, so a page that declares
 * `openGraph` replaces the inherited one wholesale. That failure is silent:
 * the page still renders, still ranks, and unfurls as something else.
 *
 * Reads the prerendered HTML, like the other built-output checks, so it runs
 * after the website build rather than in the generator chain.
 *
 * What it holds:
 *   - every indexable page has exactly one canonical, absolute, on the
 *     canonical host, pointing at its own path (not a parent's)
 *   - every indexable page carries og:title, og:description and og:image
 *   - noindex pages are absent from the sitemap, and the sitemap lists
 *     nothing that is not a real prerendered page
 *   - every JSON-LD block parses, and none is left empty
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL } from './site-config.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const appOut = join(repoRoot, 'website', '.next', 'server', 'app');

if (!existsSync(appOut)) {
  console.error('✗ No built output — run the website build before this check.');
  process.exit(1);
}

/** Every prerendered page, as { route, html }. */
function pages(dir = appOut, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) pages(full, out);
    else if (entry.endsWith('.html')) {
      const rel = relative(appOut, full).replace(/\\/g, '/').replace(/\.html$/, '');
      out.push({ route: rel === 'index' ? '/' : `/${rel}`, html: readFileSync(full, 'utf8') });
    }
  }
  return out;
}

/* The root layout's title, read from the build rather than restated. */
const home = pages().find((p) => p.route === '/');
const SITE_TITLE = home?.html.match(/<meta property="og:title" content="([^"]*)"/)?.[1] ?? '';

const errors = [];
const all = pages();
const indexable = [];

for (const { route, html } of all) {
  // Next's own internals (_global-error, _not-found) are not routes anyone
  // reaches by URL and carry no metadata by design.
  if (route.startsWith('/_')) continue;
  const noindex = /<meta name="robots"[^>]*content="[^"]*noindex/i.test(html);
  if (noindex) continue;
  indexable.push(route);

  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  if (canonicals.length === 0) {
    errors.push(`${route}: no canonical`);
  } else if (canonicals.length > 1) {
    errors.push(`${route}: ${canonicals.length} canonicals (${canonicals.join(', ')})`);
  } else {
    const href = canonicals[0];
    if (!href.startsWith(SITE_URL)) {
      // /writing/<slug> canonicalises to Substack on purpose: the essays are
      // mirrored there and that is where the original lives.
      if (!route.startsWith('/writing/')) {
        errors.push(`${route}: canonical is off-host (${href})`);
      }
    } else {
      const path = href.slice(SITE_URL.length) || '/';
      if (path !== route) errors.push(`${route}: canonical points at ${path}`);
    }
  }

  for (const prop of ['og:title', 'og:description', 'og:image']) {
    if (!new RegExp(`<meta property="${prop}"`).test(html)) {
      errors.push(`${route}: missing ${prop}`);
    }
  }

  /* Present is not enough. Next merges metadata per top-level key, so a page
     that sets none inherits the root's block whole and unfurls as the
     homepage: right tags, wrong page. Only / may carry the site title. */
  const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/)?.[1];
  if (route !== '/' && ogTitle && ogTitle === SITE_TITLE) {
    errors.push(`${route}: og:title is the site default, so it unfurls as the homepage`);
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const raw = m[1].trim();
    if (!raw) { errors.push(`${route}: empty JSON-LD block`); continue; }
    try {
      const parsed = JSON.parse(raw.replace(/&quot;/g, '"'));
      if (!parsed['@type']) errors.push(`${route}: JSON-LD block has no @type`);
    } catch {
      errors.push(`${route}: JSON-LD does not parse`);
    }
  }
}

/* The sitemap must list real, indexable pages and nothing else. */
const sitemapFile = join(appOut, 'sitemap.xml.body');
if (existsSync(sitemapFile)) {
  const listed = [...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(SITE_URL, '') || '/');
  const known = new Set(all.map((p) => p.route));
  const indexableSet = new Set(indexable);
  for (const route of listed) {
    // Essays render on demand from the live feed, so they never prerender.
    if (route.startsWith('/writing/')) continue;
    if (!known.has(route)) errors.push(`sitemap lists ${route}, which is not a prerendered page`);
    else if (!indexableSet.has(route)) errors.push(`sitemap lists ${route}, which is noindex`);
  }
} else {
  errors.push('sitemap.xml was not found in the build output');
}

if (errors.length > 0) {
  console.error(`✗ SEO problems in the rendered output (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `✓ SEO surface valid — ${indexable.length} indexable page(s): one self-referencing canonical each, ` +
    'complete Open Graph tags, parsing JSON-LD, and a sitemap of real pages.'
);
