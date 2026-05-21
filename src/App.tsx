import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { AuthProvider } from './components/providers/AuthProvider';
import { router } from './router';

// 引入单例模式测试代码，以便在浏览器控制台看到打印效果
import './design-patterns/01-singleton/Singleton';
import './design-patterns/01-singleton/FunctionalSingleton';

// 引入闭包学习测试文件
import './design-patterns/00-javascript-basics/Closure';
import './design-patterns/00-javascript-basics/GarbageCollection';

// 引入工厂模式测试代码
import './design-patterns/02-factory/Factory';

// 引入策略模式测试代码
import './design-patterns/03-strategy/Strategy';

// 现在的 App 组件非常干净，职责单一：
// 1. 提供全局 ThemeProvider (Context)
// 2. 提供全局 RouterProvider (路由)
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        {/* 
          RouterProvider 接收我们在 router/index.tsx 中定义的配置对象 
          这就像是 Vue 中的 app.use(router)
        */}
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
