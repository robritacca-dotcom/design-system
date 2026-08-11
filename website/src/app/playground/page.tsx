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
  DEFAULT_ADVANCED,
  DEFAULT_BRAND,
  DEFAULT_NEUTRAL_SEED,
  FONT_OPTIONS,
  type AdvancedColorState,
  type Overrides,
  actionColorPlan,
  advancedColorOverrides,
  buildCssSnippet,
  googleFontHref,
  isAdvancedPristine,
  neutralOverrides,
  radiusOverrides,
} from "./theme-overrides";
import { THEME_PRESETS, type ThemePreset } from "./presets";
import PlaygroundControls from "./PlaygroundControls";
import AdvancedColorsDialog from "./AdvancedColorsDialog";
import ActionsSection from "./sections/ActionsSection";
import AiSection from "./sections/AiSection";
import FormsSection from "./sections/FormsSection";
import NavigationSection from "./sections/NavigationSection";
import DataDisplaySection from "./sections/DataDisplaySection";
import ChartsSection from "./sections/ChartsSection";
import OverlaysSection from "./sections/OverlaysSection";
import FeedbackSection from "./sections/FeedbackSection";
import { useSiteChat } from "@/components/SiteChat/ChatContext";
import { DOCK_QUERY } from "@/components/SiteChat/ChatContext";

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
  /* The playground opens with the chat panel already docked: the chat is
     part of the system being re-themed, so it belongs on screen. Only when
     the panel docks beside the page, though — below the dock breakpoint the
     panel is a modal overlay, and auto-opening one over the controls would
     bury the page it is meant to demonstrate. */
  const { setOpen: setChatOpen } = useSiteChat();
  useEffect(() => {
    if (window.matchMedia(DOCK_QUERY).matches) setChatOpen(true);
  }, [setChatOpen]);

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
  const [advOpen, setAdvOpen] = useState(false);
  const [advColors, setAdvColors] = useState<AdvancedColorState>(DEFAULT_ADVANCED);

  /** The last-chosen preset's non-lever state (mono's greyed accents, its
      theme-dependent action colour). Kept separate from `preset` so Custom
      inherits it — touching one lever must only change that lever, never
      snap the rest of the look back to the shipped defaults. */
  const [presetExtras, setPresetExtras] = useState<
    Pick<ThemePreset, "brandDark" | "extraOverrides">
  >({});

  /** Touching any individual lever means the state is no longer the preset. */
  const asCustom = <T,>(setter: (value: T) => void) => (value: T) => {
    setPreset("custom");
    setter(value);
  };

  /** Explicitly picking an action colour also retires the inherited
      theme-dependent brand — the pick applies to both themes. The neutral
      swatches are the exception: they carry their own dark-mode value. */
  const pickBrand = (value: string, darkValue?: string) => {
    setPreset("custom");
    setPresetExtras((e) => ({ ...e, brandDark: darkValue }));
    setBrand(value);
  };

  /** Advanced levers flip to Custom like any other lever; explicitly
      rebasing teal also retires an inherited theme-dependent brand, the
      same way picking an action colour does. */
  const changeAdvColors = (next: AdvancedColorState) => {
    setPreset("custom");
    if (next.bases.teal && !advColors.bases.teal) {
      setPresetExtras((e) => ({ ...e, brandDark: undefined }));
    }
    setAdvColors(next);
  };

  const applyPreset = (value: string) => {
    if (value === "default") {
      reset(); // the shipped look — put every lever back
      return;
    }
    setPreset(value);
    const p = THEME_PRESETS[value];
    if (!p) return; // "custom" — keep the current levers
    setAdvColors(p.advanced ?? DEFAULT_ADVANCED); // harmonized ramp keys
    setPresetExtras({ brandDark: p.brandDark, extraOverrides: p.extraOverrides });
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
     dark button on light, white button on dark). Read from presetExtras so
     it survives the flip to Custom. */
  const effectiveBrand =
    presetExtras.brandDark && theme === "dark" ? presetExtras.brandDark : brand;

  /* How the action colour applies, honestly: a hex that names a real
     primitive repoints the semantic action tokens at its ramp; a custom
     hex rebases its nearest ramp family (a warm orange reshapes the
     orange ramp, never teal) and points at that; a grey points at the
     shipped neutral scale. Null means the shipped default. */
  const actionPlan = useMemo(
    () => actionColorPlan(effectiveBrand, theme === "dark" ? "dark" : "light"),
    [effectiveBrand, theme]
  );

  const overrides = useMemo<Overrides>(() => {
    const merged: Overrides = {};
    if (actionPlan) {
      Object.assign(merged, actionPlan.primitives, actionPlan.semantics);
    }
    if (tintOn && tintStrength > 0) {
      Object.assign(merged, neutralOverrides(tintSeed, tintStrength / 100));
    }
    if (radiusScale !== 100 || !pill) {
      Object.assign(merged, radiusOverrides(radiusScale / 100, pill));
    }
    if (presetExtras.extraOverrides) {
      Object.assign(merged, presetExtras.extraOverrides);
    }
    if (!isAdvancedPristine(advColors)) {
      Object.assign(merged, advancedColorOverrides(advColors, merged));
    }
    return merged;
  }, [actionPlan, tintOn, tintSeed, tintStrength, radiusScale, pill, presetExtras, advColors]);

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
    setPresetExtras({});
    setAdvColors(DEFAULT_ADVANCED);
    setBrand(DEFAULT_BRAND);
    setTintOn(false);
    setTintSeed(DEFAULT_NEUTRAL_SEED);
    setTintStrength(6);
    setRadiusScale(100);
    setPill(true);
    setFontLabel(FONT_OPTIONS[0].label);
  };

  /* The copied CSS always puts the light-mode values in :root, whatever
     theme is being previewed. Any non-default action colour ships a
     [data-theme="dark"] block too, because the two themes point a few
     roles at different steps; a theme-dependent preset brand (black &
     white) swaps in its own dark plan there. Rebased primitives are
     theme-agnostic and stay in :root unless the dark brand differs. */
  const darkHex = presetExtras.brandDark ?? brand;
  const lightPlan = actionColorPlan(brand, "light");
  const darkPlan = actionColorPlan(darkHex, "dark");

  let snippetOverrides = overrides;
  let snippetDarkBlock: Overrides | undefined;
  if (lightPlan || darkPlan) {
    /* Primitives first, then the applied overrides: a rebased ramp may
       have been further transformed by the all-ramps levers, and those
       final values are the accurate ones. Only the semantic pointers are
       forced back to the light-theme map. */
    snippetOverrides = {
      ...(lightPlan?.primitives ?? {}),
      ...overrides,
      ...(lightPlan?.semantics ?? {}),
    };
    snippetDarkBlock = darkPlan
      ? {
          ...(darkHex !== brand ? darkPlan.primitives : {}),
          ...darkPlan.semantics,
        }
      : undefined;
  }
  const cssSnippet = isPristine
    ? "/* Everything is at its shipped default. Move a lever to generate CSS. */"
    : buildCssSnippet(snippetOverrides, font, snippetDarkBlock);

  return (
    <>
      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        {/* The control rail lives where the nav sidebar sits on doc pages */}
        <PlaygroundControls
          preset={preset}
          brand={effectiveBrand}
          theme={theme}
          tintOn={tintOn}
          tintSeed={tintSeed}
          tintStrength={tintStrength}
          radiusScale={radiusScale}
          pill={pill}
          fontLabel={fontLabel}
          productName={productName}
          actionModeNote={
            actionPlan
              ? Object.keys(actionPlan.primitives).length === 0
                ? `Pointing the action tokens at the ${actionPlan.ramp} ramp; the primitives stay untouched.`
                : `Custom hex: rebasing the ${actionPlan.ramp} ramp around it and pointing the action tokens there. Teal stays teal.`
              : null
          }
          isPristine={isPristine}
          cssSnippet={cssSnippet}
          onPreset={applyPreset}
          onBrand={pickBrand}
          onTintOn={asCustom(setTintOn)}
          onTintSeed={asCustom(setTintSeed)}
          onTintStrength={asCustom(setTintStrength)}
          onRadiusScale={asCustom(setRadiusScale)}
          onPill={asCustom(setPill)}
          onFontLabel={asCustom(setFontLabel)}
          onProductName={setProductName}
          onReset={reset}
          onOpenAdvanced={() => setAdvOpen(true)}
        />

        <AdvancedColorsDialog
          open={advOpen}
          onOpenChange={setAdvOpen}
          state={advColors}
          overrides={overrides}
          onChange={changeAdvColors}
          onResetColors={() => setAdvColors(DEFAULT_ADVANCED)}
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
              Move a lever: the whole site re-themes, live
            </p>
            <p className={styles.introBody}>
              These controls re-theme the page exactly the way a consumer of the
              package would in their own CSS. An action colour that matches another
              primitive ramp repoints the semantic action tokens at that ramp;
              everything else overrides <code>--primitive-*</code> tokens (plus the
              font token) on the page root.
              Because every semantic token chains to a primitive, one override cascades
              through buttons, focus rings, surfaces, and both themes: try the
              light/dark toggle in the header while a brand colour is applied. Leaving
              the page puts everything back.
            </p>
          </div>

          {/* Component showcase — no animate-in on the sections: the class
              creates a stacking context per section, which would let later
              sections paint over an open Dropdown/Popover in an earlier one. */}
          <ActionsSection />
          <AiSection />
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
              this page, both themes included. The install steps live on{" "}
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
