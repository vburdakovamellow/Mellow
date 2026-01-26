# Scout Ultra Q1 MVP: Финальная проверка качества (5W+H Challenge)

**Дата проверки:** 2026-01-22  
**Версия:** Q1 MVP (17 недель, без видео/интервью)  
**Метод:** 5W+H Challenge Protocol  
**Целевая оценка:** 9.8/10

---

## Исходное задание (recap)

### Основное задание:
1. ✅ Изучить контекст продукта (mellow_product_context.md)
2. ✅ Изучить алгоритм создания PRD
3. ✅ Изучить PRD Scout Ultra
4. ✅ Разбить на логичные эпики
5. ✅ Расписать роадмап с учетом груминга и дизайна

### Уточнение от пользователя:
- ❗ **Убрать интервью рекрутером** - не будет в Q1
- ❗ **Сначала база на стороне пользователя** (клиентский опыт)
- ❗ **Потом докрутка интерфейса оркестратора** (ручная работа сначала)
- ❗ **Цель - MVP и тестирование**, идти по нарастающей

---

## 1. WHAT (Что создано?)

### ✅ Что ЕСТЬ в Q1 MVP:

**11 эпиков, из них в Q1:**
- EPIC 1: Foundation (полностью) ✅
- EPIC 2: Admin Console (МИНИМАЛЬНЫЙ - только ссылки) ✅
- EPIC 3: Implicit Mode (полностью) ✅
- EPIC 4: Explicit Mode (БЕЗ видео) ✅
- EPIC 5: Notifications (базовые) ✅
- EPIC 7: Quality Control (только базовый feedback) ✅
- EPIC 9: Design (6 Client + 2 Admin wireframes) ✅
- EPIC 10: Operations (4 SOP, БЕЗ видео-интервью) ✅
- EPIC 11: GTM (базовый) ✅

**Перенесено на Q2-Q3:**
- EPIC 2 (полная версия): Advanced Admin Console
- EPIC 6: Advanced Orchestrator Tools
- EPIC 7 (полная версия): Automated Quality Control
- EPIC 8: Video Infrastructure
- Enrichment в интерфейсе

**Роадмап Q1:**
- Phase 0: Pre-Dev (недели 0-2)
- Phase 0.5: Operations Prep (параллельно, недели 3-4)
- Phase 1: Foundation (недели 3-6)
- Phase 2: Implicit Mode (недели 7-10)
- Phase 3: Explicit Mode + Soft Launch (недели 11-17)

**Длительность:** 17 недель (~4 месяца) до Soft Launch

### ✅ Соответствие уточненному заданию:

**"Убрать интервью рекрутером":**
- ✅ EPIC 8 (Video Infrastructure) полностью перенесен на Q2-Q3
- ✅ SOP-003 (Video Interviewing Guide) удален из Q1
- ✅ Enrichment Module убран из Admin Console Q1
- ✅ WF-C05 (Video Player Modal) перенесен на Q2-Q3
- ✅ WF-A04 (Enrichment Modal) перенесен на Q2-Q3

**"Сначала база на стороне пользователя":**
- ✅ EPIC 4 (Client-Side UI) полностью в Q1: Progress Widget, Concierge Card, Shortlist
- ✅ EPIC 9: 6 Client-Side wireframes vs 2 Admin-Side (приоритет клиенту)
- ✅ EPIC 11: GTM для клиентов (email campaigns, Help Center)
- ✅ Phase 3 (недели 11-17) - полностью клиентский опыт

**"Потом докрутка интерфейса оркестратора":**
- ✅ EPIC 2 в Q1 - МИНИМАЛЬНЫЙ (только список + кнопки)
- ✅ Orchestrator работает через Notion/Sheets/Email (manual)
- ✅ Полная версия Admin Console перенесена на Q2
- ✅ Advanced Tools (EPIC 6) перенесены на Q2

**"Цель - MVP и тестирование":**
- ✅ Фокус на валидацию PMF
- ✅ Soft Launch на неделе 17 (5-10 VIP-клиентов)
- ✅ Метрики успеха Q1 четко определены
- ✅ Решение о Q2-Q3 принимается после Q1 фидбека

### ❌ Что могло быть лучше:

