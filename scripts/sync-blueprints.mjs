#!/usr/bin/env node
/**
 * sync-blueprints.mjs
 *
 * The website's /blueprints pages serve CLAUDE.md and design.md from
 * website/public/ so visitors can read and download them. Those copies
 * used to be hand-made snapshots and drifted (stale counts, missing
 * sections). This script makes them a generated surface: it copies the
 * root files into website/public/ on every build, so the published
 * blueprints always match the real ones.
 *
 * Runs as part of the validate-registry chain (root package.json) and
 * the website prebuild.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const FILES = ['CLAUDE.md', 'design.md'];

let synced = 0;
for (const name of FILES) {
  const src = path.join(root, name);
  const dest = path.join(root, 'website', 'public', name);
  const content = fs.readFileSync(src, 'utf-8');
  const existing = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf-8') : null;
  if (existing !== content) {
    fs.writeFileSync(dest, content);
    synced++;
    console.log(`✓ Synced ${name} → website/public/${name}`);
  }
}

if (synced === 0) {
  console.log('✓ Blueprints in sync — website/public copies match root CLAUDE.md and design.md.');
}
