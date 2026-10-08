---
name: drift-audit
description: Comprehensive self-consistency audit after a structural or architectural change. Verifies every skill, doc, and website surface still describes the repo as it actually is. Use after big changes, or when asked whether the docs and skills are up to date.
icon: fact_check
displayDescription: "Sweeps every place the repo describes itself (skills, CLAUDE.md, content-design.md, the README, and the website's own explanations of how it is built) and flags anything that no longer matches reality. Executes the commands and recipes the docs prescribe rather than just reading them, so a skill that would break on the next run is caught before someone runs it. Reports findings grouped by severity."
invoke: ["run a drift audit","are the docs and skills up to date","audit for gaps","check for structural drift"]
---

# drift-audit

Verify that every self-description in the repo — skills, docs, website prose — still matches how the repo actually works.

## When invoked

Use this skill after any structural or architectural change (a new build step, a moved directory, a changed dependency model, a new published surface), or when asked whether the docs and skills are still accurate — phrases like "run a drift audit", "are the docs up to date", "check for gaps".

## The governing idea

Build validators already catch everything *mechanically checkable*. This audit exists for the layer beneath them: **prose that asserts something about the system, and instructions that only fail when someone follows them.** A skill telling you to run a deleted npm script passes every validator and every build — it fails silently, months later, for whoever runs it.

**Do not trust this file's own description of the architecture.** It deliberately contains no *inventory* facts — no counts, paths, component lists, or versions, only the command entry points needed to derive them — because inventory facts would rot too. Derive the current shape from the sources of truth (package.json scripts, registries, the validator chain) every time.

**Verify by executing, not by reading.** The most valuable findings come from actually running what a doc prescribes. Reading a worktree recipe looks fine; running it surfaces that the bundler now rejects it.

## Instructions

### 1. Establish the current reality first

Before judging any prose, build an accurate picture of what is true *right now*:

```bash
npm run validate-registry          # what the automated chain enforces, and what it prints
# The chain is not the whole automated layer: the `verify` entry in the root
# package.json ends with the validators that need built HTML and so run after
# the website build (in `verify` and CI), outside this chain.
node -e "console.log(Object.keys(require('./package.json').scripts).join('\n'))"
git log --oneline -20
```

