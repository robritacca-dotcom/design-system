"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { AppSidebar } from "@design-system/components/AppSidebar/AppSidebar";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/app-sidebar");

const demoSections = [
  {
    category: "Main",
    items: [
      { key: "dashboard", icon: "dashboard", label: "Dashboard" },
      { key: "analytics", icon: "analytics", label: "Analytics" },
      { key: "projects", icon: "folder", label: "Projects" },
      { key: "tasks", icon: "task_alt", label: "Tasks" },
      { key: "calendar", icon: "calendar_today", label: "Calendar" },
    ],
  },
  {
    category: "Design",
    items: [
      {
        key: "components",
        icon: "widgets",
        label: "Components",
        children: [
          { key: "buttons", label: "Buttons" },
          { key: "inputs", label: "Inputs" },
          { key: "cards", label: "Cards" },
        ],
      },
      {
        key: "foundations",
        icon: "palette",
        label: "Foundations",
        children: [
          { key: "colours", label: "Colours" },
          { key: "typography", label: "Typography" },
          { key: "spacing", label: "Spacing" },
        ],
      },
      { key: "icons", icon: "emoji_symbols", label: "Icons" },
    ],
  },
  {
    items: [
      { key: "settings", icon: "settings", label: "Settings" },
      { key: "help", icon: "help", label: "Help" },
    ],
  },
];

const demoProfile = {
  name: "robr0",
  email: "robr0@gmail.com",
};

export default function AppSidebarPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>App sidebar</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-app-sidebar--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Collapsible navigation for app layouts
            </p>
            <p className={styles.introBody}>
              A two-state sidebar that collapses to a 64px icon rail or expands to 280px with labels, category headings, accordion sub-items with tree-line connectors, and a profile section at the bottom.
            </p>
          </div>

          {/* Expanded */}
          <section className={styles.section}>
            <SectionTitle title="Expanded" />
            <div className={styles.sidebarDemo}>
              <AppSidebar
                sections={demoSections}
                profile={demoProfile}
                activeKey="dashboard"
                defaultExpanded={true}
              />
            </div>
          </section>

          {/* Collapsed */}
          <section className={styles.section}>
            <SectionTitle title="Collapsed" />
            <div className={styles.sidebarDemo}>
              <AppSidebar
                sections={demoSections}
                profile={demoProfile}
                activeKey="dashboard"
                defaultExpanded={false}
              />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
