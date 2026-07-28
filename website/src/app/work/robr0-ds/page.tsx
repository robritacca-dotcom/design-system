"use client";

import { useState } from "react";
import Image from "next/image";
import { COMPONENT_COUNT } from "@robr0/design-system/components/registry";
import { TOKEN_COUNT, TOKEN_COUNTS, type TokenCategory } from "@robr0/design-system/tokens/registry";
import Link from "next/link";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Button } from "@robr0/design-system/components/Button/Button";
import { Badge } from "@robr0/design-system/components/Badge/Badge";
import { Alert } from "@robr0/design-system/components/Alert/Alert";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { ProgressBar } from "@robr0/design-system/components/ProgressBar/ProgressBar";
import { LineChart } from "@robr0/design-system/components/Chart/LineChart";
import { BarChart } from "@robr0/design-system/components/Chart/BarChart";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

/* ============================================
   Real history — registered components and semantic
   tokens measured from git at each month-end
   (snapshot taken July 2026); the current month
   comes live from the registries
   ============================================ */
const systemGrowth = [
  { month: "Feb", components: 39, tokens: 156 },
  { month: "Mar", components: 39, tokens: 156 },
  { month: "Apr", components: 39, tokens: 156 },
  { month: "May", components: 39, tokens: 156 },
  { month: "Jun", components: 41, tokens: 156 },
  { month: "Jul", components: COMPONENT_COUNT, tokens: TOKEN_COUNT },
];

const tokenCategoryLabels: Record<TokenCategory, string> = {
  colour: "Colour",
  typography: "Typography",
  spacing: "Spacing",
  radius: "Radius",
  border: "Border",
  shadow: "Shadow",
  icons: "Icon sizes",
  motion: "Motion",
};

const tokensByCategory = (
  Object.entries(TOKEN_COUNTS) as [TokenCategory, number][]
).map(([category, value]) => ({ label: tokenCategoryLabels[category], value }));

const { sidebarLinks } = getSidebarLinks(workSidebarLinks, "/work/robr0-ds");

