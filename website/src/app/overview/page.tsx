"use client";

import Image from "next/image";
import Link from "next/link";
import { Timeline, type TimelineCompany } from "@design-system/components/Timeline/Timeline";
import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import { getSidebarLinks, docsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(docsSidebarLinks, "/overview");

const pipelineLogo = (src: string, alt: string) => (
  <Image src={src} alt={alt} width={32} height={32} />
);

const PIPELINE: TimelineCompany[] = [
  {
    name: "Figma",
    logo: pipelineLogo("/logos/Figma.svg", "Figma"),
    roles: [
      {
        title: "Design foundation",
        description:
          "Where the system's foundation was designed — the token architecture, the colour ramps, the component vocabulary. Today it's the sketchpad for visual exploration; the source of truth has moved into the repo.",
        bullets: [
          "Designed the token architecture as variables: 7 color ramps + spatial tokens (gap, padding, radius, border)",
          "Designed the original components with variants and light/dark semantic mappings",
          "Still where bigger visual changes get explored before they land in the written spec",
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
        description:
          "Builds production React from the written spec that lives in the repo — design.md for the design language, CLAUDE.md for the rules.",
        bullets: [
          "Maintains the layered CSS token architecture (primitives → semantics → components)",
          "Generates React components with TypeScript and token-based CSS from the spec",
          "Builds Storybook documentation automatically for every component",
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
        description:
          "Interactive component library at design-system-iota-one.vercel.app showing every piece of robr0 DS.",
        bullets: [
          "Component playground with live controls for all props and states",
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
          "Tracks all changes to design system and website (monorepo)",
          "Triggers Vercel deployment on every push to main",
          "Portfolio visibility at github.com/robritacca-dotcom/design-system",
        ],
      },
      {
        title: "Continuous integration",
        description:
          "Every push and PR runs an automated quality gate before anything is trusted.",
        bullets: [
          "Lints the codebase and builds the library, Storybook, and the website on every change",
          "Renders every Storybook story as an automated smoke test in headless Chrome — every variant, every run",
          "Drift guard fails the build if generated docs (component counts, skills, blueprints) go stale",
          "The same checklist runs locally as a single command, so local and CI can never disagree",
        ],
      },
    ],
  },
  {
    name: "Vercel",
    logo: pipelineLogo("/vercel.svg", "Vercel"),
    roles: [
      {
        title: "Auto-deployment",
        description:
          "Watches GitHub and deploys both sites automatically on every push.",
        bullets: [
          "Builds and deploys Storybook → design-system-iota-one.vercel.app",
          "Builds and deploys website → robr0-ds.vercel.app",
          "Live in under 60 seconds with SSL and global CDN",
        ],
      },
    ],
  },
];

export default function AboutDsPage() {
  return (
    <>

      <BlurBackground />

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
              A personal design system, built to make this site
            </p>
            <p className={styles.introBody}>
              robr0 DS is the system I built — by myself — to make every page you see here. The foundation was designed in Figma. The system itself lives in the repo: a written spec, tokens as layered CSS, components in React. Claude Code builds from the spec, so a design change reaches production in under a minute. None of it is theoretical: the buttons, the colours, the type, the layout — they&apos;re all running on the same system this page describes.
            </p>
            <p className={styles.introBody}>
              I&apos;m putting all of it on display because I think the system is the work. The pipeline below shows how the pieces fit. The tools rail lists what makes it run. And if you want to lift any of it for your own project, everything is open — the artifacts at the bottom of this page are ready to drop in.
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

            {/* Links Rail (Right — 1/3 width) */}
            <aside className={styles.resumeSidebar}>
              <div className={`${styles.resumeSection} animate-in animate-delay-2`}>
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

          {/* Take it with you — the artifacts visitors can reuse */}
          <div className={`${styles.resumeSection} animate-in animate-delay-4`}>
            <div className={styles.resumeSectionHeader}>
              <h2 className={styles.resumeSectionTitle}>Take it with you</h2>
            </div>
            <p className={styles.artifactsIntro}>
              The whole system is open. If you want to apply this approach to your own project, these artifacts make it easy — drop them into your codebase or AI tooling and you have a working starting point.
            </p>
            <div className={styles.artifactsGrid}>
              <Link href="/blueprints/claude" className={styles.artifactCard}>
                <span className={`material-symbols-rounded ${styles.artifactIcon}`} aria-hidden="true">
                  psychology
                </span>
                <div className={styles.artifactBody}>
                  <h3 className={styles.artifactTitle}>Claude MD</h3>
                  <p className={styles.artifactDescription}>
                    The codebase context file Claude Code reads on every session. Project structure, token architecture, component anatomy, and the conventions a builder needs to extend the system without exploring. Hand it to any AI agent and it knows the rules.
                  </p>
                  <span className={styles.artifactCta}>
                    Read Claude MD
                    <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
                  </span>
                </div>
              </Link>

              <Link href="/blueprints/design" className={styles.artifactCard}>
                <span className={`material-symbols-rounded ${styles.artifactIcon}`} aria-hidden="true">
                  description
                </span>
                <div className={styles.artifactBody}>
                  <h3 className={styles.artifactTitle}>Design MD</h3>
                  <p className={styles.artifactDescription}>
                    The design language in a single markdown reference — tokens, typography, colours, and every component spec. The source of truth for how the system looks and behaves, written so a human or a model can pick it up cold.
                  </p>
                  <span className={styles.artifactCta}>
                    Read Design MD
                    <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
                  </span>
                </div>
              </Link>

              <Link href="/skills" className={styles.artifactCard}>
                <span className={`material-symbols-rounded ${styles.artifactIcon}`} aria-hidden="true">
                  auto_awesome
                </span>
                <div className={styles.artifactBody}>
                  <h3 className={styles.artifactTitle}>Skills</h3>
                  <p className={styles.artifactDescription}>
                    Reusable Claude Code skills — scaffold a new component, audit token usage, run a heuristic review, ship a pre-deploy check. Each one is a markdown file you can download and drop into <code>.claude/skills/</code> on your own project.
                  </p>
                  <span className={styles.artifactCta}>
                    Browse Skills
                    <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
                  </span>
                </div>
              </Link>

              <Link href="/loops" className={styles.artifactCard}>
                <span className={`material-symbols-rounded ${styles.artifactIcon}`} aria-hidden="true">
                  cycle
                </span>
                <div className={styles.artifactBody}>
                  <h3 className={styles.artifactTitle}>Loops</h3>
                  <p className={styles.artifactDescription}>
                    Skills that run themselves. Scheduled agents that do real work against real data — the first one reads this site&apos;s analytics every week and proposes copy experiments — with guardrails that keep a human approving every change.
                  </p>
                  <span className={styles.artifactCta}>
                    See the Loops
                    <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
