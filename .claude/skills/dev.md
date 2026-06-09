---
name: dev
description: Start the full development environment — React frontend + Express backend concurrently
---

# Dev Skill

Start both the frontend and backend development servers for this project.

## How to Run

Ask the user which mode they want, then execute the appropriate commands:

### Mode 1: Full Stack (前端 + 后端)

```bash
npm run server & npm start
```

Or start them separately in different terminals:

- **Backend** (Express API server on port 3001):
  ```bash
  npm run server
  ```

- **Frontend** (React dev server on port 3000):
  ```bash
  npm start
  ```

### Mode 2: Backend Only

```bash
npm run server
```

### Mode 3: Frontend Only

```bash
npm start
```

## Project Info

- Frontend: http://localhost:3000 (React 19 + TypeScript + Tailwind CSS)
- Backend: http://localhost:3001 (Express 5 + TypeScript + Prisma)
- API routes defined in: `server/routes/api.ts`
- Server entry: `server/index.ts`

## Key Scripts (from package.json)

- `npm start` — React 前端开发服务器
- `npm run server` — Express 后端开发服务器 (nodemon + tsx 热重载)
- `npm test` — 运行 React 测试
- `npm run build` — 构建生产版本
