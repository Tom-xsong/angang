import axios from "axios";
import NProgress from "nprogress";

import { Message } from "element-ui";
import Cookie from "js-cookie";

axios.defaults.withCredentials = true;

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 0, // 请求超时时间
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "X-XSRF-TOKEN": Cookie.get("XSRF-TOKEN")
  }
});

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers["X-XSRF-TOKEN"] = Cookie.get("XSRF-TOKEN");
    NProgress.start();
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    NProgress.done();
    return response;
  },
  error => {
    NProgress.done();
    // let href = window.location.hash
    if (error) {
      Message({
        message: "请求错误",
        type: "error",
        duration: 3 * 1000
      });
    }
    return Promise.reject(error);
  }
);

export default service;
