"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import SampleCaseStudyCard from "../../../components/SampleCaseStudyCard/SampleCaseStudyCard";
import { Figure } from "@robr0/design-system/components/Figure/Figure";
import { Stat } from "@robr0/design-system/components/Stat/Stat";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  workSidebarLinks,
  "/work/augmenta-ai"
);

export default function AugmentaCaseStudy() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

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
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          {/* Page header */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Augmenta Construction Platform</h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Turning automation into usability — the redesign behind 42% faster outcomes.
          </p>

          {/* Hero video */}
          <figure className={`${styles.videoHero} animate-in animate-delay-2`}>
            <div className={styles.videoFrame}>
              <iframe
                src="https://www.youtube.com/embed/mkhLi4tnHgk"
                title="Augmenta Construction Platform — product walk-through"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={styles.videoIframe}
              />
            </div>
          </figure>

          {/* Two-column body */}
          <div className={`${styles.resumeLayout} animate-in animate-delay-3`}>
            {/* Main — article body */}
            <div className={styles.resumeMain}>
              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Case study</h2>
                </div>

                <article className={styles.body}>
                  <h2 id="context">Context</h2>

                  <p>
                    Augmenta generates constructible, code-compliant designs of electrical raceways — the conduit, cable tray, and supports that connect every piece of electrical equipment in a building. Their target user is the Virtual Construction Designer: the engineer inside Autodesk Revit who plans how a project actually gets built. Think Figma, but for the physical world — high-stakes, governed by real-world physics, strict compliance, and precise engineering standards.
                  </p>

                  <Figure onClick={() => setLightbox({ src: "/images/augmenta/slide25-img02.png", alt: "A Virtual Construction Designer working inside the Augmenta platform" })} caption={<>A Virtual Construction Designer working inside Augmenta — the target user for the redesign.</>}>
                    <Image
                      src="/images/augmenta/slide25-img02.png"
                      alt="A Virtual Construction Designer working inside the Augmenta platform"
                      width={1600}
                      height={950}
                    />
                  </Figure>

                  <Figure onClick={() => setLightbox({ src: "/images/augmenta/slide12-img03.gif", alt: "Generated output rendered in 3D inside the Augmenta platform" })} caption={<>Generated output rendered in 3D inside the Augmenta platform — the full spatial result of a successful run.</>}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/augmenta/slide12-img03.gif"
                      alt="Generated output rendered in 3D inside the Augmenta platform"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Figure>

                  <p>
                    I was the sole product designer on a small, deeply engineering-led team — owning product design strategy, research, and execution. When I joined: a single design partner, a handful of pilot firms testing, a growing waitlist, and pre-revenue, funded entirely by investors. Critically, the product had been built around that one design partner&apos;s highly specific workflow — the reference point for nearly every decision.
                  </p>

                  <h2 id="why-it-matters">Why it matters</h2>

                  <p>
                    Construction runs on thin margins. Rising material costs, inflation, and waste leave little room for error — and modern commercial buildings are staggeringly complex, demanding tight coordination across electrical, mechanical, and plumbing trades that are usually run by separate firms, in silos.
                  </p>

                  <p>
                    To de-risk all of this, large projects rely on Building Information Modelling (BIM): Virtual Construction Designers model each trade in 3D, inside the architect&apos;s Revit model, so the hard decisions get made up front. Done well, components can be pre-fabricated off-site — installers simply follow the blueprint instead of cutting and coordinating in the field. That is the ideal modern workflow.
                  </p>

                  <p>
                    But BIM is hard. Skilled modellers are scarce, coordination across siloed trades is fragile, and a single sync error or philosophical disagreement can burn enormous design effort — and still leave problems to solve on site. Augmenta set out to automate this technical design work with AI, starting with electrical, ultimately translating an AI-generated, human-supervised model into real, fabricated components any installer can pick up and install.
                  </p>

                  <h2 id="the-opportunity">The opportunity</h2>

                  <p>
                    The prize is enormous. A traditional manual workflow — model, coordinate, edit, then pre-fabricate — represents a huge block of skilled design hours before anything reaches the field. A flawless AI generation could, in theory, produce the same output in a fraction of that time: a potential <strong>95%+ reduction</strong> in modelling effort, with no edits and no extra coordination.
                  </p>

                  <p>
                    Reality, when I joined, fell far short. It took many generation cycles — often weeks — to reach a single useful output, before any coordination or edits. The time savings were marginal, and the way generations worked introduced risk and eroded trust, so pilot firms were reluctant to put it on real projects.
                  </p>

                  <p>
                    That set our North Star. Pilot firms told us they would walk away after about a week of iterating — a handful of cycles — if they hadn&apos;t seen a useful result. Not because a week is ideal, but because it was the threshold they would not cross. Getting a trustworthy, useful output inside that window became the goal everything pointed at.
                  </p>

                  <h2 id="the-problem">The problem</h2>

                  <p>The product was hard to use. Three symptoms, one root cause:</p>

                  <ul>
                    <li><strong>Too feature-heavy</strong> — trying to serve every persona at once</li>
                    <li><strong>Inconsistent, confusing UX</strong> — patterns and components drifted across the app, with poor information architecture</li>
                    <li><strong>Slow value delivery</strong> — too many cycles to a useful output, driving abandonment</li>
                  </ul>

                  <p>
                    Implications stretched across the business: customers got unconstructable, slow-to-generate solutions that needed intensive support; the company carried high churn risk and unsustainable compute and support costs; design had to balance complex firm-specific needs against scalability and low-touch usability.
                  </p>

                  <p>
                    What made this uniquely hard is that the output is ruthlessly objective. A design is &ldquo;constructable&rdquo; only if it satisfies several dimensions at once — correct electrical load and capacity for the building, the right materials, and clash-free coordination against the mechanical and plumbing trades. The stakes are high: a wrong calculation can waste material, cost money in the field, or — in the case of electrical load — cause catastrophic real-world damage.
                  </p>

                  <p>
                    So Augmenta&apos;s engineers held a deliberately high bar for correctness and completeness, only surfacing solutions that met strict mathematical standards. The byproduct was unforgiving: a minor input error — a mislabeled roof material — could mean zero solutions at all, eroding trust and usability.
                  </p>

                  <h2 id="approach">Approach</h2>

                  <p>
                    To get inside the customer&apos;s head, I designed a workshop I ran on repeat with each of our pilot electrical design firms. The goal was to map their real workflows, test product fit, and prioritize what to build or deprecate. The format was a journey-mapping and service-blueprinting exercise: we mapped their key functions and deliverables over time, walked through which Augmenta capabilities fit each phase, and captured their feedback.
                  </p>

                  <Figure onClick={() => setLightbox({ src: "/images/augmenta/slide30-img01.png", alt: "Service blueprint extracted from a lighthouse customer workshop" })} caption={<>Service blueprint extracted from a lighthouse customer workshop — mapping the real workflow to identify where the product fit and where it fell short.</>}>
                    <Image
                      src="/images/augmenta/slide30-img01.png"
                      alt="Service blueprint extracted from a lighthouse customer workshop"
                      width={1600}
                      height={950}
                    />
                  </Figure>

                  <p>
                    By the end we had a blueprint for each firm — similar in shape, but with telling differences. We consolidated them into a single unified customer journey, and one pattern jumped out: the only process every firm shared, at roughly the same point, was electrical <em>routing</em>.
                  </p>

                  <p>
                    That was the unlock. Our software didn&apos;t just route — it also calculated electrical load and chose materials, a far more complex job. But most designers at these firms never did those calculations, and wouldn&apos;t have had the authority to anyway. The feature that defined the product was overkill for the market. It existed because the whole product had been built around our single design partner&apos;s workflow — which turned out to be far less common than we had assumed.
                  </p>

                  <p>
                    <strong>The decision: refocus 100% on electrical routing, not calculations.</strong> Less strain on the system, a more concentrated effort to do one thing well, and a clean path to many more customers.
                  </p>

                  <p>
                    <strong>Renewed focus:</strong> Virtual Construction Design teams, from project kickoff through early phases of coordination. Not earlier (device layout, conduit sizing). Not later (detailing, assembly drawings). One persona, one slice of the workflow, done well.
                  </p>

                  <h2 id="solution">Solution</h2>

                  <p>Three problems, three answers.</p>

                  <h3 id="right-surface-for-the-right-user">1. Right surface for the right user</h3>

                  <p>
                    Identified VDCs as the MVP persona and doubled down on solution data — exposing more signal about completion (routed sources and destinations) and correctness (constructability). Everything the VDC teams didn&apos;t care about, including the load calculations, came off the critical path.
                  </p>

                  <h3 id="consistency-through-a-design-system-overhaul">2. Consistency through a design-system overhaul</h3>

                  <p>
                    The product had been hand-built in close partnership with an electrical design firm — not a designer — and heavily shaped by engineering preference. A heuristic audit surfaced the rest: poor information architecture, poor use of screen space, missing system status, and incoherent errors that made troubleshooting painful.
                  </p>

                  <p>
                    So I brought in <a href="https://ant.design/" target="_blank" rel="noopener noreferrer">Ant Design</a> as a foundation and worked with engineering to rip and replace every component — redesigning each screen, writing specs and stories, and handing off a master prototype we used for team alignment and testing with pilot firms. The wins were immediate: clearer IA, far higher screen density (several times more studies visible at once), and a dark mode the pilot firms loved.
                  </p>

                  <Figure onClick={() => setLightbox({ src: "/images/augmenta/screen-density.png", alt: "Screen density: low to high" })} caption={<>Screen density: low to high.</>}>
                    <Image
                      src="/images/augmenta/screen-density.png"
                      alt="Screen density: low to high"
                      width={1600}
                      height={950}
                    />
                  </Figure>

                  <Figure onClick={() => setLightbox({ src: "/images/augmenta/slide36-img01.png", alt: "Figma prototype created for team alignment and engineering handoff" })} caption={<>Figma prototype used to align the team and support engineering handoff — bridging design intent and implementation.</>}>
                    <Image
                      src="/images/augmenta/slide36-img01.png"
                      alt="Figma prototype created for team alignment and engineering handoff"
                      width={1600}
                      height={950}
                    />
                  </Figure>

                  <p>
                    <strong>Framing mattered too.</strong> We replaced engineering-speak with intent-aligned language — &ldquo;Placement considerations&rdquo; instead of &ldquo;Unhandled error&rdquo; — turning daunting, catastrophic-sounding failures into calm, actionable guidance.
                  </p>

                  <h3 id="faster-value-through-better-inputs-and-signal">3. Faster value through better inputs and signal</h3>

                  <p>Two changes attacked time-to-value head-on.</p>

                  <p>
                    <strong>Better inputs.</strong> Unlike a chat assistant, these prompts are 100% mathematical. The first generation was rarely useful because the input wasn&apos;t granular enough — so we reorganized the prompt structure and roughly doubled the number of fields for fine-grained control. That alone doubled the usability of the very first generation, right out of the gate.
                  </p>

                  <p>
                    <strong>Better signal.</strong> Because of the high mathematical bar, the system would detect an error — a clash, say — and silently stop, producing zero output even after a customer had spent time prompting. We did it to save compute and to avoid handing over obviously unconstructable designs. The byproduct was no signal: the customer had no idea why it failed, even when the cause was a small, fixable input error on their end.
                  </p>

                  <p>
                    After analyzing hundreds of failed generations, we found the common culprits — clashing chief among them — and made a bet: instead of stopping, let the generation complete and visualize each problem in 3D, as a big red box right where the issue was. It was a breakthrough. Customers could see the full solution, tie each red box to specific parts or routes, fix the problem themselves, and lean on Augmenta far less. Surfacing this previously hidden signal sent successful generations up <strong>~900%</strong> and user analysis of solutions up <strong>~400%</strong>.
                  </p>

                  <Figure onClick={() => setLightbox({ src: "/images/augmenta/slide43-img01.png", alt: "The team reviewing AI output together — flagging anomalies and aligning on engineering and UX fixes" })} caption={<>The team reviewing AI output together — identifying anomalies and aligning on fixes from both an engineering and UX perspective.</>}>
                    <Image
                      src="/images/augmenta/slide43-img01.png"
                      alt="The team reviewing AI output together — flagging anomalies and aligning on engineering and UX fixes"
                      width={1600}
                      height={950}
                    />
                  </Figure>

                  <Figure onClick={() => setLightbox({ src: "/images/augmenta/slide12-img02.gif", alt: "AI generation output — solutions plotted on x/y axes" })} caption={<>AI output visualized on x/y axes — each point a generated solution. Surfacing this signal let engineers understand what was being generated and why some runs fell short.</>}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/augmenta/slide12-img02.gif"
                      alt="AI generation output — solutions plotted on x/y axes, showing the volume and spread of generated designs"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Figure>

                  <Figure onClick={() => setLightbox({ src: "/images/augmenta/error-handling.gif", alt: "Error handling — from unintelligible text to errors visualized in space" })} caption={<>Error handling — from unintelligible text to errors visualized in space.</>}>
                    <Image
                      src="/images/augmenta/error-handling.gif"
                      alt="Error handling — from unintelligible text to errors visualized in space"
                      width={891}
                      height={481}
                      unoptimized
                    />
                  </Figure>

                  <p>
                    The fully realized workflow ships back into Revit, where the generated designs work seamlessly with existing detailing and spooling pipelines.
                  </p>

                  <Figure onClick={() => setLightbox({ src: "/images/augmenta/revit-export.png", alt: "Generated designs export directly to Revit" })} caption={<>Generated designs export directly to Revit.</>}>
                    <Image
                      src="/images/augmenta/revit-export.png"
                      alt="Generated designs export directly to Revit"
                      width={812}
                      height={428}
                    />
                  </Figure>

                  <h2 id="impact-across-the-engagement">Impact (across the engagement)</h2>

                  <div className={styles.statBand}>
                    <Stat
                      value="42%"
                      label="Faster time-to-value"
                      trend="up"
                      delta="initial prep → final export"
                    />
                    <Stat
                      value="~42%"
                      label="Fewer generation cycles"
                      trend="up"
                      delta="to acceptable result"
                    />
                    <Stat
                      value="36%"
                      label="Fewer engineering blockers"
                      trend="up"
                      delta="per generation cycle"
                    />
                  </div>

                  <p>
                    The downstream result: detailed 3D schematics flow into pre-fabrication and field installation in days instead of weeks. Engineering interventions — the single biggest indicator of an unscalable product — dropped by a third, closing in on the North Star of a useful output before pilot firms would otherwise have walked.
                  </p>

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
                      <Image src="/logos/logo/Augmenta.png" alt="" width={20} height={20} style={{ objectFit: "contain", flexShrink: 0 }} />
                      <span>Augmenta.ai — Seed-stage</span>
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Industry</span>
                    <span className={styles.detailValue}>Construction — electrical raceway design</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Role</span>
                    <span className={styles.detailValue}>Principal Product Designer — sole designer</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Platform</span>
                    <span className={styles.detailValue}>Web + Autodesk Revit plugin</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Users</span>
                    <span className={styles.detailValue}>Virtual Construction Designers (VDC), BIM modellers</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Timeline</span>
                    <span className={styles.detailValue}>~9-month engagement</span>
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
                    <Image src="/logos/ant-design.svg" alt="Ant Design" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Ant Design</span>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/cursor.svg" alt="Cursor" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Cursor</span>
                  </div>
                </div>
              </section>

              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Links</h2>
                </div>
                <div className={styles.linkList}>
                  <a
                    href="https://www.augmenta.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <Image src="/logos/logo/Augmenta.png" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>Augmenta.ai</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>Company site</span>
                    </div>
                  </a>

                  <a
                    href="https://youtu.be/mkhLi4tnHgk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <span className={`material-symbols-rounded ${styles.linkIconSymbol}`} aria-hidden="true">
                      play_circle
                    </span>
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>Watch on YouTube</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>Product walk-through</span>
                    </div>
                  </a>
                </div>
              </section>
            </aside>
          </div>

          <SampleCaseStudyCard />
        </main>
      </div>

      <Footer />

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
