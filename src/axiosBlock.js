import axios from "axios";
import { Dialog, Notify } from "vant";
import Router from "./router";
// 请求拦截
axios.interceptors.request.use(
  config => {
    // 加载动画
    // 如果本地 token 存在，拿到 token
    // 可以不用登陆就进入需要 token 的页面
    if (localStorage.DStoken) {
      config.headers.Authorization = localStorage.DStoken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    // 结束加载动画
    return response;
  },
  error => {
    // 获取错误状态码
    const { status } = error.response;
    if (status == 401) {
      Dialog.confirm({
        title: "抱歉",
        message: "您的登陆已过期，请重新登陆~~"
      })
        .then(() => {
          // on confirm
          Router.push("/login");
        })
        .catch(() => {
          // on cancel
          Notify({
            message: "不登拉倒，哼哼~~",
            duration: 1500,
            background: "#1989fa"
          });
        });
      // 清除 token
      localStorage.removeItem("DStoken");
      localStorage.removeItem("DSuser");
    }
    return Promise.reject(error);
  }
);

export default axios;
