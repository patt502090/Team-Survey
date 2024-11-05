import axios from "axios"
import conf from './main'

export const axData = {
  jwt: null
}

const ax = axios.create({
  baseURL: conf.apiUrlPrefix,
  withCredentials: true,
})

ax.interceptors.request.use(function (config:any) {
  // Do something before request is sent
  if (axData.jwt && config.url !== conf.loginEndpoint) {
    config.headers['Authorization'] = `Bearer ${axData.jwt}`
  }
  return config;
}, function (error:any) {
  // Do something with request error
  return Promise.reject(error);
});

export default ax;
