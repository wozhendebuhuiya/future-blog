import React from 'react';
import { useAuth } from '../components/providers/AuthProvider';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          ⚙️ 个人设置
        </h1>
        <div className="space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              账户信息
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  用户名
                </label>
                <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                  {user}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  角色
                </label>
                <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                  管理员
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              通知偏好
            </h2>
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                id="email-notify" 
                defaultChecked 
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="email-notify" className="text-gray-700 dark:text-gray-300">
                接收新评论邮件通知
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
