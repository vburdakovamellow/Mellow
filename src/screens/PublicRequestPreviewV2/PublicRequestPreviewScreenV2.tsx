import "../../design-system/typography.css";
import styles from "./PublicRequestPreviewScreenV2.module.css";
import { Header } from "../../components/Header/Header";
import { Button } from "../../design-system/primitives/Button/Button";

function IconCheck({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 6L5 9L12 2" />
      <path d="M6 8L9 11L16 4" />
    </svg>
  );
}
function IconEnvelope({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function IconClock({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconPeople({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconTrophy({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
function IconLightning({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
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

export function PublicRequestPreviewScreenV2({
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
        ? `$${formatRate(fromRate)} - $${formatRate(toRate)} ${currency}`
        : `$${formatRate(fromRate)} - $${formatRate(toRate)} ${currency}`;

  const workloadShort = workloadPublicLabel(paymentType, workload);
  const startDateLabel = projectTypeOngoing ? "Ongoing" : "ASAP";

  return (
    <div className={styles.screen}>
      <Header />
      <div className={styles.pageSpacer}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.contentLayout}>
              {/* Main content (без обёртки previewDesktop) */}
              <div className={styles.previewMainContent}>
                {/* Header card: Company + location + timezone (top), Title, Summary, Experience Level, Skills, Languages */}
                <div className={styles.previewHeaderCard}>
                  {(companyName || location || timezone) && (
                    <div className={styles.previewCompanyMeta}>
                      {companyName && (
                        <a
                          href={website ? (website.startsWith("http") ? website : `https://${website}`) : "#"}
                          target={website ? "_blank" : undefined}
                          rel={website ? "noopener noreferrer" : undefined}
                          className={styles.previewCompanyLink}
                        >
                          {companyName}
                        </a>
                      )}
                      {companyName && (location || timezone) && <span className={styles.previewCompanyMetaSep}> </span>}
                      {(location || timezone) && (
                        <span className={styles.previewCompanyLocation}>
                          {[location, timezone].filter(Boolean).join(" · ")}
                        </span>
                      )}
                      {companyName && (
                        <span className={styles.previewCompanyVerified} aria-hidden>
                          <IconCheck size={18} />
                        </span>
                      )}
                    </div>
                  )}
                  <h1 className={styles.previewTitle}>{requestTitle}</h1>
                  {projectSummaryText && (
                    <p className={styles.previewText}>{projectSummaryText}</p>
                  )}
                  <div className={styles.previewSection}>
                    <h3 className={styles.previewHeaderSectionTitle}>Experience Level</h3>
                    <div className={styles.previewChips}>
                      <span className={styles.previewChip}>{experienceLevel}</span>
                    </div>
                  </div>
                  {skills.length > 0 && (
                    <div className={styles.previewSection}>
                      <h3 className={styles.previewHeaderSectionTitle}>Skills and Tech</h3>
                      <div className={styles.previewChips}>
                        {skills.map((s) => (
                          <span key={s} className={styles.previewChip}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {languages.length > 0 && (
                    <div className={styles.previewSection}>
                      <h3 className={styles.previewHeaderSectionTitle}>Languages Required</h3>
                      <div className={styles.previewChips}>
                        {languages.map((lang) => (
                          <span key={lang} className={styles.previewChip}>{lang}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content card: Summary, Video Note, Key Responsibilities, Requirements, Preferred Skills */}
                <div className={styles.previewHeaderCard}>
                  {projectSummaryText && (
                    <div className={styles.previewSection}>
                      <h3 className={styles.previewSectionTitle}>Summary</h3>
                      <p className={styles.previewText}>{projectSummaryText}</p>
                    </div>
                  )}
                  {keyResponsibilitiesList.length > 0 && (
                    <div className={styles.previewSection}>
                      <h3 className={styles.previewSectionTitle}>Key Responsibilities</h3>
                      <ul className={styles.previewList}>
                        {keyResponsibilitiesList.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {requirementsList.length > 0 && (
                    <div className={styles.previewSection}>
                      <h3 className={styles.previewSectionTitle}>Requirements</h3>
                      <ul className={styles.previewList}>
                        {requirementsList.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {preferredSkillsList.length > 0 && (
                    <div className={styles.previewSection}>
                      <h3 className={styles.previewSectionTitle}>Preferred Skills</h3>
                      <ul className={styles.previewList}>
                        {preferredSkillsList.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* What happens next — 4 steps with icons */}
                <div className={styles.previewNextStepsCard}>
                  <h3 className={styles.previewNextStepsTitle}>What Happens Next?</h3>
                  <div className={styles.previewNextStepsGrid}>
                    <div className={styles.previewNextStep}>
                      <span className={styles.previewNextStepIcon} aria-hidden>
                        <IconEnvelope size={24} />
                      </span>
                      <div className={styles.previewNextStepContent}>
                        <strong className={styles.previewNextStepTitle}>Submit Your Application</strong>
                        <p className={styles.previewNextStepsText}>Complete the form with your details and work samples</p>
                      </div>
                    </div>
                    <div className={styles.previewNextStep}>
                      <span className={styles.previewNextStepIcon} aria-hidden>
                        <IconClock size={24} />
                      </span>
                      <div className={styles.previewNextStepContent}>
                        <strong className={styles.previewNextStepTitle}>Wait for Response</strong>
                        <p className={styles.previewNextStepsText}>You'll hear back if the client wants to move forward</p>
                      </div>
                    </div>
                    <div className={styles.previewNextStep}>
                      <span className={styles.previewNextStepIcon} aria-hidden>
                        <IconPeople size={24} />
                      </span>
                      <div className={styles.previewNextStepContent}>
                        <strong className={styles.previewNextStepTitle}>Discuss the Project</strong>
                        <p className={styles.previewNextStepsText}>Selected candidates connect directly with the client</p>
                      </div>
                    </div>
                    <div className={styles.previewNextStep}>
                      <span className={styles.previewNextStepIcon} aria-hidden>
                        <IconTrophy size={24} />
                      </span>
                      <div className={styles.previewNextStepContent}>
                        <strong className={styles.previewNextStepTitle}>Close the Deal via Mellow</strong>
                        <p className={styles.previewNextStepsText}>Complete the deal through the Mellow platform</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ready to Apply */}
                <div className={styles.previewApplicationCard}>
                  <h2 className={styles.previewApplicationTitle}>Ready to Apply?</h2>
                  <p className={styles.previewApplicationText}>
                    Upload your CV and AI will pre-fill your application — you just review and submit.
                  </p>
                  <div className={styles.previewUploadArea}>
                    <p className={styles.previewUploadText}>
                      Drop CV here or <span className={styles.previewUploadLink}>browse</span>
                    </p>
                    <p className={styles.previewUploadHint}>PDF, DOC or DOCX (up to 5 MB)</p>
                  </div>
                  <div className={styles.previewUploadButtonWrap}>
                    <Button variant="brand" size="xl" className={styles.previewUploadButton}>
                      Upload CV
                    </Button>
                  </div>
                  <button type="button" className={styles.previewManualLink}>Manual setup</button>
                </div>
              </div>

              {/* Sidebar: Company, Budget card (первый), Experience/Skills/Languages (второй) */}
              <aside className={styles.sidebar}>
                <div className={styles.previewBudgetCard}>
                  <div className={styles.previewSection}>
                    <h3 className={styles.previewBudgetTitle}>Budget</h3>
                    <p className={styles.previewBudgetAmount}>
                      {paymentType === "hourly" && !negotiable ? (
                        <>
                          <span className={styles.previewBudgetNumbers}>
                            ${formatRate(fromRate)}–{formatRate(toRate)}/hr
                          </span>
                        </>
                      ) : (
                        <span className={styles.previewBudgetNumbers}>{budgetDisplay}</span>
                      )}
                    </p>
                    {!negotiable && (
                      <div className={styles.previewMarketRateBadge}>
                        <span className={styles.previewMarketRateIcon} aria-hidden>
                          <IconLightning size={16} />
                        </span>
                        <span className={styles.previewMarketRateText}>Above Market Average</span>
                      </div>
                    )}
                    <Button variant="brand" size="m" className={styles.previewBudgetApplyBtn}>
                      Apply now
                    </Button>
                  </div>
                  <div className={styles.previewSection}>
                    <div className={styles.previewTimelineItem}>
                      <span className={styles.previewTimelineLabel}>Project type:</span>
                      <span>{startDateLabel}</span>
                    </div>
                    <div className={styles.previewTimelineItem}>
                      <span className={styles.previewTimelineLabel}>Workload:</span>
                      <span>{workloadShort}</span>
                    </div>
                  </div>
                  <div className={styles.previewExpiredRow}>
                    <span className={styles.previewExpiredIcon} aria-hidden>
                      <IconClock size={16} />
                    </span>
                    <span>Expired in {String(expiredInDays).padStart(2, "0")}d {String(expiredInHours).padStart(2, "0")}h</span>
                  </div>
                  <p className={styles.previewViewedApplied}>
                    {viewedCount} viewed • {appliedCount} applied
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
