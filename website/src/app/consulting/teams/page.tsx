import Link from "next/link";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import { getSidebarLinks, consultingSidebarLinks } from "@/config/navigation";
import ModeCards from "../ModeCards";
import ClosingCta from "../ClosingCta";
import { teamModes, teamSteps } from "../consulting-data";
import styles from "../page.module.css";

const { sidebarLinks } = getSidebarLinks(consultingSidebarLinks, "/consulting/teams");

export default function ConsultingTeamsPage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>For teams</h1>
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              A team of one, from first sketch to shipped code
            </p>
            <p className={styles.introBody}>
              I design and build whole products: AI experiences, product flows,
              and design systems. This site is the demo. The components,
              tokens, and checks on this page all ship from{" "}
              <Link href="/design-system" className={styles.introLink}>
                one system
              </Link>{" "}
              I built and run, and{" "}
              <Link href="/work" className={styles.introLink}>
                the case studies
              </Link>{" "}
              cover the rest.
            </p>
          </div>

          <div className="animate-in animate-delay-2">
            <ModeCards modes={teamModes} />
          </div>

          <section className={`${styles.section} animate-in animate-delay-3`}>
            <SectionTitle title="How it runs" />
            <div className={styles.stepGrid}>
              {teamSteps.map((s, i) => (
                <div key={s.title} className={styles.step}>
                  <span className={styles.stepNumber}>{i + 1}</span>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="animate-in animate-delay-4">
            <ClosingCta
              title="Start with a health check"
              buttonLabel="Book a health check"
            />
          </div>
        </main>
      </div>
    </>
  );
}
