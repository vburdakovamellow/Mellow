/**
 * Scout Sales Demo — colored clickable prototype for screen-share sales demos.
 *
 * Linear happy path (sales-critical minimum):
 *   landing → generate-filled → loader → edit-request →
 *   scout-match (AI Scout Match — suggested contractors) →
 *   ultra-ready (Applied) → application-modal → shortlisted
 *
 * Demo mode: everything pre-filled, every primary CTA advances to the next step.
 * Step-nav (top dark bar) lets you jump anywhere for free clicks during a call.
 */

import React, { useMemo, useState } from "react";
import styles from "./ScoutSalesDemo.module.css";
import {
  CANDIDATES,
  COMMUNITIES,
  FEATURED_CANDIDATE,
  MANAGER,
  ONE_ON_ONE_MESSAGE,
  REQUEST,
  SCOUT_MATCH_CANDIDATES,
  STEP_LABELS,
  type DemoStep,
} from "./data";

/* --------------------------------------------------------------------------
   Visible step list. We intentionally narrow the full DEMO_STEPS to the
   sales-critical happy path:
     landing → generate-filled → loader → edit-request →
     scout-match → candidates-empty → ultra-ready → application-modal →
     shortlisted
   Sign-up + public-request are skipped (sales prospects don't need them) —
   after Save we jump straight to the AI Scout Match candidates view.
   -------------------------------------------------------------------------- */
const VISIBLE_STEPS: DemoStep[] = [
  "landing",
  "generate-filled",
  "loader",
  "edit-request",
  "scout-match",
  "candidates-empty",
  "ultra-ready",
  "application-modal",
  "shortlisted",
];

/** Bucket pill states inside the Candidates tab */
type BucketKey = "scout" | "applied" | "shortlisted";

/* --------------------------------------------------------------------------
   Inline icon set (no external icon dep, keep prototype self-contained).
   -------------------------------------------------------------------------- */
type IconProps = { size?: number; color?: string; className?: string };
const Icon = {
  Plus: ({ size = 16, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  ),
  Sparkles: ({ size = 16, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3zM18 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM5 15l.7 1.4 1.3.6-1.3.6L5 19l-.7-1.4L3 17l1.3-.6.7-1.4z"
        fill={color}
      />
    </svg>
  ),
  Check: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12.5l4 4L19 7"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Chevron: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  ),
  ChevronRight: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  ),
  X: ({ size = 16, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  ),
  Eye: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
        stroke={color}
        strokeWidth={1.6}
      />
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.6} />
    </svg>
  ),
  Users: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3.4" stroke={color} strokeWidth={1.6} />
      <path d="M2.5 19c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" stroke={color} strokeWidth={1.6} />
      <circle cx="17" cy="9" r="2.6" stroke={color} strokeWidth={1.4} />
      <path d="M15 14.5c2.6 0 5 1.6 5 4" stroke={color} strokeWidth={1.4} />
    </svg>
  ),
  Bookmark: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 4h12v17l-6-4-6 4V4z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  ),
  Mail: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth={1.6} />
      <path d="M3 7l9 6 9-6" stroke={color} strokeWidth={1.6} />
    </svg>
  ),
  Slash: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.6} />
      <path d="M5.6 5.6l12.8 12.8" stroke={color} strokeWidth={1.6} />
    </svg>
  ),
  Compass: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.6} />
      <path d="M15 9l-1.5 4.5L9 15l1.5-4.5L15 9z" fill={color} />
    </svg>
  ),
  Clock: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.6} />
      <path d="M12 7v5l3 2" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  ),
  Archive: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="4" rx="1" stroke={color} strokeWidth={1.6} />
      <path d="M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" stroke={color} strokeWidth={1.6} />
      <path d="M10 12h4" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  ),
  Search: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke={color} strokeWidth={1.6} />
      <path d="M16 16l4 4" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  ),
  Bolt: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M13 2L4 14h7l-2 8 9-12h-7l2-8z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  Chat: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 5h14v10H8l-3 3V5z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  ),
  Share: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 13l5-5m0 0l5 5m-5-5v12" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M5 4h14" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  ),
  Globe: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.6} />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke={color} strokeWidth={1.6} />
      <path d="M3 12h18" stroke={color} strokeWidth={1.6} />
    </svg>
  ),
  Pin: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z"
        stroke={color}
        strokeWidth={1.6}
      />
      <circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth={1.6} />
    </svg>
  ),
  Doc: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" stroke={color} strokeWidth={1.6} />
      <path d="M14 3v5h5" stroke={color} strokeWidth={1.6} />
    </svg>
  ),
  Link: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M10 14a4 4 0 005.66 0l3-3a4 4 0 10-5.66-5.66L11 7"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <path
        d="M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 105.66 5.66L13 17"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  ),
  Copy: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="8" y="8" width="12" height="12" rx="2" stroke={color} strokeWidth={1.6} />
      <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke={color} strokeWidth={1.6} />
    </svg>
  ),
  Heart: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s-7-4.5-7-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0119 11c0 5.5-7 10-7 10z"
        stroke={color}
        strokeWidth={1.6}
      />
    </svg>
  ),
  Reject: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.6} />
      <path d="M8 8l8 8M16 8l-8 8" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  ),
  Grid: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke={color} strokeWidth={1.6} />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke={color} strokeWidth={1.6} />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke={color} strokeWidth={1.6} />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke={color} strokeWidth={1.6} />
    </svg>
  ),
  House: ({ size = 14, color = "currentColor" }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z" stroke={color} strokeWidth={1.6} />
    </svg>
  ),
};

/* --------------------------------------------------------------------------
   Mellow word-logo — italic display serif rendered as inline SVG so it
   matches the brand mark from the mockups even when the licensed
   "PP Neue World" font isn't loaded. Falls back gracefully through
   Fraunces → Cormorant Garamond → Georgia.
   -------------------------------------------------------------------------- */
const MellowLogo: React.FC<{ height?: number; color?: string }> = ({
  height = 28,
  color = "currentColor",
}) => {
  const w = (height * 142) / 36;
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 142 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="mellow"
      style={{ display: "block", overflow: "visible" }}
    >
      <text
        x="0"
        y="29"
        fontFamily="'PP Neue World', 'Fraunces', 'Cormorant Garamond', 'Cormorant', Georgia, serif"
        fontSize="34"
        fontStyle="italic"
        fontWeight="500"
        letterSpacing="-0.02em"
        fill={color}
      >
        mellow
      </text>
      {/* Subtle accent stroke above the W — tiny brand flourish */}
      <path
        d="M122 4.6 L132 4.6"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
};

