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
import { Quote } from "@robr0/design-system/components/Quote/Quote";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  workSidebarLinks,
  "/work/meta-career-profile"
);

const IMG = "/images/meta-career-profile";

type Lightbox = { src: string; alt: string } | null;

/** Every figure on the page opens the same lightbox, so the handler rides
 *  a context rather than a prop threaded through twenty call sites. */
const ZoomContext = createContext<(src: string, alt: string) => void>(() => {});

/** One inline figure: image or animated webp, its caption, and click to zoom. */
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

type SpecItem = {
  src: string;
  label: string;
  alt: string;
  width: number;
  height: number;
  animated?: boolean;
};

/** A row of component variants shown side by side under one caption, each
 *  labelled. The system was specified as parts that compose, so the parts are
 *  shown composing rather than stacked one full-width figure at a time. */
function SpecRow({
  items,
  caption,
}: {
  items: SpecItem[];
  caption: React.ReactNode;
}) {
  const zoom = useContext(ZoomContext);

  return (
    <figure className={styles.specRow}>
      <div className={styles.specStage}>
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            className={styles.specItem}
            onClick={() => zoom(`${IMG}/${item.src}`, item.alt)}
            aria-label={`Open ${item.label} at full size`}
          >
            <Image
              src={`${IMG}/${item.src}`}
              alt={item.alt}
              width={item.width}
              height={item.height}
              unoptimized={item.animated}
            />
            <span className={styles.specLabel}>{item.label}</span>
          </button>
        ))}
      </div>
      <figcaption className={styles.specCaption}>{caption}</figcaption>
    </figure>
  );
}

