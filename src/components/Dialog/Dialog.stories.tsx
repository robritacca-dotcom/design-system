import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dismissible: {
      control: 'boolean',
    },
  },
  args: {
    open: false,
    onOpenChange: () => {},
    title: 'Dialog title',
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Trigger + dialog wrapper so stories are openable */
const DialogDemo = (props: Omit<React.ComponentProps<typeof Dialog>, 'open' | 'onOpenChange'>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open dialog" variant="secondary" onClick={() => setOpen(true)} />
      <Dialog {...props} open={open} onOpenChange={setOpen} />
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <DialogDemo
      {...args}
      title="Edit profile"
      description="Changes are saved when you press Save."
    >
      <p style={{ margin: 0 }}>
        Any content can live in the dialog body — forms, text, lists, or other
        components.
      </p>
    </DialogDemo>
  ),
};

export const WithFooter: Story = {
  render: (args) => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button label="Open dialog" variant="secondary" onClick={() => setOpen(true)} />
          <Dialog
            {...args}
            open={open}
            onOpenChange={setOpen}
            title="Rename project"
            footer={
              <>
                <Button label="Cancel" variant="tertiary" onClick={() => setOpen(false)} />
                <Button label="Save" variant="primary" onClick={() => setOpen(false)} />
              </>
            }
          >
            <Input label="Project name" placeholder="design-system" />
          </Dialog>
        </>
      );
    };
    return <Demo />;
  },
};

export const Small: Story = {
  render: (args) => (
    <DialogDemo {...args} title="Small dialog" size="sm">
      <p style={{ margin: 0 }}>A narrow panel for short messages.</p>
    </DialogDemo>
  ),
};

export const Large: Story = {
  render: (args) => (
    <DialogDemo {...args} title="Large dialog" size="lg">
      <p style={{ margin: 0 }}>
        A wide panel for richer content like tables, previews, or multi-column
        forms.
      </p>
    </DialogDemo>
  ),
};

export const NonDismissible: Story = {
  render: (args) => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button label="Open dialog" variant="secondary" onClick={() => setOpen(true)} />
          <Dialog
            {...args}
            open={open}
            onOpenChange={setOpen}
            title="Action required"
            description="This dialog only closes through the footer action."
            dismissible={false}
            footer={<Button label="Acknowledge" variant="primary" onClick={() => setOpen(false)} />}
          >
            <p style={{ margin: 0 }}>
              ESC, backdrop clicks, and the close button are disabled.
            </p>
          </Dialog>
        </>
      );
    };
    return <Demo />;
  },
};

export const LongContent: Story = {
  render: (args) => (
    <DialogDemo
      {...args}
      title="Terms of service"
      description="The body scrolls while the header stays pinned."
    >
      {Array.from({ length: 12 }, (_, i) => (
        <p key={i} style={{ marginTop: 0 }}>
          Section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Integer posuere erat a ante venenatis dapibus posuere velit
          aliquet. Cras mattis consectetur purus sit amet fermentum.
        </p>
      ))}
    </DialogDemo>
  ),
};
