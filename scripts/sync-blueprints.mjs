#!/usr/bin/env node
/**
 * sync-blueprints.mjs
 *
 * The website's /blueprints pages serve the root markdown specs (the FILES
 * list below) from website/public/ so visitors can read and
 * download them. Those copies
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
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * The specs published to /blueprints. Exported because
 * scripts/validate-website-surfaces.mjs checks each one has a page to read
 * it on, so a spec cannot be synced as a raw download and then be
 * unreachable from the site.
 *
 * porting-guide.md is deliberately absent: unpublished from the site in
 * August 2026 (the old route redirects to /docs), it stays a repo-only
 * agent doc, still scanned by scripts/validate-doc-refs.mjs. Do not
 * re-add it here without a decision to republish.
 */
export const FILES = ['CLAUDE.md', 'design.md', 'content-design.md'];

/** The /blueprints route segment for a spec file. */
export const blueprintSlug = (name) => name.replace(/\.md$/, '').toLowerCase();

// Side effects only when run directly, so validators can import FILES and
// blueprintSlug without triggering a sync.
const isMain = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
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
    console.log(`✓ Blueprints in sync — website/public copies match the root ${FILES.join(', ')}.`);
  }
}
