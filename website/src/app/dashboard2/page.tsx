"use client";

import React from "react";
import { AppLayout } from "@design-system/components/AppLayout/AppLayout";
import { SectionTitle } from "@design-system/components/SectionTitle/SectionTitle";
import styles from "./page.module.css";

/* ============================================
   Sidebar config
   ============================================ */
const sidebarSections = [
  {
    category: "Main",
    items: [
      { key: "about", icon: "info", label: "About" },
      { key: "resume", icon: "description", label: "Resume" },
      { key: "dashboard", icon: "dashboard", label: "Dashboard" },
      { key: "analytics", icon: "analytics", label: "Analytics" },
      { key: "projects", icon: "folder", label: "Projects" },
    ],
  },
  {
    category: "Design System",
    items: [
      {
        key: "components",
        icon: "widgets",
        label: "Components",
        children: [
          { key: "button", label: "Button" },
          { key: "input", label: "Input" },
          { key: "card", label: "Card" },
          { key: "chart", label: "Chart" },
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
          { key: "icons", label: "Icons" },
        ],
      },
      { key: "tokens", icon: "token", label: "Tokens" },
    ],
  },
  {
    items: [
      { key: "settings", icon: "settings", label: "Settings" },
      { key: "help", icon: "help", label: "Help" },
    ],
  },
];

const sidebarProfile = {
  name: "robr0",
  email: "robr0@gmail.com",
};

/* ============================================
   Tool data for the "Tools" section
   ============================================ */
const tools = [
  { icon: "design_services", name: "Figma", desc: "robr0 DS design file, variables, MCP server" },
  { icon: "smart_toy", name: "Claude Code + Opus 4.6", desc: "AI component generation from Figma" },
  { icon: "edit", name: "Cursor", desc: "AI code editor and file inspection" },
  { icon: "menu_book", name: "Storybook", desc: "Component documentation site" },
  { icon: "code", name: "Github", desc: "Version Control" },
];

/* ============================================
   PAGE
   ============================================ */
export default function Dashboard2Page() {
  return (
    <AppLayout
      sections={sidebarSections}
      profile={sidebarProfile}
      activeKey="about"
      defaultExpanded={true}
      logoText="robr0"
    >
      {/* Header */}
      <div className="animate-in">
        <h1 className={styles.pageTitle}>About robr0 DS</h1>
      </div>

      {/* Intro */}
      <div className={`${styles.introSection} animate-in animate-delay-1`}>
        <p className={styles.subDisplay}>
          Design system infrastructure powered by AI tooling
        </p>
        <p className={styles.introBody}>
          I built a design-to-code pipeline that keeps design and development perfectly in sync.
          Everything starts in Figma where I define design tokens as variables and build components.
          Claude Code connects to Figma via MCP, reads the design data directly, and generates
          production-ready React components with token-based CSS and Storybook documentation.
          When I push changes to GitHub, Vercel automatically deploys both the component library
          (Storybook) and this website within 60 seconds. Design changes flow straight to
          production with zero manual translation or deployment steps.
        </p>
      </div>

      {/* Pipeline + Tools */}
      <div className={styles.pipelineRow}>
        {/* Pipeline column */}
        <div className={styles.pipelineCol}>
          <SectionTitle title="Pipeline" />
          <div className={styles.divider} />

          <div className={styles.jobEntry}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--color-icon-primary)" }}>design_services</span>
              <span className={styles.toolName}>Figma</span>
            </div>
            <div className={styles.jobTitle}>Design source of truth</div>
            <p className={styles.jobDescription}>
              All design decisions live in Figma. I design the robr0 DS system here — not mockups,
              but the actual source that generates code.
            </p>
            <ul className={styles.bulletList}>
              <li>Build design tokens as variables: 7 color ramps + spatial tokens (gap, padding, radius, border)</li>
              <li>Design components with variants and map semantics for light/dark modes</li>
              <li>Export JSON and expose via MCP for direct code generation</li>
            </ul>
          </div>

          <div className={styles.jobEntry}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 20, color: "var(--color-icon-primary)" }}>smart_toy</span>
              <span className={styles.toolName}>Claude Code</span>
            </div>
            <div className={styles.jobTitle}>AI component generator</div>
            <p className={styles.jobDescription}>
              Reads my Figma file via MCP and writes production React code directly from design data.
            </p>
            <ul className={styles.bulletList}>
              <li>Converts token JSON to layered CSS variables (primitives → semantics → components)</li>
              <li>Generates accessible React components with proper ARIA attributes</li>
              <li>Creates Storybook stories with controls for every prop variant</li>
            </ul>
          </div>
        </div>

        {/* Tools column */}
        <div className={styles.pipelineCol}>
          <SectionTitle title="Tools" />
          <div className={styles.divider} />

          {tools.map((tool) => (
            <div key={tool.name} className={styles.toolItem}>
              <div className={styles.toolIcon}>
                <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                  {tool.icon}
                </span>
              </div>
              <div className={styles.toolInfo}>
                <span className={styles.toolName}>{tool.name}</span>
                <span className={styles.toolDesc}>{tool.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
