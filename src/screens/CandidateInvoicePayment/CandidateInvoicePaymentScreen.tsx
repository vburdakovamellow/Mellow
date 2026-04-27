import { useMemo, useState } from "react";
import styles from "./CandidateInvoicePaymentScreen.module.css";

/**
 * ВЕТКА: fm/candidate-invoice-payment-flow
 *
 * Прототип алгоритма оплаты Scout → F2B (Путь Б — Инвойс), стартующий со
 * статуса "Deal settled" (КП от фрилансера принято менеджером).
 *
 * Сценарий:
 *  1. Scout · Deal settled  — ждём, пока фрил создаст инвойс.
 *  2. Scout · Invoice received — фрил выставил счёт, появляется кнопка Pay.
 *  3. my.mellow.io · Invoice page — менеджер улетает на существующую страницу
 *     оплаты Mellow (брендовая, как в проде).
 *  4. Scout · Paid — после оплаты статус закрывается, виден весь timeline.
 *
 * Стили:
 *  - Сторона Scout — строго ч/б (см. setup-checklist).
 *  - my.mellow.io — брендовая, повторяет существующую live-страницу
 *    (это уже работающий продукт, не мокап Scout).
 */

type StepId = "awaiting" | "received" | "payment" | "paid";

const STEPS: { id: StepId; name: string }[] = [
  { id: "awaiting", name: "1. Scout · Deal settled — awaiting invoice" },
  { id: "received", name: "2. Scout · Invoice received — Pay appears" },
  { id: "payment", name: "3. my.mellow.io · Invoice payment page" },
  { id: "paid", name: "4. Scout · Paid" },
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
};

