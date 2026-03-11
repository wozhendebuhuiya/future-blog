import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

// 监听路由变化并滚动到顶部的组件
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// 布局组件：这就相当于 Vue 中的 App.vue + <router-view>
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      
      {/* 这里的 Outlet 就完全等同于 Vue 中的 <router-view /> */}
      {/* 它负责渲染当前路由匹配到的子组件 */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
