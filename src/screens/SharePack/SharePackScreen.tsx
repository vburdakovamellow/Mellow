import { Button } from "../../design-system/primitives/Button/Button";
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
  variant = 'communities'
}: {
  request: SharePackRequest;
  onGoToEdit?: () => void;
  onGoToView?: () => void;
  variant?: 'linkedin' | 'communities';
}) {
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
          <button className={styles.backLink} onClick={onGoToView}>
            <span className={styles.backArrow}>←</span>
            <span className={styles.backText}>Dashboard</span>
          </button>

          {/* Progress Bar */}
          <div className={styles.horizontalProgressBar}>
            <div className={styles.progressStep}>
              <div className={styles.stepContent}>Your request</div>
            </div>
            <div className={styles.progressArrow}></div>
            <div className={styles.progressStep}>
              <div className={styles.stepContent}>Ultra</div>
            </div>
            <div className={styles.progressArrow}></div>
            <div className={`${styles.progressStep} ${styles.progressStepActive}`}>
              <div className={styles.stepContent}>Promote</div>
            </div>
            <div className={styles.progressArrow}></div>
            <div className={styles.progressStep}>
              <div className={styles.stepContent}>Candidates</div>
            </div>
          </div>

          {/* Request Title */}
          <div className={styles.requestHeader}>
            <h1 className={styles.requestTitle}>{request.title}</h1>
          </div>

          {/* Two Column Layout */}
          <div className={styles.twoColumnLayout}>
            {/* Left Column - Share Options */}
            <div className={styles.leftColumn}>
              <div className={styles.shareSection}>
                <h2 className={styles.shareTitle}>Share to Get Applications</h2>
                <p className={styles.shareSubtitle}>Get your project in front of the right freelancers.</p>

                {/* Progress */}
                <div className={styles.progressBar}>
                  <div className={styles.progressLabel}>Post on LinkedIn for maximum professional visibility</div>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: "33%" }}></div>
                  </div>
                  <div className={styles.progressCounter}>1/3</div>
                </div>

                {/* Share Options */}
                <div className={styles.shareOptions}>
                  <div className={styles.shareOption}>
                    <div className={styles.optionIcon}>
                      <input type="checkbox" className={styles.optionCheckbox} />
                    </div>
                    <div className={styles.optionContent}>
                      <h3 className={styles.optionTitle}>Post on LinkedIn</h3>
                      <p className={styles.optionDescription}>
                        AI creates a professional LinkedIn post for you – just review and share with your network
                      </p>
                    </div>
                  </div>

                  <div className={styles.shareOption}>
                    <div className={styles.optionIcon}>
                      <input type="checkbox" className={styles.optionCheckbox} />
                    </div>
                    <div className={styles.optionContent}>
                      <h3 className={styles.optionTitle}>Post on Facebook</h3>
                      <p className={styles.optionDescription}>
                        Get an AI-crafted post optimized for Facebook. Edit if needed and publish right away
                      </p>
                    </div>
                  </div>

                  <div className={styles.shareOption}>
                    <div className={styles.optionIcon}>
                      <input type="checkbox" className={styles.optionCheckbox} checked readOnly />
                    </div>
                    <div className={styles.optionContent}>
                      <h3 className={styles.optionTitle}>Share in Communities & Chats</h3>
                      <p className={styles.optionDescription}>
                        Copy your link and share in Telegram, Discord, Facebook groups, or Slack communities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className={styles.rightColumn}>
              {variant === 'linkedin' ? (
                <div className={styles.previewCard}>
                  <div className={styles.previewHeader}>
                    <div className={styles.previewAvatar}>VB</div>
                    <div className={styles.previewAuthor}>
                      <div className={styles.previewName}>Valeriia Burdakova</div>
                      <div className={styles.previewTime}>Just now • 🌍</div>
                    </div>
                    <button className={styles.previewMore}>⋯</button>
                  </div>

                  <div className={styles.previewBody}>
                    <p className={styles.previewText}>
                      🎯 <strong>Join Us</strong> <span className={styles.hashtag}>#hiring</span>
                    </p>
                    <p className={styles.previewText}>
                      We are seeking a talented Graphic Designer to revitalize our social media and marketing visuals. 
                      Your mission: enhance our brand identity with stunning, engaging designs that tell our story. 
                      Passionate about design? Let's talk!
                    </p>
                    <p className={styles.previewText}>
                      <span className={styles.hashtag}>#GraphicDesigner</span>{" "}
                      <span className={styles.hashtag}>#SocialMediaDesign</span>{" "}
                      <span className={styles.hashtag}>#BrandIdentity</span>{" "}
                      <span className={styles.hashtag}>#RemoteWork</span>{" "}
                      <span className={styles.hashtag}>#DesignJobs</span>
                    </p>
                  </div>

                  <div className={styles.previewLink}>
                  <div className={styles.linkPreview}>
                    <div className={styles.bentoGrid}>
                      {/* Hero Block - Job Title */}
                      <div className={styles.bentoHero}>
                        <h3 className={styles.bentoTitle}>Graphic Designer</h3>
                        <p className={styles.bentoSubtitle}>Junior</p>
                        <span className={styles.remoteBadge}>REMOTE</span>
                      </div>
                      
                      {/* Value Block - Rate (Orange) */}
                      <div className={styles.bentoValue}>
                        <div className={styles.bentoRate}>$40/hr</div>
                        <div className={styles.bentoRateLabel}>Hourly Rate</div>
                      </div>
                      
                      {/* Info Block - Skills as Tags + Icons */}
                      <div className={styles.bentoInfo}>
                        <div className={styles.bentoSkillsColumn}>
                          <div className={styles.bentoSkillTag}>Figma</div>
                          <div className={styles.bentoSkillTag}>Canva</div>
                        </div>
                        <div className={styles.bentoInfoItem}>
                          <div className={styles.bentoIcon}>⏱</div>
                          <div className={styles.bentoInfoText}>Under 20hrs/week</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.linkInfo}>
                      <div className={styles.linkTitle}>Graphic Designer — $40/hr</div>
                      <div className={styles.linkUrl}>aiscout.mellow.io</div>
                    </div>
                  </div>
                </div>
              </div>
              ) : (
                /* Communities variant - only Bento Grid + Link */
                <div className={styles.communitiesPreview}>
                  <div className={styles.communityTitle}>Graphic Designer — $40/hr</div>
                  <div className={styles.communityDescription}>Figma, Canva, Adobe • Part-time (Under 20hrs/week) • Remote</div>
                  <div className={styles.linkPreview}>
                    <div className={styles.bentoGrid}>
                      {/* Hero Block - Job Title */}
                      <div className={styles.bentoHero}>
                        <h3 className={styles.bentoTitle}>Graphic Designer</h3>
                        <p className={styles.bentoSubtitle}>Junior</p>
                        <span className={styles.remoteBadge}>REMOTE</span>
                      </div>
                      
                      {/* Value Block - Rate */}
                      <div className={styles.bentoValue}>
                        <div className={styles.bentoRate}>$40/hr</div>
                        <div className={styles.bentoRateLabel}>Hourly Rate</div>
                      </div>
                      
                      {/* Info Block - Skills as Tags + Icons */}
                      <div className={styles.bentoInfo}>
                        <div className={styles.bentoSkillsColumn}>
                          <div className={styles.bentoSkillTag}>Figma</div>
                          <div className={styles.bentoSkillTag}>Canva</div>
                        </div>
                        <div className={styles.bentoInfoItem}>
                          <div className={styles.bentoIcon}>⏱</div>
                          <div className={styles.bentoInfoText}>Under 20hrs/week</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.copyLinkSection}>
                    <input 
                      type="text" 
                      value="https://aiscout.mellow.io/?id=gAXdlVXr" 
                      readOnly 
                      className={styles.linkInput}
                    />
                    <button className={styles.copyButton}>
                      Copy link
                    </button>
                  </div>

                  <div className={styles.recommendedSection}>
                    <h3 className={styles.recommendedTitle}>Recommended communities</h3>
                    <div className={styles.communityList}>
                      <div className={styles.communityItem}>
                        <div className={styles.communityInfo}>
                          <div className={styles.communityName}>Design Jobs & Freelance</div>
                          <div className={styles.communityMeta}>Discord • 8.2K members</div>
                        </div>
                      </div>
                      <div className={styles.communityItem}>
                        <div className={styles.communityInfo}>
                          <div className={styles.communityName}>Remote Design Work</div>
                          <div className={styles.communityMeta}>Slack • 15K members</div>
                        </div>
                      </div>
                      <div className={styles.communityItem}>
                        <div className={styles.communityInfo}>
                          <div className={styles.communityName}>Freelance Designers Network</div>
                          <div className={styles.communityMeta}>Facebook Group • 22K members</div>
                        </div>
                      </div>
                      <div className={styles.communityItem}>
                        <div className={styles.communityInfo}>
                          <div className={styles.communityName}>Creative Freelancers</div>
                          <div className={styles.communityMeta}>Telegram • 9.8K members</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
