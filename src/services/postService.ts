import { Post } from '../types';
import http from '../api/http';

class PostService {
  async getAllPosts() {
    const data: any = await http.get('/posts');
    return [...data];
  }

  async getPostById(id: number) {
    const data: any = await http.get(`/posts/${id}`);
    return data;
  }

  async createPost(postData: Omit<Post, 'id' | 'updatedAt' | 'readTime'>) {
    console.log('创建新文章:', postData);
    const data: any = await http.post('/posts', {
      content: postData.content,
      title: postData.title,
      category: postData.category,
      excerpt: postData.excerpt,
      image: postData.image,
    });
    console.log(data, '创建新文章');
    return data;
  }

  async updatePost(id: number, postData: Omit<Post, 'id' | 'updatedAt' | 'readTime'>) {
    const data: any = await http.put(`/posts/${id}`, {
      content: postData.content,
      title: postData.title,
      category: postData.category,
      excerpt: postData.excerpt,
      image: postData.image,
    });
    console.log(data, '更新文章');
    return data;
  }

  async deletePost(id: number) {
    const data: any = await http.delete(`/posts/${id}`);
    console.log(data, '删除文章');
    return data;
  }
}

export const postService = new PostService();
