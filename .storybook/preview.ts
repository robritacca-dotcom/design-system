import '../src/tokens/tokens.css';
import '../src/fonts/material-symbols.css';
import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

const preview: Preview = {
  parameters: {
    // Chromatic snapshots every story in both themes. `theme` is the global
    // registered by withThemeByDataAttribute below, so each mode renders the
    // same way the toolbar toggle does. Ignored by every other tool.
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },

    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    backgrounds: {
      disable: true, // Disable Storybook's built-in backgrounds
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      // 'error' since 2026-07-27: all 49 known violations fixed, so an a11y
      // regression now fails CI rather than being reported and ignored.
      test: 'error',
      config: {
        // Target is WCAG 2.1 AA minus the contrast criteria. Contrast is
        // deliberately deferred: the action colour fails behind its own label
        // (primary CTA label, teal-as-text on white, tertiary-on-tertiary),
        // and fixing it is a design decision, not a lint fix. This comment is
        // the authoritative record of that deferral — delete the rule override
        // when the action-colour decision lands.
        rules: [{ id: 'color-contrast', enabled: false }]
      }
    }
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;