# Setup Checklist для работы с Mellow в Cursor

## Контекст проекта

Ты — мой AI coding buddy в Cursor для репозитория **Mellow** (React + Vite + TypeScript).

### Структура веток
- `main` — текущее стабильное состояние продукта (НЕ трогать напрямую).
- `feature/*` / `playground/*` — гипотезы, эксперименты, альтернативные флоу.

### Нейминг веток
Формат: `<area>--<what-is-tested>`

Примеры:
- `candidates--ultra-variants`
- `sharepack--promote-communities`
- `onboarding--simplified-flow`
- `dashboard--ai-summary`

### Правила работы
- Работай маленькими итерациями, чтобы я могла быстро проверять в браузере.
- Каждая гипотеза = отдельная git-ветка с форматом `<area>--<what-is-tested>`.
- После каждой логической порции: **git status → git add -A → git commit -m "..." → git push**.
- Если появляется ошибка — сначала воспроизведи/прочитай лог, потом фикс.
- Всё делаем внутри Cursor.

### Стиль мокапов
- Всё ч/б (только black/white/grey), без брендов/градиентов/цветных акцентов.
- Один базовый шрифт в мокапе (используем `var(--ds-font-family-body)`).
- Мокапы = прототипы без активных действий внутри продукта.

### Процесс работы с мокапами
1. Согласуем позиции и содержание (продакт + команда) в мокапе.
2. **Копирайтер** привлекается на этапе мокапа — каждое слово должно быть на своем месте уже на этом моменте.
3. Отдаем дизайнеру мокап — он делает черновой макет.
4. Когда окнули с дизайнером черновой макет, он создает финальный макет.
5. Отдаем в разработку.

### Документы-ориентиры
- `standarts/mellow_product_context.md` - контекст продукта
- `standarts/vibe-coding-product-hypotheses-process.md` - процесс работы
- `.cursor/setup-checklist.md` - этот чек-лист

### Критерии качества для мокапов
1. **Good empty states are never empty**
   - Visible Value: Что здесь будет и почему это ценно
   - Clear Action: Что пользователь может сделать прямо сейчас
   - Visual hierarchy: Иллюстрация + текст + действие
   
2. **Черно-белый стиль**
   - Только #000000 (black), #FFFFFF (white), #666666/#E5E5E5 (grey)
   - Без градиентов, цветных акцентов, брендинга
   
3. **Один шрифт**
   - Использовать `var(--ds-font-family-body)` везде
   - Вариации через font-weight и font-size

4. **Копирайт на месте**
   - Каждое слово проверено и осмысленно
   - Ясное обещание/ценность, не маркетинговый buzz
   - Конкретные действия, не абстракции

---

## Pre-Flight Checklist

### 0. Понять задачу
- [ ] Прочитать контекст задачи из промпта пользователя
- [ ] Изучить референсы (скриншоты, примеры)
- [ ] Понять: WHO использует, WHAT создаем, WHY нужно, HOW будет работать
- [ ] Определить критерии успеха (что = "готово"?)
- [ ] Спросить, если что-то неясно (лучше уточнить сейчас, чем переделывать)

### 1. Git Configuration
- [ ] Проверить текущую ветку: `git branch --show-current`
- [ ] Создать новую ветку для гипотезы: `git checkout -b <area>--<what-is-tested>`
- [ ] Проверить статус: `git status`
- [ ] Убедиться, что есть доступ к remote: `git remote -v`

### 2. Dependencies & Environment
- [ ] Проверить наличие node_modules: `ls node_modules` или `npm install`
- [ ] Проверить package.json на актуальность зависимостей

### 3. Dev Server Setup
- [ ] Проверить свободные порты: `lsof -ti:5173,5174,8080` и т.д.
- [ ] Если порты заняты старыми процессами:
  ```bash
  killall -9 node 2>/dev/null
  lsof -ti:5173 | xargs kill -9 2>/dev/null
  ```
- [ ] Настроить vite.config.ts с учетом sandbox:
  ```typescript
  export default defineConfig({
    plugins: [react()],
    server: {
      port: 10173, // Используй порты выше 10000 для избежания EPERM
      host: "localhost",
      strictPort: false
    }
  });
  ```

### 4. Sandbox & Permissions
- [ ] Помнить про sandbox ограничения:
  - Network операции требуют `required_permissions: ["network"]`
  - Git операции требуют `required_permissions: ["git_write"]`
  - При проблемах с портами использовать `required_permissions: ["all"]`
- [ ] Избегать IPv6 (::1) - использовать IPv4 (127.0.0.1, localhost)
- [ ] Использовать порты выше 10000 для избежания EPERM ошибок

