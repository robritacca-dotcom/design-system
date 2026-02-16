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
import PageLinks from "../../../components/PageLinks/PageLinks";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components", active: true },
  { href: "/foundations", label: "Foundations" },
];

const sidebarLinks = [
  { href: "/components", label: "About" },
  { href: "/components/button", label: "Button" },
  { href: "/components/button-group", label: "Button group" },
  { href: "/components/card", label: "Card" },
  { href: "/components/navigation", label: "Navigation", active: true },
  { href: "/components/toggle-switch", label: "Toggle switch" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

/* ============================================
   DEMO NAV BUTTON DATA
   ============================================ */

const demoNavButtons: ButtonProps[] = [
  { label: "Home", priority: "secondary", state: "default" },
  { label: "About", priority: "secondary", state: "default" },
  { label: "Components", priority: "secondary", state: "active" },
  { label: "Foundations", priority: "secondary", state: "default" },
];

const demoMobileMenuTopLinks: ButtonProps[] = [
  { label: "Home", priority: "secondary", state: "default" },
  { label: "About", priority: "secondary", state: "disabled" },
  { label: "Work", priority: "secondary", state: "disabled" },
  { label: "robr0 DS", priority: "secondary", state: "active" },
];

const demoMobileSubnavLinks: ButtonProps[] = [
  { label: "Contents", priority: "secondary", state: "active" },
  { label: "Menu item", priority: "secondary", state: "default" },
  { label: "Menu item", priority: "secondary", state: "default" },
  { label: "Menu item", priority: "secondary", state: "default" },
  { label: "Menu item", priority: "secondary", state: "default" },
  { label: "Colour", priority: "secondary", state: "default" },
  { label: "Menu item", priority: "secondary", state: "default" },
  { label: "Menu item", priority: "secondary", state: "default" },
];

/* ============================================
   PAGE
   ============================================ */

export default function NavigationPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Navigation</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-nav--docs"
            />
          </div>

          {/* Intro */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Core navigation components that define top level and secondary menus, designed to adapt across desktop breakpoints and mobile layouts.
          </p>

          {/* Top level section */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionTitle}>
              <h2>Top level</h2>
            </div>

            <div className={styles.showcase}>
              {/* Desktop Nav */}
              <span className={styles.showcaseLabel}>Desktop</span>
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

              {/* Mobile Nav Bar */}
              <span className={styles.showcaseLabel}>Mobile</span>
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

              {/* Hamburger Menu */}
              <span className={styles.showcaseLabel}>Hamburger menu</span>
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
