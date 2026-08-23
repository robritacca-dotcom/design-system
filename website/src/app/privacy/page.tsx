import Link from "next/link";
import MegaNav from "../../components/MegaNav/MegaNav";
import styles from "./page.module.css";

export default function PrivacyPage() {
  return (
    <>
      <MegaNav />

      <main className={styles.privacyContainer} id="main-content">
        <div className={`${styles.heading} animate-in`}>
          <h1 className={styles.title}>Privacy</h1>
          <p className={styles.subtitle}>What this site collects, and what it does not.</p>
        </div>

        <div className={`${styles.section} animate-in animate-delay-1`}>
          <h2 className={styles.sectionTitle}>Analytics</h2>
          <p className={styles.body}>
            This site uses Google Analytics to count visits and see which pages
            people read. It sets cookies in your browser and records general
            usage, such as pages viewed and rough location, against a random
            identifier rather than your name. It helps me understand what is
            useful and what to improve. If you would rather not be counted, most
            browsers let you block cookies, and Google offers an opt-out add-on.
          </p>
        </div>

        <div className={`${styles.section} animate-in animate-delay-2`}>
          <h2 className={styles.sectionTitle}>The site chat</h2>
          <p className={styles.body}>
            The chat answers questions about my work and this design system.
            Conversations are kept for 30 days to improve the answers, tied to no
            name or address, then deleted. Please do not type anything private
            into it.
          </p>
        </div>

        <div className={`${styles.section} animate-in animate-delay-3`}>
          <h2 className={styles.sectionTitle}>What this site does not do</h2>
          <p className={styles.body}>
            No accounts, no advertising, and nothing here is sold or shared for
            marketing. The only data collected is the analytics above and the
            chat logs, both used only to run and improve the site.
          </p>
        </div>

        <div className={`${styles.section} animate-in animate-delay-3`}>
          <h2 className={styles.sectionTitle}>Questions</h2>
          <p className={styles.body}>
            Ask through the <Link href="/contact">contact page</Link> and I will
            answer.
          </p>
        </div>
      </main>
    </>
  );
}
