const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

export default {
  method: 'get',
  // 基础url前缀
  baseURL: IS_PROD ? process.env.VUE_APP_API_BASE_URL : '/api', //根据自己配置的反向代理去设置不同环境的baeUrl
  // 请求头信息
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json'
}
