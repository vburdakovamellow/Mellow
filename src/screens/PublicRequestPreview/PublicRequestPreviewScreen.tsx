import { useEffect, useRef, useState } from "react";
import "../../design-system/typography.css";
import styles from "./PublicRequestPreviewScreen.module.css";
import { Header } from "../../components/Header/Header";
import { Button } from "../../design-system/primitives/Button/Button";

function IconShare({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

type PaymentType = "hourly" | "fixed";

const formatRate = (rate: string) => {
  const num = parseFloat(rate);
  return Number.isInteger(num) ? num.toString() : num.toFixed(0);
};

function workloadPublicLabel(
  paymentType: PaymentType,
  workload: string
): string {
  if (paymentType === "hourly") {
    if (workload.includes("Less than 20") || workload.includes("Under 20"))
      return "Under 20hrs/week";
    if (workload.includes("20-40") || workload.includes("20-30"))
      return "20–30hrs/week";
    return "Over 30hrs/week";
  }
  if (paymentType === "fixed") {
    if (workload.toLowerCase().includes("1 month") || workload.includes("Under 1"))
      return "Under 1 month";
    if (workload.includes("1–3") || workload.includes("1-3"))
      return "1–3 months";
    return "3+ months";
  }
  return workload;
}

function projectTypeLabel(isOngoing: boolean): string {
  return "Ongoing project";
}

export function PublicRequestPreviewScreen({
  requestTitle = "Graphic Designer for Social Media Optimisation",
  roleTitle = "Graphic Designer",
  experienceLevel = "Middle",
  skills = ["Figma", "Canva", "Adobe Photoshop", "Logo Design", "Adobe Illustrator", "Graphic Design"],
  languages = ["English", "Spanish", "French"],
  negotiable = false,
  paymentType = "hourly" as PaymentType,
  fromRate = "20.00",
  toRate = "30.00",
  currency = "USD",
  workload = "Less than 20 hours per week",
  projectTypeOngoing = true,
  companyName = "Studio M",
  website = "studiom.example.com",
  projectSummaryText = "We are seeking a talented Graphic Designer to lead the visual redesign of our social media presence and marketing materials. This project aims to enhance brand identity, improve visual appeal, and optimize graphics for engagement and clarity.",
  keyResponsibilitiesList = [
    "Design and deliver high-quality visual content for social media platforms",
    "Create engaging graphics, illustrations, and layouts that align with brand guidelines",
    "Collaborate with marketing team to develop creative concepts and visual strategies",
    "Ensure consistency across all marketing materials and social media channels",
  ],
  requirementsList = [
    "Proficiency in design software such as Figma, Adobe Creative Suite, and Canva",
    "Strong portfolio demonstrating creative design skills",
    "Ability to work independently and meet deadlines",
    "Excellent communication skills and attention to detail",
  ],
  preferredSkillsList = [
    "Experience with social media design and marketing materials",
    "Knowledge of current design trends and best practices",
    "Understanding of brand identity and visual communication",
    "Ability to adapt designs for different platforms and formats",
  ],
  expiredInDays = 7,
  expiredInHours = 12,
  viewedCount = 42,
  appliedCount = 7,
  publishedLabel = "Published 3 days ago",
  location = "London, UK",
  timezone = "GMT+1",
}: {
  requestTitle?: string;
  roleTitle?: string;
  experienceLevel?: string;
  skills?: string[];
  languages?: string[];
  negotiable?: boolean;
  paymentType?: PaymentType;
  fromRate?: string;
  toRate?: string;
  currency?: string;
  workload?: string;
  projectTypeOngoing?: boolean;
  companyName?: string;
  website?: string;
  location?: string;
  timezone?: string;
  projectSummaryText?: string;
  keyResponsibilitiesList?: string[];
  requirementsList?: string[];
  preferredSkillsList?: string[];
  expiredInDays?: number;
  expiredInHours?: number;
  viewedCount?: number;
  appliedCount?: number;
  publishedLabel?: string;
}) {
  const budgetDisplay =
    negotiable
      ? "Negotiable"
      : paymentType === "hourly"
        ? `$${formatRate(fromRate)}-${formatRate(toRate)}`
        : `$${formatRate(fromRate)} – $${formatRate(toRate)} • Fixed price`;

  const dd = String(expiredInDays).padStart(2, "0");
  const hh = String(expiredInHours).padStart(2, "0");

  const moreCount =
    Math.max(0, skills.length - 4) + Math.max(0, languages.length - 2);
  const remainingSkills = skills.slice(4);
  const remainingLangs = languages.slice(2);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    const close = (e: MouseEvent) => {
      if (moreWrapRef.current && !moreWrapRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [moreOpen]);

  return (
    <div className={styles.screen}>
      <Header />
      <div className={styles.pageSpacer}>
        {/* Sticky block — full width like Edit header */}
        <div className={styles.stickyBlock}>
          <div className={styles.stickyBlockInner}>
            <div className={styles.stickyHeadRow}>
              <div className={styles.stickyHeadLeft}>
                <h1 className={styles.stickyTitle}>
                  {requestTitle}{" "}
                  <span className={styles.badgeNew}>New</span>
                  {" "}
                  <span className={styles.stickyTimer}>
                    Expired in {dd}d {hh}h
                  </span>
                </h1>
              </div>
              <div className={styles.stickyActions}>
                <Button variant="secondary" size="m" className={styles.saveOrShareBtn} leftIcon={<IconShare size={18} color="#8A8686" />}>
                  Share
                </Button>
                <Button variant="brand" size="m">
                  Apply now
                </Button>
              </div>
            </div>
            {/* Tags below the title */}
            <div className={styles.stickyTagsRow}>
              <div className={styles.stickyParams}>
                <span className={styles.stickyChip}>Level: {experienceLevel}</span>
                {skills.slice(0, 4).map((s) => (
                  <span key={s} className={styles.stickyChip}>
                    {s}
                  </span>
                ))}
                {languages.slice(0, 2).map((lang) => (
                  <span key={lang} className={styles.stickyChip}>
                    {lang}
                  </span>
                ))}
                {moreCount > 0 && (
                  <div ref={moreWrapRef} className={styles.stickyMoreWrap}>
                    <button
                      type="button"
                      className={styles.stickyMoreChip}
                      onClick={() => setMoreOpen((o) => !o)}
                      aria-expanded={moreOpen}
                    >
                      +{moreCount} more
                    </button>
                    {moreOpen && (
                      <div className={styles.stickyMorePopover}>
                        {remainingSkills.length > 0 && (
                          <div className={styles.stickyMoreSection}>
                            <span className={styles.stickyMoreLabel}>Skills</span>
                            <div className={styles.stickyMoreChips}>
                              {remainingSkills.map((s) => (
                                <span key={s} className={styles.stickyChip}>
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {remainingLangs.length > 0 && (
                          <div className={styles.stickyMoreSection}>
                            <span className={styles.stickyMoreLabel}>Languages</span>
                            <div className={styles.stickyMoreChips}>
                              {remainingLangs.map((lang) => (
                                <span key={lang} className={styles.stickyChip}>
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.contentLayout}>
              <div className={styles.mainContent}>
                {/* Block 1: Summary (h3 + paragraph) + Budget/Project type/Workload/Location */}
                <section className={styles.section}>
              <div className={`${styles.descriptionCard} ${styles.cardSummary}`}>
                {projectSummaryText && (
                  <div className={styles.descriptionSection}>
                    <h3 className={styles.descriptionSectionTitle}>Summary</h3>
                    <p className={styles.descriptionText}>{projectSummaryText}</p>
                  </div>
                )}
                <div className={styles.sectionCard}>
                  <div className={styles.sectionCardGrid}>
                    <div className={styles.sectionCardCol}>
                      <span className={styles.sectionCardIcon} aria-hidden>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                          <circle cx="7" cy="7" r="1.5" />
                        </svg>
                      </span>
                      <div className={styles.sectionCardContent}>
                        <span className={styles.sectionCardValue}>{budgetDisplay}</span>
                        <span className={styles.sectionCardLabel}>
                          {negotiable ? "Budget" : paymentType === "hourly" ? "Hourly rate" : "Fixed price"}
                        </span>
                      </div>
                    </div>
                    <div className={styles.sectionCardCol}>
                      <span className={styles.sectionCardIcon} aria-hidden>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
                          <path d="M2 11h20" />
                          <path d="M8 11v2" />
                          <path d="M16 11v2" />
                        </svg>
                      </span>
                      <div className={styles.sectionCardContent}>
                        <span className={styles.sectionCardValue}>{projectTypeLabel(projectTypeOngoing)}</span>
                        <span className={styles.sectionCardLabel}>Project Type</span>
                      </div>
                    </div>
                    <div className={styles.sectionCardCol}>
                      <span className={styles.sectionCardIcon} aria-hidden>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                      </span>
                      <div className={styles.sectionCardContent}>
                        <span className={styles.sectionCardValue}>{workloadPublicLabel(paymentType, workload)}</span>
                        <span className={styles.sectionCardLabel}>Workload</span>
                      </div>
                    </div>
                    <div className={styles.sectionCardCol}>
                      <span className={styles.sectionCardIcon} aria-hidden>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </span>
                      <div className={styles.sectionCardContent}>
                        <span className={styles.sectionCardValue}>Remote</span>
                        <span className={styles.sectionCardLabel}>Location</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Block 2: Key Responsibilities + Requirements + Preferred Skills */}
            <section className={styles.section}>
              <div className={`${styles.descriptionCard} ${styles.cardResponsibilities}`}>
                {keyResponsibilitiesList.length > 0 && (
                  <div className={styles.descriptionSection}>
                    <h3 className={styles.descriptionSectionTitle}>Key Responsibilities</h3>
                    <ul className={styles.descriptionList}>
                      {keyResponsibilitiesList.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {requirementsList.length > 0 && (
                  <div className={styles.descriptionSection}>
                    <h3 className={styles.descriptionSectionTitle}>Requirements</h3>
                    <ul className={styles.descriptionList}>
                      {requirementsList.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {preferredSkillsList.length > 0 && (
                  <div className={styles.descriptionSection}>
                    <h3 className={styles.descriptionSectionTitle}>Preferred Skills</h3>
                    <ul className={styles.descriptionList}>
                      {preferredSkillsList.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

                {/* What Happens Next */}
                <section className={styles.section}>
                  <div className={styles.whatHappensNext}>
                    <h2 className={styles.whatHappensNextTitle}>WHAT HAPPENS NEXT?</h2>
                    <div className={styles.whatHappensNextGrid}>
                      <div className={styles.whatHappensNextStep}>
                        <span className={styles.whatHappensNextStepNum} aria-hidden>1</span>
                        <h3 className={styles.whatHappensNextStepTitle}>Submit Your Application</h3>
                        <p className={styles.whatHappensNextStepDesc}>Complete the form with your details and work samples</p>
                      </div>
                      <div className={styles.whatHappensNextStep}>
                        <span className={styles.whatHappensNextStepNum} aria-hidden>2</span>
                        <h3 className={styles.whatHappensNextStepTitle}>Wait for Response</h3>
                        <p className={styles.whatHappensNextStepDesc}>You'll hear back if the client wants to move forward</p>
                      </div>
                      <div className={styles.whatHappensNextStep}>
                        <span className={styles.whatHappensNextStepNum} aria-hidden>3</span>
                        <h3 className={styles.whatHappensNextStepTitle}>Discuss the Project</h3>
                        <p className={styles.whatHappensNextStepDesc}>Selected candidates connect directly with the client</p>
                      </div>
                      <div className={styles.whatHappensNextStep}>
                        <span className={styles.whatHappensNextStepNum} aria-hidden>4</span>
                        <h3 className={styles.whatHappensNextStepTitle}>Close the Deal via Mellow</h3>
                        <p className={styles.whatHappensNextStepDesc}>Complete the deal through the Mellow platform</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Block 3: Ready to Apply */}
                <section className={styles.section}>
                  <div className={styles.applicationCard}>
                    <h2 className={styles.applicationCardTitle}>Ready to Apply?</h2>
                    <p className={styles.applicationCardText}>
                      Upload your CV and our AI will pre-fill your application form — you just review and send.
                    </p>
                    <div className={styles.applicationUploadArea}>
                      <p className={styles.applicationUploadText}>
                        Drop CV here or <span className={styles.applicationUploadLink}>browse</span>
                      </p>
                      <p className={styles.applicationUploadHint}>PDF, DOC or DOCX (up to 5 MB)</p>
                    </div>
                    <div className={styles.applicationUploadButtonWrap}>
                      <Button variant="brand" size="xl" className={styles.applicationUploadButton}>
                        Upload CV
                      </Button>
                    </div>
                    <button type="button" className={styles.applicationManualLink}>Manual setup</button>
                  </div>
                </section>
              </div>

              {/* Sidebar: Company + stats */}
              <aside className={styles.sidebar}>
                {(companyName || website || location || timezone) && (
                  <div className={styles.sidebarCompany}>
                    {(companyName || website) && (
                      <a
                        href={website ? (website.startsWith("http") ? website : `https://${website}`) : "#"}
                        target={website ? "_blank" : undefined}
                        rel={website ? "noopener noreferrer" : undefined}
                        className={styles.sidebarCompanyName}
                      >
                        {companyName || website?.replace(/^https?:\/\//, "") || "Company"}
                      </a>
                    )}
                    {(location || timezone) && (
                      <p className={styles.sidebarCompanyMetaLine}>
                        {[location, timezone].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <div className={styles.sidebarCompanyVerified}>
                      <span className={styles.sidebarCompanyVerifiedIcon} aria-hidden>
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6L5 9L12 2" />
                          <path d="M6 8L9 11L16 4" />
                        </svg>
                      </span>
                      <span>Verified company</span>
                    </div>
                  </div>
                )}
                <div className={styles.sidebarStats}>
                  <p className={styles.sidebarStatsRow}>
                    {viewedCount} viewed • {appliedCount} applied
                  </p>
                  <p className={styles.sidebarStatsRow}>{publishedLabel}</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
