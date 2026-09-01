import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getSidebarLinks, buildWritingSidebarLinks } from "@/config/navigation";
import { getArticles, getArticle, formatArticleDate } from "@/lib/substack";
import { buildArticleJsonLd } from "@/lib/structuredData";
import { EssayCover } from "@/components/covers/EssayCover";
import { hasEssayCover } from "@/data/essay-covers";
import styles from "./page.module.css";

// Re-fetch the feed at most hourly (see the list page). Updates to a
// published post propagate to its page within this window.
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SubstackMark = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={styles.linkLogo}>
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" fill="#FF6719"/>
  </svg>
);

// Pre-render a page for each known article at build time; new slugs are
// rendered on-demand and then cached (ISR).
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Writing" };

  return {
    title: article.title,
    description: article.subtitle,
    // Point canonical at Substack — it's the original home of the content,
    // which avoids duplicate-content penalties for the mirrored copy.
    alternates: { canonical: article.substackUrl },
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: "article",
      url: article.substackUrl,
      // Declaring `openGraph` replaces the inherited block wholesale (see
      // pageOpenGraph in navigation.ts), so `undefined` here would ship the
      // article with no og:image at all — link unfurls lose their card. Fall
      // back to the branded root card when the feed has no cover image.
      images: article.coverImage ? [article.coverImage] : "/opengraph-image",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const [article, articles] = await Promise.all([getArticle(slug), getArticles()]);

  if (!article) notFound();

  const { sidebarLinks } = getSidebarLinks(
    buildWritingSidebarLinks(articles),
    `/writing/${slug}`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildArticleJsonLd({
              slug,
              title: article.title,
              description: article.subtitle,
              datePublished: article.date,
              image: article.coverImage ?? undefined,
            })
          ),
        }}
      />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb currentLabel={article.title} />

          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>{article.title}</h1>
          </div>

          {article.subtitle && (
            <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
              {article.subtitle}
            </p>
          )}

          {/* The feed's own cover when the post has one; otherwise the
              essay's illustrated pair (see the essay-covers registry), which
              is also what its card shows on /writing and the home page. */}
          {article.coverImage ? (
            <figure className={`${styles.hero} animate-in animate-delay-2`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.coverImage} alt="" className={styles.heroImg} />
            </figure>
          ) : hasEssayCover(slug) ? (
            <figure className={`${styles.hero} animate-in animate-delay-2`}>
              <EssayCover
                slug={slug}
                className={styles.heroIllustration}
                priority
              />
            </figure>
          ) : null}

          {/* Two-column body — article on the left, details rail on the right */}
          <div className={`${styles.resumeLayout} animate-in animate-delay-3`}>
            <div className={styles.resumeMain}>
              {/* Article body — HTML mirrored straight from the Substack feed. */}
              <article
                className={styles.prose}
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />
            </div>

            <aside className={styles.resumeSidebar} aria-label="Article details">
              <div className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Details</h2>
                </div>
                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Published</span>
                    <span className={styles.detailValue}>{formatArticleDate(article.date)}</span>
                  </div>
                  {article.author && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Author</span>
                      <span className={styles.detailValue}>{article.author}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Links</h2>
                </div>
                <div className={styles.linkList}>
                  <a
                    href={article.substackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <SubstackMark />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>Read on Substack</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>Original article</span>
                    </div>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

    </>
  );
}
