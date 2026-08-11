import Link from "next/link";
import type { ReactNode } from "react";
import { dsMegaItems, docsSidebarLinks, workSidebarLinks } from "@/config/navigation";
import { SOCIAL_PROFILES, PROJECT_LINKS } from "@/config/social";
import { InstagramIcon, LinkedInIcon, XIcon } from "../BrandIcons/BrandIcons";
import FadeDivider from "../FadeDivider/FadeDivider";
import styles from "./SiteFooter.module.css";

/**
 * SiteFooter — the sitemap footer: five link columns derived from the nav
 * config, then a quiet bottom row with the social icons and copyright.
 * Server component; column data resolves once at module scope.
 */

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

// The /design-system landing stays out: its own column would just repeat
// the title, and the mega nav trigger already links it.
const designSystemLinks = dsMegaItems.map(({ href, label }) => ({
  href,
  label,
}));

const docsLinks = docsSidebarLinks
  .filter((link) => link.label !== "Contents")
  .map(({ href, label }) => ({ href, label }));

// Skip the "Contents" entry; /work already sits in the Site column.
const workLinks = workSidebarLinks
  .slice(1)
  .map(({ href, label }) => ({ href, label }));

const SOCIAL_ICONS: Record<string, ReactNode> = {
  LinkedIn: <LinkedInIcon />,
  X: <XIcon />,
  Instagram: <InstagramIcon />,
};

/* The icon row skips GitHub (the Elsewhere column already links it) and
   Email (the Site column's Contact link covers reaching out). */
const socialIconProfiles = SOCIAL_PROFILES.filter(
  (profile) => profile.label in SOCIAL_ICONS
);

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className={styles.column}>
      <h2 className={styles.columnTitle}>{title}</h2>
      <ul className={styles.columnList}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.link}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <FadeDivider />
      <nav className={styles.columns} aria-label="Footer">
        <LinkColumn title="Site" links={siteLinks} />
        <LinkColumn title="Design system" links={designSystemLinks} />
        <LinkColumn title="Docs" links={docsLinks} />
        <LinkColumn title="Work" links={workLinks} />
        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Elsewhere</h2>
          <ul className={styles.columnList}>
            {PROJECT_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                  <span
                    className={`material-symbols-rounded ${styles.externalIcon}`}
                    aria-hidden="true"
                  >
                    open_in_new
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Left cluster only, so the fixed chat button never covers a link. */}
      <div className={styles.bottomBar}>
        <ul className={styles.socialRow}>
          {socialIconProfiles.map((profile) => (
            <li key={profile.label}>
              <a
                href={profile.href}
                className={styles.socialLink}
                aria-label={profile.label}
                target="_blank"
                rel="noreferrer"
              >
                {SOCIAL_ICONS[profile.label]}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.bottomText}>
          &copy; {new Date().getFullYear()} Robert Ritacca
        </p>
      </div>
    </footer>
  );
}
