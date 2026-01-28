# Setup Checklist для работы с Mellow в Cursor

## Контекст проекта

Ты — мой AI coding buddy в Cursor для репозитория **Mellow** (React + Vite + TypeScript).

### Структура веток
- `main` — стабильный baseline (НЕ трогать).
- `tests` — песочница (работаем ТОЛЬКО тут).

### Правила работы
- Работай маленькими итерациями, чтобы я могла быстро проверять в браузере.
- После каждой логической порции: дай команды **git status → git add -A → git commit -m "..." → git push** (пушим только в `tests`).
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

---

## Pre-Flight Checklist

### 1. Git Configuration
- [ ] Проверить текущую ветку: `git branch --show-current`
- [ ] Если не в `tests`, переключиться: `git checkout tests && git pull`
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
- [ ] После завершения фичи:
  ```bash
  git status
  git add -A
  git commit -m "краткое описание изменений"
  git push origin tests
  ```
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
# 1. Проверка среды
git branch --show-current  # Должно быть: tests
git status

# 2. Очистка портов
killall -9 node 2>/dev/null
sleep 2

# 3. Запуск сервера (в Cursor Shell с permissions)
cd /Users/valeryrelavy/Documents/Mellow
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
- Логи сервера: `/Users/valeryrelavy/.cursor/projects/Users-valeryrelavy-Documents-Mellow/terminals/*.txt`
- При проблемах с портами - пробовать следующий: 10173 → 10174 → 10175...
