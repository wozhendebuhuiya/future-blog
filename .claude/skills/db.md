---
name: db
description: Prisma database operations — generate client, run migrations, open Studio, or seed data
---

# Database Skill

Run Prisma commands for this project's SQLite database.

## Available Commands

Ask the user which command they need, then run it:

| Command | What it does |
|---|---|
| `npx prisma generate` | 重新生成 Prisma Client 类型（改了 schema.prisma 后必须跑） |
| `npx prisma migrate dev --name <name>` | 创建并运行新的数据库迁移 |
| `npx prisma db push` | 直接把 schema 推到数据库（不需要迁移文件，开发阶段常用） |
| `npx prisma studio` | 打开 Prisma 数据库管理面板（可视化管理数据） |
| `npx prisma db seed` | 运行种子脚本，往数据库填入初始/测试数据 |

## Schema Location

- Schema file: `prisma/schema.prisma`
- Generated client output: `src/generated/prisma`
- Config: `prisma.config.ts`

## Convention

- Provider: SQLite (via libsql adapter)
- Models: `User` (id, username, password, role, skills, posts[]) and `Post` (id, title, content, excerpt, category, image, published, authorId, author)
- Foreign keys use Prisma relations: `Post.authorId` → `User.id`
