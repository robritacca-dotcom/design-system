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
  SandboxIcon,
  SearchIcon,
  CheckTagIcon,
  CloseTagIcon,
  DownChevron,
  EyeIcon,
  HomeIcon14,
  ListDensityIcon,
  MinusIcon,
  PlusIcon14,
  PullRequestIcon,
  WarningIcon,
  SortIcon,
  SyncIcon12,
  SyncIcon16,
  UpChevronIcon,
  UserIcon,
} from "./augmenta-cover-art";
import { CoverFrame } from "./CoverFrame";
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
function TopBar({
  activeTab = "studies",
  showGenerating = true,
}: {
  activeTab?: "studies" | "solutions";
  showGenerating?: boolean;
}) {
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
          className={[
            styles.tab,
            activeTab === "studies" ? styles.tabActive : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={
            activeTab === "studies"
              ? { left: 80.667, width: 78 }
              : { left: 80.667, width: 76 }
          }
        >
          <BookIcon />
          Studies
        </div>
        <div
          className={[
            styles.tab,
            activeTab === "solutions" ? styles.tabActive : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={
            activeTab === "solutions"
              ? { left: 188.667, width: 91 }
              : { left: 190.667, width: 89 }
          }
        >
          <NodeExpandIcon />
          Solutions
        </div>
        <div className={styles.tab} style={{ left: 311.667, width: 59 }}>
          <RadarChartIcon />
          Data
        </div>
      </div>

      <div className={styles.topRight}>
        {showGenerating && (
          <div className={styles.generating}>
            <span className={styles.generatingIcon}>
              <SyncIcon16 />
            </span>
            Generating
          </div>
        )}
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
    <CoverFrame
      width={1440}
      height={900}
      ground="paper"
      className={className}
      label="The Augmenta study screen: a design-rule tree beside a table of sixteen generated rules."
    >
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
                <span className={styles.iconButton32} style={{ marginLeft: 8 }}>
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
    </CoverFrame>
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

/* ==================================================== Solution List screen */

/** One solution row. The first is still generating, so every value is a dash. */
type SolutionRow = {
  index: number;
  dot: "green" | "blue" | "purple";
  status: "generating" | "success" | "failed";
  values: string[];
};

const DASHES = [
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "- (–%)",
  "- (–%)",
  "-",
  "-",
];

const STANDARD = (qty: string, routed: string) => [
  "08/01/2023 at 11:00AM",
  "500'",
  "50° / 100'",
  qty,
  "1,800°",
  "250",
  "125",
  "100",
  "95 (95%)",
  routed,
  "500 hrs",
  "$500,000",
];

const SOLUTION_ROWS: SolutionRow[] = [
  { index: 1, dot: "green", status: "generating", values: DASHES },
  {
    index: 2,
    dot: "green",
    status: "success",
    values: STANDARD("200", "94 (94%)"),
  },
  {
    index: 3,
    dot: "green",
    status: "success",
    values: STANDARD("1,050", "90 (90%)"),
  },
  {
    index: 4,
    dot: "green",
    status: "success",
    values: STANDARD("200", "90 (90%)"),
  },
  {
    index: 5,
    dot: "green",
    status: "success",
    values: STANDARD("200", "90 (90%)"),
  },
  {
    index: 6,
    dot: "green",
    status: "success",
    values: STANDARD("200", "90 (90%)"),
  },
  {
    index: 1,
    dot: "blue",
    status: "success",
    values: STANDARD("200", "90 (90%)"),
  },
  {
    index: 2,
    dot: "blue",
    status: "success",
    values: STANDARD("200", "90 (90%)"),
  },
  {
    index: 3,
    dot: "blue",
    status: "failed",
    values: STANDARD("200", "90 (90%)"),
  },
  {
    index: 4,
    dot: "blue",
    status: "failed",
    values: STANDARD("200", "90 (90%)"),
  },
  {
    index: 1,
    dot: "purple",
    status: "failed",
    values: STANDARD("200", "90 (90%)"),
  },
  {
    index: 2,
    dot: "purple",
    status: "failed",
    values: STANDARD("200", "90 (90%)"),
  },
];

/** Group header spans, in column order. */
const GROUPS: [string, number][] = [
  ["Solution", 4],
  ["Conduit", 1],
  ["Bends", 3],
  ["Junctions", 2],
  ["Run ID", 3],
  ["Estimates", 2],
  ["Actions", 1],
];

const SUB_HEADERS = [
  "#",
  "Study",
  "Status",
  "Generated",
  "Length",
  "° / foot",
  "QTY",
  "Ttl. Angle",
  "Bodies",
  "Boxes",
  "Lin…",
  "Validated",
  "Routed",
  "Const. time",
  "Cost",
];

const STATUS_TAG = {
  generating: { label: "Generating", className: "tagInfo" },
  success: { label: "Success", className: "tagSuccess" },
  failed: { label: "Failed", className: "tagError" },
} as const;

/** The Solution List frame: the 1440 x 900 artboard, node 4026:61958. */
export function AugmentaSolutionListCover({
  className,
}: {
  className?: string;
}) {
  return (
    <CoverFrame
      width={1440}
      height={900}
      ground="paper"
      className={className}
      label="The Augmenta solutions table: twelve generated solutions with their conduit, bend, junction and cost estimates."
    >
      <div className={`${styles.stage} ${styles.stageList}`}>
        <Rail />

        <div className={styles.viewer}>
          <TopBar activeTab="solutions" />

          <div className={styles.main}>
            <div className={styles.frame17}>
              <div className={styles.toolbar}>
                <div className={styles.search}>
                  <span className={styles.searchLabel}>Search</span>
                  <SearchIcon />
                </div>
                <div className={styles.toolbarRight}>
                  <span className={styles.squareButton}>
                    <ListDensityIcon />
                  </span>
                  <span className={styles.segmentGroup}>
                    <span
                      className={`${styles.segment} ${styles.segmentActive}`}
                    >
                      Table
                    </span>
                    <span className={styles.segment}>Chart</span>
                  </span>
                  <span
                    className={`${styles.pillButton} ${styles.filterButton}`}
                  >
                    Filter Studies
                    <DownChevron />
                  </span>
                  <span
                    className={`${styles.pillButton} ${styles.viewModelButton}`}
                  >
                    <SandboxIcon />
                    View Model
                  </span>
                </div>
              </div>

              <div className={styles.listTable}>
                <div className={styles.listGrid}>
                  {GROUPS.map(([label, span]) => (
                    <div
                      key={label}
                      className={styles.groupHeader}
                      style={{ gridColumn: `span ${span}` }}
                    >
                      {label}
                    </div>
                  ))}

                  {SUB_HEADERS.map((label) => (
                    <div key={label} className={styles.headerCell}>
                      <span className={styles.headerLabel}>{label}</span>
                      <SortIcon />
                    </div>
                  ))}
                  <div className={styles.headerCell} />

                  {SOLUTION_ROWS.map((row, rowIndex) => {
                    const tag = STATUS_TAG[row.status];
                    return (
                      <SolutionRowCells
                        key={rowIndex}
                        row={row}
                        tagLabel={tag.label}
                        tagClass={styles[tag.className]}
                      />
                    );
                  })}
                </div>

                <div className={styles.listPagination}>
                  <span className={styles.listPaginationCount}>
                    Displaying 12 of 12 Total Solutions
                  </span>
                  <div className={styles.listPaginationControls}>
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
    </CoverFrame>
  );
}

/** The sixteen cells of one solution row. */
function SolutionRowCells({
  row,
  tagLabel,
  tagClass,
}: {
  row: SolutionRow;
  tagLabel: string;
  tagClass: string;
}) {
  const dotColour = {
    green: "var(--acp-dot-green)",
    blue: "var(--acp-dot-blue)",
    purple: "var(--acp-dot-purple)",
  }[row.dot];

  return (
    <>
      <div className={styles.listCell}>{row.index}</div>
      <div className={styles.listCell}>
        <span className={styles.dot} style={{ background: dotColour }} />
        Study name
      </div>
      <div className={styles.listCell}>
        <span className={`${styles.tag} ${tagClass}`}>
          {row.status === "generating" && <SyncIcon12 />}
          {row.status === "success" && <CheckTagIcon />}
          {row.status === "failed" && <CloseTagIcon />}
          {tagLabel}
        </span>
      </div>
      {row.values.map((value, index) => (
        <div
          key={index}
          className={[styles.listCell, index > 0 ? styles.listCellRight : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {value}
        </div>
      ))}
      <div className={styles.listCell}>
        <span className={styles.openButton}>
          <span
            className={[
              styles.openLabel,
              row.status === "generating" ? styles.openLabelDisabled : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            Open
          </span>
          <span className={styles.openIcon}>
            <EllipsisIcon />
          </span>
        </span>
      </div>
    </>
  );
}

/* ======================================================== Solution viewer */

/** The isometric orientation gizmo. Three skewed faces, a highlighted corner. */
function OrientationCube() {
  return (
    <div className={styles.cube}>
      <div className={`${styles.cubeFace} ${styles.cubeTop}`}>
        <span className={styles.cubeTopInner}>
          <span className={styles.cubePlate} />
        </span>
      </div>
      <div className={`${styles.cubeFace} ${styles.cubeLeft}`}>
        <span className={styles.cubeLeftInner}>
          <span className={styles.cubePlate} />
        </span>
      </div>
      <div className={`${styles.cubeFace} ${styles.cubeRight}`}>
        <span className={styles.cubeRightInner}>
          <span className={styles.cubePlate} />
        </span>
      </div>

      <div className={`${styles.cubeFace} ${styles.cubeCornerTop}`}>
        <span className={styles.cubeTopInner}>
          <span className={styles.cubeCorner} />
        </span>
      </div>
      <div className={`${styles.cubeFace} ${styles.cubeCornerLeft}`}>
        <span className={styles.cubeLeftInner}>
          <span className={styles.cubeCorner} />
        </span>
      </div>
      <div className={`${styles.cubeFace} ${styles.cubeCornerRight}`}>
        <span className={styles.cubeRightInner}>
          <span className={styles.cubeCorner} />
        </span>
      </div>

      <div className={`${styles.cubeFace} ${styles.cubeTop}`}>
        <span className={styles.cubeTopInner}>
          <span className={styles.cubeOutline} />
        </span>
      </div>
      <div className={`${styles.cubeFace} ${styles.cubeLeft}`}>
        <span className={styles.cubeLeftInner}>
          <span className={styles.cubeOutline} />
        </span>
      </div>
      <div className={`${styles.cubeFace} ${styles.cubeRight}`}>
        <span className={styles.cubeRightInner}>
          <span className={styles.cubeOutline} />
        </span>
      </div>

      <div className={`${styles.cubeFace} ${styles.cubeLabelTop}`}>
        <span className={styles.cubeTopInner}>
          <span className={styles.cubeLabel}>TOP</span>
        </span>
      </div>
      <div className={`${styles.cubeFace} ${styles.cubeLabelFront}`}>
        <span className={styles.cubeLeftInner}>
          <span className={styles.cubeLabel}>FRONT</span>
        </span>
      </div>
      <div className={`${styles.cubeFace} ${styles.cubeLabelRight}`}>
        <span className={styles.cubeRightInner}>
          <span className={styles.cubeLabel}>RIGHT</span>
        </span>
      </div>
    </div>
  );
}

/** The Solution viewer frame: 1440 x 900, node 4026:61305. */
export function AugmentaSolutionCover({ className }: { className?: string }) {
  return (
    <CoverFrame
      width={1440}
      height={900}
      ground="paper"
      className={className}
      label="The Augmenta 3D viewer: a wireframe building model with a generated conduit route running through it."
    >
      <div className={styles.stage}>
        <Rail />

        <div className={styles.viewer}>
          <TopBar activeTab="solutions" showGenerating={false} />

          <div className={styles.viewerMain}>
            <div className={styles.contextBar}>
              <div className={styles.contextLeft}>
                <span className={styles.iconButton32}>
                  <ArrowLeftIcon />
                </span>
                <span className={styles.solutionDot} />
                <span className={styles.solutionName}>
                  Coordination model v1
                </span>
                <span className={`${styles.tag} ${styles.tagDefault}`}>
                  Solution #1
                </span>
              </div>
              <div className={styles.contextRight}>
                <span className={styles.squareButton24}>
                  <InfoCircleIcon />
                </span>
                <span className={styles.squareButton24}>
                  <PullRequestIcon />
                </span>
                <span className={styles.squareButton24}>
                  <EyeIcon />
                </span>
                <span className={styles.squareButton24}>
                  <WarningIcon />
                </span>
                <span className={`${styles.pillButton} ${styles.exportButton}`}>
                  Export
                  <DownChevron />
                </span>
              </div>
            </div>

            <div className={styles.viewport}>
              {/* eslint-disable-next-line @next/next/no-img-element -- next/image cannot render inside an SVG foreignObject, and both renders are fixed-size static assets. */}
              <img
                className={`${styles.render} ${styles.renderLight}`}
                src="/covers/augmenta-solution-light.webp"
                alt=""
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- as above; this is the dark render that cross-fades in. */}
              <img
                className={`${styles.render} ${styles.renderDark}`}
                src="/covers/augmenta-solution-dark.webp"
                alt=""
              />

              <div className={styles.viewportControls}>
                <div className={styles.viewportLeft}>
                  <span className={styles.ghostButton24}>
                    <HomeIcon14 />
                  </span>
                  <OrientationCube />
                </div>
                <div className={styles.viewportMid}>
                  <div className={styles.zoomWrap}>
                    <span className={styles.zoom}>
                      <span className={styles.ghostButton24}>
                        <MinusIcon />
                      </span>
                      100%
                      <span className={styles.ghostButton24}>
                        <PlusIcon14 />
                      </span>
                    </span>
                  </div>
                </div>
                <div className={styles.viewportRight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CoverFrame>
  );
}
