// 挂载到全局
import apiList from '@/api'

const install = (Vue: any) => {
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
