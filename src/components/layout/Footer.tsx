import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 py-12 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              My<span className="text-blue-600 dark:text-blue-400">Blog</span>
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              构建未来的数字花园
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="/" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              Twitter
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              GitHub
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 text-center text-sm text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
