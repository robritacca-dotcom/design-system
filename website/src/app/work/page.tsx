"use client";

import Image from "next/image";
import Link from "next/link";
import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(workSidebarLinks, "/work");

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
    company: { name: "TurboTax", logo: "/logos/turbotax.svg" },
    cover: "/images/embedded-ai-cover.webp",
  },
  {
    href: "/work/intuit-agent-chat",
    title: "Intuit Agent Chat",
    dek: "Designing and shipping Intuit's official conversational AI platform from 0 → 1",
    company: { name: "Intuit", logo: "/logos/Intuit.svg" },
    cover: "/images/intuit-agent-chat/widget-anatomy.png",
  },
  {
    href: "/work/augmenta-ai",
    title: "Augmenta Construction Platform",
    dek: "Turning automation into usability — the redesign behind 42% faster outcomes",
    company: { name: "Augmenta", logo: "/logos/Augmenta.svg" },
    cover: "/images/augmenta/tile-cover.png",
  },
  {
    href: "/work/meta-career-profile",
    title: "Career Profile Vision",
    dek: "Reimagining Meta's candidate experience platform as a scalable, personalized recruiting ecosystem",
    company: { name: "Meta", logo: "/logos/meta.svg" },
    cover: "/images/meta-career-profile-hero.png",
  },
  {
    href: "/work/meta-offers",
    title: "Offer Creation Flow",
    dek: "Improving the velocity between hire decision and offer extension at recruiting scale",
    company: { name: "Meta", logo: "/logos/meta.svg" },
    cover: "/images/meta-offers/hero.png",
  },
  {
    href: "/work/robr0-ds",
    title: "Building robr0 DS — a one-person design system, end to end",
    dek: "Why I built a personal design system and the AI-augmented pipeline behind this site",
    company: { name: "Personal", logo: "/logos/rr.svg" },
    cover: "/images/ds-hero.png",
  },
  {
    href: "/work/cibc-firstcaribbean",
    title: "CIBC FirstCaribbean — Mobile Banking Platform",
    dek: "Designing for multi-country, multi-currency international banking at Devbridge",
    company: { name: "CIBC", logo: "/logos/CIBC.svg" },
    cover: "/images/cibc-firstcaribbean-cover.jpg",
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

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
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
