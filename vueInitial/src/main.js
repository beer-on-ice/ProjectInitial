import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import i18n from './locales'

//  全局样式
import './assets/styles/global.scss'
import './assets/iconfonts/iconfont.css'
// import 'swiper/dist/css/swiper.css'

// 引入elementUI
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/display.css'

// 引入rem插件(适用非响应式布局,如要兼容pc，设置node_modules/lib-flexible/文件里72行为 54->width)
import 'lib-flexible/flexible.js'

// 引入svg处理
import './assets/icons'

// 引入请求方法,倒入 http 文件夹下的 index.js
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
