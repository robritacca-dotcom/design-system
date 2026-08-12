# CLAUDE.md — Design System

## What This Is

A React component library + design system + documentation website. It has three interconnected parts:

1. **Component Library** (`/src`) — React components built with Vite + TypeScript, published to npm as **`@robr0/design-system`**. Each component has its own folder with implementation, scoped CSS, and Storybook stories. The website is an npm-workspace consumer: it depends on the package by name and imports through the same `exports` subpaths any consumer would (the in-repo exports point at `./src`, so it's live source — see **Registries** below for the generated barrel/exports surfaces). The official component list and count live in `src/components/registry.json`; never hardcode a count.
2. **Documentation Website** (`/website`) — A separate Next.js app that showcases every component with live, interactive examples. Each component has its own page under `website/src/app/components/[component-name]/`.
3. **AI Layer** (spans both) — the site answering questions about itself: the library's `ai` component category, the site-wide chat (the `SiteChat` panel, mounted from the root layout via `SiteChatMount`, the `useChat` hook, the Claude-backed `/api/chat` route), the build-generated site corpus it reads (see the corpus rows and security boundary in **Registries** below), and the answer-quality eval in `evals/chat`.

The design spec lives in [`design.md`](design.md) — read it before touching tokens, colors, or typography. The content style guide lives in [`content-design.md`](content-design.md) — read it before writing or editing any shipped prose (page copy, journal entries, descriptions, README, release notes, microcopy).

---

## Registries — counts are never hardcoded

**General rule:** any count of items displayed anywhere (components, skills, tokens, loops — anything countable) must derive from a registry that is the single source of truth for that collection, kept in sync with reality by a build-time validator. Never write a literal number (or a hand-maintained list that implies one) into page copy, stats, or docs.

Existing registries:

| Collection | Registry | Count export | Validator |
|---|---|---|---|
| Components | `src/components/registry.json` (`components` + `categories` + `docOnlyHelpers`) — each entry carries `name`, `label`, `slug`, `description`, `category`, `client` | `COMPONENT_COUNT`, `componentMetadata`, `componentCategories` from `src/components/registry.ts` | `scripts/validate-component-registry.mjs` — every folder registered, every entry has a folder, metadata well-formed (kebab-case unique slugs, unique labels, descriptions ≤160 chars ending in a full stop, known category), and **`client` matches whether the file actually declares `'use client'`** |
| Component website surfaces | `src/components/registry.json` (same registry) | — | `scripts/validate-website-surfaces.mjs` — every public component has a showcase page, index-grid `TocCard`, and a `###` spec section in `design.md`; also keeps `SECTION_OG_IMAGE_SEGMENTS` in `website/src/config/navigation.ts` in sync (both directions) with the section-level `opengraph-image.tsx` files, so sub-page share cards can't silently fall back to the root card. The sidebar nav entry and its alphabetical order are no longer checked because `componentsSidebarLinks` is **derived** from the registry — they cannot drift |
| Skills | `.claude/skills/registry.json` (`displayed` + `external` + `unlisted`) | `SKILL_COUNT` from `website/src/data/skills-registry.ts` | `scripts/validate-skills-registry.mjs` — every `.md` registered, every entry has a file, page list matches `displayed` + `external` |
| Project journal | `website/src/data/site-updates.json` (curated timeline entries + `asOf` commit bookmark) | `SITE_UPDATE_COUNT` from `website/src/data/site-updates.ts` | `scripts/validate-site-updates.mjs` — structure only (complete stories, valid bookmark, no commit-hash dumps); freshness is the biweekly `site-updates` skill's job, never the build's |
| Essays | `website/src/data/essays.json` (full text, slug, title, date) — **synced** from the Substack feed by `scripts/sync-essays.mjs`, run deliberately after publishing (the build never touches the network); the site-chat corpus embeds the full text so the chat can quote and discuss the essays | — | `scripts/validate-essays.mjs` — structure only: complete fields, unique site-matching slugs, non-trivial HTML-free text; freshness is the sync script's job, never the build's |
| Case studies | `website/src/data/case-studies.json` (curated order, newest first — `/work` maps over all of it, the home page features entry `[0]` and lists the next few) | `caseStudies` from `website/src/data/case-studies.ts` | `scripts/validate-case-studies.mjs` — every entry has a `/work/<slug>` page, unique href, complete fields, and existing logo/cover assets; every case-study folder is registered; the hand-curated `workSidebarLinks` in navigation.ts must list exactly the registered studies |
| Semantic tokens | `src/tokens/registry.json` — **generated** from the semantic token CSS (`tokens-light.css` + `tokens-typography.css` + `tokens-motion.css`) by `scripts/generate-token-registry.mjs`, never hand-edited | `TOKEN_COUNT` + `TOKEN_COUNTS` (per category) from `src/tokens/registry.ts` | `scripts/validate-token-registry.mjs` — registry matches the CSS, light/dark colour parity; a token with an unknown prefix fails generation until its category is added deliberately |
| Site chat corpus | `website/src/data/site-corpus.generated.ts` — **generated** from the published site (every page's prose via the TypeScript AST, `corpus-facts()` data blocks, the data registries above, and the root specs — CLAUDE.md and design.md condensed, content-design.md in full) by `scripts/generate-site-corpus.mjs`, never hand-edited. **Page coverage is automatic**: the page list is the filesystem (`scripts/site-routes.mjs`), so a new page's prose reaches the corpus on the next build; deliberate absences live in `EXCLUDED_ROUTES` with a written reason | `siteCorpus` + `siteCorpusApproxTokens` from the same file | `scripts/validate-site-corpus.mjs` — regenerates in memory and byte-compares, checks for leaked details (local paths, analytics ids, keys; email addresses are allowlisted against `corpus-facts()` blocks and otherwise fail), and re-checks the token budget. `scripts/validate-chat-coverage.mjs` — every golden-set fact in `evals/chat/golden-set.json` must be in the corpus, and every route must be covered by a section or excluded with a reason |

The `/project-journal` page renders this data as the build-progression timeline; entries are agent-curated stories (one theme consolidating many commits — what/why/outcome prose), appended by the `site-updates` skill. The full chain (`npm run validate-registry`) runs before every root build via `prebuild`/`prestorybook`/`prebuild-storybook`. The website's own `prebuild` runs a deliberate subset — the website-relevant generators and validators, skipping the library-only ones — and `website/package.json` is authoritative for which; CI and the root builds always run the full chain.

**The package barrels and exports map are generated surfaces.** `scripts/generate-library-barrel.mjs` (validate-registry chain) writes `src/index.ts` and `src/charts.ts` from `src/components/registry.json` — never hand-edit them. Modules that import recharts land in `charts.ts` automatically (recharts is an optional peer dependency; the main barrel must never force a bundler to resolve it). The `exports` field in package.json is owned by `scripts/package-manifest.mjs` (single source for the package name, version, and subpaths — in-repo exports point at `./src` for workspace dogfooding, `npm run build:lib` writes the dist-form manifest that ships to npm); `scripts/validate-package-exports.mjs` fails the build if they drift.

**README.md is a generated surface for registry data.** `scripts/generate-readme-content.mjs` (also in the `validate-registry` chain) rewrites three marked regions — never hand-edit inside them, and commit README.md when a build regenerates it:
- `<!-- component-count -->` and `<!-- component-list:start/end -->` — from `src/components/registry.json`
- `<!-- npm-badge:start/end -->` — the npm version badge, built from `PACKAGE_NAME` in `scripts/package-manifest.mjs`, so a scope change can never leave the badge pointing at a package that doesn't exist

The same script fails the build if its Tech section names a different major version of React, Next.js, Storybook, or Vite than package.json, and if **either** install surface stops mentioning the package name — `README.md` or `src/stories/Configure.mdx` (the Storybook landing page). Both tell a stranger how to install the package, and they deploy separately, so a scope rename that reaches one but not the other leaves a live install snippet pointing at a package that does not exist. **The README also ships inside the npm tarball**, so anything inaccurate there reaches every consumer — treat both files' install/usage prose as production copy.

When a new countable collection appears on the site (tokens, loops, case studies…): create a registry file next to the collection, export the count from a small accessor module, add a validator script chained into `validate-registry`, and pull every displayed number from the export. When adding a skill: write `.claude/skills/<name>/SKILL.md` and register the name in `.claude/skills/registry.json` (`displayed` if it appears on `/skills`, `unlisted` if internal) — that's all. The `/skills` page is fully data-driven: it maps over `website/src/data/skills-content.generated.ts`, which `scripts/generate-skills-content.mjs` builds from the SKILL.md files in registry order, so **never hand-add a card to `website/src/app/skills/page.tsx`**. `scripts/validate-skills-registry.mjs` fails the build if a skill file and the registry drift.

**The website's /blueprints pages are a generated surface too.** `scripts/sync-blueprints.mjs` (in the `validate-registry` chain) copies the root markdown specs into `website/public/` on every build — never hand-edit those copies; edit the root files. Its `FILES` array is the authoritative list, and `scripts/validate-website-surfaces.mjs` imports it to check every synced file has a `/blueprints/<name>` page, so a spec cannot be published as a raw download with no page to read it on; the same validator holds the llms.txt route's spec-download list to `FILES` in both directions, so an unpublished spec cannot stay advertised as a link that 404s.

**The site chat corpus is public-only and authored-by-Rob-only, and both halves are security boundaries, not style choices.** `scripts/generate-site-corpus.mjs` may only read sources that are already published — page prose, the data registries, the blueprint specs. The corpus becomes the chat model's context, so anything in it can be repeated verbatim to any visitor who asks; keeping it public-only means the worst case of a successful prompt injection *out of the chat* is off-brand prose rather than a leak. The second half guards the opposite direction: text in the corpus is text the model treats as context, so third-party words — a client quote, a testimonial, a pulled-in review — would be an injection surface *into* the chat. Today every word on the site is Rob's, which is what makes the automatic page-prose extraction safe; the day a page carries text he didn't write, that content needs an explicit decision (and probably an exclusion) before the next build ships it to the model. The boundary is enforced as an allowlist, not remembered: a contact-shaped detail (an email address) may appear in the corpus only when a page deliberately published it through a `corpus-facts()` directive, and `scripts/validate-site-corpus.mjs` fails the build on any other route in. It still screens for the obvious slips (local paths, analytics ids, keys), but it cannot judge whether a new source was meant to be public — or whether Rob wrote it.

**Self-descriptions stay in sync.** The repo describes itself in prose in several places — `README.md`, `design.md`, this file, and the website's foundations/overview pages. Whenever a change makes a statement in any of them false (a new component category, a dropped dependency, a renamed part, a changed principle), update that prose in the same change — don't leave it for a future audit. If the drifting fact is *countable or mechanically checkable* (a count, a list, a version number), don't just fix the prose: route it through a registry + generator/validator in the `validate-registry` chain so it can never drift again (the README component section and Tech versions are the reference example).

**Prose & skill authoring rules.** The registry principle generalized: **every fact has exactly one authoritative home** — all other mentions derive from it (generated), are checked against it (validated), or point at it. Never restate a fact a registry, script, or source file already owns. Concretely:

- **Point, don't enumerate.** "The `validate-registry` entry in the root `package.json` is the authoritative list" beats a hand-copied list that goes stale.
- **Examples in skills are fictional.** Example findings use made-up component names — a factual claim about a real component inside an example rots silently.
- **No counts outside registries; no machine-local paths** — derive the repo root with `git rev-parse --show-toplevel`.
- **Off-token CSS values are sanctioned at the site**, never in a skill: `/* ds-allow(<category>): <reason> */` (file-wide: `ds-allow-file`), categories owned by `scripts/validate-css-directives.mjs`. The token-audit skill reads directives; it maintains no list.
- **References are build-checked**: `scripts/validate-doc-refs.mjs` fails the build when a skill or doc (this file, `README.md`, `design.md`, `content-design.md`, `porting-guide.md`) references a repo path, `npm run` script, or documented API symbol that doesn't exist.

---

## Quick Start

```bash
# Storybook (interactive component showcase — the library's dev sandbox)
npm run storybook              # http://localhost:6006

# Documentation website (separate project)
npm install && cd website && npm run dev   # http://localhost:3000 (workspace install runs at the root)
```

Other useful commands:
```bash
npm run build           # type-check the library
npm run build:lib       # build the publishable package into dist/ (vite lib build + d.ts + assets)
npm run lint            # ESLint
npm run build-storybook # export static Storybook
npm run test            # run every Storybook story as a render test (headless Chromium)
npm run verify          # full local quality gate: lint + tests + the library, package, Storybook and website builds (mirrors CI)
npm run eval:chat       # site-chat answer-quality eval against a running dev server (see evals/chat/README.md — costs real API calls, never in CI)
```

---

## CI & Local Verify

Every push to `main` and every PR runs `.github/workflows/ci.yml` (four jobs: library lint + build, story tests, Storybook build, website lint + build). The library job ends with a **drift guard** — `git diff --exit-code` after the generators run — so a registry change that lands without its regenerated README/skills/blueprint content fails CI.

**Story tests**: `npm run test` runs every Storybook story as a render test in headless Chromium (Vitest + `@storybook/addon-vitest`, configured in `vite.config.ts`). A story that throws on render fails the suite — so every component variant is smoke-tested on every change. **A11y checks run alongside in `'error'` mode — an axe violation fails the suite** (see `.storybook/preview.ts`). The target is WCAG 2.1 AA *minus* the contrast criteria: `color-contrast` is deliberately disabled, because the action colour fails behind its own label and fixing it is a design decision, not a lint fix — the deferral is recorded where the rule is disabled, in `.storybook/preview.ts`. Everything else in AA is enforced.

**Releases** are manual and follow the `release` skill (`.claude/skills/release`). The `Release` workflow (`.github/workflows/release.yml`, workflow_dispatch, dry-run by default) builds `dist/`, runs `scripts/smoke-consumer.mjs` (packs the tarball into a scratch Vite consumer and builds it without recharts), then publishes **from `dist/`** with `npm publish --access public --provenance`. The root package.json stays `private` forever — only the generated dist manifest ships. **The version lives in three places and all must move together:** `PACKAGE_VERSION` in `scripts/package-manifest.mjs` is authoritative for what ships; the root package.json's `version` must be mirrored by hand; and `package-lock.json` records it too — refresh it with `npm install --package-lock-only` after a bump. `validate-package-exports.mjs` fails the build when any of the three disagree (a stale lockfile also dirties every fresh checkout's tree on plain `npm install`). `@robr0/design-system` is published; 0.1.0 shipped 2026-07-26, 0.2.0 on 2026-07-27 (the first release via Trusted Publishing), 0.3.0 on 2026-07-28, 0.4.0 on 2026-08-01 (the ai category), 0.5.0 on 2026-08-09 (the chat component set that powers the site-wide chat), 0.6.0 on 2026-08-11 (the composer radius token, ChatMessage's showActions, and the README stating the chat's UI-only boundary).

Two facts that bite on release day: **a published version can never be reused**, even after unpublishing, so a botched release costs a version number; and **the registry lags the workflow by minutes** — a 404 right after a green publish is propagation, not failure, so never re-run on it. Auth is **Trusted Publishing (OIDC)** — there is no npm token to expire or rotate. The registration on npmjs.com is keyed to the workflow **filename**, so renaming or moving `release.yml` breaks publishing until the registration is updated; and `permissions: id-token: write` is load-bearing for authentication, not just provenance. A dry run never authenticates, so only a real publish proves the auth path works.

**Infrastructure** (the facts the /overview pipeline describes — keep them in sync):
- **Domain**: `robertritacca.com` is registered at GoDaddy; GoDaddy DNS points at the Vercel deployment (`www` CNAMEs to Vercel's DNS). Storybook deploys as a second Vercel project.
- **Analytics**: Google Analytics 4 via the gtag snippet in `website/src/app/layout.tsx` (`GA_ID` is the public G-… measurement ID — safe to commit; it is visible in every page's source by design). GA *credentials* (service-account key, property ID) live only in local `ga-analysis/` files that its own `.gitignore` excludes from the repo (the directory's tooling — `pull_ga.py`, `README.md` — is tracked and secret-free); they never reach the repo or the site.
- **Fonts**: Nunito Sans is **not** bundled anywhere — the website self-hosts it via `next/font/google` (fetched from Google Fonts at build time), Storybook loads it via a Google Fonts `<link>`, and package consumers bring their own (override `--font-family-primary`). Material Symbols Rounded ships as a self-hosted woff2 **inside the npm package** (`src/fonts/`). The playground (`/playground`) is the one surface that loads fonts from Google at runtime.

`npm run verify` is the **single local mirror of CI**: lint, library build, package build, story tests, Storybook build, website lint, website build, in that order. The rule that keeps them in sync: **when CI gains a check (a11y is the worked example), add it to `verify` in the same change** — skills and docs reference `verify`, never individual commands, so nothing else needs updating. **One deliberate exception: Chromatic** (`.github/workflows/chromatic.yml`, visual regression). Every run bills cloud snapshots against a monthly budget, so it is `workflow_dispatch`-only, never part of `verify`, and never a reason to treat a green `verify` as proof the pixels are unchanged.

**Shipping vocabulary** — skills named for their end state, because a push to `main` always deploys robertritacca.com (`.claude/skills/registry.json` is the authoritative list of what exists):
- **`ship`** — make it live. Full verify, merge branch work into `main` if needed, push, watch CI. Always ends deployed.
- **`checkpoint`** — save progress to a remote branch and keep working. Never touches `main`, never deploys; if invoked on `main` it moves the work to a `wip/<topic>` branch first.
- **`park`** — checkpoint, then return to a clean `main`. The branch name is the resume handle.
- **`land`** — triage all pending work at once and resolve it. Sweeps worktrees, branches, the working tree and stashes, judges each as **land / keep / delete**, merges the approved into a **local, unpushed** `main`, and verifies the combined result. Anything deleted is archived to an `archive/*` tag first, so discarding unmerged work stays reversible. Deliberately never pushes, so a batch deploy stays an explicit `ship`.

The old `merge-and-push` skill is retired because its name didn't say which of these it meant. If asked to "merge and push", confirm ship vs checkpoint instead of guessing.

---

## Project Structure

```
/
├── design.md                  # Design spec — source of truth for tokens, colors, typography
├── content-design.md          # Content style guide — source of truth for voice, register, and prose rules
├── scripts/                   # Generators + validators (the validate-registry chain), release tooling
├── evals/chat/                # Site-chat eval: golden set, promptfoo config, README (runs on demand via `npm run eval:chat`, never in CI)
├── src/
│   ├── index.ts               # GENERATED barrel — never hand-edit
│   ├── charts.ts              # GENERATED recharts barrel — never hand-edit
│   ├── components/            # Component folders (each self-contained) + registry.json (official list/count)
│   ├── stories/               # Storybook foundation docs (tokens, typography, icons, logos, landing page)
│   ├── tokens/
│   │   ├── tokens.css               # Aggregate entry point consumers import
│   │   ├── tokens-primitives.css    # Raw hex/px values — never use directly in components
│   │   ├── tokens-light.css         # Semantic tokens, light theme
│   │   ├── tokens-dark.css          # Semantic tokens, dark theme
│   │   ├── tokens-typography.css    # Font size/weight/line-height scale
│   │   ├── tokens-motion.css        # Duration/easing scale + reduced-motion guard
│   │   └── registry.json            # GENERATED token registry — never hand-edit
│   └── fonts/                 # Material Symbols icon font (self-hosted); Nunito Sans is loaded via Google Fonts
├── .storybook/                # Storybook config (Storybook is the library's dev sandbox)
└── website/                   # Next.js docs site (npm workspace; consumes @robr0/design-system by name)
    ├── public/                # Includes GENERATED copies of the root markdown specs (see /blueprints)
    ├── src/app/
    │   ├── components/        # One folder per component, each with page.tsx + page.module.css
    │   ├── foundations/       # Design tokens & layout doc pages
    │   ├── design-system/     # DS landing page (hero with section-link buttons + live component collage)
    │   ├── docs/              # Docs hub: links out to overview/skills/journal; owns get-started (install + theming)
    │   ├── overview/          # How-it's-built pipeline page
    │   ├── skills/            # Skills page (data-driven from the generated skills content)
    │   ├── project-journal/   # Build-progression timeline (site-updates registry)
    │   ├── loops/             # The recurring agent loops page
    │   ├── contact/           # Contact page
    │   ├── playground/        # The immersive re-theming tool: Components + Chat views over one set of levers (chromeless; absorbed the old /robr0-gpt chat bench, which now redirects here)
    │   ├── blueprints/        # Renders the public root-spec copies (CLAUDE.md, design.md, content-design.md)
    │   ├── work/              # Case-study pages, one folder per study (see the case-study registry)
    │   ├── writing/           # Essay pages, mirrored from the Substack feed
    │   ├── about/             # About page
    │   ├── rr-animated/       # Standalone animated-logo page
    │   ├── llms.txt/          # Serves the public llms.txt agent index (a prose surface — see content-design.md's register table)
    │   └── api/               # Route handlers (github-contributions; chat, the widget's LLM backend)
    ├── src/config/            # navigation.ts (nav/sidebar/breadcrumb source of truth), chromeless.ts (routes with no shared chrome), social.ts (canonical profile + project links)
    ├── src/data/              # Data registries: case-studies.json, site-updates.json, skills accessors
    ├── src/hooks/             # Client hooks (useChat — the chat widget's transport-agnostic state machine)
    ├── src/lib/               # Non-UI modules (chat-sim + chat-transport, chat-model, scroll lock, Substack feed, OG image, structured data)
    └── src/components/        # Shared Next.js UI (MegaNav header, Sidebar, SiteFooter + SiteChat — both mounted once from the root layout, skipping the chromeless routes in src/config/chromeless.ts)
```

---

## Token Architecture

Three tiers — **never skip a tier**:

```
tokens-primitives.css       --primitive-teal-07: #118AB2
        ↓
tokens-light/dark.css       --color-action-primary-bg: var(--primitive-teal-07)
        ↓
Component CSS               background-color: var(--color-action-primary-bg)
```

- **Primitives** (`--primitive-*`) — raw values. Source of truth. Never referenced in components.
- **Semantic tokens** (`--color-*`, `--radius-*`, `--gap-*`, `--padding-*`, `--border-*`, `--font-*`, `--motion-*`, `--icon-size-*`, `--shadow-*` — `CATEGORY_PREFIXES` in `scripts/generate-token-registry.mjs` is the authoritative list) — always use these in components.
- **Dark mode** is driven by `data-theme="dark"` on the root element. Every semantic token has a light and dark value — no `prefers-color-scheme` queries in components.

Key invariants:
- Teal `--color-action-primary-bg` (#118AB2) is **only** for primary CTA buttons and focus rings. Never decorative.
- Never hardcode hex values in component CSS — always a semantic token. (Deliberate off-token values are sanctioned *in place* with a `/* ds-allow(<category>): <reason> */` directive — `ds-allow-file(...)` for file-wide cases like ColorPicker's `hsl()` colour physics. Grep `ds-allow` to enumerate them; `scripts/validate-css-directives.mjs` owns the category set and build-enforces the grammar.)
- Never hardcode hex values in semantic colour tokens either: every `--color-*` value in `tokens-light/dark.css` must be a `var(--primitive-*)` (or `var(--color-*)`) reference — build-enforced by `scripts/validate-token-references.mjs`. This is what lets a consumer override a primitive and have it cascade through the whole system.
- Every `var(--…)` a component references must actually resolve: `scripts/validate-token-usage.mjs` fails the build on a reference to a custom property nothing defines (a fallback value marks a deliberate consumer-override hook and is exempt). This is the guard that would have caught Dialog styling its title with a token family that never existed.
- Buttons are always `--radius-full` (pill). Inputs are always `--radius-md` (12px). Two sanctioned departures: Card/EntityCard navigation tiles use `--radius-xl` (24px), and the chat Composer's input shell uses `--radius-composer` (29px, concentric with its pill send button — the geometry is specified in design.md's Composer section).

---

## Component Anatomy

Every component lives in its own folder under `src/components/`:

```
src/components/Button/
├── Button.tsx            # TypeScript implementation + exported interface
├── Button.css            # Scoped CSS using semantic token vars
└── Button.stories.ts     # Storybook stories (Meta + named Story exports)
```

Components are imported in the website through the package's public exports (deep subpaths; the barrel `import { Button } from '@robr0/design-system'` also works):
```tsx
import { Button } from '@robr0/design-system/components/Button/Button';
```

CSS class naming: `ds-{component}` base class, `ds-{component}--{modifier}` for variants. Example: `ds-button`, `ds-button--primary`, `ds-button--compact`.

**The props interface is a published contract.** Since `@robr0/design-system` ships to npm, every component follows the same API shape — full details and code in the `new-component` skill; `Button.tsx` (button-or-anchor) and `Input.tsx` (form control) are the reference implementations:

- `'use client'` on the first line **only** when the component uses hooks, handlers, or browser APIs. Presentational components (e.g. `Table`) deliberately omit it so consumers can render them from a Server Component.
- Own props as a `type`, then `export interface XProps extends XOwnProps, Omit<React.ComponentPropsWithoutRef<'el'>, keyof XOwnProps> {}` — so native attributes pass through.
- `React.forwardRef` onto the primary node (the **panel** for portal components like Dialog/Drawer), plus `displayName`. Merge with any internal ref rather than replacing it.
- `{...rest}` spread first onto that node, so the component's own attributes win.
- Native event signatures keep the standard names. `onChange` is a `ChangeEventHandler`; the convenience callback is named for the value's shape — `onValueChange` (string/number), `onCheckedChange` (boolean), `onValuesChange` (array) — and both fire.
- `variant` not `priority`/`kind`; `disabled` as a real boolean. **Figma variant properties are not code props** — `hover`/`active` are CSS pseudo-classes, not state a consumer sets.
- Deprecate, never remove. Document intentional native-name collisions (`size`, `title`) in the prop's JSDoc.

**Prop documentation is build-enforced.** Every own prop needs a JSDoc description: it is the single source for Storybook's props tables and for the `.d.ts` that ships to consumers, and `scripts/validate-prop-docs.mjs` fails the build on a prop without one. Two rules follow from how that pipeline works:

- **Never put a prop description in a story's `argTypes`.** `argTypes` entries override docgen, so a description there shadows the JSDoc and silently drifts from it. Stories set `control` and `options`; the source owns the words.
- **On a deprecated prop, put a sentence *before* the `@deprecated` tag.** The docgen parser moves the tag and everything after it into a separate `tags` field, so a prop documented *only* with the tag has an empty description and renders as a blank cell. `/** Legacy alias for \`variant\`. @deprecated Use \`variant\` instead. */` keeps both.

The parser settings in `.storybook/main.ts` and in `validate-prop-docs.mjs` are deliberately identical, so the validator sees exactly what the rendered table sees. Two of them are load-bearing and easy to break: `tsconfigPath` must point at `tsconfig.app.json`, because the root `tsconfig.json` is solution-style (`"files": []` plus references) and yields a program containing no files; and the parser must be `react-docgen-typescript`, because plain `react-docgen` finds no component at all in one that returns `createPortal(...)` with no direct JSX (AlertDialog, CommandPalette).

---

## How to Add a New Component

A new component is not done until it appears in **every** place the system documents itself: the library, Storybook, and all relevant sections of the showcase website. Do not skip registration steps.

1. **Create the folder**: `src/components/MyComponent/`
2. **Write `MyComponent.tsx`**: Export a named component + a TypeScript interface for props, following the published-contract shape in **Component Anatomy** above (`'use client'` when interactive, own-props split, `forwardRef` + `displayName`, `{...rest}` spread, native event signatures). Use semantic tokens in class names, never inline styles.
3. **Write `MyComponent.css`**: All CSS vars must be from `tokens-light/dark.css`. No hardcoded hex, px values from primitives, or magic numbers.
4. **Write `MyComponent.stories.tsx`**: Export a `meta` (with `title: 'Components/MyComponent'`, `tags: ['autodocs']`) and at least a `Default` story plus one per meaningful variant. (`.stories.ts` also works for stories with no JSX, but `.tsx` is the convention across the library.)
5. **Add a website showcase page**: Create `website/src/app/components/my-component/page.tsx` + `page.module.css` + `layout.tsx`. Follow the pattern in an existing page (e.g., `website/src/app/components/button/page.tsx`). The `layout.tsx` must be exactly `export const metadata = componentPageMetadata("my-component");` — title *and* description come from the registry, so the description lives in one place. A slug with no registry entry fails the website build.
6. **Register it** — one entry, and most surfaces follow automatically:
   - `src/components/registry.json` — add an object to `components` (alphabetical by `name`) with `name`, `label`, `slug`, `description`, `category` and `client`. **The sidebar nav entry, the sitemap, the breadcrumbs, the mega-nav and the page's title/description all derive from this** — do not hand-add a nav entry.
   - `website/src/app/components/page.tsx` — add a `TocCard` with a small live preview to the components index grid (alphabetical). This is the one surface still hand-maintained, because each card contains a bespoke preview.
7. **Document it in `design.md`**: add a short component spec section (class name, tokens used, key behaviours).

Steps 5–7 are build-enforced by two validators: `scripts/validate-website-surfaces.mjs` fails the build if any public component is missing its showcase page, `TocCard`, or `design.md` spec (the nav entry and its order are derived from the registry, so they cannot drift); `scripts/validate-page-titles.mjs` fails it if the page has no `layout.tsx`, or if that layout does not derive its title via `componentPageMetadata("<slug>")`.

Checklist before shipping a component:
- [ ] Props follow the published-contract shape (own-props split, `forwardRef` + `displayName`, `{...rest}`, native event signatures)
- [ ] `'use client'` present if interactive — and **absent** if purely presentational
- [ ] All colors via semantic tokens
- [ ] Dark mode verified (toggle `data-theme="dark"` in Storybook)
- [ ] Disabled state at `opacity: 0.4`, `cursor: not-allowed`
- [ ] Interactive elements have ARIA roles and keyboard navigation
- [ ] At least one Storybook story per variant
- [ ] Website showcase page added, with a `layout.tsx` title via `componentPageMetadata("<slug>")` (build-enforced)
- [ ] Added to `src/components/registry.json` with complete metadata, `client` matching whether the file declares `'use client'` (build-enforced)
- [ ] `TocCard` added to the components index grid (build-enforced). The sidebar nav, sitemap and breadcrumbs derive from the registry — nothing to add
- [ ] Spec section added to `design.md` (build-enforced)

---

## How to Add a New Token

Tokens also have multiple homes — a token that exists only in CSS is incomplete. When adding or changing a token:

1. **Both theme files, always**: define it in `src/tokens/tokens-light.css` **and** `src/tokens/tokens-dark.css` (every semantic token needs a value in each). Add a primitive to `tokens-primitives.css` first if no suitable one exists; semantic colour tokens **must** reference primitives via `var()` (build-enforced by `scripts/validate-token-references.mjs`).
2. **Document it in `design.md`**: it's the source of truth for the design language — record the token's role and its light/dark values.
3. **Add it to the foundations doc pages** on the website, in the section matching its type:
   - Semantic colors → `website/src/app/foundations/colour-mode/page.tsx` (add a swatch data entry with per-theme primitive name/hex/RGB, and a new `SectionTitle` group if it's a new category — the page is a stated curated subset, so a niche internal role may be skipped; the registry and Storybook docs carry the full set)
   - New primitives → `website/src/app/foundations/colour-primitives/page.tsx`
   - Spacing/radius/border → `website/src/app/foundations/spatial/page.tsx`
   - Shadows/depth → `website/src/app/foundations/elevation/page.tsx`
   - Typography → `website/src/app/foundations/typography/page.tsx`
   - Icon sizes → `website/src/app/foundations/icons/page.tsx` (the `--icon-size-*` scale table)
   - Motion (durations/easings) → `website/src/app/foundations/motion/page.tsx` (add a `MotionSwatch` entry to the matching token array)
4. **Update the Storybook token docs**: `src/stories/Tokens.stories.tsx` documents tokens by category (primitives, colours, status, chart, elevation, spacing, motion) — add the new token to the matching story, or a new story if it's a new category. (`src/stories/` also holds `Typography`, `Icons`, and `Logos` foundation docs.)
5. **Counts take care of themselves**: `src/tokens/registry.json` is regenerated from the token CSS on every build (see **Registries**), so displayed token counts update automatically — never hardcode one. If the token introduces a *new prefix*, generation fails until you add the prefix to `CATEGORY_PREFIXES` in `scripts/generate-token-registry.mjs` and give the category a home wherever counts are shown.

---

## Design Principles

These are stated at the level of **token roles**, deliberately: which colour, radius, typeface, or shadow a role resolves to is the theme owner's decision, lives in `design.md` and the token files, and can change without any of these sentences becoming false.

- **One typeface**, with heading hierarchy carried by weight contrast — consecutive heading levels never share a weight.
- **The primary-action token is reserved for actions**: primary CTAs, focus rings, active input borders. Never decorative, or it stops meaning "click here".
- **Shape is a per-element-type token, never a per-instance choice**: all buttons share one radius role, all inputs another. Change the token, not the component.
- **Five status roles** (`info`, `positive`, `warning`, `error`, `neutral`), shared by every status-bearing component through the same `--color-status-*` set.
- **Depth is token-owned**: surfaces step through the container ramp, and the only shadows are the elevation tokens the system defines. Components never add their own.
- **Icons sit on the `--icon-size-*` scale** — set the scale variable, never `font-size` on an icon.

---

## Key Files

| File | Purpose |
|---|---|
| [`design.md`](design.md) | Full design spec — colors, typography, spacing, all component rules |
| [`content-design.md`](content-design.md) | Content style guide — voice, register by surface, words and patterns to avoid |
| [`src/tokens/tokens-primitives.css`](src/tokens/tokens-primitives.css) | Raw hex/px values |
| [`src/tokens/tokens-light.css`](src/tokens/tokens-light.css) | Semantic token definitions (light) |
| [`src/tokens/tokens-dark.css`](src/tokens/tokens-dark.css) | Semantic token overrides (dark) |
| [`src/tokens/tokens-typography.css`](src/tokens/tokens-typography.css) | Font size/weight/line-height scale |
| [`src/tokens/tokens-motion.css`](src/tokens/tokens-motion.css) | Duration/easing tokens + reduced-motion guard |
| [`src/components/Button/Button.tsx`](src/components/Button/Button.tsx) | Reference implementation for a component |
| [`src/components/Button/Button.stories.ts`](src/components/Button/Button.stories.ts) | Reference for story structure (`.ts` because it holds no JSX — `.tsx` is the library-wide convention) |
| [`website/src/app/components/button/page.tsx`](website/src/app/components/button/page.tsx) | Reference for a website showcase page |
| [`website/src/config/navigation.ts`](website/src/config/navigation.ts) | Nav links — update when adding pages |
| [`.storybook/main.ts`](.storybook/main.ts) | Storybook config: addons, stories glob, and the docgen settings that generate every props table (see **Prop documentation** below) |

---

## Known Gaps

- CSS motion is fully tokenized (`--motion-*`), but JS-driven timings (Tooltip delays, Toast auto-dismiss, Carousel autoplay, ChatThread's scrollbar settle delay — a non-exhaustive list) remain hardcoded TS constants — tokenizing them is a pending follow-up
- No `--chart-series-{n}` formal token set for ordered chart series colors
- Figma source file documented: [robr0-ds26](https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26) — foundation/component pages deep-link to specific frames via `figmaUrl`
- Visual regression runs via Chromatic (`.github/workflows/chromatic.yml`, dispatch-only — see **CI & Local Verify** for why it is not part of `verify`); baseline accepted 2026-07-27 across both themes. A11y is enforced at AA-minus-contrast; the contrast criteria remain deliberately deferred (recorded in `.storybook/preview.ts`), and axe only catches roughly a third of WCAG issues, so keyboard order and meaningful alt text still need human review
