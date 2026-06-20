import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Foundations/Logos',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Get all logo files
const logos = [
  'Adobe.svg',
  'AdParlor.svg',
  'ant-design.svg',
  'apple black.svg',
  'apple white.svg',
  'Apple.svg',
  'Arc.svg',
  'Asana.svg',
  'Atlassian.svg',
  'logo/Augmenta.png',
  'Canada.svg',
  'canon.svg',
  'chatGPT black.svg',
  'chatGPT white.svg',
  'ChatGPT.svg',
  'CIBC.svg',
  'Claude.svg',
  'Cognizant.svg',
  'Creditkarma.svg',
  'cursor.svg',
  'Deque.svg',
  'Devbridge.svg',
  'Fengate.svg',
  'Figma.svg',
  'Git.svg',
  'GoDaddy.svg',
  'Illustrator.svg',
  'Instacart.svg',
  'Intuit.svg',
  'invision.svg',
  'keynote.svg',
  'lightroom.svg',
  'mailchimp.svg',
  'material.svg',
  'meta.svg',
  'miro.svg',
  'nextjs black.svg',
  'nextjs white.svg',
  'play.png',
  'premiere.svg',
  'quickbooks.svg',
  'React.svg',
  'redgiant.svg',
  'rr.svg',
  'sheridan.svg',
  'sketch.svg',
  'slii.svg',
  'storybook.svg',
  'stripe.svg',
  'substack.svg',
  'turbotax.svg',
  'uoft.svg',
  'usa.svg',
  'vercel black.svg',
  'vercel white.svg',
  'vite.svg',
  'wordpress.svg',
  'zeplin.svg',
];

const LogoCard = ({ filename }: { filename: string }) => {
  const name = filename.replace('.svg', '');

  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid var(--color-bg-container-border)',
        borderRadius: '8px',
        backgroundColor: 'var(--color-bg-container-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-action-primary-border)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-bg-container-border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          width: '100%',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={`/logos/${filename}`}
          alt={name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
      <div
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          textAlign: 'center',
          fontFamily: 'monospace',
        }}
      >
        {name}
      </div>
    </div>
  );
};

export const AllLogos: Story = {
  render: () => (
    <div style={{ maxWidth: '1400px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '12px',
        }}
      >
        Logo Library
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          marginBottom: '32px',
          lineHeight: '1.5',
        }}
      >
        Collection of {logos.length} company and product logos in SVG format.
        All logos are stored in <code style={{
          backgroundColor: 'var(--color-bg-container-secondary)',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '13px',
          fontFamily: 'monospace',
        }}>/public/logos/</code>
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
        }}
      >
        {logos.map((logo) => (
          <LogoCard key={logo} filename={logo} />
        ))}
      </div>
    </div>
  ),
};

export const LightBackground: Story = {
  render: () => (
    <div style={{ maxWidth: '1400px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '12px',
        }}
      >
        Logos on Light Background
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          marginBottom: '32px',
          lineHeight: '1.5',
        }}
      >
        Preview logos on a light background to check visibility and contrast.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
        }}
      >
        {logos.map((logo) => {
          const name = logo.replace('.svg', '');
          return (
            <div
              key={logo}
              style={{
                padding: '24px',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={`/logos/${logo}`}
                  alt={name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#303030',
                  textAlign: 'center',
                  fontFamily: 'monospace',
                }}
              >
                {name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

export const DarkBackground: Story = {
  render: () => (
    <div style={{ maxWidth: '1400px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '12px',
        }}
      >
        Logos on Dark Background
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          marginBottom: '32px',
          lineHeight: '1.5',
        }}
      >
        Preview logos on a dark background to check visibility and contrast.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
        }}
      >
        {logos.map((logo) => {
          const name = logo.replace('.svg', '');
          return (
            <div
              key={logo}
              style={{
                padding: '24px',
                border: '1px solid #303030',
                borderRadius: '8px',
                backgroundColor: '#0E0E0E',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={`/logos/${logo}`}
                  alt={name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#F1F1F1',
                  textAlign: 'center',
                  fontFamily: 'monospace',
                }}
              >
                {name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ),
};
