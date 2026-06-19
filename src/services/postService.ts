import { Post } from '../types';
import { API_BASE_URL } from '../config';

const STORAGE_KEY = 'blog_posts_local';

class PostService {
  // 获取所有文章 (静态 + 本地)
  async getAllPosts() {
    let allData:any;
    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    allData = await res.json()
    // 合并时，优先展示本地文章（通常是最新的），然后是静态文章
    // 这里我们将本地文章放在前面
    return [...allData.data];
  }

  // 获取单篇文章
  async getPostById(id: number){
    const res = await fetch(`http://localhost:9800/api/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const allPosts = await res.json()
    return allPosts.data;
  }

  // 创建新文章
  async createPost(postData: Omit<Post, 'id' | 'updatedAt' | 'readTime'>) {
    const localPosts = this.getLocalPosts();
    const allPosts = await this.getAllPosts();
    
    // 生成新的 ID: 找到当前最大的 ID + 1
    const maxId = allPosts.length > 0 
      ? Math.max(...allPosts.map(p => p.id)) 
      : 0;
    
    const newPost: Post = {
      ...postData,
      id: maxId + 1,
      updatedAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      readTime: this.calculateReadTime(postData.content),
    };
  console.log('创建新文章:', newPost);
    fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        content: newPost.content,
        title: newPost.title,
      }),
    }).then(res => res.json()).then(data => {
      console.log('创建新文章:', data);
      // navigate(`/blog/${data.id}`);
    });

    // 保存到 localStorage
    // const updatedLocalPosts = [newPost, ...localPosts];
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocalPosts));
  

    return newPost;
  }

  // 更新文章
  updatePost(post: Post): void {
   
  }

  // 删除文章

  // 从 localStorage 获取文章
  private getLocalPosts(): Post[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse local posts:', error);
      return [];
    }
  }

  // 简单的阅读时间计算
  private calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min`;
  }
}

export const postService = new PostService();
