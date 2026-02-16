"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { EntityCard } from "@design-system/components/EntityCard/EntityCard";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, foundationsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const navLinks = getNavLinks("Foundations");
const { sidebarLinks, subnavLinks } = getSidebarLinks(foundationsSidebarLinks, "/foundations/logos");

/* ============================================
   LOGO DATA
   Each entry is { label, file }.
   Grouped into logical categories.
   ============================================ */

interface LogoEntry {
  label: string;
  file: string;
}

interface LogoCategory {
  title: string;
  logos: LogoEntry[];
}

const logoCategories: LogoCategory[] = [
  {
    title: "robr0",
    logos: [
      { label: "rr", file: "rr.svg" },
    ],
  },
  {
    title: "Design & Prototyping",
    logos: [
      { label: "Figma", file: "Figma.svg" },
      { label: "sketch", file: "sketch.svg" },
      { label: "invision", file: "invision.svg" },
      { label: "miro", file: "miro.svg" },
      { label: "zeplin", file: "zeplin.svg" },
    ],
  },
  {
    title: "Adobe Creative Suite",
    logos: [
      { label: "Adobe", file: "Adobe.svg" },
      { label: "Illustrator", file: "Illustrator.svg" },
      { label: "lightroom", file: "lightroom.svg" },
      { label: "premiere", file: "premiere.svg" },
    ],
  },
  {
    title: "Development & Infrastructure",
    logos: [
      { label: "nextjs black", file: "nextjs black.svg" },
      { label: "nextjs white", file: "nextjs white.svg" },
      { label: "vite", file: "vite.svg" },
      { label: "storybook", file: "storybook.svg" },
      { label: "Git", file: "Git.svg" },
      { label: "vercel black", file: "vercel black.svg" },
      { label: "vercel white", file: "vercel white.svg" },
      { label: "wordpress", file: "wordpress.svg" },
      { label: "material", file: "material.svg" },
    ],
  },
  {
    title: "AI & Tooling",
    logos: [
      { label: "Claude", file: "Claude.svg" },
      { label: "ChatGPT", file: "ChatGPT.svg" },
      { label: "chatGPT black", file: "chatGPT black.svg" },
      { label: "chatGPT white", file: "chatGPT white.svg" },
      { label: "cursor", file: "cursor.svg" },
    ],
  },
  {
    title: "Productivity & Collaboration",
    logos: [
      { label: "Asana", file: "Asana.svg" },
      { label: "Atlassian", file: "Atlassian.svg" },
      { label: "keynote", file: "keynote.svg" },
      { label: "mailchimp", file: "mailchimp.svg" },
      { label: "Arc", file: "Arc.svg" },
    ],
  },
  {
    title: "Apple",
    logos: [
      { label: "Apple", file: "Apple.svg" },
      { label: "apple black", file: "apple black.svg" },
      { label: "apple white", file: "apple white.svg" },
    ],
  },
  {
    title: "Intuit",
    logos: [
      { label: "Intuit", file: "Intuit.svg" },
      { label: "quickbooks", file: "quickbooks.svg" },
      { label: "turbotax", file: "turbotax.svg" },
      { label: "Creditkarma", file: "Creditkarma.svg" },
      { label: "mailchimp", file: "mailchimp.svg" },
    ],
  },
  {
    title: "Finance & Commerce",
    logos: [
      { label: "CIBC", file: "CIBC.svg" },
      { label: "stripe", file: "stripe.svg" },
      { label: "Instacart", file: "Instacart.svg" },
      { label: "GoDaddy", file: "GoDaddy.svg" },
    ],
  },
  {
    title: "Social & Media",
    logos: [
      { label: "meta", file: "meta.svg" },
      { label: "redgiant", file: "redgiant.svg" },
      { label: "canon", file: "canon.svg" },
    ],
  },
  {
    title: "Agencies & Consulting",
    logos: [
      { label: "Cognizant", file: "Cognizant.svg" },
      { label: "Devbridge", file: "Devbridge.svg" },
      { label: "AdParlor", file: "AdParlor.svg" },
      { label: "Augmenta", file: "Augmenta.svg" },
      { label: "Fengate", file: "Fengate.svg" },
      { label: "slii", file: "slii.svg" },
      { label: "Deque", file: "Deque.svg" },
    ],
  },
  {
    title: "Education & Government",
    logos: [
      { label: "uoft", file: "uoft.svg" },
      { label: "sheridan", file: "sheridan.svg" },
      { label: "Canada", file: "Canada.svg" },
      { label: "usa", file: "usa.svg" },
    ],
  },
];

const totalLogos = logoCategories.reduce((sum, cat) => sum + cat.logos.length, 0);

/* ============================================
   PAGE
   ============================================ */

export default function LogosPage() {
  return (
    <>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Logos</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/foundations-logos--docs"
            />
          </div>

          {/* Intro */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            SVG logos for brands, tools, and clients referenced across the portfolio. Each is sized and exported from a single Figma frame to keep alignment and proportions consistent when used inside cards and layouts.
          </p>

          {/* Logo Categories */}
          {logoCategories.map((category, idx) => (
            <section
              key={category.title}
              className={`${styles.logoSection}${idx < 2 ? " animate-in animate-delay-2" : ""}`}
            >
              <div className={styles.logoSectionTitle}>
                <h2>{category.title}</h2>
                <span className={styles.logoCount}>{category.logos.length}</span>
              </div>

              <div className={styles.logoGrid}>
                {category.logos.map((logo) => (
                  <EntityCard
                    key={logo.file}
                    label={logo.label}
                    imageSrc={`/logos/${logo.file}`}
                    imageAlt={logo.label}
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
