"use client";

import Image from "next/image";
import Link from "next/link";
import { CoverImage } from "@/components/covers/CoverImage";
import CaseStudyTldr from "@/components/CaseStudyTldr/CaseStudyTldr";
import { caseStudyTldrs } from "@/data/case-study-tldrs";
import { COMPONENT_COUNT } from "rift-ds/components/registry";
import SiteNav from "@/components/SiteNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import {
  ChatStage,
  ComponentPipeline,
  PlaygroundVideo,
  RIFT_DS_THEMES,
  ThemeGallery,
} from "./visuals";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(workSidebarLinks, "/work/rift-ds");

/** How many complete looks the package ships, from the gallery's registry. */
const THEME_COUNT = RIFT_DS_THEMES.length;

/** The three-tier token stack, with a real value at each level. */
function TokenTiers() {
  const tiers = [
    {
      name: "Primitives",
      rule: "Raw values. Never referenced by a component.",
      code: "--primitive-teal-08: #0E6E8F",
    },
    {
      name: "Semantic tokens",
      rule: "Roles, not appearance. A light and a dark value on every one.",
      code: "--color-action-primary-bg: var(--primitive-teal-08)",
    },
    {
      name: "Components",
      rule: "Only ever read the middle layer.",
      code: "background: var(--color-action-primary-bg)",
    },
  ];
  return (
    <div className={styles.tiers} role="figure" aria-label="The three-tier token stack">
      {tiers.map((t, i) => (
        <div key={t.name} className={styles.tierRow}>
          <div className={styles.tier}>
            <span className={styles.tierName}>{t.name}</span>
            <span className={styles.tierRule}>{t.rule}</span>
            <code className={styles.tierCode}>{t.code}</code>
          </div>
          {i < tiers.length - 1 && (
            <span className={`material-symbols-rounded ${styles.tierArrow}`} aria-hidden="true">
              arrow_downward
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function RiftDsCaseStudy() {
  return (
    <>
      <SiteNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          {/* Page header */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>
              Rift DS: a design system that can look like anything
            </h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            {COMPONENT_COUNT} components, {THEME_COUNT} complete themes and an AI chat, built by one designer and free on npm. It ships fast because the rules come first.
          </p>

          {/* Hero image */}
          <figure className={`${styles.cover} animate-in animate-delay-2`}>
            <CoverImage
              href="/work/rift-ds"
              aspect="feature"
              className={styles.coverImage}
              priority
            />
          </figure>

          {/* Two-column body — mirrors the embedded-ai-turbotax case study */}
          <div className={`${styles.resumeLayout} animate-in animate-delay-3`}>
            {/* Main — article body */}
            <div className={styles.resumeMain}>
              <CaseStudyTldr points={caseStudyTldrs["rift-ds"]} />

              <section id="full-story" className={`${styles.resumeSection} ${styles.fullStory}`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Case study</h2>
                </div>

                <article className={styles.body}>
                  <p className={styles.lede}>
                    Product teams have a stubborn belief that design systems are slow: a quarter to stand one up, a committee to add a button. I believed it too, after years of building them inside large companies. Rift DS is my argument against it. It is {COMPONENT_COUNT} React components, {THEME_COUNT} complete themes and a full AI chat widget, built by one designer and free to use under the MIT licence.
                  </p>

                  <p>
                    It started in February 2026 as the component library behind this portfolio, with one theme picked for me. I ended up caring more about the system than the site. It grew tests, accessibility checks and validators, then outgrew the portfolio altogether. In September it moved to its own repository, its own domain at{" "}
                    <Link href="https://rift-ds.com" className={styles.inlineLink}>rift-ds.com</Link>{" "}
                    and its own package on npm, and 1.0.0 shipped on 26 September. This site now installs it like any other consumer would.
                  </p>

                  <h2 id="how-its-built">Speed comes from the rules</h2>

                  <p>
                    A system stays quick to work on when nobody has to remember its rules. In Rift they are written down once and then checked by the build, so they hold on a Friday afternoon exactly as well as on a Monday morning.
                  </p>

                  <TokenTiers />

                  <p>
                    The foundation is three tiers of tokens. Primitives hold raw values, semantic tokens give them roles like the action colour, and component CSS reads only the roles. Every colour role carries a light and a dark value. That one constraint is what makes the rest of this page possible: re-point the roles and every component follows.
                  </p>

                  <p>
                    Above the tokens sits the layer a coding agent reads first.{" "}
                    <Link href="https://rift-ds.com/blueprints/design" className={styles.inlineLink}>design.md</Link>{" "}
                    says how things look, content-design.md says how sentences read, and{" "}
                    <Link href="https://rift-ds.com/blueprints/claude" className={styles.inlineLink}>CLAUDE.md</Link>{" "}
                    says where every fact lives and what never to do.{" "}
                    <Link href="https://rift-ds.com/skills" className={styles.inlineLink}>Skills</Link>{" "}
                    turn recurring work into written procedures. One scaffolds a component; others audit a page for accessibility or check the docs for drift.
                  </p>

                  <ComponentPipeline />

                  <p>
                    Here is what happens when I add a component. I describe it in a sentence, and the new-component skill writes the component, its stylesheet and its stories, and adds it to the registry. Then the build takes over. One validator reads every line of the CSS and fails on a raw hex or pixel value, with one way past: a comment at that line naming the category and the reason. Another holds the props contract, so every component forwards its ref, passes native attributes through and documents every prop. Another fails if a component draws its own checkbox instead of the shared one. Finally CI renders every Storybook story in headless Chromium and fails on an accessibility violation.
                  </p>

                  <blockquote>
                    I cannot cut a corner without leaving a signed note at the scene. Neither can anything I delegate to.
                  </blockquote>

                  <p>
                    So the pace is not heroics. The artifact panel, where the chat opens a dashboard or a page it made, shipped in 1.9.0 on 14 October. QuestionCard, which lets the chat ask with answers to pick, followed in 1.10.0 four days later. On 23 October, 1.13.0 replaced every checkbox, radio and switch mark in the library with one shared drawing, across every component that shows one, and nobody upgrading had to change a line. In the teams I have worked in, that last one alone would have been a quarter on the roadmap.
                  </p>

                  <h2 id="themes">One system, every look</h2>

                  <p>
                    Because components only read roles, a theme is a new set of answers to the same questions. Each look is complete: colour, typeface, corner radius, density, motion and elevation, in light and dark. One <code>data-brand</code> attribute switches it on, with no JavaScript at runtime. Rift ships {THEME_COUNT} of them, and the dashboard below wears each one without knowing which.
                  </p>

                  <ThemeGallery />

                  <p>
                    That marketing dashboard is one of the{" "}
                    <Link href="https://rift-ds.com/templates" className={styles.inlineLink}>templates on rift-ds.com</Link>, built from the library alone. The cover of this case study is the same screen in Blueprint.
                  </p>

                  <h2 id="playground">A description becomes a system</h2>

                  <p>
                    This is the part I most want other designers to see. A DESIGN.md is a markdown file that describes a product’s look: colours, type and corners up top, prose underneath. At TurboTax we used one to get an MCP app close to Claude’s look quickly. It worked, but it was an approximation. Every value went straight into component code, and changing the accent meant hunting down every place it lived.
                  </p>

                  <PlaygroundVideo />

                  <p>
                    Drop the same kind of file, or just an image, on the{" "}
                    <Link href="https://rift-ds.com/playground" className={styles.inlineLink}>playground</Link>{" "}
                    and the values go somewhere else. The importer fits each one to a lever the built-in themes already use, bends anything that would break a contract, like a button label falling under 4.5:1 contrast, and reports every choice it made. The components never see the file. What comes out is the real system wearing that look, exported as one AGENTS.md a coding agent can build on.
                  </p>

                  <p>
                    I wrote up how the importer reads a file in{" "}
                    <Link href="/writing/a-designmd-is-not-a-design-system" className={styles.inlineLink}>A DESIGN.md is not a design system</Link>. The short version: the file describes the look, and the system keeps it consistent.
                  </p>

                  <h2 id="chat">An AI chat in the box</h2>

                  <p>
                    The largest single piece of Rift is its chat widget. One command, <code>npx rift-ds init chat</code>, writes it into a product: a provider that holds the conversation, a launcher that docks the panel beside the page or takes over the screen, and a server handler for any web-standard route. Rate limits and a daily budget come as an optional add-on over Upstash Redis.
                  </p>

                  <p>
                    It is easier to show than to list. A reply streams in without the thread jumping, because each new turn rises to the top of the panel and the answer fills the space beneath it. The chat can show its work as steps, ask a question with answers to pick, and open a dashboard it built in a panel beside the conversation. Every word it writes is a prop, so a product in another language can translate all of it.
                  </p>

                  <ChatStage />

                  <p>
                    The Ask button in the corner of this page is the same widget. Only the backend is mine: a Claude-backed route with its own persona and guardrails, answering from a corpus generated from the pages on this site. I wrote that half up in{" "}
                    <Link href="/writing/how-to-add-a-chat-to-your-own-site" className={styles.inlineLink}>How to add a chat to your own site</Link>.
                  </p>

                  <h2 id="what-changes">What it changes</h2>

                  <p>
                    Building this changed how I think about systems work. The slow part was never the components. It was the coordination: people agreeing on rules, then people remembering them. Put the rules in the build and most of that cost disappears, which means a small, focused team, or one person, can hold a system to the standard a large team would.
                  </p>

                  <p>
                    My judgment did not go away. It moved earlier, into the specs, the validators and the skills, and it pays out on every component after.
                  </p>

                  <p>
                    And because it is MIT licensed, the whole thing is anyone’s to use: the tokens, the components, the themes, the playground’s export and the chat. Start with the{" "}
                    <Link href="https://rift-ds.com/docs/get-started" className={styles.inlineLink}>getting started guide</Link>, or open the playground and drop in a file of your own.
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
                      <span>Personal, open source</span>
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
                    href="https://github.com/robritacca-dotcom/rift-ds"
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
                    href="https://storybook.rift-ds.com"
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

                  <Link href="https://rift-ds.com/playground" className={styles.linkItem}>
                    <Image src="/logos/rr.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>Playground</span>
                        <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
                      </div>
                      <span className={styles.linkSub}>Re-theme the system live</span>
                    </div>
                  </Link>

                  <a
                    href="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/rift-ds26?node-id=113-7533"
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

                  <Link href="https://rift-ds.com/docs/get-started" className={styles.linkItem}>
                    <Image src="/logos/rr.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>Get started</span>
                        <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
                      </div>
                      <span className={styles.linkSub}>Install it and theme it yourself</span>
                    </div>
                  </Link>
                </div>
              </section>
            </aside>
          </div>
        </main>
      </div>

    </>
  );
}
