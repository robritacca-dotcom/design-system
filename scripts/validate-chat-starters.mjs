#!/usr/bin/env node
/**
 * Validates that every written chat suggestion fits on a chip.
 *
 * A suggestion — a conversation starter on the chat's welcome screen, or a
 * follow-up question under an answer — renders as a Chip, which never wraps.
 * Past the column width the pill runs off the edge of the docked panel, so the
 * budget is a hard limit rather than a preference. The limit itself lives in
 * website/src/lib/chat-suggestions.ts and is read from there, so this script
 * never restates it.
 *
 * Generated suggestions are held to the same number at runtime (the follow-ups
 * route drops a long one rather than clipping it). What needs a build check is
 * the written copy: a starter is a string a person types, and nothing else
 * would notice it had grown two words too long.
 *
 * Labels built from runtime data are checked as their static skeleton only —
 * a name substituted into one can be any length, which is why starters.ts
 * falls back to the unnamed wording when the named one does not fit.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const budgetPath = join(repoRoot, 'website', 'src', 'lib', 'chat-suggestions.ts');

/**
 * Where written suggestions live. `scope` narrows a file to the region that
 * holds them, for files whose other `label:` fields are not chips — the
 * playground writes a fictional product's starters inline, beside stage
 * sizes and rail controls that are labelled too.
 */
const SOURCES = [
  { path: join('website', 'src', 'components', 'SiteChat', 'starters.ts') },
  {
    path: join('website', 'src', 'app', 'playground', 'views', 'ChatView.tsx'),
    scope: /starters=\{\[([\s\S]*?)\]\}/g,
  },
];

const errors = [];

/* The budget, read from the module that owns it. */
let maxChars;
try {
  const source = readFileSync(budgetPath, 'utf8');
  const match = source.match(/export const SUGGESTION_MAX_CHARS\s*=\s*(\d+)/);
  if (!match) throw new Error('SUGGESTION_MAX_CHARS not found');
  maxChars = Number(match[1]);
} catch (err) {
  console.error(`✗ Could not read the chip budget from chat-suggestions.ts: ${err.message}`);
  process.exit(1);
}

let checked = 0;

for (const { path: relative, scope } of SOURCES) {
  let source;
  try {
    source = readFileSync(join(repoRoot, relative), 'utf8');
  } catch (err) {
    errors.push(`Could not read ${relative}: ${err.message}`);
    continue;
  }

  if (scope) {
    const regions = [...source.matchAll(scope)].map((match) => match[1]);
    if (regions.length === 0) {
      errors.push(`${relative}: no suggestion region matched — the scope pattern has gone stale.`);
      continue;
    }
    source = regions.join('\n');
  }

  // `label: "…"` and `label: \`…\`, in either quote style.
  const labels = source.matchAll(/label:\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`)/g);
  for (const match of labels) {
    const label = match[1] ?? match[2] ?? match[3];
    // A `${…}` stands for runtime data of unknown length; measure what is
    // written around it and leave the substitution to the runtime fallback.
    const written = label.replace(/\$\{[^}]*\}/g, '');
    checked += 1;
    if (written.length > maxChars) {
      errors.push(
        `${relative}: "${label}" is ${written.length} characters, over the ${maxChars}-character chip budget.`
      );
    }
  }
}

if (checked === 0) {
  errors.push(
    'No suggestion labels found. The sources in SOURCES have moved or changed shape — this check is now inert.'
  );
}

if (errors.length > 0) {
  console.error('✗ Chat suggestion validation failed:\n');
  for (const error of errors) console.error(`  - ${error}`);
  console.error('');
  process.exit(1);
}

console.log(
  `✓ Chat suggestions fit — ${checked} written labels within the ${maxChars}-character chip budget.`
);
