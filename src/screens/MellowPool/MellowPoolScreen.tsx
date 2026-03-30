import { useState } from "react";
import styles from "./MellowPoolScreen.module.css";

type CardStatus = "new" | "viewed" | "invited" | "skipped";

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
  bio: string;
  workHistory: { company: string; role: string; period: string }[];
  status: CardStatus;
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
    bio: "Full-stack developer with deep expertise in React ecosystem. Built and scaled frontend architectures for fintech and SaaS products serving 500K+ users.",
    workHistory: [
      { company: "Fintech Startup (Berlin)", role: "Lead Frontend Engineer", period: "2022 – present" },
      { company: "SAP", role: "Senior Developer", period: "2019 – 2022" },
      { company: "Freelance", role: "React Consultant", period: "2017 – 2019" },
    ],
    status: "new",
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
    bio: "Versatile full-stack engineer experienced in building end-to-end web applications. Strong background in both frontend and backend with focus on developer experience.",
    workHistory: [
      { company: "Outsystems", role: "Full-Stack Engineer", period: "2021 – present" },
      { company: "Talkdesk", role: "Frontend Developer", period: "2019 – 2021" },
    ],
    status: "new",
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
    bio: "Frontend architect specializing in design systems and performance optimization. Led teams of 8+ engineers at scale. Speaker at ReactConf and JSNation.",
    workHistory: [
      { company: "Shopify", role: "Staff Frontend Engineer", period: "2020 – present" },
      { company: "Wealthsimple", role: "Senior Frontend Developer", period: "2017 – 2020" },
      { company: "Freelance", role: "UI Engineer", period: "2015 – 2017" },
    ],
    status: "new",
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
    bio: "Cross-platform developer building web and mobile apps with React and React Native. Delivered 10+ production apps for startups across Europe.",
    workHistory: [
      { company: "Freelance", role: "React / RN Developer", period: "2022 – present" },
      { company: "Grammarly (Kyiv)", role: "Frontend Developer", period: "2020 – 2022" },
    ],
    status: "new",
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
    bio: "Quality-focused frontend developer with strong testing culture. Experienced in building accessible, high-performance web applications with Next.js.",
    workHistory: [
      { company: "Booking.com", role: "Senior Frontend Engineer", period: "2021 – present" },
      { company: "Adyen", role: "Frontend Developer", period: "2018 – 2021" },
    ],
    status: "new",
  },
];

function Header() {
  return (
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
  );
}

/* ============================================================
   Resume Viewer
   ============================================================ */

