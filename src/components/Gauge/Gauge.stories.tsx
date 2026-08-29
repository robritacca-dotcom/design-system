import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gauge } from './Gauge';

const meta = {
  title: 'Components/Gauge',
  component: Gauge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    tone: {
      control: 'select',
      options: ['accent', 'positive', 'warning', 'error', 'neutral'],
    },
  },
  args: {
    value: 64,
    label: 'CPU usage',
  },
} satisfies Meta<typeof Gauge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithThresholds: Story = {
  args: {
    value: 82,
    label: 'Memory',
    thresholds: [
      { value: 70, tone: 'warning' },
      { value: 90, tone: 'error' },
    ],
  },
};

export const Formatted: Story = {
  args: {
    value: 7.4,
    min: 0,
    max: 10,
    label: 'Quality score',
    tone: 'positive',
    formatValue: (value) => value.toFixed(1),
  },
};

export const Small: Story = {
  args: {
    value: 40,
    size: 80,
    strokeWidth: 8,
    label: undefined,
    'aria-label': 'Disk usage',
  },
};

export const Large: Story = {
  args: {
    value: 91,
    size: 180,
    strokeWidth: 14,
    label: 'Capacity',
    thresholds: [
      { value: 70, tone: 'warning' },
      { value: 90, tone: 'error' },
    ],
  },
};

export const DialOnly: Story = {
  args: {
    value: 55,
    showValue: false,
    label: undefined,
    'aria-label': 'Progress',
  },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Gauge value={64} tone="accent" size={96} label="Accent" />
      <Gauge value={64} tone="positive" size={96} label="Positive" />
      <Gauge value={64} tone="warning" size={96} label="Warning" />
      <Gauge value={64} tone="error" size={96} label="Error" />
      <Gauge value={64} tone="neutral" size={96} label="Neutral" />
    </div>
  ),
};
