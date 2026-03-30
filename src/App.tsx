import { MellowPoolScreen } from "./screens/MellowPool/MellowPoolScreen";

/**
 * ВЕТКА: fm/pool-mellow-pool-variants
 * Прототип: Mellow Pool — рекомендованные контракторы из базы Mellow.
 *
 * Флоу:
 * 1. Первый визит после создания реквеста → Pool как отдельный шаг.
 *    Пользователь просматривает резюме каждого контрактора, приглашает или пропускает.
 *    После всех → переход в Candidates.
 * 2. Повторные визиты → Pool как вкладка "Recommended by Mellow" рядом с Candidates.
 */

export function App() {
  return <MellowPoolScreen />;
}
