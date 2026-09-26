# CLAUDE.md — robertritacca.com

## What This Is

A Next.js portfolio site: case studies, essays, an about page, and a page about
the design system its author built. Deployed to **robertritacca.com** on Vercel;
a push to `main` deploys it.

It is built on **Rift DS**, installed from npm like any other consumer
(`rift-ds`, deep subpaths — `import { Button } from 'rift-ds/components/Button/Button'`).
That system used to live in this repo. It does not any more: it has its own
repository, package and documentation site at **rift-ds.com**, and this site
consumes the published contract rather than reaching past it. Nothing here
defines a token, a component or a theme. If a question is about components,
tokens, templates or theming, the answer lives at rift-ds.com, not here.

The site answers questions about itself through a chat: `SiteChat` mounted from
the root layout, the `useChat` hook, and a Claude-backed `/api/chat` route with
its own guardrails, persona and rate limiting. The model answers from a
build-generated corpus of the site's own published prose, in a single pass. It
carries no tools: it used to have two, over the component prop API and the token
registry, and both went to rift-ds.com with the system they described.

The content style guide lives in [`content-design.md`](content-design.md) — read
it before writing or editing any shipped prose (page copy, case studies,
descriptions, README, microcopy).

---

## Registries — counts are never hardcoded

**General rule:** any count of items displayed anywhere must derive from a
registry that is the single source of truth for that collection, kept in sync by
a build-time validator. Never write a literal number into page copy or docs.

| Collection | Registry | Validator |
|---|---|---|
| Case studies | `website/src/data/case-studies.json` (curated order, strongest first; `/work` maps over all of it, the home page features `[0]`) | `scripts/validate-case-studies.mjs` — every entry has a `/work/<slug>` page, unique href, complete fields, existing logo/cover assets; every folder is registered; `workSidebarLinks` in navigation.ts lists exactly the registered studies |
| Essays | `website/src/data/essays.json` — **synced** from the Substack feed by `scripts/sync-essays.mjs`, run deliberately after publishing (the build never touches the network); the corpus embeds the full text so the chat can quote them | `scripts/validate-essays.mjs` — structure only; freshness is the sync script's job, never the build's |
| Essay covers | `website/src/data/essay-covers.json` — per slug, the alt text for an illustration drawn twice, daylight and dusk, swapped with the theme by `EssayCover` | `scripts/validate-essay-covers.mjs` — both directions, so an essay synced in without its pair fails the build; both theme files exist; every file in the folder is registered |
| Cover renders | `website/src/data/cover-renders.json` — per case-study cover: alt text and the aspects it is shot at | `scripts/validate-cover-rasters.mjs` — both directions, every render has a file, every cover carries alt text. **Staleness is deliberately not checked**: regenerating after a cover change (`npm run covers:render`) is the author's job, like the essay sync |
| Page summaries | `website/src/data/page-summaries.json` (`routes` + `essays`) — the chat FAB's summary panel per page: a short pre-written summary and 1–2 prompt chips. Written for the static routes and essays; case studies derive theirs from their deks | `scripts/validate-page-summaries.mjs` — every route has a summary or is chromeless (parsed from `chromeless.ts`, its one home); both directions; chip labels inside the suggestion budget |
| Ambient background | `website/src/data/shader-background.json` — the renderer switch, eight shader parameters, eight blob definitions. **This is the site's config for a library component**: the renderer is `ShaderField` from rift-ds, and the JSON's shapes are its published types. Setting `"mode"` to `"css"` reverts to the CSS blobs rendered underneath as the fallback | `scripts/validate-shader-background.mjs` — mode is known, every parameter inside the tuner's range, the blob count matches `BLOB_COUNT` and the parameter set matches `DEFAULT_SHADER_PARAMS` **in the installed package**, and every blob's colour token exists in the package's token registry. `scripts/validate-single-background-mount.mjs` — `BlurBackground` is mounted exactly once, in the root layout |
| Site chat corpus | `website/src/data/site-corpus.generated.ts` — **generated** from the published site by `scripts/generate-site-corpus.mjs`, never hand-edited. **Page coverage is automatic**: the page list is the filesystem (`scripts/site-routes.mjs`), so a new page's prose reaches the corpus on the next build; deliberate absences live in `EXCLUDED_ROUTES` with a written reason | `scripts/validate-site-corpus.mjs` — regenerates in memory and byte-compares, screens for leaked details, re-checks the token budget. `scripts/validate-chat-coverage.mjs` — every golden-set fact is in the corpus, every route is covered or excluded. `scripts/validate-corpus-coverage.mjs` — reads the **prerendered HTML** and fails when a covered route's prose is largely absent from the corpus; the other two compare the corpus to its own generator, so only this one catches prose the extractor cannot see |

