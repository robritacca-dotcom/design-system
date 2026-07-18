import registry from './registry.json';

/**
 * COMPONENT REGISTRY — the single source of truth for the public
 * component count.
 *
 * The data lives in registry.json: `components` is the official list of
 * public components (one entry per folder in src/components), and
 * `docOnlyHelpers` names the internal documentation helpers that are
 * deliberately excluded from the public count.
 *
 * scripts/validate-component-registry.mjs compares the registry against
 * the filesystem on every build (library, Storybook, and website), so
 * the registry cannot silently drift from reality.
 *
 * Anywhere a component count is displayed — the Storybook overview,
 * the website mega-nav, case studies — import COMPONENT_COUNT from
 * here. Never hardcode the number.
 */
export const componentRegistry: readonly string[] = registry.components;

/** The official public component count. */
export const COMPONENT_COUNT: number = registry.components.length;
