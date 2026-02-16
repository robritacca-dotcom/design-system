"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import { Textarea } from "@design-system/components/Textarea/Textarea";
import PageLinks from "../../../components/PageLinks/PageLinks";
import { getNavLinks, getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";
const navLinks = getNavLinks("Components");
const { sidebarLinks, subnavLinks } = getSidebarLinks(componentsSidebarLinks, "/components/textarea");

export default function TextareaPage() {
  return (
    <>
      <BlurBackground />
      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Textarea</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26"
              storybookPath="/?path=/docs/components-textarea--docs"
            />
          </div>

          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            Multi-line text field for longer content like descriptions, comments, and messages. Includes an optional character counter and resize handle. Use Input instead when the value fits on a single line.
          </p>

          {/* Default */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Default</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <Textarea label="Placeholder" placeholder="Enter a description..." onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Textarea label="With value" value="Design systems engineer passionate about tokens, components, and scalable UI architecture." onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Textarea label="Required" placeholder="Add your comments..." required onChange={() => {}} />
              </div>
            </div>
          </section>

          {/* Compact */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Compact</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <Textarea label="Placeholder" placeholder="Enter a description..." size="compact" rows={3} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Textarea label="With value" value="Compact textarea with smaller text and tighter padding." size="compact" rows={3} onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Textarea label="Required" placeholder="Add your comments..." required size="compact" rows={3} onChange={() => {}} />
              </div>
            </div>
          </section>

          {/* States */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>States</h2>
            </div>
            <div className={styles.variantRow}>
              <div className={styles.variantItem}>
                <Textarea label="Helper text" placeholder="Tell us what you think..." helperText="Your feedback helps us improve" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Textarea label="Character counter" placeholder="What's happening?" maxLength={280} value="Building a design system" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Textarea label="Error" value="Too short" error helperText="Description must be at least 50 characters" onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Textarea label="Disabled" value="This field is not editable" disabled onChange={() => {}} />
              </div>
              <div className={styles.variantItem}>
                <Textarea label="No resize" placeholder="Cannot be resized..." resize="none" rows={3} onChange={() => {}} />
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
