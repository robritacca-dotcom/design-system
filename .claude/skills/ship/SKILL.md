---
name: ship
description: Make finished work live on robertritacca.com. Commit, run the full verify, merge branch work into main when needed, push, and watch CI go green. Use when asked to ship it, make it live, push to main, or deploy this. If asked to "merge and push" (a retired skill name), confirm ship vs checkpoint before acting.
icon: publish
displayDescription: "Makes finished work live on robertritacca.com. Surveys the tree so unrelated files never get swept into a commit, runs the full local verify (lint, story tests, and the library, package, Storybook, and website builds, mirroring CI) before anything is committed, merges branch work into main when needed, pushes, confirms the CI run goes green, and reports exactly what deployed."
invoke: ["ship it","make it live","push to main","deploy this"]
---

# ship

Make finished work live on robertritacca.com — builds green first, no unrelated files swept in, a clear report after. The end state is always the same: the work is on `main`, pushed, and deployed.

## When invoked

Use this skill when asked to make completed work live — phrases like "ship it", "make it live", "push to main", "deploy this". This skill always ends with a deploy; to save progress without deploying, that's `checkpoint` (or `park` to also return to main).

**If asked to "merge and push"**: that's the retired ambiguous skill name. Confirm whether it means ship (make it live) or checkpoint (save the branch, keep working) before doing anything.

## Instructions

0. **Check the branch**: `git branch --show-current`.
   - **On `main`**: follow steps 1–7 directly. **A push to main deploys robertritacca.com.**
   - **On any other branch**: the work rides the branch into `main`. Follow steps 1–4 on the branch (commit there), then merge in step 5. Never cherry-pick or copy files across branches to avoid a merge.

1. **Survey the tree before touching anything**: run `git status --short` and classify every entry:
   - **In scope** — files created or modified as part of the work just completed in this session
   - **Out of scope** — anything untracked or modified that predates the session, or that wasn't part of the requested work

   **Never run `git add -A`, `git add .`, or `git add` on a directory** — always add explicit file paths. Out-of-scope files are excluded by default and named in the final report; if it's genuinely unclear whether something belongs, ask before including it.

2. **Run the full verify before committing**:
   ```bash
   npm run verify   # lint + library type-check + package build + story tests + Storybook build + website lint + build
   ```
   This one script is the single source of truth for local checks and mirrors the CI jobs in `.github/workflows/ci.yml` — if CI gains a check (tests, a11y), it gets added to `verify`, never listed here separately. The registry validators run automatically via the builds' `prebuild` hooks.

   **Run it plainly and let its own exit status be the verdict. Never pipe verify through `tail`, `head`, or `grep`** — a pipeline reports the last command's exit code, not verify's, and that exact mistake masked two red builds on 2026-07-26. **If any step fails, stop** — fix the failure if it was caused by this session's work, otherwise report it. Never push red.

   Note: the build regenerates the derived surfaces owned by the `validate-registry` chain — the generator scripts at the front of the `validate-registry` entry in the root `package.json` are the authoritative list of what gets rewritten. If a generated file changed after the builds, it changed because this session's work made it stale — treat it as in scope and commit it alongside the edits that caused it (the validators fail the build when generated content goes stale, so leaving it out breaks CI's drift guard).

3. **Delta-scoped prose check** — the step that keeps drift audits boring. For the identifiers this session's diff touched (component names, prop names, script names, moved/deleted paths), grep the prose surfaces — `.claude/skills/`, `CLAUDE.md`, `design.md`, `content-design.md`, `README.md` — and judge whether any claim just became false (`README.md` ships in the npm tarball, so a false claim there reaches every consumer). Any prose the session wrote or rewrote also follows `content-design.md` (run its Self-Review Tests on anything longer than a sentence). Fix what did in the same push; `validate-doc-refs` catches dead references mechanically, but only a reader catches a sentence that is now wrong. If the diff completed a ROADMAP item, update its row in the tracking table **and delete the item body's stale "current state" prose** — the table carries status, the body describes intent.

4. **Group changes into logical commits** — one commit per concern, not one giant commit. Match the repo's conventional style (`feat(scope):`, `fix(scope):`, `chore(scope):`), with a 1–3 sentence body explaining the why. Check `git log --oneline -5` if unsure of the voice.

5. **Merge (branch case only)**: with the branch committed and verify green:
   ```bash
   git checkout main
   git pull --ff-only
   git merge <branch>
   ```
   A fast-forward or a merge commit are both fine. **If the merge conflicts, stop and report** — never resolve conflicts silently as part of a ship. Never force-push to make a merge "work".

6. **Push**: `git push` on `main`. Remember: **a push to main deploys robertritacca.com via Vercel** — pushing is publishing.

   If the pushed work changed component CSS, anything under `src/tokens/`, or `.storybook/`, offer to dispatch Chromatic (`gh workflow run chromatic.yml`) — `verify` proves nothing about pixels, and this is the decision point pre-deploy's Chromatic rule exists for. It bills cloud snapshots, so it's an offer, not an automatic step.

7. **Confirm CI went green**: after the push, watch the GitHub Actions run to completion:
   ```bash
   gh run watch $(gh run list --branch main --limit 1 --json databaseId --jq '.[0].databaseId')
   ```
   CI runs in parallel with the Vercel deploy — it gates nothing, but a red run on main means something the local verify missed (or an environment difference) and must be investigated, not left as a red X.

   **Branch case, after CI is green**: delete the merged branch — `git branch -d <branch>`, and `git push origin --delete <branch>` if it was pushed. Its commits are on `main`; the repo stays main-only by default. Name the deletion in the report.

8. **Report** in the final message:
   - Each pushed commit (hash + subject), confirmation `npm run verify` passed locally, and the CI run result
   - Every file deliberately left out and why
   - Anything the deploy will visibly change on the live site
   - Branch case: the merge and the branch deletion

## Guardrails

- Never force-push, never rewrite pushed history
- Never commit `ga-analysis/output/`, `ga-analysis/service-account.json`, `.env*`, or anything credential-shaped — even if explicitly staged by mistake
- If there is nothing in scope to commit and nothing unmerged on the branch, say so and stop — don't invent a commit
- Shipping is Rob's call: only invoke this flow when asked to ship, and never chain into it automatically from other work
