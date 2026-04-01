import { useState } from "react";
import styles from "./MellowPoolScreen.module.css";

type CardStatus = "new" | "viewed" | "invited" | "skipped";
type ViewMode = "first-visit" | "variant-b";

type ContractorSource = "mellow-pool" | "signal";

interface Contractor {
  id: string;
  name: string;
  initials: string;
  role: string;
  matchScore: number;
  experience: string;
  rate: string;
  location: string;
  skills: string[];
  education: string;
  email: string;
  cvFileName: string;
  bio: string;
  workHistory: { company: string; role: string; period: string }[];
  status: CardStatus;
  source: ContractorSource;
}

const POOL_CONTRACTORS: Contractor[] = [
  {
    id: "c1",
    name: "Alex Petrov",
    initials: "AP",
    role: "Senior React Developer",
    matchScore: 94,
    experience: "8 years",
    rate: "$65/hr",
    location: "Berlin, Germany",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    education: "MSc Computer Science, TU Berlin",
    email: "a.petrov@mail.com",
    cvFileName: "CV_Alex_Petrov.pdf",
    bio: "Full-stack developer with deep expertise in React ecosystem. Built and scaled frontend architectures for fintech and SaaS products serving 500K+ users.",
    workHistory: [
      { company: "Fintech Startup (Berlin)", role: "Lead Frontend Engineer", period: "2022 – present" },
      { company: "SAP", role: "Senior Developer", period: "2019 – 2022" },
      { company: "Freelance", role: "React Consultant", period: "2017 – 2019" },
    ],
    status: "new",
    source: "mellow-pool",
  },
  {
    id: "c2",
    name: "Maria Gonzalez",
    initials: "MG",
    role: "Full-Stack Engineer",
    matchScore: 91,
    experience: "6 years",
    rate: "$55/hr",
    location: "Lisbon, Portugal",
    skills: ["React", "Python", "PostgreSQL", "Docker", "CI/CD"],
    education: "BSc Software Engineering, IST Lisbon",
    email: "m.gonzalez@mail.com",
    cvFileName: "CV_Maria_Gonzalez.pdf",
    bio: "Versatile full-stack engineer experienced in building end-to-end web applications. Strong background in both frontend and backend with focus on developer experience.",
    workHistory: [
      { company: "Outsystems", role: "Full-Stack Engineer", period: "2021 – present" },
      { company: "Talkdesk", role: "Frontend Developer", period: "2019 – 2021" },
    ],
    status: "new",
    source: "mellow-pool",
  },
  {
    id: "c3",
    name: "James Chen",
    initials: "JC",
    role: "Frontend Architect",
    matchScore: 88,
    experience: "10 years",
    rate: "$80/hr",
    location: "Toronto, Canada",
    skills: ["React", "Vue.js", "TypeScript", "Design Systems", "Performance"],
    education: "BSc Computer Science, University of Toronto",
    email: "j.chen@mail.com",
    cvFileName: "CV_James_Chen.pdf",
    bio: "Frontend architect specializing in design systems and performance optimization. Led teams of 8+ engineers at scale.",
    workHistory: [
      { company: "Shopify", role: "Staff Frontend Engineer", period: "2020 – present" },
      { company: "Wealthsimple", role: "Senior Frontend Developer", period: "2017 – 2020" },
      { company: "Freelance", role: "UI Engineer", period: "2015 – 2017" },
    ],
    status: "new",
    source: "signal",
  },
  {
    id: "c4",
    name: "Olena Koval",
    initials: "OK",
    role: "React / React Native Developer",
    matchScore: 85,
    experience: "5 years",
    rate: "$45/hr",
    location: "Warsaw, Poland",
    skills: ["React", "React Native", "TypeScript", "Redux", "Firebase"],
    education: "BSc Computer Engineering, KPI Kyiv",
    email: "o.koval@mail.com",
    cvFileName: "CV_Olena_Koval.pdf",
    bio: "Cross-platform developer building web and mobile apps with React and React Native. Delivered 10+ production apps for startups across Europe.",
    workHistory: [
      { company: "Freelance", role: "React / RN Developer", period: "2022 – present" },
      { company: "Grammarly (Kyiv)", role: "Frontend Developer", period: "2020 – 2022" },
    ],
    status: "new",
    source: "signal",
  },
  {
    id: "c5",
    name: "Tom Nakamura",
    initials: "TN",
    role: "Senior Frontend Developer",
    matchScore: 82,
    experience: "7 years",
    rate: "$70/hr",
    location: "Amsterdam, Netherlands",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "Testing"],
    education: "MSc Information Systems, VU Amsterdam",
    email: "t.nakamura@mail.com",
    cvFileName: "CV_Tom_Nakamura.pdf",
    bio: "Quality-focused frontend developer with strong testing culture. Experienced in building accessible, high-performance web applications.",
    workHistory: [
      { company: "Booking.com", role: "Senior Frontend Engineer", period: "2021 – present" },
      { company: "Adyen", role: "Frontend Developer", period: "2018 – 2021" },
    ],
    status: "new",
    source: "mellow-pool",
  },
];

