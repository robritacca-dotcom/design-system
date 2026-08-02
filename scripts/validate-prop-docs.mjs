#!/usr/bin/env node
/**
 * Validates that every prop this project owns carries a JSDoc description.
 *
 * The prop-level JSDoc in src/components is not a comment convention —
 * it is the source the documented surface is generated from: Storybook's
 * autodocs props tables and the .d.ts declarations that ship inside the
 * npm tarball. An undocumented prop is a hole in the published API
 * reference, so it fails the build.
 *
 * Scope is deliberately the component's *own* props. Every component
 * spreads native attributes through
 * `Omit<React.ComponentPropsWithoutRef<'el'>, keyof XOwnProps>` (see the
 * component contract in CLAUDE.md); those belong to React and the HTML
 * spec, not to this project, so props inherited from node_modules are
 * filtered out rather than demanded to carry local documentation.
 *
 * react-docgen-typescript is used rather than react-docgen because it
 * resolves types instead of pattern-matching the AST, which is what
 * makes it cope with the two shapes react-docgen cannot see:
 *   - components that return `createPortal(...)` with no direct JSX
 *     (AlertDialog, CommandPalette) — react-docgen finds no component
 *     definition at all and reports nothing
 *   - files exporting several components (Checkbox + CheckboxGroup)
 * It also handles the one folder-of-components entry, src/components/Chart,
 * which has no Chart.tsx.
 *
 * Runs as part of `npm run validate-registry` (every build, both
 * projects).
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { withCompilerOptions } from 'react-docgen-typescript';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = join(repoRoot, 'src', 'components');
const registry = JSON.parse(
  readFileSync(join(componentsDir, 'registry.json'), 'utf8')
);

/** The component source files backing one registry entry. */
export function sourceFilesFor(name, dir = join(componentsDir, name)) {
  const canonical = join(dir, `${name}.tsx`);
  if (existsSync(canonical)) return [canonical];
  // Folder-of-components entry (Chart): every non-story component file.
  return readdirSync(dir)
    .filter((file) => file.endsWith('.tsx') && !file.includes('.stories.'))
    .sort()
    .map((file) => join(dir, file));
}

const sourceFiles = registry.components.flatMap((component) =>
  sourceFilesFor(component.name)
);

const parser = withCompilerOptions(
  {
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ESNext,
    esModuleInterop: true,
    skipLibCheck: true,
  },
  {
    savePropValueAsString: true,
    // Own props only — native pass-through attributes are React's to document.
    propFilter: (prop) =>
      !(prop.parent && prop.parent.fileName.includes('node_modules')),
  }
);

// One parse call builds a single TypeScript program for the whole
// library; parsing file-by-file rebuilds it each time and is far slower.
const parsed = parser.parse(sourceFiles);

const offenders = [];
let propCount = 0;

for (const component of parsed) {
  const props = component.props ?? {};
  const missing = [];
  for (const [propName, prop] of Object.entries(props)) {
    propCount += 1;
    if (!prop.description || !prop.description.trim()) missing.push(propName);
  }
  if (missing.length > 0) {
    offenders.push({
      file: relative(repoRoot, component.filePath ?? ''),
      displayName: component.displayName,
      missing,
    });
  }
}

if (offenders.length > 0) {
  const total = offenders.reduce((sum, o) => sum + o.missing.length, 0);
  console.error(
    `✗ Own props with no JSDoc description (${total}):\n` +
      offenders
        .map(
          (o) =>
            `    ${o.file} — ${o.displayName}\n` +
            o.missing.map((m) => `      - ${m}`).join('\n')
        )
        .join('\n') +
      `\n  Add a description above each prop: it ships in the .d.ts and renders in Storybook.`
  );
  process.exit(1);
}

console.log(
  `✓ Prop docs complete — ${propCount} own props across ${parsed.length} ` +
    `exported components, all documented.`
);
