"use client";

/**
 * The treasury console template: the payment-release desk of Clearhaven, a
 * fictional treasury platform, built from the design system alone. The
 * layout is master-detail case work: a release queue on the left, and one
 * wire open on the right as a single case panel — identity and actions, the
 * figures band, and the four-stage pipeline — over the detail panels it
 * governs. The release itself is gated behind a one-time code. Every
 * colour, radius, space, and type style is a semantic token; every control
 * is a library component.
 *
 * The screen is scripted end to end: approving the open wire completes its
 * approval chain, releasing it demands the PIN, and the queue row, stepper,
 * activity feed and toast all move together. All data is fictional, so the
 * route is excluded from the chat corpus (see EXCLUDED_ROUTES in
 * generate-site-corpus.mjs).
 */

import React from "react";
import { AiButton } from "@robr0/design-system/components/AiButton/AiButton";
import { Avatar } from "@robr0/design-system/components/Avatar/Avatar";
import { Badge } from "@robr0/design-system/components/Badge/Badge";
import { Button } from "@robr0/design-system/components/Button/Button";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { CodeBlock } from "@robr0/design-system/components/CodeBlock/CodeBlock";
import { Dialog } from "@robr0/design-system/components/Dialog/Dialog";
import { Divider } from "@robr0/design-system/components/Divider/Divider";
import {
  FilterBar,
  type FilterBarFilter,
} from "@robr0/design-system/components/FilterBar/FilterBar";
import { Gauge } from "@robr0/design-system/components/Gauge/Gauge";
import { PinInput } from "@robr0/design-system/components/PinInput/PinInput";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { Spinner } from "@robr0/design-system/components/Spinner/Spinner";
import { SplitButton } from "@robr0/design-system/components/SplitButton/SplitButton";
import { Stepper } from "@robr0/design-system/components/Stepper/Stepper";
import {
  ToastProvider,
  useToast,
} from "@robr0/design-system/components/Toast/Toast";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import TemplateAssistant from "../TemplateAssistant/TemplateAssistant";
import styles from "./TreasuryConsole.module.css";

/* ---------------------------------------------------------------- data */

type CheckState = "clear" | "running" | "review" | "flagged";
type ApproverState = "approved" | "pending";
type StatusKey = "approval" | "screening" | "blocked" | "ready" | "limit";

type Wire = {
  id: string;
  ref: string;
  counterparty: string;
  currency: "USD" | "EUR" | "GBP";
  amount: string;
  usdValue: number;
  corridor: string;
  valueDate: string;
  /** The figures band's time-pressure cell: a short reading over a label. */
  slaValue: string;
  slaLabel: string;
  slaTone: "warning" | "neutral";
  statusKey: StatusKey;
  /** 0 Capture, 1 Screening, 2 Approvals, 3 Release. */
  stage: number;
  riskScore: number;
  beneficiary: { name: string; bank: string; bic: string; iban: string };
  originating: string;
  remittance: string;
  checks: { name: string; note: string; state: CheckState }[];
  approvers: { name: string; role: string; state: ApproverState; time?: string; you?: boolean }[];
  activity: { time: string; text: string }[];
};

