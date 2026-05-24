"use client";

import Image from "next/image";
import Link from "next/link";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Button } from "@design-system/components/Button/Button";
import { Badge } from "@design-system/components/Badge/Badge";
import { Alert } from "@design-system/components/Alert/Alert";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(workSidebarLinks, "/work/robr0-ds");

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.01 0C5.369 0 0 5.5 0 12.304c0 5.44 3.44 10.043 8.212 11.673.597.122.815-.265.815-.59 0-.286-.02-1.264-.02-2.283-3.34.734-4.036-1.466-4.036-1.466-.537-1.426-1.332-1.793-1.332-1.793-1.094-.754.08-.754.08-.754 1.212.082 1.849 1.263 1.849 1.263 1.073 1.874 2.803 1.345 3.5 1.019.098-.795.417-1.345.755-1.65-2.665-.285-5.468-1.345-5.468-6.07 0-1.345.477-2.445 1.232-3.3-.119-.306-.537-1.57.12-3.26 0 0 1.014-.326 3.3 1.263.98-.27 1.989-.407 3.003-.408 1.014 0 2.048.143 3.002.408 2.287-1.59 3.301-1.263 3.301-1.263.657 1.69.239 2.954.12 3.26.775.855 1.232 1.955 1.232 3.3 0 4.725-2.803 5.764-5.488 6.07.438.387.815 1.12.815 2.281 0 1.65-.02 2.975-.02 3.382 0 .326.22.713.816.59C20.56 22.347 24 17.744 24 12.305 24.02 5.5 18.63 0 12.01 0" fill="currentColor"/>
  </svg>
);

