import type { Meta, StoryObj } from '@storybook/react-vite';
import { Reasoning } from './Reasoning';

const TRACE = `The request asks for the total across both regions, but the two tables
report in different currencies. I need to convert before summing, and the rate
should be the one on the invoice date rather than today's.`;

const meta = {
  title: 'Components/Reasoning',
  component: Reasoning,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { children: TRACE },
} satisfies Meta<typeof Reasoning>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The resting state: collapsed, with the time it took. */
export const Default: Story = {
  args: { duration: 12 },
};

/** While the trace arrives the panel is open and the summary shimmers. */
export const Streaming: Story = {
  args: { streaming: true },
};

export const Expanded: Story = {
  args: { duration: 4, defaultOpen: true },
};

/** With no duration to report, the summary falls back to a plain label. */
export const NoDuration: Story = {};

export const CustomLabel: Story = {
  args: { label: 'Checked the currency conversion', duration: 8 },
};
