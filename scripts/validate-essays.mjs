#!/usr/bin/env node
/**
 * validate-essays.mjs
 *
 * Guards website/src/data/essays.json — the committed essays registry the
 * site-chat corpus embeds (full text, so the chat can quote and discuss the
 * essays). Structure only: complete fields, unique site-matching slugs,
 * non-trivial text, no leaked HTML. Freshness is deliberately not checked —
 * the registry is refreshed by running scripts/sync-essays.mjs after
 * publishing (a curation job, like the project journal), never by the build,
 * which must stay off the network.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(repoRoot, 'website', 'src', 'data', 'essays.json');

const errors = [];
const fail = (message) => errors.push(message);

let data;
try {
  data = JSON.parse(readFileSync(path, 'utf8'));
} catch (error) {
  console.error(`✗ ${path} unreadable: ${error.message}`);
  process.exit(1);
}

if (!Array.isArray(data.essays) || data.essays.length === 0) {
  fail('essays.json must carry a non-empty `essays` array');
}

const slugs = new Set();
for (const essay of data.essays ?? []) {
  const at = `essay ${JSON.stringify(essay.slug ?? essay.title ?? '?')}`;
  for (const field of ['slug', 'title', 'date', 'text']) {
    if (typeof essay[field] !== 'string' || !essay[field].trim()) {
      fail(`${at}: missing or empty ${field}`);
    }
  }
  if (essay.slug) {
    if (!/^[a-z0-9-]+$/.test(essay.slug)) {
      fail(`${at}: slug must be a lowercase URL slug (matches /writing/<slug>)`);
    }
    if (slugs.has(essay.slug)) fail(`${at}: duplicate slug`);
    slugs.add(essay.slug);
  }
  if (typeof essay.text === 'string') {
    if (essay.text.length < 500) {
      fail(`${at}: text is suspiciously short (${essay.text.length} chars) — a failed sync?`);
    }
    if (/<\/?[a-z][^>]*>/i.test(essay.text)) {
      fail(`${at}: text contains HTML — the sync script should have stripped it`);
    }
  }
}

if (errors.length > 0) {
  console.error('\n✗ Essays registry validation failed:\n');
  for (const error of errors) console.error(`  - ${error}\n`);
  process.exit(1);
}

console.log(`✓ Essays registry valid — ${data.essays.length} essays, complete and HTML-free.`);
