"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AgentStatus } from "@robr0/design-system/components/AgentStatus/AgentStatus";
import { ChatMessage } from "@robr0/design-system/components/ChatMessage/ChatMessage";
import { Prose } from "@robr0/design-system/components/Prose/Prose";
import { Reasoning } from "@robr0/design-system/components/Reasoning/Reasoning";
import type { ChatTurn, LiveResponse } from "@/hooks/useChat";
import styles from "./SiteChat.module.css";

/* A markdown table has a natural minimum width that a docked panel cannot
   meet, and the browser resolves that by breaking headings one letter per
   line. Scrolling the table sideways inside the message keeps it readable.
   Prose styles the table itself; this only supplies the scroll container,
   which Prose cannot add because it styles markup it does not render. */
const markdownComponents = {
  table: ({ children, ...props }: React.ComponentPropsWithoutRef<"table">) => (
    <div className={styles.tableScroll}>
      <table {...props}>{children}</table>
    </div>
  ),
};

/* One component for the assistant turn in both states. The live turn and
   its committed form share an id (and so a key), so React reconciles the
   finished response in place — separate components remounted the whole
   subtree at commit, which read as a flicker after the response rendered. */
export function AssistantTurn({ turn, live }: { turn?: ChatTurn; live?: LiveResponse }) {
  const thinking = live?.phase === "thinking";
  const tracePoints = live ? live.tracePoints : (turn?.tracePoints ?? []);
  const durationSeconds = live ? live.durationSeconds : turn?.durationSeconds;
  const text = live ? live.text : (turn?.text ?? "");

  return (
    <ChatMessage role="assistant">
      <div className={styles.responseStack}>
        {/* While thinking the disclosure carries the live status; once
            streaming, it stays only if a trace actually accumulated —
            an empty collapsed panel is noise. Until a trace point arrives
            there is nothing behind the line either, so it renders as a
            plain status: no chevron, nothing to open. */}
        {(thinking || tracePoints.length > 0) && (
          <Reasoning
            streaming={thinking}
            summaryOnly={tracePoints.length === 0}
            duration={durationSeconds}
            summary={
              thinking && live ? (
                <AgentStatus state="working" label={live.statusLabel} />
              ) : undefined
            }
          >
            {tracePoints.length > 0 && (
              <ul>
                {tracePoints.map((point, index) => (
                  <li key={`${index}-${point.slice(0, 24)}`}>{point}</li>
                ))}
              </ul>
            )}
          </Reasoning>
        )}
        {text !== "" && (
          <Prose>
            {/* gfm: a real model emits tables and strikethrough, which plain
                CommonMark renders as literal pipes and tildes. */}
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {text}
            </ReactMarkdown>
          </Prose>
        )}
      </div>
    </ChatMessage>
  );
}
