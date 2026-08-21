import MegaNav from "@/components/MegaNav/MegaNav";
import { TallBackground } from "@/components/BlurBackground/BlurBackground";
import { caseStudies } from "@/data/case-studies";
import { COVER_STUDIES } from "@/data/cover-renders";
import HeroCycle, { type HeroSlide } from "./HeroCycle";
import styles from "./page.module.css";

export const metadata = {
  title: "Home experiment",
  description:
    "A trial home page that cycles through the products behind the case studies.",
  robots: { index: false, follow: false },
};

/* The sentence completion, the picker label and the one-line summary for
   each study. Display copy for this experiment only, written to near-equal
   lengths so the crossfade never jumps; the logo, cover and alt text still
   come straight from the case-study and cover registries. */
const SLIDE_COPY: Record<
  string,
  { phrase: string; chip: string; blurb: string }
> = {
  "/work/embedded-ai-turbotax": {
    phrase: "TurboTax inside Claude",
    chip: "TurboTax",
    blurb:
      "A Webby-winning tax experience that runs natively inside Claude and ChatGPT.",
  },
  "/work/intuit-agent-chat": {
    phrase: "Intuit Agent Chat",
    chip: "Intuit",
    blurb:
      "Intuit's official conversational AI platform, designed and shipped from 0 to 1.",
  },
  "/work/augmenta-ai": {
    phrase: "the Augmenta platform",
    chip: "Augmenta",
    blurb:
      "The redesign that turned automated building services into 42% faster outcomes.",
  },
  "/work/meta-career-profile": {
    phrase: "Meta's Career Profile",
    chip: "Meta",
    blurb:
      "One guided path for Meta candidates through interviews, offers and onboarding.",
  },
  "/work/meta-offers": {
    phrase: "Meta's offer flow",
    chip: "Meta",
    blurb:
      "Closing the gap between a hire decision and an offer, at recruiting scale.",
  },
  "/work/robr0-ds": {
    phrase: "the robr0 design system",
    chip: "robr0",
    blurb:
      "A design system where breaking a rule fails the build, running this whole site.",
  },
};

/* Studies deliberately left out of the rotation. Their hero renders stay
   registered and shot, so returning one is deleting a line here. */
const HIDDEN = new Set(["/work/meta-offers"]);

/* Every study with a full-width "hero" render, in registry order. The
   filter is on the cover registry, not a hand list, so a study gaining or
   losing its render moves it in or out of the rotation by itself. */
const studySlides: HeroSlide[] = caseStudies
  .filter(
    (study) =>
      COVER_STUDIES[study.href]?.aspects.includes("hero") &&
      !HIDDEN.has(study.href),
  )
  .map((study) => ({
    href: study.href,
    title: study.title,
    companyName: study.companyName,
    companyLogo: study.companyLogo,
    phrase: SLIDE_COPY[study.href]?.phrase ?? study.title,
    chip: SLIDE_COPY[study.href]?.chip ?? study.companyName,
    blurb: SLIDE_COPY[study.href]?.blurb ?? study.dek,
  }));

/* The current role closes the rotation. No case study to link and no screen
   to show yet, so the slide has no href: the stage draws an abstract
   coming-soon panel instead of a cover render, and the CTA sits disabled. */
const slides: HeroSlide[] = [
  ...studySlides,
  {
    href: null,
    title: "Gusto",
    companyName: "Gusto",
    companyLogo: "/logos/gusto.svg",
    phrase: "what's next at Gusto",
    chip: "Gusto",
    blurb:
      "The current chapter at Gusto, in progress now and not ready to show just yet.",
  },
];

export default function HomeExperimentPage() {
  return (
    <>
      <TallBackground />

      <MegaNav />

      <main className={styles.container} id="main-content">
        <HeroCycle slides={slides} />
      </main>
    </>
  );
}
