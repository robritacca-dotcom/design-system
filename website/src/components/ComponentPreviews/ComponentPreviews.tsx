"use client";

/**
 * The miniature live previews shown on the /components index sections and the
 * category landing pages, one per public component, keyed by registry slug.
 *
 * scripts/validate-website-surfaces.mjs holds this map to the registry in both
 * directions: every registered slug needs a preview entry here, and every key
 * here must be a registered slug.
 */
import Image from "next/image";
import { AgentStatus } from "@robr0/design-system/components/AgentStatus/AgentStatus";
import { AiButton } from "@robr0/design-system/components/AiButton/AiButton";
import { ChatHeader } from "@robr0/design-system/components/ChatHeader/ChatHeader";
import { ChatMarker } from "@robr0/design-system/components/ChatMarker/ChatMarker";
import { ChatMessage } from "@robr0/design-system/components/ChatMessage/ChatMessage";
import { ChatThread } from "@robr0/design-system/components/ChatThread/ChatThread";
import { Alert } from "@robr0/design-system/components/Alert/Alert";
import { Avatar } from "@robr0/design-system/components/Avatar/Avatar";
import { Badge } from "@robr0/design-system/components/Badge/Badge";
import { Button } from "@robr0/design-system/components/Button/Button";
import { Checkbox } from "@robr0/design-system/components/Checkbox/Checkbox";
import { Chip } from "@robr0/design-system/components/Chip/Chip";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { CodeBlock } from "@robr0/design-system/components/CodeBlock/CodeBlock";
import { Quote } from "@robr0/design-system/components/Quote/Quote";
import { Reasoning } from "@robr0/design-system/components/Reasoning/Reasoning";
import { ToolCall } from "@robr0/design-system/components/ToolCall/ToolCall";
import { Stat } from "@robr0/design-system/components/Stat/Stat";
import { Swatch } from "@robr0/design-system/components/Swatch/Swatch";
import { Timeline } from "@robr0/design-system/components/Timeline/Timeline";
import { ContributionGraph, type ContributionDay } from "@robr0/design-system/components/ContributionGraph/ContributionGraph";
import { Divider } from "@robr0/design-system/components/Divider/Divider";
import { DocumentChip } from "@robr0/design-system/components/DocumentChip/DocumentChip";
import { Pagination } from "@robr0/design-system/components/Pagination/Pagination";
import { InterruptCard } from "@robr0/design-system/components/InterruptCard/InterruptCard";
import { Kbd } from "@robr0/design-system/components/Kbd/Kbd";
import { ProgressBar } from "@robr0/design-system/components/ProgressBar/ProgressBar";
import { PromptSuggestions } from "@robr0/design-system/components/PromptSuggestions/PromptSuggestions";
import { Prose } from "@robr0/design-system/components/Prose/Prose";
import { RadioButton } from "@robr0/design-system/components/RadioButton/RadioButton";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { ShaderField } from "@robr0/design-system/components/ShaderField/ShaderField";
import { Skeleton } from "@robr0/design-system/components/Skeleton/Skeleton";
import { Slider } from "@robr0/design-system/components/Slider/Slider";
import { SourceChip } from "@robr0/design-system/components/SourceChip/SourceChip";
import { Spinner } from "@robr0/design-system/components/Spinner/Spinner";
import { Tabs } from "@robr0/design-system/components/Tabs/Tabs";
import { ToggleGroup } from "@robr0/design-system/components/ToggleGroup/ToggleGroup";
import { MessageActions } from "@robr0/design-system/components/MessageActions/MessageActions";
import { MessageCard } from "@robr0/design-system/components/MessageCard/MessageCard";
import type { ReactNode } from "react";
import styles from "./ComponentPreviews.module.css";

// Small fixed dataset for the contribution graph preview card
const contributionPreviewDays: ContributionDay[] = Array.from({ length: 8 * 7 }, (_, i) => {
  const d = new Date(2026, 0, 4 + i);
  const level = ([0, 1, 3, 0, 2, 4, 1, 0, 2, 3, 1, 4, 0, 2][i % 14]) as ContributionDay["level"];
  return {
    date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    count: level * 3,
    level,
  };
});

