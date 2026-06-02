import React,{useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Edit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { postService } from '../services/postService';
import { useTheme } from '../components/providers/ThemeProvider';
import { useAuth } from '../components/providers/AuthProvider';
import { Post } from '../types';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [post,setPost] = useState<Post | null>(null)
  // 安全地处理 id，因为 useParams 可能返回 undefined
 useEffect(() => {                          // ← useEffect 处理异步
    const postId = id ? parseInt(id) : null;
    if (postId) {
      postService.getPostById(postId);
    }
  }, [id]);
  if (!post) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">文章未找到</h1>
        <Link to="/blog" className="text-blue-600 dark:text-blue-400 mt-4 inline-block">返回列表</Link>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/write?edit=${post.id}`);
  };

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            返回文章列表
          </Link>

          {isAuthenticated && (
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Edit size={16} className="mr-2" />
              编辑文章
            </button>
          )}
        </div>

        <header className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-blue-600 dark:text-blue-400 font-medium px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full text-sm">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-800 pb-8">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{post.updatedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-12 shadow-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <article className="prose prose-lg prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <p className="lead text-xl text-gray-700 dark:text-gray-200 mb-8">
            {post.excerpt}
          </p>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}: any) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={theme === 'dark' ? vscDarkPlus : oneLight}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 !bg-gray-50 dark:!bg-gray-800 !p-4 !my-6"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={`${className} bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-medium text-gray-800 dark:text-gray-200`} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </motion.div>
    </div>
  );
};

export default BlogPost;
