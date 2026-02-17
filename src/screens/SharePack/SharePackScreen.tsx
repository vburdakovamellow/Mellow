import { useState } from "react";
import "../../design-system/typography.css";
import styles from "./SharePackScreen.module.css";

export type SharePackRequest = {
  id: string;
  title: string;
  companyName?: string;
  location: string;
  skills: string[];
  languages: string[];
  timeline?: {
    workload?: string;
    startDate?: string;
    flexible?: boolean;
  };
  budget: {
    paymentType: "hourly" | "fixed";
    from: string;
    to: string;
    currency: "USD" | "EUR" | "GBP" | string;
  };
};

export function SharePackScreen({
  request,
  onGoToEdit,
  onGoToView,
}: {
  request: SharePackRequest;
  onGoToEdit?: () => void;
  onGoToView?: () => void;
}) {
  const [activeBlock, setActiveBlock] = useState<number>(1);

  const avgRate = Math.round(
    (Number(request.budget.from) + Number(request.budget.to)) / 2
  );
  const rateDisplay =
    request.budget.paymentType === "hourly"
      ? `$${avgRate}/hr`
      : `$${avgRate}`;
  const roleName = request.title.includes(" for ")
    ? request.title.split(" for ")[0]
    : request.title;

  function toggleBlock(n: number) {
    setActiveBlock(activeBlock === n ? 0 : n);
  }

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

      {/* Request Header with Tabs */}
      <div className={styles.requestHeaderSection}>
        <div className={styles.container}>
          <button className={styles.backButton} onClick={onGoToView}>←</button>
          <div className={styles.requestInfo}>
            <h1 className={styles.requestTitle}>{request.title}</h1>
            <div className={styles.tabs}>
              <button className={styles.tab}>Candidates</button>
              <button className={[styles.tab, styles.tabActive].join(" ")}>Promote</button>
              <button className={styles.tab} onClick={onGoToEdit}>Edit</button>
            </div>
          </div>
          <div className={styles.requestActions}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3C4.5 3 2 8 2 8s2.5 5 6 5 6-5 6-5-2.5-5-6-5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                <span>42 viewed</span>
              </div>
              <span className={styles.statSeparator}>•</span>
              <div className={styles.stat}>
                <span>0 applied</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.twoColumnLayout}>

            {/* Left Column */}
            <div className={styles.leftColumn}>
              <h2 className={styles.shareTitle}>Your request is live</h2>
              <p className={styles.shareSubtitle}>
                Here are the next steps you can do to get more visibility for your request
              </p>

              {/* Block 1: Social Boost by Mellow */}
              <div className={[styles.accordionBlock, activeBlock === 1 ? styles.accordionBlockActive : ""].join(" ")}>
                <button className={styles.accordionHeader} onClick={() => toggleBlock(1)}>
                  <span className={[styles.accordionNumber, activeBlock === 1 ? styles.accordionNumberActive : ""].join(" ")}>1</span>
                  <span className={styles.accordionHeaderText}>
                    <span className={styles.accordionTitle}>Social Boost by Mellow</span>
                    <span className={styles.accordionBadge}>Recommended</span>
                  </span>
                  <svg className={styles.accordionChevron} width="20" height="20" viewBox="0 0 20 20" fill="none"
                    style={{ transform: activeBlock === 1 ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {activeBlock === 1 && (
                  <div className={styles.accordionContent}>
                    <p className={styles.accordionDesc}>
                      We've posted the request at AI Scout's LinkedIn. You may repost to boost it.
                    </p>
                    <button className={styles.primaryButton}>
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M18.5 0h-17C.675 0 0 .675 0 1.5v17c0 .825.675 1.5 1.5 1.5h17c.825 0 1.5-.675 1.5-1.5v-17C20 .675 19.325 0 18.5 0zM6 16H3V7h3v9zM4.5 5.75c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5zM17 16h-3v-4.5c0-1.125-.375-1.875-1.313-1.875-.713 0-1.125.488-1.313.95-.075.188-.063.45-.063.713V16h-3s.038-7.125 0-7.875h3v1.125c.375-.6 1.05-1.463 2.55-1.463 1.863 0 3.263 1.238 3.263 3.9V16z" fill="currentColor"/>
                      </svg>
                      REPOST ON LINKEDIN
                    </button>
                  </div>
                )}
              </div>

              {/* Block 2: Share with your Network */}
              <div className={[styles.accordionBlock, activeBlock === 2 ? styles.accordionBlockActive : ""].join(" ")}>
                <button className={styles.accordionHeader} onClick={() => toggleBlock(2)}>
                  <span className={[styles.accordionNumber, activeBlock === 2 ? styles.accordionNumberActive : ""].join(" ")}>2</span>
                  <span className={styles.accordionHeaderText}>
                    <span className={styles.accordionTitle}>Share with your Network</span>
                  </span>
                  <svg className={styles.accordionChevron} width="20" height="20" viewBox="0 0 20 20" fill="none"
                    style={{ transform: activeBlock === 2 ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {activeBlock === 2 && (
                  <div className={styles.accordionContent}>
                    <p className={styles.accordionDesc}>
                      Post directly from your profile to reach your professional connections.
                    </p>
                    <button className={styles.primaryButton}>
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M18.5 0h-17C.675 0 0 .675 0 1.5v17c0 .825.675 1.5 1.5 1.5h17c.825 0 1.5-.675 1.5-1.5v-17C20 .675 19.325 0 18.5 0zM6 16H3V7h3v9zM4.5 5.75c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5zM17 16h-3v-4.5c0-1.125-.375-1.875-1.313-1.875-.713 0-1.125.488-1.313.95-.075.188-.063.45-.063.713V16h-3s.038-7.125 0-7.875h3v1.125c.375-.6 1.05-1.463 2.55-1.463 1.863 0 3.263 1.238 3.263 3.9V16z" fill="currentColor"/>
                      </svg>
                      Post on LinkedIn
                    </button>
                    <button className={styles.secondaryButton}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.791-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.384C19.612 22.954 24 17.99 24 12z" fill="currentColor"/>
                      </svg>
                      Share on Facebook
                    </button>
                  </div>
                )}
              </div>

              {/* Block 3: Explore Communities */}
              <div className={[styles.accordionBlock, activeBlock === 3 ? styles.accordionBlockActive : ""].join(" ")}>
                <button className={styles.accordionHeader} onClick={() => toggleBlock(3)}>
                  <span className={[styles.accordionNumber, activeBlock === 3 ? styles.accordionNumberActive : ""].join(" ")}>3</span>
                  <span className={styles.accordionHeaderText}>
                    <span className={styles.accordionTitle}>Explore Communities</span>
                  </span>
                  <svg className={styles.accordionChevron} width="20" height="20" viewBox="0 0 20 20" fill="none"
                    style={{ transform: activeBlock === 3 ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {activeBlock === 3 && (
                  <div className={styles.accordionContent}>
                    <p className={styles.accordionDesc}>
                      Share your request in relevant communities and groups.
                    </p>
                    <div className={styles.communityList}>
                      <div className={styles.communityItem}>
                        <div className={styles.communityInfo}>
                          <div className={styles.communityName}>Design Jobs &amp; Freelance</div>
                          <div className={styles.communityMeta}>Discord</div>
                        </div>
                        <button className={styles.postButton}>Post</button>
                      </div>
                      <div className={styles.communityItem}>
                        <div className={styles.communityInfo}>
                          <div className={styles.communityName}>Remote Design Work</div>
                          <div className={styles.communityMeta}>Slack</div>
                        </div>
                        <button className={styles.postButton}>Post</button>
                      </div>
                      <div className={styles.communityItem}>
                        <div className={styles.communityInfo}>
                          <div className={styles.communityName}>Freelance Designers Network</div>
                          <div className={styles.communityMeta}>Facebook Group</div>
                        </div>
                        <button className={styles.postButton}>Post</button>
                      </div>
                      <div className={styles.communityItem}>
                        <div className={styles.communityInfo}>
                          <div className={styles.communityName}>Creative Freelancers</div>
                          <div className={styles.communityMeta}>Telegram</div>
                        </div>
                        <button className={styles.postButton}>Post</button>
                      </div>
                    </div>
                    <div className={styles.copyLinkSection}>
                      <input
                        type="text"
                        value="https://aiscout.mellow.io/?id=gAXdlVXr"
                        readOnly
                        className={styles.linkInput}
                      />
                      <button className={styles.copyButton}>Copy link</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Block 4: Send Invite Directly */}
              <div className={[styles.accordionBlock, activeBlock === 4 ? styles.accordionBlockActive : ""].join(" ")}>
                <button className={styles.accordionHeader} onClick={() => toggleBlock(4)}>
                  <span className={[styles.accordionNumber, activeBlock === 4 ? styles.accordionNumberActive : ""].join(" ")}>4</span>
                  <span className={styles.accordionHeaderText}>
                    <span className={styles.accordionTitle}>Send invite directly</span>
                  </span>
                  <svg className={styles.accordionChevron} width="20" height="20" viewBox="0 0 20 20" fill="none"
                    style={{ transform: activeBlock === 4 ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {activeBlock === 4 && (
                  <div className={styles.accordionContent}>
                    <p className={styles.accordionDesc}>
                      Send directly to peers. Scout pre-wrote the perfect offer for you.
                    </p>
                    <div className={styles.inviteMessageBox}>
                      <p className={styles.inviteMessage}>
                        Hi,{"\n\n"}
                        We have an open position for a {roleName}.{"\n\n"}
                        Details:{"\n"}
                        - Rate: {rateDisplay}{"\n"}
                        - Location: {request.location}{"\n"}
                        - Stack: {request.skills.join(", ")}{"\n\n"}
                        Interested? Apply here: mellow.com/req/{request.id}{"\n\n"}
                        Best regards
                      </p>
                    </div>
                    <button className={styles.primaryButton}>Copy link &amp; text</button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Live Preview */}
            <div className={styles.rightColumn}>
              <div className={styles.livePreviewLabel}>LIVE PREVIEW</div>

              {/* Block 1: Mellow Scout LinkedIn Post */}
              {activeBlock === 1 && (
                <div className={styles.previewCard}>
                  <div className={styles.previewHeader}>
                    <div className={styles.previewAvatarMs}>MS</div>
                    <div className={styles.previewAuthor}>
                      <div className={styles.previewName}>Mellow Scout</div>
                      <div className={styles.previewTime}>5 min ago</div>
                    </div>
                  </div>
                  <div className={styles.previewBody}>
                    <p className={styles.previewText}>
                      Our client is looking for a {roleName}.
                      Rate: {rateDisplay}. {request.location}. <span className={styles.hashtag}>#hiring</span>
                    </p>
                  </div>
                  <div className={styles.previewLink}>
                    <div className={styles.linkPreview}>
                      <div className={styles.bentoGridDark}>
                        <div className={styles.bentoDarkHero}>
                          <div className={styles.bentoSmallLabel}>ROLE</div>
                          <h3 className={styles.bentoDarkTitle}>{roleName.toUpperCase()}</h3>
                        </div>
                        <div className={styles.bentoDarkStack}>
                          <div className={styles.bentoSmallLabel}>STACK</div>
                          <div className={styles.bentoDarkSkills}>{request.skills.join(", ")}</div>
                        </div>
                        <div className={styles.bentoDarkRate}>
                          <div className={styles.bentoDarkRateValue}>{rateDisplay}</div>
                        </div>
                        <div className={styles.bentoDarkType}>
                          <div className={styles.bentoSmallLabel}>TYPE</div>
                          <div className={styles.bentoDarkTypeValue}>{request.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.previewActions}>
                    <span className={styles.previewAction}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                      Like
                    </span>
                    <span className={styles.previewAction}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12V4a2 2 0 012-2h8a2 2 0 012 2v5a2 2 0 01-2 2H5l-3 3z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
                      Comment
                    </span>
                    <span className={styles.previewAction}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12l8-8M12 4v5M12 4H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      Share
                    </span>
                  </div>
                </div>
              )}

              {/* Block 2: User's LinkedIn Post */}
              {activeBlock === 2 && (
                <div className={styles.previewCard}>
                  <div className={styles.previewHeader}>
                    <div className={styles.previewAvatar}>VB</div>
                    <div className={styles.previewAuthor}>
                      <div className={styles.previewName}>Valeriia Burdakova</div>
                      <div className={styles.previewTime}>Just now</div>
                    </div>
                  </div>
                  <div className={styles.previewBody}>
                    <p className={styles.previewText}>
                      We are seeking a talented {roleName} to join our team.{" "}
                      {rateDisplay}. {request.location}. <span className={styles.hashtag}>#hiring</span>
                    </p>
                  </div>
                  <div className={styles.previewLink}>
                    <div className={styles.linkPreview}>
                      <div className={styles.bentoGrid}>
                        <div className={styles.bentoHero}>
                          <h3 className={styles.bentoTitle}>{roleName}</h3>
                          <p className={styles.bentoSubtitle}>Junior</p>
                          <span className={styles.remoteBadge}>REMOTE</span>
                        </div>
                        <div className={styles.bentoValue}>
                          <div className={styles.bentoRate}>{rateDisplay}</div>
                          <div className={styles.bentoRateLabel}>Hourly Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.previewActions}>
                    <span className={styles.previewAction}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h0a5 5 0 005 5h1V9.5H6.5L10 6l3.5 3.5H12V13h1a5 5 0 005-5h0" stroke="currentColor" strokeWidth="1.2" fill="none" transform="rotate(-90 8 8)"/></svg>
                      Like
                    </span>
                    <span className={styles.previewAction}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12V4a2 2 0 012-2h8a2 2 0 012 2v5a2 2 0 01-2 2H5l-3 3z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
                      Comment
                    </span>
                    <span className={styles.previewAction}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12l8-8M12 4v5M12 4H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      Share
                    </span>
                  </div>
                </div>
              )}

              {/* Block 3: Link preview for communities */}
              {activeBlock === 3 && (
                <div className={styles.communityPreviewRight}>
                  <h4 className={styles.communityPreviewLabel}>How the link will look</h4>
                  <div className={styles.communityTitle}>
                    {roleName} — {rateDisplay}
                  </div>
                  <div className={styles.communityDescription}>
                    {request.skills.join(", ")} • {request.timeline?.workload || "Part-time"} • {request.location}
                  </div>
                  <div className={styles.bentoGrid}>
                    <div className={styles.bentoHero}>
                      <h3 className={styles.bentoTitle}>{roleName}</h3>
                      <p className={styles.bentoSubtitle}>Junior</p>
                      <span className={styles.remoteBadge}>REMOTE</span>
                    </div>
                    <div className={styles.bentoValue}>
                      <div className={styles.bentoRate}>{rateDisplay}</div>
                      <div className={styles.bentoRateLabel}>Hourly Rate</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Block 4: Telegram / Slack message preview */}
              {activeBlock === 4 && (
                <div className={styles.messengerPreview}>
                  <div className={styles.messengerHeader}>
                    <div className={styles.messengerIcon}>TG</div>
                    <span className={styles.messengerTitle}>Telegram / Slack</span>
                  </div>
                  <div className={styles.messengerBubble}>
                    <p className={styles.messengerText}>
                      Hi,{"\n\n"}
                      We have an open position for a {roleName}.{"\n\n"}
                      Details:{"\n"}
                      - Rate: {rateDisplay}{"\n"}
                      - Location: {request.location}{"\n"}
                      - Stack: {request.skills.join(", ")}{"\n\n"}
                      Interested? Apply here: mellow.com/req/{request.id}{"\n\n"}
                      Best regards
                    </p>
                    <span className={styles.messengerTime}>10:42 AM</span>
                  </div>
                </div>
              )}

              {/* Nothing selected */}
              {activeBlock === 0 && (
                <div className={styles.previewEmpty}>
                  <p>Select a channel to see the preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
