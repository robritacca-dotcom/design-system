"use client";

import Image from "next/image";
import Link from "next/link";
import { CoverImage } from "@/components/covers/CoverImage";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SampleCaseStudyCard from "../../../components/SampleCaseStudyCard/SampleCaseStudyCard";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  workSidebarLinks,
  "/work/meta-offers-expanded"
);

const IMG = "/images/meta-offers-expanded";

/** One inline figure: image or animated gif, plus its caption. */
function Fig({
  src,
  alt,
  width,
  height,
  caption,
  animated = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: React.ReactNode;
  animated?: boolean;
}) {
  return (
    <figure className={styles.figure}>
      <Image
        src={`${IMG}/${src}`}
        alt={alt}
        width={width}
        height={height}
        unoptimized={animated}
        className={styles.figureImage}
      />
      <figcaption className={styles.figureCaption}>{caption}</figcaption>
    </figure>
  );
}

const peerFeedback = [
  {
    quote:
      "Rob is an extremely collaborative and thoughtful coworker. As part of the project, Rob wrangled and incorporated feedback from a large and disparate group of cross-functional partners, filtering the signal through the noise to incorporate the feedback that really mattered into the designs.",
    role: "Product Manager, Recruiting Products",
  },
  {
    quote:
      "Rob is an XFN partner that has had impact not just in his own work but by multiplying the amount of impact that I was able to have. He collected requirements, something I would have normally had to do, without being asked, so it sped up the time for delivering.",
    role: "Software Engineer, Offers team",
  },
  {
    quote:
      "Rob provides design mocks paying attention to the smallest details and turnaround is usually very fast, which enables the team to move fast. Proactively surveying recruiters in his own research sessions helped shape the project from the beginning.",
    role: "Software Engineer, Offers team",
  },
  {
    quote:
      "For the new streamlined compensation capture flow, Robert did an amazing job leading the design validation sessions with recruiters and the compensation team, presenting the new flow, gathering feedback, and quickly working on iterating the designs.",
    role: "Product Marketing Manager",
  },
  {
    quote:
      "During one of the meetings the engineers proposed to leave some of the design changes for a version 2 of the launch. Leaving those for version 2 would result in a poor user experience. Robert immediately brought up that risk and was able to influence the engineers to work on the changes for version 1.",
    role: "Product Manager",
  },
];

