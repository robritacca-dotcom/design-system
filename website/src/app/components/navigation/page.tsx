"use client";

import React from "react";
import Image from "next/image";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Nav } from "@design-system/components/Nav/Nav";
import { ToggleSwitch } from "@design-system/components/ToggleSwitch/ToggleSwitch";
import { ButtonGroup } from "@design-system/components/ButtonGroup/ButtonGroup";
import type { ButtonProps } from "@design-system/components/Button/Button";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
/* ============================================
   DEMO NAV BUTTON DATA
   ============================================ */

const demoNavButtons: ButtonProps[] = [
  { label: "Home", priority: "tertiary", state: "default" },
  { label: "About", priority: "tertiary", state: "default" },
  { label: "Components", priority: "tertiary", state: "active" },
  { label: "Foundations", priority: "tertiary", state: "default" },
];

const demoMobileMenuTopLinks: ButtonProps[] = [
  { label: "Home", priority: "tertiary", state: "default" },
  { label: "About", priority: "tertiary", state: "disabled" },
  { label: "Work", priority: "tertiary", state: "disabled" },
  { label: "robr0 DS", priority: "tertiary", state: "active" },
];

const demoMobileSubnavLinks: ButtonProps[] = [
  { label: "Contents", priority: "tertiary", state: "active" },
  { label: "Menu item", priority: "tertiary", state: "default" },
  { label: "Menu item", priority: "tertiary", state: "default" },
  { label: "Menu item", priority: "tertiary", state: "default" },
  { label: "Menu item", priority: "tertiary", state: "default" },
  { label: "Colour", priority: "tertiary", state: "default" },
  { label: "Menu item", priority: "tertiary", state: "default" },
  { label: "Menu item", priority: "tertiary", state: "default" },
];

/* ============================================
   PAGE
   ============================================ */

const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/navigation");

export default function NavigationPage() {
  return (
    <>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Navigation</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=155-7279"
              storybookPath="/?path=/docs/components-nav--docs"
            />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              The top-level nav bar used across the site
            </p>
            <p className={styles.introBody}>
              On desktop it shows the brand, page links, and trailing content like a theme toggle. On mobile it collapses to a hamburger that opens a slide-out drawer with nested subnav links.
            </p>
          </div>

          {/* Desktop Nav */}
          <section className={styles.section}>
            <SectionTitle title="Desktop" />
            <div className={styles.showcase}>
              <span className={styles.showcaseLabel}>
                Full-width top navigation with brand, links, and trailing content
              </span>
              <div className={styles.navPreview}>
                <Nav
                  brandText="robr0"
                  brandIcon={
                    <Image src="/rr.svg" alt="robr0" width={24} height={24} />
                  }
                  buttons={demoNavButtons}
                  trailing={
                    <ToggleSwitch
                      checked={true}
                      label="Dark mode"
                      onChange={() => {}}
                    />
                  }
                />
              </div>
            </div>
          </section>

          {/* Mobile Nav Bar */}
          <section className={styles.section}>
            <SectionTitle title="Mobile bar" />
            <div className={styles.showcase}>
              <span className={styles.showcaseLabel}>
                Collapsed navigation bar with brand and hamburger trigger
              </span>
              <div className={styles.mobileNavPreview}>
                <div className={styles.mobileNavInner}>
                  <div className={styles.mobileNavBrand}>
                    <Image src="/rr.svg" alt="robr0" width={24} height={24} />
                    <span className={styles.mobileNavBrandText}>robr0</span>
                  </div>
                  <div className={styles.mobileNavHamburger}>
                    <span className="material-symbols-rounded" aria-hidden="true">
                      menu
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hamburger Menu */}
          <section className={styles.section}>
            <SectionTitle title="Hamburger menu" />
            <div className={styles.showcase}>
              <span className={styles.showcaseLabel}>
                Slide-out drawer with top-level links, nested subnav, and theme toggle
              </span>
              <div className={styles.hamburgerPreview}>
                <div className={styles.hamburgerOverlay}>
                  <div className={styles.hamburgerMenu}>
                    <div className={styles.hamburgerMenuLinks}>
                      <ButtonGroup
                        orientation="vertical"
                        buttons={demoMobileMenuTopLinks}
                      />
                      <div className={styles.hamburgerSubnav}>
                        <ButtonGroup
                          orientation="vertical"
                          buttons={demoMobileSubnavLinks}
                        />
                      </div>
                    </div>
                    <ToggleSwitch
                      checked={true}
                      label="Dark Mode"
                      onChange={() => {}}
                      className={styles.hamburgerThemeToggle}
                    />
                  </div>
                  <div className={styles.hamburgerCloseArea}>
                    <div className={styles.hamburgerCloseBtn}>
                      <span className="material-symbols-rounded" aria-hidden="true">
                        close
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
