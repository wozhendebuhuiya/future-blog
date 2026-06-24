import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import BlogList from '../pages/BlogList';
import BlogPost from '../pages/BlogPost';
import About from '../pages/About';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import WritePost from '../pages/WritePost';
import Chat from '../pages/Chat';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// 路由配置：使用嵌套路由实现批量保护
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // === 公开页面 (Public Routes) ===
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'blog',
        element: <BlogList />,
      },
      {
        path: 'blog/:id',
        element: <BlogPost />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },

      // === 受保护的页面 (Protected Routes) ===
      // 这里我们使用一个没有 path 的 Route 作为分组容器
      // 它的 element 是一个包裹了 <Outlet /> 的 ProtectedRoute
      // 这样，它下面的所有 children 都会受到保护
      {
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          {
            path: 'write',
            element: <WritePost />,
          },
          {
            path: 'chat',
            element: <Chat />,
          },
          // 如果你想把所有页面都保护起来，只需要把上面的 public routes 移到这里面即可
        ],
      },
    ],
  },
]);
