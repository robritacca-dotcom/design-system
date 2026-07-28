"use client";

import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, foundationsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import {
  MotionSwatch,
  type MotionSwatchDemo,
} from "@robr0/design-system/components/MotionSwatch/MotionSwatch";

const { sidebarLinks } = getSidebarLinks(foundationsSidebarLinks, "/foundations/motion");

/* ============================================
   MOTION TOKENS
   Values are mirrored from tokens-motion.css.
   ============================================ */

interface DurationToken {
  label: string;
  token: string;
  value: string;
  use: string;
  demo?: MotionSwatchDemo;
}

const coreDurations: DurationToken[] = [
  {
    label: "Fast",
    token: "--motion-duration-fast",
    value: "150ms",
    use: "Quick feedback: hovers, icons, tooltips, nav links",
  },
  {
    label: "Base",
    token: "--motion-duration-base",
    value: "200ms",
    use: "The default: colour, opacity, and border transitions",
  },
  {
    label: "Slow",
    token: "--motion-duration-slow",
    value: "300ms",
    use: "Structural change: accordion, sidebar width, toast enter",
  },
  {
    label: "Slower",
    token: "--motion-duration-slower",
    value: "600ms",
    use: "Deliberate page-entrance reveals",
  },
];

const extendedDurations: DurationToken[] = [
  {
    label: "Deliberate",
    token: "--motion-duration-deliberate",
    value: "400ms",
    use: "Carousel slide",
  },
  {
    label: "Loop spin",
    token: "--motion-duration-loop-spin",
    value: "1000ms",
    use: "Spinner rotation",
    demo: "spin",
  },
  {
    label: "Loop shimmer",
    token: "--motion-duration-loop-shimmer",
    value: "1800ms",
    use: "Skeleton shimmer",
    demo: "shimmer",
  },
];

interface EasingToken {
  label: string;
  token: string;
  value: string;
  use: string;
}

const easings: EasingToken[] = [
  {
    label: "Standard",
    token: "--motion-ease-standard",
    value: "ease",
    use: "General default for colour and opacity transitions",
  },
  {
    label: "Emphasized",
    token: "--motion-ease-emphasized",
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    use: "Size and layout changes: sidebar width, accordion height",
  },
  {
    label: "Entrance",
    token: "--motion-ease-entrance",
    value: "cubic-bezier(0.16, 1, 0.3, 1)",
    use: "Expressive decelerate for enter animations: modals, dropdowns, toasts",
  },
  {
    label: "Linear",
    token: "--motion-ease-linear",
    value: "linear",
    use: "Continuous motion: spinner, progress bars",
  },
  {
    label: "Spring",
    token: "--motion-ease-spring",
    value: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    use: "Playful overshoot: toggle switch thumb",
  },
];

/* ============================================
   PAGE
   ============================================ */

export default function MotionPage() {
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
            <h1 className={styles.pageTitle}>Motion</h1>
            <PageLinks storybookPath="/?path=/docs/foundations-tokens--docs" />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Motion is quiet: a small scale, used sparingly
            </p>
            <p className={styles.introBody}>
              Animation in this system is functional, not decorative: it confirms an
              interaction, reveals structure, or signals loading. The whole vocabulary is
              seven durations and five easing curves, defined once as{" "}
              <code>--motion-*</code> tokens and shared by the component library and this
              site. Never write a literal <code>0.2s ease</code> in component CSS. Compose
              a duration token with an easing token instead. Click any tile to replay its
              animation.
            </p>
          </div>

          {/* Core durations */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <SectionTitle title="Durations: core scale" />
            <p className={styles.sectionNote}>
              Four steps cover day-to-day UI. Base is the workhorse: the standard for
              colour, opacity, and border transitions. Step down to fast for hover
              feedback, up to slow for structural change, and reserve slower for page
              entrances. Each tile animates at its token&apos;s actual speed.
            </p>
            <div className={styles.swatchRow}>
              {coreDurations.map((duration) => (
                <MotionSwatch
                  key={duration.token}
                  label={duration.label}
                  token={duration.token}
                  value={duration.value}
                  kind="duration"
                />
              ))}
            </div>
            <ul className={styles.useList}>
              {coreDurations.map((duration) => (
                <li key={duration.token} className={styles.useRow}>
                  <span className={styles.useTerm}>{duration.label}</span>
                  <span className={styles.useValue}>{duration.use}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Extended durations */}
          <section className={styles.section}>
            <SectionTitle title="Durations: extended" />
            <p className={styles.sectionNote}>
              Special-purpose timings that would otherwise live as magic numbers. They are
              named so they stay consistent, but they are not part of the day-to-day scale.
              Reach for the core four first.
            </p>
            <div className={styles.swatchRow}>
              {extendedDurations.map((duration) => (
                <MotionSwatch
                  key={duration.token}
                  label={duration.label}
                  token={duration.token}
                  value={duration.value}
                  kind="duration"
                  demo={duration.demo}
                />
              ))}
            </div>
            <ul className={styles.useList}>
              {extendedDurations.map((duration) => (
                <li key={duration.token} className={styles.useRow}>
                  <span className={styles.useTerm}>{duration.label}</span>
                  <span className={styles.useValue}>{duration.use}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Easings */}
          <section className={styles.section}>
            <SectionTitle title="Easing curves" />
            <p className={styles.sectionNote}>
              Five named curves, each with a distinct job. Every tile animates over the same
              600ms so the shape of the curve is what you see: standard for everyday
              transitions, emphasized for layout, entrance for anything appearing on screen,
              linear for loops, spring for the one sanctioned overshoot.
            </p>
            <div className={styles.swatchRow}>
              {easings.map((easing) => (
                <MotionSwatch
                  key={easing.token}
                  label={easing.label}
                  token={easing.token}
                  value={easing.value}
                  kind="easing"
                />
              ))}
            </div>
            <ul className={styles.useList}>
              {easings.map((easing) => (
                <li key={easing.token} className={styles.useRow}>
                  <span className={styles.useTerm}>{easing.label}</span>
                  <span className={styles.useValue}>{easing.use}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Reduced motion */}
          <section className={styles.section}>
            <SectionTitle title="Reduced motion" />
            <p className={styles.sectionNote}>
              The token layer respects <code>prefers-reduced-motion</code> at the source:
              when the preference is set, every duration token collapses to 0.01ms and a
              universal guard flattens any remaining hardcoded transitions and animations.
              Components that use the tokens get accessibility for free: there is nothing
              to opt into, and no component-level media queries to write.
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
