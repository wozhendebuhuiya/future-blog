import { Request, Response } from 'express';
// 引入全局唯一的数据库实例
import prisma from '../db.js';
// 创建文章
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
        authorId: req.userId,
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
// 获取文章
export const getAllPosts = async(req: Request, res: Response) =>{
    try{
    const postData = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json({
      code: 200,
      message: '查询成功',
      data: postData
    });
  } catch (error) {
    console.error('数据库查询报错:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// 获取文章详情
export const getPostById = async(req: Request, res: Response) =>{
    try{
    const postData = await prisma.post.findUnique({
      where:{id:Number(req.params.id)},
      include:{author:true}
    })
    if(postData){
      res.json({
      code: 200,
      message: '查询成功',
      data: postData
    });
    }else{
      res.status(404).json({
      code: 404,
      message: '数据不存在',
    });
    }
    
  } catch (error) {
    console.error('数据库查询报错:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}