const WIRES: Wire[] = [
  {
    id: "w2481", ref: "WR-2481", counterparty: "Nordwind Materials GmbH",
    currency: "USD", amount: "$1,842,500.00", usdValue: 1.8425,
    corridor: "USD → EUR", valueDate: "5 Sep 2026",
    slaValue: "2h 10m", slaLabel: "To cutoff", slaTone: "warning",
    statusKey: "approval", stage: 2, riskScore: 34,
    beneficiary: {
      name: "Nordwind Materials GmbH",
      bank: "Norddeutsche Handelsbank, Frankfurt",
      bic: "NORDDEFF",
      iban: "DE44 5001 0517 5407 3249 31",
    },
    originating: "Operating · USD · **** 4012",
    remittance: "INV 2026-0841, steel coil Q3",
    checks: [
      { name: "Sanctions screening", note: "No matches across 4 lists", state: "clear" },
      { name: "Duplicate detection", note: "No match in 90 days", state: "clear" },
      { name: "Beneficiary verification", note: "IBAN and name match", state: "clear" },
      { name: "Corridor limit", note: "$4.2M of $10M daily", state: "clear" },
    ],
    approvers: [
      { name: "Priya Raman", role: "Payments lead", state: "approved", time: "08:56" },
      { name: "Marcus Bell", role: "Compliance", state: "approved", time: "09:12" },
      { name: "Dana Whitfield", role: "Treasurer", state: "pending", you: true },
    ],
    activity: [
      { time: "09:12", text: "Compliance approved · Marcus Bell" },
      { time: "08:56", text: "Payments approved · Priya Raman" },
      { time: "08:31", text: "Screening cleared, 4 of 4 checks" },
      { time: "08:12", text: "Captured from ERP batch 26-0905" },
    ],
  },
  {
    id: "w2479", ref: "WR-2479", counterparty: "Corvus Energy Partners",
    currency: "USD", amount: "$2,750,000.00", usdValue: 2.75,
    corridor: "USD → USD", valueDate: "5 Sep 2026",
    slaValue: "4h 40m", slaLabel: "To cutoff", slaTone: "neutral",
    statusKey: "ready", stage: 3, riskScore: 21,
    beneficiary: {
      name: "Corvus Energy Partners LP",
      bank: "Harbor National Bank, Houston",
      bic: "HRBNUS44",
      iban: "US64 HRBN 0210 0032 8871 04",
    },
    originating: "Operating · USD · **** 4012",
    remittance: "Q3 capacity payment, unit CV-2",
    checks: [
      { name: "Sanctions screening", note: "No matches across 4 lists", state: "clear" },
      { name: "Duplicate detection", note: "No match in 90 days", state: "clear" },
      { name: "Beneficiary verification", note: "Account name match", state: "clear" },
      { name: "Corridor limit", note: "$4.2M of $10M daily", state: "clear" },
    ],
    approvers: [
      { name: "Priya Raman", role: "Payments lead", state: "approved", time: "07:48" },
      { name: "Marcus Bell", role: "Compliance", state: "approved", time: "08:02" },
      { name: "Dana Whitfield", role: "Treasurer", state: "approved", time: "08:15", you: true },
    ],
    activity: [
      { time: "08:15", text: "Treasury approved · Dana Whitfield" },
      { time: "08:02", text: "Compliance approved · Marcus Bell" },
      { time: "07:48", text: "Payments approved · Priya Raman" },
      { time: "07:20", text: "Captured from ERP batch 26-0905" },
    ],
  },
  {
    id: "w2482", ref: "WR-2482", counterparty: "Halcyon Freight Ltd",
    currency: "GBP", amount: "£412,090.00", usdValue: 0.52,
    corridor: "GBP domestic", valueDate: "8 Sep 2026",
    slaValue: "Mon 14:00", slaLabel: "Cutoff", slaTone: "neutral",
    statusKey: "screening", stage: 1, riskScore: 42,
    beneficiary: {
      name: "Halcyon Freight Ltd",
      bank: "Albion Clearing Bank, London",
      bic: "ALBNGB22",
      iban: "GB29 ALBN 6016 1331 9268 19",
    },
    originating: "Operating · GBP · **** 7233",
    remittance: "Freight settlement, August",
    checks: [
      { name: "Sanctions screening", note: "Running, 2 of 4 lists", state: "running" },
      { name: "Duplicate detection", note: "No match in 90 days", state: "clear" },
      { name: "Beneficiary verification", note: "Queued behind screening", state: "running" },
      { name: "Corridor limit", note: "£0.4M of £3M daily", state: "clear" },
    ],
    approvers: [
      { name: "Priya Raman", role: "Payments lead", state: "pending" },
      { name: "Marcus Bell", role: "Compliance", state: "pending" },
      { name: "Dana Whitfield", role: "Treasurer", state: "pending", you: true },
    ],
    activity: [
      { time: "09:26", text: "Screening started" },
      { time: "09:24", text: "Captured from portal entry" },
    ],
  },
  {
    id: "w2483", ref: "WR-2483", counterparty: "Aster Medical Supply",
    currency: "USD", amount: "$96,300.00", usdValue: 0.0963,
    corridor: "USD → USD", valueDate: "5 Sep 2026",
    slaValue: "On hold", slaLabel: "Compliance review", slaTone: "neutral",
    statusKey: "blocked", stage: 1, riskScore: 78,
    beneficiary: {
      name: "Aster Medical Supply Inc",
      bank: "Meadowbank Trust, Chicago",
      bic: "MDWBUS33",
      iban: "US11 MDWB 0710 0090 4415 62",
    },
    originating: "Operating · USD · **** 4012",
    remittance: "PO 88412, surgical kits",
    checks: [
      { name: "Sanctions screening", note: "Name similarity 82%, list SDN", state: "flagged" },
      { name: "Duplicate detection", note: "No match in 90 days", state: "clear" },
      { name: "Beneficiary verification", note: "Held pending screening", state: "review" },
      { name: "Corridor limit", note: "$4.2M of $10M daily", state: "clear" },
    ],
    approvers: [
      { name: "Priya Raman", role: "Payments lead", state: "pending" },
      { name: "Marcus Bell", role: "Compliance", state: "pending" },
      { name: "Dana Whitfield", role: "Treasurer", state: "pending", you: true },
    ],
    activity: [
      { time: "09:02", text: "Blocked: sanctions name similarity" },
      { time: "08:58", text: "Screening started" },
      { time: "08:55", text: "Captured from portal entry" },
    ],
  },
  {
    id: "w2484", ref: "WR-2484", counterparty: "Bluepine Logistics",
    currency: "EUR", amount: "€58,140.00", usdValue: 0.0634,
    corridor: "EUR → EUR", valueDate: "6 Sep 2026",
    slaValue: "6h 20m", slaLabel: "To cutoff", slaTone: "neutral",
    statusKey: "approval", stage: 2, riskScore: 18,
    beneficiary: {
      name: "Bluepine Logistics BV",
      bank: "Kanaal Bank, Rotterdam",
      bic: "KNLBNL2R",
      iban: "NL91 KNLB 0417 1643 00",
    },
    originating: "Operating · EUR · **** 5580",
    remittance: "Warehouse services, August",
    checks: [
      { name: "Sanctions screening", note: "No matches across 4 lists", state: "clear" },
      { name: "Duplicate detection", note: "No match in 90 days", state: "clear" },
      { name: "Beneficiary verification", note: "IBAN and name match", state: "clear" },
      { name: "Corridor limit", note: "€1.1M of €5M daily", state: "clear" },
    ],
    approvers: [
      { name: "Priya Raman", role: "Payments lead", state: "approved", time: "09:05" },
      { name: "Marcus Bell", role: "Compliance", state: "pending" },
      { name: "Dana Whitfield", role: "Treasurer", state: "pending", you: true },
    ],
    activity: [
      { time: "09:05", text: "Payments approved · Priya Raman" },
      { time: "08:49", text: "Screening cleared, 4 of 4 checks" },
      { time: "08:40", text: "Captured from ERP batch 26-0905" },
    ],
  },
  {
    id: "w2477", ref: "WR-2477", counterparty: "Sable Ridge Construction",
    currency: "USD", amount: "$4,020,000.00", usdValue: 4.02,
    corridor: "USD → CAD", valueDate: "5 Sep 2026",
    slaValue: "On hold", slaLabel: "Needs exception", slaTone: "warning",
    statusKey: "limit", stage: 1, riskScore: 47,
    beneficiary: {
      name: "Sable Ridge Construction Corp",
      bank: "Laurentide Bank, Toronto",
      bic: "LRTDCATT",
      iban: "CA55 LRTD 0032 9917 8804 21",
    },
    originating: "Operating · USD · **** 4012",
    remittance: "Milestone 4, Harbourline site",
    checks: [
      { name: "Sanctions screening", note: "No matches across 4 lists", state: "clear" },
      { name: "Duplicate detection", note: "No match in 90 days", state: "clear" },
      { name: "Beneficiary verification", note: "Account name match", state: "clear" },
      { name: "Corridor limit", note: "Would take USD to $8.2M of $10M", state: "review" },
    ],
    approvers: [
      { name: "Priya Raman", role: "Payments lead", state: "pending" },
      { name: "Marcus Bell", role: "Compliance", state: "pending" },
      { name: "Dana Whitfield", role: "Treasurer", state: "pending", you: true },
    ],
    activity: [
      { time: "08:22", text: "Held for limit exception" },
      { time: "08:18", text: "Screening cleared, 3 of 4 checks" },
      { time: "08:05", text: "Captured from ERP batch 26-0905" },
    ],
  },
];

