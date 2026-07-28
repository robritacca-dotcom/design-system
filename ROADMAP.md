# ROADMAP

The single planning surface for this repo. Everything queued, deferred, parked, or deliberately rejected lives here — if it isn't in this file, it isn't planned.

**This file is intentionally *not* in the `validate-registry` chain.** Every other doc in this repo is a generated or build-enforced surface because it states *facts about the system* (counts, lists, versions) that must never drift. This file states *intent*, which can't be validated — so it is hand-maintained, and any count in it is marked as an "as of" snapshot rather than pulled from a registry. Keep it that way: don't put a number here that a registry already owns.

Audited against the working tree on **2026-07-27, end of day** (59 components, 4 doc-only helpers — Kbd and ContextMenu shipped that afternoon).

---

# ▶ WHERE WE ARE — last updated 2026-07-27, end of session

**Seven of ten sequenced steps are done and on `main`.** `@robr0/design-system@0.2.0` is live with signed provenance; CI green as of `80b1ec8` (2026-07-27).

| # | Step | Status |
|---|---|---|
| 1 | **B1 + B2 + B5 + item 1** — the signature pass | ✅ **done** — 18 components, shipped as `0.2.0` |
| 2 | **item 3** — npm Trusted Publishing (OIDC) | ✅ **done** — publishing is OIDC-only *by configuration* |
| 3 | **item 4-cheap** — Storybook install docs | ✅ **done** — and build-enforced across both install surfaces |
| 4 | **B3** — the `Field` primitive | ✅ **done** — 6 controls, −160 lines, 2 a11y bugs fixed |
| 5 | **item 6** — a11y to `'error'` (AA minus contrast) | ✅ **done** — 49 fixed, 502/502 green, axe now gates CI |
| 6 | **Workstream A Phase 1** — registry metadata | ✅ **done** — 4 duplications collapsed; found 16 missing `'use client'` |
| 7 | **Workstream A Phase 2** — generated prop contracts | ⏸ **PARKED 2026-07-27** — see the parking record below |
| 8 | **item 2** — API-surface validator | ⏸ **parked with 7** (only cheap if 7 exists) |
| 9 | **item 5** — Chromatic | ✅ **done 2026-07-27** — baseline: 502 stories × 2 themes, 1,004 snapshots |
| 10 | **Workstream A Phase 3** — dense `.md` docs | ⏸ **parked with 7** (its props tables come from 7) |

## ⏸ PARKED 2026-07-27: Phase 2 / item 2 / Phase 3 (the props.json bundle)

**Decision:** parked as a bundle, on Rob's call, after a deliberate re-examination. Not rejected — the reasoning is recorded so it is never re-litigated from scratch.

**Why:** the system is already agent-readable through cheaper means, and the check that was meant to prove the gap disproved it instead. design.md's spec sections carry the props surface in prose *with judgment attached* (the Combobox section names `multiple`, `clearable`, `loading`, `emptyMessage`, the `onSearchChange`/`manualFiltering` pairing, and when to use Dropdown instead); the published package ships complete `.d.ts` types for any agent with it installed; llms.txt links the blueprints and every component page. What Phase 2 would add — exact types in JSON, per-component pages — is a refinement of something that already works, priced at the most complex script in the repo plus a permanent TS-upgrade regeneration tax. With **zero external dependents**, item 2's breaking-change alarm protects nobody yet.

**Un-park when:** the package gains real external consumers (item 2 becomes the valuable piece, and it is only cheap if props.json exists), or the agent-legibility story becomes a concrete need rather than a nice-to-have.

**Context that tipped it:** Rob is taking the system more publicly live this week and flagged overall complexity as a concern. This bundle was the largest remaining complexity add with the least user-visible payoff.

## ✅ item 5 — Chromatic visual regression — SHIPPED 2026-07-27

**Outcome:** Build 1 captured 502 stories across 73 components in both themes — 1,004 snapshots — and is the accepted baseline. Any future run diffs against it, so a token edit that shifts pixels anywhere in the system finally gets noticed.

**The trigger decision, made deliberately:** the workflow stays **`workflow_dispatch`-only.** A full run costs ~1,004 snapshots against the free tier's 5,000/month — a per-push trigger would exhaust the budget in a single active day (this session alone pushed 8+ times). The ritual instead: **dispatch a run before pushing anything that touches component CSS, `src/tokens/`, or `.storybook/`** — that is where visual regressions live. The `pre-deploy` skill carries this nudge. Upgrade paths if the manual ritual chafes: a path-filtered push trigger (CSS/tokens only), TurboSnap, or a paid tier — revisit after launch week once real spend is known.

**First-run diagnostics worth keeping:** setup failed once with `No app with code '…' found` — that Chromatic error means the token *value* is wrong (a pasted command prefix or whitespace), not that the project is missing. And the predicted chart-animation flake did not appear in Build 1, but a baseline build cannot show diff flake by definition — judge that on run 2.

### What shipped 2026-07-27, in one line each

- **The signature pass** — 18 components went from 4/68 forwarding refs to 18/18, all spreading `...rest` and extending native element props. One breaking change (`onChange` → native `ChangeEvent`, convenience to `onValueChange`) — the thing that unblocks react-hook-form / Formik / TanStack Form.
- **Trusted Publishing** — `NODE_AUTH_TOKEN` gone, npm pinned to ≥ 11.5.1, both credentials deleted, and Publishing access set to *"require 2FA and disallow tokens"*. Took three failed attempts; all three causes are recorded in the `release` skill.
- **Storybook install docs** — Configure.mdx had zero mentions of npm across 331 lines; now has an install section, enforced across *both* install surfaces.
- **`Field`** — component #57; six form controls compose inside it; fixed Dropdown announcing neither its helper text nor its error state, and FileInput never reflecting `aria-invalid`. Neither was visible to axe.
- **a11y to `'error'`** — 49 violations cleared, nine of which were real bugs: keyboard users could not scroll CodeBlock/Dialog/Drawer, icon-only Buttons had no accessible name, and DatePicker claimed a `role="grid"` navigation model it never implemented (200 instances, one fix).
- **Registry metadata** — `slugOf()` (×2), `displayName()`, 57 sidebar labels and 57 page descriptions collapsed into one registry. The new `client` field immediately exposed **16 interactive components still missing `'use client'`** — item 1 had only ever been applied to B1's 18.

### Open items that need Rob, not code

- **Nothing.** npm Publishing access is now *"require 2FA and disallow tokens"*, so the OIDC migration is complete by configuration rather than by circumstance.

### Standing rule adopted this session

After each major step, check whether the change invalidated anything in `.claude/skills/*/SKILL.md`, `CLAUDE.md` or `design.md`, and fix it in the same stretch — **do not wait to be asked.** It has now caught six real drifts, twice catching a skill that broke the instant its workflow changed: the `release` skill's "never bump the version in package.json" (would have blocked the next release outright), and `component-doc-page` prescribing `pageMetadata()` after Phase 1 made `componentPageMetadata()` mandatory. Where the rule is mechanically checkable, prefer converting it to a validator — see [B7](#b7--make-the-component-api-contract-build-enforced--sm--added-2026-07-27) and [item 26](#later--real-unscheduled).

---

**Status keys:** `NOW` this week · `NEXT` the following stretch · `LATER` real but unscheduled · `PARKED` deliberately paused · `REJECTED` decided against, kept so it isn't re-litigated.
**Effort:** `S` < half a day · `M` a day or two · `L` multi-day.

