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
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { siteRoutes, isDynamicSegment } from './site-routes.mjs';
import { SITE_URL } from './site-config.mjs';

/** The bare host, for the prose that names the site. */
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');

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
 * reads it at roughly 2.7 cents and only a cold cache write costs real money
 * (about 35 cents, once per five-minute window). The ceiling leaves headroom
 * for the site to grow without a rewrite, while still catching a change that
 * doubles the corpus by accident.
 *
 * Raised from 95K on 2026-08-12, when publishing an essay took the corpus 188
 * tokens over. Raised again to 105K on 2026-08-14, when shipping ShaderField
 * took it 265 over — a new component, its page and its spec are exactly the
 * growth this corpus exists to carry. That raise was sized deliberately larger
 * than the overage: 100K had drifted to under 550 tokens of headroom, so every
 * clearance had become one paragraph, and a guard that fails on ordinary
 * writing gets read as noise rather than as a signal.
 *
 * Raising it is the right move for growth the corpus exists to carry — a new
 * essay, a case study, a component. It is the wrong move for a section that
 * suddenly doubled: trim that instead, and read the `--sizes` report before
 * deciding which of the two this is.
 *
 * Raised to 130K on 2026-08-25, when the walk started reading prose out of the
 * attributes in PROSE_ATTRIBUTES. That added about 5,500 tokens, effectively
 * all of it the case studies' figure captions and Alert callouts — words that
 * were on those pages all along and simply never reached the model. Sized well
 * past the overage on purpose: the budget had drifted to under 2,800 tokens of
 * headroom, which is one case study away from failing on ordinary writing.
 *
 * Raised to 140K on 2026-09-12, when the contact page's consulting blurb
 * (published so the chat can answer consulting questions) landed against
 * roughly 500 tokens of remaining headroom. No section doubled — the
 * case-study TLDRs shipped the same day deliberately stay out of the corpus
 * (their data module's doc block owns why) — so this is the ordinary-growth
 * case, sized well past the ceiling for the same headroom reason as every
 * raise above.
 */
const TOKEN_BUDGET = 140_000;

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
  '&lt;': '<', '&gt;': '>', '&rarr;': '→', '&larr;': '←', '&harr;': '↔',
};

const decode = (text) =>
  text.replace(/&[a-z]+;/gi, (entity) => ENTITIES[entity] ?? entity);

/** True for fragments that read as sentences rather than code. */
export function isProse(text) {
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

/**
 * JSX attributes that hold copy a visitor reads, rather than markup plumbing.
 *
 * Most attributes are className, src and width, so the walk below skips them
 * wholesale. These are the exceptions: a figure caption, an Alert's title and
 * body, an image's alt text. On the case-study pages that is not decoration —
 * the captions carry the argument a diagram is making, and an Alert is how a
 * page states the context a reader needs (that a 2021 project predates
 * practical LLMs, say). Left out, the chat answers those questions blind.
 *
 * Exported so validate-shipped-prose.mjs holds the same set; two lists of
 * "which attributes hold words" would drift.
 */
export const PROSE_ATTRIBUTES = new Set([
  'caption', 'label', 'title', 'alt', 'placeholder', 'dek',
  'helperText', 'description', 'pendingLabel', 'emptyMessage',
  'sub', 'subtitle', 'delta', 'value', 'body', 'content',
  'tagline', 'detail', 'meta', 'aria-label',
]);

/**
 * Deliberately absent, and worth naming so nobody adds them: `allow` (iframe
 * permission lists), `sizes` (image hints), `gradientTransform` (SVG matrices).
 * Each holds a long string that reads as words to a sentence filter and as
 * noise to a reader. The rule for admitting an attribute here is whether a
 * visitor sees its text on the page.
 */

/** True when a string literal is structural rather than prose. */
function isStructuralString(node) {
  const parent = node.parent;
  if (!parent) return true;
  if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) return true;
  const attribute = ts.isJsxAttribute(parent) ? parent
    : ts.isJsxAttribute(parent?.parent) ? parent.parent
    : null;
  if (attribute) {
    return !(
      ts.isIdentifier(attribute.name) && PROSE_ATTRIBUTES.has(attribute.name.text)
    );
  }
  return false;
}

/* Exported so validate-shipped-prose.mjs checks exactly the text this
   extracts. Two readers of "what counts as page prose" would drift; one
   cannot. */
