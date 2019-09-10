import axios from 'utils/http/api' // 倒入 api

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
