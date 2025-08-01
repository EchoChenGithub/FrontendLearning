// axios 的封装处理

// 1. 根域名配置
// 2. 超时时间
// 3. 请求拦截器/ 响应拦截器

import axios from "axios";
import {getLocalToken, removeLocalToken} from "@/utils/token.jsx"

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000,
})

// 添加请求拦截器
// 在请求发送之前，做拦截，插入一些自定义的配置
request.interceptors.request.use((config) => {
    // 在请求头中注入 token
    // 1. 获取 token
    // 2. 按照后端格式要求做 token 拼接
    const token =getLocalToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})


//添加响应拦截器
 request.interceptors.response.use((response) => {
     return response.data
 }, (error) => {
     // 监控 401
     console.dir(error)
     if (error.response.status === 401) {
         // 1. 清空 token
         removeLocalToken()
         // 2. 跳转到登录页
         window.location.reload()
     }
     return Promise.reject(error)
 })

export { request }


