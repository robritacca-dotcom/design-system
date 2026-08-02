#!/usr/bin/env node
/**
 * Builds the publishable package into dist/ (`npm run build:lib`):
 *   1. vite build --config vite.lib.config.ts (JS + d.ts, one module
 *      per source file — see that config's header comment)
 *   2. copies the runtime assets the emitted JS references verbatim:
 *      every non-story .css under src/, the icon font, and the
 *      registry JSON files
 *   3. writes dist/package.json — the manifest that actually ships to
 *      npm (dist-form exports, no `private`, no scripts) — plus
 *      LICENSE and README.md
 *
 * Publishing always happens FROM dist/, never from the repo root.
 */
import { execSync } from 'node:child_process';
import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { distManifest } from './package-manifest.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(repoRoot, 'src');
const distDir = join(repoRoot, 'dist');

console.log('▸ Building library (vite + dts)…');
execSync('npx vite build --config vite.lib.config.ts', { cwd: repoRoot, stdio: 'inherit' });

const collect = (dir, predicate, out = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) collect(path, predicate, out);
    else if (predicate(entry.name)) out.push(path);
  }
  return out;
};

const assets = [
  ...collect(srcDir, (name) => name.endsWith('.css') && !name.includes('.stories.')),
  ...collect(join(srcDir, 'fonts'), (name) => name.endsWith('.woff2')),
  join(srcDir, 'components', 'registry.json'),
  join(srcDir, 'tokens', 'registry.json'),
];

for (const asset of assets) {
  const target = join(distDir, relative(srcDir, asset));
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(asset, target);
}
console.log(`▸ Copied ${assets.length} runtime assets (css, fonts, registries).`);

const rootPkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'));
writeFileSync(join(distDir, 'package.json'), JSON.stringify(distManifest(rootPkg), null, 2) + '\n');
copyFileSync(join(repoRoot, 'LICENSE'), join(distDir, 'LICENSE'));
copyFileSync(join(repoRoot, 'README.md'), join(distDir, 'README.md'));
// USAGE.md travels with the package so the design rules reach a consumer
// (or their AI assistant) without a trip to the website.
copyFileSync(join(repoRoot, 'USAGE.md'), join(distDir, 'USAGE.md'));

console.log('✓ Package built — publish from dist/ (npm publish --access public).');
