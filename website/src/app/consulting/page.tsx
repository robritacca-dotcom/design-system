import Link from "next/link";
import MegaNav from "../../components/MegaNav/MegaNav";
import { Button } from "@robr0/design-system/components/Button/Button";
import { BOOKING_URL, EMAIL_ADDRESS, EMAIL_URL } from "./consulting-data";
import styles from "./page.module.css";

/* The whole section is this one page, on purpose: one headline, the
   questions people bring, one bookable offer, and an email for the rest.
   No sub-pages, no tiers, no process diagrams. */

const sessionQuestions = [
  "Why is my portfolio not getting interviews?",
  "Is this flow simpler, or just shorter?",
  "Does this product need AI at all?",
  "Is our design system earning its upkeep?",
  "Which of these two offers do I take?",
  "What would you ship first?",
];

export default function ConsultingPage() {
  return (
    <>
      <MegaNav />

      <main className={styles.container} id="main-content">
        <h1 className={`${styles.title} animate-in`}>
          Bring me the hard part
        </h1>

        <div className={`${styles.body} animate-in animate-delay-1`}>
          <p className={styles.paragraph}>
            I design products and build them. Everything here is the proof:{" "}
            <Link href="/design-system" className={styles.inlineLink}>
              the design system
            </Link>
            , the site that runs on it, and{" "}
            <Link href="/work" className={styles.inlineLink}>
              the case studies
            </Link>{" "}
            behind both.
          </p>

          <p className={styles.paragraph}>
            A session is the simplest way to work with me. Designers book them
            for portfolios, interviews, and career calls. Teams and founders
            book them for products, AI features, and design systems.
          </p>

          <p className={styles.paragraph}>An hour is enough for questions like:</p>

          <ul className={styles.questions}>
            {sessionQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>

        <div className={`${styles.offer} animate-in animate-delay-2`}>
          <div className={styles.offerText}>
            <h2 className={styles.offerTitle}>1:1 session</h2>
            <p className={styles.offerTerms}>
              One hour, one problem, booked and paid through Stripe.
            </p>
          </div>
          <Button
            variant="primary"
            label="Book a session"
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
          />
        </div>

        <div className={`${styles.body} animate-in animate-delay-3`}>
          <p className={styles.footnote}>
            Not sure a session fits? Write to{" "}
            <a href={EMAIL_URL} className={styles.inlineLink}>
              {EMAIL_ADDRESS}
            </a>{" "}
            and ask. Bigger work is its own conversation: teams hire me for
            whole builds and ongoing advisory, and that starts with an email,
            not a checkout.
          </p>
        </div>
      </main>
    </>
  );
}