(Heads-up: `validate-registry` **writes** — its leading generator scripts regenerate the derived surfaces; the script entry in the root `package.json` is the authoritative list of what. Check `git status` before and after, so regenerated output isn't mistaken for a finding.)

Read the root `package.json` (scripts, dependency model, workspaces), the validator scripts named in `validate-registry`, and the recent commits. The recent commits tell you *what kind* of drift to hunt for — a dependency-model change implicates install instructions everywhere; a renamed route implicates nav, sitemap, and cross-links.

If `validate-registry` fails, stop and report that first — the automated layer is broken and everything downstream is unreliable.

### 2. Mechanical cross-checks

These are checkable by grep and should be exhaustive. For each, the question is "does the thing this text references still exist?"

- **Every command referenced in prose exists.** Collect `npm run <script>` mentions across `*.md`, `.claude/skills/**`, and `website/src/**`, and diff against the real script list. A referenced-but-missing script is a broken instruction. **Check every workspace's scripts, not just the root** — a mention may be workspace-scoped (`--workspace <name>`, or preceded by a `cd`), which a naive grep reports as missing when it is perfectly valid.
- **Every file path referenced in prose exists.** Extract path-looking strings from README.md, every root spec (the doc list in `scripts/validate-doc-refs.mjs` is the authoritative set), and every SKILL.md, and test each one. Moved or deleted files leave dangling references. Expect noise and filter it before reporting: bare filenames used conversationally (`globals.css`), scaffolding placeholders (`<slug>/page.tsx`) and date placeholders (`YYYY-MM-DD.md`) are fine. Only a path that *claims* to point at something real and doesn't is a finding.
- **Every import specifier in docs matches the installed package's exports.** Any `import … from "…"` in documentation or example code should resolve against the installed `rift-ds` package's `exports` (or be an obvious third-party import). Renamed aliases and scopes hide here.
- **Internal links resolve.** Route strings in website prose (`/work/...`, `/about`) should correspond to real app directories or to a deliberate redirect in `website/next.config.ts`, and the nav config should agree.
- **Counts come from registries, never literals.** Grep displayed numbers near countable nouns; each should be an imported constant.
- **Config still applies where it is declared.** A restructure can leave a config block sitting somewhere the tool no longer reads, and nothing warns you — it just silently stops taking effect. Check that declared intent matches installed reality: dependency `overrides`/`resolutions` (npm honours these **only** in the workspace root), engine constraints, lint and TS config inheritance, and bundler aliases. For dependency pins specifically, compare the declared range against what is actually installed (`npm ls <pkg>`) and run `npm audit` — pins are usually security fixes, so one that stops applying is a silent regression, not a style issue.

### 3. Prose surfaces — read against reality

For each surface, the test is: *if a stranger followed this exactly, would it work, and would what they believe afterwards be true?*

- **README.md** — the public repo's front door, and the first thing a stranger reads. Verify the quick start, the command table, and the local-dev steps against the real `package.json` scripts.
- **CLAUDE.md** — the project's operating manual: structure diagram, quick start, command list, registries/generated surfaces, architecture invariants, infrastructure facts. Every generated surface must be listed with its markers and its generator.
- **content-design.md** — the content style guide. Check that its Register by Surface table still lists every prose surface that exists, that its pointers at skill-owned standards still land, and that no rule in it duplicates one CLAUDE.md owns (fact-architecture rules live in CLAUDE.md, style rules here — a rule restated in both is drift).
- **Website self-descriptions** — any page that explains how the system is built (today the `/design-system` page and the case study about building the system). These are public claims; treat inaccuracy as a bug.
- **Other root specs** — any tracked spec beyond the ones above (the doc list in `scripts/validate-doc-refs.mjs` is the authoritative set). Each makes claims about code it describes; spot-check its heavily-referenced facts the same way.
- **Statistical drift — the code outvotes the docs.** An agent (or a new contributor) learns the system from what is most *common* in the codebase, not from what the prose asserts: the most-used stray pattern outvotes the documented one, because prevalence reads as canon. For a few core conventions the docs state — tokens over raw values, the `rift-ds` component over a local re-implementation, the package's published import paths — census actual usage and check that the dominant pattern is the sanctioned one. A convention can be drift even when every individual instance is legal, if an unsanctioned variant outnumbers the documented form; and when the census is mechanically repeatable, the fix to recommend is a validator (see Guardrails), not a docs edit. The same lens covers adoption: a surface the repo publishes but nothing consumes — a site component no page renders, a dependency nothing imports — is a public claim the numbers contradict; judge whether it is merely early or actually dead, and say which.

### 4. Skills self-audit — the highest-yield section

Read **every** `SKILL.md`, not just the ones that seem related. For each, ask:

- Does every command it prescribes still exist and still do what it claims?
- Does every path it references still exist?
- Does it describe a workflow that a tooling change has since broken? **Where a skill scripts a multi-step recipe (worktrees, builds, deploys), actually execute it in a throwaway location and confirm it completes.** Clean up afterwards.
- Does it tell the reader to hand-edit something that has since become generated?
- Does it describe one-time setup that is now complete, or a future state that has since arrived?
- Does its section/category list omit anything added since it was written?
- Does it duplicate a fact that lives in a registry — or in a doc that owns it (CLAUDE.md, content-design.md) — instead of pointing at that home?

Then check for **missing coverage**: is there now a repeated, consequential workflow with no skill? Recent commits are the evidence — a ritual performed manually twice is a skill-shaped hole, especially where mistakes are expensive or irreversible.

### 5. Consumer and privacy surfaces

- **What ships externally.** If the repo publishes a package, inspect the built artifact — its manifest, its file list, its size, and the docs inside it. Personal data hides in doc comments that become type declarations.
- **No secrets or personal data in public surfaces.** Sweep tracked files and the built artifact for credential-shaped strings, private emails, tokens, keys, and absolute local paths. Distinguish deliberately-public identifiers (an analytics measurement ID visible in page source by design) from genuine leaks, and say which is which rather than crying wolf.

### 6. Report

Group by severity, most actionable first. Every finding needs a file path (with line number where it applies), what it currently says, why that is wrong now, and the fix.

```
## Drift Audit

### Broken — following this would fail
- path/to/SKILL.md:42 — prescribes `npm run <deleted-script>`; replaced by X in <commit>

### Stale — inaccurate, would mislead
- CLAUDE.md:88 — structure diagram still lists a deleted directory

### Gaps — missing coverage
- No skill covers <repeated consequential workflow>

### Verified accurate
- <surfaces checked and found correct — say so explicitly, so the reader knows the scope>

### Summary
X broken · Y stale · Z gaps · N surfaces verified
```

State plainly what you **executed** versus what you only **read** — an unverified pass is weaker evidence, and the reader deserves to know which they are getting.

Then ask whether to apply the fixes. Do not fix silently as you go: the report is the deliverable, and some findings are judgement calls (a "gap" may be deliberate scope).

## Guardrails

- Never edit generated files to resolve a finding — fix the generator or its source, then regenerate
- Never weaken a validator to make a finding disappear
- If a finding is mechanically checkable and keeps recurring, the real fix is a **new validator in the `validate-registry` chain**, not a docs edit — recommend that explicitly (this repo's convention: anything countable or checkable gets build-enforced so it can never drift again)
- Report honestly when a surface was skipped or a check was inconclusive; silence reads as "verified"
