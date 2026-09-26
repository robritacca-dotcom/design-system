// The root lints the scripts. Everything TypeScript lives under website/,
// which has its own Next config and is ignored here. The React, Storybook and
// typescript-eslint layers this file used to carry went with the component
// library they were linting.
import js from '@eslint/js'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['website', '.claude', 'dist', 'storybook-static', 'ga-analysis']),
  {
    files: ['**/*.mjs', 'eslint.config.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // generate-site-corpus.mjs documents the corpus-facts() directive inside
      // a block comment, using a zero-width space so the example's `*/` cannot
      // close the enclosing comment. That character is deliberate, so the
      // irregular-whitespace check skips comments; code stays covered.
      'no-irregular-whitespace': ['error', { skipComments: true }],
    },
  },
])
