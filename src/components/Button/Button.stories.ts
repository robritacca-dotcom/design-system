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
    icon: {
      control: 'text',
      description: 'Material Symbol icon name (e.g., "menu", "home", "settings")',
    },
    iconStyle: {
      control: 'select',
      options: ['outlined', 'rounded', 'sharp'],
      description: 'Icon style variant',
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
    icon: false,
  },
};

export const PrimaryHover: Story = {
  args: {
    priority: 'primary',
    state: 'hover',
    label: 'Button',
    text: true,
    icon: false,
  },
};

export const PrimaryActive: Story = {
  args: {
    priority: 'primary',
    state: 'active',
    label: 'Button',
    text: true,
    icon: false,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    priority: 'primary',
    state: 'disabled',
    label: 'Button',
    text: true,
    icon: false,
  },
};

// Secondary Button States
export const SecondaryDefault: Story = {
  args: {
    priority: 'secondary',
    state: 'default',
    label: 'Button',
    text: true,
    icon: false,
  },
};

export const SecondaryHover: Story = {
  args: {
    priority: 'secondary',
    state: 'hover',
    label: 'Button',
    text: true,
    icon: false,
  },
};

export const SecondaryActive: Story = {
  args: {
    priority: 'secondary',
    state: 'active',
    label: 'Button',
    text: true,
    icon: false,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    priority: 'secondary',
    state: 'disabled',
    label: 'Button',
    text: true,
    icon: false,
  },
};

// With Icon - Sharp (Default)
export const PrimaryWithIconSharp: Story = {
  args: {
    priority: 'primary',
    state: 'default',
    label: 'Menu',
    text: true,
    icon: 'menu',
    iconStyle: 'sharp',
  },
};

export const SecondaryWithIconSharp: Story = {
  args: {
    priority: 'secondary',
    state: 'default',
    label: 'Home',
    text: true,
    icon: 'home',
    iconStyle: 'sharp',
  },
};

// With Icon - Rounded
export const PrimaryWithIconRounded: Story = {
  args: {
    priority: 'primary',
    state: 'default',
    label: 'Settings',
    text: true,
    icon: 'settings',
    iconStyle: 'rounded',
  },
};

export const SecondaryWithIconRounded: Story = {
  args: {
    priority: 'secondary',
    state: 'default',
    label: 'Search',
    text: true,
    icon: 'search',
    iconStyle: 'rounded',
  },
};

// With Icon - Outlined
export const PrimaryWithIconOutlined: Story = {
  args: {
    priority: 'primary',
    state: 'default',
    label: 'Favorite',
    text: true,
    icon: 'favorite',
    iconStyle: 'outlined',
  },
};

export const SecondaryWithIconOutlined: Story = {
  args: {
    priority: 'secondary',
    state: 'default',
    label: 'Star',
    text: true,
    icon: 'star',
    iconStyle: 'outlined',
  },
};

// Icon Only
export const PrimaryIconOnly: Story = {
  args: {
    priority: 'primary',
    state: 'default',
    text: false,
    icon: 'add',
    iconStyle: 'sharp',
  },
};

export const SecondaryIconOnly: Story = {
  args: {
    priority: 'secondary',
    state: 'default',
    text: false,
    icon: 'close',
    iconStyle: 'sharp',
  },
};