**Every chat suggestion is one chip, and a chip never wraps.** Conversation
starters, follow-ups and the FAB panel's chips share one row component and one
length budget: `SUGGESTION_MAX_CHARS` in `website/src/lib/chat-suggestions.ts`.
It is enforced wherever a suggestion enters the UI, and
`validate-chat-starters.mjs` and `validate-page-summaries.mjs` between them fail
the build on written copy that exceeds it. A suggestion that will not fit is
dropped, never truncated: half a question is not a question.

**The site chat corpus is public-only and owner-authored-only, and both halves
are security boundaries, not style choices.** The generator may only read
sources that are already published. The corpus becomes the model's context, so
anything in it can be repeated verbatim to any visitor; keeping it public-only
means the worst case of a successful prompt injection *out of* the chat is
off-brand prose rather than a leak. The second half guards the other direction:
third-party words in the corpus would be an injection surface *into* the chat.
Every word on the site is the owner's, which is what makes automatic page-prose
extraction safe; the day a page carries someone else's text, that content needs
an explicit decision before the next build ships it to the model.

**Self-descriptions stay in sync.** When a change makes a statement in this
file, `README.md`, `content-design.md` or a skill false, update it in the same
change. If the drifting fact is countable or mechanically checkable, route it
through a registry plus a validator in the `validate-registry` chain so it
cannot drift again.

**Prose & skill authoring rules.** Every fact has exactly one authoritative
home; all other mentions derive from it, are checked against it, or point at it.

- **Point, don't enumerate.** "The `validate-registry` entry in the root `package.json` is the authoritative list" beats a hand-copied list that goes stale.
- **No counts outside registries; no machine-local paths** — derive the repo root with `git rev-parse --show-toplevel`.
- **References are build-checked**: `scripts/validate-doc-refs.mjs` fails the build when a skill or doc references a repo path, `npm run` script, or documented API symbol that does not exist (the `sources` list in that script is the authoritative set of docs).
- **The one mechanically checkable content rule is build-checked too**: `scripts/validate-shipped-prose.mjs` fails on an em dash in shipped copy, which `content-design.md` bans. It reads page prose through the same `extractProse` the corpus generator uses, so "what counts as page prose" has one definition. Everything else in `content-design.md` needs a reader, and stays the `content-audit` skill's job.
- **A space that vanishes between source and render is build-checked**: `scripts/validate-rendered-spacing.mjs` fails on a closing inline tag butted against a word in the prerendered HTML. A space after `</strong>` is dropped when the following text node holds an HTML entity. The fix is always to use the literal character (’ “ ”) instead of the entity.
- **Every `var(--…)` must resolve**: `scripts/validate-token-usage.mjs` fails the build on a reference to a custom property nothing defines, checking the site's CSS against the tokens the installed package ships. This is what catches a token the package renamed, and what found four case studies drawing a border in a colour that never existed.

---

## Quick Start

```bash
npm install        # once, at the root — the site is an npm workspace
npm run dev        # http://localhost:3000
```

Other useful commands:
```bash
npm run build           # build the site (runs the generators and validators first)
npm run lint            # ESLint
npm run verify          # full local quality gate: lint + build + the built-HTML checks + the served-site checks — mirrors CI
npm run covers:render   # re-shoot the registered case-study covers, against a running dev server (deliberate, never in the build)
npm run sync:essays     # pull the Substack feed into essays.json (deliberate, never in the build)
npm run eval:chat       # chat answer-quality eval against a running dev server (costs real API calls, never in CI)
```

---

## CI & Local Verify

`npm run verify` is the **single local mirror of CI**: lint, build, then the
checks that need the finished build — the three validators that read built HTML
(rendered spacing, corpus coverage, internal links) and the two served-site
checks (the hydration smoke, then the page-level axe pass), in that order. The
rule that keeps them in sync: **when CI gains a check, add it to `verify` in the
same change** — skills and docs reference `verify`, never individual commands.

The generators and validators run in the site's own `prebuild`, so a plain
`npm run build` already covers them; `validate-registry` at the root runs the
same chain on its own when you want it without a build.

The hydration smoke (`scripts/smoke-hydration.mjs`) serves the build and loads
it in a real browser, because a green build and an HTTP 200 both held on
2026-09-06 while a hydration mismatch left every page invisible. The script's
doc block owns the details, including its second life as the `ship` skill's
post-deploy check against production.

**Infrastructure**:
- **Deployment**: Vercel, push-to-deploy from `main`. `.github/workflows/uptime.yml` smokes production on a schedule, because ISR means the served site can change with no deploy — which is how that outage appeared on a deployment that had shipped green.
- **Analytics**: Google Analytics 4 via the gtag snippet in `website/src/app/layout.tsx` (a public G-… measurement ID, visible in page source by design). GA *credentials* live only in local `ga-analysis/` files its own `.gitignore` excludes.
- **Fonts**: Nunito Sans is self-hosted via `next/font/google` (fetched at build time). Material Symbols Rounded ships inside the rift-ds package. Open Sans is loaded the same build-time way but scoped to `/covers` alone.

