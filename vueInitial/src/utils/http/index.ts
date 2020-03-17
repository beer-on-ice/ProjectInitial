/* eslint-disable */
import apiList from '@/config/apiList'

const install = (Vue) => {
  if ((<any>install).installed) return
  ;(<any>install).installed = true

  Object.defineProperties(Vue.prototype, {
    // 此处挂载在 Vue 原型的 $api 对象上
    $api: {
      get: () => apiList
    }
  })
}

export default install
