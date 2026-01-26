# Scout Ultra: Изменения в роадмапе (MVP-First подход)

**Дата:** 2026-01-22  
**Причина изменений:** Фокус на Q1 MVP без интервью/видео, оркестратор работает вручную

---

## Что изменилось

### Общая стратегия:
**Было:** 32 недели до Full Launch с видео и advanced tools  
**Стало:** 17 недель до Q1 Soft Launch (MVP), потом Q2-Q3 для расширенного функционала

**Философия:**
- ✅ Сначала клиентская сторона (что видит пользователь)
- ✅ Оркестратор работает вручную (Notion, Google Sheets, Email)
- ✅ Минимальная автоматизация в Admin Console
- ❌ НЕТ видео-интервью в Q1
- ❌ НЕТ enrichment профилей в интерфейсе
- ❌ НЕТ advanced tools для Orchestrator

---

## Изменения по эпикам

### EPIC 2: Orchestrator Admin Console
**Было:** Полноценный 3-колоночный интерфейс с Enrichment Module  
**Стало (Q1):** Минимальный интерфейс
- Список назначенных SR (read-only)
- Кнопка Copy Share Pack / Copy Invite Pack
- Кнопка "Notify Client" (когда готов шорт-лист)
- Orchestrator работает через Notion/Sheets вручную

**Оценка:** 4-5 недель → 1-2 недели

**Перенесено на Q2-Q3:**
- Pipeline View с редактированием
- Enrichment Module в интерфейсе
- Status Management
- Task Queue с приоритизацией
- Analytics Dashboard

---

### EPIC 4: Explicit Mode
**Было:** Enhanced Shortlist с встроенным видео-плеером  
**Стало (Q1):** Shortlist с текстовыми комментариями менеджера

**Изменения:**
- ❌ Убран Video Player
- ❌ Убран блок "Video Snippet"
- ✅ Оставлен текстовый "Scout Summary"
- ✅ Оставлены все остальные компоненты (Progress Widget, Concierge Card)

**Оценка:** 5-6 недель → 4-5 недель

**Workaround в Q1:** Orchestrators могут шарить внешние Loom-ссылки в текстовом комментарии (manual)

---

### EPIC 6: Advanced Orchestrator Tools
**Было:** Часть основного роадмапа (Phase 4)  
**Стало:** ПОЛНОСТЬЮ перенесено на Q2

**Перенесенные компоненты:**
- AI Distribution Recommendations
- Shadow Profiles
- Bulk Invite Pack Generator
- Analytics Dashboard для Orchestrators

**Причина:** Не критично для валидации PMF, Orchestrators работают вручную в Q1

---

### EPIC 7: Quality Control & Feedback Loop
**Было:** Полная автоматизация (Rating System, Audit Trail, Rejection Loop)  
**Стало (Q1):** Только базовый Client Feedback

**Q1 включает:**
- ✅ Простой Feedback Form (NPS + текстовое поле)
- ✅ Manual escalation при проблемах

**Перенесено на Q2-Q3:**
- Orchestrator Rating System
- Automated KPI tracking
- Audit Trail & GDPR compliance automation
- Automated Rejection Loop

**Оценка:** 3-4 недели → 1 неделя (Q1)

---

### EPIC 8: Video Infrastructure & Enrichment
**Было:** Часть основного роадмапа (Phase 5)  
**Стало:** ПОЛНОСТЬЮ перенесено на Q2-Q3

**Все компоненты перенесены:**
- Video Recording Integration
- Video Storage & Delivery
- In-App Video Player
- Transcription & Searchability

**Причина:** Видео - важная дифференциация, но не критична для валидации спроса

**Workaround в Q1:** Orchestrators шарят внешние Loom-ссылки вручную в текстовом поле

---

### EPIC 9: Design System & Wireframes
**Было:** 12 wireframes (7 Client + 5 Admin)  
**Стало (Q1):** 8 wireframes (6 Client + 2 Admin)

**Client-Side (6 экранов):**
- ✅ WF-C01: Entry Points & Activation
- ✅ WF-C02: Ultra Progress Dashboard
- ✅ WF-C03: Concierge Card
- ✅ WF-C04: Enhanced Shortlist (БЕЗ видео)
- ✅ WF-C05: Negative Scenarios UI
- ✅ WF-C06: Onboarding Tooltips

**Admin-Side (2 экрана - минимальные):**
- ✅ WF-A01: Assignment List (простой список)
- ✅ WF-A02: Distribution Helper (копирование ссылок)

**Перенесено на Q2-Q3:**
- ~~WF-C05 (было): Video Player Modal~~
- ~~WF-A02 (было): SR Workbench (3-колоночный)~~
- ~~WF-A03: Enrichment Modal~~
- ~~WF-A04: Analytics Dashboard~~

**Оценка:** 3-4 недели → 2-3 недели

---

### EPIC 10: Operations & Enablement
**Было:** 5 SOP включая Video Interviewing Guide  
**Стало (Q1):** 4 SOP без видео

**Q1 включает:**
- ✅ SOP-001: Работа с назначенным SR
- ✅ SOP-002: Direct Outreach Best Practices
- ✅ SOP-003: Escalation Matrix
- ✅ SOP-004: SLA Breach Protocol

