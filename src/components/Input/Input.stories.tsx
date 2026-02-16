import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Input label text' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    value: { control: 'text', description: 'Current value' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'Input type',
    },
    disabled: { control: 'boolean', description: 'Whether the input is disabled' },
    required: { control: 'boolean', description: 'Whether the input is required' },
    error: { control: 'boolean', description: 'Error state' },
    helperText: { control: 'text', description: 'Helper or error message' },
    iconLeft: { control: 'text', description: 'Material Symbol icon name on the left' },
    iconRight: { control: 'text', description: 'Material Symbol icon name on the right' },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    value: 'rob@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    required: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: true,
    helperText: 'Please enter a valid email address',
  },
};

export const WithIconLeft: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    iconLeft: 'search',
  },
};

export const WithIconRight: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    iconRight: 'mail',
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    iconLeft: 'search',
    iconRight: 'tune',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    value: 'disabled@example.com',
    disabled: true,
  },
};

export const NoLabel: Story = {
  args: {
    placeholder: 'No label input',
    ariaLabel: 'Unlabelled input',
  },
};
