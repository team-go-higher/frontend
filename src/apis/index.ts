import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface IUserInfoJson {
  accessToken: string;
  expireDate: string;
  role: string;
}
interface ICommonResponse<T> {
  success: boolean;
  error: any;
  data: T;
}
class ApiService {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    });

    this.api.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const userInfoString: string = localStorage.getItem('userInfo') as string;
        const userInfoJson: IUserInfoJson = JSON.parse(userInfoString);
        const accessToken = userInfoJson.accessToken;

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

          try {
            const { data }: any = await axios.patch(
              `${process.env.REACT_APP_BASE_URL}/tokens/mine`,
              {},
              {
                withCredentials: true,
              },
            );

            localStorage.setItem('accessToken', data.data.accessToken);

            originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
            return axios(originalRequest);
          } catch (e) {
            localStorage.clear();
            window.location.replace('/login');
          }
        }

        return Promise.reject(error);
      },
    );
  }

  public async commonRequest<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig,
  ): Promise<ICommonResponse<T>> {
    const response = await this.api[method](url, data, config);
    return response.data;
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
