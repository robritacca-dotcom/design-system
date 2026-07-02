import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { getSidebarLinks, buildWritingSidebarLinks } from "@/config/navigation";
import { getArticles, getArticle, formatArticleDate } from "@/lib/substack";
import styles from "./page.module.css";

// Re-fetch the feed at most hourly (see the list page). Updates to a
// published post propagate to its page within this window.
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

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
      images: article.coverImage ? [article.coverImage] : undefined,
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
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>{article.title}</h1>
          </div>

          <p className={`${styles.meta} animate-in animate-delay-1`}>
            {formatArticleDate(article.date)}
            {article.author ? ` · ${article.author}` : ""}
          </p>

          {article.coverImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={article.coverImage}
              alt=""
              className={`${styles.cover} animate-in animate-delay-2`}
            />
          )}

          {/* Article body — HTML mirrored straight from the Substack feed. */}
          <article
            className={`${styles.prose} animate-in animate-delay-3`}
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          <p className={styles.substackLink}>
            <a href={article.substackUrl} target="_blank" rel="noopener noreferrer">
              Read the original on Substack →
            </a>
          </p>
        </main>
      </div>

      <Footer />
    </>
  );
}
