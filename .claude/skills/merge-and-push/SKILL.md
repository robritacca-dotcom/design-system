---
name: merge-and-push
description: Commit the session's work and push to main safely — builds green first, no unrelated files swept in, a clear report after. Use when asked to merge and push, commit and push, push this, or ship it.
icon: publish
displayDescription: "Ships completed work safely: surveys the tree so unrelated files never get swept into a commit, runs both builds (registry validators included) before anything is committed, groups changes into logical conventional commits, pushes, and reports exactly what shipped and what was deliberately left out."
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

2. **Run both builds before committing** (the `pre-deploy` skill's checks, inlined):
   ```bash
   npm run build                    # library: registry validators + tsc + Vite
   cd website && npm run build      # website: validators + Next.js static build
   ```
   The registry validators run automatically via `prebuild`. **If either build fails, stop** — fix the failure if it was caused by this session's work, otherwise report it. Never push red.

   Note: the build regenerates `website/src/data/skills-content.generated.ts` from the SKILL.md files. If the session touched any skill file, the regenerated file is in scope — commit it alongside the skill edits (the validator fails the build if it's stale).

3. **Group changes into logical commits** — one commit per concern, not one giant commit. Match the repo's conventional style (`feat(scope):`, `fix(scope):`, `chore(scope):`), with a 1–3 sentence body explaining the why. Check `git log --oneline -5` if unsure of the voice.

4. **Push**: `git push` on `main`. Remember: **a push to main deploys robertritacca.com via Vercel** — pushing is publishing.

5. **Report** in the final message:
   - Each pushed commit (hash + subject) and confirmation both builds passed
   - Every file deliberately left out and why
   - Anything the deploy will visibly change on the live site

## Guardrails

- Never force-push, never rewrite pushed history
- Never commit `ga-analysis/output/`, `ga-analysis/service-account.json`, `.env*`, or anything credential-shaped — even if explicitly staged by mistake
- If there is nothing in scope to commit, say so and stop — don't invent a commit
- Pushing is Rob's call: only invoke this flow when asked to push, and never chain into it automatically from other work
