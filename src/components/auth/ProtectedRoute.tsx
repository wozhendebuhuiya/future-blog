import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// 这就是 React 中的"路由守卫"：它其实就是一个普通的组件！
// 它根据条件来决定：
// 1. 渲染子组件 (通过验证)
// 2. 渲染 <Navigate /> (重定向)
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  console.log('ProtectedRoute', children);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // 没登录？那就重定向到登录页
    // state={{ from: location }} 是为了登录成功后跳回之前的页面
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
