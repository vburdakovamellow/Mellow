import { useState } from "react";
import { Button } from "../../design-system/primitives/Button/Button";
import "../../design-system/typography.css";
import styles from "./CandidatesScreen.module.css";

/** just_created → ultra_ordered (запланировал) → ready_for_review (встречу провели, Ultra нашёл кандидатов). */
export type CandidatesStep = "just_created" | "ultra_ordered" | "ready_for_review";

/** Кандидаты для шага ready_for_review (как на референсе). */
const READY_FOR_REVIEW_CANDIDATES = {
  top: [
    { id: "1", name: "Santiago Herrera", role: "UI Designer", experience: "5.5 years", applied: "Applied today", status: "new" as const, icon: "stars" },
    { id: "2", name: "Sofia Almeida", role: "UI/UX Designer", experience: "4.5 years", applied: "Applied 2 days ago", status: "shortlisted" as const, matchPct: 100 },
  ],
  moderate: [
    { id: "3", name: "Daryna Shevchenko", role: "Graphic Designer", experience: "2 years", applied: "Applied 2 days ago", status: "viewed" as const, matchPct: 62 },
    { id: "4", name: "Alejandro Castillo", role: "Product Designer", experience: "2.5 years", applied: "Applied yesterday", status: "viewed" as const, matchPct: 59 },
  ],
};

