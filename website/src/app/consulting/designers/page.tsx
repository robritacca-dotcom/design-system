import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getSidebarLinks, consultingSidebarLinks } from "@/config/navigation";
import ModeCards from "../ModeCards";
import ClosingCta from "../ClosingCta";
import { designerModes } from "../consulting-data";
import styles from "../page.module.css";

const { sidebarLinks } = getSidebarLinks(
  consultingSidebarLinks,
  "/consulting/designers"
);

export default function ConsultingDesignersPage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>For designers</h1>
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              1:1 time on your portfolio, your career, and your craft
            </p>
            <p className={styles.introBody}>
              Direct, practical sessions with a design engineer who has shipped
              at Meta, Intuit, and startups. Bring a portfolio, an interview
              loop, an offer, or a problem you&apos;re stuck on, and leave with
              a plan.
            </p>
          </div>

          <div className="animate-in animate-delay-2">
            <ModeCards modes={designerModes} />
          </div>

          <div className="animate-in animate-delay-3">
            <ClosingCta
              title="Start with a session"
              buttonLabel="Book a session"
            />
          </div>
        </main>
      </div>
    </>
  );
}
