import {
  BarBase,
  BarBonus,
  BarEquity,
  BarSignOn,
  BarTax,
  BrandSwooshes,
  InstagramMark,
} from "./meta-cover-art";
import { CoverFrame } from "./CoverFrame";
import styles from "./MetaOfferSummaryCover.module.css";

/*
 * A literal redraw of the Figma frame "Offer summary" (robr0-ds26,
 * node 931:1839) at its native 1638.238 x 1063.988, wrapped in an SVG viewBox
 * so it scales to any container without a raster step.
 *
 * Everything is hard-coded: no design-system tokens, no design-system
 * components, no behaviour. Geometry, copy and path data come straight from
 * the Figma file, including its fractional sizes — the artboard was drawn at
 * 1512 and pasted at 1638.238, so every value carries that 1.0835 factor.
 *
 * Three departures the file forces. Optimistic Display is Meta's own brand
 * face and is not licensed here, so the stack falls through to SF Pro Display.
 * The photographic content — five navigation thumbnails, the recruiter's
 * portrait, three document previews and the Meta symbol — has no vector to
 * trace, so it is embedded as small WebP. And the frame ships light only, so
 * the dark palette is a derivation from Meta's own dark surfaces rather than a
 * second frame.
 */

/** The five items under "Understand your offer". */
const NAV_ITEMS: { title: string; sub: string; thumb: string }[] = [
  { title: "Offer Summary", sub: "Week 1: July 6-10", thumb: "meta-nav-1" },
  { title: "Life @ Meta", sub: "Your benefits", thumb: "meta-nav-2" },
  { title: "Your Team", sub: "Where you'll fit in", thumb: "meta-nav-3" },
  { title: "Your Career", sub: "How you'll grow", thumb: "meta-nav-4" },
  { title: "Meta IRL", sub: "Campus life", thumb: "meta-nav-5" },
];

/** The compensation legend, in the file's colour order. */
const LEGEND: { label: string; colour: string; wrap?: boolean }[] = [
  { label: "Base salary", colour: "#30c8b4" },
  { label: "Bonus", colour: "#763ee5" },
  { label: "Equity", colour: "#ff7a69" },
  { label: "Sign-on", colour: "#86daff" },
  { label: "Taxable benefits", colour: "#686060", wrap: true },
];

/** The six compensation figures below the chart. */
const COMPENSATION: { value: string; label: string; sub: string }[] = [
  { value: "$100,000 USD", label: "Base Salary", sub: "Paid bi-weekly" },
  { value: "15%", label: "Target bonus", sub: "Paid annually" },
  {
    value: "$200,000 USD",
    label: "Restricted Stock Units (RSU)",
    sub: "Vests quartely over 4 years",
  },
  { value: "$25,000 USD", label: "Sign-on", sub: "One-time payment" },
  {
    value: "$2,500 USD",
    label: "Remote start-up bonus",
    sub: "One-time payment",
  },
  { value: "$1,400 USD", label: "Remote Stipend", sub: "Paid annually" },
];

/** The three explainer documents. */
const DOCUMENTS: { title: string; image: string }[] = [
  { title: "Understanding your bonus", image: "meta-doc-1" },
  { title: "Understanding your RSU’s", image: "meta-doc-2" },
  { title: "Understanding your Equity", image: "meta-doc-3" },
];

/** A figure with its label, help icon and payment cadence. */
function CompensationCell({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <div className={styles.compCell}>
      <p className={styles.compValue}>{value}</p>
      <div className={styles.compLabelRow}>
        <p className={styles.compLabel}>{label}</p>
        <span className={styles.infoIcon} />
      </div>
      <p className={styles.compSub}>{sub}</p>
    </div>
  );
}

