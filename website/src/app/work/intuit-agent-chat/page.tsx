"use client";

import Image from "next/image";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SampleCaseStudyCard from "../../../components/SampleCaseStudyCard/SampleCaseStudyCard";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  workSidebarLinks,
  "/work/intuit-agent-chat"
);

export default function IntuitAgentChatCaseStudy() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          {/* Page header */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Intuit Agent Chat platform</h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            The conversational AI platform for all of Intuit. Designed from 0 → 1: now 70+ agents in production, ~50M sessions served, and growing.
          </p>

          {/* Hero video */}
          <figure className={`${styles.videoHero} animate-in animate-delay-2`}>
            <div className={styles.videoFrame}>
              <iframe
                src="https://www.youtube.com/embed/sJc0uKPVZew"
                title="Intuit Agent Chat product walk-through"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={styles.videoIframe}
              />
            </div>
          </figure>

          {/* Two-column body */}
          <div className={`${styles.resumeLayout} animate-in animate-delay-3`}>
            <div className={styles.resumeMain}>
              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Case study</h2>
                </div>

                <article className={styles.body}>
                  <h2 id="context">Context</h2>

                  <p>
                    Intuit operates four cornerstone brands (QuickBooks, TurboTax, Credit Karma, Mailchimp) serving 100M+ customers, with 600+ designers and 8,000+ developers building on a shared platform. GenUX is Intuit&apos;s AI agent development platform: the layer that gives every Intuit app and agentic experience consistent, performant UX at scale. Intuit Agent Chat is the white-labelled conversational surface that ships on top of it; Intuit Intelligence is the brand customers see.
                  </p>

                  <p>
                    I led design as the principal IC: the lead designer on a cross-functional team of 15 web engineers, 10 mobile engineers, technical program management, PM, and four other designers, across two fiscal years and still shipping.
                  </p>

                  <h2 id="problem">Problem</h2>

                  <p>
                    Intuit had no shared conversational-AI surface, so every domain team was rolling its own. The legacy assistive widget was losing adoption, and teams were rebuilding the same stack in parallel. Four root causes kept surfacing:
                  </p>

                  <ul>
                    <li><strong>Ownership constraints</strong> blocking domain workflow innovation</li>
                    <li><strong>Shallow help capabilities</strong> with weak domain responses</li>
                    <li><strong>Engineering trapped in maintenance</strong> instead of platform progress</li>
                    <li><strong>Rigid UI</strong> with no path to product-fit customisation</li>
                  </ul>

                  <p>
                    Multiple teams were rushing to launch DFY agent experiences and independently building custom conversation stacks. The platform didn&apos;t have an answer, and the teams weren&apos;t willing to wait for one.
                  </p>

                  <h2 id="approach">Approach</h2>

                  <p>
                    Co-facilitated workshops with 12+ teams and 40+ participants across business units. Three clear takeaways:
                  </p>

                  <ol className={styles.numberedList}>
                    <li>The company needed a single conversational AI / agentic platform, not another point solution.</li>
                    <li>Solving agentic workflows starts with <strong>better intent capture</strong>: open enough to explore, guided enough to act.</li>
                    <li>Scaling agentic experiences requires <strong>clear pattern guidelines</strong>, not just components.</li>
                  </ol>

                  <p>
                    The resulting vision was presented to CEO Staff at Tech Tuesday and scored unanimous 5&apos;s in a fist-of-five. Three pillars anchored it:
                  </p>

                  <ul>
                    <li><strong>No dead ends</strong>: every interaction has a next step</li>
                    <li><strong>End-to-end out of the box</strong>: usable on day one without bespoke build</li>
                    <li><strong>Extensible</strong>: domain teams can plug in their own UI without forking the widget</li>
                  </ul>

                  <p>
                    We didn&apos;t wait for the perfect spec. A working MVP shipped in 4 months, in time for GED (Intuit&apos;s company-wide hackathon), and 40+ teams started experimenting with it immediately. Swapping a quarterly release cadence for a monthly one kept the momentum visible, and grew an organic community of 600+ developers around the platform.
                  </p>

                  <h2 id="solution">Solution</h2>

                  <p>
                    I designed and shipped a widget any Intuit product can theme, customise, and configure: built once, deployed everywhere.
                  </p>

                  <p>
                    <strong>Themeable across every Intuit brand.</strong> One widget, tokenised for QuickBooks, TurboTax, and beyond.
                  </p>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/intuit-agent-chat/themeable-brands.png"
                      alt="Themeable: QuickBooks and TurboTax brand examples side by side"
                      width={1920}
                      height={1080}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Themeable: QuickBooks and TurboTax brand examples side by side.
                    </figcaption>
                  </figure>

                  <p>
                    <strong>Flexible layouts and persistent threads.</strong> The chat panel adapts from compact rail to responsive immersive view; threads keep multi-conversation state across sessions.
                  </p>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/intuit-agent-chat/threads.gif"
                      alt="Threads: persistent multi-conversation state"
                      width={1080}
                      height={618}
                      unoptimized
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Threads: persistent multi-conversation state.
                    </figcaption>
                  </figure>

                  <p>
                    <strong>Extensible, backend-driven cards.</strong> Domain teams needed to ship new response content without waiting on our release schedule. So cards render from data, not code: teams compose a response at runtime from our base components (inputs, lists, actions) or drop in fully custom content, and it ships the moment their backend sends it.
                  </p>

                  <p>
                    <strong>Confirm before acting.</strong> Once agents could take real actions instead of just answering, we needed a moment where the user could see exactly what was about to happen and approve it. Structured confirmation cards became the pattern for anything an agent proposed to do on the user&apos;s behalf. They turn &ldquo;the agent did something&rdquo; into &ldquo;I told it to.&rdquo;
                  </p>

                  <p>
                    <strong>Capabilities shipped in v1 and v2</strong>: themeable, flexible layouts, threads, dynamic welcome flows, agent status &amp; reasoning, citations and follow-up suggestions, extensible cards, human-in-the-loop confirmations, responsive panel, response actions, PII-safe doc upload (PCI-compliant), 100% token coverage, and an Agent Typography Kit.
                  </p>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/intuit-agent-chat/widget-anatomy.png"
                      alt="Intuit Agent Chat widget anatomy"
                      width={1920}
                      height={1080}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Widget anatomy: the building blocks behind every deployment.
                    </figcaption>
                  </figure>

                  <p>
                    <strong>Handoff without repeating yourself.</strong> When an agent hit its limit, the conversation needed to become a live expert conversation without the customer starting over. We built the handoff to carry full conversation context to the expert side, so the transfer feels like the same conversation continuing, not a new one starting.
                  </p>

                  <p>
                    <strong>Mobile parity from day one.</strong> Web, iOS, and Android, not an afterthought.
                  </p>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/intuit-agent-chat/mobile-parity.png"
                      alt="Mobile Web, Native iOS & Android"
                      width={1920}
                      height={1080}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Mobile Web, Native iOS, and Native Android.
                    </figcaption>
                  </figure>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/intuit-agent-chat/agent-parts.png"
                      alt="Intuit Agent Chat annotated widget parts"
                      width={1920}
                      height={1080}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Every surface, labelled: the parts behind every Agent Chat deployment.
                    </figcaption>
                  </figure>

                  <p>
                    The next problem is already in motion: giving agents access to what&apos;s actually on a user&apos;s screen and the ability to act within it, not just describe what to do in a text box.
                  </p>

                  <h2 id="in-production">In production</h2>

                  <p>
                    Agent Chat is the foundational widget behind every AI experience across Intuit. Two major brands launched in year one, with more in flight.
                  </p>

                  <h3 id="quickbooks">QuickBooks</h3>

                  <p>
                    <strong>Started with Project Clarity</strong>: a mission team embedded with the QuickBooks Business Intelligence org. Customers were exporting QB data into third-party AI tools because QuickBooks didn&apos;t support analysis natively. The QB Analytics Agent changed that: ask about your revenue, profit and loss, cash flow, and payroll directly in the product. Launched to 200k+ customers under the <a href="https://quickbooks.intuit.com/intuit-intelligence/" target="_blank" rel="noopener noreferrer">Intuit Intelligence</a> brand.
                  </p>

                  <p>
                    Early success opened the way to rapid adoption across the full product. Agent Chat expanded into payroll, project management, and more: every major workflow in QuickBooks now has an agent surface built on the same widget.
                  </p>

                  <h3 id="turbotax">TurboTax</h3>

                  <p>
                    Multiple agent use cases live in production: the <strong>Deductions &amp; Credits Agent</strong> surfaces personalised opportunities during filing; the <strong>Explanations Agent</strong> answers &ldquo;what does this mean?&rdquo; for any line item; and the <strong>Digital Assistant</strong> guides customers through the full filing workflow. All powered by Agent Chat.
                  </p>

                  <h2 id="the-harder-problem-governance">The harder problem: governance</h2>

                  <p>
                    Two audiences with opposing incentives: domain teams who own workflows and platform teams who own oversight. Domain teams will circumvent if shared patterns don&apos;t meet their needs; platform teams resist losing control to centralised solutions. A lot of the work was coordination, not design: building trust, defining ownership, and creating an extension model that didn&apos;t ask either side to give up what they cared about.
                  </p>

                  <h2 id="impact">Impact</h2>

                  <ul>
                    <li><strong>70+ agents</strong> live in production across TurboTax, QuickBooks, Mailchimp, and internal developer teams</li>
                    <li><strong>~50M sessions</strong> served in production</li>
                    <li><strong>Company-wide standard</strong>: unanimous executive vote to standardise as the default platform</li>
                    <li><strong>~10 months</strong> from zero to product-market fit</li>
                    <li><strong>600+ developer community</strong>, organic adoption that converted into committed migration</li>
                    <li><strong>2.8M</strong> Figma component instantiations in the last year</li>
                  </ul>

                  <p>
                    How we got there: focus and betting big on a single shared surface; benchmarking against the industry-best for conversational AI; obsessive iteration with customers and partner teams.
                  </p>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/intuit-agent-chat/design-system.png"
                      alt="Intuit Agent Chat: the design system at a glance"
                      width={1920}
                      height={1080}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Intuit Agent Chat: the design system at a glance.
                    </figcaption>
                  </figure>

                </article>
              </section>
            </div>

            {/* Right rail — details */}
            <aside className={styles.resumeSidebar} aria-label="Case study details">
              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Details</h2>
                </div>
                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Company</span>
                    <span className={styles.detailValue} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Image src="/logos/Intuit.svg" alt="" width={20} height={20} style={{ objectFit: "contain", flexShrink: 0 }} />
                      <span>Intuit</span>
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Role</span>
                    <span className={styles.detailValue}>Principal Product Designer · GenUX Web Triad</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Timeline</span>
                    <span className={styles.detailValue}>FY25 – FY26</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Platform</span>
                    <span className={styles.detailValue}>Responsive Web · Native iOS · Native Android</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Status</span>
                    <span className={`${styles.detailValue} ${styles.statusLive}`}>
                      <span className={styles.statusDot} aria-hidden="true" />
                      Live in QuickBooks and TurboTax
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Reach</span>
                    <span className={styles.detailValue}>70+ agents · ~50M sessions · 600+ developers</span>
                  </div>
                </div>
              </section>

              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Tools</h2>
                </div>
                <div className={styles.toolList}>
                  <div className={styles.toolItem}>
                    <Image src="/logos/Claude.svg" alt="Claude" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Claude</span>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/Figma.svg" alt="Figma" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Figma</span>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/cursor.svg" alt="Cursor" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Cursor</span>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          <SampleCaseStudyCard />
        </main>
      </div>

    </>
  );
}
