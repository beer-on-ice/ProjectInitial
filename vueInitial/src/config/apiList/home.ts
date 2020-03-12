import axios from '@/utils/http/api' // 倒入 api

// 单独倒出
export const mock = params => {
  return axios({
    url: '/backend/getReportByList',
    method: 'get',
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
    method: 'post',
    data
  })
}

// 默认全部倒出
export default {
  mock,
  upload,
  proxy
}
