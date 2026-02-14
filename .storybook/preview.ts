import '../src/tokens/tokens.css';
import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import React from 'react';

// Decorator to apply background color using design tokens
const withBackground = (Story: any) => (
  <div style={{
    backgroundColor: 'var(--color-bg-page-primary)',
    minHeight: '100vh',
    padding: '1rem'
  }}>
    <Story />
  </div>
);

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
      test: 'todo'
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
    withBackground,
  ],
};

export default preview;