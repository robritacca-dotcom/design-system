"use client";

/**
 * The relay console template: a network operations screen for Meridian, a
 * fictional relay network, built from the design system alone. The layout is
 * the centre-stage instrument: the Globe fills the middle of the screen, the
 * station list on the left and the region presets floating on the stage
 * drive its controlled rotation, and the detail rail on the right reads from
 * whatever is selected. The network's headline numbers live in the top bar,
 * so the stage carries nothing but the instrument itself. Every colour,
 * radius, space, and type style is a semantic token; every control is a
 * library component.
 *
 * All data is fictional, so the route is excluded from the chat corpus (see
 * EXCLUDED_ROUTES in generate-site-corpus.mjs). The assistant is the shared
 * TemplateAssistant mock, answering over this page's own numbers.
 */

import React from "react";
import { AiButton } from "@robr0/design-system/components/AiButton/AiButton";
import { Avatar } from "@robr0/design-system/components/Avatar/Avatar";
import { Badge } from "@robr0/design-system/components/Badge/Badge";
import { Button } from "@robr0/design-system/components/Button/Button";
import { Divider } from "@robr0/design-system/components/Divider/Divider";
import { Gauge } from "@robr0/design-system/components/Gauge/Gauge";
import {
  Globe,
  type GlobeArc,
  type GlobePoint,
  type GlobeRotation,
} from "@robr0/design-system/components/Globe/Globe";
import { MapCallout } from "@robr0/design-system/components/MapCallout/MapCallout";
import { MapLegend } from "@robr0/design-system/components/MapLegend/MapLegend";
import { Meter } from "@robr0/design-system/components/Meter/Meter";
import { SegmentedControl } from "@robr0/design-system/components/SegmentedControl/SegmentedControl";
import { Sparkline } from "@robr0/design-system/components/Sparkline/Sparkline";
import { Stat } from "@robr0/design-system/components/Stat/Stat";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import TemplateAssistant from "../TemplateAssistant/TemplateAssistant";
import styles from "./RelayConsole.module.css";

/* ---------------------------------------------------------------- data */

type StationStatus = "operational" | "degraded" | "maintenance";
type Region = "americas" | "europe" | "asia-pacific";

type Station = {
  id: string;
  name: string;
  code: string;
  region: Region;
  lat: number;
  lng: number;
  status: StationStatus;
  latencyMs: number;
  latencyDelta: string;
  throughput: number;
  throughputDelta: string;
  throughputTrend: "up" | "down";
  capacityPct: number;
  trend: number[];
  events: { time: string; text: string; tone: "positive" | "warning" | "neutral" }[];
};