export function extractProse(source, fileName) {
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

/**
 * Next's own file conventions. Their text is metadata, chrome or an error
 * state, never page prose, so the co-located sweep below skips them.
 */
const NEXT_SPECIAL_FILES = new Set([
  'layout', 'template', 'loading', 'error', 'global-error', 'not-found',
  'default', 'icon', 'apple-icon', 'opengraph-image', 'twitter-image',
]);

/**
 * The .tsx files a route folder owns besides page.tsx, sorted for determinism.
 *
 * A page that outgrows one file splits into co-located components — the
 * playground's section files are the worked example, and a long case study is
 * the obvious next one. Reading page.tsx alone made that refactor silently
 * delete the page from the chat's knowledge while every validator stayed
 * green: the route is still on disk, still "covered", and now says nothing.
 *
 * Only folders that are not themselves routes are followed, so one page can
 * never swallow another's prose, and the root route is skipped outright
 * because its folder is the whole app directory.
 */
function coLocatedFiles(dir, isRoot) {
  if (isRoot) return [];
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  )) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // A folder holding a page.tsx is another route; it speaks for itself.
      if (existsSync(join(full, 'page.tsx'))) continue;
      files.push(...coLocatedFiles(full, false));
    } else if (
      entry.name.endsWith('.tsx') &&
      entry.name !== 'page.tsx' &&
      !NEXT_SPECIAL_FILES.has(entry.name.replace(/\.tsx$/, ''))
    ) {
      files.push(full);
    }
  }
  return files;
}

const pageProse = (...segments) => {
  const dir = join(websiteApp, ...segments);
  const sources = [join(dir, 'page.tsx'), ...coLocatedFiles(dir, segments.length === 0)];
  return sources
    .map((path) => extractProse(read(path), path))
    .filter(Boolean)
    .join('\n');
};

/* ============================================================
   Published facts — the corpus-facts directive

   isProse() deliberately drops short data strings, which is exactly what
   loses an email address or a job title stored in a data array. A page opts
   its data in *in place*, with a comment above a module-scope declaration:

     /* corpus-facts(Ways to reach Rob): published on /contact *​/
     const connectMethods: ContactMethod[] = [ … ];

   The initializer is serialised as a labelled fact block. The label becomes
   the heading; the reason is for the repo reader. Same convention as the CSS
   ds-allow() directive: the sanction lives next to the thing it sanctions.

   These blocks are also the leak-screen allowlist: validate-site-corpus.mjs
   permits a contact-shaped detail (an email address) in the corpus only when
   it arrived through a corpus-facts block — i.e. only when a page deliberately
   published it. A malformed directive fails generation outright.
   ============================================================ */

const FACTS_DIRECTIVE = /corpus-facts\(([^)]*)\)/;

/** Property names that never carry visitor-facing facts. */
const DROP_PROPS = new Set(['icon', 'logo', 'image', 'avatar', 'cover']);

/** Asset references (`/logos/x.svg`) are chrome, not facts. */
const isAssetPath = (text) => /^\/[\w./-]+\.[a-z0-9]{2,4}$/i.test(text);

/** All human-readable text inside a JSX value, flattened to one line. */
function jsxToText(node) {
  const parts = [];
  const walk = (current) => {
    if (ts.isJsxText(current)) {
      parts.push(decode(current.text));
      return;
    }
    if (ts.isJsxAttributes(current) || ts.isJsxAttribute(current)) return;
    if (ts.isStringLiteral(current) && ts.isJsxExpression(current.parent)) {
      parts.push(decode(current.text));
      return;
    }
    current.forEachChild(walk);
  };
  walk(node);
  return parts.join('').replace(/\s+/g, ' ').trim();
}

/**
 * Serialise an opted-in initializer to fact lines. Property names become
 * labels; a `{label, value}` pair collapses to `Label: value`; arrays of
 * strings become bullets; booleans stay (`present: true` is how the timeline
 * marks a current role); asset paths and DROP_PROPS are chrome and dropped.
 * Every emitted value string is collected for the leak-screen allowlist.
 */