**Contents**
- [NOW — before Aug 3](#now--before-aug-3)
- [Workstream A — Agent-Ready Design System](#workstream-a--agent-ready-design-system) (3 phases, `L`)
- [Workstream B — Component API Foundations](#workstream-b--component-api-foundations)
- [NEXT — the robustness tier](#next--the-robustness-tier)
- [LATER](#later--real-unscheduled)
- [Parked / Rejected](#parked)
- [Sequencing](#sequencing)

---

## NOW — before Aug 3

### ✅ 1. `'use client'` boundary — SHIPPED 2026-07-27 (in the signature pass)

**Outcome:** 17 of the 18 components in scope now declare `'use client'`. `Table` deliberately does **not** — it is purely presentational, so it stays renderable from a Server Component. The problem statement below is kept as the record of *why*.

> **Still open from this item:** the second smoke consumer (a Next App Router app importing a client component from a **server** page) was never built. The directives are correct, but nothing yet *proves* they are — the existing smoke test is a Vite SPA with no RSC boundary. Worth folding into [item 9's](#later--real-unscheduled) smoke-test work, or doing standalone.

**Found:** 2026-07-27 audit

35 components under `src/components/` use React hooks or event handlers. **Zero** files in the library declare `'use client'`. A Next.js App Router consumer who does `import { Button } from '@robr0/design-system'` inside a server component gets a build/runtime error — hooks in a server component, or "event handlers cannot be passed to Client Component props."

Two things hide this today, which is why it survived a release:
- The website has `"use client"` at the top of **85 of its 90 pages**, so it never renders a library component from a server component. It cannot catch this.
- `scripts/smoke-consumer.mjs` builds a **Vite SPA**. No RSC boundary exists there, so it cannot catch it either.

The consumer environment most likely to be used — Next App Router, the same framework this repo's own site runs on — is the one environment never tested.

**Done when:** interactive components carry the directive (per-file, or a build banner in `vite.lib.config.ts` / `scripts/build-package.mjs`), *and* a second smoke consumer builds a minimal Next App Router app importing a client-side component from a **server** page without a directive of its own. Wire it into `verify` alongside the existing smoke test.

**Watch for:** don't blanket-apply the directive. Purely presentational components (Badge, Divider) are better left server-renderable; marking them client-only silently costs consumers RSC benefits. → **The client/server split is per-component data, so it belongs in the registry — see [Workstream A, Phase 1](#phase-1--richer-registry-metadata).** Record the rule in `design.md` too.

### 2. Public API-surface validator — `M` · **still open — do not start before Workstream A Phase 2**
**Scheduled 2026-07-26 for ~07-27**

Publishing turned every props interface into a contract. Because deep imports (`./components/*`) are supported, renaming a component *folder* is breaking even when the barrel still exports the old name — and nothing flags it at edit time. The `release` skill only asks patch/minor/major at release, by which point the break is already written.

**Done when:** a validator in the `validate-registry` chain diffs the current public surface (barrel exports + `./components/*` subpaths + exported prop interfaces) against the last published version on npm, and fails the build on a removed or renamed export unless `PACKAGE_VERSION` in `scripts/package-manifest.mjs` carries a major bump.

> **⚠⚠ Do not ship this before [Workstream B](#workstream-b--component-api-foundations).** This validator's entire job is to *prevent* breaking changes. Ship it while the component API still has closed prop surfaces and Figma-variant leakage, and it freezes those mistakes into the contract. Fix the API shape first; then lock it.

> **⚠ Overlap — do [Workstream A Phase 2](#phase-2--generated-prop-contracts) first.** `props.json` *is* a machine-readable snapshot of the public API surface. With it committed, this validator collapses from "re-derive the surface from npm's shipped types" into "diff the committed `props.json` against the last published `props.json`" — dramatically simpler and more accurate (it catches prop-level breaks, not just export-level ones). Building item 2 standalone first means writing TS-Compiler-API extraction twice.

**Chosen over a skill deliberately:** anything mechanically checkable gets build-enforced so it can never drift.

### ✅ 3. npm Trusted Publishing (OIDC) migration — SHIPPED 2026-07-27

**Outcome:** published 2026-07-27 via OIDC — the real `dry_run=false` run was the first and only auth test, and it passed. The published commit `1129d84` is tagged `v0.2.0`, the GitHub Release documents the `onChange` → `onValueChange` migration, the `NPM_TOKEN` secret and the granular token on npmjs.com are deleted, and CLAUDE.md's release line now reads "0.1.0 shipped 2026-07-26, 0.2.0 on 2026-07-27 (the first release via Trusted Publishing)".

Context that stays relevant: npm deprecates 2FA-bypass tokens for direct publishing in **Jan 2027**, and the retired granular `NPM_TOKEN` had an expiry that would have eventually failed the publish step with a 401 — OIDC removes that failure mode entirely.

**What shipped in-repo:**
- `.github/workflows/release.yml` — `NODE_AUTH_TOKEN` env removed from the publish step; header comment rewritten to document the OIDC contract; added a step pinning npm forward (`npm install -g npm@latest`) because **Trusted Publishing requires npm ≥ 11.5.1 and Node 24 does not ship a new enough npm on every patch** — an older CLI fails the token exchange rather than degrading gracefully.
- `.claude/skills/release/SKILL.md` — the 401/token-rotation guardrail replaced with the four real OIDC failure modes.
- `CLAUDE.md` — release-auth prose updated.

**The registration, recorded for the next package or scope** (the sequence matters — do not delete the secret first):
1. On npmjs.com → the package → Settings → Trusted Publisher → GitHub Actions. Exact values (the GitHub owner is **not** the npm scope — that's the easiest way to get this wrong):

   | Field | Value |
   |---|---|
   | Organization or user | `robritacca-dotcom` |
   | Repository | `design-system` |
   | Workflow filename | `release.yml` |
   | Environment name | *blank* — the workflow uses no GitHub Environment; filling it in makes the OIDC claim mismatch and auth fail |
   | Allowed actions | **`npm publish` only** — the workflow never calls `npm stage publish` |
2. Commit and push the workflow change.
3. Run the Release workflow **for real** (`dry_run=false`). **No throwaway version needed** — npm only consumes a version on a *successful* upload, so if OIDC auth fails nothing is burned and you simply retry. That means the `0.2.0` release carrying the B1 signature pass can double as the proof.
4. Only once that publish is green: delete the `NPM_TOKEN` repo secret.

**Why a real publish is mandatory here:** the dry run runs `npm publish --dry-run`, which never authenticates. It proves the build and the tarball, and tells you *nothing* about whether OIDC works.

**Two things that will silently break this later:** renaming or moving `release.yml` (the trusted-publisher registration is keyed to the filename), and dropping `permissions: id-token: write` (it is load-bearing for *authentication* now, not just provenance).

### ✅ 4. Storybook homepage knows nothing about npm — CHEAP TIER SHIPPED 2026-07-27

**Outcome:** Configure.mdx gained an Install section (install command, `tokens.css` import, barrel import, deep-import and optional-recharts notes) plus links to the docs site and npm, and the intro now names the package. `generate-readme-content.mjs` requires **both** README.md and Configure.mdx to mention `PACKAGE_NAME` — verified by stripping the name and confirming the build fails, not just that it passes.

> **Thorough tier still open:** extracting the shared facts into `src/content/system-facts.ts` consumed by Configure.mdx, the README generator, and Get Started. The name check now guards the package name; it cannot tell whether the *snippet* is still correct.

**Scheduled for ~07-27**

`src/stories/Configure.mdx` has zero mentions of npm / install / `@robr0`; its intro still describes the pre-publish world ("consumed by a live Next.js reference site"). Storybook deploys as its own Vercel project and is where people evaluating the system land — so a visitor who likes a component has **no path to installing it**. (Counts there are already safe; it imports `COMPONENT_COUNT`.)

- **Cheap, do first:** install block (`npm install` + `tokens.css` import + one component import), a clause in the intro, a link to the site's Get Started page. Then extend `scripts/generate-readme-content.mjs`'s package-name check so **both** README.md and Configure.mdx must mention `PACKAGE_NAME` — a scope rename becomes impossible to half-apply.
- **Thorough:** extract the ~40 genuinely shared, drift-prone facts (principles, three-tier token architecture, theming contract, install snippet) into `src/content/system-facts.ts`, imported by Configure.mdx (the import pattern is already proven there), injected into README by its generator, and imported by the website's Get Started page.

---

# Workstream A — Agent-Ready Design System

**Status:** planned 2026-07-26, not started · **Effort:** `L` (three phases, independently shippable) · **Version impact:** additive API → `0.2.0` via the `release` skill.

## Context

Compared to machine-readable design systems like Meta's Astryx, three gaps remain: the component registry is just 56 name strings; there is no machine-readable prop contract generated from the TypeScript; and agents must parse full HTML pages to learn a component. This workstream takes the highest-impact subset — richer registry metadata, generated prop contracts, dense per-component markdown — while keeping the system lightweight.

**Explicitly out of scope: an MCP server, and shipping extra docs in the npm tarball.** Dense `.md` docs served from the website are the chosen shape.

**A major side benefit found during exploration:** per-component labels, slugs, and descriptions are currently duplicated in 4+ places — `slugOf` copied verbatim in two validators, `displayName()` in the README generator, 56 hand-typed sidebar labels in `navigation.ts`, 56 hand-written descriptions in `layout.tsx` files. Phase 1 collapses all of it into the registry.

**Ground rules.** Everything follows the established pattern (see `scripts/generate-token-registry.mjs` / `validate-token-registry.mjs`): generators export pure derivation functions and only run side effects behind an `isMain` guard; validators import the same functions and deep-compare against committed JSON; writes are idempotent (string-compare, write only on change) so CI's `git diff --exit-code` drift guard works. **No new dependencies** — prop extraction uses the TS Compiler API (`typescript ~5.9.3` is already a direct devDep; do **not** rely on the transitive `react-docgen-typescript`).

**Defaults already taken** (flagged as open by planning, resolved with the recommended option): rewrite the 56 layouts to a `componentPageMetadata()` helper (delete the duplicate corpus, don't police it); derive the sidebar from the registry; omit a `status` field until the first non-stable component exists; category placements below are proposals to adjust in review.

---

## ✅ Phase 1 — Richer registry metadata — SHIPPED 2026-07-27

**Outcome:** registry entries are objects carrying `name`, `label`, `slug`, `description`, `category`, `client`. Four duplications collapsed: `slugOf()` (verbatim in two validators), `displayName()` (README generator), 57 sidebar labels, 57 page descriptions. `componentsSidebarLinks` and `componentPageMetadata()` derive from the registry, so the sidebar, sitemap, breadcrumbs, mega-nav and page titles cannot drift — and `validate-website-surfaces.mjs` **dropped** its nav-entry and alphabetical checks rather than updating them, because asserting them would only test that `sort()` works.

**The `client` field paid for itself immediately:** seeding it from reality exposed 16 interactive components with no `'use client'` — item 1 had only ever been applied to B1's 18. The validator now compares the flag against the file, so the registry cannot document a component as server-renderable when it isn't.

Every new metadata check was proven to fail before being trusted (bad slug, lying `client`, duplicate slug, invented category, over-long description), and an unregistered slug was confirmed to fail the website build.

## Phase 1 — original plan (kept for context)

### New `src/components/registry.json` shape

Convert `components` from `string[]` to `object[]`. (A sibling metadata key would be a second 56-entry list that can drift — exactly what this repo's registry architecture exists to prevent.)

```json
{
  "$comment": "SINGLE SOURCE OF TRUTH for the public component list, count, and per-component metadata…",
  "categories": ["actions", "forms", "feedback", "navigation", "layout", "overlays", "data-display", "charts"],
  "components": [
    { "name": "Accordion", "label": "Accordion", "slug": "accordion",
      "description": "…", "category": "data-display" }
  ],
  "docOnlyHelpers": ["ColourSwatch", "MotionSwatch", "SpacingSwatch", "TypographySwatch"]
}
```

- `slug`/`label` are **stored, not derived** — the `Nav → navigation` exception becomes plain data.
- Seed the 56 `description` values mechanically from the 2nd arg of `pageMetadata(...)` in each `website/src/app/components/<slug>/layout.tsx` (one-off scratchpad script, not committed). Labels seed from the current `displayName()` output.
- **Add a `client: boolean` field here too** — see [item 1](#1-use-client-boundary-for-the-published-package--sm--new-highest-severity). The client/server split is per-component data with no other home, the generator can then emit the `'use client'` banner from the registry, and a validator can assert that any component importing React hooks is marked `client: true`. This turns a one-off fix into a permanent invariant.

**Categories** (proposed; confirm the judgment calls in review):

| Category | Count | Components |
|---|---|---|
| actions | 5 | Button, ButtonGroup, CircularButton, SegmentedControl, ToggleGroup |
| forms | 11 | Checkbox, Combobox, DateInput, DatePicker, Dropdown, FileInput, Input, RadioButton, Slider, Textarea, ToggleSwitch |
| feedback | 6 | Alert, EmptyState, ProgressBar, Skeleton, Spinner, Toast |
| navigation | 4 | Breadcrumb, Nav, Pagination, Tabs |
| layout | 4 | AppLayout, AppSidebar, Divider, SectionTitle |
| overlays | 7 | AlertDialog, CommandPalette, Dialog, Drawer, DropdownMenu, Popover, Tooltip |
| data-display | 17 | Accordion, Avatar, Badge, Card, Carousel, Chip, CodeBlock, ContactCard, EntityCard, Figure, Instructions, LinkList, Quote, SelectionCard, Stat, Table, Timeline |
| charts | 2 | Chart, ContributionGraph |

### `src/components/registry.ts` accessor — public API preserved

```ts
export interface ComponentMeta { name; label; slug; description; category }
export const componentMetadata: readonly ComponentMeta[] = registry.components;
export const componentCategories: readonly string[] = registry.categories;
export const componentRegistry: readonly string[] = registry.components.map(c => c.name); // unchanged shape
export const COMPONENT_COUNT = registry.components.length;                                // unchanged
```

All existing consumers use only `COMPONENT_COUNT` (navigation.ts, components/layout.tsx, overview, work/robr0-ds, Configure.mdx, smoke-consumer.mjs) — **zero changes there.**

### Script touches (verified consumers of `registry.components` as strings)

| File | Change |
|---|---|
| `scripts/validate-component-registry.mjs:57` | map to `.name` for the folder check; **add** metadata validation: alphabetical by name, slug/label unique, slug kebab-case, description non-empty ≤160 chars ending in `.`, category ∈ `registry.categories` |
| `scripts/generate-library-barrel.mjs:38` | iterate `{ name }` |
| `scripts/validate-website-surfaces.mjs:60` | iterate `{ name, slug }`; **delete** the local `slugOf`/`SLUG_EXCEPTIONS` (lines 31–35) |
| `scripts/validate-page-titles.mjs:46` | same; delete duplicated `slugOf` (lines 35–39) |
| `scripts/generate-readme-content.mjs:70` | use `c.label`; delete `displayName()` |
| `scripts/build-package.mjs` | no change (copies the file verbatim) |

### Absorb website duplication (the payoff)

1. **Sidebar derives from registry** — replace the 56 hand-typed entries in `website/src/config/navigation.ts` `componentsSidebarLinks` with a map over `componentMetadata` (already imported there for `COMPONENT_COUNT`), sorted by label. Sitemap, mega-nav, breadcrumbs, and llms.txt already derive from this config, so they follow automatically. Then in `validate-website-surfaces.mjs` drop checks 2 (nav entry) and 4 (alphabetical order) — now structurally guaranteed; keep 1 (page exists), 3 (TocCard), 5 (design.md spec). Update its header comment.
2. **Page descriptions single-sourced** — add `componentPageMetadata(slug)` next to `pageMetadata` in navigation.ts (looks up label + description from `componentMetadata`); mechanically rewrite all 56 `layout.tsx` files to `export const metadata = componentPageMetadata("<slug>");`. Update `validate-page-titles.mjs` to require `componentPageMetadata(` on component pages.
3. **Cheap win (include):** pass `description` into the derived component `NavLink`s so the Sidebar's existing `searchable` filter can match description text.

### Prose/docs updates (same change — CLAUDE.md convention)

- `CLAUDE.md`: Registries table row for Components; "How to Add a New Component" step 6 (registry entry is now an object with metadata; the sidebar-nav bullet goes away) + the checklist.
- Skills referencing the flow: `.claude/skills/new-component/SKILL.md`, `.claude/skills/component-doc-page/SKILL.md`, `.claude/skills/merge-and-push/SKILL.md`.
- README markers regenerate identically (labels == old `displayName()` output).

---

## Phase 2 — Generated prop contracts

### New shared helper: `scripts/lib/component-modules.mjs`

Extract the folder→modules enumeration (non-story `.tsx` per registry folder, sorted, fail on empty) plus `importsRecharts()` from `generate-library-barrel.mjs:38-49`; refactor the barrel generator to import it. Needed because `Chart/` is one registry entry but **9 modules**.

### New: `scripts/generate-prop-contracts.mjs` → writes `src/components/props.json`

TS Compiler API, following the token-registry pattern (pure exported functions, `isMain` guard, idempotent write, throw on unhandled input):

1. `ts.getParsedCommandLineOfConfigFile('tsconfig.app.json', …)` → `ts.createProgram` over all public component modules.
2. Per module, walk `checker.getExportsOfModule(...)`.
3. **Component detection:** exported function/const whose call signature's single parameter is a named `*Props` type. Handles the known irregulars: `RadioGroup` (`RadioGroupProps`, not `RadioButtonGroupProps`), `CheckboxGroup`, `Toast` + `ToastProvider` (`ToastProps` at line 285), the 9 chart components, `Timeline` (props type is a union alias).
4. **Serialize every exported interface/type alias** (non-exported internals like BarChart's tooltip interfaces are excluded automatically):
   - interfaces → `kind: "object"`, members `{ name, type (checker.typeToString with NoTruncation), required, description (JSDoc), deprecated (@deprecated tag — Button's `icon` is the live example), default (@default tag or simple destructuring initializer, else omit) }`
   - union aliases (`TimelineProps`, `DropdownMenuEntry`) → `kind: "union", types: [names]`
5. **Fail loudly** when a public folder yields zero component exports, or a props type isn't exported.
6. **Deterministic:** registry order, module order, source member order. Record the `typescript` version in the JSON header — `typeToString` output can shift across TS minors, and the drift guard then makes regeneration visible in the same PR as the upgrade.

JSON shape per component: `{ modules: [{ module, importPath, chartsOnly, components: [{name, propsType}], types: {…} }] }`. `chartsOnly` (from `importsRecharts`) tells agents the module needs the optional recharts peer.

### Wiring

- `scripts/validate-prop-contracts.mjs` — re-derive + deep-compare (validate-token-registry pattern).
- `src/components/props.ts` — typed accessor (`componentPropContracts` + hand-written `PropContract`/`PropMember` types). **Not** in the main barrel — subpath-only.
- Root `package.json` `validate-registry` chain: `generate-prop-contracts` after `generate-library-barrel`; `validate-prop-contracts` before `validate-package-exports`.
- **Package plumbing — all four spots** (the assets array is the silent-omission trap):
  1. `scripts/package-manifest.mjs` SUBPATHS: `{ key: './components/props', srcJs: './src/components/props.ts', dist: './components/props' }`
  2. Root `package.json` `exports`: paste updated `sourceExports()` output (validator enforces exact match)
  3. `vite.lib.config.ts` `lib.entry`: `'components/props': 'src/components/props.ts'`
  4. `scripts/build-package.mjs:43-48` assets array: add `src/components/props.json`
- `scripts/smoke-consumer.mjs`: import `componentPropContracts` + `componentMetadata` in the scaffolded consumer app.
- `CLAUDE.md` Registries table: new row for prop contracts.

---

## Phase 3 — Dense per-component markdown + llms.txt

### New: `scripts/generate-component-docs.mjs` → `website/public/components/<slug>.md` (56 files, committed)

Precedent: `website/public/CLAUDE.md` / `design.md` are git-tracked generated copies served statically. No route conflict with the 56 `app/components/<slug>/page.tsx` folders (the `.md` extension differs). The generator also deletes stale `.md` files for removed or renamed components.

Per-file composition — all from existing sources, nothing new to author:
1. `# <label>` + registry description + category.
2. Import block: deep subpath(s) from props.json `importPath`, with a recharts note when `chartsOnly`.
3. Design spec: the component's `###` section body from `design.md` — matched with the same normalization as `validate-website-surfaces.mjs:48-53` (shared headings `Input / Textarea` and `AppLayout / AppSidebar` serve both; `Contribution graph` normalizes). Hard-fail on a miss (the validator already guarantees presence).
4. Props tables per component export (Name / Type / Required / Default / Description), deprecated flagged, unions expanded.
5. Links: live showcase page, `/llms.txt`.

Wire into the root `validate-registry` (after generate-prop-contracts) **and** `website/package.json`'s `prebuild`/`predev` lists (add `generate-prop-contracts` there too — the docs depend on it).

### `website/src/app/llms.txt/route.ts` upgrade

- Components section from `componentMetadata` instead of the generic nav `section()`:
  `- [<label>](…/components/<slug>): <description> ([props + spec](…/components/<slug>.md))`
- Also sync `registry.json` + `props.json` into `website/public/` (fold into the docs generator) and link them under "Optional" as machine-readable indexes — web-only agents get contracts without an npm install.
- No sitemap change (`.md` files aren't pages).

---

## Workstream A verification

1. `npm run validate-registry` **twice** — the second run prints all "up to date" (idempotency; required for the CI drift guard).
2. `npm run validate-registry && git diff --exit-code` after committing first-run outputs (`props.json`, `props.ts`, 56 `.md`, regenerated README/barrels) — the drift guard only sees tracked files.
3. `npm run verify` — full CI mirror.
4. `npm run build:lib && node scripts/smoke-consumer.mjs` — exercises the new `/components/props` subpath and metadata from the packed tarball, without recharts.
5. Manual: website dev server → `/llms.txt`, `/components/button.md`; sidebar order/labels unchanged after derivation.
6. Contract spot-checks: Timeline (union), Toast (two components, `ToastContextValue` as a plain type), RadioButton (`RadioGroupProps`), one Chart module (`chartsOnly: true`, internals absent), Button (`icon` deprecated).

## Workstream A — explicitly deferred

- **MCP server** — opted out; dense endpoints + package subpaths cover the need.
- **Shipping design.md / dense docs inside the npm tarball** — opted out; one-line `copyFileSync` in build-package.mjs if wanted later.
- **`status` field on registry entries** — add when the first beta/deprecated component exists.
- **Validating design.md prose claims against contracts** — possible later, now that contracts exist.
- Version bump / publish happens separately via the `release` skill.

---

# Workstream B — Component API Foundations

**Status:** added 2026-07-27 after an architecture review · **Effort:** `M`/`L` · **Version impact:** entirely additive if done as deprecate-don't-delete → `0.2.0`.

## Why this exists

The rigor in this repo is concentrated in the **meta-layer** — registries, generators, validators, drift guards. That layer is genuinely stronger than most enterprise design systems. The **component API layer** — the actual surface a consumer touches — has not had the same rigor applied, and every item in Workstream A makes the meta-layer better still. Generating a beautiful machine-readable contract for an API that can't forward a ref just documents the problem in higher fidelity.

**This workstream comes before Workstream A Phase 2 and before item 2.** Every day the API stays as-is, it's closer to being a contract that can't be changed.

Evidence from the 2026-07-27 audit (68 implementation files):

| Check | Result |
|---|---|
| Extend native HTML attribute types | **0 / 68** |
| Forward a `ref` | **4 / 68** |
| Spread `...rest` onto the DOM node | **10 / 68** |
| Accept an `id` | **9 / 68** |
| Accept a `className` | 68 / 68 ✅ |
| Wire `aria-describedby` | 11 / 68 |

## ✅ B1 / B2 / B5 / item 1 — SHIPPED 2026-07-27

The signature pass is done across **18 components**: Button, Input, Textarea, Slider, ToggleSwitch, Checkbox (+Group), RadioButton (+Group), DateInput, ToggleGroup, SelectionCard, Card, FileInput, Dropdown, Dialog, Drawer, Table, DatePicker, Combobox.

| Check | Before | After |
|---|---|---|
| `'use client'` | 0 / 68 | **17 / 18** in scope (Table deliberately excluded — presentational, stays server-renderable) |
| `forwardRef` | 4 / 68 | **18 / 18** |
| `...rest` spread | 10 / 68 | **18 / 18** |

`npm run verify` exits **0** — lint, tsc, lib build, 495 story tests, Storybook build, website lint, website build.

**Conventions that settled:**
- Convenience callbacks are named for the value's shape, leaving `onChange` free for the native signature: `onValueChange` (string/number), `onCheckedChange` (boolean), `onValuesChange` (array).
- Deprecated props are kept working, never removed. `variant` supersedes `priority`; `disabled` supersedes `state`; `aria-label` supersedes `ariaLabel`.
- Props that would be invalid on the rendered DOM node (e.g. `name` on a `<div role="radio">`) are destructured and discarded rather than spread; `^_` marks the discard (see the ESLint rule added in `eslint.config.js`).
- `className` stays on the wrapper wherever it already was — moving it would be a silent visual break.
- Portal components (Dialog, Drawer) forward the ref to the **panel**, not the portal container.

**The one non-additive change:** `Input`/`Textarea`/`Slider`/`DateInput` `onChange` now carries the native `ChangeEvent` signature. Cost: 7 call sites in this repo, all migrated to `onValueChange`. This is what unblocks react-hook-form / Formik / TanStack Form. Ships as `0.2.0`.

**Known collisions, documented in JSDoc rather than renamed:** `Input.size` / `Slider.size` / `DateInput.size` / `FileInput.size` shadow the native character-width `size`; `Card.title` / `Dialog.title` / `Drawer.title` shadow the native `title` tooltip.

**Follow-up worth its own commit:** six components now carry a byte-identical ref-merge block (FileInput, Dropdown, Dialog, Drawer, Combobox, plus the pattern in Checkbox/Radio). Extract a `useMergedRef` helper.

**Still open in Workstream B:** [B3](#b3--a-field-primitive-for-form-composition--m), [B4](#b4--children-for-content-props-for-configuration--ml), [B6](#b6--composition-escape-hatch-aschild-or-as--sm).

---

## B1 — Escape hatches: refs, rest props, native attributes — `M` · **highest value**

Closed prop surfaces mean a consumer cannot attach a ref, pass `data-testid`, set `autoComplete` / `inputMode` / `maxLength` / `pattern`, add an `onKeyDown`, or hand the component to a form library. `Input.onChange` is `(value: string) => void` — not React's `ChangeEvent` — so **react-hook-form, Formik, and TanStack Form cannot register an Input without an adapter.** For form-dense products this is the difference between a library that can be adopted and one that can only be demoed.

**Done when**, for at least the top ~15 consumer-facing components (all form controls, Button, Card, Dialog, Drawer, Table):
- props extend `React.ComponentPropsWithoutRef<'element'>` (with the custom props `Omit`ed where they collide)
- the component is a `forwardRef` (or takes React 19's `ref` prop) onto its primary DOM node
- `...rest` spreads onto that node
- event handlers use native React signatures; where a convenience signature is genuinely better, keep it under a differently-named prop rather than shadowing the standard one

**Additive.** Nothing existing breaks.

## B2 — Retire Figma variants from the code API — `S` · **most diagnostic**

`ButtonProps` currently has:
```ts
state?: 'default' | 'hover' | 'active' | 'disabled';
text?: boolean;   // "show text label"
```
In Figma, `state` *must* be a variant property — you have to draw each one. In code, `hover` and `active` belong to the browser (`:hover`, `:active`), and `disabled` is a native attribute with real semantics for form submission and assistive tech. Conflating all three means hover has two sources of truth, a consumer can pin a button into a permanent fake hover, and the one genuinely semantic value is buried in an enum beside two cosmetic ones. `text?: boolean` is the same tell — in code you omit the label.

This is the clearest "designed-in-Figma-then-translated" artifact in the codebase and the exact class of thing an enterprise design-system review flags on day one.

**Done when:** `disabled?: boolean` is the real prop, `state` is `@deprecated` and mapped internally, `text` is deprecated in favour of omitting `label`, and a note in `design.md` records the rule: *Figma variant properties describe how a component is drawn; code props describe what it is. Pseudo-states never become props.*

## ✅ B3 — A `Field` primitive for form composition — SHIPPED 2026-07-27

`Field` (component #57) owns the label + `htmlFor`, required marker, helper/error text, generated ids, and `aria-describedby` / `aria-invalid` wiring, and exposes `{controlId, labelId, describedBy, invalid, required, disabled}` through `useField()`. All six labelled form controls compose inside it: Input, Textarea, DateInput, Dropdown, Combobox, FileInput. **Net −160 lines.**

**Two live accessibility bugs fixed**, both found by the survey rather than by axe:
- **Dropdown** rendered `helperText` and an `error` state with **no `aria-describedby` and no `aria-invalid`** — the message was never announced and the error was visual only.
- **FileInput** exposed an `error` prop it never reflected in `aria-invalid`.

**Design choice that de-risked it:** Field owns **no layout**. The flex column and gap stay on each component's own root class, so adopting it moves nothing on screen. Confirmed the label/helper CSS was byte-identical across all six before extracting.

**Two things Field grew to absorb real structure** instead of forcing components to compromise: `aside` (content opposite the helper — Textarea's character counter — rendered in a footer row *only* when supplied, so no other adopter gains a wrapper), and `labelId` (because `htmlFor` only associates with *labelable* elements; a `div[role="combobox"]` needs `aria-labelledby`).

**Note for the next refactor of this shape:** removing CSS with unanchored regex corrupted a compound selector (`.ds-textarea--error .ds-textarea__helper` matched by a bare `.ds-textarea__helper` pattern, leaving a dangling selector that merged with the next rule). CSS does not fail a build on a mangled selector, so `verify` would not have caught it. Use line-anchored exact-selector matching and check brace balance per file.

## B3 — original plan (kept for context) — `M`

Label, required marker, helper text, error text, id generation, and `aria-describedby` wiring are reimplemented independently in every form component (only 11 of 68 files wire `aria-describedby` at all). That means accessibility correctness is per-component rather than systemic.

**Do this before [item 6](#6-flip-a11y-from-report-only-to-failing--m).** Flipping a11y to `'error'` without it means fixing the same label/description bug eleven times; with it, one fix propagates.

**Done when:** a `Field` component owns label / description / error / generated ids / aria wiring, and the form controls compose inside it rather than each re-implementing it.

## B4 — `children` for content, props for configuration — `M`/`L`

Content props outnumber `children` **207 `label` + 191 `title` to 46 `children`**. A string-label API means a consumer cannot bold one word in a button, put a link inside an Alert description, or arrange an icon between two words — so every new content need becomes a new prop. That is why `ButtonProps` already carries `label`, `text`, `iconLeft`, `iconRight`, and a deprecated `icon`.

Not a rewrite. Adopt the rule for **new** components immediately, and migrate the top offenders additively (accept `children`, keep `label` working, mark it deprecated).

## B5 — One word per concept — `S`

`variant` (74) vs `kind` (7) vs `priority` (3) vs `status` (13) all name "which visual treatment." `size` (103) is already consistent — good. Pick one (`variant` wins on usage), alias the others with deprecations. The existing `api-consistency` skill is exactly the tool for this; it should be run and its findings enforced, not just reported.

## B7 — Make the component API contract build-enforced — `S`/`M` · **added 2026-07-27**

After the B1 pass, the contract lives in prose: the `new-component` skill and CLAUDE.md's Component Anatomy. That is exactly the kind of drift this repo refuses to tolerate everywhere else — *"if the drifting fact is mechanically checkable, route it through a validator so it can never drift again."* Every clause of the contract is mechanically checkable:

- Every public component in `registry.json` exports a `forwardRef` component with a matching `displayName`.
- Every component whose module imports a React hook or declares an event handler has `'use client'` on line 1 — and every component that does **not** is flagged if it has the directive anyway (the Table case: a needless directive silently costs consumers RSC rendering).
- No props interface declares a value-shaped `onChange` (`onChange?: (value` / `(checked` / `(values`) — the pattern that breaks form libraries.
- Every exported props interface extends `ComponentPropsWithoutRef`, so native attributes always pass through.

A `scripts/validate-component-api.mjs` in the `validate-registry` chain turns a convention people have to remember into one the build refuses to let them break. **Pairs naturally with [Workstream A Phase 2](#phase-2--generated-prop-contracts)** — once `props.json` exists, most of these become assertions over that file rather than fresh AST work, so sequencing B7 after A-Phase 2 makes it a much smaller job.

## B6 — Composition escape hatch: `asChild` or `as` — `S`/`M`

`Button` with `href` renders a raw `<a>`. A Next.js consumer therefore cannot make a Button perform client-side navigation — they'd get a full page load. (The website itself doesn't hit this: zero internal `<Button href="/…">` usages. It is a *consumer* limitation, not a live site bug.)

**Done when:** interactive components accept `asChild` (render-as-child, the Radix pattern) or a polymorphic `as`, so `<Button asChild><Link href="/x">…</Link></Button>` works.

---

## NEXT — the robustness tier

Approved 2026-07-21 as phases 3–5 of the robustness roadmap, still open. Phases 1 (CI) and 2 (story render tests) shipped.

### ✅ 5. Visual regression via Chromatic — SHIPPED 2026-07-27

**Outcome:** see the full record at the top of this file — Build 1 baseline, 1,004 snapshots across both themes, `workflow_dispatch`-only by deliberate budget decision. The paragraphs below are the original rationale, kept for context; their claims about missing tokens/workflows describe the pre-ship state.

`@chromatic-com/storybook` is **already a devDependency** — it ships with Storybook — but there is no project token, no `chromatic.config.json`, and no workflow. Today: zero pixel coverage. Story render tests prove a component *doesn't throw*; they say nothing about it looking right. Every CSS change to a shared token is currently unverifiable except by eye.

This is the highest-leverage remaining test investment, because this system's whole thesis is a **shared token layer** — one edit to `tokens-light.css` touches all 56 components at once, and that is exactly the blast radius no current check covers.

**Done when:** Chromatic project created (free tier), `CHROMATIC_PROJECT_TOKEN` added as a repo secret, a `chromatic` job added to `ci.yml`, snapshots captured in **both light and dark** via Storybook modes (`@storybook/addon-themes` is already installed), and a baseline accepted on `main`.

**Watch for:**
- **Snapshot budget** — 56 components × many stories × 2 themes burns the free tier fast. Snapshot a curated subset, or restrict modes to components whose CSS actually branches on theme.
- **Chart flake** — Recharts animates on mount. Disable animation in chart stories or every run produces a false diff.
- **Font FOUT** — Storybook loads Nunito Sans via a Google Fonts `<link>`; a slow fetch in CI reads as a diff. Chromatic's font-loading delay exists for exactly this.
- Per the recharts hidden-pane note, chart DOM checks are unreliable in a hidden pane — visual snapshots are actually the *better* tool there, so prioritise chart stories once flake is handled.

### ✅ 6. Flip a11y from report-only to failing — SHIPPED 2026-07-27

**Outcome:** `a11y.test` is `'error'`; all 49 violations fixed; 502/502 stories pass with axe enforcing WCAG 2.1 AA minus contrast. An a11y regression now fails CI.

**Nine were real component bugs, not lint noise:**
- **DatePicker** claimed `role="grid"` — promising 2D arrow-key navigation it never implemented — with `gridcell`/`columnheader` that had no `row` parent. Replaced with a labelled group of buttons; selection moved into the accessible name, `aria-current="date"` marks today. **200 instances, one fix.**
- **Button** icon-only variants (`text={false}`) had **no accessible name at all** — falls back to `label` now.
- **DropdownMenu / Popover** wrapped a consumer's `<Button>` in `role="button" tabIndex=0`, nesting one control inside another. Now the popover semantics are cloned onto the real control; a synthesised button is used only when there is nothing valid to clone onto. Working *because* the B1 pass made every component spread `...rest`.
- **FileInput** nested its `<input type="file">` inside the `role="button"` dropzone, and its label-less story left the real control unnamed.
- **CodeBlock / Dialog / Drawer** had scrollable regions with no tab stop — **a keyboard user could not scroll them.** Dialog and Drawer's initial-focus query now prefers a real control so the new tab stop does not steal focus.
- **Avatar** put `aria-label` on a role-less `<span>` (prohibited); **ProgressBar** had an optional name on a `role="progressbar"`; **Popover**'s `role="dialog"` panel had none; **Accordion** made every panel a landmark (the APG advises against this with many panels); **Breadcrumb** hardcoded one landmark name so two on a page were indistinguishable; **Table** rendered empty `<th>` cells.

**One legitimate disable:** `heading-order` on the Typography *foundations doc* story, which deliberately demonstrates every heading level. Scoped to that story with a stated reason.

**Two regressions I caused and caught:** `tabIndex` on CodeBlock's `<pre>` inside an `aria-hidden` panel (now `-1` while collapsed), and cloning `aria-expanded` onto a `<span>` in Popover (now gated on whether the element can legally carry it).

**Still true:** axe catches roughly a third of WCAG issues. Meaningful alt text, sensible focus order, and whether a Dialog *actually* traps focus remain human judgment — which is what [item 7](#7-interaction-tests-play-functions--m) is for.

`.storybook/preview.ts` has `a11y.test: 'todo'`. Axe runs on every story and reports, but nothing fails, so violations accumulate unmeasured.

### Target — decided 2026-07-27

**WCAG 2.1 Level AA, minus the contrast criteria (1.4.3 Contrast Minimum, 1.4.11 Non-text Contrast).** Contrast is deferred to [item 23](#23-action-colour-contrast--the-deferred-aa-criteria--m--design-decision), where it gets treated as the design change it is.

The reasoning: contrast is the *only* part of AA that moves pixels. Everything else in scope — programmatic labels, semantic structure, keyboard operability, focus order, name/role/value, status messages — is invisible DOM work with zero visual risk. Deferring contrast costs nothing except contrast; targeting Level A instead would have thrown away the free half of AA for no benefit (Level A has no contrast requirement at all, so it would not have made this any cheaper).

This is a stronger and more honest public position than "Level A": *AA, with one documented contrast deviation and a plan.*

**Config** — `.storybook/preview.ts`:

```ts
a11y: {
  test: 'error',
  config: {
    // WCAG 1.4.3 deferred pending the action-colour decision — see ROADMAP item 23.
    rules: [{ id: 'color-contrast', enabled: false }],
  },
}
```

One line to delete when item 23 lands. Do **not** reach for `runOnly: {type: 'tag', values: ['wcag2a', ...]}` — that drops the non-contrast AA rules too, which is the opposite of the intent.

**Done when:** violations triaged, genuine ones fixed, unfixable ones documented with a per-story disable and a recorded reason, `test` flipped to `'error'` with `color-contrast` disabled as above.

**Do this before Chromatic, not after** — a11y fixes change the DOM and often the pixels, which would invalidate a freshly-accepted visual baseline.

### The actual violation list — measured 2026-07-27

Full axe run with `color-contrast` disabled: **49 failing stories out of 495 (~90% already clean), across 12 components.** Every violation is invisible to fix — not one requires a visual change, which confirms the AA-minus-contrast scoping.

| Rule | Instances | Components | Fix |
|---|---:|---|---|
| `aria-required-parent` + `aria-required-children` | **200** | DatePicker | One structural fix — calendar cells carry a role whose required parent role is missing. 200 instances because it's ~35 day cells × several stories. **Highest leverage single fix in the list.** |
| `aria-prohibited-attr` | 17 | Avatar | `aria-label` on an element whose role doesn't permit it |
| `nested-interactive` | 13 | DropdownMenu, FileInput, Popover | Interactive element nested inside another. **Real keyboard harm, not just metadata** — prioritise |
| `aria-progressbar-name` | 7 | ProgressBar | `role="progressbar"` with no accessible name. Trivial |
| `landmark-unique` | 4 | Accordion, Breadcrumb | Two same-type landmarks with no distinguishing label |
| `button-name` | 4 | Avatar | Interactive avatar with no accessible name |
| `heading-order` | 3 | Typography (`src/stories/`) | A foundation **docs** story that deliberately demonstrates every heading level — legitimate per-story disable candidate, not a product bug |
| `scrollable-region-focusable` | 2 | CodeBlock, Dialog | Scrollable region needs `tabindex="0"`. **Real keyboard harm** — a keyboard user currently cannot scroll these |
| `aria-allowed-attr`, `aria-dialog-name` | 2 | Popover | `role="dialog"` with no accessible name |
| `label` | 1 | FileInput | Input with no associated label |
| `empty-table-header` | 1 | Table | Empty `<th>` (checkbox/actions column) needs visually-hidden text |

Failing stories by component: FileInput 9, Popover 8, DatePicker 7, DropdownMenu 7, Avatar 6, ProgressBar 4, Typography 3, then Accordion / Breadcrumb / CodeBlock / Dialog / Table at 1 each.

**Correction to an earlier assumption:** the API audit suggested widespread label-association failures across the form components. Axe found exactly **one** (`FileInput`). Input, Textarea, Checkbox, Dropdown and the rest wire their labels correctly today. [B3](#b3--a-field-primitive-for-form-composition--m) is still worth building — for consistency and for helper-text/error `aria-describedby` association, which axe has no rule for and therefore cannot see — but it is **not** a prerequisite for clearing this list. The B3-before-item-6 ordering is now a preference, not a dependency.

**Axe catches roughly a third of WCAG issues — passing it is not conformance.** Whether alt text is *meaningful*, whether focus order is sensible, whether a Dialog actually traps focus: all human judgment. That is why [item 7](#7-interaction-tests-play-functions--m) does real accessibility work despite not being labelled as such.

**Current state:** done — all 49 violations fixed and `test` flipped to `'error'` in `.storybook/preview.ts` on 2026-07-27; `color-contrast` stays disabled by design (item 23). Axe now gates CI.

### 7. Interaction tests (play functions) — `M`

There are **zero** play functions in the library. (A first pass during the 07-27 audit suggested 33 story files had them — that was a naive `grep "play:"` matching `display:` in inline styles. 18 story files do import `fn()` from `storybook/test` for arg spies, which is not interaction testing.)

The render tests prove ~488 stories mount. Nothing proves a Dialog traps focus, a Combobox filters, a Drawer closes on Escape, or a Tooltip appears on hover.

**Done when:** play functions cover the stateful components — Dialog, AlertDialog, Drawer, Combobox, CommandPalette, Toast, Tooltip, Pagination, SegmentedControl — asserting open/close, keyboard nav, focus trap and return, Escape handling.

---

## LATER — real, unscheduled

### Package & release hygiene

**8. No CHANGELOG.md — `S`.** A published package with no changelog; a consumer upgrading has no way to know what changed. Should be generated, not hand-written: `PACKAGE_VERSION` already owns the version, so a generator + validator pairing is the on-pattern fix — and it composes with [item 2](#2-public-api-surface-validator--m), which will already know what changed.

**9. No bundle-size budget — `S`.** `scripts/smoke-consumer.mjs` builds a consumer app but never inspects output size. A dependency or heavy import could double the package's cost invisibly. A size assertion in the existing smoke test is nearly free, and it keeps "the main barrel must never force a bundler to resolve recharts" honest over time.

**10. No dependency automation — `S`.** No `dependabot.yml`, no Renovate. With item 11, security drift is entirely manual.

**11. 11 high-severity dev-tooling advisories — `M` · investigated 2026-07-27.** All eleven are one root cause: `brace-expansion` DoS (GHSA-mh99-v99m-4gvg, range `<=5.0.7`) reached through minimatch in the eslint and vite-plugin-dts chains. Tested and ruled out: `npm audit fix` changes nothing, and a root `overrides` pin to `^5.0.8` (the only patched release — no 1.x/2.x backport exists) breaks eslint at runtime (`expand is not a function`; brace-expansion 5 changed its export shape, minimatch@3 requires the old one). The only real fixes are the semver-major eslint 10 upgrade or waiting for upstream backports/minimatch bumps. Dev-only — the published package has zero runtime deps affected — so accepted for now; re-check on the next eslint major or when `npm audit` output changes.

**12. No Node version pinning — `S`.** No `engines` field, no `.nvmrc`. CI runs Node 24; a contributor on an older Node gets a confusing failure instead of a clear one.

**13. No CONTRIBUTING.md — `S`.** Low value while solo; real value as a portfolio artifact and as practice for the contribution model any enterprise DS lives or dies by.

**14. No coverage reporting — `S`.** `@vitest/coverage-v8` is installed but no script uses it. Coverage is a weak signal for a component library (render tests inflate it), so this is genuinely optional — noted so the unused dependency isn't mistaken for an oversight.

### Design system substance

**15. `Table` has no sorting, selection, or row-expansion props — `L`.** Flagged in the Astryx gap analysis as *arguably higher impact than any new component*, being an enhancement to something already used rather than a new registry entry. Especially relevant to payroll/HR-shaped products, which are mostly dense tables.

**16. Remaining component gaps — `M` each.** Re-ranked 2026-07-27 against the Radix Themes playground (Kbd and ContextMenu shipped that day, plus the Button/CircularButton `loading` state): DataList, HoverCard, inline Code, ScrollArea, then the Astryx leftovers Stepper/Wizard, NumberInput, AvatarGroup, Toolbar. Honorable mentions: StatusDot, DateRangeInput, TreeList, VisuallyHidden. Deliberate skips (recorded so they aren't re-proposed): AspectRatio, Inset, typography primitives, ghost/soft variant families.

**17. JS-driven motion timings still hardcoded — `S`.** CSS motion is fully tokenized (`--motion-*`, passes 1+2 done 2026-07-23), but Tooltip delays, Toast auto-dismiss, and Carousel autoplay remain TS constants. The remaining pass exports durations from a TS module reading the same scale, so the two can't diverge. (The `.animate-in` reduced-motion rule is **not** redundant — keep it.)

**18. No `--chart-series-{n}` token set — `M`.** Ordered chart series colours have no formal token set, so a chart author picks by hand. The last unsystematised corner of the colour system.

**23. Action-colour contrast — the deferred AA criteria — `M` · design decision.**
Split out of [item 6](#6-flip-a11y-from-report-only-to-failing--m) on 2026-07-27 because it is the only part of AA that changes how the site looks, and it deserves unhurried iteration rather than being rushed under a red build.

Measured 2026-07-27, light theme:

| Pair | Ratio | |
|---|---|---|
| Primary CTA label — `#CFEAF3` on `#118AB2` | **3.15** | ❌ fails AA |
| Teal as text on white — `#118AB2` on `#FFF` | **3.96** | ❌ fails AA |
| Tertiary text on tertiary container — `#6D6D6D` on `#BCBCBC` | **2.72** | ❌ fails outright |
| Body / secondary / tertiary text on white | 20.4 / 13.2 / 5.2 | ✅ |
| All five status variants | 10.7–16.1 | ✅ |
| CTA label on `teal-08` (current hover) | 4.59 | ✅ |

Button labels are 16px/500 — normal text, so there is no large-text exemption at 3:1. **Even pure white on `#118AB2` is 3.96**, so recolouring the label cannot reach AA; the fill has to darken. Dark mode uses the same `teal-07`/`teal-02` pair and fails identically.

**Focus rings are unaffected** — non-text contrast needs only 3:1, and `#118AB2` on white is 3.96. The focus-ring use of the action colour passes as-is.

Options when this comes up:
1. **Shift the button ramp one step** — `bg: teal-08 (#0E6E8F)`, hover `teal-09`, active `teal-10` (all four primitives already exist). Label reaches 4.59. **Cost:** a visibly deeper CTA, and `#118AB2` is named as *the* action colour in `design.md` and `CLAUDE.md` — updating that prose is part of the change.
2. **Keep `#118AB2` permanently, document the deviation** — the button *shape* passes the 3:1 UI-component bar; only the label fails. This is the status quo made explicit rather than temporary.
3. **Cheap partial, independent of the above:** label `#CFEAF3` → white takes 3.15 → 3.96. Short of AA but a strict improvement and visually near-imperceptible. Worth doing whenever, under any option.

The tertiary-on-tertiary failure (2.72) has no design tension — straight fix, and likely a rare combination. It could ship with item 6 rather than waiting.

**Sequence before [item 5](#5-visual-regression-via-chromatic--m--requested-2026-07-27) if possible** — darkening the teal after visual baselines are accepted means re-accepting every snapshot containing a button.

*Scope: 13 hand-picked pairs, light theme only. Axe evaluates the combinations that actually render, so expect pairs not listed here once `color-contrast` is re-enabled.*

**25. Staged publishing — make a botched release recoverable — `S` · noted 2026-07-27.**
The `release` skill opens by saying this is the one workflow where a mistake is permanent: npm never lets a version number be reused, so a bad publish burns it forever. npm's **staged publishing** directly addresses that — `npm stage publish` uploads the version to a holding area where it can be inspected and then promoted or **discarded**, instead of going straight live.

Turning it on means: tick `Allow npm stage publish` on the trusted-publisher registration (currently `npm publish` only — deliberately, since the workflow doesn't use it), swap the publish step, and add a promote step plus a decision point. The `release` skill's step 5 would gain an inspect-then-promote beat.

Worth doing before any release that changes the public API, which is exactly the shape of `0.2.0`. Deferred out of [item 3](#3-npm-trusted-publishing-oidc-migration--s--code-done-2026-07-27-blocked-on-rob) to keep the OIDC migration a single-variable change — proving OIDC and changing the publish command at the same time would make a failure ambiguous.

**24. Checkbox and RadioButton are divs, not native inputs — `M` · found 2026-07-27 during the B1 pass.**
Both render `<div role="checkbox">` / `<div role="radio">` with hand-rolled click and keydown handlers rather than `<input type="checkbox">` / `<input type="radio">`. Consequences:
- They cannot participate in **native form submission** — a plain `<form>` will not include their values.
- Form libraries cannot register them the standard way; `onCheckedChange` / `onValueChange` is the only integration path.
- `RadioButton` declared a `name` prop that was **never destructured**, so `RadioGroup` passing `name={name}` silently discarded it. Radio grouping by name has never worked; grouping happens purely through React state in `RadioGroup`. `name` is now explicitly marked `@deprecated` and no-op rather than quietly ignored.

The fix is a visually-identical swap to a visually-hidden native input paired with the existing styled box (the standard pattern), which also gets keyboard behaviour, form participation, and `:checked` styling for free. Deferred out of the B1 pass because it changes DOM structure and therefore needs its own visual check.

**26. Validate that skills reference real APIs and scripts — `S` · added 2026-07-27.**
Two consecutive drift audits caught a skill that broke the moment its workflow changed, and both were mechanically checkable:
- the `release` skill said "never bump the version in `package.json`" while `validate-package-exports.mjs` required it — would have blocked the next release at the first validation step;
- `component-doc-page` prescribed `pageMetadata("/components/<slug>", "…")` after Phase 1 made `componentPageMetadata("<slug>")` mandatory — following it fails the build.

Neither was caught by any validator, because skills are prose. But the *references inside* them are not: a script in `.claude/skills/**/SKILL.md` that greps for `npm run <script>` mentions, `` `path/to/file` `` references, and exported-symbol calls (`pageMetadata(`, `componentPageMetadata(`, `useField(`) and fails when the target does not exist would have caught both. It is the repo's own rule — *anything checkable gets build-enforced* — applied to the skills themselves.

Deliberately narrow: it can only check that a referenced thing **exists**, not that the surrounding instruction is still correct. That residue is what `drift-audit` is for, and this would shrink its manual surface to genuine judgement calls.

**19. New AI-surface component patterns — `M`/`L` · new.** Nothing in the registry covers streaming text, citation chips, agent progress / step disclosure, confidence or uncertainty display, or reversible-action approval. No mainstream design system has good answers here yet, which makes it the most *differentiating* thing this system could add — and directly relevant to the work starting Aug 3. Distinct from Workstream A: that makes the system legible **to** agents; this is UI **for** agent-driven products.

### Verification

**20. RadialChart legend never renders — `S` · verify first.** Found 2026-07-21 (Recharts v3 + custom Legend payload). May already be fixed; may also be a hidden-pane false negative. Confirm with a screenshot before spending time on it.

**21. `merge-and-push` masks verify failures — `S`.** The skill pipes verify through `tail`, so it captures `tail`'s exit code, not verify's. This masked two red builds on 2026-07-26.

**22. No web-vitals or Lighthouse budget on the website — `M`.** The site is the system's shopfront and has no performance regression guard.

---

## PARKED

**`fix/resize-flicker-2`** — resize-flicker branch on hold; round-4 leads recorded in the blur-flicker notes. The related scroll-blanking fix (pixel-matched gradient swap for `blur(80px)`, ≥1280px only) shipped to `main` on 2026-07-21 and still awaits a scroll verdict.

## REJECTED — kept so they aren't re-proposed

- **A full `/docs` section** — too large and duplicative; the naming-only rename shipped 2026-07-20 instead.
- **Mirroring `design.md` wholesale onto the Storybook homepage** — wrong shape. 687 lines / 68K with 82 per-component spec sections Storybook already covers via autodocs; the two files do different jobs (authoring spec vs. visitor orientation), and `sync-blueprints.mjs` already publishes `design.md` verbatim at `/blueprints/design`. The salvageable instinct became the thorough tier of item 4.
- **MCP server for the design system** — dense `.md` endpoints + package subpaths cover the need (Workstream A).
- **i18n / RTL support** — out of scope for a personal system.
- **Multi-framework ports** (Vue, Svelte) — out of scope.
- **Refactoring `AlertDialog` onto `Dialog`** — deliberately kept separate.
- **Astryx's Chat component category** — Meta-product-specific. (Item 19 revisits the *AI surface* problem from first principles, which is a different question.)

---

## Sequencing

Revised 2026-07-27 after the architecture review. The governing insight: **the meta-layer is ahead of the component layer, and three planned items would freeze the component layer as-is** (item 2 locks the API surface; Workstream A Phase 2 publishes contracts describing it; Phase 3 generates 56 markdown docs from those contracts). Fix the shape before capturing it.

### The single-pass principle

Items **1** (`'use client'`), **B1** (refs / rest / native attrs), **B2** (`state` → `disabled`), and **B5** (naming) all mean *touching every component's signature once*. Do them as one pass, not four. That pass ships as `0.2.0`, entirely additive.

### Order for the next few days

| # | Work | Status / why here |
|---|---|---|
| 1 | **B1 + B2 + B5 + item 1**, as one signature pass | ✅ **done 2026-07-27** — additive; stopped the wrong API hardening into a contract |
| 2 | **item 3** — Trusted Publishing | ✅ **done 2026-07-27** — took three attempts; causes recorded in the `release` skill |
| 3 | **item 4-cheap** — Storybook install docs | ✅ **done 2026-07-27** — and build-enforced across both install surfaces |
| 4 | **B3** — `Field` primitive | ✅ **done 2026-07-27** — and fixed two a11y bugs axe could never have found |
| 5 | **item 6** — a11y to `'error'`, **AA minus contrast** | ✅ **done 2026-07-27** — 49 fixed, 9 were real bugs; `'error'` now gates CI |
| 6 | **Workstream A Phase 1** — registry metadata | ✅ **done 2026-07-27** — and its `client` field caught 16 components missing `'use client'` |
| 7 | **Workstream A Phase 2** — prop contracts | Now describes the *good* API |
| 8 | **item 2** — API-surface validator | Now freezes the right thing |
| 9 | **item 5** — Chromatic | ✅ **done 2026-07-27** — baseline accepted after a11y, so it survives |
| 10 | **Workstream A Phase 3** — dense `.md` docs | Last; generated from settled contracts |

**B4** (`children` over `label`) and **B6** (`asChild`) are larger and can run in parallel or slip — but adopt B4's rule for any *new* component starting now.

### Dependencies, stated plainly

- **B1/B2 before item 2** — the validator's job is preventing change; don't point it at an API you still intend to change.
- **B1/B2 before Workstream A Phase 2** — contracts generated from the current API document the closed prop surfaces as if they were intentional.
- **B3 before item 6** — *preference, not a dependency.* The 07-27 axe run found only one label-association violation (FileInput), so B3 is not required to clear item 6's list. Doing it first still avoids re-touching the form components twice.
- **Item 6 before item 5** — a11y fixes move pixels; baselines accepted first all need re-accepting.
- **Item 23 before item 5, if it happens at all** — darkening the action colour after baselines are accepted means re-accepting every snapshot with a button in it. Item 23 is deliberately unscheduled, so if it slips past Chromatic, accept the re-baseline cost knowingly rather than by surprise.
- **A-Phase 2 before item 2** — `props.json` turns the validator into a diff of two committed files rather than a second TS-extraction implementation.

---

## Site IA — an open question, not a task

The website currently carries ~14 top-level surfaces serving three different jobs:

- **The design system** — components, foundations, customization, blueprints, docs
- **The portfolio** — work, writing, about, contact, rr-animated
- **The build meta** — project-journal, loops, skills, overview

Two audiences with opposite needs are interleaved: someone evaluating *the component library* and someone evaluating *the person who built it*. Neither gets a clean path, and the front door doesn't declare which one it serves.

This isn't a defect to fix — it's a decision to make deliberately. The strongest version is probably: the system **is** the portfolio piece, so let it own the front door and put the personal surfaces behind a single clearly-named entrance. Recorded here so it gets decided rather than accreted.
