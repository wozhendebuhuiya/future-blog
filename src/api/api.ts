import http from './http';

// 用户接口
export const getUserInfo = () => http.get('/user');
export const login = (data: { email: string; password: string }) => http.post('/login', data);
export const createPost = (data: { content: string }) => http.post('/posts', data);
export const deletePost = (id: string) => http.delete(`/posts/${id}`);
export const getAllPosts = () => http.get('/posts');
export const getPostById = (id: string) => http.get(`/posts/${id}`);
export const updatePost = (id: string, data: { content: string }) => http.put(`/posts/${id}`, data);
export const getMe = () => http.get('/getMe');
export const chatMessagePosts = (data: { message: string }) => http.post('/chat', data);
