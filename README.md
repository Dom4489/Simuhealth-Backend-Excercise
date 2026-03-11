# Simuhealth Backend Exercise

A simple REST API for managing todo list items with user authentication.

## Technologies

- **Node.js**: runtime environment
- **Express**: HTTP server and routing
- **TypeScript**
- **bcryptjs**: password hashing
- **jsonwebtoken**: JWT-based authentication

## File Architecture

```
├── .env                    # secrets (gitignored)
├── .env.example            # safe-to-commit template
├── .gitignore
├── tsconfig.json
├── package.json
├── controllers/
│   ├── authController.ts   # login logic
│   └── todoController.ts   # CRUD operations for todos
├── middlewares/
│   ├── authMiddleware.ts   # JWT verification
│   └── loggerMiddleware.ts # request logging
├── routes/
│   ├── authRoutes.ts       # POST /auth
│   └── todoRoutes.ts       # GET/POST/PUT/PATCH/DELETE /todos
├── config/
│   └── db.ts               # in-memory data store and types
└── server.ts               # entry point
```

## Getting Started

```bash
npm install
npx nodemon server.ts
```

## .env variable values
- PORT=3000
- JWT_SECRET=supersecretkey

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth` | No | Login, returns JWT |
| GET | `/todos` | No | Get all todos (filterable) |
| POST | `/todos` | Yes | Create a todo |
| PUT | `/todos/:id` | Yes | Full update (all fields required) |
| PATCH | `/todos/:id` | Yes | Partial update |
| DELETE | `/todos/:id` | Yes | Delete a todo |

Protected routes require `Authorization: Bearer <token>` in the request header.
Tested with Postman.
