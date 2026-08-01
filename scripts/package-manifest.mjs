#!/usr/bin/env node
/**
 * PACKAGE MANIFEST — the single source of truth for the published
 * package's identity and public import surface.
 *
 * The exports map exists in two forms generated from SUBPATHS below:
 *   - source form: targets under ./src, written into the root
 *     package.json so the website workspace (and Storybook) consume the
 *     exact specifiers a consumer would, resolved against live source.
 *   - dist form: targets under the built output, written into
 *     dist/package.json by build-package.mjs — that manifest is what
 *     actually ships to npm.
 *
 * scripts/validate-package-exports.mjs (validate-registry chain) fails
 * the build if the root package.json drifts from the source form or if
 * any source target does not exist. Never hand-edit the exports field.
 */

export const PACKAGE_NAME = '@robr0/design-system';
export const PACKAGE_VERSION = '0.3.0';
export const PACKAGE_DESCRIPTION =
  'A token-driven React design system: accessible components, light/dark theming, and CSS-variable customization.';
export const REPOSITORY_URL = 'https://github.com/robritacca-dotcom/design-system';

/**
 * Public subpaths. `srcJs` entries get types+import conditions in the
 * dist form; `asset` entries map through verbatim (CSS, fonts).
 * Wildcards (*) match multi-segment paths, so
 * "@robr0/design-system/components/Button/Button" resolves deep imports.
 */
const SUBPATHS = [
  { key: '.', srcJs: './src/index.ts', dist: './index' },
  { key: './charts', srcJs: './src/charts.ts', dist: './charts' },
  { key: './components/registry', srcJs: './src/components/registry.ts', dist: './components/registry' },
  // Demo data for the Avatar docs (a .ts module, so the *.tsx wildcard
  // below can't serve it — it needs its own subpath).
  { key: './components/Avatar/demoAvatars', srcJs: './src/components/Avatar/demoAvatars.ts', dist: './components/Avatar/demoAvatars' },
  { key: './tokens/registry', srcJs: './src/tokens/registry.ts', dist: './tokens/registry' },
  { key: './components/*', srcJs: './src/components/*.tsx', dist: './components/*' },
  { key: './tokens/*.css', asset: './src/tokens/*.css', dist: './tokens/*.css' },
  { key: './fonts/*', asset: './src/fonts/*', dist: './fonts/*' },
  { key: './package.json', asset: './package.json', dist: './package.json' },
];

/** Exports map pointing at ./src — lives in the root package.json. */
export function sourceExports() {
  const map = {};
  for (const { key, srcJs, asset } of SUBPATHS) {
    map[key] = srcJs ?? asset;
  }
  return map;
}

/** Exports map for dist/package.json — paths relative to dist/. */
export function distExports() {
  const map = {};
  for (const { key, srcJs, dist } of SUBPATHS) {
    map[key] = srcJs
      ? { types: `${dist}.d.ts`, import: `${dist}.js` }
      : dist;
  }
  return map;
}

/** The manifest that ships to npm (written to dist/package.json). */
export function distManifest(rootPkg) {
  return {
    name: PACKAGE_NAME,
    version: PACKAGE_VERSION,
    description: PACKAGE_DESCRIPTION,
    license: rootPkg.license,
    repository: { type: 'git', url: `git+${REPOSITORY_URL}.git` },
    homepage: 'https://robertritacca.com',
    keywords: [
      'react',
      'design-system',
      'component-library',
      'design-tokens',
      'css-variables',
      'dark-mode',
      'typescript',
    ],
    type: 'module',
    sideEffects: ['**/*.css'],
    exports: distExports(),
    peerDependencies: rootPkg.peerDependencies,
    peerDependenciesMeta: rootPkg.peerDependenciesMeta,
  };
}
