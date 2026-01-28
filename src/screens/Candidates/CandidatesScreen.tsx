import { useState } from "react";
import { Button } from "../../design-system/primitives/Button/Button";
import "../../design-system/typography.css";
import styles from "./CandidatesScreen.module.css";

export function CandidatesScreen({
  requestTitle,
  onGoBack
}: {
  requestTitle?: string;
  onGoBack?: () => void;
}) {
  const [candidates] = useState<Array<{
    id: string;
    name: string;
    title?: string;
    match?: number;
    status?: "new" | "contacted" | "interview" | "rejected";
  }>>([]);

  const handleScheduleCall = () => {
    alert("Schedule a call with Orchestrator (stub)");
  };

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.fixedHeader}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>mellow</div>
          
          <div className={styles.headerRight}>
            <button className={styles.userButton}>
              <span>AI Scout</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className={styles.avatar}>VB</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.container}>
          {/* Back to Dashboard */}
          {onGoBack && (
            <button className={styles.backLink} onClick={onGoBack}>
              <span className={styles.backArrow}>←</span>
              <span className={styles.backText}>Dashboard</span>
            </button>
          )}

          {/* Progress Stepper */}
          <div className={styles.progressStepper}>
            <div className={styles.step}>
              <div className={styles.stepIconCompleted}>✓</div>
              <span className={styles.stepLabel}>Your request</span>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepIconCompleted}>✓</div>
              <span className={styles.stepLabel}>Promote</span>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepIconCompleted}>✓</div>
              <span className={styles.stepLabel}>Ultra</span>
            </div>
            <div className={styles.stepLineActive}></div>
            <div className={styles.step}>
              <div className={styles.stepIconActive}>✓</div>
              <span className={styles.stepLabelActive}>Candidates</span>
            </div>
          </div>

          {/* Request Title */}
          {requestTitle && (
            <div className={styles.requestHeader}>
              <h1 className={styles.requestTitle}>{requestTitle}</h1>
            </div>
          )}

          {/* Candidates Section */}
          <div className={styles.candidatesSection}>
            <div className={styles.candidatesHeader}>
              <div>
                <h2 className={styles.candidatesTitle}>Candidates</h2>
              </div>
            </div>

            {/* Status Tabs and Sort */}
            <div className={styles.filterRow}>
              <div className={styles.statusTabs}>
                <button className={`${styles.statusTab} ${styles.statusTabActive}`}>
                  All
                </button>
                <button className={styles.statusTab}>
                  New
                  <span className={styles.statusBadge}>3</span>
                </button>
                <button className={styles.statusTab}>
                  Shortlisted
                  <span className={styles.statusBadge}>2</span>
                </button>
                <button className={styles.statusTab}>
                  Invited
                  <span className={styles.statusBadge}>0</span>
                </button>
                <button className={styles.statusTab}>
                  Assigned
                  <span className={styles.statusBadge}>0</span>
                </button>
              </div>

              <button className={styles.sortButton}>
                Sort by date
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Preview hint - shows how candidates will look */}
            {candidates.length === 0 && (
              <div className={styles.previewHint}>
                <div className={styles.previewRow}>
                  <div className={styles.previewAvatar}></div>
                  <div className={styles.previewInfo}>
                    <div className={styles.previewName}></div>
                    <div className={styles.previewTitle}></div>
                  </div>
                  <div className={styles.previewBadge}>95% match</div>
                </div>
              </div>
            )}

            {candidates.length > 0 ? (
              <div className={styles.candidatesList}>
                {candidates.map((candidate) => (
                  <div key={candidate.id} className={styles.candidateRow}>
                    <div className={styles.candidateMain}>
                      <div className={styles.candidateName}>{candidate.name}</div>
                      {candidate.title && (
                        <div className={styles.candidateMeta}>{candidate.title}</div>
                      )}
                    </div>
                    <div className={styles.candidateRight}>
                      {typeof candidate.match === "number" && (
                        <div className={styles.candidateBadge}>{candidate.match}% match</div>
                      )}
                      {candidate.status && (
                        <div className={styles.candidateBadge}>{candidate.status}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                {/* Illustration */}
                <div className={styles.emptyIllustration}>
                  <svg width="120" height="84" viewBox="0 0 200 140" fill="none" aria-hidden="true">
                    {/* People waiting illustration (monochrome) */}
                    <g transform="translate(50, 20)">
                      {/* Person 1 */}
                      <circle cx="25" cy="30" r="15" fill="#E5E5E5" stroke="#000000" strokeWidth="2" />
                      <rect x="10" y="50" width="30" height="40" fill="#E5E5E5" stroke="#000000" strokeWidth="2" rx="4" />
                      
                      {/* Person 2 */}
                      <circle cx="75" cy="30" r="15" fill="#E5E5E5" stroke="#000000" strokeWidth="2" />
                      <rect x="60" y="50" width="30" height="40" fill="#E5E5E5" stroke="#000000" strokeWidth="2" rx="4" />
                      
                      {/* Person 3 */}
                      <circle cx="50" cy="60" r="12" fill="#E5E5E5" stroke="#000000" strokeWidth="2" />
                      <rect x="38" y="75" width="24" height="35" fill="#E5E5E5" stroke="#000000" strokeWidth="2" rx="4" />
                      
                      {/* Stars/sparkles */}
                      <path d="M 15 15 L 17 17 L 15 19 L 13 17 Z" fill="#000000" />
                      <path d="M 85 18 L 87 20 L 85 22 L 83 20 Z" fill="#000000" />
                      <path d="M 50 10 L 52 12 L 50 14 L 48 12 Z" fill="#000000" />
                    </g>
                  </svg>
                </div>

                {/* Value Proposition Section */}
                <div className={styles.valueSection}>
                  <h3 className={styles.valueTitle}>Candidates will appear here</h3>
                  <p className={styles.valueText}>
                    When contractors apply to your request, you'll see them on this page with AI-powered match scores. 
                    This helps you quickly identify the best candidates without manually reviewing every application.
                  </p>
                </div>

                {/* Action Section */}
                <div className={styles.actionSection}>
                  <div className={styles.actionCard}>
                    <h4 className={styles.actionTitle}>Want candidates faster?</h4>
                    <p className={styles.actionText}>
                      Book a demo and we'll help you find candidates faster (it's free).
                    </p>
                    <Button variant="secondary" onClick={handleScheduleCall}>
                      Meet your Ultra Manager
                    </Button>
                  </div>

                  <div className={styles.actionCard}>
                    <h4 className={styles.actionTitle}>We've launched the search</h4>
                    <p className={styles.actionText}>
                      Meanwhile, you can promote your request yourself to get more visibility.
                    </p>
                    <Button variant="secondary" onClick={() => {
                      // Copy link to clipboard
                      navigator.clipboard.writeText(window.location.href);
                      // Navigate to promote section
                      alert("Link copied! Opening Promote section...");
                    }}>
                      Promote
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
