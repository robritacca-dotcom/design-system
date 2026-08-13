"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { ContactCard } from "@robr0/design-system/components/ContactCard/ContactCard";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components/contact-card");

export default function ContactCardPage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Contact card</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-contactcard--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Linked contact method with icon, label, and value
            </p>
            <p className={styles.introBody}>
              ContactCard renders a single external or internal link with a logo or icon, a primary label, and a secondary value string. An optional copy-to-clipboard button surfaces on copyable cards. Used on the Contact page to group methods by category.
            </p>
          </div>

          {/* With Material Symbol icon */}
          <section className={styles.section}>
            <SectionTitle title="With icon" />
            <div className={styles.exampleWrap}>
              <ContactCard
                label="Email"
                value="rob.ritacca@gmail.com"
                href="mailto:rob.ritacca@gmail.com"
                icon="mail"
                external
                copyable
                onCopy={() => {}}
              />
            </div>
          </section>

          {/* With logo */}
          <section className={styles.section}>
            <SectionTitle title="With logo" />
            <div className={styles.exampleWrap}>
              <ContactCard
                label="LinkedIn"
                value="linkedin.com/in/robertritacca"
                href="https://www.linkedin.com/in/robertritacca/"
                logo="/logos/LinkedIN.png"
                external
              />
            </div>
          </section>

          {/* Internal link */}
          <section className={styles.section}>
            <SectionTitle title="Internal link" />
            <div className={styles.exampleWrap}>
              <ContactCard
                label="Components"
                value="Browse the component library"
                href="/components"
                icon="widgets"
              />
            </div>
          </section>

          {/* Group */}
          <section className={styles.section}>
            <SectionTitle title="Group" />
            <div className={styles.exampleWrap} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <ContactCard
                label="X"
                value="x.com/robr0"
                href="https://x.com/robr0"
                logo="/logos/X.png"
                external
              />
              <ContactCard
                label="Instagram"
                value="instagram.com/robr0designs"
                href="https://www.instagram.com/robr0designs/"
                logo="/logos/IG.svg"
                external
              />
              <ContactCard
                label="GitHub"
                value="github.com/robritacca-dotcom"
                href="https://github.com/robritacca-dotcom"
                logo="/logos/Git.svg"
                external
              />
            </div>
          </section>
        </main>
      </div>

    </>
  );
}
