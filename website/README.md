# robertritacca.com (the Next.js app)

The portfolio site, deployed as robertritacca.com. It is an npm workspace of the repo root: install at the root (`npm install`), never inside `website/` and never with another package manager. It consumes the Rift DS design system from npm as `rift-ds`, like any other consumer.

## Getting started

```bash
# from the repo root
npm install
npm run dev --workspace website
```

Open [http://localhost:3000](http://localhost:3000). Pages live under `website/src/app/`; the home page is `website/src/app/page.tsx`.

Fonts are Nunito Sans via `next/font/google` (Open Sans loads the same way, scoped to `/covers` only). The root `CLAUDE.md` is the operating manual for the whole repo: read it before changing anything structural, including the registries and the generated chat corpus this site is built from.