function factsLines(node, values) {
  const text = (n) => {
    const t = decode(n.text).replace(/\s+/g, ' ').trim();
    values.add(t);
    return t;
  };

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return [text(node)];
  }
  if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node)) {
    const t = jsxToText(node);
    if (t) values.add(t);
    return t ? [t] : [];
  }
  if (ts.isArrayLiteralExpression(node)) {
    const lines = [];
    for (const element of node.elements) {
      if (ts.isObjectLiteralExpression(element) || ts.isArrayLiteralExpression(element)) {
        if (lines.length > 0) lines.push('');
        lines.push(...factsLines(element, values));
      } else {
        const inner = factsLines(element, values);
        lines.push(...inner.map((line) => `- ${line}`));
      }
    }
    return lines;
  }
  if (ts.isObjectLiteralExpression(node)) {
    const props = node.properties.filter((p) => ts.isPropertyAssignment(p));
    const named = new Map(
      props.map((p) => [p.name && ts.isIdentifier(p.name) ? p.name.text : p.name?.getText(), p])
    );
    const lines = [];
    const emitted = new Set();

    // `{label, value}` is the common published-channel shape — collapse it.
    const labelProp = named.get('label');
    const valueProp = named.get('value');
    if (
      labelProp && valueProp &&
      ts.isStringLiteral(labelProp.initializer) && ts.isStringLiteral(valueProp.initializer)
    ) {
      lines.push(`${text(labelProp.initializer)}: ${text(valueProp.initializer)}`);
      emitted.add('label');
      emitted.add('value');
    }

    for (const prop of props) {
      const name = prop.name && ts.isIdentifier(prop.name) ? prop.name.text : prop.name?.getText();
      if (!name || emitted.has(name) || DROP_PROPS.has(name)) continue;
      const value = prop.initializer;
      if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) {
        const t = decode(value.text).replace(/\s+/g, ' ').trim();
        if (isAssetPath(t)) continue;
        values.add(t);
        lines.push(`${name}: ${t}`);
      } else if (value.kind === ts.SyntaxKind.TrueKeyword) {
        lines.push(`${name}: true`);
      } else if (value.kind === ts.SyntaxKind.FalseKeyword) {
        lines.push(`${name}: false`);
      } else if (ts.isNumericLiteral(value)) {
        lines.push(`${name}: ${value.text}`);
      } else if (ts.isJsxElement(value) || ts.isJsxSelfClosingElement(value) || ts.isJsxFragment(value)) {
        const t = jsxToText(value);
        if (t) {
          values.add(t);
          lines.push(`${name}: ${t}`);
        }
      } else if (ts.isArrayLiteralExpression(value) || ts.isObjectLiteralExpression(value)) {
        lines.push(...factsLines(value, values));
      }
      // Anything else (call expressions, identifiers) is code, not a fact.
    }
    return lines;
  }
  return [];
}

/**
 * Fact blocks declared in one page file: `[{label, lines, values}]`.
 * Throws when a `corpus-facts` marker exists that did not parse as a
 * directive on a module-scope declaration — a sanction that silently fails
 * open would defeat the point of having one.
 */
function extractFacts(source, fileName) {
  const sourceFile = ts.createSourceFile(
    fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX
  );

  const blocks = [];
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    const ranges = ts.getLeadingCommentRanges(source, statement.getFullStart()) ?? [];
    for (const range of ranges) {
      const comment = source.slice(range.pos, range.end);
      const match = comment.match(FACTS_DIRECTIVE);
      if (!match) continue;
      const label = match[1].trim();
      if (!label) {
        throw new Error(`${fileName}: corpus-facts directive has an empty label`);
      }
      const declaration = statement.declarationList.declarations[0];
      if (!declaration?.initializer) {
        throw new Error(
          `${fileName}: corpus-facts(${label}) sits on a declaration with no initializer`
        );
      }
      const values = new Set();
      const lines = factsLines(declaration.initializer, values);
      if (lines.length === 0) {
        throw new Error(`${fileName}: corpus-facts(${label}) produced no facts — check the shape`);
      }
      blocks.push({ label, lines, values });
    }
  }

  const markers = source.split('corpus-facts(').length - 1;
  if (markers !== blocks.length) {
    throw new Error(
      `${fileName}: ${markers} corpus-facts marker(s) but ${blocks.length} parsed — ` +
        `a directive is malformed or not attached to a module-scope declaration`
    );
  }
  return blocks;
}

/**
 * Prose from a shared component under website/src/components.
 *
 * Named one at a time, never swept: most shared components are chrome (the
 * nav, the footer, the chat panel) whose text would repeat on every route.
 * The exceptions are components that state something a reader needs and no
 * page repeats — the sample-case-study notice being the case in point.
 */
