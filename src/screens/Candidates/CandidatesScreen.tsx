import { useState } from "react";
import { Button } from "../../design-system/primitives/Button/Button";
import "../../design-system/typography.css";
import styles from "./CandidatesScreen.module.css";

export function CandidatesScreen({
  requestTitle,
  onGoBack,
  version = 1
}: {
  requestTitle?: string;
  onGoBack?: () => void;
  version?: 1 | 2 | 3;
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
          {/* Navigation Row with Back Link */}
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
            {candidates.length > 0 ? (
              <div className={styles.candidatesWithSidebar}>
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

                {/* Sidebar Banner */}
                <div className={styles.candidatesSidebar}>
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
            ) : (
              <div className={styles.emptyState}>
                {version === 1 ? (
                  <>
                    {/* VERSION 1: Preview hint with sidebar */}
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
                      <div className={styles.valueSection}>
                        <div className={styles.timer}>47 h 59 min</div>
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
                  </>
                ) : version === 2 ? (
                  <>
                    {/* VERSION 2: Three preview candidates with ULTRA badge */}
                    <div className={styles.emptyStateContent}>
                      <div className={styles.valueSection}>
                        <p className={styles.valueText}>
                          We've launched a search in our internal Mellow database. You'll see the results within 48 hours in{" "}
                          <a 
                            href="#candidates" 
                            className={styles.promoteLink}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("Navigate to Candidates");
                            }}
                          >
                            Candidates
                          </a>
                          .
                        </p>
                      </div>

                      {/* Centered Action Card */}
                      <div className={styles.actionCardCentered}>
                        <h3 className={styles.actionTitle}>Want a more personalized shortlist?</h3>
                        <p className={styles.actionText}>
                          Book a slot and we'll help you find the best match.
                        </p>
                        <Button variant="secondary" onClick={handleScheduleCall}>
                          Meet your Ultra Manager
                        </Button>
                      </div>

                      <div className={styles.valueSection}>
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

                      {/* Preview Candidates List */}
                      <div className={styles.previewCandidatesList}>
                        <div className={styles.previewCandidate}>
                          <div className={styles.previewAvatar}></div>
                          <div className={styles.previewInfo}>
                            <div className={styles.previewName}></div>
                            <div className={styles.previewTitle}></div>
                          </div>
                          <div className={styles.previewBadges}>
                            <div className={styles.ultraBadge}>ULTRA</div>
                            <div className={styles.previewBadge}>95% match</div>
                          </div>
                        </div>

                        <div className={styles.previewCandidate}>
                          <div className={styles.previewAvatar}></div>
                          <div className={styles.previewInfo}>
                            <div className={styles.previewName}></div>
                            <div className={styles.previewTitle}></div>
                          </div>
                          <div className={styles.previewBadges}>
                            <div className={styles.ultraBadge}>ULTRA</div>
                            <div className={styles.previewBadge}>92% match</div>
                          </div>
                        </div>

                        <div className={styles.previewCandidate}>
                          <div className={styles.previewAvatar}></div>
                          <div className={styles.previewInfo}>
                            <div className={styles.previewName}></div>
                            <div className={styles.previewTitle}></div>
                          </div>
                          <div className={styles.previewBadges}>
                            <div className={styles.ultraBadge}>ULTRA</div>
                            <div className={styles.previewBadge}>88% match</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* VERSION 3: Zero-Results State */}
                    <div className={styles.emptyStateContent}>
                      <div className={styles.valueSection}>
                        <h3 className={styles.valueTitle}>No perfect candidate yet?</h3>
                        <p className={styles.valueText}>
                          Book a slot with our recruitment manager. They bring you 3+ relevant candidates in 48 hours.
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className={styles.buttonWithBadge}>
                        <Button variant="secondary" onClick={handleScheduleCall}>
                          Meet your Ultra Manager
                        </Button>
                        <span className={styles.freeBadge}>FREE</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
