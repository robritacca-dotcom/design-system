import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Button variant - primary or secondary',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Button state for design system documentation',
    },
    label: {
      control: 'text',
      description: 'Button text content',
    },
    text: {
      control: 'boolean',
      description: 'Show text label',
    },
    iconLeft: {
      control: 'text',
      description: 'Material Symbol Rounded icon name for left side (e.g., "menu", "home")',
    },
    iconRight: {
      control: 'text',
      description: 'Material Symbol Rounded icon name for right side (e.g., "arrow_forward")',
    },
    icon: {
      control: 'text',
      description: 'Deprecated - use iconLeft instead',
    },
  },
  args: {
    onClick: fn(),
    label: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Button States
export const PrimaryDefault: Story = {
  args: {
    priority: 'primary',
    state: 'default',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const PrimaryHover: Story = {
  args: {
    priority: 'primary',
    state: 'hover',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const PrimaryActive: Story = {
  args: {
    priority: 'primary',
    state: 'active',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const PrimaryDisabled: Story = {
  args: {
    priority: 'primary',
    state: 'disabled',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

// Secondary Button States
export const SecondaryDefault: Story = {
  args: {
    priority: 'secondary',
    state: 'default',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const SecondaryHover: Story = {
  args: {
    priority: 'secondary',
    state: 'hover',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const SecondaryActive: Story = {
  args: {
    priority: 'secondary',
    state: 'active',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const SecondaryDisabled: Story = {
  args: {
    priority: 'secondary',
    state: 'disabled',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

// With Icon Left
export const PrimaryWithIconLeft: Story = {
  args: {
    priority: 'primary',
    state: 'default',
    label: 'Menu',
    text: true,
    iconLeft: 'menu',
    iconRight: undefined,
  },
};

export const SecondaryWithIconLeft: Story = {
  args: {
    priority: 'secondary',
    state: 'default',
    label: 'Home',
    text: true,
    iconLeft: 'home',
    iconRight: undefined,
  },
};

// With Both Icons
export const WithBothIcons: Story = {
  args: {
    priority: 'primary',
    state: 'default',
    label: 'Next Step',
    text: true,
    iconLeft: 'check',
    iconRight: 'arrow_forward',
  },
};

export const WithIconLeftAndRight: Story = {
  args: {
    priority: 'secondary',
    state: 'default',
    label: 'Download',
    text: true,
    iconLeft: 'download',
    iconRight: 'chevron_right',
  },
};

// Icon Only
export const PrimaryIconOnly: Story = {
  args: {
    priority: 'primary',
    state: 'default',
    text: false,
    iconLeft: 'add',
    iconRight: undefined,
  },
};

export const SecondaryIconOnly: Story = {
  args: {
    priority: 'secondary',
    state: 'default',
    text: false,
    iconLeft: 'close',
    iconRight: undefined,
  },
};

// Text Only (No Icons)
export const TextOnly: Story = {
  args: {
    priority: 'primary',
    state: 'default',
    label: 'Simple Button',
    text: true,
    iconLeft: undefined,
    iconRight: undefined,
  },
};
