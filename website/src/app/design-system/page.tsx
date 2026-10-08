import { Button } from "rift-ds/components/Button/Button";
import MegaNav from "../../components/MegaNav/MegaNav";
import { RiftDsHomeCover } from "@/components/covers/RiftDsCover";
import { DESIGN_SYSTEM_URL } from "@/config/site";
import styles from "./page.module.css";

/**
 * /design-system — the page about having built Rift DS.
 *
 * This was the design system's landing page, a live collage of every
 * component in the library. The system has a site of its own now, so this is
 * deliberately short: the claim and the way in, then a picture of where it
 * lives. The copy sits above the picture because below it, it went unread.
 * Anything that wants to describe components or tokens belongs at rift-ds.com,
 * which documents itself and stays current with itself.
 *
 * No first person: content-design.md keeps "I" to the case studies and
 * /about, so the system stays the subject here and /work/rift-ds is where the
 * story gets told.
 *
 * No counts here. A component total dates the claim and invites a comparison
 * the page is not making; the system states its own figures on its own site,
 * where they are generated rather than retyped.
 */
export default function DesignSystemPage() {
  return (
    <>
      <MegaNav />
      <main className={styles.page} id="main-content">
        <header className={styles.hero}>
          <h1 className={styles.pageTitle}>Rift DS</h1>
          <p className={styles.lede}>
            An AI-ready React design system, designed and built by Robert
            Ritacca. It’s open source on npm, and this site is built with it:
            the components, tokens and theme here all come from the package.
          </p>
          <div className={styles.actions}>
            <Button
              href={DESIGN_SYSTEM_URL}
              label="Open rift-ds.com"
              iconRight="open_in_new"
              target="_blank"
              rel="noreferrer"
            />
            <Button
              href="/work/rift-ds"
              label="Read the case study"
              variant="secondary"
              iconRight="arrow_forward"
            />
          </div>
        </header>

        <a
          className={styles.banner}
          href={DESIGN_SYSTEM_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Open rift-ds.com in a new tab"
        >
          <RiftDsHomeCover />
        </a>
      </main>
    </>
  );
}
