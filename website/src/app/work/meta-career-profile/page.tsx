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
            A design team had spent a phase exploring what Meta&rsquo;s candidate platform could become. I joined for phase two, where the job was no longer to explore. It was to converge.
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
                    Career Profile is the logged-in platform every Meta candidate passes through: tracking where you are in the process, preparing for your loops, handling paperwork, reviewing your offer. Created in 2018, it had grown into a patchwork of features built by different teams on an internal design system that was never meant to face candidates.
                  </p>

                  <p>
                    A design team had already run phase one: the audit, the principles, and three exploratory concepts, presented to Recruiting Products leadership in August 2022. That work is theirs, and this case study inherits it rather than repeating it.
                  </p>

                  <p>
                    I joined in Q4 2022 for phase two, coming across from the Offers team. The mandate had changed. Phase one had opened the space; phase two had to close it, with enough conviction and enough fidelity that leadership could actually decide something. We worked as three individual contributors and a design manager, in equal collaboration. I wasn&rsquo;t the lead on this, and the good decisions in it came out of the group rather than out of me.
                  </p>

                  <p><strong>What I owned inside that:</strong> the typology framework, the concept convergence and its evaluation, the timeline and content-card system, and the offer experience I brought over from Offers.</p>

                  <h2 id="what-we-inherited">What we inherited</h2>

                  <p>
                    The problems phase one had documented were structural, not cosmetic. Navigation didn&rsquo;t scale, because level-one items were pages rather than categories. The homepage was administrative and under-dense. Every candidate saw the same generic content regardless of who they were or where they stood. And Geodesic, the internal system underneath it, had no mobile web support and little brand expression.
                  </p>

                  <Fig
                    src="before-cp-home.png"
                    alt="The existing Career Profile homepage before the vision work"
                    width={1033}
                    height={888}
                    caption="The starting point: critical real estate under-used, content density low, generic modules regardless of candidate. Test account data."
                  />

                  <Fig
                    src="before-career-site-job-search.png"
                    alt="The existing public Meta Career Site job search"
                    width={2048}
                    height={1261}
                    caption="The logged-out Career Site had its own problems: limited search and filter, inconsistent layouts, and a page generic enough to belong to any company. Candidates cross between the two without caring that they are different products."
                  />

                  <h2 id="converging">Converging on a direction</h2>

                  <p>
                    Phase one had produced three concepts. The temptation was to pick a favourite. Instead we scored each on what it was actually good at, and reached an uncomfortable conclusion: none of them was the answer.
                  </p>

                  <Fig
                    src="concept-1-career-coach.webp"
                    alt="Phase one concept: Career Coach, a guided one-task-at-a-time experience"
                    width={1400}
                    height={929}
                    animated
                    caption="Career Coach: one task at a time, information proactively surfaced. Strong for a candidate who wants to be led, but guidance gets stifling and the content maintenance burden is high."
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
                    A third concept, Career Workplace, borrowed Workplace&rsquo;s structure and social graph. It matched a mental model candidates already had, but the structure limited functionality and social networking was never validated as a candidate need.
                  </p>

                  <p>
                    Each of the three was a good <em>feature idea</em> wearing the costume of a <em>framework</em>. What was missing was the framework itself. That reframing is what phase two was for.
                  </p>

                  <Alert
                    variant="info"
                    title="The premise that unlocked it"
                    description="Career Profile should be applicable to everyone, and personalisation should come from content curation rather than redesigning the surface per audience. That single line killed the idea of a different Career Profile per candidate type, and made everything after it possible."
                    className={styles.calloutAlert}
                  />

                  <h2 id="typologies">Typologies: a shared vocabulary for pages</h2>

                  <p>
                    Before designing screens we needed a way to classify them. A typology sorts content by the mental model a user brings to it, and clear typologies meant a set of templates that could scale Career Profile consistently instead of accumulating one-off pages. We landed on three.
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
                    Three typologies meant three page templates, and three templates meant a partner team building a new feature into Career Profile finally had somewhere to put it that wouldn&rsquo;t degrade the experience for everyone else.
                  </p>

                  <h2 id="design-system">The system underneath</h2>

                  <p>
                    We evaluated three design systems against engineering effort and fit. Geodesic, the incumbent, had powerful data-visualisation components and supported complex workflows, but was never built for consumer-facing products. XMDS was recommended by Meta Brand and approved for external use, but was still in development and required the XMDS team to approve every design.
                  </p>

                  <Fig
                    src="ds-xds-people-theme.png"
                    alt="XDS People Theme, the design system direction we leaned toward"
                    width={1115}
                    height={727}
                    caption="XDS People Theme: used by the People Products partner team, mobile support, and a dedicated team open to collaboration. Still in development and light on data-visualisation components. Medium-to-high effort, and the direction we leaned toward, with the honest recommendation to finish the diligence in H1 2023 rather than force a call we couldn't defend."
                  />

                  <h2 id="five-degrees">Five degrees of change</h2>

                  <p>
                    In a set of worksessions in Burlingame we laid the direction out as five options on a deliberate spectrum, from no change to overhaul, so leadership could see the trade space instead of a single recommendation. Structure first, before any visual design.
                  </p>

                  <Fig
                    src="worksession-greybox-a.png"
                    alt="Greybox structural exploration from the worksessions"
                    width={1729}
                    height={1117}
                    caption="Greybox exploration: testing how much the page could carry and where the timeline wanted to live, before committing to any visual language."
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
                    Scored against build-for-all, clarity, scale, efficiency and innovation, Timeline as Anchor came out ahead. It was the only option that solved the framework problem rather than the surface problem. The timeline is the one thing every candidate has in common, it is the thing they came to the page to check, and making it the organising principle meant content could be surfaced contextually instead of dumped on a homepage.
                  </p>

                  <h2 id="the-system">The system we built</h2>

                  <Fig
                    src="component-dynamic-timeline.webp"
                    alt="The dynamic timeline component, showing completed, active and future stages"
                    width={395}
                    height={976}
                    animated
                    caption="The dynamic timeline: completed stages show status and dates, the active stage adds duration and activity badges, future stages show what's coming. An active-role selector sits above it, because candidates can be in more than one process at once."
                  />

                  <Fig
                    src="component-timeline-drives-content.webp"
                    alt="Selecting a timeline stage re-composes the main content area"
                    width={1400}
                    height={909}
                    animated
                    caption="The key mechanic: the active timeline state determines what appears in the content area. Select a future stage and the page tells you how to prepare for it; select the active one and it tells you what to do right now."
                  />

                  <p>
                    With the timeline as the anchor, the rest of the page became a priority-ranked, flexible card system: primary cards above the fold in the centre column, secondary cards in the right rail, and flex cards that resize to fit whatever the candidate&rsquo;s type, seniority and stage call for. That is what let one page template serve a prospective candidate and a signed hire, and what gave partner teams a place to build without renegotiating the layout each time.
                  </p>

                  <h2 id="key-screens">Key screens</h2>

                  <Fig
                    src="screen-home-prospective.png"
                    alt="Career Profile home for a prospective candidate"
                    width={2048}
                    height={1330}
                    caption="Home, prospective candidate. Typology: Browse. Before a consideration exists there is no timeline yet, so the page is about getting started. All candidate, recruiter and interviewer data shown here is fictional."
                  />

                  <Fig
                    src="hero-timeline-home.png"
                    alt="Career Profile home during the screening interview stage"
                    width={2048}
                    height={1330}
                    caption="Home, screening interview. Typology: Work. “Help me figure out what I need to do right now”: join the conference, see what's next, complete your tasks, reach a human. This is the state the timeline was designed for."
                  />

                  <Fig
                    src="screen-home-onsite-lookahead.png"
                    alt="Career Profile home with a future interview stage selected"
                    width={2048}
                    height={1330}
                    caption="The same page, looking ahead: the candidate selects a future stage and the whole thing re-composes around preparing for it."
                  />

                  <h2 id="the-offer">The offer experience</h2>

                  <p>
                    This is the part I brought with me. On the Offers team our planned Offer Summary 2.0 revamp had been paused for engineering capacity, and rather than shelve the thinking I wrote a vision brief arguing the case for a genuinely full-featured offer experience. The evidence was hard to argue with.
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
                    Using the Offer Summary effectively forced recruiters to share approved compensation values with the candidate, and the recruiters who worked that way saw higher acceptance, candidates accepting about half a day sooner, and offers extending nearly two days faster. If transparency moved those numbers at 72% usage, a complete, honest, self-serve offer experience at full usage was worth designing for. There was a compliance argument underneath it too: the whole system depended on an individual recruiter to orchestrate, and nothing guaranteed a candidate received what they needed to decide.
                  </p>

                  <Fig
                    src="screen-offer-summary-compensation.png"
                    alt="The job offer summary, showing a full compensation breakdown"
                    width={2048}
                    height={1330}
                    caption="The argument, living inside the framework: role, compensation, life at Meta, team, career, and a VR offer explorer. The compensation breakdown is complete and self-serve (base, bonus, equity, sign-on, benefits, with definitions attached), so the candidate isn't dependent on a recruiter to know what they've been offered. All figures illustrative."
                  />

                  <Fig
                    src="screen-prehire-sign-offer.png"
                    alt="The pre-hire checklist for reviewing and signing an offer"
                    width={2048}
                    height={1330}
                    caption="Pre-hire checklist. Typology: Work. “Help me get across the finish line”: sign, update information, background check, select equipment. The journey doesn't end at signature."
                  />

                  <p>
                    Meta was betting on both ends of the offer moment in the same period. This was the self-serve half; <Link href="/work/meta-immersive-offers" className={styles.inlineLink}>Immersive Offers</Link> was the human half.
                  </p>

                  <h2 id="personalisation">Personalisation without a second product</h2>

                  <p>
                    The premise held all the way through. Two very different candidates, the same framework, different curation.
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

                  <h2 id="what-happened">What happened</h2>

                  <p>
                    We delivered the phase two milestone deck in December 2022: the convergence, the typologies, the design-system recommendation, the evaluated concepts, the component system, the key screens, and an interactive prototype across the full journey. The plan for H1 2023 was to build the templates, finish the system diligence, formalise the Career Site relationship, and publish a partner manual for teams building into Career Profile.
                  </p>

                  <p>
                    That didn&rsquo;t happen. In the middle of the engagement Meta announced 11,000 layoffs, and the business context changed underneath the project. The team couldn&rsquo;t align on a design solution before the holidays, and the work was paused alongside significant organisational change.
                  </p>

                  <p>
                    I include it anyway, because the thinking is the part worth being judged on, and because the way it ended taught me more than a launch would have.
                  </p>

                  <h2 id="what-id-do-differently">What I&rsquo;d do differently</h2>

                  <p>
                    I responded to a hard deadline by working harder. Long hours, high energy, pushing to get high-fidelity prototypes and supporting evidence in front of the team. When the ground shifted under us I kept powering ahead, hoping to regain momentum. The team, me included, didn&rsquo;t react quickly enough to the new reality.
                  </p>

                  <Quote variant="pull">
                    Effort does not equal impact, and brute force is rarely the tool the problem calls for.
                  </Quote>

                  <p>
                    When significant change happens outside your control, the move is to slow down, reflect and realign before making major design recommendations. The related Offer Summary pause taught the same lesson from another angle: we knew early that the project would be hard to measure, didn&rsquo;t aggressively fix that, and the eventual decision to pause rested on data we already knew was unreliable. Capture the metrics that let work move forward, and force the difficult conversation before the decision rather than after it.
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
                    <span className={styles.detailValue}>Vision work · milestone delivered December 2022 · paused</span>
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
