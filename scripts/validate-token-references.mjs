#!/usr/bin/env node
/**
 * Validates the token-tier chain: every semantic --color-* token in
 * tokens-light.css and tokens-dark.css must reference a primitive
 * (var(--primitive-*)) or another semantic colour token (var(--color-*)) —
 * never a raw hex/rgba literal. Referenced names must actually exist.
 *
 * This is what makes consumer customization work: overriding a
 * --primitive-* value cascades through the semantic layer only if the
 * semantic layer references primitives. A hex literal here silently
 * breaks that cascade — so it fails the build instead.
 *
 * --shadow-* tokens are exempt (compound values with embedded rgba()).
 *
 * Also holds the chart palette's SSR fallbacks
 * (src/components/Chart/palette.ts) to the --color-chart-series-* tokens:
 * they are the one place a chart colour lives outside CSS, and a re-themed
 * accent must not leave charts SSR-rendering the old colour.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokensDir = join(repoRoot, 'src', 'tokens');

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

const parseDeclarations = (css) => {
  const declarations = [];
  const re = /^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gim;
  let match;
  while ((match = re.exec(stripComments(css))) !== null) {
    declarations.push({ name: match[1], value: match[2].trim() });
  }
  return declarations;
};

const primitiveNames = new Set(
  parseDeclarations(readFileSync(join(tokensDir, 'tokens-primitives.css'), 'utf8')).map(
    (d) => d.name
  )
);

const errors = [];

for (const file of ['tokens-light.css', 'tokens-dark.css']) {
  const declarations = parseDeclarations(readFileSync(join(tokensDir, file), 'utf8'));
  const semanticNames = new Set(declarations.map((d) => d.name));

  for (const { name, value } of declarations) {
    if (!name.startsWith('--color-')) continue;

    const varMatch = value.match(/^var\((--[a-z0-9-]+)\)$/);
    if (!varMatch) {
      errors.push(
        `${file}: ${name} is "${value}" — semantic colour tokens must be ` +
          `a single var(--primitive-*) or var(--color-*) reference, not a literal`
      );
      continue;
    }

    const target = varMatch[1];
    if (target.startsWith('--primitive-')) {
      if (!primitiveNames.has(target)) {
        errors.push(`${file}: ${name} references ${target}, which does not exist in tokens-primitives.css`);
      }
    } else if (target.startsWith('--color-')) {
      if (!semanticNames.has(target)) {
        errors.push(`${file}: ${name} references ${target}, which is not defined in ${file}`);
      }
    } else {
      errors.push(`${file}: ${name} references ${target} — must chain to a --primitive-* or --color-* token`);
    }
  }
}

// Chart palette fallbacks: SERIES_FALLBACKS in palette.ts must equal the
// light-theme resolution of --color-chart-series-1..N, in order.
const lightDecls = new Map(
  parseDeclarations(readFileSync(join(tokensDir, 'tokens-light.css'), 'utf8')).map((d) => [
    d.name,
    d.value,
  ])
);
const primitiveValues = new Map(
  parseDeclarations(readFileSync(join(tokensDir, 'tokens-primitives.css'), 'utf8')).map((d) => [
    d.name,
    d.value,
  ])
);
const resolveLight = (name, seen = new Set()) => {
  if (seen.has(name)) return null;
  seen.add(name);
  if (name.startsWith('--primitive-')) return primitiveValues.get(name) ?? null;
  const value = lightDecls.get(name);
  const m = value?.match(/^var\((--[a-z0-9-]+)\)$/);
  return m ? resolveLight(m[1], seen) : (value ?? null);
};

const palettePath = join(repoRoot, 'src', 'components', 'Chart', 'palette.ts');
const paletteSource = readFileSync(palettePath, 'utf8');
const fallbackBlock = paletteSource.match(/const SERIES_FALLBACKS = \[([\s\S]*?)\]/);
const fallbacks = fallbackBlock
  ? [...fallbackBlock[1].matchAll(/'(#[0-9A-Fa-f]{3,8})'/g)].map((m) => m[1])
  : [];
const seriesTokens = [...lightDecls.keys()]
  .filter((n) => /^--color-chart-series-\d+$/.test(n))
  .sort((a, b) => Number(a.match(/\d+$/)[0]) - Number(b.match(/\d+$/)[0]));

if (fallbacks.length === 0) {
  errors.push(`Chart/palette.ts: could not parse SERIES_FALLBACKS — the fallback guard needs it`);
} else if (fallbacks.length !== seriesTokens.length) {
  errors.push(
    `Chart/palette.ts: SERIES_FALLBACKS has ${fallbacks.length} entries but ` +
      `${seriesTokens.length} --color-chart-series-* tokens exist — add or remove the fallback with the token`
  );
} else {
  seriesTokens.forEach((token, i) => {
    const resolved = resolveLight(token);
    if (!resolved || resolved.toLowerCase() !== fallbacks[i].toLowerCase()) {
      errors.push(
        `Chart/palette.ts: fallback ${i + 1} is ${fallbacks[i]} but ${token} resolves to ` +
          `${resolved ?? 'nothing'} in the light theme — keep the SSR fallbacks equal to the tokens`
      );
    }
  });
}

if (errors.length > 0) {
  console.error(
    `✗ Semantic colour tokens must chain to primitives (see CLAUDE.md — Token Architecture):\n` +
      errors.map((e) => `    - ${e}`).join('\n')
  );
  process.exit(1);
}

console.log(
  `✓ Token references valid — every semantic colour token chains to a primitive; ` +
    `${fallbacks.length} chart palette fallbacks match their tokens.`
);
