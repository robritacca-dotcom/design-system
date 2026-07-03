"use client";

import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import { Card } from "@design-system/components/Card/Card";
import { getSidebarLinks, workSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(workSidebarLinks, "/work");

const caseStudies = [
  {
    href: "/work/embedded-ai-turbotax",
    title: "TurboTax, Embedded in ChatGPT and Claude",
    dek: "Leading design for a Webby-winning tax experience that runs natively inside two AI platforms — from December MVP to full launch in one tax season.",
    companyName: "TurboTax",
    companyLogo: "/logos/turbotax.svg",
    coverSrc: "/images/heroes/claude.png",
  },
  {
    href: "/work/intuit-agent-chat",
    title: "Intuit Agent Chat Platform",
    dek: "Designing and shipping Intuit's official conversational AI platform from 0 → 1",
    companyName: "Intuit",
    companyLogo: "/logos/Intuit.svg",
    coverSrc: "/images/heroes/agent-chat.png",
  },
  {
    href: "/work/augmenta-ai",
    title: "Augmenta AI Construction Platform",
    dek: "Turning automation into usability — the redesign behind 42% faster outcomes",
    companyName: "Augmenta",
    companyLogo: "/logos/logo/Augmenta.png",
    coverSrc: "/images/heroes/augmenta.png",
  },
  {
    href: "/work/meta-career-profile",
    title: "Career Profile Vision",
    dek: "Reimagining Meta's candidate experience platform as a scalable, personalized recruiting ecosystem",
    companyName: "Meta",
    companyLogo: "/logos/meta.svg",
    coverSrc: "/images/heroes/meta-vision.png",
  },
  {
    href: "/work/meta-offers",
    title: "Offer Creation Flow",
    dek: "Improving the velocity between hire decision and offer extension at recruiting scale",
    companyName: "Meta",
    companyLogo: "/logos/meta.svg",
    coverSrc: "/images/heroes/meta-offers.png",
  },
  {
    href: "/work/robr0-ds",
    title: "Building robr0 DS — a one-person design system, end to end",
    dek: "Why I built a personal design system and the AI-augmented pipeline behind this site",
    companyName: "Personal",
    companyLogo: "/logos/rr.svg",
    coverSrc: "/images/heroes/robr0-ds.png",
  },
  {
    href: "/work/cibc-firstcaribbean",
    title: "CIBC FirstCaribbean — Banking Platform",
    dek: "Designing for multi-country, multi-currency international banking at Devbridge",
    companyName: "CIBC",
    companyLogo: "/logos/CIBC.svg",
    coverSrc: "/images/cibc-firstcaribbean-cover.jpg",
  },
];

export default function WorkPage() {
  return (
    <>
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Work</h1>
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Selected case studies on product, AI, and design systems
            </p>
            <p className={styles.introBody}>
              Long-form write-ups on projects I&apos;ve led — what worked, what didn&apos;t, and what I changed my mind about. Each case study sits behind its own page with the full story, plus the tools, citations, and links that shaped it.
            </p>
          </div>

          <div className={`${styles.caseStudyGrid} animate-in animate-delay-2`}>
            {caseStudies.map((cs) => (
              <Card
                key={cs.href}
                variant="case-study"
                title={cs.title}
                dek={cs.dek}
                companyName={cs.companyName}
                companyLogo={cs.companyLogo}
                coverSrc={cs.coverSrc}
                href={cs.href}
              />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
