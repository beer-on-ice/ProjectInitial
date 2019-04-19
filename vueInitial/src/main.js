import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import i18n from './locales'

//  引入 全局样式
import './assets/styles/global.scss'
import './assets/iconfonts/iconfont.css'

// 引入 swiper
import 'swiper/dist/css/swiper.css'

// 引入 elementUI
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/display.css'

// 引入 rem插件(适用非响应式布局,如要兼容pc，设置node_modules/lib-flexible/文件里72行为 54->width)
import 'lib-flexible/flexible.js'

// 引入 svg处理
import './assets/icons'

// 引入 请求方法,倒入 http 文件夹下的 index.js
import api from './utils/http/index'

Vue.use(api)
Vue.config.productionTip = false

const router = new Router()
const store = new Store()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
