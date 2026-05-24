"use client";

import { useState } from "react";
import Image from "next/image";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Tabs } from "@design-system/components/Tabs/Tabs";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  workSidebarLinks,
  "/work/embedded-ai-turbotax"
);

const tabs = [
  { value: "learned", label: "What I learned" },
  { value: "built", label: "How we built it" },
];

export default function EmbeddedAiTurbotaxCaseStudy() {
  const [activeTab, setActiveTab] = useState<"learned" | "built">("learned");
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
              Designing Embedded AI Experiences Inside ChatGPT and Claude
            </h1>
          </div>

          {/* Subtitle */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            What I learned leading design for TurboTax&apos;s embedded AI experiences
            during one of the first large-scale launches inside major AI platforms
          </p>

          {/* Cover image — under the subtitle */}
          <figure className={`${styles.cover} animate-in animate-delay-2`}>
            <Image
              src="/images/embedded-ai-cover.webp"
              alt="Designing Embedded AI Experiences Inside ChatGPT and Claude — cover"
              width={940}
              height={480}
              priority
              className={styles.coverImage}
            />
          </figure>

          {/* Two-column body — mirrors the About page resumeLayout */}
          <div className={`${styles.resumeLayout} animate-in animate-delay-3`}>
            {/* Main — article body */}
            <div className={styles.resumeMain}>
              <div className={styles.resumeSection}>
                <div className={styles.resumeTabsHeader}>
                  <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={(v) => setActiveTab(v as "learned" | "built")}
                    ariaLabel="Case study sections"
                  />
                </div>

                {activeTab === "learned" && (
                <div className={styles.body}>
                  <p className={styles.lede}>
                    Last October, I started leading design work for a new category of TurboTax experience: embedded AI applications running directly inside ChatGPT and Claude. The work began as a relatively small MVP ahead of tax season, with the first release launching in December. We followed with a larger V2 release in January, and then a major expansion in April alongside the Claude Connector launch.
                  </p>

                  <p>
                    Over the course of those months, the product evolved from a lightweight embedded experience into something much deeper: a connected tax preparation workflow that allowed users to begin preparing their taxes almost entirely from inside AI platforms they were already using daily.
                  </p>

                  <p>Users could:</p>
                  <ul>
                    <li>Connect accounts</li>
                    <li>Go through personalized conversational tax interviews</li>
                    <li>Upload and extract tax documents</li>
                    <li>Generate dynamic filing checklists</li>
                    <li>Synchronize data directly back into the core TurboTax experience</li>
                  </ul>

                  <p>
                    It was one of the first times TurboTax had operated natively inside major consumer AI ecosystems at this level of depth, and the work ultimately went on to win a Webby Award. More importantly, though, it gave our team an unusually early look into what designing embedded AI applications inside systems like ChatGPT and Claude actually feels like in practice.
                  </p>

                  <h2>One product, many environments</h2>

                  <p>
                    One of the most interesting aspects of the work was that we were not designing a traditional standalone product. We were designing an embedded application that had to exist coherently across multiple AI ecosystems simultaneously. Using the UI kits and platform guidance provided by OpenAI and Anthropic, we built what was effectively a centralized MCP-powered application layer for TurboTax. The core experience remained structurally similar regardless of where it launched, but through tokens, platform-specific theming, and custom component layers, the application could dynamically adapt itself to feel native inside ChatGPT or native inside Claude while still operating from the same underlying system architecture.
                  </p>

                  <p>
                    In practice, it was one product with multiple deployments, multiple orchestration environments, and multiple interaction models depending on where the user entered the experience. The application also had to support bidirectional data synchronization between systems. Users were authorizing secure connections between TurboTax and the AI platforms themselves, allowing conversational workflows to persist information, extract documents, generate preparation states, and synchronize that information back into the primary TurboTax product.
                  </p>

                  <h2>When the platform owns the orchestrator</h2>

                  <p>
                    At a high level, that sounds relatively straightforward. In reality, it introduced an entirely new category of product and UX challenges that I do not think the industry fully appreciates yet. Once you begin designing applications inside systems like ChatGPT and Claude, you are no longer fully designing the orchestration layer yourself. <strong>OpenAI and Anthropic own the orchestrator, and that changes almost everything about how product design behaves.</strong>
                  </p>

                  <p>
                    Traditional software assumes a relatively controlled environment. Product teams usually own the interface, the navigation model, the interaction sequencing, and most of the surrounding system behavior. Inside AI ecosystems, many of those assumptions no longer hold. The conversation itself becomes the navigation layer. The AI platform partially controls discovery, invocation, memory, rendering behavior, and context retention. Your application stops behaving like a standalone destination and instead becomes one capability among many inside a much larger intelligence environment.
                  </p>

                  <p>
                    That fundamentally changes the nature of the design problem. Users fluidly move between the native model, embedded applications, uploaded documents, conversational context, generated outputs, and external systems without necessarily perceiving hard boundaries between them. As a result, the work starts looking less like traditional screen design and more like designing orchestration systems. You are shaping continuity, conversational state transitions, interoperability, dynamic interfaces, and trust boundaries that exist across ecosystems you do not fully control.
                  </p>

                  <p>
                    One of the largest conceptual shifts for me personally was realizing how much the orchestrator itself becomes part of the user experience. In traditional software, if you carefully design a workflow, users generally experience that workflow consistently. Inside AI ecosystems, orchestration itself becomes probabilistic. The same user intent may surface differently depending on conversational history, memory state, model interpretation, invocation timing, or competing tools inside the ecosystem. Product teams are no longer designing fully deterministic flows. They are designing adaptive systems that cooperate with another intelligence layer operating above them.
                  </p>

                  <blockquote>
                    Designing inside these ecosystems increasingly feels less like designing software and more like designing protocols between multiple layers of intelligence.
                  </blockquote>

                  <p>
                    This creates a very unusual dynamic because parts of the experience become emergent rather than explicitly authored. The platform determines how apps are surfaced, how tools are called, how memory behaves, how transitions occur between systems, and how much conversational continuity exists from one interaction to the next.
                  </p>

                  <h2>Concrete platform constraints</h2>

                  <p>
                    There are also surprisingly concrete UX limitations that emerge from this model:
                  </p>
                  <ul>
                    <li>
                      <strong>In ChatGPT</strong>, product teams do not fully control the canvas behavior if a user opens it. If there is critical information you always want visible up front, there may not be a deterministic way to guarantee its visibility — the platform ultimately controls how the canvas is rendered and expanded.
                    </li>
                    <li>
                      <strong>In Claude</strong>, the now-familiar &ldquo;human in the loop&rdquo; approval cards are similarly orchestrator-controlled. As a product team, you do not fully own how or when those interaction patterns appear.
                    </li>
                  </ul>

                  <p>
                    There are moments where you cannot deterministically control how users answer certain questions or progress through sensitive workflows, even when those workflows are deeply connected to your application logic. Those constraints fundamentally change how you think about product design. A large part of the work becomes designing around platform restrictions, orchestration constraints, and interaction systems you do not entirely own. Instead of fully controlling experiences, you are often designing resilient systems that can adapt to different orchestration behaviors while still maintaining continuity and trust.
                  </p>

                  <h2>Conversation didn&apos;t replace interfaces</h2>

                  <p>
                    One of the biggest assumptions I changed my mind about during this work was the idea that conversational interfaces alone would simply replace traditional interfaces outright. Conversation is incredibly effective for onboarding, ambiguity reduction, contextual intake, organization, and guidance. Users naturally prefer conversational interaction when they are uncertain, unfamiliar with a workflow, or trying to navigate complexity. But once workflows become denser, more stateful, more document-heavy, or more verification-oriented, users begin demanding structure again.
                  </p>

                  <p>
                    That does not mean conversation failed. It simply means human cognition still benefits from:
                  </p>
                  <ul>
                    <li>Visibility</li>
                    <li>Side-by-side review</li>
                    <li>Structured confirmation</li>
                    <li>Previews</li>
                    <li>Persistent state</li>
                    <li>Auditability</li>
                  </ul>

                  <p>
                    One of the strongest patterns we observed was that users loved conversational intake but still wanted highly structured verification before committing actions — especially in workflows involving money, legal implications, identity, or irreversible outcomes. The future likely is not &ldquo;everything becomes chat.&rdquo; It feels much more likely that conversational orchestration will coexist with interfaces that dynamically materialize around the conversation itself depending on context and intent.
                  </p>

                  <h2>Continuity is the new expectation</h2>

                  <p>
                    Another thing that became immediately obvious during research was how quickly embedded AI systems change user expectations around continuity. As soon as the system begins remembering context, organizing information, understanding intent, and reducing friction, users start expecting that continuity everywhere. The moment the system loses context or breaks continuity, the experience suddenly feels fragmented — not necessarily because the technology is broken, but because the user&apos;s mental model has already shifted from &ldquo;I&apos;m using tools&rdquo; to &ldquo;I&apos;m operating inside an intelligent environment.&rdquo;
                  </p>

                  <p>
                    That transition happens remarkably fast. One of the biggest UX challenges we encountered was not whether users liked the AI interactions themselves. Most did. The challenge was what happened when continuity stopped. Users expected the intelligence layer to persist across onboarding, uploads, interviews, transitions, filing workflows, and product boundaries. From a technical perspective, those boundaries are understandable. From a user perspective, they increasingly feel artificial because the intelligence layer creates an expectation of seamlessness that traditional systems were never designed to support.
                  </p>

                  <h2>Trust in probabilistic systems</h2>

                  <p>
                    Traditional software is deterministic. Embedded AI systems are probabilistic. Users are constantly trying to understand:
                  </p>
                  <ul>
                    <li>What the AI knows</li>
                    <li>What it inferred</li>
                    <li>What was verified</li>
                    <li>Which system is authoritative</li>
                    <li>How confident the output is</li>
                    <li>Who is accountable if something goes wrong</li>
                  </ul>

                  <p>
                    Those questions become especially important in workflows involving finance, healthcare, legal systems, or identity. The challenge becomes less about designing interactions and more about <strong>designing confidence calibration</strong>. Users need to understand uncertainty, provenance, verification, accountability, and the boundaries between systems that may all appear unified from the outside.
                  </p>

                  <h2>Why open-ended prompting often falls short</h2>

                  <p>
                    One of the clearest lessons from the work was how much the industry currently overestimates open-ended prompting. Blank prompt boxes assume users already possess:
                  </p>
                  <ul>
                    <li>Vocabulary</li>
                    <li>Confidence</li>
                    <li>Process understanding</li>
                    <li>Domain knowledge</li>
                    <li>Awareness of what the system is capable of doing</li>
                  </ul>

                  <p>
                    Many users do not. Especially in high-complexity workflows, what consistently performed better was structured guidance, contextual next steps, conversational scaffolding, progressive disclosure, intelligent suggestions, and dynamically generated interfaces around user intent.
                  </p>

                  <blockquote>
                    Good AI UX often reduces the amount of prompting required rather than increasing it.
                  </blockquote>

                  <h2>A new design category</h2>

                  <p>
                    After spending the last year working in this space, I genuinely believe embedded AI application design is becoming its own category. It sits somewhere between systems design, conversational UX, orchestration design, platform design, and traditional product design, but it is not fully any one of them. The work increasingly involves orchestrating intelligence, managing probabilistic systems, designing continuity, balancing automation with oversight, shaping trust boundaries, and coordinating dynamic interfaces across ecosystems you do not fully control.
                  </p>

                  <p>
                    What makes this moment particularly exciting is that very few established patterns exist yet. Most teams are still discovering these interaction models in real time. It feels far less like optimizing mature UX conventions and much more like helping define an entirely new computing paradigm while it is still forming.
                  </p>
                </div>
                )}

                {activeTab === "built" && (
                <div className={styles.body}>
                  <p className={styles.lede}>
                    Some of the work happens before the product ships — the prototyping pipeline we used to align the cross-functional team in days, not weeks. This is the workflow we ran when there was no template, no repo, and no existing pattern to fall back on.
                  </p>

                  <h2>The framing</h2>

                  <p>
                    What if our idea doesn&apos;t fit what&apos;s already been built? New surface, new experience model, no template to fall back on — so we built the foundation itself, end to end, in under a day.
                  </p>

                  <p>
                    The setup was simple and unforgiving:
                  </p>

                  <ul>
                    <li><strong>Goal</strong> — demonstrate a working TurboTax plugin inside Claude CoWork to a cross-functional team, with enough advanced features and flows to drive a real alignment decision.</li>
                    <li><strong>Timeline</strong> — under one day. Start at 9am, share-out at 5pm.</li>
                    <li><strong>Constraint</strong> — no existing Claude CoWork template to start from, and the prototype had to look real.</li>
                  </ul>

                  <h2>When to do this</h2>

                  <p>
                    No repo, no existing artifacts, no design source? This is your starting point. Higher fidelity output means better alignment with cross-functional partners, which means a faster path to moving things forward. The upfront investment in context and templates pays off every time you spin up a new prototype.
                  </p>

                  <h2>Step 1 — Gather the sources</h2>

                  <p>
                    The agent can only build as well as the information it&apos;s given. Before any prompting, we fed the system as much context as possible upfront. These sources set the guardrails so what gets generated actually looks like an existing product.
                  </p>

                  <p>
                    We pulled four:
                  </p>

                  <ul>
                    <li><strong>Claude Figma Library</strong> — the Anthropic-provided UI kit from the MCP App Ecosystem Kit. Designed for claude.ai, not CoWork specifically, so the UI patterns don&apos;t translate one-to-one. But the foundational elements do: icons, components, typography.</li>
                    <li><strong>DESIGN.md</strong> — a markdown-based design system from getdesign.md. A plain-text &ldquo;design system manifest&rdquo; for AI agents — like a README but for visual styling. Captures Claude&apos;s visual language in a format AI tools can consume directly. The starting point for code generation.</li>
                    <li><strong>Cowork screenshot</strong> — no Figma file, no design source, just a screenshot. The actual surface we&apos;re building in. Ground truth for layout, chrome, and context.</li>
                    <li><strong>TurboTax patterns via MCP</strong> — shipped widgets and components built for the Claude MCP app — real, not concepts. Transferred from claude.ai into CoWork via Figma MCP, so live components and tokens become queryable context with no exporting needed.</li>
                  </ul>

                  <h2>Step 2 — Prompt, set rules, iterate</h2>

                  <p>
                    Once context is loaded, the work becomes prompting and refining. The rules define three things: <strong>how each prototype behaves, where it lives, and what the design guardrails are.</strong> This keeps every generated output consistent and on-system — not one-offs.
                  </p>

                  <h2>Step 3 — Build and publish</h2>

                  <p>
                    The destination matters as much as the artifact. We wired it so:
                  </p>

                  <ul>
                    <li>Claude Code is connected to the Intuit GitHub repo</li>
                    <li>Every prototype gets pushed there automatically — no manual handoff</li>
                    <li>GitHub Pages turns each push into a live, shareable URL</li>
                    <li>Builds are visible to the whole team as they happen</li>
                  </ul>

                  <h2>The output</h2>

                  <p>
                    The inputs (sources, rules, templates) produced three things that compound:
                  </p>

                  <ul>
                    <li><strong>Prototypes</strong> — each spun up in minutes. Pre-wired with interactions, reasoning, streaming, established cards, and context. Change the scenario, not the system.</li>
                    <li><strong>Prototype index page</strong> — auto-populated as new prototypes are pushed. Tracks versions and divergent concepts in one place. Each card is a self-contained, clickable scenario.</li>
                    <li><strong>Card library</strong> — every new component lands here. Claude pulls from it before writing anything new. Pure render functions — drop into any prototype script to embed inline. The system gets smarter with every card added.</li>
                  </ul>

                  <h2>The loop, summarized</h2>

                  <ul>
                    <li><strong>Gather</strong> — sources, libraries, context</li>
                    <li><strong>Prompt / iterate</strong> — rules, generation, refinement</li>
                    <li><strong>Build / publish</strong> — GitHub, Pages, live URLs</li>
                    <li><strong>Share / align</strong> — test, learn, do it again</li>
                  </ul>

                  <blockquote>
                    &ldquo;The PE felt like it wouldn&apos;t take that long to actually build out what was in the prototype.&rdquo;
                    <br />
                    <span className={styles.blockquoteAttribution}>— Lily, AI Inc PM</span>
                  </blockquote>

                  <p>
                    That&apos;s the bar: a prototype convincing enough that a principal engineer sees a real product behind it. When that happens, the cross-functional conversation skips months of &ldquo;what would this even look like&rdquo; and lands directly on &ldquo;here&apos;s what we&apos;d need to harden to ship.&rdquo;
                  </p>
                </div>
                )}
              </div>
            </div>

            {/* Aside — Tools + Links */}
            <aside className={styles.resumeSidebar} aria-label="Case study resources">
              {/* Tools */}
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
                    <span className={styles.toolName}>Claude</span>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/cursor.svg" alt="Cursor" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Cursor</span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Links</h2>
                </div>
                <div className={styles.linkList}>
                  {/* Substack post */}
                  <a
                    href="https://robertritacca1.substack.com/p/designing-embedded-ai-experiences?r=1n9uct&utm_medium=ios&triedRedirect=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <Image src="/logos/substack.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>Read on Substack</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>Original post — same essay, longer form</span>
                    </div>
                  </a>

                  {/* Webby */}
                  <a
                    href="https://winners.webbyawards.com/2026/ai/ai-experiences-applications/financial-services/379906/turbotax-chatgpt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <span className={`material-symbols-rounded ${styles.linkIconSymbol}`} aria-hidden="true">
                      emoji_events
                    </span>
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>Webby Awards 2026</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>Winner — AI · Financial Services</span>
                      <span className={styles.linkSub}>People&apos;s Voice Winner — AI · Financial Services</span>
                    </div>
                  </a>

                  {/* ChatGPT Connector */}
                  <a
                    href="https://www.google.com/aclk?sa=L&pf=1&ai=DChsSEwju35THxNqTAxVcCK0GHbWDE-gYACICCAEQABoCcHY&co=1&ase=2&gclid=Cj0KCQjws83OBhD4ARIsACblj1_RyNAg9HoxIhUYNoCbJZq3hvX9jWCvvP0H_30xQU-VB0xqPvG8DgUaAjkfEALw_wcB&cid=CAASZeRodDRcVSleMQJ5SeiBiN6hFuX8rXJg72zg1J3rO9K4A2x3BQUSc1x8sAUP4EQXXqP_OftKiAEW8kDievYwcXhPpUYJDKilCmQ2934mYkU16C_hHYIQR_bbxTP_UBE_qzECB-vW&cce=2&category=acrcp_v1_32&sig=AOD64_2C-Qc_Rn5Zb6D5o-eY9CTtXVtvSQ&q&nis=4&adurl=https://chatgpt.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <Image src="/logos/ChatGPT.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>ChatGPT Connector</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>USA only</span>
                    </div>
                  </a>

                  {/* Claude Connector */}
                  <a
                    href="https://claude.ai/directory/connectors/intuit-turbotax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <Image src="/logos/Claude.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>Claude Connector</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>USA only</span>
                    </div>
                  </a>

                  {/* Intuit Blog */}
                  <a
                    href="https://blog.turbotax.intuit.com/tax-help/turbotax-on-claude-chatgpt-for-ai-tax-help-144205/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <Image src="/logos/Intuit.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>Intuit Blog</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                    </div>
                  </a>
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
