// 倒入所有接口
import apiList from '@config/api'

const install = Vue => {
  if (install.installed) return
  install.installed = true

  Object.defineProperties(Vue.prototype, {
    // 此处挂载在 Vue 原型的 $api 对象上
    $api: {
      get: () => apiList
    }
  })
}

export default install