function sharedComponentProse(name) {
  const path = join(repoRoot, 'website', 'src', 'components', name, `${name}.tsx`);
  return extractProse(read(path), path);
}

/**
 * Prose plus rendered fact blocks for one page.
 *
 * Prose comes from the whole route folder via `pageProse`; facts stay bound to
 * page.tsx, which is where a `corpus-facts()` directive is declared and what
 * `sanctionedFacts` reads to build the leak-screen allowlist. Keeping those
 * two readers on the same file is what makes the screen fail closed: a
 * contact-shaped detail published anywhere else has no allowlist entry, so it
 * fails the build rather than slipping through.
 */
function pageContent(...segments) {
  const path = join(websiteApp, ...segments, 'page.tsx');
  const facts = extractFacts(read(path), path);
  const factsMarkdown = facts
    .map(({ label, lines }) => `#### ${label}\n\n${lines.join('\n')}`)
    .join('\n\n');
  return { prose: pageProse(...segments), factsMarkdown, facts };
}

/**
 * Every value string published through a corpus-facts block, across all
 * static pages. This is the leak-screen allowlist: a detail may appear in
 * the corpus only if a page deliberately published it.
 */
export function sanctionedFacts() {
  const values = new Set();
  for (const route of siteRoutes()) {
    if (route.split('/').some(isDynamicSegment)) continue;
    const segments = route === '/' ? [] : route.slice(1).split('/');
    const path = join(websiteApp, ...segments, 'page.tsx');
    for (const block of extractFacts(read(path), path)) {
      for (const value of block.values) values.add(value);
    }
  }
  return values;
}

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
   Sections
   ============================================================ */

function sectionSiteMap() {
  const nav = read(join(repoRoot, 'website', 'src', 'config', 'navigation.ts'));
  return `## Site map

Every page on ${SITE_HOST}. Link to these paths when pointing someone at more detail.

### Main pages

- Home (/): the landing page
- About (/about): background, principles, and career history
- Work (/work): case study index
- Writing (/writing): essays on design and AI, mirrored from Substack
- Contact (/contact): ways to get in touch, and to book a paid one-hour consultation
- Design system (/design-system): about Rift DS, the design system Rob designed and built

### Case studies

${linkLines(navLinks(nav, 'workSidebarLinks'))}

### The design system

Rift DS is documented on its own site, not here. Point people at rift-ds.com
rather than describing components or tokens from memory: this corpus carries
the story of building it, not its API.

- Documentation: https://rift-ds.com
- npm: https://www.npmjs.com/package/rift-ds (\`npm install rift-ds\`)
- Source: https://github.com/robritacca-dotcom/rift-ds

### Elsewhere

- GitHub: https://github.com/robritacca-dotcom`;
}

function sectionAbout() {
  const about = pageContent('about');
  const contact = pageContent('contact');
  const withFacts = ({ prose, factsMarkdown }) =>
    factsMarkdown ? `${prose}\n\n${factsMarkdown}` : prose;

  return `## About Rob, and how to reach him

Prose and published facts from /about and /contact.

### /about

${withFacts(about)}

### /contact

${withFacts(contact)}`;
}

/* ============================================================
   Site pages — every other route's prose, automatically

   The page list is the filesystem (scripts/site-routes.mjs), the same
   authority the sitemap uses, so a new page's prose reaches the corpus on
   the next build with no registration step. Routes covered by a dedicated
   section (About, Case studies, Blueprints…) are mapped to it; routes that
   must NOT be included are excluded here with a written reason.
   validate-chat-coverage.mjs holds this map honest against the disk.
   ============================================================ */

/** Routes whose content already lives in a dedicated section. */
function coveredElsewhere() {
  const map = new Map([
    ['/about', 'About'],
    ['/contact', 'About'],
    ['/writing', 'Writing'],
    // The essays themselves: full text from the committed registry.
    ['/writing/[slug]', 'Writing'],
    ['/components', 'Components'],
    ['/loops', 'Loops'],
    ['/blueprints/claude', 'Blueprints'],
    ['/blueprints/design', 'Blueprints'],
    ['/blueprints/content-design', 'Blueprints'],
  ]);
  const { caseStudies: studies } = JSON.parse(
    read(join(repoRoot, 'website', 'src', 'data', 'case-studies.json'))
  );
  for (const study of studies) map.set(study.href, 'Case studies');
  return map;
}

