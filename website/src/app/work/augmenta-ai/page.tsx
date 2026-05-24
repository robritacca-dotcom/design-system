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
  "/work/augmenta-ai"
);

export default function AugmentaCaseStudy() {
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

          {/* Hero image */}
          <figure className={`${styles.cover} animate-in animate-delay-2`}>
            <Image
              src="/images/augmenta/hero.jpg"
              alt="Augmenta Construction Platform — generative electrical design"
              width={1920}
              height={1080}
              priority
              className={styles.coverImage}
            />
          </figure>

          {/* Two-column body */}
          <div className={`${styles.resumeLayout} animate-in animate-delay-3`}>
            {/* Main — article body */}
            <div className={styles.resumeMain}>
              <div className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Case study</h2>
                </div>

                <div className={styles.body}>
                  <h2>Context</h2>

                  <p>
                    Augmenta generates constructible, code-compliant designs of electrical raceways — the conduit, cable tray, and supports that connect every piece of electrical equipment in a building. Their target user is the Virtual Construction Designer: the engineer inside Autodesk Revit who plans how a project actually gets built. Think Figma, but for the physical world — high-stakes, governed by real-world physics, strict compliance, and precise engineering standards.
                  </p>

                  <p>
                    When I joined: 1 design partner, 7 pilot firms testing, 20+ on the waitlist, $0 in revenue.
                  </p>

                  <h2>Problem</h2>

                  <p>The product was hard to use. Three symptoms, one root cause:</p>

                  <ul>
                    <li><strong>Too feature-heavy</strong> — trying to serve every persona at once</li>
                    <li><strong>Inconsistent, confusing UX</strong> — patterns and components drifted across the app</li>
                    <li><strong>Slow value delivery</strong> — often 2 weeks for a useful output</li>
                  </ul>

                  <p>
                    Implications stretched across the business: customers got unconstructable, slow-to-generate solutions that needed intensive support; the company carried high churn risk and unsustainable compute and support costs; design had to balance complex firm-specific needs against scalability and low-touch usability.
                  </p>

                  <p>
                    The deeper issue was philosophical. Augmenta&apos;s engineering had set high thresholds for correctness and completeness, only surfacing solutions that met strict mathematical standards. Minor input errors — a mislabeled roof material — meant zero solutions, eroding trust and usability.
                  </p>

                  <h2>Approach</h2>

                  <p>
                    Ran pilot workshops with 7 electrical design firms to map real workflows, test product fit, and prioritize features. We mapped the unified customer journey — Estimation → Planning → Design → Detailing → Pre-Construction → Construction — and decided which stages to prioritize, deprioritize, and deprecate.
                  </p>

                  <p>
                    What pilot users actually wanted: improved UX, consistent UI, simpler data input, an enhanced solution viewer. <strong>More signal, fewer features.</strong> They explicitly didn&apos;t want complex electrical calculations.
                  </p>

                  <p>
                    <strong>Renewed focus:</strong> Virtual Construction Design teams, from project kickoff through early phases of coordination. Not earlier (device layout, conduit sizing). Not later (detailing, assembly drawings). One persona, one slice of the workflow, done well.
                  </p>

                  <h2>Solution</h2>

                  <p>Three problems, three answers.</p>

                  <h3>1. Right surface for the right user</h3>

                  <p>
                    Identified VDCs as the MVP persona. Doubled down on solution data — exposing more signal about completion (routed source/destinations) and correctness (constructability). Deprioritized everything the VDC teams didn&apos;t care about.
                  </p>

                  <h3>2. Consistency through a heuristic overhaul</h3>

                  <p>
                    Audited the product against Nielsen heuristics and fixed what the audit surfaced: inconsistent patterns, poor IA, poor use of space, unclear workflows, missing system/status information, incoherent errors. Two emblematic before/after moves:
                  </p>

                  <p>
                    <strong>Screen density</strong> — engineers want signal, not whitespace. We rebuilt the canvas to surface more data per pixel without losing clarity.
                  </p>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/augmenta/screen-density.png"
                      alt="Screen density: low to high"
                      width={1600}
                      height={950}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Screen density: low to high.
                    </figcaption>
                  </figure>

                  <p>
                    <strong>Framing</strong> — language matters. We replaced engineering-speak with intent-aligned language (&ldquo;Placement considerations&rdquo; instead of &ldquo;Unhandled error&rdquo;), turning error states into actionable guidance.
                  </p>

                  <h3>3. Faster value through better inputs and signal</h3>

                  <p>The bottleneck was generation time — often a full day per iteration. We changed three things:</p>

                  <ul>
                    <li><strong>Prompt structure</strong> — moved from moderately structured, broad input to more structured, granular input so the first pass was usable.</li>
                    <li><strong>Signal enhancement</strong> — surfaced the previously hidden &ldquo;unknown&rdquo; parts of failed runs. Result: <strong>successful generations went up 10×</strong>, and user analysis of solutions spiked <strong>5×</strong>.</li>
                    <li><strong>Error handling</strong> — moved from unintelligible errors to errors visualized in 3D space, right where the issue was.</li>
                  </ul>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/augmenta/error-handling.gif"
                      alt="Error handling — from unintelligible text to errors visualized in space"
                      width={891}
                      height={481}
                      unoptimized
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Error handling — from unintelligible text to errors visualized in space.
                    </figcaption>
                  </figure>

                  <p>
                    The fully realized workflow ships back into Revit, where the generated designs work seamlessly with existing detailing and spooling pipelines.
                  </p>

                  <figure className={styles.figure}>
                    <Image
                      src="/images/augmenta/revit-export.png"
                      alt="Generated designs export directly to Revit"
                      width={812}
                      height={428}
                      className={styles.figureImage}
                    />
                    <figcaption className={styles.figureCaption}>
                      Generated designs export directly to Revit.
                    </figcaption>
                  </figure>

                  <h2>Impact (May 2024 vs. August 2023)</h2>

                  <div className={styles.tableWrap}>
                    <table className={styles.impactTable}>
                      <thead>
                        <tr>
                          <th>Metric</th>
                          <th>Aug 2023</th>
                          <th>May 2024</th>
                          <th>Improvement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Time-to-value (initial prep → final export)</td>
                          <td>14 business days</td>
                          <td><strong>8.12 business days</strong></td>
                          <td><strong>42.3% faster</strong></td>
                        </tr>
                        <tr>
                          <td>Generation cycles to acceptable result</td>
                          <td>12</td>
                          <td><strong>7</strong></td>
                          <td><strong>41.6% fewer</strong></td>
                        </tr>
                        <tr>
                          <td>Engineering interventions per cycle</td>
                          <td>1.08</td>
                          <td><strong>0.7</strong></td>
                          <td><strong>35.5% fewer blockers</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p>
                    The downstream result: detailed 3D schematics flow into pre-fabrication and field installation in days instead of weeks. Engineering interventions — the single biggest indicator of an unscalable product — dropped by a third.
                  </p>

                  <p className={styles.footnote}>
                    <em>Photos of people, named users, and team imagery have been removed from this case study.</em>
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
                    <span className={styles.detailLabel}>Company</span>
                    <span className={styles.detailValue}>Augmenta.ai — Seed-stage</span>
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
                    <span className={styles.detailValue}>August 2023 → May 2024</span>
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
