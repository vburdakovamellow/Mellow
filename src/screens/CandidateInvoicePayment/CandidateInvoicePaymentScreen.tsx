import { useState } from "react";
import styles from "./CandidateInvoicePaymentScreen.module.css";

/**
 * ВЕТКА: fm/candidate-invoice-payment-flow (+ escrow split)
 *
 * Прототип всего пути от открытия реквеста до оплаты подрядчику.
 * Один файл, две гипотезы пути — переключатель сверху:
 *
 *  • Pay-on-delivery (Verify) — фрил выбрал в КП «оплата по факту работы».
 *    Mellow выпускает инвойс, заказчик оплачивает с my.mellow.io. 12 шагов.
 *  • Secure deal (Escrow / Offer) — фрил выбрал «безопасную сделку».
 *    Заказчик принимает КП → онбординг в CoR → ждёт оффер от фрила →
 *    принимает оффер → оплачивает через баланс CoR. 14 шагов.
 *
 * Все статусы кандидата живут ВНУТРИ одной и той же модалки карточки —
 * меняются только pill, кнопка и доп. блок. Модалка не закрывается между
 * переходами; фоном остаётся Candidates list. Это правило справедливо для
 * обоих флоу.
 *
 * Verify (12 шагов, happy path):
 *  Scout
 *   01. Candidates list — раздел кабинета по реквесту, фильтры AI Match / Applied / Shortlisted.
 *   02. Application · Shortlisted — модалка с CV, кнопка Request proposal.
 *   03. Application · In Talks · waiting for proposal — Accept proposal disabled.
 *   04. Application · In Talks · proposal received — пропоузал от Jessica.
 *   05. Application · Deal settled · awaiting invoice — фрил готовит инвойс.
 *   06. Application · Deal settled · invoice ready — кнопка Pay invoice активна.
 *  Mellow (my.mellow.io · branded)
 *   07. Invoice page (pre-verify) — Confirm your company details, Pay disabled.
 *  Sumsub (modal над Mellow)
 *   08. Let's get you verified — 3 шага (identity, liveness, address).
 *   09. We're verifying your data.
 *   10. Verification passed.
 *  Mellow
 *   11. Invoice page (Pay enabled).
 *  Scout
 *   12. Application · Paid — pill PAID, receipt, история.
 *
 * Escrow / Offer (14 шагов, customer side, happy path):
 *  Шаги 01–04 общие с Verify.
 *  Scout
 *   05e. Application · Deal settled · onboarding required — фрил выбрал escrow,
 *        мы зовём заказчика настроить компанию в CoR. CTA "Continue in CoR".
 *  Mellow CoR (my.mellow.io · CoR section)
 *   06e. CoR Company · Verification required — empty company details + плашка
 *        "What to do next" с тремя действиями (Verify / W-9 / Offer Agreement).
 *   07e. CoR Company · Verified — данные заполнены, Verified, плашка свёрнута.
 *  Scout
 *   08e. Application · Deal settled · awaiting offer — pill DEAL SETTLED, ждём оффер.
 *  Mellow CoR
 *   09e. CoR Offers · empty — empty state с illustration + текстом про скоро прибудет.
 *   10e. CoR Offers · list — оффер от Jessica прилетел, статус NEW.
 *   11e. CoR Offer detail · New — Accept / Decline.
 *   12e. CoR Offer detail · Pending payment — Use your balance / Download invoice.
 *   13e. CoR Offer detail · Paid — статус-степпер залит, "Contractor has received the money".
 *  Scout
 *   14e. Application · Paid (offer) — финальный pill PAID, описание escrow-сделки.
 *
 * Стили:
 *  - Scout — строго ч/б (#000/#fff/#666/#e5e5e5), один шрифт var(--ds-font-family-body).
 *  - my.mellow.io (Verify invoice) — брендовая, повторяет live-страницу.
 *  - my.mellow.io (CoR) — брендовая CoR-страница: бежевый фон #f6efe2, левый
 *    сайдбар с балансом, основная зона с карточками, мелкие orange-акценты
 *    для статусов и primary CTA (как в реальном продукте).
 *  - Sumsub — модалка-оверлей над Mellow page.
 */

type FlowId = "verify" | "escrow";

type StepId =
  // Shared (01–04)
  | "candidates_list"
  | "application_shortlisted"
  | "application_in_talks_waiting"
  | "application_in_talks_received"
  // Verify-only (05–12)
  | "application_deal_settled_waiting"
  | "application_deal_settled"
  | "payment"
  | "sumsub_intro"
  | "sumsub_verifying"
  | "sumsub_passed"
  | "payment_verified"
  | "application_paid"
  // Escrow-only (05e–14e)
  | "application_deal_settled_onboarding"
  | "cor_company_unverified"
  | "cor_company_verified"
  | "application_deal_settled_awaiting_offer"
  | "cor_offers_empty"
  | "cor_offers_list"
  | "cor_offer_new"
  | "cor_offer_pending_payment"
  | "cor_offer_paid"
  | "application_offer_paid";

type StepGroup = "Scout" | "Mellow" | "Sumsub" | "CoR";

type StepDef = { id: StepId; name: string; short: string; group: StepGroup };

