import axios from 'axios';

import * as kanban from './kanban';

interface IUserInfo {
  accessToken: string;
  expireDate: string;
  role: string;
}

export const goHigerApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

goHigerApi.interceptors.request.use(
  async (config: any) => {
    try {
      const userInfoString: string = localStorage.getItem('userInfo') as string;
      const userInfoJson: IUserInfo = JSON.parse(userInfoString);
      const accessToken = userInfoJson.accessToken;

      if (accessToken) config.headers.Authorization = 'Bearer ' + accessToken;
    } catch {
      return config;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export default {
  kanban,
};
