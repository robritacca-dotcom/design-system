import '../src/tokens/tokens.css';
import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import React, { useEffect } from 'react';

// Decorator to apply background color using design tokens
const withBackground = (Story: any) => {
  useEffect(() => {
    // Apply background to Storybook root containers
    const applyBackground = () => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-bg-page-primary').trim();

      // Target multiple Storybook containers
      const containers = [
        document.querySelector('.sb-show-main'),
        document.querySelector('#storybook-docs'),
        document.querySelector('.docs-story'),
        document.body
      ];

      containers.forEach(container => {
        if (container) {
          (container as HTMLElement).style.backgroundColor = color || '#ffffff';
        }
      });
    };

    applyBackground();

    // Re-apply when theme changes
    const observer = new MutationObserver(applyBackground);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{
      backgroundColor: 'var(--color-bg-page-primary)',
      minHeight: '100vh',
      padding: '1rem'
    }}>
      <Story />
    </div>
  );
};

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