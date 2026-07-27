---
name: release
description: Cut a new npm release of @robr0/design-system — bump the version, dry-run, publish via the Release workflow, then tag the published commit. Use when asked to cut a release, publish a new version, or ship the package to npm.
icon: rocket_launch
displayDescription: "Cuts an npm release of the component library: bumps the single source-of-truth version, runs the Release workflow in dry-run to prove a real consumer can install and build the tarball, publishes with signed provenance, then tags and writes the GitHub Release against the exact commit that shipped. Knows the two things that bite on release day — a version number can never be reused, and the registry lags a green publish by minutes."
invoke: ["cut a release","publish a new version","ship the package to npm","release [version]"]
---

# release

Cut a new npm release of `@robr0/design-system` — bump, dry-run, publish, tag.

## When invoked

Use this skill when asked to cut a release, publish a new version, or ship the package to npm — phrases like "cut a release", "publish 0.2.0", "ship the package".

**This is the one workflow in this repo where a mistake is permanent.** npm never lets a version number be reused, even after unpublishing, so a botched publish burns that version forever. Read the guardrails before starting.

## Instructions

### 1. Decide the version

Read `PACKAGE_VERSION` in `scripts/package-manifest.mjs` — that constant is the *only* place the version lives (the root package.json version is a workspace artifact; `dist/package.json` is generated from the manifest). Then pick the next version from what actually changed since the last release:

- **patch** — bug fixes, internal refactors, docs
- **minor** — new components, new exports, new tokens (additive)
- **major** — a renamed/removed prop, export, or token; anything a consumer must edit code for

Check what shipped since the last tag to justify the choice, and confirm it with Rob before bumping:

```bash
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

Be deliberate about breaking changes: components are exported both from the barrel and from `./components/*` deep paths, so a renamed component folder breaks consumers even if the barrel still exports the old name.

### 2. Pre-flight

- **Working tree must be clean and pushed.** The workflow builds from the repo, not your disk — anything uncommitted will not be in the release. `git status --short` and `git log origin/main..HEAD` should both be empty.
- **CI on `main` must be green.** A release from a red main ships known-broken code.
- Run `npm run verify` if anything at all is uncommitted or you haven't verified since the last change.

### 3. Bump and commit

**Two files carry the version and nothing generates the second one — edit both:**

1. `PACKAGE_VERSION` in `scripts/package-manifest.mjs` — the source of truth for what ships.
2. `"version"` in the root `package.json` — **must be kept in sync by hand.** No generator writes it, and `scripts/validate-package-exports.mjs` fails the build when the two disagree (`package.json version is "x", manifest says "y"`). The root package.json stays `private: true` forever; only the generated `dist/package.json` is published, but the parity check still gates every build.

Then:

```bash
npm run validate-registry
```

This regenerates the surfaces that carry the version and re-checks that the package exports still match the manifest. Commit the bump on its own (`chore(release): 0.2.0`) and push — the commit you push here is the commit that will be published and tagged.

### 4. Dry run — never skip this

```bash
gh workflow run release.yml -f dry_run=true
```

Watch it to completion:

```bash
gh run watch $(gh run list --workflow=release.yml --limit 1 --json databaseId --jq '.[0].databaseId') --exit-status
```

The dry run does everything except upload: builds `dist/`, packs the tarball, installs it into a scratch Vite + React app and **builds that app without recharts installed** (the optional-peer path — the regression this catches), then prints the publish preview. It needs no npm token, so it is free to run as often as you like. Read the preview's file count and package size and sanity-check them against the previous release; a sudden jump means something got swept into the tarball.

### 5. Publish

```bash
gh workflow run release.yml -f dry_run=false
```

Watch it the same way. The publish step runs `npm publish --access public --provenance` from `dist/`, which signs a provenance attestation tying the tarball to this repo, commit, and workflow run.

### 6. Verify — and do not panic at a 404

**The registry lags a successful publish by several minutes.** A `404` from `npm view` right after a green workflow is propagation, not failure. Confirm the workflow's publish step actually ran (`gh run view <id> --json jobs`) and look for `+ @robr0/design-system@<version>` in its log — if that line is there, it published. **Never re-run the workflow on a 404**; the version is already consumed and the rerun will fail with `EPUBLISHCONFLICT`.

Once it propagates, verify like a consumer rather than trusting the logs — install from the registry into a scratch directory and build a real app with it (bare `node` can't import the barrel because components import their own CSS; that needs a bundler):

```bash
npm view @robr0/design-system version --prefer-online
```

### 7. Tag the published commit

Tag the commit that was **published**, not necessarily current HEAD — the provenance attestation names that commit, so the tag, attestation, and tarball should all agree:

```bash
git tag -a v<version> <published-sha> -m "v<version> — <one-line summary>"
git push origin v<version>
gh release create v<version> --verify-tag --title "v<version> — <short title>" --notes-file <notes>
```

Write the notes for a consumer, not a maintainer: what's new, anything breaking with the migration step spelled out, and the install snippet. The previous release is the format reference.

### 8. Report

Version published, the npm URL, the tagged commit, the release URL, and anything a consumer must do to upgrade.

## Guardrails

- **Never** publish from a local machine (`npm publish` by hand) — releases go through the workflow so every release is provenance-signed and smoke-tested
- **Never** re-run the publish workflow after a successful publish, even if the registry 404s
- The version lives in **two** places and only one is authoritative: bump `PACKAGE_VERSION` in `scripts/package-manifest.mjs` *and* mirror it into the root `package.json`, which nothing generates. Never bump `package.json` alone — the manifest is what ships
- Never publish from a dirty tree, an unpushed commit, or a red CI
- **Auth is Trusted Publishing (OIDC) — there is no npm token to expire or rotate.** If the publish step fails to authenticate, the cause is one of: the `id-token: write` permission was dropped from `release.yml`; the workflow file was **renamed or moved** (the trusted-publisher registration on npmjs.com is keyed to the filename `release.yml`); the npm CLI on the runner is older than 11.5.1; or the registration itself was removed. Rob owns anything that has to change on npmjs.com.
- **A dry run never authenticates**, so it cannot prove OIDC is working — it exercises the build and the tarball, nothing else. After any change to `release.yml`'s auth, permissions, or filename, the only real proof is a genuine publish. Treat that as a reason to make the *next* release a small patch, not a reason to skip the dry run.
- The npm README is the package README — if the release changes install or usage, fix `README.md` in the same release, since it ships inside the tarball
