import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColourSwatch } from './ColourSwatch';

const meta = {
  title: 'Components/ColourSwatch',
  component: ColourSwatch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    cssVar: {
      control: 'text',
    },
    theme: {
      control: 'radio',
      options: ['dark', 'light'],
    },
    status: {
      control: 'boolean',
    },
    borderVar: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ColourSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Primary UI colour — same values in both themes */
export const PrimaryUI: Story = {
  args: {
    label: 'Primary',
    cssVar: '--color-core-ui-primary',
    theme: 'dark',
    dark: { primitive: '--teal--07--', hex: '#118AB2', rgb: '17 / 138 / 178' },
    light: { primitive: '--teal--07--', hex: '#118AB2', rgb: '17 / 138 / 178' },
  },
};

/** Accent colour */
export const AccentRed: Story = {
  args: {
    label: 'Red',
    cssVar: '--color-core-accent-coral',
    theme: 'dark',
    dark: { primitive: '--red--07--', hex: '#EF476F', rgb: '239 / 71 / 111' },
    light: { primitive: '--red--07--', hex: '#EF476F', rgb: '239 / 71 / 111' },
  },
};

/** Theme-aware swatch — values change between dark and light */
export const ThemeAware: Story = {
  args: {
    label: 'Primary',
    cssVar: '--color-text-primary',
    theme: 'dark',
    dark: { primitive: '--neutral--01--', hex: '#F1F1F1', rgb: '241 / 241 / 241' },
    light: { primitive: '--neutral--10--', hex: '#050505', rgb: '5 / 5 / 5' },
  },
};

/** Status variant with left border accent */
export const StatusPositive: Story = {
  args: {
    label: 'Positive',
    cssVar: '--color-status-positive-bg',
    theme: 'dark',
    status: true,
    borderVar: '--color-status-positive-border',
    dark: { primitive: '--green--10--', hex: '#024336', rgb: '2 / 67 / 54' },
    light: { primitive: '--green--01--', hex: '#ECFCF7', rgb: '236 / 252 / 247' },
  },
};

/** Status error */
export const StatusError: Story = {
  args: {
    label: 'Error',
    cssVar: '--color-status-error-bg',
    theme: 'dark',
    status: true,
    borderVar: '--color-status-error-border',
    dark: { primitive: '--red--10--', hex: '#571727', rgb: '87 / 23 / 39' },
    light: { primitive: '--red--01--', hex: '#FDEFF3', rgb: '253 / 239 / 243' },
  },
};

/** Primitive swatch — no Primitive row, only Hex and RGB */
export const PrimitiveSwatch: Story = {
  args: {
    label: 'Teal 07',
    cssVar: '--primitive-teal-07',
    theme: 'dark',
    dark: { hex: '#118AB2', rgb: '17 / 138 / 178' },
  },
};

/** Grid of swatches — how they appear on the page */
export const SwatchGrid: Story = {
  args: {
    label: 'Primary',
    cssVar: '--color-core-ui-primary',
    theme: 'dark',
    dark: { primitive: '--teal--07--', hex: '#118AB2', rgb: '17 / 138 / 178' },
    light: { primitive: '--teal--07--', hex: '#118AB2', rgb: '17 / 138 / 178' },
  },
  decorators: [
    () => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', width: '660px' }}>
        <ColourSwatch
          label="Primary"
          cssVar="--color-core-ui-primary"
          dark={{ primitive: '--teal--07--', hex: '#118AB2', rgb: '17 / 138 / 178' }}
        />
        <ColourSwatch
          label="Secondary"
          cssVar="--color-core-ui-secondary"
          dark={{ primitive: '--teal--10--', hex: '#052F3E', rgb: '5 / 47 / 62' }}
        />
      </div>
    ),
  ],
};
