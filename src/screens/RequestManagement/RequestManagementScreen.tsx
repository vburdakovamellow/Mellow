import { useState } from "react";
import { Button } from "../../design-system/primitives/Button/Button";
import "../../design-system/typography.css";
import styles from "./RequestManagementScreen.module.css";

type TabId = "applications" | "share" | "edit";

export function RequestManagementScreen() {
  const [activeTab, setActiveTab] = useState<TabId>("applications");

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.fixedHeader}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>mellow</div>
          
          <div className={styles.headerRight}>
            <Button variant="brand">
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

      {/* Request Header */}
      <div className={styles.requestHeader}>
        <div className={styles.container}>
          <button className={styles.backButton}>←</button>
          
          <div className={styles.requestInfo}>
            <h1 className={styles.requestTitle}>Administrative Assistant (Armenia)</h1>
            
            <div className={styles.tabs}>
              <button
                className={[styles.tab, activeTab === "applications" ? styles.tabActive : ""].filter(Boolean).join(" ")}
                onClick={() => setActiveTab("applications")}
              >
                Applications
              </button>
              <button
                className={[styles.tab, activeTab === "share" ? styles.tabActive : ""].filter(Boolean).join(" ")}
                onClick={() => setActiveTab("share")}
              >
                Share
              </button>
              <button
                className={[styles.tab, activeTab === "edit" ? styles.tabActive : ""].filter(Boolean).join(" ")}
                onClick={() => setActiveTab("edit")}
              >
                Edit
              </button>
            </div>
          </div>

          <div className={styles.requestActions}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3C4.5 3 2 8 2 8s2.5 5 6 5 6-5 6-5-2.5-5-6-5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                <span>3 viewed</span>
              </div>
              <span className={styles.statSeparator}>•</span>
              <div className={styles.stat}>
                <span>0 applied</span>
              </div>
            </div>
            
            <button className={styles.iconButton}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 8h10M5 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            
            <button className={styles.iconButton}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3C5 3 3 10 3 10s2 7 7 7 7-7 7-7-2-7-7-7z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
            
            <Button variant="secondary">
              Archived
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab === "share" && <ShareTab />}
        {activeTab === "applications" && <ApplicationsTab />}
        {activeTab === "edit" && <EditTab />}
      </div>
    </div>
  );
}

