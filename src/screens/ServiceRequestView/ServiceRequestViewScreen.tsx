import { useState } from "react";
import { Button } from "../../design-system/primitives/Button/Button";
import { Chip } from "../../design-system/primitives/Chip/Chip";

import "../../design-system/typography.css";
import styles from "./ServiceRequestViewScreen.module.css";
import type { SharePackRequest } from "../SharePack/SharePackScreen";

function IconStar({ size = 20, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 2l2.4 5.2L18 8l-4.5 4L14.8 18 10 15l-4.8 3L6.5 12 2 8l5.6-.8L10 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

function IconCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" fill="#000000" />
      <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Header({
  active,
  onGoToEdit,
  onGoToShare,
  onGoToView
}: {
  active: "view";
  onGoToEdit?: () => void;
  onGoToShare?: () => void;
  onGoToView?: () => void;
}) {
  return (
    <div className={styles.fixedHeader}>
      <div className={[styles.container, styles.headerInner].join(" ")}>
        <div className={styles.logo}>mellow</div>
      </div>
    </div>
  );
}

export function ServiceRequestViewScreen({
  onGoToEdit,
  onGoToShare,
  onGoToView
}: {
  onGoToEdit?: () => void;
  onGoToShare?: (req: SharePackRequest) => void;
  onGoToView?: () => void;
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [showVerificationTooltip, setShowVerificationTooltip] = useState(false);

  // Data structure matching production
  const requestData = {
    id: "12345", // Dynamic request ID
    isAuthor: true, // Is current user the author of this request
    publishedDate: "January 20, 2026",
    title: "Graphic Designer for Social Media Optimisation",
    talentProfile: "Graphic Designer, Middle", // From production "Talent profile"
    company: "", // Not filled in production
    isVerified: false,
    industryBlind: "Creative Services",
    timezone: "",
    experienceLevel: "Middle",
    contractType: "T&M" as const,
    isNew: true,
    skills: ["Figma", "Canva", "Adobe Photoshop"], // Matching production
    languages: ["English"], // Matching production
    hasVideoNote: false,
    description: {
      summary:
        "We are seeking a talented Graphic Designer to lead the redesign of our social media presence. This project aims to enhance visual appeal, improve engagement, and optimize content for various platforms. The ideal candidate will collaborate closely with marketing team to create modern, engaging designs that align with brand goals.",
      responsibilities: [
        "Design and deliver high-quality graphics for social media platforms",
        "Ensure design consistency with the overall brand identity",
        "Iterate designs based on performance metrics and team feedback",
        "Stay up-to-date with the latest design trends and social media best practices"
      ],
      requirements: [
        "Proven experience as a Graphic Designer, preferably with social media projects",
        "Strong proficiency in design tools such as Figma, Canva, Adobe Photoshop",
        "Excellent understanding of design principles, typography, color theory",
        "Ability to work under tight deadlines and manage multiple projects"
      ]
    },
    budget: {
      type: "hourly" as const,
      from: "20.00",
      to: "30.00",
      currency: "USD",
      negotiable: false,
      marketRate: "High" // From production screenshot
    },
    timeline: {
      startDate: "ASAP",
      workload: "Less 20h/week", // Matching production format
      flexible: false
    },
    location: "Remote from any country",
    deadline: {
      days: 3,
      hours: 12
    }
  };

  const handleApply = () => {
    alert("Apply flow (stub)");
  };

  const handleBackToRequests = () => {
    if (requestData.isAuthor) {
      alert("Navigate to requests list (stub)");
    }
  };

  function buildShareRequest(): SharePackRequest {
    return {
      id: requestData.id,
      title: requestData.title,
      companyName: requestData.company || undefined,
      location: requestData.location,
      skills: requestData.skills,
      languages: requestData.languages,
      timeline: {
        workload: requestData.timeline.workload,
        startDate: requestData.timeline.startDate,
        flexible: requestData.timeline.flexible
      },
      marketMarker: requestData.budget.marketRate,
      budget: {
        paymentType: requestData.budget.type,
        from: requestData.budget.from,
        to: requestData.budget.to,
        currency: requestData.budget.currency
      }
    };
  }

  return (
    <div className={styles.screen}>
      <Header
        active="view"
        onGoToEdit={onGoToEdit}
        onGoToShare={() => onGoToShare?.(buildShareRequest())}
        onGoToView={onGoToView}
      />

      <div className={styles.content}>
        <div className={styles.container}>
          {/* Header: Identity & Action */}
          <div className={styles.requestHeader}>
            <div className={styles.requestHeaderLeft}>
              {/* Breadcrumbs - only for author */}
              {requestData.isAuthor && (
                <div className={styles.breadcrumbs}>
                  <span className={styles.breadcrumbLink} onClick={handleBackToRequests}>
                    Requests
                  </span>
                  <span className={styles.breadcrumbSeparator}>/</span>
                  <span className={styles.breadcrumbCurrent}>#SR-{requestData.id}</span>
                </div>
              )}
              
              {/* Title */}
              <h1 className={styles.requestTitle}>{requestData.title}</h1>
              
              {/* Trust Row: Company + Verified */}
              <div className={styles.trustRow}>
                <span className={styles.clientName}>
                  {requestData.company || requestData.industryBlind}
                </span>
                {requestData.isVerified && (
                  <div
                    className={styles.verifiedIcon}
                    onMouseEnter={() => setShowVerificationTooltip(true)}
                    onMouseLeave={() => setShowVerificationTooltip(false)}
                  >
                    <IconCheck size={16} />
                    {showVerificationTooltip && (
                      <div className={styles.tooltip}>Verified Customer</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.requestHeaderRight}>
              {/* Timer Badge */}
              <div className={styles.timerBadge}>
                Remaining {requestData.deadline.days}d {requestData.deadline.hours}h
              </div>
              
              {/* Save Button */}
              <button
                type="button"
                className={[styles.iconButton, isSaved ? styles.iconButtonActive : ""].filter(Boolean).join(" ")}
                onClick={() => setIsSaved(!isSaved)}
                aria-label="Save request"
              >
                <IconStar size={20} filled={isSaved} />
              </button>
              
              {/* Primary CTA */}
              <Button variant="brand" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>

          {/* Body: Two Column Layout */}
          <div className={styles.bodyLayout}>
            {/* Left Column: Main Content */}
            <div className={styles.mainColumn}>
              {/* Qualification Block */}
              <div className={styles.qualificationBlock}>
                <div className={styles.qualRow}>
                  <span className={styles.qualLabel}>Experience</span>
                  <span className={styles.qualValue}>{requestData.experienceLevel}</span>
                </div>

                <div className={styles.qualRow}>
                  <span className={styles.qualLabel}>Tech Stack</span>
                  <div className={styles.tagsList}>
                    {requestData.skills.map((skill) => (
                      <span key={skill} className={styles.techTag}>{skill}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.qualRow}>
                  <span className={styles.qualLabel}>Languages</span>
                  <div className={styles.tagsList}>
                    {requestData.languages.map((lang) => (
                      <span key={lang} className={styles.softTag}>{lang}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.qualRow}>
                  <span className={styles.qualLabel}>Contract</span>
                  <span className={styles.qualValue}>{requestData.contractType}</span>
                </div>
              </div>

              {/* Summary Block */}
              <div className={styles.summaryBlock}>
                <div className={styles.summaryContent}>
                  <h3 className={styles.blockTitle}>Project Summary</h3>
                  <p className={styles.bodyText}>{requestData.description.summary}</p>
                </div>
                {requestData.hasVideoNote && (
                  <div className={styles.videoNoteContainer}>
                    <div className={styles.videoBubble}>
                      <div className={styles.videoBubbleInner}>▶</div>
                    </div>
                    <p className={styles.videoCaption}>Manager's Note</p>
                  </div>
                )}
              </div>

              {/* Deliverables/SOW Block */}
              <div className={styles.sowBlock}>
                <h3 className={styles.blockTitle}>Key Responsibilities</h3>
                <ul className={styles.sowList}>
                  {requestData.description.responsibilities.map((item, idx) => (
                    <li key={idx} className={styles.sowItem}>
                      <span className={styles.checkmark}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements Block */}
              <div className={styles.sowBlock}>
                <h3 className={styles.blockTitle}>Requirements</h3>
                <ul className={styles.sowList}>
                  {requestData.description.requirements.map((item, idx) => (
                    <li key={idx} className={styles.sowItem}>
                      <span className={styles.checkmark}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className={styles.sidebarColumn}>
              {/* Budget Card */}
              <div className={styles.sidebarCard}>
                <h4 className={styles.sidebarCardTitle}>Budget</h4>
                <div className={styles.budgetAmount}>
                  ${requestData.budget.from} - ${requestData.budget.to}/{requestData.budget.type === "hourly" ? "hr" : "project"}
                </div>
                <div className={styles.budgetMeta}>
                  {requestData.budget.type === "hourly" ? "Hourly Rate" : "Fixed Price"}
                  {requestData.budget.negotiable && " • Negotiable"}
                </div>
              </div>

              {/* Logistics Card */}
              <div className={styles.sidebarCard}>
                <ul className={styles.logisticsList}>
                  <li className={styles.logisticsItem}>
                    <span className={styles.logLabel}>Start Date</span>
                    <span className={styles.logValue}>{requestData.timeline.startDate}</span>
                  </li>
                  <li className={styles.logisticsItem}>
                    <span className={styles.logLabel}>Workload</span>
                    <span className={styles.logValue}>{requestData.timeline.workload}</span>
                  </li>
                  <li className={styles.logisticsItem}>
                    <span className={styles.logLabel}>Location</span>
                    <span className={styles.logValue}>{requestData.location}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* What Happens Next - Full Width Bottom Section */}
          <div className={styles.processSection}>
            <h2 className={styles.processSectionTitle}>What happens next?</h2>
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <strong className={styles.stepTitle}>Submit your application</strong>
                  <p className={styles.stepText}>Fill out a brief form with your details and portfolio</p>
                </div>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <strong className={styles.stepTitle}>Manager reviews within 48h</strong>
                  <p className={styles.stepText}>The hiring manager will review your application and respond</p>
                </div>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <strong className={styles.stepTitle}>Interview if shortlisted</strong>
                  <p className={styles.stepText}>Selected candidates will be invited for a brief interview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
