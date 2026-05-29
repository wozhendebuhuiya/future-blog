import { Post, Category } from '../types';
import { posts as staticPosts } from '../data/posts';

const STORAGE_KEY = 'blog_posts_local';

class PostService {
  // 获取所有文章 (静态 + 本地)
  async getAllPosts() {
    let allData:any;
    const res = await fetch('http://localhost:9800/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    allData = await res.json()
    // 合并时，优先展示本地文章（通常是最新的），然后是静态文章
    // 这里我们将本地文章放在前面
    return [...allData.data,...staticPosts];
  }

  // 获取单篇文章
  async getPostById(id: number){
    const allPosts =  await this.getAllPosts();
    return allPosts.find(post => post.id === id);
  }

  // 创建新文章
  async createPost(postData: Omit<Post, 'id' | 'date' | 'readTime'>) {
    const localPosts = this.getLocalPosts();
    const allPosts = await this.getAllPosts();
    
    // 生成新的 ID: 找到当前最大的 ID + 1
    const maxId = allPosts.length > 0 
      ? Math.max(...allPosts.map(p => p.id)) 
      : 0;
    
    const newPost: Post = {
      ...postData,
      id: maxId + 1,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      readTime: this.calculateReadTime(postData.content),
    };
  console.log('创建新文章:', newPost);
    fetch('http://localhost:9800/api/posts', {
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
    const localPosts = this.getLocalPosts();
    const index = localPosts.findIndex(p => p.id === post.id);

    if (index !== -1) {
      // 如果是本地文章，直接更新
      localPosts[index] = {
        ...post,
        readTime: this.calculateReadTime(post.content) // 重新计算阅读时间
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localPosts));
    } else {
      // 如果不是本地文章（即静态文章），我们需要把它"复制"到本地存储中作为覆盖
      // 注意：这里我们假设静态文章 ID 和本地文章 ID 不会冲突（因为新建文章 ID 是基于最大值生成的）
      // 但为了安全起见，我们通常只允许编辑本地文章，或者将编辑后的静态文章另存为新纪录
      // 在这个简单实现中，我们允许覆盖，将其视为"本地修改版"
      const updatedPost = {
        ...post,
        readTime: this.calculateReadTime(post.content)
      };
      const updatedLocalPosts = [updatedPost, ...localPosts];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocalPosts));
    }
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