function ResumeView({ contractor }: { contractor: Contractor }) {
  return (
    <div className={styles.resumePanel}>
      <div className={styles.resumeHeader}>
        <div className={styles.resumeAvatar}>{contractor.initials}</div>
        <div>
          <h3 className={styles.resumeName}>{contractor.name}</h3>
          <p className={styles.resumeRole}>{contractor.role}</p>
          <p className={styles.resumeLocation}>{contractor.location}</p>
        </div>
      </div>

      <div className={styles.resumeSection}>
        <h4 className={styles.resumeSectionTitle}>About</h4>
        <p className={styles.resumeText}>{contractor.bio}</p>
      </div>

      <div className={styles.resumeSection}>
        <h4 className={styles.resumeSectionTitle}>Experience</h4>
        {contractor.workHistory.map((job, i) => (
          <div key={i} className={styles.resumeJob}>
            <div className={styles.resumeJobTitle}>{job.role}</div>
            <div className={styles.resumeJobCompany}>{job.company}</div>
            <div className={styles.resumeJobPeriod}>{job.period}</div>
          </div>
        ))}
      </div>

      <div className={styles.resumeSection}>
        <h4 className={styles.resumeSectionTitle}>Education</h4>
        <p className={styles.resumeText}>{contractor.education}</p>
      </div>

      <div className={styles.resumeSection}>
        <h4 className={styles.resumeSectionTitle}>Skills</h4>
        <div className={styles.skillsList}>
          {contractor.skills.map((skill) => (
            <span key={skill} className={styles.skillTag}>{skill}</span>
          ))}
        </div>
      </div>

      <div className={styles.resumeSection}>
        <div className={styles.resumeMeta}>
          <span>Rate: {contractor.rate}</span>
          <span>·</span>
          <span>Experience: {contractor.experience}</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Ultra CTA Banner
   ============================================================ */

function UltraBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className={styles.ultraBanner}>
      <div className={styles.ultraBannerContent}>
        <h3 className={styles.ultraBannerTitle}>Need a Pro to Step In?</h3>
        <ul className={styles.ultraBannerList}>
          <li>
            <span className={styles.ultraCheck}>✓</span>
            Your request is reviewed and refined by a real person
          </li>
          <li>
            <span className={styles.ultraCheck}>✓</span>
            3+ carefully selected candidates within 48 hours
          </li>
          <li>
            <span className={styles.ultraCheck}>✓</span>
            You'll be notified as soon as your shortlist is ready
          </li>
        </ul>
        <button className={styles.btnPrimary} style={{ width: "auto" }}>
          Try Ultra for free
        </button>
      </div>
      <button className={styles.ultraBannerClose} onClick={onDismiss}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/* ============================================================
   Candidates Empty State
   ============================================================ */

function CandidatesEmptyState() {
  return (
    <div className={styles.candidatesEmpty}>
      <div className={styles.candidatesEmptyIcon}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <rect x="20" y="15" width="60" height="70" rx="6" stroke="#cccccc" strokeWidth="2" fill="none" />
          <circle cx="50" cy="38" r="12" stroke="#cccccc" strokeWidth="2" fill="none" />
          <path d="M32 72 C32 58 68 58 68 72" stroke="#cccccc" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="68" cy="25" r="14" stroke="#000000" strokeWidth="2" fill="#ffffff" />
          <line x1="68" y1="19" x2="68" y2="31" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <line x1="62" y1="25" x2="74" y2="25" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className={styles.candidatesEmptyTitle}>Candidates Will Appear Here</h3>
      <p className={styles.candidatesEmptyText}>
        Want to speed things up? Use our sharing kit to reach even more people.
      </p>
      <button className={styles.btnOutlined}>Share your request</button>
    </div>
  );
}

/* ============================================================
   FIRST VISIT — Pool as a dedicated step
   ============================================================ */

function FirstVisitPool({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [contractors, setContractors] = useState(POOL_CONTRACTORS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inviteCount, setInviteCount] = useState(0);
  const [showRateLimit, setShowRateLimit] = useState(false);

  const reviewed = contractors.filter((c) => c.status !== "new").length;
  const total = contractors.length;
  const current = contractors[currentIdx];

  const markViewed = (idx: number) => {
    setContractors((prev) =>
      prev.map((c, i) => (i === idx && c.status === "new" ? { ...c, status: "viewed" as const } : c))
    );
  };

  const goNext = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx(currentIdx + 1);
      markViewed(currentIdx + 1);
    } else {
      onComplete();
    }
  };

  const handleInvite = () => {
    if (inviteCount >= 10) {
      setShowRateLimit(true);
      setTimeout(() => setShowRateLimit(false), 3000);
      return;
    }
    setContractors((prev) =>
      prev.map((c, i) => (i === currentIdx ? { ...c, status: "invited" as const } : c))
    );
    setInviteCount((n) => n + 1);
    setTimeout(goNext, 400);
  };

  const handleSkip = () => {
    setContractors((prev) =>
      prev.map((c, i) => (i === currentIdx && (c.status === "new" || c.status === "viewed") ? { ...c, status: "skipped" as const } : c))
    );
    goNext();
  };

  const handleSelectCard = (idx: number) => {
    setCurrentIdx(idx);
    markViewed(idx);
  };

  if (!current) return null;

  const isInvited = current.status === "invited";

  return (
    <div className={styles.firstVisitWrapper}>
      {/* Step header */}
      <div className={styles.stepHeader}>
        <div className={styles.stepHeaderLeft}>
          <h2 className={styles.stepTitle}>We found contractors for your request</h2>
          <p className={styles.stepSubtitle}>
            Review each contractor's profile and invite them to apply
          </p>
        </div>
        <div className={styles.stepProgress}>
          <span className={styles.stepProgressText}>{reviewed} of {total} reviewed</span>
          <div className={styles.stepProgressBar}>
            <div className={styles.stepProgressFill} style={{ width: `${(reviewed / total) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className={styles.firstVisitLayout}>
        {/* Left: contractor list */}
        <div className={styles.contractorList}>
          {contractors.map((c, i) => (
            <div
              key={c.id}
              className={`${styles.contractorCard} ${i === currentIdx ? styles.contractorCardSelected : ""} ${c.status === "invited" ? styles.contractorCardInvited : ""} ${c.status === "skipped" ? styles.contractorCardSkipped : ""}`}
              onClick={() => handleSelectCard(i)}
            >
              <div className={styles.contractorAvatar}>{c.initials}</div>
              <div className={styles.contractorInfo}>
                <p className={styles.contractorName}>{c.name}</p>
                <p className={styles.contractorRole}>{c.role}</p>
              </div>
              <div className={styles.contractorRight}>
                <span className={styles.matchScore}>{c.matchScore}%</span>
                <span className={`${styles.cardBadge} ${
                  c.status === "new" ? styles.badgeNew :
                  c.status === "viewed" ? styles.badgeViewed :
                  c.status === "invited" ? styles.badgeInvited :
                  styles.badgeSkipped
                }`}>
                  {c.status === "skipped" ? "skipped" : c.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: detail panel */}
        <div className={styles.rightPanel}>
          <div className={styles.detailPanel}>
            <div className={styles.detailTop}>
              <div className={styles.detailAvatar}>{current.initials}</div>
              <div className={styles.detailHeaderInfo}>
                <h3 className={styles.detailName}>{current.name}</h3>
                <p className={styles.detailRole}>{current.role}</p>
                <div className={styles.detailMatchBadge}>{current.matchScore}% match</div>
                <p className={styles.detailStatus}>Not applied yet</p>
              </div>
            </div>

            <div className={styles.detailFields}>
              <div className={styles.detailField}>
                <span className={styles.detailFieldLabel}>Experience</span>
                <span className={styles.detailFieldValue}>{current.experience}</span>
              </div>
              <div className={styles.detailField}>
                <span className={styles.detailFieldLabel}>Rate</span>
                <span className={styles.detailFieldValue}>{current.rate}</span>
              </div>
              <div className={styles.detailField}>
                <span className={styles.detailFieldLabel}>Location</span>
                <span className={styles.detailFieldValue}>{current.location}</span>
              </div>
              <div className={styles.detailField}>
                <span className={styles.detailFieldLabel}>Skills</span>
                <div className={styles.skillsList}>
                  {current.skills.map((skill) => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* CV file attachment */}
              <div className={styles.detailField}>
                <span className={styles.detailFieldLabel}>Resume</span>
                <div className={styles.cvFile}>
                  <div className={styles.cvFileIcon}>
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                      <path d="M0 3C0 1.34315 1.34315 0 3 0H12L20 8V21C20 22.6569 18.6569 24 17 24H3C1.34315 24 0 22.6569 0 21V3Z" fill="#f0f0f0" stroke="#cccccc" strokeWidth="1"/>
                      <path d="M12 0L20 8H15C13.3431 8 12 6.65685 12 5V0Z" fill="#e0e0e0"/>
                      <rect x="4" y="12" width="12" height="1.5" rx="0.75" fill="#cccccc"/>
                      <rect x="4" y="15.5" width="9" height="1.5" rx="0.75" fill="#cccccc"/>
                      <rect x="4" y="19" width="10" height="1.5" rx="0.75" fill="#cccccc"/>
                    </svg>
                  </div>
                  <div className={styles.cvFileInfo}>
                    <span className={styles.cvFileName}>{current.name.replace(" ", "_")}_CV.pdf</span>
                    <span className={styles.cvFileSize}>PDF · 124 KB</span>
                  </div>
                  <button className={styles.cvFileView} onClick={() => alert(`Opening ${current.name}'s CV (stub)`)}>
                    View
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.detailActions}>
              <button
                className={styles.btnPrimary}
                onClick={handleInvite}
                disabled={isInvited}
              >
                {isInvited ? "✓ Invited" : "Send Invitation"}
              </button>
              <button className={styles.btnSecondary} onClick={handleSkip}>
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>

      {showRateLimit && (
        <div className={styles.rateLimitToast}>
          You've reached the invitation limit. Please try again later.
        </div>
      )}
    </div>
  );
}

/* ============================================================
   RETURNING VIEW — Tabs: Candidates + Recommended by Mellow
   ============================================================ */

function ReturningView() {
  const [activeTab, setActiveTab] = useState<"candidates" | "recommended">("candidates");
  const [showUltra, setShowUltra] = useState(true);
  const [contractors, setContractors] = useState(POOL_CONTRACTORS);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showResume, setShowResume] = useState(false);
  const [inviteCount, setInviteCount] = useState(0);
  const [showRateLimit, setShowRateLimit] = useState(false);

  const selected = contractors[selectedIdx];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setShowResume(false);
    setContractors((prev) =>
      prev.map((c, i) => (i === idx && c.status === "new" ? { ...c, status: "viewed" as const } : c))
    );
  };

  const handleInvite = () => {
    if (inviteCount >= 10) {
      setShowRateLimit(true);
      setTimeout(() => setShowRateLimit(false), 3000);
      return;
    }
    setContractors((prev) =>
      prev.map((c, i) => (i === selectedIdx ? { ...c, status: "invited" as const } : c))
    );
    setInviteCount((n) => n + 1);
  };

  const handleSkip = () => {
    setContractors((prev) =>
      prev.map((c, i) => (i === selectedIdx && (c.status === "new" || c.status === "viewed") ? { ...c, status: "skipped" as const } : c))
    );
    if (selectedIdx < contractors.length - 1) {
      handleSelect(selectedIdx + 1);
    }
  };

  return (
    <>
      <div className={styles.poolSection}>
        <div className={styles.candidatesTabs}>
          <button
            className={`${styles.candidatesTab} ${activeTab === "candidates" ? styles.candidatesTabActive : ""}`}
            onClick={() => setActiveTab("candidates")}
          >
            Candidates
          </button>
          <button
            className={`${styles.candidatesTab} ${activeTab === "recommended" ? styles.candidatesTabActive : ""}`}
            onClick={() => setActiveTab("recommended")}
          >
            Recommended by Mellow
            <span className={styles.tabBadge}>{contractors.length}</span>
          </button>
        </div>

        {/* Tab: Candidates */}
        {activeTab === "candidates" && (
          <div className={styles.candidatesTabContent}>
            <div className={styles.filterRow}>
              <button className={styles.sortButton}>
                Best match first
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className={styles.statsText}>0 viewed · 0 applied</span>
            </div>

            {showUltra && <UltraBanner onDismiss={() => setShowUltra(false)} />}
            <CandidatesEmptyState />
          </div>
        )}

        {/* Tab: Recommended by Mellow */}
        {activeTab === "recommended" && selected && (
          <div className={styles.recommendedTabContent}>
            <p className={styles.poolSubtitle}>
              Here's a shortlist of contractors suggested by AI Scout based on your request
            </p>

            <div className={styles.mainLayout}>
              <div className={styles.contractorList}>
                {contractors.map((c, i) => (
                  <div
                    key={c.id}
                    className={`${styles.contractorCard} ${i === selectedIdx ? styles.contractorCardSelected : ""} ${c.status === "invited" ? styles.contractorCardInvited : ""} ${c.status === "skipped" ? styles.contractorCardSkipped : ""}`}
                    onClick={() => handleSelect(i)}
                  >
                    <div className={styles.contractorAvatar}>{c.initials}</div>
                    <div className={styles.contractorInfo}>
                      <p className={styles.contractorName}>{c.name}</p>
                      <p className={styles.contractorRole}>{c.role}</p>
                    </div>
                    <div className={styles.contractorRight}>
                      <span className={styles.matchScore}>{c.matchScore}%</span>
                      <span className={`${styles.cardBadge} ${
                        c.status === "new" ? styles.badgeNew :
                        c.status === "viewed" ? styles.badgeViewed :
                        c.status === "invited" ? styles.badgeInvited :
                        styles.badgeSkipped
                      }`}>
                        {c.status === "skipped" ? "skipped" : c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.rightPanel}>
                {showResume ? (
                  <>
                    <button className={styles.backToProfile} onClick={() => setShowResume(false)}>
                      ← Back to profile
                    </button>
                    <ResumeView contractor={selected} />
                    <div className={styles.resumeActions}>
                      <button
                        className={styles.btnPrimary}
                        onClick={handleInvite}
                        disabled={selected.status === "invited"}
                      >
                        {selected.status === "invited" ? "✓ Invited" : "Send Invitation"}
                      </button>
                      <button className={styles.btnSecondary} onClick={handleSkip}>
                        Skip
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.detailPanel}>
                    <div className={styles.detailTop}>
                      <div className={styles.detailAvatar}>{selected.initials}</div>
                      <div className={styles.detailHeaderInfo}>
                        <h3 className={styles.detailName}>{selected.name}</h3>
                        <p className={styles.detailRole}>{selected.role}</p>
                        <div className={styles.detailMatchBadge}>{selected.matchScore}% match</div>
                        <p className={styles.detailStatus}>Not applied yet</p>
                      </div>
                    </div>

                    <div className={styles.detailFields}>
                      <div className={styles.detailField}>
                        <span className={styles.detailFieldLabel}>Experience</span>
                        <span className={styles.detailFieldValue}>{selected.experience}</span>
                      </div>
                      <div className={styles.detailField}>
                        <span className={styles.detailFieldLabel}>Rate</span>
                        <span className={styles.detailFieldValue}>{selected.rate}</span>
                      </div>
                      <div className={styles.detailField}>
                        <span className={styles.detailFieldLabel}>Location</span>
                        <span className={styles.detailFieldValue}>{selected.location}</span>
                      </div>
                      <div className={styles.detailField}>
                        <span className={styles.detailFieldLabel}>Skills</span>
                        <div className={styles.skillsList}>
                          {selected.skills.map((skill) => (
                            <span key={skill} className={styles.skillTag}>{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.detailActions}>
                      <button className={styles.btnViewResume} onClick={() => setShowResume(true)}>
                        View Resume
                      </button>
                      <button
                        className={styles.btnPrimary}
                        onClick={handleInvite}
                        disabled={selected.status === "invited"}
                      >
                        {selected.status === "invited" ? "✓ Invited" : "Send Invitation"}
                      </button>
                      <button className={styles.btnSecondary} onClick={handleSkip}>
                        Skip
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showRateLimit && (
        <div className={styles.rateLimitToast}>
          You've reached the invitation limit. Please try again later.
        </div>
      )}
    </>
  );
}

/* ============================================================
   MAIN EXPORT
   ============================================================ */

export function MellowPoolScreen() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  return (
    <div className={styles.screen}>
      <Header />
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.requestHeader}>
            <h1 className={styles.requestTitle}>Senior React Developer</h1>
          </div>

          {isFirstVisit ? (
            <FirstVisitPool onComplete={() => setIsFirstVisit(false)} />
          ) : (
            <ReturningView />
          )}
        </div>
      </div>
    </div>
  );
}
