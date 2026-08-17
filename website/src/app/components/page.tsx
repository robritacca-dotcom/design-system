import MegaNav from "../../components/MegaNav/MegaNav";
import PageBreadcrumb from "@/components/PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import PageLinks from "../../components/PageLinks/PageLinks";
import ComponentCardGrid from "../../components/ComponentCardGrid/ComponentCardGrid";
import { Button } from "@robr0/design-system/components/Button/Button";
import { SectionTitle } from "@robr0/design-system/components/SectionTitle/SectionTitle";
import {
  componentMetadata,
  componentCategoryMetadata,
} from "@robr0/design-system/components/registry";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./page.module.css";

const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, "/components");

export default function ComponentsPage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Components</h1>
            <PageLinks figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=113-6513" storybookPath="/?path=/docs/components-button--docs" />
          </div>

          {/* Intro */}
          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.subDisplay}>
              Every building block in one place
            </p>
            <p className={styles.introBody}>
              Each component is built on the colour, spacing, and typography tokens from the foundations pages. They all share the same padding rules, focus styles, and sizing conventions so they feel consistent when combined. Jump to a category below, or click into any component to see its variants, states, and sizing options.
            </p>
          </div>

          {/* Category jump links */}
          <nav aria-label="Component categories" className={`${styles.jumpRow} animate-in animate-delay-2`}>
            {componentCategoryMetadata.map((cat) => (
              <Button
                key={cat.id}
                href={`#${cat.id}`}
                label={cat.label}
                variant="tertiary"
                size="compact"
              />
            ))}
          </nav>

          {/* One section per category, cards alphabetical within */}
          <div className={`${styles.categorySections} animate-in animate-delay-2`}>
            {componentCategoryMetadata.map((cat) => (
              <section key={cat.id} id={cat.id} className={styles.categorySection}>
                <div className={styles.categoryHeader}>
                  <SectionTitle
                    title={cat.label}
                    trailing={`${componentMetadata.filter((c) => c.category === cat.id).length}`}
                  />
                  <p className={styles.categoryDescription}>{cat.description}</p>
                </div>
                <ComponentCardGrid
                  components={componentMetadata.filter((c) => c.category === cat.id)}
                />
              </section>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