/* Compact "W" mark used in the side-rail */
const MellowMark: React.FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="mellow"
    style={{ display: "block" }}
  >
    {/* tiny accent stroke above the W */}
    <path
      d="M22 4.5 L29 4.5"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <text
      x="2"
      y="27"
      fontFamily="'PP Neue World', 'Fraunces', 'Cormorant Garamond', Georgia, serif"
      fontSize="28"
      fontStyle="italic"
      fontWeight="500"
      fill={color}
    >
      W
    </text>
  </svg>
);

/* --------------------------------------------------------------------------
   Donut illustration — used in loader and "no candidates yet" empty state.
   Hand-rolled SVG so it never breaks on offline demos.
   -------------------------------------------------------------------------- */
const DonutIllustration: React.FC<{ size?: number }> = ({ size = 92 }) => (
  <svg viewBox="0 0 120 90" width={size} height={(size * 90) / 120} aria-hidden>
    <ellipse cx="60" cy="58" rx="44" ry="14" fill="#FBE3CC" />
    <ellipse cx="60" cy="50" rx="44" ry="14" fill="none" stroke="#1A1716" strokeWidth="2.2" />
    <ellipse cx="60" cy="50" rx="44" ry="14" fill="#FFB988" />
    <ellipse cx="60" cy="50" rx="20" ry="6" fill="#FBE3CC" stroke="#1A1716" strokeWidth="2" />
    <ellipse cx="60" cy="46" rx="44" ry="14" fill="none" stroke="#1A1716" strokeWidth="2" />
    <path d="M16 46c0-7.7 19.7-14 44-14s44 6.3 44 14" fill="none" stroke="#fff" strokeWidth="3" />
  </svg>
);

/* --------------------------------------------------------------------------
   Pretty avatar with initials. Color comes from data.
   -------------------------------------------------------------------------- */
const Avatar: React.FC<{ initials: string; color?: string; size?: number }> = ({
  initials,
  color = "#F4823C",
  size = 44,
}) => (
  <div
    className={styles.candidateAvatar}
    style={{
      width: size,
      height: size,
      background: color,
      fontSize: Math.round(size * 0.32),
    }}
  >
    {initials}
  </div>
);

/* --------------------------------------------------------------------------
   Match pill — color depends on score band.
   -------------------------------------------------------------------------- */
const MatchPill: React.FC<{ score: number }> = ({ score }) => {
  const cls =
    score >= 85
      ? styles.matchPillHigh
      : score >= 60
        ? styles.matchPillMed
        : styles.matchPillLow;
  return (
    <span className={`${styles.matchPill} ${cls}`}>
      <Icon.Bolt size={12} /> {score}%
    </span>
  );
};

/* ==========================================================================
   ROOT COMPONENT
   ========================================================================== */
export default function ScoutSalesDemo() {
  const [step, setStep] = useState<DemoStep>("landing");
  const [activeTab, setActiveTab] = useState<"candidates" | "promotion">(
    "candidates"
  );
  const [promoOption, setPromoOption] = useState<
    "oneOnOne" | "network" | "communities" | "boost"
  >("oneOnOne");
  /** Which bucket pill is selected on the Candidates tab. Defaults to
   *  AI Scout Match so the very first candidates view (right after
   *  "Save and continue") shows the suggested contractors list. */
  const [bucket, setBucket] = useState<BucketKey>("scout");

  const visibleIdx = VISIBLE_STEPS.indexOf(step);

  const goNext = () => {
    if (visibleIdx === -1) return;
    const next = VISIBLE_STEPS[Math.min(visibleIdx + 1, VISIBLE_STEPS.length - 1)];
    setStep(next);
    setBucket(bucketForStep(next));
  };
  const goPrev = () => {
    if (visibleIdx === -1) return;
    const prev = VISIBLE_STEPS[Math.max(visibleIdx - 1, 0)];
    setStep(prev);
    setBucket(bucketForStep(prev));
  };

  /* When entering ultra-ready, ensure Candidates tab is selected by default */
  const ensureCandidatesTab = () => setActiveTab("candidates");

  /* Sync bucket pill with the current step when jumping around the demo.
     scout-match → "scout"; candidates-empty/ultra-ready/application-modal/
     invitation-modal/shortlisted → "applied". Useful when the salesperson
     uses the dot navigation to skip ahead/back. */
  const bucketForStep = (s: DemoStep): BucketKey => {
    if (s === "scout-match") return "scout";
    if (s === "shortlisted") return "shortlisted";
    if (
      s === "candidates-empty" ||
      s === "ultra-ready" ||
      s === "application-modal" ||
      s === "invitation-modal"
    )
      return "applied";
    return bucket;
  };

  /* ---- Render the active surface (under modals) ---- */
  const renderSurface = () => {
    if (step === "landing") {
      return (
        <Landing
          onCreate={() => {
            setStep("signup");
          }}
        />
      );
    }
    if (step === "signup") {
      return (
        <Signup
          onSubmit={() => {
            setStep("generate-filled");
            ensureCandidatesTab();
          }}
        />
      );
    }
    if (step === "generate-filled" || step === "loader") {
      return (
        <AppShell currentSection="dashboard">
          <GeneratePage
            filled
            onGenerate={() => setStep("loader")}
          />
        </AppShell>
      );
    }
    if (step === "edit-request") {
      return (
        <AppShell currentSection="requests">
          <EditRequest
            onSave={() => {
              setStep("scout-match");
              setBucket("scout");
            }}
          />
        </AppShell>
      );
    }
    if (step === "public-request") {
      return <PublicRequest onApply={() => setStep("ultra-ready")} />;
    }
    /* The candidates surface is reused under scout-match, candidates-empty,
       ultra-ready, application-modal & invitation-modal — only the active
       bucket changes between them. */
    if (
      step === "scout-match" ||
      step === "candidates-empty" ||
      step === "ultra-ready" ||
      step === "application-modal" ||
      step === "invitation-modal" ||
      step === "shortlisted"
    ) {
      return (
        <AppShell currentSection="requests">
          <RequestCandidates
            activeTab={activeTab}
            onTabChange={setActiveTab}
            promoOption={promoOption}
            onPromoOption={setPromoOption}
            bucket={bucket}
            onBucketChange={setBucket}
            onOpenApplication={() => setStep("application-modal")}
            onInvite={() => {
              setBucket("applied");
              setStep("ultra-ready");
            }}
          />
        </AppShell>
      );
    }
    return null;
  };

  return (
    <div className={styles.root}>
      <StepNav
        currentStep={step}
        currentIdx={visibleIdx}
        onPrev={goPrev}
        onNext={goNext}
        onJump={(s) => {
          setStep(s);
          ensureCandidatesTab();
          setBucket(bucketForStep(s));
        }}
      />
      <div className={styles.stage}>
        <div className={styles.stageInner}>{renderSurface()}</div>
      </div>

      {/* --- Modal layers --- */}
      {step === "loader" && (
        <LoaderModal
          onClose={() => setStep("generate-filled")}
          onDone={() => setStep("edit-request")}
        />
      )}
      {step === "application-modal" && (
        <ApplicationModal
          onClose={() => setStep("ultra-ready")}
          onShortlist={() => setStep("invitation-modal")}
        />
      )}
      {step === "invitation-modal" && (
        <InvitationModal onClose={() => setStep("ultra-ready")} />
      )}
    </div>
  );
}