/** The Offer Summary frame: 1638.238 x 1063.988, node 931:1839. */
export function MetaOfferSummaryCover({ className }: { className?: string }) {
  return (
    <CoverFrame
      width={1638.238}
      height={1063.988}
      ground="mist"
      className={className}
      label="Meta's candidate-facing offer summary: role details, a compensation breakdown chart and explainer documents."
    >
      <div className={styles.stage}>
        <div className={styles.washes} />
        <div className={styles.swooshes}>
          <BrandSwooshes />
        </div>

        {/* ------------------------------------------------- sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.homeButton}>
            <span className={styles.maskIcon} />
            Career Profile Home
          </div>

          <p className={styles.whatsNext}>What&rsquo;s next?</p>

          <div className={styles.navSection}>
            <p className={styles.navSectionTitle}>Understand your offer</p>
            <div className={styles.navList}>
              {NAV_ITEMS.map((item, index) => (
                <div
                  key={item.title}
                  className={[
                    styles.navItem,
                    index === 0 ? styles.navItemSelected : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- next/image cannot render inside an SVG foreignObject; these are fixed-size static assets. */}
                  <img
                    className={styles.navThumb}
                    src={`/covers/${item.thumb}.webp`}
                    alt=""
                  />
                  <span className={styles.navLabel}>
                    <p className={styles.navTitle}>{item.title}</p>
                    <p className={styles.navSub}>{item.sub}</p>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className={styles.contactTitle}>
            Contact your Recruiter when you&rsquo;re ready to discuss your offer
          </p>

          <div className={styles.peopleCard}>
            <div className={styles.peopleRow}>
              <span className={styles.peopleText}>
                <p className={styles.peopleEyebrow}>Your Recruiter</p>
                <p className={styles.peopleName}>Ashley Wells</p>
                <p className={styles.peopleEmail}>ashley.wells@meta.com</p>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element -- as above. */}
              <img
                className={styles.peopleAvatar}
                src="/covers/meta-recruiter.webp"
                alt=""
              />
            </div>
            <p className={styles.peopleNote}>
              Hi Gabby! Please review the details of your offer summary. Shoot
              me an email or call me at 222.222.2222 when you&rsquo;re ready to
              discuss. Thanks!
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------- card */}
        <div className={styles.card}>
          <div className={styles.cardInner}>
            <div className={styles.cardHead}>
              <p className={styles.cardDate}>Fri, Oct 21, 2022</p>
              <p className={styles.cardTitle}>Offer Summary</p>
              <p className={styles.cardNote}>
                Please note: The summary is non-binding and is subject to change
                unless a final definitive written agreement is reviewed,
                approved, executed and delivered.
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element -- as above. */}
              <img
                className={styles.metaSymbol}
                src="/covers/meta-symbol.webp"
                alt=""
              />
            </div>

            <div className={styles.section}>
              <p className={styles.sectionTitle}>Role details</p>
              <div className={styles.detailGrid}>
                <div className={styles.detailRow}>
                  <div className={styles.detailCell}>
                    <p className={styles.detailValue}>Product Designer</p>
                    <p className={styles.detailLabel}>Title</p>
                  </div>
                  <div className={styles.detailCell}>
                    <p className={styles.detailValue}>IC4</p>
                    <p className={styles.detailLabel}>Level</p>
                  </div>
                  <div className={styles.detailCell}>
                    <p className={styles.detailValue}>Mon, Jan 1, 2023</p>
                    <p className={styles.detailLabel}>Start date</p>
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailCell}>
                    <p className={styles.detailValue}>US, CA, Remote</p>
                    <p className={styles.detailLabel}>Location</p>
                  </div>
                  <div className={styles.detailCell}>
                    <span className={styles.orgRow}>
                      <InstagramMark />
                      <p className={styles.orgName}>Instagram</p>
                    </span>
                    <p className={styles.detailLabel}>Organization</p>
                  </div>
                  <div className={styles.detailCell}>
                    <p
                      className={`${styles.detailValue} ${styles.detailValueLink}`}
                    >
                      Ads Monetization
                    </p>
                    <p className={styles.detailLabel}>Team</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionTitle}>Financial compensation</p>

              <div className={styles.compGrid}>
                <div className={styles.compHero}>
                  <div className={styles.compTotalBlock}>
                    <p className={styles.compTotal}>$190,000 USD</p>
                    <span>
                      <span className={styles.compTotalLabelRow}>
                        <p className={styles.compTotalLabel}>
                          Total compensation
                        </p>
                        <span className={styles.infoIcon} />
                      </span>
                      <p className={styles.compTotalSub}>Year-one estimate</p>
                    </span>
                  </div>

                  <div className={styles.chart}>
                    <div className={styles.barStack}>
                      <span className={styles.barBase}>
                        <BarBase />
                      </span>
                      <span className={styles.barSegment}>
                        <BarBonus />
                      </span>
                      <span className={styles.barSegment}>
                        <BarEquity />
                      </span>
                      <span className={styles.barSegment}>
                        <BarSignOn />
                      </span>
                      <span className={styles.barSegment}>
                        <BarTax />
                      </span>
                    </div>
                    <div className={styles.legend}>
                      {LEGEND.map((item) => (
                        <span key={item.label} className={styles.legendItem}>
                          <span
                            className={styles.legendSwatch}
                            style={{ background: item.colour }}
                          />
                          <span
                            className={[
                              styles.legendLabel,
                              item.wrap ? styles.legendLabelWrap : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            {item.label}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.compRow}>
                  {COMPENSATION.slice(0, 3).map((cell) => (
                    <CompensationCell key={cell.label} {...cell} />
                  ))}
                </div>
                <div className={styles.compRow}>
                  {COMPENSATION.slice(3).map((cell) => (
                    <CompensationCell key={cell.label} {...cell} />
                  ))}
                </div>
              </div>

              <p className={styles.docsTitle}>
                Understanding your compensation
              </p>
              <div className={styles.docsRow}>
                {DOCUMENTS.map((doc) => (
                  <div key={doc.title} className={styles.docCell}>
                    <div className={styles.docThumb}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- as above. */}
                      <img
                        className={styles.docImage}
                        src={`/covers/${doc.image}.webp`}
                        alt=""
                      />
                    </div>
                    <p className={styles.docTitle}>{doc.title}</p>
                    <p className={styles.docLink}>Read PDF</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CoverFrame>
  );
}
