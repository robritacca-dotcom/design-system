import './LinkList.css';
import '../../fonts/material-symbols.css';

export interface LinkListItem {
  /** Link destination */
  href: string;
  /** Primary label — shown with the open_in_new icon */
  label: string;
  /** One or more subtitle lines shown below the label */
  sub?: string | string[];
  /** Path to a logo image (preferred over icon when both are set) */
  logo?: string;
  /** Alt text for the logo — defaults to empty string (decorative) */
  logoAlt?: string;
  /** Material Symbol name used when no logo is provided (e.g. "emoji_events") */
  icon?: string;
}

export interface LinkListProps {
  items: LinkListItem[];
  /** Additional CSS classes */
  className?: string;
}

export const LinkList = ({ items, className = '' }: LinkListProps) => {
  const classes = ['ds-link-list', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      {items.map((item) => {
        const subs = item.sub
          ? Array.isArray(item.sub)
            ? item.sub
            : [item.sub]
          : [];

        return (
          <a
            key={item.href + item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-link-list__item"
          >
            <span className="ds-link-list__icon-wrap" aria-hidden="true">
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.logoAlt ?? ''}
                  className="ds-link-list__logo"
                  width={28}
                  height={28}
                />
              ) : (
                <span className="material-symbols-rounded ds-link-list__symbol">
                  {item.icon ?? 'link'}
                </span>
              )}
            </span>

            <div className="ds-link-list__content">
              <div className="ds-link-list__title">
                <span>{item.label}</span>
                <span className="material-symbols-rounded ds-link-list__open-icon" aria-hidden="true">
                  open_in_new
                </span>
              </div>
              {subs.map((s, i) => (
                <span key={i} className="ds-link-list__sub">{s}</span>
              ))}
            </div>
          </a>
        );
      })}
    </div>
  );
};
