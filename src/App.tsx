import { useEffect, useState } from "react";
import { SharePackScreen } from "./screens/SharePack/SharePackScreen";
import { SharePackStepperScreen } from "./screens/SharePack/SharePackStepperScreen";

/**
 * ВЕТКА: fm/sharepack--promote
 * Только Promote — экран SharePack с вариантами продвижения реквеста.
 *
 * ВАРИАНТЫ (переключаются через панель внизу или URL ?variant=A/B):
 *
 * Вариант A: Stepper + Checklist
 *   Пошаговый визард (Your request → Promote → Ultra → Candidates)
 *   с чеклистом каналов и прогресс-баром 1/3.
 *   Справа — превью LinkedIn-поста.
 *
 * Вариант B: Accordion + Live Preview
 *   4 аккордеон-блока:
 *   1. Social Boost by Mellow (репост LinkedIn AI Scout)
 *   2. Share with your Network (LinkedIn + Facebook)
 *   3. Explore Communities (Discord, Slack, FB, Telegram)
 *   4. Send invite directly (личное сообщение)
 *   Справа — live preview для каждого блока.
 */

type Variant = "A" | "B";

const VARIANT_META: Record<Variant, { label: string; hint: string }> = {
  A: { label: "A: Stepper + Checklist", hint: "Визард с прогресс-баром и чеклистом каналов" },
  B: { label: "B: Accordion + Live Preview", hint: "4 аккордеон-блока с live preview справа" },
};

const MOCK_REQUEST = {
  id: "1",
  title: "Graphic Designer for Social Media Optimisation",
  companyName: "Mellow",
  location: "Remote",
  skills: ["Graphic Design", "Social Media", "Branding"],
  languages: ["English", "Russian"],
  timeline: { workload: "Full-time", startDate: "2026-02-01", flexible: true },
  budget: { paymentType: "hourly" as const, from: "30", to: "50", currency: "USD" },
};

function readVariant(): Variant {
  if (typeof window === "undefined") return "B";
  const v = new URLSearchParams(window.location.search).get("variant");
  return v === "A" ? "A" : "B";
}

function writeVariant(v: Variant) {
  const params = new URLSearchParams();
  if (v !== "B") params.set("variant", v);
  const q = params.toString();
  window.history.replaceState({}, "", q ? `${window.location.pathname}?${q}` : window.location.pathname);
}

export function App() {
  const [variant, setVariant] = useState<Variant>(readVariant);

  useEffect(() => {
    const handler = () => setVariant(readVariant());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const go = (v: Variant) => {
    setVariant(v);
    writeVariant(v);
  };

  return (
    <>
      {variant === "A" ? (
        <SharePackStepperScreen
          request={MOCK_REQUEST}
          onGoToEdit={() => console.log("Go to edit")}
          onGoToView={() => console.log("Go to view")}
        />
      ) : (
        <SharePackScreen
          request={MOCK_REQUEST}
          onGoToEdit={() => console.log("Go to edit")}
          onGoToView={() => console.log("Go to view")}
        />
      )}

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#1a1a1a", color: "#fff", padding: "10px 20px",
        display: "flex", gap: "8px", alignItems: "center",
        fontFamily: "monospace", fontSize: "12px", zIndex: 9999,
        borderTop: "2px solid #333",
      }}>
        <span style={{ opacity: 0.5, marginRight: 4 }}>PROMOTE:</span>
        {(Object.keys(VARIANT_META) as Variant[]).map((v) => (
          <button
            key={v}
            onClick={() => go(v)}
            title={VARIANT_META[v].hint}
            style={{
              padding: "4px 12px", borderRadius: 4,
              border: variant === v ? "1px solid #fff" : "1px solid #555",
              background: variant === v ? "#fff" : "transparent",
              color: variant === v ? "#000" : "#999",
              cursor: "pointer", fontSize: "11px", fontFamily: "monospace",
            }}
          >
            {VARIANT_META[v].label}
          </button>
        ))}
      </div>
    </>
  );
}