/*
  The icons inside these preview cards are DELIBERATELY off the
  icon-size scale. They are miniature drawings of components — a
  12px chevron here is part of a scaled-down mock of an Accordion
  row, not an icon in a UI. Sizing them from --icon-size-* would
  make the mocks the wrong scale relative to the fake text beside
  them. Leave the inline pixel values alone; they are not a token
  violation. Real icons elsewhere on the site use the scale.
*/
const previews: Record<string, () => ReactNode> = {
  "accordion": () => (
    <>
      <div className={styles.previewColumn} style={{ gap: "4px", width: "120px" }}>
        <div className={styles.accordionPreviewRow}>
          <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)" }}>Section 1</span>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-primary)", transform: "rotate(180deg)" }}>expand_more</span>
        </div>
        <div className={styles.accordionPreviewRow}>
          <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)" }}>Section 2</span>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-primary)" }}>expand_more</span>
        </div>
      </div>
    </>
  ),
  "agent-plan": () => (
    <>
      <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "6px", width: "150px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-status-positive-text)" }}>check_circle</span>
          <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>Read project files</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-status-info-text)" }}>progress_activity</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-primary)" }}>Update dark tokens</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>circle</span>
          <span style={{ fontSize: "11px", color: "var(--color-text-primary)" }}>Run the build</span>
        </div>
      </div>
    </>
  ),
  "agent-status": () => (
    <>
      <AgentStatus state="working" label="Working" pattern="orbit" size="compact" />
    </>
  ),
  "ai-button": () => (
    <>
      <AiButton size="compact" />
    </>
  ),
  "alert": () => (
    <>
      <Alert variant="info" title="Heads up" size="compact" />
    </>
  ),
  "alert-dialog": () => (
    <>
      <div className={styles.previewColumn} style={{ gap: "6px", width: "120px" }}>
        <div style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-page-primary)", display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-primary)" }}>Confirm?</span>
          <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
            <div style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "9px", color: "var(--color-text-secondary)", background: "var(--color-bg-container-secondary)" }}>Cancel</div>
            <div style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "9px", color: "#fff", background: "var(--color-action-primary-bg)" }}>OK</div>
          </div>
        </div>
      </div>
    </>
  ),
  "app-layout": () => (
    <>
      <div style={{ display: "flex", width: "140px", height: "72px", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--color-bg-container-border)" }}>
        <div style={{ width: "34px", background: "var(--color-bg-container-secondary)", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", paddingTop: "6px" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "12px", color: "var(--color-icon-primary)" }}>dashboard</span>
          <span className="material-symbols-rounded" style={{ fontSize: "12px", color: "var(--color-icon-secondary)" }}>analytics</span>
          <span className="material-symbols-rounded" style={{ fontSize: "12px", color: "var(--color-icon-secondary)" }}>settings</span>
        </div>
        <div style={{ flex: 1, background: "var(--color-bg-page-primary)", padding: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ width: "50%", height: "8px", borderRadius: "3px", background: "var(--color-bg-container-secondary)" }} />
          <div style={{ width: "80%", height: "5px", borderRadius: "3px", background: "var(--color-bg-container-primary)" }} />
          <div style={{ width: "70%", height: "5px", borderRadius: "3px", background: "var(--color-bg-container-primary)" }} />
        </div>
      </div>
    </>
  ),
  "app-sidebar": () => (
    <>
      <div className={styles.previewColumn} style={{ gap: "4px", width: "100px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 6px", borderRadius: "4px", background: "var(--color-action-passive-bg-hover)" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-primary)" }}>dashboard</span>
          <span style={{ fontSize: "10px", color: "var(--color-text-primary)" }}>Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 6px" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>analytics</span>
          <span style={{ fontSize: "10px", color: "var(--color-text-secondary)" }}>Analytics</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 6px" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>settings</span>
          <span style={{ fontSize: "10px", color: "var(--color-text-secondary)" }}>Settings</span>
        </div>
      </div>
    </>
  ),
  "avatar": () => (
    <>
      <div className={styles.previewRow} style={{ gap: "8px" }}>
        <Avatar size="sm" name="Jane Doe" />
        <Avatar size="md" name="Alex Smith" />
        <Avatar size="sm" />
      </div>
    </>
  ),
  "badge": () => (
    <>
      <div className={styles.previewRow} style={{ gap: "8px" }}>
        <Badge variant="info" label="Info" />
        <Badge variant="positive" label="Success" />
        <Badge variant="error" label="Error" />
      </div>
    </>
  ),
  "breadcrumb": () => (
    <>
      <div className={styles.previewRow} style={{ gap: "4px", fontSize: "12px" }}>
        <span style={{ color: "var(--color-text-secondary)" }}>Home</span>
        <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-text-tertiary)" }}>chevron_right</span>
        <span style={{ color: "var(--color-text-secondary)" }}>Section</span>
        <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-text-tertiary)" }}>chevron_right</span>
        <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>Page</span>
      </div>
    </>
  ),
  "button": () => (
    <>
      <Button label="Button" variant="secondary" state="default" />
    </>
  ),
  "button-group": () => (
    <>
      <div className={styles.previewRow} style={{ gap: "10px" }}>
        <Button label="Active" variant="tertiary" state="active" />
        <Button label="Inactive" variant="tertiary" state="default" />
      </div>
    </>
  ),
  "card": () => (
    <>
      <div className={styles.cardPreview} />
    </>
  ),
  "carousel": () => (
    <>
      <div className={styles.previewRow} style={{ gap: "8px", alignItems: "center" }}>
        <span className="material-symbols-rounded" style={{ fontSize: "18px", color: "var(--color-icon-secondary)" }}>chevron_left</span>
        <div style={{ display: "flex", gap: "4px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-action-primary-bg)" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-bg-container-border)" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-bg-container-border)" }} />
        </div>
        <span className="material-symbols-rounded" style={{ fontSize: "18px", color: "var(--color-icon-secondary)" }}>chevron_right</span>
      </div>
    </>
  ),
  "anchor-nav": () => (
    <>
      <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", width: "150px", borderLeft: "1px solid var(--color-divider)" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)", padding: "3px 0 3px 12px", borderLeft: "2px solid var(--color-text-primary)", marginLeft: "-1px" }}>Preview</span>
        <span style={{ fontSize: "12px", color: "var(--color-text-tertiary)", padding: "3px 0 3px 12px" }}>Installation</span>
        <span style={{ fontSize: "12px", color: "var(--color-text-tertiary)", padding: "3px 0 3px 12px" }}>Filtering</span>
      </div>
    </>
  ),
  "area-chart": () => (
    <>
      <svg width="120" height="64" viewBox="0 0 120 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 48 L20 34 L40 40 L60 22 L80 28 L100 12 L120 18 L120 64 L0 64 Z" fill="var(--color-action-primary-bg)" opacity={0.3} />
        <path d="M0 48 L20 34 L40 40 L60 22 L80 28 L100 12 L120 18" stroke="var(--color-action-primary-bg)" strokeWidth="2" fill="none" />
        <line x1="0" y1="63.5" x2="120" y2="63.5" stroke="var(--color-bg-container-border)" strokeWidth="1" />
      </svg>
    </>
  ),
  "bar-chart": () => (
    <>
      <svg width="120" height="64" viewBox="0 0 120 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
        {[
          { x: 4, h: 28 },
          { x: 18, h: 44 },
          { x: 32, h: 36 },
          { x: 46, h: 52 },
          { x: 60, h: 24 },
          { x: 74, h: 40 },
          { x: 88, h: 48 },
          { x: 102, h: 32 },
        ].map((bar, i) => (
          <rect
            key={i}
            x={bar.x}
            y={64 - bar.h}
            width={10}
            height={bar.h}
            rx={2}
            fill="var(--color-action-primary-bg)"
            opacity={0.85}
          />
        ))}
        <line x1="0" y1="63.5" x2="120" y2="63.5" stroke="var(--color-bg-container-border)" strokeWidth="1" />
      </svg>
    </>
  ),
  "line-chart": () => (
    <>
      <svg width="120" height="64" viewBox="0 0 120 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="0,44 24,28 48,36 72,16 96,24 120,8" stroke="var(--color-action-primary-bg)" strokeWidth="2" fill="none" />
        <polyline points="0,54 24,48 48,52 72,38 96,44 120,30" stroke="var(--color-action-primary-bg)" strokeWidth="2" opacity={0.4} fill="none" />
        <line x1="0" y1="63.5" x2="120" y2="63.5" stroke="var(--color-bg-container-border)" strokeWidth="1" />
      </svg>
    </>
  ),
  "pie-chart": () => (
    <>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" stroke="var(--color-action-primary-bg)" strokeWidth="14" opacity={0.3} fill="none" />
        {/* 60% slice: dash length over a c=150.8 circumference, rotated to start at 12 o'clock */}
        <circle cx="32" cy="32" r="24" stroke="var(--color-action-primary-bg)" strokeWidth="14" fill="none" strokeDasharray="90.5 150.8" transform="rotate(-90 32 32)" />
      </svg>
    </>
  ),
  "radar-chart": () => (
    <>
      <svg width="72" height="64" viewBox="0 0 72 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="36,4 66,26 55,60 17,60 6,26" stroke="var(--color-bg-container-border)" strokeWidth="1" fill="none" />
        <polygon points="36,18 51,29 46,46 26,46 21,29" stroke="var(--color-bg-container-border)" strokeWidth="1" fill="none" />
        <polygon points="36,10 58,28 48,54 22,50 14,24" stroke="var(--color-action-primary-bg)" strokeWidth="2" fill="var(--color-action-primary-bg)" fillOpacity={0.25} />
      </svg>
    </>
  ),
  "radial-chart": () => (
    <>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer ring at 75%, inner ring at 45%, both from 12 o'clock */}
        <circle cx="32" cy="32" r="26" stroke="var(--color-bg-container-border)" strokeWidth="6" fill="none" />
        <circle cx="32" cy="32" r="26" stroke="var(--color-action-primary-bg)" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="122.5 163.4" transform="rotate(-90 32 32)" />
        <circle cx="32" cy="32" r="16" stroke="var(--color-bg-container-border)" strokeWidth="6" fill="none" />
        <circle cx="32" cy="32" r="16" stroke="var(--color-action-primary-bg)" strokeWidth="6" opacity={0.5} fill="none" strokeLinecap="round" strokeDasharray="45.2 100.5" transform="rotate(-90 32 32)" />
      </svg>
    </>
  ),
  "scatter-chart": () => (
    <>
      <svg width="120" height="64" viewBox="0 0 120 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {[
          { cx: 14, cy: 44 }, { cx: 24, cy: 36 }, { cx: 30, cy: 48 }, { cx: 38, cy: 40 }, { cx: 22, cy: 52 },
        ].map((p, i) => (
          <circle key={`a${i}`} cx={p.cx} cy={p.cy} r={4} fill="var(--color-action-primary-bg)" opacity={0.85} />
        ))}
        {[
          { cx: 78, cy: 20 }, { cx: 90, cy: 14 }, { cx: 96, cy: 26 }, { cx: 104, cy: 18 }, { cx: 86, cy: 30 },
        ].map((p, i) => (
          <circle key={`b${i}`} cx={p.cx} cy={p.cy} r={4} fill="var(--color-action-primary-bg)" opacity={0.4} />
        ))}
        <line x1="0" y1="63.5" x2="120" y2="63.5" stroke="var(--color-bg-container-border)" strokeWidth="1" />
      </svg>
    </>
  ),
  "stacked-bar-chart": () => (
    <>
      <svg width="120" height="64" viewBox="0 0 120 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {[
          { x: 8, a: 22, b: 14 },
          { x: 32, a: 30, b: 20 },
          { x: 56, a: 18, b: 12 },
          { x: 80, a: 26, b: 18 },
          { x: 104, a: 22, b: 10 },
        ].map((bar, i) => (
          <g key={i}>
            <rect x={bar.x} y={64 - bar.a} width={10} height={bar.a} fill="var(--color-action-primary-bg)" opacity={0.85} />
            <rect x={bar.x} y={64 - bar.a - bar.b} width={10} height={bar.b} rx={2} fill="var(--color-action-primary-bg)" opacity={0.35} />
          </g>
        ))}
        <line x1="0" y1="63.5" x2="120" y2="63.5" stroke="var(--color-bg-container-border)" strokeWidth="1" />
      </svg>
    </>
  ),
  "treemap": () => (
    <>
      <svg width="120" height="64" viewBox="0 0 120 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="56" height="64" rx="3" fill="var(--color-action-primary-bg)" opacity={0.85} />
        <rect x="60" y="0" width="60" height="30" rx="3" fill="var(--color-action-primary-bg)" opacity={0.5} />
        <rect x="60" y="34" width="34" height="30" rx="3" fill="var(--color-action-primary-bg)" opacity={0.3} />
        <rect x="98" y="34" width="22" height="30" rx="3" fill="var(--color-action-primary-bg)" opacity={0.15} />
      </svg>
    </>
  ),
  "chat-header": () => (
    <>
      <div style={{ width: "100%", border: "1px solid var(--color-bg-container-border)", borderRadius: "16px" }}>
        <ChatHeader
          title="Assistant"
          actions={
            <>
              <CircularButton icon="edit_square" variant="tertiary" ariaLabel="New chat" />
              <CircularButton icon="close" variant="tertiary" ariaLabel="Close chat" />
            </>
          }
        />
      </div>
    </>
  ),
  "chat-marker": () => (
    <>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
        <ChatMarker>Today</ChatMarker>
        <ChatMarker icon="history">Conversation resumed</ChatMarker>
      </div>
    </>
  ),
  "chat-message": () => (
    <>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
        <ChatMessage role="user" size="compact">
          Ready to review?
        </ChatMessage>
        <ChatMessage role="assistant" size="compact">
          Yes, the queue is clear.
        </ChatMessage>
      </div>
    </>
  ),
  "chat-thread": () => (
    <>
      <div style={{ width: "100%", height: "150px", display: "flex", flexDirection: "column", border: "1px solid var(--color-bg-container-border)", borderRadius: "16px", overflow: "hidden" }}>
        <ChatThread anchor={false} style={{ flex: 1, "--ds-chat-thread-padding-inline": "var(--padding-sm-md)" } as React.CSSProperties}>
          <ChatMessage role="user" size="compact">
            Where do the fades come from?
          </ChatMessage>
          <ChatMessage role="assistant" size="compact">
            A CSS mask at either end. Content scrolls out through it, and the scrollbar only appears while scrolling.
          </ChatMessage>
        </ChatThread>
      </div>
    </>
  ),
  "checkbox": () => (
    <>
      <div className={styles.previewRow} style={{ gap: "16px" }}>
        <Checkbox checked={true} ariaLabel="Checked" onChange={() => {}} />
        <Checkbox checked={false} ariaLabel="Unchecked" onChange={() => {}} />
      </div>
    </>
  ),
  "chip": () => (
    <>
      <div className={styles.previewRow} style={{ gap: "8px" }}>
        <Chip size="compact" label="Filter" icon="check" selected onClick={() => {}} />
        <Chip size="compact" label="Label" />
        <Chip size="compact" label="Tag" onRemove={() => {}} />
      </div>
    </>
  ),
  "circular-button": () => (
    <>
      <div className={styles.previewRow} style={{ gap: "12px" }}>
        <CircularButton icon="search" ariaLabel="Search" variant="secondary" />
        <CircularButton icon="settings" ariaLabel="Settings" variant="tertiary" />
      </div>
    </>
  ),
  "code-block": () => (
    <>
      <div style={{ width: "180px" }}>
        <CodeBlock code={`--radius-full: 999px;`} filename="tokens.css" showCopy={false} />
      </div>
    </>
  ),
  "color-picker": () => (
    <>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 10px 4px 4px", borderRadius: "12px", border: "1px solid var(--color-input-border-selected)" }}>
        <Swatch value="#118AB2" label="Teal 07" shape="square" tabIndex={-1} />
        <span style={{ fontSize: "12px", color: "var(--color-text-primary)", fontVariantNumeric: "tabular-nums" }}>#118AB2</span>
      </div>
    </>
  ),
  "combobox": () => (
    <>
      <div className={styles.previewColumn} style={{ gap: "4px", width: "150px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 10px", borderRadius: "8px", border: "1px solid var(--color-input-border-selected)", background: "var(--color-input-bg-primary)" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-primary)" }}>search</span>
          <span style={{ fontSize: "10px", color: "var(--color-text-primary)" }}>Can</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", padding: "4px", borderRadius: "8px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-page-primary)" }}>
          <span style={{ fontSize: "10px", padding: "3px 6px", borderRadius: "4px", background: "var(--color-action-passive-bg-hover)", color: "var(--color-text-primary)" }}>Canada</span>
          <span style={{ fontSize: "10px", padding: "3px 6px", color: "var(--color-text-tertiary)" }}>Cancún</span>
        </div>
      </div>
    </>
  ),
  "command-palette": () => (
    <>
      <div style={{ width: "160px", borderRadius: "8px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-page-primary)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 8px", borderBottom: "1px solid var(--color-divider)" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-primary)" }}>search</span>
          <span style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>Type a command…</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", padding: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px", padding: "3px 6px", borderRadius: "4px", background: "var(--color-action-passive-bg-hover)" }}>
            <span style={{ fontSize: "10px", color: "var(--color-text-primary)" }}>New file</span>
            <span style={{ fontSize: "8px", padding: "1px 4px", borderRadius: "3px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-container-primary)", color: "var(--color-text-tertiary)" }}>⌘N</span>
          </div>
          <span style={{ fontSize: "10px", padding: "3px 6px", color: "var(--color-text-tertiary)" }}>Toggle theme</span>
        </div>
      </div>
    </>
  ),
  "composer": () => (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "160px", padding: "8px 10px", borderRadius: "12px", border: "1px solid var(--color-input-border-primary)", background: "var(--color-input-bg-primary)" }}>
        <span style={{ fontSize: "10px", color: "var(--color-input-text-placeholder)" }}>Message the agent</span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-primary)" }}>add</span>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", borderRadius: "50%", background: "var(--color-action-primary-bg)" }}>
            <span className="material-symbols-rounded" style={{ fontSize: "12px", color: "var(--color-action-primary-text)" }}>arrow_upward</span>
          </span>
        </div>
      </div>
    </>
  ),
  "contact-card": () => (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "160px" }}>
        {[
          { icon: "mail", label: "Email" },
          { icon: "person", label: "LinkedIn" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 10px", borderRadius: "8px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-container-primary-semi)" }}>
            <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>{item.icon}</span>
            <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)", flex: 1 }}>{item.label}</span>
            <span className="material-symbols-rounded" style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>open_in_new</span>
          </div>
        ))}
      </div>
    </>
  ),
  "context-menu": () => (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "150px", padding: "4px", borderRadius: "10px", border: "1px solid var(--color-input-border-primary)", background: "var(--color-bg-page-primary)", boxShadow: "var(--shadow-floating)" }}>
        {[
          { icon: "open_in_new", label: "Open", hover: false },
          { icon: "edit", label: "Rename", hover: true },
          { icon: "delete", label: "Delete", hover: false, destructive: true },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 8px", borderRadius: "6px", background: item.hover ? "var(--color-action-passive-bg-hover)" : "transparent" }}>
            <span className="material-symbols-rounded" style={{ fontSize: "13px", color: item.destructive ? "var(--color-core-accent-coral)" : "var(--color-icon-secondary)" }}>{item.icon}</span>
            <span style={{ fontSize: "11px", fontWeight: 500, color: item.destructive ? "var(--color-core-accent-coral)" : "var(--color-text-primary)" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </>
  ),
  "contribution-graph": () => (
    <>
      {/* The graph is fluid (width: 100%) — constrain it so the
          cells stay small inside the preview card */}
      <div style={{ width: "150px" }}>
        <ContributionGraph
          days={contributionPreviewDays}
          showMonthLabels={false}
          showLegend={false}
        />
      </div>
    </>
  ),
  "data-table": () => (
    <>
      <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "4px", width: "160px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingBottom: "4px", borderBottom: "1px solid var(--color-divider)" }}>
          <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--color-text-primary)", flex: 1 }}>Customer</span>
          <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--color-text-primary)" }}>Status</span>
          <span className="material-symbols-rounded" style={{ fontSize: "12px", color: "var(--color-icon-secondary)" }}>arrow_upward</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "10px", color: "var(--color-text-secondary)", flex: 1 }}>Aspen Lubin</span>
          <span style={{ fontSize: "9px", padding: "1px 6px", borderRadius: "4px", background: "var(--color-status-positive-bg)", color: "var(--color-status-positive-text)" }}>Shipped</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "10px", color: "var(--color-text-secondary)", flex: 1 }}>Omar Vetrovs</span>
          <span style={{ fontSize: "9px", padding: "1px 6px", borderRadius: "4px", background: "var(--color-status-warning-bg)", color: "var(--color-status-warning-text)" }}>Waiting</span>
        </div>
      </div>
    </>
  ),
  "date-input": () => (
    <>
      <div className={styles.inputPreview}>
        <span style={{ color: "var(--color-text-tertiary)", fontSize: "14px" }}>
          dd/mm/yyyy
        </span>
      </div>
    </>
  ),
  "date-picker": () => (
    <>
      <span className="material-symbols-rounded" style={{ fontSize: "36px", color: "var(--color-icon-primary)" }}>
        calendar_month
      </span>
    </>
  ),
  "dialog": () => (
    <>
      <div style={{ padding: "10px", borderRadius: "6px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-page-primary)", display: "flex", flexDirection: "column", gap: "6px", width: "130px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-primary)" }}>Edit profile</span>
          <span className="material-symbols-rounded" style={{ fontSize: "12px", color: "var(--color-icon-primary)" }}>close</span>
        </div>
        <div style={{ height: "5px", borderRadius: "3px", background: "var(--color-bg-container-primary)" }} />
        <div style={{ height: "5px", borderRadius: "3px", background: "var(--color-bg-container-primary)", width: "70%" }} />
        <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
          <div style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "9px", color: "#fff", background: "var(--color-action-primary-bg)" }}>Save</div>
        </div>
      </div>
    </>
  ),
  "divider": () => (
    <>
      <div style={{ width: "120px" }}>
        <Divider spacing="sm" />
        <Divider label="or" spacing="sm" />
      </div>
    </>
  ),
  "document-chip": () => (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "var(--gap-xs)" }}>
        <DocumentChip name="brief.pdf" fileType="pdf" meta="1.2 MB" />
        <DocumentChip name="budget.xlsx" fileType="sheet" size="compact" />
      </div>
    </>
  ),
  "drawer": () => (
    <>
      <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", width: "150px", height: "70px", borderRadius: "8px", background: "var(--color-bg-container-primary)", overflow: "hidden" }}>
        <div style={{ width: "60%", height: "100%", padding: "8px", borderLeft: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-page-primary)", display: "flex", flexDirection: "column", gap: "5px" }}>
          <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--color-text-primary)" }}>Filters</span>
          <div style={{ height: "5px", borderRadius: "3px", background: "var(--color-bg-container-secondary)" }} />
          <div style={{ height: "5px", width: "70%", borderRadius: "3px", background: "var(--color-bg-container-secondary)" }} />
        </div>
      </div>
    </>
  ),
  "dropdown": () => (
    <>
      <div className={styles.dropdownPreview}>
        <span className={styles.dropdownPreviewText}>Select</span>
        <span className="material-symbols-rounded" style={{ fontSize: "20px", color: "var(--color-icon-primary)" }}>
          expand_more
        </span>
      </div>
    </>
  ),
  "dropdown-menu": () => (
    <>
      <div className={styles.dropdownMenuPreview}>
        <div className={styles.dropdownMenuPreviewItem}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>person</span>
          <span style={{ fontSize: "11px", color: "var(--color-text-primary)" }}>Profile</span>
        </div>
        <div className={styles.dropdownMenuPreviewItem} style={{ background: "var(--color-action-passive-bg-hover)" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>settings</span>
          <span style={{ fontSize: "11px", color: "var(--color-text-primary)" }}>Settings</span>
        </div>
        <div className={styles.dropdownMenuPreviewSep} />
        <div className={styles.dropdownMenuPreviewItem}>
          <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>logout</span>
          <span style={{ fontSize: "11px", color: "var(--color-text-primary)" }}>Log out</span>
        </div>
      </div>
    </>
  ),
  "empty-state": () => (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", width: "150px", padding: "12px 8px", borderRadius: "8px", border: "1px dashed var(--color-bg-container-border)" }}>
        <span className="material-symbols-rounded" style={{ fontSize: "18px", color: "var(--color-icon-primary)", background: "var(--color-bg-container-primary)", borderRadius: "999px", padding: "5px" }}>inbox</span>
        <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--color-text-primary)" }}>No messages</span>
        <span style={{ fontSize: "9px", color: "var(--color-text-tertiary)" }}>Nothing to show yet</span>
      </div>
    </>
  ),
  "entity-card": () => (
    <>
      <div className={styles.previewRow} style={{ gap: "8px" }}>
        {["home", "star"].map((name) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-container-primary)" }}>
            <span className="material-symbols-rounded" style={{ fontSize: "20px", color: "var(--color-text-primary)" }}>{name}</span>
            <span style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>{name}</span>
          </div>
        ))}
      </div>
    </>
  ),
  "event-calendar": () => (
    <>
      <div aria-hidden="true" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3px", width: "140px" }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "2px", padding: "3px", borderRadius: "4px", background: "var(--color-bg-container-secondary)", minHeight: "22px" }}>
            <span style={{ fontSize: "8px", color: "var(--color-text-tertiary)" }}>{i + 9}</span>
            {(i === 1 || i === 6) && (
              <span style={{ display: "flex", alignItems: "center", gap: "2px", padding: "1px 3px", borderRadius: "3px", background: "var(--color-bg-container-primary)" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: i === 1 ? "var(--color-core-accent-cobalt)" : "var(--color-core-accent-coral)" }} />
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  ),
  "field": () => (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "150px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-primary)" }}>
          Email address <span style={{ color: "var(--color-core-accent-coral)" }}>*</span>
        </span>
        <div style={{ height: "26px", borderRadius: "10px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-container-primary)" }} />
        <span style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>We only use this to contact you.</span>
      </div>
    </>
  ),
  "figure": () => (
    <>
      <div style={{ width: "140px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--color-bg-container-border)" }}>
        <div style={{ height: "60px", background: "var(--color-bg-container-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="material-symbols-rounded" style={{ fontSize: "24px", color: "var(--color-icon-secondary)" }}>image</span>
        </div>
        <div style={{ padding: "6px 10px", fontSize: "10px", color: "var(--color-text-tertiary)", borderTop: "1px solid var(--color-bg-container-border)" }}>
          Caption text
        </div>
      </div>
    </>
  ),
  "file-input": () => (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", width: "150px", padding: "14px 8px", borderRadius: "8px", border: "1px dashed var(--color-input-border-primary)", background: "var(--color-input-bg-primary)" }}>
        <span className="material-symbols-rounded" style={{ fontSize: "18px", color: "var(--color-icon-primary)" }}>upload_file</span>
        <span style={{ fontSize: "10px", fontWeight: 500, color: "var(--color-text-primary)" }}>Drop a file</span>
        <span style={{ fontSize: "9px", color: "var(--color-text-tertiary)" }}>or click to browse</span>
      </div>
    </>
  ),
  "input": () => (
    <>
      <div className={styles.inputPreview}>
        <span style={{ color: "var(--color-text-tertiary)", fontSize: "14px" }}>
          Enter text...
        </span>
      </div>
    </>
  ),
  "instructions": () => (
    <>
      <div className={styles.previewColumn} style={{ gap: "6px" }}>
        <div className={styles.instructionStep}>
          <span className={styles.instructionBadge}>1</span>
          <span className={styles.instructionLabel}>First</span>
        </div>
        <div className={styles.instructionStep}>
          <span className={styles.instructionBadge}>2</span>
          <span className={styles.instructionLabel}>Second</span>
        </div>
      </div>
    </>
  ),
  "interrupt-card": () => (
    <>
      <div style={{ width: "100%", maxWidth: "220px" }}>
        <InterruptCard
          title="Allow file edit?"
          options={[
            { value: "allow", label: "Allow", variant: "primary" },
            { value: "deny", label: "Deny" },
          ]}
        />
      </div>
    </>
  ),
  "kbd": () => (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>K</Kbd>
      </div>
    </>
  ),
  "link-list": () => (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { logo: "/logos/substack.svg", label: "Substack" },
          { logo: "/logos/Git.svg", label: "GitHub" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG source: next/image would need images.dangerouslyAllowSVG in next.config.ts to serve it at all. */}
            <img src={item.logo} alt="" width={20} height={20} style={{ objectFit: "contain", flexShrink: 0 }} />
            <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-primary)" }}>{item.label}</span>
            <span className="material-symbols-rounded" style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginLeft: "auto" }}>open_in_new</span>
          </div>
        ))}
      </div>
    </>
  ),
  "message-actions": () => (
    <>
      <MessageActions
        showTooltips={false}
        items={[
          { id: "copy", icon: "content_copy", label: "Copy" },
          { id: "retry", icon: "refresh", label: "Retry" },
          { id: "thumb-up", icon: "thumb_up", label: "Good response" },
        ]}
      />
    </>
  ),
  "message-card": () => (
    <>
      <div style={{ width: "100%", maxWidth: "220px" }}>
        <MessageCard
          icon="language"
          title="Harbour Line timetable"
          meta="transit.harbourline.example"
        />
      </div>
    </>
  ),
  "model-picker": () => (
    <>
      <div aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 12px", borderRadius: "999px", background: "var(--color-action-passive-bg-hover)" }}>
        <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-text-secondary)" }}>Sonnet 5</span>
        <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-icon-secondary)" }}>expand_more</span>
      </div>
    </>
  ),
  "nav": () => (
    <>
      <div className={styles.previewRow} style={{ gap: "20px" }}>
        <Image src="/rr.svg" alt="robr0" width={24} height={24} />
        <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.16px" }}>
          robr0
        </span>
      </div>
    </>
  ),
  "nav-list": () => (
    <>
      <div aria-hidden="true" style={{ width: "180px", display: "flex", flexDirection: "column", gap: "var(--gap-xxs)" }}>
        <Button
          variant="tertiary"
          label="Overview"
          state="active"
          tabIndex={-1}
          style={{ width: "100%", justifyContent: "flex-start" }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "var(--gap-xxs)" }}>
          <Button
            variant="tertiary"
            label="Guides"
            tabIndex={-1}
            style={{ flex: "1 1 auto", justifyContent: "flex-start" }}
          />
          <CircularButton icon="expand_more" variant="tertiary" ariaLabel="Expand" tabIndex={-1} />
        </div>
      </div>
    </>
  ),
  "notification-center": () => (
    <>
      <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "6px", width: "160px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-primary)", flex: 1 }}>Backup ready</span>
          <span style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>2m</span>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-status-info-border)" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", opacity: 0.7 }}>
          <span style={{ fontSize: "11px", color: "var(--color-text-primary)", flex: 1 }}>Review requested</span>
          <span style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>1h</span>
        </div>
      </div>
    </>
  ),
  "pagination": () => (
    <>
      <Pagination page={2} pageCount={3} onPageChange={() => {}} size="compact" />
    </>
  ),
  "popover": () => (
    <>
      <div className={styles.popoverPreview}>
        <span style={{ fontSize: "12px", color: "var(--color-text-primary)" }}>
          Popover
        </span>
        <div className={styles.popoverArrow} />
      </div>
    </>
  ),
  "progress-bar": () => (
    <>
      <div style={{ width: "120px" }}>
        <ProgressBar value={65} size="compact" />
      </div>
    </>
  ),
  "prompt-suggestions": () => (
    <>
      <PromptSuggestions
        layout="wrap"
        style={{ justifyContent: "center" }}
        suggestions={[
          { id: "ideas", label: "Brainstorm ideas", icon: "lightbulb" },
          { id: "trip", label: "Plan a trip" },
        ]}
      />
    </>
  ),
  "prose": () => (
    <>
      <div style={{ width: "100%", maxWidth: "220px", textAlign: "left" }}>
        <Prose size="sm">
          <h4>Release notes</h4>
          <p>
            Rendered markdown picks up the token scale, down to inline{" "}
            <code>code</code>.
          </p>
        </Prose>
      </div>
    </>
  ),
  "quote": () => (
    <>
      <div style={{ width: "170px" }}>
        <Quote>
          <span style={{ fontSize: "12px", lineHeight: "16px", display: "block" }}>
            Systems are coordination problems.
          </span>
        </Quote>
      </div>
    </>
  ),
  "radio-button": () => (
    <>
      <div className={styles.previewColumn} style={{ gap: "16px" }}>
        <RadioButton label="Option A" checked={true} onChange={() => {}} />
        <RadioButton label="Option B" checked={false} onChange={() => {}} />
      </div>
    </>
  ),
  "reasoning": () => (
    <>
      <div style={{ width: "160px" }}>
        <Reasoning duration={12}>
          Converted both regions to USD at the invoice-date rate before
          summing.
        </Reasoning>
      </div>
    </>
  ),
  "section-title": () => (
    <>
      <div className={styles.sectionTitlePreview}>
        <span className={styles.sectionTitlePreviewText}>Section</span>
        <div className={styles.sectionTitlePreviewDivider} />
      </div>
    </>
  ),
  "segmented-control": () => (
    <>
      <SegmentedControl
        segments={[
          { label: "A", value: "a" },
          { label: "B", value: "b" },
        ]}
        activeSegment="a"
        size="compact"
      />
    </>
  ),
  "selection-card": () => (
    <>
      <div className={styles.previewColumn} style={{ gap: "6px", width: "180px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-action-primary-border)" }}>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-text-primary)" }}>A</span>
          <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid var(--color-action-primary-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-action-primary-bg)" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--color-bg-container-border)" }}>
          <span style={{ fontSize: "12px", color: "var(--color-text-primary)" }}>B</span>
          <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid var(--color-bg-container-border)" }} />
        </div>
      </div>
    </>
  ),
  "shader-field": () => (
    <>
      <div style={{ position: "relative", width: "180px", height: "84px", overflow: "hidden", borderRadius: "8px", border: "1px solid var(--color-bg-container-border)", background: "var(--color-bg-page-primary)" }}>
        <ShaderField params={{ intensity: 0.85, scale: 1.6, streak: 0.3 }} />
      </div>
    </>
  ),
  "skeleton": () => (
    <>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Skeleton variant="circular" width="32px" height="32px" />
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Skeleton variant="text" width="80px" />
          <Skeleton variant="text" width="60px" />
        </div>
      </div>
    </>
  ),
  "slider": () => (
    <>
      <div style={{ width: "120px" }}>
        <Slider value={60} />
      </div>
    </>
  ),
  "source-chip": () => (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
        <SourceChip index={1} title="Design tokens quarterly" />
        <SourceChip index={2} title="Theming layered systems" />
      </div>
    </>
  ),
  "spinner": () => (
    <>
      <Spinner size="lg" />
    </>
  ),
  "stat": () => (
    <>
      <Stat value="~900%" label="Successful generations" trend="up" delta="+clash view" />
    </>
  ),
  "swatch": () => (
    <>
      <div style={{ display: "flex", gap: "8px" }}>
        <Swatch value="#EF476F" label="Red 07" tabIndex={-1} />
        <Swatch value="#FFD166" label="Yellow 07" tabIndex={-1} />
        <Swatch value="#118AB2" label="Teal 07" selected tabIndex={-1} />
        <Swatch value="#9E47EF" label="Purple 07" tabIndex={-1} />
      </div>
    </>
  ),
  "table": () => (
    <>
      <div className={styles.tablePreview}>
        <div className={`${styles.tablePreviewRow} ${styles.tablePreviewRowHeader}`} />
        <div className={styles.tablePreviewRow} />
        <div className={styles.tablePreviewRow} />
        <div className={styles.tablePreviewRow} />
      </div>
    </>
  ),
  "tabs": () => (
    <>
      <Tabs
        tabs={[
          { label: "One", value: "one" },
          { label: "Two", value: "two" },
        ]}
        activeTab="one"
        size="compact"
        onTabChange={() => {}}
      />
    </>
  ),
  "textarea": () => (
    <>
      <div className={styles.textareaPreview}>
        <span style={{ color: "var(--color-text-tertiary)", fontSize: "14px" }}>
          Enter text...
        </span>
      </div>
    </>
  ),
  "timeline": () => (
    <>
      <div style={{ width: "150px" }}>
        <Timeline
          numbered
          items={[{ title: "Discover" }, { title: "Design" }, { title: "Ship" }]}
        />
      </div>
    </>
  ),
  "toast": () => (
    <>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 10px", borderRadius: "6px", background: "var(--color-status-positive-bg)", border: "1px solid var(--color-status-positive-border)" }}>
        <span className="material-symbols-rounded" style={{ fontSize: "16px", color: "var(--color-status-positive-border)" }}>check_circle</span>
        <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-status-positive-text)" }}>Saved</span>
      </div>
    </>
  ),
  "toggle-group": () => (
    <>
      <ToggleGroup
        items={[
          { value: "bold", label: "format_bold", icon: true },
          { value: "italic", label: "format_italic", icon: true },
          { value: "underline", label: "format_underlined", icon: true },
        ]}
        value={["bold"]}
        multiple
        size="compact"
      />
    </>
  ),
  "toggle-switch": () => (
    <>
      <div className={styles.togglePreview}>
        <div className={styles.toggleSocket}>
          <div className={styles.toggleThumb}>
            <span className="material-symbols-rounded" style={{ fontSize: "14px", color: "var(--color-action-primary-bg)" }}>
              check
            </span>
          </div>
        </div>
      </div>
    </>
  ),
  "tool-call": () => (
    <>
      <div style={{ width: "200px" }}>
        <ToolCall name="grep" duration="0.4s" />
      </div>
    </>
  ),
  "tooltip": () => (
    <>
      <div className={styles.popoverPreview}>
        <span style={{ fontSize: "12px", color: "var(--color-bg-page-primary)", background: "var(--color-bg-page-inverse)", padding: "2px 8px", borderRadius: "4px" }}>
          Tooltip
        </span>
        <div style={{ width: "8px", height: "8px", background: "var(--color-bg-page-inverse)", transform: "rotate(45deg)", marginTop: "-5px" }} />
      </div>
    </>
  ),
};

export function ComponentPreview({ slug }: { slug: string }) {
  const render = previews[slug];
  return render ? <>{render()}</> : null;
}