const STEPS_VERIFY: StepDef[] = [
  { id: "candidates_list", name: "01. Scout · Candidates list", short: "Candidates list", group: "Scout" },
  { id: "application_shortlisted", name: "02. Scout · Application · Shortlisted (modal)", short: "Application · Shortlisted", group: "Scout" },
  { id: "application_in_talks_waiting", name: "03. Scout · Application · In Talks · waiting for proposal (modal)", short: "In Talks · waiting", group: "Scout" },
  { id: "application_in_talks_received", name: "04. Scout · Application · In Talks · proposal received (modal)", short: "In Talks · proposal received", group: "Scout" },
  { id: "application_deal_settled_waiting", name: "05. Scout · Application · Deal settled · awaiting invoice (modal)", short: "Deal settled · awaiting invoice", group: "Scout" },
  { id: "application_deal_settled", name: "06. Scout · Application · Deal settled · invoice ready (modal)", short: "Deal settled · invoice ready", group: "Scout" },
  { id: "payment", name: "07. my.mellow.io · Invoice page (verify required)", short: "Invoice (pre-verify)", group: "Mellow" },
  { id: "sumsub_intro", name: "08. Sumsub · Let's get you verified", short: "Sumsub · intro", group: "Sumsub" },
  { id: "sumsub_verifying", name: "09. Sumsub · We're verifying your data", short: "Sumsub · verifying", group: "Sumsub" },
  { id: "sumsub_passed", name: "10. Sumsub · Verification passed", short: "Sumsub · passed", group: "Sumsub" },
  { id: "payment_verified", name: "11. my.mellow.io · Invoice page (Pay enabled)", short: "Invoice (Pay)", group: "Mellow" },
  { id: "application_paid", name: "12. Scout · Application · Paid (modal)", short: "Application · Paid", group: "Scout" },
];

const STEPS_ESCROW: StepDef[] = [
  // 01–04 shared with Verify
  { id: "candidates_list", name: "01. Scout · Candidates list", short: "Candidates list", group: "Scout" },
  { id: "application_shortlisted", name: "02. Scout · Application · Shortlisted (modal)", short: "Application · Shortlisted", group: "Scout" },
  { id: "application_in_talks_waiting", name: "03. Scout · Application · In Talks · waiting for proposal (modal)", short: "In Talks · waiting", group: "Scout" },
  { id: "application_in_talks_received", name: "04. Scout · Application · In Talks · proposal received (modal)", short: "In Talks · proposal received", group: "Scout" },
  // 05e–14e escrow
  { id: "application_deal_settled_onboarding", name: "05. Scout · Application · Deal settled · onboarding required (modal)", short: "Deal settled · CoR onboarding", group: "Scout" },
  { id: "cor_company_unverified", name: "06. my.mellow.io · CoR · Company (Verification required)", short: "CoR · Company (unverified)", group: "CoR" },
  { id: "cor_company_verified", name: "07. my.mellow.io · CoR · Company (Verified)", short: "CoR · Company (verified)", group: "CoR" },
  { id: "application_deal_settled_awaiting_offer", name: "08. Scout · Application · Deal settled · awaiting offer (modal)", short: "Deal settled · awaiting offer", group: "Scout" },
  { id: "cor_offers_empty", name: "09. my.mellow.io · CoR · Offers (empty state)", short: "CoR · Offers (empty)", group: "CoR" },
  { id: "cor_offers_list", name: "10. my.mellow.io · CoR · Offers (offer received)", short: "CoR · Offers (list)", group: "CoR" },
  { id: "cor_offer_new", name: "11. my.mellow.io · CoR · Offer detail · New", short: "CoR · Offer · New", group: "CoR" },
  { id: "cor_offer_pending_payment", name: "12. my.mellow.io · CoR · Offer detail · Pending payment", short: "CoR · Offer · Pending payment", group: "CoR" },
  { id: "cor_offer_paid", name: "13. my.mellow.io · CoR · Offer detail · Paid", short: "CoR · Offer · Paid", group: "CoR" },
  { id: "application_offer_paid", name: "14. Scout · Application · Paid via escrow (modal)", short: "Application · Paid (escrow)", group: "Scout" },
];

const FLOW_LABEL: Record<FlowId, string> = {
  verify: "Pay-on-delivery (invoice)",
  escrow: "Secure deal (escrow / offer)",
};

const getStepsForFlow = (flow: FlowId): StepDef[] =>
  flow === "verify" ? STEPS_VERIFY : STEPS_ESCROW;

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
   Demo data (escrow flow · CoR side)
   ============================================================ */

/**
 * The proposal price is the same €1,200 quote, but the fee model differs:
 * client pays the gross, Mellow's fee is taken from contractor's payout.
 * So the customer is charged €1,200 flat (matches what they agreed in КП),
 * the contractor receives €1,200 minus 5% Mellow fee = €1,140 net.
 */
const OFFER = {
  number: "OFR-21988",
  receivedAt: "Apr 27, 2026",
  deadline: "Apr 30, 2026, 14:00",
  description: "Social media visual kit — Q2 sprint",
  contractorName: "Jessica Martinez",
  contractorLocation: "Lisbon, Portugal",
  service: "Graphic design / Social media visuals",
  attributes: [
    { label: "Quantity", value: "40 h" },
    { label: "Language", value: "English" },
    { label: "Brand", value: "Studio M" },
  ],
  clientPays: 1200,
  contractorReceives: 1200,
  feePct: 5,
  fee: 60,
  contractorNet: 1140,
  paidAt: "Apr 27, 2026",
};

/**
 * Studio M company shell created in CoR after the proposal is accepted.
 * Modeled US-based to demonstrate the W-9 step (it only appears for US
 * incorporations). The offer itself is still priced in EUR — Mellow CoR
 * is multi-currency.
 */
