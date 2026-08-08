"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { AgentStatus } from "@robr0/design-system/components/AgentStatus/AgentStatus";
import { Avatar } from "@robr0/design-system/components/Avatar/Avatar";
import { Button } from "@robr0/design-system/components/Button/Button";
import { ChatMessage } from "@robr0/design-system/components/ChatMessage/ChatMessage";
import { CircularButton } from "@robr0/design-system/components/CircularButton/CircularButton";
import { Composer } from "@robr0/design-system/components/Composer/Composer";
import { MessageCard } from "@robr0/design-system/components/MessageCard/MessageCard";
import { Reasoning } from "@robr0/design-system/components/Reasoning/Reasoning";

type WidgetSize = "desktop" | "mobile";
type ResponseMode = "response" | "live" | "sim";
type SimPhase = "running" | "done";

/* Each status is a concise summary of one reasoning step; the trace builds
   one point per status. */
const SIM_STEPS = [
  {
    status: "Reading the readiness tracks",
    point: "Pull the four readiness tracks and their owners.",
  },
  {
    status: "Checking sign-offs",
    point: "Design QA and docs both have sign-off this week.",
  },
  {
    status: "Reviewing the legal blocker",
    point: "Pricing copy is still sitting in legal review.",
  },
  {
    status: "Weighing the launch date",
    point: "The legal review gates the pricing rollout, so it drives the date.",
  },
  {
    status: "Drafting the answer",
    point: "Lead with the overall status, then flag the one real risk.",
  },
];

const SIM_RESPONSE =
  "The launch is on track overall. Three of the four readiness tracks are " +
  "green, and the one item I would watch is the legal review, since it " +
  "gates the pricing rollout.";

const STATUS_MS = 1600;
const HANDOFF_MS = 350; /* beat for the components' live→done handoff */
const STREAM_MS = 30;

const TRACE_NODES = (
  <ul>
    {SIM_STEPS.map((s) => (
      <li key={s.status}>{s.point}</li>
    ))}
  </ul>
);

