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
 *
 * And holds the playground's NEUTRALS mirror
 * (website/src/app/playground/theme-overrides.ts) to the neutral primitives,
 * in both directions: neutralOverrides() regenerates every neutral — solid
 * and rgba variant — from that table when tinting, so a step, variant, or
 * alpha it doesn't mirror is a surface the playground silently leaves
 * un-themed (which is how the glass variants went missing once).
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

// Playground neutral mirror: the NEUTRALS table in theme-overrides.ts must
// equal the neutral primitives — every solid step's hex, and every rgba
// variant's suffix and alpha — in both directions.
const overridesPath = join(
  repoRoot,
  'website', 'src', 'app', 'playground', 'theme-overrides.ts'
);
const overridesSource = readFileSync(overridesPath, 'utf8');
const neutralsBlock = overridesSource.match(/const NEUTRALS: NeutralDef\[\] = \[([\s\S]*?)\n\];/);
if (!neutralsBlock) {
  errors.push(`playground/theme-overrides.ts: could not parse NEUTRALS — the neutral-mirror guard needs it`);
} else {
  const mirrored = new Map();
  for (const m of neutralsBlock[1].matchAll(
    /step:\s*"(\d\d)"\s*,\s*hex:\s*"([^"]+)"\s*,?\s*(?:alphas:\s*\{([^}]*)\})?/g
  )) {
    const alphas = new Map(
      [...(m[3] ?? '').matchAll(/"(-[a-z-]+)":\s*([0-9.]+)/g)].map((a) => [a[1], Number(a[2])])
    );
    mirrored.set(m[1], { hex: m[2], alphas });
  }

  const parseRgba = (value) => {
    const m = value.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)$/);
    return m ? { rgb: [Number(m[1]), Number(m[2]), Number(m[3])], alpha: Number(m[4]) } : null;
  };
  const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

  for (const [name, value] of primitiveValues) {
    const stepMatch = name.match(/^--primitive-neutral-(\d\d)(-[a-z-]+)?$/);
    if (!stepMatch) continue;
    const [, step, suffix] = stepMatch;
    const entry = mirrored.get(step);
    if (!entry) {
      errors.push(`theme-overrides.ts: NEUTRALS has no entry for step ${step} (${name}) — the playground cannot tint it`);
      continue;
    }
    if (!suffix) {
      if (entry.hex.toLowerCase() !== value.toLowerCase()) {
        errors.push(`theme-overrides.ts: NEUTRALS step ${step} is ${entry.hex} but ${name} is ${value}`);
      }
    } else {
      const rgba = parseRgba(value);
      const declared = entry.alphas.get(suffix);
      if (declared === undefined) {
        errors.push(`theme-overrides.ts: NEUTRALS step ${step} does not mirror the ${suffix} variant (${name}) — a tinted playground theme leaves it un-themed`);
      } else if (!rgba || rgba.alpha !== declared) {
        errors.push(`theme-overrides.ts: NEUTRALS step ${step}${suffix} declares alpha ${declared} but ${name} is ${value}`);
      } else if (rgba.rgb.join() !== hexToRgb(primitiveValues.get(`--primitive-neutral-${step}`) ?? '#000000').join()) {
        errors.push(`theme-overrides.ts: ${name}'s rgb does not match the step ${step} base hex`);
      }
    }
  }
  for (const [step, entry] of mirrored) {
    if (!primitiveValues.has(`--primitive-neutral-${step}`)) {
      errors.push(`theme-overrides.ts: NEUTRALS lists step ${step}, which has no --primitive-neutral-${step}`);
    }
    for (const suffix of entry.alphas.keys()) {
      if (!primitiveValues.has(`--primitive-neutral-${step}${suffix}`)) {
        errors.push(`theme-overrides.ts: NEUTRALS step ${step} mirrors ${suffix}, but --primitive-neutral-${step}${suffix} does not exist`);
      }
    }
  }
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
    `${fallbacks.length} chart palette fallbacks match their tokens; ` +
    `the playground neutral mirror matches the primitives.`
);
