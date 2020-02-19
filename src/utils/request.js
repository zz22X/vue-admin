import axios from "axios"
import {
  Message
} from 'element-ui';
import { getToken, getUsername } from "@/utils/app"
//创建axios实例 

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi' //在开发环境（development）下使用
/* 
  NODE_ENV:环境变量
  process.env.NODE_ENV  在客户端侧代码中使用环境变量
 */
const service = axios.create({
  baseURL: BASEURL, //http://192.168.0.105:8080/devApi/ 
  timeout: 15000,
});

//添加请求拦截器
/* 
   请求接口前，进行数据处理
 */

service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 请求头
  // token userid。。后端需要什么 业务需求
  config.headers['Tokey'] = getToken();
  config.headers['UserName'] = getUsername()
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
/* 
   请求接口后，返回数据进行拦截
 */
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response.data
  if (data.resCode !== 0) {
    Message.error(data.message)
    //将错误信息返回前台
    return Promise.reject(data)
  } else {
    return response;
  }
}, function (error) {
  // 对响应错误做点什么~
  return Promise.reject(error);
});


export default service