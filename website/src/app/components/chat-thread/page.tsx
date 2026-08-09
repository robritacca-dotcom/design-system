"use client";

import React, { useState } from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { ChatThread } from "@robr0/design-system/components/ChatThread/ChatThread";
import { ChatMessage } from "@robr0/design-system/components/ChatMessage/ChatMessage";
import { Button } from "@robr0/design-system/components/Button/Button";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  componentsSidebarLinks,
  "/components/chat-thread"
);

const EXCHANGES = [
  {
    q: "What does the design system cover?",
    a: "Foundations first: colour, type, spacing, and motion. The component library builds on those tokens, so every surface stays consistent.",
  },
  {
    q: "How does dark mode work?",
    a: "Every semantic token carries a light and a dark value, so components never branch on the theme themselves.",
  },
  {
    q: "And the chat pieces?",
    a: "The ai category holds the conversation primitives. Messages, the composer, live status, and reasoning all compose into a full chat surface.",
  },
  {
    q: "Which parts are new here?",
    a: "This thread is the newest piece. It owns the scrolling, the edge fades, and the way a sent message floats to the top.",
  },
];

function AnchoringDemo() {
  const [count, setCount] = useState(1);

  const send = () => setCount((c) => Math.min(c + 1, EXCHANGES.length));
  const reset = () => setCount(1);

  return (
    <>
      <div className={styles.threadFrame}>
        <ChatThread className={styles.thread}>
          {EXCHANGES.slice(0, count).flatMap(({ q, a }) => [
            <ChatMessage key={`${q}-q`} role="user">
              {q}
            </ChatMessage>,
            <ChatMessage key={`${q}-a`} role="assistant">
              {a}
            </ChatMessage>,
          ])}
        </ChatThread>
      </div>
      <div className={styles.demoControls}>
        <Button
          variant="secondary"
          size="compact"
          label="Send the next message"
          onClick={send}
          disabled={count >= EXCHANGES.length}
        />
        <Button
          variant="tertiary"
          size="compact"
          label="Reset"
          onClick={reset}
          disabled={count === 1}
        />
      </div>
    </>
  );
}

export default function ChatThreadPage() {
  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Chat thread</h1>
            <PageLinks storybookPath="/?path=/docs/components-chatthread--docs" />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              The conversation column that owns the scrolling
            </p>
            <p className={styles.introBody}>
              Turns stack inside a scrollable column with consistent gutters,
              a fade at either end, and a scrollbar that only appears while
              scrolling is happening. When a new turn is appended it floats
              to the top of the viewport, pushing the conversation upward and
              leaving the response room to stream in below.
            </p>
          </div>

          {/* Send anchoring */}
          <section className={styles.section}>
            <SectionTitle title="Send anchoring" />
            <p className={styles.demoText}>
              Sending appends a turn and scrolls it to the top. A trailing
              spacer grows so even a short newest exchange can reach the top,
              and reduced motion makes the glide instant. That spacer is
              anchor space, not resting space: tell the thread when the
              response has landed and it collapses, so the finished
              conversation settles just above the composer rather than
              leaving a void under the last answer.
            </p>
            <AnchoringDemo />
          </section>

          {/* Edge fades */}
          <section className={styles.section}>
            <SectionTitle title="Edge fades" />
            <p className={styles.demoText}>
              A pure CSS mask fades the first and last lines as they scroll
              out, hinting there is more in either direction. No scroll
              listeners are involved.
            </p>
            <div className={`${styles.threadFrame} ${styles.threadFrameShort}`}>
              <ChatThread className={styles.thread} anchor={false}>
                {EXCHANGES.flatMap(({ q, a }) => [
                  <ChatMessage key={`${q}-q`} role="user">
                    {q}
                  </ChatMessage>,
                  <ChatMessage key={`${q}-a`} role="assistant">
                    {a}
                  </ChatMessage>,
                ])}
              </ChatThread>
            </div>
          </section>

          {/* Scrollbar */}
          <section className={styles.section}>
            <SectionTitle title="A quiet scrollbar" />
            <p className={styles.demoText}>
              The content gutters live on an inner wrapper, so the thin
              scrollbar rides the far edge of the component instead of
              sitting inside the conversation. It stays invisible until the
              thread is actually scrolling, then fades back out.
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
