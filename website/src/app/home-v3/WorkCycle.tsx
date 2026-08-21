"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOTION_AUTOPLAY_INTERVAL_MS } from "@robr0/design-system/tokens/motion";
import { Button } from "@robr0/design-system/components/Button/Button";
import { CoverImage } from "@/components/covers/CoverImage";
import styles from "./page.module.css";

export type WorkSlide = {
  /** The study's `/work/<slug>` href — the key its cover renders are named
      from. Null for the coming-soon slide, which has no study to link and
      draws an abstract panel instead of a cover render. */
  href: string | null;
  /** Accessible name for the slide's picker button and link. */
  title: string;
  companyLogo: string;
  /** Company label: the picker chip and the lockup's first word. */
  company: string;
  /** Short project name beside it. The lockup shows nothing else. */
  project: string;
};

/**
 * The work section's cycling module: a logo-company-project lockup over the
 * full-width cover render, with the same picker, CTA, autoplay and pause
 * behaviour as /home-v2's hero — but no headline sentence and no summary
 * line. Every layer of every slide stays in the DOM, so a change of slide or
 * theme is a crossfade, never a fetch.
 */
export default function WorkCycle({ slides }: { slides: WorkSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const interval = setInterval(
      () => setActive((index) => (index + 1) % slides.length),
      MOTION_AUTOPLAY_INTERVAL_MS,
    );
    return () => clearInterval(interval);
  }, [paused, slides.length]);

  const current = slides[active];

  return (
    <div
      className={styles.cycle}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h3 className={styles.lockupSlot}>
        {slides.map((slide, index) => (
          <span
            key={slide.title}
            className={
              index === active
                ? `${styles.lockup} ${styles.lockupActive}`
                : styles.lockup
            }
            aria-hidden={index !== active || undefined}
          >
            <Image
              src={slide.companyLogo}
              alt=""
              width={24}
              height={24}
              className={styles.lockupLogo}
            />
            <span className={styles.lockupCompany}>{slide.company}</span>
            <span className={styles.lockupProject}>{slide.project}</span>
          </span>
        ))}
      </h3>

      <div className={styles.pickerRow}>
        <div
          className={styles.picker}
          role="group"
          aria-label="Choose a product"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={
                index === active ? `${styles.chip} ${styles.chipActive}` : styles.chip
              }
              aria-pressed={index === active}
              aria-label={slide.title}
              onClick={() => setActive(index)}
            >
              <Image
                src={slide.companyLogo}
                alt=""
                width={24}
                height={24}
                className={styles.chipLogo}
              />
              <span className={styles.chipLabel}>
                <span className={styles.chipLabelText}>{slide.company}</span>
              </span>
            </button>
          ))}
        </div>

        {current.href ? (
          <Button
            href={current.href}
            variant="primary"
            label="Read case study"
            iconRight="arrow_forward"
          />
        ) : (
          <Button variant="primary" label="Coming soon" disabled />
        )}
      </div>

      {/* One stable wrapper for every slide, with the link laid over it only
          when the active slide has a study — swapping the wrapper element
          itself would remount every layer and snap the crossfade. */}
      <div className={styles.stage}>
        <span className={styles.stageClip}>
          {slides.map((slide, index) => (
            <span
              key={slide.title}
              className={
                index === active ? `${styles.slide} ${styles.slideActive}` : styles.slide
              }
              aria-hidden={index !== active || undefined}
            >
              {slide.href ? (
                <CoverImage href={slide.href} aspect="hero" />
              ) : (
                <span className={styles.comingSoon}>
                  <span className={`${styles.comingSoonBlob} ${styles.comingSoonBlobA}`} />
                  <span className={`${styles.comingSoonBlob} ${styles.comingSoonBlobB}`} />
                  <span className={`${styles.comingSoonBlob} ${styles.comingSoonBlobC}`} />
                  <span className={styles.comingSoonText}>Coming soon</span>
                </span>
              )}
            </span>
          ))}
        </span>
        {current.href && (
          <Link
            href={current.href}
            className={styles.stageLink}
            aria-label={`${current.title}: view the case study`}
          />
        )}
      </div>
    </div>
  );
}