export default function ChatWidgetTestPage() {
  const [size, setSize] = useState<WidgetSize>("desktop");
  const [showAvatar, setShowAvatar] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [mode, setMode] = useState<ResponseMode>("response");

  const [simRun, setSimRun] = useState(0);
  const [simStep, setSimStep] = useState(0);
  const [simPhase, setSimPhase] = useState<SimPhase>("running");
  const [simSeconds, setSimSeconds] = useState(8);
  const [streamed, setStreamed] = useState("");

  useEffect(() => {
    if (mode !== "sim") return;
    const startedAt = Date.now();
    const timers: number[] = [];

    // The page owns only the timeline; AgentStatus crossfades its own
    // label changes and Reasoning animates the live→done handoff.
    SIM_STEPS.forEach((_, i) => {
      if (i === 0) return;
      timers.push(window.setTimeout(() => setSimStep(i), i * STATUS_MS));
    });
    timers.push(
      window.setTimeout(() => {
        setSimPhase("done");
        setSimSeconds(Math.max(1, Math.round((Date.now() - startedAt) / 1000)));
      }, SIM_STEPS.length * STATUS_MS),
    );
    timers.push(
      window.setTimeout(() => {
        const words = SIM_RESPONSE.split(" ");
        let shown = 0;
        const streamId = window.setInterval(() => {
          shown += 1;
          setStreamed(words.slice(0, shown).join(" "));
          if (shown >= words.length) window.clearInterval(streamId);
        }, STREAM_MS);
        timers.push(streamId);
      }, SIM_STEPS.length * STATUS_MS + HANDOFF_MS),
    );

    return () => {
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
    };
  }, [mode, simRun]);

  const userAvatar = showAvatar ? <Avatar name="Mara Voss" size="sm" /> : undefined;
  const agentAvatar = showAvatar ? <Avatar name="A I" size="sm" /> : undefined;

  return (
    <main className={styles.stage}>
      <div className={styles.controls}>
        <div className={styles.group} role="group" aria-label="Widget size">
          <Button
            size="compact"
            variant={size === "desktop" ? "secondary" : "tertiary"}
            aria-pressed={size === "desktop"}
            onClick={() => setSize("desktop")}
            label="Desktop (768px)"
          />
          <Button
            size="compact"
            variant={size === "mobile" ? "secondary" : "tertiary"}
            aria-pressed={size === "mobile"}
            onClick={() => setSize("mobile")}
            label="Mobile (390px)"
          />
        </div>

        <div className={styles.group} role="group" aria-label="Message props">
          <Button
            size="compact"
            variant={showAvatar ? "secondary" : "tertiary"}
            aria-pressed={showAvatar}
            onClick={() => setShowAvatar((v) => !v)}
            label="Avatar"
          />
          <Button
            size="compact"
            variant={showDetails ? "secondary" : "tertiary"}
            aria-pressed={showDetails}
            onClick={() => setShowDetails((v) => !v)}
            label="Details"
          />
        </div>

        <div className={styles.group} role="group" aria-label="Agent turn state">
          <Button
            size="compact"
            variant={mode === "response" ? "secondary" : "tertiary"}
            aria-pressed={mode === "response"}
            onClick={() => setMode("response")}
            label="Response"
          />
          <Button
            size="compact"
            variant={mode === "live" ? "secondary" : "tertiary"}
            aria-pressed={mode === "live"}
            onClick={() => setMode("live")}
            label="Live status"
          />
          <Button
            size="compact"
            variant={mode === "sim" ? "secondary" : "tertiary"}
            aria-pressed={mode === "sim"}
            onClick={() => {
              setMode("sim");
              setSimRun((r) => r + 1);
              setSimStep(0);
              setSimPhase("running");
              setStreamed("");
            }}
            label="Simulation"
          />
        </div>
      </div>

      <div
        className={`${styles.widget} ${size === "mobile" ? styles.widgetMobile : ""}`}
      >
        <header className={styles.header}>
          <span className={styles.headerTitle}>Assistant</span>
          <CircularButton icon="close" variant="tertiary" ariaLabel="Close chat" />
        </header>

        <div className={styles.messages}>
          <ChatMessage
            role="user"
            tail
            avatar={userAvatar}
            author={showDetails ? "Mara Voss" : undefined}
            timestamp={showDetails ? "2:41 PM" : undefined}
          >
            Where does the Q3 launch stand right now?
          </ChatMessage>

          <ChatMessage
            role="assistant"
            avatar={agentAvatar}
            author={showDetails ? "Assistant" : undefined}
            timestamp={showDetails ? "2:42 PM" : undefined}
          >
            {mode === "response" && (
              <div className={styles.responseStack}>
                <Reasoning duration={12}>{TRACE_NODES}</Reasoning>
                <MessageCard title="Q3 launch readiness">
                  Three of the four readiness tracks are green. Pricing copy is
                  still in legal review.
                </MessageCard>
                <p className={styles.responseText}>
                  The launch is on track overall. The one item I would watch is
                  the legal review, since it gates the pricing rollout.
                </p>
              </div>
            )}
            {mode === "live" && (
              <Reasoning streaming summary={<AgentStatus state="working" />}>
                {TRACE_NODES}
              </Reasoning>
            )}
            {mode === "sim" && (
              <div className={styles.responseStack}>
                <Reasoning
                  streaming={simPhase !== "done"}
                  duration={simSeconds}
                  summary={
                    simPhase !== "done" ? (
                      <AgentStatus
                        state="working"
                        label={SIM_STEPS[simStep].status}
                      />
                    ) : undefined
                  }
                >
                  <ul>
                    {SIM_STEPS.slice(0, simStep + 1).map((s) => (
                      <li key={s.status}>{s.point}</li>
                    ))}
                  </ul>
                </Reasoning>
                {simPhase === "done" && streamed && (
                  <p className={styles.responseText}>{streamed}</p>
                )}
              </div>
            )}
          </ChatMessage>
        </div>

        <footer className={styles.footer}>
          <Composer placeholder="Message the agent" sendLabel="Send" />
        </footer>
      </div>
    </main>
  );
}
