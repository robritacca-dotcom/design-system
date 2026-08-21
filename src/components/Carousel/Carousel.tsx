'use client';

import React, { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import { MOTION_AUTOPLAY_INTERVAL_MS } from '../../tokens/motion';
import './Carousel.css';
import '../../fonts/material-symbols.css';

export interface CarouselProps {
  /** Carousel slides */
  children?: ReactNode;
  /** Show dot indicators */
  showDots?: boolean;
  /** Show previous/next navigation arrows */
  showArrows?: boolean;
  /** Auto-play slides */
  autoPlay?: boolean;
  /** Auto-play interval in milliseconds */
  autoPlayInterval?: number;
  /** Whether navigation should loop */
  loop?: boolean;
  /** Callback when active slide changes */
  onSlideChange?: (index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Carousel component for sliding through content.
 * Supports navigation arrows, dot indicators, auto-play,
 * and keyboard navigation.
 */
export const Carousel = ({
  children,
  showDots = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = MOTION_AUTOPLAY_INTERVAL_MS,
  loop = false,
  onSlideChange,
  className = '',
}: CarouselProps) => {
  const slides = React.Children.toArray(children);
  const slideCount = slides.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const baseClass = 'ds-carousel';

  const goTo = useCallback(
    (index: number) => {
      let next = index;
      if (loop) {
        next = ((index % slideCount) + slideCount) % slideCount;
      } else {
        next = Math.max(0, Math.min(index, slideCount - 1));
      }
      setActiveIndex(next);
      onSlideChange?.(next);
    },
    [slideCount, loop, onSlideChange]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || paused || slideCount <= 1) return;

    const interval = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, paused, autoPlayInterval, goNext, slideCount]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  const canGoPrev = loop || activeIndex > 0;
  const canGoNext = loop || activeIndex < slideCount - 1;

  const containerClasses = [baseClass, className].filter(Boolean).join(' ');

  if (slideCount === 0) return null;

  return (
    <div
      className={containerClasses}
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
    >
      <div className={`${baseClass}__viewport`}>
        <div
          className={`${baseClass}__track`}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${baseClass}__slide`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slideCount}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows && slideCount > 1 && (
        <>
          <button
            className={`${baseClass}__arrow ${baseClass}__arrow--prev`}
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous slide"
            type="button"
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              chevron_left
            </span>
          </button>

          <button
            className={`${baseClass}__arrow ${baseClass}__arrow--next`}
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next slide"
            type="button"
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              chevron_right
            </span>
          </button>
        </>
      )}

      {showDots && slideCount > 1 && (
        <div className={`${baseClass}__dots`} role="tablist" aria-label="Slide indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${baseClass}__dot${
                index === activeIndex ? ` ${baseClass}__dot--active` : ''
              }`}
              onClick={() => goTo(index)}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to slide ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};
