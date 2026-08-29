"use client";

import Image from "next/image";
import Link from "next/link";
import { Timeline, type TimelineCompany } from "@robr0/design-system/components/Timeline/Timeline";
import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getSidebarLinks, docsSidebarLinks } from "@/config/navigation";
import { COMPONENT_COUNT } from "@robr0/design-system/components/registry";
import { TOKEN_COUNT, TOKEN_COUNTS } from "@robr0/design-system/tokens/registry";
import { SKILL_COUNT } from "@/data/skills-registry";
import { SITE_UPDATE_COUNT } from "@/data/site-updates";
import styles from "./page.module.css";

const TOKEN_CATEGORY_COUNT = Object.keys(TOKEN_COUNTS).length;

const { sidebarLinks } = getSidebarLinks(docsSidebarLinks, "/overview");

const pipelineLogo = (src: string, alt: string) => (
  <Image src={src} alt={alt} width={32} height={32} />
);

// Same geometry as public/vercel.svg, but filled with a content token so the
// mark stays visible when the theme flips (the file hardcodes #fff).
const vercelLogo = (
  <svg width="32" height="32" viewBox="0 0 1155 1000" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vercel">
    <path d="m577.3 0 577.4 1000H0z" fill="var(--color-text-primary)" />
  </svg>
);

