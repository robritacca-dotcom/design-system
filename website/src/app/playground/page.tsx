"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import styles from "./page.module.css";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import { CodeBlock } from "@robr0/design-system/components/CodeBlock/CodeBlock";
import {
  DEFAULT_BRAND,
  DEFAULT_NEUTRAL_SEED,
  FONT_OPTIONS,
  type Overrides,
  brandOverrides,
  buildCssSnippet,
  googleFontHref,
  neutralOverrides,
  radiusOverrides,
} from "./theme-overrides";
import { THEME_PRESETS } from "./presets";
import PlaygroundControls from "./PlaygroundControls";
import ActionsSection from "./sections/ActionsSection";
import FormsSection from "./sections/FormsSection";
import NavigationSection from "./sections/NavigationSection";
import DataDisplaySection from "./sections/DataDisplaySection";
import ChartsSection from "./sections/ChartsSection";
import OverlaysSection from "./sections/OverlaysSection";
import FeedbackSection from "./sections/FeedbackSection";

/* Live theme tracking (same pattern as foundations/colour-mode) so
   theme-dependent presets re-derive their overrides when the site's
   light/dark toggle flips. */
function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export default function PlaygroundPage() {
  /* ---------- levers ---------- */
  const [preset, setPreset] = useState("default");
  const [brand, setBrand] = useState(DEFAULT_BRAND);
  const [tintOn, setTintOn] = useState(false);
  const [tintSeed, setTintSeed] = useState(DEFAULT_NEUTRAL_SEED);
  const [tintStrength, setTintStrength] = useState(6); // percent
  const [radiusScale, setRadiusScale] = useState(100); // percent
  const [pill, setPill] = useState(true);
  const [fontLabel, setFontLabel] = useState(FONT_OPTIONS[0].label);
  const [productName, setProductName] = useState("");

  /** Touching any individual lever means the state is no longer the preset. */
  const asCustom = <T,>(setter: (value: T) => void) => (value: T) => {
    setPreset("custom");
    setter(value);
  };

  const applyPreset = (value: string) => {
    if (value === "default") {
      reset(); // the shipped look — put every lever back
      return;
    }
    setPreset(value);
    const p = THEME_PRESETS[value];
    if (!p) return; // "custom" — keep the current levers
    setBrand(p.brand);
    setTintOn(p.tintOn);
    setTintSeed(p.tintSeed);
    setTintStrength(p.tintStrength);
    setRadiusScale(p.radiusScale);
    setPill(p.pill);
    setFontLabel(p.fontLabel);
  };

  const font = FONT_OPTIONS.find((f) => f.label === fontLabel) ?? FONT_OPTIONS[0];

  const theme = useSyncExternalStore(
    subscribeToTheme,
    () => document.documentElement.getAttribute("data-theme") ?? "dark",
    () => "dark"
  );

  /* A preset can carry a theme-dependent action colour (black & white:
     dark button on light, white button on dark). */
  const activePreset = THEME_PRESETS[preset];
  const effectiveBrand =
    activePreset?.brandDark && theme === "dark" ? activePreset.brandDark : brand;

  const overrides = useMemo<Overrides>(() => {
    const merged: Overrides = {};
    if (effectiveBrand.toUpperCase() !== DEFAULT_BRAND) {
      Object.assign(merged, brandOverrides(effectiveBrand));
    }
    if (tintOn && tintStrength > 0) {
      Object.assign(merged, neutralOverrides(tintSeed, tintStrength / 100));
    }
    if (radiusScale !== 100 || !pill) {
      Object.assign(merged, radiusOverrides(radiusScale / 100, pill));
    }
    if (activePreset?.extraOverrides) {
      Object.assign(merged, activePreset.extraOverrides);
    }
    return merged;
  }, [effectiveBrand, tintOn, tintSeed, tintStrength, radiusScale, pill, activePreset]);

  /* ---------- apply to the whole page ----------
     Custom properties substitute var() where they are declared, and the
     semantic layer is declared on :root — so primitive overrides must land
     on the root element to cascade. Bonus: the entire site chrome previews
     the theme live. Everything is removed on unmount. */
  const appliedKeys = useRef<string[]>([]);
  useEffect(() => {
    const root = document.documentElement;
    for (const key of appliedKeys.current) root.style.removeProperty(key);
    const keys = Object.keys(overrides);
    if (font.family) keys.push("--font-family-primary");
    for (const [name, value] of Object.entries(overrides)) {
      root.style.setProperty(name, value);
    }
    if (font.family) root.style.setProperty("--font-family-primary", font.family);
    appliedKeys.current = keys;
  }, [overrides, font]);

  useEffect(() => {
    const root = document.documentElement;
    const cleanupRef = appliedKeys;
    return () => {
      for (const key of cleanupRef.current) root.style.removeProperty(key);
    };
  }, []);

  /* Google Fonts stylesheets load on demand; loaded ones stay (cheap, and
     re-selecting is instant). All are removed on unmount. */
  useEffect(() => {
    if (!font.googleParam) return;
    const id = `playground-font-${font.googleParam}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = googleFontHref(font.googleParam);
      document.head.appendChild(link);
    }
  }, [font]);

  useEffect(() => {
    return () => {
      document
        .querySelectorAll('link[id^="playground-font-"]')
        .forEach((link) => link.remove());
    };
  }, []);

  const isPristine = Object.keys(overrides).length === 0 && !font.family;

  const reset = () => {
    setPreset("default");
    setBrand(DEFAULT_BRAND);
    setTintOn(false);
    setTintSeed(DEFAULT_NEUTRAL_SEED);
    setTintStrength(6);
    setRadiusScale(100);
    setPill(true);
    setFontLabel(FONT_OPTIONS[0].label);
  };

  /* The copied CSS is theme-agnostic except a preset's dark-mode action
     colour, which ships as a [data-theme="dark"] block — so :root always
     carries the light-mode ramp regardless of the theme being previewed. */
  const darkBrandBlock = activePreset?.brandDark
    ? brandOverrides(activePreset.brandDark)
    : undefined;
  const snippetOverrides = darkBrandBlock
    ? { ...overrides, ...brandOverrides(brand) }
    : overrides;
  const cssSnippet = isPristine
    ? "/* Everything is at its shipped default — move a lever to generate CSS. */"
    : buildCssSnippet(snippetOverrides, font, darkBrandBlock);

  return (
    <>
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        {/* The control rail lives where the nav sidebar sits on doc pages */}
        <PlaygroundControls
          preset={preset}
          brand={effectiveBrand}
          tintOn={tintOn}
          tintSeed={tintSeed}
          tintStrength={tintStrength}
          radiusScale={radiusScale}
          pill={pill}
          fontLabel={fontLabel}
          productName={productName}
          isPristine={isPristine}
          cssSnippet={cssSnippet}
          onPreset={applyPreset}
          onBrand={asCustom(setBrand)}
          onTintOn={asCustom(setTintOn)}
          onTintSeed={asCustom(setTintSeed)}
          onTintStrength={asCustom(setTintStrength)}
          onRadiusScale={asCustom(setRadiusScale)}
          onPill={asCustom(setPill)}
          onFontLabel={asCustom(setFontLabel)}
          onProductName={setProductName}
          onReset={reset}
        />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />

          {/* Page Title — renamed live from the Product name control */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>{productName.trim() || "Playground"}</h1>
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Move a lever — the whole site re-themes, live
            </p>
            <p className={styles.introBody}>
              These controls override <code>--primitive-*</code> tokens on the page
              root, exactly the way a consumer of the package would in their own CSS.
              Because every semantic token chains to a primitive, one override cascades
              through buttons, focus rings, surfaces, and both themes — try the
              light/dark toggle in the header while a brand colour is applied. Leaving
              the page puts everything back.
            </p>
          </div>

          {/* Component showcase — no animate-in on the sections: the class
              creates a stacking context per section, which would let later
              sections paint over an open Dropdown/Popover in an earlier one. */}
          <ActionsSection />
          <FormsSection />
          <NavigationSection />
          <DataDisplaySection />
          <ChartsSection brand={effectiveBrand} />
          <OverlaysSection />
          <FeedbackSection />

          {/* Copy the CSS */}
          <section className={styles.demoSection}>
            <SectionTitle title="Copy the CSS" />
            <p className={styles.sectionNote}>
              Paste this after importing{" "}
              <code>@robr0/design-system/tokens/tokens.css</code> and your app matches
              this page — both themes included. The install steps live on{" "}
              <Link href="/docs/get-started" className={styles.inlineLink}>
                Get started
              </Link>
              .
            </p>
            <CodeBlock code={cssSnippet} language="css" filename="theme-overrides.css" showCopy />
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
