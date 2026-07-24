
import http from './http';
import { getCache,setCache } from 'utils/cache';
// 用户接口
export const getUserInfo = () => http.get('/user');
export const login = (data: { email: string; password: string }) => http.post('/login', data);
export const createPost = (data: { content: string }) => http.post('/posts', data);
export const deletePost = (id: string) => http.delete(`/posts/${id}`);
export const getAllPosts = async (cursor?: number, pageSize: number = 10) =>{
  const url = `/posts?pageSize=${pageSize}${cursor ? `&cursor=${cursor}` : ''}`
  const cacheData = getCache(url)
  if(!cacheData){
    const rep = await http.get(url)
    setCache(url,rep)
    return rep
  }else{
    return cacheData
  }
}
 
export const getPostById = (id: string) => http.get(`/posts/${id}`);
export const updatePost = (id: string, data: { content: string }) => http.put(`/posts/${id}`, data);
export const getMe = () => http.get('/getMe');
export const chatMessagePosts = (data: { message: string }) => http.post('/chat', data);
