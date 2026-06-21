import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// 引入刚刚分离出去的路由模块
import apiRoutes from './routes/api.js';
// 引入刚刚写的【全局中间件】
import { requestLogger } from './middlewares/index.js';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9800;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
// ==========================================
// 1. 中间件 (Middleware) 区域
// ==========================================
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// 【新加的一步】：全局挂载自定义日志中间件！
// 在所有路由处理之前，先通过这个“安检门”
app.use(requestLogger);

// ==========================================
// 2. 路由注册区域 (现在变得极其清爽了)
// ==========================================

// 将 '/api' 这个前缀的所有请求，都交给 apiRoutes 这个导诊台去处理
app.use('/api', apiRoutes);

// 基础测试接口依然留在这里
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}
app.get('/', (req, res) => {
  res.send('你好！这是重构后的 MVC 架构服务器！');
});

// ==========================================
// 3. 启动服务器
// ==========================================
app.listen(PORT, () => {
  console.log(`\n🚀 后端服务器启动成功！(MVC 架构重构版)`);
  console.log(`👉 请在浏览器访问测试: http://localhost:${PORT}`);
  console.log(`👉 用户接口测试: http://localhost:${PORT}/api/user\n`);
});
