import { type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { type AxiosRequestConfig, AxiosError } from 'axios';

import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({
        url: url,
        method,
        data,
        params,
      });

      return result;
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosInstance;
