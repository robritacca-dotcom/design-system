"use client";

import Image from "next/image";
import MegaNav from "../../../components/MegaNav/MegaNav";
import BlurBackground from "../../../components/BlurBackground/BlurBackground";
import Footer from "../../../components/Footer/Footer";
import PageLinks from "../../../components/PageLinks/PageLinks";
import styles from "../page.module.css";

export default function AboutMePage() {
  return (
    <>

      <BlurBackground />

      <MegaNav />

      <div className={styles.dsLayout}>
        <main className={styles.dsContent} id="main-content">
          {/* Page Title */}
          <div className={`${styles.pageHeader} animate-in`}>
            <h1 className={styles.pageTitle}>Robert Ritacca</h1>
            <PageLinks
              figmaUrl="https://www.figma.com/design/8NzqDS8iRsBTFPbNGj3Woj/robr0-ds26?node-id=246-6397"
            />
          </div>

          {/* Page Description */}
          <p className={`${styles.subDisplay} animate-in animate-delay-1`}>
            I work at the intersection of AI, interaction design, and platform
            architecture, building foundations that support complex products and
            teams.
          </p>

          {/* Resume Two-Column Layout */}
          <div className={styles.resumeLayout}>
            {/* Work Experience Column (Left) */}
            <div className={styles.resumeMain}>
              <div className={styles.resumeSection}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Work experience</h2>
                </div>

                <div className={styles.resumeCompanies}>
                  {/* Intuit */}
                  <div className={`${styles.resumeCompany} animate-in animate-delay-2`}>
                    <div className={styles.companyHeader}>
                      <Image src="/logos/Intuit.svg" alt="Intuit" width={32} height={32} className={styles.companyLogo} />
                      <span className={styles.companyName}>Intuit</span>
                    </div>
                    <div className={styles.companyRoles}>
                      <div className={styles.timelineBar} />
                      <div className={styles.rolesContent}>
                        {/* Consumer AI role */}
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Principal Product Designer, Consumer AI</h3>
                            <span className={styles.roleDates}>Jan 2026 – <span className={styles.present}>Present</span></span>
                          </div>
                          <ul className={styles.roleBullets}>
                            <li>Leading TurboTax AI experiences across ChatGPT, Claude, and Gemini, meeting consumers where they are</li>
                            <li>Driving the operationalization of agentic solutions across TurboTax and the broader consumer platform including Credit Karma</li>
                            <li>Designing action-oriented financial workflows that turn AI into real outcomes, not just answers</li>
                          </ul>
                        </div>
                        {/* Agent Platform role */}
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Principal Product Designer | Agent Platform</h3>
                            <span className={styles.roleDates}>May 2024 – Jan 2026</span>
                          </div>
                          <ul className={styles.roleBullets}>
                            <li>Led design of Intuit Intelligence, Intuit&apos;s end-to-end conversational AI platform enabling domain teams to inject agents and dynamic UI into products through a consistent, scalable, and extensible contextual capability</li>
                            <li>Built core agent UX foundations adopted by 150+ product teams, supporting 600+ designers and thousands of engineers</li>
                            <li>Defined scalable AI-native patterns for chat, documents, memory, and dynamic UI used across QuickBooks, TurboTax, Credit Karma, and Mailchimp</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Augmenta */}
                  <div className={`${styles.resumeCompany} animate-in animate-delay-3`}>
                    <div className={styles.timelineSpacer} />
                    <div className={styles.companyHeader}>
                      <Image src="/logos/Augmenta.svg" alt="Augmenta" width={32} height={32} className={styles.companyLogo} />
                      <span className={styles.companyName}>Augmenta</span>
                    </div>
                    <div className={styles.companyRoles}>
                      <div className={styles.timelineBar} />
                      <div className={styles.rolesContent}>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Principal Product Designer</h3>
                            <span className={styles.roleDates}>Aug 2023 – May 2024</span>
                          </div>
                          <p className={styles.roleDescription}>
                            Led end-to-end UX for a 0 to 1 Generative AI tool enabling engineers to create constructible, code-compliant electrical raceway designs, as the sole designer supporting 30+ engineers.
                          </p>
                          <ul className={styles.roleBullets}>
                            <li>Drove continuous product improvement through user research, testing, and iterative design — shaping workflows and building new capabilities like 4x expanded signal visibility across 3D and tabular views</li>
                            <li>Reduced the time-to-value metric from 14 to 5 days by streamlining generation workflows and cutting required cycles from 12 to 5 through clearer feedback and improved anomaly detection</li>
                            <li>Improved solution quality by reducing anomalies per output by 60% and cutting engineering intervention from 13+ to ~1 per project through better tooling, visualization, and in-product guidance</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className={`${styles.resumeCompany} animate-in animate-delay-4`}>
                    <div className={styles.timelineSpacer} />
                    <div className={styles.companyHeader}>
                      <Image src="/logos/meta.svg" alt="Meta" width={32} height={32} className={styles.companyLogo} />
                      <span className={styles.companyName}>Meta</span>
                    </div>
                    <div className={styles.companyRoles}>
                      <div className={styles.timelineBar} />
                      <div className={styles.rolesContent}>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Staff Product Designer</h3>
                            <span className={styles.roleDates}>Sep 2021 – Jul 2023</span>
                          </div>
                          <p className={styles.roleDescription}>
                            Directed and executed on design initiatives rooted in evidence across a horizontal portfolio of Recruiting Products, supporting Meta in the mission to discover, develop and hire the best talent in the world.
                          </p>
                          <ul className={styles.roleBullets}>
                            <li>Redesigned the Job Offer tool within Meta&apos;s Applicant Tracking System, improving offer extension velocity by over 10%, compensation approval velocity by 25%, and volume of data points by 50%</li>
                            <li>Redesigned the Internal Mobility transfer and eligibility tool, resulting in a 58% increase in data accuracy and a 33% reduction in processing time to earn an estimated savings of 2000 hours/year of productivity</li>
                            <li>Led design direction for a mixed-reality initiative of 40+ people across 6 organizations, including Recruiting Products and an external XR development shop. Drove the creation of a Design Brief, overcoming challenges around hardware logistics, digital onboarding. Successfully implemented a pilot program for our target users to participate in an immersive experience within a VR environment.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cognizant */}
                  <div className={`${styles.resumeCompany} animate-in animate-delay-4`}>
                    <div className={styles.timelineSpacer} />
                    <div className={styles.companyHeader}>
                      <Image src="/logos/Cognizant.svg" alt="Cognizant" width={32} height={32} className={styles.companyLogo} />
                      <span className={styles.companyName}>Cognizant (Previously known as Devbridge)</span>
                    </div>
                    <div className={styles.companyRoles}>
                      <div className={styles.timelineBar} />
                      <div className={styles.rolesContent}>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Product Design Manager</h3>
                            <span className={styles.roleDates}>Sep 2018 – Sep 2021</span>
                          </div>
                          <p className={styles.roleDescription}>
                            Managed the performance, career development, and utilization of a team of 4 Product Designers within the Toronto business unit. Directed all design phases across a broad portfolio of multi-product/multi-phase delivery engagements worth $25m over 4 years.
                          </p>
                          <ul className={styles.roleBullets}>
                            <li>Led design for mySCP, a cross-platform healthcare application suite used by 8,000+ clinicians across desktop, iOS, and Android</li>
                            <li>Led design for multiple CIBC banking products, including First Caribbean and Smart Banking for Business, spanning desktop, iOS, and Android</li>
                          </ul>
                        </div>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Senior Product Designer</h3>
                            <span className={styles.roleDates}>Sep 2017 – Sep 2018</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instacart */}
                  <div className={`${styles.resumeCompany} animate-in animate-delay-4`}>
                    <div className={styles.timelineSpacer} />
                    <div className={styles.companyHeader}>
                      <Image src="/logos/Instacart.svg" alt="Instacart" width={32} height={32} className={styles.companyLogo} />
                      <span className={styles.companyName}>Instacart (Previously known as Unata)</span>
                    </div>
                    <div className={styles.companyRoles}>
                      <div className={styles.timelineBar} />
                      <div className={styles.rolesContent}>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Senior Product Designer</h3>
                            <span className={styles.roleDates}>Jan 2017 – Sep 2017</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AdParlor */}
                  <div className={`${styles.resumeCompany} animate-in animate-delay-4`}>
                    <div className={styles.timelineSpacer} />
                    <div className={styles.companyHeader}>
                      <Image src="/logos/AdParlor.svg" alt="AdParlor" width={32} height={32} className={styles.companyLogo} />
                      <span className={styles.companyName}>AdParlor</span>
                    </div>
                    <div className={styles.companyRoles}>
                      <div className={styles.timelineBar} />
                      <div className={styles.rolesContent}>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Senior Product Designer</h3>
                            <span className={styles.roleDates}>Dec 2015 – Jan 2017</span>
                          </div>
                        </div>
                        <div className={styles.role}>
                          <div className={styles.roleHeader}>
                            <h3 className={styles.roleTitle}>Product Designer</h3>
                            <span className={styles.roleDates}>Dec 2013 – Dec 2015</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

                <div className={styles.educationList}>
                  <div className={styles.educationItem}>
                    <Image src="/logos/uoft.svg" alt="University of Toronto" width={32} height={32} className={styles.educationLogo} />
                    <div className={styles.educationDetails}>
                      <span className={styles.educationDegree}>
                        <a href="https://visualculture.utoronto.ca/" target="_blank" rel="noopener noreferrer">HBA, Visual Culture &amp; Communication</a>
                      </span>
                      <span className={styles.educationSchool}>University of Toronto</span>
                    </div>
                  </div>
                  <div className={styles.educationItem}>
                    <Image src="/logos/sheridan.svg" alt="Sheridan College" width={32} height={32} className={styles.educationLogo} />
                    <div className={styles.educationDetails}>
                      <span className={styles.educationDegree}>
                        <a href="https://www.sheridancollege.ca/programs/digital-communication-certificate" target="_blank" rel="noopener noreferrer">Certificate, Digital Communication</a>
                      </span>
                      <span className={styles.educationSchool}>Sheridan College</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificates Section */}
              <div className={`${styles.resumeSection} animate-in animate-delay-4`}>
                <div className={styles.resumeSectionHeader}>
                  <h2 className={styles.resumeSectionTitle}>Certificates</h2>
                </div>

                <div className={styles.educationList}>
                  <div className={styles.educationItem}>
                    <Image src="/logos/slii.svg" alt="Ken Blanchard" width={32} height={32} className={styles.educationLogo} />
                    <div className={styles.educationDetails}>
                      <span className={styles.educationDegree}>
                        <a href="https://www.kenblanchard.com/situationalleadership/" target="_blank" rel="noopener noreferrer">Situational Leadership (SLII)</a>
                      </span>
                      <span className={styles.educationSchool}>Ken Blanchard</span>
                    </div>
                  </div>
                  <div className={styles.educationItem}>
                    <Image src="/logos/Deque.svg" alt="Deque University" width={32} height={32} className={styles.educationLogo} />
                    <div className={styles.educationDetails}>
                      <span className={styles.educationDegree}>
                        <a href="https://www.deque.com/certification/accessibility-for-designers/" target="_blank" rel="noopener noreferrer">Accessibility for Designers</a>
                      </span>
                      <span className={styles.educationSchool}>Deque University</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
