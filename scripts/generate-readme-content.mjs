#!/usr/bin/env node
/**
 * Regenerates the README's component count and component list from
 * src/components/registry.json, so the repo's public self-description
 * never drifts from the registry (single source of truth — see the
 * "Registries" section of CLAUDE.md).
 *
 * Rewrites README.md in place between marker comments:
 *   <!-- component-count -->…<!-- /component-count -->   (inline)
 *   <!-- component-list:start --> … <!-- component-list:end -->
 *
 * Also fails if the README's Tech section names a different major
 * version of React / Next.js / Storybook / Vite than package.json —
 * versions aren't generated (they sit in prose), but they can't drift.
 *
 * Runs as part of `npm run validate-registry` (every build, both
 * projects). Never hand-edit the marked README sections.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PACKAGE_NAME } from './package-manifest.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const readmePath = join(repoRoot, 'README.md');

/** "AlertDialog" -> "Alert dialog" (first word keeps its case). */
const displayName = (folder) =>
  folder
    .replace(/(?<=[a-z0-9])(?=[A-Z])/g, ' ')
    .split(' ')
    .map((word, i) => (i === 0 ? word : word.toLowerCase()))
    .join(' ');

const registry = JSON.parse(
  readFileSync(join(repoRoot, 'src', 'components', 'registry.json'), 'utf8')
);

// Normalize CRLF so Windows checkouts (core.autocrlf=true) match the
// LF-based markers and produce the same output as CI.
const original = readFileSync(readmePath, 'utf8').replace(/\r\n/g, '\n');
let readme = original;

const countMarker = /<!-- component-count -->[\s\S]*?<!-- \/component-count -->/;
const listMarker =
  /(<!-- component-list:start -->\n)[\s\S]*?(\n<!-- component-list:end -->)/;
const npmBadgeMarker =
  /(<!-- npm-badge:start -->\n)[\s\S]*?(\n<!-- npm-badge:end -->)/;

for (const [name, re] of [
  ['component-count', countMarker],
  ['component-list', listMarker],
  ['npm-badge', npmBadgeMarker],
]) {
  if (!re.test(readme)) {
    console.error(
      `✗ README.md is missing the ${name} markers — restore them so the ` +
        `component section can be generated from the registry.`
    );
    process.exit(1);
  }
}

readme = readme.replace(
  countMarker,
  `<!-- component-count -->${registry.components.length}<!-- /component-count -->`
);
readme = readme.replace(
  listMarker,
  `$1${registry.components.map(displayName).join(' · ')}$2`
);

// The npm badge encodes the package name twice (shield + link), so it is
// generated from the manifest rather than hand-typed — a scope change can
// never leave a badge pointing at a package that doesn't exist.
const encodedName = PACKAGE_NAME.replace('/', '%2F');
readme = readme.replace(
  npmBadgeMarker,
  `$1[![npm](https://img.shields.io/npm/v/${encodedName}?logo=npm&color=CB3837)](https://www.npmjs.com/package/${PACKAGE_NAME})$2`
);

// Version drift check: README prose vs. package.json majors.
const libPkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'));
const sitePkg = JSON.parse(
  readFileSync(join(repoRoot, 'website', 'package.json'), 'utf8')
);
const major = (range) => range.replace(/^[^\d]*/, '').split('.')[0];
const expected = {
  React: major(libPkg.devDependencies.react),
  'Next.js': major(sitePkg.dependencies.next),
  Storybook: major(libPkg.devDependencies.storybook),
  Vite: major(libPkg.devDependencies.vite),
};

const versionDrift = Object.entries(expected).flatMap(([name, want]) => {
  const m = readme.match(new RegExp(`${name.replace('.', '\\.')} (\\d+)`));
  if (!m) return [`${name}: not mentioned in README.md (expected "${name} ${want}")`];
  return m[1] === want ? [] : [`${name}: README says ${m[1]}, package.json says ${want}`];
});

// Package-name drift check: the install/usage docs must reference the
// name the package actually publishes under (scripts/package-manifest.mjs).
if (!readme.includes(PACKAGE_NAME)) {
  console.error(
    `✗ README.md never mentions the package name "${PACKAGE_NAME}" — ` +
      `the install/usage section is missing or references a stale name.`
  );
  process.exit(1);
}

if (versionDrift.length > 0) {
  console.error(
    `✗ README.md Tech section is out of date with package.json:\n` +
      versionDrift.map((d) => `    - ${d}`).join('\n')
  );
  process.exit(1);
}

if (readme !== original) {
  writeFileSync(readmePath, readme);
  console.log(
    `✓ Regenerated README.md component section — ${registry.components.length} components. ` +
      `Commit README.md with this change.`
  );
} else {
  console.log(
    `✓ README.md in sync — ${registry.components.length} components, versions match package.json.`
  );
}
