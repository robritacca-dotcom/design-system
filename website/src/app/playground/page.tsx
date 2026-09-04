"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import StageToolbar from "@/components/StageToolbar/StageToolbar";
import {
  FullBleedBackground,
  HiddenBackground,
} from "@/components/BlurBackground/BlurBackground";
import styles from "./page.module.css";
import { Button } from "@robr0/design-system/components/Button/Button";
import { CodeBlock } from "@robr0/design-system/components/CodeBlock/CodeBlock";
import { Dialog } from "@robr0/design-system/components/Dialog/Dialog";
import { Drawer } from "@robr0/design-system/components/Drawer/Drawer";
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
} from "@/lib/theme/theme-overrides";
import { THEME_PRESETS, type ThemePreset } from "@/lib/theme/presets";
import { useAppliedOverrides, useSiteTheme } from "@/lib/theme/use-theme-overrides";
import PlaygroundControls from "./PlaygroundControls";
import AdvancedColorsDialog from "./AdvancedColorsDialog";
import ChatDirector, { STORY_CONTENT } from "./ChatDirector";
import InspectMode from "@/components/InspectMode/InspectMode";
import ChatView, {
  STAGE_SIZES,
  type StageSize,
  type TransportMode,
} from "./views/ChatView";
import MockNav from "./views/MockNav";
import { createSimTransport } from "@/lib/chat-sim";
import { createFetchTransport } from "@/lib/chat-transport";
import { SiteChatProvider, useSiteChat } from "@/components/SiteChat/ChatContext";
import { Input } from "@robr0/design-system/components/Input/Input";
import { RadioGroup } from "@robr0/design-system/components/RadioButton/RadioButton";
import { ToggleSwitch } from "@robr0/design-system/components/ToggleSwitch/ToggleSwitch";
import ActionsSection from "./sections/ActionsSection";
import MapsSection from "./sections/MapsSection";
import AiSection from "./sections/AiSection";
import FormsSection from "./sections/FormsSection";
import NavigationSection from "./sections/NavigationSection";
import DataDisplaySection from "./sections/DataDisplaySection";
import ChartsSection from "./sections/ChartsSection";
import OverlaysSection from "./sections/OverlaysSection";
import FeedbackSection from "./sections/FeedbackSection";

/* The tool's two lenses on the same theme state. One page, one set of
   levers — switching views never resets what you've styled. */
type View = "components" | "chat";
const VIEWS = [
  { value: "components", label: "Components", icon: "widgets" },
  { value: "chat", label: "Chat", icon: "chat_bubble" },
];

/* Below the tool's desktop breakpoint there is no room for the edge
   panel: the controls move into a bottom Drawer summoned by a fixed pill,
   and the workspace gets the whole screen. Must match the breakpoint in
   page.module.css. */
