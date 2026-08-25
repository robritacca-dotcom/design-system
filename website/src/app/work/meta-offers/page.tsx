"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CoverImage } from "@/components/covers/CoverImage";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SampleCaseStudyCard from "../../../components/SampleCaseStudyCard/SampleCaseStudyCard";
import { Stat } from "@robr0/design-system/components/Stat/Stat";
import { Alert } from "@robr0/design-system/components/Alert/Alert";
import { Figure } from "@robr0/design-system/components/Figure/Figure";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(workSidebarLinks, "/work/meta-offers");

const IMG = "/images/meta-offers";

type Lightbox = { src: string; alt: string } | null;

/** Every figure on the page opens the same lightbox, so the handler rides
 *  a context rather than a prop threaded through thirty call sites. */
const ZoomContext = createContext<(src: string, alt: string) => void>(() => {});

/** One inline figure: image or animated gif, its caption, and click to zoom. */
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
  const zoom = useContext(ZoomContext);
  const fullSrc = `${IMG}/${src}`;

  return (
    <Figure
      caption={caption}
      onClick={() => zoom(fullSrc, alt)}
      className={styles.zoomFigure}
    >
      <Image
        src={fullSrc}
        alt={alt}
        width={width}
        height={height}
        unoptimized={animated}
      />
    </Figure>
  );
}

