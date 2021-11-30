import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: '/dev-api',
  baseURL: 'http://127.0.0.1:8033/',
  // 超时
  timeout: 10000
})

export default service
