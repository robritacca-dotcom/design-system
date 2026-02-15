"use client";

import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components" },
  { href: "/foundations", label: "Foundations", active: true },
];

const sidebarLinks = [
  { href: "/foundations", label: "About" },
  { href: "/foundations/icons", label: "Icons" },
  { href: "/foundations/logos", label: "Logos" },
  { href: "/foundations/colour-primitives", label: "Primative colours" },
  { href: "/foundations/colour-mode", label: "Semantic colours" },
  { href: "/foundations/spatial", label: "Semantic spacing" },
  { href: "/foundations/typography", label: "Typography", active: true },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

/* ============================================
   TYPOGRAPHY DATA
   Real values from tokens-typography.css
   ============================================ */

interface TypeStyle {
  /** Display name rendered in the actual font style */
  name: string;
  /** CSS class for the preview text */
  previewClass: string;
  /** Font weight label (e.g. "Light", "SemiBold") */
  weight: string;
  /** Font size in px */
  size: string;
  /** Line height (percentage or px) */
  lineHeight: string;
  /** Letter spacing (percentage or 0) */
  letterSpacing: string;
}

const megaStyles: TypeStyle[] = [
  {
    name: "Mega 1",
    previewClass: "typeMega1",
    weight: "Light",
    size: "132",
    lineHeight: "85%",
    letterSpacing: "2%",
  },
  {
    name: "Mega 2",
    previewClass: "typeMega2",
    weight: "Light",
    size: "116",
    lineHeight: "85%",
    letterSpacing: "2%",
  },
];

const displayStyles: TypeStyle[] = [
  {
    name: "Display 1",
    previewClass: "typeDisplay1",
    weight: "Light",
    size: "96",
    lineHeight: "100%",
    letterSpacing: "2%",
  },
  {
    name: "Display 2",
    previewClass: "typeDisplay2",
    weight: "Light",
    size: "64",
    lineHeight: "100%",
    letterSpacing: "1.5%",
  },
  {
    name: "Sub display",
    previewClass: "typeSubDisplay",
    weight: "Light",
    size: "30",
    lineHeight: "44px",
    letterSpacing: "1.5%",
  },
];

const headingStyles: TypeStyle[] = [
  {
    name: "Heading 1",
    previewClass: "typeHeading1",
    weight: "SemiBold",
    size: "30",
    lineHeight: "44px",
    letterSpacing: "1.5%",
  },
  {
    name: "Heading 2",
    previewClass: "typeHeading2",
    weight: "SemiBold",
    size: "26",
    lineHeight: "32px",
    letterSpacing: "1.5%",
  },
  {
    name: "Heading 3",
    previewClass: "typeHeading3",
    weight: "SemiBold",
    size: "22",
    lineHeight: "28px",
    letterSpacing: "1.5%",
  },
];

const bodyStyles: TypeStyle[] = [
  {
    name: "Title",
    previewClass: "typeTitleBody",
    weight: "SemiBold",
    size: "16",
    lineHeight: "24px",
    letterSpacing: "-1%",
  },
  {
    name: "Paragraph",
    previewClass: "typeParagraph",
    weight: "Regular",
    size: "16",
    lineHeight: "24px",
    letterSpacing: "0",
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
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <h1 className={`${styles.pageTitle} animate-in`}>Typography</h1>

          {/* Intro */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            A single type system built on Nunito Sans, scaled from mega through paragraph to support consistent hierarchy and readable layout across the site.
          </p>

          {/* Type Sections */}
          {typeSections.map((section, idx) => (
            <section
              key={section.title}
              className={`${styles.typeSection}${idx < 2 ? " animate-in animate-delay-2" : ""}`}
            >
              <div className={styles.typeSectionTitle}>
                <h2>{section.title}</h2>
              </div>

              <div className={styles.typeStyles}>
                {section.styles.map((t) => (
                  <div key={t.name} className={styles.typeRow}>
                    {/* Preview text rendered in actual font style */}
                    <span className={styles[t.previewClass]}>{t.name}</span>

                    {/* Values row */}
                    <div className={styles.typeValues}>
                      <div className={styles.typeValueItem}>
                        <span className={styles.typeValueNumber}>{t.weight}</span>
                        <span className={styles.typeValueLabel}>Font weight</span>
                      </div>
                      <div className={styles.typeValueItem}>
                        <span className={styles.typeValueNumber}>{t.size}</span>
                        <span className={styles.typeValueLabel}>Font size</span>
                      </div>
                      <div className={styles.typeValueItem}>
                        <span className={styles.typeValueNumber}>{t.lineHeight}</span>
                        <span className={styles.typeValueLabel}>Line height</span>
                      </div>
                      <div className={styles.typeValueItem}>
                        <span className={styles.typeValueNumber}>{t.letterSpacing}</span>
                        <span className={styles.typeValueLabel}>Letter spacing</span>
                      </div>
                    </div>
                  </div>
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
