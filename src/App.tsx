import { ScoutApplyFlowScreen } from "./screens/ScoutApplyFlow/ScoutApplyFlowScreen";

/**
 * ВЕТКА: pl/scout-apply-flow-radar
 * Прототип: AIHR-530 — отклик на реквест через единую регу и скоринг.
 *
 * Сквозной флоу:
 * Public Request Landing → Screening (chat snapshots) → Cover letter →
 * Confirmation → Success → Radar Project Details (Applied).
 */

export function App() {
  return <ScoutApplyFlowScreen />;
}
