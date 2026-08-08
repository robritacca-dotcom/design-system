#!/usr/bin/env node
/**
 * generate-site-corpus.mjs
 *
 * Builds website/src/data/site-corpus.generated.ts — one markdown document
 * describing the whole public site, which /api/chat sends to the model as a
 * cached system block. The chat widget answers from this and nothing else.
 *
 * Two properties this file must keep, or the build breaks:
 *
 *   1. Deterministic. No network, no timestamps, no directory-order
 *      dependence. validate-site-corpus.mjs regenerates in memory and
 *      byte-compares against disk, and CI runs a drift guard after the
 *      generators, so any nondeterminism fails the build.
 *
 *   2. Public-only. Every source here is already published on the site or in
 *      the repo. Nothing private is in the model's context, so a successful
 *      prompt injection yields off-brand prose, never a leak. Keep it that
 *      way: do not add a source that isn't already public.
 *
 * Section order is stable → volatile so an edit to a late section leaves the
 * earlier text byte-identical. There is one cache breakpoint today (the whole
 * corpus), but the ordering keeps a second breakpoint available later.
 *
 * Runs via the validate-registry chain and the website's predev/prebuild —
 * never edit the generated file by hand.
 *
 * Flags: --dump prints the corpus to stdout instead of writing it.
 *        --sizes prints a per-section byte/token breakdown.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const websiteApp = join(repoRoot, 'website', 'src', 'app');

export const outputPath = join(
  repoRoot, 'website', 'src', 'data', 'site-corpus.generated.ts'
);

/**
 * Characters per token, measured rather than guessed: a real Sonnet 5 request
 * carrying this corpus reported 87,898 cached input tokens against ~252,000
 * characters of persona plus corpus, which is 2.87. Rounded down so the
 * estimate errs high and the gate trips early.
 *
 * Used only for the budget gate and the --sizes report; billing never depends
 * on it. Re-measure with `usage.cache_read_input_tokens` if the corpus shape
 * changes a lot.
 */
const CHARS_PER_TOKEN = 2.85;

/**
 * Generation fails above this, so the corpus can't quietly grow unbounded.
 *
 * Sized against cost, not aesthetics: the corpus is cached, so a warm message
 * reads it at roughly 2.6 cents and only a cold cache write costs real money
 * (about 33 cents, once per five-minute window). 95K leaves headroom for the
 * site to grow without a rewrite, while still catching a change that doubles
 * the corpus by accident.
 */
const TOKEN_BUDGET = 95_000;

/** Normalize CRLF so Windows checkouts generate byte-identical output to CI. */
const read = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

/* ============================================================
   Prose extraction from page components

   The pages are TSX, and their prose lives in two places: JSX text, and
   string literals inside data arrays (the about page's timeline bullets, the
   case-study detail fields). This walks the TypeScript AST rather than
   pattern-matching the source: a regex over these files reliably swallows
   whole runs of markup, because the pages nest components, template-literal
   class names, and inline expressions several levels deep.

   Text is gathered per block-level element, so a sentence containing an
   inline <Link> or <strong> stays one sentence instead of fragmenting.

   Run with --dump after touching a page to eyeball the result.
   ============================================================ */

/** Elements whose text is one prose line. Inline tags are folded into these. */
const BLOCK_TAGS = new Set([
  'p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'blockquote', 'figcaption', 'dt', 'dd', 'td', 'th', 'caption', 'summary',
]);

const ENTITIES = {
  '&apos;': "'", '&rsquo;': '’', '&lsquo;': '‘', '&quot;': '"',
  '&ldquo;': '“', '&rdquo;': '”', '&amp;': '&', '&nbsp;': ' ',
  '&mdash;': '—', '&ndash;': '–', '&hellip;': '…', '&times;': '×',
  '&lt;': '<', '&gt;': '>',
};

const decode = (text) =>
  text.replace(/&[a-z]+;/gi, (entity) => ENTITIES[entity] ?? entity);

