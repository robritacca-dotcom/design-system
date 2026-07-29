#!/usr/bin/env node
/**
 * Validates the root package.json against scripts/package-manifest.mjs:
 *   1. name/version/exports match the manifest's source form exactly
 *      (the exports field is generated — never hand-edit it).
 *   2. Every non-wildcard export target exists on disk; wildcard
 *      targets' base directories exist and contain at least one match.
 *   3. package-lock.json's root version matches too. npm records the
 *      version there on install, and a release bump that skips the
 *      lockfile (0.3.0 shipped that way) leaves every later plain
 *      `npm install` dirtying the tree — which breaks the worktree
 *      recipes in the site-updates and growth-loop skills. Fix with
 *      `npm install --package-lock-only` and commit the lockfile.
 *
 * Part of the validate-registry chain, so the public import surface the
 * website dogfoods can never drift from what the package declares.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PACKAGE_NAME, PACKAGE_VERSION, sourceExports } from './package-manifest.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'));

const errors = [];

if (pkg.name !== PACKAGE_NAME) {
  errors.push(`package.json name is "${pkg.name}", manifest says "${PACKAGE_NAME}"`);
}
if (pkg.version !== PACKAGE_VERSION) {
  errors.push(`package.json version is "${pkg.version}", manifest says "${PACKAGE_VERSION}"`);
}

const lock = JSON.parse(readFileSync(join(repoRoot, 'package-lock.json'), 'utf8'));
for (const [where, v] of [
  ['root', lock.version],
  ['packages[""]', lock.packages?.['']?.version],
]) {
  if (v !== PACKAGE_VERSION) {
    errors.push(
      `package-lock.json ${where} version is "${v}", manifest says "${PACKAGE_VERSION}" — ` +
        `run \`npm install --package-lock-only\` and commit the lockfile`
    );
  }
}

const expected = sourceExports();
if (JSON.stringify(pkg.exports) !== JSON.stringify(expected)) {
  errors.push(
    `package.json "exports" is out of sync with scripts/package-manifest.mjs — ` +
      `update the manifest, then copy sourceExports() into package.json`
  );
}

for (const [key, target] of Object.entries(expected)) {
  if (target.includes('*')) {
    const starIndex = target.indexOf('*');
    const baseDir = join(repoRoot, target.slice(0, starIndex));
    const suffix = target.slice(starIndex + 1);
    let hasMatch = false;
    if (existsSync(baseDir)) {
      const stack = [baseDir];
      while (stack.length > 0 && !hasMatch) {
        const dir = stack.pop();
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
          if (entry.isDirectory()) stack.push(join(dir, entry.name));
          else if (entry.name.endsWith(suffix)) hasMatch = true;
        }
      }
    }
    if (!hasMatch) {
      errors.push(`export "${key}" → "${target}" matches nothing on disk`);
    }
  } else if (!existsSync(join(repoRoot, target))) {
    errors.push(`export "${key}" → "${target}" does not exist`);
  }
}

if (errors.length > 0) {
  console.error(
    `✗ Package exports invalid:\n` + errors.map((e) => `    - ${e}`).join('\n')
  );
  process.exit(1);
}

console.log(
  `✓ Package exports valid — ${Object.keys(expected).length} subpaths, all targets present.`
);
