import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Foundations/Tokens',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to display color tokens
const ColorToken = ({ name, value }: { name: string; value: string }) => {
  const computedValue = getComputedStyle(document.documentElement)
    .getPropertyValue(value)
    .trim();

  return (
    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '40px',
            backgroundColor: `var(${value})`,
            border: '1px solid var(--color-bg-container-border)',
            borderRadius: '4px',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '13px',
              fontFamily: 'monospace',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--color-text-tertiary)',
              marginTop: '2px',
            }}
          >
            {computedValue}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component to display spacing tokens
const SpacingToken = ({ name, value }: { name: string; value: string }) => {
  const computedValue = getComputedStyle(document.documentElement)
    .getPropertyValue(value)
    .trim();

  return (
    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: `var(${value})`,
            height: '40px',
            backgroundColor: 'var(--color-action-primary-bg)',
            borderRadius: '4px',
            flexShrink: 0,
            minWidth: '2px',
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '13px',
              fontFamily: 'monospace',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--color-text-tertiary)',
              marginTop: '2px',
            }}
          >
            {computedValue}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component to display border radius tokens
const RadiusToken = ({ name, value }: { name: string; value: string }) => {
  const computedValue = getComputedStyle(document.documentElement)
    .getPropertyValue(value)
    .trim();

  return (
    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'var(--color-action-primary-bg)',
            borderRadius: `var(${value})`,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '13px',
              fontFamily: 'monospace',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--color-text-tertiary)',
              marginTop: '2px',
            }}
          >
            {computedValue}
          </div>
        </div>
      </div>
    </div>
  );
};

// Section component
const TokenSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div style={{ marginBottom: '40px' }}>
    <h3
      style={{
        fontSize: '18px',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        marginBottom: '16px',
        borderBottom: '2px solid var(--color-bg-container-border)',
        paddingBottom: '8px',
      }}
    >
      {title}
    </h3>
    {children}
  </div>
);