/** The pipeline diagram — six labeled boxes connected by chevrons. */
function PipelineDiagram() {
  const steps = [
    { label: "Figma", note: "Tokens + components" },
    { label: "MCP", note: "Bridge" },
    { label: "Claude Code", note: "Generates React + CSS" },
    { label: "Storybook", note: "Auto-built docs" },
    { label: "GitHub", note: "Source of truth" },
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

export default function Robr0DsCaseStudy() {
  return (
    <>
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          {/* Page header — title + GitHub link inline */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>
              Building robr0 DS — a one-person design system, end to end
            </h1>
            <div className={styles.pageActions}>
              <Button
                label="GitHub"
                priority="tertiary"
                size="compact"
                iconLeft={<GitHubIcon />}
                iconRight="open_in_new"
                href="https://github.com/robritacca-dotcom/design-system"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Why I built a personal design system from scratch, and how an AI-augmented Figma-to-React pipeline let me ship a polished site alone.
          </p>

          {/* Two-column body — mirrors the embedded-ai-turbotax case study */}
          <div className={`${styles.resumeLayout} animate-in animate-delay-3`}>
            {/* Main — article body */}
            <div className={styles.resumeMain}>
              <div className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Case study</h2>
                </div>

                <div className={styles.body}>
                  <p className={styles.lede}>
                    The site you&apos;re on runs on a design system I built end to end. Tokens, components, theming, docs — all mine. This is the story of why I built it instead of grabbing an off-the-shelf system, and what fell out of doing it that way.
                  </p>

                  <h2>Why build a personal design system in 2026?</h2>

                  <p>
                    Plenty of great systems exist — shadcn, Mantine, Material, Radix. Any of them would&apos;ve gotten me a portfolio site in a weekend. I picked the longer road on purpose:
                  </p>

                  <ul>
                    <li>I wanted a system that matched <em>my</em> visual voice, not a popular one.</li>
                    <li>I wanted a forcing function to build a real design-to-code pipeline, not just consume one.</li>
                    <li>As a portfolio piece, the system itself is the proof — it demonstrates how I think better than any case study about how I think could.</li>
                  </ul>

                  <h2>The three-tier token architecture</h2>

                  <p>
                    The whole thing rests on a single architectural rule: primitives at the bottom, semantic tokens in the middle, components on top. <strong>No component CSS ever references a primitive directly.</strong>
                  </p>

                  <p>
                    Primitives are the raw values — every shade of teal I might ever use, every spacing step, every radius. They&apos;re defined as variables in Figma and exported into CSS:
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
                      <figcaption className={styles.pairCaption}>The same primitives in CSS — one source of truth in two surfaces.</figcaption>
                    </div>
                  </figure>

                  <p>
                    Semantic tokens give those primitives meaning. <code>--primitive-teal-07</code> becomes <code>--color-action-primary-bg</code>. <code>--primitive-neutral-09</code> becomes <code>--color-text-primary</code>. The semantic layer is also where light and dark mode diverge — same component CSS, different mapping underneath:
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
                    The payoff is concrete:
                  </p>
                  <ul>
                    <li><strong>Light and dark mode are free.</strong> Swap the semantic mapping; everything reads correctly.</li>
                    <li><strong>Renaming a hex changes nothing.</strong> Components don&apos;t know primitives exist.</li>
                    <li><strong>Component CSS reads like intent, not like pixels.</strong> <code>background: var(--color-action-primary-bg)</code> tells you what it&apos;s doing.</li>
                  </ul>

                  <h2>The pipeline: Figma to React in under a minute</h2>

                  <p>
                    The tokens and components live in Figma. From there, they flow to production through a chain that runs without a handoff meeting:
                  </p>

                  <PipelineDiagram />

                  <p>
                    Claude Code reads the Figma file directly through MCP. It generates token CSS, React components with the right TypeScript shape, and Storybook stories that match the Figma variants. I push to GitHub. Vercel deploys both this site and the Storybook in under a minute. The whole loop fits in a coffee break.
                  </p>

                  <blockquote>
                    The handoff that usually sits between design and engineering is just gone. The spec is the work.
                  </blockquote>

                  <h2>What it produces</h2>

                  <p>
                    Forty-two React components, full Storybook docs, light and dark themes, the entire site you&apos;re reading right now. Here&apos;s a tiny live slice — these are the actual components from the system, rendered inline:
                  </p>

                  <div className={styles.liveDemo} aria-label="Live components from robr0 DS">
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
                    <Alert
                      variant="positive"
                      title="It&rsquo;s the same system the rest of this page uses."
                      description="Every component in robr0 DS is a real React component, rendered from the same token layer."
                    />
                  </div>

                  <h2>What changed in my practice</h2>

                  <p>
                    The most interesting outcome wasn&apos;t the system itself — it was how building this way rewired how I work:
                  </p>

                  <ul>
                    <li><strong>The spec is the work.</strong> The time that used to go into pushing pixels now goes into writing clear specs that an AI agent can execute. The thinking is the deliverable.</li>
                    <li><strong>Speed compresses iteration.</strong> I can try three layout directions in an afternoon and keep the best one. Earlier in my career that was a week.</li>
                    <li><strong>Designer-to-dev sync is near zero.</strong> Tokens flow from Figma to production without a handoff meeting. When the design changes, the code changes — same gesture.</li>
                  </ul>

                  <p>
                    None of this replaces design judgment. It moves where judgment is applied — earlier, at the spec level, before code or visuals exist.
                  </p>

                  <h2>The artifacts I&apos;m leaving open</h2>

                  <p>
                    The whole system is on GitHub. Three artifacts make the approach reusable on any project you start tomorrow:
                  </p>

                  <ul>
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
                    Each one is a markdown file. Download it, drop it into your project, point Claude at it. The pipeline isn&apos;t magic — it&apos;s a stack of small written agreements an AI can act on.
                  </p>

                  <h2>What&apos;s next</h2>

                  <p>
                    I&apos;m continuing to harden the pipeline — better visual regression checks, agent-driven design reviews, more skills as patterns surface. The next case studies on this site (Meta, Augmenta, Intuit Agent Chat) will all be authored using this same infrastructure. The system makes the writing faster too.
                  </p>
                </div>
              </div>
            </div>

            {/* Right rail — tools + links */}
            <aside className={styles.resumeSidebar} aria-label="Case study resources">
              <div className={styles.resumeSection}>
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
              </div>

              <div className={styles.resumeSection}>
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
                      <span className={styles.linkSub}>Tokens + components, source</span>
                    </div>
                  </a>

                  <Link href="/about" className={styles.linkItem}>
                    <Image src="/logos/rr.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>About robr0 DS</span>
                        <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
                      </div>
                      <span className={styles.linkSub}>System overview + artifacts</span>
                    </div>
                  </Link>
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
