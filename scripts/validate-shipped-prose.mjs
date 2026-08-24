#!/usr/bin/env node
/**
 * Enforces the one content rule that is mechanically checkable: no em dashes
 * in shipped prose.
 *
 * `content-design.md` bans the character outright in shipped copy, and the
 * `content-audit` skill lists it under Banned. Both are read by a person or an
 * agent who has to remember to look. This makes the rule a build failure
 * instead, on the repo's standing convention: anything countable or checkable
 * gets build-enforced so it can never drift again.
 *
 * WHAT COUNTS AS SHIPPED PROSE HERE
 *
 * Page prose comes from `extractProse` in generate-site-corpus.mjs — the same
 * AST walk that decides what reaches the chat corpus. Sharing it is the point:
 * two readers of "what counts as page prose" would drift, one cannot. It sees
 * JSX text and prose string literals, and never comments, className strings,
 * or import specifiers, so a dash in a code comment is not a violation.
 *
 * Everything else is a plain string scan of fields that are unambiguously
 * shipped copy: the README (it ships inside the npm tarball), the Storybook
 * landing page, and the data registries whose fields render on the site.
 *
 * Two non-page modules are in scope by name: the playground's scripted chat
 * story ships visitor-visible prose from `website/src/lib/chat-sim.ts` (the
 * story and scenario responses and their chips) and
 * `website/src/app/playground/ChatDirector.tsx` (the event-rail copy).
 * Their string literals and JSX text are scanned through the AST, so
 * comments — where an em dash is a structural separator, not voice — are
 * never seen. `STORY_MODULES` below is the list.
 *
 * WHAT IS DELIBERATELY OUT, AND WHY
 *
 *   - Agent-facing markdown — CLAUDE.md, design.md, content-design.md,
 *     SECURITY.md, and skill instruction bodies. The guide's own Overview
 *     exempts them: em dashes are structural separators there, not voice.
 *     Skill `displayDescription` frontmatter is NOT exempt, because it
 *     renders on /skills.
 *   - Essays (`website/src/data/essays.json`) — Rob's Substack pieces, synced
 *     rather than authored here. Restyling already-published writing is not
 *     this rule's job.
 *   - noindex pages — derived from the page's own `robots: { index: false }`,
 *     so a page joining or leaving the set moves itself in and out of scope
 *     with no list to maintain here. Today that is `/covers`, `/covers/render`
 *     and `/rr-animated` (internal surfaces a visitor never reaches) plus
 *     `/canvas`, which IS nav-linked but stays noindex while it is alpha —
 *     its board hint and control labels ride outside this gate until the
 *     page graduates to indexed, at which point the derivation pulls it in
 *     by itself.
 *   - Non-page `.ts` modules other than `STORY_MODULES` — their string
 *     literals are server logs and internal messages, not copy. The chat's
 *     persona and greeting strings are genuinely shipped prose but live among
 *     those; the em-dash check aside, everything needing judgement (register,
 *     voice, banned words) stays the `content-audit` skill's `chat` scope.
 *
 * Part of the validate-registry chain.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { extractProse } from './generate-site-corpus.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const rel = (p) => relative(repoRoot, p).split('\\').join('/');

/** The banned character, and the guide's suggested repairs. */
const EM_DASH = '—';
const REPAIR =
  'replace it with a colon (and here is the point), a comma or parentheses ' +
  '(an aside), or a full stop and a second sentence';

const findings = [];

/**
 * A value that is *only* an em dash is a glyph, not a spliced sentence: it
 * stands for "nothing here", the way the disabled Input on the Field page
 * uses it. The guide bans em dash *splicing*, and every repair it offers
 * (a colon, a comma, two sentences) presupposes a sentence to repair. There
 * is nothing to rewrite here, so it is not a violation.
 */
const isGlyphOnly = (text) => /^[\s—-]*$/.test(text);

/** Report every occurrence with enough of the line to find it by eye. */
function scan(label, text, note) {
  if (!text || !text.includes(EM_DASH) || isGlyphOnly(text)) return;
  for (const line of text.split('\n')) {
    if (!line.includes(EM_DASH)) continue;
    const trimmed = line.trim();
    findings.push(
      `${label} — ${trimmed.length > 110 ? `${trimmed.slice(0, 110)}…` : trimmed}` +
        (note ? ` (${note})` : '')
    );
  }
}

// --- Page prose -------------------------------------------------------------

const appDir = join(repoRoot, 'website', 'src', 'app');
const pageFiles = [];
{
  const stack = [appDir];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.name === 'page.tsx') pageFiles.push(full);
    }
  }
}

/**
 * A route is out of scope when it, or a layout above it, declares noindex.
 * That attribute is how `new-page` says "deliberately hidden", so the
 * exclusion tracks the decision rather than restating it.
 */
const noIndex = (pagePath) => {
  let dir = dirname(pagePath);
  while (dir.startsWith(appDir)) {
    for (const name of ['page.tsx', 'layout.tsx']) {
      try {
        if (/index:\s*false/.test(read(join(dir, name)))) return true;
      } catch { /* no such file at this level */ }
    }
    dir = dirname(dir);
  }
  return false;
};

