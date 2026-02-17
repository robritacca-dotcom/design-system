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
      options: ['primary', 'secondary', 'destructive'],
      description: 'Button variant - primary, secondary, or destructive',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Button state for design system documentation',
    },
    size: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Button size — default or compact',
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
    size: 'default',
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

// ============================================
// Compact Button States
// ============================================

// Compact Primary States
export const CompactPrimaryDefault: Story = {
  args: {
    priority: 'primary',
    state: 'default',
    size: 'compact',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const CompactPrimaryHover: Story = {
  args: {
    priority: 'primary',
    state: 'hover',
    size: 'compact',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const CompactPrimaryActive: Story = {
  args: {
    priority: 'primary',
    state: 'active',
    size: 'compact',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const CompactPrimaryDisabled: Story = {
  args: {
    priority: 'primary',
    state: 'disabled',
    size: 'compact',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

// Compact Secondary States
export const CompactSecondaryDefault: Story = {
  args: {
    priority: 'secondary',
    state: 'default',
    size: 'compact',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const CompactSecondaryHover: Story = {
  args: {
    priority: 'secondary',
    state: 'hover',
    size: 'compact',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const CompactSecondaryActive: Story = {
  args: {
    priority: 'secondary',
    state: 'active',
    size: 'compact',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

export const CompactSecondaryDisabled: Story = {
  args: {
    priority: 'secondary',
    state: 'disabled',
    size: 'compact',
    label: 'Button',
    text: true,
    iconRight: 'arrow_forward',
  },
};

// ============================================
// Destructive Button States
// ============================================

export const DestructiveDefault: Story = {
  args: {
    priority: 'destructive',
    state: 'default',
    label: 'Delete',
    text: true,
    iconLeft: 'delete',
  },
};

export const DestructiveHover: Story = {
  args: {
    priority: 'destructive',
    state: 'hover',
    label: 'Delete',
    text: true,
    iconLeft: 'delete',
  },
};

export const DestructiveActive: Story = {
  args: {
    priority: 'destructive',
    state: 'active',
    label: 'Delete',
    text: true,
    iconLeft: 'delete',
  },
};

export const DestructiveDisabled: Story = {
  args: {
    priority: 'destructive',
    state: 'disabled',
    label: 'Delete',
    text: true,
    iconLeft: 'delete',
  },
};

// Compact Destructive States
export const CompactDestructiveDefault: Story = {
  args: {
    priority: 'destructive',
    state: 'default',
    size: 'compact',
    label: 'Remove',
    text: true,
    iconLeft: 'close',
  },
};

export const CompactDestructiveHover: Story = {
  args: {
    priority: 'destructive',
    state: 'hover',
    size: 'compact',
    label: 'Remove',
    text: true,
    iconLeft: 'close',
  },
};

export const CompactDestructiveActive: Story = {
  args: {
    priority: 'destructive',
    state: 'active',
    size: 'compact',
    label: 'Remove',
    text: true,
    iconLeft: 'close',
  },
};

export const CompactDestructiveDisabled: Story = {
  args: {
    priority: 'destructive',
    state: 'disabled',
    size: 'compact',
    label: 'Remove',
    text: true,
    iconLeft: 'close',
  },
};

// Destructive Icon Only
export const DestructiveIconOnly: Story = {
  args: {
    priority: 'destructive',
    state: 'default',
    text: false,
    iconLeft: 'delete',
    iconRight: undefined,
  },
};
