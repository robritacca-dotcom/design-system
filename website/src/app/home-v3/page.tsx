import MegaNav from "@/components/MegaNav/MegaNav";
import Image from "next/image";
import { FullBleedBackground } from "@/components/BlurBackground/BlurBackground";
import FadeDivider from "@/components/FadeDivider/FadeDivider";
import ScrollCue from "@/components/ScrollCue/ScrollCue";
import { caseStudies } from "@/data/case-studies";
import { COVER_STUDIES } from "@/data/cover-renders";
import WorkCycle, { type WorkSlide } from "./WorkCycle";
import styles from "./page.module.css";

export const metadata = {
  title: "Home experiment v3",
  description:
    "A trial home page: the live hero, with a cycling work section below the fold.",
  robots: { index: false, follow: false },
};

/* The employer strip, copied from the live home page (app/page.tsx), which
   stays the authoritative copy — sync by hand if a role changes while this
   experiment is alive. */
const companies = [
  { name: "Gusto", logo: "/logos/gusto.svg" },
  { name: "Intuit", logo: "/logos/Intuit.svg" },
  { name: "Meta", logo: "/logos/meta.svg" },
  { name: "Augmenta.ai", logo: "/logos/Augmenta-2026.svg" },
];

/* The work section's lockup copy: the company label and a short project
   name, shown as logo, company, project — nothing else. Display copy for
   this experiment only. */
const SLIDE_COPY: Record<string, { company: string; project: string }> = {
  "/work/embedded-ai-turbotax": {
    company: "TurboTax",
    project: "Embedded AI in ChatGPT and Claude",
  },
  "/work/intuit-agent-chat": {
    company: "Intuit",
    project: "Agent Chat",
  },
  "/work/augmenta-ai": {
    company: "Augmenta",
    project: "Construction Platform",
  },
  "/work/meta-career-profile": {
    company: "Meta",
    project: "Career Profile",
  },
  "/work/meta-offers": {
    company: "Meta",
    project: "Offer Creation Flow",
  },
  "/work/robr0-ds": {
    company: "robr0",
    project: "Design system",
  },
};

/* Studies deliberately left out of the rotation, same as /home-v2. */
const HIDDEN = new Set(["/work/meta-offers"]);

/* Every study with a full-width "hero" render, in registry order, closed by
   the current role's coming-soon slide (no study to link, so no href). */
const slides: WorkSlide[] = [
  ...caseStudies
    .filter(
      (study) =>
        COVER_STUDIES[study.href]?.aspects.includes("hero") &&
        !HIDDEN.has(study.href),
    )
    .map((study) => ({
      href: study.href as string | null,
      title: study.title,
      companyLogo: study.companyLogo,
      company: SLIDE_COPY[study.href]?.company ?? study.companyName,
      project: SLIDE_COPY[study.href]?.project ?? study.title,
    })),
  {
    href: null,
    title: "What's next at Gusto",
    companyLogo: "/logos/gusto.svg",
    company: "Gusto",
    project: "Coming soon",
  },
];

export default function HomeExperimentV3Page() {
  return (
    <>
      <FullBleedBackground />

      <MegaNav />

      <main className={styles.container} id="main-content">
        {/* The live home page's first viewport, unchanged: name over a
            hairline, one-liner and byline, hairline, employer strip — with
            the cue pointing at the work section instead of the card grid. */}
        <section className={styles.hero} aria-label="Introduction">
          <h1 className={`${styles.homeTitle} animate-in`}>Robert Ritacca</h1>

          <FadeDivider className="animate-in animate-delay-1" />

          <div className={`${styles.homeHeading} animate-in`}>
            <p className={styles.homeSubtitle}>
              Designing and building AI-native products, systems, and experiences.
            </p>
            <p className={styles.homeByline}>
              Principal Product Designer, based in Toronto, Canada
            </p>
          </div>

          <FadeDivider className="animate-in animate-delay-1" />

          <div className={`${styles.homeCompanies} animate-in animate-delay-1`}>
            {companies.map((company) => (
              <span key={company.name} className={styles.company}>
                <Image
                  src={company.logo}
                  alt=""
                  width={24}
                  height={24}
                  className={styles.companyLogo}
                />
                {company.name}
              </span>
            ))}
          </div>

          <ScrollCue
            href="#work"
            aria-label="Scroll down to the work"
            className="animate-in animate-delay-2"
          />
        </section>

        <section
          className={styles.workSection}
          id="work"
          aria-labelledby="work-title"
        >
          <h2 className={styles.workTitle} id="work-title">
            Work
          </h2>

          <WorkCycle slides={slides} />
        </section>
      </main>
    </>
  );
}
