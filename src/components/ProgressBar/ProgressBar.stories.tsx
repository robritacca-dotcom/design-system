import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    variant: {
      control: 'select',
      options: ['info', 'positive', 'warning', 'error', 'neutral'],
    },
    size: { control: 'select', options: ['default', 'compact'] },
    showLabel: { control: 'boolean' },
  },
  args: {
    value: 60,
    variant: 'info',
    size: 'default',
    showLabel: false,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { showLabel: true, value: 72 },
};

export const Compact: Story = {
  args: { size: 'compact', value: 45 },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <ProgressBar variant="info" value={80} showLabel />
      <ProgressBar variant="positive" value={100} showLabel />
      <ProgressBar variant="warning" value={55} showLabel />
      <ProgressBar variant="error" value={30} showLabel />
      <ProgressBar variant="neutral" value={45} showLabel />
    </div>
  ),
};
