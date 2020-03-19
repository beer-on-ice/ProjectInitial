import axios from '@/utils/request/request' // 倒入 api

// 单独倒出
export const mock = (params: any) => {
  return axios({
    url: '/backend/getReportByList',
    method: 'get',
    params
  })
}

export const upload = (data: any) => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}

export const proxy = (data: any) => {
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
