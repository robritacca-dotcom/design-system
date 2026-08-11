"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import { MessageCard } from "@robr0/design-system/components/MessageCard/MessageCard";
import { ChatMessage } from "@robr0/design-system/components/ChatMessage/ChatMessage";
import { Avatar } from "@robr0/design-system/components/Avatar/Avatar";
import { Button } from "@robr0/design-system/components/Button/Button";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  componentsSidebarLinks,
  "/components/message-card"
);

function MediaPlaceholder() {
  return (
    <div className={styles.mediaPlaceholder} aria-hidden="true">
      <svg viewBox="0 0 200 60">
        <rect x="16" y="34" width="24" height="26" fill="currentColor" opacity="0.35" />
        <rect x="52" y="22" width="24" height="38" fill="currentColor" opacity="0.5" />
        <rect x="88" y="40" width="24" height="20" fill="currentColor" opacity="0.35" />
        <rect x="124" y="12" width="24" height="48" fill="currentColor" opacity="0.65" />
        <rect x="160" y="27" width="24" height="33" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}

export default function MessageCardPage() {
  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Message card</h1>
            <PageLinks storybookPath="/?path=/docs/components-messagecard--docs" />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Structured rich content inside a chat turn
            </p>
            <p className={styles.introBody}>
              Link previews, search results, booking-style responses. A
              message card gives rich content a quiet frame inside an
              assistant turn or bubble: media on top, a title and description
              in the body, actions in a footer. It is not the navigation
              Card. That one is a large-radius tile you click to go
              somewhere; this one is content furniture the conversation
              scrolls past.
            </p>
          </div>

          {/* Anatomy */}
          <section className={styles.section}>
            <SectionTitle title="Anatomy" />
            <p className={styles.demoText}>
              An optional icon leads the title, a free-text meta line carries
              a domain or date in your own formatting, and the description
              stays to a line or two.
            </p>
            <div className={styles.stack}>
              <MessageCard
                icon="article"
                title="Design tokens, explained"
                meta="fieldnotes.example · 4 min read"
                description="How a three-tier token architecture keeps a component library on one palette."
              />
            </div>
          </section>

          {/* Link previews */}
          <section className={styles.section}>
            <SectionTitle title="Link previews" />
            <p className={styles.demoText}>
              The classic unfurl. The actions footer sits outside the body,
              mirroring the tool call footer, so link actions and approvals
              read as the same row across the ai components.
            </p>
            <div className={styles.stack}>
              <MessageCard
                icon="language"
                title="Harbour Line timetable"
                meta="transit.harbourline.example"
                description="Departures every twelve minutes from Pier 4 until midnight."
                actions={<Button variant="secondary" size="compact" label="Open" />}
              />
              <MessageCard
                icon="language"
                title="Alpine pass conditions"
                meta="roads.grimsel.example"
                description="Open to traffic. Chains recommended above 1,800 metres after dark."
                actions={
                  <>
                    <Button variant="tertiary" size="compact" label="Share" />
                    <Button variant="secondary" size="compact" label="Open" />
                  </>
                }
              />
            </div>
          </section>

          {/* With media */}
          <section className={styles.section}>
            <SectionTitle title="With media" />
            <p className={styles.demoText}>
              The media slot renders flush to the card edges with no padding
              of its own; the card clips it, so the corners round themselves.
            </p>
            <div className={styles.stack}>
              <MessageCard
                media={<MediaPlaceholder />}
                title="Weekly signups"
                meta="Updated this morning"
                description="Thursday is still the strongest day, holding the pattern from last month."
              />
            </div>
          </section>

          {/* Inside a message */}
          <section className={styles.section}>
            <SectionTitle title="Inside a message" />
            <p className={styles.demoText}>
              The intended habitat. The card claims no width of its own, so
              the turn that holds it sets the measure.
            </p>
            <div className={styles.conversation}>
              <ChatMessage
                role="user"
                author="Mara Voss"
                timestamp="2:40 PM"
                avatar={<Avatar name="Mara Voss" size="sm" />}
              >
                When does the last ferry leave tonight?
              </ChatMessage>
              <ChatMessage
                role="assistant"
                author="Assistant"
                timestamp="2:41 PM"
                avatar={<Avatar name="A I" size="sm" />}
              >
                <p className={styles.turnText}>
                  The last ferry back leaves at 11:48 PM. Full timetable
                  below.
                </p>
                <MessageCard
                  icon="language"
                  title="Harbour Line timetable"
                  meta="transit.harbourline.example"
                  description="Departures every twelve minutes from Pier 4 until midnight."
                  actions={<Button variant="secondary" size="compact" label="Open" />}
                />
              </ChatMessage>
            </div>
          </section>
        </main>
      </div>

    </>
  );
}
