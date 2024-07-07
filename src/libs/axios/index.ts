/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {CONSTANT} from '@/common/constant';
import {env} from '@/config/env';

class RequestInstance {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      async (requestConfig: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(CONSTANT.TOKEN);
        (
          requestConfig.headers as AxiosRequestHeaders
        ).Authorization = `Bearer ${token}`;

        return requestConfig;
      },
      (err: AxiosError) => {
        console.error('request interceptors error:', err);
      },
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const {status, data} = res;

        if (status === 204) {
          // no content
          return true;
        }

        return data.data;
      },
      async (error) => {
        const {status, data: errBody, config: errConfig} = error.response || {};

        const {data = {}, msg = '', error: honeyCombError} = errBody || {};

        const errorObject: {
          code: any;
          msg: string;
          data: any;
          // Currently only used for form errors
          isError?: boolean;
          // Currently only used for form errors
          list?: any[];
        } = {
          code: status,
          msg,
          data: data
            ? Object.keys(data).length > 0
              ? data
              : honeyCombError
            : errBody,
        };

        if (status === 400) {
          if (data?.err_type && errConfig?.passingError) {
            return Promise.reject(errorObject);
          }
        }
        // 401: Re-login required
        if (status === 401) {
          // Handle set new token to retry request
        }

        if (status === 403) {
          // Permission interception

          return Promise.reject(errorObject);
        }

        if (status === 404 && error.config?.allow404) {
          return Promise.reject(errorObject);
        }

        if (status >= 500) {
          console.error(
            `Request failed with status code ${status}, ${msg || ''}`,
          );
          return Promise.reject(errorObject);
        }
        return Promise.reject(errorObject);
      },
    );
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.instance.delete(url, {
      data,
      ...config,
    });
  }
}

const requestConfig = {
  baseURL: env.API_URL,
  timeout: 30000,
  withCredentials: false, //true
  headers: {
    'Content-type': 'application/json',
  },
};

const requestInstance = new RequestInstance(requestConfig);
export {RequestInstance};
export default requestInstance;