const COR_COMPANY = {
  name: "Studio M LLC",
  contactName: "Doe Jane",
  contactEmail: "billing@studio-m.com",
  size: "Under 50",
  country: "United States",
  countryCode: "🇺🇸",
  currency: "USD ($)",
  isUS: true, // controls whether the W-9 step is shown in the checklist
  registrationNumber: "0429641",
  taxId: "EIN 35-6456003",
  address: {
    line: "1209 Orange Street",
    city: "Wilmington",
    zip: "19801",
    region: "DE",
    country: "United States",
  },
  // Customer balance after a top-up — used on the Offer · Pending payment step.
  balanceTopUp: 1200,
};

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
  flow,
  onFlowChange,
  steps,
  step,
  idx,
  goNext,
  goBack,
  jump,
}: {
  flow: FlowId;
  onFlowChange: (next: FlowId) => void;
  steps: StepDef[];
  step: StepId;
  idx: number;
  goNext: () => void;
  goBack: () => void;
  jump: (id: StepId) => void;
}) {
  const current = steps[idx];
  const grouped: Record<StepGroup, StepDef[]> = { Scout: [], Mellow: [], CoR: [], Sumsub: [] };
  steps.forEach((s) => grouped[s.group].push(s));
  const groupOrder: StepGroup[] = ["Scout", "Mellow", "CoR", "Sumsub"];

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
          Step {idx + 1} / {steps.length}
        </span>
        <span className={styles.protoStepName}>
          {current.group} · {current.short}
        </span>
      </div>
      <div className={styles.protoCenter} role="tablist" aria-label="Flow">
        {(Object.keys(FLOW_LABEL) as FlowId[]).map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={flow === f}
            className={`${styles.protoFlowTab} ${flow === f ? styles.protoFlowTabActive : ""}`}
            onClick={() => onFlowChange(f)}
          >
            {FLOW_LABEL[f]}
          </button>
        ))}
      </div>
      <div className={styles.protoRight}>
        <select
          aria-label="Jump to step"
          value={step}
          onChange={(e) => jump(e.target.value as StepId)}
          className={styles.protoBtn}
        >
          {groupOrder
            .filter((g) => grouped[g].length > 0)
            .map((g) => (
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
          disabled={idx === steps.length - 1}
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

type AppState =
  | "shortlisted"
  | "in_talks_waiting"
  | "in_talks_received"
  // verify flow
  | "deal_settled_waiting"
  | "deal_settled"
  | "paid"
  // escrow flow
  | "deal_settled_onboarding"
  | "deal_settled_awaiting_offer"
  | "offer_paid";

const PILLS: Record<AppState, string> = {
  shortlisted: "Shortlisted",
  in_talks_waiting: "In Talks",
  in_talks_received: "In Talks",
  deal_settled_waiting: "Deal settled",
  deal_settled: "Deal settled",
  paid: "Paid",
  deal_settled_onboarding: "Deal settled",
  deal_settled_awaiting_offer: "Deal settled",
  offer_paid: "Paid",
};

const PRIMARY_ACTIONS: Record<AppState, { label: string; hint?: string }> = {
  shortlisted: { label: "Request proposal", hint: "We'll email Jessica and ask her to send a proposal." },
  in_talks_waiting: { label: "Accept proposal", hint: "Available once Jessica sends a proposal." },
  in_talks_received: { label: "Accept proposal", hint: "Accepting locks the deal — Jessica then drafts an invoice." },
  deal_settled_waiting: { label: "Pay invoice", hint: "Available once Jessica sends the invoice." },
  deal_settled: { label: "Pay invoice — €1,260.00", hint: "Opens Mellow's secure invoice page." },
  paid: { label: "Download receipt" },
  deal_settled_onboarding: {
    label: "Continue in CoR",
    hint: "Set up Studio M in Contractor of Record so Jessica can send a secure offer.",
  },
  deal_settled_awaiting_offer: {
    label: "Open offer",
    hint: "Available once Jessica sends a secure offer through CoR.",
  },
  offer_paid: { label: "Download receipt" },
};

function StatusBlock({ state }: { state: AppState }) {
  if (state === "shortlisted") return null;

  if (state === "in_talks_waiting") {
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

  if (state === "in_talks_received") {
    return (
      <div className={styles.modalStatusBlock}>
        <div className={styles.modalStatusTitle}>Proposal from Jessica</div>
        <div className={styles.modalStatusBody}>
          "Thanks for the brief — here's what I'd suggest for your Q2 sprint. Two focused weeks:
          moodboard and ad-set frames in week one, motion-ready layouts and a reusable template kit
          in week two. Happy to tweak any of this before we lock it in."
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
            <dt>Total</dt>
            <dd>€1,200.00</dd>
          </div>
        </dl>
      </div>
    );
  }

  if (state === "deal_settled_waiting") {
    return (
      <div className={styles.modalStatusBlock}>
        <div className={styles.modalStatusTitle}>Awaiting invoice from Jessica</div>
        <div className={styles.modalStatusBody}>
          Jessica accepted the deal and is preparing an invoice through Mellow. As soon as she
          sends it, the amount appears here and Pay invoice unlocks — no email back-and-forth,
          no chasing the freelancer for paperwork.
        </div>
        <ul className={styles.modalStatusSteps}>
          <li className={styles.modalStatusStepDone}>Proposal accepted · Apr 26, 2026</li>
          <li className={styles.modalStatusStepActive}>Awaiting invoice · usually within 1 business day</li>
          <li className={styles.modalStatusStepPending}>Pay invoice → Mellow processes the payment</li>
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

  if (state === "deal_settled_onboarding") {
    return (
      <div className={styles.modalStatusBlock}>
        <div className={styles.modalStatusTitle}>Continue in CoR to receive Jessica's offer</div>
        <div className={styles.modalStatusBody}>
          Jessica accepted the deal and will issue a secure offer — Mellow holds your payment in
          escrow and releases it to her on delivery. To unlock the offer, finish setting up Studio M
          in Contractor of Record (CoR): verify the company, accept the Offer Agreement, and submit
          the W-9.
        </div>
        <ul className={styles.modalStatusSteps}>
          <li className={styles.modalStatusStepDone}>Proposal accepted · Apr 26, 2026</li>
          <li className={styles.modalStatusStepActive}>CoR onboarding · Studio M not verified yet</li>
          <li className={styles.modalStatusStepPending}>Awaiting offer from Jessica</li>
          <li className={styles.modalStatusStepPending}>Pay offer → Mellow releases funds on delivery</li>
        </ul>
      </div>
    );
  }

  if (state === "deal_settled_awaiting_offer") {
    return (
      <div className={styles.modalStatusBlock}>
        <div className={styles.modalStatusTitle}>Awaiting offer from Jessica</div>
        <div className={styles.modalStatusBody}>
          Studio M is verified in CoR and ready to receive offers. Jessica is preparing a secure
          offer through Mellow — as soon as she sends it, you'll see it under CoR · Offers and can
          pay it with your balance. No paperwork chase, no separate bank transfer.
        </div>
        <ul className={styles.modalStatusSteps}>
          <li className={styles.modalStatusStepDone}>Proposal accepted · Apr 26, 2026</li>
          <li className={styles.modalStatusStepDone}>CoR onboarding · Studio M verified</li>
          <li className={styles.modalStatusStepActive}>Awaiting offer · usually within 1 business day</li>
          <li className={styles.modalStatusStepPending}>Pay offer → Mellow releases funds on delivery</li>
        </ul>
      </div>
    );
  }

  if (state === "offer_paid") {
    return (
      <div className={styles.modalStatusBlock}>
        <div className={styles.modalStatusTitle}>Paid via Mellow escrow · {fmtEur(OFFER.clientPays)}</div>
        <div className={styles.modalStatusBody}>
          Funds are held by Mellow and released to Jessica when she marks the work delivered. Receipt
          and offer documents are synced to this card and to CoR · Offers.
        </div>
        <dl className={styles.modalKv}>
          <div>
            <dt>Offer</dt>
            <dd>No {OFFER.number}</dd>
          </div>
          <div>
            <dt>Method</dt>
            <dd>Mellow balance (escrow)</dd>
          </div>
          <div>
            <dt>You paid</dt>
            <dd>{fmtEur(OFFER.clientPays)}</dd>
          </div>
          <div>
            <dt>Contractor receives</dt>
            <dd>
              {fmtEur(OFFER.contractorNet)}
              <span className={styles.modalKvFootnote}> (5% Mellow fee covered by Jessica)</span>
            </dd>
          </div>
        </dl>
      </div>
    );
  }

  // paid (verify flow)
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
              {state === "shortlisted" && (
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
                    aria-label="Remove from shortlist"
                    title="Remove from shortlist"
                  >
                    ♥
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
              disabled={
                state === "paid" ||
                state === "offer_paid" ||
                state === "in_talks_waiting" ||
                state === "deal_settled_waiting" ||
                state === "deal_settled_awaiting_offer"
              }
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
   CoR (Contractor of Record) shell + screens — escrow flow
   my.mellow.io brand · cream surface · soft orange accents
   ============================================================ */

type CorNavKey = "tasks" | "team" | "company" | "analytics" | "documents" | "offers" | "services" | "profile";

function CorShell({
  children,
  active,
  showBalance,
  onNavCompany,
  onNavOffers,
}: {
  children: React.ReactNode;
  active: CorNavKey;
  showBalance: boolean;
  onNavCompany?: () => void;
  onNavOffers?: () => void;
}) {
  const NAV: { key: CorNavKey; label: string; available: boolean }[] = [
    { key: "tasks", label: "Tasks", available: showBalance },
    { key: "team", label: "Team", available: true },
    { key: "company", label: "Company", available: true },
    { key: "analytics", label: "Analytics", available: showBalance },
    { key: "documents", label: "Documents", available: true },
    { key: "offers", label: "Offers", available: true },
    { key: "services", label: "Services list", available: true },
    { key: "profile", label: "Profile", available: true },
  ];

  return (
    <div className={styles.corFrame}>
      <aside className={styles.corSidebar}>
        <div className={styles.corSidebarHead}>
          <div className={styles.corLogo}>mellow</div>
          <button type="button" className={styles.corBell} aria-label="Notifications">
            <span aria-hidden>♪</span>
          </button>
        </div>
        <div className={styles.corUserBlock}>
          <div className={styles.corUserName}>{COR_COMPANY.contactName}</div>
          <div className={styles.corUserEmail}>{COR_COMPANY.contactEmail}</div>
        </div>
        <button type="button" className={styles.corCompanyChip}>
          <span>{COR_COMPANY.name}</span>
          <span aria-hidden>→</span>
        </button>

        {showBalance && (
          <div className={styles.corBalance}>
            <div className={styles.corBalanceMain}>$0.00</div>
            <div className={styles.corBalanceRow}>
              <span>On hold</span>
              <span>$0.00</span>
            </div>
            <div className={styles.corBalanceRow}>
              <span>Tasks to pay</span>
              <span>$0.00</span>
            </div>
            <button type="button" className={styles.corAddFunds}>Add funds</button>
          </div>
        )}

        <nav className={styles.corNav} aria-label="CoR navigation">
          {NAV.filter((n) => n.available).map((n) => {
            const isActive = n.key === active;
            const onClick =
              n.key === "company" ? onNavCompany : n.key === "offers" ? onNavOffers : undefined;
            return (
              <button
                key={n.key}
                type="button"
                className={`${styles.corNavItem} ${isActive ? styles.corNavItemActive : ""}`}
                onClick={onClick}
              >
                <span className={styles.corNavIcon} aria-hidden>•</span>
                <span>{n.label}</span>
              </button>
            );
          })}
        </nav>

        <div className={styles.corSidebarFoot}>
          <button type="button" className={styles.corRateUs}>Rate us &amp; Get $25</button>
          <button type="button" className={styles.corLogOut}>Log out  ↪</button>
        </div>
      </aside>

      <div className={styles.corMain}>
        <div className={styles.corMainTopbar}>
          <button type="button" className={styles.corLangBtn}>🌐 EN</button>
          <button type="button" className={styles.corProductBtn}>
            <span>Contractor of Record</span>
            <span aria-hidden>▾</span>
          </button>
        </div>
        <div className={styles.corMainBody}>{children}</div>
        <footer className={styles.corMainFooter}>
          <div className={styles.corFooterLinks}>
            <a href="#" onClick={(e) => e.preventDefault()}>Help center</a>
            <a href="#" onClick={(e) => e.preventDefault()}>General Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()}>CoR Product Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          </div>
          <div className={styles.corFooterRates}>
            <span>Conversion rates</span>
            <span>€→₽ 79.401</span>
            <span>$→₽ 74.329</span>
            <span>€→$ 1.0576</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ----- CoR · Company page · shared layout ----- */

function CorCompanyPage({ verified }: { verified: boolean }) {
  const dash = "—";
  return (
    <>
      <h1 className={styles.corPageTitle}>Company</h1>

      <div className={styles.corTabs}>
        <button type="button" className={`${styles.corTab} ${styles.corTabActive}`}>Company details</button>
        <button type="button" className={styles.corTab}>Users</button>
        <button type="button" className={styles.corTab}>Integration</button>
        <button type="button" className={styles.corTab}>Taxes</button>
      </div>

      <div className={styles.corCompanyGrid}>
        <section className={styles.corCard}>
          <header className={styles.corCardHead}>
            <span className={styles.corCardIcon} aria-hidden>▣</span>
            <span className={styles.corCardTitle}>Company Details</span>
            <button type="button" className={styles.corCardEdit} aria-label="Edit">✎</button>
          </header>
          <dl className={styles.corDl}>
            <div><dt>Company name</dt><dd>{COR_COMPANY.name}</dd></div>
            <div><dt>Brand name</dt><dd className={verified ? "" : styles.corDdMuted}>{verified ? "Studio M" : dash}</dd></div>
            <div><dt>Company size</dt><dd>{COR_COMPANY.size}</dd></div>
            <div>
              <dt>Country of incorporation</dt>
              <dd>
                <span aria-hidden>{COR_COMPANY.countryCode}</span> {COR_COMPANY.country}
              </dd>
            </div>
            <div><dt>Currency</dt><dd>{COR_COMPANY.currency}</dd></div>
            <div><dt>Registration number</dt><dd className={verified ? "" : styles.corDdMuted}>{verified ? COR_COMPANY.registrationNumber : dash}</dd></div>
            <div><dt>EIN</dt><dd className={verified ? "" : styles.corDdMuted}>{verified ? COR_COMPANY.taxId : dash}</dd></div>
          </dl>
        </section>

        <section className={styles.corCard}>
          <header className={styles.corCardHead}>
            <span className={styles.corCardIcon} aria-hidden>W</span>
            <span className={styles.corCardTitle}>Contractor of Record Service</span>
          </header>
          <dl className={styles.corDl}>
            <div>
              <dt>Verification status</dt>
              <dd>
                {verified ? (
                  <span className={styles.corPillVerified}>✓ Verified</span>
                ) : (
                  <span className={styles.corPillNeedsAction}>Verification required</span>
                )}
              </dd>
            </div>
            <div>
              <dt>Contract</dt>
              <dd className={verified ? "" : styles.corDdMuted}>
                {verified ? "Mellow CoR · Master Service Agreement" : "Available after acceptance"}
              </dd>
            </div>
            <div>
              <dt>Service fee</dt>
              <dd className={verified ? "" : styles.corDdMuted}>
                {verified ? "5% on each offer · paid by contractor" : "Confirmed after activation"}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <section className={styles.corCard} style={{ marginTop: 16 }}>
        <header className={styles.corCardHead}>
          <span className={styles.corCardIcon} aria-hidden>◉</span>
          <span className={styles.corCardTitle}>Legal Address</span>
          <button type="button" className={styles.corCardEdit} aria-label="Edit">✎</button>
        </header>
        <dl className={styles.corDl}>
          <div><dt>Address</dt><dd className={verified ? "" : styles.corDdMuted}>{verified ? COR_COMPANY.address.line : dash}</dd></div>
          <div><dt>City</dt><dd className={verified ? "" : styles.corDdMuted}>{verified ? COR_COMPANY.address.city : dash}</dd></div>
          <div><dt>ZIP code</dt><dd className={verified ? "" : styles.corDdMuted}>{verified ? COR_COMPANY.address.zip : dash}</dd></div>
          <div><dt>State</dt><dd className={verified ? "" : styles.corDdMuted}>{verified ? COR_COMPANY.address.region : dash}</dd></div>
          <div><dt>Country</dt><dd className={verified ? "" : styles.corDdMuted}>{verified ? COR_COMPANY.address.country : dash}</dd></div>
        </dl>
      </section>
    </>
  );
}

/* ----- CoR · Onboarding panel (overlay) — shown on unverified company step ----- */

function CorOnboardingPanel({ onVerify }: { onVerify: () => void }) {
  return (
    <>
      <aside className={styles.corOnboardPanel}>
        <header className={styles.corOnboardHead}>
          <div>
            <div className={styles.corOnboardTitle}>What to do next</div>
            <div className={styles.corOnboardSub}>Actions to keep things moving</div>
          </div>
          <button type="button" className={styles.corOnboardClose} aria-label="Hide">×</button>
        </header>
        <ul className={styles.corOnboardList}>
          <li className={styles.corOnboardItemActive}>
            <button type="button" className={styles.corOnboardItemBtn} onClick={onVerify}>
              <span className={styles.corOnboardItemIcon} aria-hidden>🛡</span>
              <span className={styles.corOnboardItemBody}>
                <span className={styles.corOnboardItemName}>Verify your company</span>
                <span className={styles.corOnboardItemHint}>
                  Verify your company details through our trusted partner
                </span>
              </span>
              <span className={styles.corOnboardItemChev} aria-hidden>›</span>
            </button>
          </li>
          {COR_COMPANY.isUS && (
            <li className={styles.corOnboardItem}>
              <span className={styles.corOnboardItemIcon} aria-hidden>📄</span>
              <span className={styles.corOnboardItemBody}>
                <span className={styles.corOnboardItemName}>Complete the W-9 tax form for the US</span>
                <span className={styles.corOnboardItemHint}>
                  Required for companies in the United States
                </span>
              </span>
            </li>
          )}
          <li className={styles.corOnboardItem}>
            <span className={styles.corOnboardItemIcon} aria-hidden>✒</span>
            <span className={styles.corOnboardItemBody}>
              <span className={styles.corOnboardItemName}>Accept our Offer Agreement</span>
              <span className={styles.corOnboardItemHint}>
                Please review the agreement so we can move forward together
              </span>
            </span>
          </li>
        </ul>
      </aside>
      <button type="button" className={styles.corFinishSetup} onClick={onVerify}>
        <span aria-hidden>★</span> Finish setup
      </button>
    </>
  );
}

/* ----- 06e: CoR · Company unverified ----- */

function StepCorCompanyUnverified({
  goNext,
  onNavOffers,
}: {
  goNext: () => void;
  onNavOffers: () => void;
}) {
  return (
    <CorShell active="company" showBalance={false} onNavCompany={() => {}} onNavOffers={onNavOffers}>
      <CorCompanyPage verified={false} />
      <CorOnboardingPanel onVerify={goNext} />
    </CorShell>
  );
}

/* ----- 07e: CoR · Company verified (with success popup) ----- */

function StepCorCompanyVerified({
  goNext,
  onNavOffers,
}: {
  goNext: () => void;
  onNavOffers: () => void;
}) {
  const [popup, setPopup] = useState(true);
  return (
    <CorShell active="company" showBalance={true} onNavCompany={() => {}} onNavOffers={onNavOffers}>
      <CorCompanyPage verified={true} />
      {popup && (
        <div className={styles.corPopupBackdrop} role="dialog" aria-modal="true">
          <div className={styles.corPopup}>
            <button
              type="button"
              className={styles.corPopupClose}
              aria-label="Close"
              onClick={() => setPopup(false)}
            >
              ×
            </button>
            <div className={styles.corPopupArt} aria-hidden>
              <svg viewBox="0 0 200 140" width="200" height="140">
                <rect x="40" y="50" width="120" height="76" rx="4" fill="#ffffff" stroke="#000000" />
                <rect x="56" y="40" width="88" height="14" fill="#ffffff" stroke="#000000" />
                <rect x="68" y="64" width="6" height="50" fill="#000000" />
                <rect x="84" y="64" width="6" height="50" fill="#000000" />
                <rect x="100" y="64" width="6" height="50" fill="#000000" />
                <rect x="116" y="64" width="6" height="50" fill="#000000" />
                <polygon points="100,12 100,28 110,28 100,44" fill="#ed7a3a" />
              </svg>
            </div>
            <div className={styles.corPopupTitle}>You're all set!</div>
            <div className={styles.corPopupBody}>
              {COR_COMPANY.name} is verified, the Offer Agreement is signed, and your W-9 is on file.
              Mellow has activated your CoR account — Jessica can now send you a secure offer.
            </div>
            <button
              type="button"
              className={styles.corPopupPrimary}
              onClick={() => {
                setPopup(false);
                goNext();
              }}
            >
              Back to candidate
            </button>
          </div>
        </div>
      )}
    </CorShell>
  );
}

/* ----- 09e: CoR · Offers · empty state ----- */

function StepCorOffersEmpty({ onNavCompany }: { onNavCompany: () => void }) {
  return (
    <CorShell active="offers" showBalance={true} onNavCompany={onNavCompany} onNavOffers={() => {}}>
      <h1 className={styles.corPageTitle}>Offers</h1>
      <div className={styles.corOffersTable}>
        <div className={styles.corOffersHead}>
          <span>All</span>
          <span>Name</span>
          <span className={styles.right}>Deadline</span>
          <span className={styles.right}>Price</span>
          <span className={styles.right}>Status</span>
        </div>
        <div className={styles.corOffersEmptyRow}>
          <div className={styles.corOffersEmptyArt} aria-hidden>
            <svg viewBox="0 0 240 160" width="200" height="130">
              <rect x="40" y="48" width="160" height="96" rx="10" fill="#ffffff" stroke="#000000" />
              <rect x="40" y="48" width="160" height="22" rx="10" fill="#000000" />
              <rect x="58" y="84" width="124" height="8" rx="2" fill="#e5e5e5" />
              <rect x="58" y="100" width="84" height="8" rx="2" fill="#e5e5e5" />
              <rect x="58" y="116" width="100" height="8" rx="2" fill="#e5e5e5" />
              <circle cx="180" cy="56" r="14" fill="#ed7a3a" />
              <text x="180" y="62" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700" fontFamily="serif">!</text>
            </svg>
          </div>
          <div className={styles.corOffersEmptyTitle}>Your offer will appear here</div>
          <div className={styles.corOffersEmptyBody}>
            Once Jessica issues a secure offer through Mellow, it shows up in this list. You'll get
            an email and a notification — open the offer, accept it, and pay from your balance.
            Mellow holds the funds in escrow and releases them when Jessica delivers.
          </div>
        </div>
      </div>
    </CorShell>
  );
}

/* ----- 10e: CoR · Offers · list with Jessica's offer ----- */

function StepCorOffersList({
  openOffer,
  onNavCompany,
}: {
  openOffer: () => void;
  onNavCompany: () => void;
}) {
  return (
    <CorShell active="offers" showBalance={true} onNavCompany={onNavCompany} onNavOffers={() => {}}>
      <h1 className={styles.corPageTitle}>Offers</h1>
      <div className={styles.corOffersTable}>
        <div className={styles.corOffersHead}>
          <span>All</span>
          <span>Name</span>
          <span className={styles.right}>Deadline</span>
          <span className={styles.right}>Price</span>
          <span className={styles.right}>Status</span>
        </div>
        <button type="button" className={styles.corOffersRow} onClick={openOffer}>
          <span className={styles.corOffersRowId}>{OFFER.number.replace("OFR-", "")}</span>
          <span className={styles.corOffersRowName}>
            <span aria-hidden>＋</span> {OFFER.description}
          </span>
          <span className={styles.right}>{OFFER.deadline}</span>
          <span className={styles.right}>{fmtEur(OFFER.clientPays)}</span>
          <span className={styles.right}>
            <span className={styles.corStatusNew}>New</span>
          </span>
        </button>
      </div>
    </CorShell>
  );
}

/* ----- Offer detail · stepper helper ----- */

type OfferStage = "new" | "pending" | "paid";

function OfferStatusStepper({ stage }: { stage: OfferStage }) {
  // 5-stage stepper: New → Accepted → Funded → In escrow → Released
  const labels = ["New", "Accepted", "Funded", "In escrow", "Released"];
  const filledUpto = stage === "new" ? 1 : stage === "pending" ? 3 : 5;
  const activeIdx = stage === "pending" ? 3 : stage === "paid" ? 4 : 0;
  return (
    <div className={styles.offerStepper}>
      {labels.map((_, i) => {
        const cls =
          i < filledUpto - 1
            ? styles.offerStepDone
            : i === activeIdx
            ? styles.offerStepActive
            : styles.offerStepPending;
        return (
          <div key={i} className={`${styles.offerStepDot} ${cls}`} aria-label={labels[i]}>
            {i < filledUpto - 1 ? "✓" : i === activeIdx ? "•" : ""}
          </div>
        );
      })}
    </div>
  );
}

/* ----- Offer detail · shared layout ----- */

function CorOfferDetail({
  stage,
  onAccept,
  onPay,
}: {
  stage: OfferStage;
  onAccept?: () => void;
  onPay?: () => void;
}) {
  const stagePill =
    stage === "new" ? "New" : stage === "pending" ? "Pending payment" : "Paid";

  return (
    <>
      <button type="button" className={styles.corBackBtn}>← Back</button>

      <div className={styles.corOfferGrid}>
        <section className={styles.corCardWide}>
          <div className={styles.corOfferKicker}>№{OFFER.number.replace("OFR-", "")}</div>
          <h2 className={styles.corOfferTitle}>{OFFER.description}</h2>

          <div className={styles.corOfferBlocks}>
            <div className={styles.corOfferBlock}>
              <div className={styles.corOfferBlockLbl}>Status</div>
              <OfferStatusStepper stage={stage} />
              {stage === "new" && (
                <>
                  <div className={styles.corOfferStatusName}>New</div>
                </>
              )}
              {stage === "pending" && (
                <>
                  <div className={`${styles.corOfferStatusName} ${styles.corOfferStatusOrange}`}>
                    Pending payment
                  </div>
                  <p className={styles.corOfferStatusBody}>
                    Pay {fmtEur(OFFER.clientPays)} from your Mellow balance — we hold the funds in
                    escrow and release them to Jessica when she marks the work delivered.
                  </p>
                </>
              )}
              {stage === "paid" && (
                <>
                  <div className={`${styles.corOfferStatusName} ${styles.corOfferStatusGreen}`}>
                    Paid
                  </div>
                  <p className={styles.corOfferStatusBody}>
                    The contractor has received the money.
                  </p>
                </>
              )}
            </div>

            <div className={styles.corOfferBlock}>
              <div className={styles.corOfferBlockLbl}>Price</div>
              <div className={styles.corOfferKvRow}>
                <span>Client pays</span>
                <strong>{fmtEur(OFFER.clientPays)}</strong>
              </div>
              <div className={styles.corOfferKvRow}>
                <span>Contractor receives</span>
                <strong>{fmtEur(OFFER.contractorReceives)}</strong>
              </div>
              <div className={styles.corOfferKvRow}>
                <span>5% Mellow fee · paid by contractor</span>
                <strong>{fmtEur(OFFER.fee)}</strong>
              </div>
            </div>
          </div>

          <div className={styles.corOfferActionsRow}>
            <div className={styles.corOfferBlock} style={{ flex: 1 }}>
              <div className={styles.corOfferBlockLbl}>Actions</div>
              <div className={styles.corOfferKvRow}>
                <span>Contractor</span>
                <strong>{OFFER.contractorName}</strong>
              </div>
              <div className={styles.corOfferKvRow}>
                <span>Deadline</span>
                <strong>{OFFER.deadline}</strong>
              </div>
              <div className={styles.corOfferKvRow}>
                <span>Completed</span>
                <strong>{stage === "paid" ? OFFER.paidAt : "—"}</strong>
              </div>
              <div className={styles.corOfferKvRow}>
                <span>Paid</span>
                <strong>{stage === "paid" ? OFFER.paidAt : "—"}</strong>
              </div>
            </div>
          </div>

          {stage === "new" && (
            <div className={styles.corOfferCta}>
              <button type="button" className={styles.corPrimaryBtn} onClick={onAccept}>
                Accept
              </button>
              <button type="button" className={styles.corGhostBtn}>Decline</button>
            </div>
          )}
          {stage === "pending" && (
            <div className={styles.corOfferCta}>
              <button type="button" className={styles.corGhostBtn}>↓ Download invoice</button>
              <button type="button" className={styles.corPrimaryBtn} onClick={onPay}>
                Use your balance — {fmtEur(OFFER.clientPays)}
              </button>
            </div>
          )}
          {stage === "paid" && (
            <div className={styles.corOfferCta}>
              <button type="button" className={styles.corGhostBtn}>↓ Download receipt</button>
            </div>
          )}
        </section>

        <aside className={styles.corCard}>
          <div className={styles.corOfferDetailsHead}>
            <span>Details</span>
            <span className={styles.corOfferDetailsPill}>{stagePill}</span>
          </div>
          <dl className={styles.corDl}>
            <div><dt>Name</dt><dd>{OFFER.description}</dd></div>
            <div><dt>Price</dt><dd>{fmtEur(OFFER.clientPays)}</dd></div>
            <div><dt>Description</dt><dd>{OFFER.description}</dd></div>
            <div><dt>Contractor</dt><dd>{OFFER.contractorName}</dd></div>
            <div><dt>Service</dt><dd>{OFFER.service}</dd></div>
          </dl>
          <div className={styles.corOfferAttrs}>
            <div className={styles.corOfferAttrsTitle}>Attributes</div>
            {OFFER.attributes.map((a) => (
              <div key={a.label} className={styles.corOfferAttrRow}>
                <span>{a.label}:</span>
                <strong>{a.value}</strong>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

/* ----- 11e: Offer · New ----- */

function StepCorOfferNew({
  goNext,
  onNavCompany,
  onNavOffers,
}: {
  goNext: () => void;
  onNavCompany: () => void;
  onNavOffers: () => void;
}) {
  return (
    <CorShell active="offers" showBalance={true} onNavCompany={onNavCompany} onNavOffers={onNavOffers}>
      <CorOfferDetail stage="new" onAccept={goNext} />
    </CorShell>
  );
}

/* ----- 12e: Offer · Pending payment ----- */

function StepCorOfferPendingPayment({
  goNext,
  onNavCompany,
  onNavOffers,
}: {
  goNext: () => void;
  onNavCompany: () => void;
  onNavOffers: () => void;
}) {
  return (
    <CorShell active="offers" showBalance={true} onNavCompany={onNavCompany} onNavOffers={onNavOffers}>
      <CorOfferDetail stage="pending" onPay={goNext} />
    </CorShell>
  );
}

/* ----- 13e: Offer · Paid ----- */

function StepCorOfferPaid({
  onNavCompany,
  onNavOffers,
}: {
  onNavCompany: () => void;
  onNavOffers: () => void;
}) {
  return (
    <CorShell active="offers" showBalance={true} onNavCompany={onNavCompany} onNavOffers={onNavOffers}>
      <CorOfferDetail stage="paid" />
    </CorShell>
  );
}

/* ============================================================
   Root
   ============================================================ */

export function CandidateInvoicePaymentScreen() {
  const [flow, setFlow] = useState<FlowId>("verify");
  const [step, setStep] = useState<StepId>("candidates_list");

  const steps = getStepsForFlow(flow);
  const idx = steps.findIndex((s) => s.id === step);
  const safeIdx = idx === -1 ? 0 : idx;

  const goNext = () => {
    if (safeIdx < steps.length - 1) setStep(steps[safeIdx + 1].id);
  };
  const goBack = () => {
    if (safeIdx > 0) setStep(steps[safeIdx - 1].id);
  };
  const jumpTo = (id: StepId) => setStep(id);

  // When the user toggles flows, keep them on a shared step if possible,
  // otherwise reset to the first step of the new flow.
  const onFlowChange = (next: FlowId) => {
    setFlow(next);
    const nextSteps = getStepsForFlow(next);
    if (!nextSteps.some((s) => s.id === step)) {
      setStep(nextSteps[0].id);
    }
  };

  // After step 04, the primary action diverges by flow.
  const afterProposalAccepted: StepId =
    flow === "verify" ? "application_deal_settled_waiting" : "application_deal_settled_onboarding";

  let content: React.ReactNode;
  switch (step) {
    /* -------- Shared steps 01–04 -------- */
    case "candidates_list":
      content = <StepCandidatesList openApplication={() => setStep("application_shortlisted")} />;
      break;
    case "application_shortlisted":
      content = (
        <StepApplication
          state="shortlisted"
          onPrimary={() => setStep("application_in_talks_waiting")}
          onClose={() => setStep("candidates_list")}
        />
      );
      break;
    case "application_in_talks_waiting":
      content = (
        <StepApplication
          state="in_talks_waiting"
          onPrimary={() => {}}
          onClose={() => setStep("candidates_list")}
        />
      );
      break;
    case "application_in_talks_received":
      content = (
        <StepApplication
          state="in_talks_received"
          onPrimary={() => setStep(afterProposalAccepted)}
          onClose={() => setStep("candidates_list")}
        />
      );
      break;

    /* -------- Verify-only steps 05–12 -------- */
    case "application_deal_settled_waiting":
      content = (
        <StepApplication
          state="deal_settled_waiting"
          onPrimary={() => {}}
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

    /* -------- Escrow-only steps 05e–14e -------- */
    case "application_deal_settled_onboarding":
      content = (
        <StepApplication
          state="deal_settled_onboarding"
          onPrimary={() => setStep("cor_company_unverified")}
          onClose={() => setStep("candidates_list")}
        />
      );
      break;
    case "cor_company_unverified":
      content = (
        <StepCorCompanyUnverified
          goNext={() => setStep("cor_company_verified")}
          onNavOffers={() => setStep("cor_offers_empty")}
        />
      );
      break;
    case "cor_company_verified":
      content = (
        <StepCorCompanyVerified
          goNext={() => setStep("application_deal_settled_awaiting_offer")}
          onNavOffers={() => setStep("cor_offers_empty")}
        />
      );
      break;
    case "application_deal_settled_awaiting_offer":
      content = (
        <StepApplication
          state="deal_settled_awaiting_offer"
          onPrimary={() => {}}
          onClose={() => setStep("candidates_list")}
        />
      );
      break;
    case "cor_offers_empty":
      content = <StepCorOffersEmpty onNavCompany={() => setStep("cor_company_verified")} />;
      break;
    case "cor_offers_list":
      content = (
        <StepCorOffersList
          openOffer={() => setStep("cor_offer_new")}
          onNavCompany={() => setStep("cor_company_verified")}
        />
      );
      break;
    case "cor_offer_new":
      content = (
        <StepCorOfferNew
          goNext={() => setStep("cor_offer_pending_payment")}
          onNavCompany={() => setStep("cor_company_verified")}
          onNavOffers={() => setStep("cor_offers_list")}
        />
      );
      break;
    case "cor_offer_pending_payment":
      content = (
        <StepCorOfferPendingPayment
          goNext={() => setStep("cor_offer_paid")}
          onNavCompany={() => setStep("cor_company_verified")}
          onNavOffers={() => setStep("cor_offers_list")}
        />
      );
      break;
    case "cor_offer_paid":
      content = (
        <StepCorOfferPaid
          onNavCompany={() => setStep("cor_company_verified")}
          onNavOffers={() => setStep("cor_offers_list")}
        />
      );
      break;
    case "application_offer_paid":
      content = (
        <StepApplication
          state="offer_paid"
          onPrimary={() => {}}
          onClose={() => setStep("candidates_list")}
        />
      );
      break;
  }

  return (
    <div className={styles.root}>
      <PrototypeBar
        flow={flow}
        onFlowChange={onFlowChange}
        steps={steps}
        step={step}
        idx={safeIdx}
        goNext={goNext}
        goBack={goBack}
        jump={jumpTo}
      />
      <div className={styles.canvas}>{content}</div>
    </div>
  );
}
