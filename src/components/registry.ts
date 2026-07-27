import registry from './registry.json';

/**
 * COMPONENT REGISTRY — the single source of truth for the public component
 * list, count, and per-component metadata.
 *
 * The data lives in registry.json. Each entry in `components` carries:
 *
 *   name        the folder under src/components (also the exported name)
 *   label       the display name — "Navigation" for the Nav folder
 *   slug        the website route segment — stored, not derived, so the
 *               Nav → navigation exception is plain data rather than a
 *               special case duplicated across validators
 *   description one line, used for the page title, the sidebar search index,
 *               and anywhere the component is summarised
 *   category    one of `componentCategories`
 *   client      whether the component declares 'use client' — i.e. whether it
 *               uses hooks or defines handlers. Presentational components are
 *               deliberately false so consumers can render them from a React
 *               Server Component.
 *
 * `docOnlyHelpers` names the internal documentation helpers that are
 * deliberately excluded from the public count.
 *
 * scripts/validate-component-registry.mjs compares the registry against the
 * filesystem on every build (library, Storybook, and website), so it cannot
 * silently drift from reality.
 *
 * Anywhere a component count is displayed — the Storybook overview, the
 * website mega-nav, case studies — import COMPONENT_COUNT from here. Never
 * hardcode the number.
 */
export interface ComponentMeta {
  /** Folder under src/components, and the exported component name */
  name: string;
  /** Display name — may differ from `name` (Nav → "Navigation") */
  label: string;
  /** Website route segment under /components */
  slug: string;
  /** One-line summary, used for page titles and search */
  description: string;
  /** Grouping — one of `componentCategories` */
  category: string;
  /** Whether the component declares 'use client' */
  client: boolean;
}

/** Full metadata for every public component, alphabetical by name. */
export const componentMetadata: readonly ComponentMeta[] = registry.components;

/** The categories a component may belong to. */
export const componentCategories: readonly string[] = registry.categories;

/**
 * The official public component list, names only.
 *
 * Unchanged in shape from before the metadata migration, so every existing
 * consumer keeps working without an edit.
 */
export const componentRegistry: readonly string[] = registry.components.map((c) => c.name);

/** The official public component count. */
export const COMPONENT_COUNT: number = registry.components.length;
