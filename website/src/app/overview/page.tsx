"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ArchitectureMap } from "@/components/ArchitectureMap/ArchitectureMap";
import { getSidebarLinks, docsSidebarLinks } from "@/config/navigation";
import { COMPONENT_COUNT } from "@robr0/design-system/components/registry";
import { TOKEN_COUNT, TOKEN_COUNTS } from "@robr0/design-system/tokens/registry";
import { SKILL_COUNT } from "@/data/skills-registry";
import { SITE_UPDATE_COUNT } from "@/data/site-updates";
import { operatorsMap, pipelineMap, runtimeMap, systemOverviewMap } from "./maps";
import styles from "./page.module.css";

const TOKEN_CATEGORY_COUNT = Object.keys(TOKEN_COUNTS).length;

const { sidebarLinks } = getSidebarLinks(docsSidebarLinks, "/overview");

export default function AboutDsPage() {
  return (
    <>

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Overview of robr0 DS</h1>
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              An AI-ready design system, built to make this site
            </p>
            <p className={styles.introBody}>
              robr0 DS is the design system behind every page on this site: a solo build, run as a working experiment in how far a written spec and an AI pair can carry a production system. The foundation was designed in{" "}
              <a href="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=246-5864" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Figma</a>; the system lives in{" "}
              <a href="https://github.com/robritacca-dotcom/design-system" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>the repo</a> as a{" "}
              <Link href="/blueprints/design" className={styles.inlineLink}>written spec</Link>, layered CSS tokens, and React components, and Claude Code builds from the spec, so a design change reaches production in under a minute. It ships as the npm package <code>@robr0/design-system</code>, and this site installs that package like any other consumer would. You can{" "}
              <Link href="/docs/get-started" className={styles.inlineLink}>install it yourself</Link> and{" "}
              <Link href="/playground" className={styles.inlineLink}>re-theme it live</Link>.
            </p>
            <p className={styles.introBody}>
              Everything is on display because the system is the work: the maps below show how the pieces fit, and all of it is open to lift.{" "}
              <Link href="/blueprints/claude" className={styles.inlineLink}>CLAUDE.md</Link>,{" "}
              <Link href="/blueprints/design" className={styles.inlineLink}>design.md</Link>,{" "}
              <Link href="/blueprints/content-design" className={styles.inlineLink}>content-design.md</Link>, the{" "}
              <Link href="/skills" className={styles.inlineLink}>skills</Link>, and the{" "}
              <Link href="/loops" className={styles.inlineLink}>loops</Link> drop into your own codebase or AI tooling. Agents get the same access: the site serves a Model Context Protocol endpoint at <code>/api/mcp</code>, so a coding agent connects with one URL and reads the component list, exact prop contracts, and the token registry while it builds with the package, instead of guessing at props.
            </p>
          </div>

          {/* Maps + rail two-column layout */}
          <div className={styles.resumeLayout}>
            {/* Maps column (left) */}
            <div className={styles.resumeMain}>

              <section className={`${styles.mapSection} animate-in animate-delay-2`}>
                <SectionTitle title="The system in one breath" />
                <p className={styles.sectionBody}>
                  The short version: one repo becomes one website, one
                  Storybook, and one npm package, and nothing ships
                  unchecked. The maps are for anyone who wants the wiring;
                  each one pans, zooms, and expands to fill the screen.
                </p>
                <ul className={styles.logoStrip} aria-label="The tools involved">
                  {[
                    { name: "Figma", logo: "/logos/Figma.svg" },
                    { name: "Claude Code", logo: "/logos/Claude.svg" },
                    { name: "GitHub", logo: "/logos/Git.svg" },
                    { name: "Storybook", logo: "/logos/storybook.svg" },
                    { name: "Vite", logo: "/logos/vite.svg" },
                    { name: "Next.js", logo: "/logos/nextjs black.svg", logoDark: "/logos/nextjs white.svg" },
                    { name: "Vercel", logo: "/logos/vercel black.svg", logoDark: "/logos/vercel white.svg" },
                    { name: "npm", logo: "/logos/npm.svg" },
                    { name: "Google", logo: "/logos/google.svg" },
                  ].map((tool) => (
                    <li key={tool.name} className={styles.logoChip}>
                      <Image
                        src={tool.logo}
                        alt=""
                        width={20}
                        height={20}
                        className={tool.logoDark ? styles.logoLight : undefined}
                      />
                      {tool.logoDark ? (
                        <Image src={tool.logoDark} alt="" width={20} height={20} className={styles.logoDark} />
                      ) : null}
                      <span>{tool.name}</span>
                    </li>
                  ))}
                </ul>
                <ul className={styles.sectionBullets}>
                  <li>One repo holds everything: components, tokens, data registries, and the written specs.</li>
                  <li>Generators derive every surface from one source of truth; validators fail the build on drift.</li>
                  <li>CI gates every push, and a green push to main is live in under a minute.</li>
                  <li>Two destinations: the site on Vercel, the package on npm.</li>
                </ul>
                <ArchitectureMap
                  map={systemOverviewMap}
                  caption="One repo, one gate, two destinations. The other three maps magnify the lanes."
                />
              </section>

              <section className={`${styles.mapSection} animate-in animate-delay-3`}>
                <SectionTitle title="The pipeline" />
                <p className={styles.sectionBody}>
                  How a change becomes live, in five stages: author, generate
                  and validate, build, gate, ship. Figma and Substack feed the
                  authoring stage from outside, Google is touched exactly once
                  at build time (the typeface is fetched, then self-hosted),
                  and a push to main deploys to Vercel with{" "}
                  <code>robertritacca.com</code> pointed at it from GoDaddy.
                  The package takes its own lane: a manual release publishes
                  to npm with provenance, no stored token. The map carries the
                  detail: the drift guard, the hydration smoke, the axe audit
                  on every story.
                </p>
                <ArchitectureMap
                  map={pipelineMap}
                  caption="Five stages, then the flow snakes down through the gate. The teal edge is the one Google touch before runtime."
                />
              </section>

              <section className={`${styles.mapSection} animate-in animate-delay-3`}>
                <SectionTitle title="The operator layer" />
                <p className={styles.sectionBody}>
                  Claude Code drives the pipeline through{" "}
                  <Link href="/skills" className={styles.inlineLink}>skills</Link>{" "}
                  named for their end state. The spine is four states a change
                  can be in; checkpoint, park, land, and ship are the
                  transitions between them, and the audit skills above the
                  spine can read and fix but never deploy. The only two paths
                  to production are ship and super-ship, which runs a full
                  drift audit first.
                </p>
                <ArchitectureMap
                  map={operatorsMap}
                  caption="States, not steps: the spine has no arrows of its own because the skills are the transitions."
                />
              </section>

              <section className={`${styles.mapSection} animate-in animate-delay-3`}>
                <SectionTitle title="The architecture at runtime" />
                <p className={styles.sectionBody}>
                  Once the site is live, only the edges matter. Pages come
                  from Vercel with the fonts and the chat corpus already baked
                  in, analytics events go from the browser straight to Google
                  and never touch Vercel, and a scheduled smoke re-proves
                  production every four hours.
                </p>
                <ul className={styles.sectionBullets}>
                  <li>
                    The chat answers from the published site through Claude,
                    held by per-visitor rate limits and a daily budget;
                    conversations are kept for 30 days, tied to no name, then
                    deleted. The same widget runs in{" "}
                    <Link href="/playground?view=chat" className={styles.inlineLink}>
                      the playground&apos;s Chat view
                    </Link>
                    .
                  </li>
                  <li>
                    <code>/api/mcp</code> serves agents five tools with no
                    key, no account, and no model behind them: the component
                    list, per-component prop APIs, the token registry, install
                    setup, and site search.
                  </li>
                  <li>
                    Two pages fetch type from Google at runtime: the
                    playground&apos;s typeface picker and the MCP
                    endpoint&apos;s landing page.
                  </li>
                </ul>
                <ArchitectureMap
                  map={runtimeMap}
                  caption="A space diagram, no time in it. The teal edge is the one the vendor-grouped version filed wrong."
                />
              </section>

            </div>

            {/* Stats + Links Rail (Right — 1/3 width) */}
            <aside className={styles.resumeSidebar}>
              <div className={`${styles.resumeSection} animate-in animate-delay-2`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>By the numbers</h2>
                </div>

                <div className={styles.statList}>
                  <Link href="/components" className={styles.statItem}>
                    <span className={styles.statValue}>{COMPONENT_COUNT}</span>
                    <span className={styles.statTitle}>React components</span>
                    <span className={styles.statLabel}>Each with docs and stories</span>
                  </Link>
                  <Link href="/foundations" className={styles.statItem}>
                    <span className={styles.statValue}>{TOKEN_COUNT}</span>
                    <span className={styles.statTitle}>Semantic tokens</span>
                    <span className={styles.statLabel}>{TOKEN_CATEGORY_COUNT} categories, light and dark</span>
                  </Link>
                  <Link href="/skills" className={styles.statItem}>
                    <span className={styles.statValue}>{SKILL_COUNT}</span>
                    <span className={styles.statTitle}>Claude Code skills</span>
                    <span className={styles.statLabel}>Building and auditing the system</span>
                  </Link>
                  <Link href="/project-journal" className={styles.statItem}>
                    <span className={styles.statValue}>{SITE_UPDATE_COUNT}</span>
                    <span className={styles.statTitle}>Journal entries</span>
                    <span className={styles.statLabel}>The build, tracked in public</span>
                  </Link>
                </div>
              </div>

              <div className={`${styles.resumeSection} animate-in animate-delay-3`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Links</h2>
                </div>

                <a
                  href="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=246-5864"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.toolItem}
                >
                  <Image src="/logos/Figma.svg" alt="" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>Figma</span>
                    <span className={styles.toolDesc}>Where the foundation was designed</span>
                  </div>
                  <span className={`material-symbols-rounded ${styles.toolLinkIcon}`} aria-hidden="true">open_in_new</span>
                </a>

                <a
                  href="https://design-system-iota-one.vercel.app/?path=/docs/robr0-ds--docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.toolItem}
                >
                  <Image src="/logos/storybook.svg" alt="" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>Storybook</span>
                    <span className={styles.toolDesc}>Every component, every variant</span>
                  </div>
                  <span className={`material-symbols-rounded ${styles.toolLinkIcon}`} aria-hidden="true">open_in_new</span>
                </a>

                <a
                  href="https://github.com/robritacca-dotcom/design-system"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.toolItem}
                >
                  <Image src="/logos/Git.svg" alt="" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>GitHub</span>
                    <span className={styles.toolDesc}>The whole system, public</span>
                  </div>
                  <span className={`material-symbols-rounded ${styles.toolLinkIcon}`} aria-hidden="true">open_in_new</span>
                </a>
              </div>
            </aside>
          </div>

        </main>
      </div>

    </>
  );
}
