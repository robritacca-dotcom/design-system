"use client";

import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { EntityCard } from "@design-system/components/EntityCard/EntityCard";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components/entity-card");

const demoIcons = ["home", "search", "settings", "person", "favorite", "star"];

const demoLogos = [
  { label: "Figma", src: "/logos/Figma.svg" },
  { label: "Claude", src: "/logos/Claude.svg" },
  { label: "Storybook", src: "/logos/storybook.svg" },
  { label: "Vite", src: "/logos/vite.svg" },
];

export default function EntityCardPage() {
  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Entity card</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-entitycard--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              A labelled tile for icons and logos
            </p>
            <p className={styles.introBody}>
              A compact display-only card with a centred Material Symbol or image and a label
              beneath. It powers the Icons and Logos galleries in the Foundations section, where
              rows of entities need to read as a uniform grid.
            </p>
          </div>

          {/* Icon cards */}
          <section className={styles.section}>
            <SectionTitle title="Icon cards" />
            <div className={styles.cardGrid}>
              {demoIcons.map((name) => (
                <EntityCard key={name} label={name} icon={name} />
              ))}
            </div>
          </section>

          {/* Image cards */}
          <section className={styles.section}>
            <SectionTitle title="Image cards" />
            <div className={styles.cardGrid}>
              {demoLogos.map((logo) => (
                <EntityCard
                  key={logo.label}
                  label={logo.label}
                  imageSrc={logo.src}
                  imageAlt={logo.label}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
