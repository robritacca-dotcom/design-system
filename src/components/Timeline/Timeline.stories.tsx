import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from './Timeline';

const CAREER_ITEMS = [
  {
    meta: 'May 2024 — Present',
    title: 'Intuit — Staff Product Designer',
    description:
      'Led design of Intuit Intelligence, the conversational AI platform powering 3.8M monthly customer interactions.',
  },
  {
    meta: 'Aug 2023 — May 2024',
    title: 'Augmenta — Lead Product Designer',
    description:
      'Redesigned AI generation workflows for electrical routing — successful generations up ~900%.',
  },
  {
    meta: '2021 — 2023',
    title: 'Meta — Product Designer',
    description: 'Career Profile and Offer Creation platforms for global recruiting.',
  },
];

const PROCESS_ITEMS = [
  { title: 'Pull analytics' },
  { title: 'One hypothesis' },
  { title: 'Rewrite on a branch' },
  { title: 'Approval' },
];

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Vertical timeline or horizontal stepper',
    },
    numbered: { control: 'boolean', description: 'Number the markers 1..n' },
  },
  args: {
    items: CAREER_ITEMS,
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: CAREER_ITEMS,
  },
};

export const Numbered: Story = {
  args: {
    items: PROCESS_ITEMS,
    numbered: true,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { icon: 'monitoring', title: 'Pull analytics', description: 'Read GA4, filter bot noise.' },
      { icon: 'edit', title: 'Rewrite on a branch', description: 'One copy-shaped change.' },
      { icon: 'check_circle', title: 'Approval', description: 'A human approves every merge.' },
    ],
  },
};

export const HorizontalStepper: Story = {
  args: {
    items: PROCESS_ITEMS,
    orientation: 'horizontal',
    numbered: true,
  },
};

export const HorizontalDots: Story = {
  args: {
    items: PROCESS_ITEMS.map(({ title }) => ({ title })),
    orientation: 'horizontal',
  },
};