export default function MetaOffersExpandedCaseStudy() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          {/* Page header */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Structured compensation capture</h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Turning free-text compensation notes into structured, validated data, and cutting average approval time by 23.7% for a recruiting org of thousands.
          </p>

          {/* Hero image */}
          <figure className={`${styles.cover} animate-in animate-delay-2`}>
            <CoverImage
              href="/work/meta-offers"
              aspect="wide"
              className={styles.coverImage}
              priority
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
                    Every job offer at Meta falls into one of two buckets. If the proposal sits inside the standard compensation range, it can be extended almost immediately, often within a single business day. If it goes above the range, it needs compensation approval, with justification. In a typical year thousands of offers needed at least one approval, and a meaningful share needed two or more, stretching what should have been days into more than a week.
                  </p>

                  <p>
                    That delay is the most expensive kind of slow. By the offer stage the company has already paid for the entire funnel: sourcing, screens, full loops, debriefs. And the offer is the point where all of that can still be lost. Roughly one in five Meta offers ended in a decline, which at this volume is thousands of candidates a year walking away at the very end of a process the company had already paid for in full.
                  </p>

                  <p>
                    That is why the offer got so much investment. Every decline is a funnel rerun, so the work of finding the right offer for a candidate, and getting it in front of them while they are still deciding, pays for itself many times over. Slow extensions correlate with lower acceptance rates, worse candidate sentiment, and recruiters missing their own performance metrics. Meta bet on both ends of that problem in the same period: this project attacked how fast a well-supported offer could be built and approved, while <Link href="/work/meta-immersive-offers" className={styles.inlineLink}>Immersive Offers</Link> attacked how the offer itself was delivered to the candidate.
                  </p>

                  <p>
                    All of it was about to be amplified by the scale of Meta&apos;s hiring ambitions: thousands of recruiters, millions of candidates, tens of thousands of offers, and a hiring target in the tens of thousands for 2022 alone.
                  </p>

                  <p>
                    I was the product designer for the Recruiting Products Offers team, the team that owns everything between hire decision and a signed offer letter. Structured compensation capture was our P0 for H1 2022.
                  </p>

                  <p><strong>The dimensions of the problem:</strong></p>

                  <ul>
                    <li>A P0 for H1 2022, spanning multiple orgs</li>
                    <li>Core team: 1 product designer (me), 1 PM, 1 PMM, 1 researcher, 1 data scientist, 1 content designer, 6 engineers</li>
                    <li>Partner teams: the Compensation Analysis team (PM, designer, engineer and comp analyst SMEs) and the recruiting business (a leadership stakeholder and 30+ recruiter SMEs)</li>
                    <li>Three very different user types with competing needs, meeting inside one flow</li>
                  </ul>

                  <Fig
                    src="product-career-profile.png"
                    alt="Meta's Career Site and Candidate Profile"
                    width={2048}
                    height={1945}
                    caption="The candidate-facing surface: Meta's Career Site and Candidate Profile."
                  />

                  <Fig
                    src="product-ats-offer-draft.png"
                    alt="The recruiter-facing ATS, showing an offer draft"
                    width={2048}
                    height={1456}
                    caption="The recruiter-facing surface: the internal ATS where offers are drafted, approved, and extended. All candidate data shown across these mocks is fictional."
                  />

                  <h2 id="research">The research</h2>

                  <p>
                    I started by mapping the offer stage end to end. The velocity data told a stark story. A standard offer could be extended in about a business day, an offer requiring comp approval took days, and one requiring multiple approvals took over a week. Working with our data scientist, I blueprinted the path from hire decision to signed offer letter across candidate, touchpoint, front stage, tooling, pains, and opportunities.
                  </p>

                  <Fig
                    src="journey-map-offer-stage.png"
                    alt="Journey map of the offer stage, from hire decision to signed letter"
                    width={2048}
                    height={1151}
                    caption="The offer-stage map: hire decision, team matching, offer extend, acceptance, signed letter, with pains and opportunities at every phase. Cycle-time figures redacted."
                  />

                  <Fig
                    src="concept-offer-velocity.png"
                    alt="Concept chart: offer velocity against acceptance rate"
                    width={1500}
                    height={844}
                    caption="The core dynamic: every additional comp proposal round pushes offer extension velocity down, and acceptance rates fall with it."
                  />

                  <h2 id="tension">The tension at the centre</h2>

                  <p>
                    Three user types collide at this moment, and they all want the same thing. The candidate wants the job. The recruiter wants the accept. The comp analyst wants an offer that is defensible and lands. A signed offer is the one outcome all three are measured on.
                  </p>

                  <p>
                    They pull in opposite directions to get there. Candidates disclose as little as they can and optimise for maximum earnings, because what they withhold is leverage. Recruiters optimise for processing speed and accepts, so they take what the conversation gives them and move. Comp analysts work formulaically from data, and cannot approve what they cannot verify. Each of those behaviours is rational on its own. Put them in one flow and they produce a queue nobody intends.
                  </p>

                  <Fig
                    src="diagram-three-user-types.png"
                    alt="Venn diagram of candidate, recruiter, and compensation analyst needs"
                    width={1500}
                    height={844}
                    caption="The same goal, three different routes to it. Candidates provide less information and optimise for maximum earnings. Recruiters optimise processing for offer accepts. Comp analysts determine compensation through a data-based, formulaic approach. A signed offer lives at the intersection, and only at the intersection."
                  />

                  <p>
                    That is what made this a design problem rather than a form problem. A form serves one user. This flow had to make a candidate comfortable disclosing, make a recruiter faster for doing it properly rather than slower, and let an analyst trust the result without a follow-up. Optimise for any one of the three and it fails the other two. Ask the candidate for everything and the recruiter loses the room. Ask for nothing and the analyst sends it back. Every later decision, what to require, what to validate, what to define in place, and what to ask only when relevant, was a judgement about where in that triangle to spend the effort.
                  </p>

                  <Fig
                    src="diagram-offer-scenarios.png"
                    alt="Scenario A, a standard offer, next to scenario B, an above-band offer"
                    width={1500}
                    height={844}
                    caption="Scenario A, the standard offer, is about 40% of accepted offers: no approval, out in as fast as one business day. Scenario B, above band, is about 60%: evidence required, approval required, extended on average 5 to 13 times slower."
                  />

                  <p>
                    <strong>Why was it so slow?</strong> Compensation is genuinely complex. Recruiters were not comp experts, candidates withheld important information, and compliance guidelines were unclear. The tooling made it worse: missing fields, no validation, and at the heart of it a single free-form notes box where recruiters typed everything they knew about a candidate&apos;s current and competing compensation.
                  </p>

                  <Fig
                    src="before-approval-request-form.png"
                    alt="The old approval request form: a free-text notes box"
                    width={674}
                    height={472}
                    caption="The before: a free-text notes box with a checklist of questions recruiters were meant to answer from memory. Approver names redacted."
                  />

                  <Fig
                    src="before-unvalidated-comp-form.png"
                    alt="The old compensation capture form, with unvalidated fields"
                    width={840}
                    height={812}
                    caption="Fields existed, but nothing was validated. An empty input could mean 0%, did not disclose, or none given by company. Each ambiguity triggered a request for more information."
                  />

                  <p>
                    Consider what a comp analyst had to work with. Two recruiters describing the <em>same</em> candidate would write two completely different paragraphs, with different facts, different omissions, and different formats, which an analyst then had to parse by hand into the fields they actually needed.
                  </p>

                  <Fig
                    src="example-unstructured-vs-parsed.png"
                    alt="Two free-text candidate descriptions beside the structured fields extracted from them"
                    width={1500}
                    height={844}
                    caption="Two free-text descriptions of the same illustrative candidate, and the structured fields the analyst has to extract from them. Every gap becomes a follow-up question."
                  />

                  <p>
                    When the data did not hold up, the proposal bounced. The analyst requested more information, the recruiter went back to the candidate, the candidate responded, and the proposal re-entered the queue. A repeating rejection loop, with the candidate waiting at the end of it.
                  </p>

                  <Fig
                    src="diagram-rejection-loop.png"
                    alt="Diagram of the repeating rejection loop between candidate, recruiter, and comp partner"
                    width={2048}
                    height={696}
                    caption="The repeating rejection loop between candidate, recruiter, and comp partner. Every cycle adds days to the offer."
                  />

                  <h2 id="approach">Solving the problem</h2>

                  <p>
                    I led rounds of requirement gathering between the engineers, recruiters, and comp analysts, and aligned the group on four goals: increase offer extension velocity, reduce requests for additional information, increase request consistency, and improve request analytics through structured data. We carried a bonus objective too, raising the design quality of the surface by implementing our internal design system.
                  </p>

                  <Fig
                    src="process-requirements-board.png"
                    alt="FigJam board from requirement gathering, with story-mapped themes and epics"
                    width={2048}
                    height={1100}
                    caption="The project board from requirement gathering: story-mapped themes, epics, and capture dimensions (company, role, salary, sign-on, equity) built with recruiters and comp analysts."
                  />

                  <Fig
                    src="process-discovery-doc.png"
                    alt="Pages from the discovery document"
                    width={2048}
                    height={1826}
                    caption="The discovery doc I partnered on: problem statement, baseline statistics, pain points, and solution options, each scored by risk and expected impact."
                  />

                  <p>
                    Recruiters are not comp experts, and candidates use different words for the same thing. So we wrote a shared vocabulary, with precise definitions for every capture field, from equity types to forfeited-cash categories, that would later be embedded directly into the UI.
                  </p>

                  <Fig
                    src="process-definitions-table.png"
                    alt="Table of structured compensation definitions"
                    width={536}
                    height={641}
                    caption="Structured compensation definitions: every field, its input type, and its plain-language definition. One consistent language for recruiters, candidates, and analysts."
                  />

                  <p>From there I produced a series of prototypes that evolved through user feedback.</p>

                  <Fig
                    src="process-design-iterations.png"
                    alt="Composite of design iterations, from a dense capture table to a guided flow"
                    width={1500}
                    height={844}
                    caption="Iterations along the way: from a dense spreadsheet-style capture table to a guided, dynamic flow."
                  />

                  <Fig
                    src="research-survey-results.png"
                    alt="Chart of validation survey results from recruiters"
                    width={949}
                    height={559}
                    caption="Validation: I ran design validation sessions and a survey with recruiters. The large majority rated the new flow fast, clear, and easy to use, and the detractor themes, information overload and nuance capture, drove the next iteration."
                  />

                  <p>
                    The testing surfaced a real tension. Recruiters liked the high level of capture detail, but flagged information overload and worried that a rigid form could not capture the nuance of every candidate scenario. The answer was a <em>dynamic</em> flow: ask only what is relevant, educate as you go, and validate everything.
                  </p>

                  <h2 id="solution">The solution</h2>

                  <p>Each change was grounded in a rationale the whole team could point to.</p>

                  <Fig
                    src="flow-one-click-extension.gif"
                    alt="One-click extension of a standard offer draft"
                    width={1799}
                    height={1279}
                    animated
                    caption="Enabled 1-click offer extension with a default standard offer draft. Less friction means faster extensions and improved acceptance rates."
                  />

                  <Fig
                    src="flow-intentional-custom-offer.gif"
                    alt="Selecting the custom offer path deliberately"
                    width={1799}
                    height={1280}
                    animated
                    caption="Required intentional selection to start the custom offer flow. Standard and custom paths are cleanly separated, which improved process clarity."
                  />

                  <Fig
                    src="flow-competing-data-required.gif"
                    alt="Competing compensation data enforced before an above-band proposal proceeds"
                    width={1799}
                    height={1280}
                    animated
                    caption="Enforced submission of competing data before an above-band proposal can proceed, which reduces unsupported submissions."
                  />

                  <Fig
                    src="flow-structured-comp-capture.gif"
                    alt="The structured, dynamic compensation capture flow"
                    width={1799}
                    height={1280}
                    animated
                    caption="The centrepiece: a structured, dynamic comp capture flow. Better data quality and consistency, and a 51% increase in validated comp data."
                  />

                  <Fig
                    src="mock-comp-capture-salary-bonus.png"
                    alt="Salary and bonus capture step, with validated inputs"
                    width={1296}
                    height={1352}
                    caption="Every input validated: bonus captured as a target percent or a fixed value, with explicit not offered, did not disclose, and undisclosed states, so an empty field can never be ambiguous again."
                  />

                  <Fig
                    src="mock-comp-capture-equity.png"
                    alt="Equity capture step, broken into guided sub-steps"
                    width={1300}
                    height={1470}
                    caption="Equity, the hardest data to capture and the biggest source of analyst follow-ups, broken into guided steps: RSUs against options, vesting in the next 12 months, forfeited value."
                  />

                  <Fig
                    src="mock-tailored-capture-grid.png"
                    alt="Grid of tailored capture paths by compensation data type"
                    width={1456}
                    height={1287}
                    caption="Tailored capture by data type: current compensation, counter offers, candidate expectations, and competing initial and counter offers each get their own path. Recruiters only see what applies."
                  />

                  <Fig
                    src="mock-definitions-in-ui.png"
                    alt="Compensation definitions and sub-labels embedded in the capture UI"
                    width={1800}
                    height={1280}
                    caption="Definitions and sub-labels embedded directly in the UI. Educating recruiters at the source reinforced consistent language with candidates."
                  />

                  <Fig
                    src="flow-proposal-validated.gif"
                    alt="Competing data validated against the compensation proposal"
                    width={1799}
                    height={1280}
                    animated
                    caption="Competing data validated against the proposal itself, so proposals align with the evidence submitted. This contributed to a double-digit percentage reduction in comp submissions."
                  />

                  <Fig
                    src="after-structured-data-ats.png"
                    alt="Structured compensation data displayed in the ATS offer draft"
                    width={1798}
                    height={1277}
                    caption="The after: high-quality, structured data flowing into the offer draft."
                  />

                  <Fig
                    src="mock-analyst-dashboard.png"
                    alt="Wireframe of the compensation analyst dashboard"
                    width={1500}
                    height={844}
                    caption="Downstream, comp analysts consume clean, consistent, structured requests: informed decisions with efficiency, and data that can finally power approval analytics."
                  />

                  <p>
                    I also contributed a longer-term vision for how structured comp data could surface in the candidate-facing experience.
                  </p>

                  <Fig
                    src="vision-candidate-profile.gif"
                    alt="Vision concept: the offer surfaced in Candidate Profile"
                    width={1889}
                    height={1227}
                    animated
                    caption="Vision work: the offer surfaced in Candidate Profile, from you have a job offer through review and acceptance."
                  />

                  <h2 id="pre-launch">Pre-launch</h2>

                  <ul>
                    <li>Ran dogfooding (beta testing) with 30+ recruiters using <strong>real offers</strong></li>
                    <li>Led design QA, documenting and flagging critical UX and UI issues</li>
                    <li>Collaborated with our content designer to complete the content design artefacts</li>
                    <li>Saw through the compliance reviews and approval processes</li>
                  </ul>

                  <Fig
                    src="process-dogfooding-group.png"
                    alt="The internal dogfooding and feedback group"
                    width={2048}
                    height={1423}
                    caption="The dogfooding and feedback group: recruiters opted in as gatekeepers, used the new flow with live candidates, and reported issues in one place. Names redacted."
                  />

                  <Fig
                    src="tool-in-situ-laptop.jpg"
                    alt="The capture flow running on a laptop during testing"
                    width={2048}
                    height={1536}
                    caption="The flow in situ during testing. Test data only, browser chrome blurred."
                  />

                  <h2 id="impact">Impact</h2>

                  <p>
                    Launched in July 2022 to the entire recruiting org: thousands of recruiters, plus the comp analyst team.
                  </p>

                  <ul>
                    <li><strong>23.7% faster</strong> average compensation approval time overall</li>
                    <li><strong>First approvals went from days to same-day</strong>, a several-hundred-percent improvement in first-approval velocity</li>
                    <li><strong>51% increase</strong> in the volume of validated comp data captured</li>
                    <li><strong>12.2% reduction</strong> in the overall number of compensation approval requests</li>
                    <li><strong>9% improvement</strong> to overall hire-decision to offer-extension velocity</li>
                  </ul>

                  <p>
                    One metric did not move. Offers requiring two or more approvals stayed slow, slightly slower by a single-digit percentage. Those are the genuinely hard negotiations, and they became the target of the next phase of work.
                  </p>

                  <h2 id="peer-feedback">Selected peer feedback (anonymised)</h2>

                  <div className={styles.peerQuotes}>
                    {peerFeedback.map((q, i) => (
                      <blockquote key={i} className={styles.peerQuote}>
                        <p className={styles.peerQuoteText}>&ldquo;{q.quote}&rdquo;</p>
                        <footer className={styles.peerQuoteFooter}>{q.role}</footer>
                      </blockquote>
                    ))}
                  </div>

                  <p className={styles.footnote}>
                    Figures come from internal project reviews and my performance review. Absolute volumes and cycle times are generalised and sensitive details redacted; percentage improvements are reported as measured. All candidate data shown in mocks is fictional, and internal screenshots use test data.
                  </p>

                </article>
              </section>
            </div>

            {/* Right rail: details */}
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
                    <span className={styles.detailValue}>Product Designer · Recruiting Products · Offers team</span>
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
                    <span className={styles.detailValue}>Responsive web: internal ATS and Candidate Profile</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Team</span>
                    <span className={styles.detailValue}>1 PD · 1 PM · 1 PMM · 1 UXR · 1 DS · 1 CD · 6 SWE · comp analyst team · 30+ recruiter SMEs</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Users</span>
                    <span className={styles.detailValue}>Thousands of recruiters · the comp analyst team · all Meta candidates</span>
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

    </>
  );
}
