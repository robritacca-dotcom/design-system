"use client";

import MegaNav from "../../components/MegaNav/MegaNav";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import { Button } from "@design-system/components/Button/Button";
import styles from "./page.module.css";

interface ContactMethod {
  label: string;
  value: string;
  href: string;
  icon: string;
  external?: boolean;
}

const methods: ContactMethod[] = [
  {
    label: "Email",
    value: "rob.ritacca@gmail.com",
    href: "mailto:rob.ritacca@gmail.com",
    icon: "mail",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/robertritacca",
    href: "https://www.linkedin.com/in/robertritacca/",
    icon: "work",
    external: true,
  },
  {
    label: "Substack",
    value: "robertritacca1.substack.com",
    href: "https://robertritacca1.substack.com/",
    icon: "edit_note",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/robritacca-dotcom",
    href: "https://github.com/robritacca-dotcom",
    icon: "code",
    external: true,
  },
];

export default function ContactPage() {
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
              <span className={`material-symbols-rounded ${styles.methodIcon}`} aria-hidden="true">
                {m.icon}
              </span>
              <div className={styles.methodText}>
                <span className={styles.methodLabel}>{m.label}</span>
                <span className={styles.methodValue}>{m.value}</span>
              </div>
              <span
                className={`material-symbols-rounded ${styles.methodChevron}`}
                aria-hidden="true"
              >
                {m.external ? "open_in_new" : "arrow_forward"}
              </span>
            </a>
          ))}
        </div>

        <div className={`${styles.cta} animate-in animate-delay-2`}>
          <Button
            label="Email me"
            priority="primary"
            iconLeft="mail"
            href="mailto:rob.ritacca@gmail.com"
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
