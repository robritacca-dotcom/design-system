"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Card } from "@design-system/components/Card/Card";
import { EntityCard } from "@design-system/components/EntityCard/EntityCard";
import { ColourSwatch } from "@design-system/components/ColourSwatch/ColourSwatch";
import { TypographySwatch } from "@design-system/components/TypographySwatch/TypographySwatch";
import { SpacingSwatch } from "@design-system/components/SpacingSwatch/SpacingSwatch";
import { Button } from "@design-system/components/Button/Button";
import { ToggleSwitch } from "@design-system/components/ToggleSwitch/ToggleSwitch";
import PageLinks from "../../../components/PageLinks/PageLinks";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/components", label: "Components", active: true },
  { href: "/foundations", label: "Foundations" },
];

const sidebarLinks = [
  { href: "/components", label: "Contents" },
  { href: "/components/button", label: "Button" },
  { href: "/components/button-group", label: "Button group" },
  { href: "/components/card", label: "Card", active: true },
  { href: "/components/navigation", label: "Navigation" },
  { href: "/components/toggle-switch", label: "Toggle switch" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

/* ============================================
   PAGE
   ============================================ */

export default function CardPage() {
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
            <h1 className={styles.pageTitle}>Cards</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-card--docs"
            />
          </div>

          {/* Intro */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            A family of card components for previews, navigation, and token documentation — from content cards to colour swatches and typography specimens.
          </p>

          {/* ----------------------------------------
              CARD — base preview / navigation card
              ---------------------------------------- */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Card</h2>
            </div>
            <div className={styles.cardRow}>
              <Card title="Button">
                <Button
                  label="Button"
                  priority="primary"
                  iconRight="arrow_forward"
                />
              </Card>
              <Card title="Toggle switch">
                <ToggleSwitch checked={true} label="Dark Mode" onChange={() => {}} />
              </Card>
              <Card title="Card" interactive>
                <Button
                  label="Interactive"
                  priority="secondary"
                  size="compact"
                />
              </Card>
            </div>
          </section>

          {/* ----------------------------------------
              ENTITY CARD — compact icon / logo card
              ---------------------------------------- */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Entity card</h2>
            </div>
            <div className={styles.entityRow}>
              <EntityCard label="home" icon="home" />
              <EntityCard label="settings" icon="settings" />
              <EntityCard label="search" icon="search" />
              <EntityCard label="person" icon="person" />
              <EntityCard label="favorite" icon="favorite" />
              <EntityCard label="star" icon="star" />
            </div>
          </section>

          {/* ----------------------------------------
              COLOUR SWATCH — colour token card
              ---------------------------------------- */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Colour swatch</h2>
            </div>
            <div className={styles.swatchRow}>
              <ColourSwatch
                label="Primary"
                cssVar="--color-core-ui-primary"
                dark={{ primitive: "--teal--07--", hex: "#118AB2", rgb: "17 / 138 / 178" }}
              />
              <ColourSwatch
                label="Secondary"
                cssVar="--color-core-ui-secondary"
                dark={{ primitive: "--orange--07--", hex: "#F4845F", rgb: "244 / 132 / 95" }}
              />
              <ColourSwatch
                label="Background"
                cssVar="--color-bg-primary"
                dark={{ hex: "#050505", rgb: "5 / 5 / 5" }}
              />
            </div>
          </section>

          {/* ----------------------------------------
              TYPOGRAPHY SWATCH — type specimen card
              ---------------------------------------- */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Typography swatch</h2>
            </div>
            <div className={styles.typographyColumn}>
              <TypographySwatch
                name="Heading 1"
                weight="SemiBold"
                size="36"
                lineHeight="44px"
                letterSpacing="-1%"
                previewStyle={{
                  fontSize: "var(--font-heading-1-size)",
                  fontWeight: "var(--font-heading-1-weight)",
                  lineHeight: "var(--font-heading-1-line-height)",
                  letterSpacing: "var(--font-heading-1-letter-spacing)",
                }}
              />
              <TypographySwatch
                name="Paragraph"
                weight="Regular"
                size="16"
                lineHeight="24px"
                letterSpacing="0"
                previewStyle={{
                  fontSize: "var(--font-paragraph-size)",
                  fontWeight: "var(--font-paragraph-weight)",
                  lineHeight: "var(--font-paragraph-line-height)",
                  letterSpacing: "var(--font-paragraph-letter-spacing)",
                }}
              />
            </div>
          </section>

          {/* ----------------------------------------
              SPACING SWATCH — spatial token card
              ---------------------------------------- */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Spacing swatch</h2>
            </div>
            <div className={styles.spacingRow}>
              <SpacingSwatch label="SM" value="8px" px={8} variant="gap" />
              <SpacingSwatch label="MD" value="12px" px={12} variant="radius" />
              <SpacingSwatch label="LG" value="16px" px={16} variant="padding" />
              <SpacingSwatch label="XS" value="1px" px={1} variant="border" />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
