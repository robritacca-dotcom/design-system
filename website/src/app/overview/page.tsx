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
          "Where the system's foundation was designed: the token architecture, the colour ramps, the component vocabulary. Today it's the sketchpad for visual exploration; the source of truth has moved into the repo.",
        bullets: [
          "Designed the token architecture as variables: the colour ramps + spatial tokens (gap, padding, radius, border)",
          "Designed the original components with variants and light/dark semantic mappings",
          <>
            Still where bigger visual changes get explored before they land in{" "}
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
            Builds production React from the written specs that live in the repo:{" "}
            <Link href="/blueprints/design" className={styles.inlineLink}>design.md</Link> for the design language,{" "}
            <Link href="/blueprints/claude" className={styles.inlineLink}>CLAUDE.md</Link> for the rules, and{" "}
            <Link href="/blueprints/content-design" className={styles.inlineLink}>content-design.md</Link> for how every word reads.
          </>
        ),
        bullets: [
          "Maintains the layered CSS token architecture (primitives → semantics → components)",
          "Generates React components with TypeScript and token-based CSS from the spec",
          "Builds Storybook documentation automatically for every component",
          "Maintains the system as well as building it: skills audit token usage, prose, and accessibility on demand, and recurring loops run copy experiments and keep the project journal current",
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
            Interactive component library at{" "}
            <a href="https://design-system-iota-one.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>design-system-iota-one.vercel.app</a>{" "}
            showing every piece of robr0 DS.
          </>
        ),
        bullets: [
          "Component playground with live controls for all props and states",
          "The props tables are generated from the component source itself: each prop is described once, next to the code, and a build check fails if any description is missing, so the docs cannot drift from what ships",
          "Token docs (colors, spacing, typography), icon gallery, logo library",
          "Auto-deploys on every code push",
        ],
      },
    ],
  },
  {
    name: "GitHub",
    logo: pipelineLogo("/logos/Git.svg", "GitHub"),
    roles: [
      {
        title: "Version control",
        description:
          "Public repository storing the entire codebase with full commit history.",
        bullets: [
          <>
            npm-workspace monorepo: the library publishes as{" "}
            <code>@robr0/design-system</code>, and this site installs that same
            package, so every page dogfoods the exact import surface a consumer gets
          </>,
          "Triggers Vercel deployment on every push to main",
          <>
            Portfolio visibility at{" "}
            <a href="https://github.com/robritacca-dotcom/design-system" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>github.com/robritacca-dotcom/design-system</a>
          </>,
        ],
      },
      {
        title: "Package publishing",
        description: (
          <>
            A manual release workflow ships the library to npm as{" "}
            <code>@robr0/design-system</code>. See{" "}
            <Link href="/docs/get-started" className={styles.inlineLink}>how to install and customise it</Link>.
          </>
        ),
        bullets: [
          "Builds the distributable package: per-module JS + type declarations, token CSS, and the icon font",
          "Before anything reaches the registry, the tarball is installed into a scratch Vite app and built: a real consumer smoke test",
          "Publishes through a trust link between GitHub and npm, so there is no stored password or token to leak; every release carries provenance, a verifiable record of which code produced it. Dry-run by default",
        ],
      },
      {
        title: "Continuous integration",
        description:
          "Every push and PR runs an automated quality gate before anything is trusted.",
        bullets: [
          "Lints the codebase and builds the library, Storybook, and the website on every change",
          "Renders every Storybook story in headless Chrome and runs an axe accessibility audit on each: a render error or an accessibility violation fails the build (one contrast rule is deliberately excluded by a settled token decision), so a regression is caught on the story that introduced it",
          "Chromatic visual regression, run on demand: every story snapshotted in light and dark against an accepted baseline, so a token change that shifts pixels anywhere in the system is caught before it ships",
          "Drift guard fails the build the moment any registry-backed content goes stale: every countable collection on the site has a registry behind it and a check that holds the two together, so the numbers in the rail beside this pipeline come straight from those registries, never typed by hand",
          "The same checklist runs locally as a single command, so any CI failure is reproducible at the desk; CI adds one check of its own, that regenerated content was actually committed",
        ],
      },
    ],
  },
  {
    name: "Vercel",
    logo: vercelLogo,
    roles: [
      {
        title: "Auto-deployment",
        description:
          "Watches GitHub and deploys both sites automatically on every push.",
        bullets: [
          <>
            Builds and deploys Storybook →{" "}
            <a href="https://design-system-iota-one.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>design-system-iota-one.vercel.app</a>
          </>,
          <>
            Builds and deploys website →{" "}
            <a href="https://robr0-ds.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>robr0-ds.vercel.app</a>
          </>,
          "Live in under 60 seconds with SSL and global CDN",
        ],
      },
      {
        title: "Domain & delivery",
        description:
          "How the site actually reaches you: the domain, the fonts, the icons, and the measurement.",
        bullets: [
          <>
            <code>robertritacca.com</code> is registered at GoDaddy, whose DNS points
            at the Vercel deployment
          </>,
          "Nunito Sans is self-hosted: next/font fetches it from Google Fonts at build time and serves it from this domain, with no runtime Google request",
          "Material Symbols icons ship as a self-hosted woff2 inside the npm package itself; on this site, the playground's typeface picker is the one place fonts load from Google at runtime",
          "Google Analytics (GA4) measures traffic via the standard gtag snippet in the root layout",
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
            The chat behind the floating button in the corner of the site. It
            answers from the published site through Claude Sonnet; the same
            widget runs in{" "}
            <Link href="/playground?view=chat" className={styles.inlineLink}>
              the playground&rsquo;s Chat view
            </Link>
            , where it can be resized and re-themed.
          </>
        ),
        bullets: [
          "The model's context is generated at build time from the site itself: page prose, data registries, root specs, and the essays. A new page reaches the chat on the next build",
          "Only published, self-authored content can enter the context; a validator fails the build on anything else. Facts about Rob come only from the site, while general design knowledge is answered freely and kept visibly separate",
          "Composed from the system's own ai components and mounted once in the root layout, so an answer keeps streaming between pages",
        ],
      },
      {
        title: "Guardrails and evals",
        description:
          "Answer quality and spend are held by build gates and measurements.",
        bullets: [
          "A golden set of questions runs through the real chat route; a coverage validator fails the build the moment the context loses a fact the eval depends on",
          "Layered spend protection: per-visitor rate limits, a daily budget breaker that degrades instead of going dark, and a hard cap behind everything",
          <>
            Conversations are kept for 30 days, tied to no name or address, then
            deleted. The{" "}
            <Link href="/playground?view=chat" className={styles.inlineLink}>
              playground&rsquo;s Chat view
            </Link>{" "}
            doubles as the QA surface, with a simulated transport that exercises
            the streaming without calling the model
          </>,
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
              <a href="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=246-5864" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Figma</a>. The system itself lives in{" "}
              <a href="https://github.com/robritacca-dotcom/design-system" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>the repo</a>: a{" "}
              <Link href="/blueprints/design" className={styles.inlineLink}>written spec</Link>, tokens as layered CSS, components in React. Claude Code builds from the spec, so a design change reaches production in under a minute. None of it is theoretical: the buttons, the colours, the type, and the layout are all running on the same system this page describes. It ships as the npm package <code>@robr0/design-system</code>, and this site installs that package like any other consumer would. You can{" "}
              <Link href="/docs/get-started" className={styles.inlineLink}>install it yourself</Link> and{" "}
              <Link href="/playground" className={styles.inlineLink}>re-theme it live</Link>.
            </p>
            <p className={styles.introBody}>
              I&apos;m putting all of it on display because I think the system is the work. The pipeline below shows how the pieces fit. The rail beside it lists the key numbers and links. And if you want to lift any of it for your own project, everything is open:{" "}
              <Link href="/blueprints/claude" className={styles.inlineLink}>CLAUDE.md</Link>,{" "}
              <Link href="/blueprints/design" className={styles.inlineLink}>design.md</Link>,{" "}
              <Link href="/blueprints/content-design" className={styles.inlineLink}>content-design.md</Link>, the{" "}
              <Link href="/skills" className={styles.inlineLink}>skills</Link>, and the{" "}
              <Link href="/loops" className={styles.inlineLink}>loops</Link> are ready to drop into your own codebase or AI tooling.
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
