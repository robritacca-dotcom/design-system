import Image from "next/image";
import Link from "next/link";
import { Globe } from "@robr0/design-system/components/Globe/Globe";
import { LinkList } from "@robr0/design-system/components/LinkList/LinkList";
import { Timeline, type TimelineCompany } from "@robr0/design-system/components/Timeline/Timeline";
import MegaNav from "../../components/MegaNav/MegaNav";
import styles from "./page.module.css";

const companyLogo = (src: string, alt: string) => (
  <Image src={src} alt={alt} width={32} height={32} />
);

/* corpus-facts(Career timeline, employers and dates): the timeline renders this data on the page; without the directive only the bullet prose reaches the site chat and every role loses its employer and dates */
const EXPERIENCE: TimelineCompany[] = [
  {
    name: "Gusto",
    logo: companyLogo("/logos/gusto.svg", "Gusto"),
    roles: [
      {
        title: "Principal Product Designer",
        subtitle: "CoreX AI",
        start: "Aug 2026",
        present: true,
        description:
          "Defining how AI works, behaves, and earns trust across Gusto's payroll, benefits, and HR platform.",
        bullets: [
          "Shaping the interaction model, UX principles, and product direction for AI, starting with Gus, the conversational assistant",
          "Expanding AI from conversation into embedded workflows",
          "Partnering with product and engineering leadership to ship customer-facing AI",
        ],
      },
    ],
  },
  {
    name: "Intuit",
    logo: companyLogo("/logos/Intuit.svg", "Intuit"),
    roles: [
      {
        title: "Principal Product Designer",
        subtitle: "TurboTax, Consumer AI",
        start: "Jan 2026",
        end: "Jul 2026",
        bullets: [
          "Shipped TurboTax's embedded AI experiences inside ChatGPT and Claude in time for tax season, putting TurboTax in front of nearly 1 billion users on those platforms",
          <>
            Designed the bidirectional filing checklist that lets users prep their taxes inside an AI chat and finish the return in TurboTax. Full story in the{" "}
            <Link href="/work/embedded-ai-turbotax">case study</Link>
          </>,
          "Took agentic workflows into production across TurboTax and the broader consumer platform, including Credit Karma",
          "Designed action-oriented financial workflows that turn AI into real outcomes, not just answers",
        ],
      },
      {
        title: "Principal Product Designer",
        subtitle: "GenUX - AI / Agent platform",
        start: "May 2024",
        end: "Jan 2026",
        bullets: [
          <>
            Led design of Intuit Agent Chat, the white-labelled capability behind the Intuit Intelligence brand: domain teams inject agents and dynamic UI into their own products through one shared, extensible conversational AI platform. Full story in the{" "}
            <Link href="/work/intuit-agent-chat">case study</Link>
          </>,
          "Scaled to 70+ agents live in production across TurboTax, QuickBooks, Mailchimp, and internal teams",
          "Serving ~50M sessions in production across Intuit's consumer and small-business platforms",
          "2.8M component instantiations in the last year from the shared AI-native UI library spanning chat, documents, memory, and dynamic UI",
          "Grew an organic community of 600+ developers shipping with the platform, adopted as the company-wide standard by unanimous executive vote",
        ],
      },
    ],
  },
  {
    name: "Augmenta.ai",
    logo: companyLogo("/logos/Augmenta-2026.svg", "Augmenta.ai"),
    roles: [
      {
        title: "Principal Product Designer",
        start: "Aug 2023",
        end: "May 2024",
        description:
          "Led end-to-end UX for a 0 to 1 Generative AI tool enabling engineers to create constructible, code-compliant electrical raceway designs, as the sole designer supporting 30+ engineers.",
        bullets: [
          "Shaped workflows through user research, testing, and iteration, and built new capabilities like 4x expanded signal visibility across 3D and tabular views",
          <>
            Reduced time-to-value from 14 days to 5 by simplifying generation workflows, and cut required cycles from 12 to 5 with clearer feedback and better anomaly detection. Full story in the{" "}
            <Link href="/work/augmenta-ai">case study</Link>
          </>,
          "Improved solution quality by reducing anomalies per output by 60% and cutting engineering intervention from 13+ to ~1 per project through better tooling, visualization, and in-product guidance",
        ],
      },
    ],
  },
  {
    name: "Meta",
    logo: companyLogo("/logos/meta.svg", "Meta"),
    roles: [
      {
        title: "Staff Product Designer",
        subtitle: "Enterprise Products",
        start: "Sep 2021",
        end: "Jul 2023",
        description:
          "Led evidence-driven design across a horizontal portfolio of Recruiting Products, supporting how Meta discovers, develops, and hires talent.",
        bullets: [
          <>
            Replaced the free-text compensation notes in Meta&apos;s Applicant Tracking System with structured, validated capture: 23.7% faster compensation approvals, 51% more validated data captured, and 9% faster offer extension overall. Full story in the{" "}
            <Link href="/work/meta-offers">Structured compensation capture case study</Link>
          </>,
          "Redesigned the Internal Mobility transfer and eligibility tool, resulting in a 58% increase in data accuracy and a 33% reduction in processing time to earn an estimated savings of 2000 hours/year of productivity",
          <>
            Owned the long-term design vision for Career Profile, the candidate-facing platform, turning a patchwork of disconnected tools into one guided path personal to each candidate. Full story in the{" "}
            <Link href="/work/meta-career-profile">case study</Link>
          </>,
          <>
            Led design direction for a mixed-reality initiative of 40+ people across 6 organizations, including Recruiting Products and an external XR development shop. Wrote the design brief, worked through hardware logistics and digital onboarding, and ran a pilot that put target users through an immersive VR experience. Full story in the{" "}
            <Link href="/work/meta-immersive-offers">case study</Link>
          </>,
        ],
      },
    ],
  },
  {
    name: "Cognizant (Previously known as Devbridge)",
    logo: companyLogo("/logos/Cognizant.svg", "Cognizant"),
    roles: [
      {
        title: "Product Design Manager",
        start: "Sep 2018",
        end: "Sep 2021",
        description:
          "Managed a team of 4 product designers in the Toronto business unit, from performance to career development. Directed all design phases across a broad portfolio of multi-product delivery engagements worth $25m over 4 years.",
        bullets: [
          "Led design for mySCP, a cross-platform healthcare application suite used by 8,000+ clinicians across desktop, iOS, and Android",
          <>
            Led design for multiple CIBC banking products, including{" "}
            <Link href="/work/cibc-firstcaribbean">First Caribbean</Link> and Smart Banking for Business, spanning desktop, iOS, and Android
          </>,
        ],
      },
      {
        title: "Senior Product Designer",
        start: "Sep 2017",
        end: "Sep 2018",
      },
    ],
  },
  {
    name: "Instacart (Previously known as Unata)",
    logo: companyLogo("/logos/Instacart.svg", "Instacart"),
    roles: [
      {
        title: "Senior Product Designer",
        start: "Jan 2017",
        end: "Sep 2017",
      },
    ],
  },
  {
    name: "AdParlor",
    logo: companyLogo("/logos/AdParlor.svg", "AdParlor"),
    roles: [
      {
        title: "Senior Product Designer",
        start: "Dec 2015",
        end: "Jan 2017",
      },
      {
        title: "Product Designer",
        start: "Dec 2013",
        end: "Dec 2015",
      },
    ],
  },
];

