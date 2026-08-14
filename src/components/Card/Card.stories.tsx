import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'case-study'],
    },
    title: {
      control: 'text',
    },
    interactive: {
      control: 'boolean',
    },
    placeholder: {
      control: 'boolean',
    },
  },
  args: {
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '480px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default variant ───────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'Colours',
    children: (
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'conic-gradient(from 180deg, #118AB2, #EF476F, #FFD166, #06D6A0, #118AB2)',
        }}
      />
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'default',
    title: 'Typography',
    interactive: true,
    children: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <span style={{ fontSize: '48px', fontWeight: 300, color: 'var(--color-text-primary)' }}>Aa</span>
        <span style={{ fontSize: '56px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Aa</span>
      </div>
    ),
  },
};

// ── Case-study variant ────────────────────────────────────────────────────────

export const CaseStudyWithCover: Story = {
  args: {
    variant: 'case-study',
    title: 'Designing Embedded AI Experiences Inside ChatGPT and Claude',
    dek: "What I learned leading design for TurboTax's embedded AI experiences",
    companyName: 'TurboTax',
    companyLogo: '/logos/turbotax.svg',
    coverSrc: '/images/heroes/claude.png',
    coverAlt: 'TurboTax embedded AI cover',
    href: '/work/embedded-ai-turbotax',
  },
};

/**
 * A drawn cover: `cover` takes any node and fills the same fixed-ratio slot the
 * image would, so a grid keeps one cover shape whichever kind each card was
 * given. The website uses it for vector redraws of the screens behind each
 * study; an SVG stands in here.
 */
export const CaseStudyDrawnCover: Story = {
  args: {
    variant: 'case-study',
    title: 'Building robr0 DS: the rules that hold',
    dek: 'Six months building a design system where breaking a rule fails the build',
    companyName: 'Personal',
    companyLogo: '/logos/rr.svg',
    href: '/work/robr0-ds',
    cover: (
      <svg viewBox="0 0 940 480" role="img" aria-label="Drawn cover placeholder">
        <rect width="940" height="480" fill="var(--color-bg-container-secondary)" />
        <rect x="80" y="120" width="360" height="24" rx="12" fill="var(--color-action-primary-bg)" />
        <rect x="80" y="176" width="600" height="16" rx="8" fill="var(--color-bg-container-border)" />
        <rect x="80" y="216" width="480" height="16" rx="8" fill="var(--color-bg-container-border)" />
      </svg>
    ),
  },
};

export const CaseStudyNoCover: Story = {
  args: {
    variant: 'case-study',
    title: 'Intuit Agent Chat',
    dek: "Designing and shipping Intuit's official conversational AI platform from 0 → 1",
    companyName: 'Intuit',
    companyLogo: '/logos/Intuit.svg',
    href: '/work/intuit-agent-chat',
  },
};

export const CaseStudyPlaceholder: Story = {
  args: {
    variant: 'case-study',
    title: 'Coming soon',
    dek: 'This case study is still being written.',
    companyName: 'Acme',
    companyLogo: '/logos/Intuit.svg',
    placeholder: true,
  },
};