/**
 * Routes deliberately absent from the corpus. Every entry needs a reason a
 * stranger could audit; the coverage validator fails on stale entries.
 */
const EXCLUDED_ROUTES = new Map([
  ['/rr-animated',
    'a standalone animated-logo page with no informational prose'],
  ['/covers',
    'a noindex staging page for the vector cover mocks — its only prose is a size caption under each frame'],
  ['/covers/render',
    'a noindex surface that renders one cover mock alone at an exact size, so the cover images can be shot from it — it carries no prose at all'],
]);


/** The routes whose prose the Site pages section includes, in sorted order. */
function sitePageRoutes() {
  const covered = coveredElsewhere();
  return siteRoutes().filter((route) => {
    if (route.split('/').some(isDynamicSegment)) return false;
    if (covered.has(route)) return false;
    if (EXCLUDED_ROUTES.has(route)) return false;
    return true;
  });
}

/**
 * Coverage declaration for validate-chat-coverage.mjs: every disk route is
 * either covered by a section or excluded with a reason.
 */
export function routeCoverage() {
  const covered = new Map(coveredElsewhere());
  for (const route of sitePageRoutes()) covered.set(route, 'Site pages');
  // No per-component exclusion class any more: the showcase pages left with
  // the design system, so every route on disk is a portfolio route.
  const excluded = new Map(EXCLUDED_ROUTES);
  return { covered, excluded };
}

function sectionSitePages() {
  const pages = sitePageRoutes()
    .map((route) => {
      const segments = route === '/' ? [] : route.slice(1).split('/');
      const { prose, factsMarkdown } = pageContent(...segments);
      const body = [prose, factsMarkdown].filter(Boolean).join('\n\n');
      return body ? `### ${route === '/' ? '/ (home)' : route}\n\n${body}` : null;
    })
    .filter(Boolean)
    .join('\n\n');

  return `## Site pages

Prose from the site's pages, by route. About, contact, the case studies and the blueprints have their own sections.

${pages}`;
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

  // Rendered at the foot of every case study by SampleCaseStudyCard, so it is
  // stated once here rather than repeated into all eight.
  const sampleNotice = sharedComponentProse('SampleCaseStudyCard');

  return `## Case studies

Every case study below carries this notice: ${sampleNotice.replace(/\n/g, ' ')}

Newest first.

${summaries}

${full}`;
}


function sectionWriting() {
  // The committed essays registry (website/src/data/essays.json), refreshed
  // by scripts/sync-essays.mjs — the same committed-data pattern as the
  // project journal, which is what keeps this generator deterministic while
  // still carrying the full essay text. The essays are Rob's own words,
  // published word for word on /writing, so both halves of the corpus
  // boundary (public, authored by Rob) hold.
  const { essays } = JSON.parse(
    read(join(repoRoot, 'website', 'src', 'data', 'essays.json'))
  );

  const list = essays
    .map((e) => `- ${e.title} (/writing/${e.slug}), ${e.date}`)
    .join('\n');

  const full = essays
    .map(
      (e) =>
        `### ${e.title} (/writing/${e.slug})\n\n${e.date}${e.subtitle ? ` — ${e.subtitle}` : ''}\n\n${e.text}`
    )
    .join('\n\n');

  return `## Writing

Rob's essays on design and AI, mirrored from Substack onto /writing. The full text of each is below — quote and discuss them freely, and link the essay's page. Newest first.

${pageProse('writing')}

${list}

${full}`;
}

/* ============================================================
   Assembly
   ============================================================ */

// The Blueprints, Components, Skills, Loops and Journal sections went with the
// design system: their sources were design.md, the component registry, the
// skills registry, loops.json and site-updates.json, none of which this repo
// holds any more. What is left is the portfolio, which is what this chat
// answers for.
const SECTIONS = [
  ['Site map', sectionSiteMap],
  ['About', sectionAbout],
  ['Site pages', sectionSitePages],
  ['Case studies', sectionCaseStudies],
  ['Writing', sectionWriting],
];

const PREAMBLE = `# ${SITE_HOST}: full site content

Everything below is published on ${SITE_HOST} or in its public repository. It is the complete set of facts available for answering questions about Rob Ritacca and his work.
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
// Source of truth: the published site (navigation, page prose, data registries).
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