const STATIONS: Station[] = [
  {
    id: "yyz", name: "Toronto", code: "YYZ-1", region: "americas",
    lat: 43.65, lng: -79.38, status: "operational",
    latencyMs: 71, latencyDelta: "-2 ms", throughput: 6.8,
    throughputDelta: "+0.4 Gb/s", throughputTrend: "up", capacityPct: 62,
    trend: [5.1, 5.4, 5.2, 5.8, 6.1, 5.9, 6.3, 6.0, 6.4, 6.6, 6.5, 6.8],
    events: [
      { time: "08:20", text: "Absorbed rerouted GRU traffic", tone: "neutral" },
      { time: "05:12", text: "Nightly failover drill passed", tone: "positive" },
    ],
  },
  {
    id: "sea", name: "Seattle", code: "SEA-2", region: "americas",
    lat: 47.61, lng: -122.33, status: "operational",
    latencyMs: 64, latencyDelta: "-1 ms", throughput: 5.9,
    throughputDelta: "+0.2 Gb/s", throughputTrend: "up", capacityPct: 48,
    trend: [4.8, 5.0, 4.9, 5.2, 5.1, 5.4, 5.3, 5.6, 5.5, 5.7, 5.8, 5.9],
    events: [
      { time: "07:44", text: "Firmware 4.2.1 rolled out", tone: "positive" },
      { time: "03:05", text: "Pacific link handed to K-9", tone: "neutral" },
    ],
  },
  {
    id: "gru", name: "São Paulo", code: "GRU-1", region: "americas",
    lat: -23.55, lng: -46.63, status: "maintenance",
    latencyMs: 118, latencyDelta: "0 ms", throughput: 0.9,
    throughputDelta: "-4.1 Gb/s", throughputTrend: "down", capacityPct: 12,
    trend: [5.0, 5.2, 5.1, 4.9, 5.0, 4.8, 4.6, 3.9, 2.8, 1.9, 1.2, 0.9],
    events: [
      { time: "06:00", text: "Drained for antenna replacement", tone: "neutral" },
      { time: "05:58", text: "Traffic rerouted to YYZ-1", tone: "neutral" },
    ],
  },
  {
    id: "kef", name: "Reykjavík", code: "KEF-1", region: "europe",
    lat: 64.15, lng: -21.94, status: "operational",
    latencyMs: 59, latencyDelta: "-3 ms", throughput: 7.4,
    throughputDelta: "+0.6 Gb/s", throughputTrend: "up", capacityPct: 57,
    trend: [6.0, 6.2, 6.1, 6.5, 6.4, 6.8, 6.7, 7.0, 6.9, 7.2, 7.1, 7.4],
    events: [
      { time: "09:02", text: "Atlantic hop renegotiated via K-7", tone: "neutral" },
      { time: "01:31", text: "Ice-load sensors nominal", tone: "positive" },
    ],
  },
  {
    id: "fra", name: "Frankfurt", code: "FRA-3", region: "europe",
    lat: 50.11, lng: 8.68, status: "operational",
    latencyMs: 61, latencyDelta: "+1 ms", throughput: 8.2,
    throughputDelta: "+0.3 Gb/s", throughputTrend: "up", capacityPct: 66,
    trend: [7.0, 7.2, 7.1, 7.5, 7.4, 7.7, 7.6, 7.9, 7.8, 8.0, 8.1, 8.2],
    events: [
      { time: "08:51", text: "Peak-hour scaling engaged", tone: "neutral" },
      { time: "02:14", text: "Indian Ocean link armed via K-4", tone: "neutral" },
    ],
  },
  {
    id: "sin", name: "Singapore", code: "SIN-1", region: "asia-pacific",
    lat: 1.35, lng: 103.82, status: "degraded",
    latencyMs: 143, latencyDelta: "+38 ms", throughput: 9.6,
    throughputDelta: "+1.2 Gb/s", throughputTrend: "up", capacityPct: 91,
    trend: [6.9, 7.2, 7.4, 7.8, 8.1, 8.4, 8.6, 8.9, 9.1, 9.3, 9.5, 9.6],
    events: [
      { time: "09:12", text: "Queue depth above threshold", tone: "warning" },
      { time: "08:47", text: "18% of traffic rerouted to SYD-1", tone: "neutral" },
      { time: "06:30", text: "Capacity alert armed at 90%", tone: "neutral" },
    ],
  },
  {
    id: "syd", name: "Sydney", code: "SYD-1", region: "asia-pacific",
    lat: -33.87, lng: 151.21, status: "operational",
    latencyMs: 88, latencyDelta: "+4 ms", throughput: 4.4,
    throughputDelta: "+0.9 Gb/s", throughputTrend: "up", capacityPct: 54,
    trend: [3.0, 3.1, 3.0, 3.3, 3.2, 3.5, 3.4, 3.7, 3.9, 4.0, 4.2, 4.4],
    events: [
      { time: "08:47", text: "Accepting rerouted SIN traffic", tone: "neutral" },
      { time: "00:40", text: "Quiet-hours power profile on", tone: "positive" },
    ],
  },
];

type Relay = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  route: string;
  loadPct: number;
  handoff: string;
};

const RELAYS: Relay[] = [
  { id: "k7", name: "Relay K-7", lat: 45, lng: -35, route: "YYZ-1 to KEF-1", loadPct: 58, handoff: "Handoff to KEF-1 in 22 min" },
  { id: "k9", name: "Relay K-9", lat: 38, lng: -165, route: "SEA-2 to SYD-1", loadPct: 41, handoff: "Handoff to SYD-1 in 54 min" },
  { id: "k4", name: "Relay K-4", lat: -8, lng: 78, route: "FRA-3 to SIN-1", loadPct: 83, handoff: "Handoff to SIN-1 in 9 min" },
];

