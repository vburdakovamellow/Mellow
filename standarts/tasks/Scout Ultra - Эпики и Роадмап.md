# Scout Ultra: Разбивка на Эпики и Роадмап Релизов

## Общая стратегия запуска (MVP-First)

**Философия поэтапного релиза:**
- **MVP First**: Сначала запускаем клиентскую сторону, оркестратор работает вручную (минимальный или без интерфейса)
- **Manual Operations**: Оркестратор использует существующие инструменты (email, Notion, Google Sheets) до автоматизации
- **Client Experience Priority**: Фокус на том, что видит пользователь. Операционную эффективность улучшаем во второй очереди
- **No Video/Interviews in Q1**: Видео-верификация и структурированные интервью откладываются на Q2-Q3
- **Data-Driven Iteration**: Каждый релиз дает метрики для калибровки следующего

---

## Структура Эпиков

### EPIC 1: Foundation & Core Infrastructure
**Описание:** Базовая инфраструктура для работы функционала Ultra без UI

**Ценность для бизнеса:** Создание фундамента для обоих режимов работы

**Зависимости:** Нет критических зависимостей

**Компоненты:**

#### 1.1. Data Model & Database Schema
- Расширение сущности `Service Request` (добавление полей: `ultra_mode`, `orchestrator_id`, `sla_timer`, `ultra_status`)
- Создание таблицы `Ultra_Assignments` (связка SR ↔ Orchestrator с историей)
- Расширение сущности `Candidate Profile` (поля: `verified_by_scout`, `scout_summary`, `video_url`, `candidate_source`)
- Таблица `Orchestrator_Status` (статус, load, availability calendar)

#### 1.2. Assignment Logic (Backend)
- Алгоритм Sticky Assignment (привязка клиента к менеджеру)
- Алгоритм Round Robin с Load Balancing
- Система статусов Оркестратора (`Active`, `Busy`, `Offline`)
- Триггеры автоназначения (Implicit mode: 1h idle + zero matches)

#### 1.3. Scoring Integrity Layer
- Механизм "No-Bypass Rule" (запрет ручного проставления скора)
- Auto-Recalculation при Admin Override профиля
- Trust Multiplier для бейджа `Verified by Scout`

#### 1.4. Attribution System
- Трекинг источников кандидатов (`candidate_source`: Organic / Ultra_Outreach / Ultra_Database)
- Уникальные UTM-ссылки для Invite Packs с привязкой к `orchestrator_id`
- Фиксация `conversion_trigger` (кто инициировал отклик)

**Definition of Done:**
- [ ] Миграции БД выполнены и протестированы
- [ ] API endpoints для управления назначениями работают
- [ ] Unit-тесты покрывают логику назначения на 80%+
- [ ] Документация по Data Model утверждена

**Оценка:** 3-4 недели (2 backend-разработчика)

---

### EPIC 2: Orchestrator Admin Console (MVP - Минимальный)
**Описание:** Базовый интерфейс для мониторинга и управления назначениями (Q1: максимально упрощенный)

**Ценность для бизнеса:** Минимальная автоматизация для запуска Implicit-режима, основная работа вручную

**Зависимости:** EPIC 1 завершен

**Компоненты (MVP для Q1):**

#### 2.1. Dashboard - Просмотр назначений
- Список назначенных SR с базовой информацией (роль, навыки, статус)
- Read-only view (без редактирования в интерфейсе)
- Ссылка "Open SR" (переход на клиентскую страницу SR для просмотра)

#### 2.2. Distribution Helper (Минимальный)
- Кнопка Copy Share Pack (публичная ссылка на SR)
- Генератор Invite Pack (персональная UTM-ссылка для outreach)
- Список рекомендованных площадок (hardcoded по роли)

#### 2.3. Manual Workflow Support
- Оркестратор работает через внешние инструменты:
  - Email для коммуникации с кандидатами
  - Notion/Google Sheets для трекинга прогресса
  - Slack для внутренней коммуникации
- Admin Console используется только для:
  - Получения ссылок (Share/Invite Pack)
  - Просмотра списка откликов (read-only)
  - Уведомления клиента о готовности (кнопка "Notify Client")

**Что НЕ входит в Q1 (переносится на Q2-Q3):**
- ❌ Enrichment Module (обогащение профилей в интерфейсе)
- ❌ Pipeline View с редактированием
- ❌ Status Management (Active/Busy/Offline)
- ❌ Task Queue с приоритизацией
- ❌ "View as Client" preview

**Definition of Done (MVP):**
- [ ] Оркестратор видит список назначенных SR
- [ ] Может скопировать Share/Invite Pack
- [ ] Может уведомить клиента о готовности (кнопка)
- [ ] Кандидаты отображаются read-only (без редактирования)

**Оценка:** 1-2 недели (1 fullstack, минимальный дизайн)

---

### EPIC 3: Implicit Mode (Client-Side)
**Описание:** "Магический" режим работы – кандидаты появляются незаметно для пользователя

**Ценность для бизнеса:** Решение проблемы "холодного старта" и Zero-Results без явного вовлечения пользователя

**Зависимости:** EPIC 1 + EPIC 2 завершены

**Компоненты:**

#### 3.1. Backend Trigger System
- Детектор "тишины" (SR создан, 1 час без активности, 0 откликов)
- Проверка Mellow Free Pool (если Match Score всех кандидатов < 70% → триггер Ultra)
- Автоназначение на Оркестратора

#### 3.2. Silent Orchestration Flow
- Генерация уникальных Invite Packs для Implicit-режима
- Отслеживание откликов от Ultra-sourced кандидатов
- Автоматическая отправка стандартного уведомления клиенту ("New Match Found")

#### 3.3. Client Notification (Seamless)
- Email/Push уведомление: "Новый кандидат откликнулся на ваш запрос"
- Переход в стандартный интерфейс SR (без упоминания Ultra)

**Definition of Done:**
- [ ] Автоматический триггер назначения работает
- [ ] Кандидаты, приведенные Оркестратором, появляются у клиента
- [ ] Клиент НЕ видит следов ручной работы
- [ ] Атрибуция `Ultra_Outreach` фиксируется корректно

**Оценка:** 2-3 недели (1 backend + 1 frontend для интеграции уведомлений)

---

### EPIC 4: Explicit Mode Activation & UI
**Описание:** Платный режим Ultra с прозрачностью процесса для клиента

**Ценность для бизнеса:** Монетизация услуги, выполнение SLA-обязательств

**Зависимости:** EPIC 1, EPIC 2, EPIC 3 завершены

**Компоненты:**

#### 4.1. Entry Points & Upgrade Flow
- Блок "Zero-Results State" с CTA "Upgrade to Ultra"
- Баннер "Get Help" в активном SR Dashboard
- Paywall и интеграция с платежной системой (Stripe/LemonSqueezy)
- Форма выбора слота для калибровочного звонка

#### 4.2. Booking Integration
- Интеграция с Google Calendar API / Calendly
- Отображение свободных слотов назначенного Оркестратора
- Автоматическое создание Google Meet/Zoom ссылки
- Email/Calendar Invite обеим сторонам

#### 4.3. Ultra Progress Widget (Client Dashboard)
- Таймер SLA (обратный отсчет от 48:00:00)
- Прогресс-бар с этапами: Calibration → Sourcing → Screening → Ready
- Ticker/Activity Log (симуляция или реальные логи)

#### 4.4. Concierge Card (Карточка Личного Скаута)
- Аватар и имя назначенного Оркестратора
- Бейдж "Personal Scout"
- Кнопка "Chat" (базовая версия: mailto / интеграция с Intercom в будущем)
- Кнопка "Schedule Call" (повторная синхронизация)
- Индикатор статуса (Online/Offline)

#### 4.5. Enhanced Shortlist View (Results - без видео в Q1)
- Бейдж "Ultra Verified" на карточке кандидата
- Блок "Scout Summary" (текстовый комментарий менеджера)
- Стандартные CTA ("Interview", "Offer")

**Что НЕ входит в Q1 (переносится на Q2-Q3):**
- ❌ Video Player (видео-саммари интервью)
- ❌ Structured interview artifacts

**Definition of Done (MVP):**
- [ ] Клиент может оплатить Ultra и выбрать слот
- [ ] Видит Progress Widget с таймером
- [ ] Видит карточку личного менеджера
- [ ] Получает шорт-лист с текстовыми комментариями менеджера
- [ ] End-to-end тест платного флоу работает

**Оценка:** 4-5 недель (2 fullstack + дизайн 1.5 недели)

---

### EPIC 5: Notifications & Communication Layer
**Описание:** Система уведомлений для координации между Orchestrator ↔ Client ↔ Candidate

**Ценность для бизнеса:** Минимизация пропущенных SLA, прозрачность процесса

**Зависимости:** EPIC 2, EPIC 4 завершены

**Компоненты:**

#### 5.1. Notification Service (Backend)
- Centralized Notification Manager (очередь событий)
- Шаблоны сообщений (Email/Push/Slack)
- Логика приоритизации (критические SLA-уведомления)

#### 5.2. Orchestrator Notifications
- Slack/Telegram Bot интеграция
- Уведомления: New Assignment, SLA Warning (T-4h), Client Question
- Push-уведомления в Admin Console

#### 5.3. Client Notifications
- Email + In-App уведомления
- Триггеры: Booking Confirmed, Scout Question, Shortlist Ready, Magic Match
- Настройки предпочтений уведомлений (opt-out для некритических)

#### 5.4. Candidate Notifications
- Email при получении Invite Pack от Оркестратора
- Напоминания о прохождении скоринга

**Definition of Done:**
- [ ] Все триггеры из Notification Matrix работают
- [ ] Оркестратор получает Slack/Push при назначении
- [ ] Клиент получает уведомления на ключевых этапах
- [ ] A/B тест доставляемости и open rate

**Оценка:** 3-4 недели (1 backend + интеграции)

---

### EPIC 6: Advanced Orchestrator Tools
**⚠️ НЕ ВХОДИТ В Q1 - ПЕРЕНЕСЕНО НА Q2-Q3**

**Описание:** Продвинутые инструменты для повышения эффективности работы менеджера

**Причина переноса:** Фокус на MVP. Orchestrators работают вручную в Q1, автоматизация и advanced tools нужны позже для масштабирования.