/** The pipeline diagram — six labeled boxes connected by chevrons. */
function PipelineDiagram() {
  const steps = [
    { label: "Figma", note: "Foundation + exploration" },
    { label: "design.md", note: "The written spec" },
    { label: "Claude Code", note: "Generates React + CSS" },
    { label: "Storybook", note: "Auto-built docs" },
    { label: "GitHub", note: "Version control + CI" },
    { label: "Vercel", note: "~60s to live" },
  ];
  return (
    <div className={styles.pipeline} role="figure" aria-label="Design-to-deployment pipeline">
      {steps.map((s, i) => (
        <div key={s.label} className={styles.pipelineRow}>
          <div className={styles.pipelineStep}>
            <span className={styles.pipelineLabel}>{s.label}</span>
            <span className={styles.pipelineNote}>{s.note}</span>
          </div>
          {i < steps.length - 1 && (
            <span className={`material-symbols-rounded ${styles.pipelineArrow}`} aria-hidden="true">
              chevron_right
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================
   Mini catalog — every documented layer of the
   system, linked inline so the case study shows
   its own breadth.
   ============================================ */
const foundationTiles = [
  { href: "/foundations/colour-primitives", icon: "palette", label: "Primitive colours", sub: "Every raw hue — the bottom of the token stack" },
  { href: "/foundations/colour-mode", icon: "contrast", label: "Semantic colours", sub: "Primitives wrapped in intent, with light + dark" },
  { href: "/foundations/typography", icon: "text_fields", label: "Typography", sub: "One Nunito Sans scale, weight as hierarchy" },
  { href: "/foundations/spatial", icon: "straighten", label: "Spacing & radius", sub: "The spatial tokens every component shares" },
  { href: "/foundations/icons", icon: "interests", label: "Icons", sub: "Material Symbols Rounded, sized to the system" },
  { href: "/foundations/logos", icon: "verified", label: "Logos", sub: "Brand marks used across the site" },
];

function CatalogTile({ href, icon, label, sub, wide }: { href: string; icon: string; label: string; sub: string; wide?: boolean }) {
  return (
    <Link href={href} className={`${styles.catalogTile} ${wide ? styles.catalogTileWide : ""}`}>
      <span className={styles.catalogIcon}>
        <span className="material-symbols-rounded" aria-hidden="true">{icon}</span>
      </span>
      <span className={styles.catalogText}>
        <span className={styles.catalogTitle}>
          {label}
          <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
        </span>
        <span className={styles.catalogSub}>{sub}</span>
      </span>
    </Link>
  );
}

/** The mini catalog — foundations grid + the components index. */
function MiniCatalog() {
  return (
    <div className={styles.catalog} aria-label="Browse the design system">
      <div className={styles.catalogGroup}>
        <p className={styles.catalogGroupLabel}>Foundations</p>
        <div className={styles.catalogGrid}>
          {foundationTiles.map((t) => (
            <CatalogTile key={t.href} {...t} />
          ))}
        </div>
      </div>
      <div className={styles.catalogGroup}>
        <p className={styles.catalogGroupLabel}>Components</p>
        <div className={styles.catalogGrid}>
          <CatalogTile
            href="/components"
            icon="widgets"
            label={`${COMPONENT_COUNT} components`}
            sub="Every component with live examples + Storybook docs"
            wide
          />
        </div>
      </div>
    </div>
  );
}

export default function Robr0DsCaseStudy() {
  const [viewSegment, setViewSegment] = useState("week");
  return (
    <>
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          {/* Page header */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>
              Building robr0 DS — a one-person design system, end to end
            </h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Why I built a personal design system from scratch — and how six months of working with AI agents turned it from a weekend of components into a system that partly maintains itself.
          </p>

          {/* Hero image */}
          <figure className={`${styles.cover} animate-in animate-delay-2`}>
            <Image
              src="/images/heroes/robr0-ds.png"
              alt="robr0 DS — design system overview"
              width={1440}
              height={900}
              priority
              className={styles.coverImage}
            />
          </figure>

          {/* Two-column body — mirrors the embedded-ai-turbotax case study */}
          <div className={`${styles.resumeLayout} animate-in animate-delay-3`}>
            {/* Main — article body */}
            <div className={styles.resumeMain}>
              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Case study</h2>
                </div>

                <article className={styles.body}>
                  <p className={styles.lede}>
                    The site you&apos;re on runs on a design system I built end to end. Tokens, components, theming, docs, the pipeline that ships it — all mine. It started as two days of rules in February 2026. Six months later, it runs parts of its own maintenance. This is the story of the problem I set out to test, the journey the system took, and where it stands today.
                  </p>

                  <h2 id="the-problem">The problem</h2>

                  <p>
                    Plenty of great design systems exist — shadcn, Mantine, Material, Radix. Any of them would&apos;ve gotten me a portfolio site in a weekend. But that would have answered the wrong question. The question I actually wanted to test was this: <strong>can one designer, working with AI agents, carry a design system through its entire lifecycle?</strong> Not just drawing the components — the parts that normally take a team. Documenting them. Testing them. Hardening them for a public repo. Keeping the docs honest as the system grows.
                  </p>

                  <p>
                    There were personal reasons too:
                  </p>

                  <ul>
                    <li>I wanted a system that matched <em>my</em> visual voice, not a popular one.</li>
                    <li>I wanted a forcing function to build a real design-to-code pipeline, not just consume one.</li>
                    <li>As a portfolio piece, the system itself is the proof — it demonstrates how I think better than any case study about how I think could.</li>
                  </ul>

                  <p>
                    The bet was a pipeline. Design decisions live in a written spec, and from there they flow to production through a chain that runs without a handoff meeting:
                  </p>

                  <PipelineDiagram />

                  <p>
                    The foundation started in Figma — every token as a variable, every early component as a set of variants — and in those first weeks Claude Code read the file directly through MCP. As the system matured, the source of truth moved into the repo itself: design.md carries the design language now, and Claude Code generates token CSS, React components with the right TypeScript shape, and Storybook stories straight from the written spec. Figma is still where I explore bigger visual changes — but the spec is what ships. I push to GitHub. Vercel deploys both this site and the Storybook in under a minute.
                  </p>

                  <blockquote>
                    The handoff that usually sits between design and engineering is just gone. The spec is the work.
                  </blockquote>

                  <h2 id="the-journey">The journey</h2>

                  <h3 id="february-constraints-before-components">February — constraints before components</h3>

                  <p>
                    Day one wasn&apos;t a button. It was rules. The first commits established the architecture the whole system still rests on:{" "}
                    <Link href="/foundations/colour-primitives" className={styles.inlineLink}>primitives</Link>{" "}
                    at the bottom,{" "}
                    <Link href="/foundations/colour-mode" className={styles.inlineLink}>semantic tokens</Link>{" "}
                    in the middle,{" "}
                    <Link href="/components" className={styles.inlineLink}>components</Link>{" "}
                    on top — with light and dark values from the very first day, and one hard rule: <strong>no component CSS ever references a primitive directly.</strong> Everything since has been built inside those lines.
                  </p>

                  <p>
                    Primitives are the raw values — every{" "}
                    <Link href="/foundations/colour-primitives" className={styles.inlineLink}>shade of teal</Link>{" "}
                    I might ever use, every{" "}
                    <Link href="/foundations/spatial" className={styles.inlineLink}>spacing step, every radius</Link>. They were designed as variables in Figma, then coded as CSS custom properties — the layer everything else is built on:
                  </p>

                  <figure className={styles.imagePair}>
                    <div className={styles.imagePairItem}>
                      <Image
                        src="/images/figma primitive variables.png"
                        alt="Primitive variables defined in Figma"
                        width={1200}
                        height={800}
                        className={styles.pairImage}
                      />
                      <figcaption className={styles.pairCaption}>Primitives in Figma — every raw value the system can use.</figcaption>
                    </div>
                    <div className={styles.imagePairItem}>
                      <Image
                        src="/images/primitive tokens code.png"
                        alt="Primitive tokens exported as CSS variables"
                        width={1200}
                        height={800}
                        className={styles.pairImage}
                      />
                      <figcaption className={styles.pairCaption}>The same primitives in CSS — the layer the code actually reads.</figcaption>
                    </div>
                  </figure>

                  <p>
                    Semantic tokens give those primitives meaning. <code>--primitive-teal-07</code> becomes <code>--color-action-primary-bg</code>. The semantic layer is also where{" "}
                    <Link href="/foundations/colour-mode" className={styles.inlineLink}>light and dark mode</Link>{" "}
                    diverge — same component CSS, different mapping underneath:
                  </p>

                  <figure className={styles.imagePair}>
                    <div className={styles.imagePairItem}>
                      <Image
                        src="/images/figma variables.png"
                        alt="Semantic tokens defined in Figma"
                        width={1200}
                        height={800}
                        className={styles.pairImage}
                      />
                      <figcaption className={styles.pairCaption}>Semantic tokens in Figma — primitives wrapped in intent.</figcaption>
                    </div>
                    <div className={styles.imagePairItem}>
                      <Image
                        src="/images/coded semantic tokens.png"
                        alt="Semantic tokens exported as CSS variables"
                        width={1200}
                        height={800}
                        className={styles.pairImage}
                      />
                      <figcaption className={styles.pairCaption}>The same semantic layer in code, theme-aware.</figcaption>
                    </div>
                  </figure>

                  <p>
                    Those constraints paid for themselves almost immediately. Within 48 hours a separate documentation site was live — the one you&apos;re reading — importing the actual library components through a path alias, so every example on it is the real thing. Then came the sprint: on February 16th, one extraordinary day took the library from a handful of components to dozens — inputs, checkboxes, tabs, tables, badges, accordions, dropdowns — each with Storybook stories and a showcase page. What kept that day from producing a pile of parts instead of a system was the consistency passes threaded between the components: one icon scale, one spacing scale named to match Figma exactly, focus states everywhere. A week later the library took on data visualization — eight chart components, application shells, and two dashboard demos proving it could compose real product surfaces, not just isolated widgets.
                  </p>

                  <p>
                    By the end of February the library stood at 39 components. And then, for three months, that number barely moved. The plateau turned out to be the most interesting part of the story.
                  </p>

                  <h3 id="spring-the-system-writes-itself-down">Spring — the system writes itself down</h3>

                  <p>
                    What happened during the plateau wasn&apos;t rest — the project&apos;s centre of gravity shifted from building components to building <em>the system around the system</em>. In April, the first Claude skills appeared: repeatable QA work — heuristic analysis, accessibility audits, API consistency reviews — packaged as instructions an AI agent can run on demand. Shortly after, the documents that govern the build became first-class content:{" "}
                    <Link href="/blueprints/design" className={styles.inlineLink}>design.md</Link>, the full design spec, and{" "}
                    <Link href="/blueprints/claude" className={styles.inlineLink}>CLAUDE.md</Link>, the instructions that steer the agents, were both published on the site as Blueprints. The idea underneath: everything an AI needs to build this system well is a document — and documents can be shipped, shared, and reused.
                  </p>

                  <h3 id="may-from-component-site-to-portfolio">May — from component site to portfolio</h3>

                  <p>
                    Then the biggest identity shift in the project&apos;s history. The site stopped being &ldquo;robr0 DS with an about page&rdquo; and became my portfolio, with the design system as its flagship exhibit. A mega navigation, breadcrumbs, a contact page — and six case studies in one sustained push, including the one you&apos;re reading now. The system had become good enough at building pages that the bottleneck was no longer building. It was having something to say.
                  </p>

                  <h3 id="june-reaching-outward">June — reaching outward</h3>

                  <p>
                    Early summer was about the world outside the repo: a technical SEO pass, structured data, the move to a proper domain. The analytics setup was repaired and gained a pull script for on-demand reporting — a small utility that would quietly become the foundation of something bigger a few weeks later. A Writing section began auto-syncing my articles from Substack, and a run of polish closed long-standing irritations, including a theme-toggle flicker bug that had survived two previous fixes.
                  </p>

                  <h3 id="july-the-system-starts-to-maintain-itself">July — the system starts to maintain itself</h3>

                  <p>
                    This is where the original bet paid off. In the span of three weeks:
                  </p>

                  <ul>
                    <li><strong>The first loop went live.</strong> A skill that runs every week on a schedule: it reads the site&apos;s analytics, forms one falsifiable hypothesis about the words on a page, implements the change on a branch, and writes me a report for approval. That analytics pull script from June was exactly the foundation it needed.</li>
                    <li><strong>Numbers stopped being able to lie.</strong> Every count displayed on this site — components, skills, journal entries — now derives from a registry file checked by a build-time validator. The component count on this page comes from one; it can never silently go stale.</li>
                    <li><strong>A security scrub</strong> audited the public repo the way an outside attacker would read it, and the hardening it produced now travels with every deploy.</li>
                    <li><strong>A gap analysis against mature design systems</strong> ranked what the library was still missing, and the highest-impact components shipped — which, together with a batch of content components, took the library from 41 to 51 in a single month.</li>
                    <li><strong>A real quality gate arrived.</strong> CI now runs lint, three builds, and every Storybook story as a render test in headless Chromium — 434 stories at the time it shipped — plus a drift guard that fails the build if generated docs fall out of sync with the code.</li>
                  </ul>

                  <p>
                    The through-line of the journey: in February, AI helped me build the system. By July, the system was running parts of its own maintenance — and reporting back to me.
                  </p>

                  <h2 id="where-it-is-now">Where it is now</h2>

                  <p>
                    <Link href="/components" className={styles.inlineLink}>{COMPONENT_COUNT} React components</Link>, full Storybook docs,{" "}
                    <Link href="/foundations/typography" className={styles.inlineLink}>a single type scale</Link>,{" "}
                    <Link href="/foundations/colour-mode" className={styles.inlineLink}>light and dark themes</Link>, a CI quality gate, a weekly growth loop — and the entire site you&apos;re reading right now. Here&apos;s a live slice: every element below is a real component from the system, and the charts show the system&apos;s real history, measured from git:
                  </p>

                  <div className={styles.liveDemo} aria-label="Live components from robr0 DS">
                    {/* Controls */}
                    <div className={styles.demoRow}>
                      <Button label="Primary" priority="primary" size="compact" />
                      <Button label="Secondary" priority="secondary" size="compact" />
                      <Button label="Tertiary" priority="tertiary" size="compact" />
                    </div>
                    <div className={styles.demoRow}>
                      <Badge variant="info" label="Info" />
                      <Badge variant="positive" label="Positive" />
                      <Badge variant="warning" label="Warning" />
                      <Badge variant="error" label="Error" />
                      <Badge variant="neutral" label="Neutral" />
                    </div>
                    <div className={styles.demoRow}>
                      <SegmentedControl
                        segments={[
                          { label: "Day", value: "day" },
                          { label: "Week", value: "week" },
                          { label: "Month", value: "month" },
                        ]}
                        activeSegment={viewSegment}
                        onSegmentChange={setViewSegment}
                      />
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <ProgressBar value={75} showLabel />
                      </div>
                    </div>

                    {/* Charts */}
                    <LineChart
                      data={systemGrowth}
                      xKey="month"
                      series={[
                        { dataKey: "components", label: "Components", color: "#118AB2" },
                        { dataKey: "tokens", label: "Tokens", color: "#06D6A0" },
                      ]}
                      title="System growth"
                      subtitle="Registered components and semantic tokens at each month-end, Feb – Jul 2026 — the spring plateau is when the system around the system was built"
                      summaryItems={[
                        { label: "Components", value: COMPONENT_COUNT },
                        { label: "Semantic tokens", value: TOKEN_COUNT },
                      ]}
                      height={240}
                    />

                    <BarChart
                      data={tokensByCategory}
                      title="Tokens by category"
                      subtitle={`What ${TOKEN_COUNT} semantic tokens cover`}
                      dataLabel="Tokens"
                      summaryItems={[{ label: "Total", value: TOKEN_COUNT }]}
                      height={220}
                    />

                    <Alert
                      variant="positive"
                      title="It&rsquo;s the same system the rest of this page uses."
                      description="Every component above &mdash; buttons, badges, segmented control, progress bar, charts &mdash; is a real React component from robr0 DS, rendered from the same token layer."
                    />
                  </div>

                  <h2 id="browse-the-system">Browse the system</h2>

                  <p>
                    Every layer described above has its own documented page. This is the map — each tile is the real reference I work from, the same one any visitor can read:
                  </p>

                  <MiniCatalog />

                  <p>
                    And the story keeps writing itself — literally. The{" "}
                    <Link href="/project-journal" className={styles.inlineLink}>project journal</Link>{" "}
                    is a build-progression timeline of everything described above, kept current by one of the system&apos;s own scheduled loops: every two weeks it reads the git history since its last visit and consolidates it into stories.
                  </p>

                  <h2 id="what-changed-in-my-practice">What changed in my practice</h2>

                  <p>
                    The most interesting outcome wasn&apos;t the system itself — it was how building this way rewired how I work:
                  </p>

                  <ul>
                    <li><strong>The spec is the work.</strong> The time that used to go into pushing pixels now goes into writing clear specs that an AI agent can execute. The thinking is the deliverable.</li>
                    <li><strong>Speed compresses iteration.</strong> I can try three layout directions in an afternoon and keep the best one. Earlier in my career that was a week.</li>
                    <li><strong>Designer-to-dev handoff is gone.</strong> The design language lives in one written spec, in version control, next to the code it governs. When the design changes, the spec changes — and the code follows in the same gesture.</li>
                    <li><strong>The system reports to me now.</strong> Loops run the routine maintenance — analytics reviews, journal updates — and hand me a branch and a report. My judgment moved from doing the work to approving it.</li>
                  </ul>

                  <p>
                    None of this replaces design judgment. It moves where judgment is applied — earlier, at the spec level, before code or visuals exist.
                  </p>

                  <h2 id="the-artifacts-im-leaving-open">The artifacts I&apos;m leaving open</h2>

                  <p>
                    The whole system is on GitHub. Five artifacts make the approach reusable on any project you start tomorrow:
                  </p>

                  <ul>
                    <li>
                      <a href="https://www.npmjs.com/package/@robr0/design-system" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>The npm package</a> — <code>@robr0/design-system</code>, published with provenance; this site installs it like any other consumer. <Link href="/docs/get-started" className={styles.inlineLink}>Get started</Link> covers install and theming.
                    </li>
                    <li>
                      <Link href="/playground" className={styles.inlineLink}>The playground</Link> — re-theme the whole system live and copy the CSS it generates straight into your own project.
                    </li>
                    <li>
                      <Link href="/blueprints/claude" className={styles.inlineLink}>Claude MD</Link> — the codebase context any AI agent can read to understand the project.
                    </li>
                    <li>
                      <Link href="/blueprints/design" className={styles.inlineLink}>Design MD</Link> — the design language compressed into a single markdown reference.
                    </li>
                    <li>
                      <Link href="/skills" className={styles.inlineLink}>Skills</Link> — small Claude Code skill files for the repetitive work (scaffolding components, auditing tokens, running pre-deploy checks, accessibility reviews).
                    </li>
                  </ul>

                  <p>
                    The last three are plain markdown files. Download one, drop it into your project, point Claude at it. The pipeline isn&apos;t magic — it&apos;s a stack of small written agreements an AI can act on.
                  </p>

                  <h2 id="whats-next">What&apos;s next</h2>

                  <p>
                    The hardening July started has landed: the accessibility checks are now build-blocking (an axe violation fails CI, with the colour-contrast criteria deliberately deferred while the action colour is redesigned), and Chromatic visual regression snapshots every story in both themes against an accepted baseline — run on demand, a budget choice rather than an unfinished state. What&apos;s left is autonomy: more <Link href="/loops" className={styles.inlineLink}>loops</Link> that don&apos;t wait to be asked — the weekly copy experiments and the biweekly journal are the first two, not the last. The experiment continues, and so far the answer to the original question is yes: one designer really can run the whole lifecycle — as long as the system helps.
                  </p>
                </article>
              </section>
            </div>

            {/* Right rail — tools + links */}
            <aside className={styles.resumeSidebar} aria-label="Case study resources">
              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Details</h2>
                </div>
                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Company</span>
                    <span className={styles.detailValue} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Image src="/logos/rr.svg" alt="" width={20} height={20} style={{ objectFit: "contain", flexShrink: 0 }} />
                      <span>Personal site</span>
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Year</span>
                    <span className={styles.detailValue}>2026</span>
                  </div>
                </div>
              </section>

              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Tools</h2>
                </div>
                <div className={styles.toolList}>
                  <div className={styles.toolItem}>
                    <Image src="/logos/Figma.svg" alt="Figma" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Figma</span>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/Claude.svg" alt="Claude" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Claude Code</span>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/cursor.svg" alt="Cursor" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Cursor</span>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/storybook.svg" alt="Storybook" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Storybook</span>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/React.svg" alt="React" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>React</span>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/material.svg" alt="Material Symbols" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Material Symbols</span>
                  </div>
                </div>
              </section>

              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Links</h2>
                </div>
                <div className={styles.linkList}>
                  <a
                    href="https://github.com/robritacca-dotcom/design-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <Image src="/logos/Git.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>GitHub repo</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>The whole system, public</span>
                    </div>
                  </a>

                  <a
                    href="https://design-system-iota-one.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <Image src="/logos/storybook.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>Storybook</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>Every component, every variant</span>
                    </div>
                  </a>

                  <a
                    href="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=113-7533"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <Image src="/logos/Figma.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>Figma file</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>Where the foundation was designed</span>
                    </div>
                  </a>

                  <Link href="/docs" className={styles.linkItem}>
                    <Image src="/logos/rr.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>robr0 DS docs</span>
                        <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
                      </div>
                      <span className={styles.linkSub}>System overview + artifacts</span>
                    </div>
                  </Link>
                  <a
                    href="https://robertritacca1.substack.com/p/design-still-derisks-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <Image src="/logos/substack.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        Design still derisks dev
                      </div>
                      <span className={styles.linkSub}>Article on Substack</span>
                    </div>
                  </a>
                </div>
              </section>
            </aside>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
