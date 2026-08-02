"use client";

import React, { useState } from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { ToolCall } from "@robr0/design-system/components/ToolCall/ToolCall";
import { Button } from "@robr0/design-system/components/Button/Button";
import { CodeBlock } from "@robr0/design-system/components/CodeBlock/CodeBlock";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(
  componentsSidebarLinks,
  "/components/tool-call",
);

const GREP_ARGS = `{
  "path": "src/tokens/tokens-light.css",
  "pattern": "--color-status-"
}`;

const WRITE_ARGS = `{
  "path": "src/components/Button/Button.tsx",
  "bytes": 4182
}`;

/** The approval flow, so the pending state can actually be answered. */
function ApprovalDemo() {
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");

  return (
    <ToolCall
      name="write_file"
      status={status}
      summary="src/components/Button/Button.tsx"
      duration={status === "pending" ? undefined : "0.2s"}
      actions={
        status === "pending" ? (
          <>
            <Button
              variant="secondary"
              size="compact"
              label="Deny"
              onClick={() => setStatus("error")}
            />
            <Button
              variant="primary"
              size="compact"
              label="Allow"
              onClick={() => setStatus("success")}
            />
          </>
        ) : (
          <Button
            variant="tertiary"
            size="compact"
            label="Reset"
            onClick={() => setStatus("pending")}
          />
        )
      }
    >
      <CodeBlock code={WRITE_ARGS} language="json" />
    </ToolCall>
  );
}

export default function ToolCallPage() {
  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Tool call</h1>
            <PageLinks storybookPath="/?path=/docs/components-toolcall--docs" />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>What ran, how it went, what it returned</p>
            <p className={styles.introBody}>
              A run is mostly a list of these. So the collapsed header carries
              everything needed to skim it — the tool, the target, the outcome,
              the time — and the body carries everything needed to audit it.
            </p>
          </div>

          {/* Statuses */}
          <section className={styles.section}>
            <SectionTitle title="Statuses" />
            <p className={styles.demoText}>
              The container stays neutral, so a long run reads as a list rather
              than a wall of tinted cards. Only the two states someone has to
              act on — awaiting approval, and failed — take a coloured border
              as well.
            </p>
            <div className={styles.stack}>
              <ToolCall name="read_file" summary="package.json" duration="0.1s" />
              <ToolCall name="bash" summary="npm run lint" status="running" />
              <ToolCall
                name="write_file"
                summary="src/app/page.tsx"
                status="pending"
              />
              <ToolCall
                name="fetch"
                summary="https://api.example.com/v2/users"
                status="error"
                duration="1.1s"
              >
                ENOENT: no such file or directory
              </ToolCall>
            </div>
          </section>

          {/* Detail */}
          <section className={styles.section}>
            <SectionTitle title="Arguments and result" />
            <p className={styles.demoText}>
              Pass the call&apos;s detail as children and the header becomes a
              disclosure. With nothing to disclose it renders as a plain row
              instead — a row that cannot open should not look pressable.
            </p>
            <div className={styles.stack}>
              <ToolCall
                name="grep"
                summary="--color-status- in tokens-light.css"
                duration="0.4s"
                defaultOpen
              >
                <CodeBlock code={GREP_ARGS} language="json" />
              </ToolCall>
            </div>
          </section>

          {/* Approval */}
          <section className={styles.section}>
            <SectionTitle title="Waiting on a person" />
            <p className={styles.demoText}>
              Approval controls render outside the collapsible panel. Someone
              deciding whether to allow a write should not have to expand the
              call to find the button — and someone who wants to check the
              arguments first can still open it.
            </p>
            <ApprovalDemo />
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
