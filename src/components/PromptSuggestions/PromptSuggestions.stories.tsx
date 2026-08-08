import type { Meta, StoryObj } from '@storybook/react-vite';
import { PromptSuggestions } from './PromptSuggestions';
import { Textarea } from '../Textarea/Textarea';

const meta = {
  title: 'Components/PromptSuggestions',
  component: PromptSuggestions,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    wrap: {
      control: 'boolean',
    },
    ariaLabel: {
      control: 'text',
    },
  },
  args: {
    suggestions: [
      { id: 'plan', label: 'Plan a weekend trip' },
      { id: 'recipe', label: 'Suggest a dinner recipe' },
      { id: 'email', label: 'Draft a polite follow-up' },
      { id: 'explain', label: 'Explain this like I am five' },
    ],
  },
} satisfies Meta<typeof PromptSuggestions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    suggestions: [
      { id: 'ideas', label: 'Brainstorm ideas', icon: 'lightbulb' },
      { id: 'summarise', label: 'Summarise a document', icon: 'description' },
      { id: 'translate', label: 'Translate a phrase', icon: 'translate' },
      { id: 'code', label: 'Write a script', icon: 'code' },
    ],
  },
};

/** Constrained width so the row scrolls and the edge fades show. */
export const Overflowing: Story = {
  args: {
    suggestions: [
      { id: 'trip', label: 'Plan a weekend trip' },
      { id: 'recipe', label: 'Suggest a dinner recipe' },
      { id: 'email', label: 'Draft a polite follow-up' },
      { id: 'quiz', label: 'Quiz me on capitals' },
      { id: 'poem', label: 'Write a short poem' },
      { id: 'budget', label: 'Sketch a monthly budget' },
      { id: 'workout', label: 'Build a workout plan' },
      { id: 'story', label: 'Tell me a bedtime story' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '420px' }}>
        <Story />
      </div>
    ),
  ],
};

/** The hero variant: wrapped and centred for an empty conversation. */
export const Wrapped: Story = {
  args: {
    wrap: true,
    suggestions: [
      { id: 'ideas', label: 'Brainstorm ideas', icon: 'lightbulb' },
      { id: 'summarise', label: 'Summarise a document', icon: 'description' },
      { id: 'translate', label: 'Translate a phrase', icon: 'translate' },
      { id: 'trip', label: 'Plan a weekend trip', icon: 'flight' },
      { id: 'recipe', label: 'Suggest a dinner recipe', icon: 'restaurant' },
    ],
    style: { justifyContent: 'center' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--gap-lg)',
          maxWidth: '480px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          What would you like to do today?
        </p>
        <Story />
      </div>
    ),
  ],
};

/** The row in its natural habitat, above a composer. */
export const AboveAComposer: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--gap-sm)',
        maxWidth: '520px',
      }}
    >
      <PromptSuggestions {...args} />
      <Textarea aria-label="Message" placeholder="Message the assistant" resize="none" />
    </div>
  ),
};