/* ============================================================
   Header — B&W version of the real product header
   ============================================================ */

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>mellow</div>
        <div className={styles.headerRight}>
          <button className={styles.newRequestBtn}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            New request
          </button>
          <button className={styles.aiScoutBtn}>
            AI Scout
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className={styles.headerAvatar}>VB</div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   View Mode Switcher — for toggling between prototype views
   ============================================================ */

function ViewSwitcher({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  return (
    <div className={styles.viewSwitcher}>
      <span className={styles.viewSwitcherLabel}>Prototype view:</span>
      <button
        className={`${styles.viewSwitcherBtn} ${mode === "first-visit" ? styles.viewSwitcherBtnActive : ""}`}
        onClick={() => onChange("first-visit")}
      >
        First Visit
      </button>
      <button
        className={`${styles.viewSwitcherBtn} ${mode === "variant-b" ? styles.viewSwitcherBtnActive : ""}`}
        onClick={() => onChange("variant-b")}
      >
        Returning Visit
      </button>
    </div>
  );
}

/* ============================================================
   Request Navigation — tabs, stats, published badge
   ============================================================ */

function RequestNavigation({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { id: string; label: string; badge?: number }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <div className={styles.requestNav}>
      <div className={styles.requestNavLeft}>
        <button className={styles.backBtn}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.navTab} ${activeTab === tab.id ? styles.navTabActive : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className={styles.navTabBadge}>{tab.badge}</span>
            )}
          </button>
        ))}
      </div>
      <div className={styles.requestNavRight}>
        <span className={styles.statsText}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ verticalAlign: "middle", marginRight: 4 }}>
            <circle cx="8" cy="8" r="6" stroke="#999" strokeWidth="1.5" fill="none" />
            <circle cx="8" cy="8" r="2.5" fill="#999" />
          </svg>
          0 viewed · 0 applied
        </span>
        <button className={styles.linkBtn}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.5 9.5l3-3M7 11l-1.5 1.5a2.12 2.12 0 01-3-3L4 8m5-2l1.5-1.5a2.12 2.12 0 013 3L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button className={styles.publishedBtn}>
          Published
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Contractor Row — matches real product candidate row
   ============================================================ */

function ContractorRow({
  contractor,
  onClick,
}: {
  contractor: Contractor;
  onClick: () => void;
}) {
  const isInactive = contractor.status === "invited" || contractor.status === "skipped";

  return (
    <div
      className={`${styles.candidateRow} ${isInactive ? styles.candidateRowInactive : ""}`}
      onClick={onClick}
    >
      <div className={styles.candidateRowLeft}>
        <span className={`${styles.candidateBadge} ${
          contractor.status === "new" ? styles.badgeNew :
          contractor.status === "viewed" ? styles.badgeViewed :
          contractor.status === "invited" ? styles.badgeInvited :
          styles.badgeSkipped
        }`}>
          {contractor.status === "invited" ? "Invited" :
           contractor.status === "skipped" ? "Skipped" :
           contractor.status === "viewed" ? "Viewed" : "New"}
        </span>
        <span className={styles.candidateName}>{contractor.name}</span>
      </div>
      <div className={styles.candidateRowRight}>
        <span className={styles.candidateMatch}>{contractor.matchScore}%</span>
      </div>
    </div>
  );
}

/* ============================================================
   Contractor Modal — Application-style modal
   ============================================================ */

