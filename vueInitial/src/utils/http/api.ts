import axios from 'axios'
import config from './config' // 倒入默认配置
import qs from 'qs' // 序列化请求数据，视服务端的要求

// const tip = msg => {
//   message.error(msg)
// }

const toLogin = () => {
  ;(window as any)._router.replace({
    path: '/login'
  })
}

const errorHandle = (response) => {
  const { status, statusText } = response
  let errorInfo = ''
  switch (status) {
    case -1:
      errorInfo = statusText || '远程服务响应失败,请稍后重试'
      break
    case 400:
      errorInfo = statusText || '400：错误请求'
      break
    case 401:
      toLogin()
      errorInfo = statusText || '401：访问令牌无效或已过期,重新登录'
      break
    case 403:
      errorInfo = statusText || '403：拒绝访问'
      break
    case 404:
      errorInfo = statusText || '404：资源不存在'
      break
    case 405:
      errorInfo = statusText || '405：请求方法未允许'
      break
    case 408:
      errorInfo = statusText || '408：请求超时'
      break
    case 500:
      errorInfo = statusText || '500：访问服务失败'
      break
    case 501:
      errorInfo = statusText || '501：未实现'
      break
    case 502:
      errorInfo = statusText || '502：无效网关'
      break
    case 503:
      errorInfo = statusText || '503：服务不可用'
      break
    default:
      errorInfo = statusText || `连接错误`
  }
  return {
    code: status,
    message: errorInfo
  }
}

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
      // `transformRequest` 允许在向服务器发送前，修改请求数据
      transformRequest: [
        function(data) {
          // 对 data 进行任意转换处理
          return data
        }
      ]
    })

    // request 拦截器
    instance.interceptors.request.use(
      (config: any) => {
        /*
         * Tip: 1 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
         */

        /*
         * Tip: 2 带上 token , 可以结合 vuex 或者 localStorage
         * if (store.getters.token) {
         *     config.headers['token'] = getCookie('TOKEN')
         * } else {
         *  (<any>window)._route.push({
         *    path: '/login'
         *  })
         * }
         */
        /*
         * Tip: 3
         * 根据请求地址的不同，分别设置请求头的'Content-Type'
         */
        config.headers['Content-Type'] =
          config.method.toLocaleLowerCase() === 'get'
            ? 'application/json; charset=UTF-8'
            : config.url.includes('/upload')
            ? 'multipart/form-data'
            : 'application/x-www-form-urlencoded; charset=UTF-8'

        /*
         * Tip: 4
         * 根据请求方法，序列化传来的参数。
         */
        if (config.method === 'post') {
          const contentType = config.headers['Content-Type']
          // 根据Content-Type转换data格式
          if (contentType) {
            if (contentType.includes('multipart')) {
              // 类型 'multipart/form-data;'
              config.data = { ...config.data }
            } else if (contentType.includes('json')) {
              // 类型 'application/json;' , 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
              config.data = JSON.stringify(config.data)
            } else {
              // 类型 'application/x-www-form-urlencoded;', 服务器收到的raw body(原始数据) name=nowThen&age=18
              config.data = qs.stringify(config.data)
            }
          }
        }

        return Promise.resolve(config)
      },
      (err) => {
        return Promise.reject(err) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      (res) => (res.status === 200 ? Promise.resolve(res.data) : Promise.reject(errorHandle(res))),
      (err) => {
        const { response } = err
        if (response) {
          // 请求已发出，但是不在2xx的范围
          return Promise.reject(errorHandle(response))
        }
        return Promise.reject(err)
      }
    )

    // 请求处理
    instance(options)
      .then((res) => {
        resolve(res)
        return false
      })
      .catch((error) => {
        reject(error)
      })
  })
}