const QUEUE_TOTAL = WIRES.reduce((sum, wire) => sum + wire.usdValue, 0);

const STATUS_BADGE: Record<
  StatusKey | "released",
  { label: string; variant: "info" | "positive" | "warning" | "error" | "neutral" }
> = {
  approval: { label: "Awaiting approval", variant: "info" },
  screening: { label: "In screening", variant: "neutral" },
  blocked: { label: "Blocked", variant: "error" },
  ready: { label: "Ready to release", variant: "positive" },
  limit: { label: "Limit review", variant: "warning" },
  released: { label: "Released", variant: "positive" },
};

const QUEUE_FILTERS: FilterBarFilter[] = [
  {
    id: "status",
    label: "Status",
    multiple: true,
    options: [
      { value: "approval", label: "Awaiting approval" },
      { value: "ready", label: "Ready to release" },
      { value: "screening", label: "In screening" },
      { value: "blocked", label: "Blocked" },
      { value: "limit", label: "Limit review" },
    ],
  },
  {
    id: "currency",
    label: "Currency",
    multiple: true,
    options: [
      { value: "USD", label: "USD" },
      { value: "EUR", label: "EUR" },
      { value: "GBP", label: "GBP" },
    ],
  },
];

/* The queue rows carry status as a dot and a word rather than six stacked
   badge pills: the case panel's badge states the selected wire's status at
   full strength, and the list stays quiet (the relay console's station-row
   convention). */