// Primitives Story
export const Primitives: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
        }}
      >
        Primitive Tokens
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          marginBottom: '32px',
          lineHeight: '1.5',
        }}
      >
        Raw values that are the source of truth. Do not use these directly in
        components — use semantic tokens instead.
      </p>

      <TokenSection title="Neutral Scale">
        <ColorToken name="00 (White)" value="--primitive-neutral-00" />
        <ColorToken name="01" value="--primitive-neutral-01" />
        <ColorToken name="02" value="--primitive-neutral-02" />
        <ColorToken name="03" value="--primitive-neutral-03" />
        <ColorToken name="04" value="--primitive-neutral-04" />
        <ColorToken name="05" value="--primitive-neutral-05" />
        <ColorToken name="06" value="--primitive-neutral-06" />
        <ColorToken name="07" value="--primitive-neutral-07" />
        <ColorToken name="08" value="--primitive-neutral-08" />
        <ColorToken name="09" value="--primitive-neutral-09" />
        <ColorToken name="10" value="--primitive-neutral-10" />
        <ColorToken name="11 (Black)" value="--primitive-neutral-11" />
      </TokenSection>

      <TokenSection title="Red Scale">
        <ColorToken name="01 (Lightest)" value="--primitive-red-01" />
        <ColorToken name="02" value="--primitive-red-02" />
        <ColorToken name="03" value="--primitive-red-03" />
        <ColorToken name="04" value="--primitive-red-04" />
        <ColorToken name="05" value="--primitive-red-05" />
        <ColorToken name="06" value="--primitive-red-06" />
        <ColorToken name="07" value="--primitive-red-07" />
        <ColorToken name="08" value="--primitive-red-08" />
        <ColorToken name="09" value="--primitive-red-09" />
        <ColorToken name="10 (Darkest)" value="--primitive-red-10" />
      </TokenSection>

      <TokenSection title="Yellow Scale">
        <ColorToken name="01 (Lightest)" value="--primitive-yellow-01" />
        <ColorToken name="02" value="--primitive-yellow-02" />
        <ColorToken name="03" value="--primitive-yellow-03" />
        <ColorToken name="04" value="--primitive-yellow-04" />
        <ColorToken name="05" value="--primitive-yellow-05" />
        <ColorToken name="06" value="--primitive-yellow-06" />
        <ColorToken name="07" value="--primitive-yellow-07" />
        <ColorToken name="08" value="--primitive-yellow-08" />
        <ColorToken name="09" value="--primitive-yellow-09" />
        <ColorToken name="10 (Darkest)" value="--primitive-yellow-10" />
      </TokenSection>

      <TokenSection title="Green Scale">
        <ColorToken name="01 (Lightest)" value="--primitive-green-01" />
        <ColorToken name="02" value="--primitive-green-02" />
        <ColorToken name="03" value="--primitive-green-03" />
        <ColorToken name="04" value="--primitive-green-04" />
        <ColorToken name="05" value="--primitive-green-05" />
        <ColorToken name="06" value="--primitive-green-06" />
        <ColorToken name="07" value="--primitive-green-07" />
        <ColorToken name="08" value="--primitive-green-08" />
        <ColorToken name="09" value="--primitive-green-09" />
        <ColorToken name="10 (Darkest)" value="--primitive-green-10" />
      </TokenSection>

      <TokenSection title="Teal Scale">
        <ColorToken name="01 (Lightest)" value="--primitive-teal-01" />
        <ColorToken name="02" value="--primitive-teal-02" />
        <ColorToken name="03" value="--primitive-teal-03" />
        <ColorToken name="04" value="--primitive-teal-04" />
        <ColorToken name="05" value="--primitive-teal-05" />
        <ColorToken name="06" value="--primitive-teal-06" />
        <ColorToken name="07" value="--primitive-teal-07" />
        <ColorToken name="08" value="--primitive-teal-08" />
        <ColorToken name="09" value="--primitive-teal-09" />
        <ColorToken name="10 (Darkest)" value="--primitive-teal-10" />
      </TokenSection>

      <TokenSection title="Blue Scale">
        <ColorToken name="01 (Lightest)" value="--primitive-blue-01" />
        <ColorToken name="02" value="--primitive-blue-02" />
        <ColorToken name="03" value="--primitive-blue-03" />
        <ColorToken name="04" value="--primitive-blue-04" />
        <ColorToken name="05" value="--primitive-blue-05" />
        <ColorToken name="06" value="--primitive-blue-06" />
        <ColorToken name="07" value="--primitive-blue-07" />
        <ColorToken name="08" value="--primitive-blue-08" />
        <ColorToken name="09" value="--primitive-blue-09" />
        <ColorToken name="10 (Darkest)" value="--primitive-blue-10" />
      </TokenSection>

      <TokenSection title="Purple Scale">
        <ColorToken name="01 (Lightest)" value="--primitive-purple-01" />
        <ColorToken name="02" value="--primitive-purple-02" />
        <ColorToken name="03" value="--primitive-purple-03" />
        <ColorToken name="04" value="--primitive-purple-04" />
        <ColorToken name="05" value="--primitive-purple-05" />
        <ColorToken name="06" value="--primitive-purple-06" />
        <ColorToken name="07" value="--primitive-purple-07" />
        <ColorToken name="08" value="--primitive-purple-08" />
        <ColorToken name="09" value="--primitive-purple-09" />
        <ColorToken name="10 (Darkest)" value="--primitive-purple-10" />
      </TokenSection>

      <TokenSection title="Border Radius">
        <RadiusToken name="XXS" value="--primitive-radius-xxs" />
        <RadiusToken name="XS" value="--primitive-radius-xs" />
        <RadiusToken name="SM" value="--primitive-radius-sm" />
        <RadiusToken name="MD" value="--primitive-radius-md" />
        <RadiusToken name="LG" value="--primitive-radius-lg" />
        <RadiusToken name="XL" value="--primitive-radius-xl" />
        <RadiusToken name="XXL" value="--primitive-radius-xxl" />
        <RadiusToken name="Full" value="--primitive-radius-full" />
      </TokenSection>

      <TokenSection title="Padding">
        <SpacingToken name="XXXS" value="--primitive-padding-xxxs" />
        <SpacingToken name="XXS" value="--primitive-padding-xxs" />
        <SpacingToken name="XS" value="--primitive-padding-xs" />
        <SpacingToken name="SM" value="--primitive-padding-sm" />
        <SpacingToken name="SM-MD" value="--primitive-padding-sm-md" />
        <SpacingToken name="MD" value="--primitive-padding-md" />
        <SpacingToken name="LG" value="--primitive-padding-lg" />
        <SpacingToken name="XL" value="--primitive-padding-xl" />
        <SpacingToken name="XXL" value="--primitive-padding-xxl" />
      </TokenSection>

      <TokenSection title="Border Width">
        <SpacingToken name="XS" value="--primitive-border-xs" />
        <SpacingToken name="MD" value="--primitive-border-md" />
      </TokenSection>

      <TokenSection title="Gap">
        <SpacingToken name="XXS" value="--primitive-gap-xxs" />
        <SpacingToken name="XS" value="--primitive-gap-xs" />
        <SpacingToken name="SM" value="--primitive-gap-sm" />
        <SpacingToken name="SM-MD" value="--primitive-gap-sm-md" />
        <SpacingToken name="MD" value="--primitive-gap-md" />
        <SpacingToken name="LG" value="--primitive-gap-lg" />
        <SpacingToken name="XL" value="--primitive-gap-xl" />
        <SpacingToken name="XXL" value="--primitive-gap-xxl" />
        <SpacingToken name="XXXL" value="--primitive-gap-xxxl" />
        <SpacingToken name="XXXXL" value="--primitive-gap-xxxxl" />
      </TokenSection>
    </div>
  ),
};