function ContractorModal({
  contractor,
  onClose,
  onInvite,
  onSkip,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  inviteDisabled,
}: {
  contractor: Contractor;
  onClose: () => void;
  onInvite: () => void;
  onSkip: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  inviteDisabled: boolean;
}) {
  const isInvited = contractor.status === "invited";
  const isSkipped = contractor.status === "skipped";

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Recommended Contractor</h2>
          <button className={styles.modalClose} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalRoleRow}>
            <span className={styles.modalRoleLabel}>{contractor.role}</span>
            <span className={styles.modalNotApplied}>Not applied yet</span>
          </div>
          <h3 className={styles.modalName}>{contractor.name}</h3>

          <div className={styles.modalFieldsRow}>
            <div className={styles.modalField}>
              <span className={styles.modalFieldLabel}>Email</span>
              <span className={styles.modalFieldLink}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {contractor.email}
              </span>
            </div>
            <div className={styles.modalField}>
              <span className={styles.modalFieldLabel}>CV</span>
              <span className={styles.modalFieldLink}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v7M7 9L4.5 6.5M7 9l2.5-2.5M3 11h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {contractor.cvFileName}
              </span>
            </div>
          </div>

          <div className={styles.modalMetaRow}>
            <div className={styles.modalMatchSection}>
              <span className={styles.modalMatchLabel}>Candidate match (AI Scout)</span>
              <div className={styles.modalMatchValue}>{contractor.matchScore}%</div>
            </div>
            <div className={styles.modalSourceSection}>
              <span className={styles.modalMatchLabel}>Found via</span>
              <span className={styles.sourceTag}>
                {contractor.source === "mellow-pool" ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                      <circle cx="7" cy="7" r="2" fill="currentColor" />
                    </svg>
                    Mellow Pool
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 7a5 5 0 1 1 10 0 5 5 0 0 1-10 0z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    </svg>
                    Signal
                  </>
                )}
              </span>
            </div>
          </div>

          <div className={styles.modalCtaBlock}>
            <div className={styles.modalCtaIcon}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#000" strokeWidth="1.5" fill="none" />
                <path d="M10 14l3 3 5-5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.modalCtaText}>
              {isInvited
                ? "Invitation sent. You'll be notified when they respond."
                : isSkipped
                ? "You skipped this contractor. You can still send an invitation."
                : "This contractor hasn't applied yet. Send an invitation and they can apply for your request."}
            </div>
            <button
              className={styles.modalCtaBtn}
              onClick={onInvite}
              disabled={isInvited || inviteDisabled}
            >
              {isInvited ? "✓ Invited" : "Send Invitation"}
            </button>
          </div>

          <div className={styles.modalDetailsGrid}>
            <div className={styles.modalDetailItem}>
              <span className={styles.modalDetailLabel}>Experience</span>
              <span className={styles.modalDetailValue}>{contractor.experience}</span>
            </div>
            <div className={styles.modalDetailItem}>
              <span className={styles.modalDetailLabel}>Rate</span>
              <span className={styles.modalDetailValue}>{contractor.rate}</span>
            </div>
            <div className={styles.modalDetailItem}>
              <span className={styles.modalDetailLabel}>Location</span>
              <span className={styles.modalDetailValue}>{contractor.location}</span>
            </div>
            <div className={styles.modalDetailItem}>
              <span className={styles.modalDetailLabel}>Education</span>
              <span className={styles.modalDetailValue}>{contractor.education}</span>
            </div>
          </div>

          <div className={styles.modalSkillsSection}>
            <span className={styles.modalDetailLabel}>Skills</span>
            <div className={styles.modalSkillsList}>
              {contractor.skills.map((s) => (
                <span key={s} className={styles.skillTag}>{s}</span>
              ))}
            </div>
          </div>

          {!isInvited && !isSkipped && (
            <button className={styles.skipBtn} onClick={onSkip}>
              Skip this contractor
            </button>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.modalNavBtn}
            onClick={onPrev}
            disabled={!hasPrev}
          >
            ← Previous
          </button>
          <button
            className={styles.modalNavBtn}
            onClick={onNext}
            disabled={!hasNext}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Ultra Banner — two formats: expanded and compact
   ============================================================ */

function UltraBannerExpanded({ onCollapse }: { onCollapse: () => void }) {
  return (
    <div className={styles.ultraExpanded}>
      <div className={styles.ultraExpandedContent}>
        <h3 className={styles.ultraExpandedTitle}>Need a Pro to Step In?</h3>
        <ul className={styles.ultraList}>
          <li><span className={styles.checkmark}>✓</span> Your request is reviewed and refined by a real person</li>
          <li><span className={styles.checkmark}>✓</span> 3+ carefully selected candidates within 48 hours</li>
          <li><span className={styles.checkmark}>✓</span> You'll be notified as soon as your shortlist is ready</li>
        </ul>
        <button className={styles.btnBlack}>Try Ultra for free</button>
      </div>
      <button className={styles.ultraCloseBtn} onClick={onCollapse}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function UltraBannerCompact({ onExpand }: { onExpand: () => void }) {
  return (
    <div className={styles.ultraCompact} onClick={onExpand}>
      <div className={styles.ultraCompactLeft}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#000" strokeWidth="1.5" fill="none" />
          <path d="M12 7v5l3 3" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <span className={styles.ultraCompactTitle}>Hire faster with Ultra!</span>
          <span className={styles.ultraCompactText}>A dedicated manager delivers 3+ matching candidates within 48 hours</span>
        </div>
      </div>
      <button className={styles.btnBlack} style={{ flexShrink: 0 }}>Try Ultra for free</button>
    </div>
  );
}

/* ============================================================
   Candidates Empty State
   ============================================================ */

function CandidatesEmptyState() {
  return (
    <div className={styles.emptyState}>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="16" y="12" width="48" height="56" rx="5" stroke="#ccc" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="30" r="10" stroke="#ccc" strokeWidth="1.5" fill="none" />
        <path d="M26 58c0-11.6 28-11.6 28 0" stroke="#ccc" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <h3 className={styles.emptyTitle}>Candidates Will Appear Here</h3>
      <p className={styles.emptyText}>
        Want to speed things up? Use our sharing kit to reach even more people.
      </p>
      <button className={styles.btnOutline}>Share your request</button>
    </div>
  );
}

/* ============================================================
   Progress Bar — for first visit
   ============================================================ */

function ProgressBar({ reviewed, total }: { reviewed: number; total: number }) {
  return (
    <div className={styles.progressSection}>
      <div className={styles.progressInfo}>
        <h2 className={styles.progressTitle}>We found contractors for your request</h2>
        <p className={styles.progressSubtitle}>Review each contractor and invite them to apply</p>
      </div>
      <div className={styles.progressRight}>
        <span className={styles.progressText}>{reviewed} of {total} reviewed</span>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${(reviewed / total) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FIRST VISIT — Pool as a dedicated step
   ============================================================ */

function FirstVisitView({
  contractors,
  setContractors,
  onComplete,
}: {
  contractors: Contractor[];
  setContractors: React.Dispatch<React.SetStateAction<Contractor[]>>;
  onComplete: () => void;
}) {
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [inviteCount, setInviteCount] = useState(0);
  const [showRateLimit, setShowRateLimit] = useState(false);

  const openModal = (idx: number) => {
    setModalIdx(idx);
    setContractors((prev) =>
      prev.map((c, i) => (i === idx && c.status === "new" ? { ...c, status: "viewed" as const } : c))
    );
  };

  const handleInvite = () => {
    if (modalIdx === null) return;
    if (inviteCount >= 10) {
      setShowRateLimit(true);
      setTimeout(() => setShowRateLimit(false), 3000);
      return;
    }
    setContractors((prev) =>
      prev.map((c, i) => (i === modalIdx ? { ...c, status: "invited" as const } : c))
    );
    setInviteCount((n) => n + 1);
    setTimeout(() => {
      if (modalIdx < contractors.length - 1) {
        openModal(modalIdx + 1);
      } else {
        setModalIdx(null);
        onComplete();
      }
    }, 400);
  };

  const handleSkip = () => {
    if (modalIdx === null) return;
    setContractors((prev) =>
      prev.map((c, i) =>
        i === modalIdx && (c.status === "new" || c.status === "viewed")
          ? { ...c, status: "skipped" as const }
          : c
      )
    );
    if (modalIdx < contractors.length - 1) {
      openModal(modalIdx + 1);
    } else {
      setModalIdx(null);
      onComplete();
    }
  };

  return (
    <>
      <p className={styles.poolHeaderText}>
        We found {contractors.length} contractors matching your request. Review their profiles and invite them to apply.
      </p>

      <div className={styles.poolList}>
        {contractors.map((c, i) => (
          <ContractorRow key={c.id} contractor={c} onClick={() => openModal(i)} />
        ))}
      </div>

      <button className={styles.poolNextBtn} onClick={onComplete}>
        Next step
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {modalIdx !== null && contractors[modalIdx] && (
        <ContractorModal
          contractor={contractors[modalIdx]}
          onClose={() => setModalIdx(null)}
          onInvite={handleInvite}
          onSkip={handleSkip}
          onPrev={() => modalIdx > 0 && openModal(modalIdx - 1)}
          onNext={() => modalIdx < contractors.length - 1 && openModal(modalIdx + 1)}
          hasPrev={modalIdx > 0}
          hasNext={modalIdx < contractors.length - 1}
          inviteDisabled={inviteCount >= 10}
        />
      )}

      {showRateLimit && (
        <div className={styles.rateLimitToast}>
          You've reached the invitation limit. Please try again later.
        </div>
      )}
    </>
  );
}

/* ============================================================
   RETURNING VISIT — Pool as sub-tab within Candidates
   ============================================================ */

function VariantB({
  contractors,
  setContractors,
}: {
  contractors: Contractor[];
  setContractors: React.Dispatch<React.SetStateAction<Contractor[]>>;
}) {
  const [activeTab, setActiveTab] = useState<string>("candidates");
  const [subTab, setSubTab] = useState<"applied" | "recommended">("recommended");
  const [ultraExpanded, setUltraExpanded] = useState(true);
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [inviteCount, setInviteCount] = useState(0);

  const invitedCount = contractors.filter((c) => c.status === "invited").length;
  const poolCount = contractors.length;

  const openModal = (idx: number) => {
    setModalIdx(idx);
    setContractors((prev) =>
      prev.map((c, i) => (i === idx && c.status === "new" ? { ...c, status: "viewed" as const } : c))
    );
  };

  const handleInvite = () => {
    if (modalIdx === null) return;
    setContractors((prev) =>
      prev.map((c, i) => (i === modalIdx ? { ...c, status: "invited" as const } : c))
    );
    setInviteCount((n) => n + 1);
  };

  const handleSkip = () => {
    if (modalIdx === null) return;
    setContractors((prev) =>
      prev.map((c, i) =>
        i === modalIdx && (c.status === "new" || c.status === "viewed")
          ? { ...c, status: "skipped" as const }
          : c
      )
    );
  };

  return (
    <>
      <RequestNavigation
        tabs={[
          { id: "candidates", label: "Candidates" },
          { id: "promotion", label: "Promotion" },
          { id: "edit", label: "Edit" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "candidates" && (
        <div className={styles.tabContent}>
          <div className={styles.subTabs}>
            <button
              className={`${styles.subTab} ${subTab === "recommended" ? styles.subTabActive : ""}`}
              onClick={() => setSubTab("recommended")}
            >
              Recommended by Mellow
              <span className={styles.subTabBadge}>{poolCount}</span>
            </button>
            <button
              className={`${styles.subTab} ${subTab === "applied" ? styles.subTabActive : ""}`}
              onClick={() => setSubTab("applied")}
            >
              Applied
            </button>
          </div>

          {subTab === "applied" && (
            <>
              <div className={styles.sortRow}>
                <button className={styles.sortBtn}>
                  Sort by Status
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {ultraExpanded ? (
                <UltraBannerExpanded onCollapse={() => setUltraExpanded(false)} />
              ) : (
                <UltraBannerCompact onExpand={() => setUltraExpanded(true)} />
              )}
              <CandidatesEmptyState />
            </>
          )}

          {subTab === "recommended" && (
            <>
              <p className={styles.poolSubtitle}>
                {invitedCount > 0
                  ? `You've invited ${invitedCount} contractor${invitedCount > 1 ? "s" : ""}. Waiting for their response.`
                  : "Here's a shortlist of contractors suggested by AI Scout based on your request"}
              </p>
              <div className={styles.poolList}>
                {contractors.map((c, i) => (
                  <ContractorRow key={c.id} contractor={c} onClick={() => openModal(i)} />
                ))}
                <div className={styles.moreSuggestions}>
                  <span>Want to see more contractors?</span>
                  <button className={styles.btnOutline}>Get more suggestions</button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {modalIdx !== null && contractors[modalIdx] && (
        <ContractorModal
          contractor={contractors[modalIdx]}
          onClose={() => setModalIdx(null)}
          onInvite={handleInvite}
          onSkip={handleSkip}
          onPrev={() => modalIdx > 0 && openModal(modalIdx - 1)}
          onNext={() => modalIdx < contractors.length - 1 && openModal(modalIdx + 1)}
          hasPrev={modalIdx > 0}
          hasNext={modalIdx < contractors.length - 1}
          inviteDisabled={inviteCount >= 10}
        />
      )}
    </>
  );
}

/* ============================================================
   MAIN EXPORT
   ============================================================ */

export function MellowPoolScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>("first-visit");
  const [contractors, setContractors] = useState(POOL_CONTRACTORS);

  const resetContractors = () => setContractors(POOL_CONTRACTORS.map((c) => ({ ...c, status: "new" as const })));

  const handleViewChange = (m: ViewMode) => {
    setViewMode(m);
    resetContractors();
  };

  return (
    <div className={styles.screen}>
      <ViewSwitcher mode={viewMode} onChange={handleViewChange} />
      {viewMode !== "first-visit" && <Header />}
      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.requestTitle}>Senior React Developer</h1>

          {viewMode === "first-visit" && (
            <FirstVisitView
              contractors={contractors}
              setContractors={setContractors}
              onComplete={() => setViewMode("variant-b")}
            />
          )}

          {viewMode === "variant-b" && (
            <VariantB
              contractors={contractors}
              setContractors={setContractors}
            />
          )}
        </div>
      </div>
    </div>
  );
}
