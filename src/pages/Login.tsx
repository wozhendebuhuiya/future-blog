import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/providers/AuthProvider';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); // 用于存储展示给用户的错误信息
  const [loading, setLoading] = useState(false); // 请求时的 loading 状态

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 获取之前的页面路径，如果不存在则默认为首页
  // 这就是 Vue Router 中 next(to.path) 的 React 写法
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单的表单校验
    if (!username.trim() || !password.trim()) {
      setErrorMsg('用户名和密码不能为空');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      // 这里的 fetch 逻辑就是我们从 App.tsx 中迁移过来的
      const response = await fetch('http://localhost:9800/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 请求成功，并且后端校验通过 (HTTP 状态码 2xx)
        // 这里的 login() 会把 user 信息存入 Context，更新整个 React 树的状态
        login(data.data.username);
        
        // 登录成功，跳转回之前的页面
        // replace: true 意味着这个跳转会替换当前的历史记录，防止用户点"后退"又回到登录页
        navigate(from, { replace: true });
      } else {
        // 后端返回错误（例如 401 密码错误）
        setErrorMsg(data.message || '登录失败，请检查账号密码');
      }
    } catch (error) {
      // 网络错误或者后端服务未启动
      console.error('❌ 请求后端失败', error);
      setErrorMsg('网络请求失败，请确认后端服务是否启动');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          请先登录
        </h2>
        
        {/* 如果有错误信息，在这里展示 */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {errorMsg}
          </div>
        )}

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
              placeholder="请输入用户名"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              密码
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入密码"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-2 px-4 rounded transition-colors ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          (试试用你刚写入数据库的账号和密码)
        </p>
      </div>
    </div>
  );
};

export default Login;
