import type { Meta, StoryObj } from '@storybook/react-vite';
import { AnchorNav } from './AnchorNav';

const pageSections = [
  { id: 'preview', label: 'Preview' },
  { id: 'installation', label: 'Installation' },
  { id: 'filtering', label: 'Filtering' },
  { id: 'notification-data', label: 'Notification data and actions' },
];

const meta = {
  title: 'Components/AnchorNav',
  component: AnchorNav,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    icon: { control: 'text' },
    activeId: { control: 'select', options: pageSections.map((s) => s.id) },
    offset: { control: { type: 'range', min: 0, max: 200 } },
  },
  args: {
    items: pageSections,
    activeId: 'preview',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '280px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AnchorNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoHeader: Story = {
  args: {
    title: '',
    activeId: 'filtering',
  },
};

export const CustomHeader: Story = {
  args: {
    title: 'Contents',
    icon: 'format_list_bulleted',
    activeId: 'installation',
  },
};

export const LongList: Story = {
  args: {
    items: [
      ...pageSections,
      { id: 'keyboard', label: 'Keyboard support' },
      { id: 'theming', label: 'Theming' },
      { id: 'accessibility', label: 'Accessibility' },
      { id: 'api', label: 'API reference' },
    ],
    activeId: 'theming',
  },
};
