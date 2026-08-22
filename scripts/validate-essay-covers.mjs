#!/usr/bin/env node
/**
 * validate-essay-covers.mjs
 *
 * Guards website/src/data/essay-covers.json — the registry of illustrated
 * covers for the essays on /writing — against essays.json and the images on
 * disk. Each essay has a light and a dark illustration that the site swaps
 * with the theme; a missing one is a blank cover on the live site rather than
 * a build error, so it is worth a build error here.
 *
 * Checks:
 *  - every essay in essays.json has a cover entry, and every entry is an
 *    essay — the two lists cannot drift (an essay synced in after publishing
 *    fails the build until its pair is added, which is the point)
 *  - every entry has alt text describing what the illustration shows
 *  - both theme files exist under website/public/covers/writing
 *  - every file in that folder is one the registry asked for, so a renamed
 *    slug cannot leave an orphan shipping in the repo forever
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(repoRoot, 'website', 'src', 'data', 'essay-covers.json');
const essaysPath = join(repoRoot, 'website', 'src', 'data', 'essays.json');
const coverDir = join(repoRoot, 'website', 'public', 'covers', 'writing');
const THEMES = ['light', 'dark'];

const errors = [];
const fail = (message) => errors.push(message);

const readJson = (path) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    console.error(`✗ ${path} unreadable: ${error.message}`);
    process.exit(1);
  }
};

const registry = readJson(registryPath);
const essays = readJson(essaysPath);

const covers = registry.covers;
if (!covers || typeof covers !== 'object' || Array.isArray(covers)) {
  console.error('✗ essay-covers.json must carry a `covers` object keyed by essay slug');
  process.exit(1);
}

const essaySlugs = new Set((essays.essays ?? []).map((essay) => essay.slug));
const coverSlugs = new Set(Object.keys(covers));

for (const slug of essaySlugs) {
  if (!coverSlugs.has(slug)) {
    fail(`essay "${slug}" has no cover entry — add a light/dark pair under public/covers/writing and register it`);
  }
}
for (const slug of coverSlugs) {
  if (!essaySlugs.has(slug)) {
    fail(`cover "${slug}" is registered but no essay in essays.json has that slug`);
  }
}

const expectedFiles = new Set();
for (const [slug, entry] of Object.entries(covers)) {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    fail(`cover "${slug}": key must be a lowercase URL slug (matches /writing/<slug>)`);
  }
  if (typeof entry?.alt !== 'string' || !entry.alt.trim()) {
    fail(`cover "${slug}": missing alt text describing what the illustration shows`);
  }
  for (const theme of THEMES) {
    const file = `${slug}-${theme}.webp`;
    expectedFiles.add(file);
    if (!existsSync(join(coverDir, file))) {
      fail(`cover "${slug}": missing ${theme} file public/covers/writing/${file}`);
    }
  }
}

const onDisk = existsSync(coverDir)
  ? readdirSync(coverDir).filter((name) => !name.startsWith('.'))
  : [];
for (const file of onDisk) {
  if (!expectedFiles.has(file)) {
    fail(`public/covers/writing/${file} is not a registered cover — register it or delete it`);
  }
}

if (errors.length > 0) {
  console.error(`✗ essay-covers: ${errors.length} problem(s)`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`✓ essay-covers: ${coverSlugs.size} essay(s), ${THEMES.length} theme(s) each, all files present`);
