import axios from "axios"
import {
  Message
} from 'element-ui';
//创建axios实例 

const SECONDURL = 'http://localhost:3000/api2/userinfo'

const requeest = axios.create({
  baseURL: SECONDURL,
  timeout: 15000,
});

requeest.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 请求头
  // token userid。。后端需要什么 业务需求
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
/* 
   请求接口后，返回数据进行拦截
 */
requeest.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // let data = response.data
  // if (data.msg !== 0) {
  //   Message.error(data.message)
  //   //将错误信息返回前台
  //   return Promise.reject(data)
  // } else {
  //   return response;
  // }
  return response;
}, function (error) {
  // 对响应错误做点什么~
  return Promise.reject(error);
});


export default requeest