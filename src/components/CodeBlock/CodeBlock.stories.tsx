import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from './CodeBlock';

const SAMPLE_TSX = `import { Chip } from '@design-system/components/Chip/Chip';

<Chip label="Filter" icon="check" selected onClick={toggle} />`;

const SAMPLE_CSS = `.ds-button {
  background-color: var(--color-action-primary-bg);
  border-radius: var(--radius-full);
  padding: var(--padding-sm) var(--padding-lg);
}`;

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'text', description: 'Code string to display' },
    language: { control: 'text', description: 'Language tag in the header' },
    filename: { control: 'text', description: 'Filename in the header' },
    showCopy: { control: 'boolean', description: 'Show the copy button' },
  },
  args: {
    code: SAMPLE_TSX,
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    code: SAMPLE_TSX,
    language: 'tsx',
  },
};

export const WithFilename: Story = {
  args: {
    code: SAMPLE_CSS,
    filename: 'Button.css',
    language: 'css',
  },
};

export const NoHeader: Story = {
  args: {
    code: 'npm run storybook',
    showCopy: false,
  },
};

export const LongLines: Story = {
  args: {
    code: `--color-action-primary-bg: var(--primitive-teal-07); /* #118AB2 — primary CTA fill, focus rings, active input borders. Never decorative. */`,
    filename: 'tokens-light.css',
    language: 'css',
  },
};
