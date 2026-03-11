import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, PenTool, Layout, Github, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
  >
    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 mb-6 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full"
        >
          👋 欢迎来到我的数字花园
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6"
        >
          探索技术与设计的<br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
            无限可能
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
        >
          在这里，我分享关于前端开发、UI 设计以及构建现代 Web 应用的思考与实践。
          让我们一起构建未来。
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/blog"
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
          >
            开始阅读
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <Github size={18} />
            GitHub
          </a>
        </motion.div>
      </div>

      {/* 特性展示 */}
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Code}
          title="现代技术栈"
          description="使用 React, Tailwind CSS 和 Framer Motion 构建的高性能应用。"
          delay={0.4}
        />
        <FeatureCard
          icon={Layout}
          title="精美设计"
          description="注重排版与留白，提供最佳的阅读体验。"
          delay={0.5}
        />
        <FeatureCard
          icon={PenTool}
          title="深度思考"
          description="不仅仅是代码，更多的是关于技术背后的思考与复盘。"
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default Home;
