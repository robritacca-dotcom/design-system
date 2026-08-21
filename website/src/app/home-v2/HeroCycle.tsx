"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOTION_AUTOPLAY_INTERVAL_MS } from "@robr0/design-system/tokens/motion";
import { Button } from "@robr0/design-system/components/Button/Button";
import { CoverImage } from "@/components/covers/CoverImage";
import styles from "./page.module.css";

export type HeroSlide = {
  /** The study's `/work/<slug>` href — the key its cover renders are named
      from. Null for the coming-soon slide, which has no study to link and
      draws an abstract panel instead of a cover render. */
  href: string | null;
  title: string;
  companyName: string;
  companyLogo: string;
  /** Completes the headline sentence: "Robert Ritacca is designing …". */
  phrase: string;
  /** Short label on the picker button. */
  chip: string;
  /** One-line summary under the headline. */
  blurb: string;
};

/**
 * The cycling hero: one sentence whose ending rotates through the products,
 * with the matching full-width cover render underneath. Advances on the
 * shared autoplay interval and pauses while hovered or focused, the same
 * behaviour as the library's Carousel. Every layer of every slide stays in
 * the DOM (both theme shots included, via CoverImage), so a change of slide
 * or theme is a crossfade, never a fetch.
 */
export default function HeroCycle({ slides }: { slides: HeroSlide[] }) {
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
    <section
      className={styles.hero}
      aria-label="Introduction"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h1 className={`${styles.heroTitle} animate-in`}>
        <span className={styles.titleKicker}>Robert Ritacca is designing</span>
        <span className={styles.titleSlot}>
          {slides.map((slide, index) => (
            <span
              key={slide.title}
              className={
                index === active
                  ? `${styles.phrase} ${styles.phraseActive}`
                  : styles.phrase
              }
              aria-hidden={index !== active || undefined}
            >
              {slide.phrase}
            </span>
          ))}
        </span>
      </h1>

      <div className={`${styles.dekSlot} animate-in animate-delay-1`}>
        {slides.map((slide, index) => (
          <p
            key={slide.title}
            className={
              index === active ? `${styles.dek} ${styles.dekActive}` : styles.dek
            }
            aria-hidden={index !== active || undefined}
          >
            {slide.blurb}
          </p>
        ))}
      </div>

      <div className={`${styles.pickerRow} animate-in animate-delay-2`}>
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
                <span className={styles.chipLabelText}>{slide.chip}</span>
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
      <div className={`${styles.stage} animate-in animate-delay-2`}>
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
                <CoverImage href={slide.href} aspect="hero" priority={index === 0} />
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
    </section>
  );
}
