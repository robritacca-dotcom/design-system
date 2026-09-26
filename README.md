# robertritacca.com

[![CI](https://github.com/robritacca-dotcom/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/robritacca-dotcom/design-system/actions/workflows/ci.yml)

The portfolio site of Robert Ritacca, Principal Product Designer: AI product case
studies from Intuit, Meta and Augmenta, essays on design and AI, and a chat that
answers questions about the work using the site's own published prose.

**[→ Live site](https://robertritacca.com/)**

It is built on **[Rift DS](https://rift-ds.com)**, the design system Rob designed
and built, installed from npm like any other consumer. That system used to live in
this repository; it now has its own repo, package and documentation site, and this
site consumes the published contract rather than reaching past it. Nothing here
defines a token, a component or a theme.

Claude Code builds the site from the written specs in this repo: `CLAUDE.md` for
where facts live and how the build enforces them, `content-design.md` for how every
word reads.

---

## Running it

```bash
npm install        # once, at the root (the site is an npm workspace)
npm run dev        # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run build` | Build the site. Runs the generators and validators first. |
| `npm run lint` | ESLint over the root and the site. |
| `npm run verify` | The full local quality gate, mirroring CI: lint, build, the built-HTML checks, then the served-site checks. |
| `npm run covers:render` | Re-shoot the case-study covers against a running dev server. Deliberate, never in the build. |
| `npm run sync:essays` | Pull the Substack feed into the committed essays registry. Deliberate, never in the build. |
| `npm run eval:chat` | Chat answer-quality eval against a running dev server. Costs real API calls, never in CI. |

---

## How it holds together

Every fact has exactly one home. Counts and lists live in registries, generators
write the surfaces that state them, and validators check the rest on every build,
so a case study without a cover, an essay synced in without a summary, or a CSS
rule referencing a token that does not exist all fail the build and name the file.

The registries and their validators are listed in [`CLAUDE.md`](CLAUDE.md); the
`validate-registry` entry in `package.json` is the authoritative chain.

Two checks are worth calling out because they catch what a green build otherwise
hides. `scripts/smoke-hydration.mjs` serves the build and loads it in a real
browser, because an HTTP 200 proves nothing: a hydration mismatch once left every
page invisible on a deployment that had shipped green. And
`scripts/validate-corpus-coverage.mjs` reads the prerendered HTML rather than the
generator's own output, so it catches prose the chat cannot see.

---

## The chat

The site answers questions about itself. `SiteChat` mounts from the root layout,
`useChat` holds the conversation state, and a Claude-backed `/api/chat` route
streams the answer with its own guardrails, persona and rate limiting.

The model reads a corpus generated at build time from the site's own published
prose, and answers from it in a single pass. The corpus is **public-only and
owner-authored-only**, and both halves are security boundaries rather than style
choices: anything in it can be repeated verbatim to any visitor, and anything
third-party in it would be an injection surface pointed back at the model.

Design-system questions are not this chat's to answer. Rift DS documents and
answers for itself at [rift-ds.com](https://rift-ds.com).

---

## Tech

- **Next.js 16** (App Router) on **React 19**, deployed on Vercel
- **[rift-ds](https://www.npmjs.com/package/rift-ds)** for every component and token
- **Playwright + axe**: the served site is checked in both themes on every run of `verify`
- **Claude** via the Anthropic SDK for the chat, with Upstash Redis for rate limiting and spend tracking

---

## Licence

MIT. See [LICENSE](LICENSE).