/** True for fragments that read as sentences rather than code. */
function isProse(text) {
  if (text.length < 25) return false;
  if (text.split(/\s+/).length < 4) return false;
  if (/^[/.#@]/.test(text)) return false;          // paths, selectors, imports
  if (/^https?:/.test(text)) return false;
  if (/^[\w-]+$/.test(text)) return false;         // bare identifiers
  if (/^[\d\s.,:%-]+$/.test(text)) return false;   // numeric noise
  return /[a-z]{3}/.test(text);                    // needs real words
}

const jsxTagName = (node) => {
  const opening = ts.isJsxElement(node) ? node.openingElement : node;
  return opening.tagName ? opening.tagName.getText() : '';
};

const isBlockTag = (node) =>
  (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) &&
  BLOCK_TAGS.has(jsxTagName(node));

/** True when nothing below this node is its own block, so its text is one line. */
function hasBlockDescendant(node) {
  let found = false;
  const walk = (current) => {
    if (found) return;
    current.forEachChild((child) => {
      if (found) return;
      if (isBlockTag(child)) found = true;
      else walk(child);
    });
  };
  walk(node);
  return found;
}

/**
 * Block elements, plus leaf JSX fragments. Bullet items are often written as
 * `<>text <Link>label</Link> more text</>` inside a data array; without the
 * fragment case those split into three lines mid-sentence. Fragments with
 * block descendants are skipped so a page-level wrapper can't swallow the lot.
 */
const isBlockElement = (node) =>
  isBlockTag(node) || (ts.isJsxFragment(node) && !hasBlockDescendant(node));

/** True when a string literal is structural rather than prose. */
function isStructuralString(node) {
  const parent = node.parent;
  if (!parent) return true;
  if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) return true;
  if (ts.isJsxAttribute(parent)) return true;       // className, src, width…
  if (ts.isJsxAttribute(parent?.parent)) return true;
  return false;
}

function extractProse(source, fileName) {
  const sourceFile = ts.createSourceFile(
    fileName, source, ts.ScriptTarget.Latest, /* setParentNodes */ true, ts.ScriptKind.TSX
  );

  const seen = new Set();
  const consumed = new Set();
  const lines = [];

  const push = (raw) => {
    const text = decode(raw).replace(/\s+/g, ' ').trim();
    if (!isProse(text) || seen.has(text)) return;
    seen.add(text);
    lines.push(text);
  };

  /** All text directly under a block element, skipping nested block elements. */
  const inlineText = (node, parts) => {
    node.forEachChild((child) => {
      if (ts.isJsxText(child)) {
        consumed.add(child);
        parts.push(decode(child.text));
      } else if (isBlockElement(child)) {
        // Emitted on its own line when the walk reaches it.
      } else {
        inlineText(child, parts);
      }
    });
    return parts;
  };

  const visit = (node) => {
    if (isBlockElement(node)) {
      // Joined without a separator: JSX text nodes carry their own spacing, so
      // adding one puts a space before the punctuation after an inline <strong>.
      push(inlineText(node, []).join(''));
    } else if (ts.isJsxText(node) && !consumed.has(node)) {
      push(node.text);
    } else if (
      (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
      !isStructuralString(node)
    ) {
      push(node.text);
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return lines.join('\n');
}

const pageProse = (...segments) => {
  const path = join(websiteApp, ...segments, 'page.tsx');
  return extractProse(read(path), path);
};

/* ============================================================
   Navigation

   navigation.ts is TypeScript importing from the package workspace, so this
   Node script reads it as text rather than importing it. The link arrays are
   flat object literals, which is what makes that safe.
   ============================================================ */

function navLinks(source, exportName) {
  const start = source.indexOf(`export const ${exportName}`);
  if (start === -1) throw new Error(`navigation.ts: no export named ${exportName}`);
  const end = source.indexOf('\n];', start);
  if (end === -1) throw new Error(`navigation.ts: ${exportName} is not a flat array literal`);
  const body = source.slice(start, end);

  const links = [];
  for (const match of body.matchAll(/\{[^{}]*\}/g)) {
    const entry = match[0];
    const field = (key) => {
      const m = entry.match(new RegExp(`${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
      return m ? m[1] : null;
    };
    const href = field('href');
    const label = field('label');
    if (!href || !label || label === 'Contents') continue;
    links.push({ href, label, description: field('description') });
  }
  if (links.length === 0) throw new Error(`navigation.ts: ${exportName} yielded no links`);
  return links;
}

const linkLines = (links) =>
  links
    .map((l) => `- ${l.label} (${l.href})${l.description ? `: ${l.description}` : ''}`)
    .join('\n');

/* ============================================================
   design.md

   The full spec is ~110KB, and its "## Components" section is ~73KB of
   token-level detail that a visitor conversation never needs at that depth.
   Condense it to each component's opening paragraph and keep every other
   section whole: the design language, theme contract, and known gaps are
   what people actually ask about.
   ============================================================ */

function condenseDesignSpec(source) {
  const componentsStart = source.indexOf('\n## Components\n');
  if (componentsStart === -1) {
    throw new Error('design.md: no "## Components" section — the trim needs updating');
  }
  const after = source.indexOf('\n## ', componentsStart + 1);
  if (after === -1) {
    throw new Error('design.md: "## Components" is the final section — the trim needs updating');
  }

  const components = source
    .slice(componentsStart, after)
    .split(/\n### /)
    .slice(1)
    .map((block) => {
      const [heading, ...rest] = block.split('\n');
      // First non-empty paragraph: the "**`ds-x`** — what it is" line.
      const summary = rest.join('\n').split(/\n\s*\n/).map((p) => p.trim()).find(Boolean);
      return summary ? `### ${heading.trim()}\n\n${summary}` : `### ${heading.trim()}`;
    })
    .join('\n\n');

  return [
    source.slice(0, componentsStart),
    '\n## Components\n',
    '\nOne paragraph per component. Full token-level specs (variant tables, ',
    'state rules, measurements) live in the design.md download at /blueprints/design ',
    'and in Storybook.\n\n',
    components,
    '\n',
    source.slice(after),
  ].join('');
}

/* ============================================================
   Sections
   ============================================================ */

function sectionSiteMap() {
  const nav = read(join(repoRoot, 'website', 'src', 'config', 'navigation.ts'));
  return `## Site map

Every page on robertritacca.com. Link to these paths when pointing someone at more detail.

### Main pages

- Home (/): the landing page
- About (/about): background, principles, and career history
- Work (/work): case study index
- Writing (/writing): essays on design and AI, mirrored from Substack
- Contact (/contact): ways to get in touch
- Design system (/design-system): the whole system on one page with live demos
- Playground (/playground): re-theme the design system live and copy the CSS

### Case studies

${linkLines(navLinks(nav, 'workSidebarLinks'))}

### Design system docs

${linkLines(navLinks(nav, 'docsSidebarLinks'))}

### Foundations

${linkLines(navLinks(nav, 'foundationsSidebarLinks'))}

### Component documentation

${linkLines(navLinks(nav, 'componentsSidebarLinks'))}

### Elsewhere

- Storybook: https://design-system-iota-one.vercel.app (rendered API reference with props tables)
- npm: https://www.npmjs.com/package/@robr0/design-system (\`npm install @robr0/design-system\`)
- GitHub: https://github.com/robritacca-dotcom/design-system (full source)`;
}

function sectionAbout() {
  return `## About Rob, and how to reach him

Prose extracted from /about and /contact.

### /about

${pageProse('about')}

### /contact

${pageProse('contact')}`;
}

function sectionCaseStudies() {
  const { caseStudies: studies } = JSON.parse(
    read(join(repoRoot, 'website', 'src', 'data', 'case-studies.json'))
  );
  const summaries = studies
    .map((s) => `- ${s.title} (${s.href}), ${s.companyName}: ${s.dek}`)
    .join('\n');

  const full = studies
    .map((s) => {
      const slug = s.href.replace('/work/', '');
      return `### ${s.title} (${s.href})\n\n${pageProse('work', slug)}`;
    })
    .join('\n\n');

  return `## Case studies

Newest first.

${summaries}

${full}`;
}

function sectionBlueprints() {
  const claude = read(join(repoRoot, 'CLAUDE.md'));
  const design = condenseDesignSpec(read(join(repoRoot, 'design.md')));
  const content = read(join(repoRoot, 'content-design.md'));

  return `## Blueprints: the specs this project is built from

These three published specifications are how the site and design system get built. They are downloadable at /blueprints.

### CLAUDE.md: how the repository is maintained

${claude}

### design.md: the design specification

${design}

### content-design.md: the writing rules

${content}`;
}

function sectionComponents() {
  const registry = JSON.parse(read(join(repoRoot, 'src', 'components', 'registry.json')));
  const byCategory = new Map();
  for (const c of registry.components) {
    if (!byCategory.has(c.category)) byCategory.set(c.category, []);
    byCategory.get(c.category).push(c);
  }

  const groups = [...byCategory.entries()]
    .map(([category, items]) => {
      const lines = items
        .map((c) => `- ${c.label} (/components/${c.slug}): ${c.description}`)
        .join('\n');
      return `### ${category}\n\n${lines}`;
    })
    .join('\n\n');

  return `## Component library

${registry.components.length} components published as @robr0/design-system, grouped by category. Each has documentation at the path shown.

${groups}`;
}

function sectionSkills() {
  const skillsDir = join(repoRoot, '.claude', 'skills');
  const registry = JSON.parse(read(join(skillsDir, 'registry.json')));

  const entries = registry.displayed.map((slug) => {
    const source = read(join(skillsDir, slug, 'SKILL.md'));
    const fm = source.match(/^---\n([\s\S]*?)\n---\n/);
    const line = (key) => {
      const m = fm ? fm[1].match(new RegExp(`^${key}:[ \\t]*(.+)$`, 'm')) : null;
      return m ? m[1].trim() : null;
    };
    let description = line('displayDescription') ?? line('description') ?? '';
    try {
      description = JSON.parse(description);
    } catch {
      /* already a bare string */
    }
    return `- ${line('name') ?? slug}: ${description}`;
  });

  return `## Agent skills

Repeatable procedures the agents follow when working on this project. Documented at /skills.

${entries.join('\n')}`;
}

function sectionJournal() {
  const data = JSON.parse(read(join(repoRoot, 'website', 'src', 'data', 'site-updates.json')));
  const entries = data.entries
    .map((e) => `### ${e.title} (${e.meta})\n\n${e.body.join('\n\n')}`)
    .join('\n\n');

  return `## Project journal

How this site and design system got built, newest first. Published at /project-journal.

${entries}`;
}

function sectionWriting() {
  return `## Writing

Rob publishes essays on design and AI. They are mirrored from Substack onto /writing, which is the current list. The essays themselves are not included here, so point people at /writing rather than describing or summarising individual pieces.`;
}

/* ============================================================
   Assembly
   ============================================================ */

const SECTIONS = [
  ['Site map', sectionSiteMap],
  ['About', sectionAbout],
  ['Case studies', sectionCaseStudies],
  ['Blueprints', sectionBlueprints],
  ['Components', sectionComponents],
  ['Skills', sectionSkills],
  ['Journal', sectionJournal],
  ['Writing', sectionWriting],
];

const PREAMBLE = `# robertritacca.com: full site content

Everything below is published on robertritacca.com or in its public repository. It is the complete set of facts available for answering questions about Rob Ritacca, his work, and the robr0 design system.
`;

/** The corpus text itself, ungated so --dump still works when over budget. */
export function assembleCorpus() {
  const parts = SECTIONS.map(([, build]) => build());
  return { corpus: [PREAMBLE, ...parts].join('\n\n---\n\n') + '\n', parts };
}

export function buildSiteCorpus() {
  const { corpus, parts } = assembleCorpus();

  const approxTokens = Math.round(corpus.length / CHARS_PER_TOKEN);
  if (approxTokens > TOKEN_BUDGET) {
    const breakdown = SECTIONS.map(
      ([name], i) => `    ${name}: ${Math.round(parts[i].length / CHARS_PER_TOKEN)} tokens`
    ).join('\n');
    throw new Error(
      `Site corpus is ~${approxTokens} tokens, over the ${TOKEN_BUDGET} budget.\n` +
        `Trim a section before the cost of every chat message goes up.\n${breakdown}`
    );
  }

  return `// AUTO-GENERATED — do not edit by hand.
// Source of truth: the published site (navigation, page prose, data registries)
// and the root specs CLAUDE.md, design.md, content-design.md.
// Regenerate: node scripts/generate-site-corpus.mjs (runs via predev/prebuild).

/** Every public fact about the site, sent to the model as a cached system block. */
export const siteCorpus: string = ${JSON.stringify(corpus)};

/** Rough token count, for logging and the build-time budget gate only. */
export const siteCorpusApproxTokens = ${approxTokens};
`;
}

/** Per-section byte and token breakdown, for tuning what to trim. */
export function corpusSizes() {
  return SECTIONS.map(([name, build]) => {
    const text = build();
    return { name, chars: text.length, tokens: Math.round(text.length / CHARS_PER_TOKEN) };
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);

  if (args.includes('--sizes')) {
    const rows = corpusSizes();
    for (const { name, chars, tokens } of rows) {
      console.log(`${name.padEnd(16)} ${String(chars).padStart(8)} chars  ~${tokens} tokens`);
    }
    const total = rows.reduce((sum, r) => sum + r.tokens, 0);
    console.log(`${'TOTAL'.padEnd(16)} ${''.padStart(8)}        ~${total} tokens (budget ${TOKEN_BUDGET})`);
  } else if (args.includes('--dump')) {
    // Ungated on purpose: --dump is how you diagnose an over-budget corpus.
    console.log(assembleCorpus().corpus);
  } else {
    writeFileSync(outputPath, buildSiteCorpus());
    console.log(`✓ Generated ${outputPath.replace(repoRoot + '/', '')}`);
  }
}
