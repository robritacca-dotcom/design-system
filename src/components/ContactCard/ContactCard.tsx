import './ContactCard.css';
import '../../fonts/material-symbols.css';

export interface ContactCardProps {
  /** Primary label — e.g. "Email" */
  label: string;
  /** Visible value or description — e.g. "rob.ritacca@gmail.com" */
  value: string;
  /** Link destination */
  href: string;
  /** Material Symbol name used when no logo is set */
  icon?: string;
  /** Path to a logo image — preferred over icon when both are provided */
  logo?: string;
  /** Opens link in a new tab and shows open_in_new indicator */
  external?: boolean;
  /** Renders a copy-to-clipboard button; fires onCopy(value) when clicked */
  copyable?: boolean;
  /** Called with the card's value when the copy button is clicked */
  onCopy?: (value: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const ContactCard = ({
  label,
  value,
  href,
  icon,
  logo,
  external = false,
  copyable = false,
  onCopy,
  className = '',
}: ContactCardProps) => {
  const classes = ['ds-contact-card', className].filter(Boolean).join(' ');

  // Protocol links (mailto:, tel:) hand off to the OS default client. Opening
  // them in a new tab leaves an empty blank tab behind, so never set _blank for
  // them — even when `external` is true (it still drives the open_in_new icon).
  const isProtocolLink = /^(mailto:|tel:)/i.test(href);
  const openInNewTab = external && !isProtocolLink;

  return (
    <a
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      className={classes}
    >
      <span className="ds-contact-card__icon-wrap" aria-hidden="true">
        {logo ? (
          <img
            src={logo}
            alt=""
            width={24}
            height={24}
            className="ds-contact-card__logo"
          />
        ) : (
          <span className="material-symbols-rounded ds-contact-card__icon">
            {icon ?? 'link'}
          </span>
        )}
      </span>

      <div className="ds-contact-card__text">
        <span className="ds-contact-card__label">{label}</span>
        <span className="ds-contact-card__value">{value}</span>
      </div>

      <div className="ds-contact-card__actions">
        {copyable && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCopy?.(value);
            }}
            className="ds-contact-card__copy-btn"
            aria-label={`Copy ${value}`}
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              content_copy
            </span>
          </button>
        )}
        <span className="material-symbols-rounded ds-contact-card__chevron" aria-hidden="true">
          {external ? 'open_in_new' : 'arrow_forward'}
        </span>
      </div>
    </a>
  );
};
