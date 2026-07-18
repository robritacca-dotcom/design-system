#!/usr/bin/env node
/**
 * Validates src/components/registry.json against the filesystem.
 *
 * Every folder in src/components must appear in exactly one of the
 * registry's two lists (`components` or `docOnlyHelpers`), and every
 * registry entry must have a folder. Runs before every build — library,
 * Storybook, and website — so the public component count can never
 * silently drift from reality.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = join(repoRoot, 'src', 'components');

/**
 * macOS (Finder copy-paste, iCloud sync conflicts) creates duplicates
 * named "original 2.ext". They silently shadow the real file — fail the
 * build so they get deleted instead of committed.
 */
const FINDER_DUPLICATE = /^.+ [2-9]\d*(\.[^ ]+)?$/;
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  '.venv',
  'dist',
  'out',
  'build',
  'storybook-static',
]);

function findFinderDuplicates(dir, found = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (FINDER_DUPLICATE.test(entry.name)) {
      found.push(relative(repoRoot, full));
      continue;
    }
    if (entry.isDirectory()) findFinderDuplicates(full, found);
  }
  return found;
}

const registry = JSON.parse(
  readFileSync(join(componentsDir, 'registry.json'), 'utf8')
);

const folders = readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const registered = [...registry.components, ...registry.docOnlyHelpers].sort();

const missingFromRegistry = folders.filter((f) => !registered.includes(f));
const missingFromDisk = registered.filter((r) => !folders.includes(r));
const duplicates = registry.components.filter((c) =>
  registry.docOnlyHelpers.includes(c)
);

const finderDuplicates = findFinderDuplicates(repoRoot);

let failed = false;

if (finderDuplicates.length > 0) {
  failed = true;
  console.error(
    `✗ Finder-style duplicate files (" 2" copies) — delete them:\n` +
      finderDuplicates.map((f) => `    - ${f}`).join('\n')
  );
}

if (missingFromRegistry.length > 0) {
  failed = true;
  console.error(
    `✗ Component folders missing from src/components/registry.json:\n` +
      missingFromRegistry.map((f) => `    - ${f}`).join('\n') +
      `\n  Add each to "components" (public) or "docOnlyHelpers" (internal).`
  );
}

if (missingFromDisk.length > 0) {
  failed = true;
  console.error(
    `✗ Registry entries with no folder in src/components:\n` +
      missingFromDisk.map((r) => `    - ${r}`).join('\n')
  );
}

if (duplicates.length > 0) {
  failed = true;
  console.error(
    `✗ Listed in both "components" and "docOnlyHelpers": ${duplicates.join(', ')}`
  );
}

if (failed) {
  process.exit(1);
}

console.log(
  `✓ Component registry in sync — ${registry.components.length} public components, ` +
    `${registry.docOnlyHelpers.length} doc-only helpers.`
);
