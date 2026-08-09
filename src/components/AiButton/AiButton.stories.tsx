import type { Meta, StoryObj } from '@storybook/react-vite';
import { AiButton } from './AiButton';

const meta = {
  title: 'Components/AiButton',
  component: AiButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['default', 'compact'] },
  },
} satisfies Meta<typeof AiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomLabel: Story = {
  args: { label: 'Chat with the agent', icon: 'forum' },
};

export const Compact: Story = {
  args: { size: 'compact' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AsLink: Story = {
  args: { label: 'Open the chat', href: '#', icon: 'forum' },
};