const COMPACT_QUERY = "(max-width: 1099px)";
const subscribeCompact = (callback: () => void) => {
  const media = window.matchMedia(COMPACT_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

/**
 * Swapping transports used to remount the provider so a stream from the old
 * transport could not keep writing into the new transcript. The provider now
 * wraps the whole layout (the chat director and the compact Drawer read the
 * same conversation the stage renders), so the same guarantee comes from
 * reset(): it aborts the in-flight stream and bumps the generation counter
 * that makes any late event from it inert.
 */
function ResetOnTransportChange({ mode }: { mode: TransportMode }) {
  const { reset } = useSiteChat();
  const previous = useRef(mode);
  useEffect(() => {
    if (previous.current === mode) return;
    previous.current = mode;
    reset();
  }, [mode, reset]);
  return null;
}

export default function PlaygroundPage() {
  /* ---------- the active view ----------
     Local state (the levers must survive a switch), mirrored into ?view=
     so a specific view can be linked. Read once on mount rather than via
     useSearchParams, which would force a Suspense boundary on a fully
     client-rendered page. */
  const [view, setView] = useState<View>("components");
  useEffect(() => {
    // The setState here is intentional — a once-on-mount sync from the
    // URL, which the server prerender can't see (same pattern as
    // MegaNav's navigation effect).
    const q = new URLSearchParams(window.location.search).get("view");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (q === "chat") setView(q);
  }, []);
  const pickView = (value: string) => {
    setView(value as View);
    const url = new URL(window.location.href);
    if (value === "components") url.searchParams.delete("view");
    else url.searchParams.set("view", value);
    window.history.replaceState(null, "", url);
  };

  /* Chat view's contextual levers, held here so they survive a view
     switch like everything else. Sim by default: reviewing choreography
     should cost nothing — Live is the deliberate opt-in (the chat cost
     policy on record). */
  const [transportMode, setTransportMode] = useState<TransportMode>("sim");
  const transport = useMemo(
    () =>
      transportMode === "live"
        ? createFetchTransport()
        : /* The sim gets the story's rich elements — the map is what lets a
             chip path end on a card, a chart, or an approval. */
          createSimTransport(STORY_CONTENT),
    [transportMode]
  );
  const [stageSize, setStageSize] = useState<StageSize>("desktop");
  /* The dragged widget size lives here so it survives a switch to the
     Components view and back; like every lever, it dies with the page. */
  const [chatManual, setChatManual] = useState<{ w?: number; h?: number }>({});
  const [chatPlaceholder, setChatPlaceholder] = useState("");
  const [showStarters, setShowStarters] = useState(true);
  /* A stage setting, not a theme lever: it changes what the preview sits on,
     never a token. So it sits beside the theme radios, stays out of the
     generated CSS and out of isPristine, and — like theme and product name —
     Reset leaves it alone. */
  const [backgroundOn, setBackgroundOn] = useState(true);

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
  const compact = useSyncExternalStore(
    subscribeCompact,
    () => window.matchMedia(COMPACT_QUERY).matches,
    () => false
  );
  const [controlsOpen, setControlsOpen] = useState(false);
  const [advOpen, setAdvOpen] = useState(false);
  const [cssOpen, setCssOpen] = useState(false);
  const [advColors, setAdvColors] = useState<AdvancedColorState>(DEFAULT_ADVANCED);

  /** The last-chosen preset's non-lever state (mono's greyed accents, its
      theme-dependent action colour). Kept separate from `preset` so Custom
      inherits it — touching one lever must only change that lever, never
      snap the rest of the look back to the shipped defaults. */
  const [presetExtras, setPresetExtras] = useState<
    Pick<ThemePreset, "brandDark" | "extraOverrides" | "extraOverridesDark">
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

  /* A deep link can seed the action-colour lever with ?brand=<hex> (no
     leading #). Nothing on the site emits one today — the design-system
     landing's accent switcher used to — but the URL contract stays for
     hand-typed and shared links. Once on mount, same pattern as the
     ?view= sync above. */
  useEffect(() => {
    const brandQ = new URLSearchParams(window.location.search).get("brand");
    if (brandQ && /^[0-9a-fA-F]{6}$/.test(brandQ)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreset("custom");
      setBrand(`#${brandQ.toUpperCase()}`);
    }
  }, []);

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
    setPresetExtras({
      brandDark: p.brandDark,
      extraOverrides: p.extraOverrides,
      extraOverridesDark: p.extraOverridesDark,
    });
    setBrand(p.brand);
    setTintOn(p.tintOn);
    setTintSeed(p.tintSeed);
    setTintStrength(p.tintStrength);
    setRadiusScale(p.radiusScale);
    setPill(p.pill);
    setFontLabel(p.fontLabel);
  };

  const font = FONT_OPTIONS.find((f) => f.label === fontLabel) ?? FONT_OPTIONS[0];

  const theme = useSiteTheme();

  /* The immersive format drops the site header, and the header owned the
     light/dark toggle — so the rail carries one instead. Same store the
     header toggle writes: the root attribute plus the persisted choice. */
  const applyTheme = (next: string) => {
    document.documentElement.setAttribute("data-theme", next);
    /* An explicit pick, so the setting moves off "system" too — otherwise the
       root script's OS-change listener would override the rail's choice. */
    document.documentElement.setAttribute("data-theme-setting", next);
    window.localStorage.setItem("theme", next);
  };

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
    if (theme === "dark" && presetExtras.extraOverridesDark) {
      Object.assign(merged, presetExtras.extraOverridesDark);
    }
    if (!isAdvancedPristine(advColors)) {
      Object.assign(merged, advancedColorOverrides(advColors, merged));
    }
    return merged;
  }, [actionPlan, theme, tintOn, tintSeed, tintStrength, radiusScale, pill, presetExtras, advColors]);

  /* ---------- apply to the whole page ----------
     The shared hook writes to :root (where the semantic layer is declared,
     so primitive overrides cascade) and removes everything on unmount.
     Bonus: the entire site chrome previews the theme live. */
  const applied = useMemo(
    () =>
      font.family
        ? { ...overrides, "--font-family-primary": font.family }
        : overrides,
    [overrides, font]
  );
  useAppliedOverrides(applied);

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

  /* Dark-only extras belong in the dark block whether or not the action
     colour itself differs, or the copied CSS would not reproduce what is
     on screen. They layer last, over the derived dark pointers. */
  const darkExtras = presetExtras.extraOverridesDark;

  let snippetOverrides = overrides;
  let snippetDarkBlock: Overrides | undefined = darkExtras
    ? { ...darkExtras }
    : undefined;
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
          ...darkExtras,
        }
      : snippetDarkBlock;
  }
  const cssSnippet = isPristine
    ? "/* Everything is at its shipped default. Move a lever to generate CSS. */"
    : buildCssSnippet(snippetOverrides, font, snippetDarkBlock);

  /* The Chat view's levers — hosted by the chat director's rail on desktop,
     or slotted into the Drawer above the event list on compact screens, so
     the whole chat toolkit lives on one side of the stage. */
  const chatLevers = view === "chat" && (
    <>
      {!compact && (
        <div className={styles.controlGroup}>
          <RadioGroup
            label="Stage size"
            name="playground-chat-stage"
            value={stageSize}
            options={Object.entries(STAGE_SIZES).map(([value, s]) => ({
              value,
              label: s.label,
            }))}
            onValueChange={(value) => {
              /* A manual drag is a size of its own — switching the stage
                 size discards it rather than resizing around it. */
              setStageSize(value as StageSize);
              setChatManual({});
            }}
          />
          <p className={styles.controlNote}>
            Mobile renders edge-to-edge in a bezel, the way the site panel
            ships on phones.
          </p>
        </div>
      )}

      <div className={styles.controlGroup}>
        <RadioGroup
          label="Transport"
          name="playground-chat-transport"
          value={transportMode}
          options={[
            { value: "sim", label: "Simulated" },
            { value: "live", label: "Live" },
          ]}
          onValueChange={(value) => setTransportMode(value as TransportMode)}
        />
        <p className={styles.controlNote}>
          Simulated replays a scripted exchange without calling the model.
          Live answers through the site&rsquo;s API route.
        </p>
      </div>

      <div className={styles.controlGroup}>
        <Input
          label="Composer placeholder"
          placeholder="Ask anything"
          value={chatPlaceholder}
          onValueChange={setChatPlaceholder}
        />
        <ToggleSwitch
          label="Starter prompts"
          checked={showStarters}
          onChange={setShowStarters}
        />
      </div>
    </>
  );

  /* The full lever set, host-agnostic — mounted in the edge panel on
     desktop or handed to the Drawer on compact screens. */
  const controls = (
            <PlaygroundControls
              variant={compact ? "drawer" : "panel"}
              preset={preset}
              brand={effectiveBrand}
              theme={theme}
              onTheme={applyTheme}
              backgroundOn={backgroundOn}
              onBackgroundOn={setBackgroundOn}
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
              onViewCss={() => setCssOpen(true)}
              contextual={
                /* On compact screens the chat director has no rail of its
                   own — its levers and events ride in the Drawer with the
                   theme controls. On desktop the right rail owns them. */
                view === "chat" && compact ? (
                  <>
                    {chatLevers}
                    <ChatDirector variant="drawer" live={transportMode === "live"} />
                  </>
                ) : undefined
              }
            />
  );

  return (
    <>
      {/* An immersive stage runs the background edge to edge, with no
          fade-to-floor mask — unlike the doc pages' 450px band. Switched off,
          the theme is judged against the flat page colour instead. */}
      {backgroundOn ? <FullBleedBackground /> : <HiddenBackground />}

      {/* Not the site's full navigation — a full-screen view's slim
          toolbar: brand mark, breadcrumb trail, the view tabs, and the X
          out. (Footer and the site chat still skip this route.) */}
      <StageToolbar
        tabs={VIEWS}
        activeTab={view}
        onTabChange={pickView}
        switchLabel="Switch the playground view"
        /* Inspect mode, as a toolbar switch so nothing floats over the
           stage: hover any staged component to see which tokens its
           computed styles resolve from — including the levers' live
           overrides, which the inspector re-reads as they land. */
        actions={<InspectMode desktopOnly />}
      />

      {/* One provider around the whole layout: the theme drawer, the chat
          director's rail, and the stage all direct the same conversation,
          and the transcript survives a switch between views. */}
      <SiteChatProvider transport={transport}>
      <ResetOnTransportChange mode={transportMode} />
      <div
        className={[
          styles.dsLayout,
          view === "chat" && !compact ? styles.dsLayoutChat : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* The control rail lives where the nav sidebar sits on doc pages */}
        {compact ? (
          <>
            {/* The workspace owns the phone screen; the levers are one tap
                away. The pill sits where a thumb can reach it. */}
            <div className={styles.controlsFab}>
              <Button
                label="Theme controls"
                variant="primary"
                iconLeft="tune"
                onClick={() => setControlsOpen(true)}
              />
            </div>
            <Drawer
              open={controlsOpen}
              onOpenChange={setControlsOpen}
              title="Theme controls"
              side="bottom"
              size="lg"
            >
              {controls}
            </Drawer>
          </>
        ) : (
          controls
        )}

        <AdvancedColorsDialog
          open={advOpen}
          onOpenChange={setAdvOpen}
          state={advColors}
          overrides={overrides}
          onChange={changeAdvColors}
          onResetColors={() => setAdvColors(DEFAULT_ADVANCED)}
        />

        {/* The generated CSS, inspectable from any view — the rail's Copy
            button grabs it without opening this. */}
        <Dialog
          open={cssOpen}
          onOpenChange={setCssOpen}
          title="Your theme as CSS"
          size="lg"
        >
          <div className={styles.cssDialogBody}>
            <p className={styles.sectionNote}>
              Paste this after importing{" "}
              <code>@robr0/design-system/tokens/tokens.css</code> and your app
              matches this page, both themes included. The install steps live on{" "}
              <Link href="/docs/get-started" className={styles.inlineLink}>
                Get started
              </Link>
              .
            </p>
            <CodeBlock
              code={cssSnippet}
              language="css"
              filename="theme-overrides.css"
              showCopy
            />
          </div>
        </Dialog>

        <main className={styles.dsContent} id="main-content">
          {view === "components" && (
            <>
              {/* A white-label site header opens the view, so the theme
                  reads the way it does on a real page — navigation first.
                  No animate-in on the sections: the class creates a
                  stacking context per section, which would let later
                  sections paint over an open Dropdown/Popover in an
                  earlier one. */}
              <MockNav brandName={productName.trim() || "Acme Corp"} />
              <ActionsSection />
              <MapsSection />
              <AiSection />
              <FormsSection />
              <NavigationSection />
              <DataDisplaySection />
              <ChartsSection brand={effectiveBrand} />
              <OverlaysSection />
              <FeedbackSection />
            </>
          )}

          {/* The Chat view: the widget on its stage, same levers, plus the
              chat director's rail on the right. */}
          {view === "chat" && (
            <ChatView
              title={productName.trim() || "Acme Corp"}
              /* A phone IS the mobile preset — the stage-size lever hides
                 on compact screens and the widget goes fluid via CSS. */
              size={compact ? "desktop" : stageSize}
              placeholder={chatPlaceholder}
              showStarters={showStarters}
              manual={chatManual}
              onManual={(next) => setChatManual((m) => ({ ...m, ...next }))}
              allowFullscreen={!compact}
              simControls={transportMode === "sim"}
            />
          )}
        </main>

        {/* The chat director: the Chat view's own edge panel, mirroring the
            theme rail on the right — chat levers above, the event list below.
            Compact screens get the same content through the Drawer instead. */}
        {view === "chat" && !compact && (
          <ChatDirector
            variant="panel"
            levers={chatLevers}
            live={transportMode === "live"}
          />
        )}
      </div>
      </SiteChatProvider>

    </>
  );
}
