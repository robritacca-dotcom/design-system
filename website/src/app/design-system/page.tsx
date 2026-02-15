"use client";

import Image from "next/image";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import TocCard from "../../components/TocCard/TocCard";
import styles from "./page.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "#", label: "Work", disabled: true },
  { href: "/design-system", label: "robr0 DS", active: true },
];

const sidebarLinks = [
  { href: "/design-system", label: "About", active: true },
  { href: "/design-system/buttons", label: "Buttons" },
  { href: "/design-system/icons", label: "Icons" },
  { href: "/design-system/logos", label: "Logos" },
  { href: "/design-system/navigation", label: "Navigation" },
  { href: "/design-system/colour-primitives", label: "Primitive Colours" },
  { href: "/design-system/colour-mode", label: "Semantic Colours" },
  { href: "/design-system/spatial", label: "Semantic Spacing" },
  { href: "/design-system/typography", label: "Typography" },
];

const subnavLinks = sidebarLinks.map((l) => ({
  href: l.href,
  label: l.label,
  active: l.active,
}));

export default function DesignSystemPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <BlurBackground />

      <Header navLinks={navLinks} subnavLinks={subnavLinks} />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} />

        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <h1 className={`${styles.pageTitle} animate-in`}>robr0DS</h1>

          {/* Page Description */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            This site is rendered directly from its own design system, exposing
            the tokens and structure used to build the UI itself.
          </p>

          {/* Tokens Section */}
          <section className={`${styles.section} animate-in animate-delay-2`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Tokens</h2>
            </div>
            <p className={styles.sectionDescription}>
              Tokens are the underlying values the site runs on. They are used
              everywhere layout, color, and type appear. Instead of styling
              elements directly, everything references these shared variables so
              changes propagate consistently. The same token structure exists in
              Figma and in code, allowing updates to flow through without
              reinterpreting intent.
            </p>

            <div className={styles.tocGrid}>
              {/* Semantic Colours */}
              <TocCard href="/design-system/colour-mode" title="Semantic Colours">
                <div className={`${styles.colourWheel} ${styles.colourWheelMode}`} />
              </TocCard>

              {/* Primitive Colours */}
              <TocCard href="/design-system/colour-primitives" title="Primitive Colours">
                <div className={styles.colourWheel} />
              </TocCard>

              {/* Semantic Spacing */}
              <TocCard href="/design-system/spatial" title="Semantic Spacing">
                <div className={`${styles.circlePreview} ${styles.circleGreen}`}>
                  <div className={styles.spatialBox} />
                  <span className={styles.spatialLabel}>XXL</span>
                  <span className={styles.spatialValue}>60px</span>
                </div>
              </TocCard>

              {/* Typography */}
              <TocCard href="/design-system/typography" title="Typography">
                <div className={`${styles.circlePreview} ${styles.circleBlue}`}>
                  <span className={styles.typographyLightA}>A</span>
                  <span className={styles.typographyBoldA}>A</span>
                </div>
              </TocCard>
            </div>
          </section>

          {/* Components Section */}
          <section className={`${styles.section} animate-in animate-delay-3`}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Components</h2>
            </div>
            <p className={styles.sectionDescription}>
              Components are assembled from tokens and shared layout structures.
              When a pattern appears more than once, it becomes a reusable
              component instead of a custom layout. Each component reflects how
              it is actually implemented, including structure, constraints, and
              states. Layout primitives handle structure, while components handle
              interaction and composition.
            </p>

            <div className={styles.tocGrid}>
              {/* Buttons */}
              <TocCard href="/design-system/buttons" title="Buttons">
                <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ flexDirection: "column", gap: "10px" }}>
                  <span className={styles.btnPreview} style={{ border: `2px solid var(--color-core-ui-secondary)` }}>
                    Button
                  </span>
                  <span className={styles.btnPreview} style={{ background: "var(--color-action-primary-bg-hover)", border: `1px solid var(--color-core-ui-secondary)` }}>
                    Button
                  </span>
                  <span className={styles.btnPreview} style={{ border: `2px solid var(--color-core-ui-secondary)`, opacity: 0.4 }}>
                    Button
                  </span>
                </div>
              </TocCard>

              {/* Navigation */}
              <TocCard href="/design-system/navigation" title="Navigation">
                <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "20px" }}>
                  <Image src="/rr.svg" alt="robr0" width={24} height={24} />
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.16px" }}>
                    robr0
                  </span>
                </div>
              </TocCard>

              {/* Icons */}
              <TocCard href="/design-system/icons" title="Icons">
                <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "10px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "var(--color-text-secondary)" }}>
                    home
                  </span>
                  <span className="material-symbols-outlined icon-filled" style={{ fontSize: "48px", color: "var(--color-text-secondary)" }}>
                    home
                  </span>
                </div>
              </TocCard>

              {/* Logos */}
              <TocCard href="/design-system/logos" title="Logos">
                <div className={`${styles.circlePreview} ${styles.circleDashed}`} style={{ gap: "10px" }}>
                  <Image src="/rr.svg" alt="robr0 Logo" width={48} height={48} />
                  <Image src="/rr.svg" alt="robr0 Logo" width={72} height={72} />
                </div>
              </TocCard>
            </div>
          </section>

          {/* Story Section */}
          <section className={`${styles.section} animate-in animate-delay-4`}>
            <div className={styles.storyLayout}>
              {/* Story Content */}
              <div className={styles.storyContent}>
                <div className={styles.contentSection}>
                  <div className={styles.contentSectionHeader}>
                    <h3 className={styles.contentSectionTitle}>
                      Design to Code Workflow
                    </h3>
                  </div>
                  <div className={styles.contentSectionBody}>
                    <p>
                      Design work flows directly into implementation. Layout
                      structure, spacing, and variables are read from the design
                      source and used to construct the UI without
                      reinterpretation. Tokens become CSS custom properties.
                      Components map to shared class structures. Layout behavior
                      follows the same hierarchy defined in design. This keeps
                      the rendered site aligned with the system it documents.
                    </p>
                  </div>
                </div>

                <div className={styles.contentSection}>
                  <div className={styles.contentSectionHeader}>
                    <h3 className={styles.contentSectionTitle}>Outcome</h3>
                  </div>
                  <div className={styles.contentSectionBody}>
                    <p>
                      This system is both the subject and the output. The site is
                      built using the same tokens, components, and structures it
                      documents, so the implementation reflects the decisions
                      being described.
                    </p>
                    <p>
                      What this shows is how I approach system design in
                      practice: defining clear layers, separating intent from
                      implementation, and using constraints to make change
                      predictable. Rather than treating design artifacts as
                      static documentation, I treat them as inputs to a working
                      system.
                    </p>
                    <p>
                      The goal is not polish or completeness, but clarity. To
                      make the structure visible. To show how decisions connect
                      across design and code. And to demonstrate how a small,
                      well defined set of primitives can support real interfaces
                      without becoming rigid or over abstracted.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tools Sidebar */}
              <div className={styles.storySidebar}>
                <h3 className={styles.storySidebarTitle}>Tools used</h3>
                <div className={styles.toolsList}>
                  <div className={styles.toolItem}>
                    <Image src="/logos/Figma.svg" alt="Figma" width={28} height={28} className={styles.toolLogo} />
                    <div className={styles.toolDetails}>
                      <span className={styles.toolName}>Figma</span>
                      <span className={styles.toolDesc}>
                        Design source of truth, MCP server and tokens (variable
                        collections)
                      </span>
                    </div>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/cursor.svg" alt="Cursor" width={28} height={28} className={styles.toolLogo} />
                    <div className={styles.toolDetails}>
                      <span className={styles.toolName}>Cursor</span>
                      <span className={styles.toolDesc}>
                        AI Agent and core development tool
                      </span>
                    </div>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/ChatGPT.svg" alt="ChatGPT" width={28} height={28} className={styles.toolLogo} />
                    <div className={styles.toolDetails}>
                      <span className={styles.toolName}>ChatGPT</span>
                      <span className={styles.toolDesc}>Content writing</span>
                    </div>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/Claude.svg" alt="Claude" width={28} height={28} className={styles.toolLogo} />
                    <div className={styles.toolDetails}>
                      <span className={styles.toolName}>Claude Opus 4.5</span>
                      <span className={styles.toolDesc}>
                        AI Model powering Cursor
                      </span>
                    </div>
                  </div>
                  <div className={styles.toolItem}>
                    <Image src="/logos/GoDaddy.svg" alt="GoDaddy" width={28} height={28} className={styles.toolLogo} />
                    <div className={styles.toolDetails}>
                      <span className={styles.toolName}>GoDaddy</span>
                      <span className={styles.toolDesc}>
                        Web hosting and domain
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