function ShareTab() {
  return (
    <div className={styles.container}>
      <div className={styles.shareLayout}>
        {/* Left: Share Options */}
        <div className={styles.sharePanel}>
          <div className={styles.sharePanelInner}>
            <h2 className={styles.shareTitle}>Share to Get Applications</h2>
            <p className={styles.shareSubtitle}>Get your project in front of the right freelancers.</p>

            <div className={styles.shareOptions}>
              <div className={styles.shareOption}>
                <div className={styles.optionHeader}>
                  <div className={styles.optionIcon} />
                  <div className={styles.optionInfo}>
                    <h3 className={styles.optionTitle}>Post on LinkedIn</h3>
                    <p className={styles.optionDesc}>AI creates a professional LinkedIn post for you – just review and share with your network</p>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '33%' }} />
                </div>
                <div className={styles.progressLabel}>Post on LinkedIn for maximum professional visibility</div>
                <div className={styles.progressStep}>1/3</div>
              </div>

              <div className={styles.shareOption}>
                <div className={styles.optionHeader}>
                  <div className={styles.optionIcon} />
                  <div className={styles.optionInfo}>
                    <h3 className={styles.optionTitle}>Post on Facebook</h3>
                    <p className={styles.optionDesc}>Get an AI-crafted post optimized for Facebook. Edit if needed and publish right away</p>
                  </div>
                </div>
              </div>

              <div className={styles.shareOption}>
                <input type="checkbox" checked readOnly className={styles.checkbox} />
                <div className={styles.optionInfo}>
                  <h3 className={styles.optionTitle}>Share in Communities & Chats</h3>
                  <p className={styles.optionDesc}>Copy your link and share in Telegram, Discord, Facebook communities, or any group chats</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className={styles.previewPanel}>
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <div className={styles.previewAvatar}>VB</div>
              <div>
                <div className={styles.previewName}>Valeriia Burdakova</div>
                <div className={styles.previewTime}>Just now • 🌐</div>
              </div>
              <button className={styles.previewMore}>⋯</button>
            </div>

            <div className={styles.previewContent}>
              <p className={styles.previewText}>
                🔎 <strong>Join Us #hiring</strong>
                <br /><br />
                We are seeking a proactive Administrative Assistant based in Armenia to support a fast-growing furniture manufacturing company. The role involves communication with local tax authorities and suppliers, handling diverse administrative tasks, and remote work with long-term collaboration.
                <br /><br />
                <span className={styles.previewHashtag}>#AdministrativeAssistant</span>{' '}
                <span className={styles.previewHashtag}>#remotework</span>{' '}
                <span className={styles.previewHashtag}>#jobopportunity</span>{' '}
                <span className={styles.previewHashtag}>#careers</span>{' '}
                <span className={styles.previewHashtag}>#businessgrowth</span>
              </p>

              <div className={styles.previewLink}>
                <div className={styles.previewLinkImage}>
                  <div className={styles.previewLinkImageContent}>
                    We are<br />looking for<br /><span style={{ color: '#FF6B00' }}>Talent</span>
                  </div>
                </div>
                <div className={styles.previewLinkInfo}>
                  <strong>This Project Needs Your Skills – Apply N...</strong>
                  <div className={styles.previewLinkUrl}>aiscout.mellow.io</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationsTab() {
  return (
    <div className={styles.applicationsEmpty}>
      <div className={styles.emptyIllustration}>
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
          {/* Binoculars illustration */}
          <g transform="translate(50, 30)">
            {/* Left lens */}
            <ellipse cx="25" cy="40" rx="18" ry="22" fill="#E5E5E5" stroke="#000000" strokeWidth="2"/>
            <ellipse cx="25" cy="40" rx="12" ry="16" fill="#ffffff" opacity="0.5"/>
            
            {/* Right lens */}
            <ellipse cx="75" cy="40" rx="18" ry="22" fill="#E5E5E5" stroke="#000000" strokeWidth="2"/>
            <ellipse cx="75" cy="40" rx="12" ry="16" fill="#ffffff" opacity="0.5"/>
            
            {/* Black/gray accent parts */}
            <rect x="40" y="30" width="20" height="20" fill="#000000" rx="4"/>
            <circle cx="20" cy="15" r="8" fill="#666666"/>
            <circle cx="80" cy="15" r="8" fill="#666666"/>
            
            {/* Hand holding */}
            <path d="M 10 50 Q 5 60, 15 65 L 85 65 Q 95 60, 90 50" stroke="#000000" strokeWidth="2" fill="none"/>
          </g>
          
          {/* Stars */}
          <path d="M 80 20 L 82 22 L 80 24 L 78 22 Z" fill="#000000"/>
          <path d="M 70 15 L 71 16 L 70 17 L 69 16 Z" fill="#000000"/>
          <path d="M 130 25 L 132 27 L 130 29 L 128 27 Z" fill="#000000"/>
          <path d="M 120 18 L 121 19 L 120 20 L 119 19 Z" fill="#000000"/>
        </svg>
      </div>
      
      <h2 className={styles.emptyTitle}>Time to Share Your Request</h2>
      <p className={styles.emptyText}>
        Post your link on LinkedIn, Facebook, Discord, Slack, and any freelancer communities or chats to start receiving applications.
      </p>
      
      <Button variant="brand">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M6 10H10C11.1046 10 12 10.8954 12 12V12C12 13.1046 12 13 12 13H10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M10 6V6C10 4.89543 10.8954 4 12 4H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Copy link
      </Button>
    </div>
  );
}

function EditTab() {
  return (
    <div className={styles.container}>
      <div className={styles.emptyState}>
        <h3>Edit Request</h3>
        <p>Edit functionality coming soon</p>
      </div>
    </div>
  );
}