**Перенесено на Q2-Q3:**
- ~~SOP-003 (было): Video Interviewing Guide~~
- Automated Metrics Dashboard

**Оценка:** 3-4 недели → 2-3 недели

---

## Обновленный роадмап Q1

| Фаза | Недели | Ключевые deliverables |
|------|--------|----------------------|
| Phase 0: Pre-Dev | 0-2 | Tech Spec, Design System v0.1 |
| Phase 0.5: Operations Prep | 3-4 | Hiring Orchestrators, SOP start |
| Phase 1: Foundation | 3-6 | DB + Assignment Logic + Admin Console minimal |
| Phase 2: Implicit Mode | 7-10 | Автотриггеры + Beta Testing + Client-Side wireframes |
| Phase 3: Explicit Mode | 11-17 | Paywall + Booking + Progress Widget + GTM + Soft Launch |

**ИТОГО Q1:** 17 недель (~4 месяца) до Soft Launch

---

## План Q2-Q3 (после MVP)

### Q2 (недели 18-30):
- **EPIC 6:** Advanced Orchestrator Tools (AI, Shadow Profiles, Analytics)
- **EPIC 7 (full):** Automated Quality Control (Rating, Audit Trail, Rejection Loop)
- **EPIC 2 (full):** Full Admin Console (Pipeline View, Enrichment в интерфейсе)

**Длительность:** ~12 недель

### Q3 (недели 31-40):
- **EPIC 8:** Video Infrastructure (Recording, Storage, In-App Player, Transcription)
- Enhanced Enrichment (Structured Interview Guides, AI-powered summaries)

**Длительность:** ~10 недель

**ИТОГО до Full Launch с видео:** ~39 недель (~9 месяцев)

---

## Ключевые преимущества нового подхода

### 1. Быстрее валидация PMF
- **Было:** 19 недель до Soft Launch Explicit
- **Стало:** 17 недель до Soft Launch
- **Экономия:** 2 недели + меньше рисков

### 2. Меньше технической сложности
- Нет видео-инфраструктуры в Q1 (S3, CDN, плеер)
- Нет AI tools в Q1 (LLM integration)
- Нет сложного Admin Console

### 3. Фокус на клиентском опыте
- 100% усилий на то, что видит пользователь
- Orchestrator операции - manual workarounds
- Меньше багов, лучше UX

### 4. Меньше ресурсов в Q1
- **Было:** Peak load 9-10 FTE одновременно
- **Стало:** Peak load 7-8 FTE в Q1
- **Экономия:** ~20% команды

### 5. Гибкость для итераций
- После Q1 Soft Launch можем пересмотреть Q2-Q3 план
- Если видео не нужно - не делаем
- Если нужны другие advanced tools - приоритизируем

---

## Риски нового подхода

### Риск 1: Manual operations не масштабируются
**Митигация:** 
- Q1: 2-3 Orchestrators, 10-20 SR/неделя (manageable вручную)
- Q2: Если demand растет → приоритизируем EPIC 6 (Advanced Tools)

### Риск 2: Клиенты ожидают видео
**Митигация:**
- Не обещаем видео в маркетинге Q1
- Workaround: Orchestrators шарят внешние Loom-ссылки
- Q3: Добавляем видео как "новую фичу"

### Риск 3: Качество кандидатов без структурированных интервью
**Митигация:**
- SOP-001 и SOP-002 дают структуру для manual screening
- Orchestrators - опытные рекрутеры
- Q1: Собираем feedback, что улучшить для Q2-Q3

---

## Метрики успеха Q1 (Soft Launch)

### Must-Have для продолжения в Q2:
- [ ] 3+ платных запроса получены
- [ ] NPS > 7/10 для Ultra-клиентов
- [ ] SLA Compliance > 90% (закрыто за 48h)
- [ ] Rejection Rate < 30%

### Nice-to-Have:
- [ ] Zero-Result Rate < 20% за 24h (Implicit Mode)
- [ ] Outreach Efficiency > 10% (Invite → Response)
- [ ] 5-10 VIP-клиентов дали позитивный feedback

---

## Следующие шаги

### Немедленно (неделя -2 до Phase 0):
1. ✅ Утверждение нового Q1 MVP роадмапа
2. Обновление беклога (удалить задачи EPIC 6, 8 из Q1)
3. Пересчет бюджета (меньше ресурсов = экономия)

### Phase 0 Kickoff (неделя 0):
1. Design Sprint с фокусом на 8 wireframes (не 12)
2. Tech Planning с учетом minimal Admin Console
3. Hiring Orchestrators (2-3 человека, опыт рекрутинга)

### После Q1 Soft Launch (неделя 17):
1. Retrospective: что сработало, что нет
2. Решение о Q2: Go/No-Go на Advanced Tools
3. Решение о Q3: Go/No-Go на Video Infrastructure

---

**Статус:** ✅ Документ обновлен под Q1 MVP  
**Новые файлы:**
- Scout Ultra - Roadmap Table Q1.tsv (обновленная таблица)
- Scout Ultra - Epics Summary Q1.tsv (обновленный список эпиков)
- Scout Ultra - Q1 MVP Changes Summary.md (этот документ)
