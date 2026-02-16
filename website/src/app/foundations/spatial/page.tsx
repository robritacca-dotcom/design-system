"use client";

import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { SpacingSwatch } from "@design-system/components/SpacingSwatch/SpacingSwatch";
import type { SpacingSwatchVariant } from "@design-system/components/SpacingSwatch/SpacingSwatch";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, foundationsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const navLinks = getNavLinks("Foundations");
const { sidebarLinks, subnavLinks } = getSidebarLinks(foundationsSidebarLinks, "/foundations/spatial");

/* ============================================
   SPACING DATA
   Organised by section: Border, Radius, Gap, Padding.
   Each entry maps to a primitive token.
   ============================================ */

interface SpacingToken {
  label: string;
  value: string;
  px: number;
  variant: SpacingSwatchVariant;
}

const borderTokens: SpacingToken[] = [
  { label: "XS", value: "1px", px: 1, variant: "border" },
  { label: "MD", value: "2px", px: 2, variant: "border" },
];

const radiusTokens: SpacingToken[] = [
  { label: "XXS", value: "2px", px: 2, variant: "radius" },
  { label: "XS", value: "4px", px: 4, variant: "radius" },
  { label: "SM", value: "8px", px: 8, variant: "radius" },
  { label: "MD", value: "12px", px: 12, variant: "radius" },
  { label: "LG", value: "16px", px: 16, variant: "radius" },
  { label: "XL", value: "24px", px: 24, variant: "radius" },
  { label: "XXL", value: "48px", px: 48, variant: "radius" },
  { label: "Full", value: "999px", px: 999, variant: "radius" },
];

const gapTokens: SpacingToken[] = [
  { label: "XS", value: "2px", px: 2, variant: "gap" },
  { label: "SM", value: "8px", px: 8, variant: "gap" },
  { label: "MD", value: "16px", px: 16, variant: "gap" },
  { label: "LG", value: "20px", px: 20, variant: "gap" },
  { label: "XL", value: "40px", px: 40, variant: "gap" },
  { label: "XXL", value: "60px", px: 60, variant: "gap" },
  { label: "XXXL", value: "80px", px: 80, variant: "gap" },
  { label: "XXXXL", value: "120px", px: 120, variant: "gap" },
];

const paddingTokens: SpacingToken[] = [
  { label: "XXS", value: "2px", px: 2, variant: "padding" },
  { label: "XS", value: "4px", px: 4, variant: "padding" },
  { label: "SM2", value: "6px", px: 6, variant: "padding" },
  { label: "SM", value: "8px", px: 8, variant: "padding" },
  { label: "MD", value: "16px", px: 16, variant: "padding" },
  { label: "LG", value: "20px", px: 20, variant: "padding" },
  { label: "XL", value: "40px", px: 40, variant: "padding" },
  { label: "XXL", value: "60px", px: 60, variant: "padding" },
];

const spacingSections = [
  { title: "Border", tokens: borderTokens },
  { title: "Radius", tokens: radiusTokens },
  { title: "Gap", tokens: gapTokens },
  { title: "Padding", tokens: paddingTokens },
];

/* ============================================
   PAGE
   ============================================ */

export default function SemanticSpacingPage() {
  return (
    <>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Semantic spacing</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-spacingswatch--docs"
            />
          </div>

          {/* Intro */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Four categories of spacing tokens, all defined as Figma variables. Border controls stroke thickness. Radius sets corner rounding, from subtle (4px) to full pill shapes. Gap is the space between sibling elements like buttons in a group or items in a list. Padding is the breathing room inside a container, like the space between a card edge and its content.
          </p>

          {/* Sections */}
          {spacingSections.map((section, idx) => (
            <section
              key={section.title}
              className={`${styles.spacingGroup}${idx < 2 ? " animate-in animate-delay-2" : ""}`}
            >
              <div className={styles.spacingGroupTitle}>
                <h2>{section.title}</h2>
              </div>
              <div className={styles.spacingGrid}>
                {section.tokens.map((t) => (
                  <SpacingSwatch
                    key={`${section.title}-${t.label}`}
                    label={t.label}
                    value={t.value}
                    px={t.px}
                    variant={t.variant}
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