**Ценность для бизнеса:** Масштабирование (1 Оркестратор может вести больше SR)

**Зависимости для будущей реализации:** EPIC 2 завершен, опыт работы с manual workflow

**Компоненты (для Q2-Q3):**

#### 6.1. AI-Powered Distribution Recommendations
- LLM-анализ Service Request → генерация списка релевантных площадок
- Интеграция с базой знаний о каналах распространения
- A/B тест: AI-подсказки vs hardcoded список

#### 6.2. Shadow Profiles (Quick Add)
- Форма быстрого создания профиля из ссылки LinkedIn/GitHub
- OpenGraph parser / Proxycurl API
- Автодобавление в Mellow Pool с флагом "Scout Added"

#### 6.3. Bulk Invite Pack Generator
- Массовая генерация уникальных ссылок (для outreach кампаний)
- Экспорт в CSV для email-рассылок
- Трекинг кликов и конверсий

#### 6.4. Analytics Dashboard (Orchestrator)
- Персональная статистика: конверсия Invite → Response
- Среднее время закрытия SR
- Сравнение с другими менеджерами (leaderboard для gamification)

**Definition of Done:**
- [ ] AI-подсказки генерируются корректно
- [ ] Оркестратор может создать Shadow Profile из ссылки
- [ ] Bulk Invite Pack работает
- [ ] Analytics доступна в Admin Console

**Оценка:** 4-5 недель (1 backend + 1 frontend + LLM интеграция)

---

### EPIC 7: Quality Control & Feedback Loop
**⚠️ ЧАСТИЧНО В Q1, ПОЛНАЯ ВЕРСИЯ В Q2-Q3**

**Описание:** Механизмы контроля качества работы Оркестраторов и непрерывного улучшения

**Ценность для бизнеса:** Защита репутации, основа для масштабирования команды Scout

**Зависимости:** EPIC 4 завершен (нужен опыт работы клиентов)

**Компоненты (Q1 MVP - базовый feedback):**

#### 7.1. Client Feedback on Shortlist (Q1 - простая версия)
- Опрос после завершения Ultra SR: "Насколько релевантны были кандидаты?"
- NPS-метрика для Ultra-сервиса
- Опциональное текстовое поле для комментариев

**⚠️ Перенесено на Q2-Q3:**

#### 7.2. Orchestrator Rating System (Q2-Q3)
- Автоматический расчет KPI (SLA compliance, response conversion rate)
- Внутренний рейтинг для приоритизации назначений
- Dashboard для руководителя Scout-команды

#### 7.3. Audit Trail & Compliance (Q2-Q3)
- Лог всех действий Оркестратора (Admin Override, Invite sent, Profile edited)
- Возможность отката изменений (rollback)
- GDPR-compliance: право клиента запросить удаление данных Ultra-артефактов

#### 7.4. Rejection Loop Handling (базовая версия в Q1, автоматизация в Q2-Q3)
- Q1: Manual escalation при отклонении всех кандидатов
- Q2-Q3: Автоматический триггер и реассайнмент
- Q2-Q3: Компенсация клиенту (продление SLA / возврат средств)

**Definition of Done (Q1 MVP):**
- [ ] Клиенты могут оставить простой фидбек после Ultra SR (NPS + текст)
- [ ] Rejection Loop обрабатывается вручную (manual escalation)
- [ ] Базовая компенсационная политика определена

**⚠️ Для Q2-Q3:** Automated KPI tracking, Audit Trail, автоматический Rejection Loop

**Оценка:** 1 неделя (Q1 - только базовый feedback form), 3-4 недели для полной версии в Q2-Q3

---

### EPIC 8: Video Infrastructure & Enrichment
**⚠️ НЕ ВХОДИТ В Q1 - ПЕРЕНЕСЕНО НА Q2-Q3**

**Описание:** Инфраструктура для записи, хранения и воспроизведения видео-интервью

**Причина переноса:** Фокус на MVP клиентского опыта. Видео-верификация - важный дифференциатор, но не критична для валидации Product-Market Fit.

**Альтернатива в Q1:** 
- Оркестраторы могут шарить внешние Loom-ссылки в текстовом комментарии (manual workaround)
- Клиенты получают текстовые саммари от менеджера

**Зависимости для будущей реализации:** EPIC 4 (Explicit Mode должен работать стабильно)

**Компоненты (для Q2-Q3):**

#### 8.1. Video Recording Integration
- Интеграция с Loom API / Zoom Cloud Recording
- Автоматическая загрузка видео после окончания встречи
- Генерация короткого саммари-клипа (AI-based highlights)

#### 8.2. Video Storage & Delivery
- S3/Cloudflare Stream для хостинга
- Adaptive Bitrate Streaming для быстрой загрузки
- Приватность: видео доступны только по токенизированным ссылкам

#### 8.3. In-App Video Player
- Встроенный плеер в карточке кандидата (модальное окно)
- Контролы: skip to timestamp (по главам, если доступна транскрипция)
- Fallback: кнопка "Download Full Interview"

#### 8.4. Transcription & Searchability
- Автоматическая транскрипция (Whisper API)
- Поиск по ключевым словам в тексте интервью
- Генерация тайм-кодов для навигации

**Оценка:** 4-5 недель (1 backend + 1 frontend + DevOps) - для Q2-Q3

---

### EPIC 9: Design System & Wireframes
**Описание:** Детальная проработка всех экранов интерфейса согласно PRD Раздел 8

**Ценность для бизнеса:** Гарантия единообразия UX, ускорение frontend-разработки

**Зависимости:** Нет (начинается в Phase 0)

**Компоненты:**

#### 9.1. Client-Side Wireframes (5 экранов для Q1)

**WF-C01: Entry Points & Activation**
- Zero-State Banner (заглушка при 0 результатах)
- Pricing Card ($199/token, SLA 48h, Human Screening)
- Booking Modal (календарь выбора слота)
- States: Default, Hover, Loading

**WF-C02: Ultra Progress Dashboard**
- SLA Timer (Hero element, Monospace, цветовая индикация)
- Progress Stepper (Calibration → Sourcing → Screening → Ready)
- Live Activity Ticker (симуляция логов)
- Bento Grid layout (блочная структура)

**WF-C03: Concierge Card (Sticky)**
- Аватар Orchestrator (круг, качественное фото)
- Имя + бейдж "Personal Scout"
- Status indicator (Online/Offline/In a call)
- Кнопки: "Chat", "Schedule Call"
- Tone of Voice: "Я работаю над вашей задачей"

**WF-C04: Enhanced Shortlist View (без видео)**
- Enriched Candidate Card (золотая обводка, бейдж "Ultra Verified")
- Scout's Note (текстовый блок с комментарием "Почему подходит")
- Actions: "Request Interview", "Request Revision"

**WF-C05: Negative Scenarios UI**
- SLA Breach Alert (желтый/красный баннер, текст компенсации)
- Revision Request Modal (форма с причинами отказа)
- Rating Toast (всплывающее окно с звездами)

**WF-C06: Onboarding Tooltips**
- Welcome to Ultra (первый вход)
- Tooltip на Progress Widget ("Что означает таймер?")
- Tooltip на Concierge Card ("Как связаться с менеджером?")

**⚠️ Перенесено на Q2-Q3:**
- ~~WF-C05: Video Player Modal~~ (не нужно без видео-функционала)

#### 9.2. Admin-Side Wireframes (2 экрана для Q1 MVP)

**WF-A01: Assignment List (Минимальный Dashboard)**
- Простой список назначенных SR
- Columns: SR ID, Role, Client, Status, SLA Timer
- Кнопка "Copy Share Pack", "Copy Invite Pack"
- Кнопка "Open SR" (переход на клиентскую страницу)

**WF-A02: Distribution Helper (Standalone Page)**
- Share Pack: Copy button с Toast подтверждением
- Invite Pack: Генератор уникальных ссылок с UTM
- Список рекомендованных площадок (hardcoded по роли)
- Кнопка "Notify Client" (когда готов шорт-лист)

**⚠️ Перенесено на Q2-Q3 (не критично для MVP):**
- ~~WF-A02: SR Workbench (3-колоночная верстка)~~ - слишком сложно, работа вручную
- ~~WF-A04: Enrichment Modal~~ - не нужно, редактирование профилей вручную
- ~~WF-A05: Analytics Dashboard~~ - не критично для запуска

**Логика Q1:** Оркестратор работает через внешние инструменты (Notion, Google Sheets, Email), Admin Console используется только для получения ссылок и уведомления клиента.

#### 9.3. UI Components Library

**Reusable Components:**
- Ultra Badge (золотой, анимированный)
- SLA Timer Component (с градиентом по времени)
- Progress Stepper (4 этапа, пульсация активного)
- Concierge Avatar (с online indicator)
- Video Thumbnail (с overlay play button)
- Toast Notifications (4 типа: success, warning, error, info)
- Modal Windows (3 размера: small, medium, large)
- Action Buttons (primary, secondary, danger)

