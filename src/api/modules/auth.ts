import axios from 'axios';
import { API_BASE_URL } from 'config';

export const authApi = {
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data; // { code, message, data, token }
  }
};
