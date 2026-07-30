import Link from "next/link";
import Image from "next/image";
import MegaNav from "../components/MegaNav/MegaNav";
import BlurBackground from "../components/BlurBackground/BlurBackground";
import Footer from "../components/Footer/Footer";
import {
  FigmaIcon,
  GitHubIcon,
  StorybookIcon,
  SubstackIcon,
} from "../components/BrandIcons/BrandIcons";
import { dsMegaItems } from "@/config/navigation";
import { getArticles, formatArticleDate } from "@/lib/substack";
import styles from "./page.module.css";

// Re-fetch the Substack feed at most once an hour, same as /writing.
export const revalidate = 3600;

const featuredWork = {
  href: "/work/embedded-ai-turbotax",
  title: "TurboTax, embedded in ChatGPT and Claude",
  dek: "Leading design for a Webby-winning tax experience that runs natively inside two AI platforms.",
  coverSrc: "/images/heroes/claude.png",
};

const moreWork = [
  { href: "/work/intuit-agent-chat", title: "Intuit Agent Chat platform" },
  { href: "/work/augmenta-ai", title: "Augmenta Construction Platform" },
  { href: "/work/meta-career-profile", title: "Meta Career Profile vision" },
];

/* One-line hints for the design system card — the mega menu keeps the
   longer descriptions */
const sectionHints: Record<string, string> = {
  "/docs": "Guides, and the artifacts to take",
  "/foundations": "Colour, type, spacing, and motion",
  "/components": "The full library, one page each",
  "/playground": "Re-theme the system live",
};

const brandLinks = [
  { label: "Substack", href: "https://robertritacca1.substack.com/", Icon: SubstackIcon },
  { label: "Figma", href: "https://www.figma.com/@robr0", Icon: FigmaIcon },
  { label: "Storybook", href: "https://design-system-iota-one.vercel.app", Icon: StorybookIcon },
  { label: "GitHub", href: "https://github.com/robritacca-dotcom/design-system", Icon: GitHubIcon },
];

export default async function HomePage() {
  const articles = await getArticles();
  const [latest, ...rest] = articles;
  const moreWriting = rest.slice(0, 3);

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

            <Link href={featuredWork.href} className={styles.featuredWork}>
              <span className={styles.featuredCover}>
                <Image
                  src={featuredWork.coverSrc}
                  alt=""
                  fill
                  sizes="(max-width: 959px) 100vw, 540px"
                  className={styles.featuredCoverImg}
                />
              </span>
              <span className={styles.featuredTitle}>{featuredWork.title}</span>
              <span className={styles.featuredDek}>{featuredWork.dek}</span>
            </Link>

            <ul className={styles.rowList}>
              {moreWork.map((work) => (
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
            <header className={styles.cardHeader}>
              <h2 className={styles.cardTitle} id="home-writing">Writing</h2>
              <Link href="/writing" className={styles.cardAll}>
                All writing
                <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
              </Link>
            </header>

            {latest ? (
              <>
                <Link href={`/writing/${latest.slug}`} className={styles.featuredWriting}>
                  <span className={styles.featuredDate}>{formatArticleDate(latest.date)}</span>
                  <span className={styles.featuredTitle}>{latest.title}</span>
                  {latest.subtitle && (
                    <span className={styles.featuredDek}>{latest.subtitle}</span>
                  )}
                </Link>

                <ul className={styles.rowList}>
                  {moreWriting.map((article) => (
                    <li key={article.slug}>
                      <Link href={`/writing/${article.slug}`} className={styles.row}>
                        <span className={styles.rowText}>
                          <span className={styles.rowTitle}>{article.title}</span>
                          <span className={styles.rowHint}>{formatArticleDate(article.date)}</span>
                        </span>
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
              <h2 className={styles.cardTitle} id="home-ds">robr0 DS</h2>
              <Link href="/design-system" className={styles.cardAll}>
                Overview
                <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
              </Link>
            </header>

            <ul className={styles.rowList}>
              {dsMegaItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.row}>
                    <span className={`material-symbols-rounded ${styles.rowIcon}`} aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className={styles.rowText}>
                      <span className={styles.rowTitle}>{item.label}</span>
                      <span className={styles.rowHint}>
                        {sectionHints[item.href] ?? item.description}
                      </span>
                    </span>
                    <span className={`material-symbols-rounded ${styles.rowArrow}`} aria-hidden="true">
                      arrow_forward
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ── About ── */}
          <section className={styles.card} aria-labelledby="home-about">
            <header className={styles.cardHeader}>
              <h2 className={styles.cardTitle} id="home-about">About</h2>
              <Link href="/about" className={styles.cardAll}>
                More
                <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
              </Link>
            </header>

            <div className={styles.aboutBody}>
              <Image
                src="/images/robr02.jpg"
                alt="Robert Ritacca"
                width={64}
                height={64}
                className={styles.aboutAvatar}
              />
              <div className={styles.aboutText}>
                <p className={styles.aboutLocation}>Based in Toronto, Canada</p>
                <p className={styles.aboutBio}>
                  Product designer specialising in AI-native products, agentic
                  experiences, and complex workflows.
                </p>
              </div>
            </div>

            <footer className={styles.brandRow}>
              {brandLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.brandLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                  {label}
                </a>
              ))}
            </footer>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
