import { useEffect, useState } from "react";
import { CandidatesScreen, type CandidatesStep } from "./screens/Candidates/CandidatesScreen";

/**
 * ВЕТКА: fm/candidates--ultra
 * Только Ultra — экран Candidates с вариантами Ultra-флоу.
 *
 * ВАРИАНТЫ (переключаются через панель внизу или URL-параметры):
 *
 * Вариант A (version=1): Ultra Step-by-Step Flow
 *   ?step=just_created     — пустой экран + Ultra CTA баннер «Meet your Ultra manager»
 *   ?step=ultra_ordered     — запланирован звонок «Your meet with Scout Ultra is scheduled!»
 *   ?step=sourcing          — идёт поиск, таймер 49h 58min
 *   ?step=ready_for_review  — кандидаты найдены, Start Over
 *
 * Вариант B (version=2): Preview Candidates
 *   ?variant=B  — превью-карточки кандидатов с ULTRA badges
 *
 * Вариант C (version=3): Zero-Results Compact
 *   ?variant=C  — минимальный блок «No perfect candidate yet?»
 */

type Variant = "A" | "B" | "C";

const VARIANT_META: Record<Variant, { version: 1 | 2 | 3; label: string; hint: string }> = {
  A: { version: 1, label: "A: Ultra Step-by-Step", hint: "4 шага: created → ordered → sourcing → review" },
  B: { version: 2, label: "B: Preview Candidates", hint: "Превью с ULTRA badges" },
  C: { version: 3, label: "C: Zero-Results Compact", hint: "«No perfect candidate yet?»" },
};

const STEPS: CandidatesStep[] = ["just_created", "ultra_ordered", "sourcing", "ready_for_review"];

function readUrl(): { variant: Variant; step: CandidatesStep } {
  if (typeof window === "undefined") return { variant: "A", step: "just_created" };
  const p = new URLSearchParams(window.location.search);
  const v = p.get("variant");
  const variant: Variant = v === "B" ? "B" : v === "C" ? "C" : "A";
  const s = p.get("step") as CandidatesStep | null;
  const step: CandidatesStep = s && STEPS.includes(s) ? s : "just_created";
  return { variant, step };
}

function writeUrl(v: Variant, s: CandidatesStep) {
  const params = new URLSearchParams();
  if (v !== "A") params.set("variant", v);
  if (s !== "just_created") params.set("step", s);
  const q = params.toString();
  window.history.replaceState({}, "", q ? `${window.location.pathname}?${q}` : window.location.pathname);
}

export function App() {
  const [{ variant, step }, setState] = useState(readUrl);

  useEffect(() => {
    const handler = () => setState(readUrl());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const go = (v: Variant, s: CandidatesStep) => {
    setState({ variant: v, step: s });
    writeUrl(v, s);
  };

  return (
    <>
      <CandidatesScreen
        requestTitle="Graphic Designer for Social Media Optimisation"
        onGoBack={() => console.log("Go back clicked")}
        version={VARIANT_META[variant].version}
        step={step}
        onBooked={() => go(variant, "ultra_ordered")}
        onRestart={() => go(variant, "just_created")}
        onJoin={() => go(variant, "sourcing")}
      />

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#1a1a1a", color: "#fff", padding: "10px 20px",
        display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap",
        fontFamily: "monospace", fontSize: "12px", zIndex: 9999,
        borderTop: "2px solid #333",
      }}>
        <span style={{ opacity: 0.5, marginRight: 4 }}>ULTRA:</span>
        {(Object.keys(VARIANT_META) as Variant[]).map((v) => (
          <button
            key={v}
            onClick={() => go(v, v === "A" ? step : "just_created")}
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

        {variant === "A" && (
          <>
            <span style={{ opacity: 0.3, margin: "0 6px" }}>|</span>
            <span style={{ opacity: 0.5 }}>STEP:</span>
            {STEPS.map((s) => (
              <button
                key={s}
                onClick={() => go("A", s)}
                style={{
                  padding: "3px 8px", borderRadius: 4,
                  border: step === s ? "1px solid #4af" : "1px solid #444",
                  background: step === s ? "#4af" : "transparent",
                  color: step === s ? "#000" : "#777",
                  cursor: "pointer", fontSize: "10px", fontFamily: "monospace",
                }}
              >
                {s.replace(/_/g, " ")}
              </button>
            ))}
          </>
        )}
      </div>
    </>
  );
}
