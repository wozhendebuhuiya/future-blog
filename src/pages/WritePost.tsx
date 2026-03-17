import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Save, Eye, Edit2, Image as ImageIcon } from 'lucide-react';
import { postService } from '../services/postService';
import { Category } from '../types';

const WritePost = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit'); // 获取 URL 中的 edit 参数
  
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'React' as Category,
    excerpt: '',
    image: 'https://images.unsplash.com/photo-1499750310159-52f8f24e96a0?q=80&w=2070&auto=format&fit=crop',
    content: ''
  });

  // 如果是编辑模式，加载文章数据
  useEffect(() => {
    if (editId) {
      const post = postService.getPostById(Number(editId));
      if (post) {
        setFormData({
          title: post.title,
          category: post.category,
          excerpt: post.excerpt,
          image: post.image,
          content: post.content
        });
      }
    }
  }, [editId]);

  const categories: Category[] = ['React', 'Vue', 'TypeScript', 'CSS', 'Next.js', 'JS'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('请填写标题和内容');
      return;
    }

    if (editId) {
      // 更新文章
      const postToUpdate = postService.getPostById(Number(editId));
      if (postToUpdate) {
        postService.updatePost({
          ...postToUpdate,
          ...formData
        });
        navigate(`/blog/${editId}`);
      }
    } else {
      // 创建新文章
      const newPost = postService.createPost(formData);
      navigate(`/blog/${newPost.id}`);
    }
  };

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">写文章</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('write')}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                activeTab === 'write'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <Edit2 size={16} />
              编辑
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                activeTab === 'preview'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <Eye size={16} />
              预览
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'write' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    文章标题
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    placeholder="输入引人入胜的标题..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    分类
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  摘要
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow resize-none"
                  placeholder="简短描述文章内容..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  封面图片 URL
                </label>
                <div className="flex gap-4">
                  <div className="flex-grow relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  正文 (支持 Markdown)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={15}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow font-mono text-sm"
                  placeholder="# 开始你的创作..."
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  发布文章
                </button>
              </div>
            </form>
          ) : (
            <div className="prose prose-lg prose-blue dark:prose-invert max-w-none">
              <h1>{formData.title}</h1>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {formData.content || '(暂无内容)'}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default WritePost;