export default function MetaOffersCaseStudy() {
  const [lightbox, setLightbox] = useState<Lightbox>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const zoom = useCallback((src: string, alt: string) => setLightbox({ src, alt }), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  return (
    <ZoomContext.Provider value={zoom}>
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
                  <p className={styles.lede}>
                    Any offer above the standard compensation range needs approval, and that approval ran on a free-text notes box: recruiters typed what they knew, analysts parsed it by hand, and offers bounced between them for days. I replaced the box with a structured, validated, dynamic capture flow, live to the entire recruiting org since July 2022.
                  </p>

                  <div className={`${styles.statBand} ${styles.statBandTop}`}>
                    <Stat
                      value="23.7%"
                      label="Faster comp approvals"
                      trend="up"
                      delta="average approval time"
                    />
                    <Stat
                      value="51%"
                      label="More validated comp data"
                      trend="up"
                      delta="volume captured"
                    />
                    <Stat
                      value="12.2%"
                      label="Fewer approval requests"
                      trend="up"
                      delta="across the org"
                    />
                  </div>

                  <h2 id="context">Context</h2>

                  <p>
                    Every job offer at Meta falls into one of two buckets. Inside the standard compensation range, it can go out in a single business day. Above the range, it needs compensation approval with justification. Thousands of offers a year needed at least one approval, and a meaningful share needed two or more, stretching days into more than a week.
                  </p>

                  <p>
                    That delay is the most expensive kind of slow. By the offer stage Meta has already paid for the entire funnel: sourcing, screens, full loops, debriefs. And roughly a quarter of offers still ended in a decline. At this volume that is thousands of candidates a year walking away at the very end.
                  </p>

                  <p>
                    Every decline means running the funnel again, which is why the offer got heavy investment. Slow extensions track with lower acceptance rates and worse candidate sentiment. Meta bet on both ends of that in the same period: this project on how fast a well-supported offer could be built and approved, <Link href="/work/meta-immersive-offers" className={styles.inlineLink}>Immersive Offers</Link> on how the offer reached the candidate.
                  </p>

                  <p>
                    And it was about to scale: thousands of recruiters, millions of candidates, tens of thousands of offers, and a hiring target in the tens of thousands for 2022 alone.
                  </p>

                  <p>
                    I was the product designer on the Recruiting Products Offers team, which owns everything between hire decision and signed offer letter. This was our P0 for H1 2022.
                  </p>

                  <p><strong>The shape of it:</strong></p>

                  <ul>
                    <li>Core team: 1 product designer (me), 1 PM, 1 PMM, 1 researcher, 1 data scientist, 1 content designer, 6 engineers</li>
                    <li>Partners: the Compensation Analysis team, plus 30+ recruiter SMEs and the comp analyst SMEs</li>
                    <li>Three user types with competing needs, meeting inside one flow</li>
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
                    caption="The recruiter-facing surface: the ATS where offers are drafted, approved, and extended. All candidate data shown is fictional."
                  />

                  <h2 id="research">The research</h2>

                  <p>
                    With our data scientist I mapped the offer stage end to end: hire decision to signed letter, across candidate, touchpoint, front stage, tooling, pains, and opportunities. The velocity data was stark. A standard offer went out in about a business day, one needing comp approval took days, and one needing multiple approvals took over a week.
                  </p>

                  <Fig
                    src="journey-map-offer-stage.png"
                    alt="Journey map of the offer stage, from hire decision to signed letter"
                    width={2048}
                    height={1151}
                    caption="The offer-stage map, with pains and opportunities at every phase. Cycle-time figures redacted."
                  />

                  <Fig
                    src="concept-offer-velocity.png"
                    alt="Concept chart: offer velocity against acceptance rate"
                    width={1500}
                    height={844}
                    caption="Every extra comp proposal round pushes extension velocity down, and acceptance rates fall with it."
                  />

                  <h2 id="tension">The tension at the centre</h2>

                  <p>
                    Three user types collide here, and all three want the same thing. The candidate wants the job, the recruiter wants the accept, the analyst wants an offer that is defensible and lands.
                  </p>

                  <p>
                    They pull in opposite directions to get there. Candidates disclose as little as they can, because what they withhold is leverage. Recruiters are measured on speed, so they take what the conversation gives them and move. Analysts work from data, and cannot approve what they cannot verify. Each behaviour is rational alone. Together they produce a queue nobody intends.
                  </p>

                  <Fig
                    src="diagram-three-user-types.png"
                    alt="Venn diagram of candidate, recruiter, and compensation analyst needs"
                    width={1500}
                    height={844}
                    caption="The same goal, three routes to it. A signed offer lives at the intersection, and only at the intersection."
                  />

                  <p>
                    That is what made this a design problem rather than a form problem. A form serves one user. This one had to make a candidate comfortable disclosing, make a recruiter faster for doing it properly, and let an analyst trust the result without a follow-up. Ask the candidate for everything and the recruiter loses the room. Ask for nothing and the analyst sends it back. Every later decision was a judgement about where in that triangle to spend the effort.
                  </p>

                  <Fig
                    src="diagram-offer-scenarios.png"
                    alt="Scenario A, a standard offer, next to scenario B, an above-band offer"
                    width={1500}
                    height={844}
                    caption="Standard offers, about 40% of accepted offers: no approval, out in a business day. Above band, about 60%: evidence and approval required, 5 to 13 times slower."
                  />

                  <p>
                    <strong>Why so slow?</strong> Compensation is complex, recruiters were not comp experts, candidates withheld information, and compliance guidance was unclear. The tooling made it worse: missing fields, no validation, and at the heart of it one free-form notes box for everything a recruiter knew about a candidate’s current and competing compensation.
                  </p>

                  <Fig
                    src="before-approval-request-form.png"
                    alt="The old approval request form: a free-text notes box"
                    width={674}
                    height={472}
                    caption="The before: a free-text notes box and a checklist recruiters answered from memory. Approver names redacted."
                  />

                  <Fig
                    src="before-unvalidated-comp-form.png"
                    alt="The old compensation capture form, with unvalidated fields"
                    width={840}
                    height={812}
                    caption="Fields existed, nothing was validated. An empty input could mean 0%, did not disclose, or none given by company. Every ambiguity triggered a follow-up."
                  />

                  <p>
                    Two recruiters describing the <em>same</em> candidate would write two completely different paragraphs, which an analyst then had to parse by hand into the fields they needed.
                  </p>

                  <Fig
                    src="example-unstructured-vs-parsed.png"
                    alt="Two free-text candidate descriptions beside the structured fields extracted from them"
                    width={1500}
                    height={844}
                    caption="Two free-text descriptions of the same candidate, and the fields an analyst has to extract. Every gap becomes a follow-up."
                  />

                  <Alert
                    variant="info"
                    title="This was 2021, before LLMs were a practical option."
                    description="Today the first instinct would be to point a model at the free text and have it extract the fields. That was not on the table, so the structure had to come from the capture itself. It is also the better ordering: a model infers what a recruiter meant, a validated field records it."
                    className={styles.calloutAlert}
                  />

                  <p>
                    When the data did not hold up, the proposal bounced. The analyst asked for more, the recruiter went back to the candidate, and the proposal rejoined the queue. A repeating rejection loop, with the candidate waiting at the end of it.
                  </p>

                  <Fig
                    src="diagram-rejection-loop.png"
                    alt="Diagram of the repeating rejection loop between candidate, recruiter, and comp partner"
                    width={2048}
                    height={696}
                    caption="The repeating loop between candidate, recruiter, and comp partner. Every cycle adds days."
                  />

                  <h2 id="approach">Solving the problem</h2>

                  <p>
                    I ran requirement gathering between the engineers, recruiters, and comp analysts, and aligned everyone on four goals: faster offer extension, fewer requests for more information, more consistent requests, and the approval analytics structured data would finally make possible. We took on a fifth: rebuild the surface on our internal design system.
                  </p>

                  <Fig
                    src="process-requirements-board.png"
                    alt="FigJam board from requirement gathering, with story-mapped themes and epics"
                    width={2048}
                    height={1100}
                    caption="The requirement-gathering board: themes, epics, and capture dimensions, built with recruiters and comp analysts."
                  />

                  <Fig
                    src="process-discovery-doc.png"
                    alt="Pages from the discovery document"
                    width={2048}
                    height={1826}
                    caption="The discovery doc: problem statement, pain points, and solution options scored by risk and impact."
                  />

                  <p>
                    Recruiters are not comp experts, and candidates use different words for the same thing. So we wrote a shared vocabulary: a precise definition for every capture field, from equity types to forfeited cash, later embedded in the UI itself.
                  </p>

                  <Fig
                    src="process-definitions-table.png"
                    alt="Table of structured compensation definitions"
                    width={536}
                    height={641}
                    caption="Every field, its input type, and its plain-language definition. One language for recruiters, candidates, and analysts."
                  />

                  <p>Prototypes followed, and evolved through user feedback.</p>

                  <Fig
                    src="process-design-iterations.png"
                    alt="Composite of design iterations, from a dense capture table to a guided flow"
                    width={1500}
                    height={844}
                    caption="From a dense spreadsheet-style capture table to a guided, dynamic flow."
                  />

                  <Fig
                    src="research-survey-results.png"
                    alt="Chart of validation survey results from recruiters"
                    width={949}
                    height={559}
                    caption="Validation sessions and a survey with recruiters. Most rated the new flow fast, clear, and easy to use. The detractor themes drove the next iteration."
                  />

                  <p>
                    Testing surfaced a real tension. Recruiters liked the level of detail, but flagged information overload and doubted a rigid form could hold the nuance of every candidate. The answer was a <em>dynamic</em> flow: ask only what is relevant, educate as you go, validate everything.
                  </p>

                  <h2 id="solution">The solution</h2>

                  <p>Every change had a rationale the whole team could point to.</p>

                  <Fig
                    src="flow-one-click-extension.webp"
                    alt="One-click extension of a standard offer draft"
                    width={1799}
                    height={1279}
                    animated
                    caption="1-click extension from a default standard offer draft. Less friction, faster extensions."
                  />

                  <Fig
                    src="flow-intentional-custom-offer.webp"
                    alt="Selecting the custom offer path deliberately"
                    width={1799}
                    height={1280}
                    animated
                    caption="Starting a custom offer takes an intentional selection, which separates the fast path from the slow one."
                  />

                  <Fig
                    src="flow-competing-data-required.webp"
                    alt="Competing compensation data enforced before an above-band proposal proceeds"
                    width={1799}
                    height={1280}
                    animated
                    caption="Competing data must be submitted before an above-band proposal can proceed."
                  />

                  <Fig
                    src="flow-structured-comp-capture.webp"
                    alt="The structured, dynamic compensation capture flow"
                    width={1799}
                    height={1280}
                    animated
                    caption="The centrepiece: a structured, dynamic capture flow. 51% more validated comp data."
                  />

                  <Fig
                    src="mock-comp-capture-salary-bonus.png"
                    alt="Salary and bonus capture step, with validated inputs"
                    width={1296}
                    height={1352}
                    caption="Bonus captured as a target percent or a fixed value, with explicit not offered, did not disclose, and undisclosed states. An empty field can never be ambiguous again."
                  />

                  <Fig
                    src="mock-comp-capture-equity.png"
                    alt="Equity capture step, broken into guided sub-steps"
                    width={1300}
                    height={1470}
                    caption="Equity, the biggest source of analyst follow-ups, in guided steps: RSUs against options, vesting in the next 12 months, forfeited value."
                  />

                  <Fig
                    src="mock-tailored-capture-grid.png"
                    alt="Grid of tailored capture paths by compensation data type"
                    width={1456}
                    height={1287}
                    caption="Tailored capture by data type, so a recruiter only sees the path that applies."
                  />

                  <Fig
                    src="mock-definitions-in-ui.png"
                    alt="Compensation definitions and sub-labels embedded in the capture UI"
                    width={1800}
                    height={1280}
                    caption="Definitions and sub-labels in the UI itself, teaching recruiters at the source."
                  />

                  <Fig
                    src="flow-proposal-validated.webp"
                    alt="Competing data validated against the compensation proposal"
                    width={1799}
                    height={1280}
                    animated
                    caption="Competing data validated against the proposal, so proposals align with the evidence submitted."
                  />

                  <Fig
                    src="after-structured-data-ats.png"
                    alt="Structured compensation data displayed in the ATS offer draft"
                    width={1798}
                    height={1277}
                    caption="The after: structured data flowing into the offer draft."
                  />

                  <Fig
                    src="mock-analyst-dashboard.png"
                    alt="Wireframe of the compensation analyst dashboard"
                    width={1500}
                    height={844}
                    caption="Downstream, analysts consume clean, consistent requests, and data that can power approval analytics."
                  />

                  <p>
                    I also pitched a longer-term vision: structured comp data surfacing in the candidate experience.
                  </p>

                  <Fig
                    src="vision-candidate-profile.webp"
                    alt="Vision concept: the offer surfaced in Candidate Profile"
                    width={1889}
                    height={1227}
                    animated
                    caption="Vision work: the offer surfaced in Candidate Profile, from notification through acceptance."
                  />

                  <h2 id="pre-launch">Pre-launch</h2>

                  <ul>
                    <li>Dogfooded with 30+ recruiters on <strong>real offers</strong></li>
                    <li>Led design QA, flagging critical UX and UI issues</li>
                    <li>Completed the content design artefacts with our content designer</li>
                    <li>Saw through compliance review and approval</li>
                  </ul>

                  <Fig
                    src="process-dogfooding-group.png"
                    alt="The internal dogfooding and feedback group"
                    width={2048}
                    height={1423}
                    caption="The dogfooding group: recruiters used the new flow with live candidates and reported issues in one place. Names redacted."
                  />

                  <Fig
                    src="tool-in-situ-laptop.jpg"
                    alt="The capture flow running on a laptop during testing"
                    width={2048}
                    height={1536}
                    caption="The flow in situ during testing."
                  />

                  <h2 id="impact">Impact</h2>

                  <p>
                    Launched in July 2022 to the entire recruiting org: thousands of recruiters, plus the comp analyst team. Every number is measured against the flow it replaced.
                  </p>

                  <div className={styles.statBand}>
                    <Stat
                      size="large"
                      value="23.7%"
                      label="Faster comp approvals"
                      trend="up"
                      delta="average approval time, overall"
                    />
                    <Stat
                      size="large"
                      value="51%"
                      label="More validated comp data"
                      trend="up"
                      delta="volume captured per offer"
                    />
                    <Stat
                      size="large"
                      value="12.2%"
                      label="Fewer approval requests"
                      trend="up"
                      delta="total requests submitted"
                    />
                    <Stat
                      size="large"
                      value="9%"
                      label="Faster offer extension"
                      trend="up"
                      delta="hire decision to offer out"
                    />
                  </div>

                  <Alert
                    variant="positive"
                    title="First approvals went from days to same day."
                    description="A recruiter who submitted a supported proposal got an answer the same day rather than at the end of the week. That is the difference between a candidate deciding with an offer in hand and deciding without one."
                    className={styles.calloutAlert}
                  />

                  <p>
                    One metric did not move. Offers needing two or more approvals stayed slow, slightly slower by a single-digit percentage. Those are the genuinely hard negotiations, and they became the next phase of work.
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

      {lightbox && (
        <div
          className={styles.lightboxOverlay}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close preview">
            <span className="material-symbols-rounded">close</span>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- the lightbox
              shows the original asset at full size, including animated gifs. */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </ZoomContext.Provider>
  );
}
