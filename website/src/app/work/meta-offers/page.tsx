"use client";

import Image from "next/image";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import SampleCaseStudyCard from "../../../components/SampleCaseStudyCard/SampleCaseStudyCard";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(workSidebarLinks, "/work/meta-offers");

const peerFeedback = [
  {
    quote:
      "Extremely collaborative and thoughtful. Wrangled and incorporated feedback from a large and disparate group of cross-functional partners, filtering signal through noise to incorporate the feedback that really mattered.",
    role: "PM",
  },
  {
    quote:
      "Had impact not just in his own work but by multiplying the impact I was able to have. Collected requirements without being asked, sped up delivery.",
    role: "SWE",
  },
  {
    quote:
      "Provides design mocks paying attention to the smallest details; turnaround is usually very fast, enabling the team to move fast.",
    role: "SWE",
  },
  {
    quote:
      "Did an amazing job leading design validation sessions with recruiters and the compensation team — presenting the new flow, gathering feedback, and quickly iterating.",
    role: "PMM",
  },
  {
    quote:
      "When engineers proposed leaving some design changes for v2, immediately raised the UX risk and influenced the team to land them in v1.",
    role: "PM",
  },
];

export default function MetaOffersCaseStudy() {
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
            <h1 className={styles.pageTitle}>Offer Creation Flow</h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Improving the velocity between hire decision and offer extension at recruiting scale.
          </p>

          {/* Hero image */}
          <figure className={`${styles.cover} animate-in animate-delay-2`}>
            <Image
              src="/images/heroes/meta-offers.png"
              alt="Offer Creation Flow — hero"
              width={1920}
              height={1080}
              priority
              className={styles.coverImage}
            />
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
                    Meta&apos;s recruiting engine, in raw numbers: <strong>8,000 recruiters, 10 million candidates, 60,000 offers, 50,000 target hires.</strong> The Recruiting Products portfolio spans Application → Pre-screen → Screen → Full loop → <strong>Offer</strong> → Pre-hire, across two surfaces: the Meta Career Site + Candidate Profile (for candidates and new hires) and the Recruiter ATS (for sourcers and recruiters).
                  </p>

                  <p>
                    I was on the Offers team inside Recruiting Products, partnering with the Compensation Analysis team and a panel of 30+ recruiters and 3 comp analysts acting as SMEs.
                  </p>

                  <h2 id="problem">Problem</h2>

                  <p>Two types of offers, very different velocity profiles:</p>

                  <ul>
                    <li><strong>Standard offers</strong> — ~40% of accepted offers. No comp approval required. Can extend in <strong>one business day</strong>. Lower overall comp ceiling.</li>
                    <li><strong>Above-band / negotiation offers</strong> — ~60% of accepted offers. Candidate must provide evidence. Comp approval required. Extended <strong>5–13× slower</strong>. Higher overall comp ceiling.</li>
                  </ul>

                  <p>
                    Slow offer-extension velocity correlated with declining acceptance rates, weaker candidate sentiment, and worse recruiter performance — all of it amplified by massive hiring volume.
                  </p>

                  <p><strong>Six reasons it was slow:</strong></p>

                  <ul>
                    <li>Compensation is genuinely complex</li>
                    <li>Recruiters weren&apos;t great at collecting comp data</li>
                    <li>Candidates withheld important info</li>
                    <li>Recruiter tooling was poor — missing fields, unstructured input</li>
                    <li>Compliance guidelines were unclear</li>
                    <li>For comp analysts: proposals lacked detailed evidence and unstructured prose was hard to parse</li>
                  </ul>

                  <p>
                    To make the parsing problem concrete: two recruiters writing about the same candidate would produce wildly different free-text notes. A comp analyst then had to reconstruct structured fields — base salary, target bonus %, unvested equity, forfeited cash — from prose. Multiplied across thousands of offers, this produced <strong>repeating rejection loops</strong>: comp asks for more info, recruiter resubmits, comp asks again.
                  </p>

                  <h2 id="approach">Approach</h2>

                  <p>
                    The objective was specific and measurable: improve velocity between hire-decision and offer extension by <strong>(1)</strong> increasing the volume, quality, and consistency of captured data, <strong>(2)</strong> reducing average comp approval time, and <strong>(3)</strong> reducing the number of comp requests.
                  </p>

                  <p>
                    User-tested an early prototype with 30+ recruiters. The signal was clear: they liked the higher level of capture detail, but the prototype produced information overload and missed the nuance of individual candidate scenarios. The redesign needed to be <strong>structured enough to be parseable, flexible enough to capture nuance.</strong>
                  </p>

                  <h2 id="solution">Solution</h2>

                  <p>A redesigned end-to-end Offer Creation Flow, built on a handful of specific changes.</p>

                  <p>
                    <strong>One-click standard offer extension.</strong> Default to a Standard Offer draft and require an intentional selection to enter the custom (above-band) flow. This cleanly separated the fast path from the slow path so recruiters stopped accidentally routing simple offers through approval.
                  </p>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/meta-offers/comp-capture-modal.png"
                      alt="Compensation capture — one structured modal per data type, with inline validation"
                      width={1920}
                      height={1080}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Compensation capture — one structured modal per data type, with inline validation.
                    </figcaption>
                  </figure>

                  <p>
                    <strong>Required, validated competing data.</strong> Where the old flow accepted free-form prose, the new flow enforced structured input with validation. A blank field could mean &ldquo;0%&rdquo;, &ldquo;didn&apos;t disclose&rdquo;, or &ldquo;not given by company&rdquo; — each ambiguity used to trigger a comp follow-up. With validation, that whole category of ambiguity disappeared.
                  </p>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/meta-offers/structured-vs-prose.png"
                      alt="From unvalidated prose to structured, validated comp capture"
                      width={1920}
                      height={1080}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      From unvalidated prose to structured, validated comp capture.
                    </figcaption>
                  </figure>

                  <p>
                    <strong>Tailored capture by data type, with in-UI definitions.</strong> Each compensation data type had its own purpose-built input and inline definitions of key terms, so recruiters captured only what was relevant and used consistent language with candidates.
                  </p>

                  <p>
                    <strong>Validation against the proposal.</strong> Competing data was now checked against the compensation proposal — ensuring proposals aligned with submitted evidence and removing whole classes of rejection loops.
                  </p>

                  <p>
                    <strong>Downstream effect on comp analysts.</strong> Clean, structured data flowed into the Compensation Analyst Dashboard so analysts could act on consistent inputs instead of parsing prose.
                  </p>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/meta-offers/design-matrix.png"
                      alt="End-to-end design matrix — every comp data type, every scenario"
                      width={1920}
                      height={1080}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      End-to-end design matrix — every comp data type, every scenario.
                    </figcaption>
                  </figure>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/meta-offers/comp-definitions.png"
                      alt="Structured compensation definitions — every field has a type, allowed values, and an in-UI definition"
                      width={1920}
                      height={1080}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Structured compensation definitions — every field has a type, allowed values, and an in-UI definition.
                    </figcaption>
                  </figure>

                  <p>
                    <strong>Pre-launch rigor.</strong> Ran dogfooding with 30+ recruiters using real offers; led Design QA flagging critical UX/UI issues; collaborated with content design and saw through compliance reviews.
                  </p>

                  <h2 id="impact-launched-july-2022-to-8k-users">Impact (launched July 2022 to 8k+ users)</h2>

                  <ul>
                    <li><strong>9%</strong> improvement to the overall velocity between hire-decision and offer extension</li>
                    <li><strong>51%</strong> increase in volume of captured data</li>
                    <li><strong>23.7%</strong> reduction in average compensation approval time</li>
                    <li><strong>12.2%</strong> reduction in overall compensation approval requests</li>
                  </ul>

                  <h2 id="selected-peer-feedback-anonymized">Selected peer feedback (anonymized)</h2>

                  <div className={styles.peerQuotes}>
                    {peerFeedback.map((q, i) => (
                      <blockquote key={i} className={styles.peerQuote}>
                        <p className={styles.peerQuoteText}>&ldquo;{q.quote}&rdquo;</p>
                        <footer className={styles.peerQuoteFooter}>— {q.role}</footer>
                      </blockquote>
                    ))}
                  </div>

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
                      <Image src="/logos/meta.svg" alt="" width={20} height={20} style={{ objectFit: "contain", flexShrink: 0 }} />
                      <span>Meta</span>
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Role</span>
                    <span className={styles.detailValue}>Product Designer · Recruiting Products — Offers team</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Location</span>
                    <span className={styles.detailValue}>Meta, San Francisco</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Status</span>
                    <span className={`${styles.detailValue} ${styles.statusLive}`}>
                      <span className={styles.statusDot} aria-hidden="true" />
                      Live since July 2022
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Platform</span>
                    <span className={styles.detailValue}>Responsive Web</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Users</span>
                    <span className={styles.detailValue}>8,000+ recruiters · 60+ comp analysts · all Meta candidates</span>
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
                </div>
              </section>
            </aside>
          </div>

          <SampleCaseStudyCard />
        </main>
      </div>

      <Footer />
    </>
  );
}
