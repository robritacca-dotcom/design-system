"use client";

import Image from "next/image";
import MegaNav from "../../components/MegaNav/MegaNav";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import { ToastProvider, useToast } from "@design-system/components/Toast/Toast";
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
}

const methods: ContactMethod[] = [
  {
    label: "Email",
    value: "rob.ritacca@gmail.com",
    href: "mailto:rob.ritacca@gmail.com",
    icon: "mail",
    copyable: true,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/robertritacca",
    href: "https://www.linkedin.com/in/robertritacca/",
    logo: "/logos/LinkedIN.png",
    external: true,
  },
  {
    label: "Instagram",
    value: "instagram.com/robr0designs",
    href: "https://www.instagram.com/robr0designs/",
    logo: "/logos/IG.png",
    external: true,
  },
  {
    label: "X",
    value: "x.com/robr0",
    href: "https://x.com/robr0",
    logo: "/logos/X.png",
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
      <BlurBackground fullHeight />

      <MegaNav />

      <main className={styles.contactContainer} id="main-content">
        <div className={`${styles.heading} animate-in`}>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.subtitle}>
            The easiest ways to reach me — pick whichever fits the conversation.
          </p>
        </div>

        <div className={`${styles.methods} animate-in animate-delay-1`}>
          {methods.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target={m.external ? "_blank" : undefined}
              rel={m.external ? "noopener noreferrer" : undefined}
              className={styles.method}
            >
              <span className={styles.methodIconWrap}>
                {m.logo ? (
                  <Image
                    src={m.logo}
                    alt=""
                    width={24}
                    height={24}
                    className={styles.methodLogo}
                  />
                ) : (
                  <span className={`material-symbols-rounded ${styles.methodIcon}`} aria-hidden="true">
                    {m.icon}
                  </span>
                )}
              </span>
              <div className={styles.methodText}>
                <span className={styles.methodLabel}>{m.label}</span>
                <span className={styles.methodValue}>{m.value}</span>
              </div>
              <div className={styles.methodActions}>
                {m.copyable && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyToClipboard(m.value);
                    }}
                    className={styles.copyButton}
                    aria-label={`Copy ${m.value}`}
                  >
                    <span className="material-symbols-rounded" aria-hidden="true">
                      content_copy
                    </span>
                  </button>
                )}
                <span
                  className={`material-symbols-rounded ${styles.methodChevron}`}
                  aria-hidden="true"
                >
                  {m.external ? "open_in_new" : "arrow_forward"}
                </span>
              </div>
            </a>
          ))}
        </div>
      </main>

      <Footer />
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
