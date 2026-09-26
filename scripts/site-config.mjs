#!/usr/bin/env node
/**
 * The site's identity, for scripts.
 *
 * website/src/config/site.ts is the source: it is what the app imports, so it
 * cannot drift from what actually ships. Node cannot import a TypeScript
 * module directly, so this reads the constants out of it rather than keeping
 * a second copy that could disagree.
 *
 * One parser, in one place. A script that needs the site URL imports it from
 * here; none of them should hold the literal.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(repoRoot, 'website', 'src', 'config', 'site.ts'), 'utf8');

const constant = (name) => {
  const m = source.match(new RegExp(`export const ${name} = "([^"]+)";`));
  if (!m) {
    throw new Error(
      `site-config: could not read ${name} from website/src/config/site.ts — ` +
        'this reader parses that exact declaration shape'
    );
  }
  return m[1];
};

export const SITE_URL = constant('SITE_URL');
export const SITE_NAME = constant('SITE_NAME');
export const DESIGN_SYSTEM_URL = constant('DESIGN_SYSTEM_URL');