### 5. Запуск Dev Server
- [ ] Запустить сервер: `npm run dev` с правами `["network"]`
- [ ] Дождаться сообщения "VITE ready" в логах
- [ ] Проверить URL в логах: `Local: http://localhost:XXXXX/`
- [ ] Протестировать доступность: `curl -s http://localhost:XXXXX | head -10`

### 6. Browser Preview
- [ ] Открыть встроенный браузер Cursor на URL из логов
- [ ] Если браузер не работает, использовать системный браузер
- [ ] Проверить консоль браузера (F12) на ошибки

### 7. Code Quality
- [ ] Проверить linter: `ReadLints` на измененных файлах
- [ ] Убедиться, что нет TypeScript ошибок
- [ ] Проверить, что все импорты корректны

### 8. Git Workflow
- [ ] После завершения гипотезы:
  ```bash
  git status
  git add -A
  git commit -m "краткое описание изменений"
  git push -u origin <branch-name>
  # Пример: git push -u origin candidates--ultra-variants
  ```
- [ ] Создать PR для обсуждения результатов гипотезы
- [ ] Если push не работает (auth проблема), отметить для ручного push позже

---

## Common Issues & Solutions

### EPERM: operation not permitted
**Проблема:** `Error: listen EPERM: operation not permitted ::1:XXXX`
**Решение:** 
- Использовать порты выше 10000
- Добавить `host: "localhost"` в vite.config.ts
- Запускать с `required_permissions: ["network"]`

### Port Already in Use
**Проблема:** Порт занят старым процессом
**Решение:**
```bash
lsof -ti:XXXX | xargs kill -9 2>/dev/null
# или
killall -9 node
```

### Empty Browser Page
**Проблема:** Браузер открывается, но страница пустая
**Решение:**
- Проверить, что сервер действительно запущен: `curl localhost:XXXX`
- Проверить консоль браузера на ошибки
- Убедиться, что URL правильный (без лишних путей)

### Git Push Failed
**Проблема:** `fatal: could not read Username for 'https://github.com'`
**Решение:**
- Создать коммит локально
- Отметить, что push нужно сделать вручную позже
- Или настроить SSH ключи для GitHub

---

## Quick Start Template

```bash
# 1. Создание новой ветки для гипотезы
git checkout -b <area>--<what-is-tested>
# Пример: git checkout -b candidates--ultra-variants
git status

# 2. Очистка портов
killall -9 node 2>/dev/null
sleep 2

# 3. Запуск сервера (в Cursor Shell с permissions)
cd <WORKSPACE_ROOT>  # Путь к проекту
npm run dev
# required_permissions: ["network"]

# 4. Проверка через 6-7 секунд
curl -s http://localhost:10173 | head -10
# или проверить актуальный порт из логов

# 5. Открыть в браузере
# URL из логов: "Local: http://localhost:XXXXX/"
```

---

## Notes
- Всегда давать серверу 6-8 секунд на запуск перед проверкой
- Логи сервера: `~/.cursor/projects/<PROJECT_PATH>/terminals/*.txt`
- При проблемах с портами - пробовать следующий: 10173 → 10174 → 10175...

---

## Quality Gate: Self-Review Protocol

Перед завершением задачи - проверь по методу **5W+H**:

### WHO (Кто?)
- [ ] Понятно, кто целевой пользователь экрана/фичи?
- [ ] Учтен ли контекст пользователя (новичок/опытный, спешит/изучает)?

### WHAT (Что?)
- [ ] Создано то, что просили (не больше, не меньше)?
- [ ] Соблюдены стилевые требования (ч/б, один шрифт)?
- [ ] Все элементы на месте (по референсу/заданию)?

### WHEN (Когда?)
- [ ] Понятно, когда/при каких условиях показывается?
- [ ] Настроена навигация (откуда приходит, куда уходит)?

### WHERE (Где?)
- [ ] Файлы в правильной структуре?
- [ ] Код в правильной ветке (`<area>--<what-is-tested>`)?
- [ ] Чек-лист/документация обновлена?

### WHY (Почему?)
- [ ] Понятна ценность для пользователя ("what's in it for me")?
- [ ] Empty state = ценность + действие (не просто "пусто")?
- [ ] Копирайт осмыслен (не generic placeholder)?

### HOW (Как?)
- [ ] Код чистый (linter passed)?
- [ ] Responsive (работает на мобильном)?
- [ ] Протестировано в браузере (не только теоретически)?

### Final Score
**Если хотя бы 2 пункта "нет" → дорабатывай**
**Цель: все пункты "да" = качество 9.8+/10**
