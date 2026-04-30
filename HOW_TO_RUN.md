# Scout Sales Demo — как запустить у себя

Это интерактивный кликабельный прототип Scout (Mellow) для демо продажникам. Открывается в браузере, ходит по 9 экранам через стрелки `Prev / Next →` и кнопки внутри интерфейса.

## TL;DR (если ты технарь)

```bash
git clone git@github.com:vburdakovamellow/Mellow.git mellow
cd mellow/repo
git checkout pl/scout-sales-demo
npm install
npm run dev
```

Открой `http://localhost:5173` — демо запустится сразу.

---

## Если ты не технарь — попроси AI помощника (Cursor / Claude / ChatGPT / Copilot)

Скопируй текст ниже в чат с AI и нажми Enter. Дальше следуй её инструкциям.

> Помоги мне запустить React-прототип на моём компьютере. Репозиторий: `git@github.com:vburdakovamellow/Mellow.git`, бранч `pl/scout-sales-demo`. Папка с приложением — `repo`. Стек: React 19 + Vite + TypeScript. Запускается через `npm run dev`, открывается на `http://localhost:5173`.
>
> Перед стартом проверь, что у меня установлены:
> 1. **Node.js** версии 20+ (`node -v`). Если нет — пришли ссылку и команду установки для моей ОС.
> 2. **git** (`git --version`). Если нет — то же самое.
> 3. **доступ к репозиторию по SSH** (`ssh -T git@github.com`). Если нет — попроси меня залогиниться в GitHub и помоги настроить SSH-ключ.
>
> Когда всё готово, выполни шаги по очереди и проверяй вывод каждой команды:
> ```
> git clone git@github.com:vburdakovamellow/Mellow.git ~/mellow
> cd ~/mellow/repo
> git checkout pl/scout-sales-demo
> npm install
> npm run dev
> ```
>
> Сервер должен поднять `http://localhost:5173`. Открой его в Chrome или Safari. Если что-то падает — покажи вывод ошибки и помоги починить.

---

## Что должно появиться на экране

Вверху чёрная плашка `SCOUT · SALES DEMO` с точками-степпером и кнопками `← Prev / Next →`. Под ней — продуктовая площадка Scout. Кликаешь по точкам или по `Next →` — переходишь между экранами демо. По кнопкам внутри интерфейса (`Generate request`, `Save & get candidates`, `Invite to apply`, `Add to Shortlist` и т.д.) — двигаешься по happy path.

## Если что-то пошло не так

- **`npm install` падает** — обнови Node до 20+ (`brew install node` на маке, `winget install OpenJS.NodeJS` на винде).
- **порт 5173 занят** — закрой другой Vite-проект, или запусти `npm run dev -- --port 5174`.
- **`Permission denied (publickey)` при `git clone`** — попроси AI помочь сгенерировать SSH-ключ и добавить его в [github.com/settings/keys](https://github.com/settings/keys).
- **страница пустая, в консоли ошибки** — попроси AI выполнить `npm install` ещё раз и перезапустить `npm run dev`.

## Что закрывает в продукте

Полный продуктовый контекст лежит в `internal/standarts/aiscout_context.md`. Текущая ветка демо: `pl/scout-sales-demo`. Сами экраны — в `src/screens/ScoutSalesDemo/`.
