"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Instructions } from "@design-system/components/Instructions/Instructions";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/instructions");

export default function InstructionsPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Instructions</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-instructions--docs"
            />
          </div>

          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Step-by-step guidance with numbered badges, connecting lines, and support for icons, descriptions, and horizontal layout.
          </p>

          {/* Numbered */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Numbered</h2>
            </div>
            <div className={styles.variantStack}>
              <Instructions
                title="Getting started"
                steps={[
                  { label: "Install dependencies", description: "Run npm install to set up the project." },
                  { label: "Configure tokens", description: "Import the token CSS files into your app entry point." },
                  { label: "Import components", description: "Start using components from the design system." },
                ]}
              />
            </div>
          </section>

          {/* With icons */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>With icons</h2>
            </div>
            <div className={styles.variantStack}>
              <Instructions
                title="Setup pipeline"
                steps={[
                  { label: "Design in Figma", description: "Create components and define tokens.", icon: "palette" },
                  { label: "Generate code", description: "Use Claude Code to read Figma via MCP.", icon: "code" },
                  { label: "Deploy", description: "Push to GitHub and auto-deploy to Vercel.", icon: "rocket_launch" },
                ]}
              />
            </div>
          </section>

          {/* Horizontal */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Horizontal</h2>
            </div>
            <div className={styles.variantStack} style={{ width: "100%" }}>
              <Instructions
                direction="horizontal"
                numbered={false}
                steps={[
                  { label: "Design", icon: "palette" },
                  { label: "Develop", icon: "code" },
                  { label: "Test", icon: "bug_report" },
                  { label: "Deploy", icon: "rocket_launch" },
                ]}
              />
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Compact</h2>
            </div>
            <div className={styles.variantStack}>
              <Instructions
                size="compact"
                title="Quick start"
                steps={[
                  { label: "Install", description: "npm install @design-system/components" },
                  { label: "Import tokens", description: "Add token CSS to your app" },
                  { label: "Use components", description: "Import and render components" },
                ]}
              />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
