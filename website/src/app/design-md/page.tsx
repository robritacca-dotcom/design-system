import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import DownloadButton from "./DownloadButton";
import { getNavLinks, getSidebarLinks, designMdSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const navLinks = getNavLinks("Design MD");
const { sidebarLinks, subnavLinks } = getSidebarLinks(designMdSidebarLinks, "/design-md");

export default function DesignMdPage() {
  const filePath = path.join(process.cwd(), "public", "design.md");
  const raw = fs.readFileSync(filePath, "utf-8");

  // Strip the h1 title — we render it ourselves as the page header
  const content = raw.replace(/^#\s+.+\n/, "");

  return (
    <>
      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Design MD</h1>
            <DownloadButton />
          </div>

          <div className={`${styles.markdownBody} animate-in animate-delay-1`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
