"use client";

/**
 * The relay console template: the network screen for Meridian, a fictional
 * relay network, built from the design system alone. The shell is the
 * marketing dashboard's (floating AppSidebar, slim top bar, docked mock
 * assistant); the page itself is one instrument. The Globe holds the whole
 * stage, and the screen's furniture lives on the stage's bottom corners the
 * way a map's does: the name, key, and legend on the left, the network's
 * headline numbers and the steering hint on the right. Every colour,
 * radius, space, and type style is a semantic token; every control is a
 * library component.
 *
 * All data is fictional, so the route is excluded from the chat corpus (see
 * EXCLUDED_ROUTES in generate-site-corpus.mjs). The assistant is the shared
 * TemplateAssistant mock, answering over this page's own numbers.
 */

import React from "react";
import { AiButton } from "@robr0/design-system/components/AiButton/AiButton";
import {
  AppSidebar,
  type AppSidebarSection,
} from "@robr0/design-system/components/AppSidebar/AppSidebar";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import {
  Globe,
  type GlobeArc,
  type GlobePoint,
} from "@robr0/design-system/components/Globe/Globe";
import { Input } from "@robr0/design-system/components/Input/Input";
import { Kbd } from "@robr0/design-system/components/Kbd/Kbd";
import { MapCallout } from "@robr0/design-system/components/MapCallout/MapCallout";
import { MapLegend } from "@robr0/design-system/components/MapLegend/MapLegend";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import TemplateAssistant from "../TemplateAssistant/TemplateAssistant";
import styles from "./RelayConsole.module.css";

/* ---------------------------------------------------------------- data */

const NAV_SECTIONS: AppSidebarSection[] = [
  {
    items: [
      { key: "network", icon: "public", label: "Network" },
      { key: "stations", icon: "cell_tower", label: "Stations" },
      { key: "traffic", icon: "monitoring", label: "Traffic" },
      { key: "alerts", icon: "notifications", label: "Alerts", badge: 2 },
      { key: "reports", icon: "description", label: "Reports" },
    ],
  },
  {
    items: [
      { key: "support", icon: "headset_mic", label: "Support" },
      { key: "settings", icon: "settings", label: "Settings" },
    ],
  },
];

type StationStatus = "operational" | "degraded" | "maintenance";

type Station = {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  status: StationStatus;
  latencyMs: number;
  throughput: number;
};

