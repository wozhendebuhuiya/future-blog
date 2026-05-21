import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../src/generated/prisma/client.js';

/**
 * 数据库连接池管理器 (单例模式)
 * 
 * 【Prisma v7 的新架构】
 * 官方推荐使用 @prisma/adapter-better-sqlite3 来连接 SQLite 数据库
 */

const connectionString = process.env.DATABASE_URL || 'file:./prisma/dev.db';

// 创建 better-sqlite3 的适配器
const adapter = new PrismaBetterSqlite3({ url: connectionString });

// 实例化 PrismaClient，并显式传入 adapter
const prisma = new PrismaClient({ adapter });

export default prisma;