// Semantic Colors Story
export const SemanticColors: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
        }}
      >
        Semantic Color Tokens
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          marginBottom: '32px',
          lineHeight: '1.5',
        }}
      >
        Theme-aware semantic tokens. These automatically switch between light
        and dark themes. Always use these in components.
      </p>

      <TokenSection title="Text Colors">
        <ColorToken name="Primary" value="--color-text-primary" />
        <ColorToken name="Secondary" value="--color-text-secondary" />
        <ColorToken name="Tertiary" value="--color-text-tertiary" />
        <ColorToken name="Inverse" value="--color-text-inverse" />
      </TokenSection>

      <TokenSection title="Icon Colors">
        <ColorToken name="Primary" value="--color-icon-primary" />
        <ColorToken name="Secondary" value="--color-icon-secondary" />
      </TokenSection>

      <TokenSection title="Background - Page">
        <ColorToken name="Primary" value="--color-bg-page-primary" />
        <ColorToken name="Inverse" value="--color-bg-page-inverse" />
      </TokenSection>

      <TokenSection title="Background - Container">
        <ColorToken name="Primary" value="--color-bg-container-primary" />
        <ColorToken
          name="Primary Transparent"
          value="--color-bg-container-primary-transparent"
        />
        <ColorToken
          name="Primary Semi"
          value="--color-bg-container-primary-semi"
        />
        <ColorToken name="Secondary" value="--color-bg-container-secondary" />
        <ColorToken name="Tertiary" value="--color-bg-container-tertiary" />
        <ColorToken name="Inverse" value="--color-bg-container-inverse" />
        <ColorToken name="Border" value="--color-bg-container-border" />
      </TokenSection>

      <TokenSection title="Action - Primary">
        <ColorToken name="Background" value="--color-action-primary-bg" />
        <ColorToken
          name="Background Hover"
          value="--color-action-primary-bg-hover"
        />
        <ColorToken
          name="Background Active"
          value="--color-action-primary-bg-active"
        />
        <ColorToken name="Text" value="--color-action-primary-text" />
        <ColorToken
          name="Text Secondary"
          value="--color-action-primary-text-secondary"
        />
        <ColorToken
          name="Text Tertiary"
          value="--color-action-primary-text-tertiary"
        />
        <ColorToken name="Border" value="--color-action-primary-border" />
        <ColorToken
          name="Border Secondary"
          value="--color-action-primary-border-secondary"
        />
        <ColorToken
          name="Border Tertiary"
          value="--color-action-primary-border-tertiary"
        />
        <ColorToken name="Icon" value="--color-action-icon" />
      </TokenSection>

      <TokenSection title="Action - Passive (Secondary)">
        <ColorToken name="Text" value="--color-action-passive-text" />
        <ColorToken name="Background" value="--color-action-passive-bg" />
        <ColorToken
          name="Background Hover"
          value="--color-action-passive-bg-hover"
        />
        <ColorToken
          name="Background Active"
          value="--color-action-passive-bg-active"
        />
      </TokenSection>

      <TokenSection title="Input">
        <ColorToken name="Text Primary" value="--color-input-text-primary" />
        <ColorToken name="Text Placeholder" value="--color-input-text-placeholder" />
        <ColorToken name="Text Disabled" value="--color-input-text-disabled" />
        <ColorToken name="Text Inverse" value="--color-input-text-inverse" />
        <ColorToken name="Border Primary" value="--color-input-border-primary" />
        <ColorToken name="Border Hover" value="--color-input-border-hover" />
        <ColorToken name="Border Selected" value="--color-input-border-selected" />
        <ColorToken name="Border Disabled" value="--color-input-border-disabled" />
        <ColorToken name="Background Primary" value="--color-input-bg-primary" />
        <ColorToken name="Background Disabled" value="--color-input-bg-disabled" />
      </TokenSection>

      <TokenSection title="Core Colors">
        <ColorToken name="UI Primary" value="--color-core-ui-primary" />
        <ColorToken name="UI Secondary" value="--color-core-ui-secondary" />
        <ColorToken name="Accent Red" value="--color-core-accent-red" />
        <ColorToken name="Accent Purple" value="--color-core-accent-purple" />
        <ColorToken name="Accent Blue" value="--color-core-accent-blue" />
        <ColorToken name="Accent Orange" value="--color-core-accent-orange" />
        <ColorToken name="Accent Yellow" value="--color-core-accent-yellow" />
        <ColorToken name="Accent Green" value="--color-core-accent-green" />
      </TokenSection>
    </div>
  ),
};