const STATUS_DOT: Record<StatusKey | "released", string> = {
  approval: "var(--color-status-info-border)",
  screening: "var(--color-status-neutral-border)",
  blocked: "var(--color-status-error-border)",
  ready: "var(--color-status-positive-border)",
  limit: "var(--color-status-warning-border)",
  released: "var(--color-status-positive-border)",
};

const CHECK_STATE: Record<
  CheckState,
  { icon: string; word: string; className: "checkClear" | "checkRunning" | "checkReview" | "checkFlagged" }
> = {
  clear: { icon: "check_circle", word: "Clear", className: "checkClear" },
  running: { icon: "progress_activity", word: "Running", className: "checkRunning" },
  review: { icon: "error", word: "Review", className: "checkReview" },
  flagged: { icon: "error", word: "Flagged", className: "checkFlagged" },
};

const CHAT_SUGGESTIONS = [
  { id: "queue", label: "Summarise the release queue" },
  { id: "blocked", label: "Why is Aster Medical blocked?" },
  { id: "release", label: "What clears before a wire releases?" },
];

const CHAT_REPLIES: Record<string, string> = {
  queue: "Six wires are queued for $9.3M. Nordwind ($1.84M) is one approval from release with 2h 10m to cutoff, Corvus ($2.75M) is ready to release, and Sable Ridge ($4.02M) needs a corridor-limit exception. Halcyon is still in screening and Aster Medical is blocked.",
  blocked: "Aster Medical hit an 82% name similarity against the SDN list during sanctions screening, so the wire blocked before approvals opened. Beneficiary verification is held behind the same flag. It needs a compliance review; nothing else on the wire is unusual.",
  release: "Four checks clear in screening: sanctions, duplicates, beneficiary verification, and the corridor limit. Then three approvals in order: payments, compliance, treasury. Release itself asks for a one-time code from your hardware token, and the UETR lands in the activity feed.",
};

const CHAT_FALLBACK =
  "This assistant is a mock, so only the suggested questions have real answers. In the live product this reply would come from the desk's payment data.";

/** The SWIFT message for a wire, assembled from the same fields the panels
    show so the two can never disagree. */
