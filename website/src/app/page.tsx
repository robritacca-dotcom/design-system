import Link from "next/link";
import Image from "next/image";
import MegaNav from "../components/MegaNav/MegaNav";
import BlurBackground from "../components/BlurBackground/BlurBackground";
import Footer from "../components/Footer/Footer";
import { Button } from "@robr0/design-system/components/Button/Button";
import {
  FigmaIcon,
  GitHubIcon,
  StorybookIcon,
  SubstackIcon,
} from "../components/BrandIcons/BrandIcons";
import { dsMegaItems } from "@/config/navigation";
import { getArticles, coverPlaceholder } from "@/lib/substack";
import { caseStudies } from "@/data/case-studies";
import styles from "./page.module.css";

// Re-fetch the Substack feed at most once an hour, same as /writing.
export const revalidate = 3600;

/* Everything below derives from a registry: case studies from
   case-studies.json (newest first — the top entry is the featured cover),
   writing from the Substack feed, DS sections from the shared nav config.
   Adding a case study or publishing a post reflows this page by itself. */
const [featuredWork, ...moreWork] = caseStudies;
const workItems = moreWork.slice(0, 4);

export default async function HomePage() {
  const articles = await getArticles();
  const latest = articles[0];
  const moreWriting = articles.slice(1, 5);

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
            <header className={styles.cardHeader}>
              <h2 className={styles.cardTitle} id="home-work">Work</h2>
              <Link href="/work" className={styles.cardAll}>
                All work
                <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
              </Link>
            </header>

            <Link href={featuredWork.href} className={styles.featured}>
              <span className={styles.cardCover}>
                <Image
                  src={featuredWork.coverSrc}
                  alt=""
                  fill
                  sizes="(max-width: 959px) 100vw, 370px"
                  className={styles.cardCoverImg}
                />
                <span className={styles.coverBadge}>
                  <Image
                    src={featuredWork.companyLogo}
                    alt={featuredWork.companyName}
                    width={24}
                    height={24}
                    className={styles.coverLogo}
                  />
                </span>
              </span>
              <span className={styles.featuredTitle}>{featuredWork.title}</span>
            </Link>

            <ul className={styles.rowList}>
              {workItems.map((work) => (
                <li key={work.href}>
                  <Link href={work.href} className={styles.row}>
                    <Image
                      src={work.companyLogo}
                      alt={work.companyName}
                      width={20}
                      height={20}
                      className={styles.rowLogo}
                    />
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
            <header className={styles.cardHeader}>
              <h2 className={styles.cardTitle} id="home-writing">Writing</h2>
              <Link href="/writing" className={styles.cardAll}>
                All writing
                <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
              </Link>
            </header>

            {latest ? (
              <>
                <Link href={`/writing/${latest.slug}`} className={styles.featured}>
                  <span className={styles.cardCover}>
                    {/* Substack CDN covers aren't in next/image's allowlist; the
                        plain img matches how /writing renders them. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={latest.coverImage ?? coverPlaceholder(latest.slug)}
                      alt=""
                      className={styles.cardCoverImg}
                    />
                  </span>
                  <span className={styles.featuredTitle}>{latest.title}</span>
                </Link>

                <ul className={styles.rowList}>
                  {moreWriting.map((article) => (
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
              </>
            ) : (
              <p className={styles.cardHint}>
                Essays are taking a moment to load. Read them on{" "}
                <a href="https://robertritacca1.substack.com">Substack</a>.
              </p>
            )}
          </section>

          {/* ── Design system ── */}
          <section className={styles.card} aria-labelledby="home-ds">
            <header className={styles.cardHeader}>
              <h2 className={styles.cardTitle} id="home-ds">Design system</h2>
              <Link href="/design-system" className={styles.cardAll}>
                Overview
                <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
              </Link>
            </header>

            <Link href="/design-system" className={styles.featured}>
              <span className={styles.cardCover}>
                {/* A live mini-bento rendered from the tokens themselves, so
                    the cover re-themes with the toggle instead of being a
                    static screenshot. Purely decorative. */}
                <span className={styles.dsBoard} aria-hidden="true">
                <span className={styles.dsTile}>
                  <span className={styles.dsType}>Aa</span>
                </span>
                <span className={styles.dsTile}>
                  <span className={styles.dsSwatchRow}>
                    <span className={`${styles.dsSwatch} ${styles.dsSwatchInfo}`} />
                    <span className={`${styles.dsSwatch} ${styles.dsSwatchPositive}`} />
                    <span className={`${styles.dsSwatch} ${styles.dsSwatchWarning}`} />
                    <span className={`${styles.dsSwatch} ${styles.dsSwatchError}`} />
                  </span>
                </span>
                <span className={styles.dsTile}>
                  <span className={styles.dsBars}>
                    <span className={styles.dsBar1} />
                    <span className={styles.dsBar2} />
                    <span className={styles.dsBar3} />
                    <span className={styles.dsBar4} />
                  </span>
                </span>
                <span className={styles.dsTile}>
                  <span className={styles.dsButton} />
                  <span className={styles.dsButtonSecondary} />
                </span>
                <span className={styles.dsTile}>
                  <span className={styles.dsToggle}>
                    <span className={styles.dsToggleThumb} />
                  </span>
                </span>
                <span className={styles.dsTile}>
                  <span className={`material-symbols-rounded ${styles.dsGlyph}`}>
                    widgets
                  </span>
                </span>
                </span>
              </span>
              <span className={styles.featuredTitle}>
                robr0 DS, the system this website is built on
              </span>
            </Link>

            <ul className={styles.rowList}>
              {dsMegaItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.row}>
                    <span className={`material-symbols-rounded ${styles.rowIcon}`} aria-hidden="true">
                      {item.icon}
                    </span>
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

        <div className={`${styles.homeLinks} animate-in animate-delay-2`}>
          <Button
            label="Substack"
            priority="tertiary"
            iconLeft={<SubstackIcon />}
            iconRight="open_in_new"
            href="https://robertritacca1.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
          />
          <Button
            label="Figma"
            priority="tertiary"
            iconLeft={<FigmaIcon />}
            iconRight="open_in_new"
            href="https://www.figma.com/@robr0"
            target="_blank"
            rel="noopener noreferrer"
          />
          <Button
            label="Storybook"
            priority="tertiary"
            iconLeft={<StorybookIcon />}
            iconRight="open_in_new"
            href="https://design-system-iota-one.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          />
          <Button
            label="GitHub"
            priority="tertiary"
            iconLeft={<GitHubIcon />}
            iconRight="open_in_new"
            href="https://github.com/robritacca-dotcom/design-system"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
