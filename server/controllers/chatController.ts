import { Request, Response } from 'express';
export const chatMessagePosts = async(req: Request, res: Response) =>{
    try{
    const { message } = req.body;
    if(!message){
      return res.status(400).json({ code: 400, message: '请输入不能为空' });
    }
    const response = await fetch(process.env.CHAT_API_URL as string, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CHAT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-v4-flash',
        messages: [
          { role: 'user', content: message }
        ],
        temperature: 0.5
      })
    })
    const data = await response.json();
    res.json({
      code: 200,
      message: '查询成功',
      data: data
    });
  } catch (error) {
    console.error('数据库查询报错:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
}