function paymentMessage(wire: Wire): string {
  const amount = wire.amount.replace(/[^0-9.]/g, "").replace(".", ",");
  return [
    "{1:F01CLHVUS33AXXX0000000000}",
    `{2:I103${wire.beneficiary.bic}XXXXN}`,
    `:20:${wire.ref}`,
    ":23B:CRED",
    `:32A:260905${wire.currency}${amount}`,
    ":50K:/8663104012",
    "CLEARHAVEN TREASURY LLC",
    "270 GREENWICH ST, NEW YORK NY",
    `:57A:${wire.beneficiary.bic}`,
    `:59:/${wire.beneficiary.iban.replace(/\s/g, "")}`,
    wire.beneficiary.name.toUpperCase(),
    `:70:${wire.remittance.toUpperCase()}`,
    ":71A:OUR",
  ].join("\n");
}

/* ---------------------------------------------------------------- page */

function TreasuryConsoleInner() {
  const [selectedId, setSelectedId] = React.useState("w2481");
  const [filters, setFilters] = React.useState<Record<string, string[]>>({});
  const [approvedByYou, setApprovedByYou] = React.useState<Set<string>>(new Set());
  const [released, setReleased] = React.useState<Set<string>>(new Set());
  const [releaseFor, setReleaseFor] = React.useState<Wire | null>(null);
  const [pin, setPin] = React.useState("");
  const [chatOpen, setChatOpen] = React.useState(false);
  const { toast } = useToast();

  const wire = WIRES.find((w) => w.id === selectedId) ?? WIRES[0];

  /* The scripted arc: your approval completes the chain, release completes
     the wire. Both are derived per wire so the queue, stepper, approvers and
     actions all move from the same two sets. */
  const isApproved = approvedByYou.has(wire.id);
  const isReleased = released.has(wire.id);

  const statusOf = (w: Wire): StatusKey | "released" => {
    if (released.has(w.id)) return "released";
    if (w.statusKey === "approval" && approvedByYou.has(w.id)) return "ready";
    return w.statusKey;
  };

  const approvers = wire.approvers.map((a) =>
    a.you && isApproved && a.state === "pending"
      ? { ...a, state: "approved" as const, time: "09:41" }
      : a
  );
  const approvedCount = approvers.filter((a) => a.state === "approved").length;

  const status = statusOf(wire);
  const stage = isReleased ? 4 : status === "ready" ? 3 : wire.stage;

  const activity = [
    ...(isReleased
      ? [
          { time: "09:43", text: "Released · UETR 97ed4c1a logged" },
          { time: "09:43", text: "Release code verified" },
        ]
      : []),
    ...(isApproved && wire.statusKey === "approval"
      ? [{ time: "09:41", text: "Treasury approved · Dana Whitfield" }]
      : []),
    ...wire.activity,
  ];

  const visibleWires = WIRES.filter((w) => {
    const statusFilter = filters.status ?? [];
    const currencyFilter = filters.currency ?? [];
    const key = statusOf(w);
    const statusOk =
      statusFilter.length === 0 ||
      statusFilter.includes(key === "released" ? "ready" : key);
    const currencyOk =
      currencyFilter.length === 0 || currencyFilter.includes(w.currency);
    return statusOk && currencyOk;
  });

  const approve = () => {
    setApprovedByYou((current) => new Set(current).add(wire.id));
  };

  const confirmRelease = () => {
    if (!releaseFor || pin.length < 6) return;
    setReleased((current) => new Set(current).add(releaseFor.id));
    setReleaseFor(null);
    setPin("");
    toast({
      variant: "positive",
      title: "Wire released",
      description: `${releaseFor.ref} sent to ${releaseFor.counterparty}. The UETR is in the activity feed.`,
    });
  };

  const screeningSummary = (() => {
    const flagged = wire.checks.filter((c) => c.state === "flagged" || c.state === "review").length;
    const running = wire.checks.filter((c) => c.state === "running").length;
    if (flagged > 0) return `${flagged} needs review`;
    if (running > 0) return `${running} running`;
    return `${wire.checks.length} checks clear`;
  })();

  const steps = [
    { label: "Capture", description: wire.activity[wire.activity.length - 1].time },
    { label: "Screening", description: screeningSummary },
    { label: "Approvals", description: `${approvedCount} of ${approvers.length}` },
    {
      label: "Release",
      description: isReleased ? "09:43 UTC" : "Code required",
    },
  ];

  /* The case panel's action cluster follows the wire's state; no dead
     controls. */
  const actions = (() => {
    if (isReleased) {
      return (
        <>
          <span className={styles.releasedNote}>UETR 97ed4c1a</span>
          <Button variant="secondary" size="compact" label="View receipt" />
        </>
      );
    }
    switch (status) {
      case "approval":
        return (
          <SplitButton
              size="compact"
              label="Approve"
              onClick={approve}
              menuLabel="More approval actions"
              align="end"
              items={[
                { type: "item", label: "Approve and open next", onClick: approve },
                { type: "item", label: "Request changes" },
                { type: "separator" },
                { type: "item", label: "Return to originator", destructive: true },
              ]}
            />
        );
      case "ready":
        return (
          <Button
            variant="primary"
            size="compact"
            label="Release payment"
            iconLeft="lock_open"
            onClick={() => setReleaseFor(wire)}
          />
        );
      case "screening":
        return (
          <Button variant="secondary" size="compact" label="View screening" />
        );
      case "blocked":
        return (
          <Button variant="secondary" size="compact" label="Escalate to compliance" />
        );
      case "limit":
        return (
          <Button variant="secondary" size="compact" label="Request limit exception" />
        );
    }
  })();

  return (
    <div className={styles.shell} data-bg-hidden="">
      <header className={styles.topBar}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <span className="material-symbols-rounded">account_balance</span>
          </span>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Clearhaven</span>
            <span className={styles.brandRole}>Treasury operations</span>
          </div>
        </div>
        <SegmentedControl
          segments={[
            { value: "payments", label: "Payments" },
            { value: "approvals", label: "Approvals" },
            { value: "accounts", label: "Accounts" },
            { value: "reports", label: "Reports" },
          ]}
          activeSegment="payments"
          size="compact"
          ariaLabel="Console sections"
          className={styles.topNav}
        />
        <div className={styles.topBarActions}>
          <AiButton label="Ask AI" size="compact" onClick={() => setChatOpen(true)} />
          <ThemeToggle />
          <Avatar name="Dana Whitfield" size="sm" />
        </div>
      </header>
      <Divider spacing="none" />

      <div className={`${styles.workspace} ${chatOpen ? styles.workspaceChatOpen : ""}`}>
        {/* ---------------------------------------------------- the queue */}
        <section className={styles.queuePanel} aria-label="Release queue">
          <header className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Release queue</h2>
            <span className={styles.panelCount}>
              {WIRES.length} wires · ${QUEUE_TOTAL.toFixed(1)}M
            </span>
          </header>
          <FilterBar
            filters={QUEUE_FILTERS}
            values={filters}
            onValuesChange={setFilters}
            size="compact"
          />
          <ul className={styles.queueList}>
            {visibleWires.map((w) => {
              const key = statusOf(w);
              const badge = STATUS_BADGE[key];
              return (
                <li key={w.id}>
                  <button
                    type="button"
                    className={`${styles.queueRow} ${
                      w.id === selectedId ? styles.queueRowSelected : ""
                    }`}
                    aria-pressed={w.id === selectedId}
                    onClick={() => setSelectedId(w.id)}
                  >
                    <span className={styles.queueTop}>
                      <span className={styles.queueName}>{w.counterparty}</span>
                      <span className={styles.queueAmount}>{w.amount}</span>
                    </span>
                    <span className={styles.queueBottom}>
                      <span className={styles.queueStatus}>
                        <span
                          className={styles.queueDot}
                          style={{ backgroundColor: STATUS_DOT[key] }}
                          aria-hidden="true"
                        />
                        {badge.label}
                      </span>
                      <span className={styles.queueMeta}>{w.ref}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {visibleWires.length === 0 && (
            <p className={styles.queueEmpty}>
              No wires match these filters. Clear one to widen the queue.
            </p>
          )}
        </section>

        {/* ----------------------------------------------------- the case */}
        <section className={styles.caseColumn} aria-label={`Wire ${wire.ref}`}>
          {/* One case panel carries everything about the wire itself:
              identity and actions, the figures band, and the pipeline. */}
          <div className={styles.casePanel}>
            <div className={styles.caseTop}>
              <div className={styles.caseIdentity}>
                <span className={styles.caseMark} aria-hidden="true">
                  <span className="material-symbols-rounded">domain</span>
                </span>
                <div className={styles.caseTitleBlock}>
                  <div className={styles.caseTitleRow}>
                    <h1 className={styles.caseTitle}>{wire.counterparty}</h1>
                    <Badge
                      variant={STATUS_BADGE[status].variant}
                      label={STATUS_BADGE[status].label}
                    />
                  </div>
                  <p className={styles.caseMeta}>
                    {wire.ref} · {wire.remittance}
                  </p>
                </div>
              </div>
              <div className={styles.caseActions}>
                {actions}
                <CircularButton
                  icon="more_vert"
                  variant="tertiary"
                  size="compact"
                  ariaLabel={`More actions for ${wire.ref}`}
                />
              </div>
            </div>

            {/* Stat's anatomy, restated as a page pattern (the icon-tile
                precedent) so the time-pressure cell can carry a status ink
                Stat deliberately does not offer. */}
            <dl className={styles.figuresBand}>
              <div className={styles.figure}>
                <dd className={styles.figureValue}>{wire.amount}</dd>
                <dt className={styles.figureLabel}>Amount · {wire.currency}</dt>
              </div>
              <div className={styles.figure}>
                <dd className={styles.figureValue}>{wire.valueDate}</dd>
                <dt className={styles.figureLabel}>Value date</dt>
              </div>
              <div className={styles.figure}>
                <dd className={styles.figureValue}>{wire.corridor}</dd>
                <dt className={styles.figureLabel}>Corridor</dt>
              </div>
              <div className={styles.figure}>
                <dd
                  className={`${styles.figureValue} ${
                    !isReleased && wire.slaTone === "warning"
                      ? styles.figureWarning
                      : ""
                  }`}
                >
                  {isReleased ? "09:43 UTC" : wire.slaValue}
                </dd>
                <dt className={styles.figureLabel}>
                  {isReleased ? "Released" : wire.slaLabel}
                </dt>
              </div>
            </dl>

            <Stepper steps={steps} activeStep={stage} />
          </div>

          <div className={styles.caseBody}>
            <div className={styles.caseMain}>
              <section className={styles.panel} aria-label="Transfer details">
                <h2 className={styles.panelTitle}>Transfer details</h2>
                <dl className={styles.detailGrid}>
                  <div className={styles.detailField}>
                    <dt>Beneficiary</dt>
                    <dd>{wire.beneficiary.name}</dd>
                  </div>
                  <div className={styles.detailField}>
                    <dt>Beneficiary bank</dt>
                    <dd>
                      {wire.beneficiary.bank} · {wire.beneficiary.bic}
                    </dd>
                  </div>
                  <div className={styles.detailField}>
                    <dt>IBAN</dt>
                    <dd className={styles.detailMono}>{wire.beneficiary.iban}</dd>
                  </div>
                  <div className={styles.detailField}>
                    <dt>Originating account</dt>
                    <dd className={styles.detailMono}>{wire.originating}</dd>
                  </div>
                </dl>
                <CodeBlock
                  code={paymentMessage(wire)}
                  filename={`${wire.ref.toLowerCase()}.mt103`}
                  language="mt103"
                  collapsible
                  defaultCollapsed
                  maxHeight={220}
                />
              </section>

              <section className={styles.panel} aria-label="Compliance screening">
                <div className={styles.screeningLayout}>
                  <div className={styles.screeningChecks}>
                    <h2 className={styles.panelTitle}>Compliance screening</h2>
                    <ul className={styles.checkList}>
                      {wire.checks.map((check) => {
                        const state = CHECK_STATE[check.state];
                        return (
                          <li key={check.name} className={styles.checkRow}>
                            <span className={styles.checkText}>
                              <span className={styles.checkName}>{check.name}</span>
                              <span className={styles.checkNote}>{check.note}</span>
                            </span>
                            <span
                              className={`${styles.checkState} ${styles[state.className]}`}
                            >
                              {check.state === "running" ? (
                                <Spinner size="sm" variant="inherit" label="Check running" />
                              ) : (
                                <span
                                  className="material-symbols-rounded"
                                  aria-hidden="true"
                                >
                                  {state.icon}
                                </span>
                              )}
                              {state.word}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className={styles.riskBlock}>
                    <Gauge
                      bare
                      value={wire.riskScore}
                      max={100}
                      label="Risk score"
                      formatValue={(v) => `${v}`}
                      thresholds={[
                        { value: 0, tone: "accent" },
                        { value: 50, tone: "warning" },
                        { value: 75, tone: "error" },
                      ]}
                      size={112}
                      strokeWidth={9}
                    />
                  </div>
                </div>
              </section>
            </div>

            <div className={styles.caseRail}>
              <section className={styles.panel} aria-label="Approvals">
                <div className={styles.panelHeader}>
                  <h2 className={styles.panelTitle}>Approvals</h2>
                  <span className={styles.panelCount}>
                    {approvedCount} of {approvers.length}
                  </span>
                </div>
                <ul className={styles.approverList}>
                  {approvers.map((approver) => (
                    <li key={approver.name} className={styles.approverRow}>
                      <Avatar name={approver.name} size="sm" />
                      <span className={styles.approverText}>
                        <span className={styles.approverName}>
                          {approver.name}
                          {approver.you ? " (you)" : ""}
                        </span>
                        <span className={styles.approverRole}>{approver.role}</span>
                      </span>
                      {approver.state === "approved" ? (
                        <span className={styles.approverDone}>
                          <span
                            className="material-symbols-rounded"
                            aria-hidden="true"
                          >
                            check_circle
                          </span>
                          {approver.time}
                        </span>
                      ) : approver.you && status === "approval" ? (
                        <Badge variant="info" label="Your turn" />
                      ) : (
                        <span className={styles.approverWaiting}>Waiting</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.panel} aria-label="Activity">
                <h2 className={styles.panelTitle}>Activity</h2>
                <ul className={styles.activityList}>
                  {activity.map((entry, index) => (
                    <li key={`${entry.time}-${index}`} className={styles.activityRow}>
                      <span className={styles.activityTime}>{entry.time}</span>
                      <span className={styles.activityText}>{entry.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </section>
      </div>

      <Dialog
        open={releaseFor !== null}
        onOpenChange={(open) => {
          if (!open) {
            setReleaseFor(null);
            setPin("");
          }
        }}
        title="Release payment"
        description={
          releaseFor
            ? `${releaseFor.ref} · ${releaseFor.amount} to ${releaseFor.counterparty}`
            : undefined
        }
        size="sm"
        footer={
          <>
            <Button
              variant="tertiary"
              label="Cancel"
              onClick={() => {
                setReleaseFor(null);
                setPin("");
              }}
            />
            <Button
              variant="primary"
              label="Release wire"
              disabled={pin.length < 6}
              onClick={confirmRelease}
            />
          </>
        }
      >
        <div className={styles.releaseBody}>
          <PinInput
            label="Release code"
            helperText="Enter the six digits from your hardware token."
            length={6}
            value={pin}
            onValueChange={setPin}
          />
          <p className={styles.releaseNote}>
            Releasing sends the wire to the clearing network immediately. This
            cannot be undone from the console.
          </p>
        </div>
      </Dialog>

      <TemplateAssistant
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        title="Clearhaven AI"
        askLine="Ask about wires, screening, approvals, or limits"
        suggestions={CHAT_SUGGESTIONS}
        replies={CHAT_REPLIES}
        fallback={CHAT_FALLBACK}
        disclaimer="A mock assistant with canned answers over this desk's wires."
      />
    </div>
  );
}

export default function TreasuryConsole() {
  return (
    <ToastProvider>
      <TreasuryConsoleInner />
    </ToastProvider>
  );
}