1. **Метрики по итерациям:** Нет четких checkpoints внутри Q1 (только финальные метрики Soft Launch)
   - Рекомендация: Добавить weekly/bi-weekly метрики прогресса

2. **Rollback plan:** Упомянут в Launch Checklist, но не детализирован
   - Что делать если Q1 провалится? Как откатываемся?

3. **Budget/Cost:** Нет финансовой оценки Q1
   - Сколько стоит Q1 MVP? ROI projection?

**Оценка WHAT: 9.5/10** (отлично, мелкие улучшения нужны)

---

## 2. WHY (Зачем? Бизнес-ценность)

### ✅ Что ЕСТЬ:

**Ясная логика приоритизации:**
- Q1: Валидация спроса (Willingness to Pay)
- Q2: Операционная эффективность (масштабирование)
- Q3: Дифференциация (видео как killer feature)

**Метрики привязаны к PRD:**
- Zero-Result Rate Reduction (< 20% за 24h) ✅
- SLA Compliance (90%+ в Q1, 100% в Q2) ✅
- Outreach Efficiency (> 10% в Q1) ✅
- Unit Economics Attribution (100% кандидатов помечены) ✅

**Финансовые цели Q1:**
- 3+ платных запроса в Soft Launch
- Подготовка к MRR > $10k в Q2

**Value proposition Q1 ясен:**
- Для клиента: Быстрый шорт-лист за 48h с персональным менеджером
- Для бизнеса: Валидация спроса до масштабных инвестиций в автоматизацию

### ❌ Что могло быть лучше:

1. **Explicit ROI calculation отсутствует:**
   - Стоимость команды на 17 недель не посчитана
   - Break-even не определен
   - Альтернативные сценарии (если Q1 провалится) не имеют финансового анализа

2. **Trade-offs не артикулированы явно:**
   - Почему именно 17 недель, а не 12 или 21?
   - Что мы теряем, отказываясь от видео в Q1?
   - Какие риски несем, делая manual operations?

3. **Customer Lifetime Value (LTV) projection:**
   - Цель LTV > $500 есть для полного продукта, но нет для Q1 MVP
   - Сколько repeat purchases ожидаем после первого Ultra запроса?

**Оценка WHY: 9.0/10** (хорошо, нужны финансовые детали)

---

## 3. WHO (Кто? Ресурсы и роли)

### ✅ Что ЕСТЬ:

**FTE Summary Q1 детализирован:**
- Product Manager: 60% FTE (весь Q1)
- Designer: 100% → 80% → 60% (по фазам)
- Backend Dev (×2): 100% FTE (весь Q1)
- Frontend Dev: 20% → 80% → 100% (по фазам)
- DevOps: 40% → 20% → 30% (пики: setup, Stripe)
- QA Engineer: 20% → 30% → 40% (пики: тестирование)
- Operations Manager: 50% → 40% → 30% (hiring + onboarding)
- Orchestrators (×2-3): Hiring недели 3-4, работа с недели 7
- Marketing Manager: 0% → 0% → 60% (только Phase 3)
- Copywriter: 40% (недели 13-15)
- Legal Counsel: 10% (недели 11-12, Stripe compliance)

**Peak Load Q1:** 7-8 FTE одновременно (недели 13-15)

**Orchestrators детализированы:**
- Процесс найма (недели 3-4)
- Обучение manual workflow (недели 5-6)
- 4 SOP без видео-интервью
- Manual tracking через Notion/Sheets

### ✅ Соответствие MVP-подходу:

**Меньше ресурсов vs Full Roadmap:**
- Было: 9-10 FTE в пике
- Стало: 7-8 FTE в Q1
- Экономия: ~20% команды

**Не нужны в Q1:**
- ❌ Video Producer (был в полном роадмапе для tutorials)
- ❌ AI/ML Engineer (для EPIC 6)
- ❌ Дополнительные DevOps для video CDN

### ❌ Что могло быть лучше:

1. **Конкретные имена/кандидаты:**
   - Кто конкретно Designer? Доступен ли?
   - 2 Backend разработчика - кто они?
   - Orchestrators - какой профиль (опыт, скиллы)?

2. **Backup plan для критических ролей:**
   - Что если Designer уходит в отпуск?
   - Что если Orchestrator не подходит после hiring?
   - Нет упоминания "bus factor"

