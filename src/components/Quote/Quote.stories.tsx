import type { Meta, StoryObj } from '@storybook/react-vite';
import { Quote } from './Quote';

const meta = {
  title: 'Components/Quote',
  component: Quote,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'Quote text' },
    attribution: { control: 'text', description: 'Who said it' },
    detail: { control: 'text', description: 'Context under the attribution' },
    variant: {
      control: 'select',
      options: ['default', 'pull'],
      description: 'Inline blockquote or large pull-quote',
    },
  },
  args: {
    children:
      'Large-scale systems are not primarily UI problems. They are coordination problems.',
  },
} satisfies Meta<typeof Quote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      'Large-scale systems are not primarily UI problems. They are coordination problems.',
  },
};

export const WithAttribution: Story = {
  args: {
    children:
      'The challenge is creating frameworks that allow hundreds of people and teams to build coherently over time.',
    attribution: 'Rob Ritacca',
    detail: 'Career Profile case study',
  },
};

export const Pull: Story = {
  args: {
    variant: 'pull',
    children:
      'Tokens flow from Figma to production without a handoff meeting.',
  },
};

export const PullWithAttribution: Story = {
  args: {
    variant: 'pull',
    children: 'Design still derisks development.',
    attribution: 'Rob Ritacca',
    detail: 'Writing, 2026',
  },
};
