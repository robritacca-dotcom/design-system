"use client";

import Image from "next/image";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import PasswordGate from "../../../components/PasswordGate/PasswordGate";
import { getNavLinks, getSidebarLinks, aboutSidebarLinks } from "@/config/navigation";
import styles from "../page.module.css";
import workStyles from "./work.module.css";

const navLinks = getNavLinks("About");
const { sidebarLinks, subnavLinks } = getSidebarLinks(aboutSidebarLinks, "/about/work");

export default function AboutWorkPage() {
  return (
    <>
      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Work</h1>
          </div>

          {/* Page Description */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            A small selection of work samples shared privately on request.
          </p>

          {/* Cover image with drop shadow */}
          <div className={`${workStyles.coverWrap} animate-in animate-delay-2`}>
            <Image
              src="/images/portfolio.png"
              alt="Robert Ritacca — Product Design, Strategy &amp; Leadership work samples cover"
              width={2554}
              height={1433}
              priority
              className={workStyles.cover}
            />
          </div>

          {/* Password-gated CTA */}
          <div className={`${workStyles.ctaRow} animate-in animate-delay-3`}>
            <PasswordGate triggerLabel="View work samples" />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
