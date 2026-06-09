# future

全栈博客应用 — React 19 + Express 5 + Prisma + SQLite + TypeScript

## 技术栈

- **前端**: React 19, TypeScript, Tailwind CSS, react-router-dom v7, framer-motion, lucide-react
- **后端**: Express 5, TypeScript, tsx, nodemon
- **数据库**: SQLite (libsql), Prisma ORM
- **认证**: JWT (jsonwebtoken)

## 项目结构

```
src/
  components/
    layout/     — 布局组件 (Navbar, Footer, Layout)
    auth/       — 认证相关 (ProtectedRoute)
    providers/  — Context Provider (AuthProvider, ThemeProvider)
  pages/        — 页面组件 (Home, BlogList, BlogPost, WritePost, Dashboard, Settings, Login, About)
  router/       — 路由配置
  services/     — API 调用服务层
  generated/prisma/ — Prisma Client 生成代码
server/
  controllers/  — 请求处理逻辑 (messageController, userController)
  middlewares/  — 认证和校验中间件
  routes/       — API 路由定义
  types/        — TypeScript 类型增强
  db.ts         — Prisma Client 实例
prisma/
  schema.prisma — 数据模型 (User, Post)
```

## 开发命令

- `npm start` — React 前端开发服务器 (端口 3000)
- `npm run server` — Express 后端开发服务器 (端口 3001, 热重载)
- `npm test` — 运行测试
- `npx prisma studio` — 数据库可视化管理

## API 响应格式

```typescript
{ code: number, data: any, message: string }
```

## 自定义 Skills

项目在 `.claude/skills/` 下有 4 个自定义技能：
- `/db` — 数据库操作
- `/dev` — 启动开发环境
- `/component` — 生成前端组件
- `/api` — 生成后端接口
