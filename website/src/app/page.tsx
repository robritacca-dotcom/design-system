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
import styles from "./page.module.css";

// Re-fetch the Substack feed at most once an hour, same as /writing.
export const revalidate = 3600;

const featuredWork = {
  href: "/work/embedded-ai-turbotax",
  title: "TurboTax, embedded in ChatGPT and Claude",
  logo: "/logos/turbotax.svg",
  company: "TurboTax",
  cover: "/images/heroes/claude.png",
};

const workItems = [
  {
    href: "/work/intuit-agent-chat",
    title: "Intuit Agent Chat platform",
    logo: "/logos/Intuit.svg",
    company: "Intuit",
  },
  {
    href: "/work/augmenta-ai",
    title: "Augmenta Construction Platform",
    logo: "/logos/logo/Augmenta.png",
    company: "Augmenta",
  },
  {
    href: "/work/meta-career-profile",
    title: "Meta Career Profile vision",
    logo: "/logos/meta.svg",
    company: "Meta",
  },
  {
    href: "/work/meta-offers",
    title: "Meta Offer Creation Flow",
    logo: "/logos/meta.svg",
    company: "Meta",
  },
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

            <Link href={featuredWork.href} className={styles.cardCover}>
              <Image
                src={featuredWork.cover}
                alt=""
                fill
                sizes="(max-width: 959px) 100vw, 370px"
                className={styles.cardCoverImg}
              />
              <span className={styles.coverBadge}>
                <Image
                  src={featuredWork.logo}
                  alt={featuredWork.company}
                  width={24}
                  height={24}
                  className={styles.coverLogo}
                />
              </span>
              <span className={styles.coverCaption}>
                <span className={styles.coverTitle}>{featuredWork.title}</span>
              </span>
            </Link>

            <ul className={styles.rowList}>
              {workItems.map((work) => (
                <li key={work.href}>
                  <Link href={work.href} className={styles.row}>
                    <Image
                      src={work.logo}
                      alt={work.company}
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
                <Link href={`/writing/${latest.slug}`} className={styles.cardCover}>
                  {/* Substack CDN covers aren't in next/image's allowlist; the
                      plain img matches how /writing renders them. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={latest.coverImage ?? coverPlaceholder(latest.slug)}
                    alt=""
                    className={styles.cardCoverImg}
                  />
                  <span className={styles.coverCaption}>
                    <span className={styles.coverTitle}>{latest.title}</span>
                  </span>
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

            <Link href="/design-system" className={styles.cardCover}>
              {/* The DS landing collage, captured per theme so the cover
                  matches the active colour mode. */}
              <Image
                src="/images/ds-landing-light.png"
                alt=""
                fill
                sizes="(max-width: 959px) 100vw, 370px"
                className={`${styles.cardCoverImg} ${styles.coverLight}`}
              />
              <Image
                src="/images/ds-landing-dark.png"
                alt=""
                fill
                sizes="(max-width: 959px) 100vw, 370px"
                className={`${styles.cardCoverImg} ${styles.coverDark}`}
              />
              <span className={styles.coverCaption}>
                <span className={styles.coverTitle}>robr0 DS</span>
              </span>
            </Link>

            <ul className={styles.rowList}>
              {dsItems.map((item) => (
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
