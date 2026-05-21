import { Request, Response } from 'express';
// 引入全局唯一的数据库实例
import prisma from '../db.js';

// 处理获取用户信息的逻辑 (现在变成了 async 函数，因为查数据库是异步的)
export const getUserInfo = async (req: Request, res: Response) => {
  console.log('👀 [Controller] 处理 /api/user 请求');
  
  try {
    // 真实场景：假设我们查询 username 为 'admin' 的用户
    // 如果数据库里没有，我们先模拟一个假数据返回防止前端报错
    const user = await prisma.user.findUnique({
      where: { username: 'admin' }
    });

    if (!user) {
      // 数据库里还没数据，返回之前写死的假数据过渡一下
      return res.json({
        code: 200,
        message: '获取成功 (假数据)',
        data: { id: 1, name: '前端进阶全栈的你', role: 'SuperAdmin' }
      });
    }

    res.json({
      code: 200,
      message: '获取成功 (来自真实数据库!)',
      data: user
    });
  } catch (error) {
    console.error('数据库查询报错:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
};

// 处理用户登录的逻辑
export const login = async (req: Request, res: Response) => {
  console.log('\n👀 [Controller] 处理 /api/login POST 请求');
  
  const { username, password } = req.body;
  console.log(`👉 前端传过来的账号是: ${username}, 密码是: ${password}`);

  try {
    // 【核心变化】：不再是 if-else 写死了！去真实的数据库里比对！
    const user = await prisma.user.findUnique({
      where: { username }
    });

    // 1. 如果数据库里根本没这个用户
    if (!user) {
      // 为了测试方便，如果数据库为空，我们直接在这里帮用户【注册】一个！
      console.log('💡 数据库里没这个用户，我帮你自动注册一个！');
      const newUser = await prisma.user.create({
        data: {
          username: username,
          password: password, // 注意：真实开发中密码绝对不能明文存储！必须用 bcrypt 加密
          skills: 'React,Node.js'
        }
      });
      
      return res.json({
        code: 200,
        message: '用户不存在，已自动为你注册并登录成功！',
        data: newUser
      });
    }

    // 2. 用户存在，比对密码
    if (user.password === password) {
      res.json({
        code: 200,
        message: '登录成功！',
        data: user,
        token: 'fake-jwt-token-xxxxxx'
      });
    } else {
      res.status(401).json({
        code: 401,
        message: '账号或密码错误，请重试！'
      });
    }
  } catch (error) {
    console.error('数据库操作报错:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
};