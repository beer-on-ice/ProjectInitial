/**
 * @title   http请求封装
 */
import { Interceptors } from './interceptors'

export default function $axios(options: any) {
  return new Promise((resolve, reject) => {
    const instance = new Interceptors().getInterceptors()
    // 请求处理
    instance(options)
      .then((res: any) => {
        resolve(res)
        return false
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}
