# growth-loop

Weekly GA-driven copy experiment loop for www.robertritacca.com (this repo's `website/` deploys there via Vercel). Each run: analyze last month's GA data, find ONE copy problem, form a hypothesis, implement the fix on a local branch, and write a clear report for the user to approve. **Never push, merge, or deploy — the user approves every change.**

## When invoked

Run when asked to "run the growth loop" (`/growth-loop`) or by the `growth-loop-weekly` scheduled task.

## Scope guardrails (read first)

- **Copy only.** Headlines, body text, CTA/link labels, button text, page `metadata` titles/descriptions — all inside `website/src`. No CSS, no layout, no component structure, no new components, no dependencies.
- **One focused change per run.** One page, or one copy element (e.g. the same CTA wording) across a few pages. A reviewer should be able to read the diff in under two minutes.
- **Local branch only.** Never `git push`, never merge, never touch the user's checked-out branch or working tree (use a worktree — see step 4).
- Never read into version control or modify `ga-analysis/service-account.json` or `ga-analysis/output/`.

## The loop

### 0. Close the previous loop

Read the newest report in `ga-analysis/loop-reports/` (git-ignored, local-only). If a previous experiment was approved/merged, check whether its metric moved in this run's data and record the verdict (improved / no change / worse / too early to tell) in this run's report. If the previous branch was never merged, note that instead and don't count it as tested. Don't re-run a hypothesis a previous report already tested unless the report says the change was never merged.

### 1. Pull the data

```bash
cd /Users/rritacca/Documents/Projects/design-system/ga-analysis && ./.venv/bin/python pull_ga.py --days 28
```

Output lands in `ga-analysis/output/all.json`. If the venv is missing: `python3 -m venv .venv && ./.venv/bin/pip install -q -r requirements.txt`. FutureWarnings are harmless.

### 2. Analyze — with the ga-report skill's judgment calls

Apply every gotcha from the `ga-report` skill (`~/.claude/skills/ga-report/SKILL.md`):
- Subtract bot traffic (historically Singapore at ~4% engagement; spam referrers `ddvvff.org`, `snucm.com`) before drawing conclusions.
- Sum pages by `pagePath`, not `pageTitle` (titles are fragmented from past SEO edits).
- High Direct (~75%) is normal dark social, not a problem.
- Component gallery pages naturally have short dwell — don't flag that.

Look for **copy-shaped problems**, e.g.: a high-traffic landing page with weak engagement or dwell; strong entry pages that don't lead anywhere (missing/weak CTA copy); case studies with good dwell but low reach (weak titles/descriptions); a mismatch between what a traffic source promises and what the page's headline says.

### 3. Pick ONE problem and write the hypothesis

The hypothesis must be falsifiable and name its metric:
> If we [specific copy change], then [specific metric for a specific page/segment] should [direction] over the next few weeks, because [reasoning grounded in the data].

If the data doesn't support a confident copy hypothesis this week, **say so and stop** — a no-op run with a short "nothing worth changing" report is a valid outcome. Don't invent a change to have something to ship.

### 4. Implement on a branch (via worktree)

Work in a temporary worktree so the user's working tree is untouched:

```bash
REPO=/Users/rritacca/Documents/Projects/design-system
WT=$REPO/../.growth-loop-worktree
BRANCH=growth/$(date +%F)-<short-slug>
git -C $REPO worktree add "$WT" -b "$BRANCH" main
```

Make the copy edits in `$WT/website/src/...`, then verify the build without reinstalling deps:

```bash
ln -s $REPO/node_modules "$WT/node_modules"
ln -s $REPO/website/node_modules "$WT/website/node_modules"
cd "$WT/website" && npm run build
```

If the build fails because of your edit, fix it. Then commit in the worktree (conventional message, e.g. `experiment(growth): reword /work CTA — hypothesis in loop report 2026-07-20`) and clean up:

```bash
rm "$WT/node_modules" "$WT/website/node_modules"
git -C $REPO worktree remove "$WT"
```

The branch survives worktree removal and is ready for the user to review.

### 5. Write the report

Save to `ga-analysis/loop-reports/YYYY-MM-DD.md` **and** repeat it in full in the final message to the user. Plain English — the user is a designer, no analytics jargon. Format:

```markdown
# Growth loop — YYYY-MM-DD

## Last week's experiment
[Verdict on the previous change, or "none / not merged".]

## The problem
[What the data shows, with the actual numbers, after bot filtering.]

## The hypothesis
If we ..., then ... should ..., because ...

## The change (branch: growth/YYYY-MM-DD-slug)
[File(s) touched. Before → after for every copy string changed.]

## How we'll know
[Which metric to look at next run, and roughly what movement would count as a win.]
```

### 6. Hand off for approval

End by telling the user: the branch name, that the build passed, and that nothing is pushed or deployed. To approve they merge the branch (or ask Claude to open a PR); to reject they delete the branch. That's the whole approval step.