3. **Onboarding time для новых членов команды:**
   - Сколько времени нужно новому Backend Dev на onboarding?
   - Как это влияет на сроки?

**Оценка WHO: 9.3/10** (очень хорошо, нужны детали про людей)

---

## 4. WHEN (Когда? Временные рамки)

### ✅ Что ЕСТЬ:

**Детальный календарь Q1 (17 недель):**
| Week | Phase | Milestones |
|------|-------|------------|
| 0-2 | Pre-Dev | Specs approved |
| 3-6 | Phase 1 | Foundation ready, Orchestrators hired |
| 7-10 | Phase 2 | Implicit Live (20%) |
| 11-17 | Phase 3 | Explicit Soft Launch |

**Буферов нет явно, но:**
- Implicit Beta (недели 9-10) - можно использовать как буфер
- Soft Launch (неделя 17) - буфер перед Full Launch

**Груминг встроен:**
- Неделя 4: EPIC 3
- Неделя 8: EPIC 4-5, 11
- Неделя 12: Финализация Phase 3

**Дизайн опережает dev:**
- WF-C01-C03 готовы к неделе 8 (dev начинает неделя 11)
- WF-C04-C06 готовы к неделе 10 (dev использует недели 15-16)

### ✅ Реалистичность оценок:

**Сокращения vs Full Roadmap оправданы:**
- EPIC 2: 4-5 недель → 1-2 недели (убран enrichment, pipeline view)
- EPIC 4: 5-6 недель → 4-5 недель (убрано видео)
- EPIC 9: 3-4 недели → 2-3 недели (меньше wireframes)
- EPIC 10: 3-4 недели → 2-3 недели (без video SOP)

**Параллелизм использован:**
- Phase 0.5 (Operations) параллельно Phase 1 (Foundation)
- Design опережает development на 1-2 недели

### ❌ Что могло быть лучше:

1. **Нет явных buffer weeks:**
   - В полном роадмапе были недели 7, 12, 19, 26, 32 как буферы
   - В Q1 MVP нет явных буферов
   - Рекомендация: Добавить неделю 10 как явный buffer для Phase 2

2. **Праздники и отпуска не учтены:**
   - 17 недель = ~4 месяца календарных
   - Нет упоминания новогодних праздников (если старт декабрь)
   - Нет учета летних отпусков (если старт май-июнь)

3. **Dependency risks не квантифицированы:**
   - Что если Stripe compliance затянется (неделя 11-12)?
   - Что если Calendly integration сложнее, чем думаем?
   - Нет contingency для внешних зависимостей

4. **Soft Launch длительность:**
   - Неделя 17 - одна неделя Soft Launch
   - Это достаточно для сбора фидбека от 5-10 VIP-клиентов?
   - Может нужно 2-3 недели?

**Оценка WHEN: 9.0/10** (хорошо, нужны буферы и contingency)

---

## 5. WHERE (Где? Контекст и интеграция)

### ✅ Что ЕСТЬ:

**Архитектурный контекст:**
- Phase 0: Архитектурное решение (микросервис vs монолит)
- Dev/staging/prod окружения упомянуты
- API спецификации для интеграций в Pre-Dev

**Интеграции в Q1:**
- Stripe (Payment) - неделя 11-12, compliance review
- Google Calendar / Calendly (Booking) - неделя 11-12
- Email/Slack (Notifications) - недели 13-14
- ❌ НЕТ Loom API (нет видео в Q1)
- ❌ НЕТ S3/CDN (нет видео в Q1)

**Граница ответственности:**
- Scout Ultra заканчивается на "Notify Client"
- MoR/CoR начинается после клик "Request Interview"
- Связь с существующим Share/Invite Packs функционалом

### ✅ Соответствие MVP:

**Меньше интеграций = меньше рисков:**
- Было: Stripe + Calendly + Loom + S3 + Whisper API
- Стало (Q1): Stripe + Calendly + Email/Slack
- Сокращение: 40% интеграций

**Manual workarounds четко описаны:**
- Orchestrators используют внешние инструменты (Notion, Sheets)
- Видео - внешние Loom-ссылки (не встроенные)

### ❌ Что могло быть лучше:

