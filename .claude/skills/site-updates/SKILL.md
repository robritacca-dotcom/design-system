---
name: site-updates
description: Biweekly loop that keeps the /project-journal build-progression timeline current. Read the git history since the last curated commit, consolidate it into concise thematic entries (what shipped and when, never commit digests), update the data file on a local branch, and report for approval. Use when asked to update the project journal or run the site updates loop. Never pushes, merges, or deploys.
icon: history
displayDescription: "Keeps the Project journal timeline evergreen: reads every commit since the last curated bookmark, clusters them into themes, and writes one short entry per theme (what was built and when, in plain English a non-technical reader can follow), extending an existing arc when the work continues one. Runs biweekly on a schedule, builds on a branch in a temporary worktree, and hands the new entry over for approval. Nothing is pushed without a human merge."
invoke: ["update the project journal","run the site updates loop","/site-updates"]
---

# site-updates

Biweekly curation loop for the `/project-journal` page (Project journal) — the evergreen timeline of the build's progression. Each run reads the commits since the last curated bookmark, consolidates them into at most a couple of concise thematic entries, updates `website/src/data/site-updates.json` on a local branch, and writes a report for the user to approve. **Never push, merge, or deploy — the user approves every change.**

## When invoked

Run when asked to "update the project journal" (`/site-updates`) or by the `site-updates-biweekly` scheduled task.

## Editorial standard (the whole point — read first)

Entries are **concise thematic records, not commit digests and not essays**. The journal exists to be skimmed; an entry a reader has to wade through defeats it.

- **One entry = one theme**, consolidating however many commits belong to it, even non-contiguous ones. A CI workflow commit plus its docs commits is ONE entry, not four bullets.
- **Titles are plain and descriptive, written for a non-technical reader.** State what happened ("The design system publishes to npm"), never wordplay or a metaphor that needs the body to decode.
- **Bodies are one short paragraph** — two only for the period's single largest theme. Lead with *what* shipped and *when*. A clause of context is fine; paragraphs of rationale, architecture tours, and justification are not. What and when over why.
- **Stay high level.** Name the thing and its visible effect; leave the mechanism to the code and the specs. No commit hashes, no conventional-commit prefixes, no "various fixes" — the validator rejects hash-like strings in bodies.
- **Continue arcs instead of fragmenting them.** If the period's work extends a theme an existing entry already tells (more components in a family, round two of a security scrub), extend that entry's body or write an explicit follow-on that references the arc — don't add a disconnected fragment.
- **A reader who has never seen the repo** should be able to skim the timeline top to bottom and follow the build. Spell out names; write like the existing entries.
- **Omit themeless chores.** Typo fixes, dependency bumps, tiny tweaks with no story simply don't appear. The page shows the *largest* updates, not all of them.
- Point-in-time numbers inside a dated entry ("434 at the time") are fine; never write a *live* count that will drift — live counts belong to registries (see `CLAUDE.md`).
- **Sentence-level style follows `content-design.md`** — this section owns the entry *shape* (one theme, concise, neutral, what-and-when); the content guide owns voice, banned words, and rhythm. Run its Self-Review Tests on each drafted entry.

## The loop

### 1. Gate — is there enough to say?

First, run `node scripts/sync-essays.mjs` to pull any newly published essay into `website/src/data/essays.json`, so the regenerated chat corpus can discuss it (the script's own doc block owns the details). If it changes the file, re-run the sync inside step 3's worktree and include the change in the same commit as the rest of the loop's changes.

**A newly synced essay does not build on its own.** Every essay needs its illustrated cover pair (an entry in `website/src/data/essay-covers.json` plus the light and dark files under `website/public/covers/writing/`), and `scripts/validate-essay-covers.mjs` fails the website build until both exist; the sync script's doc block says the same. This loop cannot draw a cover, so when the sync brings in an essay with no pair: leave the synced `essays.json` change out of the loop's commit (`git checkout` it back in the worktree), finish the rest of the loop, and say in the report that a new essay is waiting on its cover before it can be synced. Never try to satisfy the validator with a placeholder pair.

Then read `asOf` from `website/src/data/site-updates.json`, and:

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

Fix anything your edit broke, then commit in the worktree (e.g. `content(site-updates): add "<entry title>" entry through YYYY-MM-DD`). The build regenerates tracked files, and your edit always changes one of them: the site chat's corpus (`website/src/data/site-corpus.generated.ts`) embeds the journal entries, so a new entry regenerates it by construction. Commit the regenerated corpus (and any other tracked file the build regenerated because of your edit) in the same commit — a branch without it fails CI's drift guard, and `git worktree remove` refuses a worktree with modified tracked files. Then clean up:

```bash
rm -rf "$WT/node_modules" "$WT/website/node_modules"   # npm nests version-conflicting deps under website/, so both trees exist
git -C $REPO worktree remove "$WT"
```

The branch survives worktree removal and is ready for review.

### 4. Hand off for approval

The final message to the user IS the report — plain English:

- The full text of the new/extended entry (so approval needs no file-opening).
- Which commits it consolidates (date range and count, not a hash list).
- The branch name, that the validator and website build passed, and that nothing is pushed or deployed.
- To approve: merge the branch (or say `ship` on it). To reject: delete the branch.
