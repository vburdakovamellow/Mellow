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
  onSkip,
}: {
  contractor: Contractor;
  onInvite: () => void;
  onShortlist: () => void;
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
          <button className={styles.btnSecondary} onClick={onSkip}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Shared: Pool contractors list + detail panel
   ============================================================ */

function PoolContractorsView({
  contractors,
  selectedId,
  onSelect,
  onInvite,
  onShortlist,
  onSkip,
}: {
  contractors: Contractor[];
  selectedId: string;
  onSelect: (id: string) => void;
  onInvite: () => void;
  onShortlist: () => void;
  onSkip: () => void;
}) {
  const selected = contractors.find((c) => c.id === selectedId) ?? contractors[0];

  if (contractors.length === 0 || !selected) {
    return (
      <div className={styles.emptyCandidates}>
        <p className={styles.emptyTitle}>No more contractors in Pool</p>
        <p className={styles.emptyText}>Check the Candidates tab or activate Ultra</p>
      </div>
    );
  }

  return (
    <div className={styles.mainLayout}>
      <div className={styles.contractorList}>
        {contractors.map((c) => (
          <div
            key={c.id}
            className={`${styles.contractorCard} ${c.id === selectedId ? styles.contractorCardSelected : ""}`}
            onClick={() => onSelect(c.id)}
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
        onInvite={onInvite}
        onShortlist={onShortlist}
        onSkip={onSkip}
      />
    </div>
  );
}

/* ============================================================
   Shared: Ultra CTA Banner (B&W)
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
   Shared: Candidates empty state
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
   Hook: shared pool logic
   ============================================================ */

function usePoolLogic() {
  const [contractors, setContractors] = useState(POOL_CONTRACTORS);
  const [selectedId, setSelectedId] = useState(POOL_CONTRACTORS[0]?.id);
  const [inviteCount, setInviteCount] = useState(0);
  const [showRateLimit, setShowRateLimit] = useState(false);

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

  const handleSkip = () => {
    const idx = contractors.findIndex((c) => c.id === selectedId);
    const next = contractors[(idx + 1) % contractors.length];
    if (next) handleSelect(next.id);
  };

  return { contractors, selectedId, showRateLimit, handleSelect, handleInvite, handleSkip };
}

/* ============================================================
   VARIANT A — Pool as the main view
   ============================================================ */

function VariantA() {
  const { contractors, selectedId, showRateLimit, handleSelect, handleInvite, handleSkip } = usePoolLogic();

  return (
    <>
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

        <PoolContractorsView
          contractors={contractors}
          selectedId={selectedId}
          onSelect={handleSelect}
          onInvite={handleInvite}
          onShortlist={() => alert("Added to shortlist (stub)")}
          onSkip={handleSkip}
        />
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
   VARIANT B — Inline block inside Candidates
   ============================================================ */

function VariantB() {
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

  return (
    <>
      <div className={styles.poolSection}>
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

        {selected && (
          <ContractorDetailPanel
            contractor={selected}
            onInvite={handleInvite}
            onShortlist={() => alert("Added to shortlist (stub)")}
            onSkip={() => setSelectedId(null)}
          />
        )}

        <div className={styles.sectionDivider}>
          <div className={styles.sectionDividerLine} />
          <span className={styles.sectionDividerText}>Applications</span>
          <div className={styles.sectionDividerLine} />
        </div>

        <CandidatesEmptyState />
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
   VARIANT C — Tabs: Candidates (default) + Recommended by Mellow
   Сценарий: пользователь только создал реквест.
   ============================================================ */

function VariantC() {
  const [activeTab, setActiveTab] = useState<"candidates" | "recommended">("candidates");
  const [showUltra, setShowUltra] = useState(true);
  const { contractors, selectedId, showRateLimit, handleSelect, handleInvite, handleSkip } = usePoolLogic();

  return (
    <>
      <div className={styles.poolSection}>
        {/* Top-level tabs */}
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

        {/* ===== Tab: Candidates ===== */}
        {activeTab === "candidates" && (
          <div className={styles.candidatesTabContent}>
            {/* Sort / Stats row */}
            <div className={styles.filterRow}>
              <button className={styles.sortButton}>
                Best match first
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className={styles.statsText}>0 viewed · 0 applied</span>
            </div>

            {/* Ultra CTA Banner */}
            {showUltra && (
              <UltraBanner onDismiss={() => setShowUltra(false)} />
            )}

            {/* Empty state */}
            <CandidatesEmptyState />
          </div>
        )}

        {/* ===== Tab: Recommended by Mellow ===== */}
        {activeTab === "recommended" && (
          <div className={styles.recommendedTabContent}>
            <p className={styles.poolSubtitle}>
              Here's a shortlist of contractors suggested by AI Scout based on your request
            </p>

            <PoolContractorsView
              contractors={contractors}
              selectedId={selectedId}
              onSelect={handleSelect}
              onInvite={handleInvite}
              onShortlist={() => alert("Added to shortlist (stub)")}
              onSkip={handleSkip}
            />
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

export function MellowPoolScreen({ variant }: { variant: PoolVariant }) {
  return (
    <div className={styles.screen}>
      <Header />
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.requestHeader}>
            <h1 className={styles.requestTitle}>Senior React Developer</h1>
          </div>

          {variant === "A" && <VariantA />}
          {variant === "B" && <VariantB />}
          {variant === "C" && <VariantC />}
        </div>
      </div>
    </div>
  );
}
