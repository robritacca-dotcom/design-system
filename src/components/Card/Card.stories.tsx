import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title displayed below the preview',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is hoverable/clickable',
    },
  },
  args: {
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Colours',
    children: (
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'conic-gradient(from 180deg, #118AB2, #EF476F, #FFD166, #06D6A0, #118AB2)',
        }}
      />
    ),
  },
};

export const Interactive: Story = {
  args: {
    title: 'Typography',
    interactive: true,
    children: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <span style={{ fontSize: '48px', fontWeight: 300, color: 'var(--color-text-primary)' }}>
          Aa
        </span>
        <span style={{ fontSize: '56px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          Aa
        </span>
      </div>
    ),
  },
};

export const WithPlaceholder: Story = {
  args: {
    title: 'Components',
    interactive: true,
    children: (
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '2px dashed var(--color-core-accent-purple)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '32px', color: 'var(--color-text-tertiary)' }}
        >
          widgets
        </span>
      </div>
    ),
  },
};