const fmtEur = (v: number) =>
  `€${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ============================================================
   Timeline data — отражает все этапы пути кандидата в Scout.
   ============================================================ */

type TimelineEntry = {
  id: string;
  label: string;
  hint?: string;
  date: string;
};

const BASE_TIMELINE: TimelineEntry[] = [
  { id: "applied", label: "Applied", hint: "Inbound from request landing", date: "Apr 6, 2026" },
  { id: "in_review", label: "In Review", hint: "Manager opened CV", date: "Apr 7, 2026" },
  { id: "shortlist", label: "Shortlist", hint: "Added to shortlist", date: "Apr 9, 2026" },
  { id: "invite", label: "Invite Freelancer", hint: "Email intro sent", date: "Apr 11, 2026" },
  { id: "kp_requested", label: "Proposal requested", hint: "Manager asked for КП", date: "Apr 16, 2026" },
  { id: "kp_received", label: "Proposal received", hint: "Drafted in Radar", date: "Apr 18, 2026" },
  { id: "deal_settled", label: "Deal settled", hint: "Manager accepted КП", date: "Apr 19, 2026" },
];

const FUTURE_AWAITING_INVOICE: TimelineEntry = {
  id: "awaiting_invoice",
  label: "Awaiting invoice",
  hint: "Freelancer is preparing it in Mellow",
  date: "—",
};

const RECEIVED_ENTRY: TimelineEntry = {
  id: "invoice_received",
  label: "Invoice received",
  hint: "Ready to pay via Mellow",
  date: "Apr 27, 2026",
};

const PAID_ENTRY: TimelineEntry = {
  id: "paid",
  label: "Paid",
  hint: "Bank transfer · €1,260.00",
  date: "Apr 27, 2026",
};

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
        <span className={styles.protoStepName}>{STEPS[idx].name}</span>
      </div>
      <div className={styles.protoRight}>
        <select
          aria-label="Jump to step"
          value={step}
          onChange={(e) => jump(e.target.value as StepId)}
          className={styles.protoBtn}
        >
          {STEPS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
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
   ============================================================ */

function ScoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.scoutFrame}>
      <header className={styles.scoutHeader}>
        <div className={styles.scoutLogo}>Mellow Scout</div>
        <nav className={styles.scoutNav}>
          <span>Dashboard</span>
          <span className={styles.scoutNavActive}>Candidates</span>
          <span>Requests</span>
        </nav>
        <div className={styles.scoutHeaderRight}>
          <span>Studio M</span>
          <span className={styles.avatarSm}>SM</span>
        </div>
      </header>

      <div className={styles.breadcrumb}>
        <span className={styles.crumb}>Candidates</span>
        <span className={styles.crumbSep}>/</span>
        <span className={styles.crumb}>{REQUEST.title}</span>
        <span className={styles.crumbSep}>/</span>
        <span className={styles.crumbActive}>{CANDIDATE.name}</span>
      </div>

      {children}
    </div>
  );
}

/* ============================================================
   Reusable: Status banner
   ============================================================ */

function StatusBanner({
  pill,
  title,
  subtitle,
  tone = "default",
}: {
  pill: string;
  title: string;
  subtitle: string;
  tone?: "default" | "active" | "done";
}) {
  const cls =
    tone === "active"
      ? styles.bannerActive
      : tone === "done"
        ? styles.bannerDone
        : styles.bannerDefault;
  return (
    <div className={`${styles.banner} ${cls}`}>
      <span className={styles.bannerPill}>{pill}</span>
      <div>
        <div className={styles.bannerTitle}>{title}</div>
        <div className={styles.bannerSub}>{subtitle}</div>
      </div>
    </div>
  );
}

/* ============================================================
   Reusable: Candidate header card
   ============================================================ */

function CandidateHeader() {
  return (
    <div className={styles.candCard}>
      <div className={styles.candAvatar}>{CANDIDATE.initials}</div>
      <div className={styles.candMain}>
        <div className={styles.candName}>{CANDIDATE.name}</div>
        <div className={styles.candRole}>{CANDIDATE.role}</div>
        <div className={styles.candMetaRow}>
          <span>{CANDIDATE.location}</span>
          <span className={styles.dot}>·</span>
          <span>{CANDIDATE.rate}</span>
          <span className={styles.dot}>·</span>
          <span>{CANDIDATE.email}</span>
        </div>
      </div>
      <div className={styles.candMatch}>
        <div className={styles.candMatchVal}>{CANDIDATE.match}%</div>
        <div className={styles.candMatchLbl}>Match Score</div>
      </div>
    </div>
  );
}

/* ============================================================
   Reusable: Activity timeline
   ============================================================ */

function Timeline({ entries, activeId }: { entries: TimelineEntry[]; activeId: string }) {
  return (
    <aside className={styles.timeline}>
      <div className={styles.timelineTitle}>Activity</div>
      <ol className={styles.timelineList}>
        {entries.map((e, i) => {
          const isActive = e.id === activeId;
          const isFuture = e.date === "—";
          return (
            <li
              key={e.id}
              className={`${styles.tlItem} ${isActive ? styles.tlActive : ""} ${
                isFuture ? styles.tlFuture : ""
              }`}
            >
              <span className={styles.tlDot} aria-hidden />
              {i < entries.length - 1 && <span className={styles.tlLine} aria-hidden />}
              <div className={styles.tlBody}>
                <div className={styles.tlLabel}>{e.label}</div>
                {e.hint && <div className={styles.tlHint}>{e.hint}</div>}
                <div className={styles.tlDate}>{e.date}</div>
              </div>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

/* ============================================================
   STEP 1 — Deal settled, awaiting invoice
   ============================================================ */

function StepAwaiting() {
  const entries = useMemo(() => [...BASE_TIMELINE, FUTURE_AWAITING_INVOICE], []);
  return (
    <ScoutShell>
      <main className={styles.scoutBody}>
        <CandidateHeader />

        <StatusBanner
          pill="Deal settled"
          title="Awaiting invoice from freelancer"
          subtitle="Jessica is creating the invoice in Mellow. You'll get an email and a Pay button right here when it's ready."
          tone="default"
        />

        <div className={styles.bodyGrid}>
          <section className={styles.mainCol}>
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <div className={styles.panelTitle}>What's happening now</div>
                <div className={styles.panelHint}>Step 1 of 2 in payment flow</div>
              </div>
              <ol className={styles.checklist}>
                <li className={styles.checkDone}>
                  <span className={styles.checkBox} aria-hidden>✓</span>
                  <div>
                    <div className={styles.checkLabel}>Proposal accepted</div>
                    <div className={styles.checkSub}>Apr 19, 2026 — €1,200 for 40 h, Apr 14–25</div>
                  </div>
                </li>
                <li className={styles.checkActive}>
                  <span className={styles.checkBox} aria-hidden>•</span>
                  <div>
                    <div className={styles.checkLabel}>Freelancer creates invoice</div>
                    <div className={styles.checkSub}>
                      Jessica got an email with a pre-filled link. KYC is handled in Mellow if she
                      hasn't done it before.
                    </div>
                  </div>
                </li>
                <li className={styles.checkPending}>
                  <span className={styles.checkBox} aria-hidden>·</span>
                  <div>
                    <div className={styles.checkLabel}>Pay invoice</div>
                    <div className={styles.checkSub}>You'll see the Pay button here.</div>
                  </div>
                </li>
              </ol>

              <div className={styles.panelFooterMuted}>
                No action required from you right now. Average wait — under 24h.
              </div>
            </div>

            <div className={styles.panelGhost}>
              <div className={styles.panelGhostTitle}>Accepted proposal</div>
              <dl className={styles.kvList}>
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
                  <dt>Subtotal</dt>
                  <dd>€1,200.00</dd>
                </div>
              </dl>
            </div>
          </section>

          <Timeline entries={entries} activeId="awaiting_invoice" />
        </div>
      </main>
    </ScoutShell>
  );
}

/* ============================================================
   STEP 2 — Invoice received, Pay button visible
   ============================================================ */

function StepReceived({ goPay }: { goPay: () => void }) {
  const entries = useMemo(() => [...BASE_TIMELINE, RECEIVED_ENTRY], []);
  return (
    <ScoutShell>
      <main className={styles.scoutBody}>
        <CandidateHeader />

        <StatusBanner
          pill="Invoice received"
          title="Jessica sent an invoice for €1,260.00"
          subtitle="Pay it through Mellow to release work and keep this candidate active in your pipeline."
          tone="active"
        />

        <div className={styles.bodyGrid}>
          <section className={styles.mainCol}>
            <div className={styles.invoiceCardScout}>
              <div className={styles.invHead}>
                <div>
                  <div className={styles.invKicker}>Invoice from Jessica Martinez</div>
                  <div className={styles.invNo}>No {INVOICE.number} · Issued {INVOICE.issuedAt}</div>
                </div>
                <div className={styles.invTotalBlock}>
                  <div className={styles.invTotalLbl}>Total</div>
                  <div className={styles.invTotalVal}>{fmtEur(INVOICE.total)}</div>
                </div>
              </div>

              <div className={styles.invTable}>
                <div className={styles.invRowHead}>
                  <span>Description</span>
                  <span className={styles.right}>Quantity</span>
                  <span className={styles.right}>Price</span>
                  <span className={styles.right}>Amount</span>
                </div>
                <div className={styles.invRow}>
                  <span>{INVOICE.description}</span>
                  <span className={styles.right}>{INVOICE.quantity}</span>
                  <span className={styles.right}>{fmtEur(INVOICE.unitPrice)}</span>
                  <span className={styles.right}>{fmtEur(INVOICE.amount)}</span>
                </div>
              </div>

              <div className={styles.invMetaGrid}>
                <div>
                  <div className={styles.invMetaLbl}>Service category</div>
                  <div className={styles.invMetaVal}>{INVOICE.serviceCategory}</div>
                </div>
                <div>
                  <div className={styles.invMetaLbl}>Work period</div>
                  <div className={styles.invMetaVal}>
                    {INVOICE.workPeriodStart} — {INVOICE.workPeriodEnd}
                  </div>
                </div>
                <div>
                  <div className={styles.invMetaLbl}>Mellow fee</div>
                  <div className={styles.invMetaVal}>
                    {INVOICE.feePct}% ({fmtEur(INVOICE.fee)})
                  </div>
                </div>
                <div>
                  <div className={styles.invMetaLbl}>Payment method</div>
                  <div className={styles.invMetaVal}>Bank transfer (SEPA)</div>
                </div>
              </div>

              <div className={styles.invActions}>
                <button type="button" className={styles.btnPrimary} onClick={goPay}>
                  Pay invoice — {fmtEur(INVOICE.total)}
                </button>
                <button type="button" className={styles.btnGhost}>
                  View as PDF
                </button>
                <button type="button" className={styles.btnGhost}>
                  Message freelancer
                </button>
              </div>

              <div className={styles.invFootnote}>
                Pay opens Mellow's secure invoice page. Your company KYB and payment instructions
                stay there — Scout just hands off and updates the status when payment is captured.
              </div>
            </div>
          </section>

          <Timeline entries={entries} activeId="invoice_received" />
        </div>
      </main>
    </ScoutShell>
  );
}

/* ============================================================
   STEP 3 — my.mellow.io invoice page (branded, replicates live page)
   ============================================================ */

function StepPaymentPage({ onPaid }: { onPaid: () => void }) {
  return (
    <div className={styles.mellowFrame}>
      <div className={styles.mellowTopbar}>my.mellow.io</div>

      <header className={styles.mellowHeader}>
        <div className={styles.mellowLogo}>mellow</div>
        <span className={styles.mellowGradient} aria-hidden />
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
          <div className={styles.mellowPayTitle}>Payment Method</div>
          <div className={styles.mellowPayRow}>
            <div className={styles.mellowPayMethod}>
              <div className={styles.mellowPayMethodName}>Bank transfer</div>
              <div className={styles.mellowPayMethodFee}>
                {INVOICE.feePct}% fee ({fmtEur(INVOICE.fee)})
              </div>
              <button type="button" className={styles.mellowDownload}>
                Download invoice
              </button>
            </div>
            <div className={styles.mellowPayTotal}>{fmtEur(INVOICE.total)}</div>
          </div>

          <button type="button" className={styles.mellowPayBtn} onClick={onPaid}>
            Pay {fmtEur(INVOICE.total)}
          </button>
        </div>

        <button type="button" className={styles.mellowSupportBtn} aria-label="Support">
          ?
        </button>
      </main>
    </div>
  );
}

/* ============================================================
   STEP 4 — Paid (back inside Scout)
   ============================================================ */

function StepPaid() {
  const entries = useMemo(() => [...BASE_TIMELINE, RECEIVED_ENTRY, PAID_ENTRY], []);
  return (
    <ScoutShell>
      <main className={styles.scoutBody}>
        <CandidateHeader />

        <StatusBanner
          pill="Paid"
          title="Invoice settled — €1,260.00"
          subtitle="Jessica's invoice was paid via Mellow. Scout will keep the assignment open while work continues."
          tone="done"
        />

        <div className={styles.bodyGrid}>
          <section className={styles.mainCol}>
            <div className={styles.panelDone}>
              <div className={styles.panelHead}>
                <div className={styles.panelTitle}>Payment receipt</div>
                <div className={styles.panelHint}>Synced from Mellow · Apr 27, 2026</div>
              </div>
              <dl className={styles.kvList}>
                <div>
                  <dt>Invoice</dt>
                  <dd>No {INVOICE.number}</dd>
                </div>
                <div>
                  <dt>Amount</dt>
                  <dd>{fmtEur(INVOICE.amount)}</dd>
                </div>
                <div>
                  <dt>Mellow fee ({INVOICE.feePct}%)</dt>
                  <dd>{fmtEur(INVOICE.fee)}</dd>
                </div>
                <div>
                  <dt>Total charged</dt>
                  <dd>{fmtEur(INVOICE.total)}</dd>
                </div>
                <div>
                  <dt>Method</dt>
                  <dd>Bank transfer (SEPA)</dd>
                </div>
              </dl>

              <div className={styles.invActions}>
                <button type="button" className={styles.btnGhost}>
                  Download receipt
                </button>
                <button type="button" className={styles.btnGhost}>
                  Request next invoice
                </button>
                <button type="button" className={styles.btnGhost}>
                  Message freelancer
                </button>
              </div>
            </div>

            <div className={styles.panelGhost}>
              <div className={styles.panelGhostTitle}>What happens next</div>
              <p className={styles.panelGhostText}>
                Jessica continues the engagement. When the next milestone is ready, request a new
                invoice from this card — Mellow remembers the parties so you skip KYC/KYB next time.
              </p>
            </div>
          </section>

          <Timeline entries={entries} activeId="paid" />
        </div>
      </main>
    </ScoutShell>
  );
}

/* ============================================================
   Root
   ============================================================ */

export function CandidateInvoicePaymentScreen() {
  const [step, setStep] = useState<StepId>("awaiting");
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
    case "awaiting":
      content = <StepAwaiting />;
      break;
    case "received":
      content = <StepReceived goPay={() => setStep("payment")} />;
      break;
    case "payment":
      content = <StepPaymentPage onPaid={() => setStep("paid")} />;
      break;
    case "paid":
      content = <StepPaid />;
      break;
  }

  return (
    <div className={styles.root}>
      <PrototypeBar step={step} idx={idx} goNext={goNext} goBack={goBack} jump={jumpTo} />
      <div className={styles.canvas}>{content}</div>
    </div>
  );
}