const POINTS: GlobePoint[] = [
  ...STATIONS.map((s) => ({
    id: s.id,
    lat: s.lat,
    lng: s.lng,
    label: s.code,
    kind: "anchor" as const,
  })),
  ...RELAYS.map((r) => ({
    id: r.id,
    lat: r.lat,
    lng: r.lng,
    label: r.name.replace("Relay ", ""),
    kind: "point" as const,
  })),
];

/* The two links feeding the degraded station carry the warning colour; the
   backbone keeps the default gradient. GRU-1 has no links while drained,
   which is the point: the missing lines are the maintenance story. */
const DEGRADED_LINK = "var(--color-status-warning-border)";
const ARCS: GlobeArc[] = [
  { from: "yyz", to: "k7", altitude: 0.18 },
  { from: "k7", to: "kef", altitude: 0.18 },
  { from: "kef", to: "fra", altitude: 0.1 },
  { from: "sea", to: "yyz", altitude: 0.12 },
  { from: "sea", to: "k9", altitude: 0.22 },
  { from: "k9", to: "syd", altitude: 0.22 },
  { from: "fra", to: "k4", altitude: 0.2 },
  { from: "k4", to: "sin", altitude: 0.14, color: DEGRADED_LINK },
  { from: "sin", to: "syd", altitude: 0.16, color: DEGRADED_LINK },
];

const STATUS_BADGE: Record<StationStatus, { label: string; variant: "positive" | "warning" | "neutral" }> = {
  operational: { label: "Operational", variant: "positive" },
  degraded: { label: "Degraded", variant: "warning" },
  maintenance: { label: "Maintenance", variant: "neutral" },
};

const REGIONS: { value: Region; label: string; rotation: GlobeRotation }[] = [
  { value: "americas", label: "Americas", rotation: [-85, 25] },
  { value: "europe", label: "Europe", rotation: [-6, 52] },
  { value: "asia-pacific", label: "Asia-Pacific", rotation: [127, -14] },
];

/* The console's headline numbers, derived from the station table so the
   figures and the rows can never disagree. */
const MEDIAN_LATENCY = (() => {
  const sorted = STATIONS.map((s) => s.latencyMs).sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
})();
const TOTAL_THROUGHPUT = STATIONS.reduce((sum, s) => sum + s.throughput, 0);
const ONLINE_COUNT = STATIONS.filter((s) => s.status !== "maintenance").length;

const NETWORK_METRICS = [
  { label: "Stations online", value: `${ONLINE_COUNT} of ${STATIONS.length}` },
  { label: "Active links", value: `${ARCS.length}` },
  { label: "Median latency", value: `${MEDIAN_LATENCY} ms` },
  { label: "Throughput", value: `${TOTAL_THROUGHPUT.toFixed(1)} Gb/s` },
];

const CHAT_SUGGESTIONS = [
  { id: "sin", label: "Why is Singapore degraded?" },
  { id: "health", label: "Summarise network health" },
  { id: "relay", label: "What does a relay do?" },
];

const CHAT_REPLIES: Record<string, string> = {
  sin: "SIN-1 is running at 91% capacity, and its latency is up 38 ms since the 09:12 queue-depth alert. The console has already rerouted 18% of its traffic to SYD-1; if the queue keeps growing, the next step is draining the K-4 link.",
  health: "Six of seven stations are online: five operational, SIN-1 degraded at 91% capacity, and GRU-1 drained for antenna replacement. The nine active links carry 43.2 Gb/s at a median latency of 71 ms, and thirty-day uptime holds at 99.982%.",
  relay: "A relay is the moving half of the network: K-7, K-9 and K-4 carry traffic between ground stations across ocean segments no cable serves. Each one shows on the globe as a cross, with its current route and the next handoff in its callout.",
};

const CHAT_FALLBACK =
  "This assistant is a mock, so only the suggested questions have real answers. In the live product this reply would come from the network telemetry behind the globe.";

/* ------------------------------------------------------------- helpers */