/* ==========================================================================
   STEP NAV (sticky top bar)
   ========================================================================== */
type StepNavProps = {
  currentStep: DemoStep;
  currentIdx: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (s: DemoStep) => void;
};
const StepNav: React.FC<StepNavProps> = ({
  currentStep,
  currentIdx,
  onPrev,
  onNext,
  onJump,
}) => {
  return (
    <div className={styles.stepNav}>
      <span className={styles.stepNavTitle}>
        <Icon.Sparkles size={12} color="#FFB47A" />
        Scout · Sales Demo
      </span>
      <div className={styles.stepNavPills}>
        {VISIBLE_STEPS.map((s, i) => {
          const cls = [
            styles.stepDot,
            i === currentIdx ? styles.stepDotActive : "",
            i < currentIdx ? styles.stepDotPast : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <span
              key={s}
              className={cls}
              title={STEP_LABELS[s]}
              role="button"
              tabIndex={0}
              onClick={() => onJump(s)}
            />
          );
        })}
      </div>
      <span className={styles.stepNavCurrent}>
        {STEP_LABELS[currentStep]}{" "}
        <span className={styles.smallMute} style={{ color: "rgba(255,255,255,.55)", marginLeft: 8 }}>
          {currentIdx + 1}/{VISIBLE_STEPS.length}
        </span>
      </span>
      <button className={styles.stepBtn} onClick={onPrev} disabled={currentIdx <= 0}>
        ← Prev
      </button>
      <button className={styles.stepBtn} onClick={onNext} disabled={currentIdx >= VISIBLE_STEPS.length - 1}>
        Next →
      </button>
    </div>
  );
};

/* ==========================================================================
   APP SHELL (left rail + main column) — used by every authed screen
   ========================================================================== */
type AppShellProps = {
  currentSection: "dashboard" | "requests" | "candidates";
  children: React.ReactNode;
};
const AppShell: React.FC<AppShellProps> = ({ currentSection, children }) => {
  return (
    <div className={styles.appShell}>
      <aside className={styles.sideRail}>
        <div className={styles.sideLogo}>
          <MellowMark size={28} color="#1A1716" />
        </div>
        <div
          className={`${styles.sideIcon} ${currentSection === "dashboard" ? styles.sideIconActive : ""}`}
          title="Dashboard"
        >
          <Icon.Grid />
        </div>
        <div
          className={`${styles.sideIcon} ${currentSection === "requests" ? styles.sideIconActive : ""}`}
          title="Requests"
        >
          <Icon.Users />
        </div>
        <div
          className={`${styles.sideIcon} ${currentSection === "candidates" ? styles.sideIconActive : ""}`}
          title="Candidates"
        >
          <Icon.House />
        </div>
      </aside>
      <main className={styles.appMain}>
        <div className={styles.topBar}>
          <span className={styles.topBarLeft}>
            {currentSection === "dashboard"
              ? "Dashboard · Empty"
              : "Requests · Active"}
          </span>
          <button className={styles.pillCta}>
            <Icon.Plus size={14} /> Generate request
          </button>
          <button className={styles.scoutPill}>
            <Icon.Sparkles size={14} color="#E25B15" /> AI Scout <Icon.Chevron size={12} />
          </button>
          <div className={styles.avatarChip}>{MANAGER.initials}</div>
        </div>
        {children}
      </main>
    </div>
  );
};

/* ==========================================================================
   1. PUBLIC LANDING — mellow.io/aiscout
   ========================================================================== */
const Landing: React.FC<{ onCreate: () => void }> = ({ onCreate }) => {
  return (
    <div className={styles.landing}>
      <div className={styles.landingInner}>
        <nav className={styles.landingNav}>
          <span className={styles.landingLogo}>
            <MellowLogo height={32} color="#1A1716" />
          </span>
          <div className={styles.landingNavRight}>
            <span className={styles.landingNavLink}>How it works</span>
            <span className={styles.landingNavLink}>For contractors</span>
            <span className={styles.landingNavLink}>Sign in</span>
          </div>
        </nav>

        <section className={styles.landingHero}>
          <div>
            <h1 className={styles.landingTitle}>
              Reach the Right Contractor
            </h1>
            <p className={styles.landingSub}>
              Scout isn&apos;t a marketplace — it&apos;s a workflow automation
              tool that helps you find the right contractor and build your own
              private contractor pool.
            </p>
            <button className={styles.landingCta} onClick={onCreate}>
              <Icon.Plus size={16} /> Create a Request
            </button>
            <div className={styles.landingFeaturePills}>
              <div className={styles.featurePill}>
                <Icon.Users size={14} color="#E25B15" />
                <div>
                  <strong style={{ display: "block", fontSize: 13 }}>
                    Organise your private pool (early access)
                  </strong>
                </div>
              </div>
              <div className={styles.featurePill}>
                <Icon.Globe size={14} color="#E25B15" />
                <div>
                  <strong style={{ display: "block", fontSize: 13 }}>
                    Private by default
                  </strong>
                  <span style={{ color: "var(--sd-mute)", fontSize: 11 }}>
                    Your network stays yours
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.landingPhone}>
            <div className={styles.phoneOrbit}>
              <div className={styles.orbitDot} style={{ top: 18, left: 8 }}>
                AC
              </div>
              <div className={styles.orbitDot} style={{ top: 6, right: 30 }}>
                SA
              </div>
              <div className={styles.orbitDot} style={{ bottom: 30, left: 0 }}>
                JS
              </div>
              <div className={styles.orbitDot} style={{ bottom: 12, right: 12 }}>
                HR
              </div>
            </div>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneCard}>
                <strong>UI Designer for SaaS Redesign</strong>
                <small>Russel Inc · Canada · GMT+4</small>
              </div>
              <div className={styles.phoneCard}>
                <strong>1 word-of-mouth pool freelancers</strong>
                <small>Apply now</small>
              </div>
              <div className={styles.phoneCard}>
                <strong>Apply now</strong>
                <small>$20–30/hr · Ongoing</small>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.landingFooter}>
          <h2>Four Circles. One Contractor Request.</h2>
          <p>
            Scout uses one Service Request flow across all four circles, so you
            start with your network, expand to communities you trust, and tap
            the wider Mellow pool only when you need to.
          </p>
          <div className={styles.landingCircles}>
            <div className={styles.landingCircle}>
              <div className={styles.circleIcon}>
                <Icon.Users color="#E25B15" />
              </div>
              <h4>Your private pool</h4>
              <p>The people you&apos;ve already worked with — invite them first.</p>
            </div>
            <div className={styles.landingCircle}>
              <div className={styles.circleIcon}>
                <Icon.Share color="#E25B15" />
              </div>
              <h4>Word of mouth</h4>
              <p>Auto-drafted posts for your network on LinkedIn or by DM.</p>
            </div>
            <div className={styles.landingCircle}>
              <div className={styles.circleIcon}>
                <Icon.Compass color="#E25B15" />
              </div>
              <h4>Niche communities</h4>
              <p>AI-matched Discords, Telegrams and forums where the right people hang out.</p>
            </div>
            <div className={styles.landingCircle}>
              <div className={styles.circleIcon}>
                <Icon.Globe color="#E25B15" />
              </div>
              <h4>Mellow open pool</h4>
              <p>The wider Mellow contractor pool, scored against your request.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

