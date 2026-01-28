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
            <Button variant="secondary">
              + New request
            </Button>
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
          {/* Request Title & Back */}
          <div className={styles.requestHeader}>
            {onGoBack && (
              <button className={styles.backButton} onClick={onGoBack}>
                ←
              </button>
            )}
            
            {requestTitle && (
              <h1 className={styles.requestTitle}>{requestTitle}</h1>
            )}
          </div>

          {/* Candidates Section */}
          <div className={styles.candidatesSection}>
            <div className={styles.candidatesHeader}>
              <div>
                <h2 className={styles.candidatesTitle}>Candidates</h2>
                <p className={styles.candidatesSubtitle}>
                  All candidates who applied to your request will appear here.
                </p>
              </div>
            </div>

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
                {/* Value Proposition Section */}
                <div className={styles.valueSection}>
                  <h3 className={styles.valueTitle}>Your candidates are waiting</h3>
                  <p className={styles.valueText}>
                    Once freelancers start applying to your request, you'll see them here with AI-powered match scores, 
                    making it easy to identify the best candidates quickly.
                  </p>
                </div>

                {/* Action Section */}
                <div className={styles.actionSection}>
                  <p className={styles.actionText}>
                    Get your first candidates faster by scheduling a call with the Orchestrator.
                  </p>
                  <Button variant="secondary" onClick={handleScheduleCall}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: "8px" }} aria-hidden="true">
                      <path d="M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M8 5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Schedule a call with Orchestrator
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
