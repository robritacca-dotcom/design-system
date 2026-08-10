import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import DownloadButton from "./DownloadButton";
import { getSidebarLinks, docsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(docsSidebarLinks, "/blueprints/porting-guide");

export default function PortingGuideBlueprintPage() {
  const filePath = path.join(process.cwd(), "public", "porting-guide.md");
  const raw = fs.readFileSync(filePath, "utf-8");

  const content = raw.replace(/^#\s+.+\r?\n/, "");

  return (
    <>
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Porting guide</h1>
            <DownloadButton />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Rebuild the chat in another design system
            </p>
            <p className={styles.introBody}>
              This site&apos;s chat, described abstractly enough to rebuild natively somewhere else: the decomposition, the behavioural invariants, and the traps, plus a two-phase protocol for a coding agent. Point it at a target codebase and the first deliverable is a viability report, not code.
            </p>
          </div>

          <div className={`${styles.markdownBody} animate-in animate-delay-2`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ ...props }) => (
                  <div className={styles.tableWrapper}>
                    <table {...props} />
                  </div>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
