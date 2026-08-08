"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { ChatMessage } from "@robr0/design-system/components/ChatMessage/ChatMessage";
import { ChatMarker } from "@robr0/design-system/components/ChatMarker/ChatMarker";
import { Avatar } from "@robr0/design-system/components/Avatar/Avatar";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  componentsSidebarLinks,
  "/components/chat-message"
);

export default function ChatMessagePage() {
  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Chat message</h1>
            <PageLinks storybookPath="/?path=/docs/components-chatmessage--docs" />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              One turn of a conversation, aligned by who said it
            </p>
            <p className={styles.introBody}>
              User turns read as right-aligned bubbles. Assistant turns read
              as plain full-width text, so long answers breathe. Bubble
              colours come only from the four chat bubble tokens, which makes
              re-theming a chat a four-token change.
            </p>
          </div>

          {/* Roles */}
          <section className={styles.section}>
            <SectionTitle title="Roles" />
            <p className={styles.demoText}>
              The role drives alignment and the default surface. Users get a
              sent bubble on the right, assistants get plain text across the
              full width.
            </p>
            <div className={styles.stack}>
              <ChatMessage role="user">
                What changed in the latest token release?
              </ChatMessage>
              <ChatMessage role="assistant">
                Two motion durations were added for looping indicators, and
                the chart palette gained a neutral step. Nothing was renamed,
                so no consumer changes are needed.
              </ChatMessage>
            </div>
          </section>

          {/* A conversation */}
          <section className={styles.section}>
            <SectionTitle title="A conversation" />
            <p className={styles.demoText}>
              Turns compose with avatars, authors, and chat markers into a
              full transcript. The marker is furniture; the messages are the
              conversation.
            </p>
            <div className={styles.conversation}>
              <ChatMarker>Today</ChatMarker>
              <ChatMessage
                role="user"
                author="Mara Voss"
                timestamp="2:41 PM"
                avatar={<Avatar name="Mara Voss" size="sm" />}
              >
                What does the review queue look like this week?
              </ChatMessage>
              <ChatMessage
                role="assistant"
                author="Assistant"
                timestamp="2:41 PM"
                avatar={<Avatar name="A I" size="sm" />}
              >
                Four items are waiting: two copy reviews, one token rename,
                and the navigation audit. The audit is the oldest, opened
                nine days ago.
              </ChatMessage>
              <ChatMessage
                role="user"
                author="Mara Voss"
                timestamp="2:43 PM"
                avatar={<Avatar name="Mara Voss" size="sm" />}
              >
                Start with the audit then.
              </ChatMessage>
              <ChatMessage
                role="user"
                grouped
                avatar={<Avatar name="Mara Voss" size="sm" />}
              >
                And flag anything blocked on me.
              </ChatMessage>
            </div>
          </section>

          {/* Bubbles and tails */}
          <section className={styles.section}>
            <SectionTitle title="Bubbles and tails" />
            <p className={styles.demoText}>
              The surface is a default, not a rule. An assistant turn can opt
              into a received bubble, a user turn can go plain, and a tail
              squares the corner nearest the speaker.
            </p>
            <div className={styles.stack}>
              <ChatMessage role="user" tail>
                A sent bubble with its bottom right corner squared.
              </ChatMessage>
              <ChatMessage role="assistant" bubble tail>
                A received bubble with its bottom left corner squared.
              </ChatMessage>
              <ChatMessage role="user" bubble={false}>
                A user turn as plain right-aligned text.
              </ChatMessage>
            </div>
          </section>

          {/* Grouped runs */}
          <section className={styles.section}>
            <SectionTitle title="Grouped runs" />
            <p className={styles.demoText}>
              Grouped messages drop the author row and hide the avatar while
              keeping its gutter, so a run of quick messages stays aligned
              and reads as one utterance.
            </p>
            <div className={styles.stack}>
              <ChatMessage
                role="assistant"
                author="Assistant"
                timestamp="9:02 AM"
                avatar={<Avatar name="A I" size="sm" />}
              >
                The export finished overnight.
              </ChatMessage>
              <ChatMessage
                role="assistant"
                grouped
                avatar={<Avatar name="A I" size="sm" />}
              >
                All 214 records validated cleanly.
              </ChatMessage>
              <ChatMessage
                role="assistant"
                grouped
                avatar={<Avatar name="A I" size="sm" />}
              >
                The summary file is in the shared folder.
              </ChatMessage>
            </div>
          </section>

          {/* Pending */}
          <section className={styles.section}>
            <SectionTitle title="Pending" />
            <p className={styles.demoText}>
              Before the first content arrives, the turn shows three pulsing
              dots. Screen readers hear the pending label instead, and
              reduced motion parks the dots at a steady legible opacity.
            </p>
            <div className={styles.stack}>
              <ChatMessage
                role="assistant"
                author="Assistant"
                avatar={<Avatar name="A I" size="sm" />}
                pending
              />
            </div>
          </section>

          {/* Sizes */}
          <section className={styles.section}>
            <SectionTitle title="Sizes" />
            <p className={styles.demoText}>
              Compact drops the type one step and tightens bubble padding for
              dense transcripts like support consoles.
            </p>
            <div className={styles.stack}>
              <ChatMessage role="user">
                The default size, on the paragraph scale.
              </ChatMessage>
              <ChatMessage role="user" size="compact">
                The compact size, one step down.
              </ChatMessage>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
