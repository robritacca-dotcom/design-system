import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationCenter, NotificationItem } from './NotificationCenter';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/NotificationCenter',
  component: NotificationCenter,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    unreadCount: { control: 'number' },
  },
} satisfies Meta<typeof NotificationCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = (
  <>
    <NotificationItem
      title="Livia mentioned you"
      time="2m"
      unread
      media={<Avatar name="Livia Saris" size="sm" />}
      actions={
        <>
          <Button variant="secondary" size="compact" label="Reply" />
          <Button variant="tertiary" size="compact" label="View thread" />
        </>
      }
    >
      Can you review the new empty state before we ship the dashboard?
    </NotificationItem>
    <NotificationItem
      title="Workspace backup is ready"
      time="18m"
      unread
      media="cloud_done"
      actions={<Button variant="secondary" size="compact" label="Download" />}
    >
      The nightly backup finished and is ready to download.
    </NotificationItem>
    <NotificationItem
      title="You joined the design project"
      time="1h"
      media={<Avatar name="Maria Lubin" size="sm" />}
    >
      Maria added you as an editor, so every file is now open to you.
    </NotificationItem>
    <NotificationItem
      title="Preview deployment failed"
      time="Sat"
      media="error"
      actions={
        <>
          <Button variant="secondary" size="compact" label="Retry" />
          <Button variant="tertiary" size="compact" label="View logs" />
        </>
      }
    >
      The build stopped while validating the application routes.
    </NotificationItem>
  </>
);

export const Default: Story = {
  args: {
    unreadCount: 2,
    children: sampleItems,
  },
  render: (args) => (
    <div style={{ maxWidth: '420px' }}>
      <NotificationCenter {...args} onMarkAllRead={() => {}} />
    </div>
  ),
};

export const WithTabs: Story = {
  args: {
    unreadCount: 2,
    tabs: [
      { label: 'All', value: 'all', count: 6 },
      { label: 'Mentions', value: 'mentions', count: 2 },
      { label: 'System', value: 'system', count: 3 },
    ],
    children: sampleItems,
  },
  render: (args) => (
    <div style={{ maxWidth: '420px' }}>
      <NotificationCenter {...args} onMarkAllRead={() => {}} />
    </div>
  ),
};

export const Empty: Story = {
  args: {},
  render: (args) => (
    <div style={{ maxWidth: '420px' }}>
      <NotificationCenter {...args} />
    </div>
  ),
};

export const SingleItem: Story = {
  args: {
    children: (
      <NotificationItem title="Deployment finished" time="2m" unread media="rocket_launch">
        The site is live on production.
      </NotificationItem>
    ),
  },
  render: (args) => (
    <div style={{ maxWidth: '420px' }}>
      <NotificationCenter {...args} />
    </div>
  ),
};
