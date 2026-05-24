"use client";

import Image from "next/image";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  workSidebarLinks,
  "/work/intuit-agent-chat"
);

export default function IntuitAgentChatCaseStudy() {
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
            <h1 className={styles.pageTitle}>Intuit Agent Chat</h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            The official conversational AI platform for all of Intuit. Designed and built from 0 → 1.
          </p>

          {/* Hero video */}
          <figure className={`${styles.videoHero} animate-in animate-delay-2`}>
            <div className={styles.videoFrame}>
              <iframe
                src="https://www.youtube.com/embed/sJc0uKPVZew"
                title="Intuit Agent Chat — product walk-through"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={styles.videoIframe}
              />
            </div>
          </figure>

          {/* Two-column body */}
          <div className={`${styles.resumeLayout} animate-in animate-delay-3`}>
            <div className={styles.resumeMain}>
              <div className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Case study</h2>
                </div>

                <div className={styles.body}>
                  <h2>Context</h2>

                  <p>
                    Intuit operates four cornerstone brands — QuickBooks, TurboTax, Credit Karma, Mailchimp — serving 100M+ customers, with 600+ designers and 8,000+ developers building on a shared platform. GenUX is Intuit&apos;s AI agent development platform: the layer that delivers consistent, performant, scalable UX across every Intuit app and agentic experience. Agent Chat is the conversational surface that ships on top of it.
                  </p>

                  <p>
                    I led the design workstream for the web triad — design, engineering, and PM working as one team — across two fiscal years.
                  </p>

                  <h2>Problem</h2>

                  <p>
                    Intuit had no shared conversational-AI surface, so every domain team was rolling its own. The legacy assistive widget was losing adoption, and teams were rebuilding the same stack in parallel. Four root causes kept surfacing:
                  </p>

                  <ul>
                    <li><strong>Ownership constraints</strong> blocking domain workflow innovation</li>
                    <li><strong>Shallow help capabilities</strong> with weak domain responses</li>
                    <li><strong>Engineering trapped in maintenance</strong> instead of platform progress</li>
                    <li><strong>Rigid UI</strong> with no path to product-fit customization</li>
                  </ul>

                  <p>
                    Multiple teams were rushing to launch DFY agent experiences and independently building custom conversation stacks. The platform didn&apos;t have an answer, and the teams weren&apos;t willing to wait for one.
                  </p>

                  <h2>Approach</h2>

                  <p>
                    Co-facilitated workshops with 12+ teams and 40+ participants across business units. Three clear takeaways:
                  </p>

                  <ol className={styles.numberedList}>
                    <li>The company needed a single conversational AI / agentic platform — not another point solution.</li>
                    <li>Solving agentic workflows starts with <strong>better intent capture</strong> — open enough to explore, guided enough to act.</li>
                    <li>Scaling agentic experiences requires <strong>clear pattern guidelines</strong>, not just components.</li>
                  </ol>

                  <p>
                    The resulting vision was presented to CEO Staff at Tech Tuesday and scored unanimous 5&apos;s in a fist-of-five. Three pillars anchored it:
                  </p>

                  <ul>
                    <li><strong>No dead ends</strong> — every interaction has a next step</li>
                    <li><strong>End-to-end out of the box</strong> — usable on day one without bespoke build</li>
                    <li><strong>Extensible</strong> — domain teams can plug in their own UI without forking the widget</li>
                  </ul>

                  <h2>Solution</h2>

                  <p>
                    I designed and shipped a widget that&apos;s instantly themeable, highly customizable, and configurable — built once, deployed everywhere.
                  </p>

                  <p>
                    <strong>Themeable across every Intuit brand.</strong> One widget, tokenized for QuickBooks, TurboTax, and beyond.
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
                      alt="Threads — persistent multi-conversation state"
                      width={1080}
                      height={618}
                      unoptimized
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Threads — persistent multi-conversation state.
                    </figcaption>
                  </figure>

                  <p>
                    <strong>Capabilities shipped in v1 and v2</strong> — themeable, flexible layouts, threads, agent status &amp; reasoning, dynamic cards with renderer extensions, responsive panel, response actions, doc upload (PCI-compliant), 100% token coverage, and an Agent Typography Kit.
                  </p>

                  <p>
                    <strong>Mobile parity from day one.</strong> Web, iOS, and Android — not an afterthought.
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

                  <p>
                    <strong>Anchor use-case: Project Clarity.</strong> Stood up a mission team with the QuickBooks Business Intelligence team as the first major adoption of Intuit Agent Chat. The problem: customers were exporting QB data into third-party AI tools because QB didn&apos;t support analysis natively. The solution: the QB Analytics Agent, surfacing customer and business insights directly in QB through Agent Chat. Live in QBO to 200k+ customers.
                  </p>

                  <h2>The harder problem — governance</h2>

                  <p>
                    Two audiences with opposing incentives — domain teams who own workflows and platform teams who own oversight. Domain teams will circumvent if shared patterns don&apos;t meet their needs; platform teams resist losing control to centralized solutions. A lot of the work was coordination, not design: building trust, defining ownership, and creating an extension model that didn&apos;t ask either side to give up what they cared about.
                  </p>

                  <h2>Impact (as of Dec 2025)</h2>

                  <ul>
                    <li><strong>150 teams</strong> in end-to-end integration on the platform</li>
                    <li><strong>58 agents</strong> live in production — <strong>200%+ of FY26 adoption goal</strong></li>
                    <li><strong>3.8M</strong> monthly active users</li>
                    <li>Live in <strong>QuickBooks</strong> and <strong>TurboTax</strong></li>
                    <li><strong>2.8M</strong> Figma component instantiations in the last year</li>
                  </ul>

                  <p>
                    How we got there: focus and betting big on a single shared surface; benchmarking against the industry-best for conversational AI; obsessive iteration with customers and partner teams.
                  </p>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/intuit-agent-chat/design-system.png"
                      alt="Intuit Agent Chat — the design system at a glance"
                      width={1920}
                      height={1080}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Intuit Agent Chat — the design system at a glance.
                    </figcaption>
                  </figure>

                  <p className={styles.footnote}>
                    <em>Photos and names of individual teammates have been removed from this case study. The work was a cross-functional effort — product development, design, PM, program management, and accessibility — across both web and mobile.</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Right rail — details */}
            <aside className={styles.resumeSidebar} aria-label="Case study details">
              <div className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Details</h2>
                </div>
                <div className={styles.detailList}>
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
                    <span className={styles.detailValue}>150 teams · 58 agents · 3.8M MAU</span>
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