export default function MetaCareerProfileCaseStudy() {
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
            <h1 className={styles.pageTitle}>Career Profile vision</h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            A design team had spent a phase exploring what Meta’s candidate platform could become. I joined for phase two, where the job was no longer to explore. It was to converge.
          </p>

          {/* Hero image */}
          <figure className={`${styles.cover} animate-in animate-delay-2`}>
            <CoverImage
              href="/work/meta-career-profile"
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
                    Career Profile is the logged-in platform every Meta candidate passes through: tracking your process, preparing for loops, handling paperwork, reviewing your offer. Created in 2018, it had grown into a patchwork built by different teams on an internal design system never meant to face candidates.
                  </p>

                  <p>
                    A design team had already run phase one: the audit, the principles, and three exploratory concepts, presented to Recruiting Products leadership in August 2022. That work is theirs.
                  </p>

                  <p>
                    I joined in Q4 2022 for phase two, coming from the Offers team. Phase one had opened the space; phase two had to close it, with enough conviction and fidelity for leadership to decide. We worked as three individual contributors and a design manager, in equal collaboration. I was not the lead.
                  </p>

                  <p><strong>What I owned:</strong> the typology framework, the concept convergence, the timeline and card system, and the offer experience I brought from Offers.</p>

                  <h2 id="what-we-inherited">What we inherited</h2>

                  <p>
                    Navigation did not scale, because level-one items were pages rather than categories. Every candidate saw the same content regardless of who they were. Geodesic, the internal system underneath, had no mobile web support and little brand expression.
                  </p>

                  <Fig
                    src="before-cp-home.png"
                    alt="The existing Career Profile homepage before the vision work"
                    width={1033}
                    height={888}
                    caption="The starting point: content density low, generic modules regardless of candidate. Test account data."
                  />

                  <Fig
                    src="before-career-site-job-search.png"
                    alt="The existing public Meta Career Site job search"
                    width={2048}
                    height={1261}
                    caption="The logged-out Career Site: limited search and filter, and inconsistent layouts across detail pages. Candidates cross between the two without knowing they are different products."
                  />

                  <h2 id="converging">Converging on a direction</h2>

                  <p>
                    Phase one had produced three concepts. Instead of picking a favourite we scored each on what it was good at, and concluded that none of them was the answer.
                  </p>

                  <Fig
                    src="concept-1-career-coach.webp"
                    alt="Phase one concept: Career Coach, a guided one-task-at-a-time experience"
                    width={1400}
                    height={929}
                    animated
                    caption="Career Coach: one task at a time, information proactively surfaced. Good for a candidate who wants to be led, but the guidance constrains and the content maintenance burden is high."
                  />

                  <Fig
                    src="concept-3-career-dashboard.webp"
                    alt="Phase one concept: Career Dashboard, with configurable modules"
                    width={1400}
                    height={829}
                    animated
                    caption="Career Dashboard: preconfigured layouts that scale, at-a-glance content and shortcuts. But a challenging learning curve, and density that tipped into overload."
                  />

                  <p>
                    A third, Career Workplace, borrowed Workplace’s structure and social graph. Familiar, but the structure limited functionality and social networking was never validated as a candidate need.
                  </p>

                  <p>
                    Each was a feature idea standing in for a framework. The framework itself was missing.
                  </p>

                  <Alert
                    variant="info"
                    title="The premise that unlocked it"
                    description="Career Profile should be applicable to everyone, and personalisation should come from content curation rather than redesigning the surface per audience. That ruled out building a different Career Profile per candidate type."
                    className={styles.calloutAlert}
                  />

                  <h2 id="typologies">Typologies: a shared vocabulary for pages</h2>

                  <p>
                    A typology sorts content by the mental model a user brings to it, which gives you templates instead of one-off pages. We landed on three.
                  </p>

                  <Fig
                    src="typology-browse.png"
                    alt="The Browse typology: looking and orienting"
                    width={2048}
                    height={1289}
                    caption="Browse. “Help me understand where to go.” Looking and orienting; the action is wayfinding. Home, Meta Connections, Events, Coding Puzzles, Prep Hub landing, VR Hub."
                  />

                  <Fig
                    src="typology-study.png"
                    alt="The Study typology: reading and learning"
                    width={2048}
                    height={1289}
                    caption="Study. “Help me understand the material in front of me.” Reading and learning; deep consumption. Offer, job details, Prep Hub lessons, blog posts, FAQ."
                  />

                  <Fig
                    src="typology-work.png"
                    alt="The Work typology: interacting and executing"
                    width={2048}
                    height={1289}
                    caption="Work. “Help me solve a specific problem.” Interacting and executing; accomplishing a task. Job application, exercises, scheduling, message centre, settings, pre-hire checklist."
                  />

                  <p>
                    Three typologies meant three templates, and a partner team building a new feature had somewhere to put it.
                  </p>

                  <h2 id="five-degrees">Five degrees of change</h2>

                  <p>
                    In worksessions in Burlingame we laid the direction out as five options from no change to overhaul, so leadership could see the trade space rather than a single recommendation. Structure first, before any visual design.
                  </p>

                  <Fig
                    src="worksession-greybox-a.png"
                    alt="Greybox structural exploration from the worksessions"
                    width={1729}
                    height={1117}
                    caption="Greybox exploration: how much the page could carry, and where the timeline should live, before any visual language."
                  />

                  <Fig
                    src="concept-spicy-two-worlds.webp"
                    alt="Concept: two distinctly branded experiences for interviewing and preparation"
                    width={1400}
                    height={905}
                    animated
                    caption="The overhaul end of the spectrum, Two Worlds: build the interview process and the preparation process as two distinctly branded experiences so both can scale independently."
                  />

                  <Fig
                    src="concept-medium-timeline-anchor.webp"
                    alt="Concept: the interview timeline as the anchor for the whole experience"
                    width={1400}
                    height={905}
                    animated
                    caption="The one that won, Timeline as Anchor: the interview journey drives the experience, and every piece of information or CTA is surfaced contextually within it."
                  />

                  <p>
                    Scored against build-for-all, clarity, scale, efficiency and innovation, Timeline as Anchor won. It addressed the framework rather than the surface: the timeline is the one thing every candidate has and came to check, so organising around it let content surface contextually.
                  </p>

                  <h2 id="the-system">The system we built</h2>

                  <p>
                    Components need primitives to be built from, so choosing a design system was part of the implementation plan. XMDS was approved for external work but optimised for light editorial content, and our surface is dense and transactional. XDS was the internal system, running nearly every enterprise app at Meta, with its systems team adjacent to us in Enterprise Engineering.
                  </p>

                  <p>
                    Taking XDS external had no precedent, so we worked it through with that team rather than around them. Together we explored a People Theme: XDS primitives underneath, extended for our use case with rounded corners, softer surfaces and pops of colour.
                  </p>

                  <Fig
                    src="ds-xds-people-theme.png"
                    alt="The XDS People Theme, a candidate-facing extension of Meta's internal design system"
                    width={1115}
                    height={727}
                    caption="The People Theme: XDS primitives underneath, extended for an external audience."
                  />

                  <p>
                    That theme became <a href="https://astryx.atmeta.com/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Astryx</a>, the AI-ready design system Meta has since launched publicly.
                  </p>

                  <p>
                    On top of those primitives we specified the parts. Every one had to declare four things before it earned a place: its priority, the mental model it serves, where it lives, and its states.
                  </p>

                  <SpecRow
                    caption="Primary navigation. High priority, always in view, answering “help me understand where I am.” Settings, search, messages, help and profile sit below the fold of the rail."
                    items={[
                      { src: "nav-primary-collapsed-crop.png", label: "Collapsed", alt: "Primary navigation rail collapsed to icons", width: 104, height: 943 },
                      { src: "nav-primary-expanded-crop.png", label: "Expanded", alt: "Primary navigation rail expanded with labels", width: 496, height: 943 },
                    ]}
                  />

                  <SpecRow
                    caption="Sub navigation appears only when a section needs one, and collapses on the same rules as the primary rail. Two rails, one behaviour."
                    items={[
                      { src: "nav-sub-expanded-crop.png", label: "Expanded", alt: "Sub navigation panel expanded, showing a page title and sub pages", width: 496, height: 945 },
                      { src: "nav-sub-collapsed-crop.png", label: "Collapsed", alt: "Sub navigation collapsed to icons", width: 106, height: 945 },
                    ]}
                  />

                  <SpecRow
                    caption="Completed stages carry status and dates, the active stage adds duration and activity badges, future stages show what is coming. One set of statuses covers every state a process can be in, so the same component says up next, decision pending, or offer extended."
                    items={[
                      { src: "component-dynamic-timeline.webp", label: "Stage states", alt: "The dynamic timeline showing completed, active and future stages", width: 395, height: 976, animated: true },
                      { src: "timeline-status-chips.png", label: "Status vocabulary", alt: "The set of timeline status chips", width: 322, height: 520 },
                    ]}
                  />

                  <Fig
                    src="component-timeline-drives-content.webp"
                    alt="Selecting a timeline stage re-composes the main content area"
                    width={1400}
                    height={909}
                    animated
                    caption="The active timeline state determines what appears in the content area. Select a future stage and the page tells you how to prepare for it, select the active one and it tells you what to do now."
                  />

                  <p>
                    The cards follow the same spec. Primary above the fold in the centre column, secondary in the right rail, lower-priority below, and flex cards that resize to the candidate’s type, seniority and stage. Each is one container with a swappable payload, so a job list and an interview agenda occupy the same slot at different points in the journey.
                  </p>

                  <h2 id="key-screens">Key screens</h2>

                  <Fig
                    src="screen-home-prospective.png"
                    alt="Career Profile home for a prospective candidate"
                    width={2048}
                    height={1330}
                    caption="Home, prospective candidate. Typology: Browse. Before a consideration exists there is no timeline, so the page is about getting started. All candidate, recruiter and interviewer data shown is fictional."
                  />

                  <Fig
                    src="hero-timeline-home.png"
                    alt="Career Profile home during the screening interview stage"
                    width={2048}
                    height={1330}
                    caption="Home, screening interview. Typology: Work. “Help me figure out what I need to do right now”: join the conference, see what's next, complete your tasks, reach a human."
                  />

                  <Fig
                    src="screen-home-onsite-lookahead.png"
                    alt="Career Profile home with a future interview stage selected"
                    width={2048}
                    height={1330}
                    caption="The same page, looking ahead: the candidate selects a future stage and it re-composes around preparing for it."
                  />

                  <h2 id="the-offer">The offer experience</h2>

                  <p>
                    This is the part I brought with me: a vision brief from the Offers team arguing for a full-featured offer experience, which fed into this one.
                  </p>

                  <div className={styles.statBand}>
                    <Stat
                      value="72%"
                      label="Offer Summary usage"
                      trend="down"
                      delta="28% of offers went without it"
                    />
                    <Stat
                      value="+4%"
                      label="Higher acceptance rate"
                      trend="up"
                      delta="when recruiters used it"
                    />
                    <Stat
                      value="1.85 days"
                      label="Faster offer extension"
                      trend="up"
                      delta="hire decision to extend"
                    />
                  </div>

                  <p>
                    Using it forced recruiters to share approved compensation values with the candidate. If transparency moved those numbers at 72% usage, a complete self-serve experience at full usage was worth designing for. The system also depended on an individual recruiter to orchestrate, so nothing guaranteed a candidate got what they needed to decide.
                  </p>

                  <Fig
                    src="screen-offer-summary-compensation.png"
                    alt="The job offer summary, showing a full compensation breakdown"
                    width={2048}
                    height={1330}
                    caption="Role, compensation, life at Meta, team, career, and a VR offer explorer. The breakdown is complete and self-serve, with definitions attached, so the candidate isn't dependent on a recruiter to know what they've been offered. Figures illustrative."
                  />

                  <p>
                    Two efforts ran on the offer moment in the same period. This was the self-serve half; <Link href="/work/meta-immersive-offers" className={styles.inlineLink}>Immersive Offers</Link> was the human half.
                  </p>

                  <h2 id="through-to-joining">Through to joining</h2>

                  <p>
                    Accepting an offer is not the end of the candidate’s journey, so it is not the end of the product. Career Profile carries someone from signature to first day.
                  </p>

                  <Fig
                    src="screen-prehire-sign-offer.png"
                    alt="The pre-hire checklist, shown after the offer has been accepted"
                    width={2048}
                    height={1330}
                    caption="After acceptance: sign the documents, clear the background check, choose equipment, create the employee record. The timeline has moved past Job Offer to Pre-hire checklist, Tech Setup and Onboarding, on the same framework."
                  />

                  <h2 id="personalisation">Personalisation without a second product</h2>

                  <p>
                    Two very different candidates, the same framework, different curation.
                  </p>

                  <Fig
                    src="personalization-ic5.jpg"
                    alt="The IC5 candidate experience, with full navigation and a detailed timeline"
                    width={1764}
                    height={2048}
                    caption="IC5, guided: full navigation with every section one click away, a detailed timeline with copy explaining what's coming next, and quick links as jumping-off points for self-directed research."
                  />

                  <Fig
                    src="personalization-leadership.jpg"
                    alt="The leadership candidate experience, simplified and curated"
                    width={2048}
                    height={1481}
                    caption="Leadership, self-serve: simplified navigation, a timeline without per-stage descriptions, interview conversations reduced to essentials, and a curated rather than exhaustive set of leaders to connect with. Same system, different curation."
                  />

                  <Fig
                    src="proto-active-interviewing.webp"
                    alt="Interactive prototype of the active interviewing journey"
                    width={1400}
                    height={897}
                    animated
                    caption="The interactive prototype: the active candidate journey, with the timeline driving the content area."
                  />

                  <h2 id="what-we-delivered">What we delivered</h2>

                  <p>
                    We took the full vision to high fidelity: the converged direction and its reasoning, the typology framework, the design-system recommendation, the component system, key screens from prospect to first day, and an interactive prototype running the journey in three candidate states.
                  </p>

                  <h2 id="what-i-took-from-it">What I took from it</h2>

                  <p>
                    <strong>Convergence is a different craft from exploration.</strong> Widening rewards generosity. Narrowing rewards evidence, and scoring five options on one spectrum is what turned a matter of taste into a decision leadership could actually make.
                  </p>

                  <p>
                    <strong>A framework is not a bigger feature.</strong> All three inherited concepts were good and all three sat at the wrong altitude. Anchoring to the timeline worked because it organised the product around the candidate’s state rather than around Meta’s org chart.
                  </p>

                  <p>
                    <strong>Fidelity is an argument, not a finish.</strong> The debate about personalisation went in circles while it stayed abstract and ended the moment two candidate types were on screen, rendered by one system.
                  </p>

                  <Quote variant="pull">
                    The deliverable was never the screens. It was a vocabulary other teams could build in without asking permission.
                  </Quote>
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
                      <span>Meta · Recruiting Products</span>
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Product</span>
                    <span className={styles.detailValue}>Career Profile</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Role</span>
                    <span className={styles.detailValue}>Product Designer · one of three ICs, phase two</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Team</span>
                    <span className={styles.detailValue}>3 product designers and a design manager, in equal collaboration · UXR · engineering · partner teams</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Scope</span>
                    <span className={styles.detailValue}>Typologies, concept convergence, timeline and card system, offer experience</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Status</span>
                    <span className={styles.detailValue}>Vision work · full vision delivered in high fidelity, December 2022</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Platform</span>
                    <span className={styles.detailValue}>Responsive web: Career Profile and Career Site</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Years</span>
                    <span className={styles.detailValue}>2022</span>
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
              shows the original asset at full size, including animated webp. */}
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
