import MegaNav from "../MegaNav/MegaNav";
import PageBreadcrumb from "../PageBreadcrumb/PageBreadcrumb";
import Sidebar from "../Sidebar/Sidebar";
import ComponentCardGrid from "../ComponentCardGrid/ComponentCardGrid";
import { Button } from "@robr0/design-system/components/Button/Button";
import {
  componentMetadata,
  componentCategoryMetadata,
} from "@robr0/design-system/components/registry";
import { getSidebarLinks, componentsSidebarLinks } from "@/config/navigation";
import styles from "./ComponentCategoryPage.module.css";

interface ComponentCategoryPageProps {
  /** Registry category id — the /components/<id> route segment */
  id: string;
}

/**
 * The shared body of every /components/<category> landing page. Label,
 * description, and member list all come from the registry, so the nine
 * route folders stay three-line shells.
 */
export default function ComponentCategoryPage({ id }: ComponentCategoryPageProps) {
  const category = componentCategoryMetadata.find((cat) => cat.id === id);
  if (!category) {
    throw new Error(`ComponentCategoryPage: no category registered with id "${id}".`);
  }
  const members = componentMetadata.filter((c) => c.category === id);
  const { sidebarLinks } = getSidebarLinks(componentsSidebarLinks, `/components/${id}`);

  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <Sidebar links={sidebarLinks} searchable />

        <main className={styles.dsContent} id="main-content">
          <PageBreadcrumb />
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>{category.label}</h1>
          </div>

          <div className={`${styles.introSection} animate-in animate-delay-1`}>
            <p className={styles.introBody}>
              {`${category.description} ${members.length} of the library's components live here.`}
            </p>
          </div>

          <div className="animate-in animate-delay-2">
            <ComponentCardGrid components={members} />
          </div>

          <div className={`${styles.backRow} animate-in animate-delay-2`}>
            <Button
              href={`/components#${id}`}
              label="All components"
              variant="tertiary"
              size="compact"
              iconLeft="arrow_back"
            />
          </div>
        </main>
      </div>
    </>
  );
}
