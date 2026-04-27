import { CandidateInvoicePaymentScreen } from "./screens/CandidateInvoicePayment/CandidateInvoicePaymentScreen";

/**
 * ВЕТКА: fm/candidate-invoice-payment-flow
 *
 * Прототип алгоритма оплаты Scout → F2B (Путь Б — Инвойс).
 * Старт со статуса Deal settled. Когда фрил создал инвойс — в карточке
 * Scout появляется кнопка Pay → переход на my.mellow.io invoice page.
 *
 * Состояния прототипа:
 *  1. Scout · Deal settled — awaiting invoice
 *  2. Scout · Invoice received — Pay button visible
 *  3. my.mellow.io · Invoice payment page (branded replica)
 *  4. Scout · Paid — финальный статус с историей
 */
export function App() {
  return <CandidateInvoicePaymentScreen />;
}