/* ==========================================================================
   2. SIGN UP
   ========================================================================== */
const Signup: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  return (
    <div className={styles.signupWrap}>
      <div className={styles.signupCard}>
        <h2>Create your Scout account</h2>
        <p>Free forever. No credit card. Cancel any time.</p>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>Full name</label>
          <input className={styles.input} defaultValue="Jennifer Mendez" />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Work email</label>
          <input className={styles.input} defaultValue={MANAGER.email} />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Company</label>
          <input className={styles.input} defaultValue={MANAGER.company} />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Password</label>
          <input className={styles.input} type="password" defaultValue="••••••••" />
        </div>

        <button
          className={`${styles.primaryBtn} ${styles.primaryBtnAlt}`}
          onClick={onSubmit}
        >
          Sign up <Icon.ChevronRight size={14} />
        </button>
        <div className={styles.signupHint}>
          By signing up you agree to Mellow&apos;s Terms &amp; Privacy.
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   3. GENERATE PAGE (filled state — pre-filled prompt)
   ========================================================================== */
const GeneratePage: React.FC<{ filled?: boolean; onGenerate: () => void }> = ({
  filled,
  onGenerate,
}) => {
  const required = ["Role or position", "Work experience", "Scope of work"];
  const recommended = [
    "Time commitment",
    "Budget / Hourly rate",
    "Key skills",
    "Languages",
    "Location",
    "Industry",
  ];
  return (
    <>
      <h1 className={styles.h1Serif}>
        Welcome, {MANAGER.firstName}!
      </h1>

      <div className={styles.generateRow}>
        <div className={styles.howCard}>
          <h3 className={styles.h3Serif}>How to Get Started</h3>
          <p className={styles.muted} style={{ marginTop: -6, marginBottom: 12 }}>
            From first request to your first contractor
          </p>
          <div className={styles.howStep}>
            <div className={styles.num}>1</div>
            <div>
              <h5>Generate first request</h5>
              <p>Fill in the form and let AI structure it for you.</p>
            </div>
          </div>
          <div className={styles.howStep}>
            <div className={styles.num}>2</div>
            <div>
              <h5>AI drafts your brief</h5>
              <p>Review the draft and publish when ready.</p>
            </div>
          </div>
          <div className={styles.howStep}>
            <div className={styles.num}>3</div>
            <div>
              <h5>Invite top matches</h5>
              <p>AI surfaces the best fits — reach out directly.</p>
            </div>
          </div>
          <div className={styles.howStep}>
            <div className={styles.num}>4</div>
            <div>
              <h5>Promote your request</h5>
              <p>Spread it to attract inbound applications.</p>
            </div>
          </div>
          <div className={styles.howStep}>
            <div className={styles.num}>5</div>
            <div>
              <h5>Review &amp; shortlist</h5>
              <p>Go through applicants and advance top picks.</p>
            </div>
          </div>
        </div>

        <div className={styles.promptCard}>
          <h3 className={styles.h3Serif}>Who are you Looking For?</h3>
          <p className={styles.muted} style={{ marginTop: -6, marginBottom: 14 }}>
            Describe the contractor you need in your own words
          </p>
          <textarea
            className={styles.textarea}
            defaultValue={filled ? REQUEST.prompt : ""}
            placeholder="Graphic designer for social media content — mid-level or above, based in the EU, up to $30/hr. Around 20 hours per week."
          />
          <div>
            <div className={styles.tagGroupLabel}>REQUIRED</div>
            <div className={styles.tagRow}>
              {required.map((t) => (
                <span key={t} className={styles.tagRequired}>
                  {filled && <Icon.Check size={11} color="#E25B15" />} {t}
                </span>
              ))}
            </div>
            <div className={styles.tagGroupLabel}>RECOMMENDED</div>
            <div className={styles.tagRow}>
              {recommended.map((t) => (
                <span key={t} className={styles.tagSuggested}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <button className={styles.bigBtn} onClick={onGenerate}>
            <Icon.Sparkles size={14} color="#fff" /> Generate request
          </button>
        </div>
      </div>
    </>
  );
};

/* ==========================================================================
   4. LOADER MODAL
   ========================================================================== */
const LoaderModal: React.FC<{ onClose: () => void; onDone: () => void }> = ({
  onClose,
  onDone,
}) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3>New Request</h3>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close"
          >
            <Icon.X />
          </button>
        </div>
        <div className={styles.modalBody}>
          <DonutIllustration size={120} />
          <h2>Generating Your Request…</h2>
          <p>
            Almost ready —<br />
            keep this page open
          </p>
          <button
            className={`${styles.primaryBtn} ${styles.primaryBtnAlt}`}
            style={{ width: "auto", padding: "10px 22px", marginTop: 24 }}
            onClick={onDone}
          >
            Continue (demo skip) <Icon.ChevronRight size={12} />
          </button>
          <div className={styles.smallMute} style={{ marginTop: 12 }}>
            (in production this auto-advances after ~12s)
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. EDIT REQUEST (left = generated copy, right = public preview)
   ========================================================================== */
const EditRequest: React.FC<{ onSave: () => void }> = ({ onSave }) => {
  return (
    <>
      <div className={styles.requestHead}>
        <button className={styles.backLink}>← Back</button>
      </div>
      <div className={styles.editTitleRow}>
        <span className={styles.editPill}>Draft</span>
        <h1 className={styles.editH1}>{REQUEST.title}</h1>
        <button className={styles.saveBtn} onClick={onSave}>
          <Icon.Check size={12} color="#fff" /> Save and continue
        </button>
      </div>

      <div className={styles.editRow}>
        <div className={styles.editLeft}>
          <div className={styles.editSection}>
            <div className={styles.editSectionLabel}>Profile</div>
            <p>
              Graphic Designer for Social Media Optimisation, Mid-level Speaker,
              Brand Designer, English, Spanish.
            </p>
          </div>

          <div className={styles.editSection}>
            <div className={styles.editSectionLabel}>Skills and Tech</div>
            <div className={styles.tagsLine}>
              {REQUEST.skills.map((s) => (
                <span className={styles.tagPill} key={s}>{s}</span>
              ))}
            </div>
          </div>

          <div className={styles.editSection}>
            <div className={styles.editSectionLabel}>Overview</div>
            <p>{REQUEST.description}</p>
          </div>

          <div className={styles.editSection}>
            <div className={styles.editSectionLabel}>Timeline · Budget</div>
            <p>
              <strong>Hours per week:</strong> {REQUEST.workload} ·{" "}
              <strong>Project type:</strong> {REQUEST.projectType} ·{" "}
              <strong>Rate:</strong> {REQUEST.rate}
            </p>
          </div>

          <div className={styles.editSection}>
            <div className={styles.editSectionLabel}>Key Responsibilities</div>
            <ul className={styles.editList}>
              {REQUEST.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          <div className={styles.editSection}>
            <div className={styles.editSectionLabel}>Requirements</div>
            <ul className={styles.editList}>
              {REQUEST.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          <div className={styles.editSection}>
            <div className={styles.editSectionLabel}>Languages</div>
            <div className={styles.tagsLine}>
              {REQUEST.languages.map((l) => (
                <span className={styles.tagPill} key={l}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.previewCard}>
          <div className={styles.publicLogo} style={{ marginBottom: 4 }}>
            <MellowLogo height={22} color="#1A1716" />
          </div>
          <h4 className={styles.tinyLabel} style={{ color: "var(--sd-mute)" }}>
            PUBLIC PREVIEW
          </h4>
          <h2>{REQUEST.title}</h2>
          <div className={styles.tagsLine}>
            {REQUEST.skills.slice(0, 4).map((s) => (
              <span className={styles.tagPill} key={s}>{s}</span>
            ))}
          </div>
          <div className={styles.previewBody}>
            {REQUEST.description.slice(0, 110)}…
          </div>
          <div className={styles.previewMeta}>
            <div>
              <span>Hourly rate</span>
              <strong>{REQUEST.rate}</strong>
            </div>
            <div>
              <span>Workload</span>
              <strong>{REQUEST.workload}</strong>
            </div>
            <div>
              <span>Project type</span>
              <strong>{REQUEST.projectType}</strong>
            </div>
            <div>
              <span>Experience</span>
              <strong>{REQUEST.experience}</strong>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

/* ==========================================================================
   6. PUBLIC REQUEST PAGE (what contractors see)
   ========================================================================== */
const PublicRequest: React.FC<{ onApply: () => void }> = ({ onApply }) => {
  return (
    <div className={styles.publicWrap}>
      <div className={styles.publicCard}>
        <header className={styles.publicHeader}>
          <span className={styles.publicLogo}>
            <MellowLogo height={26} color="#1A1716" />
          </span>
          <span className={styles.demoNote}>Public landing</span>
          <div className={styles.publicMeta}>
            <span>
              <Icon.Clock size={12} /> Expires in {REQUEST.expiresInHours}h
            </span>
            <span>
              <Icon.Eye size={12} /> {REQUEST.views} views
            </span>
            <span>
              <Icon.Users size={12} /> {REQUEST.applied} applied
            </span>
          </div>
        </header>

        <h1 className={styles.publicTitle}>{REQUEST.title}</h1>

        <div className={styles.publicSubMeta}>
          <div>
            Company<span>{MANAGER.company}</span>
          </div>
          <div>
            Location<span>{REQUEST.location}</span>
          </div>
          <div>
            Time zone<span>{REQUEST.timezone}</span>
          </div>
          <div>
            Experience<span>{REQUEST.experience}</span>
          </div>
        </div>

        <div className={styles.publicBody}>
          <div>
            <h4>About the project</h4>
            <p>{REQUEST.description}</p>

            <h4>Key responsibilities</h4>
            <ul>
              {REQUEST.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            <h4>Requirements</h4>
            <ul>
              {REQUEST.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            <h4>Languages</h4>
            <div className={styles.tagsLine}>
              {REQUEST.languages.map((l) => (
                <span className={styles.tagPill} key={l}>{l}</span>
              ))}
            </div>
          </div>

          <aside className={styles.publicSidebar}>
            <div className={styles.tinyLabel} style={{ marginBottom: 8 }}>
              Hourly rate
            </div>
            <div style={{ fontSize: 26, fontWeight: 600 }}>{REQUEST.rate}</div>

            <div className={styles.tinyLabel} style={{ marginTop: 14 }}>
              Workload
            </div>
            <div style={{ fontSize: 14 }}>{REQUEST.workload}</div>

            <div className={styles.tinyLabel} style={{ marginTop: 14 }}>
              Project type
            </div>
            <div style={{ fontSize: 14 }}>{REQUEST.projectType}</div>

            <div className={styles.tinyLabel} style={{ marginTop: 14 }}>
              Skills
            </div>
            <div className={styles.tagsLine} style={{ marginTop: 6 }}>
              {REQUEST.skills.map((s) => (
                <span className={styles.tagPill} key={s}>{s}</span>
              ))}
            </div>

            <button className={styles.applyBtn} onClick={onApply}>
              Apply now
            </button>
            <div className={styles.smallMute} style={{ textAlign: "center", marginTop: 10 }}>
              Or <a style={{ color: "var(--sd-orange-deep)", textDecoration: "underline" }} href="#">share the link to apply later</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   7. REQUEST CANDIDATES (Ultra Ready) + Promotion tab
   ========================================================================== */
type RequestCandidatesProps = {
  activeTab: "candidates" | "promotion";
  onTabChange: (t: "candidates" | "promotion") => void;
  promoOption: "oneOnOne" | "network" | "communities" | "boost";
  onPromoOption: (
    o: "oneOnOne" | "network" | "communities" | "boost"
  ) => void;
  bucket: BucketKey;
  onBucketChange: (b: BucketKey) => void;
  onOpenApplication: () => void;
  onInvite: () => void;
};
const RequestCandidates: React.FC<RequestCandidatesProps> = ({
  activeTab,
  onTabChange,
  promoOption,
  onPromoOption,
  bucket,
  onBucketChange,
  onOpenApplication,
  onInvite,
}) => {
  const sorted = useMemo(
    () => [...CANDIDATES].sort((a, b) => b.match - a.match),
    []
  );

  return (
    <>
      <div className={styles.requestHead}>
        <button className={styles.backLink}>← Back</button>
      </div>
      <h1 className={styles.requestTitle}>
        {REQUEST.title}
        <span className={styles.statusPill}>Active</span>
      </h1>

      <div
        className={styles.flex}
        style={{ alignItems: "center", marginBottom: 14 }}
      >
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "candidates" ? styles.tabActive : ""}`}
            onClick={() => onTabChange("candidates")}
          >
            Candidates
          </button>
          <button
            className={`${styles.tab} ${activeTab === "promotion" ? styles.tabActive : ""}`}
            onClick={() => onTabChange("promotion")}
          >
            Promotion
          </button>
        </div>
        <div className={styles.spacer} />
        <button className={styles.outlineBtn}>Edit request</button>
        <button
          className={styles.iconBtn}
          aria-label="More"
          style={{ marginLeft: 6 }}
        >
          ⋮
        </button>
      </div>

      {activeTab === "candidates" ? (
        <CandidatesTab
          sorted={sorted}
          bucket={bucket}
          onBucketChange={onBucketChange}
          onOpenApplication={onOpenApplication}
          onInvite={onInvite}
        />
      ) : (
        <PromotionTab
          promoOption={promoOption}
          onPromoOption={onPromoOption}
        />
      )}
    </>
  );
};

/* ---- Candidates tab body ----
 *  Three buckets: AI Scout Match (suggested contractors not yet applied),
 *  Applied (people who hit Apply on the public page) and Shortlisted.
 *  Bucket pills are clickable and the candidate list switches accordingly.
 */
const CandidatesTab: React.FC<{
  sorted: typeof CANDIDATES;
  bucket: BucketKey;
  onBucketChange: (b: BucketKey) => void;
  onOpenApplication: () => void;
  onInvite: () => void;
}> = ({ sorted, bucket, onBucketChange, onOpenApplication, onInvite }) => {
  const applied = sorted.filter((c) => c.source === "applied").length;
  return (
    <>
      <div className={styles.bucketRow}>
        <button
          type="button"
          className={`${styles.bucket} ${bucket === "scout" ? styles.bucketActive : ""}`}
          onClick={() => onBucketChange("scout")}
        >
          <div
            className={styles.bucketIcon}
            style={
              bucket === "scout"
                ? { background: "#FFD9B8", color: "#E25B15" }
                : undefined
            }
          >
            <Icon.Compass size={14} />
          </div>
          <div className={styles.bucketTextCol}>
            <div className={styles.bucketLabel}>AI Scout Match</div>
            <div className={styles.bucketSub}>Suggested contractors</div>
          </div>
          <div
            className={styles.bucketCount}
            style={
              bucket === "scout"
                ? { background: "#FFE3C2", color: "#E25B15" }
                : undefined
            }
          >
            {SCOUT_MATCH_CANDIDATES.length}
          </div>
          {bucket === "scout" && <span className={styles.bucketDot} />}
        </button>

        <button
          type="button"
          className={`${styles.bucket} ${bucket === "applied" ? styles.bucketActive : ""}`}
          onClick={() => onBucketChange("applied")}
        >
          <div
            className={styles.bucketIcon}
            style={
              bucket === "applied"
                ? { background: "#FFD9B8", color: "#E25B15" }
                : undefined
            }
          >
            <Icon.Check size={14} />
          </div>
          <div className={styles.bucketTextCol}>
            <div className={styles.bucketLabel}>Applied</div>
            <div className={styles.bucketSub}>Unsorted candidates</div>
          </div>
          <div
            className={styles.bucketCount}
            style={
              bucket === "applied"
                ? { background: "#FFE3C2", color: "#E25B15" }
                : undefined
            }
          >
            {applied}
          </div>
        </button>

        <button
          type="button"
          className={`${styles.bucket} ${bucket === "shortlisted" ? styles.bucketActive : ""}`}
          onClick={() => onBucketChange("shortlisted")}
        >
          <div
            className={styles.bucketIcon}
            style={
              bucket === "shortlisted"
                ? { background: "#FFD9B8", color: "#E25B15" }
                : undefined
            }
          >
            <Icon.Bookmark size={14} />
          </div>
          <div className={styles.bucketTextCol}>
            <div className={styles.bucketLabel}>Shortlisted</div>
            <div className={styles.bucketSub}>Selected candidates</div>
          </div>
          <div
            className={styles.bucketCount}
            style={
              bucket === "shortlisted"
                ? { background: "#FFE3C2", color: "#E25B15" }
                : undefined
            }
          >
            0
          </div>
        </button>
      </div>

      {bucket === "scout" && (
        <ScoutMatchList onInvite={onInvite} />
      )}

      {bucket === "applied" && (
        <>
          <div className={styles.sortBar}>
            <button className={styles.sortChip}>
              Best match first <Icon.Chevron size={12} />
            </button>
            <span className={styles.smallMute}>
              {sorted.length} candidates · 2 rejected
            </span>
          </div>

          {sorted.map((c) => {
            const isUltra = c.source === "ultra";
            return (
              <div
                key={c.id}
                className={`${styles.candidateRow} ${isUltra ? styles.ultra : ""}`}
                onClick={onOpenApplication}
                style={{ cursor: "pointer" }}
                title="Open application (demo)"
              >
                <Avatar initials={c.initials} color={c.avatarTone} />
                <div>
                  <div className={styles.candidateName}>{c.name}</div>
                  <div className={styles.candidateMeta}>
                    {c.country} · {c.role} · {c.experience}
                  </div>
                </div>
                <div className={`${styles.flex} ${styles.gap8}`}>
                  {isUltra && (
                    <span
                      className={`${styles.sourceBadge} ${styles.sourceUltra}`}
                    >
                      Ultra
                    </span>
                  )}
                  {c.source === "scouted" && (
                    <span
                      className={`${styles.sourceBadge} ${styles.sourceScouted}`}
                    >
                      AI Scouted
                    </span>
                  )}
                </div>
                <MatchPill score={c.match} />
              </div>
            );
          })}

          <div className={styles.ultraSuccess}>
            <div
              className={styles.bucketIcon}
              style={{ background: "#FFD9B8", width: 36, height: 36 }}
            >
              <Icon.Sparkles color="#E25B15" />
            </div>
            <div>
              <strong>Your Ultra candidates are ready!</strong>
              <span>
                Found the right fit? If not, you can start a new search at no extra cost.
              </span>
            </div>
            <button className={styles.outlineBtn}>Reactivate Ultra</button>
          </div>
        </>
      )}

      {bucket === "shortlisted" && (
        <div className={styles.emptyHero}>
          <Icon.Bookmark size={28} color="#E25B15" />
          <h3>No shortlisted candidates yet</h3>
          <p>
            Open an application from the Applied tab and tap “Add to Shortlist”
            to bring your top picks here.
          </p>
        </div>
      )}
    </>
  );
};

/* ---- AI Scout Match list ----
 *  Mirrors the mockup: avatar (with optional photo placeholder), name, role,
 *  experience, location, source pill (From X / LinkedIn / Mellow), match
 *  score, and an "Invite to apply" CTA. Each row carries the orange left
 *  accent so the list reads as "scout-suggested" at a glance.  */
const ScoutMatchList: React.FC<{ onInvite: () => void }> = ({ onInvite }) => {
  return (
    <>
      <div className={styles.sortBar}>
        <button className={styles.sortChip}>
          Best match first <Icon.Chevron size={12} />
        </button>
        <span className={styles.smallMute}>
          {SCOUT_MATCH_CANDIDATES.length} suggested · curated by AI Scout
        </span>
      </div>

      {SCOUT_MATCH_CANDIDATES.map((c) => (
        <div
          key={c.id}
          className={`${styles.candidateRow} ${styles.ultra} ${styles.scoutRow}`}
        >
          {c.hasPhoto ? (
            <div
              className={styles.scoutAvatarPhoto}
              style={{ background: c.avatarTone }}
              aria-label={c.name}
            >
              <ScoutAvatarPortrait />
            </div>
          ) : (
            <div className={styles.scoutAvatarMono}>
              <span>{c.initials}</span>
            </div>
          )}

          <div>
            <div className={styles.candidateName}>{c.name}</div>
            <div className={styles.candidateMeta}>
              {c.role} · {c.experience} · {c.country}
            </div>
          </div>

          <span className={styles.scoutSourcePill}>From {c.scoutSource}</span>
          <MatchPill score={c.match} />
          <button
            className={styles.inviteApplyBtn}
            onClick={onInvite}
            type="button"
          >
            Invite to apply
          </button>
        </div>
      ))}
    </>
  );
};

/* Tiny portrait used when a Scout candidate has hasPhoto = true */
const ScoutAvatarPortrait: React.FC = () => (
  <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden>
    <defs>
      <clipPath id="scoutAvatarClip">
        <circle cx="22" cy="22" r="22" />
      </clipPath>
    </defs>
    <g clipPath="url(#scoutAvatarClip)">
      <rect width="44" height="44" fill="#C28E6E" />
      <circle cx="22" cy="17" r="7.5" fill="#1f120c" />
      <ellipse cx="22" cy="38" rx="14" ry="10" fill="#fff" />
      <circle cx="22" cy="20" r="6.4" fill="#caa285" />
      <path
        d="M14 14c0-5 4-8 8-8s8 3 8 8c0 2-1 3-2 4-1-3-3-5-6-5s-5 2-6 5c-1-1-2-2-2-4z"
        fill="#1a0f0a"
      />
    </g>
  </svg>
);

/* ---- Promotion tab body (default = One-on-one expanded) ---- */
const PromotionTab: React.FC<{
  promoOption: "oneOnOne" | "network" | "communities" | "boost";
  onPromoOption: (
    o: "oneOnOne" | "network" | "communities" | "boost"
  ) => void;
}> = ({ promoOption, onPromoOption }) => {
  const options: {
    id: "oneOnOne" | "network" | "communities" | "boost";
    icon: React.ReactNode;
    label: string;
    sub: string;
    status?: { label: string; pending?: boolean };
  }[] = [
    {
      id: "oneOnOne",
      icon: <Icon.Chat />,
      label: "Reach out one-on-one",
      sub: "AI-drafted message, ready to send",
    },
    {
      id: "network",
      icon: <Icon.Share />,
      label: "Share with your network",
      sub: "AI-drafted post, ready to publish",
    },
    {
      id: "communities",
      icon: <Icon.Users />,
      label: "Explore communities",
      sub: "Communities matched to your request",
    },
    {
      id: "boost",
      icon: <Icon.Bolt />,
      label: "Boost by Mellow",
      sub: "Reach freelancers outside your network",
      status: { label: "Pending", pending: true },
    },
  ];
  return (
    <>
      <div className={styles.smallMute} style={{ marginBottom: 10 }}>
        Get more people to see your request:
      </div>

      <div className={styles.promotionWrap}>
        <div className={styles.promotionList}>
          {options.map((o) => (
            <button
              key={o.id}
              className={`${styles.promoOption} ${promoOption === o.id ? styles.promoOptionActive : ""}`}
              onClick={() => onPromoOption(o.id)}
              type="button"
            >
              <div className={styles.promoIcon}>{o.icon}</div>
              <div>
                <div className={styles.promoLabel}>{o.label}</div>
                <div className={styles.promoSub}>{o.sub}</div>
              </div>
              {o.status && (
                <span
                  className={`${styles.promoStatus} ${o.status.pending ? styles.promoStatusPending : ""}`}
                >
                  {o.status.label}
                </span>
              )}
              <Icon.ChevronRight size={12} color="var(--sd-mute)" />
            </button>
          ))}
        </div>

        {/* Default detail view: One-on-one with AI-drafted message */}
        <div className={styles.promotionDetail}>
          {promoOption === "oneOnOne" && (
            <>
              <h4>Your personal invite is ready</h4>
              <div className={styles.smallMute}>
                Direct messages get 3× more responses than public posts —
                people are much more willing to help someone they know.
              </div>
              <div className={styles.promoMessage}>
                <div className={styles.promoMessageActions}>
                  <button className={styles.iconBtn} aria-label="Edit">
                    <Icon.Link size={12} />
                  </button>
                  <button className={styles.iconBtn} aria-label="Copy">
                    <Icon.Copy size={12} />
                  </button>
                </div>
                {ONE_ON_ONE_MESSAGE}
              </div>
            </>
          )}
          {promoOption === "network" && (
            <>
              <h4>Pick a channel</h4>
              <div className={styles.smallMute}>
                We&apos;ll pre-fill a post you can share in one click.
              </div>
              <div className={styles.networkChips} style={{ marginTop: 14 }}>
                <span
                  className={`${styles.networkChip} ${styles.networkChipActive}`}
                >
                  in LinkedIn
                </span>
                <span className={styles.networkChip}>f Facebook</span>
              </div>
              <div className={styles.promoMessage}>
                🎨 Looking for a Junior–Mid UI/UX Designer to work on a SaaS
                product refresh. Remote, flexible schedule, 1–3 months. If you
                have a sharp eye for design — we&apos;d love to hear from you.{"\n\n"}#uxdesigner #remoteproject #freelance #parttime
              </div>
            </>
          )}
          {promoOption === "communities" && (
            <>
              <h4>Communities matched to your request</h4>
              <div className={styles.smallMute}>
                Niche communities attract higher-quality candidates — people
                here are actively looking for freelance work.
              </div>
              <div style={{ marginTop: 16 }}>
                {COMMUNITIES.map((c) => (
                  <div className={styles.communityRow} key={c.name}>
                    <div className={styles.communityIcon}>{c.icon}</div>
                    <div className={styles.communityName}>
                      <strong>{c.name}</strong>
                      <span>{c.platform} · Not explored</span>
                    </div>
                    <button className={styles.communityAction}>
                      Generate post
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
          {promoOption === "boost" && (
            <>
              <h4>Boost by Mellow — coming soon</h4>
              <div className={styles.smallMute}>
                We&apos;ll syndicate your request to Mellow&apos;s open pool and
                a curated set of niche job boards. Currently in private preview.
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

/* ==========================================================================
   8. APPLICATION MODAL (candidate detail with CV preview)
   ========================================================================== */
const ApplicationModal: React.FC<{
  onClose: () => void;
  onShortlist: () => void;
}> = ({ onClose, onShortlist }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.applicationModal}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.applicationHeader}>
          <Avatar initials="TC" color="#FF6F23" size={48} />
          <div>
            <h3>{FEATURED_CANDIDATE.name}</h3>
            <span>
              {FEATURED_CANDIDATE.role} · {FEATURED_CANDIDATE.email}
            </span>
          </div>
          <div className={styles.applicationHeaderRight}>
            <span className={styles.successPill}>
              <Icon.Bolt size={11} /> {FEATURED_CANDIDATE.match}% · {FEATURED_CANDIDATE.matchLabel}
            </span>
            <button className={styles.modalClose} onClick={onClose}>
              <Icon.X />
            </button>
          </div>
        </header>

        <div className={styles.applicationGrid}>
          <div className={styles.applicationLeft}>
            <h4>Cover letter</h4>
            <p>{FEATURED_CANDIDATE.cover}</p>

            <div className={styles.cvCard}>
              <div className={styles.cvIcon}>
                <Icon.Doc />
              </div>
              <div>
                <div>
                  <strong>{FEATURED_CANDIDATE.cv}</strong>
                </div>
                <span>{FEATURED_CANDIDATE.cvSize}</span>
              </div>
              <button
                className={styles.iconBtn}
                style={{ marginLeft: "auto" }}
                aria-label="Download"
              >
                <Icon.Share size={12} />
              </button>
            </div>

            <h4>Skills</h4>
            <div className={styles.tagsLine}>
              {FEATURED_CANDIDATE.skills.map((s) => (
                <span className={styles.tagPill} key={s}>{s}</span>
              ))}
            </div>

            <div className={styles.actionRow}>
              <button className={styles.iconAction}>
                <Icon.Reject size={12} /> Reject
              </button>
              <button className={styles.iconAction}>
                <Icon.Mail size={12} /> Email
              </button>
              <button className={styles.iconAction}>
                <Icon.Heart size={12} /> Favourite
              </button>
            </div>
          </div>

          <div className={styles.applicationRight}>
            <h4>Profile</h4>
            <div className={styles.detailRow}>
              <span>Experience</span>
              <strong>{FEATURED_CANDIDATE.experience}</strong>
            </div>
            <div className={styles.detailRow}>
              <span>Education</span>
              <strong>{FEATURED_CANDIDATE.master}</strong>
            </div>
            <div className={styles.detailRow}>
              <span>Location</span>
              <strong>{FEATURED_CANDIDATE.location}</strong>
            </div>
            <div className={styles.detailRow}>
              <span>Spent on Mellow</span>
              <strong>{FEATURED_CANDIDATE.spent}</strong>
            </div>

            <button
              className={`${styles.primaryBtn} ${styles.primaryBtnAlt}`}
              style={{ marginTop: 18 }}
              onClick={onShortlist}
            >
              <Icon.Bookmark size={12} color="#fff" /> Add to Shortlist
            </button>
            <button
              className={styles.primaryBtn}
              style={{ background: "transparent", color: "var(--sd-ink)", border: "1px solid var(--sd-line)" }}
              onClick={onClose}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   9. INVITATION MODAL ("Invitation Preview" — Work Together email)
   ========================================================================== */
const InvitationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [sent, setSent] = useState(false);
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.inviteModal}
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(460px, 92vw)" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 18px 0",
          }}
        >
          <span className={styles.demoNote}>Invitation Preview</span>
          <button className={styles.modalClose} onClick={onClose}>
            <Icon.X />
          </button>
        </div>
        <div className={styles.inviteHero}>
          <div className={styles.inviteAvatars}>
            <Avatar initials="TC" color="#FF6F23" size={44} />
            <Avatar initials={MANAGER.initials} color="#1A1716" size={44} />
          </div>
          <h3>Work Together on {MANAGER.company}</h3>
          <p>
            We&apos;d love to have your help on the<br />
            <strong>{REQUEST.title}</strong>.
          </p>

          <div
            style={{
              background: "#fff",
              border: "1px solid var(--sd-line-soft)",
              borderRadius: 12,
              padding: 14,
              fontSize: 13,
              lineHeight: 1.5,
              textAlign: "left",
              marginTop: 14,
            }}
          >
            Now is a great time to lock in a contractor — your shortlist is
            ready, the rate matches the market, and the Mellow team will set up
            the contract for you in a single click once you say go.
          </div>

          <button
            className={styles.inviteSendBtn}
            onClick={() => setSent(true)}
            disabled={sent}
            style={sent ? { background: "#2e7d32", cursor: "default" } : undefined}
          >
            {sent ? (
              <>
                <Icon.Check size={14} color="#fff" /> Invitation sent
              </>
            ) : (
              "Send invitation"
            )}
          </button>
          {sent && (
            <div
              style={{
                marginTop: 12,
                padding: "10px 12px",
                background: "#fff",
                border: "1px dashed var(--sd-line)",
                borderRadius: 10,
                fontSize: 12,
                color: "var(--sd-ink-soft)",
                textAlign: "left",
              }}
            >
              <strong style={{ fontSize: 12 }}>What&apos;s next:</strong> once
              Taylor accepts, Mellow will draft the contract and route the first
              milestone payment via MoR. <em>(Payment screen — next iteration.)</em>
            </div>
          )}
        </div>

        <div className={styles.inviteFaq}>
          <h4>Ready to start working together?</h4>
          <ol>
            <li>
              Mellow will draft a <strong>Service Agreement</strong> using the
              project details you&apos;ve already approved.
            </li>
            <li>
              Taylor signs and gets a <strong>secure work area</strong> for
              files, status and milestones.
            </li>
            <li>
              You release payment via Mellow Merchant of Record once each
              milestone is signed off — no manual invoicing.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
