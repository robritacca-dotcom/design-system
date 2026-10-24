#!/usr/bin/env node
/**
 * validate-rift-ds-themes.mjs
 *
 * Guards website/src/data/rift-ds-themes.json, the theme gallery on
 * /work/rift-ds, against the installed rift-ds package and the images on
 * disk. The page prints how many looks the system ships from this file, so
 * the file has to agree with the package, or the count is a typed number by
 * another route.
 *
 * Checks:
 *  - exactly one entry is the base look (no preset stylesheet behind it)
 *  - every other entry is a preset the package ships
 *    (node_modules/rift-ds/tokens/presets/<id>.css), and every preset the
 *    package ships has an entry, so an upgrade that adds a theme fails the
 *    build until the gallery shows it
 *  - ids are unique, and every entry has a label and alt text
 *  - both theme captures exist under website/public/images/rift-ds/themes
 *  - every file in that folder is one the registry asked for
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(repoRoot, 'website', 'src', 'data', 'rift-ds-themes.json');
const imageDir = join(repoRoot, 'website', 'public', 'images', 'rift-ds', 'themes');
const MODES = ['light', 'dark'];

// The package as the site resolves it, so a hoisted or nested install both work.
const require = createRequire(join(repoRoot, 'website', 'package.json'));
const presetDir = join(dirname(require.resolve('rift-ds/package.json')), 'tokens', 'presets');

const errors = [];
const fail = (message) => errors.push(message);

let registry;
try {
  registry = JSON.parse(readFileSync(registryPath, 'utf8'));
} catch (error) {
  console.error(`✗ ${registryPath} unreadable: ${error.message}`);
  process.exit(1);
}

const themes = registry.themes;
if (!Array.isArray(themes) || themes.length === 0) {
  console.error('✗ rift-ds-themes.json must carry a non-empty `themes` array');
  process.exit(1);
}

// presets.css is the all-in-one bundle, not a theme.
const shipped = new Set(
  readdirSync(presetDir)
    .filter((file) => file.endsWith('.css') && file !== 'presets.css')
    .map((file) => file.replace(/\.css$/, '')),
);

const bases = themes.filter((theme) => theme.base === true);
if (bases.length !== 1) {
  fail(`exactly one theme must be marked "base": true (found ${bases.length})`);
}

const seen = new Set();
const expectedFiles = new Set();
for (const theme of themes) {
  const id = theme?.id;
  if (typeof id !== 'string' || !/^[a-z0-9-]+$/.test(id)) {
    fail(`theme ${JSON.stringify(id)}: id must be the package's lowercase preset id`);
    continue;
  }
  if (seen.has(id)) fail(`theme "${id}" is registered twice`);
  seen.add(id);
  if (theme.base !== true && !shipped.has(id)) {
    fail(`theme "${id}" is registered but the installed package ships no tokens/presets/${id}.css`);
  }
  if (theme.base === true && shipped.has(id)) {
    fail(`theme "${id}" is marked base but the package ships a preset stylesheet for it`);
  }
  if (typeof theme.label !== 'string' || !theme.label.trim()) {
    fail(`theme "${id}": missing label`);
  }
  if (typeof theme.alt !== 'string' || !theme.alt.trim()) {
    fail(`theme "${id}": missing alt text describing what the capture shows`);
  }
  for (const mode of MODES) {
    const file = `${id}-${mode}.webp`;
    expectedFiles.add(file);
    if (!existsSync(join(imageDir, file))) {
      fail(`theme "${id}": missing ${mode} capture public/images/rift-ds/themes/${file}`);
    }
  }
}

for (const id of shipped) {
  if (!seen.has(id)) {
    fail(`the installed package ships the "${id}" preset but the gallery has no entry for it — capture it and register it`);
  }
}

if (existsSync(imageDir)) {
  for (const file of readdirSync(imageDir)) {
    if (!expectedFiles.has(file)) {
      fail(`public/images/rift-ds/themes/${file} is not a capture any registered theme asks for`);
    }
  }
}

if (errors.length) {
  console.error(`✗ rift-ds-themes.json: ${errors.length} problem(s)`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`✓ Theme gallery valid — ${themes.length} looks, matching the installed package's presets, each captured light and dark.`);
