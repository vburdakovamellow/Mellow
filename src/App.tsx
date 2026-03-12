import { useEffect, useState } from "react";
import { PromptValidationScreen, type Variant } from "./screens/PromptValidation/PromptValidationScreen";

/**
 * ВЕТКА: fm/prompt-validation-flow
 * Прототип: валидация промпта пользователя и подсказки по улучшению.
 *
 * ВАРИАНТЫ (переключаются через панель внизу или URL ?variant=...):
 *
 * S1: Approve (full)     — промпт полный → Quiz → Edit page (чистая)
 * S2: Approve (partial)  — промпт частичный → Quiz → Edit page с баннером AI-filled полей
 * S3a: Warning → Input   — промпт слабый → Quiz прерывается → возврат к инпуту с подсказками
 * S3b: Warning → Chat    — промпт слабый → Quiz прерывается → Chat UI с AI-ассистентом
 * S4: Redirect            — промпт от контрактора → Quiz прерывается → перенаправление в Radar
 * S5: Block               — фрод/спам → Quiz прерывается → блокировка
 */

const VARIANT_META: Record<Variant, { label: string; hint: string }> = {
  S1: { label: "S1: Approve (full)", hint: "Полный промпт → Quiz → Edit page" },
  S2: { label: "S2: Approve (partial)", hint: "Частичный промпт → Quiz → Edit с AI-filled баннером" },
  S3a: { label: "S3a: Warning → Input", hint: "Слабый промпт → предупреждение → возврат к инпуту" },
  S3b: { label: "S3b: Warning → Chat", hint: "Слабый промпт → предупреждение → Chat UI" },
  S4: { label: "S4: Redirect", hint: "Контрактор → перенаправление в Radar" },
  S5: { label: "S5: Block", hint: "Фрод/спам → блокировка генерации" },
};

const VALID_VARIANTS: Variant[] = ["S1", "S2", "S3a", "S3b", "S4", "S5"];

function readVariant(): Variant {
  if (typeof window === "undefined") return "S1";
  const v = new URLSearchParams(window.location.search).get("variant");
  return VALID_VARIANTS.includes(v as Variant) ? (v as Variant) : "S1";
}

function writeVariant(v: Variant) {
  const params = new URLSearchParams();
  if (v !== "S1") params.set("variant", v);
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
      <PromptValidationScreen variant={variant} />

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
        <span style={{ opacity: 0.5, marginRight: 4 }}>PROMPT VALIDATION:</span>
        {(Object.keys(VARIANT_META) as Variant[]).map((v) => (
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
