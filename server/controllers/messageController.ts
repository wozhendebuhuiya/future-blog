import { Request, Response } from 'express';
// 引入全局唯一的数据库实例
import prisma from '../db.js';

// 获取登录状态
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, username: true, role: true }  // 只返回必要字段，不返回密码！
    });
    if (!user) {
      return res.status(404).json({ code: 404, message: '用户不存在' });
    }
    res.json({ code: 200, data: user });
  } catch (error) {
    res.status(500).json({ code: 500, message: '服务器错误' });
  }
};
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
        category: req.body.category,
        excerpt: req.body.excerpt,
        image: req.body.image,
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
    const { pageSize } = req.query;
    const postData = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      skip: req.query.cursor ? 1 : 0,
      cursor:req.query.cursor ? { id: Number(req.query.cursor) } : undefined,
      take: Number(pageSize || 10) + 1 || 0,
    })
    const total = await prisma.post.count();
    const pageSizeNum = Number(pageSize || 10);
    const hasMore = postData.length > pageSizeNum;
    res.json({
      code: 200,
      message: '查询成功',
      data: {
        data: postData.slice(0, pageSizeNum),
        nextCursor: hasMore ? postData[pageSizeNum - 1].id : null,
        hasMore: hasMore, 
        total: total || 0,
      }
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

// 更新文章
export const updatePost = async(req: Request, res: Response) =>{
    try{
    const postData = await prisma.post.findUnique({
      where:{id:Number(req.params.id)},
    })
    if (!postData) {
     return res.status(404).json({ code: 404, message: '文章不存在' });
    }
    if(postData?.authorId !== req.userId){
      return res.status(403).json({message:'无权修改他人文章'})
    }else{
      const {title,content,category,excerpt,image } = req.body
      const updated = await prisma.post.update({
      where:{id:Number(req.params.id)},
      data: {title,content,category,excerpt,image}
    })
    if(updated){
      res.json({
      code: 200,
      message: '修改成功',
      data: updated
    });
    }else{
      res.status(404).json({
      code: 404,
      message: '修改失败,数据不存在',
    });
    }
    }
  } catch (error) {
    console.error('数据库查询报错:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}

// 删除文章
// 更新文章
export const deletePost = async(req: Request, res: Response) =>{
    try{
    const postData = await prisma.post.findUnique({
      where:{id:Number(req.params.id)},
    })
    if (!postData) {
     return res.status(404).json({ code: 404, message: '文章不存在' });
    }
    if(postData?.authorId !== req.userId){
      return res.status(403).json({message:'无权修改他人文章'})
    }else{
      const deleted = await prisma.post.delete({
      where:{id:Number(req.params.id)},
    })
    if(deleted){
      res.json({
      code: 200,
      message: '删除成功',
      data: deleted
    });
    }else{
      res.status(404).json({
      code: 404,
      message: '修改失败,数据不存在',
    });
    }
    }
  } catch (error) {
    console.error('数据库查询报错:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}