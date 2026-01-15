# Инструкция по созданию скриншота страницы

## Вариант 1: Автоматический скриншот (требует установки Playwright)

### Шаги:

1. **Установите Playwright** (если еще не установлен):
```bash
npm install --save-dev playwright
npx playwright install chromium
```

2. **Запустите dev сервер в одном терминале**:
```bash
npm run dev
```

3. **В другом терминале запустите скрипт для скриншота**:
```bash
npm run screenshot
```

Скриншот будет сохранен в файл `screenshot-full-page.png` в корне проекта.

---

## Вариант 2: Ручной скриншот через браузер

### Chrome/Edge:
1. Запустите приложение: `npm run dev`
2. Откройте `http://localhost:5173` в браузере
3. Нажмите `F12` для открытия DevTools
4. Нажмите `Cmd+Shift+P` (Mac) или `Ctrl+Shift+P` (Windows/Linux)
5. Введите "screenshot" и выберите "Capture full size screenshot"

### Firefox:
1. Запустите приложение: `npm run dev`
2. Откройте `http://localhost:5173` в браузере
3. Нажмите `F12` для открытия DevTools
4. Нажмите на три точки (⋮) в правом верхнем углу DevTools
5. Выберите "Screenshot" → "Capture full page"

### Safari:
1. Запустите приложение: `npm run dev`
2. Откройте `http://localhost:5173` в браузере
3. Используйте встроенные инструменты macOS: `Cmd+Shift+4` для выбора области или используйте расширения браузера

---

## Вариант 3: Использование расширений браузера

Установите расширение для скриншотов (например, "Full Page Screen Capture" для Chrome) и используйте его для создания скриншота всей страницы.
