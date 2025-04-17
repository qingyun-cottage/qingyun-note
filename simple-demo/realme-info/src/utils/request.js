import axios from 'axios'

const isDev = import.meta.env.DEV

// 创建一个新的axios实例
const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000 * 15,
})

// 请求拦截器
request.interceptors.request.use(config => {
    // // 判断是否有token
    const token = localStorage.getItem('access_token')
    if (token) {
        // 设置请求头
        config.headers.Authorization = 'Bearer ' + token
    }
    return config
})

// 响应拦截器
request.interceptors.response.use(response => {
    // 获取响应数据
    const data = response.data

    if (data.code === 200) {
        return data.data
    } else {
        // 错误提示
        if (isDev) {
            console.log(data.message)
        }
        return Promise.reject(data.message)
    }
})

export default request