**Shipping vocabulary** — skills named for their end state, because a push to
`main` always deploys the live site:
- **`ship`** — make it live. Full verify, merge into `main` if needed, push, watch CI, then prove the deployed site renders.
- **`super-ship`** — the bulletproof ship for structural work: full `drift-audit`, fix the findings, then `ship`.
- **`checkpoint`** — save progress to a remote branch and keep working. Never touches `main`, never deploys.
- **`park`** — checkpoint, then return to a clean `main`.
- **`land`** — triage all pending work at once, merge the approved into a **local, unpushed** `main`, archive anything deleted to an `archive/*` tag. Deliberately never pushes.

If asked to "merge and push", confirm the intended **end state** rather than
guessing: `ship`, `checkpoint`, or `land`.

---

## Project Structure

```
/
├── content-design.md          # Content style guide — voice, register, prose rules
├── HISTORY.md                 # (in the rift-ds repo) the predecessor releases and build journal
├── scripts/                   # Generators + validators, the sync scripts, the served-site checks
├── evals/chat/                # Chat answer-quality eval: golden set, promptfoo config, SPEC.md
├── ga-analysis/               # GA pull tooling (tracked, secret-free; credentials are gitignored)
└── website/                   # The Next.js app (npm workspace)
    ├── src/app/
    │   ├── work/              # Case-study pages, one folder per study
    │   ├── writing/           # Essay pages, mirrored from the Substack feed
    │   ├── about/ contact/ privacy/
    │   ├── design-system/     # The page about having built Rift DS; points at rift-ds.com
    │   ├── covers/            # Hidden staging grid for the vector cover mocks (noindex, chromeless)
    │   ├── rr-animated/       # Standalone animated-logo page (noindex)
    │   ├── llms.txt/          # The public agent index for the portfolio
    │   └── api/chat/          # The chat backend: route, guardrails, persona, followups, feedback
    ├── src/config/            # navigation.ts (nav/sidebar/breadcrumb source of truth), chromeless.ts, anchor-nav.ts, social.ts
    ├── src/data/              # The registries above, plus case-study-tldrs.ts (prose kept out of the route folders so the corpus never carries the same facts twice)
    ├── src/hooks/             # useChat — the chat widget's transport-agnostic state machine
    ├── src/lib/               # Chat transport, model allowlist, follow-ups, suggestion budget; site-tools.ts (corpus search); Substack feed; OG image; structured data; scroll lock
    └── src/components/        # Shared site UI: MegaNav, Sidebar, SiteFooter, SiteChat, SitePalette, BlurBackground, FloatingAnchorNav, covers/
```

---

## Tokens

The token layer is **consumed, not defined here**. Everything comes from
`rift-ds/tokens/tokens.css`, imported once in the root layout.

Three tiers, and site CSS only ever touches the middle one:

```
rift-ds primitives    --primitive-teal-08: #0E6E8F     (never referenced here)
        ↓
rift-ds semantic      --color-action-primary-bg        (always use these)
        ↓
site CSS              background: var(--color-action-primary-bg)
```

- **Dark mode** is driven by `data-theme="dark"` on the root element. Every semantic colour token has a light and a dark value, so no `prefers-color-scheme` queries belong in site CSS.
- **Spatial tokens are a numeric scale**, not t-shirt sizes: `--gap-400`, `--padding-500`, `--radius-300`, `--icon-size-600`. The rank is `px / 4 * 100`. The families are not parallel, so never infer one from another: `--gap-xs` was 4px and `--padding-xs` was 6px, which is why a suffix-based rename would have shifted every padding on this site by 2px.
- **Never hardcode a hex value** in site CSS. The one sanctioned exception is the case-study cover redraws in `website/src/components/covers/`, which are deliberately token-free: every value is a drawing coordinate from the source frame, sanctioned per module with a `ds-allow-file(mockup)` header, so a theme change can never alter a picture of what shipped.
- **Every `var(--…)` must resolve** — see `validate-token-usage.mjs` above.

Upgrading the package is where token names can change. Read its release notes,
then let `validate-token-usage.mjs` enumerate the call sites rather than
grepping by hand.

---

## Adding a Page

Use the `new-page` skill. In short: create the route folder with
`page.tsx` + `page.module.css` + `layout.tsx`, render `<MegaNav />` and give
`<main>` `id="main-content"` (the root layout's skip link targets it), wire the
nav entry in `website/src/config/navigation.ts`, and add a
`website/src/data/page-summaries.json` entry or mark the route chromeless. The
corpus picks the page up automatically on the next build.

---

## Known Gaps

- Visual regression has no automated coverage in this repo. The `visual-review` and `design-qa` skills are the human-driven substitutes.
- A11y is checked by the page-level axe pass over the served site in both themes; axe catches roughly a third of WCAG issues, so keyboard order and meaningful alt text still need human review.
