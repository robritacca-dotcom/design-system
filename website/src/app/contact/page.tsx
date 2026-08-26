"use client";

import MegaNav from "../../components/MegaNav/MegaNav";
import { ToastProvider, useToast } from "@robr0/design-system/components/Toast/Toast";
import { ContactCard } from "@robr0/design-system/components/ContactCard/ContactCard";
import styles from "./page.module.css";

interface ContactMethod {
  label: string;
  value: string;
  href: string;
  /** Material Symbols name — used when no product logo exists */
  icon?: string;
  /** Path to a product logo (preferred over icon when present) */
  logo?: string;
  external?: boolean;
  /** Show a copy-to-clipboard button on the card */
  copyable?: boolean;
  /** Make the whole card copy `value` on click instead of navigating */
  copyOnClick?: boolean;
}

/* corpus-facts(Ways to reach Rob directly): published on this page, so the site chat may answer with them */
const connectMethods: ContactMethod[] = [
  {
    label: "Email",
    value: "rob.ritacca@gmail.com",
    href: "mailto:rob.ritacca@gmail.com",
    icon: "mail",
    copyOnClick: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/robertritacca",
    href: "https://www.linkedin.com/in/robertritacca/",
    logo: "/logos/LinkedIN.png",
    external: true,
  },
];

/* corpus-facts(Where to follow Rob): published on this page, so the site chat may answer with them */
const followMethods: ContactMethod[] = [
  {
    label: "X",
    value: "x.com/robr0",
    href: "https://x.com/robr0",
    logo: "/logos/X.png",
    external: true,
  },
  {
    label: "Instagram",
    value: "instagram.com/robr0designs",
    href: "https://www.instagram.com/robr0designs/",
    logo: "/logos/IG.svg",
    external: true,
  },
  {
    label: "Figma",
    value: "figma.com/@robr0",
    href: "https://www.figma.com/@robr0",
    logo: "/logos/Figma.svg",
    external: true,
  },
  {
    label: "Substack",
    value: "robertritacca1.substack.com",
    href: "https://robertritacca1.substack.com/",
    logo: "/logos/substack.svg",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/robritacca-dotcom",
    href: "https://github.com/robritacca-dotcom",
    logo: "/logos/Git.svg",
    external: true,
  },
];

function ContactContent() {
  const { toast } = useToast();

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied to clipboard", variant: "positive", duration: 3000 });
    } catch {
      toast({ title: "Could not copy", variant: "error", duration: 3000 });
    }
  }

  return (
    <>
      <MegaNav />

      <main className={styles.contactContainer} id="main-content">
        <div className={`${styles.heading} animate-in`}>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.subtitle}>
            The easiest ways to reach me.
          </p>
        </div>

        {/* Connect with me */}
        <div className={`${styles.section} animate-in animate-delay-1`}>
          <h2 className={styles.sectionTitle}>Connect with me</h2>
          <div className={styles.methods}>
            {connectMethods.map((m) => (
              <ContactCard
                key={m.label}
                label={m.label}
                value={m.value}
                href={m.href}
                icon={m.icon}
                logo={m.logo}
                external={m.external}
                copyable={m.copyable}
                copyOnClick={m.copyOnClick}
                onCopy={copyToClipboard}
              />
            ))}
          </div>
        </div>

        {/* Book a consultation */}
        <div className={`${styles.section} animate-in animate-delay-2`}>
          <h2 className={styles.sectionTitle}>Book a consultation</h2>
          <ContactCard
            label="Stripe"
            value="Book a design consultation, secure checkout via Stripe"
            href="https://buy.stripe.com/28o7vb5NBaSJ3NC5kn"
            logo="/logos/stripe-new.png"
            external
          />
        </div>

        {/* Follow me */}
        <div className={`${styles.section} animate-in animate-delay-3`}>
          <h2 className={styles.sectionTitle}>Follow me</h2>
          <div className={styles.methods}>
            {followMethods.map((m) => (
              <ContactCard
                key={m.label}
                label={m.label}
                value={m.value}
                href={m.href}
                icon={m.icon}
                logo={m.logo}
                external={m.external}
                copyable={m.copyable}
                copyOnClick={m.copyOnClick}
                onCopy={copyToClipboard}
              />
            ))}
          </div>
        </div>

      </main>

    </>
  );
}

export default function ContactPage() {
  return (
    <ToastProvider position="bottom-right">
      <ContactContent />
    </ToastProvider>
  );
}
