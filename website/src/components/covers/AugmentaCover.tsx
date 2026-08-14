import {
  ArrowLeftIcon,
  AugmentaLogo,
  BookIcon,
  BugIcon,
  BuildIcon,
  CheckboxChecked,
  CheckCircleFill,
  ClockIcon,
  DashboardIcon,
  EditIcon,
  EllipsisIcon,
  FolderOpenIcon,
  FolderSmallIcon,
  HomeIcon,
  InfoCircleIcon,
  LeftChevron,
  MinusSquareIcon,
  MoonIcon,
  NodeExpandIcon,
  RadarChartIcon,
  RailChevron,
  RightChevron,
  SisternodeIcon,
  SortIcon,
  SyncIcon12,
  SyncIcon16,
  UpChevronIcon,
  UserIcon,
} from "./augmenta-cover-art";
import styles from "./AugmentaCover.module.css";

/*
 * A literal redraw of the Figma frame "Create study - Desing Rules"
 * (ACP 2024, node 4026:58513) at its native 1440 x 900, wrapped in an SVG
 * viewBox so it scales to any container without a raster step.
 *
 * Everything is hard-coded: no design-system tokens, no design-system
 * components, no behaviour. Geometry, copy and path data come straight from
 * the Figma file, and both palettes are read out of Figma's own variable
 * definitions — the file ships a light frame and a dark frame of this screen,
 * so neither theme is guesswork. (The dark frame's artboard is 820 tall rather
 * than 900; the design inside it is the same.)
 *
 * The one departure the file forces is type: the product sets Open Sans, which
 * the site does not otherwise load. The covers page supplies it through
 * --font-open-sans; anywhere else the stack falls back to the platform UI face.
 */

/** One row of the rule tree: depth, kind and label. */
type TreeRow = { depth: 0 | 1 | 2; label: string; branch: boolean };

const PARTS_TREE: TreeRow[] = [
  { depth: 0, label: "Parts", branch: true },
  { depth: 1, label: "Supports", branch: true },
  { depth: 2, label: "Supports default", branch: false },
  { depth: 2, label: "“Custom Rule”", branch: false },
];

const ROUTING_TREE: TreeRow[] = [
  { depth: 0, label: "Routing", branch: true },
  { depth: 1, label: "Clearance", branch: true },
  { depth: 2, label: "Clearance default", branch: false },
  { depth: 2, label: "“Custom Rule”", branch: false },
  { depth: 1, label: "Spacing", branch: true },
  { depth: 2, label: "Spacing default", branch: false },
  { depth: 2, label: "“Custom Rule”", branch: false },
  { depth: 1, label: "Raceway height", branch: true },
  { depth: 2, label: "Raceway height default", branch: false },
  { depth: 2, label: "“Custom Rule”", branch: false },
  { depth: 1, label: "Support Considerations", branch: true },
  { depth: 2, label: "Support Considerations Default", branch: false },
  { depth: 2, label: "“Custom Rule”", branch: false },
  { depth: 1, label: "Routing through walls", branch: true },
  { depth: 2, label: "Routing through walls", branch: false },
  { depth: 2, label: "“Custom Rule”", branch: false },
];

/** The fourteen rule rows, in the file's order. */
const RULE_ROWS: [string, string, string][] = [
  ["Raceway Default", "Parts", "Supports"],
  ["“Custom Rule”", "Parts", "Supports"],
  ["Clearance default", "Routing", "Clearance"],
  ["“Custom Rule”", "Routing", "Clearance"],
  ["Spacing default", "Routing", "Spacing"],
  ["“Custom Rule”", "Routing", "Spacing"],
  ["Raceway height default", "Routing", "Raceway height"],
  ["“Custom Rule”", "Routing", "Raceway height"],
  ["Raceway height default", "Routing", "Raceway height default"],
  ["“Custom Rule”", "Routing", "Raceway height default"],
  ["Support Considerations…", "Routing", "Support Considerations"],
  ["“Custom Rule”", "Routing", "Support Considerations"],
  ["Routing through walls", "Routing", "Routing through walls"],
  ["“Custom Rule”", "Routing", "Routing through walls"],
];

const COLUMNS = ["Name", "Class", "Type", "Scope", "Actions"];

