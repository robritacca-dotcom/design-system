import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { CircularButton } from './CircularButton';

const meta = {
  title: 'Components/CircularButton',
  component: CircularButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text', description: 'Material Symbol icon name' },
    priority: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Button variant',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Button state',
    },
    size: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Button size',
    },
    ariaLabel: { control: 'text', description: 'Accessible label' },
  },
  args: {
    onClick: fn(),
    icon: 'add',
    ariaLabel: 'Add item',
    size: 'default',
  },
} satisfies Meta<typeof CircularButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary states
export const PrimaryDefault: Story = {
  args: { priority: 'primary', state: 'default', icon: 'add', ariaLabel: 'Add' },
};

export const PrimaryHover: Story = {
  args: { priority: 'primary', state: 'hover', icon: 'add', ariaLabel: 'Add' },
};

export const PrimaryActive: Story = {
  args: { priority: 'primary', state: 'active', icon: 'add', ariaLabel: 'Add' },
};

export const PrimaryDisabled: Story = {
  args: { priority: 'primary', state: 'disabled', icon: 'add', ariaLabel: 'Add' },
};

// Secondary states
export const SecondaryDefault: Story = {
  args: { priority: 'secondary', state: 'default', icon: 'close', ariaLabel: 'Close' },
};

export const SecondaryHover: Story = {
  args: { priority: 'secondary', state: 'hover', icon: 'close', ariaLabel: 'Close' },
};

export const SecondaryActive: Story = {
  args: { priority: 'secondary', state: 'active', icon: 'close', ariaLabel: 'Close' },
};

export const SecondaryDisabled: Story = {
  args: { priority: 'secondary', state: 'disabled', icon: 'close', ariaLabel: 'Close' },
};

// Compact
export const CompactPrimaryDefault: Story = {
  args: { priority: 'primary', state: 'default', size: 'compact', icon: 'edit', ariaLabel: 'Edit' },
};

export const CompactPrimaryHover: Story = {
  args: { priority: 'primary', state: 'hover', size: 'compact', icon: 'edit', ariaLabel: 'Edit' },
};

export const CompactSecondaryDefault: Story = {
  args: { priority: 'secondary', state: 'default', size: 'compact', icon: 'more_vert', ariaLabel: 'More options' },
};

export const CompactSecondaryHover: Story = {
  args: { priority: 'secondary', state: 'hover', size: 'compact', icon: 'more_vert', ariaLabel: 'More options' },
};

// Common icon examples
export const Search: Story = {
  args: { priority: 'secondary', icon: 'search', ariaLabel: 'Search' },
};

export const Settings: Story = {
  args: { priority: 'secondary', icon: 'settings', ariaLabel: 'Settings' },
};

export const Delete: Story = {
  args: { priority: 'primary', icon: 'delete', ariaLabel: 'Delete' },
};

export const Refresh: Story = {
  args: { priority: 'secondary', icon: 'refresh', ariaLabel: 'Refresh' },
};
