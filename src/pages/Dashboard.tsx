import React from 'react';
import { useAuth } from '../components/providers/AuthProvider';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border-t-4 border-green-500">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🎉 恭喜！你成功访问了受保护的页面
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          欢迎回来，<span className="font-bold text-blue-600 dark:text-blue-400">{user}</span>
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-left mb-8">
          <h3 className="font-bold mb-2 text-gray-800 dark:text-gray-200">💡 刚才发生了什么？</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 text-sm">
            <li>你点击了受保护的链接</li>
            <li>React Router 检查到你未登录</li>
            <li>Protected Route 组件把你重定向到了登录页</li>
            <li>你输入名字并点击登录</li>
            <li>Auth Context 更新了全局状态</li>
            <li>你被重定向回了这个页面</li>
          </ul>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          退出登录
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
