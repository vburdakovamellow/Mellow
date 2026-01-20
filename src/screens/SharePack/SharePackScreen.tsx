import { useMemo, useState } from "react";
import { Button } from "../../design-system/primitives/Button/Button";
import { InputField } from "../../design-system/primitives/Input/Input";
import "../../design-system/typography.css";
import styles from "./SharePackScreen.module.css";

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
  marketMarker?: string;
  budget: {
    paymentType: "hourly" | "fixed";
    from: string;
    to: string;
    currency: "USD" | "EUR" | "GBP" | string;
  };
};

function clampText(text: string, max: number) {
  if (text.length <= max) return text;
  if (max <= 1) return text.slice(0, max);
  return `${text.slice(0, max - 1)}…`;
}

function parseNumber(value: string) {
  const n = Number.parseFloat(String(value).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function formatBudget(req: SharePackRequest) {
  const cur = req.budget.currency || "USD";
  const symbol = cur === "USD" ? "$" : cur === "EUR" ? "€" : cur === "GBP" ? "£" : `${cur} `;
  const from = req.budget.from?.trim() || "";
  const to = req.budget.to?.trim() || "";
  const suffix = req.budget.paymentType === "hourly" ? "/hr" : "";

  if (from && to && from !== to) return `${symbol}${from}–${to}${suffix}`;
  if (from) return `${symbol}${from}${suffix}`;
  if (to) return `${symbol}${to}${suffix}`;
  return "";
}

function isRateHigh(req: SharePackRequest) {
  // Prototype heuristic. In production this should use market benchmarks by role + geo.
  const to = parseNumber(req.budget.to) ?? parseNumber(req.budget.from);
  if (to === null) return false;
  if (req.budget.paymentType === "hourly") return to >= 60;
  return to >= 10000;
}

function buildOgTitle(title: string, secondPart: string, maxLen = 60) {
  const sep = " — ";
  const second = secondPart.trim();
  const base = title.trim();
  if (!second) return clampText(base, maxLen);

  const remainingForTitle = maxLen - sep.length - second.length;
  if (remainingForTitle <= 0) {
    return clampText(`${base}${sep}${second}`, maxLen);
  }
  return `${clampText(base, remainingForTitle)}${sep}${second}`;
}

function normalizeRemote(location: string) {
  const loc = location.trim();
  if (!loc) return "";
  return /remote/i.test(loc) ? "Remote" : loc;
}

function OgImageBentoPreview({
  title,
  clientName,
  rateLabel,
  rateValue,
  pills
}: {
  title: string;
  clientName: string;
  rateLabel: string;
  rateValue: string;
  pills: string[];
}) {
  return (
    <div className={styles.ogPreviewOuter}>
      <div className={styles.ogPreview} aria-label="OG image preview (bento grid)">
        <div className={styles.ogGrid}>
          <div className={[styles.ogBlock, styles.ogHero].join(" ")}>
            <p className={styles.ogClient}>{clientName}</p>
            <h3 className={styles.ogTitle}>{title}</h3>
          </div>

          <div className={styles.ogRightCol}>
            <div className={[styles.ogBlock, styles.ogRate].join(" ")}>
              <p className={styles.ogRateValue}>{rateValue}</p>
              <span className={styles.ogRateLabel}>{rateLabel}</span>
            </div>

            <div className={[styles.ogBlock, styles.ogStack].join(" ")}>
              <div className={styles.ogStackRow}>
                {pills.slice(0, 6).map((p) => (
                  <span key={p} className={styles.ogPill}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className={[styles.ogBlock, styles.ogTrust].join(" ")}>
              <div className={styles.ogTrustIcon}>✓</div>
              <div className={styles.ogTrustText}>
                <p className={styles.ogTrustTitle}>Verified by Mellow</p>
                <p className={styles.ogTrustSub}>Secure contract via Scout (stub)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function copyToClipboard(text: string) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for environments without Clipboard API permissions.
    window.prompt("Copy to clipboard:", text);
  }
}

function CopyRow({
  label,
  value,
  monospace = false,
  copiedText = "Copied",
  maxLen
}: {
  label: string;
  value: string;
  monospace?: boolean;
  copiedText?: string;
  maxLen?: number;
}) {
  const [copied, setCopied] = useState(false);
  const over = maxLen ? value.length > maxLen : false;

  return (
    <div className={styles.row}>
      <div className={styles.rowGrow}>
        <InputField label={label} value={value} readOnly className={monospace ? styles.mono : undefined} />
        {maxLen ? (
          <div className={styles.fieldMeta}>
            <span className={[styles.counter, over ? styles.counterWarn : ""].filter(Boolean).join(" ")}>
              {value.length}/{maxLen}
            </span>
            {over ? <span className={styles.counterWarn}>Too long</span> : null}
          </div>
        ) : null}
      </div>
      <Button
        variant="secondary"
        className={styles.copyBtn}
        onClick={async () => {
          await copyToClipboard(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        }}
      >
        {copied ? copiedText : "Copy"}
      </Button>
    </div>
  );
}

export function SharePackScreen({
  request,
  onBackToEdit
}: {
  request: SharePackRequest;
  onBackToEdit?: () => void;
}) {
  const budgetText = useMemo(() => formatBudget(request), [request]);
  const showRateInTitle = useMemo(() => isRateHigh(request), [request]);

  const shareUrl = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/?sr=${encodeURIComponent(request.id)}`;
  }, [request.id]);

  const ogTitle = useMemo(() => {
    const marketMarker =
      request.marketMarker?.trim() ||
      (request.timeline?.flexible ? "Flexible" : "") ||
      request.timeline?.startDate?.trim() ||
      normalizeRemote(request.location);

    const second = showRateInTitle ? budgetText : marketMarker;
    return buildOgTitle(request.title, second || "", 60);
  }, [request.title, request.marketMarker, request.timeline, request.location, showRateInTitle, budgetText]);

  const ogDescription = useMemo(() => {
    const skills = request.skills.slice(0, 3).join(", ");
    const timelineBits = [
      request.timeline?.workload?.trim() || "",
      request.timeline?.startDate?.trim() ? `Start: ${request.timeline.startDate.trim()}` : ""
    ].filter(Boolean);
    const timeline = timelineBits.join(" • ");

    const remote = normalizeRemote(request.location);
    const bits = [skills, timeline, remote].filter(Boolean);
    return clampText(bits.join(" • "), 120);
  }, [request.skills, request.location, request.timeline]);

  const twitterCard = "summary_large_image";

  const linkedInCopy = useMemo(() => {
    const line1 = `Looking for: ${request.title}${budgetText ? ` (${budgetText})` : ""}`;
    const line2 = request.skills.length ? `Stack: ${request.skills.slice(0, 6).join(", ")}` : "";
    const line3 = request.location ? `Location: ${request.location}` : "";
    const line4 = `Apply here: ${shareUrl}`;
    return [line1, line2, line3, "", line4].filter((x) => x !== "").join("\n");
  }, [request.title, request.skills, request.location, budgetText, shareUrl]);

  return (
    <div className={styles.screen}>
      <div className={styles.fixedHeader}>
        <div className={[styles.container, styles.headerInner].join(" ")}>
          <div className={styles.logo}>mellow</div>
          {onBackToEdit ? (
            <Button variant="secondary" onClick={onBackToEdit}>
              Back to edit
            </Button>
          ) : null}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.title}>Share pack</h1>
          <p className={styles.subtitle}>
            Copy a link and ready-to-post text. (Prototype) Next we’ll refine Open Graph metadata rules from the doc.
          </p>

          <div className={styles.section}>
            <p className={styles.sectionTitle}>Shareable link</p>
            <CopyRow label="URL" value={shareUrl} monospace />
            <p className={styles.helperText}>
              This is the link you’ll paste into posts or send privately. In production it will point to the public request page.
            </p>
          </div>

          <div className={styles.section}>
            <p className={styles.sectionTitle}>Protocols & metadata (OG preview)</p>
            <div className={styles.twoCol}>
              <CopyRow label="og:title" value={ogTitle} maxLen={60} />
              <CopyRow label="og:description" value={ogDescription} maxLen={120} />
            </div>
            <div style={{ marginTop: 12 }}>
              <CopyRow label="twitter:card" value={twitterCard} monospace />
            </div>
            <OgImageBentoPreview
              title={request.title}
              clientName={request.companyName?.trim() ? request.companyName.trim() : "Client (industry-blind)"}
              rateLabel={request.budget.paymentType === "hourly" ? "Hourly rate" : "Total project value"}
              rateValue={budgetText || "Rate"}
              pills={request.skills.length ? request.skills : ["React", "Node.js", "AWS"]}
            />
            <p className={styles.helperText}>
              OG tags control the “link preview card” in messengers/social feeds (title/description/image). Rule in this prototype:
              if rate looks “high”, we include it in the title; otherwise we use a market marker (ASAP/Flexible/Remote etc).
              True dynamic OG injection needs server-side rendering.
            </p>
          </div>

          <div className={styles.section}>
            <p className={styles.sectionTitle}>Copy for LinkedIn</p>
            <div className={styles.row}>
              <div className={styles.rowGrow}>
                <InputField label="Post text" value={linkedInCopy} readOnly />
              </div>
              <Button
                variant="secondary"
                className={styles.copyBtn}
                onClick={() => copyToClipboard(linkedInCopy)}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