const STATIONS: Station[] = [
  { id: "yyz", name: "Toronto", code: "YYZ-1", lat: 43.65, lng: -79.38, status: "operational", latencyMs: 71, throughput: 6.8 },
  { id: "sea", name: "Seattle", code: "SEA-2", lat: 47.61, lng: -122.33, status: "operational", latencyMs: 64, throughput: 5.9 },
  { id: "gru", name: "São Paulo", code: "GRU-1", lat: -23.55, lng: -46.63, status: "maintenance", latencyMs: 118, throughput: 0.9 },
  { id: "kef", name: "Reykjavík", code: "KEF-1", lat: 64.15, lng: -21.94, status: "operational", latencyMs: 59, throughput: 7.4 },
  { id: "fra", name: "Frankfurt", code: "FRA-3", lat: 50.11, lng: 8.68, status: "operational", latencyMs: 61, throughput: 8.2 },
  { id: "sin", name: "Singapore", code: "SIN-1", lat: 1.35, lng: 103.82, status: "degraded", latencyMs: 143, throughput: 9.6 },
  { id: "syd", name: "Sydney", code: "SYD-1", lat: -33.87, lng: 151.21, status: "operational", latencyMs: 88, throughput: 4.4 },
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

const STATUS_LABEL: Record<StationStatus, string> = {
  operational: "Operational",
  degraded: "Degraded",
  maintenance: "Maintenance",
};

/* The console's headline numbers, derived from the station table so the
   figures and the markers can never disagree. */
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

/** Formats a coordinate pair the way MapCallout's readout expects. */
function coordinates(lat: number, lng: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}° ${ns} · ${Math.abs(lng).toFixed(2)}° ${ew}`;
}

/* ---------------------------------------------------------------- page */

export default function RelayConsole() {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(true);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [hoverId, setHoverId] = React.useState<string | null>(null);
  const [chatOpen, setChatOpen] = React.useState(false);

  /* Clicking a marker pins its callout; clicking it again lets it go. The
     globe owns its own rotation, drifting until something is pinned. */
  const handlePointClick = (point: GlobePoint) => {
    setSelectedId((current) => (current === point.id ? null : point.id));
  };

  const activePointId = hoverId ?? selectedId ?? undefined;

  const renderCallout = (point: GlobePoint) => {
    const station = STATIONS.find((s) => s.id === point.id);
    if (station) {
      return (
        <MapCallout
          title={station.code}
          lines={[
            STATUS_LABEL[station.status],
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
          relay.route,
          `${relay.loadPct}% load · ${relay.handoff.toLowerCase()}`,
          coordinates(relay.lat, relay.lng),
        ]}
      />
    );
  };

  return (
    // data-bg-hidden: the console sits on the flat page colour, the same
    // switch the marketing dashboard uses.
    <div className={styles.shell} data-bg-hidden="">
      <div className={styles.sidebar}>
        <AppSidebar
          sections={NAV_SECTIONS}
          profile={{ name: "Noor Haddad", email: "noor@meridian.net" }}
          activeKey="network"
          expanded={sidebarExpanded}
          onExpandedChange={setSidebarExpanded}
          logoText="Meridian"
          floating
          footerSlot={<ThemeToggle />}
        />
      </div>

      <main
        className={`${styles.main} ${
          sidebarExpanded ? styles.mainExpanded : ""
        } ${chatOpen ? styles.mainChatOpen : ""}`}
      >
        <div className={styles.content}>
          <div className={styles.topBar}>
            <div className={styles.search}>
              <Input
                placeholder="Search stations"
                iconLeft="search"
                aria-label="Search stations"
              />
              <span className={styles.searchKbd} aria-hidden="true">
                <Kbd size="compact">⌘</Kbd>
                <Kbd size="compact">K</Kbd>
              </span>
            </div>
            <div className={styles.topBarActions}>
              <AiButton
                label="Ask AI"
                size="compact"
                onClick={() => setChatOpen(true)}
              />
              <CircularButton
                icon="notifications"
                variant="secondary"
                size="compact"
                ariaLabel="Notifications"
              />
            </div>
          </div>

          {/* ------------------------------------------------- the stage */}
          <section className={styles.stage} aria-label="Network view">
            <div className={styles.globeBox}>
              <Globe
                points={POINTS}
                arcs={ARCS}
                defaultRotation={[-45, 30]}
                autoRotate={selectedId ? 0 : 0.4}
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

            {/* The screen's identity and key, in the readout voice, on the
                corner the sphere leaves empty. */}
            <div className={styles.metaLeft}>
              <h1 className={styles.metaTitle}>Meridian</h1>
              <p className={styles.metaTagline}>
                Ground stations, relays in transit, and the links carrying
                tonight&apos;s traffic.
              </p>
              <MapLegend
                className={styles.legend}
                items={[
                  { glyph: "anchor", label: "Ground station" },
                  { glyph: "point", label: "Relay in transit" },
                  { glyph: "arc", label: "Backbone link" },
                  { glyph: "line", color: DEGRADED_LINK, label: "Degraded link" },
                ]}
              />
            </div>

            {/* The headline numbers and the steering hint on the other
                corner, right-ragged toward the edge. */}
            <div className={styles.metaRight}>
              <div className={styles.metricsRow} aria-label="Network summary">
                <span className={styles.liveDot} aria-hidden="true" />
                {NETWORK_METRICS.map((metric) => (
                  <div key={metric.label} className={styles.metric}>
                    <span className={styles.metricValue}>{metric.value}</span>
                    <span className={styles.metricLabel}>{metric.label}</span>
                  </div>
                ))}
              </div>
              <p className={styles.kbdHint}>
                <span className={styles.kbdRow} aria-hidden="true">
                  <Kbd size="compact">W</Kbd>
                  <Kbd size="compact">A</Kbd>
                  <Kbd size="compact">S</Kbd>
                  <Kbd size="compact">D</Kbd>
                </span>
                Drag the globe, or steer with the keys
              </p>
            </div>
          </section>
        </div>
      </main>

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
