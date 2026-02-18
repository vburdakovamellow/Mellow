import "../../design-system/typography.css";
import styles from "./SharePackStepperScreen.module.css";

/**
 * ВАРИАНТ A: Stepper + Checklist
 * Пошаговый визард (Your request → Promote → Ultra → Candidates)
 * с чеклистом каналов (LinkedIn, Facebook, Communities) и прогресс-баром.
 * Справа — превью LinkedIn-поста.
 */

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

export function SharePackStepperScreen({
  request,
  onGoToEdit,
  onGoToView,
}: {
  request: SharePackRequest;
  onGoToEdit?: () => void;
  onGoToView?: () => void;
}) {
  return (
    <div className={styles.screen}>
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

      <div className={styles.content}>
        <div className={styles.container}>
          <button className={styles.backLink} onClick={onGoToView}>
            <span className={styles.backArrow}>←</span>
            <span className={styles.backText}>Dashboard</span>
          </button>

          <div className={styles.progressStepper}>
            <div className={styles.step}>
              <div className={styles.stepIconCompleted}>✓</div>
              <span className={styles.stepLabel}>Your request</span>
            </div>
            <div className={styles.stepLineActive} />
            <div className={styles.step}>
              <div className={styles.stepIconActive}>✓</div>
              <span className={styles.stepLabelActive}>Promote</span>
            </div>
            <div className={styles.stepLine} />
            <div className={styles.step}>
              <div className={styles.stepIconCompleted}>✓</div>
              <span className={styles.stepLabel}>Ultra</span>
            </div>
            <div className={styles.stepLine} />
            <div className={styles.step}>
              <div className={styles.stepIconCompleted}>✓</div>
              <span className={styles.stepLabel}>Candidates</span>
            </div>
          </div>

          <div className={styles.requestHeader}>
            <h1 className={styles.requestTitle}>{request.title}</h1>
          </div>

          <div className={styles.twoColumnLayout}>
            <div className={styles.leftColumn}>
              <div className={styles.shareSection}>
                <h2 className={styles.shareTitle}>Share to Get Applications</h2>
                <p className={styles.shareSubtitle}>Get your project in front of the right freelancers.</p>

                <div className={styles.progressBar}>
                  <div className={styles.progressLabel}>Post on LinkedIn for maximum professional visibility</div>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: "33%" }} />
                  </div>
                  <div className={styles.progressCounter}>1/3</div>
                </div>

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

            <div className={styles.rightColumn}>
              <div className={styles.previewCard}>
                <div className={styles.previewHeader}>
                  <div className={styles.previewAvatar}>VB</div>
                  <div className={styles.previewAuthor}>
                    <div className={styles.previewName}>Valeriia Burdakova</div>
                    <div className={styles.previewTime}>Just now</div>
                  </div>
                  <button className={styles.previewMore} onClick={onGoToEdit}>⋯</button>
                </div>
                <div className={styles.previewBody}>
                  <p className={styles.previewText}>
                    <strong>Join Us</strong> <span className={styles.hashtag}>#hiring</span>
                  </p>
                  <p className={styles.previewText}>
                    We are seeking a talented {request.title.includes(" for ") ? request.title.split(" for ")[0] : request.title} based
                    in {request.location}. The role involves {request.skills.join(", ").toLowerCase()} with long-term collaboration.
                  </p>
                  <p className={styles.previewText}>
                    <span className={styles.hashtag}>#remotework</span>{" "}
                    <span className={styles.hashtag}>#jobopportunity</span>{" "}
                    <span className={styles.hashtag}>#careers</span>
                  </p>
                </div>
                <div className={styles.previewLink}>
                  <div className={styles.linkPreview}>
                    <div className={styles.linkImage}>
                      <div className={styles.linkAvatars}>
                        <div className={styles.miniAvatar} />
                        <div className={styles.miniAvatar} />
                        <div className={styles.miniAvatar} />
                        <div className={styles.miniAvatar} />
                      </div>
                      <div className={styles.linkBadge}>We are looking for Talent!</div>
                    </div>
                    <div className={styles.linkInfo}>
                      <div className={styles.linkTitle}>This Project Needs Your Skills – Apply N...</div>
                      <div className={styles.linkUrl}>aiscout.mellow.io</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
