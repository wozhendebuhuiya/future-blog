import { Post } from '../types';
import { API_BASE_URL } from 'config';

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
    const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
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
  console.log('创建新文章:', postData);
   const res = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        content: postData.content,
        title: postData.title,
        category: postData.category,
        excerpt: postData.excerpt,
        image: postData.image,
      }),
    })
    const data = await res.json()
    console.log(data, '创建新文章');
    return data.data;

    // 保存到 localStorage
    // const updatedLocalPosts = [newPost, ...localPosts];
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocalPosts));
  

    
  }

  // 更新文章
  async updatePost(id: number, postData: Omit<Post, 'id' | 'updatedAt' | 'readTime'>) {
    const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        content: postData.content,
        title: postData.title,
        category: postData.category,
        excerpt: postData.excerpt,
        image: postData.image,
      }),
    })
    const data = await res.json()
    console.log(data, '更新文章');
    return data.data;
  }

  // 删除文章
  async deletePost(id: number) {
    const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await res.json()
    console.log(data, '删除文章');
    return data.data;
  }
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
