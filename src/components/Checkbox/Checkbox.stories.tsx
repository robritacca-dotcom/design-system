import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    checked: { control: 'boolean', description: 'Whether the checkbox is checked' },
    indeterminate: { control: 'boolean', description: 'Indeterminate state' },
    disabled: { control: 'boolean', description: 'Whether the checkbox is disabled' },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    label: 'Accept terms',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Accept terms',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
    checked: false,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    label: 'Disabled option',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    checked: true,
    disabled: true,
  },
};

export const NoLabel: Story = {
  args: {
    checked: true,
    ariaLabel: 'Standalone checkbox',
  },
};
