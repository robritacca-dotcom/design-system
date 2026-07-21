"use client";

import Image from "next/image";
import Link from "next/link";
import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import GitHubContributions from "../../components/GitHubContributions/GitHubContributions";
import { getSidebarLinks, aboutSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(aboutSidebarLinks, "/about");

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
              robr0 DS is the system I built — by myself — to make every page you see here. Tokens live in Figma. Components live in React. Claude Code wires them together so a change in Figma reaches production in under a minute. None of it is theoretical: the buttons, the colours, the type, the layout — they&apos;re all running on the same system this page describes.
            </p>
            <p className={styles.introBody}>
              I&apos;m putting all of it on display because I think the system is the work. The pipeline below shows how the pieces fit. The tools rail lists what makes it run. And if you want to lift any of it for your own project, everything is open — the artifacts at the bottom of this page are ready to drop in.
            </p>
          </div>

          {/* Contributions — real GitHub activity for this repo's account */}
          <div className={`${styles.resumeSection} animate-in animate-delay-2`}>
            <div className={styles.resumeSectionHeader}>
              <h2 className={styles.resumeSectionTitle}>Contributions</h2>
            </div>
            <p className={styles.contributionsIntro}>
              The system is built in public — every commit lands on GitHub. This is the real activity, pulled live from the account that builds robr0 DS.
            </p>
            <GitHubContributions />
          </div>

          {/* Pipeline + Tools two-column layout */}
          <div className={styles.resumeLayout}>
            {/* Pipeline Column (Left — 2/3 width) */}
            <div className={styles.resumeMain}>
              <div className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Pipeline</h2>
                </div>

                <div className={styles.resumeCompanies}>
                  {/* Figma */}
                  <div className={`${styles.resumeCompany} animate-in animate-delay-2`}>
                    <div className={styles.companyHeader}>
                      <Image src="/logos/Figma.svg" alt="Figma" width={28} height={28} className={styles.companyLogo} />
                      <span className={styles.companyName}>Figma</span>
                    </div>
                    <div className={styles.companyRoles}>
                      <div className={styles.timelineBar} />
                      <div className={styles.rolesContent}>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Design source of truth</h3>
                          </div>
                          <p className={styles.roleDescription}>
                            All design decisions live in Figma. I design the robr0 DS system here — not mockups, but the actual source that generates code.
                          </p>
                          <ul className={styles.roleBullets}>
                            <li>Build design tokens as variables: 7 color ramps + spatial tokens (gap, padding, radius, border)</li>
                            <li>Design components with variants and map semantics for light/dark modes</li>
                            <li>Export JSON and expose via MCP for direct code generation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Claude Code */}
                  <div className={`${styles.resumeCompany} animate-in animate-delay-3`}>
                    <div className={styles.timelineSpacer} />
                    <div className={styles.companyHeader}>
                      <Image src="/logos/Claude.svg" alt="Claude" width={28} height={28} className={styles.companyLogo} />
                      <span className={styles.companyName}>Claude Code</span>
                    </div>
                    <div className={styles.companyRoles}>
                      <div className={styles.timelineBar} />
                      <div className={styles.rolesContent}>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>AI component generator</h3>
                          </div>
                          <p className={styles.roleDescription}>
                            Reads my Figma file via MCP and writes production React code directly from design data.
                          </p>
                          <ul className={styles.roleBullets}>
                            <li>Converts token JSON to layered CSS variables (primitives → semantics → components)</li>
                            <li>Generates React components matching Figma variants with TypeScript and token-based CSS</li>
                            <li>Builds Storybook documentation automatically for every component</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Storybook */}
                  <div className={`${styles.resumeCompany} animate-in animate-delay-3`}>
                    <div className={styles.timelineSpacer} />
                    <div className={styles.companyHeader}>
                      <Image src="/logos/storybook.svg" alt="Storybook" width={28} height={28} className={styles.companyLogo} />
                      <span className={styles.companyName}>Storybook</span>
                    </div>
                    <div className={styles.companyRoles}>
                      <div className={styles.timelineBar} />
                      <div className={styles.rolesContent}>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Live documentation site</h3>
                          </div>
                          <p className={styles.roleDescription}>
                            Interactive component library at design-system-iota-one.vercel.app showing every piece of robr0 DS.
                          </p>
                          <ul className={styles.roleBullets}>
                            <li>Component playground with live controls for all props and states</li>
                            <li>Token docs (colors, spacing, typography), icon gallery, logo library</li>
                            <li>Auto-deploys on every code push</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GitHub */}
                  <div className={`${styles.resumeCompany} animate-in animate-delay-4`}>
                    <div className={styles.timelineSpacer} />
                    <div className={styles.companyHeader}>
                      <Image src="/logos/Git.svg" alt="GitHub" width={28} height={28} className={styles.companyLogo} />
                      <span className={styles.companyName}>GitHub</span>
                    </div>
                    <div className={styles.companyRoles}>
                      <div className={styles.timelineBar} />
                      <div className={styles.rolesContent}>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Version control</h3>
                          </div>
                          <p className={styles.roleDescription}>
                            Public repository storing the entire codebase with full commit history.
                          </p>
                          <ul className={styles.roleBullets}>
                            <li>Tracks all changes to design system and website (monorepo)</li>
                            <li>Triggers Vercel deployment on every push to main</li>
                            <li>Portfolio visibility at github.com/robritacca-dotcom/design-system</li>
                          </ul>
                        </div>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Continuous integration</h3>
                          </div>
                          <p className={styles.roleDescription}>
                            Every push and PR runs an automated quality gate before anything is trusted.
                          </p>
                          <ul className={styles.roleBullets}>
                            <li>Lints the codebase and builds the library, Storybook, and the website on every change</li>
                            <li>Renders every Storybook story as an automated smoke test in headless Chrome — every variant, every run</li>
                            <li>Drift guard fails the build if generated docs (component counts, skills, blueprints) go stale</li>
                            <li>The same checklist runs locally as a single command, so local and CI can never disagree</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vercel */}
                  <div className={`${styles.resumeCompany} animate-in animate-delay-4`}>
                    <div className={styles.timelineSpacer} />
                    <div className={styles.companyHeader}>
                      <Image src="/vercel.svg" alt="Vercel" width={28} height={28} className={styles.companyLogo} />
                      <span className={styles.companyName}>Vercel</span>
                    </div>
                    <div className={styles.companyRoles}>
                      <div className={styles.timelineBar} />
                      <div className={styles.rolesContent}>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Auto-deployment</h3>
                          </div>
                          <p className={styles.roleDescription}>
                            Watches GitHub and deploys both sites automatically on every push.
                          </p>
                          <ul className={styles.roleBullets}>
                            <li>Builds and deploys Storybook → design-system-iota-one.vercel.app</li>
                            <li>Builds and deploys website → robr0-ds.vercel.app</li>
                            <li>Live in under 60 seconds with SSL and global CDN</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                    <span className={styles.toolDesc}>Tokens + components, source</span>
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
