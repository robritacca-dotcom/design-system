import {
  ChevronDownIcon,
  ClockIcon,
  CloseIcon,
  IntuitAssistMark,
  IntuitWordmark,
  MenuExpandIcon,
  MenuIcon,
  NoteAltIcon,
  PlusIcon,
  SendIcon,
} from "./intuit-cover-art";
import { CoverFrame } from "./CoverFrame";
import styles from "./IntuitAgentChatCover.module.css";

/*
 * Literal redraws of two Figma frames from Intuit Agent Chat: the immersive
 * desktop panel (node 124823:12866, 1440 x 964) and the SM/MD panel
 * (node 124823:12867, 428 x 964). Each is wrapped in an SVG viewBox so it
 * scales to any container without a raster step.
 *
 * Everything is hard-coded: no design-system tokens, no design-system
 * components, no behaviour. Geometry, copy and path data come straight from
 * the Figma file. The one departure the file forces is type — Avenir Next
 * forINTUIT is not licensed here, so the stack falls through to Avenir Next,
 * which ships with macOS.
 *
 * The mobile frame's article runs far past the panel's cut line. Only the part
 * the frame actually shows is drawn, down to the third list group; the rest of
 * the piece would never be visible.
 */

/** The five conversation starters, with the widths Figma pins them to. */
const STARTERS: { label: string; width: number }[] = [
  { label: "Analyze & improve cash flow", width: 244 },
  { label: "Where are bottlenecks?", width: 206 },
  { label: "Review key metrics", width: 172 },
  { label: "Help me increase retention", width: 231 },
  { label: "Create a plan for growth", width: 211 },
];

/** The composer: pill input, attach and send controls, legal line. */
function Composer({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={[styles.inputField, mobile ? styles.inputFieldMobile : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.semanticInput}>
        <div className={styles.inputRow}>
          <div className={styles.attach}>
            <div className={styles.attachWash} />
            <div className={styles.attachIcon}>
              <PlusIcon />
            </div>
          </div>
          <div className={styles.inputText}>
            <p className={styles.placeholder}>Ask anything</p>
          </div>
          <div className={styles.sendControl}>
            <div className={styles.attachWash} />
            <div className={styles.attachIcon}>
              <SendIcon />
            </div>
          </div>
        </div>
      </div>
      <p className={styles.disclaimer}>
        Important information about how we use generative AI
      </p>
    </div>
  );
}

/** The desktop frame: 1440 x 964, node 124823:12866. */
export function IntuitAgentChatCover({ className }: { className?: string }) {
  return (
    <CoverFrame
      width={1440}
      height={964}
      className={className}
      label="The Intuit Agent Chat welcome screen, with a greeting, five conversation starters and the composer."
    >
      <div className={styles.stage}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <IntuitWordmark />
          </div>
          <div className={styles.headerRight}>
            <div className={styles.headerRightRow}>
              <div className={styles.iconControl}>
                <CloseIcon />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.rail}>
            <div className={styles.railNav}>
              <div className={styles.railPrimary}>
                <div className={styles.railButton}>
                  <MenuExpandIcon />
                </div>
                <div className={styles.railButton}>
                  <NoteAltIcon />
                </div>
              </div>
              <div className={`${styles.railButton} ${styles.railButtonWide}`}>
                <ClockIcon />
              </div>
            </div>
          </div>

          <div className={styles.paneColumn}>
            <div className={styles.pane}>
              <div className={styles.chat}>
                <div className={styles.welcome}>
                  <div className={styles.lockup}>
                    <div className={styles.assistMark}>
                      <IntuitAssistMark />
                    </div>
                    <div className={styles.welcomeHeader}>
                      <p className={styles.welcomeHeading}>
                        Hi, &#123;Name&#125;
                      </p>
                      <p className={styles.welcomeSubheading}>
                        How can I help you?
                      </p>
                    </div>
                  </div>
                  <div className={styles.starters}>
                    {STARTERS.map((starter) => (
                      <div
                        key={starter.label}
                        className={styles.starter}
                        style={{ width: starter.width }}
                      >
                        {starter.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Composer />
          </div>
        </div>
      </div>
    </CoverFrame>
  );
}

/** The mobile frame: 428 x 964, node 124823:12867. */
export function IntuitAgentChatCoverMobile({
  className,
}: {
  className?: string;
}) {
  return (
    <CoverFrame
      width={428}
      height={964}
      className={className}
      label="The Intuit Agent Chat panel answering a question about cash flow with a long formatted article."
    >
      <div className={styles.stageMobile}>
        <div className={styles.header}>
          <div className={styles.headerSide}>
            <div className={styles.iconControl}>
              <MenuIcon />
            </div>
          </div>
          <div className={styles.headerTitle}>
            <IntuitWordmark />
          </div>
          <div className={`${styles.headerSide} ${styles.headerSideRight}`}>
            <div className={styles.iconControl}>
              <NoteAltIcon />
            </div>
            <div className={styles.iconControl}>
              <CloseIcon />
            </div>
          </div>
        </div>

        <div className={styles.paneColumn}>
          <div className={styles.chatPane}>
            <div className={styles.thread}>
              <div className={styles.userMessage}>
                <div className={styles.userBubble}>
                  Analyze &amp; improve cash flow
                </div>
              </div>

              <div className={styles.agentMessage}>
                <div className={styles.thinkingRow}>
                  <p className={styles.thinkingLabel}>Show thinking</p>
                  <div className={styles.thinkingChevron}>
                    <ChevronDownIcon />
                  </div>
                </div>

                <div className={styles.markdown}>
                  <p className={styles.mdHeading}>
                    Analyze &amp; improve cash flow: Foundations for sustainable
                    operations
                  </p>
                  <p className={styles.mdSubhead}>Introduction</p>
                  <p className={styles.mdBody}>
                    Cash flow is the lifeblood of any business. Even profitable
                    companies can fail if cash inflows and outflows are poorly
                    managed. Understanding how money moves through your business
                    is critical to maintaining stability, funding growth, and
                    responding to uncertainty.
                  </p>
                  <p className={styles.mdBody}>
                    This article focuses on analyzing and improving cash flow.
                    It covers visibility into inflows and outflows, forecasting
                    techniques, and practical actions that help businesses
                    remain resilient and financially healthy. You can read more
                    on <span className={styles.mdLink}>Intuit.com/help</span>.
                  </p>

                  <div className={styles.mdDivider}>
                    <div className={styles.mdDividerLine} />
                  </div>

                  <p className={styles.mdSubhead}>1. Core cash flow areas</p>

                  <div className={styles.mdGroup}>
                    <p className={styles.mdBody}>
                      There are three primary components of cash flow
                      management:
                    </p>
                    <ul className={styles.mdList}>
                      <li className={styles.mdListLead}>Cash inflows</li>
                      <ul>
                        <li>Revenue from sales, subscriptions, and services</li>
                        <li>Timing of customer payments and receivables</li>
                      </ul>
                      <li className={styles.mdListLead}>Cash outflows</li>
                      <ul>
                        <li>
                          Operating expenses such as payroll, rent, and vendors
                        </li>
                        <li>Variable costs tied to growth and seasonality</li>
                      </ul>
                      <li className={styles.mdListLead}>Net cash position</li>
                      <ul>
                        <li>
                          Difference between inflows and outflows over time
                        </li>
                        <li>Indicates short term financial flexibility</li>
                      </ul>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Composer mobile />
        </div>
      </div>
    </CoverFrame>
  );
}
