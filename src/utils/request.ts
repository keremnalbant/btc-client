import axios, { type AxiosResponse } from "axios";
import { getToken } from "./localStorageHelper";

const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/v1`;

const request = axios.create({
  baseURL: baseUrl,
  timeout: 100000,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": process.env.REACT_APP_APP_URL,
  },
  withCredentials: true,
});

request.interceptors.request.use(
  async (config: any) => {
    debugger;
    if (!config.headers.Authorization) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
    }
    return config;
  },
  async (error: any) => await Promise.reject(error),
);

request.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return await Promise.reject(response);
  },
  async (error: any) => {
    return await Promise.reject(error);
  },
);

export default request;