const EVENT_TONE: Record<"positive" | "warning" | "neutral", string> = {
  positive: "var(--color-status-positive-border)",
  warning: "var(--color-status-warning-border)",
  neutral: "var(--color-status-neutral-border)",
};

const STATUS_DOT: Record<StationStatus, string> = {
  operational: "var(--color-status-positive-border)",
  degraded: "var(--color-status-warning-border)",
  maintenance: "var(--color-status-neutral-border)",
};

/** Formats a coordinate pair the way MapCallout's readout expects. */
function coordinates(lat: number, lng: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}° ${ns} · ${Math.abs(lng).toFixed(2)}° ${ew}`;
}

/* ---------------------------------------------------------------- page */

export default function RelayConsole() {
  /* The globe opens on the degraded station: the screen's story starts
     where the operator's morning does. */
  const [selectedId, setSelectedId] = React.useState<string>("sin");
  const [hoverId, setHoverId] = React.useState<string | null>(null);
  const [region, setRegion] = React.useState<Region>("asia-pacific");
  const [rotation, setRotation] = React.useState<GlobeRotation>([110, -8]);
  const [animating, setAnimating] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);

  const rotationRef = React.useRef<GlobeRotation>(rotation);
  const frameRef = React.useRef<number | null>(null);

  const cancelGlide = React.useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setAnimating(false);
  }, []);

  /* Glides the controlled rotation to a target over ~900ms, taking the
     short way around the globe. The token guard cannot see a JS frame loop,
     so reduced motion is checked here and jumps straight to the target
     (ShaderField's recipe). */
  const glideTo = React.useCallback(
    (target: GlobeRotation) => {
      cancelGlide();
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const [fromLng, fromLat] = rotationRef.current;
      let deltaLng = target[0] - fromLng;
      if (deltaLng > 180) deltaLng -= 360;
      if (deltaLng < -180) deltaLng += 360;
      const deltaLat = target[1] - fromLat;
      if (reduced || (Math.abs(deltaLng) < 0.5 && Math.abs(deltaLat) < 0.5)) {
        rotationRef.current = target;
        setRotation(target);
        return;
      }
      const start = performance.now();
      const duration = 900;
      setAnimating(true);
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const next: GlobeRotation = [
          fromLng + deltaLng * eased,
          fromLat + deltaLat * eased,
        ];
        rotationRef.current = next;
        setRotation(next);
        if (t < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          frameRef.current = null;
          setAnimating(false);
        }
      };
      frameRef.current = requestAnimationFrame(step);
    },
    [cancelGlide]
  );

  React.useEffect(() => cancelGlide, [cancelGlide]);

  /* A drag or key press mid-glide hands the wheel back to the operator. */
  const handleRotationChange = (next: GlobeRotation) => {
    if (frameRef.current !== null) cancelGlide();
    rotationRef.current = next;
    setRotation(next);
  };

  const selectStation = (station: Station) => {
    setSelectedId(station.id);
    setRegion(station.region);
    glideTo([station.lng, station.lat]);
  };

  const selectRegion = (value: string) => {
    const preset = REGIONS.find((r) => r.value === value);
    if (!preset) return;
    setRegion(preset.value);
    const selected = STATIONS.find((s) => s.id === selectedId);
    if (selected && selected.region !== preset.value) setSelectedId("");
    glideTo(preset.rotation);
  };

  const handlePointClick = (point: GlobePoint) => {
    const station = STATIONS.find((s) => s.id === point.id);
    if (station) {
      selectStation(station);
      return;
    }
    setSelectedId(point.id);
    glideTo([point.lng, point.lat]);
  };

  const selectedStation = STATIONS.find((s) => s.id === selectedId);
  const selectedRelay = RELAYS.find((r) => r.id === selectedId);
  const activePointId = hoverId ?? (selectedId || undefined);

  const renderCallout = (point: GlobePoint) => {
    const station = STATIONS.find((s) => s.id === point.id);
    if (station) {
      return (
        <MapCallout
          title={station.code}
          lines={[
            STATUS_BADGE[station.status].label,
            `${station.latencyMs} ms · ${station.throughput.toFixed(1)} Gb/s`,
            coordinates(station.lat, station.lng),
          ]}
        />
      );
    }
    const relay = RELAYS.find((r) => r.id === point.id);
    if (!relay) return null;
    return (
      <MapCallout
        title={relay.name}
        lines={[
          "In transit",
          `${relay.route} · ${relay.loadPct}% load`,
          coordinates(relay.lat, relay.lng),
        ]}
      />
    );
  };

  return (
    // data-bg-hidden: the console sits on the flat page colour, the same
    // switch the marketing dashboard uses.
    <div
      className={`${styles.shell} ${chatOpen ? styles.shellChatOpen : ""}`}
      data-bg-hidden=""
    >
      <header className={styles.topBar}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <span className="material-symbols-rounded">hub</span>
          </span>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Meridian</span>
            <span className={styles.brandRole}>Network operations</span>
          </div>
        </div>

        {/* The network's headline numbers live here, not on the stage: the
            globe keeps the whole middle of the screen to itself. */}
        <div className={styles.metricsStrip} aria-label="Network summary">
          <span className={styles.liveDot} aria-hidden="true" />
          {NETWORK_METRICS.map((metric) => (
            <div key={metric.label} className={styles.metric}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.topBarActions}>
          <AiButton
            label="Ask AI"
            size="compact"
            onClick={() => setChatOpen(true)}
          />
          <ThemeToggle />
          <Avatar name="Noor Haddad" size="sm" />
        </div>
      </header>
      <Divider spacing="none" />

      <div className={`${styles.workspace} ${chatOpen ? styles.workspaceChatOpen : ""}`}>
        {/* -------------------------------------------------- station list */}
        <section className={styles.stationsPanel} aria-label="Stations">
          <header className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Stations</h2>
            <span className={styles.panelCount}>{STATIONS.length}</span>
          </header>
          <ul className={styles.stationList}>
            {STATIONS.map((station) => (
              <li key={station.id}>
                <button
                  type="button"
                  className={`${styles.stationRow} ${
                    selectedId === station.id ? styles.stationRowSelected : ""
                  }`}
                  aria-pressed={selectedId === station.id}
                  onClick={() => selectStation(station)}
                >
                  <span
                    className={styles.statusDot}
                    style={{ backgroundColor: STATUS_DOT[station.status] }}
                    aria-hidden="true"
                  />
                  <span className={styles.stationText}>
                    <span className={styles.stationName}>{station.name}</span>
                    <span className={styles.stationMeta}>{station.code}</span>
                  </span>
                  <span className={styles.stationReading}>
                    {station.latencyMs} ms
                  </span>
                  <span className={styles.srOnly}>
                    , {STATUS_BADGE[station.status].label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------- globe stage */}
        <section className={styles.stage} aria-label="Network view">
          <div className={styles.globeBox}>
            <Globe
              points={POINTS}
              arcs={ARCS}
              rotation={rotation}
              onRotationChange={handleRotationChange}
              autoRotate={animating || hoverId || selectedId ? 0 : 0.5}
              interactive
              showLabels
              activePointId={activePointId}
              onPointHover={(point) => setHoverId(point ? point.id : null)}
              onPointClick={handlePointClick}
              renderCallout={renderCallout}
              label="Meridian relay network: stations, relays, and links"
              className={styles.globe}
            />
          </div>
          <div className={styles.legendCorner}>
            <MapLegend
              title="Meridian relay network"
              description="Live topology · refreshed every 30 s"
              items={[
                { glyph: "anchor", label: "Ground station" },
                { glyph: "point", label: "Relay in transit" },
                { glyph: "arc", label: "Backbone link" },
                { glyph: "line", color: DEGRADED_LINK, label: "Degraded link" },
              ]}
            />
          </div>
          {/* The one control on the stage, floating the way map controls
              do: pick a region, the globe glides there. */}
          <div className={styles.regionControl}>
            <SegmentedControl
              segments={REGIONS.map((r) => ({ value: r.value, label: r.label }))}
              activeSegment={region}
              onSegmentChange={selectRegion}
              size="compact"
              ariaLabel="Rotate to region"
            />
          </div>
        </section>

        {/* -------------------------------------------------- detail rail */}
        <section className={styles.detailPanel} aria-label="Selection detail">
          {selectedStation ? (
            <>
              <header className={styles.detailHeader}>
                <div className={styles.detailTitleRow}>
                  <h2 className={styles.detailTitle}>{selectedStation.name}</h2>
                  <Badge
                    variant={STATUS_BADGE[selectedStation.status].variant}
                    label={STATUS_BADGE[selectedStation.status].label}
                  />
                </div>
                <p className={styles.detailCode}>
                  {selectedStation.code} ·{" "}
                  {coordinates(selectedStation.lat, selectedStation.lng)}
                </p>
              </header>

              {/* One readings cluster: the capacity dial beside the two
                  numbers an operator checks first. */}
              <div className={styles.readings}>
                <Gauge
                  bare
                  value={selectedStation.capacityPct}
                  label="Capacity"
                  formatValue={(v) => `${v}%`}
                  thresholds={[
                    { value: 0, tone: "accent" },
                    { value: 70, tone: "warning" },
                    { value: 90, tone: "error" },
                  ]}
                  size={124}
                  strokeWidth={10}
                />
                <div className={styles.readingStats}>
                  <Stat
                    value={`${selectedStation.latencyMs} ms`}
                    label="Latency"
                    delta={selectedStation.latencyDelta}
                    trend="neutral"
                  />
                  <Stat
                    value={`${selectedStation.throughput.toFixed(1)} Gb/s`}
                    label="Throughput"
                    delta={selectedStation.throughputDelta}
                    trend={selectedStation.throughputTrend}
                  />
                </div>
              </div>

              <div className={styles.sparkBlock}>
                <div className={styles.sparkHead}>
                  <span className={styles.blockLabel}>Throughput, 24 h</span>
                  <span className={styles.sparkNow}>
                    {selectedStation.throughput.toFixed(1)} Gb/s now
                  </span>
                </div>
                <Sparkline
                  data={selectedStation.trend}
                  variant="area"
                  tone="accent"
                  width={280}
                  height={56}
                  label={`${selectedStation.name} throughput over the last 24 hours`}
                  className={styles.detailSpark}
                />
              </div>

              <div className={styles.eventsBlock}>
                <span className={styles.blockLabel}>Recent events</span>
                <ul className={styles.eventList}>
                  {selectedStation.events.map((event) => (
                    <li key={event.time} className={styles.eventRow}>
                      <span
                        className={styles.eventDot}
                        style={{ backgroundColor: EVENT_TONE[event.tone] }}
                        aria-hidden="true"
                      />
                      <span className={styles.eventText}>{event.text}</span>
                      <span className={styles.eventTime}>{event.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.detailFooter}>
                <div className={styles.detailActions}>
                  <Button variant="primary" size="compact" label="Run diagnostics" />
                  <Button variant="tertiary" size="compact" label="View logs" />
                </div>
              </div>
            </>
          ) : selectedRelay ? (
            <>
              <header className={styles.detailHeader}>
                <div className={styles.detailTitleRow}>
                  <h2 className={styles.detailTitle}>{selectedRelay.name}</h2>
                  <Badge variant="info" label="In transit" />
                </div>
                <p className={styles.detailCode}>
                  {coordinates(selectedRelay.lat, selectedRelay.lng)}
                </p>
              </header>
              <p className={styles.relayRoute}>{selectedRelay.route}</p>
              <Meter
                label="Link load"
                value={selectedRelay.loadPct}
                showValue
                variant={selectedRelay.loadPct > 80 ? "warning" : "info"}
              />
              <p className={styles.relayHandoff}>{selectedRelay.handoff}</p>
              <div className={styles.detailFooter}>
                <div className={styles.detailActions}>
                  <Button variant="secondary" size="compact" label="Trace route" />
                </div>
              </div>
            </>
          ) : (
            <p className={styles.detailEmpty}>
              Select a station or relay to read its telemetry.
            </p>
          )}
        </section>
      </div>

      <TemplateAssistant
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        title="Meridian AI"
        askLine="Ask about stations, links, latency, or capacity"
        suggestions={CHAT_SUGGESTIONS}
        replies={CHAT_REPLIES}
        fallback={CHAT_FALLBACK}
        disclaimer="A mock assistant with canned answers over this network's numbers."
      />
    </div>
  );
}
