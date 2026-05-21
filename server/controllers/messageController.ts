import { Request, Response } from 'express';
// 引入全局唯一的数据库实例
import prisma from '../db.js';

export const createPost = async (req: Request, res: Response) => {
  console.log('👀 [Controller] 处理 /api/message POST 请求');

  const title =  req.body.title;
  const content = req.body.content;
  console.log('👀 [Controller] 处理 /api/message POST 请求，前端传过来的内容是:', title,content);

  try{
    // 1. 检查 title 是否为空
    if (!title) {
      return res.status(400).json({ code: 400, message: '标题不能为空' });
    }
    // 2. 检查 content 是否为空
    if (!content) {
      return res.status(400).json({ code: 400, message: '内容不能为空' });
    }
    const postData = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId:1
      }
    });
    res.json({
      code: 200,
      message: '创建成功',
      data: postData
    });
  } catch (error) {
    console.error('数据库查询报错:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}