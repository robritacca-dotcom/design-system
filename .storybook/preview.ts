import '../src/tokens/tokens.css';
import '../src/fonts/material-symbols.css';
import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

const preview: Preview = {
  parameters: {
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
      // Stays 'todo' until the 49 known violations are fixed — see ROADMAP item 6.
      // Flip to 'error' as the LAST step of that item, not the first.
      test: 'todo',
      config: {
        // Target is WCAG 2.1 AA minus the contrast criteria — see ROADMAP item 6.
        // Contrast is deferred to ROADMAP item 23 (action-colour design decision).
        // Delete this rule override when item 23 lands.
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