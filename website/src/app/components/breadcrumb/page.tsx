"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Breadcrumb } from "@robr0/design-system/components/Breadcrumb/Breadcrumb";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components/breadcrumb");

export default function BreadcrumbPage() {
  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Breadcrumb</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-breadcrumb--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Know where you are
            </p>
            <p className={styles.introBody}>
              A horizontal trail of links that shows the user&apos;s current location within the site hierarchy. Middle items collapse automatically when the path is long.
            </p>
          </div>

          {/* Default */}
          <section className={styles.section}>
            <SectionTitle title="Default" />
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Components", href: "/components" },
                { label: "Breadcrumb" },
              ]}
            />
          </section>

          {/* Long path */}
          <section className={styles.section}>
            <SectionTitle title="Long path" />
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Category", href: "/products/category" },
                { label: "Subcategory", href: "/products/category/sub" },
                { label: "Item detail" },
              ]}
            />
          </section>

          {/* Collapsed */}
          <section className={styles.section}>
            <SectionTitle title="Collapsed" />
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Section", href: "/section" },
                { label: "Category", href: "/section/category" },
                { label: "Components", href: "/section/category/components" },
                { label: "Breadcrumb" },
              ]}
              maxItems={3}
            />
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
