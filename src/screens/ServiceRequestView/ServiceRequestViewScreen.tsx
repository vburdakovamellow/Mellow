import { useState } from "react";
import { Button } from "../../design-system/primitives/Button/Button";
import { Chip } from "../../design-system/primitives/Chip/Chip";

import "../../design-system/typography.css";
import styles from "./ServiceRequestViewScreen.module.css";

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
      <circle cx="8" cy="8" r="7" fill="var(--ds-color-button-brand)" />
      <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Header({ isAuthor, onBackToEdit }: { isAuthor?: boolean; onBackToEdit?: () => void }) {
  return (
    <div className={styles.fixedHeader}>
      <div className={[styles.container, styles.headerInner].join(" ")}>
        <div className={styles.logo}>mellow</div>
        {isAuthor && onBackToEdit && (
          <button className={styles.backToEditBtn} onClick={onBackToEdit}>
            Back to Edit
          </button>
        )}
      </div>
    </div>
  );
}

export function ServiceRequestViewScreen({ onBackToEdit }: { onBackToEdit?: () => void }) {
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

  return (
    <div className={styles.screen}>
      <Header isAuthor={requestData.isAuthor} onBackToEdit={onBackToEdit} />

      <div className={styles.content}>
        <div className={styles.container}>
          {/* Breadcrumbs */}
          <div className={styles.breadcrumbs}>
            <span
              className={[styles.breadcrumbLink, requestData.isAuthor ? styles.breadcrumbClickable : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={requestData.isAuthor ? handleBackToRequests : undefined}
            >
              Requests
            </span>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>#SR-{requestData.id}</span>
          </div>

          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className={styles.heroMain}>
              {requestData.publishedDate && (
                <p className={styles.publishedDate}>Published on {requestData.publishedDate}</p>
              )}
              <div className={styles.titleRow}>
                <h1 className={styles.title}>{requestData.title}</h1>
                {requestData.isNew && <span className={styles.newBadge}>NEW</span>}
              </div>
              <p className={styles.talentProfile}>{requestData.talentProfile}</p>
              {(requestData.company || requestData.industryBlind) && (
                <div className={styles.companyRow}>
                  <span className={styles.companyName}>
                    {requestData.company || requestData.industryBlind}
                  </span>
                  {requestData.isVerified && (
                    <div
                      className={styles.verificationWrapper}
                      onMouseEnter={() => setShowVerificationTooltip(true)}
                      onMouseLeave={() => setShowVerificationTooltip(false)}
                    >
                      <IconCheck size={16} />
                      {showVerificationTooltip && (
                        <div className={styles.tooltip}>Verified by Mellow</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {requestData.hasVideoNote && (
              <div className={styles.videoBubble}>
                <div className={styles.videoBubbleInner}>▶</div>
              </div>
            )}
          </div>

          {/* Meta Bar */}
          <div className={styles.metaBar}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Closes in</span>
              <span className={styles.timerValue}>
                {requestData.deadline.days}d {requestData.deadline.hours}h
              </span>
            </div>
            <div className={styles.metaDivider} />
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Experience</span>
              <span className={styles.metaValue}>{requestData.experienceLevel}</span>
            </div>
            <div className={styles.metaDivider} />
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Contract</span>
              <span className={styles.metaValue}>{requestData.contractType}</span>
            </div>
          </div>

          {/* Skills, Languages & Budget */}
          <div className={styles.tagsSection}>
            <div className={styles.tagGroup}>
              <p className={styles.tagGroupTitle}>Skills</p>
              <div className={styles.chipGrid}>
                {requestData.skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>

            <div className={styles.tagGroup}>
              <p className={styles.tagGroupTitle}>Languages</p>
              <div className={styles.chipGrid}>
                {requestData.languages.map((lang) => (
                  <Chip key={lang}>{lang}</Chip>
                ))}
              </div>
            </div>

            <div className={[styles.tagGroup, styles.budgetGroup].join(" ")}>
              <p className={styles.tagGroupTitle}>Budget</p>
              <p className={styles.budgetValue}>
                ${requestData.budget.from} - ${requestData.budget.to}/
                {requestData.budget.type === "hourly" ? "hour" : "project"}
              </p>
              {requestData.budget.negotiable && (
                <span className={styles.negotiableBadge}>Negotiable</span>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <Button variant="brand" onClick={handleApply} className={styles.applyButton}>
              Apply now
            </Button>
            <button
              type="button"
              className={[styles.saveButton, isSaved ? styles.saveButtonActive : ""].filter(Boolean).join(" ")}
              onClick={() => setIsSaved(!isSaved)}
              aria-label="Save request"
            >
              <IconStar size={20} filled={isSaved} />
            </button>
          </div>

          {/* Main Description */}
          <div className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>Project Summary</h2>
            <p className={styles.descriptionText}>{requestData.description.summary}</p>

            <h2 className={styles.sectionTitle}>Key Responsibilities</h2>
            <ul className={styles.list}>
              {requestData.description.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>Requirements</h2>
            <ul className={styles.list}>
              {requestData.description.requirements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          <div className={styles.additionalInfo}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>Timeline</h3>
              <p className={styles.infoCardValue}>Start: {requestData.timeline.startDate}</p>
              <p className={styles.infoCardValue}>Workload: {requestData.timeline.workload}</p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>Location & Timezone</h3>
              <p className={styles.infoCardValue}>{requestData.location}</p>
              <p className={styles.infoCardValue}>{requestData.timezone}</p>
            </div>
          </div>

          {/* What Happens Next */}
          <div className={styles.processSection}>
            <h2 className={styles.processSectionTitle}>What happens next?</h2>
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>Submit your application</h4>
                  <p className={styles.stepText}>Fill out a brief form with your details and portfolio</p>
                </div>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>Manager reviews within 48h</h4>
                  <p className={styles.stepText}>The hiring manager will review your application and respond</p>
                </div>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>Interview if shortlisted</h4>
                  <p className={styles.stepText}>Selected candidates will be invited for a brief interview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={styles.bottomCta}>
            <Button variant="brand" onClick={handleApply} className={styles.applyButton}>
              Apply now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
