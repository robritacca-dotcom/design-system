import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import { Card } from "@design-system/components/Card/Card";
import PageLinks from "../../components/PageLinks/PageLinks";
import { getSidebarLinks, buildWritingSidebarLinks } from "@/config/navigation";
import { getArticles, formatArticleDate, coverPlaceholder } from "@/lib/substack";
import styles from "./page.module.css";

// Re-fetch the Substack feed at most once an hour. New posts appear
// automatically within this window — no rebuild required.
// (Must be a literal for Next's static analysis — mirrors FEED_REVALIDATE_SECONDS.)
export const revalidate = 3600;

export default async function WritingPage() {
  const articles = await getArticles();
  const { sidebarLinks } = getSidebarLinks(
    buildWritingSidebarLinks(articles),
    "/writing"
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
            <h1 className={styles.pageTitle}>Writing</h1>
            <PageLinks substackUrl="https://robertritacca1.substack.com" />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Essays on product design, AI, and design systems
            </p>
            <p className={styles.introBody}>
              Longer-form thinking I publish on Substack, mirrored here. Each
              piece lives on its own page with a link back to the original — and
              this list updates itself whenever I publish something new.
            </p>
          </div>

          {articles.length === 0 ? (
            <p className={styles.introBody}>
              Articles are taking a moment to load. Please check back shortly, or
              read them directly on{" "}
              <a href="https://robertritacca1.substack.com">Substack</a>.
            </p>
          ) : (
            <div className={`${styles.articleGrid} animate-in animate-delay-2`}>
              {articles.map((article, i) => (
                <Card
                  key={article.slug}
                  variant="case-study"
                  title={article.title}
                  dek={article.subtitle}
                  companyName={formatArticleDate(article.date)}
                  coverSrc={article.coverImage ?? coverPlaceholder(article.slug, i)}
                  href={`/writing/${article.slug}`}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}
