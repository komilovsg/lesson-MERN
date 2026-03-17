## lesson-MERN — учебный backend по курсу MERN

Этот проект — мой **учебный бэкенд на Node.js / Express / MongoDB**, из курса по MERN‑стеку (DevConnector / аналогичный курс). Здесь по шагам строим API, учимся работать с MongoDB Atlas, Mongoose, JWT‑аутентификацией и структурой реального приложения.

### Что уже реализовано

- **Базовый сервер:**
  - `server.js` — точка входа Express‑приложения
  - Поддержка CORS, парсинг JSON и `urlencoded` тела
  - Тестовые маршруты:  
    - `GET /` → `"API Running"`  
    - `GET /api/health` → статус и timestamp

- **Подключение к MongoDB Atlas:**
  - `config/db.js` — модуль `connectDB()` на Mongoose
  - `config/default.json` (в `.gitignore`) — реальный `mongoURI` и `jwtSecret`
  - `config/default.example.json` — пример конфига без секретов

- **Модели Mongoose:**
  - `models/User.js` — пользователь (name, email, password, avatar, дата регистрации)
  - `models/Profile.js` — профиль, связанный с пользователем (`user: ObjectId`, `ref: 'user'`)
  - `models/Item.js` — простая модель для тренировки CRUD‑операций

- **Маршруты API:**
  - `routes/items.js` — пример REST‑эндпоинтов:
    - `GET /api/items` — список
    - `POST /api/items` — создание документа
  - `routes/api/users.js` — заготовка регистрации пользователя:
    - `POST /api/users` с валидацией `name`, `email`, `password`
    - Подключена модель `User`, есть шаги для проверки существования, шифрования пароля и выдачи JWT
  - `routes/api/auth.js`, `routes/api/profile.js`, `routes/api/posts.js` — тестовые маршруты, подготовленные под дальнейшую реализацию

- **Аутентификация и безопасность:**
  - Установлены пакеты: `bcryptjs`, `jsonwebtoken`, `express-validator`
  - `middleware/auth.js` — middleware для проверки JWT (`x-auth-token`), записывает `req.user`

- **Учебный лог:**
  - `LESSON-LOG.md` — детальный журнал того, какие уроки пройдены, что уже сделано и что планируется дальше.

### Как запустить проект локально

1. **Клонировать или скопировать проект** в директорию `lesson-MERN`.
2. **Установить зависимости:**
   ```bash
   npm install
   ```
3. **Настроить MongoDB Atlas:**
   - Создать кластер и пользователя БД.
   - Взять connection string из Atlas (**Connect → Drivers**).
4. **Настроить конфиг/секреты:**
   - Скопировать `config/default.example.json` в `config/default.json`.
   - Подставить свой `mongoURI` и придумать `jwtSecret` (длинная случайная строка).
5. **Запустить сервер в dev‑режиме:**
   ```bash
   npm run dev
   ```
   Сервер стартует на `http://localhost:5000`. В терминале должны появиться сообщения:
   - `Server started on port 5000`
   - `MongoDB Connected...`

### Полезные endpoints для проверки

- `GET /` — быстро убедиться, что сервер жив.
- `GET /api/health` — статус сервера и время.
- `GET /api/items` — список элементов из MongoDB.
- `POST /api/items` — создать элемент (нужен JSON‑body с `name`).
- `POST /api/users` — заготовка регистрации (проверяет `name`, `email`, `password`).

### Для чего этот проект

- **Практика MERN‑стека:** Express, MongoDB Atlas, Mongoose, JWT, middleware.
- **Повторение курса:** код и структура максимально близки к тому, что показывает автор курса (DevConnector), но с учётом современных версий пакетов.
- **Песочница:** можно безопасно экспериментировать с моделями, роутами, валидацией, аутентификацией и архитектурой API.