**Design Tokens:**
- Colors: Ultra Gold (#FFD700), SLA Red (#FF4444), SLA Yellow (#FFA500), Success Green (#00C851)
- Typography: Timer (Monospace 48px), Headlines (Sans 24px), Body (Sans 16px)
- Spacing: Grid 8px
- Shadows: Card elevation (3 уровня)
- Animations: Pulse (active state), Fade (transitions), Slide (modals)

**Definition of Done (Q1 MVP):**
- [ ] 6 Client-Side wireframes созданы в Figma (WF-C01 - WF-C06)
- [ ] 2 Admin-Side wireframes (минимальные) созданы
- [ ] UI Components Library (базовая) документирована
- [ ] Design System утвержден командой
- [ ] Handoff документация для frontend

**⚠️ Для Q2-Q3:** Остальные wireframes (видео, enrichment, analytics)

**Оценка:** 2-3 недели (1 дизайнер full-time) - сокращено с 3-4 недель

---

### EPIC 10: Operations & Enablement
**Описание:** Операционная подготовка для запуска Ultra (найм, обучение, SOP)

**Ценность для бизнеса:** Без обученных Orchestrators функционал не заработает

**Зависимости:** EPIC 2 (Admin Console должна быть готова для обучения)

**Компоненты:**

#### 10.1. Hiring & Onboarding

**Найм первых Orchestrators:**
- Job Description для роли Scout Orchestrator
- Скрининг-критерии (опыт в рекрутинге, знание фриланс-рынков)
- Interview Guide (вопросы для оценки кандидатов)
- Целевой найм: 2-3 менеджера до Phase 2

**Onboarding Program (1 неделя):**
- День 1: Знакомство с продуктом Mellow, философия Ultra
- День 2-3: Обучение Admin Console (hands-on с тестовыми SR)
- День 4: Практика Sourcing (как искать кандидатов, писать outreach)
- День 5: Практика Interviewing (как проводить видео-скрининг)
- Сертификация: тестовое задание (закрыть mock SR за 24h)

#### 10.2. Standard Operating Procedures (SOP)

**SOP-001: Работа с назначенным SR (от получения до Release):**
1. Получение уведомления о назначении (Slack/Email)
2. Анализ SR (роль, скиллы, бюджет, timezone клиента)
3. Планирование sourcing стратегии (где искать кандидатов)
4. Дистрибуция Share Pack (3+ площадки обязательно)
5. Direct Outreach (минимум 10 Invite Packs в первые 12h)
6. Мониторинг откликов (проверка каждые 4 часа)
7. Скрининг кандидатов (видео-интервью, заметки)
8. Enrichment (добавление саммари, видео, Verified badge)
9. Release to Client (когда 3+ кандидата готовы)
10. Post-Release: мониторинг фидбека клиента

**SOP-002: Direct Outreach Best Practices:**
- Шаблоны сообщений (5 вариантов под разные роли)
- Personalization checklist (как кастомизировать под кандидата)
- Follow-up стратегия (когда и как напоминать)
- Do's and Don'ts (что можно обещать, чего нельзя)

**SOP-003: Escalation Matrix:**
- Когда звать помощь? (не можем найти кандидатов за 24h, клиент недоволен)
- Кому эскалировать? (Team Lead Scout → Product Manager → CEO)
- Как оформлять эскалацию (формат тикета)

**SOP-004: SLA Breach Protocol:**
- Что делать если не успеваем за 48h?
- Коммуникация с клиентом (честность + компенсация)
- Внутренний post-mortem (что пошло не так?)

#### 10.3. Tools & Resources

**Playbook для разных типов запросов:**
- Tech roles (Developers, DevOps, QA) → где искать (GitHub, Stack Overflow Jobs, Reddit r/forhire)
- Design roles (UI/UX, Graphic) → где искать (Dribbble, Behance, Designer News)
- Marketing roles (Copywriters, SMM) → где искать (Twitter, LinkedIn groups)
- Редкие roles (Rust Developer, ML Engineer) → специализированные каналы

**Outreach Templates Library:**
- 10+ готовых шаблонов сообщений
- Переменные для автозаполнения ({{role}}, {{rate}}, {{project_description}})
- A/B tested версии (с разными subject lines)

**Internal Knowledge Base:**
- FAQ для Orchestrators (ответы на типичные вопросы)
- Video tutorials (как пользоваться Admin Console)
- Best Practices from top performers

#### 10.4. Quality Assurance для Orchestrators

**Metrics Tracking (еженедельный review):**
- Conversion Rate: Invite → Response (цель > 10%)
- SLA Compliance: % SR закрытых в срок (цель 100%)
- Client Satisfaction: NPS от клиентов (цель > 8/10)
- Rejection Rate: % кандидатов отклоненных клиентом (цель < 20%)

**Feedback Loop:**
- Weekly 1-on-1 с Team Lead (разбор кейсов)
- Monthly retrospectives (что работает, что улучшить)
- Peer Learning Sessions (sharing best practices)

**Continuous Improvement:**
- Updating SOP на основе фидбека
- Новые outreach каналы (тестирование и документирование)
- Обновление Templates Library

**Definition of Done (Q1 MVP):**
- [ ] 2-3 Orchestrators наняты и сертифицированы
- [ ] 4 базовых SOP документированы (SOP-001 - SOP-004, без видео-интервью)
- [ ] Playbook для 10+ типов ролей готов
- [ ] Templates Library содержит 10+ шаблонов
- [ ] Internal Knowledge Base запущена (базовая версия)
- [ ] Manual tracking процесс настроен (Google Sheets/Notion)

**⚠️ Для Q2-Q3:** 
- Video Interviewing Guide
- Automated Metrics Dashboard

**Оценка:** 2-3 недели (1 Operations Manager + участие Product Manager) - сокращено с 3-4 недель

---

### EPIC 11: GTM & Communication Plan
**Описание:** Маркетинг и коммуникация для запуска Ultra

**Ценность для бизнеса:** Пользователи должны узнать о новом функционале и начать использовать

**Зависимости:** EPIC 4 (Explicit Mode должен быть готов)

**Компоненты:**

#### 11.1. Pre-Launch Communication

**Internal Stakeholders:**
- Презентация для команды (что, зачем, когда)
- Sales enablement (как продавать Ultra)
- Support training (как отвечать на вопросы о Ultra)

**Early Access Program:**
- Отбор 5-10 VIP-клиентов для Beta Testing
- Персональные приглашения (email + personal outreach)
- Бесплатный доступ к Ultra в обмен на фидбек

#### 11.2. Launch Communication (Phase 3)

**Email Campaigns:**
1. **Announcement Email** (всем активным пользователям):
   - Subject: "Introducing Scout Ultra: Your Personal Talent Scout"
   - Content: Проблема → Решение → CTA "Try Free Ultra Request"
   - A/B test: 2 версии subject line

2. **Zero-Results Triggered Email** (пользователям с пустыми SR):
   - Subject: "We can help you find candidates faster"
   - Content: "Your request has 0 matches. Upgrade to Ultra and get shortlist in 48h"
   - CTA: "Upgrade to Ultra"

3. **Nurture Sequence** (для тех, кто не конвертировался):
   - Day 3: Case Study (как Ultra помог клиенту X)
   - Day 7: Social Proof (testimonials)
   - Day 14: Limited-time offer (discount)

**In-App Messages:**
- Welcome Modal (при первом входе после релиза)
- Tooltips на новых элементах (Progress Widget, Concierge Card)
- Banner в Dashboard ("New: Scout Ultra is here!")

**Blog Post & Social Media:**
- Blog: "How Scout Ultra solves the freelancer sourcing problem"
- LinkedIn: Announcement post с демо-видео
- Twitter: Thread с примерами use cases
- Product Hunt launch (опционально)

#### 11.3. Help Center & Documentation

**New Articles:**
- "What is Scout Ultra and how does it work?"
- "How to upgrade to Ultra and schedule a call"
- "Understanding the SLA: What happens in 48 hours"
- "How to give feedback on your shortlist"
- "Ultra pricing and refund policy"

**Video Tutorials:**
- "Introduction to Scout Ultra" (2 min explainer)
- "How to activate Ultra for your request" (1 min demo)
- "Understanding your Ultra dashboard" (3 min walkthrough)

**FAQ:**
- 15+ frequently asked questions с ответами
- Troubleshooting guide (что делать если...)

#### 11.4. Sales & Conversion Optimization

**Pricing Strategy:**
- Initial price: $199/request (1 token)
- Package deals: 5 tokens = $899 (10% discount), 10 tokens = $1599 (20% discount)
- A/B testing разных ценовых точек (Phase 3 Soft Launch)

**Conversion Optimization:**
- A/B test CTA buttons ("Upgrade to Ultra" vs "Get Personal Scout")
- A/B test Pricing Card design (minimal vs feature-rich)
- Optimize Booking Modal (reduce friction, autofill timezones)

**Referral Program (опционально для V2):**
- Refer a friend → get 1 free Ultra token
- Viral loop для расширения базы

#### 11.5. Post-Launch Monitoring

**Success Metrics:**
- Activation Rate: % пользователей, которые увидели Ultra CTA
- Conversion Rate: % активаций → покупок
- NPS for Ultra: Client satisfaction
- Churn Rate: % пользователей, запросивших refund

**Feedback Collection:**
- Post-Ultra Survey (после получения shortlist)
- User Interviews (5-10 клиентов в месяц)
- In-app feedback widget ("How was your Ultra experience?")

**Iteration Plan:**
- Weekly review метрик
- Bi-weekly updates к email campaigns
- Monthly review pricing strategy

**Definition of Done:**
- [ ] Email campaigns созданы и протестированы
- [ ] In-app messages настроены
- [ ] Help Center статьи опубликованы
- [ ] Video tutorials записаны
- [ ] Sales enablement материалы готовы
- [ ] Metrics Dashboard для GTM настроен

**Оценка:** 2-3 недели (1 Marketing Manager + копирайтер + video producer)

---

## Роадмап Релизов (MVP-First для Q1)

**Общая стратегия Q1:**
- Фокус на клиентском опыте (EPIC 4, 5, 11)
- Минимальная автоматизация для Orchestrator (EPIC 2 упрощенный)
- Manual operations (EPIC 10 базовый)
- НЕТ видео, НЕТ advanced tools, НЕТ enrichment в интерфейсе

**Целевая длительность Q1:** 16-18 недель (~4 месяца) до Soft Launch

---

### Phase 0: Pre-Development (Недели 0-2)
**Цель:** Подготовка к разработке + критические архитектурные решения

**Scope:**
- ✅ EPIC 9: Design System & Wireframes (начало)
- ⚙️ Техническая подготовка
- ✅ Архитектурное решение (КРИТИЧНО)

**Активности:**
- **Груминг беклога** (2 сессии):
  - Детализация User Stories для EPIC 1 и EPIC 2
  - Оценка сложности (Story Points)
  - Выявление технических неопределенностей
- **Дизайн (EPIC 9):**
  - Moodboard и референсы для Admin Console и Client-Side
  - Design Tokens (colors, typography, spacing)
  - Начало работы над WF-C01, WF-C02 (первые wireframes)
- **Техническая подготовка:**
  - **АРХИТЕКТУРНОЕ РЕШЕНИЕ (КРИТИЧНО):**
    - **Решение:** Расширение существующего монолита (NOT микросервис)
    - **Обоснование:** 
      - Q1 MVP требует быстрой итерации, микросервис добавит сложности
      - Расширяем существующую DB schema (Service Request, Candidate Profile)
      - Admin Console - отдельный роут в main app (/admin/ultra)
      - Если потребуется в Q2-Q3 - выделим в микросервис
    - **Последствия:**
      - ✅ Быстрее development (используем existing auth, DB connections)
      - ✅ Проще deployment (один deploy процесс)
      - ⚠️ Coupled с main codebase (risk of breaking changes)
      - ⚠️ Масштабирование: если Ultra популярно, может создать load на main app
    - **Migration:** Не требуется (новые поля в existing tables, backward compatible)
  - Setup dev/staging окружений
  - API спецификация для интеграций (Calendly, Stripe)

**Deliverables:**
- [ ] **Architecture Decision Record (ADR) утвержден: Monolith Extension**
- [ ] Groomed беклог для EPIC 1-2 (все стори оценены)
- [ ] Design System v0.1 (токены, первые wireframes)
- [ ] Техническая спецификация утверждена
- [ ] Dev/Staging окружения готовы

**Ресурсы:** 1 Product Manager, 1 Designer, 1 Tech Lead, 1 Backend Dev (part-time для ADR)

---

### Phase 0.5: Operations Preparation (Недели 3-4, параллельно Phase 1)
**Цель:** Подготовка операционной базы для Ultra

**Scope:**
- ✅ EPIC 10: Operations & Enablement (10.1-10.3)

**Активности:**
- **Hiring:**
  - Job Description для Scout Orchestrator
  - Скрининг и интервью кандидатов
  - Найм 2-3 первых менеджеров
- **SOP Development:**
  - Написание SOP-001 - SOP-005
  - Playbook для 10+ типов ролей
  - Outreach Templates Library (10+ шаблонов)
- **Knowledge Base Setup:**
  - Internal wiki/Notion workspace
  - Video tutorials (запись first drafts)
  - FAQ документация

**Deliverables:**
- [ ] 2-3 Orchestrators hired (start date: неделя 5)
- [ ] SOP документированы (80% готовности)
- [ ] Playbook готов для top-10 ролей
- [ ] Templates Library создана

**Ресурсы:** 1 Operations Manager (50% FTE), участие Product Manager

**Milestone:** Orchestrators готовы к онбордингу на неделе 5-6

---

### Phase 1: Foundation Launch (Недели 3-6) — EPIC 1 + EPIC 2 (минимальный)
**Цель:** Базовая инфраструктура + минимальный Admin Console

**Scope:**
- ✅ EPIC 1: Foundation & Core Infrastructure
- ✅ EPIC 2: Orchestrator Admin Console (МИНИМАЛЬНЫЙ - только ссылки)
- ✅ EPIC 9: Admin-Side Wireframes (WF-A01, WF-A02 - упрощенные)
- ⚙️ EPIC 10: Onboarding первых Orchestrators (начало)

**Параллельная работа:**
- **Неделя 3-4:**
  - Backend: Data Model + Assignment Logic (EPIC 1.1-1.2)
  - Design: WF-A01, WF-A02 (минимальные макеты)
  - Operations: Hiring Orchestrators (параллельно Phase 0.5)
- **Неделя 5-6:**
  - Backend: Scoring + Attribution (EPIC 1.3-1.4)
  - Frontend: Admin Console UI (МИНИМАЛЬНЫЙ - список + кнопки копирования)
  - Operations: Onboarding первых 2-3 Orchestrators (обучение manual workflow)

**Груминг:**
- Неделя 4: Детализация EPIC 3 (Implicit Mode)
- Неделя 6: Подготовка EPIC 4 (Explicit Mode) и EPIC 5 (Notifications)

**Testing & QA:**
- Базовые тесты: Orchestrator может скопировать ссылки
- Кандидаты корректно атрибутируются (source tracking)

**Deliverables:**
- [ ] БД и Assignment Logic работают
- [ ] Минимальный Admin Console готов (список SR + копирование ссылок)
- [ ] 2-3 Orchestrators наняты и начали обучение
- [ ] Manual workflow настроен (Notion/Sheets)

**Milestone:** Инфраструктура готова, Orchestrators могут работать вручную

---

### Phase 2: Implicit Mode Beta (Недели 7-10) — EPIC 3 + EPIC 9 (Client start)
**Цель:** Запуск "магического" режима для решения проблемы холодного старта

**Scope:**
- ✅ EPIC 3: Implicit Mode (Client-Side)
- ✅ EPIC 9: Client-Side Wireframes (начало WF-C01, WF-C02, WF-C03)
- ⚙️ EPIC 10: Orchestrators начинают реальную работу, отладка SOP

**Параллельная работа:**
- **Неделя 7-8:**
  - Backend: Trigger System + Silent Orchestration (EPIC 3.1-3.2)
  - Frontend: Интеграция уведомлений (EPIC 3.3)
  - Design: WF-C01, WF-C02, WF-C03 (Hi-Fi макеты)
  - Operations: Первые реальные кейсы с Orchestrators (отладка SOP вручную)
- **Неделя 9-10:**
  - Testing Implicit Mode на 5-10 реальных SR
  - Iteration на основе фидбека Orchestrators
  - Design: WF-C04 (Shortlist без видео), WF-C05 (Negative Scenarios)
  - Груминг EPIC 4, EPIC 5, EPIC 11

**Gruming:**
- Неделя 8: Детализация EPIC 4 (Explicit Mode) и EPIC 5 (Notifications)
- Неделя 10: Детализация EPIC 11 (GTM)

**Beta Testing:**
- Внутреннее тестирование: 10 SR без откликов → назначаем на Оркестратора
- Метрики: Time to First Response, Conversion Rate (Invite → Response)
- User feedback от первых клиентов, получивших "магические" матчи

**Deliverables:**
- [ ] Implicit триггеры работают стабильно
- [ ] 80%+ пустых SR получают первый отклик в течение 24ч
- [ ] Client-Side wireframes для Explicit Mode в процессе
- [ ] SOP отлажены на реальных кейсах (manual workflow работает)

**Milestone:** Implicit режим работает на продакшене (ограниченный rollout: 20% пустых SR)

---

### Phase 3: Explicit Mode Launch (Недели 11-17) — EPIC 4 + EPIC 5 + EPIC 7 (базовый) + EPIC 11
**Цель:** Монетизация через платный Ultra с SLA-гарантией (БЕЗ видео, БЕЗ advanced tools)

**Scope:**
- ✅ EPIC 4: Explicit Mode Activation & UI (БЕЗ видео в shortlist)
- ✅ EPIC 5: Notifications & Communication Layer
- ✅ EPIC 7: Базовый Client Feedback (7.1 простая версия)
- ✅ EPIC 11: GTM & Communication Plan
- ✅ EPIC 9: Финализация Client-Side wireframes (WF-C01 - WF-C06, БЕЗ видео)

**Параллельная работа:**
- **Неделя 11-12:**
  - Frontend: Entry Points + Paywall (EPIC 4.1)
  - Backend: Booking Integration (Google Calendar/Calendly, EPIC 4.2)
  - Backend: Stripe/Payment integration (включая compliance review)
  - Design: Final Review WF-C01 - WF-C06, polishing
  - Marketing: Начало EPIC 11.1 (Early Access Program, отбор VIP-клиентов)
- **Неделя 13-14:**
  - Frontend: Progress Widget + Concierge Card (EPIC 4.3-4.4)
  - Backend: Notification Service (EPIC 5.1-5.2, Email/Slack базовый)
  - Frontend: Базовый Feedback Form (EPIC 7.1 - NPS + текст)
  - Marketing: Email campaigns (EPIC 11.2 - создание шаблонов)
  - Design: UI Components Library, Handoff
- **Неделя 15-16:**
  - Frontend: Enhanced Shortlist БЕЗ видео (EPIC 4.5)
  - Backend + Frontend: Client & Candidate Notifications (EPIC 5.3-5.4)
  - Marketing: Help Center статьи (EPIC 11.3) + Video tutorials о продукте
  - QA: End-to-End тест платного флоу (от покупки до получения shortlist)
- **Неделя 17 (SOFT LAUNCH):**
  - Фиксинг критических багов
  - Marketing: Soft Launch для 5-10 VIP-клиентов (EPIC 11.1)
  - Сбор первичного фидбека и быстрые итерации
  - A/B тест Pricing (2-3 варианта)

**Груминг:**
- Неделя 12: Финализация всех задач Phase 3
- Неделя 15: Подготовка Post-Launch Plan и Q2 backlog

**Design QA:**
- Неделя 13: Финальный UI Review всех экранов Explicit Mode
- Неделя 15: Micro-interactions, анимации, accessibility проверка

**Testing:**
- Неделя 15: Full E2E regression (Implicit + Explicit modes)
- Неделя 16: Load Testing (50 одновременных платных запросов)
- Неделя 17: UAT с VIP-клиентами

**Deliverables:**
- [ ] Платежная система работает (Stripe compliance passed)
- [ ] Booking Integration стабильна
- [ ] Базовые уведомления доставляются (Email + Slack)
- [ ] Email campaigns готовы к запуску
- [ ] Help Center статьи опубликованы
- [ ] Базовый Feedback Form работает
- [ ] 5-10 VIP-клиентов протестировали и дали feedback

**Milestone (Q1 ЗАВЕРШЕН):** Explicit Ultra доступен для Soft Launch, первые платежи получены, готовы к Full Launch в Q2

---

---

## Что будет в Q2-Q3 (после Q1 MVP)

После успешного Soft Launch в конце Q1 (неделя 17) планируется:

### Q2: Optimization & Automation (Недели 18-30)

**Phase 4: Advanced Orchestrator Tools (EPIC 6)**
- AI Distribution Recommendations
- Shadow Profiles (быстрое создание из LinkedIn/GitHub)
- Bulk Invite Pack Generator
- Analytics Dashboard для Orchestrators
- **Оценка:** 4-5 недель

**Phase 5: Quality Control (EPIC 7 полная версия)**
- Orchestrator Rating System (автоматический KPI tracking)
- Audit Trail & GDPR Compliance
- Автоматический Rejection Loop
- Advanced Feedback механизмы
- **Оценка:** 3-4 недели

**Phase 6: Full Admin Console (EPIC 2 полная версия)**
- 3-колоночный SR Workbench
- Pipeline View с редактированием
- Status Management (Active/Busy/Offline)
- Task Queue с приоритизацией
- **Оценка:** 3-4 недели

### Q3: Premium Features (Недели 31-40)

**Phase 7: Video Infrastructure (EPIC 8)**
- Video Recording Integration (Loom API, Zoom)
- S3/CDN setup + Adaptive Bitrate Streaming
- In-App Video Player
- Transcription & Searchability
- **Оценка:** 4-5 недель

**Phase 8: Enhanced Enrichment**
- Structured Interview Guides
- Video-based candidate verification
- AI-powered interview summaries
- Advanced candidate scoring
- **Оценка:** 3-4 недели

---

## Календарный план Q1 (MVP-First)

| Week | Phase | Development | Design | Operations | Grooming | Key Milestone |
|------|-------|-------------|--------|------------|----------|---------------|
| 0-2  | Pre-Dev | Tech Spec, **Architecture Decision**, API specs | Design System v0.1, Moodboard | — | EPIC 1-2 | Specs approved, **Architecture: Monolith extension** |
| 3-4  | Phase 0.5 + Phase 1 | EPIC 1.1-1.2 (Data Model) | WF-A01, WF-A02 minimal | Hiring Orchestrators | EPIC 3 | DB ready, 2-3 hired |
| 5-6  | Phase 1 | EPIC 1.3-1.4 + EPIC 2 minimal | — | Onboarding (manual workflow) | EPIC 4-5 | Admin Console minimal ready |
| 7-8  | Phase 2 | EPIC 3.1-3.2 (Implicit triggers) | WF-C01, WF-C02, WF-C03 | First real cases | EPIC 4-5, 11 | Implicit triggers work |
| 9-10 | Phase 2 | EPIC 3.3 + Beta (5-10 SR) | WF-C04, WF-C05 | SOP iteration | — | Implicit Live (20%) |
| **10.5** | **BUFFER 1** | **Bug fixes, Implicit optimization** | — | **Orchestrators feedback** | — | **Phase 2 stable** |
| 11-12| Phase 3 | EPIC 4.1-4.2 (Paywall, Booking) + **Stripe compliance** | Final Review WF-C* | VIP-клиенты отбор | — | Paywall + Booking ready |
| 13-14| Phase 3 | EPIC 4.3-4.4 + EPIC 5.1-5.2 + EPIC 7.1 | UI Components handoff | Email campaigns | Q2 planning | Progress Widget + Feedback |
| 15-16| Phase 3 | EPIC 4.5 + EPIC 5.3-5.4 + EPIC 11.2-11.3 | Micro-interactions polish | Help Center articles | — | E2E tests passed |
| 17-18 | Phase 3 SOFT LAUNCH | Bug fixes, Soft Launch (5-10 VIP), **Feedback analysis** | — | **Daily monitoring** | — | **Soft Launch running** |
| **19** | **BUFFER 2 & DECISION** | **Hotfixes, Metrics review** | — | **Retrospective** | **Q2 backlog** | **Go/No-Go decision для Q2** |

**Общая длительность Q1:** 19 недель (~4.5 месяца) от старта до Go/No-Go решения  
**Буферы:** 2 недели встроены (10.5, 19) = ~10% от общего времени  
**Soft Launch:** 2 недели (17-18) для сбора качественного фидбека

**Что НЕ входит в Q1:** Video, Advanced Tools (EPIC 6), Full Admin Console, Enrichment UI

---

## План Q2-Q3 (краткий)

| Quarter | Key Epics | Deliverables | Duration |
|---------|-----------|--------------|----------|
| Q2 | EPIC 6, EPIC 7 (full), EPIC 2 (full) | Advanced Orchestrator Tools, Quality Control, Full Admin Console | ~12 недель |
| Q3 | EPIC 8, Enhanced Enrichment | Video Infrastructure, Structured Interviews | ~10 недель |

**Total до Full Launch с видео:** Q1 (17 нед) + Q2 (12 нед) + Q3 (10 нед) = ~39 недель (~9 месяцев)

---

## Метрики успеха для Q1 MVP (привязка к PRD Раздел 1)

### Phase 0-0.5 (Pre-Development & Operations Prep):
- [ ] Design System v0.1 утвержден (10+ wireframes готовы)
- [ ] 2-3 Orchestrators наняты и сертифицированы
- [ ] 5+ SOP документированы
- [ ] Техническая спецификация утверждена

### Phase 1 (Foundation):
**Технические метрики:**
- [ ] 100% успешных назначений через Admin Console
- [ ] < 5% ошибок в Assignment Logic
- [ ] API endpoints latency < 200ms
- [ ] Unit test coverage > 80%

**Операционные метрики:**
- [ ] Orchestrators могут закрыть тестовый SR за < 8 часов (обучение завершено)
- [ ] Admin Console load time < 2s

### Phase 2 (Implicit Mode):
**Метрики из PRD Раздел 1:**
- [ ] **Zero-Result Rate Reduction:** < 20% SR остаются без откликов спустя 24ч (цель PRD)
- [ ] **Outreach Efficiency:** Conversion Invite → Response > 10% (цель PRD)

**Дополнительные метрики:**
- [ ] 80%+ пустых SR получают первый отклик в течение 24ч
- [ ] Среднее время от назначения до первого отклика < 12 часов
- [ ] Клиенты НЕ осознают ручное вмешательство (A/B test: perception study)

### Phase 3 (Explicit Mode):
**Метрики из PRD Раздел 1:**
- [ ] **SLA Compliance:** 100% платных Ultra-запросов закрыты менее чем за 48 часов (цель PRD)
- [ ] **Unit Economics Attribution:** 100% кандидатов помечены источником (Organic / Ultra_Outreach / Ultra_Database)

**Монетизация:**
- [ ] 5+ платных запросов в первый месяц (Soft Launch)
- [ ] 20+ платных запросов после Full Launch (неделя 19+)
- [ ] Average Order Value (AOV) = $199 (baseline для дальнейших тестов)

**Удовлетворенность:**
- [ ] NPS > 8/10 для Ultra-клиентов
- [ ] Client Satisfaction (post-shortlist survey) > 80% "Satisfied" или "Very Satisfied"
- [ ] Rejection Rate < 20% (клиент отклонил всех кандидатов)

**Операционные:**
- [ ] 100% Booking slots заполнены в течение 24h после оплаты
- [ ] Среднее время calibration call = 15-20 минут (эффективность)

### Q1 Soft Launch Success Criteria (неделя 17):
**Готовность к Soft Launch:**
- [ ] Платежная система работает (Stripe compliance passed)
- [ ] Booking Integration стабильна
- [ ] SLA Compliance: 90%+ платных запросов закрыты за 48h
- [ ] Базовый Feedback собирается (NPS + текстовые комментарии)
- [ ] 5-10 VIP-клиентов протестировали продукт

**Бизнес-метрики Q1:**
- [ ] **Zero-Result Rate:** < 20% SR без откликов спустя 24ч
- [ ] **Outreach Efficiency:** Conversion Invite → Response > 10%
- [ ] First Payments Received: 3+ платных запроса
- [ ] NPS > 7/10 для Ultra-клиентов (Soft Launch)

**Операционные метрики Q1:**
- [ ] 2-3 Orchestrators работают стабильно (manual workflow)
- [ ] SOP покрывают 80% сценариев (с manual escalation для остальных)
- [ ] Rejection Rate < 30% (клиент отклонил кандидатов)

**Технические метрики Q1:**
- [ ] Admin Console uptime > 99%
- [ ] E2E tests pass rate > 95%
- [ ] Load test: 20 одновременных платных запросов выдержаны

---

## Метрики для Q2-Q3 (после MVP)

### Q2 Targets (Advanced Tools & Quality):
- [ ] Один Оркестратор ведет 8+ SR/неделя (с помощью automation)
- [ ] Outreach Efficiency > 15% (AI Recommendations)
- [ ] Rejection Rate < 20%
- [ ] SLA Compliance: 100%

### Q3 Targets (Video & Premium):
- [ ] 100% Ultra-кандидатов имеют видео-саммари
- [ ] Client Watch Rate > 60%
- [ ] MRR от Ultra > $10,000
- [ ] Infrastructure выдерживает 100+ одновременных Ultra SR

---

## Риски и митигация

### Риск 1: Оркестраторы не справляются с нагрузкой
**Митигация:**
- Phase 2: Начинаем с 1-2 менеджеров, масштабируем постепенно
- EPIC 6 (Advanced Tools) приоритизируем, если видим bottleneck

### Риск 2: Клиенты не видят ценности в Explicit (дорого)
**Митигация:**
- Phase 2 (Implicit) докажет ценность до монетизации
- A/B тест цены в Phase 3 Soft Launch

### Риск 3: Видео-инфраструктура дорогая/медленная
**Митигация:**
- Phase 5 можно отложить, если Budget/Timeline критичны
- MVP: просто ссылки на Loom без встроенного плеера

### Риск 4: Скоринг ломается при Admin Override
**Митигация:**
- EPIC 1.3 (Scoring Integrity) — первый приоритет
- Extensive Unit Tests для алгоритма пересчета

---

## Зависимости от внешних команд (детальная разбивка ресурсов)

### Product Management:
- **Critical Path:** Весь проект (груминг, приоритизация, координация)
- **Load:** 1 Product Manager, ~60% FTE (недели 0-32)
- **Ключевые активности:**
  - Груминг каждые 2 недели (4 часа/сессия)
  - Stakeholder communication (weekly updates)
  - User feedback analysis (Phase 2-5)
  - Roadmap adjustments на основе метрик

### Design Team:
- **Critical Path:** Недели 0-2 (Design System), 3-11 (Wireframes), 13-18 (Polishing), 27-32 (Video UI)
- **Load:** 1 Designer full-time (недели 0-19), ~40% FTE (недели 20-32)
- **Deliverables:**
  - Design System + 12 wireframes (недели 0-11)
  - UI Components Library (неделя 15-16)
  - Video Player UI (недели 27-30)
  - Accessibility audit (неделя 31)

### Backend Team:
- **Critical Path:** Весь проект
- **Load:** 2 Backend разработчика full-time (недели 3-32)
- **Распределение:**
  - Dev 1: Foundation, Implicit, Notifications, Quality Control
  - Dev 2: Explicit Mode, Advanced Tools, Video Infrastructure
- **Peak load:** Недели 13-18 (Explicit Mode + Notifications + GTM integrations)

### Frontend Team:
- **Critical Path:** Недели 5-19 (Admin + Client UI), 27-32 (Video Player)
- **Load:** 
  - 1 Frontend разработчик full-time (недели 5-19)
  - 2 Frontend разработчика (недели 13-18, peak для Explicit Mode UI)
  - 1 Frontend разработчик ~50% FTE (недели 20-32)
- **Фокус:**
  - Недели 5-7: Admin Console
  - Недели 13-18: Client-Side UI (Progress Widget, Concierge, Shortlist)
  - Недели 29-30: Video Player

### DevOps/Infrastructure:
- **Critical Path:** Недели 0-2 (setup), 13-14 (Stripe/Calendly), 27-28 (Video CDN), 31 (Load Testing)
- **Load:** ~25% FTE одного DevOps-инженера
- **Ключевые задачи:**
  - Setup dev/staging/prod environments (недели 0-2)
  - Stripe integration compliance (неделя 13)
  - S3/Cloudflare Stream setup (недели 27-28)
  - Load testing infrastructure (неделя 31)

### QA/Testing:
- **Critical Path:** Перед каждым релизом (недели 7, 12, 19, 26, 32)
- **Load:** 1 QA Engineer, ~30% FTE (недели 3-32), 100% FTE в release-недели
- **Активности:**
  - E2E test suite creation (недели 5-6)
  - Regression testing перед каждой фазой
  - UAT с Orchestrators (неделя 6-7)
  - UAT с VIP-клиентами (неделя 19)
  - Load/Stress testing (недели 18, 31)

### Operations Team:
- **Critical Path:** Недели 3-7 (Hiring + Onboarding), весь проект (SOP поддержка)
- **Load:** 
  - 1 Operations Manager, ~50% FTE (недели 3-12), ~20% FTE (недели 13-32)
  - 2-3 Orchestrators (hired неделя 4, start неделя 5)
- **Ключевые задачи:**
  - Hiring (недели 3-4)
  - Onboarding (недели 5-6)
  - SOP development и iteration (весь проект)
  - Quality tracking (недели 13+)

### Marketing/Content:
- **Critical Path:** Недели 13-19 (GTM preparation), ongoing (post-launch iteration)
- **Load:** 
  - 1 Marketing Manager, ~60% FTE (недели 13-19), ~30% FTE (недели 20-32)
  - 1 Copywriter, ~40% FTE (недели 14-18) для email campaigns, Help Center
  - 1 Video Producer, ~30% FTE (недели 16-17) для video tutorials
- **Deliverables:**
  - Email campaigns (3 sequences)
  - Help Center articles (10+)
  - Video tutorials (3-4 видео)
  - Blog post + social media content

### Legal/Compliance:
- **Critical Path:** Недели 13-14 (Stripe compliance), 24-25 (GDPR audit)
- **Load:** ~10% FTE legal counsel (консультации)
- **Ключевые задачи:**
  - Stripe/Payment compliance review (неделя 13)
  - Terms of Service для Ultra (неделя 14)
  - GDPR compliance audit (неделя 24-25)
  - Data retention policies (неделя 25)

---

## Общая загрузка команды Q1 (FTE Summary)

| Роль | Phase 0-1 (нед 0-6) | Phase 2 (нед 7-10) | Phase 3 (нед 11-17) | Пик загрузки |
|------|---------------------|---------------------|---------------------|--------------|
| Product Manager | 60% | 60% | 60% | Недели 4, 8, 12 (груминг) |
| Designer | 100% | 80% | 60% | Недели 0-2, 7-10, 13-14 |
| Backend Dev (×2) | 100% | 100% | 100% | Недели 11-14 (Explicit setup) |
| Frontend Dev | 20% (нед 5-6) | 80% | 100% | Недели 11-16 (Client UI) |
| DevOps | 40% (setup) | 20% | 30% | Недели 0-2, 11-12 (Stripe/Calendly) |
| QA Engineer | 20% | 30% | 40% | Недели 10, 16-17 (E2E testing) |
| Operations Mgr | 50% | 40% | 30% | Недели 3-6 (hiring + onboarding) |
| Orchestrators (×2-3) | Hiring (нед 3-4) | 100% (real work) | 100% | Недели 7+ (ongoing) |
| Marketing Manager | 0% | 0% | 60% | Недели 11-16 (GTM prep) |
| Copywriter | 0% | 0% | 40% | Недели 13-15 (campaigns, Help Center) |
| Video Producer | 0% | 0% | 30% | Неделя 15 (product tutorials) |
| Legal Counsel | 0% | 0% | 10% | Недели 11-12 (Stripe compliance) |

**Total Peak Load Q1 (неделя 13-15):** ~7-8 FTE одновременно (меньше чем в полном роадмапе)

**Savings vs Full Roadmap:** Не нужны ресурсы на EPIC 6, 8 (AI tools, Video) в Q1 = экономия ~3-4 недель backend + DevOps

---

## Рекомендации по приоритизации Q1 (MoSCoW)

### Must Have для Q1 MVP:
**Эпики:** 1, 2 (минимальный), 3, 4 (без видео), 5, 7 (базовый feedback), 9 (6 wireframes), 10 (базовый), 11
- **Обоснование:** Минимум для валидации Product-Market Fit с платными клиентами
- **Срок:** 17 недель до Soft Launch
- **Риск пропуска:** Не сможем валидировать спрос на Ultra

### Won't Have в Q1 (перенесено на Q2-Q3):
**Эпики:** 
- **EPIC 2 (полная версия):** Advanced Admin Console - слишком сложно, ручная работа достаточна для MVP
- **EPIC 6:** Advanced Orchestrator Tools - не критично для валидации PMF
- **EPIC 7 (полная версия):** Automated Quality Control - базовый feedback достаточен
- **EPIC 8:** Video Infrastructure - важная дифференциация, но не для валидации спроса

**Обоснование переноса:**
- Q1: Валидация спроса, тестирование ценностного предложения
- Q2-Q3: Оптимизация операций, масштабирование, дифференциация

**Alternative в Q1:**
- Видео: Orchestrators шарят внешние Loom-ссылки вручную
- Admin Console: Orchestrators используют Notion/Sheets для трекинга
- Analytics: Manual tracking в Google Sheets

---

## Альтернативные сценарии Q1

### Текущий план: Standard Q1 MVP (17 недель)
**Что включено:**
- Implicit + Explicit modes
- Базовый Admin Console (только ссылки)
- Client-side UI полный (без видео)
- GTM минимальный
- Manual operations

**Рекомендация:** ✅ Оптимальный баланс для валидации PMF

---

### Сценарий 1: Ultra-Fast Track (12 недель)
**Цель:** Максимально быстрая валидация спроса

**Изменения:**
- **Убрать Implicit Mode:** Сразу только платный Explicit (экономия 3-4 недели)
  - Риск: Не тестируем "магический" опыт, меньше органических откликов
- **Упростить GTM:** Только email announcement, без Help Center (экономия 1-2 недели)
  - Риск: Больше support вопросов
- **Совместить Phase 2+3:** Parallel development (экономия 2 недели)
  - Риск: Перегрузка команды

**Итого:** 12 недель до Soft Launch

**Рекомендация:** ⚠️ Только если time-to-market критичен (есть конкуренты)

---

### Сценарий 2: Conservative Q1 (21 неделя)
**Цель:** Минимизация рисков, максимальное качество

**Изменения:**
- **Добавить Phase 1.5:** Internal Beta Testing (2 недели)
  - 5 internal users тестируют функционал перед Orchestrators
- **Расширить Soft Launch:** 4 недели вместо 1, 20+ VIP-клиентов (добавить 3 недели)
  - Больше фидбека, меньше риск репутации
- **Добавить буфер-недели:** После каждой фазы (добавить 3 недели)

**Итого:** 21 неделя (~5 месяцев)

**Рекомендация:** Если команда неопытна или высокий репутационный риск

---

### Сценарий 3: Hybrid Q1+Q2 (24 недели = 6 месяцев)
**Цель:** Q1 MVP + базовые advanced tools из Q2

**Дополнительно к Q1 Standard:**
- **Из EPIC 6:** AI Distribution Recommendations (3 недели)
  - Помогает Orchestrators работать эффективнее с первого дня
- **Из EPIC 2 (full):** Basic Pipeline View (2 недели)
  - Orchestrators видят статус кандидатов в интерфейсе
- **Из EPIC 7 (full):** Automated Rejection Loop (2 недели)
  - Меньше ручной работы при проблемах

**Итого:** 24 недели, но с лучшей операционной базой

**Рекомендация:** Если уверены в спросе и хотим сразу масштабировать

---

## Финансовая модель Q1 MVP

### Оценка стоимости команды (19 недель)

**Backend Team (2 разработчика × 100% FTE × 19 недель):**
- Senior Backend Dev: $80-100k/год → ~$38k за 19 недель × 2 = **$76k**

**Frontend Team (1 разработчик × 70% average FTE × 19 недель):**
- Senior Frontend Dev: $75-95k/год → ~$28k за 19 недель × 0.7 = **$20k**

**Design Team (1 дизайнер × 70% average FTE × 19 недель):**
- Senior Product Designer: $70-90k/год → ~$32k за 19 недель × 0.7 = **$22k**

**DevOps (1 инженер × 25% FTE × 19 недель):**
- DevOps Engineer: $85-105k/год → ~$40k за 19 недель × 0.25 = **$10k**

**QA Engineer (1 × 30% FTE × 19 недель):**
- QA Engineer: $60-80k/год → ~$27k за 19 недель × 0.3 = **$8k**

**Product Manager (1 × 60% FTE × 19 недель):**
- Product Manager: $90-120k/год → ~$47k за 19 недель × 0.6 = **$28k**

**Operations Manager (1 × 35% average FTE × 19 недель):**
- Operations Manager: $70-90k/год → ~$32k за 19 недель × 0.35 = **$11k**

**Orchestrators (2-3 × 100% FTE × 13 недель, с недели 7):**
- Orchestrator/Recruiter: $50-70k/год → ~$24k за 13 недель × 2.5 = **$60k**

**Marketing Team (1 Manager × 30% FTE × 7 недель + Copywriter):**
- Marketing Manager: $75-95k/год → ~$34k за 19 недель × 0.3 = **$10k**
- Copywriter (contractor): $5k flat fee = **$5k**

**Legal Counsel (консультации):**
- Stripe compliance review, Terms of Service = **$5k**

**Infrastructure & Tools (19 недель):**
- AWS/Hosting: $500/мес × 4.5 месяца = **$2.5k**
- Stripe fees (setup): **$1k**
- Tools (Notion, Figma, etc): $1k/мес × 4.5 = **$4.5k**

---

### ИТОГО Q1 MVP Budget: **~$263k**

**Breakdown:**
- Development Team (Backend, Frontend, DevOps, QA): $114k (43%)
- Product & Design: $50k (19%)
- Operations (Manager + Orchestrators): $71k (27%)
- Marketing & Legal: $20k (8%)
- Infrastructure & Tools: $8k (3%)

---

### ROI Projection & Break-Even

**Pricing:**
- $199 per Ultra request (baseline)

**Q1 Target (Soft Launch):**
- 5-10 VIP clients × 1-2 requests each = **10-15 платных запросов**
- Revenue Q1: 10-15 × $199 = **$2k - $3k**

**Q1 ROI: NEGATIVE** (expected для MVP)
- Investment: $263k
- Revenue: $2-3k
- Loss: ~$260k

**Break-Even Calculation:**
- Нужно закрыть: $263k
- $263k ÷ $199 per request = **~1,320 платных запросов для окупаемости Q1**

**Realistic Break-Even Timeline:**

**Q2 Scenario (если Full Launch успешен):**
- Full Launch (неделя 20): 50 запросов/месяц
- Q2 (3 месяца): 50 × 3 = 150 запросов
- Revenue Q2: 150 × $199 = **$30k**
- Cumulative: $2k (Q1) + $30k (Q2) = $32k
- Deficit: $263k - $32k = **$231k** (еще не окупились)

**Q3 Scenario (если растем до 100 запросов/месяц):**
- Q3 (3 месяца): 100 × 3 = 300 запросов
- Revenue Q3: 300 × $199 = **$60k**
- Cumulative: $32k (Q1+Q2) + $60k (Q3) = $92k
- Deficit: $263k - $92k = **$171k** (все еще не окупились)

**Q4 Scenario (если масштабируем до 200 запросов/месяц):**
- Q4 (3 месяца): 200 × 3 = 600 запросов
- Revenue Q4: 600 × $199 = **$120k**
- Cumulative: $92k + $120k = $212k
- Deficit: $263k - $212k = **$51k** (почти окупились!)

**BREAK-EVEN:** Конец Q4 2026 / начало Q1 2027 (12-15 месяцев от старта)

---

### Alternative: Fast Path to Profitability

**Если повысить цену:**
- $299 per request (вместо $199)
- Break-even: $263k ÷ $299 = **~880 запросов**
- При 100 запросов/месяц: 880 ÷ 100 = **~9 месяцев** (Q3 2026)

**Если добавить recurring:**
- Subscription: $499/month для 3 Ultra requests
- 30 клиентов с subscription = $15k MRR
- Break-even: $263k ÷ $15k MRR = **18 месяцев** (но recurring стабильнее)

---

### Q1 Success Criteria (для Go/No-Go Q2 решения)

**Financial Metrics:**
- [ ] 10+ платных запросов в Soft Launch
- [ ] Average Order Value (AOV) ≥ $199
- [ ] Payment conversion rate ≥ 20% (из тех кто нажал "Upgrade to Ultra")

**Customer Metrics:**
- [ ] NPS ≥ 7/10 для Ultra-клиентов
- [ ] Repeat purchase rate ≥ 20% (клиенты используют Ultra повторно)
- [ ] Churn rate ≤ 10% (клиенты не запрашивают refund)

**Operational Metrics:**
- [ ] SLA Compliance ≥ 90%
- [ ] Orchestrator efficiency: 3-5 SR/неделя на человека
- [ ] Cost per acquisition (CPA) < $50 (marketing spend / conversions)

**Product-Market Fit Signals:**
- [ ] 3+ spontaneous referrals (клиенты рекомендуют друзьям)
- [ ] 5+ feature requests related to Ultra (активное engagement)
- [ ] 0 critical bugs в production

---

### Go/No-Go Decision Framework (неделя 19)

**GO to Q2 (инвестируем в Advanced Tools + Video):**
- ✅ 10+ платных запросов получены
- ✅ NPS ≥ 7/10
- ✅ SLA Compliance ≥ 90%
- ✅ Положительный customer feedback (хотят больше)
- ✅ CEO/CTO утверждают дополнительные $150-200k на Q2-Q3

**PIVOT (меняем стратегию):**
- ⚠️ < 10 платных запросов, но high NPS (ценность есть, нет demand)
  - Решение: Улучшить marketing, снизить цену, протестировать другие каналы
- ⚠️ 10+ запросов, но low NPS (demand есть, ценность низкая)
  - Решение: Улучшить качество (нанять лучших Orchestrators, улучшить SOP)

**NO-GO (останавливаем Ultra):**
- ❌ < 5 платных запросов и low NPS (нет ни спроса, ни ценности)
- ❌ High churn rate (> 30%)
- ❌ Orchestrators не справляются (SLA Compliance < 70%)
- ❌ Критические проблемы с продуктом (масса багов, негативные отзывы)

---

## Rollback Strategy & Contingency Plans

### Rollback Scenarios

#### Scenario 1: Full Rollback (Q1 провалился полностью)

**Триггеры:**
- SLA Compliance < 50% в течение 2 недель
- 5+ клиентов запросили refund
- Критические баги блокируют работу
- Orchestrators массово увольняются

**Действия (неделя X, когда произошел триггер):**

**Неделя X:**
- [ ] Прекратить прием новых Ultra запросов (disable "Upgrade to Ultra" button)
- [ ] Уведомить активных Ultra клиентов (email с извинениями + refund offer)
- [ ] Перевести активные SR на ручную обработку без SLA

**Неделя X+1:**
- [ ] Выполнить все активные Ultra commitments (довести до конца текущие SR)
- [ ] Refund всем неудовлетворенным клиентам (полный или partial)
- [ ] Деактивировать Ultra-специфичный UI (но сохранить код в git branch)

**Неделя X+2:**
- [ ] Post-mortem (что пошло не так?)
- [ ] Decision: pivot strategy или полностью отменить Ultra
- [ ] Communication с командой и stakeholders

**Финансовые последствия:**
- Потеря инвестиций Q1: ~$263k
- Refunds: до $3k (если все запросят)
- Reputation risk: средний (если обработаем профессионально)

---

#### Scenario 2: Partial Rollback (Implicit работает, Explicit провалился)

**Триггеры:**
- Implicit Mode показывает хорошие метрики (Zero-Result Rate снижен)
- Explicit Mode: низкая конверсия (< 10%) или high churn

**Действия:**
- [ ] Сохранить Implicit Mode (магический режим работает)
- [ ] Disable платный Explicit Mode
- [ ] Переработать Explicit value proposition
- [ ] Re-launch Explicit через 1-2 месяца с новым подходом

**Финансовые последствия:**
- Частичная потеря инвестиций: ~$100k (Explicit-специфичный функционал)
- Implicit Mode продолжает приносить ценность (улучшение core метрик)

---

#### Scenario 3: Delayed Launch (не успеваем к дедлайну)

**Триггеры:**
- Критические задержки в Phase 1 или 2
- Orchestrators не готовы (hiring problems)
- Stripe compliance затянулась

**Действия:**
- [ ] Пересмотреть scope (что можно cut из Q1?)
- [ ] Добавить буфер-недели (но не больше +4 недель)
- [ ] Communication со stakeholders (новый timeline)
- [ ] Рассмотреть Fast-Track сценарий (убрать Implicit, только Explicit)

---

### Contingency Plans для внешних зависимостей

#### Contingency 1: Stripe Compliance Review затянулась

**Risk:** Stripe может требовать дополнительные документы, review может занять 2-4 недели вместо 1

**Impact:** Задержка Phase 3 на 1-3 недели

**Mitigation:**
- **Pre-work (неделя 0-2):** Подготовить ВСЕ документы заранее
  - Business model description
  - Terms of Service draft
  - Refund policy
  - Expected transaction volumes
- **Plan B (если Stripe отклонил):**
  - Использовать PayPal / LemonSqueezy (более лояльные, но меньше функций)
  - Manual invoicing для первых 10 клиентов (через Notion + bank transfer)
- **Buffer:** Неделя 12 - если Stripe затянулась, используем для compliance work

---

#### Contingency 2: Calendly Integration сложнее, чем ожидали

**Risk:** Calendly API может иметь limitations, не подходящие для нашего use case

**Impact:** Задержка Booking functionality (EPIC 4.2)

**Mitigation:**
- **Plan B:**
  - Manual booking (Orchestrator создает Google Meet ссылку вручную)
  - Email-based coordination (Orchestrator отправляет клиенту варианты слотов)
- **Alternative:**
  - Прямая интеграция с Google Calendar API (больше контроля, но сложнее)
  - Cal.com (open-source alternative Calendly)
- **Buffer:** Неделя 12 - если Calendly не работает, переключаемся на Plan B

---

#### Contingency 3: Orchestrators hiring проблемы

**Risk:** Не можем найти 2-3 квалифицированных Orchestrators в течение недель 3-4

**Impact:** Задержка всего Q1, невозможность запустить Implicit Mode

**Mitigation:**
- **Early start (неделя 0):** Начать hiring процесс ДО официального Phase 0
- **Sourcing strategy:**
  - Пост в LinkedIn за 2 недели до старта
  - Outreach к знакомым recruiters
  - Job boards (AngelList, Indeed, LinkedIn Jobs)
- **Plan B:**
  - Нанять contract recruiters (дороже, но быстрее)
  - Использовать internal team members part-time (Product Manager как Orchestrator на первых 5-10 SR)
- **Reduced scope:**
  - Начать с 1 Orchestrator вместо 2-3 (меньше SR в Beta Testing)

---

#### Contingency 4: Критический член команды unavailable

**Risk:** Backend Dev / Designer уходит в отпуск / увольняется / болеет

**Impact:** Задержка development на 1-4 недели

**Mitigation:**
- **Documentation:**
  - Code должен быть хорошо документирован
  - Design System должен быть self-explanatory
- **Knowledge sharing:**
  - Weekly team syncs (все в курсе, что делают другие)
  - Pair programming для критических компонентов
- **Backup resources:**
  - Договоренность с фрилансерами (можем привлечь за 1 неделю)
  - Cross-training (Frontend может помочь с Backend, если нужно)
- **Buffer weeks:** Недели 10.5 и 19 - используем для catch-up если кто-то был unavailable

---

## Post-Soft-Launch Plan (недели 17-19 и далее)

### Week 17-18: Soft Launch Execution

**Activities:**
- **Day 1 (неделя 17, Monday):**
  - [ ] Outreach к 10 pre-selected VIP clients (email + personal call)
  - [ ] Activate "Upgrade to Ultra" for VIP clients только
  - [ ] Enable monitoring dashboard (real-time metrics)

- **Daily (недели 17-18):**
  - [ ] Morning standup (PM + Orchestrators): review overnight activity
  - [ ] Monitor SLA compliance real-time
  - [ ] Respond to client questions в течение 2 hours
  - [ ] Log all issues в bug tracker (prioritize by severity)

- **Weekly (пятница недели 17 и 18):**
  - [ ] Metrics review meeting (team + stakeholders)
  - [ ] User interview с 2-3 клиентами (30 минут each)
  - [ ] Retrospective (что работает, что нет)

**Metrics to track daily:**
- Платных запросов: X/день
- SLA Compliance: Y% (цель: > 90%)
- Response time Orchestrators: Z hours (цель: < 4h)
- Client satisfaction (informal feedback): sentiment analysis

---

### Week 19: Go/No-Go Decision

**Activities:**

**Monday (неделя 19):**
- [ ] Compile full metrics report (Q1 results)
- [ ] Analyze qualitative feedback (user interviews, NPS comments)
- [ ] Calculate financial metrics (AOV, CAC, LTV projection)

**Wednesday (неделя 19):**
- [ ] Present findings к CEO/CTO/Stakeholders
- [ ] Discuss Go/Pivot/No-Go scenarios
- [ ] Review Q2-Q3 backlog (что приоритизируем если GO)

**Friday (неделя 19):**
- [ ] **DECISION POINT:**
  - ✅ GO to Q2: Approve budget ($150-200k), start EPIC 6-8 planning
  - ⚠️ PIVOT: Iterate on Q1 MVP (2-4 недели improvements), then re-assess
  - ❌ NO-GO: Execute Rollback Strategy

---

### If GO to Q2 (Advanced Tools + Full Admin Console)

**Week 20-22: Q2 Phase 1 (EPIC 6 - Advanced Orchestrator Tools)**
- AI Distribution Recommendations
- Shadow Profiles
- Bulk Invite Pack
- Analytics Dashboard

**Week 23-26: Q2 Phase 2 (EPIC 2 full + EPIC 7 full)**
- Full Admin Console (Pipeline View, Enrichment в интерфейсе)
- Automated Quality Control
- Audit Trail & GDPR

**Week 27-30: Q2 Buffer & Full Launch**
- Full Launch announcement (marketing blitz)
- Scale Orchestrators team (5-7 человек)
- Monitor scale metrics

---

### If PIVOT (улучшаем Q1 MVP)

**Possible Pivot Scenarios:**

**Pivot 1: Pricing Issue**
- Проблема: Спрос есть, но цена $199 слишком высока
- Решение:
  - A/B test: $149 vs $199 vs $249
  - Tiered pricing: Basic Ultra ($149) vs Premium Ultra ($249 with priority)
  - Subscription model: $499/month for 3 Ultra requests

**Pivot 2: Quality Issue**
- Проблема: NPS низкий, клиенты недовольны качеством кандидатов
- Решение:
  - Улучшить SOP (добавить quality checkpoints)
  - Нанять более опытных Orchestrators
  - Добавить video screening даже в Q1 (manual Loom links)

**Pivot 3: Marketing Issue**
- Проблема: Мало conversions, но те кто попробовали - довольны
- Решение:
  - Улучшить messaging (лучше объяснить ценность)
  - Добавить testimonials / case studies
  - Бесплатный пробный Ultra request (first one free)

**Pivot Duration:** 2-4 недели, затем повторная оценка

---

### If NO-GO (останавливаем Ultra)

**Post-Mortem:**
- [ ] Детальный анализ: почему не сработало?
- [ ] Learnings: что можем применить к другим фичам Mellow?
- [ ] Team retrospective (эмоциональная поддержка, празднуем learnings)

**Communication:**
- [ ] Internal: честно объяснить команде причины
- [ ] External: если были публичные анонсы - explain pivoting strategy
- [ ] Clients: если остались активные Ultra запросы - довести до конца

**Alternative Opportunities:**
- Implicit Mode (магический) может остаться как core feature
- Learnings про Orchestrators operations можем применить к другим сценариям
- Tech infrastructure (Assignment Logic, Attribution) может быть reused

---

## Следующие шаги (Action Items для запуска)

### Неделя -2 до Phase 0 (Предподготовка):

**1. Утверждение стратегии и бюджета:**
- [ ] Презентация роадмапа CEO/CTO/Stakeholders
- [ ] Выбор сценария: Standard (32 нед), Fast-Track (20 нед), или Staged (36 нед)
- [ ] Утверждение бюджета (оценка стоимости команды на 8 месяцев)
- [ ] Go/No-Go Decision

**2. Формирование команды:**
- [ ] Подтверждение доступности Backend Team (2 разработчика)
- [ ] Подтверждение доступности Designer (full-time недели 0-19)
- [ ] Найм/назначение Operations Manager (start: неделя 3)
- [ ] Найм/назначение Marketing Manager (start: неделя 13)
- [ ] Договоренности с QA, DevOps, Legal

**3. Подготовка инфраструктуры:**
- [ ] Создание проектного пространства (Jira/Linear/Notion)
- [ ] Setup communication каналов (Slack #scout-ultra, weekly sync meetings)
- [ ] Создание Git repo и CI/CD pipeline
- [ ] Заявки на доступы к внешним сервисам (Stripe, Calendly, Loom API)

**4. Подготовка метрик:**
- [ ] Setup Mixpanel/Amplitude dashboards для отслеживания метрик
- [ ] Определение baseline метрик (текущие Zero-Result Rate, конверсии)
- [ ] KPI дашборд для stakeholders (weekly review)

---

### Phase 0 Kickoff (Неделя 0):

**Day 1: Project Kickoff Meeting**
- Презентация PRD всей команде
- Обзор роадмапа и ролей
- Q&A сессия

**Day 2-3: Design Sprint**
- Moodboard workshop
- Референсы и вдохновение
- Начало Design System

**Day 4-5: Tech Planning**
- Архитектурное решение (DB schema review)
- API спецификация для интеграций
- Выбор tech stack для Admin Console

**Week 2: Grooming Session 1**
- Детализация EPIC 1 и EPIC 2 на User Stories
- Оценка Story Points
- Планирование Sprint 1 (неделя 3-4)

---

### Stakeholder Communication Plan:

**Weekly:**
- **Monday:** Sprint Planning (для dev team)
- **Wednesday:** Design Review (если активна дизайн-фаза)
- **Friday:** Weekly Sync (PM + CEO/CTO, 30 минут)
  - Прогресс за неделю
  - Blocker'ы и риски
  - План на следующую неделю

**Bi-Weekly:**
- **Grooming Session** (вся команда, 2 часа)
- **Metrics Review** (PM + stakeholders, 1 час)

**Monthly:**
- **Demo для Stakeholders** (показ работающего функционала)
- **Retrospective** (что сработало, что улучшить)
- **Budget Review** (actual vs planned spend)

**Milestones (с презентацией для всей компании):**
- Неделя 7: Admin Console MVP готов
- Неделя 12: Implicit Mode Live
- Неделя 19: Explicit Mode Soft Launch (первые платежи!)
- Неделя 26: Advanced Tools и Quality Control готовы
- Неделя 32: **FULL ULTRA LIVE** 🚀 (всекомандный celebration!)

---

## Критерии готовности к запуску (Launch Checklist)

### Pre-Launch Checklist (неделя 31-32):

**Технический:**
- [ ] Все E2E тесты проходят (0 critical bugs)
- [ ] Load test: 500+ одновременных SR выдержаны
- [ ] Rollback plan протестирован
- [ ] Monitoring и alerts настроены
- [ ] GDPR compliance подтвержден legal-командой

**Операционный:**
- [ ] 2-3 Orchestrators сертифицированы и активны
- [ ] SOP покрывают 95%+ сценариев
- [ ] Escalation matrix документирована
- [ ] Internal Knowledge Base заполнена

**Маркетинговый:**
- [ ] Email campaigns протестированы (A/B test готов)
- [ ] Help Center статьи опубликованы
- [ ] Video tutorials загружены
- [ ] Blog post и social media контент готовы
- [ ] Sales team обучен (pitch deck, FAQ)

**Бизнес:**
- [ ] Pricing утвержден (результаты A/B тестов учтены)
- [ ] Terms of Service опубликованы
- [ ] Refund policy определена
- [ ] Support team готов отвечать на вопросы о Ultra

**Stakeholder Approval:**
- [ ] CEO/CTO sign-off на Full Launch
- [ ] Marketing sign-off на GTM план
- [ ] Legal sign-off на compliance
- [ ] Finance sign-off на pricing и billing

---

**Итого Q1 MVP:** 17 недель (~4 месяца) от старта до Soft Launch БЕЗ видео и advanced tools.

**Альтернативы Q1:** 
- Ultra-Fast Track: 12 недель (только Explicit, без Implicit)
- Conservative: 21 неделя (extended testing)
- Hybrid Q1+Q2: 24 недели (MVP + базовые advanced tools)

**Рекомендация:** ✅ Standard Q1 MVP (17 недель) - оптимальный баланс для валидации PMF.

**После Q1:** На основе метрик Soft Launch принимаем решение о запуске Q2 (Advanced Tools) и Q3 (Video).
