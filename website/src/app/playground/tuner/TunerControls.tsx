"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import styles from "./TunerControls.module.css";
import type { PlaygroundControlsProps } from "../PlaygroundControls";
import { ACTION_COLOR_PRESETS, FONT_OPTIONS } from "../theme-overrides";
import { PRESET_OPTIONS } from "../presets";

/* ============================================================
   TUNER RAIL — a proof of concept, deliberately additive.

   The same levers as PlaygroundControls, restyled as a compact
   instrument panel: every control is a full-width row, sliders
   fill the row itself and are dragged anywhere along it, values
   read out inline in the code face, and groups collapse under
   chevron headers. Nothing here owns state — the page does, and
   the classic rail stays untouched; the StageToolbar switch
   flips between the two hosts for a live before/after.

   Desktop-panel only for now: the compact Drawer keeps the
   classic controls either way.
   ============================================================ */

type TunerProps = Omit<PlaygroundControlsProps, "variant" | "contextual">;

/* ---------- primitives ---------- */

/** Collapsible group: a chevron header over a tight stack of rows.
    Exported (with the row primitives below) so the chat director's tuner
    mode composes the same instrument-panel language. */
export function Section({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
  return (
    <section className={styles.section}>
      <button
        type="button"
        className={styles.sectionHead}
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{title}</span>
        <span
          aria-hidden="true"
          className={`material-symbols-rounded ${styles.chevron} ${
            open ? styles.chevronOpen : ""
          }`}
        >
          expand_more
        </span>
      </button>
      {open && (
        <div className={styles.sectionBody} id={bodyId}>
          {children}
        </div>
      )}
    </section>
  );
}

/** The signature control: the whole row is the track. Drag anywhere on it,
    or focus it and use the arrow keys; the fill and the inline readout are
    the same value. */
function SliderRow({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const decimals = (String(step).split(".")[1] ?? "").length;
  const clamp = (v: number) =>
    Math.min(max, Math.max(min, Number(v.toFixed(decimals))));

  const valueAt = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return clamp(min + Math.round((t * (max - min)) / step) * step);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    onChange(valueAt(e.clientX));
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) onChange(valueAt(e.clientX));
  };
  const endDrag = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = clamp(value + step);
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = clamp(value - step);
    if (e.key === "Home") next = min;
    if (e.key === "End") next = max;
    if (next !== null) {
      e.preventDefault();
      onChange(next);
    }
  };

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={trackRef}
      className={`${styles.row} ${styles.sliderTrack}`}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={format(value)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
    >
      <span className={styles.sliderFill} style={{ width: `${pct}%` }} />
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowValue}>{format(value)}</span>
    </div>
  );
}

/** Two-way pick rendered as adjoined text chips, the active one lit. */
export function SegmentedRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.segGroup} role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={`${styles.segButton} ${
              o.value === value ? styles.segButtonActive : ""
            }`}
            aria-pressed={o.value === value}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </span>
    </div>
  );
}

