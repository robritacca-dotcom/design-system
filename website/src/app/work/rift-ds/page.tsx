"use client";

import { useState } from "react";
import Image from "next/image";
import { CoverImage } from "@/components/covers/CoverImage";
import CaseStudyTldr from "@/components/CaseStudyTldr/CaseStudyTldr";
import { caseStudyTldrs } from "@/data/case-study-tldrs";
import { COMPONENT_COUNT } from "rift-ds/components/registry";
import Link from "next/link";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Button } from "rift-ds/components/Button/Button";
import { Badge } from "rift-ds/components/Badge/Badge";
import { Alert } from "rift-ds/components/Alert/Alert";
import { SegmentedControl } from "rift-ds/components/SegmentedControl/SegmentedControl";
import { LinkList } from "rift-ds/components/LinkList/LinkList";
import { LineChart } from "rift-ds/components/Chart/LineChart";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

/* ============================================
   Real history — registered components counted
   from git at each month-end (folders under
   src/components minus the doc-only helpers
   present at that commit); today comes live
   from the registry.
   ============================================ */
const componentGrowth = [
  { month: "Feb", components: 39 },
  { month: "Mar", components: 39 },
  { month: "Apr", components: 39 },
  { month: "May", components: 39 },
  { month: "Jun", components: 41 },
  { month: "Jul", components: 61 },
  { month: "Aug", components: 120 },
  /* Not a month: the live figure from the package registry. The last column
     used to be labelled with a month while rendering this count, so it drifted
     further from its own label with every release. A column that says "Now"
     cannot. */
  { month: "Now", components: COMPONENT_COUNT },
];

const { sidebarLinks } = getSidebarLinks(workSidebarLinks, "/work/rift-ds");

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
      rule: "Intent, not appearance. Light and dark value on every one.",
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