// Status Colors Story
export const StatusColors: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
        }}
      >
        Status Color Tokens
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          marginBottom: '32px',
          lineHeight: '1.5',
        }}
      >
        Semantic colors for status messages and alerts. These remain consistent
        across themes.
      </p>

      <TokenSection title="Positive">
        <ColorToken name="Background" value="--color-status-positive-bg" />
        <ColorToken name="Border" value="--color-status-positive-border" />
        <ColorToken name="Text" value="--color-status-positive-text" />
      </TokenSection>

      <TokenSection title="Warning">
        <ColorToken name="Background" value="--color-status-warning-bg" />
        <ColorToken name="Border" value="--color-status-warning-border" />
        <ColorToken name="Text" value="--color-status-warning-text" />
      </TokenSection>

      <TokenSection title="Error">
        <ColorToken name="Background" value="--color-status-error-bg" />
        <ColorToken name="Border" value="--color-status-error-border" />
        <ColorToken name="Text" value="--color-status-error-text" />
      </TokenSection>

      <TokenSection title="Info">
        <ColorToken name="Background" value="--color-status-info-bg" />
        <ColorToken name="Border" value="--color-status-info-border" />
        <ColorToken name="Text" value="--color-status-info-text" />
      </TokenSection>

      <TokenSection title="Neutral">
        <ColorToken name="Background" value="--color-status-neutral-bg" />
        <ColorToken name="Border" value="--color-status-neutral-border" />
        <ColorToken name="Text" value="--color-status-neutral-text" />
      </TokenSection>
    </div>
  ),
};

// Spacing Tokens Story
export const SemanticSpacing: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
        }}
      >
        Semantic Spacing Tokens
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          marginBottom: '32px',
          lineHeight: '1.5',
        }}
      >
        Semantic spacing tokens that reference primitives. Use these in
        components.
      </p>

      <TokenSection title="Border Radius">
        <RadiusToken name="XXS" value="--radius-xxs" />
        <RadiusToken name="XS" value="--radius-xs" />
        <RadiusToken name="SM" value="--radius-sm" />
        <RadiusToken name="MD" value="--radius-md" />
        <RadiusToken name="LG" value="--radius-lg" />
        <RadiusToken name="XL" value="--radius-xl" />
        <RadiusToken name="XXL" value="--radius-xxl" />
        <RadiusToken name="Full" value="--radius-full" />
      </TokenSection>

      <TokenSection title="Padding">
        <SpacingToken name="XXXS" value="--padding-xxxs" />
        <SpacingToken name="XXS" value="--padding-xxs" />
        <SpacingToken name="XS" value="--padding-xs" />
        <SpacingToken name="SM" value="--padding-sm" />
        <SpacingToken name="SM-MD" value="--padding-sm-md" />
        <SpacingToken name="MD" value="--padding-md" />
        <SpacingToken name="LG" value="--padding-lg" />
        <SpacingToken name="XL" value="--padding-xl" />
      </TokenSection>

      <TokenSection title="Border Width">
        <SpacingToken name="XS" value="--border-xs" />
        <SpacingToken name="MD" value="--border-md" />
      </TokenSection>

      <TokenSection title="Gap">
        <SpacingToken name="XXS" value="--gap-xxs" />
        <SpacingToken name="XS" value="--gap-xs" />
        <SpacingToken name="SM" value="--gap-sm" />
        <SpacingToken name="SM-MD" value="--gap-sm-md" />
        <SpacingToken name="MD" value="--gap-md" />
        <SpacingToken name="LG" value="--gap-lg" />
        <SpacingToken name="XL" value="--gap-xl" />
      </TokenSection>
    </div>
  ),
};
