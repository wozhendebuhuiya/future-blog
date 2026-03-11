import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { AuthProvider } from './components/providers/AuthProvider';
import { router } from './router';

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