/** Label, hex readout, and a swatch that opens the native colour picker. */
function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowValue}>{value.toUpperCase()}</span>
      <label className={styles.swatch} style={{ background: value }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${label} colour`}
        />
      </label>
    </div>
  );
}

/** Label and current value, with a transparent native select over the row
    so a click anywhere on it opens the picker. */
export function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const current = options.find((o) => o.value === value);
  return (
    <div className={`${styles.row} ${styles.selectRow}`}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowValue}>{current?.label ?? value}</span>
      <span aria-hidden="true" className={`material-symbols-rounded ${styles.rowIcon}`}>
        unfold_more
      </span>
      <select
        className={styles.selectOverlay}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Label with an inline, right-aligned text field. */
export function TextRow({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <input
        type="text"
        className={styles.textInput}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

/* ---------- the panel ---------- */

export default function TunerControls({
  preset,
  brand,
  theme,
  onTheme,
  backgroundOn,
  onBackgroundOn,
  tintOn,
  tintSeed,
  tintStrength,
  radiusScale,
  pill,
  fontLabel,
  productName,
  actionModeNote,
  isPristine,
  cssSnippet,
  onPreset,
  onBrand,
  onTintOn,
  onTintSeed,
  onTintStrength,
  onRadiusScale,
  onPill,
  onFontLabel,
  onProductName,
  onReset,
  onOpenAdvanced,
  onViewCss,
}: TunerProps) {
  /* Same theme-dependent preset handling as the classic rail. */
  const dark = theme === "dark";
  const presetHex = (p: (typeof ACTION_COLOR_PRESETS)[number]) =>
    dark && p.hexDark ? p.hexDark : p.hex;
  const presetLabel = (p: (typeof ACTION_COLOR_PRESETS)[number]) =>
    dark && p.labelDark ? p.labelDark : p.label;

  const presetOptions =
    preset === "custom"
      ? PRESET_OPTIONS
      : PRESET_OPTIONS.filter((o) => o.value !== "custom");

  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);
  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(cssSnippet);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the View CSS dialog still offers a copy.
    }
  };

  return (
    <aside className={styles.panel} aria-label="Theme controls">
      <div className={styles.scroll}>
        <div className={styles.head}>
          <h3 className={styles.title}>Theme controls</h3>
          <span className={styles.tag}>tuner</span>
        </div>

        <SelectRow
          label="Preset"
          value={preset}
          options={presetOptions}
          onChange={onPreset}
        />

        <Section title="Stage">
          <SegmentedRow
            label="Theme"
            value={theme}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
            onChange={onTheme}
          />
          <SegmentedRow
            label="Background"
            value={backgroundOn ? "on" : "off"}
            options={[
              { value: "off", label: "Off" },
              { value: "on", label: "On" },
            ]}
            onChange={(v) => onBackgroundOn(v === "on")}
          />
          <TextRow
            label="Product"
            value={productName}
            placeholder="Acme Corp"
            onChange={onProductName}
          />
        </Section>

        <Section title="Colour">
          <div className={styles.dotRow} role="group" aria-label="Action colour presets">
            {ACTION_COLOR_PRESETS.map((p) => (
              <button
                key={p.hex}
                type="button"
                className={`${styles.dot} ${
                  brand.toUpperCase() === presetHex(p) ? styles.dotActive : ""
                }`}
                style={{ background: presetHex(p) }}
                aria-label={presetLabel(p)}
                aria-pressed={brand.toUpperCase() === presetHex(p)}
                title={presetLabel(p)}
                onClick={() => onBrand(p.hex, p.hexDark)}
              />
            ))}
          </div>
          <ColorRow label="Action" value={brand} onChange={onBrand} />
          {actionModeNote && <p className={styles.note}>{actionModeNote}</p>}
          <SegmentedRow
            label="Tint neutrals"
            value={tintOn ? "on" : "off"}
            options={[
              { value: "off", label: "Off" },
              { value: "on", label: "On" },
            ]}
            onChange={(v) => onTintOn(v === "on")}
          />
          {tintOn && (
            <>
              <ColorRow label="Seed" value={tintSeed} onChange={onTintSeed} />
              <SliderRow
                label="Strength"
                value={tintStrength}
                min={0}
                max={16}
                step={1}
                format={(v) => `${v}%`}
                onChange={onTintStrength}
              />
            </>
          )}
          <button type="button" className={styles.rowButton} onClick={onOpenAdvanced}>
            <span aria-hidden="true" className={`material-symbols-rounded ${styles.rowIcon}`}>
              palette
            </span>
            All colour ramps
          </button>
        </Section>

        <Section title="Shape">
          <SliderRow
            label="Corner radius"
            value={radiusScale}
            min={0}
            max={200}
            step={10}
            format={(v) => `${v}%`}
            onChange={onRadiusScale}
          />
          <SegmentedRow
            label="Pill buttons"
            value={pill ? "on" : "off"}
            options={[
              { value: "off", label: "Off" },
              { value: "on", label: "On" },
            ]}
            onChange={(v) => onPill(v === "on")}
          />
        </Section>

        <Section title="Type">
          <SelectRow
            label="Typeface"
            value={fontLabel}
            options={FONT_OPTIONS.map((f) => ({ label: f.label, value: f.label }))}
            onChange={onFontLabel}
          />
        </Section>

        <div className={styles.footer}>
          <button
            type="button"
            className={`${styles.rowButton} ${styles.rowButtonPrimary}`}
            disabled={isPristine}
            onClick={copyCss}
          >
            <span aria-hidden="true" className={`material-symbols-rounded ${styles.rowIcon}`}>
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? "Copied" : "Copy CSS"}
          </button>
          <button type="button" className={styles.rowButton} onClick={onViewCss}>
            <span aria-hidden="true" className={`material-symbols-rounded ${styles.rowIcon}`}>
              code
            </span>
            View CSS
          </button>
          <button
            type="button"
            className={styles.rowButton}
            disabled={isPristine}
            onClick={onReset}
          >
            <span aria-hidden="true" className={`material-symbols-rounded ${styles.rowIcon}`}>
              restart_alt
            </span>
            Reset
          </button>
        </div>
      </div>
    </aside>
  );
}
