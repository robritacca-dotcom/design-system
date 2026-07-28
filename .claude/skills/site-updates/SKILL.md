---
name: site-updates
description: Biweekly loop that keeps the /project-journal build-progression timeline current — read the git history since the last curated commit, consolidate it into thematic story entries (what/why/outcome, never commit digests), update the data file on a local branch, and report for approval. Use when asked to update the project journal or run the site updates loop. Never pushes, merges, or deploys.
icon: history
displayDescription: "Keeps the Project journal timeline evergreen: reads every commit since the last curated bookmark, clusters them into themes, and writes one story entry — what was built, why, and the outcome in plain English — extending an existing arc when the work continues one. Runs biweekly on a schedule, builds on a branch in a temporary worktree, and hands the new entry over for approval. Nothing is pushed without a human merge."
invoke: ["update the project journal","run the site updates loop","/site-updates"]
---

# site-updates

Biweekly curation loop for the `/project-journal` page (Project journal) — the evergreen timeline of the build's progression. Each run reads the commits since the last curated bookmark, consolidates them into at most a couple of thematic story entries, updates `website/src/data/site-updates.json` on a local branch, and writes a report for the user to approve. **Never push, merge, or deploy — the user approves every change.**

## When invoked

Run when asked to "update the project journal" (`/site-updates`) or by the `site-updates-biweekly` scheduled task.

## Editorial standard (the whole point — read first)

Entries are **thematic stories, not commit digests**:

- **One entry = one theme**, consolidating however many commits belong to it, even non-contiguous ones. A CI workflow commit plus its docs commits is ONE entry ("A real quality gate"), not four bullets.
- **Every entry answers three things in prose**: *what* was built, *why* it was needed (the problem or motivation — the human context), and *the outcome* (what's now true, guaranteed, or possible). No commit hashes, no conventional-commit prefixes, no "various fixes" — the validator rejects hash-like strings in bodies.
- **Continue arcs instead of fragmenting them.** If the period's work extends a theme an existing entry already tells (more components in a family, round two of a security scrub), extend that entry's body or write an explicit follow-on that references the arc — don't add a disconnected fragment.
- **A reader who has never seen the repo** should be able to read the timeline top to bottom and follow the build. Spell out names and stakes; write like the existing entries.
- **Omit themeless chores.** Typo fixes, dependency bumps, tiny tweaks with no story simply don't appear. The page shows the *largest* updates, not all of them.
- Point-in-time numbers inside a dated entry ("all 434 stories at the time") are fine; never write a *live* count that will drift — live counts belong to registries (see `CLAUDE.md`).

## The loop

### 1. Gate — is there enough to say?

Read `asOf` from `website/src/data/site-updates.json`, then:

```bash
git log --format='%ad %s' --date=short <asOf.commit>..HEAD
```

If it has been fewer than ~12 days since `asOf.date`, or the new commits are only themeless chores, **stop** and tell the user "nothing worth recording yet" with a one-line summary of what was skipped. A no-op run is a valid outcome — don't invent an entry to have something to ship.

### 2. Curate

Cluster the new commits into themes and draft the entry (usually one, at most two) per the editorial standard. For context on what a commit actually was, read the touched files or `git show --stat` — the story should describe the change's substance, not its message. Check the existing entries first so a continuing arc extends rather than duplicates.

### 3. Implement on a branch (via worktree)

Work in a temporary worktree so the user's working tree is untouched:

```bash
REPO=$(git rev-parse --show-toplevel)
WT=$REPO/../.site-updates-worktree
BRANCH=site-updates/$(date +%F)
git -C "$REPO" worktree add "$WT" -b "$BRANCH" main
```

In `$WT/website/src/data/site-updates.json`: prepend the new entry (or extend an arc), and set `asOf` to the current `main` HEAD sha + today's date. Validate and build (the repo is an npm workspace — one install at the worktree root wires everything, including the `@robr0/design-system` link back to the worktree's own `src/`; it's seconds thanks to the npm cache. Do **not** symlink `node_modules` from the main checkout — Turbopack rejects symlinks that point outside the project root):

```bash
node $WT/scripts/validate-site-updates.mjs
cd "$WT" && npm install --no-fund --no-audit
cd "$WT/website" && npm run build
```

Fix anything your edit broke, then commit in the worktree (e.g. `content(site-updates): add "<entry title>" entry through YYYY-MM-DD`) and clean up:

```bash
rm -rf "$WT/node_modules" "$WT/website/node_modules"
git -C $REPO worktree remove "$WT"
```

The branch survives worktree removal and is ready for review.

### 4. Hand off for approval

The final message to the user IS the report — plain English:

- The full text of the new/extended entry (so approval needs no file-opening).
- Which commits it consolidates (date range and count, not a hash list).
- The branch name, that the validator and website build passed, and that nothing is pushed or deployed.
- To approve: merge the branch (or ask Claude to merge and push). To reject: delete the branch.