export default function AboutMePage() {
  return (
    <>
      <MegaNav />

      <div className={styles.dsLayout}>
        <div className={styles.profileCol}>
          <div className={styles.profileGlobe}>
            <Globe
              label="Home in Toronto, with arcs to Gusto HQ in Denver and Napoli, Italy"
              defaultRotation={[-92, 42]}
              points={[
                { id: "toronto", lat: 43.65, lng: -79.38, label: "Toronto", kind: "anchor" },
                { id: "gusto-hq", lat: 39.74, lng: -104.99, label: "Gusto HQ" },
                { id: "napoli", lat: 40.85, lng: 14.27, label: "Napoli" },
              ]}
              arcs={[
                { from: "toronto", to: "gusto-hq" },
                { from: "toronto", to: "napoli" },
              ]}
              activePointId="toronto"
            />
          </div>
        </div>

        <main className={styles.dsContent} id="main-content">
          <h1 className={`${styles.pageTitle} animate-in`}>About me</h1>

          {/* Page Description */}
          <div className={styles.introSection}>
            <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
              Designing products that bring clarity to complex problems.
            </p>

            {/* Bio */}
            <p className={`${styles.introBody} animate-in animate-delay-2`}>
              Product designer specialising in AI-native products, agentic experiences, and complex workflows, with a background across big tech, startups, and consulting. I partner with engineering, product, and leadership to turn ambiguous problems into products people can actually use. Much of that work has been 0&rarr;1: enterprise applications, and the design systems and platforms that let teams build faster.
            </p>
          </div>

          {/* Resume Two-Column Layout */}
          <div className={styles.resumeLayout}>
            {/* Work Experience Column (Left) */}
            <div className={styles.resumeMain}>
              <div className={`${styles.resumeSection} animate-in animate-delay-2`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Work experience</h2>
                </div>

                <Timeline variant="company" items={EXPERIENCE} />
              </div>
            </div>

            {/* Right Rail */}
            <aside className={styles.resumeSidebar}>
              {/* Skills Section */}
              <div className={`${styles.resumeSection} animate-in animate-delay-2`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Skills</h2>
                </div>

                <div className={styles.skillsGroup}>
                  <h4 className={styles.skillsCategory}>AI products</h4>
                  <ul className={styles.skillsList}>
                    <li>Designing inside ChatGPT and Claude</li>
                    <li>Conversational and agentic products</li>
                    <li>Generative UI, assembled at runtime</li>
                    <li>Knowing when to keep a human in the loop</li>
                    <li>Showing what a model does not know</li>
                  </ul>
                </div>

                <div className={styles.skillsGroup}>
                  <h4 className={styles.skillsCategory}>Product direction</h4>
                  <ul className={styles.skillsList}>
                    <li>0&rarr;1 product design</li>
                    <li>Learning how people actually work</li>
                    <li>Deciding what not to build</li>
                    <li>Getting leadership behind a direction</li>
                    <li>Leading cross functional teams</li>
                  </ul>
                </div>

                <div className={styles.skillsGroup}>
                  <h4 className={styles.skillsCategory}>Systems and platforms</h4>
                  <ul className={styles.skillsList}>
                    <li>Design systems other teams build on</li>
                    <li>One token set, many brands</li>
                    <li>Getting a shared platform adopted</li>
                    <li>Deciding what belongs in a platform</li>
                  </ul>
                </div>

                <div className={styles.skillsGroup}>
                  <h4 className={styles.skillsCategory}>Building</h4>
                  <ul className={styles.skillsList}>
                    <li>Designing by building, not handing off</li>
                    <li>Design rules the build enforces</li>
                    <li>Prototyping against a fake backend</li>
                    <li>Writing as part of the design work</li>
                  </ul>
                </div>
              </div>

              {/* Education Section */}
              <div className={`${styles.resumeSection} animate-in animate-delay-3`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Education</h2>
                </div>
                <LinkList
                  items={[
                    {
                      label: "HBA, Visual Culture & Communication",
                      href: "https://visualculture.utoronto.ca/",
                      logo: "/logos/uoft.svg",
                      logoAlt: "University of Toronto",
                      sub: "University of Toronto",
                    },
                    {
                      label: "Certificate, Digital Communication",
                      href: "https://www.sheridancollege.ca/programs/digital-communication-certificate",
                      logo: "/logos/sheridan.svg",
                      logoAlt: "Sheridan College",
                      sub: "Sheridan College",
                    },
                  ]}
                />
              </div>

              {/* Certificates Section */}
              <div className={`${styles.resumeSection} animate-in animate-delay-4`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Certificates</h2>
                </div>
                <LinkList
                  items={[
                    {
                      label: "Situational Leadership (SLII)",
                      href: "https://www.kenblanchard.com/situationalleadership/",
                      logo: "/logos/slii.svg",
                      logoAlt: "Ken Blanchard",
                      sub: "Ken Blanchard",
                    },
                    {
                      label: "Accessibility for Designers",
                      href: "https://www.deque.com/certification/accessibility-for-designers/",
                      logo: "/logos/Deque.svg",
                      logoAlt: "Deque University",
                      sub: "Deque University",
                    },
                  ]}
                />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
