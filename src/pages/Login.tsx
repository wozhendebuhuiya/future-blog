import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/providers/AuthProvider';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 获取之前的页面路径，如果不存在则默认为首页
  // 这就是 Vue Router 中 next(to.path) 的 React 写法
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      // 登录成功，跳转回之前的页面
      // replace: true 意味着这个跳转会替换当前的历史记录，防止用户点"后退"又回到登录页
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          请先登录
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              用户名
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="随便输入个名字..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            登录
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          (这是一个演示页面，不需要密码)
        </p>
      </div>
    </div>
  );
};

export default Login;
