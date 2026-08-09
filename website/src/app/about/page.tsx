"use client";

import Image from "next/image";
import Link from "next/link";
import { LinkList } from "@robr0/design-system/components/LinkList/LinkList";
import { Timeline, type TimelineCompany } from "@robr0/design-system/components/Timeline/Timeline";
import MegaNav from "../../components/MegaNav/MegaNav";
import BlurBackground from "../../components/BlurBackground/BlurBackground";
import Footer from "../../components/Footer/Footer";
import PageLinks from "../../components/PageLinks/PageLinks";
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
        title: "Principal Product Designer | CoreX AI",
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
        title: "Principal Product Designer, Consumer AI",
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
        title: "Principal Product Designer | Agent Platform",
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
        start: "Sep 2021",
        end: "Jul 2023",
        description:
          "Led evidence-driven design across a horizontal portfolio of Recruiting Products, supporting how Meta discovers, develops, and hires talent.",
        bullets: [
          <>
            Redesigned the Job Offer tool within Meta&apos;s Applicant Tracking System, improving offer extension velocity by over 10%, compensation approval velocity by 25%, and volume of data points by 50%. Full story in the{" "}
            <Link href="/work/meta-offers">case study</Link>
          </>,
          "Redesigned the Internal Mobility transfer and eligibility tool, resulting in a 58% increase in data accuracy and a 33% reduction in processing time to earn an estimated savings of 2000 hours/year of productivity",
          "Led design direction for a mixed-reality initiative of 40+ people across 6 organizations, including Recruiting Products and an external XR development shop. Wrote the design brief, worked through hardware logistics and digital onboarding, and ran a pilot that put target users through an immersive VR experience.",
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

      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <div className={styles.profileCol}>
          <Image
            src="/images/robr02.jpg"
            alt="Robert Ritacca"
            width={291}
            height={291}
            className={styles.profileImage}
            priority
          />
        </div>

        <main className={styles.dsContent} id="main-content">
          {/* Location byline sits in the breadcrumb slot, title below it at the shared offset */}
          <div className={`${styles.locationRow} animate-in`}>
            <Image src="/logos/Canada.svg" alt="" width={20} height={20} />
            <span>Based in Toronto, Canada</span>
          </div>
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Robert Ritacca</h1>
            <PageLinks
              linkedinUrl="https://www.linkedin.com/in/robertritacca/"
              xUrl="https://x.com/robr0"
              instagramUrl="https://www.instagram.com/robr0designs/"
            />
          </div>

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
              {/* Consulting Section */}
              <div className={`${styles.resumeSection} animate-in animate-delay-2`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Work with me</h2>
                </div>
                <LinkList
                  items={[
                    {
                      label: "Book a consultation",
                      href: "https://buy.stripe.com/28o7vb5NBaSJ3NC5kn",
                      logo: "/logos/stripe-new.png",
                      logoAlt: "Stripe",
                      sub: "Secure checkout via Stripe",
                    },
                  ]}
                />
              </div>

              {/* Skills Section */}
              <div className={`${styles.resumeSection} animate-in animate-delay-2`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Skills</h2>
                </div>

                <div className={styles.skillsGroup}>
                  <h4 className={styles.skillsCategory}>AI and agentic design</h4>
                  <ul className={styles.skillsList}>
                    <li>Agentic and conversational UX</li>
                    <li>Multi turn interaction design</li>
                    <li>Human in the loop workflows</li>
                    <li>Dynamic UI from model output</li>
                  </ul>
                </div>

                <div className={styles.skillsGroup}>
                  <h4 className={styles.skillsCategory}>Product and delivery</h4>
                  <ul className={styles.skillsList}>
                    <li>0 to 1 product development</li>
                    <li>Shipping and iteration ownership</li>
                    <li>Product domain definition</li>
                    <li>Cross functional execution</li>
                  </ul>
                </div>

                <div className={styles.skillsGroup}>
                  <h4 className={styles.skillsCategory}>Systems and platforms</h4>
                  <ul className={styles.skillsList}>
                    <li>Design system architecture</li>
                    <li>Token based theming</li>
                    <li>Reusable primitives and patterns</li>
                    <li>Platform scale design</li>
                  </ul>
                </div>

                <div className={styles.skillsGroup}>
                  <h4 className={styles.skillsCategory}>Tooling and execution</h4>
                  <ul className={styles.skillsList}>
                    <li>Advanced Figma systems</li>
                    <li>MCP and Cursor workflows</li>
                    <li>Design to engineering handoff</li>
                    <li>System level prototyping</li>
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

      <Footer />
    </>
  );
}
