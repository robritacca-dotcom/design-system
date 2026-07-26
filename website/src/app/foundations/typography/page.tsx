"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { TypographySwatch } from "@robr0/design-system/components/TypographySwatch/TypographySwatch";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, foundationsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(foundationsSidebarLinks, "/foundations/typography");

/* ============================================
   TYPOGRAPHY DATA
   Real values from tokens-typography.css.
   previewStyle uses CSS vars for live rendering.
   ============================================ */

interface TypeStyleData {
  name: string;
  weight: string;
  size: string;
  lineHeight: string;
  letterSpacing: string;
  previewStyle: React.CSSProperties;
}

const megaStyles: TypeStyleData[] = [
  {
    name: "Mega 1",
    weight: "Light",
    size: "132px",
    lineHeight: "112px",
    letterSpacing: "2%",
    previewStyle: {
      fontFamily: "var(--font-mega-1-family)",
      fontSize: "var(--font-mega-1-size)",
      fontWeight: "var(--font-mega-1-weight)" as unknown as number,
      lineHeight: "var(--font-mega-1-line-height)",
      letterSpacing: "var(--font-mega-1-letter-spacing)",
    },
  },
  {
    name: "Mega 2",
    weight: "Light",
    size: "116px",
    lineHeight: "99px",
    letterSpacing: "2%",
    previewStyle: {
      fontFamily: "var(--font-mega-2-family)",
      fontSize: "var(--font-mega-2-size)",
      fontWeight: "var(--font-mega-2-weight)" as unknown as number,
      lineHeight: "var(--font-mega-2-line-height)",
      letterSpacing: "var(--font-mega-2-letter-spacing)",
    },
  },
];

const displayStyles: TypeStyleData[] = [
  {
    name: "Display 1",
    weight: "Light",
    size: "96px",
    lineHeight: "96px",
    letterSpacing: "2%",
    previewStyle: {
      fontFamily: "var(--font-display-1-family)",
      fontSize: "var(--font-display-1-size)",
      fontWeight: "var(--font-display-1-weight)" as unknown as number,
      lineHeight: "var(--font-display-1-line-height)",
      letterSpacing: "var(--font-display-1-letter-spacing)",
    },
  },
  {
    name: "Display 2",
    weight: "Light",
    size: "64px",
    lineHeight: "64px",
    letterSpacing: "1.5%",
    previewStyle: {
      fontFamily: "var(--font-display-2-family)",
      fontSize: "var(--font-display-2-size)",
      fontWeight: "var(--font-display-2-weight)" as unknown as number,
      lineHeight: "var(--font-display-2-line-height)",
      letterSpacing: "var(--font-display-2-letter-spacing)",
    },
  },
  {
    name: "Sub display",
    weight: "Light",
    size: "30px",
    lineHeight: "44px",
    letterSpacing: "1.5%",
    previewStyle: {
      fontFamily: "var(--font-sub-display-family)",
      fontSize: "var(--font-sub-display-size)",
      fontWeight: "var(--font-sub-display-weight)" as unknown as number,
      lineHeight: "var(--font-sub-display-line-height)",
      letterSpacing: "var(--font-sub-display-letter-spacing)",
    },
  },
];

const headingStyles: TypeStyleData[] = [
  {
    name: "Heading 1",
    weight: "SemiBold",
    size: "30px",
    lineHeight: "44px",
    letterSpacing: "1.5%",
    previewStyle: {
      fontFamily: "var(--font-heading-1-family)",
      fontSize: "var(--font-heading-1-size)",
      fontWeight: "var(--font-heading-1-weight)" as unknown as number,
      lineHeight: "var(--font-heading-1-line-height)",
      letterSpacing: "var(--font-heading-1-letter-spacing)",
    },
  },
  {
    name: "Heading 2",
    weight: "SemiBold",
    size: "26px",
    lineHeight: "32px",
    letterSpacing: "1.5%",
    previewStyle: {
      fontFamily: "var(--font-heading-2-family)",
      fontSize: "var(--font-heading-2-size)",
      fontWeight: "var(--font-heading-2-weight)" as unknown as number,
      lineHeight: "var(--font-heading-2-line-height)",
      letterSpacing: "var(--font-heading-2-letter-spacing)",
    },
  },
  {
    name: "Heading 3",
    weight: "SemiBold",
    size: "22px",
    lineHeight: "28px",
    letterSpacing: "1.5%",
    previewStyle: {
      fontFamily: "var(--font-heading-3-family)",
      fontSize: "var(--font-heading-3-size)",
      fontWeight: "var(--font-heading-3-weight)" as unknown as number,
      lineHeight: "var(--font-heading-3-line-height)",
      letterSpacing: "var(--font-heading-3-letter-spacing)",
    },
  },
];