/**
 * Prose that rides in a JSX attribute, which `extractProse` cannot see.
 *
 * It skips every attribute deliberately: for the corpus, attributes are
 * className, src and width. But a handful carry copy a visitor reads, and a
 * stage caption is prose by any measure. Rather than diverge from the shared
 * extractor, this names the attributes that hold words and checks those.
 */
const PROSE_ATTRIBUTES = new Set([
  'caption', 'label', 'title', 'alt', 'placeholder', 'dek',
  'helperText', 'description', 'pendingLabel', 'emptyMessage',
]);

function scanProseAttributes(label, source, fileName) {
  const sourceFile = ts.createSourceFile(
    fileName, source, ts.ScriptTarget.Latest, /* setParentNodes */ true, ts.ScriptKind.TSX
  );
  const visit = (node) => {
    if (
      ts.isJsxAttribute(node) &&
      ts.isIdentifier(node.name) &&
      PROSE_ATTRIBUTES.has(node.name.text) &&
      node.initializer &&
      ts.isStringLiteral(node.initializer)
    ) {
      scan(label, node.initializer.text, `${node.name.text} attribute`);
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(sourceFile, visit);
}

let pagesChecked = 0;
for (const file of pageFiles.sort()) {
  if (noIndex(file)) continue;
  pagesChecked += 1;
  const source = read(file);
  scan(rel(file), extractProse(source, rel(file)));
  scanProseAttributes(rel(file), source, rel(file));
}

// --- Markdown that ships ----------------------------------------------------

let surfacesChecked = 0;
for (const doc of ['README.md', 'src/stories/Configure.mdx']) {
  surfacesChecked += 1;
  scan(doc, read(join(repoRoot, doc)));
}

// --- Data registries whose fields render on the site ------------------------

const json = (p) => JSON.parse(read(join(repoRoot, p)));

const registry = json('src/components/registry.json');
surfacesChecked += 1;
for (const c of registry.components) {
  scan(`src/components/registry.json (${c.name})`, c.description);
}

const updates = json('website/src/data/site-updates.json');
surfacesChecked += 1;
for (const e of updates.entries ?? []) {
  scan(`website/src/data/site-updates.json (${e.title ?? '?'})`, `${e.title ?? ''}\n${e.body ?? e.story ?? ''}`);
}

const studies = json('website/src/data/case-studies.json');
surfacesChecked += 1;
for (const s of studies.caseStudies ?? studies) {
  scan(`website/src/data/case-studies.json (${s.title ?? '?'})`, `${s.title ?? ''}\n${s.dek ?? ''}`);
}

const covers = json('website/src/data/cover-renders.json');
surfacesChecked += 1;
for (const [slug, entry] of Object.entries(covers.studies ?? covers)) {
  scan(`website/src/data/cover-renders.json (${slug})`, entry?.alt);
}

const essayCovers = json('website/src/data/essay-covers.json');
surfacesChecked += 1;
for (const [slug, entry] of Object.entries(essayCovers.covers ?? essayCovers)) {
  scan(`website/src/data/essay-covers.json (${slug})`, entry?.alt);
}

// --- Skill display descriptions (they render on /skills) --------------------

const skillsDir = join(repoRoot, '.claude', 'skills');
surfacesChecked += 1;
for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  let source;
  try {
    source = read(join(skillsDir, entry.name, 'SKILL.md'));
  } catch { continue; }
  const match = source.match(/^displayDescription:\s*(.*)$/m);
  if (match) scan(`.claude/skills/${entry.name}/SKILL.md (displayDescription)`, match[1]);
}

// --- The npm package description (renders on npmjs.com) ---------------------

surfacesChecked += 1;
const manifest = read(join(repoRoot, 'scripts', 'package-manifest.mjs'));
const desc = manifest.match(/PACKAGE_DESCRIPTION\s*=\s*(['"`])([\s\S]*?)\1/);
if (desc) scan('scripts/package-manifest.mjs (PACKAGE_DESCRIPTION)', desc[2]);

// --- The playground's scripted chat story ------------------------------------

/**
 * Non-page modules whose string literals are visitor-visible prose: the sim's
 * scripted story and scenario copy, and the director's event rail. Scanned
 * through the AST so comments never register — only what a visitor can read.
 */
const STORY_MODULES = [
  'website/src/lib/chat-sim.ts',
  'website/src/app/playground/ChatDirector.tsx',
];

function scanStringLiterals(relPath) {
  const sourceFile = ts.createSourceFile(
    relPath,
    read(join(repoRoot, relPath)),
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    relPath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  const visit = (node) => {
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddleOrTemplateTail(node) ||
      ts.isJsxText(node)
    ) {
      scan(relPath, node.text, 'string literal');
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(sourceFile, visit);
}

for (const mod of STORY_MODULES) {
  surfacesChecked += 1;
  scanStringLiterals(mod);
}

// --- Report -----------------------------------------------------------------

if (findings.length > 0) {
  console.error(
    `✗ Em dashes in shipped prose (${findings.length}) — content-design.md bans ` +
      `the character in shipped copy; ${REPAIR}:\n` +
      findings.map((f) => `    - ${f}`).join('\n')
  );
  process.exit(1);
}

console.log(
  `✓ Shipped prose clean — no em dashes across ${pagesChecked} published page(s) ` +
    `and ${surfacesChecked} other shipped surface(s).`
);
