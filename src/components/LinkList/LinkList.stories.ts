import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkList } from './LinkList';

const meta = {
  title: 'Components/LinkList',
  component: LinkList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof LinkList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Read on Substack',
        href: 'https://substack.com',
        logo: '/logos/substack.svg',
        sub: 'Original post — same essay, longer form',
      },
      {
        label: 'ChatGPT Connector',
        href: 'https://chatgpt.com',
        logo: '/logos/ChatGPT.svg',
        sub: 'USA only',
      },
      {
        label: 'Claude Connector',
        href: 'https://claude.ai',
        logo: '/logos/Claude.svg',
        sub: 'USA only',
      },
    ],
  },
};

export const WithMaterialIcon: Story = {
  args: {
    items: [
      {
        label: 'Webby Awards 2026',
        href: 'https://webbyawards.com',
        icon: 'emoji_events',
        sub: ['Winner — AI · Financial Services', "People's Voice Winner — AI · Financial Services"],
      },
    ],
  },
};

export const NoSubtitle: Story = {
  args: {
    items: [
      {
        label: 'Intuit Blog',
        href: 'https://blog.turbotax.intuit.com',
        logo: '/logos/Intuit.svg',
      },
      {
        label: 'GitHub',
        href: 'https://github.com',
        logo: '/logos/Git.svg',
      },
    ],
  },
};

export const Consulting: Story = {
  args: {
    items: [
      {
        label: 'Book a consultation',
        href: 'https://buy.stripe.com/28o7vb5NBaSJ3NC5kn',
        logo: '/logos/stripe-new.png',
        logoAlt: 'Stripe',
        sub: 'Secure checkout via Stripe',
      },
    ],
  },
};