const PIPELINE: TimelineCompany[] = [
  {
    name: "Figma",
    logo: pipelineLogo("/logos/Figma.svg", "Figma"),
    roles: [
      {
        title: "Design foundation",
        description:
          "Where the foundation was designed: the token architecture, the colour ramps, the component vocabulary. The source of truth has since moved into the repo.",
        bullets: [
          "Tokens designed as variables: the colour ramps plus the spatial scale (gap, padding, radius, border)",
          <>
            Still the sketchpad where bigger visual changes get explored before
            they land in{" "}
            <Link href="/blueprints/design" className={styles.inlineLink}>the written spec</Link>
          </>,
        ],
      },
    ],
  },
  {
    name: "Claude Code",
    logo: pipelineLogo("/logos/Claude.svg", "Claude"),
    roles: [
      {
        title: "AI component generator",
        description: (
          <>
            Builds production React from the written specs in the repo:{" "}
            <Link href="/blueprints/design" className={styles.inlineLink}>design.md</Link> for the design language,{" "}
            <Link href="/blueprints/claude" className={styles.inlineLink}>CLAUDE.md</Link> for the rules, and{" "}
            <Link href="/blueprints/content-design" className={styles.inlineLink}>content-design.md</Link> for how every word reads.
          </>
        ),
        bullets: [
          "Generates the components, the layered token CSS, and the Storybook docs from the spec",
          "Maintains the system too: skills audit token usage, prose, and accessibility on demand, and recurring loops keep the project journal current",
        ],
      },
    ],
  },
  {
    name: "Storybook",
    logo: pipelineLogo("/logos/storybook.svg", "Storybook"),
    roles: [
      {
        title: "Live documentation site",
        description: (
          <>
            Every component, variant, and token, live at{" "}
            <a href="https://design-system-iota-one.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>design-system-iota-one.vercel.app</a>.
          </>
        ),
        bullets: [
          "A playground with live controls for every prop and state",
          "Props tables generate from the component source itself, and a build check fails on any missing description, so the docs cannot drift from what ships",
        ],
      },
    ],
  },
  {
    name: "GitHub",
    logo: pipelineLogo("/logos/Git.svg", "GitHub"),
    roles: [
      {
        title: "Source, releases, and CI",
        description: (
          <>
            <a href="https://github.com/robritacca-dotcom/design-system" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>A public monorepo</a>
            : the library publishes to npm as <code>@robr0/design-system</code>,
            and this site installs that same package, so every page dogfoods the
            exact import surface a consumer gets.
          </>
        ),
        bullets: [
          "Releases smoke-test the tarball in a scratch Vite app, then publish with provenance through a trust link between GitHub and npm: no stored token to leak",
          "CI renders every Storybook story in headless Chrome with an axe accessibility audit on each, so a render error or a violation fails the build; one contrast rule is deliberately excluded by a settled token decision",
          "A drift guard fails the build the moment registry-backed content goes stale: the numbers in the rail beside this pipeline come from those registries, never typed by hand",
        ],
      },
    ],
  },
  {
    name: "Vercel",
    logo: vercelLogo,
    roles: [
      {
        title: "Deployment and delivery",
        description:
          "Watches GitHub and deploys the website and Storybook on every push to main, live in under a minute.",
        bullets: [
          <>
            <code>robertritacca.com</code> is registered at GoDaddy, whose DNS
            points at the Vercel deployment
          </>,
          "Nunito Sans is self-hosted via next/font, and Material Symbols ships inside the npm package; the playground's typeface picker is the one place fonts load from Google at runtime",
          "Google Analytics (GA4) measures traffic via the gtag snippet in the root layout",
        ],
      },
    ],
  },
  {
    name: "robr0 GPT",
    logo: pipelineLogo("/rr.svg", "robr0 GPT"),
    roles: [
      {
        title: "Site-aware chat",
        description: (
          <>
            The chat behind the floating button, built from the system&rsquo;s
            own ai components. It answers from the published site through
            Claude Sonnet; the same widget runs in{" "}
            <Link href="/playground?view=chat" className={styles.inlineLink}>
              the playground&rsquo;s Chat view
            </Link>
            .
          </>
        ),
        bullets: [
          "Its context is generated at build time from the site itself: page prose, data registries, root specs, and the essays. Only published, self-authored content can enter, and a validator fails the build on anything else",
          "A golden-set eval runs through the real route, and spend is held by per-visitor rate limits and a daily budget breaker",
          "Conversations are kept for 30 days, tied to no name or address, then deleted",
        ],
      },
      {
        title: "MCP endpoint",
        description: (
          <>
            The same public data, served to agents: <code>/api/mcp</code> is a
            Model Context Protocol server, and any MCP client connects with
            just the URL. No key, no account, no model behind it.
          </>
        ),
        bullets: [
          "Five tools: the component list, per-component prop APIs, the token registry, install setup, and search over the site's published content",
          "The prop data is generated from the same JSDoc that ships in the package's type declarations, so a coding agent reads the exact contract npm ships",
        ],
      },
    ],
  },
];

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
              robr0 DS is the system I built, by myself, to make every page you see here. The foundation was designed in{" "}
              <a href="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=246-5864" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Figma</a>; the system itself lives in{" "}
              <a href="https://github.com/robritacca-dotcom/design-system" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>the repo</a> as a{" "}
              <Link href="/blueprints/design" className={styles.inlineLink}>written spec</Link>, layered CSS tokens, and React components, and Claude Code builds from the spec, so a design change reaches production in under a minute. It ships as the npm package <code>@robr0/design-system</code>, and this site installs that package like any other consumer would. You can{" "}
              <Link href="/docs/get-started" className={styles.inlineLink}>install it yourself</Link> and{" "}
              <Link href="/playground" className={styles.inlineLink}>re-theme it live</Link>.
            </p>
            <p className={styles.introBody}>
              I&apos;m putting all of it on display because I think the system is the work: the pipeline below shows how the pieces fit, and everything is open to lift.{" "}
              <Link href="/blueprints/claude" className={styles.inlineLink}>CLAUDE.md</Link>,{" "}
              <Link href="/blueprints/design" className={styles.inlineLink}>design.md</Link>,{" "}
              <Link href="/blueprints/content-design" className={styles.inlineLink}>content-design.md</Link>, the{" "}
              <Link href="/skills" className={styles.inlineLink}>skills</Link>, and the{" "}
              <Link href="/loops" className={styles.inlineLink}>loops</Link> drop into your own codebase or AI tooling. Agents get the same access: the site serves a Model Context Protocol endpoint at <code>/api/mcp</code>, so a coding agent connects with one URL and reads the component list, exact prop contracts, and the token registry while it builds with the package, instead of guessing at props.
            </p>
          </div>

          {/* Pipeline + Tools two-column layout */}
          <div className={styles.resumeLayout}>
            {/* Pipeline Column (Left — 2/3 width) */}
            <div className={styles.resumeMain}>
              <div className={`${styles.resumeSection} animate-in animate-delay-2`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Pipeline</h2>
                </div>

                <Timeline variant="company" items={PIPELINE} />
              </div>
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
