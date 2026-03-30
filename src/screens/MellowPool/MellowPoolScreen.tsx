import { useState } from "react";
import styles from "./MellowPoolScreen.module.css";

export type PoolVariant = "A" | "B" | "C";

type CardStatus = "new" | "viewed" | "invited";

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
  status: CardStatus;
}

interface Application {
  id: string;
  name: string;
  initials: string;
  role: string;
  matchScore: number;
  tag?: "mellow_pool" | "ultra";
  date: string;
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
    status: "new",
  },
];

const MOCK_APPLICATIONS: Application[] = [
  {
    id: "a1",
    name: "David Kim",
    initials: "DK",
    role: "React Developer",
    matchScore: 89,
    date: "2 hours ago",
  },
  {
    id: "a2",
    name: "Sara Weber",
    initials: "SW",
    role: "Frontend Engineer",
    matchScore: 84,
    tag: "ultra",
    date: "5 hours ago",
  },
  {
    id: "a3",
    name: "Pavel Sokolov",
    initials: "PS",
    role: "Full-Stack Developer",
    matchScore: 81,
    tag: "mellow_pool",
    date: "1 day ago",
  },
];

type PipelineStep = "request" | "pool" | "promote" | "ultra" | "candidates";

const PIPELINE_STEPS: { key: PipelineStep; label: string }[] = [
  { key: "request", label: "Your request" },
  { key: "pool", label: "Mellow Pool" },
  { key: "promote", label: "Promote" },
  { key: "ultra", label: "Ultra" },
  { key: "candidates", label: "Candidates" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function Pipeline({
  activeStep,
  onStepClick,
  completedSteps,
}: {
  activeStep: PipelineStep;
  onStepClick: (step: PipelineStep) => void;
  completedSteps: PipelineStep[];
}) {
  return (
    <div className={styles.pipeline}>
      {PIPELINE_STEPS.map((step, i) => {
        const isActive = step.key === activeStep;
        const isCompleted = completedSteps.includes(step.key);
        return (
          <div key={step.key} style={{ display: "flex", alignItems: "center", flex: i < PIPELINE_STEPS.length - 1 ? 1 : undefined }}>
            <button
              className={`${styles.pipelineStep} ${isActive ? styles.pipelineStepActive : ""} ${isCompleted ? styles.pipelineStepCompleted : ""}`}
              onClick={() => onStepClick(step.key)}
            >
              {isCompleted && !isActive && (
                <span className={styles.pipelineCheck}>✓</span>
              )}
              {step.label}
            </button>
            {i < PIPELINE_STEPS.length - 1 && (
              <div className={styles.pipelineConnector} />
            )}
          </div>
        );
      })}
    </div>
  );
}

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

function ContractorDetailPanel({
  contractor,
  onInvite,
  onShortlist,
  onReject,
  onSkip,
}: {
  contractor: Contractor;
  onInvite: () => void;
  onShortlist: () => void;
  onReject: () => void;
  onSkip: () => void;
}) {
  const isInvited = contractor.status === "invited";

  return (
    <div className={styles.detailPanel}>
      <div className={styles.detailTop}>
        <div className={styles.detailAvatar}>{contractor.initials}</div>
        <div className={styles.detailHeaderInfo}>
          <h3 className={styles.detailName}>{contractor.name}</h3>
          <p className={styles.detailRole}>{contractor.role}</p>
          <div className={styles.detailMatchBadge}>{contractor.matchScore}% match</div>
          <p className={styles.detailStatus}>Not applied yet</p>
        </div>
      </div>

      <div className={styles.detailFields}>
        <div className={styles.detailField}>
          <span className={styles.detailFieldLabel}>Experience</span>
          <span className={styles.detailFieldValue}>{contractor.experience}</span>
        </div>
        <div className={styles.detailField}>
          <span className={styles.detailFieldLabel}>Rate</span>
          <span className={styles.detailFieldValue}>{contractor.rate}</span>
        </div>
        <div className={styles.detailField}>
          <span className={styles.detailFieldLabel}>Location</span>
          <span className={styles.detailFieldValue}>{contractor.location}</span>
        </div>
        <div className={styles.detailField}>
          <span className={styles.detailFieldLabel}>Education</span>
          <span className={styles.detailFieldValue}>{contractor.education}</span>
        </div>
        <div className={styles.detailField}>
          <span className={styles.detailFieldLabel}>Skills</span>
          <div className={styles.skillsList}>
            {contractor.skills.map((skill) => (
              <span key={skill} className={styles.skillTag}>{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.detailActions}>
        <button
          className={styles.btnPrimary}
          onClick={onInvite}
          disabled={isInvited}
        >
          {isInvited ? "✓ Invited" : "Send Invitation"}
        </button>
        <div className={styles.btnSecondaryRow}>
          <button className={styles.btnSecondary} onClick={onShortlist}>
            Add to shortlist
          </button>
          <button className={styles.btnSecondary} onClick={onReject}>
            Reject
          </button>
          <button className={styles.btnSecondary} onClick={onSkip}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   VARIANT A — Separate pipeline step
   ============================================================ */

function VariantA() {
  const [activeStep, setActiveStep] = useState<PipelineStep>("pool");
  const [contractors, setContractors] = useState(POOL_CONTRACTORS);
  const [selectedId, setSelectedId] = useState(POOL_CONTRACTORS[0]?.id);
  const [inviteCount, setInviteCount] = useState(0);
  const [showRateLimit, setShowRateLimit] = useState(false);

  const selected = contractors.find((c) => c.id === selectedId) ?? contractors[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setContractors((prev) =>
      prev.map((c) => (c.id === id && c.status === "new" ? { ...c, status: "viewed" as const } : c))
    );
  };

  const handleInvite = () => {
    if (inviteCount >= 10) {
      setShowRateLimit(true);
      setTimeout(() => setShowRateLimit(false), 3000);
      return;
    }
    setContractors((prev) =>
      prev.map((c) => (c.id === selectedId ? { ...c, status: "invited" as const } : c))
    );
    setInviteCount((n) => n + 1);
  };

  const handleReject = () => {
    setContractors((prev) => prev.filter((c) => c.id !== selectedId));
    const remaining = contractors.filter((c) => c.id !== selectedId);
    if (remaining.length > 0) setSelectedId(remaining[0].id);
  };

  const handleSkip = () => {
    const idx = contractors.findIndex((c) => c.id === selectedId);
    const next = contractors[(idx + 1) % contractors.length];
    if (next) handleSelect(next.id);
  };

  return (
    <>
      <Pipeline
        activeStep={activeStep}
        onStepClick={setActiveStep}
        completedSteps={["request"]}
      />

      {activeStep === "pool" && (
        <div className={styles.poolSection}>
          <div className={styles.poolHeader}>
            <div className={styles.poolHeaderLeft}>
              <h2 className={styles.poolTitle}>
                Recommended contractors
                <span className={styles.poolCount}>{contractors.length}</span>
              </h2>
              <p className={styles.poolSubtitle}>
                Here's a shortlist of contractors suggested by AI Scout based on your request
              </p>
            </div>
          </div>

          {contractors.length > 0 && selected ? (
            <div className={styles.mainLayout}>
              <div className={styles.contractorList}>
                {contractors.map((c) => (
                  <div
                    key={c.id}
                    className={`${styles.contractorCard} ${c.id === selectedId ? styles.contractorCardSelected : ""}`}
                    onClick={() => handleSelect(c.id)}
                  >
                    <div className={styles.contractorAvatar}>{c.initials}</div>
                    <div className={styles.contractorInfo}>
                      <p className={styles.contractorName}>{c.name}</p>
                      <p className={styles.contractorRole}>{c.role}</p>
                    </div>
                    <div className={styles.contractorRight}>
                      <span className={styles.matchScore}>{c.matchScore}%</span>
                      <span className={`${styles.cardBadge} ${c.status === "new" ? styles.badgeNew : c.status === "viewed" ? styles.badgeViewed : styles.badgeInvited}`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <ContractorDetailPanel
                contractor={selected}
                onInvite={handleInvite}
                onShortlist={() => alert("Added to shortlist (stub)")}
                onReject={handleReject}
                onSkip={handleSkip}
              />
            </div>
          ) : (
            <div className={styles.emptyCandidates}>
              <p className={styles.emptyTitle}>No more contractors in Pool</p>
              <p className={styles.emptyText}>Try activating Ultra to get more candidates</p>
            </div>
          )}
        </div>
      )}

      {activeStep === "candidates" && (
        <div className={styles.poolSection}>
          <h2 className={styles.poolTitle}>Applications</h2>
          {MOCK_APPLICATIONS.length > 0 ? (
            <div className={styles.applicationsList}>
              {MOCK_APPLICATIONS.map((app) => (
                <div key={app.id} className={styles.applicationRow}>
                  <div className={styles.applicationAvatar}>{app.initials}</div>
                  <div className={styles.applicationInfo}>
                    <div className={styles.applicationName}>{app.name}</div>
                    <div className={styles.applicationRole}>{app.role}</div>
                  </div>
                  <div className={styles.applicationRight}>
                    {app.tag && (
                      <span className={`${styles.applicationTag} ${app.tag === "mellow_pool" ? styles.tagMellowPool : styles.tagUltra}`}>
                        {app.tag === "mellow_pool" ? "Mellow pool" : "Ultra"}
                      </span>
                    )}
                    <span className={styles.applicationMatch}>{app.matchScore}%</span>
                    <span className={styles.applicationDate}>{app.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyCandidates}>
              <div className={styles.emptyIcon}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="30" stroke="#cccccc" strokeWidth="2" fill="none" />
                  <line x1="40" y1="40" x2="40" y2="25" stroke="#cccccc" strokeWidth="2" strokeLinecap="round" />
                  <line x1="40" y1="40" x2="55" y2="40" stroke="#cccccc" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className={styles.emptyTitle}>No applications yet</p>
              <p className={styles.emptyText}>
                Invite contractors from Mellow Pool or wait for organic applications
              </p>
            </div>
          )}
        </div>
      )}

      {activeStep !== "pool" && activeStep !== "candidates" && (
        <div className={styles.poolSection}>
          <div className={styles.emptyCandidates}>
            <p className={styles.emptyTitle}>
              {activeStep === "request" && "Your request details"}
              {activeStep === "promote" && "Promote your request"}
              {activeStep === "ultra" && "Ultra — personal recruiter"}
            </p>
            <p className={styles.emptyText}>This section is outside the Mellow Pool prototype scope</p>
          </div>
        </div>
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
   VARIANT B — Inline block inside Candidates
   ============================================================ */

function VariantB() {
  const [activeStep, setActiveStep] = useState<PipelineStep>("candidates");
  const [contractors, setContractors] = useState(POOL_CONTRACTORS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inviteCount, setInviteCount] = useState(0);
  const [showRateLimit, setShowRateLimit] = useState(false);

  const selected = selectedId ? contractors.find((c) => c.id === selectedId) : null;

  const handleInlineSelect = (id: string) => {
    setSelectedId(id);
    setContractors((prev) =>
      prev.map((c) => (c.id === id && c.status === "new" ? { ...c, status: "viewed" as const } : c))
    );
  };

  const handleInvite = () => {
    if (!selectedId) return;
    if (inviteCount >= 10) {
      setShowRateLimit(true);
      setTimeout(() => setShowRateLimit(false), 3000);
      return;
    }
    setContractors((prev) =>
      prev.map((c) => (c.id === selectedId ? { ...c, status: "invited" as const } : c))
    );
    setInviteCount((n) => n + 1);
  };

  const handleReject = () => {
    if (!selectedId) return;
    setContractors((prev) => prev.filter((c) => c.id !== selectedId));
    setSelectedId(null);
  };

  const handleSkip = () => {
    setSelectedId(null);
  };

  return (
    <>
      <Pipeline
        activeStep={activeStep}
        onStepClick={setActiveStep}
        completedSteps={["request", "pool"]}
      />

      {activeStep === "candidates" && (
        <div className={styles.poolSection}>
          {/* Inline Pool block */}
          {contractors.length > 0 && (
            <div className={styles.inlinePoolBlock}>
              <div className={styles.inlinePoolHeader}>
                <div>
                  <h3 className={styles.inlinePoolTitle}>
                    <span className={styles.inlinePoolBadge}>Recommended</span>
                    Contractors from Mellow Pool
                  </h3>
                  <p className={styles.inlinePoolSubtitle}>
                    Suggested by AI Scout based on your request. Invite them to apply.
                  </p>
                </div>
                <span className={styles.poolCount}>{contractors.length}</span>
              </div>

              <div className={styles.inlinePoolCards}>
                {contractors.map((c) => (
                  <div
                    key={c.id}
                    className={`${styles.inlineCard} ${c.id === selectedId ? styles.inlineCardSelected : ""}`}
                    onClick={() => handleInlineSelect(c.id)}
                  >
                    <div className={styles.inlineCardTop}>
                      <div className={styles.inlineCardAvatar}>{c.initials}</div>
                      <div>
                        <p className={styles.inlineCardName}>{c.name}</p>
                        <p className={styles.inlineCardRole}>{c.role}</p>
                      </div>
                    </div>
                    <div className={styles.inlineCardBottom}>
                      <span className={styles.inlineCardMatch}>{c.matchScore}% match</span>
                      <span
                        className={`${styles.inlineCardBadge} ${
                          c.status === "viewed" ? styles.inlineCardBadgeViewed : c.status === "invited" ? styles.inlineCardBadgeInvited : ""
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detail panel when a Pool card is selected */}
          {selected && (
            <ContractorDetailPanel
              contractor={selected}
              onInvite={handleInvite}
              onShortlist={() => alert("Added to shortlist (stub)")}
              onReject={handleReject}
              onSkip={handleSkip}
            />
          )}

          {/* Divider */}
          <div className={styles.sectionDivider}>
            <div className={styles.sectionDividerLine} />
            <span className={styles.sectionDividerText}>Applications</span>
            <div className={styles.sectionDividerLine} />
          </div>

          {/* Applications */}
          {MOCK_APPLICATIONS.length > 0 ? (
            <div className={styles.applicationsList}>
              {MOCK_APPLICATIONS.map((app) => (
                <div key={app.id} className={styles.applicationRow}>
                  <div className={styles.applicationAvatar}>{app.initials}</div>
                  <div className={styles.applicationInfo}>
                    <div className={styles.applicationName}>{app.name}</div>
                    <div className={styles.applicationRole}>{app.role}</div>
                  </div>
                  <div className={styles.applicationRight}>
                    {app.tag && (
                      <span className={`${styles.applicationTag} ${app.tag === "mellow_pool" ? styles.tagMellowPool : styles.tagUltra}`}>
                        {app.tag === "mellow_pool" ? "Mellow pool" : "Ultra"}
                      </span>
                    )}
                    <span className={styles.applicationMatch}>{app.matchScore}%</span>
                    <span className={styles.applicationDate}>{app.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyCandidates}>
              <p className={styles.emptyTitle}>No applications yet</p>
              <p className={styles.emptyText}>
                Invite contractors from Mellow Pool above or wait for organic applications
              </p>
            </div>
          )}
        </div>
      )}

      {activeStep !== "candidates" && (
        <div className={styles.poolSection}>
          <div className={styles.emptyCandidates}>
            <p className={styles.emptyTitle}>
              {activeStep === "request" && "Your request details"}
              {activeStep === "pool" && "Mellow Pool"}
              {activeStep === "promote" && "Promote your request"}
              {activeStep === "ultra" && "Ultra — personal recruiter"}
            </p>
            <p className={styles.emptyText}>This section is outside the Mellow Pool prototype scope</p>
          </div>
        </div>
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
   VARIANT C — Tabs inside Candidates
   ============================================================ */

function VariantC() {
  const [activeStep, setActiveStep] = useState<PipelineStep>("candidates");
  const [activeTab, setActiveTab] = useState<"recommended" | "applications">("recommended");
  const [contractors, setContractors] = useState(POOL_CONTRACTORS);
  const [selectedId, setSelectedId] = useState(POOL_CONTRACTORS[0]?.id);
  const [inviteCount, setInviteCount] = useState(0);
  const [showRateLimit, setShowRateLimit] = useState(false);

  const selected = contractors.find((c) => c.id === selectedId) ?? contractors[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setContractors((prev) =>
      prev.map((c) => (c.id === id && c.status === "new" ? { ...c, status: "viewed" as const } : c))
    );
  };

  const handleInvite = () => {
    if (inviteCount >= 10) {
      setShowRateLimit(true);
      setTimeout(() => setShowRateLimit(false), 3000);
      return;
    }
    setContractors((prev) =>
      prev.map((c) => (c.id === selectedId ? { ...c, status: "invited" as const } : c))
    );
    setInviteCount((n) => n + 1);
  };

  const handleReject = () => {
    setContractors((prev) => prev.filter((c) => c.id !== selectedId));
    const remaining = contractors.filter((c) => c.id !== selectedId);
    if (remaining.length > 0) setSelectedId(remaining[0].id);
  };

  const handleSkip = () => {
    const idx = contractors.findIndex((c) => c.id === selectedId);
    const next = contractors[(idx + 1) % contractors.length];
    if (next) handleSelect(next.id);
  };

  return (
    <>
      <Pipeline
        activeStep={activeStep}
        onStepClick={setActiveStep}
        completedSteps={["request"]}
      />

      {activeStep === "candidates" && (
        <div className={styles.poolSection}>
          {/* Sub-tabs */}
          <div className={styles.candidatesTabs}>
            <button
              className={`${styles.candidatesTab} ${activeTab === "recommended" ? styles.candidatesTabActive : ""}`}
              onClick={() => setActiveTab("recommended")}
            >
              Recommended by Mellow
              <span className={styles.tabBadge}>{contractors.length}</span>
            </button>
            <button
              className={`${styles.candidatesTab} ${activeTab === "applications" ? styles.candidatesTabActive : ""}`}
              onClick={() => setActiveTab("applications")}
            >
              Applications
              <span className={styles.tabBadge}>{MOCK_APPLICATIONS.length}</span>
            </button>
          </div>

          {/* Tab: Recommended */}
          {activeTab === "recommended" && (
            <>
              <p className={styles.poolSubtitle} style={{ marginBottom: 20 }}>
                Here's a shortlist of contractors suggested by AI Scout based on your request
              </p>

              {contractors.length > 0 && selected ? (
                <div className={styles.mainLayout}>
                  <div className={styles.contractorList}>
                    {contractors.map((c) => (
                      <div
                        key={c.id}
                        className={`${styles.contractorCard} ${c.id === selectedId ? styles.contractorCardSelected : ""}`}
                        onClick={() => handleSelect(c.id)}
                      >
                        <div className={styles.contractorAvatar}>{c.initials}</div>
                        <div className={styles.contractorInfo}>
                          <p className={styles.contractorName}>{c.name}</p>
                          <p className={styles.contractorRole}>{c.role}</p>
                        </div>
                        <div className={styles.contractorRight}>
                          <span className={styles.matchScore}>{c.matchScore}%</span>
                          <span className={`${styles.cardBadge} ${c.status === "new" ? styles.badgeNew : c.status === "viewed" ? styles.badgeViewed : styles.badgeInvited}`}>
                            {c.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ContractorDetailPanel
                    contractor={selected}
                    onInvite={handleInvite}
                    onShortlist={() => alert("Added to shortlist (stub)")}
                    onReject={handleReject}
                    onSkip={handleSkip}
                  />
                </div>
              ) : (
                <div className={styles.emptyCandidates}>
                  <p className={styles.emptyTitle}>No more contractors in Pool</p>
                  <p className={styles.emptyText}>Check the Applications tab or activate Ultra</p>
                </div>
              )}
            </>
          )}

          {/* Tab: Applications */}
          {activeTab === "applications" && (
            <>
              {MOCK_APPLICATIONS.length > 0 ? (
                <div className={styles.applicationsList}>
                  {MOCK_APPLICATIONS.map((app) => (
                    <div key={app.id} className={styles.applicationRow}>
                      <div className={styles.applicationAvatar}>{app.initials}</div>
                      <div className={styles.applicationInfo}>
                        <div className={styles.applicationName}>{app.name}</div>
                        <div className={styles.applicationRole}>{app.role}</div>
                      </div>
                      <div className={styles.applicationRight}>
                        {app.tag && (
                          <span className={`${styles.applicationTag} ${app.tag === "mellow_pool" ? styles.tagMellowPool : styles.tagUltra}`}>
                            {app.tag === "mellow_pool" ? "Mellow pool" : "Ultra"}
                          </span>
                        )}
                        <span className={styles.applicationMatch}>{app.matchScore}%</span>
                        <span className={styles.applicationDate}>{app.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyCandidates}>
                  <div className={styles.emptyIcon}>
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <circle cx="40" cy="40" r="30" stroke="#cccccc" strokeWidth="2" fill="none" />
                      <line x1="40" y1="40" x2="40" y2="25" stroke="#cccccc" strokeWidth="2" strokeLinecap="round" />
                      <line x1="40" y1="40" x2="55" y2="40" stroke="#cccccc" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className={styles.emptyTitle}>No applications yet</p>
                  <p className={styles.emptyText}>
                    Invite contractors from the Recommended tab or wait for organic applications
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeStep !== "candidates" && (
        <div className={styles.poolSection}>
          <div className={styles.emptyCandidates}>
            <p className={styles.emptyTitle}>
              {activeStep === "request" && "Your request details"}
              {activeStep === "pool" && "Mellow Pool"}
              {activeStep === "promote" && "Promote your request"}
              {activeStep === "ultra" && "Ultra — personal recruiter"}
            </p>
            <p className={styles.emptyText}>This section is outside the Mellow Pool prototype scope</p>
          </div>
        </div>
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
   MAIN EXPORT
   ============================================================ */

export function MellowPoolScreen({ variant }: { variant: PoolVariant }) {
  return (
    <div className={styles.screen}>
      <Header />
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.requestHeader}>
            <h1 className={styles.requestTitle}>Senior React Developer</h1>
            <span className={styles.requestMeta}>Full-time · Remote · $50–80/hr · Posted 2 days ago</span>
          </div>

          {variant === "A" && <VariantA />}
          {variant === "B" && <VariantB />}
          {variant === "C" && <VariantC />}
        </div>
      </div>
    </div>
  );
}
