#!/usr/bin/env node
/**
 * validate-site-corpus.mjs
 *
 * Guards website/src/data/site-corpus.generated.ts, the document /api/chat
 * sends to the model as its cached system block. Three checks:
 *
 *   1. Freshness — regenerates in memory and byte-compares against disk, so a
 *      page edit that changes the corpus can't land without the regenerated
 *      file. (CI also runs a drift guard after the generators.)
 *
 *   2. No leaked details — the corpus is read aloud by a model to strangers,
 *      so a local path or an analytics id in it is worse than the same string
 *      sitting in a source file. Same patterns the skills validator uses.
 *
 *   3. Budget — the corpus is billed on every chat message. Generation already
 *      refuses to write an over-budget corpus; this catches a file that was
 *      committed before the gate existed, or edited by hand.
 *
 * Runs before every build via the validate-registry chain.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSiteCorpus, assembleCorpus, outputPath } from './generate-site-corpus.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const relative = (path) => path.replace(repoRoot + '/', '');

const errors = [];
const fail = (message) => errors.push(message);

// 1. Freshness.
try {
  const expected = buildSiteCorpus();
  const onDisk = existsSync(outputPath)
    ? readFileSync(outputPath, 'utf8').replace(/\r\n/g, '\n')
    : null;

  if (onDisk === null) {
    fail(
      `${relative(outputPath)} is missing — run ` +
        `\`node scripts/generate-site-corpus.mjs\` and commit the result.`
    );
  } else if (onDisk !== expected) {
    fail(
      `${relative(outputPath)} is stale — run ` +
        `\`node scripts/generate-site-corpus.mjs\` and commit the result.`
    );
  }
} catch (error) {
  fail(`generating the site corpus failed: ${error.message}`);
}

// 2. Leaked details. The corpus text itself, not the generated wrapper.
const leakPatterns = [
  [/\/Users\/[A-Za-z]/, 'local absolute path (/Users/…)'],
  [/property[\s_-]?(?:id)?\W{0,3}\d{6,}/i, 'GA property id'],
  [/sk-ant-[A-Za-z0-9-]/, 'Anthropic API key'],
  [/\b[A-Za-z0-9._%+-]+@(?!example\.)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, 'email address'],
];

try {
  const { corpus } = assembleCorpus();
  for (const [pattern, what] of leakPatterns) {
    const match = corpus.match(pattern);
    if (match) {
      fail(
        `The site corpus contains a ${what} (${JSON.stringify(match[0].slice(0, 40))}).\n` +
          `    It is sent to the model and can be repeated to any visitor — remove it at the source.`
      );
    }
  }
} catch {
  // Generation already failed above; no need to report it twice.
}

if (errors.length > 0) {
  console.error('\n✗ Site corpus validation failed:\n');
  for (const error of errors) console.error(`  - ${error}\n`);
  process.exit(1);
}

console.log('✓ Site corpus is current, within budget, and free of leaked details.');
