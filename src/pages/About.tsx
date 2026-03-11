import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-lg prose-blue dark:prose-invert max-w-none"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">关于我</h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            你好！我是一名热爱技术与设计的前端开发者。我致力于构建用户体验优秀、代码质量上乘的 Web 应用。
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            我相信技术不仅仅是工具，更是创造未来的画笔。通过不断的学习和实践，我希望能够在这个快速变化的数字世界中，留下属于自己的一笔。
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">技能栈</h2>
          <ul className="grid grid-cols-2 gap-4 list-none pl-0">
            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              React & Next.js
            </li>
            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              TypeScript
            </li>
            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Tailwind CSS
            </li>
            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Node.js
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
