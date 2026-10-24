"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Chip } from "rift-ds/components/Chip/Chip";
import { ImageCompare } from "rift-ds/components/ImageCompare/ImageCompare";
import { ChatProvider, ChatWidget, useChatWidget } from "rift-ds/chat";
import {
  DEMO_ARTIFACT_RENDERERS,
  DEMO_RENDERERS,
  DEMO_STARTERS,
  createDemoTransport,
} from "rift-ds/chat/demo";
import themeRegistry from "@/data/rift-ds-themes.json";
import styles from "./page.module.css";

/* The inline visuals on /work/rift-ds. Kept beside the page so the corpus
   reads their few words with it; the page itself carries the prose. */

type Theme = { id: string; label: string; alt: string; base?: boolean };

export const RIFT_DS_THEMES: Theme[] = themeRegistry.themes;

const BASE = RIFT_DS_THEMES.find((theme) => theme.base)!;
const OTHERS = RIFT_DS_THEMES.filter((theme) => !theme.base);

const capture = (id: string, mode: "light" | "dark") =>
  `/images/rift-ds/themes/${id}-${mode}.webp`;

/**
 * The same template in Tide and in any other look, either side of a drag
 * handle. Both modes are rendered and the site theme shows one, so the
 * comparison follows the light/dark toggle with no script.
 */
export function ThemeGallery() {
  const [picked, setPicked] = useState(
    () => OTHERS.find((theme) => theme.id === "contrast") ?? OTHERS[0],
  );
  return (
    <figure className={styles.gallery}>
      <div className={styles.galleryChips} role="group" aria-label="Compare Tide with">
        {OTHERS.map((theme) => (
          <Chip
            key={theme.id}
            label={theme.label}
            size="compact"
            selected={theme.id === picked.id}
            onClick={() => setPicked(theme)}
          />
        ))}
      </div>
      {(["light", "dark"] as const).map((mode) => (
        <div
          key={mode}
          className={mode === "light" ? styles.galleryLight : styles.galleryDark}
        >
          <ImageCompare
            beforeSrc={capture(BASE.id, mode)}
            afterSrc={capture(picked.id, mode)}
            beforeAlt={BASE.alt}
            afterAlt={picked.alt}
            beforeLabel={BASE.label}
            afterLabel={picked.label}
            showLabels
            aspectRatio="16 / 10"
          />
        </div>
      ))}
      <figcaption className={styles.caption}>
        The marketing dashboard template from rift-ds.com, captured in every
        theme. Pick a look and drag the handle.
      </figcaption>
    </figure>
  );
}

/** A new component's path from a sentence to npm. */
export function ComponentPipeline() {
  const steps = [
    { label: "Describe it", note: "One sentence to the new-component skill" },
    { label: "Scaffold", note: "Component, styles and stories, registered" },
    { label: "Build checks", note: "Raw values, props contract, shared parts" },
    { label: "Browser tests", note: "Every story rendered, axe on each" },
    { label: "Release", note: "Docs and counts follow the registry" },
  ];
  return (
    <div
      className={`${styles.pipeline} ${styles.flow}`}
      role="figure"
      aria-label="How a new component ships"
    >
      {steps.map((step, i) => (
        <div key={step.label} className={styles.pipelineRow}>
          <div className={styles.pipelineStep}>
            <span className={styles.pipelineLabel}>{step.label}</span>
            <span className={styles.pipelineNote}>{step.note}</span>
          </div>
          {i < steps.length - 1 && (
            <span
              className={`material-symbols-rounded ${styles.pipelineArrow}`}
              aria-hidden="true"
            >
              chevron_right
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * The playground recording. It plays only while on screen, and never on its
 * own for a reader who asked for reduced motion: they get the poster and the
 * controls instead.
 */
export function PlaygroundVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    if (query.matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <figure className={styles.media}>
      <video
        ref={ref}
        className={styles.video}
        src="/videos/rift-ds/playground-design-md.webm"
        poster="/videos/rift-ds/playground-design-md-poster.webp"
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduced}
        aria-label="The Rift DS playground reading three example DESIGN.md files in turn, then showing the marketing dashboard template restyled in each one."
      />
      <figcaption className={styles.caption}>
        Three example DESIGN.md files, one press each, then the same template
        in every look. Recorded on the live playground.
      </figcaption>
    </figure>
  );
}

/** Opens the inline widget once it mounts; the provider starts closed. */
function OpenOnMount() {
  const { setOpen } = useChatWidget();
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 0);
    return () => clearTimeout(timer);
  }, [setOpen]);
  return null;
}

/**
 * The whole chat widget, inline, on the package's scripted demo transport.
 * Its own provider, so it never touches the site chat's conversation.
 */
export function ChatStage() {
  const transport = useMemo(() => createDemoTransport(), []);
  return (
    <figure className={styles.media}>
      <div className={styles.chatStage}>
        <ChatProvider
          transport={transport}
          renderers={DEMO_RENDERERS}
          artifactRenderers={DEMO_ARTIFACT_RENDERERS}
        >
          <OpenOnMount />
          <ChatWidget
            title="Acme Assistant"
            tagline="How can we help you today?"
            starters={DEMO_STARTERS}
            artifacts
            fullscreenEnabled={false}
            closeEnabled={false}
            disclaimer="A scripted demo. Nothing you type leaves your browser."
          />
        </ChatProvider>
      </div>
      <figcaption className={styles.caption}>
        The real widget on its demo transport, which needs no key. Pick a
        starter, then follow the suggestions.
      </figcaption>
    </figure>
  );
}
