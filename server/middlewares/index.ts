import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * 全局中间件：请求日志记录器 (Logger Middleware)
 * 
 * 【作用】
 * 无论前端访问哪个接口，都会先经过这里。
 * 它会在控制台打印出请求的方法、路径和时间。
 * 
 * 【设计模式关联：代理模式 / 装饰器模式】
 * 我们在不修改具体 Controller 业务逻辑的前提下，
 * 给所有的请求“套上”了一层额外的功能（打印日志）。
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] 收到请求 👉 ${req.method} ${req.url}`);
  
  // 【极其关键的一步】：调用 next()
  // 这就像是告诉安检员：“检查完毕，放行！”
  // 如果不调用 next()，请求就会一直卡在这里，前端会一直转圈圈直到超时。
  next();
};


/**
 * 局部中间件：登录参数校验器 (Validator Middleware)
 * 
 * 【作用】
 * 专门用在 /api/login 路由上。
 * 在请求真正到达 login Controller 之前，先检查前端有没有把账号密码传过来。
 * 如果没传，直接在这里“拦截并打回”，根本不让它进入后端的业务逻辑层。
 */
export const validateLoginParams = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;


  if (!username || !password) {
    console.log('❌ [中间件拦截] 前端漏传了账号或密码！直接打回！');
    
    // 注意：这里我们用 return 结束了函数，【没有】调用 next()。
    // 请求到这里就被彻底拦截并返回给了前端。
    return res.status(400).json({
      code: 400,
      message: '【中间件报错】用户名和密码不能为空！'
    });
  }
 
  

  // 参数没问题，放行，交给真正的 Controller 去处理业务
  next();
};


export const validateUserId = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization.split(' ')[1];
   if(!token){
    return res.status(401).json({
      code: 401,
      message: '【中间件报错】token不能为空！'
    });
  }else{
    try{
      const decoded =jwt.verify(token, process.env.JWT_SECRET!) as { userId:number };
      console.log(decoded,'decoded');
      req.userId = decoded.userId
      next();
    }catch(err){
      return res.status(401).json({
        code: 401,
        message: '【中间件报错】token无效！'
      });
    }
  }
}
