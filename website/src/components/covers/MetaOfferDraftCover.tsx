import {
  AccountSwitcher,
  AddComment,
  AppFacebookCircle,
  BarChartDeprecated,
  BeakerDeprecated,
  BellDeprecated,
  BugDeprecated,
  CardPerson,
  CheckmarkCircle,
  CloseX,
  CompensationTabIcon,
  Document,
  DollarCircle,
  EventAvailable,
  MagnifyingGlassDeprecated,
  NavigationMore,
  Notes,
  OfferStepIcon,
  ProfileCircle,
  QuestionCircleDeprecated,
  RadioDot,
  TriangleDown,
} from "./meta-recruiter-cover-art";
import styles from "./MetaOfferDraftCover.module.css";

/*
 * A literal redraw of the Figma frame "Custom offer proposal" (robr0-ds26,
 * node 931:2105) at its native 1513.125 x 1076, wrapped in an SVG viewBox so
 * it scales to any container without a raster step.
 *
 * This is the recruiter-facing product, and it shares nothing with the
 * candidate-facing offer summary beside it — different typeface, different
 * component library, different chrome — so the two covers are separate
 * components rather than variants of one.
 *
 * Everything is hard-coded: no design-system tokens, no design-system
 * components, no behaviour. Geometry, copy and path data come straight from
 * the file, including its fractional sizes (the artboard was pasted at 1.0508
 * of its drawn size, so 16px reads as 16.813 and 1px borders as 1.051).
 *
 * Three departures. Facebook's icon set exports each glyph as several
 * separate fills and strokes; those are reproduced with the file's own
 * percentage insets in meta-recruiter-cover-art.tsx. The two avatars are
 * photographic and have no vector to trace, so they are embedded as small
 * WebP. And the frame ships light only, so the dark palette is a derivation
 * from Facebook's own dark surfaces.
 */

const TABS = [
  "Considerations",
  "Engagements",
  "Workplace Activities",
  "Talent pools & tags",
  "Resume",
  "Transcript",
  "More",
];

/** The engagement feed, in the file's order. */
const ENGAGEMENTS: {
  badge: "event" | "comment" | "notes";
  colour: string;
  lead: string;
  link?: string;
  tail?: string;
  body?: string;
}[] = [
  {
    badge: "event",
    colour: "#6bcebb",
    lead: "Brianna Zeilger",
    link: " created an Offer Draft for ",
    tail: "Designer (New York, NY)",
  },
  {
    badge: "comment",
    colour: "#8a7be8",
    lead: "Brianna Zeilger",
    link: " added a comment",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper diam eget nisl ut ullamcorper egestas. Fusce ultrices mattis leo, non aliquet justo aliquam accumsan quis.",
  },
  {
    badge: "comment",
    colour: "#8a7be8",
    lead: "Brianna Zeilger",
    link: " added a comment",
    body: "Duis urna dui, bibendum at vestibulum et, pretium a velit.",
  },
  {
    badge: "notes",
    colour: "#6bcebb",
    lead: "Brianna Zeilger",
    link: " added prescreen notes",
    body: "Quisque fermentum lacus eget placerat luctus. Donec sodales, tellus id  feugiat eleifend, risus dolor fermentum lorem, quis rhoncus turpis  sapien sed nisl. Duis lacinia eros quis lectus aliquam tempor eget vitae  lacus.",
  },
];

/** The compensation calculator's six rows. */
const COMP_ROWS: {
  label: string;
  standard: string;
  max: string;
  proposal: string;
  input?: "error" | "muted" | "plain";
}[] = [
  {
    label: "Base salary",
    standard: "$200,000",
    max: "$240,000",
    proposal: "$240,...",
    input: "error",
  },
  {
    label: "Performance bonus",
    standard: "20.00%",
    max: "20.00%",
    proposal: "20.00%",
    input: "muted",
  },
  {
    label: "Sign-on bonus",
    standard: "$0.00",
    max: "$60,000",
    proposal: "$0.00",
    input: "plain",
  },
  {
    label: "Equity",
    standard: "$400,000",
    max: "$800,000",
    proposal: "$400,000",
    input: "plain",
  },
  {
    label: "Year 1 Equity",
    standard: "$100,000",
    max: "$200,000",
    proposal: "$100,000",
  },
  {
    label: "Year 1 TTC",
    standard: "$340,000",
    max: "$548,200",
    proposal: "$340,000",
  },
];

