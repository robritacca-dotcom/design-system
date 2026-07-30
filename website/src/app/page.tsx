import Link from "next/link";
import Image from "next/image";
import MegaNav from "../components/MegaNav/MegaNav";
import BlurBackground from "../components/BlurBackground/BlurBackground";
import Footer from "../components/Footer/Footer";
import { dsMegaItems } from "@/config/navigation";
import { getArticles, coverPlaceholder } from "@/lib/substack";
import styles from "./page.module.css";

// Re-fetch the Substack feed at most once an hour, same as /writing.
export const revalidate = 3600;

const workItems = [
  { href: "/work/embedded-ai-turbotax", title: "TurboTax, embedded in ChatGPT and Claude" },
  { href: "/work/intuit-agent-chat", title: "Intuit Agent Chat platform" },
  { href: "/work/augmenta-ai", title: "Augmenta Construction Platform" },
  { href: "/work/meta-career-profile", title: "Meta Career Profile vision" },
];

/* Section order for the DS card; labels and hrefs stay derived from the
   shared nav config. */
const dsSectionOrder = ["/foundations", "/components", "/docs", "/playground"];
const dsItems = dsSectionOrder
  .map((href) => dsMegaItems.find((item) => item.href === href))
  .filter((item) => item !== undefined);

export default async function HomePage() {
  const articles = await getArticles();
  const latest = articles[0];
  const writingItems = articles.slice(0, 4);

  return (
    <>
      <BlurBackground fullHeight />

      <MegaNav />

      <main className={styles.homeContainer} id="main-content">
        <div className={`${styles.homeHeading} animate-in`}>
          <h1 className={styles.homeTitle}>Robert Ritacca</h1>
          <p className={styles.homeSubtitle}>
            Designing and building AI-native products, systems, and experiences.
          </p>
        </div>

        <div className={`${styles.cardGrid} animate-in animate-delay-1`}>
          {/* ── Work ── */}
          <section className={styles.card} aria-labelledby="home-work">
            <Link href="/work/embedded-ai-turbotax" className={styles.cardCover}>
              <Image
                src="/images/heroes/claude.png"
                alt="TurboTax, embedded in ChatGPT and Claude"
                fill
                sizes="(max-width: 959px) 100vw, 370px"
                className={styles.cardCoverImg}
              />
            </Link>

            <header className={styles.cardHeader}>
              <h2 className={styles.cardTitle} id="home-work">Work</h2>
              <Link href="/work" className={styles.cardAll}>
                All work
                <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
              </Link>
            </header>

            <ul className={styles.rowList}>
              {workItems.map((work) => (
                <li key={work.href}>
                  <Link href={work.href} className={styles.row}>
                    <span className={styles.rowTitle}>{work.title}</span>
                    <span className={`material-symbols-rounded ${styles.rowArrow}`} aria-hidden="true">
                      arrow_forward
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Writing ── */}
          <section className={styles.card} aria-labelledby="home-writing">
            {latest && (
              <Link href={`/writing/${latest.slug}`} className={styles.cardCover}>
                {/* Substack CDN covers aren't in next/image's allowlist; the
                    plain img matches how /writing renders them. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={latest.coverImage ?? coverPlaceholder(latest.slug)}
                  alt={latest.title}
                  className={styles.cardCoverImg}
                />
              </Link>
            )}

            <header className={styles.cardHeader}>
              <h2 className={styles.cardTitle} id="home-writing">Writing</h2>
              <Link href="/writing" className={styles.cardAll}>
                All writing
                <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
              </Link>
            </header>

            {writingItems.length > 0 ? (
              <ul className={styles.rowList}>
                {writingItems.map((article) => (
                  <li key={article.slug}>
                    <Link href={`/writing/${article.slug}`} className={styles.row}>
                      <span className={styles.rowTitle}>{article.title}</span>
                      <span className={`material-symbols-rounded ${styles.rowArrow}`} aria-hidden="true">
                        arrow_forward
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.cardHint}>
                Essays are taking a moment to load. Read them on{" "}
                <a href="https://robertritacca1.substack.com">Substack</a>.
              </p>
            )}
          </section>

          {/* ── Design system ── */}
          <section className={styles.card} aria-labelledby="home-ds">
            <Link href="/design-system" className={styles.cardCover}>
              <Image
                src="/images/ds-hero.png"
                alt="robr0 DS"
                fill
                sizes="(max-width: 959px) 100vw, 370px"
                className={styles.cardCoverImg}
              />
            </Link>

            <header className={styles.cardHeader}>
              <h2 className={styles.cardTitle} id="home-ds">robr0 DS</h2>
              <Link href="/design-system" className={styles.cardAll}>
                Overview
                <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
              </Link>
            </header>

            <ul className={styles.rowList}>
              {dsItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.row}>
                    <span className={styles.rowTitle}>{item.label}</span>
                    <span className={`material-symbols-rounded ${styles.rowArrow}`} aria-hidden="true">
                      arrow_forward
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
