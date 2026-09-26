import { Button } from "rift-ds/components/Button/Button";
import { SectionTitle } from "rift-ds/components/SectionTitle/SectionTitle";
import { Stat } from "rift-ds/components/Stat/Stat";
import { COMPONENT_COUNT } from "rift-ds/components/registry";
import { TOKEN_COUNT } from "rift-ds/tokens/registry";
import MegaNav from "../../components/MegaNav/MegaNav";
import FadeDivider from "@/components/FadeDivider/FadeDivider";
import styles from "./page.module.css";

/**
 * /design-system — the page about having built Rift DS.
 *
 * This was the design system's landing page, a live collage of every
 * component in the library. The system now has a site of its own, so the
 * demos went with it and what remains is the authorship claim and a pointer.
 * Deliberately no first person: content-design.md keeps "I" to the case
 * studies and /about, so the system stays the subject here and the case study
 * at /work/robr0-ds is where the story gets told.
 *
 * It sits in the normal IA, not beside it: the header renders here as it does
 * on every other page, <main> carries the skip link's target, and the nav
 * marks the section current. The page it replaced was a full-bleed landing
 * that opted out of all three.
 *
 * Both figures come from the package's own registries, so neither can drift
 * from what actually ships.
 */

const DESIGN_SYSTEM_URL = "https://rift-ds.com";

export default function DesignSystemPage() {
  return (
    <>
      <MegaNav />
      <main className={styles.page} id="main-content">
        <header className={styles.hero}>
          <h1 className={styles.pageTitle}>Rift DS</h1>
          <p className={styles.subDisplay}>
            An AI-ready React design system, designed and built by Robert Ritacca
          </p>

          <div className={styles.statStrip}>
            <Stat value={String(COMPONENT_COUNT)} label="Components" />
            <Stat value={String(TOKEN_COUNT)} label="Semantic tokens" />
          </div>

          <FadeDivider />

          <div className={styles.heroActions}>
            <Button
              href={DESIGN_SYSTEM_URL}
              label="Open rift-ds.com"
              iconRight="open_in_new"
              target="_blank"
              rel="noreferrer"
            />
            <Button
              href="/work/robr0-ds"
              label="Read the case study"
              variant="secondary"
              iconRight="arrow_forward"
            />
          </div>
        </header>

        <section className={styles.section}>
          <SectionTitle title="What it is" divider />
          <div className={styles.prose}>
            <p>
              Rift DS is an open React component library published to npm. Every
              colour, radius, type step and motion value resolves through one
              token layer, so light and dark are a single attribute on the root
              element rather than a second set of components, and a consumer can
              re-theme the whole system by overriding tokens instead of
              overriding components.
            </p>
            <p>
              It ships with theme presets, each a complete look in both themes,
              applied with one attribute and no runtime JavaScript. It installs
              three ways: as an npm package, through a shadcn-compatible registry
              that vendors a component into a project, or by reading the source.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <SectionTitle title="How it holds together" divider />
          <div className={styles.prose}>
            <p>
              The system is built on one rule: every fact has exactly one home.
              Counts, lists and contracts live in registries, and generators
              write the surfaces that state them. Validators check the rest on
              every build, so a component missing its documentation, a token
              without a swatch, or a hardcoded value where a token belongs fails
              the build and names the file.
            </p>
            <p>
              That is the part worth having. A design system rule that lives only
              in a document is a suggestion, and suggestions soften as soon as
              they cross from design into engineering. These ones cannot.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <SectionTitle title="Where it lives" divider />
          <div className={styles.prose}>
            <p>
              Rift DS has its own documentation site, repository and package. The
              components, tokens, templates and the live theming playground are
              all at{" "}
              <a className={styles.inlineLink} href={DESIGN_SYSTEM_URL}>
                rift-ds.com
              </a>
              .
            </p>
            <p>
              This site is built on it, as an ordinary consumer installing it from
              npm like anyone else. That is deliberate: a design system whose
              author quietly reaches past the published contract is a system that
              has not been tested.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