/** A stack of one column's cells, so the table reads column-by-column. */
function CalcColumn({
  width,
  group,
  header,
  children,
}: {
  width: number;
  group?: string;
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.calcColumn} style={{ width }}>
      <div className={styles.calcGroupHeader}>{group ?? " "}</div>
      <div className={styles.calcHeader}>{header}</div>
      {children}
    </div>
  );
}

/** The Offer Draft frame: 1513.125 x 1076, node 931:2105. */
export function MetaOfferDraftCover({ className }: { className?: string }) {
  return (
    <svg
      className={[styles.cover, className].filter(Boolean).join(" ")}
      viewBox="0 0 1513.125 1076"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Meta's recruiter tool: a candidate profile beside an offer draft panel with a compensation calculator."
    >
      <foreignObject x="0" y="0" width="1513.125" height="1076">
        <div className={styles.stage}>
          {/* ------------------------------------------------- top nav */}
          <div className={styles.nav}>
            <span className={styles.navLogo}>
              <AppFacebookCircle />
            </span>
            <span className={styles.navHome}>
              <NavigationMore />
              FBR Home
            </span>
            <div className={styles.navRight}>
              <span className={styles.navUser}>
                <AccountSwitcher />
                Recruiter
              </span>
              <BeakerDeprecated />
              <BellDeprecated />
              <QuestionCircleDeprecated />
              <BugDeprecated />
              <BarChartDeprecated />
              <span className={styles.navSearch}>
                Search for candidates by name, email or phone number
                <MagnifyingGlassDeprecated />
              </span>
            </div>
          </div>

          <div className={styles.content}>
            {/* ------------------------------------------ candidate */}
            <div className={styles.main}>
              <div className={styles.columnHeader}>
                <div className={styles.recruiter}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- next/image cannot render inside an SVG foreignObject; this is a fixed-size static asset. */}
                  <img
                    className={styles.avatar}
                    src="/covers/meta-fbr-recruiter.webp"
                    alt=""
                  />
                  <span>
                    <p className={styles.recruiterName}>Brianna Zeilger</p>
                    <p className={styles.recruiterRole}>Owner</p>
                  </span>
                </div>
                <div className={styles.headerActions}>
                  <span className={styles.button}>Release</span>
                  <span className={styles.button}>Share</span>
                  <span className={styles.button}>Scour</span>
                  <span className={styles.button}>Add to Pool</span>
                </div>
              </div>

              <div className={styles.candidate}>
                <div className={styles.info}>
                  <div className={styles.infoTop}>
                    <div className={styles.recruiter}>
                      <p className={styles.candidateName}>Reinardus Chan</p>
                      <span className={styles.criteriaPill}>
                        <CheckmarkCircle />
                        Meets criteria
                      </span>
                    </div>
                    <div className={styles.headerActions}>
                      <span className={styles.button}>LinkedIn</span>
                      <span className={styles.button}>Edit</span>
                      <span className={styles.button}>
                        Create Resume Review
                      </span>
                      <span className={styles.button}>Email candidate</span>
                    </div>
                  </div>

                  <div className={styles.metaRow}>
                    reinardus.chain@gmail.com
                    <span className={styles.infoDot} />
                    <span>•</span>
                    +1 (222) 410-1067
                    <span className={styles.infoDot} />
                    <span>•</span>
                    <span className={styles.metaMuted}>
                      Los Angeles, California, United States
                    </span>
                    <span className={styles.infoDot} />
                  </div>

                  <div className={styles.metaRow}>
                    Alabama a&amp;m University
                    <span className={styles.infoDot} />
                  </div>

                  <div className={styles.metaRow}>
                    <span>
                      Offer drafted{" "}
                      <span className={styles.metaLink}>13 days ago</span>
                    </span>
                    <span>•</span>
                    <span>
                      Interviewed{" "}
                      <span className={styles.metaLink}>26 days ago</span>
                    </span>
                    <span>•</span>
                    <span>
                      Prescreened{" "}
                      <span className={styles.metaLink}>26 days ago</span>
                    </span>
                  </div>

                  <div className={styles.metaRow}>
                    <span className={styles.metaSmall}>
                      No online applicaitons
                    </span>
                    <span>•</span>
                    <span className={styles.metaSmall}>No referrals</span>
                  </div>

                  <div className={styles.toast}>
                    <span className={styles.toastBar} />
                    <div className={styles.toastCard}>
                      <div className={styles.toastBody}>
                        <div className={styles.toastTitleRow}>
                          <span className={styles.toastCheck} />
                          <p className={styles.toastTitle}>
                            Vaccination questions &amp; guidance
                          </p>
                        </div>
                        <p className={styles.toastText}>
                          Recruiters should inform candidates of our mandatory
                          vaccination policy but should never collect or store
                          data on the candidate vaccination status.{" "}
                          <span className={styles.metaLink}>
                            Read more here.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.tabs}>
                  {TABS.map((tab, index) => (
                    <span
                      key={tab}
                      className={[
                        styles.tab,
                        index === 0 ? styles.tabActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {tab}
                    </span>
                  ))}
                </div>

                <div
                  className={`${styles.section} ${styles.sectionBordered}`}
                >
                  <p className={styles.sectionTitle}>Active considerations</p>
                  <div className={styles.considerationCard}>
                    <div className={styles.considerationLeft}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- as above. */}
                      <img
                        className={styles.avatar}
                        src="/covers/meta-fbr-candidate.webp"
                        alt=""
                      />
                      <span>
                        <p className={styles.considerationTitle}>
                          Designer (New York, NY)
                        </p>
                        <p className={styles.considerationSub}>
                          Owned by{" "}
                          <span className={styles.metaLink}>
                            Brianna Zeilger
                          </span>
                        </p>
                      </span>
                    </div>
                    <div className={styles.considerationState}>
                      <span className={styles.select}>
                        <span className={styles.selectLabel}>Offer Draft</span>
                        <TriangleDown />
                      </span>
                      <span
                        className={`${styles.button} ${styles.buttonLarge} ${styles.buttonPrimary}`}
                      >
                        Create Offer
                      </span>
                      <span
                        className={`${styles.button} ${styles.buttonLarge}`}
                      >
                        More
                      </span>
                    </div>
                  </div>
                  <span className={`${styles.select} ${styles.selectWide}`}>
                    Add a consideration...
                  </span>
                </div>

                <div className={styles.section}>
                  <p className={styles.sectionTitle}>Engagements</p>
                  {ENGAGEMENTS.map((item, index) => (
                    <div key={index} className={styles.engagementCard}>
                      <div className={styles.engagementRow}>
                        <span
                          className={styles.engagementBadge}
                          style={{ background: item.colour }}
                        >
                          {item.badge === "event" && <EventAvailable />}
                          {item.badge === "comment" && <AddComment />}
                          {item.badge === "notes" && <Notes />}
                        </span>
                        <span className={styles.engagementText}>
                          <span className={styles.metaLink}>{item.lead}</span>
                          {item.link}
                          {item.tail && (
                            <span className={styles.metaLink}>{item.tail}</span>
                          )}
                          <p className={styles.engagementTime}>
                            Feb 10, 2022 at 11:11 AM EST
                          </p>
                        </span>
                      </div>
                      {item.body && (
                        <p className={styles.engagementBody}>{item.body}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ---------------------------------------- offer draft */}
            <div className={styles.panel}>
              <div className={styles.columnHeader}>
                <p className={styles.panelTitle}>Offer Draft</p>
                <CloseX />
              </div>

              <div className={styles.panelTabs}>
                <span
                  className={`${styles.panelTab} ${styles.panelTabActive}`}
                >
                  <CompensationTabIcon />
                  Compensation
                </span>
                <span className={styles.panelTab}>
                  <OfferStepIcon />
                  Offer Extension
                </span>
                <span className={styles.panelTab}>
                  <OfferStepIcon />
                  Offer Acceptance
                </span>
              </div>

              <div className={styles.panelBody}>
                <div
                  className={`${styles.subsection} ${styles.subsectionFirst}`}
                >
                  <div className={styles.subsectionRow}>
                    <Document />
                    <p className={styles.subsectionTitle}>
                      Application information
                    </p>
                    <span className={styles.flip}>
                      <TriangleDown />
                    </span>
                  </div>
                </div>

                <div className={styles.subsection}>
                  <div className={styles.subsectionRow}>
                    <ProfileCircle />
                    <p className={styles.subsectionTitle}>Position ID</p>
                    <span className={styles.flip}>
                      <TriangleDown />
                    </span>
                  </div>
                </div>

                <div className={styles.subsection}>
                  <div className={styles.subsectionRow}>
                    <CardPerson />
                    <p className={styles.subsectionTitle}>Offer type</p>
                    <TriangleDown />
                  </div>
                  <div className={styles.optionList}>
                    <div className={styles.option}>
                      <span className={styles.radio} />
                      <span className={styles.optionLabel}>
                        <p className={styles.optionTitle}>
                          Pre-approved, standard offer (Recommended)
                        </p>
                        <p className={styles.optionSub}>
                          Instantly share the pre-approved standard offer with
                          your candidate
                        </p>
                      </span>
                    </div>
                    <div
                      className={`${styles.option} ${styles.optionSelected}`}
                    >
                      <span className={styles.radio}>
                        <span className={styles.radioDot}>
                          <RadioDot />
                        </span>
                      </span>
                      <span className={styles.optionLabel}>
                        <p className={styles.optionTitle}>
                          Custom offer proposal
                        </p>
                        <p className={styles.optionSub}>
                          You must capture at least one entry into the
                          compensation capture tool in order to request
                          compensation approval with a 1-2 day response time.
                        </p>
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.subsection}>
                  <div className={styles.subsectionRow}>
                    <DollarCircle />
                    <p className={styles.subsectionTitle}>
                      Compensation Calculator
                    </p>
                    <TriangleDown />
                  </div>

                  <div className={styles.calculator}>
                    <CalcColumn width={115.586} group="Meta" header="Details">
                      {COMP_ROWS.map((row) => (
                        <div
                          key={row.label}
                          className={`${styles.calcCell} ${styles.calcCellLabel}`}
                        >
                          {row.label}
                        </div>
                      ))}
                    </CalcColumn>

                    <CalcColumn width={105.078} header={<>Standard</>}>
                      {COMP_ROWS.map((row) => (
                        <div
                          key={row.label}
                          className={`${styles.calcCell} ${styles.calcCellRight}`}
                        >
                          {row.standard}
                        </div>
                      ))}
                    </CalcColumn>

                    <CalcColumn width={105.078} header={<>Max</>}>
                      {COMP_ROWS.map((row) => (
                        <div
                          key={row.label}
                          className={`${styles.calcCell} ${styles.calcCellRight}`}
                        >
                          {row.max}
                        </div>
                      ))}
                    </CalcColumn>

                    <CalcColumn width={133.449} header={<>Proposal</>}>
                      {COMP_ROWS.map((row) => (
                        <div key={row.label} className={styles.calcCell}>
                          {row.input ? (
                            <span
                              className={[
                                styles.calcInput,
                                row.input === "error"
                                  ? styles.calcInputError
                                  : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                            >
                              <span
                                className={[
                                  styles.calcInputValue,
                                  row.input === "muted"
                                    ? styles.calcInputMuted
                                    : "",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                              >
                                {row.proposal}
                              </span>
                              {row.input === "error" && (
                                <span className={styles.errorMark} />
                              )}
                              <span className={styles.stepper}>
                                <TriangleDown />
                              </span>
                            </span>
                          ) : (
                            <span
                              className={styles.calcInputValue}
                              style={{ textAlign: "right" }}
                            >
                              {row.proposal}
                            </span>
                          )}
                        </div>
                      ))}
                    </CalcColumn>

                    <CalcColumn
                      width={116.637}
                      group="Competing"
                      header={
                        <>
                          <span className={styles.competingSelect}>
                            None
                            <TriangleDown />
                          </span>
                          <span className={styles.addCompeting}>+</span>
                        </>
                      }
                    >
                      {COMP_ROWS.map((row) => (
                        <div
                          key={row.label}
                          className={`${styles.calcCell} ${styles.calcCellRight}`}
                        >
                          <span className={styles.dash}>- -</span>
                        </div>
                      ))}
                    </CalcColumn>
                  </div>

                  <div className={styles.errorRow}>
                    <span className={styles.errorMark} />
                    You cannot submit an Offer Proposal without competing
                    compensation information
                  </div>
                </div>
              </div>

              <div className={styles.panelFooter}>
                <span className={`${styles.button} ${styles.buttonLarge}`}>
                  Save Progress
                </span>
                <span className={`${styles.button} ${styles.buttonLarge}`}>
                  Review
                </span>
                <span
                  className={`${styles.button} ${styles.buttonLarge} ${styles.buttonMuted}`}
                >
                  Extend Offer
                </span>
              </div>
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}