export function CandidatesScreen({
  requestTitle,
  onGoBack,
  version = 1,
  step = "just_created",
  onBooked,
  onRestart
}: {
  requestTitle?: string;
  onGoBack?: () => void;
  version?: 1 | 2 | 3;
  step?: CandidatesStep;
  /** После нажатия Book — перейти на экран «scheduled» (ultra_ordered). */
  /** Re-Start! — сброс на just_created (шаг ready_for_review). */
  onRestart?: () => void;
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
    <div className={styles.screen} data-step={step}>
      {/* Header — current design: logo, actions, title, tabs */}
      <div className={styles.fixedHeader}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>mellow/</div>
          <div className={styles.headerRight}>
            <button type="button" className={styles.primaryButton}>New request</button>
            <button type="button" className={styles.userButton}>
              <span>AI Sourcing</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className={styles.avatar}>PN</div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          {/* Main title */}
          {requestTitle && (
            <h1 className={styles.requestTitle}>{requestTitle}</h1>
          )}

          {/* Navigation Row: back arrow only + tabs + stats */}
          <div className={styles.navigationRow}>
            <div className={styles.navLeft}>
              {onGoBack && (
                <button type="button" className={styles.backLink} onClick={onGoBack} aria-label="Back">
                  <span className={styles.backArrow}>←</span>
                </button>
              )}
              <div className={styles.navigationTabs}>
                <button type="button" className={`${styles.navTab} ${styles.navTabActive}`}>Candidates</button>
                <button type="button" className={styles.navTab}>Share</button>
                <button type="button" className={styles.navTab}>Edit</button>
              </div>
            </div>
            <div className={styles.viewedStats}>
              <span className={styles.viewedIcon} aria-hidden>⊙</span>
              <span>42 viewed • 0 applied</span>
            </div>
          </div>

          {/* Group by match plaque */}
          <div className={styles.groupByMatch}>
            <span className={styles.groupByMatchLabel}>Group by match</span>
            <span className={styles.groupByMatchCheck}>✓</span>
          </div>

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
                      Meet your Ultra manager
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.emptyState} data-step={step}>
                {version === 1 && step === "ultra_ordered" ? (
                  <>
                    {/* Шаг ultra_ordered: в этом блоке изображаем «Your meet with Ultra is scheduled!» */}
                    <div className={`${styles.ultraBanner} ${styles.ultraBannerScheduled}`} data-step="ultra_ordered">
                      <h3 className={styles.actionTitle}>Your meet with Ultra is scheduled!</h3>
                      <div className={styles.ultraScheduledBlock}>
                        <div className={styles.ultraScheduledTime}>
                          <span className={styles.ultraScheduledIcon} aria-hidden>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          </span>
                          <div>
                            <div className={styles.ultraScheduledDay}>Today</div>
                            <div className={styles.ultraScheduledSlot}>2:00 PM – 2:30 PM (CET)</div>
                          </div>
                        </div>
                        <div className={styles.ultraScheduledActions}>
                          <Button variant="secondary" onClick={() => alert("Reschedule (stub)")}>
                            Reschedule
                          </Button>
                          <Button variant="brand" onClick={() => alert("Join (stub)")}>
                            Join
                          </Button>
                        </div>
                      </div>
                      <div className={styles.ultraStatuses}>
                        <div className={styles.ultraStatus}>
                          <div className={styles.ultraStatusHeader}>
                            <span className={styles.ultraStatusNum}>1</span>
                            <span className={styles.ultraStatusName}>Brief</span>
                          </div>
                          <p className={styles.ultraStatusText}>Schedule a call – the Ultra manager will gather project details</p>
                        </div>
                        <div className={styles.ultraStatusArrow}>→</div>
                        <div className={`${styles.ultraStatus} ${styles.ultraStatusInactive}`}>
                          <div className={styles.ultraStatusHeader}>
                            <span className={styles.ultraStatusNum}>2</span>
                            <span className={styles.ultraStatusName}>Sourcing</span>
                          </div>
                          <p className={styles.ultraStatusText}>Starts after your briefing call</p>
                        </div>
                        <div className={styles.ultraStatusArrow}>→</div>
                        <div className={`${styles.ultraStatus} ${styles.ultraStatusInactive}`}>
                          <div className={styles.ultraStatusHeader}>
                            <span className={styles.ultraStatusNum}>3</span>
                            <span className={styles.ultraStatusName}>Ready for review</span>
                          </div>
                          <p className={styles.ultraStatusText}>You'll review 3+ candidates with 80%+ match</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.matchSections}>
                      <section className={styles.matchSection}>
                        <h4 className={styles.matchSectionTitle}>Top match</h4>
                        <div className={styles.matchSectionEmpty}>
                          <div className={styles.valueSection}>
                            <h3 className={styles.valueTitle}>Candidates will appear here</h3>
                            <p className={styles.valueText}>
                              We're searching Mellow's contractor pool for matches to your request. You'll see results within 48 hours.
                            </p>
                            <p className={styles.valueText}>
                              Want more visibility?{" "}
                              <a href="#share" className={styles.promoteLink} onClick={(e) => { e.preventDefault(); alert("Share (stub)"); }}>
                                Share
                              </a>
                              {" "}your request manually to reach more contractors.
                            </p>
                          </div>
                        </div>
                      </section>
                      <section className={styles.matchSection}>
                        <h4 className={styles.matchSectionTitle}>Moderate match</h4>
                        <div className={styles.matchSectionEmpty} />
                      </section>
                    </div>
                  </>
                ) : version === 1 && step === "ready_for_review" ? (
                  <>
                    {/* Шаг ready_for_review: все 3 шага завершены, Re-Start!, карточки кандидатов. */}
                    <div className={`${styles.ultraBanner} ${styles.ultraBannerReady}`} data-step="ready_for_review">
                      <div className={styles.ultraReadyRow}>
                        <div className={styles.ultraStatuses}>
                          <div className={styles.ultraStatus}>
                            <div className={styles.ultraStatusHeader}>
                              <span className={styles.ultraStatusNum}>1</span>
                              <span className={styles.ultraStatusName}>Brief</span>
                            </div>
                            <p className={styles.ultraStatusText}>Schedule a call – the Ultra manager will gather project details</p>
                          </div>
                          <div className={styles.ultraStatusArrow}>→</div>
                          <div className={styles.ultraStatus}>
                            <div className={styles.ultraStatusHeader}>
                              <span className={styles.ultraStatusNum}>2</span>
                              <span className={styles.ultraStatusName}>Sourcing</span>
                            </div>
                            <p className={styles.ultraStatusText}>Starts after your briefing call</p>
                          </div>
                          <div className={styles.ultraStatusArrow}>→</div>
                          <div className={styles.ultraStatus}>
                            <div className={styles.ultraStatusHeader}>
                              <span className={styles.ultraStatusNum}>3</span>
                              <span className={styles.ultraStatusName}>Ready for review</span>
                            </div>
                            <p className={styles.ultraStatusText}>You'll review 3+ candidates with 80%+ match</p>
                          </div>
                        </div>
                        <Button variant="secondary" className={styles.restartButton} onClick={() => onRestart?.()}>
                          Re-Start!
                        </Button>
                      </div>
                    </div>
                    <div className={styles.matchSections}>
                      <section className={styles.matchSection}>
                        <h4 className={styles.matchSectionTitle}>Top matches</h4>
                        <div className={styles.matchSectionCards}>
                          {READY_FOR_REVIEW_CANDIDATES.top.map((c) => (
                            <div key={c.id} className={styles.matchCard}>
                              <div className={styles.matchCardIcon}>
                                {c.icon === "stars" ? (
                                  <span className={styles.matchCardStars} aria-hidden>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/></svg>
                                  </span>
                                ) : (
                                  <span className={styles.matchCardPct}>{c.matchPct}%</span>
                                )}
                              </div>
                              <div className={styles.matchCardMain}>
                                <div className={styles.matchCardName}>{c.name}</div>
                                <div className={styles.matchCardRole}>{c.role}</div>
                                <div className={styles.matchCardMeta}>• {c.experience} experience</div>
                                <div className={styles.matchCardApplied}>{c.applied}</div>
                              </div>
                              <div className={styles.matchCardRight}>
                                <span className={styles.matchCardUltraLabel}>Ultra</span>
                                <span className={`${styles.matchCardPill} ${c.status === "new" ? styles.matchCardPillNew : c.status === "shortlisted" ? styles.matchCardPillShortlisted : styles.matchCardPillViewed}`}>
                                  {c.status === "new" ? "New" : c.status === "shortlisted" ? "Shortlisted" : "Viewed"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                      <section className={styles.matchSection}>
                        <h4 className={styles.matchSectionTitle}>Moderate match</h4>
                        <div className={styles.matchSectionCards}>
                          {READY_FOR_REVIEW_CANDIDATES.moderate.map((c) => (
                            <div key={c.id} className={styles.matchCard}>
                              <div className={`${styles.matchCardIcon} ${styles.matchCardIconPct}`}>
                                <span className={styles.matchCardPct}>{c.matchPct}%</span>
                              </div>
                              <div className={styles.matchCardMain}>
                                <div className={styles.matchCardName}>{c.name}</div>
                                <div className={styles.matchCardRole}>{c.role}</div>
                                <div className={styles.matchCardMeta}>• {c.experience} experience</div>
                                <div className={styles.matchCardApplied}>{c.applied}</div>
                              </div>
                              <div className={styles.matchCardRight}>
                                <span className={styles.matchCardUltraLabel}>Ultra</span>
                                <span className={`${styles.matchCardPill} ${styles.matchCardPillViewed}`}>Viewed</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </>
                ) : version === 1 && step === "just_created" ? (
                  <>
                    {/* Шаг just_created: первое окно, CTA Book. */}
                    <div className={styles.ultraBanner} data-step="just_created">
                      <div className={styles.ultraBannerTitleRow}>
                        <h3 className={styles.actionTitle}>No perfect candidate yet? Meet your Ultra manager!</h3>
                        <span className={styles.freeBadgeAbove}>FREE</span>
                      </div>
                      <div className={styles.ultraStatuses}>
                        <div className={styles.ultraStatus}>
                          <div className={styles.ultraStatusHeader}>
                            <span className={styles.ultraStatusNum}>1</span>
                            <span className={styles.ultraStatusName}>Briefing</span>
                          </div>
                          <p className={styles.ultraStatusText}>Schedule a call – the Ultra manager will gather project details</p>
                          <Button variant="brand" className={styles.bookButton} onClick={() => onBooked?.() ?? handleScheduleCall()}>
                            Book
                          </Button>
                        </div>
                        <div className={styles.ultraStatusArrow}>→</div>
                        <div className={`${styles.ultraStatus} ${styles.ultraStatusInactive}`}>
                          <div className={styles.ultraStatusHeader}>
                            <span className={styles.ultraStatusNum}>2</span>
                            <span className={styles.ultraStatusName}>Sourcing</span>
                          </div>
                          <p className={styles.ultraStatusText}>Starts after your briefing call</p>
                        </div>
                        <div className={styles.ultraStatusArrow}>→</div>
                        <div className={`${styles.ultraStatus} ${styles.ultraStatusInactive}`}>
                          <div className={styles.ultraStatusHeader}>
                            <span className={styles.ultraStatusNum}>3</span>
                            <span className={styles.ultraStatusName}>Ready for review</span>
                          </div>
                          <p className={styles.ultraStatusText}>You'll review 3+ candidates with 80%+ match</p>
                        </div>
                      </div>
                    </div>

                    {/* Top match: contains value copy */}
                    <div className={styles.matchSections}>
                      <section className={styles.matchSection}>
                        <h4 className={styles.matchSectionTitle}>Top match</h4>
                        <div className={styles.matchSectionEmpty}>
                          <div className={styles.valueSection}>
                            <h3 className={styles.valueTitle}>Candidates will appear here</h3>
                            <p className={styles.valueText}>
                              We're searching Mellow's contractor pool for matches to your request. You'll see results within 48 hours.
                            </p>
                            <p className={styles.valueText}>
                              Want more visibility?{" "}
                              <a
                                href="#share"
                                className={styles.promoteLink}
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigator.clipboard.writeText(window.location.href);
                                  alert("Link copied! Opening Share section...");
                                }}
                              >
                                Share
                              </a>
                              {" "}your request manually to reach more contractors.
                            </p>
                          </div>
                        </div>
                      </section>
                      <section className={styles.matchSection}>
                        <h4 className={styles.matchSectionTitle}>Moderate match</h4>
                        <div className={styles.matchSectionEmpty} />
                      </section>
                    </div>
                  </>
                ) : version === 2 ? (
                  <>
                    {/* VERSION 2: Three preview candidates with ULTRA badge */}
                    <div className={styles.emptyStateContent}>
                      <div className={styles.valueSection}>
                        <p className={styles.valueText}>
                          We've launched a search in our internal Mellow database. You'll see results within 48 hours in{" "}
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
                          Meet your Ultra manager
                        </Button>
                      </div>

                      <div className={styles.valueSection}>
                        <p className={styles.valueText}>
                          Want more visibility?{" "}
                          <a 
                            href="#share" 
                            className={styles.promoteLink}
                            onClick={(e) => {
                              e.preventDefault();
                              navigator.clipboard.writeText(window.location.href);
                              alert("Link copied! Opening Share section...");
                            }}
                          >
                            Share
                          </a>
                          {" "}your request manually to reach more contractors.
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
                          Meet your Ultra manager
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
