import axios from './api' // 倒入 api

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

// 单独倒出
export const mock = params => {
  return axios({
    url: '/mock',
    params
  })
}

export const upload = data => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}

export const proxy = data => {
  return axios({
    url: 'proxy',
    data
  })
}

export const restfuls = data => {
  return axios({
    url: `/restful/:${data.id}/list`
  })
}

// 默认全部倒出
export default {
  mock,
  upload,
  restfuls,
  proxy
}
