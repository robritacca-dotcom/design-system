import Link from "next/link";
import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import TocCard from "../../components/TocCard/TocCard";
import { getSidebarLinks, consultingSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(consultingSidebarLinks, "/consulting");

export default function ConsultingPage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Consulting</h1>
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Builds, health checks, and 1:1 time, booked directly
            </p>
            <p className={styles.introBody}>
              I&apos;m a design engineer and I consult in two shapes. Teams and
              small businesses hire me for zero-to-one builds, health checks,
              and ongoing advisory. Designers book 1:1 time for portfolios,
              hiring, and mentorship. Either way the proof is this site:{" "}
              <Link href="/design-system" className={styles.introLink}>
                one system
              </Link>{" "}
              I built and run, and{" "}
              <Link href="/work" className={styles.introLink}>
                the case studies
              </Link>{" "}
              behind it.
            </p>
          </div>

          <div className={`${styles.tocGrid} animate-in animate-delay-2`}>
            <TocCard href="/consulting/teams" title="For teams">
              <div className={`${styles.circlePreview} ${styles.circleBlue}`}>
                <span className="material-symbols-rounded" aria-hidden="true">
                  groups
                </span>
              </div>
            </TocCard>

            <TocCard href="/consulting/designers" title="For designers">
              <div className={`${styles.circlePreview} ${styles.circleGreen}`}>
                <span className="material-symbols-rounded" aria-hidden="true">
                  draw
                </span>
              </div>
            </TocCard>
          </div>
        </main>
      </div>
    </>
  );
}
