import { useState } from "react";
import { Button } from "../../design-system/primitives/Button/Button";
import "../../design-system/typography.css";
import styles from "./CandidatesScreen.module.css";

// Version 1: Empty State (no Ultra step)
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
    ultraSource?: boolean;
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
          {/* Navigation Row */}
          <div className={styles.navigationRow}>
            {onGoBack && (
              <button className={styles.backLink} onClick={onGoBack}>
                <span className={styles.backArrow}>←</span>
                <span className={styles.backText}>Dashboard</span>
              </button>
            )}

            <div className={styles.navigationTabs}>
              <button className={styles.navTab}>
                Your request
              </button>
              <button className={`${styles.navTab} ${styles.navTabActive}`}>
                Candidates
              </button>
              <button className={styles.navTab}>
                Promote
              </button>
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

            {candidates.length > 0 ? (
              <>
                {/* Preview hint - shows how candidates will look */}
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
                        {candidate.ultraSource && (
                          <div className={styles.ultraBadge}>Ultra</div>
                        )}
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
              </>
            ) : (
              <div className={styles.emptyState}>
                {/* Preview hint - shows how candidates will look */}
                <div className={styles.emptyStateWithPreview}>
                  <div className={styles.previewHintList}>
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

                    <div className={styles.previewHint}>
                      <div className={styles.previewRow}>
                        <div className={styles.previewAvatar}></div>
                        <div className={styles.previewInfo}>
                          <div className={styles.previewName}></div>
                          <div className={styles.previewTitle}></div>
                        </div>
                        <div className={styles.previewBadge}>92% match</div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar - Action Section */}
                  <div className={styles.emptySidebar}>
                    <div className={styles.actionCard}>
                      <h3 className={styles.actionTitle}>Want a more personalized shortlist?</h3>
                      <p className={styles.actionText}>
                        Book a slot and we'll help you find the best match.
                      </p>
                      <Button variant="secondary" onClick={handleScheduleCall}>
                        Meet your Ultra Manager
                      </Button>
                    </div>
                  </div>
                </div>

                <div className={styles.emptyStateContent}>
                  {/* Illustration */}
                  <div className={styles.emptyIllustration}>
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                      {/* Timer/Clock icon */}
                      <circle cx="60" cy="60" r="45" stroke="#000000" strokeWidth="3" fill="#ffffff"/>
                      <circle cx="60" cy="60" r="3" fill="#000000"/>
                      {/* Hour hand */}
                      <line x1="60" y1="60" x2="60" y2="35" stroke="#000000" strokeWidth="3" strokeLinecap="round"/>
                      {/* Minute hand */}
                      <line x1="60" y1="60" x2="80" y2="60" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                      {/* Clock marks */}
                      <line x1="60" y1="20" x2="60" y2="25" stroke="#000000" strokeWidth="2"/>
                      <line x1="95" y1="60" x2="100" y2="60" stroke="#000000" strokeWidth="2"/>
                      <line x1="60" y1="95" x2="60" y2="100" stroke="#000000" strokeWidth="2"/>
                      <line x1="20" y1="60" x2="25" y2="60" stroke="#000000" strokeWidth="2"/>
                    </svg>
                  </div>

                  {/* Value Proposition Section */}
                  <div className={styles.valueSection}>
                    <h3 className={styles.valueTitle}>You will see candidates here</h3>
                    <p className={styles.valueText}>
                      We've launched a search in our internal Mellow database. You'll see the results within 48 hours.
                    </p>
                    <p className={styles.valueText}>
                      Meanwhile, you can{" "}
                      <a 
                        href="#promote" 
                        className={styles.promoteLink}
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText(window.location.href);
                          alert("Link copied! Opening Promote section...");
                        }}
                      >
                        Promote
                      </a>
                      {" "}your request yourself to get more visibility.
                    </p>
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
