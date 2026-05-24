"use client";

import Image from "next/image";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import PasswordGate from "../../../components/PasswordGate/PasswordGate";
import { Button } from "@design-system/components/Button/Button";
import { getSidebarLinks, aboutSidebarLinks } from "@/config/navigation";
import styles from "../page.module.css";
import workStyles from "./work.module.css";

const { sidebarLinks } = getSidebarLinks(aboutSidebarLinks, "/about/work");

export default function AboutWorkPage() {
  return (
    <>
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Work</h1>
          </div>

          {/* Page Description */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            A small selection of work samples shared privately on request.
          </p>

          {/* Both the cover image and the button trigger the same password modal */}
          <PasswordGate>
            {(open) => (
              <>
                <div className={`${workStyles.coverWrap} animate-in animate-delay-2`}>
                  <button
                    type="button"
                    onClick={open}
                    aria-label="View work samples — opens password prompt"
                    className={workStyles.coverButton}
                  >
                    <Image
                      src="/images/portfolio.png"
                      alt="Robert Ritacca — Product Design, Strategy &amp; Leadership work samples cover"
                      width={2554}
                      height={1433}
                      priority
                      className={workStyles.cover}
                    />
                  </button>
                </div>

                <div className={`${workStyles.ctaRow} animate-in animate-delay-3`}>
                  <Button
                    label="View work samples"
                    priority="primary"
                    iconRight="lock"
                    onClick={open}
                  />
                </div>
              </>
            )}
          </PasswordGate>
        </main>
      </div>

      <Footer />
    </>
  );
}