/** What happens when a rule gets broken. */
function EnforcementChain() {
  const steps = [
    { label: "A raw value lands", note: "A hex or a pixel in component CSS" },
    { label: "Validators run", note: "Before anything builds" },
    { label: "The build fails", note: "Named file, named line" },
    { label: "Two ways out", note: "Use the token, or sign the exception" },
  ];
  return (
    <div className={`${styles.pipeline} ${styles.chain}`} role="figure" aria-label="What happens when a rule is broken">
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
   its own breadth. Rendered with the library's
   own LinkList, in-site rows via newTab: false.
   ============================================ */
const foundationLinks = [
  { href: "https://rift-ds.com/foundations/colour-primitives", icon: "palette", label: "Primitive colours", sub: "Every raw hue: the bottom of the token stack", newTab: true },
  { href: "https://rift-ds.com/foundations/colour-mode", icon: "contrast", label: "Semantic colours", sub: "Primitives wrapped in intent, with light + dark", newTab: true },
  { href: "https://rift-ds.com/foundations/typography", icon: "text_fields", label: "Typography", sub: "One Nunito Sans scale, weight as hierarchy", newTab: true },
  { href: "https://rift-ds.com/foundations/spatial", icon: "straighten", label: "Spacing & radius", sub: "The spatial tokens every component shares", newTab: true },
  { href: "https://rift-ds.com/foundations/icons", icon: "interests", label: "Icons", sub: "Material Symbols Rounded, sized to the system", newTab: true },
  { href: "https://rift-ds.com/foundations/motion", icon: "animation", label: "Motion", sub: "Duration and easing, with a reduced-motion guard", newTab: true },
];

/** The mini catalog — the foundations list + the components index. */
function MiniCatalog() {
  return (
    <div className={styles.catalog} aria-label="Browse the design system">
      <div className={styles.catalogGroup}>
        <p className={styles.catalogGroupLabel}>Foundations</p>
        <LinkList items={foundationLinks} />
      </div>
      <div className={styles.catalogGroup}>
        <p className={styles.catalogGroupLabel}>Components</p>
        <LinkList
          items={[
            {
              href: "https://rift-ds.com/components",
              icon: "widgets",
              label: `${COMPONENT_COUNT} components`,
              sub: "Every component with live examples + Storybook docs",
              newTab: false,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default function Robr0DsCaseStudy() {
  const [viewSegment, setViewSegment] = useState("week");
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          {/* Page header */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>
              Building Rift DS: the rules that hold
            </h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Seven months, {COMPONENT_COUNT} components and a package on npm, spent finding out what makes a design system rule actually stick. The answer was not better documentation.
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
                    Most of my career has been design systems inside large companies, and they ended the same way every time. I would set the rules, document them properly, hand them across the boundary to engineering, and then watch them soften. A hardcoded hex here, a one-off radius there. Nobody was a villain about it. The rules simply had nothing holding them in place, and I usually found out months later with no idea why.
                  </p>

                  <p>
                    Rift DS started in February 2026 as a way to fix that from the inside, on a project where the boundary did not exist. It is now{" "}
                    <Link href="https://rift-ds.com/components" className={styles.inlineLink}>{COMPONENT_COUNT} React components</Link>, a package on npm, and a documentation site of its own. This site is built on it, which is how it got tested. The components turned out to be the easy part.
                  </p>

                  <h2 id="the-foundation">The one part I would not delegate</h2>

                  <p>
                    Day one was not a button. It was a palette. I hand-picked every colour, built the ramps, wrote the semantic names, and mapped all of it myself in Figma variables. Then three tiers, and nothing skips a tier.
                  </p>

                  <TokenTiers />

                  <p>
                    Because every colour token carries a light and a dark value, dark mode is one attribute flipping rather than a second set of components. And colour is only one category: the same treatment runs through type, spacing, radius, elevation, motion and icons. A component in this system does not invent anything. It assembles.
                  </p>

                  <p>
                    That foundation took weeks and it was supposed to. What I had underestimated is how much more it matters once an agent is doing the typing. Sloppy tokens do not just slow down a human developer any more. They slow the model down too, and it will cheerfully invent a value to fill the gap. Design debt became AI debt.
                  </p>

                  <p>
                    Then the payoff arrived faster than I expected. Once the token layer held, I stopped drawing components in Figma and started describing them in words, and five components became thirty-nine in about two weeks. I gave up strict Figma-to-code parity in the same stretch, which felt like heresy at the time and turned out to be scaffolding: useful while the structure was going up, a bottleneck once it was proven.
                  </p>

                  <h2 id="the-plateau">Then nothing happened for three months</h2>

                  <LineChart
                    data={componentGrowth}
                    xKey="month"
                    series={[{ dataKey: "components", label: "Components", color: "#118AB2" }]}
                    title="Components in the library"
                    subtitle="Counted at each month-end from February 2026, with the last column live from the package registry. The flat stretch is the interesting part"
                    summaryItems={[{ label: "Today", value: COMPONENT_COUNT }]}
                    height={220}
                  />

                  <p>
                    {componentGrowth[0].components} in February. The same number in March, April and May. From outside, that flat line looks like a project stalling. It is the stretch that made everything after it possible.
                  </p>

                  <p>
                    What I was building was the layer that tells an agent how to use the foundation.{" "}
                    <Link href="https://rift-ds.com/blueprints/design" className={styles.inlineLink}>design.md</Link>{" "}
                    owns how things look. content-design.md owns how sentences read, including the AI writing habits I kept catching in my own shipped copy.{" "}
                    <Link href="https://rift-ds.com/blueprints/claude" className={styles.inlineLink}>CLAUDE.md</Link>{" "}
                    sits above both as the operating manual: where facts live, what to generate, what never to do. Alongside them came the first{" "}
                    <Link href="https://rift-ds.com/skills" className={styles.inlineLink}>skills</Link>, written procedures for recurring work like scaffolding a component or auditing a page.
                  </p>

                  <p>
                    What makes those documents different from every design doc I had written before is the audience. Most design documentation is written to be agreed with. These get read and executed before a line of CSS exists, so vagueness that would sail through a review meeting produces garbage immediately. Writing for a machine turned out to be the hardest editing pass my own thinking has ever had.
                  </p>

                  <p>
                    In May the site changed shape too. It stopped being a component library with an about page and became my portfolio, with the system as the main exhibit. Six case studies went up in one push. Building pages was no longer the bottleneck. Having something to say was.
                  </p>

                  <h2 id="enforcement">A document nothing enforces is a preference</h2>

                  <p>
                    By June I could see the hole in my own plan. I had written the rules down beautifully, and there was still nothing stopping me, or an agent working from my instructions, from quietly ignoring them. Drift is not a discipline problem. It is the default whenever the same fact lives in more than one place.
                  </p>

                  <p>
                    So every fact in the repo got exactly one home, and the home has a name: a registry. A small structured file holding the authoritative list for one collection. Components, tokens, skills, case studies. Nothing else in the project states those facts on its own authority, and every other surface is either generated from the registry or checked against it when the build runs.
                  </p>

                  <p>
                    The component registry is the clearest case. One file lists every component with its name, category and description. The navigation, the sidebar, the sitemap, the page titles, the card grid and the README count are all built from it. Register a new component and every surface updates itself. Forget to register one and the build fails and names the folder. There is nowhere in this project I can type a component count by hand, including on this page.
                  </p>

                  <p>
                    The same idea, pointed at CSS, is what finally made the rules bite:
                  </p>

                  <EnforcementChain />

                  <p>
                    A chain of validators runs before anything builds. One of them reads every line of component CSS looking for raw values: a hex code, a pixel number, anything that should have come from a token. There are exactly two ways past it. Replace the value with the right token, or write a comment directly above the line declaring the category and the reason for the exception. No override flag. No just this once.
                  </p>

                  <blockquote>
                    I cannot cut a corner without leaving a signed note at the scene. Neither can anything I delegate to.
                  </blockquote>

                  <p>
                    CI closed the loop in July. Every Storybook story now runs as a render test in headless Chromium, with accessibility checks that fail the build on a violation. This is the thing I never had in any system I shipped before. It is not mandated in a deck. It is mandated in the machinery.
                  </p>

                  <h2 id="publishing">Publishing it broke my assumptions</h2>

                  <p>
                    Late July I published the library to npm as{" "}
                    <a href="https://www.npmjs.com/package/rift-ds" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>rift-ds</a>, and it immediately exposed something being my own consumer had hidden. The whole thing was built for this site.
                  </p>

                  <p>
                    Of the 68 components at the time, four forwarded a ref and none extended their native element’s props. Nobody could attach a ref, pass a data attribute, or register a field with a form library. Perfectly good components that were unusable inside anyone else’s application. Eighteen were rebuilt. An accessibility pass in the same stretch fixed 49 violations, nine of which were real component bugs rather than markup slips: DatePicker claimed a grid role it had never implemented, and icon-only buttons had no accessible name at all.
                  </p>

                  <p>
                    That is the lesson I would hand to anyone building a system for a single product. Using your own system catches taste problems. It does not catch contract problems. Only a second consumer finds those, and publishing is the cheapest way to invent one.
                  </p>

                  <h2 id="the-chat">Teaching the site to answer for itself</h2>

                  <p>
                    August’s project was a chat that answers questions about my work and this system, on the page it is describing. I had already led design on{" "}
                    <Link href="/work/intuit-agent-chat" className={styles.inlineLink}>an agent chat platform at Intuit</Link>, so I had a build order I trusted: build the parts first, compose them on a scripted fake transport that emits the same events a real model will, and only then wire up a backend.
                  </p>

                  <p>
                    Designing against a fake model is the move I would repeat on any project. It let me judge streaming pace and scroll behaviour as pure design work, with no API cost and no latency variance muddying the read. Most of two days went into scrolling alone. My first attempt pushed the conversation up from the bottom as each turn landed, and it read as jumpy the moment a real answer streamed in at an uneven pace. What worked was inverting it: let a new turn float to the top of the viewport with a spacer sized to the exact shortfall, handed back as the answer fills it in. Nothing jumps, because the scroll range never moves.
                  </p>

                  <p>
                    That reveal work has since flowed back into the package. It shipped in 0.13.0 as Streaming text with a headless hook, so the chat on this page now runs on the same engine a consumer installs, which is the direction things keep moving here: the site invents a part, and the library absorbs it.
                  </p>

                  <p>
                    The hard part turned out to be the corpus. I found that out by asking my own chat for my email address, and being told the site does not publish one while the address sat in plain text on the contact page. Page prose now flows into the corpus straight off the filesystem, so a new page reaches the chat on its next build with nothing to remember. Structured facts opt in explicitly. Nothing reaches the model that a page did not deliberately publish, and the build fails on anything that tries another way in.
                  </p>

                  <p>
                    Then I tested it like a product rather than a feature. A golden set of questions written from the seats of the people who actually visit, a recruiter, a designer, a developer, plus a few hostile ones, run end to end through the real route. The first pass scored 71 of 78. After the fixes, 77. The one still failing was its own best find: the corpus had been teaching the model about a page that no longer existed.
                  </p>

                  <p>
                    The chat was built for people reading the site. The newest door is for agents: the site now serves a Model Context Protocol endpoint at <code>/api/mcp</code>, and any MCP client that connects can read the component list, every component&rsquo;s exact prop contract, and the token registry. The prop data is generated from the same JSDoc that ships in the package&rsquo;s type declarations, so a coding agent building with the system reads the contract npm ships instead of guessing at props. Same public-only boundary as the corpus, no key, no model behind it.
                  </p>

                  <h2 id="impact">What it added up to</h2>

                  <p>
                    Traffic followed the same shape as the component chart above, and the two flat months are the same two flat months, which is not a coincidence: I was writing documents nobody could see yet. It bottomed in April and grew roughly fifteenfold by July. LinkedIn is the largest referrer, ahead of Google search and my own Substack.
                  </p>

                  <p>
                    The package shipped twenty-two versions before the rename, each published with provenance. The later ones carry whole categories at a time: the charts, the maps set with the globe, the dashboard pieces, the streaming reveal the chat runs on. This site installs it by name like any other consumer, so a packaging mistake breaks my own build before it reaches anyone else’s.
                  </p>

                  <p>
                    And the outcome I actually care about. This site is the portfolio I put in front of people, and when it leads to a conversation, the system is what the conversation ends up being about. It has done the job a portfolio exists to do. That is not a number I can put in a chart, but it is the one that mattered.
                  </p>

                  <p>
                    Everything below is a real component from the library, rendered from the same token layer as the rest of this page:
                  </p>

                  <div className={styles.liveDemo} aria-label="Live components from Rift DS">
                    <div className={styles.demoRow}>
                      <Button label="Primary" variant="primary" size="compact" />
                      <Button label="Secondary" variant="secondary" size="compact" />
                      <Button label="Tertiary" variant="tertiary" size="compact" />
                    </div>
                    <div className={styles.demoRow}>
                      <Badge variant="info" label="Info" />
                      <Badge variant="positive" label="Positive" />
                      <Badge variant="warning" label="Warning" />
                      <Badge variant="error" label="Error" />
                      <Badge variant="neutral" label="Neutral" />
                      <SegmentedControl
                        segments={[
                          { label: "Day", value: "day" },
                          { label: "Week", value: "week" },
                          { label: "Month", value: "month" },
                        ]}
                        activeSegment={viewSegment}
                        onSegmentChange={setViewSegment}
                      />
                    </div>
                    <Alert
                      variant="positive"
                      title="The chart above is a component too."
                      description="Same library, same tokens, installed from npm exactly the way a stranger would install it."
                    />
                  </div>

                  <h2 id="outgrew">The system outgrew the portfolio</h2>

                  <p>
                    In September it stopped making sense as a section of this site. The documentation had grown past the portfolio that hosted it, and every visitor arriving for a component was landing on a personal site that happened to have one. So it left: its own repository, its own domain at{" "}
                    <Link href="https://rift-ds.com" className={styles.inlineLink}>rift-ds.com</Link>, its own name. Rift DS 1.0.0 went to npm on 26 September.
                  </p>

                  <p>
                    Moving it was the closest thing to a test this whole argument has had. Two things had to happen at once, and both are the kind of change that usually leaves wreckage. The package had to be renamed everywhere it was referenced. And the token scale had to be renumbered, every t-shirt size becoming a rank, so <code>--gap-md</code> became <code>--gap-400</code> across a library and a site that consumed it.
                  </p>

                  <p>
                    Neither was careful work, and that is the point. The rename swept by a script, because one module owned the package name and everything else derived from it. The renumbering ran family by family against a validator that fails the build on any <code>var()</code> nothing defines, so a missed call site was a build error rather than a layout that quietly shifted by two pixels. Six hundred and fifty replacements, and the build told me when I was done.
                  </p>

                  <p>
                    It also told me something I had not asked. Six of those six hundred and fifty were not renames at all: they referenced tokens that had never existed, in either version. Four case studies had been drawing a left border in a colour that resolves to nothing, so the border had never rendered, on the live site, for months. Nobody had reported it. Nobody would have. The check that caught it was the one written for a different problem entirely.
                  </p>

                  <p>
                    That is the whole thesis, tested on the largest change the system has been through. Rules that live in a document soften the first time someone is in a hurry. Rules a build enforces do not care how much of a hurry you are in, and they find the mistakes you were never going to look for.
                  </p>

                  <h2 id="what-changed">What changed in how I work</h2>

                  <p>
                    The outcome that surprised me was where my judgment moved. The hours that used to go into pushing pixels now go into writing specifications precise enough for an agent to execute. The thinking is the deliverable. I can try three directions in an afternoon and keep one. The handoff between design and engineering is not shortened, it is gone: the design language lives in one written spec, in version control, next to the code it governs.
                  </p>

                  <p>
                    None of that replaces design judgment. It moves where judgment gets applied, earlier, at the spec, before any code or visuals exist. And the rules hold now, which was the whole test. One rule nobody can break is worth more than fifty everybody agrees with.
                  </p>

                  <h2 id="browse">Browse the system</h2>

                  <p>
                    Every layer described above has its own documented page. Each tile is the real reference I work from:
                  </p>

                  <MiniCatalog />

                  <p>
                    The{" "}
                    <Link href="https://rift-ds.com/releases" className={styles.inlineLink}>project journal</Link>{" "}
                    keeps its own timeline current: a scheduled loop reads the git history every two weeks and consolidates it into entries. I have written up the parts that generalise beyond my repo in three pieces:{" "}
                    <Link href="/writing/design-still-derisks-dev" className={styles.inlineLink}>Design still derisks dev</Link>,{" "}
                    <Link href="/writing/youre-not-building-what-you-think" className={styles.inlineLink}>You’re not building what you think you’re building</Link>, and{" "}
                    <Link href="/writing/how-to-add-a-chat-to-your-own-site" className={styles.inlineLink}>How to add a chat to your own site</Link>.
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
