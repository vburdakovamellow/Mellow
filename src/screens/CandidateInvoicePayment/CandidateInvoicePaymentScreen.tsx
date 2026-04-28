import { useState } from "react";
import styles from "./CandidateInvoicePaymentScreen.module.css";

/**
 * ВЕТКА: fm/candidate-invoice-payment-flow
 *
 * Прототип всего пути от открытия реквеста до оплаты F2B-инвойса.
 * Все статусы кандидата живут ВНУТРИ одной и той же модалки карточки —
 * меняются только pill, кнопка и доп. блок. Модалка не закрывается между
 * переходами; фоном остаётся Candidates list.
 *
 * Сценарий (10 шагов, happy path · Verify):
 *  Scout (Candidates list + одна модалка карточки)
 *   01. Candidates list — раздел кабинета по реквесту, фильтры AI Match / Applied / Shortlisted.
 *   02. Application · New        — модалка с CV, кнопка Request proposal.
 *   03. Application · In Talks   — pill IN TALKS, ждём КП от фрилансера, кнопка Accept proposal.
 *   04. Application · Deal settled — pill DEAL SETTLED, фрил прислал инвойс, кнопка Pay invoice.
 *  Mellow (my.mellow.io · branded · invoice page)
 *   05. Invoice page (pre-verify) — Confirm your company details + Bank/Card,
 *       Pay disabled пока компания не верифицирована.
 *  Sumsub (modal over Mellow page · happy path only)
 *   06. Let's get you verified — 3 шага (identity, liveness, address).
 *   07. We're verifying your data — состояние ожидания.
 *   08. Verification passed — успех.
 *  Mellow
 *   09. Invoice page (Pay enabled) — компания верифицирована, Pay активна.
 *  Scout
 *   10. Application · Paid — модалка с pill PAID, виден receipt и история.
 *
 * Стили:
 *  - Scout — строго ч/б (#000/#fff/#666/#e5e5e5), один шрифт var(--ds-font-family-body).
 *  - my.mellow.io — брендовая, повторяет live-страницу.
 *  - Sumsub — модалка-оверлей над Mellow page, акцент #ff6f23.
 */

type StepId =
  | "candidates_list"
  | "application_new"
  | "application_in_talks"
  | "application_deal_settled"
  | "payment"
  | "sumsub_intro"
  | "sumsub_verifying"
  | "sumsub_passed"
  | "payment_verified"
  | "application_paid";

type StepGroup = "Scout" | "Mellow" | "Sumsub";

const STEPS: { id: StepId; name: string; short: string; group: StepGroup }[] = [
  { id: "candidates_list", name: "01. Scout · Candidates list", short: "Candidates list", group: "Scout" },
  { id: "application_new", name: "02. Scout · Application · New (modal)", short: "Application · New", group: "Scout" },
  { id: "application_in_talks", name: "03. Scout · Application · In Talks (modal)", short: "Application · In Talks", group: "Scout" },
  { id: "application_deal_settled", name: "04. Scout · Application · Deal settled (modal)", short: "Application · Deal settled", group: "Scout" },
  { id: "payment", name: "05. my.mellow.io · Invoice page (verify required)", short: "Invoice (pre-verify)", group: "Mellow" },
  { id: "sumsub_intro", name: "06. Sumsub · Let's get you verified", short: "Sumsub · intro", group: "Sumsub" },
  { id: "sumsub_verifying", name: "07. Sumsub · We're verifying your data", short: "Sumsub · verifying", group: "Sumsub" },
  { id: "sumsub_passed", name: "08. Sumsub · Verification passed", short: "Sumsub · passed", group: "Sumsub" },
  { id: "payment_verified", name: "09. my.mellow.io · Invoice page (Pay enabled)", short: "Invoice (Pay)", group: "Mellow" },
  { id: "application_paid", name: "10. Scout · Application · Paid (modal)", short: "Application · Paid", group: "Scout" },
];

/* ============================================================
   Demo data (snapshot — NOT real customer data)
   ============================================================ */

const REQUEST = {
  title: "Graphic Designer for Social Media Visuals",
  company: "Studio M",
  location: "United Arab Emirates",
};

const CANDIDATE = {
  initials: "JM",
  name: "Jessica Martinez",
  role: "Graphic Designer · Middle",
  location: "Lisbon, Portugal",
  rate: "€30/hr",
  match: 91,
  email: "jessica.martinez@gmail.com",
  appliedAt: "Apr 6, 2026",
};

