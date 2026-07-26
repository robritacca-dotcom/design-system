"use client";

import React from "react";
import MegaNav from "../../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Dialog } from "@robr0/design-system/components/Dialog/Dialog";
import { Button } from "@robr0/design-system/components/Button/Button";
import { Input } from "@robr0/design-system/components/Input/Input";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components/dialog");

export default function DialogPage() {
  const [defaultOpen, setDefaultOpen] = React.useState(false);
  const [footerOpen, setFooterOpen] = React.useState(false);
  const [smallOpen, setSmallOpen] = React.useState(false);
  const [largeOpen, setLargeOpen] = React.useState(false);
  const [lockedOpen, setLockedOpen] = React.useState(false);
  const [scrollOpen, setScrollOpen] = React.useState(false);

  return (
    <>
      <BlurBackground />
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Dialog</h1>
            <PageLinks
              storybookPath="/?path=/docs/components-dialog--docs"
            />
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              A modal surface for focused tasks
            </p>
            <p className={styles.introBody}>
              A general-purpose modal that holds arbitrary content — forms,
              settings, previews — with an optional footer for actions. It
              traps focus, restores it on close, locks page scroll, and
              dismisses via ESC, backdrop click, or the close button. For
              simple confirm-or-cancel prompts, use AlertDialog instead.
            </p>
          </div>

          {/* Default */}
          <section className={styles.section}>
            <SectionTitle title="Default" />
            <div className={styles.demoRow}>
              <Button
                label="Open dialog"
                priority="secondary"
                onClick={() => setDefaultOpen(true)}
              />
            </div>
            <Dialog
              open={defaultOpen}
              onOpenChange={setDefaultOpen}
              title="Edit profile"
              description="Changes are saved when you press Save."
            >
              <p className={styles.dialogText}>
                Any content can live in the dialog body — forms, text, lists,
                or other components from the system.
              </p>
            </Dialog>
          </section>

          {/* With footer */}
          <section className={styles.section}>
            <SectionTitle title="With footer" />
            <div className={styles.demoRow}>
              <Button
                label="Rename project"
                priority="secondary"
                onClick={() => setFooterOpen(true)}
              />
            </div>
            <Dialog
              open={footerOpen}
              onOpenChange={setFooterOpen}
              title="Rename project"
              footer={
                <>
                  <Button
                    label="Cancel"
                    priority="tertiary"
                    onClick={() => setFooterOpen(false)}
                  />
                  <Button
                    label="Save"
                    priority="primary"
                    onClick={() => setFooterOpen(false)}
                  />
                </>
              }
            >
              <Input label="Project name" placeholder="design-system" />
            </Dialog>
          </section>

          {/* Sizes */}
          <section className={styles.section}>
            <SectionTitle title="Sizes" />
            <div className={styles.demoRow}>
              <Button
                label="Small (400px)"
                priority="secondary"
                onClick={() => setSmallOpen(true)}
              />
              <Button
                label="Large (720px)"
                priority="secondary"
                onClick={() => setLargeOpen(true)}
              />
            </div>
            <Dialog
              open={smallOpen}
              onOpenChange={setSmallOpen}
              title="Small dialog"
              size="sm"
            >
              <p className={styles.dialogText}>
                A narrow panel for short messages.
              </p>
            </Dialog>
            <Dialog
              open={largeOpen}
              onOpenChange={setLargeOpen}
              title="Large dialog"
              size="lg"
            >
              <p className={styles.dialogText}>
                A wide panel for richer content like tables, previews, or
                multi-column forms.
              </p>
            </Dialog>
          </section>

          {/* Non-dismissible */}
          <section className={styles.section}>
            <SectionTitle title="Non-dismissible" />
            <div className={styles.demoRow}>
              <Button
                label="Open locked dialog"
                priority="secondary"
                onClick={() => setLockedOpen(true)}
              />
            </div>
            <Dialog
              open={lockedOpen}
              onOpenChange={setLockedOpen}
              title="Action required"
              description="This dialog only closes through the footer action."
              dismissible={false}
              footer={
                <Button
                  label="Acknowledge"
                  priority="primary"
                  onClick={() => setLockedOpen(false)}
                />
              }
            >
              <p className={styles.dialogText}>
                ESC, backdrop clicks, and the close button are disabled.
              </p>
            </Dialog>
          </section>

          {/* Scrolling body */}
          <section className={styles.section}>
            <SectionTitle title="Scrolling body" />
            <div className={styles.demoRow}>
              <Button
                label="Open long dialog"
                priority="secondary"
                onClick={() => setScrollOpen(true)}
              />
            </div>
            <Dialog
              open={scrollOpen}
              onOpenChange={setScrollOpen}
              title="Terms of service"
              description="The body scrolls while the header stays pinned."
            >
              {Array.from({ length: 12 }, (_, i) => (
                <p key={i} className={styles.dialogText}>
                  Section {i + 1}. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Integer posuere erat a ante venenatis
                  dapibus posuere velit aliquet. Cras mattis consectetur purus
                  sit amet fermentum.
                </p>
              ))}
            </Dialog>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