const bodyStyles: TypeStyleData[] = [
  {
    name: "Title",
    weight: "SemiBold",
    size: "16px",
    lineHeight: "24px",
    letterSpacing: "-1%",
    previewStyle: {
      fontFamily: "var(--font-title-body-family)",
      fontSize: "var(--font-title-body-size)",
      fontWeight: "var(--font-title-body-weight)" as unknown as number,
      lineHeight: "var(--font-title-body-line-height)",
      letterSpacing: "var(--font-title-body-letter-spacing)",
    },
  },
  {
    name: "Paragraph Em",
    weight: "Medium",
    size: "16px",
    lineHeight: "24px",
    letterSpacing: "-1%",
    previewStyle: {
      fontFamily: "var(--font-paragraph-em-family)",
      fontSize: "var(--font-paragraph-em-size)",
      fontWeight: "var(--font-paragraph-em-weight)" as unknown as number,
      lineHeight: "var(--font-paragraph-em-line-height)",
      letterSpacing: "var(--font-paragraph-em-letter-spacing)",
    },
  },
  {
    name: "Paragraph",
    weight: "Regular",
    size: "16px",
    lineHeight: "24px",
    letterSpacing: "0",
    previewStyle: {
      fontFamily: "var(--font-paragraph-family)",
      fontSize: "var(--font-paragraph-size)",
      fontWeight: "var(--font-paragraph-weight)" as unknown as number,
      lineHeight: "var(--font-paragraph-line-height)",
      letterSpacing: "var(--font-paragraph-letter-spacing)",
    },
  },
  {
    name: "Paragraph SM Em",
    weight: "Medium",
    size: "14px",
    lineHeight: "20px",
    letterSpacing: "0",
    previewStyle: {
      fontFamily: "var(--font-paragraph-sm-em-family)",
      fontSize: "var(--font-paragraph-sm-em-size)",
      fontWeight: "var(--font-paragraph-sm-em-weight)" as unknown as number,
      lineHeight: "var(--font-paragraph-sm-em-line-height)",
      letterSpacing: "var(--font-paragraph-sm-em-letter-spacing)",
    },
  },
  {
    name: "Paragraph SM",
    weight: "Regular",
    size: "14px",
    lineHeight: "20px",
    letterSpacing: "0",
    previewStyle: {
      fontFamily: "var(--font-paragraph-sm-family)",
      fontSize: "var(--font-paragraph-sm-size)",
      fontWeight: "var(--font-paragraph-sm-weight)" as unknown as number,
      lineHeight: "var(--font-paragraph-sm-line-height)",
      letterSpacing: "var(--font-paragraph-sm-letter-spacing)",
    },
  },
];

const typeSections = [
  { title: "Mega", styles: megaStyles },
  { title: "Display", styles: displayStyles },
  { title: "Heading", styles: headingStyles },
  { title: "Body", styles: bodyStyles },
];

/* ============================================
   PAGE
   ============================================ */

export default function TypographyPage() {
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
            <h1 className={styles.pageTitle}>Typography</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=191-1656"
              storybookPath="/?path=/docs/foundations-typography--docs"
            />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Everything is set in{" "}
              <a
                href="https://fonts.google.com/specimen/Nunito+Sans"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fontLink}
              >
                Nunito Sans
              </a>
            </p>
            <p className={styles.introBody}>
              Mega and Display styles are for hero moments and landing pages. Headings structure sections. Title is for bold labels. Paragraph Em is the default for buttons and interactive controls. Paragraph is body copy. The SM variants scale each of those down for compact components and secondary text.
            </p>
          </div>

          {/* Type Sections */}
          {typeSections.map((section, idx) => (
            <section
              key={section.title}
              className={`${styles.typeSection}${idx < 2 ? " animate-in animate-delay-2" : ""}`}
            >
              <SectionTitle title={section.title} />

              <div className={styles.typeStyles}>
                {section.styles.map((t) => (
                  <TypographySwatch
                    key={t.name}
                    name={t.name}
                    weight={t.weight}
                    size={t.size}
                    lineHeight={t.lineHeight}
                    letterSpacing={t.letterSpacing}
                    previewStyle={t.previewStyle}
                  />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      <Footer />
    </>
  );
}
