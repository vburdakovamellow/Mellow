import { useEffect, useState } from "react";
import { MellowPoolScreen, type PoolVariant } from "./screens/MellowPool/MellowPoolScreen";

/**
 * ВЕТКА: fm/pool-mellow-pool-variants
 * Прототип: Mellow Pool — рекомендованные контракторы из базы Mellow.
 *
 * ВАРИАНТЫ (переключаются через панель внизу или URL ?variant=...):
 *
 * A: Separate Step   — Pool как отдельный шаг в pipeline (Your request → Mellow Pool → Promote → Ultra → Candidates)
 * B: Inline Block    — Pool как выделенный блок в верхней части Candidates
 * C: Tabs            — Pool как таб "Recommended by Mellow" внутри Candidates
 */

const VARIANT_META: Record<PoolVariant, { label: string; hint: string }> = {
  A: {
    label: "A: Separate Step",
    hint: "Pool — отдельный шаг в pipeline. Чёткое визуальное разделение Pool vs Candidates.",
  },
  B: {
    label: "B: Inline Block",
    hint: "Pool — выделенный блок внутри Candidates. Всё в одном месте.",
  },
  C: {
    label: "C: Tabs",
    hint: "Pool — таб 'Recommended by Mellow' внутри Candidates. Компромисс.",
  },
};

const VALID_VARIANTS: PoolVariant[] = ["A", "B", "C"];

function readVariant(): PoolVariant {
  if (typeof window === "undefined") return "A";
  const v = new URLSearchParams(window.location.search).get("variant");
  return VALID_VARIANTS.includes(v as PoolVariant) ? (v as PoolVariant) : "A";
}

function writeVariant(v: PoolVariant) {
  const params = new URLSearchParams();
  if (v !== "A") params.set("variant", v);
  const q = params.toString();
  window.history.replaceState({}, "", q ? `${window.location.pathname}?${q}` : window.location.pathname);
}

export function App() {
  const [variant, setVariant] = useState<PoolVariant>(readVariant);

  useEffect(() => {
    const handler = () => setVariant(readVariant());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const go = (v: PoolVariant) => {
    setVariant(v);
    writeVariant(v);
  };

  return (
    <>
      <MellowPoolScreen variant={variant} />

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#1a1a1a",
          color: "#fff",
          padding: "10px 16px",
          display: "flex",
          gap: "6px",
          alignItems: "center",
          fontFamily: "monospace",
          fontSize: "11px",
          zIndex: 9999,
          borderTop: "2px solid #333",
          flexWrap: "wrap",
        }}
      >
        <span style={{ opacity: 0.5, marginRight: 4 }}>MELLOW POOL:</span>
        {(Object.keys(VARIANT_META) as PoolVariant[]).map((v) => (
          <button
            key={v}
            onClick={() => go(v)}
            title={VARIANT_META[v].hint}
            style={{
              padding: "4px 10px",
              borderRadius: 4,
              border: variant === v ? "1px solid #fff" : "1px solid #555",
              background: variant === v ? "#fff" : "transparent",
              color: variant === v ? "#000" : "#999",
              cursor: "pointer",
              fontSize: "10px",
              fontFamily: "monospace",
            }}
          >
            {VARIANT_META[v].label}
          </button>
        ))}
      </div>
    </>
  );
}
