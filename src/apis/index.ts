import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { IUserInfoJson, getUserInfo, updateUserInfo } from 'utils/localStorage';

interface ICommonResponse<T> {
  success: boolean;
  error: any;
  data: T;
}

let lock = false;
let subscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  subscribers.push(cb);
}

function onRrefreshed(token: string) {
  subscribers.forEach(cb => cb(token));
}

const getRefreshToken = async (): Promise<string | void> => {
  try {
    const { data }: any = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/tokens/mine`,
      {},
      {
        withCredentials: true,
      },
    );
    if (!data.data.accessToken) {
      throw new Error();
    }

    lock = false;
    onRrefreshed(data.data.accessToken);
    subscribers = [];
    updateUserInfo({ accessToken: data.data.accessToken });

    return data.data.accessToken;
  } catch (e) {
    lock = false;
    subscribers = [];
    localStorage.clear();
    window.location.replace('/signIn');
  }
};

class ApiService {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    });

    this.api.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const userInfo: IUserInfoJson = getUserInfo();
        const accessToken = userInfo.accessToken;

        if (!accessToken) return config;

        config.headers.Authorization = 'Bearer ' + accessToken;

        return config;
      },
      error => {
        Promise.reject(error);
      },
    );

    this.api.interceptors.response.use(
      async (response: AxiosResponse) => {
        return response;
      },
      async error => {
        const { config, response } = error;

        if (response && response.status === 401) {
          const originalRequest = config;

          if (lock) {
            return new Promise(resolve => {
              subscribeTokenRefresh((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axios(originalRequest));
              });
            });
          }
          lock = true;
          const accessToken = await getRefreshToken();

          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return axios(config);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  public async commonRequest<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: ICommonResponse<T>,
    config?: InternalAxiosRequestConfig,
  ): Promise<AxiosResponse<ICommonResponse<T>>> {
    const response = await this.api[method](url, data, config);
    return response;
  }

  public Get = async <T>(url: string, config?: InternalAxiosRequestConfig) =>
    this.commonRequest<T>('get', url, undefined, config);

  public Post = async <T>(url: string, data?: any, config?: InternalAxiosRequestConfig) =>
    this.commonRequest<T>('post', url, data, config);

  public Put = async <T>(url: string, data?: any, config?: InternalAxiosRequestConfig) =>
    this.commonRequest<T>('put', url, data, config);

  public Patch = async <T>(url: string, data?: any, config?: InternalAxiosRequestConfig) =>
    this.commonRequest<T>('patch', url, data, config);

  public Delete = async <T>(url: string, config?: InternalAxiosRequestConfig) =>
    this.commonRequest<T>('delete', url, undefined, config);
}

export default new ApiService();
