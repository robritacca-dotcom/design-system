#!/usr/bin/env node
/**
 * Fails the build when this site's CSS references a custom property that is
 * never defined anywhere — a typo'd or phantom token.
 *
 * Why this exists: the design system once shipped modal titles styled with
 * --font-heading-6-*, a family that never existed, so they silently fell back
 * to inherited body type. This site had the same bug for longer: four case
 * studies drew a border with var(--color-border-secondary), which nothing
 * defines, so the borders never rendered.
 *
 * It matters more since the token rename. rift-ds renumbered its spacing,
 * radius, border and icon scales (--gap-md became --gap-400, and so on), and
 * a missed call site is not a crash, it is a silently absent value. This is
 * the check that turns one into a build error.
 *
 * Scope: website CSS, resolved against the tokens the installed package
 * actually ships. A reference counts as defined if ANY of these declare it:
 *   - a declaration (--name: …) in the site's own CSS, or in rift-ds's
 *     token and component stylesheets
 *   - a string occurrence of the property name in the site's TSX/TS
 *     (components set custom properties like --ds-swatch-color from JS)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, exts, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => entry.endsWith(e))) out.push(full);
  }
  return out;
}

const siteDir = join(repoRoot, 'website', 'src');
const packageDir = join(repoRoot, 'node_modules', 'rift-ds');

// Only the site's CSS is checked. The package's stylesheets are read for the
// definitions they carry, never audited: they are someone else's build output
// from this repo's point of view.
const cssFiles = walk(siteDir, ['.css']);
const tsFiles = walk(siteDir, ['.tsx', '.ts']);
const packageCss = walk(packageDir, ['.css']);

const defined = new Set();
// Declarations in CSS: `--name:` (also catches fallback-less custom-prop
// definitions inside component files, e.g. Swatch's --ds-swatch-color).
for (const file of [...cssFiles, ...packageCss]) {
  for (const m of readFileSync(file, 'utf8').matchAll(/(--[\w-]+)\s*:/g)) {
    defined.add(m[1]);
  }
}
// Custom properties set from TS/TSX (inline style objects).
for (const file of tsFiles) {
  for (const m of readFileSync(file, 'utf8').matchAll(/["'`](--[\w-]+)["'`]/g)) {
    defined.add(m[1]);
  }
}

const problems = [];
for (const file of cssFiles) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/var\(\s*(--[\w-]+)\s*([,)])/g)) {
      // A var() with a fallback is a deliberate override hook (e.g.
      // --material-symbols-weight) — it degrades gracefully, so skip it.
      if (m[2] === ',') continue;
      if (!defined.has(m[1])) {
        problems.push(
          `${file.slice(repoRoot.length + 1)}:${i + 1} — var(${m[1]}) is never defined anywhere in src/`
        );
      }
    }
  });
}

if (problems.length) {
  console.error('✗ Undefined custom-property references in library CSS:\n');
  for (const p of problems) console.error(`  ${p}`);
  console.error(
    '\nEvery var(--…) in component CSS must resolve to a token or a custom property the component itself defines. Fix the reference or define the property.'
  );
  process.exit(1);
}

console.log(
  `✓ Token usage valid — every var(--…) reference in ${cssFiles.length} site CSS files resolves to a defined property.`
);
