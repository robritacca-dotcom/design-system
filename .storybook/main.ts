import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes"
  ],
  "framework": "@storybook/react-vite",
  // react-docgen (the react-vite default) pattern-matches the AST for a
  // component definition, so it finds nothing in a component that returns
  // `createPortal(...)` with no direct JSX: AlertDialog and CommandPalette
  // produced no docgen at all, and their props tables were only ever
  // populated by hand-written argTypes. react-docgen-typescript resolves
  // types instead, so it covers those, multi-component files (Checkbox +
  // CheckboxGroup), and the Chart folder alike.
  // scripts/validate-prop-docs.mjs checks the same surface with the same
  // parser and filter, so the build fails before a prop can render blank.
  "typescript": {
    "reactDocgen": "react-docgen-typescript",
    "reactDocgenTypescriptOptions": {
      // The root tsconfig.json is solution-style ("files": [] plus
      // references), and the docgen plugin defaults to it: that builds a
      // TypeScript program containing no files, so nothing is documented at
      // all. Point it at the project that actually includes src.
      "tsconfigPath": "tsconfig.app.json",
      "shouldExtractLiteralValuesFromEnum": true,
      "shouldRemoveUndefinedFromOptional": true,
      // Own props only. Every component spreads native attributes through
      // `Omit<React.ComponentPropsWithoutRef<'el'>, keyof XOwnProps>`; without
      // this filter Button's table lists 301 inherited DOM attributes.
      "propFilter": (prop) =>
        !(prop.parent && prop.parent.fileName.includes('node_modules')),
    },
  },
};
export default config;