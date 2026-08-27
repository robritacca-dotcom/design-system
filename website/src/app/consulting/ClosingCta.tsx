import { Button } from "@robr0/design-system/components/Button/Button";
import { BOOKING_URL, EMAIL_ADDRESS, EMAIL_URL } from "./consulting-data";
import styles from "./page.module.css";

/** The closing booking band both audience pages end on. */
export default function ClosingCta({
  title,
  buttonLabel,
}: {
  title: string;
  buttonLabel: string;
}) {
  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>{title}</h2>
      <p className={styles.ctaBody}>
        Or just write to me at{" "}
        <a className={styles.ctaLink} href={EMAIL_URL}>
          {EMAIL_ADDRESS}
        </a>
        . I read every inquiry myself.
      </p>
      <div className={styles.ctaActions}>
        <Button
          variant="primary"
          label={buttonLabel}
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
        />
      </div>
    </section>
  );
}
