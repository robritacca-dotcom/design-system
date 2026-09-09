import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { ThreadPanel } from './ThreadPanel';

/* All data here is fictional: Skylark is a made-up product, atlas-* are
   made-up repos. */

const GROUPS = [
  {
    label: 'atlas-app',
    threads: [
      { id: 'onboarding', title: 'Rework the onboarding flow' },
      { id: 'search', title: 'Speed up the search index' },
      { id: 'billing', title: 'Untangle the billing webhooks' },
      { id: 'flags', title: 'Retire the stale feature flags' },
    ],
  },
  {
    label: 'atlas-docs',
    threads: [
      { id: 'quickstart', title: 'Rewrite the quickstart guide' },
      { id: 'api-ref', title: 'Generate the API reference' },
      { id: 'broken-links', title: 'Fix the broken changelog links' },
    ],
  },
];

const CONTROLS = [
  { id: 'projects', icon: 'folder', label: 'Projects' },
  { id: 'automations', icon: 'schedule', label: 'Automations' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
];

const meta = {
  title: 'Components/ThreadPanel',
  component: ThreadPanel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    activeThreadId: { control: 'text' },
    logoText: { control: 'text' },
    newThreadLabel: { control: 'text' },
    moreLabel: { control: 'text' },
  },
  args: {
    groups: GROUPS,
    onThreadSelect: fn(),
    onNewThread: fn(),
    onControlSelect: fn(),
    onShowMore: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280, height: 560, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ThreadPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full anatomy: brand, new-thread action with its shortcut hint,
 *  standing controls, grouped history with an active row, and the footer
 *  profile. */
export const Default: Story = {
  args: {
    logoText: 'Skylark',
    activeThreadId: 'search',
    newThreadLabel: 'New thread',
    newThreadShortcut: ['Ctrl', 'N'],
    controls: CONTROLS,
    moreLabel: 'Show 12 more',
    profile: { name: 'Robin Vale', meta: 'Team' },
    onExpandedChange: fn(),
  },
};

/** Collapsed to the icon rail: the toggle, the new-thread and control
 *  icons, and the avatar; the history hides and every hidden label moves
 *  into its row's accessible name and tooltip. The host owns the state and
 *  the band's width. */
export const Collapsed: Story = {
  args: {
    logoText: 'Skylark',
    expanded: false,
    onExpandedChange: fn(),
    activeThreadId: 'search',
    newThreadLabel: 'New thread',
    controls: CONTROLS,
    profile: { name: 'Robin Vale', meta: 'Team' },
  },
};

/** Nothing but the history: every other section is optional and simply
 *  absent when its props are. */
export const ThreadsOnly: Story = {
  args: {
    activeThreadId: 'quickstart',
  },
};

/** Threads carrying `meta` timestamps at the trailing edge. */
export const WithMeta: Story = {
  args: {
    logoText: 'Skylark',
    activeThreadId: 'onboarding',
    groups: [
      {
        label: 'atlas-app',
        threads: [
          { id: 'onboarding', title: 'Rework the onboarding flow', meta: 'now' },
          { id: 'search', title: 'Speed up the search index', meta: '2h' },
          { id: 'billing', title: 'Untangle the billing webhooks', meta: '1d' },
          { id: 'flags', title: 'Retire the stale feature flags', meta: '3d' },
        ],
      },
    ],
  },
};

/** Rows as real links: with an `href` each thread renders as an anchor and
 *  the active row announces `aria-current="page"`. */
export const AsLinks: Story = {
  args: {
    activeThreadId: 'search',
    groups: [
      {
        label: 'atlas-app',
        threads: [
          { id: 'onboarding', title: 'Rework the onboarding flow', href: '#onboarding' },
          { id: 'search', title: 'Speed up the search index', href: '#search' },
          { id: 'billing', title: 'Untangle the billing webhooks', href: '#billing' },
        ],
      },
    ],
    newThreadLabel: 'New thread',
    newThreadHref: '#new',
  },
};

/** Long titles truncate to one line; the full text stays available in the
 *  native tooltip. */
export const LongTitles: Story = {
  args: {
    activeThreadId: 'long-2',
    groups: [
      {
        label: 'atlas-app',
        threads: [
          {
            id: 'long-1',
            title:
              'Investigate why the nightly import job quietly drops rows when the upstream feed stalls mid-file',
          },
          {
            id: 'long-2',
            title:
              'Draft the migration plan for moving every workspace onto the new permission model without downtime',
          },
          { id: 'short', title: 'Fix the favicon' },
        ],
      },
    ],
  },
};

/** Selection is the host's: clicking a row fires `onThreadSelect` with the
 *  row's id, and the controlled `activeThreadId` carries `aria-current`. */
export const Selection: Story = {
  args: {
    activeThreadId: 'billing',
    newThreadLabel: 'New thread',
    controls: CONTROLS,
    moreLabel: 'Show 12 more',
    onExpandedChange: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Collapse the panel' }),
    );
    await expect(args.onExpandedChange).toHaveBeenCalledWith(false);

    await userEvent.click(
      canvas.getByRole('button', { name: 'Speed up the search index' }),
    );
    await expect(args.onThreadSelect).toHaveBeenCalledWith('search');

    await userEvent.click(canvas.getByRole('button', { name: 'New thread' }));
    await expect(args.onNewThread).toHaveBeenCalled();

    await userEvent.click(canvas.getByRole('button', { name: 'Automations' }));
    await expect(args.onControlSelect).toHaveBeenCalledWith('automations');

    await userEvent.click(canvas.getByRole('button', { name: 'Show 12 more' }));
    await expect(args.onShowMore).toHaveBeenCalled();

    const active = canvas.getByRole('button', {
      name: 'Untangle the billing webhooks',
    });
    await expect(active).toHaveAttribute('aria-current', 'true');

    // Rest the pointer off the rows so hover styling stays out of snapshots.
    await userEvent.click(canvas.getByRole('navigation'));
  },
};