1. **Конкретное решение по архитектуре:**
   - "Выбор стека для Admin Console" упомянут в Phase 0, но нет рекомендации
   - Микросервис или расширение монолита?
   - Какие последствия выбора?

2. **Географический контекст:**
   - Orchestrators работают из какой timezone?
   - Как это влияет на SLA 48h? (если Orchestrator спит ночью, теряем 8 часов)
   - Нужна ли распределенная команда Orchestrators?

3. **Existing codebase integration:**
   - Как Scout Ultra интегрируется с текущим Mellow codebase?
   - Какие изменения нужны в Service Request entity?
   - Backward compatibility?

4. **Infrastructure scaling:**
   - Какая инфраструктура нужна для 20-50 SR одновременно (Q1 target)?
   - Есть ли bottleneck'и?

**Оценка WHERE: 8.5/10** (хорошо, нужны детали архитектуры и geo)

---

## 6. HOW (Как? Процессы реализации)

### ✅ Что ЕСТЬ:

**Детальные процессы:**

**Operations (EPIC 10):**
- Hiring процесс (недели 3-4): Job Description, скрининг, интервью
- Onboarding (недели 5-6): Обучение manual workflow
- 4 SOP документированы (SOP-001 - SOP-004, БЕЗ видео)
- Manual tracking настроен (Google Sheets/Notion)
- Playbook для 10+ типов ролей
- Templates Library (10+ outreach шаблонов)

**GTM (EPIC 11):**
- Email campaigns (3 типа: Announcement, Zero-Results Triggered, Nurture)
- Help Center articles (базовые)
- Product video tutorials (о продукте, не интервью)
- VIP-клиенты отбор и outreach

**Communication:**
- Weekly Sync (Friday, PM + CEO/CTO)
- Bi-Weekly Grooming
- Milestone presentations (недели 6, 10, 17)

**Testing:**
- E2E tests (недели 10, 16-17)
- Load Testing (неделя 16: 50 одновременных запросов)
- UAT с VIP-клиентами (неделя 17)

### ✅ Соответствие MVP:

**Manual-first approach четко описан:**
- Orchestrators работают вручную (Notion/Sheets)
- Нет автоматизированного enrichment
- Нет automated metrics dashboard
- Admin Console минимальный (только кнопки)

**Workarounds задокументированы:**
- Видео: внешние Loom-ссылки в текстовом поле
- Analytics: Google Sheets tracking
- Rejection Loop: manual escalation

### ❌ Что могло быть лучше:

1. **Migration plan отсутствует:**
   - Как мигрируем существующие SR в новую схему БД?
   - Нужна ли миграция или только новые SR используют Ultra?
   - Zero-downtime migration возможна?

2. **Rollback стратегия не детализирована:**
   - Что делаем если Phase 3 (Explicit) провалилась?
   - Можем ли откатиться к только Implicit?
   - Как возвращаем деньги клиентам?

3. **Post-Soft-Launch plan не конкретен:**
   - Неделя 17 - Soft Launch, а дальше что?
   - Сколько времени собираем фидбек перед Full Launch?
   - Критерии Go/No-Go для Full Launch?
   - Когда принимаем решение о Q2-Q3?

4. **Training materials для Orchestrators:**
   - SOP есть, но где хранятся?
   - Видео-туториалы для Orchestrators или только текст?
   - Как обновляются SOP на основе опыта?

5. **Knowledge transfer:**
   - Что если Operations Manager уходит после Q1?
   - Кто документирует learnings?
   - Как передаем знания новым Orchestrators в Q2?

**Оценка HOW: 9.0/10** (хорошо, нужны детали про migration и post-launch)

---

## 7. Покрытие PRD Scout Ultra

### ✅ Покрытие разделов PRD в Q1 MVP:

| Раздел PRD | Покрытие Q1 | Комментарий |
|------------|-------------|-------------|
| 1. Контекст и Задача | ✅ 10/10 | Полностью покрыто |
| 2. Ролевая модель | ✅ 10/10 | Client, Orchestrator, Candidate |
| 3. User Stories | ✅ 9/10 | Implicit + Explicit, без Enrichment Flow |
| 4. Client-Side UI | ✅ 9/10 | Все кроме видео (WF-C05) |
| 5. Admin Console | ⚠️ 7/10 | Минимальный в Q1, full в Q2 |
| 6. Данные и Алгоритмы | ✅ 10/10 | EPIC 1 покрывает полностью |
| 7. Интеграции | ✅ 9/10 | Stripe + Calendly + Email/Slack, без Loom |
| 8. Дизайн и Wireframes | ⚠️ 8/10 | 8 из 12 wireframes в Q1 |
| 9. Negative Scenarios | ⚠️ 7/10 | Базовый feedback, автоматизация в Q2 |

**Средняя оценка покрытия PRD в Q1:** 8.8/10

**Перенесено на Q2-Q3 (обоснованно):**
- Story 3.3: Enrichment & Verification Flow (видео-интервью)
- Раздел 5: Полная Admin Console (Pipeline View, Enrichment Module)
- Раздел 8: Видео-wireframes (WF-C05, WF-A04)
- Раздел 9: Automated Quality Control

### ✅ Логика приоритизации:

**Q1: Валидация ценности для клиента**
- Фокус на Client-Side (что видит пользователь)
- Orchestrator работает вручную (операционная неэффективность допустима для MVP)

**Q2: Операционная эффективность**
- Advanced Admin Console
- Automated Quality Control
- AI-powered tools

**Q3: Дифференциация**
- Видео-верификация
- Структурированные интервью

**Эта логика соответствует исходному заданию:** ✅
- "Сначала база на стороне пользователя" → Q1
- "Потом докрутка интерфейса оркестратора" → Q2
- "MVP и тестирование, идти по нарастающей" → Q1 → Q2 → Q3

**Оценка покрытия PRD: 9.5/10** (отлично с учетом MVP-подхода)

---

## Итоговая оценка по критериям

| Критерий | Вес | Оценка | Взвешенная | Комментарий |
|----------|-----|--------|------------|-------------|
| WHAT: Полнота функционала | 20% | 9.5 | 1.90 | Отлично, мелкие улучшения |
| WHY: Бизнес-ценность | 15% | 9.0 | 1.35 | Нужны финансовые детали |
| WHO: Ресурсы и роли | 15% | 9.3 | 1.40 | Очень хорошо, детали про людей |
| WHEN: Временные рамки | 15% | 9.0 | 1.35 | Нужны буферы и contingency |
| WHERE: Архитектурный контекст | 10% | 8.5 | 0.85 | Детали архитектуры и geo |
| HOW: Процессы реализации | 15% | 9.0 | 1.35 | Детали migration и post-launch |
| Покрытие PRD | 10% | 9.5 | 0.95 | Отлично с учетом MVP |

**ИТОГОВАЯ ОЦЕНКА: 9.15/10**

---

## Вердикт

❌ **Оценка ниже требуемых 9.8/10**

**Требуется доработка по следующим пунктам:**

### Критические улучшения (Must Fix):

1. **Добавить буферы в Q1 роадмап** (+0.2)
   - Неделя 10: Phase 2 Buffer (после Implicit)
   - Неделя 18: Q1 Buffer (после Soft Launch, перед решением о Q2)

2. **Детализировать финансы** (+0.2)
   - Стоимость Q1 команды (оценка бюджета)
   - ROI projection (сколько нужно платных запросов для окупаемости)
   - Break-even point

3. **Архитектурное решение** (+0.1)
   - Рекомендация: микросервис или монолит?
   - Последствия выбора
   - Migration plan (если нужна)

4. **Post-Soft-Launch plan** (+0.15)
   - Длительность Soft Launch (1-3 недели?)
   - Критерии Go/No-Go для Full Launch
   - Timeline принятия решения о Q2-Q3

5. **Rollback strategy** (+0.1)
   - Что делаем если Q1 провалился?
   - Как возвращаем деньги клиентам?
   - Как откатываемся к Implicit-only?

6. **Contingency для внешних зависимостей** (+0.05)
   - Stripe compliance review может затянуться
   - Calendly integration может быть сложнее

### Nice to Have (рекомендации):

- Конкретные имена/кандидаты на роли
- Географический контекст Orchestrators (timezone)
- Training materials format (видео vs текст)
- Knowledge transfer plan

---

## Начинаю доработку документа

Цель: довести оценку до 9.8+/10
