import axios from 'axios'
import { getToken, removeToken } from '@/utils/cookie'

import store from '../store/index'

// 自定义实例默认值
let instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        if(store.state.token) {
            // 在发送请求之前做些什么
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        if (response.data.code == 401) {
            //token已过期的状态码
            removeToken()
            location.reload()
        } else {
            return response
        }
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
)

export default instance