#!/usr/bin/env node
/**
 * Holds the site's theme preset to its stylesheet import.
 *
 * Rift DS applies a preset with one attribute on <html>, but the stylesheet
 * that defines it has to be imported too. Those are two separate lines in two
 * separate files, and nothing in the language connects them: a static import
 * cannot be interpolated from a constant, and importing the whole preset
 * bundle would ship ten stylesheets to every visitor so one can be used.
 *
 * So this check connects them. BRAND in website/src/config/brand.ts and the
 * preset import in website/src/app/layout.tsx must agree:
 *
 *   - BRAND === 'default'  → no active preset import (the system's own look)
 *   - BRAND === '<name>'   → exactly one active import of that preset's sheet
 *
 * Without it, changing BRAND alone is silent: the attribute lands on <html>,
 * no stylesheet defines it, and the site renders the default look while the
 * code claims otherwise. Changing only the import is the same failure wearing
 * the other shoe.
 *
 * It also checks the named preset actually ships in the installed package,
 * so a typo or a preset dropped in a release fails here rather than resolving
 * to nothing in the browser.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const brandFile = join(repoRoot, 'website', 'src', 'config', 'brand.ts');
const layoutFile = join(repoRoot, 'website', 'src', 'app', 'layout.tsx');
const presetDir = join(repoRoot, 'node_modules', 'rift-ds', 'tokens', 'presets');

const read = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const errors = [];

const brandMatch = read(brandFile).match(/^export const BRAND: Brand = '([a-z-]+)';$/m);
if (!brandMatch) {
  errors.push('website/src/config/brand.ts: could not read BRAND — this check reads that exact declaration');
}
const brand = brandMatch?.[1];

/* Only uncommented imports count: the 'default' case leaves a commented
   template in place as the thing you edit, and a commented line applies
   nothing. */
const activeImports = read(layoutFile)
  .split('\n')
  .filter((line) => !line.trimStart().startsWith('//'))
  .map((line) => line.match(/^import\s+["']rift-ds\/tokens\/presets\/([a-z-]+)\.css["'];/))
  .filter(Boolean)
  .map((m) => m[1]);

if (brand === 'default') {
  if (activeImports.length > 0) {
    errors.push(
      `BRAND is 'default' (no preset), but layout.tsx imports ${activeImports.map((n) => `'${n}'`).join(', ')} — ` +
        'comment the import out, or set BRAND to that preset'
    );
  }
} else if (brand) {
  if (!existsSync(join(presetDir, `${brand}.css`))) {
    const shipped = existsSync(presetDir)
      ? readdirSync(presetDir).filter((f) => f.endsWith('.css') && f !== 'presets.css').map((f) => f.replace(/\.css$/, ''))
      : [];
    errors.push(
      `BRAND is '${brand}', which rift-ds does not ship. Available: ${shipped.join(', ') || '(none found)'}`
    );
  }
  if (!activeImports.includes(brand)) {
    errors.push(
      `BRAND is '${brand}', but layout.tsx does not import 'rift-ds/tokens/presets/${brand}.css' — ` +
        'the attribute would land on <html> with no stylesheet defining it'
    );
  }
  for (const extra of activeImports.filter((n) => n !== brand)) {
    errors.push(`layout.tsx imports preset '${extra}', which is not BRAND ('${brand}') — remove it`);
  }
}

if (errors.length > 0) {
  console.error('✗ Theme preset wiring invalid:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  brand === 'default'
    ? "✓ Theme preset wiring valid — BRAND is 'default', no preset stylesheet imported."
    : `✓ Theme preset wiring valid — BRAND is '${brand}' and its stylesheet is imported.`
);
