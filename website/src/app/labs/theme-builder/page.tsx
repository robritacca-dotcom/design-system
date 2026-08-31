"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import StageToolbar from "@/components/StageToolbar/StageToolbar";
import { FullBleedBackground } from "@/components/BlurBackground/BlurBackground";
import styles from "./page.module.css";
import { Badge } from "@robr0/design-system/components/Badge/Badge";
import { Button } from "@robr0/design-system/components/Button/Button";
import { CodeBlock } from "@robr0/design-system/components/CodeBlock/CodeBlock";
import { FileInput } from "@robr0/design-system/components/FileInput/FileInput";
import { Input } from "@robr0/design-system/components/Input/Input";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { Slider } from "@robr0/design-system/components/Slider/Slider";
import { Stepper } from "@robr0/design-system/components/Stepper/Stepper";
import { Swatch } from "@robr0/design-system/components/Swatch/Swatch";
import { ToggleSwitch } from "@robr0/design-system/components/ToggleSwitch/ToggleSwitch";
import {
  ACTION_COLOR_PRESETS,
  DEFAULT_BRAND,
  FONT_OPTIONS,
  type Overrides,
  actionColorPlan,
  buildCssSnippet,
  googleFontHref,
  neutralOverrides,
  radiusOverrides,
} from "@/app/playground/theme-overrides";
import { extractPalette, hexToRgb, readAsDataUrl, suggestBrand } from "./palette";

/* ---------- the flow ---------- */

const STEPS = [
  { label: "Brand", description: "Name and logo" },
  { label: "Colour", description: "Action and neutrals" },
  { label: "Type", description: "One typeface" },
  { label: "Shape", description: "Corner language" },
  { label: "Package", description: "Tokens and setup" },
];

/**
 * Corner language presets, mapped onto the radius levers the playground
 * already owns: a scale on the whole radius scale, plus whether buttons
 * keep their pill. "Round" is the shipped geometry.
 */
const CORNER_PRESETS: Record<
  string,
  { label: string; scale: number; pill: boolean }
> = {
  sharp: { label: "Sharp", scale: 0.25, pill: false },
  soft: { label: "Soft", scale: 0.75, pill: false },
  round: { label: "Round", scale: 1, pill: true },
  extra: { label: "Extra round", scale: 1.5, pill: true },
};

/* ---------- small colour helpers (display only) ---------- */

const rgbLabel = (hex: string): string => hexToRgb(hex).join(", ");

const luminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

/** hex mixed toward white (or black) by w, for the palette tint bar. */
const tintOf = (hex: string, w: number): string => {
  const pole = luminance(hex) > 0.5 ? 0 : 255;
  const mixed = hexToRgb(hex).map((c) => Math.round(c + (pole - c) * w));
  return (
    "#" + mixed.map((c) => c.toString(16).padStart(2, "0")).join("").toUpperCase()
  );
};

/* Live theme tracking, the playground's pattern: theme-dependent action
   plans re-derive when the light/dark attribute flips. */
function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const downloadText = (name: string, text: string, type: string) => {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
};

