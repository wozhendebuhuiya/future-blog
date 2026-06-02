import { Router } from 'express';
import { getUserInfo, login } from '../controllers/userController.js';
import { createPost,deletePost,getAllPosts,getPostById, updatePost } from '../controllers/messageController.js';

import { validateLoginParams, validateUserId } from '../middlewares/index.js';

const router = Router();

// ==========================================
// 路由定义：这里只负责“分发”任务
// ==========================================

// GET /api/user -> 分发给 getUserInfo 函数去处理
router.get('/user', getUserInfo);

// POST /api/login -> 【注意变化】
// 在真正交给 login 函数之前，先让 validateLoginParams 中间件检查一下参数！
// 这个中间件如果放行了 (next())，才会走到 login。这就是传说中的“洋葱模型/责任链”
router.post('/login', validateLoginParams, login);
// POST /api/message -> 分发给 createPost 函数去处理
router.post('/posts', validateUserId, createPost);
router.get('/posts',getAllPosts)
router.get('/posts/:id',getPostById)
router.put('/posts/:id',validateUserId,updatePost)
router.delete('/posts/:id',validateUserId,deletePost)



export default router;