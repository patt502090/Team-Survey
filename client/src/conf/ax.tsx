import axios from "axios";
import conf from "./main";

export const axData = {
  jwt: null,
};

const ax = axios.create({
  baseURL: conf.apiUrlPrefix,
  withCredentials: false,
});

ax.interceptors.request.use(
  function (config: any) {
    console.log(config)
    if (axData.jwt) {
      config.headers["Authorization"] = `Bearer ${axData.jwt}`;
      config.withCredentials = true;  
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export default ax;
