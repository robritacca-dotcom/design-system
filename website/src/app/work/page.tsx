"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import { getNavLinks, getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const navLinks = getNavLinks("Work");
const { sidebarLinks, subnavLinks } = getSidebarLinks(workSidebarLinks, "/work");

interface Company {
  name: string;
  logo: string;
}

interface CaseStudy {
  href?: string;          // omit for placeholder
  title: string;
  dek?: string;
  company: Company;
  cover?: string;         // omit for placeholder (renders logo on neutral bg)
}

const caseStudies: CaseStudy[] = [
  {
    href: "/work/embedded-ai-turbotax",
    title: "Designing Embedded AI Experiences Inside ChatGPT and Claude",
    dek: "What I learned leading design for TurboTax's embedded AI experiences",
    company: { name: "Intuit", logo: "/logos/Intuit.svg" },
    cover: "/images/embedded-ai-cover.webp",
  },
  {
    title: "Coming soon",
    company: { name: "Meta", logo: "/logos/meta.svg" },
  },
  {
    title: "Agent chat — coming soon",
    company: { name: "Intuit", logo: "/logos/Intuit.svg" },
  },
  {
    title: "Coming soon",
    company: { name: "Augmenta", logo: "/logos/Augmenta.svg" },
  },
  {
    title: "Coming soon",
    company: { name: "Devbridge", logo: "/logos/Devbridge.svg" },
  },
];

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const isPlaceholder = !cs.href;

  const inner = (
    <>
      <div className={styles.coverWrap}>
        {cs.cover ? (
          <Image
            src={cs.cover}
            alt={`${cs.title} cover`}
            width={940}
            height={480}
            className={styles.coverImage}
          />
        ) : (
          <div className={styles.coverPlaceholder}>
            <Image
              src={cs.company.logo}
              alt=""
              width={64}
              height={64}
              className={styles.coverPlaceholderLogo}
            />
          </div>
        )}
      </div>
      <div className={styles.caseStudyText}>
        <div className={styles.caseStudyCompany}>
          <Image
            src={cs.company.logo}
            alt=""
            width={20}
            height={20}
            className={styles.companyLogo}
          />
          <span className={styles.companyName}>{cs.company.name}</span>
        </div>
        <h3 className={styles.caseStudyTitle}>{cs.title}</h3>
        {cs.dek && <p className={styles.caseStudyDek}>{cs.dek}</p>}
      </div>
    </>
  );

  if (isPlaceholder) {
    return (
      <div
        className={`${styles.caseStudyCard} ${styles.caseStudyCardPlaceholder}`}
        aria-disabled="true"
      >
        {inner}
      </div>
    );
  }

  return (
    <Link href={cs.href!} className={styles.caseStudyCard}>
      {inner}
    </Link>
  );
}

export default function WorkPage() {
  return (
    <>
      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Work</h1>
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Selected case studies on product, AI, and design systems
            </p>
            <p className={styles.introBody}>
              Long-form write-ups on projects I&apos;ve led — what worked, what didn&apos;t, and what I changed my mind about. Each case study sits behind its own page with the full story, plus the tools, citations, and links that shaped it.
            </p>
          </div>

          {/* Case study grid */}
          <div className={`${styles.caseStudyGrid} animate-in animate-delay-2`}>
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={cs.href ?? `placeholder-${i}`} cs={cs} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
