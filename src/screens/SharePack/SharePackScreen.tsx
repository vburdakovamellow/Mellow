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
  budget: {
    paymentType: "hourly" | "fixed";
    from: string;
    to: string;
    currency: "USD" | "EUR" | "GBP" | string;
  };
};

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
  copiedText = "Copied"
}: {
  label: string;
  value: string;
  monospace?: boolean;
  copiedText?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className={styles.row}>
      <div className={styles.rowGrow}>
        <InputField label={label} value={value} readOnly className={monospace ? styles.mono : undefined} />
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

  const shareUrl = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/?sr=${encodeURIComponent(request.id)}`;
  }, [request.id]);

  const ogTitle = useMemo(() => {
    const rate = budgetText ? ` — ${budgetText}` : "";
    return `${request.title}${rate}`.slice(0, 60);
  }, [request.title, budgetText]);

  const ogDescription = useMemo(() => {
    const skills = request.skills.slice(0, 3).join(", ");
    const bits = [skills, request.location].filter(Boolean);
    return bits.join(" • ").slice(0, 120);
  }, [request.skills, request.location]);

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
              <CopyRow label="og:title" value={ogTitle} />
              <CopyRow label="og:description" value={ogDescription} />
            </div>
            <p className={styles.helperText}>
              OG tags control the “link preview card” in messengers/social feeds (title/description/image). In this prototype we only
              generate strings; true OG injection requires server-side rendering.
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

