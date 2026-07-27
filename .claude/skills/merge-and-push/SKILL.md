---
name: merge-and-push
description: Commit the session's work and push to main safely — builds green first, no unrelated files swept in, a clear report after. Use when asked to merge and push, commit and push, push this, or ship it.
icon: publish
displayDescription: "Ships completed work safely: surveys the tree so unrelated files never get swept into a commit, runs the full local verify (lint, story tests, and the library, package, Storybook, and website builds — mirroring CI) before anything is committed, groups changes into logical conventional commits, pushes, confirms the CI run goes green, and reports exactly what shipped and what was deliberately left out."
invoke: ["merge and push","commit and push","push this","ship it"]
---

# merge-and-push

Commit the session's work and push to main safely — builds green first, no unrelated files swept in, a clear report after.

## When invoked

Use this skill when asked to ship completed work — phrases like "merge and push", "commit and push", "push this", "ship it".

## Instructions

1. **Survey the tree before touching anything**: run `git status --short` and classify every entry:
   - **In scope** — files created or modified as part of the work just completed in this session
   - **Out of scope** — anything untracked or modified that predates the session, or that wasn't part of the requested work

   **Never run `git add -A`, `git add .`, or `git add` on a directory** — always add explicit file paths. Out-of-scope files are excluded by default and named in the final report; if it's genuinely unclear whether something belongs, ask before including it.

2. **Run the full verify before committing**:
   ```bash
   npm run verify   # lint + library type-check + package build + story tests + Storybook build + website build
   ```
   This one script is the single source of truth for local checks and mirrors the CI jobs in `.github/workflows/ci.yml` — if CI gains a check (tests, a11y), it gets added to `verify`, never listed here separately. The registry validators run automatically via the builds' `prebuild` hooks. **If any step fails, stop** — fix the failure if it was caused by this session's work, otherwise report it. Never push red.

   Note: the build regenerates several derived surfaces — `website/src/data/skills-content.generated.ts` (from the SKILL.md files), the marked component count/list sections of `README.md` (from `src/components/registry.json`), the package barrels `src/index.ts`/`src/charts.ts` (same registry), and the public blueprint copies `website/public/CLAUDE.md`/`design.md` (from the root files). If any changed after the builds, it changed because this session's work made it stale — treat it as in scope and commit it alongside the edits that caused it (the validators fail the build when generated content goes stale, so leaving it out breaks CI's drift guard).

3. **Group changes into logical commits** — one commit per concern, not one giant commit. Match the repo's conventional style (`feat(scope):`, `fix(scope):`, `chore(scope):`), with a 1–3 sentence body explaining the why. Check `git log --oneline -5` if unsure of the voice.

4. **Push**: `git push` on `main`. Remember: **a push to main deploys robertritacca.com via Vercel** — pushing is publishing.

5. **Confirm CI went green**: after the push, watch the GitHub Actions run to completion:
   ```bash
   gh run watch $(gh run list --branch main --limit 1 --json databaseId --jq '.[0].databaseId')
   ```
   CI runs in parallel with the Vercel deploy — it gates nothing, but a red run on main means something the local verify missed (or an environment difference) and must be investigated, not left as a red X.

6. **Report** in the final message:
   - Each pushed commit (hash + subject), confirmation `npm run verify` passed locally, and the CI run result
   - Every file deliberately left out and why
   - Anything the deploy will visibly change on the live site

## Guardrails

- Never force-push, never rewrite pushed history
- Never commit `ga-analysis/output/`, `ga-analysis/service-account.json`, `.env*`, or anything credential-shaped — even if explicitly staged by mistake
- If there is nothing in scope to commit, say so and stop — don't invent a commit
- Pushing is Rob's call: only invoke this flow when asked to push, and never chain into it automatically from other work
