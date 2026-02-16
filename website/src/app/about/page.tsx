"use client";

import Image from "next/image";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import PageLinks from "../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, aboutSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const navLinks = getNavLinks("About");
const { sidebarLinks, subnavLinks } = getSidebarLinks(aboutSidebarLinks, "/about");

export default function AboutDsPage() {
  return (
    <>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>About robr0 DS</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=246-5864"
            />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Design system infrastructure powered by AI tooling
            </p>
            <p className={styles.introBody}>
              I built a design-to-code pipeline that keeps design and development perfectly in sync. Everything starts in Figma where I define design tokens as variables and build components. Claude Code connects to Figma via MCP, reads the design data directly, and generates production-ready React components with token-based CSS and Storybook documentation. When I push changes to GitHub, Vercel automatically deploys both the component library (Storybook) and this website within 60 seconds. Design changes flow straight to production with zero manual translation or deployment steps. It&apos;s infrastructure that lets one person maintain design system quality that normally requires a full team.
            </p>
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

            {/* Tools Rail (Right — 1/3 width) */}
            <aside className={styles.resumeSidebar}>
              <div className={`${styles.resumeSection} animate-in animate-delay-2`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Tools</h2>
                </div>

                <div className={styles.toolItem}>
                  <Image src="/logos/Figma.svg" alt="Figma" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>Figma</span>
                    <span className={styles.toolDesc}>robr0 DS design file, variables, MCP server</span>
                  </div>
                </div>

                <div className={styles.toolItem}>
                  <Image src="/logos/Claude.svg" alt="Claude" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>Claude Code + Opus 4.6</span>
                    <span className={styles.toolDesc}>AI component generation from Figma</span>
                  </div>
                </div>

                <div className={styles.toolItem}>
                  <Image src="/logos/cursor.svg" alt="Cursor" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>Cursor</span>
                    <span className={styles.toolDesc}>AI code editor and file inspection</span>
                  </div>
                </div>

                <div className={styles.toolItem}>
                  <Image src="/logos/storybook.svg" alt="Storybook" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>Storybook</span>
                    <span className={styles.toolDesc}>Component documentation site</span>
                  </div>
                </div>

                <div className={styles.toolItem}>
                  <Image src="/logos/React.svg" alt="React" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>React</span>
                    <span className={styles.toolDesc}>Component framework</span>
                  </div>
                </div>

                <div className={styles.toolItem}>
                  <Image src="/logos/Git.svg" alt="GitHub" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>Github</span>
                    <span className={styles.toolDesc}>Version Control</span>
                  </div>
                </div>

                <div className={styles.toolItem}>
                  <Image src="/logos/ChatGPT.svg" alt="ChatGPT" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>ChatGPT</span>
                    <span className={styles.toolDesc}>Content writing</span>
                  </div>
                </div>

                <div className={styles.toolItem}>
                  <Image src="/vercel.svg" alt="Vercel" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>Vercel</span>
                    <span className={styles.toolDesc}>Auto-deploy platform</span>
                  </div>
                </div>

                <div className={styles.toolItem}>
                  <Image src="/logos/material.svg" alt="Material 3" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>Material 3</span>
                    <span className={styles.toolDesc}>Icon and typography system</span>
                  </div>
                </div>

                <div className={styles.toolItem}>
                  <Image src="/logos/GoDaddy.svg" alt="GoDaddy" width={28} height={28} />
                  <div className={styles.toolDetails}>
                    <span className={styles.toolName}>GoDaddy</span>
                    <span className={styles.toolDesc}>Domain</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
