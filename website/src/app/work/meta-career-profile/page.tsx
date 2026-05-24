"use client";

import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  workSidebarLinks,
  "/work/meta-career-profile"
);

export default function MetaCareerProfileCaseStudy() {
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
            <h1 className={styles.pageTitle}>Career Profile Vision</h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Reimagining Meta&apos;s candidate experience platform as a scalable, personalized, end-to-end recruiting ecosystem.
          </p>

          {/* Two-column body */}
          <div className={`${styles.resumeLayout} animate-in animate-delay-3`}>
            {/* Main — article body */}
            <div className={styles.resumeMain}>
              <div className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Case study</h2>
                </div>

                <div className={styles.body}>
                  <p className={styles.lede}>
                    At Meta, I led product design exploration and systems thinking for the long-term vision of Career Profile (CP) — a candidate-facing platform designed to guide people through every stage of the recruiting journey.
                  </p>

                  <p>
                    The challenge was not simply redesigning screens. Career Profile had evolved into a fragmented collection of tools, workflows, and informational pages built over several years. The experience lacked consistency, scalability, personalization, and a cohesive mental model for candidates navigating one of the most important moments of their careers.
                  </p>

                  <p>
                    This project explored how to transform CP into a modular platform capable of supporting millions of candidates across roles, regions, and recruiting stages — while enabling internal teams to build consistently on top of a shared foundation.
                  </p>

                  <h2>The problem</h2>

                  <p>The existing experience had several systemic issues:</p>

                  <ul>
                    <li>Navigation did not scale and was difficult to orient around</li>
                    <li>Candidate experiences felt administrative and transactional</li>
                    <li>Generic content was shown regardless of candidate context</li>
                    <li>Recruiters and candidates relied on disconnected workflows</li>
                    <li>Multiple teams contributed features without a unified framework</li>
                    <li>Existing design systems were fragmented or unsuitable for external candidate experiences</li>
                  </ul>

                  <p>At the same time, the recruiting organization needed the platform to support multiple competing goals:</p>

                  <ul>
                    <li>Improve hiring quality</li>
                    <li>Increase candidate preparedness</li>
                    <li>Reduce recruiter operational overhead</li>
                    <li>Scale globally across candidate types and workflows</li>
                  </ul>

                  <h2>My role</h2>

                  <p>
                    As Lead Product Designer, I drove the UX vision, systems thinking, information architecture, and interaction framework for the future-state platform experience.
                  </p>

                  <p>My work included:</p>

                  <ul>
                    <li>Defining product and design principles</li>
                    <li>Creating scalable UX frameworks</li>
                    <li>Establishing content and interaction typologies</li>
                    <li>Designing modular navigation and layout systems</li>
                    <li>Exploring personalization models</li>
                    <li>Aligning candidate and recruiter workflows</li>
                    <li>Evaluating design system strategies</li>
                    <li>Creating end-to-end prototypes across candidate journeys</li>
                  </ul>

                  <p>
                    This was highly strategic platform work that sat between product design, design systems, content architecture, and organizational scalability.
                  </p>

                  <h2>Design principles</h2>

                  <p>
                    One of the first steps was establishing a set of product and experience principles that could guide future decisions across many teams and surfaces. Several themes emerged repeatedly:
                  </p>

                  <ul>
                    <li>
                      <strong>Design for modularity.</strong> Treat Career Profile as a platform rather than a collection of isolated features.
                    </li>
                    <li>
                      <strong>Design for transparency and orientation.</strong> Candidates should always understand where they are, what comes next, and what actions matter most.
                    </li>
                    <li>
                      <strong>Proactively address user needs.</strong> Surface contextual information before candidates need to search for it.
                    </li>
                    <li>
                      <strong>Advocate for the candidate.</strong> Reduce ambiguity, stress, and unnecessary friction throughout the recruiting journey.
                    </li>
                    <li>
                      <strong>Build for scale and resiliency.</strong> Enable external teams to build consistently into the ecosystem without degrading UX quality.
                    </li>
                  </ul>

                  <p>These principles became the foundation for the rest of the system architecture.</p>

                  <h2>Key insight — mental models matter</h2>

                  <p>
                    A major breakthrough in the work was recognizing that candidates interact with recruiting experiences through fundamentally different mental models depending on their goal.
                  </p>

                  <p>
                    I developed a typology framework that categorized experiences into three core modes:
                  </p>

                  <h3>Browse — &ldquo;Help me understand where to go.&rdquo;</h3>

                  <p>Used for exploration, orientation, and discovery.</p>

                  <ul>
                    <li>Home</li>
                    <li>Events</li>
                    <li>Job search</li>
                    <li>Meta Connections</li>
                  </ul>

                  <h3>Study — &ldquo;Help me understand the material in front of me.&rdquo;</h3>

                  <p>Used for deep content consumption and learning.</p>

                  <ul>
                    <li>Interview prep</li>
                    <li>Job details</li>
                    <li>Offer education</li>
                    <li>FAQ content</li>
                  </ul>

                  <h3>Work — &ldquo;Help me solve a specific problem.&rdquo;</h3>

                  <p>Used for executional workflows.</p>

                  <ul>
                    <li>Scheduling</li>
                    <li>Signing offers</li>
                    <li>Completing onboarding tasks</li>
                    <li>Messaging recruiters</li>
                  </ul>

                  <p>
                    This framework created a scalable foundation for page templates, layouts, content hierarchy, and future extensibility across the entire platform.
                  </p>

                  <h2>The timeline-centered experience</h2>

                  <p>
                    One of the core concepts I explored was shifting the platform around a dynamic recruiting timeline that acted as the primary anchor for the experience.
                  </p>

                  <p>
                    Instead of candidates navigating disconnected tools, the system adapted based on where they were in the recruiting lifecycle. The timeline became:
                  </p>

                  <ul>
                    <li>A navigation system</li>
                    <li>A status system</li>
                    <li>A personalization engine</li>
                    <li>A contextual content framework</li>
                    <li>A recruiter coordination mechanism</li>
                  </ul>

                  <p>As candidates progressed, the platform dynamically surfaced:</p>

                  <ul>
                    <li>Upcoming interviews</li>
                    <li>Relevant prep materials</li>
                    <li>Recruiter actions</li>
                    <li>Offer details</li>
                    <li>Onboarding tasks</li>
                    <li>Communication touchpoints</li>
                    <li>Educational resources</li>
                  </ul>

                  <p>
                    The experience evolved from static information architecture into a <strong>living system centered around candidate progression</strong>.
                  </p>

                  <h2>Personalization at scale</h2>

                  <p>
                    Another major focus was balancing personalization with operational scalability. Rather than redesigning the platform for every user type, the strategy focused on:
                  </p>

                  <ul>
                    <li>Shared structural foundations</li>
                    <li>Modular content systems</li>
                    <li>Adaptive information density</li>
                    <li>Candidate-specific curation</li>
                  </ul>

                  <p>For example:</p>

                  <ul>
                    <li>Leadership candidates received simplified navigation and higher-touch experiences</li>
                    <li>IC candidates received richer self-serve tooling and preparation resources</li>
                    <li>Interview timelines adapted to the candidate&apos;s stage and role</li>
                  </ul>

                  <p>
                    This allowed the platform to feel tailored without creating separate products for every audience.
                  </p>

                  <h2>Systems thinking beyond the UI</h2>

                  <p>Much of the work extended beyond interface design.</p>

                  <h3>Design system strategy</h3>

                  <p>
                    Evaluating multiple internal Meta design systems and their suitability for external candidate-facing products.
                  </p>

                  <h3>Platform governance</h3>

                  <p>
                    Defining how external recruiting teams could safely build into the ecosystem while maintaining UX consistency.
                  </p>

                  <h3>Navigation and information architecture</h3>

                  <p>
                    Exploring logged-in vs logged-out content models, discoverability tradeoffs, and platform scalability.
                  </p>

                  <h3>Candidate lifecycle mapping</h3>

                  <p>Designing for users across the full journey:</p>

                  <ul>
                    <li>Prospect</li>
                    <li>Active candidate</li>
                    <li>Offer stage</li>
                    <li>New hire onboarding</li>
                  </ul>

                  <p>
                    This work required balancing business constraints, recruiting operations, platform scalability, and user experience simultaneously.
                  </p>

                  <h2>What I learned</h2>

                  <p>This project fundamentally changed how I think about platform design.</p>

                  <blockquote>
                    Large-scale systems are not primarily UI problems. They are coordination problems.
                  </blockquote>

                  <p>
                    The challenge is not creating beautiful screens. The challenge is creating frameworks that allow hundreds of people and teams to build coherently over time.
                  </p>

                  <p>
                    I also learned that personalization at enterprise scale cannot rely on bespoke experiences. It requires flexible systems, strong information architecture, modularity, and disciplined constraints.
                  </p>

                  <p>
                    Most importantly, I learned that candidate experience is not simply about efficiency. It is about <strong>trust</strong>. Recruiting is emotionally high stakes, and clarity, orientation, and transparency can meaningfully reduce anxiety during one of the most important transitions in someone&apos;s career.
                  </p>

                  <h2>Outcome</h2>

                  <p>
                    While this was long-term vision work, the project established foundational thinking around:
                  </p>

                  <ul>
                    <li>Modular recruiting experiences</li>
                    <li>Candidate-centered workflow architecture</li>
                    <li>Personalized recruiting systems</li>
                    <li>Scalable content frameworks</li>
                    <li>Cross-team platform extensibility</li>
                    <li>Timeline-driven interaction models</li>
                  </ul>

                  <p>
                    The concepts influenced future recruiting platform discussions and created a stronger strategic foundation for how candidate experiences could evolve at Meta.
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
                    <span className={styles.detailLabel}>Client</span>
                    <span className={styles.detailValue}>Meta — Recruiting Products</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Product</span>
                    <span className={styles.detailValue}>Career Profile</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Role</span>
                    <span className={styles.detailValue}>Lead Product Designer — vision &amp; platform architecture</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Scope</span>
                    <span className={styles.detailValue}>UX vision, design system strategy, IA, prototyping</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Years</span>
                    <span className={styles.detailValue}>2022–2023</span>
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
