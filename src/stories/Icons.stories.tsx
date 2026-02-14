import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import '../fonts/material-symbols.css';

// Icon gallery component
interface IconGalleryProps {
  iconStyle: 'outlined' | 'rounded' | 'sharp';
  icons: string[];
}

const IconGallery = ({ iconStyle, icons }: IconGalleryProps) => {
  const iconStyleClass = `material-symbols-${iconStyle}`;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '24px',
        padding: '24px',
        maxWidth: '1200px',
      }}
    >
      {icons.map((iconName) => (
        <div
          key={iconName}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.borderColor = '#118ab2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = '#e0e0e0';
          }}
        >
          <span
            className={iconStyleClass}
            style={{
              fontSize: '32px',
              color: 'var(--color-icon-primary)',
            }}
          >
            {iconName}
          </span>
          <span
            style={{
              fontSize: '12px',
              color: '#6d6d6d',
              textAlign: 'center',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              wordBreak: 'break-word',
            }}
          >
            {iconName}
          </span>
        </div>
      ))}
    </div>
  );
};

// Common icon set
const commonIcons = [
  'home',
  'search',
  'settings',
  'person',
  'arrow_back',
  'close',
  'menu',
  'star',
  'favorite',
  'check',
  'add',
  'delete',
  'edit',
  'share',
  'notifications',
  'mail',
  'phone',
  'camera',
  'lock',
  'visibility',
  'download',
  'upload',
  'info',
  'help',
  'more_vert',
  'more_horiz',
  'refresh',
  'calendar_today',
  'schedule',
  'dashboard',
  'folder',
  'attach_file',
  'image',
  'location_on',
  'bookmark',
  'shopping_cart',
  'account_circle',
  'logout',
  'login',
  'language',
  'brightness_4',
];

const meta = {
  title: 'Design System/Icons',
  component: IconGallery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Material Symbols icon gallery showcasing all three font variants.

## Usage
To use these icons in your components, import the material-symbols.css file and apply the appropriate class:

\`\`\`tsx
import '../../fonts/material-symbols.css';

// In your component
<span className="material-symbols-sharp">home</span>
<span className="material-symbols-rounded">settings</span>
<span className="material-symbols-outlined">favorite</span>
\`\`\`

## Variants
- **Sharp**: Clean, angular edges (default)
- **Rounded**: Soft, rounded edges
- **Outlined**: Stroke-based, hollow icons
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    iconStyle: {
      control: 'select',
      options: ['outlined', 'rounded', 'sharp'],
      description: 'Icon style variant',
    },
  },
} satisfies Meta<typeof IconGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sharp: Story = {
  args: {
    iconStyle: 'sharp',
    icons: commonIcons,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sharp variant with clean, angular edges. This is the default icon style.',
      },
    },
  },
};

export const Rounded: Story = {
  args: {
    iconStyle: 'rounded',
    icons: commonIcons,
  },
  parameters: {
    docs: {
      description: {
        story: 'Rounded variant with soft, friendly edges.',
      },
    },
  },
};

export const Outlined: Story = {
  args: {
    iconStyle: 'outlined',
    icons: commonIcons,
  },
  parameters: {
    docs: {
      description: {
        story: 'Outlined variant with stroke-based, hollow icons.',
      },
    },
  },
};

// Comparison view showing all three styles side by side
const IconComparison = () => {
  const comparisonIcons = ['home', 'settings', 'favorite', 'notifications', 'person', 'search'];

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '24px', fontFamily: 'system-ui, sans-serif' }}>
        Icon Style Comparison
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
        }}
      >
        {['sharp', 'rounded', 'outlined'].map((style) => (
          <div key={style}>
            <h3
              style={{
                marginBottom: '16px',
                fontFamily: 'system-ui, sans-serif',
                textTransform: 'capitalize',
                color: '#118ab2',
              }}
            >
              {style}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {comparisonIcons.map((icon) => (
                <div
                  key={icon}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                >
                  <span
                    className={`material-symbols-${style}`}
                    style={{
                      fontSize: '32px',
                      color: 'var(--color-icon-primary)',
                    }}
                  >
                    {icon}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Comparison: Story = {
  render: () => <IconComparison />,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all three icon styles.',
      },
    },
  },
};
