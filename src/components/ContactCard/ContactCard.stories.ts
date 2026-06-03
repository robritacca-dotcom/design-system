import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ContactCard } from './ContactCard';

const meta = {
  title: 'Components/ContactCard',
  component: ContactCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Primary label — e.g. "Email"' },
    value: { control: 'text', description: 'Visible handle or description' },
    href: { control: 'text', description: 'Link destination' },
    icon: { control: 'text', description: 'Material Symbol name (used when no logo)' },
    logo: { control: 'text', description: 'Path to a logo image (preferred over icon)' },
    external: { control: 'boolean', description: 'Opens in new tab + shows open_in_new icon' },
    copyable: { control: 'boolean', description: 'Show copy-to-clipboard button' },
    onCopy: { action: 'copied' },
  },
  args: {
    onCopy: fn(),
  },
} satisfies Meta<typeof ContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// With Material Symbol icon
// ============================================

export const WithIcon: Story = {
  args: {
    label: 'Email',
    value: 'rob.ritacca@gmail.com',
    href: 'mailto:rob.ritacca@gmail.com',
    icon: 'mail',
    external: true,
    copyable: true,
  },
};

// ============================================
// With logo image
// ============================================

export const WithLogo: Story = {
  args: {
    label: 'LinkedIn',
    value: 'linkedin.com/in/robertritacca',
    href: 'https://www.linkedin.com/in/robertritacca/',
    logo: '/logos/LinkedIN.png',
    external: true,
    copyable: false,
  },
};

// ============================================
// External — open in new tab
// ============================================

export const External: Story = {
  args: {
    label: 'GitHub',
    value: 'github.com/robritacca-dotcom',
    href: 'https://github.com/robritacca-dotcom',
    logo: '/logos/Git.svg',
    external: true,
  },
};

// ============================================
// Internal — arrow_forward indicator
// ============================================

export const Internal: Story = {
  args: {
    label: 'Components',
    value: 'Browse the component library',
    href: '/components',
    icon: 'widgets',
    external: false,
  },
};

// ============================================
// Copyable
// ============================================

export const Copyable: Story = {
  args: {
    label: 'Email',
    value: 'rob.ritacca@gmail.com',
    href: 'mailto:rob.ritacca@gmail.com',
    icon: 'mail',
    external: true,
    copyable: true,
  },
};
