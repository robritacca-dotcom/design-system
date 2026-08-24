"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SampleCaseStudyCard from "../../../components/SampleCaseStudyCard/SampleCaseStudyCard";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  workSidebarLinks,
  "/work/meta-immersive-offers"
);

const IMG = "/images/meta-immersive-offers";

type Lightbox = { src: string; alt: string } | null;

function Fig({
  src,
  alt,
  width,
  height,
  caption,
  onZoom,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  onZoom: (src: string, alt: string) => void;
}) {
  return (
    <figure className={styles.articleFigure} onClick={() => onZoom(src, alt)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={styles.articleImage}
        style={{ width: "100%", height: "auto" }}
      />
      <figcaption className={styles.articleCaption}>{caption}</figcaption>
    </figure>
  );
}

export default function MetaImmersiveOffersCaseStudy() {
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
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          {/* Page header */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>
              Designing a job offer you can step inside
            </h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Leading design on Meta&apos;s Immersive Offers: a Horizon Worlds
            experience that reimagined the job offer stage in VR, built by a
            team that had never built anything in VR before
          </p>

          {/* Cover video — first-person walkthrough of the world */}
          <div className={`${styles.cover} ${styles.videoWrapper} animate-in animate-delay-2`}>
            <iframe
              src="https://www.youtube.com/embed/mJbxbFpnGx0"
              title="First-person walkthrough of the Meta Offer VR Explorer world, from the passcode lobby to the offer display"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Two-column body */}
          <div className={`${styles.resumeLayout} animate-in animate-delay-3`}>
            <div className={styles.resumeMain}>
              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Case study</h2>
                </div>

                <article className={styles.body}>
                  <p className={styles.lede}>
                    In 2021, Meta declared it would be metaverse-first, and every team across the company was challenged to experiment with VR in its own domain. For Recruiting, that mandate became Recruiting in the Metaverse: an initiative spanning six orgs, tasked with launching 0 → 1 VR pilots in a single half.
                  </p>

                  <p>
                    I was the lead designer on Meta&apos;s Recruiting Offers team, so when the initiative needed someone to design the offer-stage experience, I was the natural fit on paper. In reality, nobody on the team had ever built a VR product. Not the PMs, not the researchers, not me. There were no mocks to draw, no design system to lean on, no precedent to follow. We had access to VR consultants (XR Hub, Meta&apos;s internal XR enablement team, plus third-party world builders), a pre-existing storyboard concept, and a deadline.
                  </p>

                  <p>
                    That is what this case study is really about. Not the headset: the ambiguity. Designing in three dimensions, for a journey that was both physical and digital, on an emergent platform, with a team learning the medium in real time.
                  </p>

                  <Fig
                    src={`${IMG}/context-why-now.jpg`}
                    alt="Slide explaining why Recruiting should explore the metaverse now"
                    width={2048}
                    height={1152}
                    caption="The top-down mandate: a metaverse-first company, an H2 investment priority, and Recruiting's top priority for the half."
                    onZoom={zoom}
                  />

                  <h2 id="the-problem">The problem</h2>

                  <p>
                    Offers are the most expensive moment in the funnel to lose. Meta was extending <strong>tens of thousands of offers a year</strong>, and roughly a quarter of them were declined. That is thousands of candidates walking away at the very end of a hiring process the company had already fully paid for.
                  </p>

                  <p>
                    Our research pointed to part of the reason: candidates sometimes lack information at the offer stage, about compensation mechanics, benefits, and growth, and that gap may contribute to declines. The information candidates wanted most after an offer was exactly what we could deliver richly: roughly four in five rated compensation very important, with benefits and role expectations close behind.
                  </p>

                  <p>
                    So the brief became <strong>Immersive Offers</strong>: take the offer call, one of the most exciting calls of a person&apos;s life, and let candidates step inside it. The celebratory conversation that usually happens over the phone became a private VR world a candidate could share with their recruiter: a place to hear what the offer means, explore compensation, benefits, and growth at their own pace, and actually celebrate getting the job.
                  </p>

                  <p>
                    Candidates with a verbal offer would be invited in, on a loaned Meta Quest 2 if needed, to learn about their offer in a way no other company could match. All without touching the standard offer process in any way.
                  </p>

                  <p>
                    That last part matters. The standard flow was being rebuilt at the same time, by the same team: <Link href="/work/meta-offers" className={styles.inlineLink}>structured compensation capture</Link> went after the speed of getting a supported offer approved and out. This was the parallel bet on the other half of the problem, what the candidate experiences once it reaches them.
                  </p>

                  <p>The dimensions of the problem:</p>

                  <ul>
                    <li>A P0 project within Recruiting in the Metaverse, H2 2022</li>
                    <li>A core team of one PM, one product designer (me), one data scientist, one programme manager, and one researcher, plus dozens of cross-functional partners across six internal and external teams</li>
                    <li>Real-world challenges (shipping and returning headsets, logistics, hardware) tangled with digital ones (VR platform constraints, security, privacy)</li>
                    <li>Nobody, including me, had ever shipped a VR experience</li>
                  </ul>

                  <h2 id="taking-the-reins">Taking the reins on a project nobody knew how to start</h2>

                  <p>
                    The early weeks were thrash. We genuinely did not know what to hand to XR Hub and the world builders to get development started. A storyboard concept existed, but a storyboard is not a spec, and in VR there is no such thing as handing off a Figma file.
                  </p>

                  <p>
                    I decided the fastest way through the ambiguity was to make something concrete for the team to react to. I single-handedly developed the initial mood board, the vision inspiration, and the overall layout and structure of the world: effectively the floor plan of a building rather than the screens of an app.
                  </p>

                  <Fig
                    src={`${IMG}/floor-plan-the-space.png`}
                    alt="Floor plan of the Immersive Offers world showing the central stage and content booths"
                    width={1394}
                    height={767}
                    caption="Designing in 3D means designing space: a central Home stage, four core content booths (Financial, Career Growth, Benefits, Core Values), and playful secondary content (DJ booth, MPK model, offer display)."
                    onZoom={zoom}
                  />

                  <p>
                    That deliverable unblocked the project. It gave XR Hub and the third-party builders the structure they needed to start, and it became the backbone of the <strong>creative brief</strong>, the artefact I authored that served as the team&apos;s source of truth for the entire build. The brief established:
                  </p>

                  <ul>
                    <li>Eight creative tenets (Seamless, Unobtrusive, Informative, Privacy-centric, Entertaining, Beautiful, Free flowing, On-brand) that let a large, disparate group of stakeholders make consistent decisions without me in the room</li>
                    <li>The multi-layered candidate journey, spanning the real world and the virtual one</li>
                    <li>Creative requirements for the world builders: intent, visual themes, content, and interaction triggers for every point of interest in the world</li>
                  </ul>

                  <Fig
                    src={`${IMG}/creative-tenets.png`}
                    alt="The eight creative tenets from the Immersive Offers creative brief"
                    width={2200}
                    height={1238}
                    caption="The eight creative tenets. Unobtrusive and Privacy-centric did the heaviest lifting: the experience had to stay supplementary and generic, never risking the actual offer."
                    onZoom={zoom}
                  />

                  <p>
                    This is what design leadership looked like on a project with no established craft: not pixel-perfect mocks, but the artefacts that let twenty people move in one direction.
                  </p>

                  <h2 id="service-design">Service design: the journey was bigger than the world</h2>

                  <p>
                    The VR world was maybe a third of the design problem. A candidate&apos;s journey ran through a recruiter conversation, an opt-in, a headset shipped to their home, unboxing, a notoriously painful VR first-time setup, the in-world experience, and a return shipment. The real offer process ran in parallel the entire time, untouched.
                  </p>

                  <p>
                    I used a service design framework to map all of it. I blueprinted the standard offer process first, grounding the team in the baseline we must not harm, then blueprinted the immersive journey across candidate, recruiter, coordinator, XR Hub, and logistics swimlanes, with failure modes at every stage.
                  </p>

                  <Fig
                    src={`${IMG}/candidate-journey-summary.png`}
                    alt="Summary of the immersive candidate journey running alongside the standard offer process"
                    width={2200}
                    height={1238}
                    caption="The immersive journey runs concurrent to the standard process: Invite, Ship, Unbox, Setup, Immerse, Return, kicked off at hire decision."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/service-blueprint-standard-offer.png`}
                    alt="Service blueprint of Meta's standard offer process"
                    width={2200}
                    height={950}
                    caption="First, the baseline: the standard offer process, instrumented with real cycle-time data from hire decision through to offer extend."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/service-blueprint-immersive-offers.png`}
                    alt="Service blueprint of the immersive offers journey from invitation to headset return"
                    width={2200}
                    height={1238}
                    caption="Then the new service layered on top: front-stage and backstage actors, touchpoints, and possible pains for every phase from invitation to headset return."
                    onZoom={zoom}
                  />

                  <p>
                    To make the journey tangible for stakeholders, I also built a storyboard version, following a candidate and a recruiter through each moment:
                  </p>

                  <Fig
                    src={`${IMG}/candidate-journey-invitation.png`}
                    alt="Storyboard frame of a recruiter inviting a candidate to the immersive offer experience"
                    width={2200}
                    height={1238}
                    caption="One frame of the narrative journey: the recruiter extends an invitation that in no way impacts the offer process. We sweated over that language, because keeping pressure at zero was a design requirement."
                    onZoom={zoom}
                  />

                  <p>
                    These diagrams were not shelf-ware. They scoped the pilot and drove the logistics plan for shipping headsets. I also designed the unglamorous artefacts at the edges of the journey: the printed instruction brochure that shipped in the headset box, and the in-world lobby flow with a secure passcode gate protecting the experience.
                  </p>

                  <Fig
                    src={`${IMG}/candidate-brochure.png`}
                    alt="Printed instruction brochure shipped with each loaner headset"
                    width={1581}
                    height={2048}
                    caption="The physical brochure shipped with each loaner Quest 2, because the hardest UX problem in VR is everything that happens before the headset goes on."
                    onZoom={zoom}
                  />

                  <h2 id="the-world-itself">The world itself</h2>

                  <p>
                    We built the world in Horizon Worlds with a third-party builder. I co-led creative and UX strategy alongside our content designer and gave creative direction and UX feedback throughout the build. The world had the same two jobs as the vision: teach and celebrate. Research drove the teaching half, with booths mapping directly to what candidates said they wanted most at the offer stage. Celebration drove the rest: the central stage, the DJ booth, the golden offer letter.
                  </p>

                  <Fig
                    src={`${IMG}/world-lobby.jpg`}
                    alt="The gated lobby of the world with a passcode keypad"
                    width={1706}
                    height={960}
                    caption="Candidates spawn into a gated lobby and step up to a keypad to enter their passcode: privacy and exclusivity, made spatial."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/world-home-stage.jpg`}
                    alt="The celebratory central home stage of the world"
                    width={1706}
                    height={960}
                    caption="Through the doors: a celebratory central stage. Approaching it triggers a recorded welcome from a senior recruiter."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/world-compensation.jpg`}
                    alt="The compensation booth with interactive stock certificate and coins"
                    width={1706}
                    height={960}
                    caption="Compensation: interactive objects (a stock certificate, stacked coins) trigger audio and pop-up explanations of financial support, bonus structure, and RSUs."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/world-career-growth.jpg`}
                    alt="The career growth booth with four content pillars"
                    width={1706}
                    height={960}
                    caption="Career Growth: four pillars covering onboarding, coaching and mentoring, self-paced learning, and D&I programmes."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/world-benefits.jpg`}
                    alt="The wellness-themed benefits booth"
                    width={1706}
                    height={960}
                    caption="Benefits: a wellness-themed booth where tappable objects explain health, family, time-off, and travel benefits."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/world-core-values.jpg`}
                    alt="The Meta core values poster wall"
                    width={1706}
                    height={960}
                    caption="Core Values: a poster wall with audio for each value."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/world-product-display.jpg`}
                    alt="A display of the Meta product family"
                    width={1706}
                    height={960}
                    caption="The playful layer: a Meta product family display. Candidates can pick devices up, carry them, throw them."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/world-dj-booth.jpg`}
                    alt="The DJ booth with a disco ball and lighting effects"
                    width={1706}
                    height={960}
                    caption="A DJ booth with music and lighting effects, because Entertaining was a tenet, not an afterthought."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/world-offer-letter.jpg`}
                    alt="A golden offer letter floating in a display case"
                    width={1706}
                    height={960}
                    caption="The centrepiece Easter egg: a golden, floating offer letter rotating in a display case."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/world-meta-hq-model.jpg`}
                    alt="A miniature model of Meta's MPK headquarters campus"
                    width={1706}
                    height={960}
                    caption="A miniature MPK campus model with narrated facts: a way to visit headquarters from anywhere."
                    onZoom={zoom}
                  />

                  <h2 id="pilot-feedback-and-fixes">Pilot, feedback, and fixes</h2>

                  <ul>
                    <li><strong>Launched the internal pilot in November 2022</strong> to dozens of internal dogfooders: Recruiting&apos;s first externally-oriented VR pilot, real headset shipping logistics included</li>
                    <li>Identified the need for, and saw through, a candidate-facing survey in Career Profile asking candidates whether they owned a Quest and wanted to join metaverse pilots. It answered our short-term planning question (how many loaners do we need?) while building a warm pilot pool for the future</li>
                    <li>Collected and triaged dogfooding insights with the team; we shipped fixes for <strong>dozens of critical issues</strong> the following month</li>
                    <li>Published the project feedback summary for the wider organisation</li>
                  </ul>

                  <Fig
                    src={`${IMG}/career-profile-headset-survey.jpg`}
                    alt="Career Profile survey asking candidates whether they have access to a Meta Quest"
                    width={1904}
                    height={1349}
                    caption="The opt-in survey I drove in Career Profile, turning an operational unknown into actionable data and a future pilot pipeline."
                    onZoom={zoom}
                  />

                  <p>What the pilot told us:</p>

                  <ul>
                    <li><strong>84%</strong> of participants had no logistics issues: the shipping service design held up</li>
                    <li>The majority found it easy to review the offer details in-world</li>
                    <li>Average time spent in-world was <strong>over ten minutes</strong>, meaningful engagement for entirely optional content</li>
                    <li>And honestly: VR&apos;s new-user setup burden was real, 30 to 60 minutes for many testers. The medium was not ready to be ubiquitous. Learning that with evidence was the point of the pilot</li>
                  </ul>

                  <h2 id="the-ending">The ending, and what survived it</h2>

                  <p>
                    The project ended after the pilot, as company direction changed and priorities shifted across the initiative.
                  </p>

                  <p>
                    It still ranks among the most formative projects of my career. The work put further XR projects on the following half&apos;s roadmap and led to patent filings, including one for the immersive offer letter itself. The learnings, about building in VR, about designing services that cross the physical and digital boundary, about enhancing rather than replacing human processes, were documented for every org in the company to use.
                  </p>

                  <p>For me, the takeaways were not about VR at all:</p>

                  <ul>
                    <li><strong>Ambiguity is a design material.</strong> When nobody knows what to build, the person who makes the first concrete artefact sets the direction. The mood board and world layout I built unblocked an entire cross-org team</li>
                    <li><strong>In new mediums, design leads through frameworks, not mocks.</strong> The creative brief, tenets, journeys, and blueprints were the design system</li>
                    <li><strong>Put on the headset.</strong> The fastest alignment tool we had was getting stakeholders into VR and letting them feel the answer</li>
                    <li><strong>The experience begins long before the product does.</strong> Our hardest problems were cardboard boxes, passcodes, and half-hour setup flows, not anything inside the world</li>
                  </ul>

                  <h2 id="in-their-words">In their words</h2>

                  <div className={styles.peerQuotes}>
                    <blockquote className={styles.peerQuote}>
                      <p className={styles.peerQuoteText}>
                        &ldquo;During the early stages of planning and scoping the work for our Recruiting in the Metaverse efforts we were thrashing somewhat significantly. We really did not know what to deliver to XR Hub to get development started. Despite this massive ambiguity, Rob took the reins and single-handedly developed the initial mood board, vision inspiration, and overall layout and structure of the Immersive Offers World. This deliverable completely unblocked work&hellip; If Rob had not taken this initiative, I believe we would have continued to remain at an impasse.
                      </p>
                      <p className={styles.peerQuoteText}>
                        This was just one of many areas in which Rob drove the creative and product direction of the Immersive Offers experience&hellip; Rob incorporated feedback from a large and disparate group of cross-functional partners, filtering the signal through the noise. Rob also built user journey output that helped us scope and successfully execute a complex pilot which involved shipping headsets. This process diagram, along with the Creative Brief he built, were constantly referred to by myself and the broader team (including the 3rd party that was building the World) as a way to anchor to our overall vision and direction.&rdquo;
                      </p>
                      <footer className={styles.peerQuoteFooter}>Product Program Manager, Meta</footer>
                    </blockquote>
                  </div>

                  <h2 id="beyond-immersive-offers">Beyond Immersive Offers</h2>

                  <p>
                    Immersive Offers was the flagship, but my role extended across the initiative. I supported and coached the lead designer on <strong>VR Interview Prep</strong>, our parallel pilot giving candidates unlimited avatar-based behavioural interview practice, and contributed to the longer-term vision of consolidating all recruiting experiences into a single Meta Recruiting app in the Oculus Store.
                  </p>

                  <Fig
                    src={`${IMG}/vr-interview-prep-hero.jpg`}
                    alt="The VR Interview Prep experience with avatar-based interview practice"
                    width={2048}
                    height={1152}
                    caption="VR Interview Prep, the parallel pilot I supported as a design coach: STAR-method behavioural interview practice with avatars."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/project-timeline.png`}
                    alt="Project timeline from August 2022 kickoff through the 2023 candidate launch scope"
                    width={2200}
                    height={1238}
                    caption="Six months from kickoff to pilot: Plan, Create, Build, Pilot, Refine, with the candidate launch scoped for 2023."
                    onZoom={zoom}
                  />

                  <Fig
                    src={`${IMG}/world-selfie.jpg`}
                    alt="My avatar taking a selfie in the world, standing between the Compensation booth and the central stage"
                    width={2560}
                    height={1567}
                    caption="One for the archive: a selfie I took in the world during dogfooding. The world no longer exists; the screenshots are what remains."
                    onZoom={zoom}
                  />

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
                    <span className={styles.detailValue}>Product Designer · Lead designer, Immersive Offers</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Platforms</span>
                    <span className={styles.detailValue}>Meta Quest 2 · Horizon Worlds</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Year</span>
                    <span className={styles.detailValue}>2022</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Team</span>
                    <span className={styles.detailValue}>1 PM · 1 PD · 1 DS · 1 PPM · 1 UXR · 6 partner teams</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Status</span>
                    <span className={styles.detailValue}>Internal pilot · November 2022</span>
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
                    <span className={`material-symbols-rounded ${styles.linkIconSymbol}`} aria-hidden="true">description</span>
                    <span className={styles.toolName}>Google Docs</span>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/meta.svg" alt="" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Meta Quest 3</span>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          <SampleCaseStudyCard />
        </main>
      </div>

      {lightbox && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Image preview">
          <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close preview">
            <span className="material-symbols-rounded">close</span>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