/** The rule tree's rows, with Ant's connector columns drawn per level. */
function Tree({ rows }: { rows: TreeRow[] }) {
  return (
    <div className={styles.treeGroup}>
      {rows.map((row, index) => (
        <div
          key={`${row.label}-${index}`}
          className={[
            styles.treeRow,
            row.branch ? styles.treeRowBranch : styles.treeRowLeaf,
          ].join(" ")}
        >
          {Array.from({ length: row.depth }, (_, level) => (
            <span
              key={level}
              className={styles.treeIndent}
              style={{ width: 24 }}
            />
          ))}
          {row.branch ? (
            <span className={styles.treeExpander}>
              <MinusSquareIcon />
            </span>
          ) : (
            <span className={styles.treeCheckbox}>
              <CheckboxChecked />
            </span>
          )}
          <span
            className={[
              styles.treeLabel,
              row.branch ? styles.treeLabelBranch : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {row.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** The dark rail down the left edge. Same colours in both themes. */
function Rail() {
  return (
    <div className={styles.rail}>
      <div className={styles.railTop}>
        <div className={styles.railLogo}>
          <AugmentaLogo />
        </div>
        <div className={styles.railGroup}>
          <div className={styles.railItem}>
            <DashboardIcon />
          </div>
          <div className={`${styles.railItem} ${styles.railItemActive}`}>
            <FolderOpenIcon />
          </div>
          <div className={styles.railItem}>
            <BuildIcon />
          </div>
          <div className={styles.railItem}>
            <SisternodeIcon />
          </div>
        </div>
      </div>
      <div className={styles.railGroup} style={{ alignItems: "flex-start" }}>
        <div className={styles.railItem}>
          <MoonIcon />
        </div>
        <div className={styles.railItem}>
          <InfoCircleIcon />
        </div>
        <div className={styles.railItem}>
          <UserIcon />
        </div>
      </div>
      <div className={styles.railFoot}>
        <div className={styles.railFootButton}>
          <RailChevron />
        </div>
      </div>
    </div>
  );
}

/** Breadcrumb, tabs, generation status and the feedback button. */
function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.topLeft}>
        <div className={styles.breadcrumb}>
          <span className={styles.crumb}>
            <span className={`${styles.crumbBadge} ${styles.crumbBadgeX}`}>
              X
            </span>
            Customer X
          </span>
          <span className={styles.crumbSeparator}>/</span>
          <span className={styles.crumb}>
            <FolderSmallIcon />
            Projects
          </span>
          <span className={styles.crumbSeparator}>/</span>
          <span className={`${styles.crumb} ${styles.crumbCurrent}`}>
            <span className={`${styles.crumbBadge} ${styles.crumbBadgeA}`}>
              A
            </span>
            Project Name
          </span>
        </div>
      </div>

      <div className={styles.topMid}>
        <div
          className={`${styles.tab} ${styles.tabActive}`}
          style={{ left: 80.667, width: 78 }}
        >
          <BookIcon />
          Studies
        </div>
        <div className={styles.tab} style={{ left: 190.667, width: 89 }}>
          <NodeExpandIcon />
          Solutions
        </div>
        <div className={styles.tab} style={{ left: 311.667, width: 59 }}>
          <RadarChartIcon />
          Data
        </div>
      </div>

      <div className={styles.topRight}>
        <div className={styles.generating}>
          <span className={styles.generatingIcon}>
            <SyncIcon16 />
          </span>
          Generating
        </div>
        <div className={styles.feedbackButton}>
          <BugIcon />
          Give Feedback
        </div>
      </div>
    </div>
  );
}

/** The Design Rules frame: 1440 x 900, node 4026:58513. */
export function AugmentaDesignRulesCover({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={[styles.cover, className].filter(Boolean).join(" ")}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Augmenta study screen: a design-rule tree beside a table of sixteen generated rules."
    >
      <foreignObject x="0" y="0" width="1440" height="900">
        <div className={styles.stage}>
          <Rail />

          <div className={styles.viewer}>
            <TopBar />

            <div className={styles.main}>
              <div className={styles.content}>
                <div className={styles.studyRow}>
                  <span className={styles.iconButton32}>
                    <ArrowLeftIcon />
                  </span>
                  <span className={styles.studyDot} />
                  <span className={styles.studyName}>Study Name</span>
                  <span
                    className={styles.iconButton32}
                    style={{ marginLeft: 8 }}
                  >
                    <EditIcon />
                  </span>

                  <div className={styles.statusGroup}>
                    <span className={`${styles.tag} ${styles.tagInfo}`}>
                      <SyncIcon12 />
                      Generating
                    </span>
                    <span className={`${styles.tag} ${styles.tagDefault}`}>
                      <ClockIcon />
                      00:01:30
                    </span>
                  </div>

                  <div className={styles.splitButton}>
                    <span className={styles.splitLabel}>View Model</span>
                    <span className={styles.splitIcon}>
                      <EllipsisIcon />
                    </span>
                  </div>
                </div>

                <div className={styles.lower}>
                  <div className={styles.sideMenu}>
                    <div className={styles.studyStep}>
                      <span className={styles.studyStepIcon}>
                        <CheckCircleFill />
                      </span>
                      <span>
                        <p className={styles.studyStepLabel}>Design inputs</p>
                        <p className={styles.studyStepSub}>Validated</p>
                      </span>
                    </div>
                    <div className={styles.studyStep} style={{ marginTop: 8 }}>
                      <span className={styles.studyStepIcon}>
                        <CheckCircleFill />
                      </span>
                      <span>
                        <p className={styles.studyStepLabel}>Site Geometry</p>
                        <p className={styles.studyStepSub}>Validated</p>
                      </span>
                    </div>
                    <div
                      className={`${styles.studyStep} ${styles.studyStepActive}`}
                      style={{ marginTop: 8 }}
                    >
                      <span className={styles.studyStepIcon}>
                        <CheckCircleFill />
                      </span>
                      <span>
                        <p className={styles.studyStepLabel}>Design Rules</p>
                        <p className={styles.studyStepSub}>Validated</p>
                      </span>
                    </div>

                    <div className={styles.submenu}>
                      <div className={styles.submenuTitle}>
                        <span className={styles.submenuTitleLabel}>
                          Optional settings
                        </span>
                        <UpChevronIcon />
                      </div>
                      <div className={styles.submenuList}>
                        <div className={styles.submenuItem}>Generation</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.form}>
                    <div className={styles.rules}>
                      <span className={styles.rulesPill}>
                        <HomeIcon />
                        Design Rules
                      </span>
                      <Tree rows={PARTS_TREE} />
                      <Tree rows={ROUTING_TREE} />
                    </div>

                    <div className={styles.table}>
                      <div className={styles.tableGrid}>
                        {COLUMNS.map((column) => (
                          <div key={column} className={styles.headerCell}>
                            <span className={styles.headerLabel}>{column}</span>
                            {column !== "Actions" && <SortIcon />}
                          </div>
                        ))}
                        {RULE_ROWS.map(([name, ruleClass, type], index) => (
                          <Row
                            key={`${name}-${index}`}
                            name={name}
                            ruleClass={ruleClass}
                            type={type}
                          />
                        ))}
                      </div>

                      <div className={styles.pagination}>
                        <span className={styles.paginationCount}>
                          Displaying 16 of 16 Total Rules
                        </span>
                        <div className={styles.paginationControls}>
                          <span className={styles.pageArrow}>
                            <LeftChevron />
                          </span>
                          <span className={styles.pageNumber}>1</span>
                          <span className={styles.pageArrow}>
                            <RightChevron />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}

/** One table row: a linked name, its class and type, a global scope, a View. */
function Row({
  name,
  ruleClass,
  type,
}: {
  name: string;
  ruleClass: string;
  type: string;
}) {
  return (
    <>
      <div className={styles.cell}>
        <span className={`${styles.cellText} ${styles.cellLink}`}>{name}</span>
      </div>
      <div className={styles.cell}>
        <span className={styles.cellText}>{ruleClass}</span>
      </div>
      <div className={styles.cell}>
        <span className={styles.cellText}>{type}</span>
      </div>
      <div className={styles.cell}>
        <span className={styles.cellText}>Global</span>
      </div>
      <div className={styles.cell}>
        <span className={styles.viewButton}>View</span>
      </div>
    </>
  );
}
