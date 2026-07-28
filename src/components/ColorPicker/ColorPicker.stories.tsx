import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPicker } from './ColorPicker';

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'Hex colour (controlled)' },
    defaultValue: { control: 'text', description: 'Initial hex colour (uncontrolled)' },
    showText: { control: 'boolean', description: 'Show the hex value in the trigger' },
    showAlpha: { control: 'boolean', description: 'Alpha slider + 8-digit hex output' },
    size: { control: 'select', options: ['default', 'compact'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    defaultValue: '#118AB2',
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithText: Story = {
  args: {
    showText: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Brand colour',
    showText: true,
    helperText: 'Drives the whole action ramp.',
  },
};

export const WithAlpha: Story = {
  args: {
    showText: true,
    showAlpha: true,
    defaultValue: '#9E47EFCC',
  },
};

export const Compact: Story = {
  args: {
    size: 'compact',
    showText: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    showText: true,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Accent colour',
    error: true,
    helperText: 'This colour fails the contrast requirement.',
    showText: true,
  },
};

/** Controlled usage — the picker drives external state and reflects it back. */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [colour, setColour] = useState('#EF476F');
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ColorPicker value={colour} onValueChange={setColour} showText aria-label="Pick a colour" />
        <span style={{ fontSize: '14px' }}>Current: {colour}</span>
      </div>
    );
  },
};
