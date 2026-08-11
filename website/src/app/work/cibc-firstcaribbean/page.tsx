"use client";

import Image from "next/image";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import SampleCaseStudyCard from "../../../components/SampleCaseStudyCard/SampleCaseStudyCard";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  workSidebarLinks,
  "/work/cibc-firstcaribbean"
);

export default function CibcFirstCaribbeanCaseStudy() {
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
            <h1 className={styles.pageTitle}>CIBC FirstCaribbean</h1>
          </div>

          {/* Subtitle / dek */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Banking platform · iOS &amp; Android · 2017 · Devbridge
          </p>

          {/* Hero video */}
          <figure className={`${styles.videoHero} animate-in animate-delay-2`}>
            <div className={styles.videoFrame}>
              <iframe
                src="https://www.youtube.com/embed/EVXBsqdIoMk"
                title="CIBC FirstCaribbean mobile banking case study video"
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
                  <p className={styles.lede}>
                    While at Devbridge, I led design for the launch of the new CIBC FirstCaribbean mobile banking experience across iOS and Android. At the time, Devbridge was a Chicago-based product consultancy with a growing Toronto office, where I eventually became Product Design Manager leading a small team of designers.
                  </p>

                  <p>
                    This project became a defining milestone in my career. It ultimately led to my promotion from Senior Product Designer to Product Design Manager, not because of visual polish alone, but because it taught me how to operate inside a highly complex international product environment.
                  </p>

                  <h2 id="the-context">The context</h2>

                  <p>
                    CIBC had acquired FirstCaribbean, a banking organisation operating across multiple Caribbean countries. Unlike traditional Canadian banking products, this was not a single-country banking experience.
                  </p>

                  <p>
                    Customers often held accounts across different Caribbean nations, currencies, and financial systems simultaneously. The challenge was not simply designing a banking app. It was designing an experience that made international banking feel <strong>understandable</strong> to everyday users.
                  </p>

                  <p>
                    At the time, there was no modern mobile banking platform in place. Devbridge was brought in to take the product from 0→1 across platforms, partnering closely with leadership teams in Toronto while coordinating with stakeholders connected to the Caribbean markets the product would ultimately serve.
                  </p>

                  <p>
                    I led the design effort through the early strategy, product definition, and launch phases before transitioning ownership to the broader team as the platform matured.
                  </p>

                  <h2 id="the-design-problem">The design problem</h2>

                  <p>
                    One of the most important lessons from this project was realizing that <strong>products cannot inherit assumptions from the markets you personally live in.</strong>
                  </p>

                  <p>
                    In Canada, most banking experiences assume a relatively simple structure:
                  </p>

                  <ul>
                    <li>One country</li>
                    <li>One primary currency</li>
                    <li>Relatively standardised account relationships</li>
                  </ul>

                  <p>
                    FirstCaribbean was fundamentally different. Users needed to clearly understand:
                  </p>

                  <ul>
                    <li>Which country an account belonged to</li>
                    <li>Which currency it operated in</li>
                    <li>How money moved between countries</li>
                    <li>How to manage multiple financial identities simultaneously</li>
                  </ul>

                  <p>
                    Instead of hiding that complexity, we made it a core part of the product language. Country identity became a flagship design element throughout the experience using:
                  </p>

                  <ul>
                    <li>Country flags</li>
                    <li>Localised account labelling</li>
                    <li>Currency codes</li>
                    <li>Regional distinctions embedded directly into the UI</li>
                  </ul>

                  <p>
                    The goal was to create confidence and clarity in moments where financial ambiguity could easily create user anxiety.
                  </p>

                  <h2 id="what-i-learned">What I learned</h2>

                  <p>
                    Looking back, this project shaped how I think about product design more than almost any early-career engagement.
                  </p>

                  <p>I learned:</p>

                  <ul>
                    <li>How to design for operational and regulatory complexity</li>
                    <li>How to work across distributed stakeholders and leadership groups</li>
                    <li>How to take ambiguous enterprise requirements and turn them into product decisions</li>
                    <li>How to scale design ownership beyond myself</li>
                    <li>How important local context is when designing &ldquo;global&rdquo; products</li>
                  </ul>

                  <blockquote>
                    Good product design is often less about simplifying complexity away, and more about helping users confidently navigate it.
                  </blockquote>
                </article>
              </section>
            </div>

            {/* Right rail — tools + links */}
            <aside className={styles.resumeSidebar} aria-label="Case study resources">
              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Details</h2>
                </div>
                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Company</span>
                    <span className={styles.detailValue} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Image src="/logos/CIBC.svg" alt="" width={20} height={20} style={{ objectFit: "contain", flexShrink: 0 }} />
                      <span>CIBC FirstCaribbean</span>
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Agency</span>
                    <span className={styles.detailValue}>Devbridge (now Cognizant)</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Role</span>
                    <span className={styles.detailValue}>Senior Product Designer → Product Design Manager</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Platforms</span>
                    <span className={styles.detailValue}>iOS · Android</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Year</span>
                    <span className={styles.detailValue}>2017</span>
                  </div>
                </div>
              </section>

              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Tools</h2>
                </div>
                <div className={styles.toolList}>
                  <div className={styles.toolItem}>
                    <Image src="/logos/sketch.svg" alt="Sketch" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Sketch</span>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/Adobe.svg" alt="Adobe" width={28} height={28} className={styles.toolLogo} />
                    <span className={styles.toolName}>Adobe</span>
                  </div>
                </div>
              </section>

              <section className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Links</h2>
                </div>
                <div className={styles.linkList}>
                  <a
                    href="https://youtu.be/EVXBsqdIoMk"
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

                  <a
                    href="https://www.cibcfcib.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <Image src="/logos/CIBC.svg" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>CIBC FirstCaribbean</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>Client site</span>
                    </div>
                  </a>

                  <a
                    href="https://apps.apple.com/ca/app/cibc-caribbean-mobile/id1094351996"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <svg
                      className={styles.linkIconSymbol}
                      width={28}
                      height={28}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path fill="currentColor" d="M14.832 5.46c.641-.828 1.128-1.999.952-3.194-1.05.073-2.275.744-2.99 1.619-.652.792-1.188 1.971-.979 3.115 1.147.036 2.33-.65 3.017-1.54m5.667 11.242c-.46 1.023-.68 1.48-1.271 2.386-.825 1.264-1.987 2.839-3.43 2.85-1.28.014-1.61-.838-3.347-.828-1.738.01-2.1.845-3.382.832-1.441-.013-2.543-1.433-3.367-2.698-2.307-3.533-2.55-7.68-1.127-9.887 1.012-1.566 2.608-2.483 4.108-2.483 1.526 0 2.486.843 3.75.843 1.226 0 1.972-.845 3.737-.845 1.336 0 2.752.732 3.76 1.996-3.303 1.82-2.769 6.565.569 7.834"/>
                    </svg>
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>CIBC Caribbean Mobile</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>iPhone app on the App Store</span>
                    </div>
                  </a>

                  <a
                    href="https://play.google.com/store/apps/details?id=com.CIBC.FCIB.mobilebanking&hl=en_CA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkItem}
                  >
                    <Image src="/logos/play.png" alt="" width={28} height={28} className={styles.linkLogo} />
                    <div className={styles.linkContent}>
                      <div className={styles.linkTitle}>
                        <span>CIBC Caribbean Mobile</span>
                        <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
                      </div>
                      <span className={styles.linkSub}>Android app on Google Play</span>
                    </div>
                  </a>
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