const INVOICE = {
  number: "884198-20260427-1208",
  issuedAt: "Apr 27, 2026",
  fromName: "JESSICA MARTINEZ",
  fromEmail: "jessica.martinez@gmail.com",
  toName: "Studio M",
  toEmail: "billing@studio-m.ae",
  description: "Social media visual kit — Q2 sprint",
  serviceCategory: "Graphic design",
  workPeriodStart: "Apr 14, 2026",
  workPeriodEnd: "Apr 25, 2026",
  quantity: "40 h",
  unitPrice: 30,
  amount: 1200,
  feePct: 5,
  fee: 60,
  total: 1260,
  bank: { feePct: 5, fee: 60, total: 1260 },
  card: { feePct: 7.5, fee: 90, total: 1290 },
};

const fmtEur = (v: number) =>
  `€${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ============================================================
   Candidates list — mock pool for the request
   ============================================================ */

type FilterId = "ai_match" | "applied" | "shortlisted";

const FILTERS: { id: FilterId; title: string; sub: string; iconText: string }[] = [
  { id: "ai_match", title: "AI Scout Match", sub: "Suggested contractors", iconText: "AI" },
  { id: "applied", title: "Applied", sub: "Unsorted candidates", iconText: "✓" },
  { id: "shortlisted", title: "Shortlisted", sub: "Selected candidates", iconText: "★" },
];

type CandidateRow = {
  id: string;
  initials: string;
  name: string;
  meta: string;
  source: string;
  match: number;
  /** "open" — opens the application modal; "invite" — Invite-to-apply CTA. */
  cta: "open" | "invite";
};

const APPLIED_CANDIDATES: CandidateRow[] = [
  {
    id: "jessica",
    initials: "JM",
    name: CANDIDATE.name,
    meta: `${CANDIDATE.location} · Graphic Designer · 4 years of experience`,
    source: "From Mellow",
    match: 91,
    cta: "open",
  },
];

const APPLICATION_DETAIL = {
  status: "New",
  experienceYears: "4 years",
  location: "Lisbon, Portugal",
  appliedRelative: "Applied today",
  appliedToRequest: REQUEST.title,
  coverLetter:
    "I'm a Lisbon-based graphic designer with 4 years of experience building social-first " +
    "visuals for B2B and lifestyle brands. I've worked end-to-end on Q1/Q2 sprints — from mood " +
    "boards and ad-set frames to motion-ready layouts and template kits the marketing team can " +
    "reuse. I'd love to bring that rhythm to your Q2 sprint: tight turnaround, clean visual " +
    "system, and assets that hold up across IG, TikTok and paid placements.\n\n" +
    "Recent stack: Figma, Adobe CC, After Effects (light), and Canva for hand-off. Happy to " +
    "share Figma files, raw layered sources, and the brand kit for ongoing use.",
  portfolioLinks: [
    { label: "jessicamartinez.work", href: "#" },
    { label: "linkedin.com/in/jessicamtz", href: "#" },
    { label: "behance.net/jessicamtz", href: "#" },
    { label: "instagram.com/jm.studio", href: "#" },
  ],
  attachment: { name: "Jessica_Martinez_CV.pdf", size: "120 Kb" },
};

const AI_MATCH_CANDIDATES: CandidateRow[] = [
  {
    id: "santiago",
    initials: "SH",
    name: "Santiago Herrera",
    meta: "Hungary · UI/UX Designer · 5.5 years of experience",
    source: "From X",
    match: 100,
    cta: "invite",
  },
  {
    id: "daryna",
    initials: "DS",
    name: "Daryna Shevchenko",
    meta: "Hungary · Graphic Designer · 2 years of experience",
    source: "From LinkedIn",
    match: 82,
    cta: "invite",
  },
  {
    id: "valentina",
    initials: "VG",
    name: "Valentina Gonzalez",
    meta: "Hungary · Graphic Designer · 3.5 years of experience",
    source: "From Mellow",
    match: 81,
    cta: "invite",
  },
];

/* ============================================================
   Top prototype navigator
   ============================================================ */

function PrototypeBar({
  step,
  idx,
  goNext,
  goBack,
  jump,
}: {
  step: StepId;
  idx: number;
  goNext: () => void;
  goBack: () => void;
  jump: (id: StepId) => void;
}) {
  const current = STEPS[idx];
  const grouped: Record<StepGroup, typeof STEPS> = { Scout: [], Mellow: [], Sumsub: [] };
  STEPS.forEach((s) => grouped[s.group].push(s));

  return (
    <div className={styles.protoBar}>
      <div className={styles.protoLeft}>
        <button
          type="button"
          className={`${styles.protoBtn} ${styles.protoBtnGhost}`}
          onClick={goBack}
          disabled={idx === 0}
        >
          ← Back
        </button>
        <span className={styles.protoStepIndex}>
          Step {idx + 1} / {STEPS.length}
        </span>
        <span className={styles.protoStepName}>
          {current.group} · {current.short}
        </span>
      </div>
      <div className={styles.protoRight}>
        <select
          aria-label="Jump to step"
          value={step}
          onChange={(e) => jump(e.target.value as StepId)}
          className={styles.protoBtn}
        >
          {(Object.keys(grouped) as StepGroup[]).map((g) => (
            <optgroup key={g} label={g}>
              {grouped[g].map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <button
          type="button"
          className={styles.protoBtn}
          onClick={goNext}
          disabled={idx === STEPS.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Reusable: Scout app shell (B/W)
   Sidebar with W-logo + nav icons; main area on the right.
   ============================================================ */

type SidebarKey = "dashboard" | "candidates" | "ai_match";

function ScoutShell({
  children,
  active = "candidates",
}: {
  children: React.ReactNode;
  active?: SidebarKey;
}) {
  return (
    <div className={styles.scoutFrame}>
      <aside className={styles.scoutSidebar}>
        <div className={styles.scoutSidebarLogo}>W</div>
        <nav className={styles.scoutSidebarNav} aria-label="Scout navigation">
          <button
            type="button"
            className={`${styles.scoutSidebarBtn} ${active === "dashboard" ? styles.scoutSidebarBtnActive : ""}`}
            aria-label="Dashboard"
            title="Dashboard"
          >
            ▦
          </button>
          <button
            type="button"
            className={`${styles.scoutSidebarBtn} ${active === "candidates" ? styles.scoutSidebarBtnActive : ""}`}
            aria-label="Candidates"
            title="Candidates"
          >
            ⚲
          </button>
          <button
            type="button"
            className={`${styles.scoutSidebarBtn} ${active === "ai_match" ? styles.scoutSidebarBtnActive : ""}`}
            aria-label="AI Match"
            title="AI Match"
          >
            ✦
          </button>
        </nav>
      </aside>
      <div className={styles.scoutMain}>{children}</div>
    </div>
  );
}

/* ============================================================
   STEP 0 — Candidates list (request detail · Candidates tab)
   Entry point. Manager opens the request, sees candidates, picks one.
   ============================================================ */

function StepCandidatesList({ openApplication }: { openApplication: () => void }) {
  const [filter, setFilter] = useState<FilterId>("applied");

  const rows = filter === "ai_match" ? AI_MATCH_CANDIDATES : filter === "applied" ? APPLIED_CANDIDATES : [];

  const counts: Record<FilterId, number> = {
    ai_match: AI_MATCH_CANDIDATES.length,
    applied: APPLIED_CANDIDATES.length,
    shortlisted: 0,
  };

  return (
    <ScoutShell active="candidates">
      <div className={styles.scoutTopbar}>
        <button type="button" className={styles.reqGenerateBtn}>Generate request</button>
        <button type="button" className={styles.reqAIScout}>AI Scout</button>
        <span className={styles.reqUserAvatar}>JM</span>
      </div>
      <main className={styles.scoutBody}>
        <div className={styles.reqHeader}>
          <div className={styles.reqTitleRow}>
            <button type="button" className={styles.reqBack}>← Back</button>
            <span className={styles.reqTitle}>{REQUEST.title}</span>
            <span className={styles.reqActiveBadge}>Active</span>
          </div>
        </div>

        <div className={styles.tabs}>
          <button type="button" className={`${styles.tabBtn} ${styles.tabActive}`}>Candidates</button>
          <button type="button" className={styles.tabBtn}>Promotion</button>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <button type="button" className={styles.reqEditBtn}>Edit request</button>
            <button type="button" className={styles.reqMenuBtn} aria-label="More">⋯</button>
          </div>
        </div>

        <div className={styles.filterRow}>
          {FILTERS.map((f) => {
            const active = f.id === filter;
            const isUnseen = f.id === "ai_match" && counts.ai_match > 0;
            return (
              <button
                key={f.id}
                type="button"
                className={`${styles.filterCard} ${active ? styles.filterCardActive : ""}`}
                onClick={() => setFilter(f.id)}
              >
                <span className={styles.filterIcon} aria-hidden>{f.iconText}</span>
                <span className={styles.filterMain}>
                  <span className={styles.filterTitle}>{f.title}</span>
                  <span className={styles.filterSub}>{f.sub}</span>
                </span>
                <span className={styles.filterCount}>{counts[f.id]}</span>
                {isUnseen && !active && <span className={styles.filterDot} aria-hidden />}
              </button>
            );
          })}
        </div>

        <div className={styles.sortRow}>
          <span className={styles.sortLabel}>
            {filter === "applied" ? "New applications" : filter === "ai_match" ? "Suggested by AI Scout" : "Your shortlist"}
          </span>
          <div className={styles.sortGroup}>
            <span className={styles.sortLabel}>Sort</span>
            <select className={styles.sortSelect} defaultValue="match">
              <option value="match">Match score</option>
              <option value="recent">Most recent</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className={styles.candEmpty}>
            {filter === "shortlisted"
              ? "No one in the shortlist yet. Open an application and click the heart icon to add it here."
              : "Nothing here yet."}
          </div>
        ) : (
          <div className={styles.candList}>
            {rows.map((c) => (
              <button
                key={c.id}
                type="button"
                className={styles.candRow}
                onClick={c.cta === "open" ? openApplication : undefined}
              >
                <span className={styles.candRowAvatar}>{c.initials}</span>
                <span className={styles.candRowInfo}>
                  <span className={styles.candRowName}>{c.name}</span>
                  <span className={styles.candRowMeta}>{c.meta}</span>
                </span>
                <span className={styles.candRowRight}>
                  <span className={styles.candRowSource}>{c.source}</span>
                  <span className={styles.candRowMatch}>✦ {c.match}%</span>
                  <span
                    className={`${styles.candRowAction} ${
                      c.cta === "invite" ? styles.candRowActionGhost : ""
                    }`}
                  >
                    {c.cta === "open" ? "Review application" : "Invite to apply"}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </main>
    </ScoutShell>
  );
}

/* ============================================================
   Application card — modal opened on top of Candidates list.
   Lives across 4 statuses: NEW → IN TALKS → DEAL SETTLED → PAID.
   Modal NEVER closes between transitions — only pill, primary
   action and the side block change.
   ============================================================ */

type AppState = "new" | "in_talks" | "deal_settled" | "paid";

const PILLS: Record<AppState, string> = {
  new: "New",
  in_talks: "In Talks",
  deal_settled: "Deal settled",
  paid: "Paid",
};

const PRIMARY_ACTIONS: Record<AppState, { label: string; hint?: string }> = {
  new: { label: "Request proposal", hint: "We'll email Jessica and ask her to send a proposal." },
  in_talks: { label: "Accept proposal", hint: "Accepting locks the deal — Jessica then drafts an invoice." },
  deal_settled: { label: "Pay invoice — €1,260.00", hint: "Opens Mellow's secure invoice page." },
  paid: { label: "Download receipt" },
};

function StatusBlock({ state }: { state: AppState }) {
  if (state === "new") return null;

  if (state === "in_talks") {
    return (
      <div className={styles.modalStatusBlock}>
        <div className={styles.modalStatusTitle}>Waiting for proposal</div>
        <div className={styles.modalStatusBody}>
          We've emailed Jessica and asked her to send a proposal. Sync over email on scope, timeline
          and rate. As soon as she replies with terms — accept here, and Mellow drafts the invoice.
        </div>
        <ul className={styles.modalStatusSteps}>
          <li className={styles.modalStatusStepDone}>Proposal requested · Apr 14, 2026</li>
          <li className={styles.modalStatusStepActive}>Awaiting reply · usually under 3 days</li>
          <li className={styles.modalStatusStepPending}>Accept proposal → Mellow drafts an invoice</li>
        </ul>
      </div>
    );
  }

  if (state === "deal_settled") {
    return (
      <div className={styles.modalStatusBlock}>
        <div className={styles.modalStatusTitle}>Invoice ready — €1,260.00</div>
        <div className={styles.modalStatusBody}>
          Jessica accepted the deal and sent an invoice via Mellow. Pay it through Mellow's secure
          page — Scout updates the status here once payment is captured.
        </div>
        <dl className={styles.modalKv}>
          <div>
            <dt>Scope</dt>
            <dd>Social media visual kit — Q2 sprint</dd>
          </div>
          <div>
            <dt>Period</dt>
            <dd>Apr 14 — Apr 25, 2026</dd>
          </div>
          <div>
            <dt>Effort</dt>
            <dd>40 h × €30/hr</dd>
          </div>
          <div>
            <dt>Total (incl. 5% bank fee)</dt>
            <dd>€1,260.00</dd>
          </div>
        </dl>
      </div>
    );
  }

  // paid
  return (
    <div className={styles.modalStatusBlock}>
      <div className={styles.modalStatusTitle}>Paid · €1,260.00</div>
      <div className={styles.modalStatusBody}>
        Bank transfer settled via Mellow on Apr 27, 2026. Receipt synced to this card.
      </div>
      <dl className={styles.modalKv}>
        <div>
          <dt>Invoice</dt>
          <dd>No {INVOICE.number}</dd>
        </div>
        <div>
          <dt>Method</dt>
          <dd>Bank transfer (SEPA)</dd>
        </div>
        <div>
          <dt>Amount</dt>
          <dd>{fmtEur(INVOICE.amount)}</dd>
        </div>
        <div>
          <dt>Mellow fee (5%)</dt>
          <dd>{fmtEur(INVOICE.fee)}</dd>
        </div>
      </dl>
    </div>
  );
}

function ApplicationCardModal({
  state,
  onPrimary,
  onClose,
}: {
  state: AppState;
  onPrimary: () => void;
  onClose: () => void;
}) {
  const action = PRIMARY_ACTIONS[state];

  return (
    <div className={styles.appOverlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.appCard} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.appClose} onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className={styles.appHeader}>
          <div className={styles.appIdent}>
            <div className={styles.appAvatar}>{CANDIDATE.initials}</div>
            <div>
              <div className={styles.appNameRow}>
                <span className={styles.appName}>{CANDIDATE.name}</span>
                <span className={styles.appStatusPill}>{PILLS[state]}</span>
              </div>
              <ul className={styles.appMetaList}>
                <li>
                  <span className={styles.appMetaIcon} aria-hidden>◐</span>
                  <span>{CANDIDATE.role}</span>
                </li>
                <li>
                  <span className={styles.appMetaIcon} aria-hidden>✉</span>
                  <span>{CANDIDATE.email}</span>
                </li>
              </ul>
              <div className={styles.appAppliedRow}>
                <span>{APPLICATION_DETAIL.appliedRelative}</span>
                <span aria-hidden>·</span>
                <strong>{APPLICATION_DETAIL.appliedToRequest}</strong>
              </div>
            </div>
          </div>

          <div className={styles.appRight}>
            <div className={styles.appMatchRow}>
              <div>
                <div className={styles.appMatchVal}>{CANDIDATE.match}%</div>
                <div className={styles.appMatchLbl}>Match</div>
              </div>
              {state === "new" && (
                <div className={styles.appMatchActions}>
                  <button
                    type="button"
                    className={`${styles.appIconBtn} ${styles.appIconBtnReject}`}
                    aria-label="Reject"
                    title="Reject"
                  >
                    ×
                  </button>
                  <button
                    type="button"
                    className={styles.appIconBtn}
                    aria-label="Add to shortlist"
                    title="Add to shortlist"
                  >
                    ♡
                  </button>
                </div>
              )}
            </div>

            <div className={styles.appKv}>
              <div className={styles.appKvLbl}>Experience</div>
              <div className={styles.appKvVal}>{APPLICATION_DETAIL.experienceYears}</div>
              <div className={styles.appKvLbl}>Location</div>
              <div className={styles.appKvVal}>{APPLICATION_DETAIL.location}</div>
              <div className={styles.appKvLbl}>Rate</div>
              <div className={styles.appKvVal}>{CANDIDATE.rate}</div>
            </div>

            <button
              type="button"
              className={styles.appInviteBtn}
              onClick={onPrimary}
              disabled={state === "paid"}
            >
              {action.label}
            </button>
            {action.hint && <div className={styles.appInviteFootnote}>{action.hint}</div>}
          </div>
        </div>

        <StatusBlock state={state} />

        <div className={styles.appSection}>
          <div className={styles.appSectionTitle}>Cover letter</div>
          <div className={styles.appCover}>{APPLICATION_DETAIL.coverLetter}</div>
        </div>

        <div className={styles.appSection}>
          <div className={styles.appSectionTitle}>Portfolio or profile links</div>
          <div className={styles.appLinks}>
            {APPLICATION_DETAIL.portfolioLinks.map((l) => (
              <a key={l.label} className={styles.appLink} href={l.href} onClick={(e) => e.preventDefault()}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.appSection}>
          <div className={styles.appSectionTitle}>Attached CV</div>
          <div className={styles.appAttach}>
            <div>
              <span className={styles.appAttachName}>{APPLICATION_DETAIL.attachment.name}</span>
              <span className={styles.appAttachSize}>{APPLICATION_DETAIL.attachment.size}</span>
            </div>
            <button type="button" className={styles.appAttachDownload} aria-label="Download">
              ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepApplication({
  state,
  onPrimary,
  onClose,
}: {
  state: AppState;
  onPrimary: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <StepCandidatesList openApplication={() => {}} />
      <ApplicationCardModal state={state} onPrimary={onPrimary} onClose={onClose} />
    </>
  );
}


/* ============================================================
   STEP 3 — my.mellow.io invoice page (branded, replicates live page)
   ============================================================ */

function StepPaymentPage({
  verified,
  onVerify,
  onPaid,
}: {
  verified: boolean;
  onVerify: () => void;
  onPaid: () => void;
}) {
  return (
    <div className={styles.mellowFrame}>
      <div className={styles.mellowTopbar}>my.mellow.io</div>

      <header className={styles.mellowHeader}>
        <div className={styles.mellowLogo}>mellow</div>
        <span className={styles.mellowGradient} aria-hidden />
        <button type="button" className={styles.mellowHowtoBtn}>How to pay invoice</button>
      </header>

      <main className={styles.mellowMain}>
        <div className={styles.mellowInvoice}>
          <div className={styles.mellowInvHead}>
            <div>
              <h1 className={styles.mellowInvTitle}>Invoice</h1>
              <div className={styles.mellowInvNo}>No {INVOICE.number}</div>
              <div className={styles.mellowInvDate}>{INVOICE.issuedAt}</div>
            </div>
            <div className={styles.mellowLogoSm}>mellow</div>
          </div>

          <div className={styles.mellowParties}>
            <div>
              <div className={styles.mellowPartyName}>From {INVOICE.fromName}</div>
              <div className={styles.mellowPartyEmail}>{INVOICE.fromEmail}</div>
            </div>
            <div className={styles.mellowPartyRight}>
              <div className={styles.mellowPartyName}>to {INVOICE.toName}</div>
              <div className={styles.mellowPartyEmail}>{INVOICE.toEmail}</div>
            </div>
          </div>

          <div className={styles.mellowTable}>
            <div className={styles.mellowTableHead}>
              <span>Description</span>
              <span className={styles.right}>Quantity</span>
              <span className={styles.right}>Price per unit</span>
              <span className={styles.right}>Amount</span>
            </div>
            <div className={styles.mellowTableRow}>
              <span className={styles.mellowDesc}>{INVOICE.description}</span>
              <span className={styles.right}>{INVOICE.quantity}</span>
              <span className={styles.right}>{fmtEur(INVOICE.unitPrice)}</span>
              <span className={styles.right}>{fmtEur(INVOICE.amount)}</span>
            </div>
          </div>

          <div className={styles.mellowMeta}>
            <div>
              <div className={styles.mellowMetaLbl}>Service category</div>
              <div className={styles.mellowMetaVal}>{INVOICE.serviceCategory}</div>
            </div>
            <div>
              <div className={styles.mellowMetaLbl}>Work period</div>
              <div className={styles.mellowMetaVal}>
                {INVOICE.workPeriodStart} - {INVOICE.workPeriodEnd}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mellowPayCard}>
          <div className={styles.mellowPayTitle}>Payment options</div>

          <div className={styles.mellowConfirmCard}>
            <div className={styles.mellowConfirmTitle}>
              {verified ? "Company verified" : "Confirm your company details to continue"}
            </div>
            <div className={styles.mellowConfirmSub}>
              {verified
                ? "Studio M is verified with Mellow. You can pay this invoice with any method below."
                : "You only need to verify once. If you've paid with Mellow before, you can confirm your saved company details and continue from there."}
            </div>
            <div className={styles.mellowConfirmActions}>
              {verified ? (
                <span className={styles.mellowConfirmDone}>Verification passed</span>
              ) : (
                <>
                  <button type="button" className={styles.mellowConfirmPrimary} onClick={onVerify}>
                    Verify company
                  </button>
                  <button type="button" className={styles.mellowConfirmGhost} disabled title="Out of scope for this prototype">
                    Use saved details
                  </button>
                </>
              )}
            </div>
            <div className={styles.mellowConfirmFootnote}>
              By continuing, you agree to Mellow's{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>,{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>Acceptable Use</a> and{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>. You'll only see
              important payment updates and notes (no marketing).
            </div>
          </div>

          <div className={styles.mellowPayGrid}>
            <div className={styles.mellowPayOption}>
              <div className={styles.mellowPayOptionName}>Bank transfer</div>
              <div className={styles.mellowPayOptionFee}>
                Includes {INVOICE.bank.feePct}% fee ({fmtEur(INVOICE.bank.fee)})
              </div>
              <div className={styles.mellowPayOptionTotal}>{fmtEur(INVOICE.bank.total)}</div>
              <button type="button" className={styles.mellowPayOptionDownload}>
                Download invoice
              </button>
            </div>
            <div className={styles.mellowPayOption}>
              <div className={styles.mellowPayOptionName}>Card payment</div>
              <div className={styles.mellowPayOptionFee}>
                Includes {INVOICE.card.feePct}% fee ({fmtEur(INVOICE.card.fee)})
              </div>
              <div className={styles.mellowPayOptionTotal}>{fmtEur(INVOICE.card.total)}</div>
              <button
                type="button"
                className={styles.mellowPayOptionBtn}
                onClick={verified ? onPaid : undefined}
                disabled={!verified}
              >
                Pay {fmtEur(INVOICE.card.total)}
              </button>
            </div>
          </div>
        </div>

        <button type="button" className={styles.mellowSupportBtn} aria-label="Support">
          ?
        </button>
      </main>
    </div>
  );
}

/* ============================================================
   Sumsub verification modal — sits on top of Mellow invoice page
   Happy path only: Intro → Verifying → Passed.
   ============================================================ */

function SumsubBackdrop({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <>
      <StepPaymentPage verified={false} onVerify={() => {}} onPaid={() => {}} />
      <div className={styles.sumsubBackdrop} role="dialog" aria-modal="true" onClick={onClose}>
        <div className={styles.sumsubFrame} onClick={(e) => e.stopPropagation()}>
          <div className={styles.sumsubBar}>
            <span className={styles.sumsubBarTitle}>Verification</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button type="button" className={styles.sumsubLang}>En</button>
              <button
                type="button"
                className={styles.sumsubClose}
                aria-label="Close"
                onClick={onClose}
              >
                ×
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

function StepSumsubIntro({ goNext, onClose }: { goNext: () => void; onClose: () => void }) {
  return (
    <SumsubBackdrop onClose={onClose}>
      <div className={styles.sumsubBody}>
        <h2 className={styles.sumsubTitle}>Let's get you verified</h2>
        <ol className={styles.sumsubSteps}>
          <li className={styles.sumsubStep}>
            <span className={styles.sumsubStepIcon}>🪪</span>
            <span>
              <span className={styles.sumsubStepName}>Step 1</span>
              <div className={styles.sumsubStepLabel}>Provide identity document</div>
            </span>
          </li>
          <li className={styles.sumsubStep}>
            <span className={styles.sumsubStepIcon}>👁</span>
            <span>
              <span className={styles.sumsubStepName}>Step 2</span>
              <div className={styles.sumsubStepLabel}>Perform a liveness check</div>
            </span>
          </li>
          <li className={styles.sumsubStep}>
            <span className={styles.sumsubStepIcon}>🏠</span>
            <span>
              <span className={styles.sumsubStepName}>Step 3</span>
              <div className={styles.sumsubStepLabel}>Provide proof of address</div>
            </span>
          </li>
        </ol>

        <div className={styles.sumsubBoost}>
          <span className={styles.sumsubBoostIcon} aria-hidden>⚡</span>
          <span>
            <span className={styles.sumsubBoostStrong}>Speed up your verification with Sumsub ID</span>
            <br />
            Sumsub ID stores your previously verified data to speed up the verification process.
          </span>
        </div>
      </div>
      <div className={styles.sumsubFlowFooter}>
        <button type="button" className={styles.sumsubPrimaryBtn} onClick={goNext}>
          Start verification
        </button>
        <div className={styles.sumsubFooter}>
          Powered by <strong>sumsub</strong>
        </div>
      </div>
    </SumsubBackdrop>
  );
}

function StepSumsubVerifying({ goNext, onClose }: { goNext: () => void; onClose: () => void }) {
  return (
    <SumsubBackdrop onClose={onClose}>
      <div className={styles.sumsubBody}>
        <div className={styles.sumsubCenter}>
          <span className={styles.sumsubBigIconWait} aria-hidden>⌛</span>
          <div className={styles.sumsubCenterTitle}>We're verifying your data</div>
          <div className={styles.sumsubCenterSub}>
            This may take up to one business day. We'll email you as soon as it's done — feel free
            to close this window.
          </div>
          <ul className={styles.sumsubProgressList}>
            <li className={`${styles.sumsubProgressItem} ${styles.sumsubProgressItemDone}`}>
              Company info
            </li>
            <li className={`${styles.sumsubProgressItem} ${styles.sumsubProgressItemDone}`}>
              Connected parties
            </li>
            <li className={`${styles.sumsubProgressItem} ${styles.sumsubProgressItemActive}`}>
              Verification in progress
            </li>
            <li className={`${styles.sumsubProgressItem} ${styles.sumsubProgressItemPending}`}>
              Documents on hand
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.sumsubFlowFooter}>
        <button type="button" className={styles.sumsubPrimaryBtn} onClick={goNext}>
          Skip wait — see result (demo)
        </button>
        <div className={styles.sumsubFooter}>
          Powered by <strong>sumsub</strong>
        </div>
      </div>
    </SumsubBackdrop>
  );
}

function StepSumsubPassed({ goNext, onClose }: { goNext: () => void; onClose: () => void }) {
  return (
    <SumsubBackdrop onClose={onClose}>
      <div className={styles.sumsubBody}>
        <div className={styles.sumsubCenter}>
          <span className={styles.sumsubBigIconOk} aria-hidden>✓</span>
          <div className={styles.sumsubCenterTitle}>Verification passed</div>
          <div className={styles.sumsubCenterSub}>
            Your company has been verified. You can now pay this invoice with any method.
          </div>
        </div>
      </div>
      <div className={styles.sumsubFlowFooter}>
        <button type="button" className={styles.sumsubPrimaryBtn} onClick={goNext}>
          Continue to payment
        </button>
        <div className={styles.sumsubFooter}>
          Powered by <strong>sumsub</strong>
        </div>
      </div>
    </SumsubBackdrop>
  );
}


/* ============================================================
   Root
   ============================================================ */

export function CandidateInvoicePaymentScreen() {
  const [step, setStep] = useState<StepId>("candidates_list");
  const idx = STEPS.findIndex((s) => s.id === step);

  const goNext = () => {
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id);
  };
  const goBack = () => {
    if (idx > 0) setStep(STEPS[idx - 1].id);
  };
  const jumpTo = (id: StepId) => setStep(id);

  let content: React.ReactNode;
  switch (step) {
    case "candidates_list":
      content = <StepCandidatesList openApplication={() => setStep("application_new")} />;
      break;
    case "application_new":
      content = (
        <StepApplication
          state="new"
          onPrimary={() => setStep("application_in_talks")}
          onClose={() => setStep("candidates_list")}
        />
      );
      break;
    case "application_in_talks":
      content = (
        <StepApplication
          state="in_talks"
          onPrimary={() => setStep("application_deal_settled")}
          onClose={() => setStep("candidates_list")}
        />
      );
      break;
    case "application_deal_settled":
      content = (
        <StepApplication
          state="deal_settled"
          onPrimary={() => setStep("payment")}
          onClose={() => setStep("candidates_list")}
        />
      );
      break;
    case "payment":
      content = (
        <StepPaymentPage
          verified={false}
          onVerify={() => setStep("sumsub_intro")}
          onPaid={() => {}}
        />
      );
      break;
    case "sumsub_intro":
      content = (
        <StepSumsubIntro
          goNext={() => setStep("sumsub_verifying")}
          onClose={() => setStep("payment")}
        />
      );
      break;
    case "sumsub_verifying":
      content = (
        <StepSumsubVerifying
          goNext={() => setStep("sumsub_passed")}
          onClose={() => setStep("payment")}
        />
      );
      break;
    case "sumsub_passed":
      content = (
        <StepSumsubPassed
          goNext={() => setStep("payment_verified")}
          onClose={() => setStep("payment_verified")}
        />
      );
      break;
    case "payment_verified":
      content = (
        <StepPaymentPage
          verified={true}
          onVerify={() => {}}
          onPaid={() => setStep("application_paid")}
        />
      );
      break;
    case "application_paid":
      content = (
        <StepApplication
          state="paid"
          onPrimary={() => {}}
          onClose={() => setStep("candidates_list")}
        />
      );
      break;
  }

  return (
    <div className={styles.root}>
      <PrototypeBar step={step} idx={idx} goNext={goNext} goBack={goBack} jump={jumpTo} />
      <div className={styles.canvas}>{content}</div>
    </div>
  );
}
