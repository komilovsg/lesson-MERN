## lesson-MERN

Learning project for building a full-stack **MERN** app (MongoDB, Express, React, Node.js).

### What’s inside
- **`backend/`**: Express REST API + MongoDB (Mongoose), JWT auth, profiles & posts endpoints
- **`frontend/`**: React + Redux app with alerts and authentication (register/login/logout), dashboard & profiles pages

### Local development

Run both servers from `backend/`:

```bash
npm run concurrent
```

Defaults:
- **Backend**: `http://localhost:5001` (5000 can be occupied on macOS)
- **Frontend**: `http://localhost:3000`

### Secrets
- Put secrets in `backend/.env` (not committed). Example: `backend/.env.example`

