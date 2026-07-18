#!/usr/bin/env node
/**
 * Validates .claude/skills/registry.json against the filesystem and the
 * skills page.
 *
 * Every skill folder in .claude/skills (a directory holding a SKILL.md,
 * the layout Claude Code discovers) must appear in exactly one of the
 * registry's `displayed` or `unlisted` lists; `external` entries live
 * outside the repo (personal skills folder) and must NOT have a repo
 * folder. The skills page must show exactly `displayed` + `external`.
 * Runs before every build so the public skills list can never silently
 * drift from reality.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(repoRoot, '.claude', 'skills');
const skillsPagePath = join(
  repoRoot, 'website', 'src', 'app', 'skills', 'page.tsx'
);

const registry = JSON.parse(readFileSync(join(skillsDir, 'registry.json'), 'utf8'));

const files = readdirSync(skillsDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(join(skillsDir, e.name, 'SKILL.md')))
  .map((e) => e.name)
  .sort();

// Claude Code only discovers a skill if SKILL.md opens with YAML
// frontmatter containing `name` and `description`.
const badFrontmatter = files.filter((f) => {
  const src = readFileSync(join(skillsDir, f, 'SKILL.md'), 'utf8');
  const fm = src.match(/^---\n([\s\S]*?)\n---\n/);
  return !fm || !/^name:\s*\S/m.test(fm[1]) || !/^description:\s*\S/m.test(fm[1]);
});

const { displayed, external, unlisted } = registry;
const repoRegistered = [...displayed, ...unlisted].sort();
const shownOnSite = [...displayed, ...external].sort();

// Slugs the skills page actually renders
const pageSource = readFileSync(skillsPagePath, 'utf8');
const pageSlugs = [...pageSource.matchAll(/^\s*slug: "([^"]+)",$/gm)]
  .map((m) => m[1])
  .sort();

const missingFromRegistry = files.filter((f) => !repoRegistered.includes(f));
const missingFromDisk = repoRegistered.filter((r) => !files.includes(r));
const externalWithFile = external.filter((e) => files.includes(e));
const duplicates = [...displayed, ...external, ...unlisted].filter(
  (slug, i, all) => all.indexOf(slug) !== i
);
const missingFromPage = shownOnSite.filter((s) => !pageSlugs.includes(s));
const extraOnPage = pageSlugs.filter((s) => !shownOnSite.includes(s));

let failed = false;

if (badFrontmatter.length > 0) {
  failed = true;
  console.error(
    `✗ SKILL.md files missing frontmatter with "name" and "description" ` +
      `(Claude Code won't discover them):\n` +
      badFrontmatter.map((f) => `    - ${f}/SKILL.md`).join('\n')
  );
}

if (missingFromRegistry.length > 0) {
  failed = true;
  console.error(
    `✗ Skill folders missing from .claude/skills/registry.json:\n` +
      missingFromRegistry.map((f) => `    - ${f}`).join('\n') +
      `\n  Add each to "displayed" (shown on /skills) or "unlisted" (internal).`
  );
}

if (missingFromDisk.length > 0) {
  failed = true;
  console.error(
    `✗ Registry entries with no <name>/SKILL.md in .claude/skills:\n` +
      missingFromDisk.map((r) => `    - ${r}`).join('\n')
  );
}

if (externalWithFile.length > 0) {
  failed = true;
  console.error(
    `✗ "external" entries that DO have a repo skill folder (move to "displayed"): ` +
      externalWithFile.join(', ')
  );
}

if (duplicates.length > 0) {
  failed = true;
  console.error(`✗ Listed in more than one registry list: ${duplicates.join(', ')}`);
}

if (missingFromPage.length > 0 || extraOnPage.length > 0) {
  failed = true;
  if (missingFromPage.length > 0) {
    console.error(
      `✗ Registered skills missing from website/src/app/skills/page.tsx:\n` +
        missingFromPage.map((s) => `    - ${s}`).join('\n')
    );
  }
  if (extraOnPage.length > 0) {
    console.error(
      `✗ Skills on the page but not in the registry:\n` +
        extraOnPage.map((s) => `    - ${s}`).join('\n')
    );
  }
}

if (failed) {
  process.exit(1);
}

console.log(
  `✓ Skills registry in sync — ${shownOnSite.length} skills on /skills ` +
    `(${displayed.length} repo, ${external.length} external), ` +
    `${unlisted.length} unlisted.`
);