export default function ThemeBuilderPage() {
  const [step, setStep] = useState(0);

  /* ---------- brand inputs ---------- */
  const [brandName, setBrandName] = useState("");
  const [logo, setLogo] = useState<{
    url: string;
    name: string;
    size: number;
  } | null>(null);
  const [logoError, setLogoError] = useState("");
  const [palette, setPalette] = useState<string[]>([]);

  /* ---------- theme levers ---------- */
  const [brand, setBrand] = useState(DEFAULT_BRAND);
  const [hexDraft, setHexDraft] = useState(DEFAULT_BRAND);
  const [tintOn, setTintOn] = useState(false);
  const [tintStrength, setTintStrength] = useState(6); // percent
  const [fontLabel, setFontLabel] = useState(FONT_OPTIONS[0].label);
  const [corner, setCorner] = useState("round");

  const font = FONT_OPTIONS.find((f) => f.label === fontLabel) ?? FONT_OPTIONS[0];
  const displayName = brandName.trim() || "Acme Corp";

  const theme = useSyncExternalStore(
    subscribeToTheme,
    () => document.documentElement.getAttribute("data-theme") ?? "dark",
    () => "dark"
  );

  const pickBrand = (hex: string) => {
    setBrand(hex);
    setHexDraft(hex);
  };

  const onHexDraft = (value: string) => {
    setHexDraft(value);
    const match = value.trim().match(/^#?([0-9a-fA-F]{6})$/);
    if (match) setBrand("#" + match[1].toUpperCase());
  };

  const onLogoSelected = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setLogoError("That file is not an image. PNG, JPEG, SVG and WebP all work.");
      return;
    }
    setLogoError("");
    let url: string;
    try {
      url = await readAsDataUrl(file);
    } catch {
      setLogoError("The file could not be read. Try a different image.");
      return;
    }
    setLogo({ url, name: file.name, size: file.size });
    try {
      const extracted = await extractPalette(url);
      setPalette(extracted);
      const suggested = suggestBrand(extracted);
      /* Only auto-pick while the action colour is still the shipped default:
         a colour the visitor chose on purpose never gets replaced. */
      if (suggested && brand === DEFAULT_BRAND) pickBrand(suggested);
    } catch {
      setLogoError("The image could not be read for colours. The logo still works.");
    }
  };

  const onLogoRemove = () => {
    setLogo(null);
    setPalette([]);
  };

  /* ---------- derived theme (the playground's machinery) ---------- */

  const actionPlan = useMemo(
    () => actionColorPlan(brand, theme === "dark" ? "dark" : "light"),
    [brand, theme]
  );

  const overrides = useMemo<Overrides>(() => {
    const merged: Overrides = {};
    if (actionPlan) {
      Object.assign(merged, actionPlan.primitives, actionPlan.semantics);
    }
    if (tintOn && tintStrength > 0) {
      Object.assign(merged, neutralOverrides(brand, tintStrength / 100));
    }
    const { scale, pill } = CORNER_PRESETS[corner];
    if (scale !== 1 || !pill) {
      Object.assign(merged, radiusOverrides(scale, pill));
    }
    return merged;
  }, [actionPlan, tintOn, tintStrength, brand, corner]);

  /* Apply to the root element so the semantic layer re-resolves live, the
     wizard included: every pick restyles the page making it. Everything is
     removed on unmount. */
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

  /* Google Fonts stylesheets load on selection; loaded ones stay (cheap,
     and re-selecting is instant). All are removed on unmount. */
  useEffect(() => {
    if (!font.googleParam) return;
    const id = `theme-builder-font-${font.googleParam}`;
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
        .querySelectorAll('link[id^="theme-builder-font-"]')
        .forEach((link) => link.remove());
    };
  }, []);

  /* The copied CSS always puts the light-mode values in :root; a non-default
     action colour ships a dark block too, because the two themes point a few
     roles at different steps. Same convention as the playground's snippet. */
  const cssSnippet = useMemo(() => {
    const base: Overrides = {};
    if (tintOn && tintStrength > 0) {
      Object.assign(base, neutralOverrides(brand, tintStrength / 100));
    }
    const { scale, pill } = CORNER_PRESETS[corner];
    if (scale !== 1 || !pill) Object.assign(base, radiusOverrides(scale, pill));
    const lightPlan = actionColorPlan(brand, "light");
    const darkPlan = actionColorPlan(brand, "dark");
    const rootBlock: Overrides = {
      ...(lightPlan?.primitives ?? {}),
      ...base,
      ...(lightPlan?.semantics ?? {}),
    };
    return buildCssSnippet(rootBlock, font, darkPlan?.semantics);
  }, [brand, tintOn, tintStrength, corner, font]);

  const setupSnippet = [
    "npm install @robr0/design-system",
    "",
    "# Then, in your app entry, tokens first and the theme after:",
    '# import "@robr0/design-system/tokens/tokens.css";',
    '# import "./theme-overrides.css";',
  ].join("\n");

  const readme = useMemo(() => {
    const lines = [
      `# ${displayName} theme for @robr0/design-system`,
      "",
      "Generated by the robr0 theme builder.",
      "",
      "## Palette",
      "",
      `- Action colour: ${brand} (RGB ${rgbLabel(brand)})`,
      ...palette.map((hex) => `- From the logo: ${hex} (RGB ${rgbLabel(hex)})`),
      tintOn ? `- Neutrals tinted toward ${brand} at ${tintStrength}%` : "- Neutrals: shipped scale",
      "",
      "## Typeface",
      "",
      `- ${font.label === FONT_OPTIONS[0].label ? "Nunito Sans (the system default)" : font.label}`,
      ...(font.googleParam ? [`- Load it with: ${googleFontHref(font.googleParam)}`] : []),
      "",
      "## Shape",
      "",
      `- Corner language: ${CORNER_PRESETS[corner].label}`,
      "",
      "## Install",
      "",
      "```bash",
      "npm install @robr0/design-system",
      "```",
      "",
      "```tsx",
      'import "@robr0/design-system/tokens/tokens.css";',
      'import "./theme-overrides.css";',
      "```",
      "",
      "`theme-overrides.css` is the file beside this one. Import it after the",
      "tokens and every component picks up the brand, both themes included.",
      "",
    ];
    return lines.join("\n");
  }, [displayName, brand, palette, tintOn, tintStrength, font, corner]);

  const reset = () => {
    setStep(0);
    setBrandName("");
    onLogoRemove();
    setLogoError("");
    pickBrand(DEFAULT_BRAND);
    setTintOn(false);
    setTintStrength(6);
    setFontLabel(FONT_OPTIONS[0].label);
    setCorner("round");
  };

  const coverText = luminance(brand) > 0.55 ? "#0E0E0E" : "#FFFFFF";

  /* ---------- step bodies ---------- */

  const brandStep = (
    <div className={styles.fieldGroup}>
      <h2 className={styles.stepTitle}>Start with the brand</h2>
      <p className={styles.note}>
        A name for the previews, and a logo or brand image if you have one.
        The image never leaves the browser: its colours are read right here.
      </p>
      <Input
        label="Product or brand name"
        placeholder="Acme Corp"
        value={brandName}
        onValueChange={setBrandName}
      />
      <FileInput
        label="Logo or brand image"
        placeholder="Drop an image here, or click to browse"
        accept="image/*"
        error={Boolean(logoError)}
        helperText={logoError || undefined}
        files={logo ? [{ id: "logo", name: logo.name, size: logo.size }] : []}
        onFilesSelected={onLogoSelected}
        onFileRemove={onLogoRemove}
      />
      {logo && (
        <div className={styles.logoRow}>
          {/* A data URL preview of a just-picked file; next/image cannot
              optimise it and would only proxy the bytes it already has. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.logoPreview} src={logo.url} alt="The uploaded logo" />
          {palette.length > 0 && (
            <div className={styles.fieldGroup}>
              <p className={styles.groupLabel}>Pulled from the image</p>
              <div className={styles.swatchGrid}>
                {palette.map((hex) => (
                  <Swatch
                    key={hex}
                    value={hex}
                    label={hex}
                    selected={hex === brand}
                    onClick={() => pickBrand(hex)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const colourStep = (
    <div className={styles.fieldGroup}>
      <h2 className={styles.stepTitle}>Pick the action colour</h2>
      <p className={styles.note}>
        One colour carries every primary button, focus ring, and selected
        state. A custom colour rebuilds its nearest ramp so hover and pressed
        states come out of the same family.
      </p>
      {palette.length > 0 && (
        <>
          <p className={styles.groupLabel}>From your logo</p>
          <div className={styles.swatchGrid}>
            {palette.map((hex) => (
              <Swatch
                key={hex}
                value={hex}
                label={hex}
                selected={hex === brand}
                onClick={() => pickBrand(hex)}
              />
            ))}
          </div>
        </>
      )}
      <p className={styles.groupLabel}>System presets</p>
      <div className={styles.swatchGrid}>
        {ACTION_COLOR_PRESETS.map((preset) => (
          <Swatch
            key={preset.label}
            value={preset.hex}
            label={preset.label}
            selected={preset.hex === brand}
            onClick={() => pickBrand(preset.hex)}
          />
        ))}
      </div>
      <div className={styles.hexRow}>
        <Input
          label="Custom hex"
          placeholder="#0E6E8F"
          value={hexDraft}
          onValueChange={onHexDraft}
        />
      </div>
      <ToggleSwitch
        label="Tint the neutrals with the brand colour"
        checked={tintOn}
        onChange={setTintOn}
      />
      {tintOn && (
        <div className={styles.fieldGroup}>
          <Slider
            aria-label="Neutral tint strength"
            min={1}
            max={12}
            step={1}
            value={tintStrength}
            onValueChange={setTintStrength}
          />
          <p className={styles.note}>
            {tintStrength}% wash. Even a little turns the white floor into a
            brand surface.
          </p>
        </div>
      )}
    </div>
  );

  const typeStep = (
    <div className={styles.fieldGroup}>
      <h2 className={styles.stepTitle}>Choose the typeface</h2>
      <p className={styles.note}>
        The system runs on one typeface, with hierarchy carried by weight.
        Picking one restyles this whole page, headings to captions.
      </p>
      <div className={styles.fontList}>
        {FONT_OPTIONS.map((option) => (
          <button
            key={option.label}
            type="button"
            className={styles.fontRow}
            aria-pressed={option.label === fontLabel}
            onClick={() => setFontLabel(option.label)}
          >
            <span>{option.label}</span>
            <span className={styles.fontRowSample} aria-hidden="true">
              Aa
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const { scale: cornerScale, pill: cornerPill } = CORNER_PRESETS[corner];

  const shapeStep = (
    <div className={styles.fieldGroup}>
      <h2 className={styles.stepTitle}>Set the corner language</h2>
      <p className={styles.note}>
        Shape is a per-element decision the tokens own: all buttons share one
        radius role, all inputs another. One pick moves the whole scale.
      </p>
      <SegmentedControl
        ariaLabel="Corner language"
        fullWidth
        segments={Object.entries(CORNER_PRESETS).map(([value, preset]) => ({
          value,
          label: preset.label,
        }))}
        activeSegment={corner}
        onSegmentChange={setCorner}
      />
      <div className={styles.shapeReadout}>
        <div className={styles.shapeDemo}>
          <div className={[styles.shapeTile, styles.shapeTileButton].join(" ")} />
          <span className={styles.shapeCaption}>
            Buttons: {cornerPill ? "pill" : `${Math.max(2, Math.round(16 * cornerScale))}px`}
          </span>
        </div>
        <div className={styles.shapeDemo}>
          <div className={[styles.shapeTile, styles.shapeTileInput].join(" ")} />
          <span className={styles.shapeCaption}>
            Inputs: {Math.round(12 * cornerScale)}px
          </span>
        </div>
        <div className={styles.shapeDemo}>
          <div className={[styles.shapeTile, styles.shapeTileCard].join(" ")} />
          <span className={styles.shapeCaption}>
            Cards: {Math.round(24 * cornerScale)}px
          </span>
        </div>
      </div>
    </div>
  );

  const packageStep = (
    <div className={styles.sheet}>
      <div
        className={styles.sheetCover}
        style={{ backgroundColor: brand, color: coverText }}
      >
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.sheetCoverLogo} src={logo.url} alt="" />
        ) : (
          <span />
        )}
        <div>
          <p className={styles.sheetCoverEyebrow}>Brand package</p>
          <h2 className={styles.sheetCoverTitle}>{displayName}</h2>
        </div>
      </div>

      <div className={styles.sheetGrid}>
        <div className={styles.sheetPanel}>
          <h3 className={styles.stepTitle}>Colour</h3>
          <div className={styles.tintBar}>
            <div
              className={styles.tintCellKey}
              style={{ backgroundColor: brand, color: coverText }}
            >
              {brand}
            </div>
            {[0.2, 0.4, 0.6, 0.8].map((w) => (
              <div
                key={w}
                className={styles.tintCell}
                style={{ backgroundColor: tintOf(brand, w) }}
              />
            ))}
          </div>
          <div className={styles.paletteRows}>
            <div className={styles.paletteRow}>
              <span className={styles.paletteChip} style={{ backgroundColor: brand }} />
              <span className={styles.paletteName}>Action</span>
              <span>{brand}</span>
              <span>RGB {rgbLabel(brand)}</span>
            </div>
            {palette
              .filter((hex) => hex !== brand)
              .map((hex) => (
                <div key={hex} className={styles.paletteRow}>
                  <span
                    className={styles.paletteChip}
                    style={{ backgroundColor: hex }}
                  />
                  <span className={styles.paletteName}>From the logo</span>
                  <span>{hex}</span>
                  <span>RGB {rgbLabel(hex)}</span>
                </div>
              ))}
          </div>
          {tintOn && (
            <p className={styles.note}>
              Neutrals carry a {tintStrength}% wash of the action colour.
            </p>
          )}
        </div>

        <div className={styles.sheetPanel}>
          <h3 className={styles.stepTitle}>Typography</h3>
          <p className={styles.note}>
            {font.label === FONT_OPTIONS[0].label ? "Nunito Sans" : font.label},
            one family for everything. Hierarchy is weight, not typeface.
          </p>
          <p
            className={styles.specimenLine}
            style={{ fontSize: "var(--font-heading-1-size)", fontWeight: 700 }}
          >
            Aa Bb Cc
          </p>
          <p className={styles.specimenAlphabet}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
          </p>
        </div>

        <div className={styles.sheetPanel}>
          <h3 className={styles.stepTitle}>Shape</h3>
          <p className={styles.note}>
            {CORNER_PRESETS[corner].label} corners across the scale.
          </p>
          <div className={styles.shapeReadout}>
            <div className={styles.shapeDemo}>
              <div className={[styles.shapeTile, styles.shapeTileButton].join(" ")} />
              <span className={styles.shapeCaption}>Button</span>
            </div>
            <div className={styles.shapeDemo}>
              <div className={[styles.shapeTile, styles.shapeTileInput].join(" ")} />
              <span className={styles.shapeCaption}>Input</span>
            </div>
            <div className={styles.shapeDemo}>
              <div className={[styles.shapeTile, styles.shapeTileCard].join(" ")} />
              <span className={styles.shapeCaption}>Card</span>
            </div>
          </div>
        </div>

        <div className={styles.sheetPanel}>
          <h3 className={styles.stepTitle}>In the components</h3>
          <div className={styles.previewRow}>
            <Button label="Primary action" variant="primary" />
            <Button label="Secondary" variant="secondary" />
          </div>
          <Input label="Email" placeholder="you@example.com" />
          <div className={styles.previewRow}>
            <Badge label="Live" variant="positive" />
            <Badge label="Beta" variant="info" />
            <Badge label="Deprecated" variant="warning" />
          </div>
          <ToggleSwitch label="Email me updates" checked onChange={() => {}} />
        </div>

        <div className={[styles.sheetPanel, styles.sheetPanelWide].join(" ")}>
          <h3 className={styles.stepTitle}>Get started</h3>
          <p className={styles.note}>
            Install the package, import the tokens, then this theme file after
            them. Both themes are included: the dark block repoints the same
            roles for dark mode.
          </p>
          <CodeBlock code={setupSnippet} language="bash" filename="install" showCopy />
          <CodeBlock
            code={cssSnippet}
            language="css"
            filename="theme-overrides.css"
            showCopy
          />
          <div className={styles.downloadRow}>
            <Button
              label="Download theme-overrides.css"
              variant="primary"
              iconLeft="download"
              onClick={() =>
                downloadText("theme-overrides.css", cssSnippet, "text/css")
              }
            />
            <Button
              label="Download the brand README"
              variant="secondary"
              iconLeft="description"
              onClick={() => downloadText("README.md", readme, "text/markdown")}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const stepBodies = [brandStep, colourStep, typeStep, shapeStep, packageStep];
  const onPackageStep = step === STEPS.length - 1;

  return (
    <>
      <FullBleedBackground />
      <StageToolbar title="Theme builder" badge="Lab" exit="home" />

      <div className={styles.shell}>
        <header className={styles.intro}>
          <h1 className={styles.introTitle}>Theme builder</h1>
          <p className={styles.introDek}>
            Four picks and a logo become a brand package: the tokens, the
            typeface, and the setup for a customised install of the design
            system. Every choice restyles this page as you make it.
          </p>
        </header>

        <Stepper
          className={styles.stepper}
          steps={STEPS}
          activeStep={step}
          onStepClick={setStep}
        />

        {onPackageStep ? (
          packageStep
        ) : (
          <div className={styles.workspace}>
            <div className={styles.panel}>{stepBodies[step]}</div>

            <div className={[styles.panel, styles.preview].join(" ")}>
              <div className={styles.previewHeader}>
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className={styles.previewLogo} src={logo.url} alt="" />
                ) : (
                  <span className={styles.previewDot} aria-hidden="true" />
                )}
                <span className={styles.previewBrand}>{displayName}</span>
              </div>
              <p className={styles.previewHeading}>Good afternoon</p>
              <p className={styles.note}>
                A live sample of the system wearing your choices.
              </p>
              <div className={styles.previewRow}>
                <Button label="New project" variant="primary" iconLeft="add" />
                <Button label="Invite" variant="secondary" />
              </div>
              <Input label="Search" placeholder="Search projects" />
              <div className={styles.previewRow}>
                <Badge label="On track" variant="positive" />
                <Badge label="3 open" variant="info" />
                <Badge label="Blocked" variant="error" />
              </div>
              <ToggleSwitch label="Weekly digest" checked onChange={() => {}} />
            </div>
          </div>
        )}

        <div className={styles.stepNav}>
          <Button
            label="Back"
            variant="secondary"
            iconLeft="arrow_back"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          />
          {onPackageStep ? (
            <Button label="Start over" variant="secondary" onClick={reset} />
          ) : (
            <Button
              label={step === STEPS.length - 2 ? "Build the package" : "Next"}
              variant="primary"
              iconRight="arrow_forward"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            />
          )}
        </div>
      </div>
    </>
  );
}
