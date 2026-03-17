# Учёба MERN — Лог уроков

Директория: `lesson-MERN`  
Начало: 14 марта 2025

---

## Как пользоваться

Здесь фиксируем пройденные темы, шаги и заметки. Пиши, что прошли или что нужно добавить — файл буду обновлять по твоим указаниям.

---

## Прогресс

### Уроки

| № | Тема | Статус | Заметки |
|---|------|--------|--------|
| 1 | Install Dependencies & Basic Express Setup | ✅ Пройдено | package.json, express, dotenv, cors, server.js |
| 2 | Connecting to MongoDB with Mongoose | ✅ Пройдено | config/db.js, модель Item, API сохранения/чтения |

---

## MongoDB Atlas — контекст подключения

**Кластер создан.** Для подключения приложения потом понадобится:

| Параметр | Значение |
|----------|----------|
| **Консоль** | [MongoDB Atlas — Project 0](https://cloud.mongodb.com/v2/69b545551f8f57e8c3bf3866#/overview) |
| **Организация** | SHAKHRON's Org |
| **Проект** | Project 0 |
| **Кластер** | Cluster01 (из шага «Connect to Cluster01») |

**Дальше при подключении:**
1. В консоли: **Connect** → **Choose a connection method**.
2. Для MERN (Node/Express): выбрать **Drivers** → скопировать connection string.
3. В строке подставить: пароль пользователя БД и при необходимости имя базы вместо `<database>`.
4. Connection string сохранять в `.env` (например `MONGO_URI=...`), не коммитить в git.

*Пароль пользователя БД и финальный connection string — только у тебя локально; сюда не записываем.*

---

## Заметки

### Урок 1 — Install Dependencies & Basic Express Setup
- **Зависимости:** `express`, `dotenv`, `cors`
- **Dev-зависимости:** `nodemon` (автоперезагрузка при изменении файлов), `concurrently` (запуск нескольких скриптов — пригодится, когда будет фронт)
- **Скрипты:** `npm start` — запуск, `npm run dev` или `npm run server` — сервер с nodemon
- **Файлы:** `server.js` (точка входа), `.env.example` (шаблон переменных), `.gitignore`
- **Роуты:** `GET /` — приветствие API, `GET /api/health` — проверка работы сервера

### Урок 2 — Connecting to MongoDB with Mongoose
- **Пакет:** `mongoose` — ODM для MongoDB (схемы, модели, сохранение в БД).
- **Подключение:** `config/db.js` — `connectDB()` читает `MONGO_URI` из `.env`, сервер стартует только после успешного подключения.
- **Модель:** `models/Item.js` — пример схемы (name, description, timestamps). Коллекция в БД: `items`.
- **API:** `routes/items.js` — `GET /api/items` (список), `POST /api/items` (сохранить в БД). Тело POST: `{ "name": "...", "description": "..." }`.
- **Важно:** создать файл `.env` и прописать `MONGO_URI` (скопировать из Atlas, подставить пароль и имя базы).

---

## User API Routes & JWT Authentication (подготовка)

| № | Тема | Тип | Статус |
|---|------|-----|--------|
| 1 | Creating The User Model | Видео 4 мин | ✅ Модель `models/User.js` создана |
| 2 | Request & Body Validation | Видео 9 мин | 📦 express-validator установлен |
| 3 | User Registration | Видео 14 мин | 📦 bcryptjs установлен |
| 4 | Implementing JWT | Видео 10 мин | 📦 jsonwebtoken установлен |
| 5 | Custom Auth Middleware & JWT Verify | Видео 12 мин | ✅ `middleware/auth.js` создан |
| 6 | User Authentication / Login Route | Видео 9 мин | — |
| 7 | Creating and Validating User Models with Mongoose | Диалог 15 мин | — |
| 8 | User API Routes & JWT Authentication - Assessment | Оцениваемое задание 15 мин | — |

**Что подготовлено:**  
- Пакеты: `bcryptjs`, `jsonwebtoken`, `express-validator`  
- Модель: `models/User.js` (name, email, password, avatar)  
- Middleware: `middleware/auth.js` — проверка JWT, `req.user`  
- В `config/default.json` добавить ключ `"jwtSecret": "твой_секрет"` (есть в `config/default.example.json`)

_(Свободное место для заметок по ходу учёбы)_

---

## Чек-лист окружения

- [ ] Node.js установлен
- [x] Express: зависимости установлены, базовый server.js
- [x] MongoDB Atlas: кластер создан
- [ ] MongoDB Atlas: IP добавлен, пользователь БД создан
- [ ] Готов к шагу «Choose a connection method»
- [ ] В корне проекта создан `.env` с `MONGO_URI` (из Atlas)

---

*Следующее обновление — по твоим указаниям.*
